"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                                */
/* ------------------------------------------------------------------ */

type AppStatus = "PROCESSING" | "APPROVED" | "REJECTED" | "CANCELLED";

interface ActiveApplication {
  kind: "active";
  id: string;
  groupId: string | null;
  applicant: string;
  visaType: string;
  submissionDate: string;
  status: Extract<AppStatus, "PROCESSING"> | "PENDING";
  currentStep: 0 | 1 | 2 | 3; // 0=Submitted,1=Review,2=Processing,3=Final
}

interface Decision {
  kind: "decision";
  id: string;
  status: "APPROVED" | "REJECTED" | "CANCELLED";
  validUntil: string;
  downloadablePdfUrl: string | null;
}

type ApplicationResult = ActiveApplication | Decision | null;

/* ------------------------------------------------------------------ */
/*  API types + mapper                                                   */
/* ------------------------------------------------------------------ */

interface ApiStatusResponse {
  reference_number: string;
  status: string;
  first_name: string;
  last_name: string;
  visa_type_name?: string;
  submitted_at?: string;
  valid_until?: string;
  downloadable_pdf_url?: string | null;
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
  /** 0 = Submitted, 1 = Under Review, 2 = Processing, 3 = Final Decision */
  current_step?: number;
}

function getApiGroupId(data: ApiStatusResponse) {
  if (data.group_id) {
    return data.group_id;
  }

  for (const value of [data.application_group, data.group]) {
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

function resolveDownloadUrl(path?: string | null): string | null {
  if (!path) return null;

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!publicApiUrl) {
    return path;
  }

  try {
    return new URL(path, publicApiUrl).toString();
  } catch {
    return path;
  }
}

function fmtDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const STATUS_STEP_MAP: Record<string, 0 | 1 | 2 | 3> = {
  PENDING: 0,
  SUBMITTED: 0,
  UNDER_REVIEW: 1,
  PROCESSING: 2,
  FINAL_DECISION: 3,
};

function mapApiResponse(data: ApiStatusResponse): ApplicationResult {
  const status = (data.status ?? "").toUpperCase();

  if (
    status === "APPROVED" ||
    status === "REJECTED" ||
    status === "CANCELLED"
  ) {
    return {
      kind: "decision",
      id: data.reference_number,
      status: status as Decision["status"],
      validUntil: fmtDate(data.valid_until),
      downloadablePdfUrl: resolveDownloadUrl(data.downloadable_pdf_url),
    };
  }

  const step: 0 | 1 | 2 | 3 =
    typeof data.current_step === "number"
      ? (Math.min(3, Math.max(0, data.current_step)) as 0 | 1 | 2 | 3)
      : (STATUS_STEP_MAP[status] ?? 1);

  return {
    kind: "active",
    id: data.reference_number,
    groupId: getApiGroupId(data),
    applicant: data.first_name + " " + data.last_name,
    visaType: data.visa_type_name ?? "",
    submissionDate: fmtDate(data.submitted_at),
    status: status === "PENDING" ? "PENDING" : "PROCESSING",
    currentStep: step,
  };
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                     */
/* ------------------------------------------------------------------ */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8 text-[#004E34]"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 text-[#004E34]"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Labels interface                                                     */
/* ------------------------------------------------------------------ */

export interface StatusCheckerLabels {
  form: {
    refLabel: string;
    refPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    checking: string;
  };
  activeApplication: {
    title: string;
    appId: string;
    applicant: string;
    visaType: string;
    submissionDate: string;
    statusPending: string;
    statusProcessing: string;
    statusApproved: string;
    statusRejected: string;
    pendingPaymentTitle: string;
    pendingPaymentDescription: string;
    pendingPaymentButton: string;
    steps: {
      submitted: string;
      underReview: string;
      processing: string;
      finalDecision: string;
      inProgress: string;
      pending: string;
    };
  };
  recentDecisions: {
    title: string;
    appId: string;
    status: string;
    validUntil: string;
    approved: string;
    rejected: string;
    cancelled: string;
    download: string;
    nonApprovedMessage: string;
  };
  help: {
    title: string;
    subtitle: string;
    button: string;
  };
  waitTimes: {
    title: string;
    description: string;
    learnMore: string;
  };
  notFound: {
    title: string;
    subtitle: string;
  };
}

/* ------------------------------------------------------------------ */
/*  Progress step component                                              */
/* ------------------------------------------------------------------ */

const STEPS_KEYS = [
  "submitted",
  "underReview",
  "processing",
  "finalDecision",
] as const;

function ProgressTracker({
  currentStep,
  labels,
}: {
  currentStep: 0 | 1 | 2 | 3;
  labels: StatusCheckerLabels["activeApplication"]["steps"];
}) {
  const stepLabels = [
    labels.submitted,
    labels.underReview,
    labels.processing,
    labels.finalDecision,
  ];

  return (
    <div className="mt-8">
      {/* Desktop layout */}
      <div className="items-start hidden gap-0 sm:flex">
        {stepLabels.map((label, index) => {
          const isDone = index < currentStep;
          const isCurrent = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div
              key={STEPS_KEYS[index]}
              className="flex flex-col items-center flex-1"
            >
              {/* Connector row */}
              <div className="flex items-center w-full">
                {/* Left line */}
                <div
                  className={`flex-1 h-0.5 ${index === 0 ? "invisible" : isDone || isCurrent ? "bg-[#004E34]" : "bg-gray-200"}`}
                />
                {/* Circle */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                    isDone
                      ? "bg-[#004E34] border-[#004E34] text-white"
                      : isCurrent
                        ? "bg-white border-[#004E34] text-[#004E34]"
                        : "bg-white border-gray-200 text-gray-300"
                  }`}
                >
                  {isDone ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : isCurrent ? (
                    <SpinnerIcon />
                  ) : (
                    <span className="text-xs font-semibold">{index + 1}</span>
                  )}
                </div>
                {/* Right line */}
                <div
                  className={`flex-1 h-0.5 ${index === stepLabels.length - 1 ? "invisible" : isDone ? "bg-[#004E34]" : "bg-gray-200"}`}
                />
              </div>

              {/* Label + badge */}
              <div className="px-1 mt-2 text-center">
                <p
                  className={`text-sm font-medium ${isDone || isCurrent ? "text-[#1F2937]" : "text-gray-400"}`}
                >
                  {label}
                </p>
                {isCurrent && (
                  <span className="inline-block mt-1 text-[10px] font-bold tracking-wider bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5">
                    {labels.inProgress}
                  </span>
                )}
                {isPending && (
                  <span className="inline-block mt-1 text-[10px] font-bold tracking-wider bg-gray-50 text-gray-400 rounded-full px-2 py-0.5">
                    {labels.pending}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile layout — vertical */}
      <div className="flex flex-col gap-0 sm:hidden">
        {stepLabels.map((label, index) => {
          const isDone = index < currentStep;
          const isCurrent = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div key={STEPS_KEYS[index]} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                    isDone
                      ? "bg-[#004E34] border-[#004E34] text-white"
                      : isCurrent
                        ? "bg-white border-[#004E34] text-[#004E34]"
                        : "bg-white border-gray-200 text-gray-300"
                  }`}
                >
                  {isDone ? (
                    <CheckIcon className="w-3.5 h-3.5" />
                  ) : isCurrent ? (
                    <SpinnerIcon />
                  ) : (
                    <span className="text-xs font-semibold">{index + 1}</span>
                  )}
                </div>
                {index < stepLabels.length - 1 && (
                  <div
                    className={`w-0.5 h-8 ${isDone ? "bg-[#004E34]" : "bg-gray-200"}`}
                  />
                )}
              </div>
              <div className="pt-1 pb-6">
                <p
                  className={`text-sm font-medium leading-none ${isDone || isCurrent ? "text-[#1F2937]" : "text-gray-400"}`}
                >
                  {label}
                </p>
                {isCurrent && (
                  <span className="inline-block mt-1.5 text-[10px] font-bold tracking-wider bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5">
                    {labels.inProgress}
                  </span>
                )}
                {isPending && (
                  <span className="inline-block mt-1.5 text-[10px] font-bold tracking-wider bg-gray-50 text-gray-400 rounded-full px-2 py-0.5">
                    {labels.pending}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                       */
/* ------------------------------------------------------------------ */

export default function StatusChecker({
  labels,
}: {
  labels: StatusCheckerLabels;
}) {
  const [refNumber, setRefNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<ApplicationResult | "not-found" | null>(
    null,
  );

  const {
    form,
    activeApplication,
    recentDecisions,
    help,
    waitTimes,
    notFound,
  } = labels;

  const decisionBadge =
    result !== "not-found" && result?.kind === "decision"
      ? {
          APPROVED: {
            label: recentDecisions.approved,
            className: "text-emerald-700 bg-emerald-50",
            dotClassName: "bg-emerald-500",
          },
          REJECTED: {
            label: recentDecisions.rejected,
            className: "text-red-700 bg-red-50",
            dotClassName: "bg-red-500",
          },
          CANCELLED: {
            label: recentDecisions.cancelled,
            className: "text-gray-700 bg-gray-100",
            dotClassName: "bg-gray-500",
          },
        }[result.status]
      : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsChecking(true);
    setResult(null);

    try {
      const res = await fetch("/api/check-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference_number: refNumber.trim(),
          email: email.trim(),
        }),
      });

      if (res.status === 404 || res.status === 400) {
        setResult("not-found");
        return;
      }

      if (!res.ok) {
        setResult("not-found");
        return;
      }

      const data: ApiStatusResponse = await res.json();
      setResult(mapApiResponse(data));
    } catch {
      setResult("not-found");
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
      {/* ---- Search form ---- */}
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl sm:p-8"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Ref number */}
          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
              {form.refLabel}
            </label>
            <input
              type="text"
              value={refNumber}
              onChange={(e) => setRefNumber(e.target.value)}
              placeholder={form.refPlaceholder}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#1F2937] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004E34]/30 focus:border-[#004E34] transition-colors"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
              {form.emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={form.emailPlaceholder}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#1F2937] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004E34]/30 focus:border-[#004E34] transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isChecking}
          className="mt-5 w-full sm:w-auto flex items-center justify-center gap-2 bg-[#004E34] hover:bg-[#003322] disabled:opacity-60 text-white font-semibold text-sm px-8 py-3 rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {isChecking ? (
            <>
              <SpinnerIcon />
              {form.checking}
            </>
          ) : (
            <>
              <SearchIcon />
              {form.submit}
            </>
          )}
        </button>
      </form>

      {/* ---- Results ---- */}
      {result && (
        <div className="mt-8 space-y-6">
          {/* Not found */}
          {result === "not-found" && (
            <div className="p-8 text-center bg-white border border-red-100 shadow-sm rounded-2xl">
              <div className="flex items-center justify-center mx-auto mb-4 rounded-full w-14 h-14 bg-red-50">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-500 w-7 h-7"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] mb-2">
                {notFound.title}
              </h3>
              <p className="text-sm text-[#6F7A72]">{notFound.subtitle}</p>
            </div>
          )}

          {/* Active application */}
          {result !== "not-found" && result?.kind === "active" && (
            <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
              {/* Green left border accent */}
              <div className="flex">
                <div className="w-1.5 bg-[#004E34] shrink-0" />
                <div className="flex-1 p-6 sm:p-8">
                  {/* Header row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <h2 className="text-base font-bold text-[#1F2937]">
                      {activeApplication.title}
                    </h2>
                    <span
                      className={`px-3 py-1 text-xs font-bold tracking-wider border rounded-full ${
                        result.status === "PENDING"
                          ? "bg-[#FFF7E8] text-[#9A6700] border-[#F3D38A]"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {result.status === "PENDING"
                        ? activeApplication.statusPending
                        : activeApplication.statusProcessing}
                    </span>
                  </div>

                  {/* Info grid */}
                  <dl className="grid grid-cols-2 pb-6 border-b border-gray-100 sm:grid-cols-4 gap-y-5 gap-x-4">
                    {[
                      { label: activeApplication.appId, value: result.id },
                      {
                        label: activeApplication.applicant,
                        value: result.applicant,
                      },
                      {
                        label: activeApplication.visaType,
                        value: result.visaType,
                      },
                      {
                        label: activeApplication.submissionDate,
                        value: result.submissionDate,
                      },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <dt className="text-[10px] font-bold tracking-wider text-[#6F7A72] uppercase mb-1">
                          {label}
                        </dt>
                        <dd className="text-sm font-semibold text-[#1F2937]">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Progress */}
                  <ProgressTracker
                    currentStep={result.currentStep}
                    labels={activeApplication.steps}
                  />

                  {result.status === "PENDING" && (
                    <div className="mt-8 rounded-2xl border border-[#004E34]/10 bg-[#004E34]/[0.04] p-5 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="max-w-xl">
                          <h3 className="text-sm font-bold text-[#1F2937]">
                            {activeApplication.pendingPaymentTitle}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-[#6F7A72]">
                            {activeApplication.pendingPaymentDescription}
                          </p>
                        </div>

                        <Link
                          href={
                            result.groupId
                              ? `/payment/checkout?group=${encodeURIComponent(result.groupId)}&ref=${encodeURIComponent(result.id)}&method=stripe`
                              : `/payment/checkout?ref=${encodeURIComponent(result.id)}&method=stripe`
                          }
                          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#004E34] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#003322]"
                        >
                          {activeApplication.pendingPaymentButton}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Recent decision */}
          {result !== "not-found" && result?.kind === "decision" && (
            <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="flex">
                <div className="w-1.5 bg-[#004E34] shrink-0" />
                <div className="flex-1 p-6 sm:p-8">
                  {/* Header */}
                  <h2 className="text-base font-bold text-[#1F2937] mb-6">
                    {recentDecisions.title}
                  </h2>

                  {/* Decision row */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    {/* Shield */}
                    <div className="w-14 h-14 rounded-xl bg-[#004E34]/8 flex items-center justify-center shrink-0">
                      <ShieldIcon />
                    </div>

                    {/* Info */}
                    <dl className="flex flex-wrap flex-1 gap-x-8 gap-y-4">
                      <div>
                        <dt className="text-[10px] font-bold tracking-wider text-[#6F7A72] uppercase mb-1">
                          {recentDecisions.appId}
                        </dt>
                        <dd className="text-sm font-semibold text-[#1F2937]">
                          {result.id}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] font-bold tracking-wider text-[#6F7A72] uppercase mb-1">
                          {recentDecisions.status}
                        </dt>
                        <dd>
                          <span
                            className={`inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-3 py-1 ${decisionBadge?.className ?? "text-gray-700 bg-gray-100"}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${decisionBadge?.dotClassName ?? "bg-gray-500"}`}
                            />
                            {decisionBadge?.label ?? result.status}
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] font-bold tracking-wider text-[#6F7A72] uppercase mb-1">
                          {recentDecisions.validUntil}
                        </dt>
                        <dd className="text-sm font-semibold text-[#1F2937]">
                          {result.validUntil || "—"}
                        </dd>
                      </div>
                    </dl>

                    {/* Approved applications can download the visa. Other final
                        states should guide the user toward support instead. */}
                    {result.status === "APPROVED" ? (
                      <a
                        href={result.downloadablePdfUrl ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className={`flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shrink-0 ${
                          result.downloadablePdfUrl
                            ? "bg-[#004E34] hover:bg-[#003322] cursor-pointer"
                            : "bg-[#004E34]/40 cursor-not-allowed pointer-events-none"
                        }`}
                        aria-disabled={!result.downloadablePdfUrl}
                        title={
                          result.downloadablePdfUrl
                            ? recentDecisions.download
                            : "PDF is not available yet."
                        }
                        onClick={(event) => {
                          if (!result.downloadablePdfUrl) {
                            event.preventDefault();
                          }
                        }}
                      >
                        <DownloadIcon className="w-4 h-4" />
                        {recentDecisions.download}
                      </a>
                    ) : (
                      <p className="max-w-xs text-sm leading-relaxed text-[#6F7A72] shrink-0">
                        {recentDecisions.nonApprovedMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom two-col cards */}
          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
            {/* Help card */}
            <div className="bg-[#004E34] rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-lg font-bold leading-snug text-white">
                {help.title}
              </h3>
              <p className="text-[#A7C4B5] text-sm leading-relaxed">
                {help.subtitle}
              </p>
              <div>
                <Link
                  href="/contact-us"
                  className="inline-block bg-white text-[#004E34] hover:bg-gray-50 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
                >
                  {help.button}
                </Link>
              </div>
            </div>

            {/* Wait times card */}
            <div className="flex flex-col gap-4 p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#004E34]/8 flex items-center justify-center shrink-0">
                  <ClockIcon />
                </div>
                <h3 className="text-[#1F2937] font-bold text-lg">
                  {waitTimes.title}
                </h3>
              </div>
              <p className="text-[#6F7A72] text-sm leading-relaxed">
                {waitTimes.description}
              </p>
              <div>
                <Link
                  href="/visa-types"
                  className="text-[#004E34] hover:text-[#003322] font-semibold text-sm inline-flex items-center gap-1 transition-colors"
                >
                  {waitTimes.learnMore}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
