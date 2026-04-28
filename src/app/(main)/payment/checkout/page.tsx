import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { StripeCheckout } from "@/components/payment/stripe-checkout";
import {
  createStripeCheckoutSession,
  createStripeGroupCheckoutSession,
  getApplicationGroup,
} from "@/actions/payments";
import { fetcher } from "@/lib/fetcher";

// =============================================================================
// Types
// =============================================================================

type SearchParams = Promise<{ ref?: string; group?: string; method?: string }>;

type ApplicationDetails = {
  reference_number: string;
  status: string;
  total_amount: string;
  currency: string;
  visa_type?: { name: string } | null;
  visa_purpose?: { name: string } | null;
  group_id?: string | null;
  application_group?:
    | string
    | {
        id?: string | null;
        group_id?: string | null;
      }
    | null;
  group?:
    | string
    | {
        id?: string | null;
        group_id?: string | null;
      }
    | null;
};

function getApplicationGroupId(application: ApplicationDetails) {
  if (application.group_id) {
    return application.group_id;
  }

  for (const value of [application.application_group, application.group]) {
    if (typeof value === "string" && value) {
      return value;
    }

    if (value && typeof value === "object") {
      if (value.group_id) {
        return value.group_id;
      }

      if (value.id) {
        return value.id;
      }
    }
  }

  return null;
}

// =============================================================================
// Metadata
// =============================================================================

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Complete payment",
    robots: { index: false, follow: false },
  };
}

// =============================================================================
// Page
// =============================================================================

