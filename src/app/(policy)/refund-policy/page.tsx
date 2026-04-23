import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/privacy-policy/section-heading";
import { RefundPolicySidebar } from "@/components/refund-policy/sidebar";

export const metadata: Metadata = {
  title: "Refund Policy | AzEvisa",
  description:
    "Understand when AzEvisa.az fees may be refundable, which charges are non-refundable, and how to request a refund for your Azerbaijan e-Visa assistance order.",
  alternates: { canonical: "/refund-policy" },
  robots: { index: true, follow: false },
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-3 pl-6 text-base leading-7 text-[#52615A] marker:text-[#004E34]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Subsection({
  title,
  items,
  children,
}: {
  title: string;
  items?: string[];
  children?: ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-[#E7ECE9] bg-[#FAFCFB] p-6">
      <h3 className="text-lg font-semibold text-[#004E34]">{title}</h3>
      {items ? <BulletList items={items} /> : children}
    </div>
  );
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-wide text-[#6F7A72]">
          <Link href="/" className="transition-colors hover:text-[#004E34]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#004E34]">Refund Policy</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-8 pt-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7E8B84]">
          AzEvisa.az
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-[#004E34] md:text-5xl">
          Refund Policy
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#52615A]">
          Understanding your rights regarding fees, refunds, and refund request
          procedures when using our visa application assistance services.
        </p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
          Effective Date: April 18, 2026
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-start gap-12">
          <RefundPolicySidebar />

          <div className="flex min-w-0 flex-1 flex-col gap-14">
            <section className="rounded-3xl border border-[#E7ECE9] bg-[#F7FAF8] p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7E8B84]">
                www.azevisa.az
              </p>
              <p className="mt-4 text-base leading-8 text-[#52615A]">
                This Refund Policy explains the circumstances under which
                refunds may or may not be issued for our visa application
                assistance services. By using our services and making a
                payment, you acknowledge that you have read and understood this
                policy.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading number="01" title="Overview" id="overview" />
              <p className="text-base leading-8 text-[#52615A]">
                Thank you for choosing AzEvisa.az. Please read this policy
                carefully before submitting your application, as it explains
                when fees are refundable, when they are not, and how refund
                requests are handled.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="02"
                title="Composition of Our Fees"
                id="composition-of-fees"
              />
              <p className="text-base leading-8 text-[#52615A]">
                The total fee charged by us upon submission of your application
                consists of two components:
              </p>
              <BulletList
                items={[
                  "Government / Authority Fee: the fee charged by the relevant Azerbaijani authorities for processing your e-Visa application. This fee is collected on your behalf and remitted directly to the authorities.",
                  "Service / Administration Fee: our fee for providing you with assistance, form review, submission, and support services.",
                ]}
              />
              <p className="text-base leading-8 text-[#52615A]">
                Both components are displayed transparently at the time of
                payment.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="03"
                title="Non-Refundable Fees"
                id="non-refundable-fees"
              />

              <div className="grid gap-5">
                <Subsection
                  title="3.1 Government Fee"
                  items={[
                    "Your visa application is refused or rejected by the Azerbaijani authorities",
                    "You decide to withdraw your application after it has been submitted",
                    "You change your travel plans or decide not to travel",
                    "Your application is submitted with incorrect information provided by you",
                  ]}
                >
                  <p className="text-base leading-8 text-[#52615A]">
                    The government visa fee is non-refundable in all cases.
                    Once the government fee is remitted to the authorities on
                    your behalf, it cannot be recovered regardless of the
                    outcome.
                  </p>
                </Subsection>
                <Subsection
                  title="3.2 Service Fee – After Submission"
                  items={[
                    "Your visa application is refused",
                    "Your travel plans change after submission",
                    "You decide you no longer wish to travel to Azerbaijan",
                  ]}
                >
                  <p className="text-base leading-8 text-[#52615A]">
                    Our service fee is also non-refundable once your
                    application has been reviewed, processed, and submitted to
                    the authorities.
                  </p>
                </Subsection>
              </div>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="04"
                title="Circumstances Where a Refund May Be Granted"
                id="refund-circumstances"
              />

              <div className="grid gap-5">
                <Subsection title="4.1 Application Not Yet Submitted">
                  <p className="text-base leading-8 text-[#52615A]">
                    If you contact us and request a cancellation before your
                    application has been submitted to the Azerbaijani
                    authorities, you may be eligible for a partial refund of
                    our service fee. The government fee component, if already
                    collected, will be deducted. An administrative handling
                    charge may also apply.
                  </p>
                </Subsection>
                <Subsection title="4.2 Duplicate Payment">
                  <p className="text-base leading-8 text-[#52615A]">
                    If a technical error results in a duplicate charge for the
                    same application, we will refund the duplicate amount in
                    full within 10 business days of confirming the error.
                  </p>
                </Subsection>
                <Subsection title="4.3 Service Not Delivered">
                  <p className="text-base leading-8 text-[#52615A]">
                    If, due to an error entirely on our part, we fail to submit
                    your application and are unable to rectify this within a
                    reasonable timeframe, you will be entitled to a full refund
                    of both the service fee and the government fee.
                  </p>
                </Subsection>
              </div>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="05"
                title="Visa Refusal"
                id="visa-refusal"
              />
              <p className="text-base leading-8 text-[#52615A]">
                We have no control over the visa decisions made by the
                competent authorities of the Republic of Azerbaijan. If your
                visa application is refused, this is a decision of the relevant
                government authority and not a failure of our services.
              </p>
              <p className="text-base leading-8 text-[#52615A]">
                In the event of a visa refusal:
              </p>
              <BulletList
                items={[
                  "The government fee will not be refunded.",
                  "Our service fee will not be refunded.",
                  "We will inform you of the refusal as soon as we receive notification from the authorities.",
                  "We may, at our discretion, offer assistance in submitting a new application at a reduced service fee.",
                ]}
              />
              <p className="text-base leading-8 text-[#52615A]">
                If you believe the refusal was caused by a processing error on
                our part, such as incorrect submission of data despite correct
                information provided by you, please contact us within 7 days of
                receiving the refusal notice so we can investigate.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="06"
                title="How to Request a Refund"
                id="request-refund"
              />
              <p className="text-base leading-8 text-[#52615A]">
                To request a refund, please contact our support team and
                include the required information below:
              </p>
              <BulletList
                items={[
                  "Email: support@azevisa.az",
                  "Subject line: 'Refund Request – [Your Full Name] – [Application Reference Number]'",
                  "Include: your application reference number, the reason for your refund request, and any supporting documentation",
                ]}
              />
              <p className="text-base leading-8 text-[#52615A]">
                We will acknowledge your request within 2 business days and
                provide a decision within 10 business days of receiving all
                required information.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="07"
                title="Refund Processing"
                id="refund-processing"
              />
              <p className="text-base leading-8 text-[#52615A]">
                Approved refunds will be processed to the original payment
                method used at the time of application. Processing times may
                vary depending on your payment provider:
              </p>
              <BulletList
                items={[
                  "Credit or debit card refunds: typically 5–10 business days",
                  "Other payment methods: as per the provider's standard timelines",
                ]}
              />
              <p className="text-base leading-8 text-[#52615A]">
                We are not responsible for any delays caused by your bank or
                payment provider.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="08"
                title="Chargebacks"
                id="chargebacks"
              />
              <p className="text-base leading-8 text-[#52615A]">
                We encourage you to contact us directly before initiating a
                chargeback with your bank or payment provider. If you initiate
                a chargeback without first contacting us, we reserve the right
                to dispute the chargeback and provide all relevant
                documentation to your payment provider demonstrating that our
                services were duly rendered.
              </p>
              <p className="text-base leading-8 text-[#52615A]">
                Fraudulent or unjustified chargebacks may result in termination
                of your account and, if applicable, may be reported to
                relevant authorities.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="09"
                title="Changes to This Policy"
                id="policy-changes"
              />
              <p className="text-base leading-8 text-[#52615A]">
                We reserve the right to amend this Refund Policy at any time.
                Any changes will be effective immediately upon publication on
                our website. The refund policy applicable to your application
                is the version in force at the time of payment.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="10"
                title="Contact Us"
                id="contact"
              />
              <div className="rounded-3xl border border-[#E7ECE9] bg-[#F7FAF8] p-8">
                <p className="text-base leading-8 text-[#52615A]">
                  If you have any questions or concerns about this Refund
                  Policy, or wish to discuss your specific situation, please do
                  not hesitate to contact us:
                </p>
                <div className="mt-6 space-y-3 text-base leading-7 text-[#52615A]">
                  <p>
                    <span className="font-semibold text-[#004E34]">Email:</span>{" "}
                    <a
                      href="mailto:support@azevisa.az"
                      className="font-semibold text-[#004E34] underline decoration-[#004E34]/30 underline-offset-4"
                    >
                      support@azevisa.az
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-[#004E34]">Website:</span>{" "}
                    <a
                      href="https://www.azevisa.az"
                      className="font-semibold text-[#004E34] underline decoration-[#004E34]/30 underline-offset-4"
                    >
                      www.azevisa.az
                    </a>
                  </p>
                </div>
                <p className="mt-6 text-base leading-8 text-[#52615A]">
                  Our team is available to assist you and will do our best to
                  resolve any issues fairly and promptly.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
