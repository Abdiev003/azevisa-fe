"use server";

import { cookies } from "next/headers";
import { fetcher } from "@/lib/fetcher";

type CreateDraftPayload = {
  nationality: number;
};

type UpdateStepPayload = Record<string, string | number | boolean | null>;

type ActionResult =
  | { success: true; data: unknown }
  | { success: false; error: string };

type ApplicationListItem = {
  reference_number?: string;
  nationality_name?: string;
  status?: string;
  current_step?: number;
  created_at?: string;
};

async function listApplications(
  accessToken: string | undefined,
): Promise<ApplicationListItem[]> {
  const data = (await fetcher("/applications/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })) as { results?: ApplicationListItem[] } | ApplicationListItem[];

  if (Array.isArray(data)) {
    return data;
  }

  return Array.isArray(data.results) ? data.results : [];
}

export async function createDraftApplication(
  payload: CreateDraftPayload,
): Promise<ActionResult> {
  const store = await cookies();
  const accessToken = store.get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      error: "You must be signed in to create an application.",
    };
  }

  try {
    const previousApplications = await listApplications(accessToken);
    const previousReferences = new Set(
      previousApplications
        .map((application) => application.reference_number)
        .filter(
          (reference): reference is string => typeof reference === "string",
        ),
    );

    const data = await fetcher("/applications/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const nextApplications = await listApplications(accessToken);
    const createdApplication =
      nextApplications.find(
        (application) =>
          typeof application.reference_number === "string" &&
          !previousReferences.has(application.reference_number),
      ) ??
      nextApplications.find(
        (application) =>
          application.status === "draft" &&
          application.current_step === 1 &&
          typeof application.reference_number === "string",
      );

    return {
      success: true,
      data:
        createdApplication && createdApplication.reference_number
          ? {
              ...data,
              reference_number: createdApplication.reference_number,
            }
          : data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        typeof error === "string" ? error : "Could not create the application.",
    };
  }
}

export async function getLatestDraftApplication(): Promise<ActionResult> {
  const store = await cookies();
  const accessToken = store.get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      error: "You must be signed in to load applications.",
    };
  }

  try {
    const applications = await listApplications(accessToken);
    const latestDraft = [...applications]
      .filter(
        (application) =>
          typeof application.reference_number === "string" &&
          (application.status === "draft" || application.status === "pending"),
      )
      .sort((a, b) => {
        const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
        const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
        return bTime - aTime;
      })[0];

    if (!latestDraft) {
      return {
        success: false,
        error: "Could not find the newly created application.",
      };
    }

    return { success: true, data: latestDraft };
  } catch (error) {
    return {
      success: false,
      error:
        typeof error === "string"
          ? error
          : "Could not load the latest application.",
    };
  }
}

export async function updateApplicationStep(
  referenceNumber: string,
  step: number,
  payload: UpdateStepPayload,
): Promise<ActionResult> {
  const store = await cookies();
  const accessToken = store.get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      error: "You must be signed in to update the application.",
    };
  }

  try {
    const data = await fetcher(
      `/applications/${referenceNumber}/step/${step}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        typeof error === "string"
          ? error
          : "Could not update the application step.",
    };
  }
}

export async function submitApplication(
  referenceNumber: string,
): Promise<ActionResult> {
  const store = await cookies();
  const accessToken = store.get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      error: "You must be signed in to submit the application.",
    };
  }

  try {
    const data = await fetcher(`/applications/${referenceNumber}/submit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        typeof error === "string" ? error : "Could not submit the application.",
    };
  }
}
