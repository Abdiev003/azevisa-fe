import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/privacy-policy/section-heading";
import { TermsOfUseSidebar } from "@/components/terms-of-service/sidebar";

export const metadata: Metadata = {
  title: "Terms of Service | AzEvisa",
  description:
    "Review AzEvisa's terms of service. By using our platform to apply for an Azerbaijan eVisa, you agree to these terms and conditions.",
  alternates: { canonical: "/terms-of-service" },
  robots: { index: true, follow: false },
};

/* ── icons ─────────────────────────────────────────────── */
function CheckCircleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#004E34"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function BanIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#DC2626"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#004E34"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#004E34"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#004E34"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#004E34"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#004E34"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export default function TermsOfUsePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#6F7A72]">
          <Link href="/" className="hover:text-[#004E34] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#004E34]">Terms of Use</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#004E34] leading-tight">
          Terms of Use
        </h1>
        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
          Last Updated: January 2025
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex gap-12 items-start">
          {/* Sticky Sidebar */}
          <TermsOfUseSidebar />

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-14">
            {/* 01 Acceptance of Terms */}
            <section>
              <SectionHeading
                number="01"
                title="Acceptance of Terms"
                id="acceptance"
              />
              <div className="mt-5 flex flex-col gap-4 text-[#374151] text-sm leading-7">
                <p>
                  By accessing or using the azEvisa platform, you agree to be
                  bound by these Terms of Use and all applicable laws and
                  regulations. If you do not agree with any part of these terms,
                  you may not use our services.
                </p>
                {/* Info banner */}
                <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 flex gap-3">
                  <span className="text-blue-500 shrink-0 mt-0.5">
                    <AlertIcon />
                  </span>
                  <p className="text-sm text-[#374151] leading-6">
                    These terms constitute a legally binding agreement between
                    you and azEvisa. Please read them carefully before
                    submitting any application.
                  </p>
                </div>
              </div>
            </section>

            {/* 02 Eligibility Requirements */}
            <section>
              <SectionHeading
                number="02"
                title="Eligibility Requirements"
                id="eligibility"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                To use our services you must meet the following criteria:
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Be at least 18 years of age or have parental/guardian consent",
                  "Hold a valid passport with a minimum of 6 months validity",
                  "Be a citizen of an eligible country for Azerbaijan e-Visa",
                  "Provide accurate and truthful information throughout the application",
                  "Not be subject to any travel ban to the Republic of Azerbaijan",
                  "Have a valid email address for receiving application updates",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 bg-gray-50 rounded-lg px-4 py-3"
                  >
                    <span className="mt-0.5 shrink-0">
                      <CheckCircleIcon />
                    </span>
                    <p className="text-sm text-[#374151] leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 03 Use of Services */}
            <section>
              <SectionHeading
                number="03"
                title="Use of Services"
                id="services"
              />
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: <FileTextIcon />,
                    label: "Application Submission",
                    text: "Our platform facilitates the submission of your visa application to the official Azerbaijan government portal on your behalf.",
                  },
                  {
                    icon: <CreditCardIcon />,
                    label: "Payment Processing",
                    text: "We securely process payment for both our service fee and the official government visa fee through encrypted payment gateways.",
                  },
                  {
                    icon: <GlobeIcon />,
                    label: "Status Tracking",
                    text: "You may track the real-time status of your application via your account dashboard or through automated email notifications.",
                  },
                ].map(({ icon, label, text }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-3 border border-gray-200 rounded-lg p-5"
                  >
                    <span>{icon}</span>
                    <p className="text-sm font-semibold text-[#1F2937]">
                      {label}
                    </p>
                    <p className="text-sm text-[#6F7A72] leading-6">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 04 Application Process */}
            <section>
              <SectionHeading
                number="04"
                title="Application Process"
                id="application-process"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                The visa application process involves the following steps. Each
                step must be completed accurately to avoid delays or rejection:
              </p>
              <div className="mt-5 flex flex-col gap-0">
                {[
                  {
                    step: "01",
                    title: "Complete the Form",
                    text: "Fill in all required personal and travel details accurately as they appear on your passport.",
                  },
                  {
                    step: "02",
                    title: "Upload Documents",
                    text: "Submit a clear digital photo of your passport bio-data page and a recent passport-sized photograph.",
                  },
                  {
                    step: "03",
                    title: "Pay Fees",
                    text: "Complete payment of the government visa fee plus the azEvisa service fee via a supported payment method.",
                  },
                  {
                    step: "04",
                    title: "Await Decision",
                    text: "The Azerbaijan government typically processes applications within 3 business days. You will be notified by email.",
                  },
                ].map(({ step, title, text }, i, arr) => (
                  <div key={step} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#004E34] text-white text-xs font-bold shrink-0">
                        {step}
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-px flex-1 bg-[#004E34]/20 my-1" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-sm font-semibold text-[#1F2937] mb-1">
                        {title}
                      </p>
                      <p className="text-sm text-[#6F7A72] leading-6">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 05 Fees and Payments */}
            <section>
              <SectionHeading
                number="05"
                title="Fees and Payments"
                id="fees-payments"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                All fees are displayed in USD and are non-negotiable. The total
                amount charged includes:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#94A3B8] border border-gray-200">
                        Fee Type
                      </th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#94A3B8] border border-gray-200">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#94A3B8] border border-gray-200">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        type: "Government Visa Fee",
                        amount: "$26.00",
                        notes: "Paid directly to the Republic of Azerbaijan",
                      },
                      {
                        type: "azEvisa Service Fee",
                        amount: "$9.99",
                        notes: "Charged for facilitation and support",
                      },
                      {
                        type: "Express Processing",
                        amount: "$19.99",
                        notes: "Optional — guarantees 24h turnaround",
                      },
                    ].map(({ type, amount, notes }) => (
                      <tr key={type} className="border-b border-gray-100">
                        <td className="px-4 py-3 text-[#1F2937] font-medium border border-gray-200">
                          {type}
                        </td>
                        <td className="px-4 py-3 text-[#004E34] font-bold border border-gray-200">
                          {amount}
                        </td>
                        <td className="px-4 py-3 text-[#6F7A72] border border-gray-200">
                          {notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 06 Refund Policy */}
            <section>
              <SectionHeading
                number="06"
                title="Refund Policy"
                id="refund-policy"
              />
              <div className="mt-5 flex flex-col gap-3">
                {[
                  {
                    title: "Service Fee — Eligible for Refund",
                    text: "The azEvisa service fee may be refunded if your application has not yet been submitted to the government portal.",
                    eligible: true,
                  },
                  {
                    title: "Government Fee — Non-Refundable",
                    text: "Once the government visa fee has been transmitted to the Republic of Azerbaijan authorities, it cannot be refunded under any circumstances.",
                    eligible: false,
                  },
                  {
                    title: "Rejected Applications",
                    text: "In the event of a government rejection, the azEvisa service fee will be refunded within 5–7 business days. The government fee is not recoverable.",
                    eligible: true,
                  },
                ].map(({ title, text, eligible }) => (
                  <div
                    key={title}
                    className={`flex items-start gap-4 rounded-lg px-5 py-4 border ${eligible ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                  >
                    <span className="mt-0.5 shrink-0">
                      {eligible ? <CheckCircleIcon /> : <BanIcon />}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#1F2937] mb-0.5">
                        {title}
                      </p>
                      <p className="text-sm text-[#6F7A72] leading-6">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 07 User Obligations */}
            <section>
              <SectionHeading
                number="07"
                title="User Obligations"
                id="user-obligations"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                By using our platform, you agree to the following obligations:
              </p>
              <div className="mt-4 bg-[#003322] rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  "Provide truthful, accurate, and complete information at all times",
                  "Keep your account credentials confidential and secure",
                  "Notify us immediately of any unauthorized access to your account",
                  "Comply with all applicable laws and visa requirements",
                  "Not use the platform for any fraudulent or illegal purpose",
                  "Not attempt to interfere with the platform's normal operation",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] shrink-0 mt-2" />
                    <p className="text-sm text-[#94A3B8] leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 08 Prohibited Activities */}
            <section>
              <SectionHeading
                number="08"
                title="Prohibited Activities"
                id="prohibited"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                The following activities are strictly prohibited on our
                platform:
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Submitting false or fraudulent passport/identity information",
                  "Creating multiple accounts for a single applicant",
                  "Reverse engineering or scraping the platform",
                  "Reselling or redistributing our services without authorization",
                  "Uploading malware, viruses, or malicious content",
                  "Attempting to bypass payment or security systems",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 border border-red-100 bg-red-50 rounded-lg px-4 py-3"
                  >
                    <span className="shrink-0 mt-0.5">
                      <BanIcon />
                    </span>
                    <p className="text-sm text-[#374151] leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 09 Intellectual Property */}
            <section>
              <SectionHeading
                number="09"
                title="Intellectual Property"
                id="intellectual-property"
              />
              <div className="mt-4 flex flex-col gap-4 text-[#6F7A72] text-sm leading-7">
                <p>
                  All content on the azEvisa platform — including but not
                  limited to text, graphics, logos, button icons, images, and
                  software — is the exclusive property of azEvisa and is
                  protected by applicable intellectual property laws.
                </p>
                <p>
                  You are granted a limited, non-exclusive, non-transferable
                  license to access and use the platform solely for the purpose
                  of submitting a personal visa application. Any other use
                  without prior written consent is strictly prohibited.
                </p>
              </div>
            </section>

            {/* 10 Limitation of Liability */}
            <section>
              <SectionHeading
                number="10"
                title="Limitation of Liability"
                id="liability"
              />
              <div className="mt-5 border border-amber-300 bg-amber-50 rounded-lg p-5 flex gap-3">
                <span className="text-amber-500 shrink-0 mt-0.5">
                  <AlertIcon />
                </span>
                <div className="flex flex-col gap-3 text-sm text-[#374151] leading-7">
                  <p>
                    azEvisa acts as a facilitator and is not responsible for
                    decisions made by the Republic of Azerbaijan immigration
                    authorities. We do not guarantee visa approval.
                  </p>
                  <p>
                    Our liability is limited to the total service fees paid to
                    azEvisa. We shall not be liable for any indirect,
                    incidental, special, or consequential damages arising from
                    your use of the platform or the outcome of your visa
                    application.
                  </p>
                </div>
              </div>
            </section>

            {/* 11 Governing Law */}
            <section>
              <SectionHeading
                number="11"
                title="Governing Law"
                id="governing-law"
              />
              <div className="mt-4 flex flex-col gap-4 text-[#6F7A72] text-sm leading-7">
                <p>
                  These Terms of Use shall be governed by and construed in
                  accordance with the laws of the Republic of Azerbaijan,
                  without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising out of or relating to these terms shall
                  be subject to the exclusive jurisdiction of the courts of
                  Baku, Azerbaijan. You consent to personal jurisdiction in such
                  courts and waive any objection to the exercise of such
                  jurisdiction.
                </p>
              </div>
            </section>

            {/* 12 Contact Us */}
            <section>
              <SectionHeading number="12" title="Contact Us" id="contact" />
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-4">
                    Direct Support
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="mailto:legal@eviza.azerbaijan.com"
                      className="flex items-center gap-2 text-sm text-[#004E34] hover:underline"
                    >
                      <MailIcon />
                      legal@eviza.azerbaijan.com
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm text-[#004E34] hover:underline"
                    >
                      <ExternalLinkIcon />
                      Open Contact Form
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-4">
                    Mailing Address
                  </p>
                  <address className="not-italic text-sm text-[#6F7A72] leading-6">
                    azEvisa Legal Department
                    <br />
                    12 Niyami Street
                    <br />
                    Baku, AZ1001
                    <br />
                    Republic of Azerbaijan
                  </address>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
