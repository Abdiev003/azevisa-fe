"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export type StripeCheckoutProps = {
  referenceNumber: string;
  groupId?: string;
  amount: string;
  currency: string;
  publishableKey: string;
  clientSecret: string;
};

export function StripeCheckout({
  referenceNumber,
  amount,
  currency,
  publishableKey,
  clientSecret,
}: StripeCheckoutProps) {
  const stripePromise = useMemo(
    () => loadStripe(publishableKey),
    [publishableKey],
  );
  const options = useMemo(() => ({ clientSecret }), [clientSecret]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-5 py-4 border border-gray-100 bg-gray-50 rounded-xl">
        <div>
          <span className="text-sm text-[#6F7A72]">Total to pay</span>
          <p className="mt-1 text-sm font-medium text-[#1F2937]">
            Paying securely with Stripe
          </p>
        </div>
        <span className="text-2xl font-black text-[#004E34]">
          {amount} {currency}
        </span>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-3">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>

      <p className="text-xs text-[#6F7A72] text-center">
        Payments are processed securely by Stripe. Your card details are never
        stored on our servers. Your reference number is{" "}
        <span className="font-semibold text-[#1F2937]">{referenceNumber}</span>.
      </p>

      <Link
        href={`/check-status?ref=${referenceNumber}`}
        className="text-center text-sm text-[#004E34] hover:underline"
      >
        Save reference and pay later →
      </Link>
    </div>
  );
}
