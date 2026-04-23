import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

type SearchParams = Promise<{ ref?: string }>;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Payment cancelled",
    robots: { index: false, follow: false },
  };
}

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { ref } = await searchParams;

  if (!ref) {
    redirect("/");
  }

  return (
    <div className="max-w-xl mx-auto my-16 px-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl py-12 px-8 flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10 text-[#6F7A72]"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#1F2937] mb-2">
          Payment cancelled
        </h1>
        <p className="text-[#6F7A72] text-sm max-w-sm mb-6">
          You cancelled the payment. Your application is saved and you can retry
          the payment anytime using your reference number.
        </p>

        <div className="bg-[#004E34]/5 border border-[#004E34]/20 rounded-xl px-6 py-4 mb-8 w-full">
          <p className="text-xs text-[#6F7A72] mb-1">Reference Number</p>
          <p className="text-xl font-bold tracking-widest text-[#004E34]">
            {ref}
          </p>
          <p className="text-xs text-[#6F7A72] mt-2">
            Save this number — you can resume payment later.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/check-status?ref=${ref}`}
            className="px-6 py-2.5 rounded-lg bg-[#004E34] text-white text-sm font-semibold hover:bg-[#003322] transition-colors"
          >
            View Application
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
