"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PayPalScriptProvider,
  PayPalButtons,
  type ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import type { OnApproveData } from "@paypal/paypal-js";

import {
  createPayPalOrder,
  capturePayPalOrder,
  createPayPalGroupOrder,
} from "@/actions/payments";

// =============================================================================
// Props
// =============================================================================

export type PayPalCheckoutProps = {
  // Reference number used for display + the legacy single-application flow.
  // When `groupId` is set, this is also used as the fallback identifier passed
  // to the success page so the user always sees something meaningful.
  referenceNumber: string;
  // When present, the group payment endpoints are used instead of the
  // per-application ones, and the success page is told about the group.
  groupId?: string;
  amount: string; // e.g. "66.00"
  currency: string; // e.g. "USD"
  clientId: string; // PayPal Client ID (public, safe to expose)
  preferredFunding?: "paypal" | "card";
  // Optional: customize "success" destination. Defaults to /payment/success.
  successHref?: (params: { ref: string; groupId?: string }) => string;
};

// =============================================================================
// Component
// =============================================================================

export function PayPalCheckout({
  referenceNumber,
  groupId,
  amount,
  currency,
  clientId,
  preferredFunding = "paypal",
  successHref = ({ ref, groupId: gid }) =>
    gid
      ? `/payment/success?group=${gid}&ref=${ref}`
      : `/payment/success?ref=${ref}`,
}: PayPalCheckoutProps) {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const methodLabel =
    preferredFunding === "card" ? "Card / Credit Card" : "PayPal";

  // SDK configuration
  // - `components: buttons` → loads PayPal Smart Buttons
  // - `enable-funding: card` → shows a separate "Debit or Credit Card" button
  //    which opens an inline PayPal-hosted card form (no redirect).
  // - `disable-funding: paylater,venmo` → clean default look
  const scriptOptions: ReactPayPalScriptOptions = {
    clientId,
    currency,
    intent: "capture",
    components: "buttons",
    "enable-funding": "card",
    "disable-funding": "paylater,venmo",
  };

  // ---------------------------------------------------------------------------
  // Callbacks — these are called by the PayPal SDK, not our code
  // ---------------------------------------------------------------------------

  const handleCreateOrder = useCallback(async () => {
    setStatus("processing");
    setErrorMessage("");

    const result = groupId
      ? await createPayPalGroupOrder(groupId)
      : await createPayPalOrder(referenceNumber);

    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error);
      // PayPal SDK expects us to throw here to cancel the flow
      throw new Error(result.error);
    }

    if (!result.data.order_id) {
      setStatus("error");
      setErrorMessage("Missing order id from server.");
      throw new Error("Missing order id from server.");
    }

    // Return the order_id to the SDK — it will use this to open the payment UI.
    return result.data.order_id;
  }, [groupId, referenceNumber]);

  const handleApprove = useCallback(
    async (data: OnApproveData) => {
      setStatus("processing");

      const result = await capturePayPalOrder(data.orderID);

      if (!result.success) {
        setStatus("error");
        setErrorMessage(result.error);
        return;
      }

      setStatus("success");
      // Redirect to the success page with the reference (and group, if any)
      router.push(successHref({ ref: referenceNumber, groupId }));
    },
    [groupId, referenceNumber, router, successHref],
  );

  const handleCancel = useCallback(() => {
    setStatus("idle");
    setErrorMessage("");
  }, []);

  const handleError = useCallback((err: Record<string, unknown>) => {
    console.error("PayPal error:", err);
    setStatus("error");
    setErrorMessage(
      "Something went wrong with the payment. Please try again or use a different method.",
    );
  }, []);

  // ---------------------------------------------------------------------------
  // UI
  // ---------------------------------------------------------------------------

  return (
    <div className="flex flex-col gap-4">
      {/* Amount summary — always visible */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between">
        <div>
          <span className="text-sm text-[#6F7A72]">Total to pay</span>
          <p className="mt-1 text-sm font-medium text-[#1F2937]">
            Paying with {methodLabel}
          </p>
        </div>
        <span className="text-2xl font-black text-[#004E34]">
          {amount} {currency}
        </span>
      </div>

      {/* Status messages */}
      {status === "processing" && (
        <div className="bg-blue-50 border border-blue-100 text-blue-700 text-sm rounded-xl px-4 py-3">
          Processing payment — please wait…
        </div>
      )}

      {status === "success" && (
        <div className="bg-[#004E34]/5 border border-[#004E34]/20 text-[#004E34] text-sm rounded-xl px-4 py-3">
          Payment completed! Redirecting…
        </div>
      )}

      {status === "error" && errorMessage && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
          {errorMessage}
        </div>
      )}

      {/* PayPal SDK wrapper */}
      <PayPalScriptProvider options={scriptOptions}>
        <PayPalButtons
          style={{
            layout: "vertical",
            shape: "rect",
            label: "pay",
            color: "blue",
            height: 45,
          }}
          fundingSource={preferredFunding}
          disabled={status === "processing" || status === "success"}
          createOrder={handleCreateOrder}
          onApprove={handleApprove}
          onCancel={handleCancel}
          onError={handleError}
        >
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            The selected payment option is currently unavailable. Please go
            back and choose the other payment method.
          </div>
        </PayPalButtons>
      </PayPalScriptProvider>

      {/* Legal / support footer */}
      <p className="text-xs text-[#6F7A72] text-center">
        Payments are processed securely by PayPal. Your card details are never
        stored on our servers. Your reference number is{" "}
        <span className="font-semibold text-[#1F2937]">{referenceNumber}</span>.
      </p>

      {status === "error" && (
        <Link
          href={`/check-status?ref=${referenceNumber}`}
          className="text-center text-sm text-[#004E34] hover:underline"
        >
          Save reference and pay later →
        </Link>
      )}
    </div>
  );
}
