import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { PayPalCheckout } from "@/components/payment/paypal-checkout";
import { fetcher } from "@/lib/fetcher";

// =============================================================================
// Types
// =============================================================================

type SearchParams = Promise<{ ref?: string; method?: string }>;

type ApplicationDetails = {
  reference_number: string;
  status: string;
  total_amount: string;
  currency: string;
  visa_type?: { name: string } | null;
  visa_purpose?: { name: string } | null;
};

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
  const { ref, method } = await searchParams;

  if (!ref) {
    redirect("/");
  }

  // The Client ID is public — safe to expose via NEXT_PUBLIC_* env var.
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!paypalClientId) {
    return (
      <ErrorState
        title="Payment unavailable"
        message="Payment provider is not configured. Please contact support."
        referenceNumber={ref}
      />
    );
  }

  // Fetch the application so we know the amount and can render a summary.
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
        referenceNumber={ref}
      />
    );
  }

  // Validate that the application is ready to accept payment.
  if (application.status !== "pending") {
    if (application.status === "submitted") {
      // Already paid — send them to their status page.
      redirect(`/check-status?ref=${ref}`);
    }
    return (
      <ErrorState
        title="This application is not awaiting payment"
        message={`Current status: ${application.status}. Please contact support if this looks wrong.`}
        referenceNumber={ref}
      />
    );
  }

  const preferredFunding = method === "card" ? "card" : "paypal";
  const paymentMethodLabel =
    preferredFunding === "card" ? "Card / Credit Card" : "PayPal";
  const paymentTitle =
    preferredFunding === "card"
      ? "Complete your card payment"
      : "Complete your PayPal payment";
  const paymentDescription =
    preferredFunding === "card"
      ? "Your application has been saved. Continue to the secure card checkout powered by PayPal."
      : "Your application has been saved. Continue with PayPal to complete payment securely.";

  // All good — render the checkout.
  return (
    <div className="max-w-xl mx-auto my-12 px-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl py-8 px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1F2937] mb-2">
            {paymentTitle}
          </h1>
          <p className="text-sm text-[#6F7A72]">
            {paymentDescription}
          </p>
        </div>

        {/* Order summary */}
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

        {/* PayPal buttons + card form */}
        <PayPalCheckout
          referenceNumber={application.reference_number}
          amount={application.total_amount}
          currency={application.currency}
          clientId={paypalClientId}
          preferredFunding={preferredFunding}
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

        <div className="bg-[#004E34]/5 border border-[#004E34]/20 rounded-xl px-6 py-4 mb-8 w-full max-w-xs">
          <p className="text-xs text-[#6F7A72] mb-1">Reference Number</p>
          <p className="text-xl font-bold tracking-widest text-[#004E34]">
            {referenceNumber}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/check-status?ref=${referenceNumber}`}
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
