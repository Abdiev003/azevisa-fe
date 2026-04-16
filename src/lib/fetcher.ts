type ApiErrorPayload = {
  detail?: string;
  code?: string;
  message?: string;
  messages?: Array<{
    message?: string;
  }>;
} & Record<string, unknown>;

function formatFieldError(key: string, value: unknown): string | null {
  if (typeof value === "string") {
    return `${key}: ${value}`;
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return `${key}: ${value[0]}`;
  }

  return null;
}

function extractErrorMessage(payload: ApiErrorPayload) {
  if (payload.detail) {
    return payload.detail;
  }

  if (payload.message) {
    return payload.message;
  }

  if (payload.messages?.[0]?.message) {
    return payload.messages[0].message;
  }

  for (const [key, value] of Object.entries(payload)) {
    if (["detail", "code", "message", "messages"].includes(key)) {
      continue;
    }

    const fieldError = formatFieldError(key, value);
    if (fieldError) {
      return fieldError;
    }
  }

  return null;
}

export const fetcher = async (url: string, options?: RequestInit) => {
  const BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

  let locale = "az";
  try {
    const { getLocale } = await import("next-intl/server");
    locale = await getLocale();
  } catch {
    // client-side or locale unavailable — keep default
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        "Accept-Language": locale,
        ...options?.headers,
      },
    });
    if (!response.ok) {
      const contentType = response.headers.get("content-type") ?? "";

      if (contentType.includes("application/json")) {
        const payload = (await response.json()) as ApiErrorPayload;
        return Promise.reject(
          extractErrorMessage(payload) ?? payload.code ?? "Request failed.",
        );
      }

      return Promise.reject(await response.text());
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  } catch (error) {
    return Promise.reject(
      error instanceof Error ? error.message : String(error),
    );
  }
};
