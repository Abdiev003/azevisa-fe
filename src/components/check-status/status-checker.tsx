"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                                */
/* ------------------------------------------------------------------ */

type AppStatus = "PROCESSING" | "APPROVED" | "REJECTED";

interface ActiveApplication {
  kind: "active";
  id: string;
  applicant: string;
  visaType: string;
  submissionDate: string;
  status: AppStatus;
  currentStep: 0 | 1 | 2 | 3; // 0=Submitted,1=Review,2=Processing,3=Final
}

interface Decision {
  kind: "decision";
  id: string;
  status: "APPROVED" | "REJECTED";
  validUntil: string;
}

type ApplicationResult = ActiveApplication | Decision | null;

/* ------------------------------------------------------------------ */
/*  Mock data                                                            */
/* ------------------------------------------------------------------ */

const MOCK_DATA: Record<string, ApplicationResult> = {
  "AZ-2024-88921": {
    kind: "active",
    id: "AZ-2024-88921",
    applicant: "Alexander Mitchell",
    visaType: "Tourist eVisa",
    submissionDate: "14 Jun 2025",
    status: "PROCESSING",
    currentStep: 2,
  },
  "AZ-2024-88004": {
    kind: "decision",
    id: "AZ-2024-88004",
    status: "APPROVED",
    validUntil: "14 Dec 2025",
  },
};

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
    statusProcessing: string;
    statusApproved: string;
    statusRejected: string;
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
    download: string;
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsChecking(true);
    setResult(null);

    // Simulate async lookup
    setTimeout(() => {
      const normalised = refNumber.trim().toUpperCase();
      const found = MOCK_DATA[normalised] ?? null;
      setResult(found ?? "not-found");
      setIsChecking(false);
    }, 900);
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
                    <span className="px-3 py-1 text-xs font-bold tracking-wider border rounded-full bg-amber-50 text-amber-700 border-amber-200">
                      {activeApplication.statusProcessing}
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
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-full px-3 py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            {recentDecisions.approved}
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] font-bold tracking-wider text-[#6F7A72] uppercase mb-1">
                          {recentDecisions.validUntil}
                        </dt>
                        <dd className="text-sm font-semibold text-[#1F2937]">
                          {result.validUntil}
                        </dd>
                      </div>
                    </dl>

                    {/* Download */}
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-[#004E34] hover:bg-[#003322] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      <DownloadIcon className="w-4 h-4" />
                      {recentDecisions.download}
                    </button>
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
