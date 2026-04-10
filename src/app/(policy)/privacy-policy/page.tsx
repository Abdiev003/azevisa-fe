import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/privacy-policy/section-heading";
import { PrivacyPolicySidebar } from "@/components/privacy-policy/sidebar";

export const metadata: Metadata = {
  title: "Privacy Policy | AzEvisa",
  description:
    "Read AzEvisa's privacy policy to understand how we collect, use and protect your personal data when you apply for an Azerbaijan eVisa.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: false },
};

/* ── tiny inline icons ─────────────────────────────────── */
function LockIcon() {
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ShieldCheckIcon() {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}

function LockWhiteIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6F7A72"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6F7A72"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6F7A72"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6F7A72"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
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

function MapPinIcon() {
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
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

/* ── Letter badges for GDPR rights ─────────────────────── */
function RightBadge({ letter }: { letter: string }) {
  return (
    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#004E34]/10 text-[#004E34] text-xs font-bold shrink-0 mt-0.5">
      {letter}
    </span>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#6F7A72]">
          <Link href="/" className="hover:text-[#004E34] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#004E34]">Privacy Policy</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl px-6 pt-10 pb-8 mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#004E34] leading-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
          Last Updated: October 2024
        </p>
      </div>

      <div className="max-w-6xl px-6 pb-20 mx-auto">
        <div className="flex items-start gap-12">
          {/* Sticky Sidebar */}
          <PrivacyPolicySidebar />

          {/* Content */}
          <div className="flex flex-col flex-1 min-w-0 gap-14">
            {/* 01 Introduction */}
            <section>
              <SectionHeading
                number="01"
                title="Introduction"
                id="introduction"
              />
              <div className="mt-5 flex flex-col gap-4 text-[#374151] text-sm leading-7">
                <p>
                  Welcome to eViza Azerbaijan. This Privacy Policy describes how
                  our online visa service collects, uses, and protects your
                  personal data when you use our platform to apply for an
                  official electronic visa for the Republic of Azerbaijan.
                </p>
                <p>
                  We act as a specialized facilitator, ensuring your application
                  meets all government requirements. This policy covers all
                  digital interactions across our website, mobile interface, and
                  communication channels.
                </p>
              </div>
            </section>

            {/* 02 Information We Collect */}
            <section>
              <SectionHeading
                number="02"
                title="Information We Collect"
                id="information-we-collect"
              />
              <div className="flex flex-col gap-4 mt-5">
                {/* Two white cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="p-5 border border-gray-200 rounded-lg">
                    <p className="text-sm font-semibold text-[#1F2937] mb-3">
                      Personal Identity
                    </p>
                    <ul className="flex flex-col gap-1.5 text-sm text-[#6F7A72]">
                      {[
                        "Full Name and Gender",
                        "Date and Place of Birth",
                        "Current Nationality",
                        "Email and Phone Number",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#94A3B8] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 border border-gray-200 rounded-lg">
                    <p className="text-sm font-semibold text-[#1F2937] mb-3">
                      Travel &amp; Documentation
                    </p>
                    <ul className="flex flex-col gap-1.5 text-sm text-[#6F7A72]">
                      {[
                        "Passport Number & Issue/Expiry Dates",
                        "Digital Passport Photo",
                        "Intended Arrival Date",
                        "Azerbaijan Accommodation Address",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#94A3B8] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Amber payment card */}
                <div className="flex gap-3 p-5 border rounded-lg border-amber-300 bg-amber-50">
                  <span className="text-amber-500 mt-0.5 shrink-0">
                    <LockIcon />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1F2937] mb-1">
                      Payment Information
                    </p>
                    <p className="text-sm text-[#6F7A72] leading-6">
                      All transactions are processed via Stripe or PayPal. We do
                      not store full credit card details on our servers only
                      secure tokens provided by our payment partners are
                      maintained for transaction verification.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 03 How We Use Your Information */}
            <section>
              <SectionHeading
                number="03"
                title="How We Use Your Information"
                id="how-we-use"
              />
              <div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-3">
                {[
                  {
                    label: "Operation",
                    color: "text-[#004E34]",
                    text: "Processing and submitting your official visa application to the relevant authorities.",
                  },
                  {
                    label: "Communication",
                    color: "text-blue-600",
                    text: "Sending real-time application status updates and necessary visa documentation via email.",
                  },
                  {
                    label: "Analytics",
                    color: "text-purple-600",
                    text: "Optimizing website performance and user journey through anonymized behavioral data.",
                  },
                ].map(({ label, color, text }) => (
                  <div key={label}>
                    <p
                      className={`text-xs font-bold uppercase tracking-widest mb-2 ${color}`}
                    >
                      {label}
                    </p>
                    <p className="text-sm text-[#6F7A72] leading-6">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 04 Legal Basis for Processing */}
            <section>
              <SectionHeading
                number="04"
                title="Legal Basis for Processing"
                id="legal-basis"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                Under the General Data Protection Regulation (GDPR), we process
                your data based on:
              </p>
              <div className="flex flex-col gap-3 mt-4">
                {[
                  {
                    title: "Contractual Necessity",
                    text: "We need your data to fulfill our contract with you – providing the visa application service you requested.",
                  },
                  {
                    title: "Legal Obligations",
                    text: "Compliance with international travel regulations and reporting requirements to the Azerbaijan Immigration authorities.",
                  },
                ].map(({ title, text }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 px-5 py-4 rounded-lg bg-gray-50"
                  >
                    <span className="mt-0.5 shrink-0">
                      <ShieldCheckIcon />
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

            {/* 05 Data Storage and Security */}
            <section>
              <SectionHeading
                number="05"
                title="Data Storage and Security"
                id="data-storage"
              />
              <div className="mt-5 bg-[#003322] rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <span className="shrink-0 mt-0.5">
                    <LockWhiteIcon />
                  </span>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-white">
                      Military-Grade Encryption
                    </p>
                    <p className="text-[#94A3B8] text-xs leading-5">
                      Data is hosted on secure Amazon Web Services. All personal
                      and sensitive fields are encrypted using AES-256 protocols
                      at rest.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="shrink-0 mt-0.5">
                    <CloudIcon />
                  </span>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-white">
                      Secure Cloud Hosting
                    </p>
                    <p className="text-[#94A3B8] text-xs leading-5">
                      Data is hosted on secure Amazon Web Services (AWS) nodes
                      with global compliance certifications.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 06 Sharing Your Information */}
            <section>
              <SectionHeading
                number="06"
                title="Sharing Your Information"
                id="sharing"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                We strictly share information with third parties only as
                necessary to provide our services:
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-4">
                {[
                  { icon: <CreditCardIcon />, label: "Stripe/PayPal" },
                  { icon: <SendIcon />, label: "Sendbird" },
                  { icon: <BarChartIcon />, label: "Google Analytics" },
                  { icon: <BuildingIcon />, label: "Government" },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 px-3 py-5 border border-gray-200 rounded-lg"
                  >
                    {icon}
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#6F7A72] text-center">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 07 Cookies and Tracking */}
            <section>
              <SectionHeading
                number="07"
                title="Cookies and Tracking"
                id="cookies"
              />
              <div className="flex flex-col gap-3 mt-5">
                {[
                  {
                    title: "Essential Cookies",
                    text: "Necessary for site functionality and security.",
                    badge: "Always On",
                    badgeClass: "bg-[#004E34] text-white",
                  },
                  {
                    title: "Analytics & Performance",
                    text: "Help us analyze and improve the interface.",
                    badge: "User Choice",
                    badgeClass: "bg-gray-200 text-[#374151]",
                  },
                ].map(({ title, text, badge, badgeClass }) => (
                  <div
                    key={title}
                    className="flex items-center justify-between gap-4 px-5 py-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#1F2937]">
                        {title}
                      </p>
                      <p className="text-xs text-[#6F7A72] mt-0.5">{text}</p>
                    </div>
                    <span
                      className={`shrink-0 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full ${badgeClass}`}
                    >
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 08 Your Rights Under GDPR */}
            <section>
              <SectionHeading
                number="08"
                title="Your Rights Under GDPR"
                id="your-rights"
              />
              <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2">
                {[
                  {
                    letter: "A",
                    title: "Right to Access",
                    text: "Request a copy of all personal data we hold about you.",
                  },
                  {
                    letter: "E",
                    title: "Right to Erasure",
                    text: "Request the deletion of your data once the visa is processed.",
                  },
                  {
                    letter: "P",
                    title: "Data Portability",
                    text: "Obtain and reuse your data for your own purposes.",
                  },
                  {
                    letter: "R",
                    title: "Right to Rectification",
                    text: "Correct any inaccurate or incomplete personal information.",
                  },
                ].map(({ letter, title, text }) => (
                  <div key={title} className="flex items-start gap-3">
                    <RightBadge letter={letter} />
                    <div>
                      <p className="text-sm font-semibold text-[#1F2937]">
                        {title}
                      </p>
                      <p className="text-xs text-[#6F7A72] mt-0.5 leading-5">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 09 International Data Transfers */}
            <section>
              <SectionHeading
                number="09"
                title="International Data Transfers"
                id="data-transfers"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                We serve travelers from over 70+ countries. By using our
                service, you acknowledge that your data will be transferred to
                the Republic of Azerbaijan for visa adjudication. We use
                Standard Contractual Clauses (SCCs) and robust encryption to
                ensure your data remains protected during transit.
              </p>
            </section>

            {/* 10 Children's Privacy */}
            <section>
              <SectionHeading
                number="10"
                title="Children's Privacy"
                id="childrens-privacy"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                Our services are not intended for individuals under 18 years of
                age. Visa applications for minors must be submitted by a parent
                or legal guardian who consents to the processing of the
                minor&apos;s data.
              </p>
            </section>

            {/* 11 Changes to This Policy */}
            <section>
              <SectionHeading
                number="11"
                title="Changes to This Policy"
                id="policy-changes"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                We may update this policy periodically. Significant changes will
                be notified by the email address associated with your latest
                application or through a prominent notice on our website
                homepage.
              </p>
            </section>

            {/* 12 Contact Us */}
            <section>
              <SectionHeading number="12" title="Contact Us" id="contact" />
              <div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-4">
                    Direct Support
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="mailto:privacy@eviza.azerbaijan.com"
                      className="flex items-center gap-2 text-sm text-[#004E34] hover:underline"
                    >
                      <MailIcon />
                      privacy@eviza.azerbaijan.com
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
                    Office Location
                  </p>
                  <div className="flex items-start gap-2 text-sm text-[#6F7A72]">
                    <span className="mt-0.5 shrink-0">
                      <MapPinIcon />
                    </span>
                    <address className="not-italic leading-6">
                      12 Niyami Street,
                      <br />
                      Baku, AZ1001
                      <br />
                      Republic of Azerbaijan
                    </address>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
