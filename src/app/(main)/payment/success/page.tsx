import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import {
  getApplicationGroup,
  getGroupPaymentStatus,
  getPaymentStatus,
  type ApplicationGroupApplication,
  type PaymentRecord,
} from "@/actions/payments";

type SearchParams = Promise<{ ref?: string; group?: string }>;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Payment successful",
    robots: { index: false, follow: false },
  };
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { ref, group } = await searchParams;

  if (!ref && !group) {
    redirect("/");
  }

  // Capture happened in the PayPalCheckout component already.
  // We just fetch the latest payment status to show a confirmation.
  let payment: PaymentRecord | null = null;
  let groupApplications: ApplicationGroupApplication[] | null = null;

  if (group) {
    const [statusResult, groupResult] = await Promise.all([
      getGroupPaymentStatus(group),
      getApplicationGroup(group),
    ]);
    if (statusResult.success) {
      payment = statusResult.data;
    }
    if (groupResult.success) {
      groupApplications = groupResult.data.applications;
    }
  } else if (ref) {
    const result = await getPaymentStatus(ref);
    if (result.success) {
      payment = result.data;
    }
  }

  const isCompleted =
    payment?.status === "completed" || payment?.status === "approved";
  const displayRef = ref ?? group ?? "";

  if (!isCompleted) {
    return (
      <Pending
        referenceNumber={displayRef}
        groupApplications={groupApplications}
      />
    );
  }

  return (
    <Completed
      payment={payment!}
      referenceNumber={displayRef}
      groupApplications={groupApplications}
    />
  );
}

// -----------------------------------------------------------------------------
// Views
// -----------------------------------------------------------------------------

function ReferenceList({
  applications,
}: {
  applications: ApplicationGroupApplication[];
}) {
  return (
    <div className="bg-[#004E34]/5 border border-[#004E34]/20 rounded-xl px-5 py-4 mb-4 w-full">
      <p className="text-xs text-[#6F7A72] mb-3">
        Reference Numbers ({applications.length})
      </p>
      <ul className="flex flex-col gap-3">
        {applications.map((application) => (
          <li
            key={application.reference_number}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex flex-col items-start text-left">
              {application.applicant_name && (
                <span className="text-xs text-[#6F7A72]">
                  {application.applicant_name}
                </span>
              )}
              <span className="text-base font-bold tracking-widest text-[#004E34]">
                {application.reference_number}
              </span>
            </div>
            <Link
              href={`/check-status?ref=${application.reference_number}`}
              className="text-xs font-semibold text-[#004E34] hover:underline shrink-0"
            >
              View →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SingleReference({ referenceNumber }: { referenceNumber: string }) {
  return (
    <div className="bg-[#004E34]/5 border border-[#004E34]/20 rounded-xl px-6 py-4 mb-4 w-full">
      <p className="text-xs text-[#6F7A72] mb-1">Reference Number</p>
      <p className="text-xl font-bold tracking-widest text-[#004E34]">
        {referenceNumber}
      </p>
    </div>
  );
}

function Completed({
  payment,
  referenceNumber,
  groupApplications,
}: {
  payment: PaymentRecord;
  referenceNumber: string;
  groupApplications: ApplicationGroupApplication[] | null;
}) {
  const hasGroup = groupApplications && groupApplications.length > 1;
  const primaryRef = hasGroup
    ? groupApplications[0].reference_number
    : referenceNumber;

  return (
    <div className="max-w-xl mx-auto my-16 px-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl py-12 px-8 flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#004E34]/10 mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10 text-[#004E34]"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#1F2937] mb-2">
          Payment successful
        </h1>
        <p className="text-[#6F7A72] text-sm max-w-sm mb-6">
          {hasGroup
            ? `${groupApplications.length} applications have been submitted and your payment was received. We'll review them and send updates to your email.`
            : "Your application has been submitted and your payment was received. We'll review it and send updates to your email."}
        </p>

        {hasGroup ? (
          <ReferenceList applications={groupApplications} />
        ) : (
          <SingleReference referenceNumber={referenceNumber} />
        )}

        <div className="bg-gray-50 border border-gray-100 rounded-xl px-6 py-3 mb-8 w-full flex items-center justify-between text-sm">
          <span className="text-[#6F7A72]">Amount paid</span>
          <span className="font-semibold text-[#1F2937]">
            {payment.amount} {payment.currency}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href={`/check-status?ref=${primaryRef}`}
            className="px-6 py-2.5 rounded-lg bg-[#004E34] text-white text-sm font-semibold hover:bg-[#003322] transition-colors"
          >
            Check Status
          </Link>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-lg border border-gray-200 text-[#6F7A72] text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function Pending({
  referenceNumber,
  groupApplications,
}: {
  referenceNumber: string;
  groupApplications: ApplicationGroupApplication[] | null;
}) {
  const hasGroup = groupApplications && groupApplications.length > 1;
  const primaryRef = hasGroup
    ? groupApplications[0].reference_number
    : referenceNumber;

  return (
    <div className="max-w-xl mx-auto my-16 px-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl py-12 px-8 flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10 text-amber-500"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#1F2937] mb-2">
          Payment processing
        </h1>
        <p className="text-[#6F7A72] text-sm max-w-sm mb-6">
          Your payment is being processed. You&apos;ll receive an email
          confirmation when it completes.
        </p>

        {hasGroup ? (
          <ReferenceList applications={groupApplications} />
        ) : (
          <SingleReference referenceNumber={referenceNumber} />
        )}

        <Link
          href={`/check-status?ref=${primaryRef}`}
          className="px-6 py-2.5 rounded-lg bg-[#004E34] text-white text-sm font-semibold hover:bg-[#003322] transition-colors"
        >
          Check Status
        </Link>
      </div>
    </div>
  );
}
