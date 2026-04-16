import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import StatusChecker, {
  type StatusCheckerLabels,
} from "@/components/check-status/status-checker";

export const metadata: Metadata = {
  title: "Check Azerbaijan eVisa Application Status",
  description:
    "Track the real-time status of your Azerbaijan eVisa application. Enter your reference number and email address to check processing progress instantly.",
  keywords: [
    "check Azerbaijan visa status",
    "eVisa application status",
    "Azerbaijan visa tracking",
    "ASAN Visa status",
  ],
  alternates: { canonical: "/check-status" },
  openGraph: {
    url: "/check-status",
    title: "Check Azerbaijan eVisa Application Status",
    description:
      "Track your Azerbaijan eVisa application in real time. Enter your reference number to check status.",
  },
  twitter: {
    title: "Check Azerbaijan eVisa Application Status",
    description:
      "Track your Azerbaijan eVisa application in real time. Enter your reference number to check status.",
  },
};

export default async function CheckStatusPage() {
  const t = await getTranslations("CheckStatus");

  const labels: StatusCheckerLabels = {
    form: {
      refLabel: t("form.refLabel"),
      refPlaceholder: t("form.refPlaceholder"),
      emailLabel: t("form.emailLabel"),
      emailPlaceholder: t("form.emailPlaceholder"),
      submit: t("form.submit"),
      checking: t("form.checking"),
    },
    activeApplication: {
      title: t("activeApplication.title"),
      appId: t("activeApplication.appId"),
      applicant: t("activeApplication.applicant"),
      visaType: t("activeApplication.visaType"),
      submissionDate: t("activeApplication.submissionDate"),
      statusProcessing: t("activeApplication.statusProcessing"),
      statusApproved: t("activeApplication.statusApproved"),
      statusRejected: t("activeApplication.statusRejected"),
      steps: {
        submitted: t("activeApplication.steps.submitted"),
        underReview: t("activeApplication.steps.underReview"),
        processing: t("activeApplication.steps.processing"),
        finalDecision: t("activeApplication.steps.finalDecision"),
        inProgress: t("activeApplication.steps.inProgress"),
        pending: t("activeApplication.steps.pending"),
      },
    },
    recentDecisions: {
      title: t("recentDecisions.title"),
      appId: t("recentDecisions.appId"),
      status: t("recentDecisions.status"),
      validUntil: t("recentDecisions.validUntil"),
      approved: t("recentDecisions.approved"),
      rejected: t("recentDecisions.rejected"),
      cancelled: t("recentDecisions.cancelled"),
      download: t("recentDecisions.download"),
      nonApprovedMessage: t("recentDecisions.nonApprovedMessage"),
    },
    help: {
      title: t("help.title"),
      subtitle: t("help.subtitle"),
      button: t("help.button"),
    },
    waitTimes: {
      title: t("waitTimes.title"),
      description: t("waitTimes.description"),
      learnMore: t("waitTimes.learnMore"),
    },
    notFound: {
      title: t("notFound.title"),
      subtitle: t("notFound.subtitle"),
    },
  };

  return (
    <main className="bg-[#F8F9FA] min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-3xl px-4 mx-auto text-center sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] leading-tight mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-[#6F7A72] text-base sm:text-lg max-w-xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Checker */}
      <section className="py-10 sm:py-16">
        <StatusChecker labels={labels} />
      </section>
    </main>
  );
}
