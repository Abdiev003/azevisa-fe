import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/privacy-policy/section-heading";
import { RefundPolicySidebar } from "@/components/refund-policy/sidebar";
import {
  AlertIcon,
  BanIcon,
  CheckCircleIcon,
  ClockIcon,
  ExternalLinkIcon,
  MailIcon,
  RefreshIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Refund Policy | AzEvisa",
  description:
    "Understand AzEvisa's refund policy for Azerbaijan eVisa applications. Learn about eligibility, timelines and how to request a refund.",
  alternates: { canonical: "/refund-policy" },
  robots: { index: true, follow: false },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#6F7A72]">
          <Link href="/" className="hover:text-[#004E34] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#004E34]">Refund Policy</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl px-6 pt-10 pb-8 mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#004E34] leading-tight">
          Refund Policy
        </h1>
        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
          Last Updated: March 2025
        </p>
      </div>

      <div className="max-w-6xl px-6 pb-20 mx-auto">
        <div className="flex items-start gap-12">
          <RefundPolicySidebar />

          <div className="flex flex-col flex-1 min-w-0 gap-14">
            {/* 01 Overview */}
            <section>
              <SectionHeading number="01" title="Overview" id="overview" />
              <div className="mt-5 flex flex-col gap-4 text-[#374151] text-sm leading-7">
                <p>
                  At azEvisa, we strive to make every visa application
                  experience as smooth as possible. This Refund Policy outlines
                  the circumstances under which refunds are issued for our
                  service fees and the official government visa fee.
                </p>
                <div className="flex gap-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <span className="text-blue-500 shrink-0 mt-0.5">
                    <AlertIcon />
                  </span>
                  <p className="text-sm text-[#374151] leading-6">
                    Please read this policy carefully before submitting your
                    application. By using our services, you agree to the terms
                    outlined below.
                  </p>
                </div>
              </div>
            </section>

            {/* 02 Service Fee Refunds */}
            <section>
              <SectionHeading
                number="02"
                title="Service Fee Refunds"
                id="service-fee-refunds"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                The azEvisa service fee may be eligible for a refund depending
                on the stage of your application:
              </p>
              <div className="flex flex-col gap-3 mt-4">
                {[
                  {
                    title: "Before Submission — Full Refund",
                    text: "If you cancel your application before it has been submitted to the Azerbaijan government portal, you are entitled to a full refund of the azEvisa service fee.",
                    eligible: true,
                  },
                  {
                    title: "After Submission — No Refund",
                    text: "Once your application has been submitted to the government portal, the service fee is non-refundable as the facilitation work has been completed.",
                    eligible: false,
                  },
                  {
                    title: "Technical Errors — Full Refund",
                    text: "If a technical error on our platform prevents successful submission of your application, you are entitled to a full refund of all fees charged by azEvisa.",
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

            {/* 03 Government Fee */}
            <section>
              <SectionHeading
                number="03"
                title="Government Fee"
                id="government-fee"
              />
              <div className="flex gap-3 p-5 mt-5 border rounded-lg border-amber-300 bg-amber-50">
                <span className="text-amber-500 shrink-0 mt-0.5">
                  <AlertIcon />
                </span>
                <div className="flex flex-col gap-3 text-sm text-[#374151] leading-7">
                  <p>
                    The official government visa fee ($26.00) is paid directly
                    to the Republic of Azerbaijan immigration authorities upon
                    submission of your application.{" "}
                    <strong>This fee is strictly non-refundable</strong> under
                    all circumstances, including application withdrawal,
                    rejection, or change of travel plans.
                  </p>
                  <p>
                    azEvisa has no authority to recover or refund government
                    fees once they have been transmitted to the relevant
                    authorities.
                  </p>
                </div>
              </div>
            </section>

            {/* 04 Rejected Applications */}
            <section>
              <SectionHeading
                number="04"
                title="Rejected Applications"
                id="rejected-applications"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                In the event that your visa application is rejected by the
                Azerbaijan government:
              </p>
              <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                {[
                  {
                    icon: <CheckCircleIcon />,
                    title: "azEvisa Service Fee",
                    text: "Fully refunded within 5–7 business days to your original payment method.",
                    refundable: true,
                  },
                  {
                    icon: <BanIcon />,
                    title: "Government Visa Fee",
                    text: "Non-refundable. The government does not return fees for rejected applications.",
                    refundable: false,
                  },
                  {
                    icon: <CheckCircleIcon />,
                    title: "Express Processing Fee",
                    text: "Refunded if the rejection occurs before the express processing window has elapsed.",
                    refundable: true,
                  },
                  {
                    icon: <BanIcon />,
                    title: "Third-Party Charges",
                    text: "Any charges incurred from your bank or payment provider are outside our control and non-refundable.",
                    refundable: false,
                  },
                ].map(({ icon, title, text, refundable }) => (
                  <div
                    key={title}
                    className={`flex items-start gap-3 border rounded-lg px-4 py-4 ${refundable ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                  >
                    <span className="mt-0.5 shrink-0">{icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#1F2937] mb-0.5">
                        {title}
                      </p>
                      <p className="text-xs text-[#6F7A72] leading-5">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 05 Cancellation Policy */}
            <section>
              <SectionHeading
                number="05"
                title="Cancellation Policy"
                id="cancellation"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                You may cancel your application at any time. The refund
                eligibility depends on the application stage at the time of
                cancellation:
              </p>
              <div className="flex flex-col gap-0 mt-5">
                {[
                  {
                    step: "01",
                    title: "Draft Stage",
                    text: "Application created but not yet paid — no charge applies, cancel freely.",
                  },
                  {
                    step: "02",
                    title: "Paid, Awaiting Submission",
                    text: "Full refund of service fee available. Government fee refund not applicable as payment is pending transfer.",
                  },
                  {
                    step: "03",
                    title: "Submitted to Government",
                    text: "Service fee is non-refundable. Government fee has been transmitted and cannot be recovered.",
                  },
                  {
                    step: "04",
                    title: "Decision Issued",
                    text: "No refunds available once a visa decision (approved or rejected) has been issued by the authorities.",
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

            {/* 06 Refund Process */}
            <section>
              <SectionHeading
                number="06"
                title="Refund Process"
                id="refund-process"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                To request a refund, follow these steps:
              </p>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                {[
                  {
                    icon: <MailIcon />,
                    label: "Submit Request",
                    text: "Email our support team at refunds@eviza.azerbaijan.com with your application reference number and reason for refund.",
                  },
                  {
                    icon: <ClockIcon />,
                    label: "Review Period",
                    text: "Our team will review your request within 2 business days and confirm eligibility based on this policy.",
                  },
                  {
                    icon: <RefreshIcon />,
                    label: "Refund Issued",
                    text: "Approved refunds are processed back to your original payment method within the applicable timeframe.",
                  },
                ].map(({ icon, label, text }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-3 p-5 border border-gray-200 rounded-lg"
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

            {/* 07 Timeframes */}
            <section>
              <SectionHeading number="07" title="Timeframes" id="timeframes" />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                Once a refund is approved, the time it takes to appear in your
                account depends on your payment method:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-left bg-gray-50">
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#94A3B8] border border-gray-200">
                        Payment Method
                      </th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#94A3B8] border border-gray-200">
                        Estimated Timeframe
                      </th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#94A3B8] border border-gray-200">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        method: "Credit / Debit Card",
                        timeframe: "5–7 business days",
                        notes: "Depends on your card issuer's processing time",
                      },
                      {
                        method: "PayPal",
                        timeframe: "3–5 business days",
                        notes: "Refunded directly to your PayPal balance",
                      },
                      {
                        method: "Apple Pay / Google Pay",
                        timeframe: "5–10 business days",
                        notes: "Routed back through the original card",
                      },
                      {
                        method: "Bank Transfer",
                        timeframe: "7–14 business days",
                        notes: "International transfers may take longer",
                      },
                    ].map(({ method, timeframe, notes }) => (
                      <tr key={method} className="border-b border-gray-100">
                        <td className="px-4 py-3 text-[#1F2937] font-medium border border-gray-200">
                          {method}
                        </td>
                        <td className="px-4 py-3 text-[#004E34] font-bold border border-gray-200">
                          {timeframe}
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

            {/* 08 Exceptions */}
            <section>
              <SectionHeading number="08" title="Exceptions" id="exceptions" />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                The following situations are considered exceptional and will be
                reviewed on a case-by-case basis by our support team:
              </p>
              <div className="mt-4 bg-[#003322] rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  "Serious illness or medical emergency of the applicant, supported by documentation",
                  "Death of an immediate family member requiring cancellation of travel",
                  "Natural disaster or government-issued travel ban affecting the destination",
                  "Duplicate charges caused by a platform or payment gateway error",
                  "Applications submitted fraudulently using stolen identity or payment details",
                  "Force majeure events beyond the control of either party",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] shrink-0 mt-2" />
                    <p className="text-sm text-[#94A3B8] leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 09 Contact Us */}
            <section>
              <SectionHeading number="09" title="Contact Us" id="contact" />
              <div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-4">
                    Refund Support
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="mailto:refunds@eviza.azerbaijan.com"
                      className="flex items-center gap-2 text-sm text-[#004E34] hover:underline"
                    >
                      <MailIcon />
                      refunds@eviza.azerbaijan.com
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm text-[#004E34] hover:underline"
                    >
                      <ExternalLinkIcon />
                      Open Refund Request Form
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-4">
                    Mailing Address
                  </p>
                  <address className="not-italic text-sm text-[#6F7A72] leading-6">
                    azEvisa Support Team
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