export default async function PaymentCheckoutPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { ref, group, method } = await searchParams;

  if (!group && !ref) {
    redirect("/");
  }

  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!stripePublishableKey) {
    return (
      <ErrorState
        title="Payment unavailable"
        message="Stripe is not configured. Please contact support."
        referenceNumber={group ?? ref ?? ""}
      />
    );
  }

  const isCardAlias = method === "card";
  const paymentMethodLabel = "Stripe";
  const paymentTitle = isCardAlias
    ? "Complete your card payment"
    : "Complete your Stripe payment";
  const paymentDescription = isCardAlias
    ? "Your application has been saved. Continue to the secure card checkout powered by Stripe."
    : "Your application has been saved. Continue with Stripe to complete payment securely.";

  // -------------------------------------------------------------------------
  // Group flow — preferred when multiple applicants are involved.
  // -------------------------------------------------------------------------
  if (group) {
    const groupResult = await getApplicationGroup(group);
    if (!groupResult.success) {
      return (
        <ErrorState
          title="Application group not found"
          message="We could not find the payment group. Please start over or contact support."
          referenceNumber={group}
        />
      );
    }

    const groupData = groupResult.data;

    if (groupData.status === "submitted") {
      const firstRef = groupData.applications[0]?.reference_number ?? group;
      redirect(`/check-status?ref=${firstRef}`);
    }

    if (groupData.status !== "pending" && groupData.status !== "draft") {
      return (
        <ErrorState
          title="This group is not awaiting payment"
          message={`Current status: ${groupData.status}. Please contact support if this looks wrong.`}
          referenceNumber={group}
        />
      );
    }

    const sessionResult = await createStripeGroupCheckoutSession(
      groupData.group_id,
    );
    if (!sessionResult.success) {
      return (
        <ErrorState
          title="Payment unavailable"
          message={sessionResult.error}
          referenceNumber={group}
        />
      );
    }

    const clientSecret = sessionResult.data.client_secret;
    if (!clientSecret) {
      return (
        <ErrorState
          title="Payment unavailable"
          message="Stripe checkout client secret was not returned."
          referenceNumber={group}
        />
      );
    }

    return (
      <div className="max-w-xl mx-auto my-12 px-6">
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl py-8 px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1F2937] mb-2">
              {paymentTitle}
            </h1>
            <p className="text-sm text-[#6F7A72]">{paymentDescription}</p>
          </div>

          <div className="mb-6 border border-gray-100 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-[#1F2937]">
                Order summary
              </h2>
            </div>
            <div className="px-5 py-4 flex flex-col gap-3">
              {groupData.applications.map((application) => (
                <div
                  key={application.reference_number}
                  className="flex flex-col gap-1 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6F7A72]">
                      {application.applicant_name ||
                        application.reference_number}
                    </span>
                    <span className="font-medium text-[#1F2937]">
                      {application.total_amount} {application.currency}
                    </span>
                  </div>
                  {(application.visa_type || application.visa_purpose) && (
                    <div className="text-xs text-[#6F7A72]">
                      {[
                        application.visa_type?.name,
                        application.visa_purpose?.name,
                      ]
                        .filter(Boolean)
                        .join(" — ")}
                    </div>
                  )}
                  <div className="text-xs font-mono text-[#6F7A72]">
                    {application.reference_number}
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                <span className="text-[#6F7A72]">Payment method</span>
                <span className="font-medium text-[#1F2937]">
                  {paymentMethodLabel}
                </span>
              </div>
              <div className="flex items-center justify-between text-base pt-2 border-t border-gray-100">
                <span className="font-bold text-[#1F2937]">Total</span>
                <span className="font-black text-[#004E34]">
                  {groupData.total_amount} {groupData.currency}
                </span>
              </div>
            </div>
          </div>

          <StripeCheckout
            groupId={groupData.group_id}
            referenceNumber={
              groupData.applications[0]?.reference_number ?? groupData.group_id
            }
            amount={groupData.total_amount}
            currency={groupData.currency}
            publishableKey={stripePublishableKey}
            clientSecret={clientSecret}
          />
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Single-application flow — kept for backwards compatibility.
  // -------------------------------------------------------------------------
  let application: ApplicationDetails | null = null;
  try {
    application = (await fetcher(`/applications/${ref}/`, {
      method: "GET",
    })) as ApplicationDetails;
  } catch {
    return (
      <ErrorState
        title="Application not found"
        message="We could not find an application with that reference number."
        referenceNumber={ref ?? ""}
      />
    );
  }

  if (application.status !== "pending") {
    if (application.status === "submitted") {
      redirect(`/check-status?ref=${ref}`);
    }
    return (
      <ErrorState
        title="This application is not awaiting payment"
        message={`Current status: ${application.status}. Please contact support if this looks wrong.`}
        referenceNumber={ref ?? ""}
      />
    );
  }

  const applicationGroupId = getApplicationGroupId(application);
  if (applicationGroupId) {
    redirect(
      `/payment/checkout?group=${encodeURIComponent(applicationGroupId)}&ref=${encodeURIComponent(application.reference_number)}&method=stripe`,
    );
  }

  const sessionResult = await createStripeCheckoutSession(
    application.reference_number,
  );
  if (!sessionResult.success) {
    return (
      <ErrorState
        title="Payment unavailable"
        message={sessionResult.error}
        referenceNumber={ref ?? ""}
      />
    );
  }

  const clientSecret = sessionResult.data.client_secret;
  if (!clientSecret) {
    return (
      <ErrorState
        title="Payment unavailable"
        message="Stripe checkout client secret was not returned."
        referenceNumber={ref ?? ""}
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto my-12 px-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl py-8 px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1F2937] mb-2">
            {paymentTitle}
          </h1>
          <p className="text-sm text-[#6F7A72]">{paymentDescription}</p>
        </div>

        {(application.visa_type || application.visa_purpose) && (
          <div className="mb-6 border border-gray-100 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-[#1F2937]">
                Order summary
              </h2>
            </div>
            <div className="px-5 py-4 flex flex-col gap-2">
              {application.visa_type && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6F7A72]">Visa type</span>
                  <span className="font-medium text-[#1F2937]">
                    {application.visa_type.name}
                  </span>
                </div>
              )}
              {application.visa_purpose && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6F7A72]">Purpose</span>
                  <span className="font-medium text-[#1F2937]">
                    {application.visa_purpose.name}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm pt-2 mt-1 border-t border-gray-100">
                <span className="text-[#6F7A72]">Reference</span>
                <span className="font-mono text-[#1F2937]">
                  {application.reference_number}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6F7A72]">Payment method</span>
                <span className="font-medium text-[#1F2937]">
                  {paymentMethodLabel}
                </span>
              </div>
            </div>
          </div>
        )}

        <StripeCheckout
          referenceNumber={application.reference_number}
          amount={application.total_amount}
          currency={application.currency}
          publishableKey={stripePublishableKey}
          clientSecret={clientSecret}
        />
      </div>
    </div>
  );
}

// =============================================================================
// Error state
// =============================================================================

function ErrorState({
  title,
  message,
  referenceNumber,
}: {
  title: string;
  message: string;
  referenceNumber: string;
}) {
  return (
    <div className="max-w-xl mx-auto my-16 px-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl py-12 px-8 flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10 text-red-500"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#1F2937] mb-2">{title}</h1>
        <p className="text-[#6F7A72] text-sm max-w-sm mb-6">{message}</p>

        {referenceNumber && (
          <div className="bg-[#004E34]/5 border border-[#004E34]/20 rounded-xl px-6 py-4 mb-8 w-full max-w-xs">
            <p className="text-xs text-[#6F7A72] mb-1">Reference Number</p>
            <p className="text-xl font-bold tracking-widest text-[#004E34]">
              {referenceNumber}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={
              referenceNumber
                ? `/check-status?ref=${referenceNumber}`
                : "/check-status"
            }
            className="px-6 py-2.5 rounded-lg bg-[#004E34] text-white text-sm font-semibold hover:bg-[#003322] transition-colors"
          >
            Check Status
          </Link>
          <Link
            href="/contact-us"
            className="px-6 py-2.5 rounded-lg border border-gray-200 text-[#6F7A72] text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
