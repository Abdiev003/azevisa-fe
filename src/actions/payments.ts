"use server";

import { fetcher } from "@/lib/fetcher";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type ActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

export type StripeCheckoutSessionResponse = {
  payment_id?: number;
  session_id?: string;
  client_secret?: string | null;
  status?: string;
};

export type PaymentRecord = {
  id: number;
  reference_number: string;
  provider: "paypal" | "stripe";
  status:
    | "created"
    | "approved"
    | "completed"
    | "failed"
    | "refunded"
    | "cancelled";
  amount: string;
  currency: string;
  provider_order_id: string;
  provider_capture_id: string;
  payer_email: string;
  created_at: string;
  completed_at: string | null;
};

export type ApplicationGroupApplication = {
  reference_number: string;
  status: string;
  total_amount: string;
  currency: string;
  visa_type?: { name: string } | null;
  visa_purpose?: { name: string } | null;
  applicant_name?: string | null;
};

export type ApplicationGroup = {
  group_id: string;
  status: string;
  total_amount: string;
  currency: string;
  applications: ApplicationGroupApplication[];
};

// -----------------------------------------------------------------------------
// Actions
// -----------------------------------------------------------------------------

export async function createStripeCheckoutSession(
  referenceNumber: string,
): Promise<ActionResult<StripeCheckoutSessionResponse>> {
  try {
    const data = (await fetcher(
      `/payments/stripe/create-checkout-session/${referenceNumber}/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    )) as StripeCheckoutSessionResponse;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        typeof error === "string"
          ? error
          : "Could not prepare the Stripe checkout.",
    };
  }
}

export async function getPaymentStatus(
  referenceNumber: string,
): Promise<ActionResult<PaymentRecord>> {
  try {
    const data = (await fetcher(`/payments/status/${referenceNumber}/`, {
      method: "GET",
    })) as PaymentRecord;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        typeof error === "string"
          ? error
          : "Could not load the payment status.",
    };
  }
}

/**
 * Create an ApplicationGroup that bundles multiple applications under a single
 * checkout. Applications must already be in `pending` status (i.e. submitted
 * and awaiting payment).
 */
export async function createApplicationGroup(
  referenceNumbers: string[],
): Promise<ActionResult<ApplicationGroup>> {
  try {
    const data = (await fetcher(`/application-groups/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ application_refs: referenceNumbers }),
    })) as ApplicationGroup;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        typeof error === "string"
          ? error
          : "Could not create the application group.",
    };
  }
}

export async function getApplicationGroup(
  groupId: string,
): Promise<ActionResult<ApplicationGroup>> {
  try {
    const data = (await fetcher(`/application-groups/${groupId}/`, {
      method: "GET",
    })) as ApplicationGroup;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        typeof error === "string"
          ? error
          : "Could not load the application group.",
    };
  }
}

export async function createStripeGroupCheckoutSession(
  groupId: string,
): Promise<ActionResult<StripeCheckoutSessionResponse>> {
  try {
    const data = (await fetcher(
      `/payments/stripe/create-checkout-session/group/${groupId}/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    )) as StripeCheckoutSessionResponse;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        typeof error === "string"
          ? error
          : "Could not prepare the Stripe checkout.",
    };
  }
}

export async function getGroupPaymentStatus(
  groupId: string,
): Promise<ActionResult<PaymentRecord>> {
  try {
    const data = (await fetcher(`/payments/status/group/${groupId}/`, {
      method: "GET",
    })) as PaymentRecord;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        typeof error === "string"
          ? error
          : "Could not load the payment status.",
    };
  }
}
