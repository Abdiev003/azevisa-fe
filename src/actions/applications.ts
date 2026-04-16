"use server";

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

async function listApplications(): Promise<ApplicationListItem[]> {
  const data = (await fetcher("/applications/", {
    method: "GET",
  })) as { results?: ApplicationListItem[] } | ApplicationListItem[];

  if (Array.isArray(data)) {
    return data;
  }

  return Array.isArray(data.results) ? data.results : [];
}

export async function createDraftApplication(
  payload: CreateDraftPayload,
): Promise<ActionResult> {
  try {
    const previousApplications = await listApplications();
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
      },
      body: JSON.stringify(payload),
    });

    const nextApplications = await listApplications();
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
  try {
    const applications = await listApplications();
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
  try {
    const data = await fetcher(
      `/applications/${referenceNumber}/step/${step}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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

export async function uploadDocument(
  referenceNumber: string,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const data = await fetcher(`/documents/${referenceNumber}/upload/`, {
      method: "POST",
      body: formData,
    });
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        typeof error === "string" ? error : "Could not upload the document.",
    };
  }
}

export async function submitApplication(
  referenceNumber: string,
): Promise<ActionResult> {
  try {
    const data = await fetcher(`/applications/${referenceNumber}/submit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
