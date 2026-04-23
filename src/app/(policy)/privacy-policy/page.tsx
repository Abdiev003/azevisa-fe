import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/privacy-policy/section-heading";
import { PrivacyPolicySidebar } from "@/components/privacy-policy/sidebar";

export const metadata: Metadata = {
  title: "Privacy Policy | AzEvisa",
  description:
    "Read how AzEvisa.az collects, uses, shares, and protects your personal data when you use our Azerbaijan e-Visa assistance platform.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: false },
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-base leading-7 text-[#52615A] list-disc pl-6 marker:text-[#004E34]">
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

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-wide text-[#6F7A72]">
          <Link href="/" className="transition-colors hover:text-[#004E34]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#004E34]">Privacy Policy</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-8 pt-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7E8B84]">
          AzEvisa.az
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-[#004E34] md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#52615A]">
          How we collect, use, share, and protect your personal data when you
          use our online platform for Azerbaijan e-Visa assistance.
        </p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
          Effective Date: April 18, 2026
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-start gap-12">
          <PrivacyPolicySidebar />

          <div className="flex min-w-0 flex-1 flex-col gap-14">
            <section className="rounded-3xl border border-[#E7ECE9] bg-[#F7FAF8] p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7E8B84]">
                www.azevisa.az
              </p>
              <p className="mt-4 text-base leading-8 text-[#52615A]">
                AzEvisa.az (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                operates an online platform that assists individuals in applying
                for an electronic visa to the Republic of Azerbaijan. We are
                committed to protecting your personal data and respecting your
                privacy in accordance with applicable data protection laws,
                including the GDPR and the laws of the Republic of Azerbaijan.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="01"
                title="Introduction"
                id="introduction"
              />
              <p className="text-base leading-8 text-[#52615A]">
                This Privacy Policy explains what personal information we
                collect, why we collect it, how we use and protect it, and what
                rights you have regarding your data.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="02"
                title="Information We Collect"
                id="information-we-collect"
              />
              <p className="text-base leading-8 text-[#52615A]">
                When you use our services, we may collect the following
                categories of personal data:
              </p>

              <div className="grid gap-5">
                <Subsection
                  title="2.1 Personal Identification Information"
                  items={[
                    "Full name as it appears on your passport",
                    "Date of birth",
                    "Nationality and country of citizenship",
                    "Passport number, issue date, and expiry date",
                    "Gender",
                  ]}
                />
                <Subsection
                  title="2.2 Contact Information"
                  items={[
                    "Email address",
                    "Phone number",
                    "Residential address",
                  ]}
                />
                <Subsection
                  title="2.3 Travel Information"
                  items={[
                    "Intended travel dates",
                    "Purpose of visit",
                    "Port of entry",
                  ]}
                />
                <Subsection title="2.4 Payment Information">
                  <p className="text-base leading-8 text-[#52615A]">
                    We do not store full payment card details on our servers.
                    Payment processing is handled by third-party PCI-DSS
                    compliant payment providers. We may retain transaction
                    reference numbers and billing details for record-keeping
                    purposes.
                  </p>
                </Subsection>
                <Subsection
                  title="2.5 Technical & Usage Data"
                  items={[
                    "IP address and approximate geolocation",
                    "Browser type and version",
                    "Pages visited and time spent on our website",
                    "Referring URLs and search terms",
                    "Device type and operating system",
                  ]}
                />
              </div>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="03"
                title="How We Use Your Information"
                id="how-we-use"
              />
              <BulletList
                items={[
                  "To process and submit your Azerbaijan e-Visa application on your behalf",
                  "To communicate with you regarding the status of your application",
                  "To provide customer support and respond to your enquiries",
                  "To send you confirmation emails and important service-related notifications",
                  "To comply with legal obligations and regulatory requirements",
                  "To prevent fraud, misuse, and unauthorised access to our services",
                  "To improve our website performance and user experience through analytics",
                  "To send you optional marketing communications with your prior consent",
                ]}
              />
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="04"
                title="Legal Basis for Processing"
                id="legal-basis"
              />
              <BulletList
                items={[
                  "Contract performance: processing is necessary to provide the visa application service you have requested.",
                  "Legal obligation: we may need to retain or share certain data to comply with applicable laws.",
                  "Legitimate interests: we may process certain technical data to ensure the security and functionality of our platform.",
                  "Consent: for optional communications such as newsletters, we rely on your explicit consent, which you may withdraw at any time.",
                ]}
              />
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="05"
                title="Sharing of Your Information"
                id="sharing"
              />
              <div className="grid gap-5">
                <Subsection title="5.1 Government Authorities">
                  <p className="text-base leading-8 text-[#52615A]">
                    Your personal information will be transmitted to the
                    relevant authorities of the Republic of Azerbaijan, such as
                    the State Migration Service, as part of the visa application
                    process. This is essential to the provision of our service.
                  </p>
                </Subsection>
                <Subsection title="5.2 Service Providers">
                  <p className="text-base leading-8 text-[#52615A]">
                    We engage trusted third-party companies to assist in
                    operating our platform, processing payments, and delivering
                    communications. These providers are contractually bound to
                    protect your data and may only use it for the specific
                    purposes we instruct.
                  </p>
                </Subsection>
                <Subsection title="5.3 Legal Requirements">
                  <p className="text-base leading-8 text-[#52615A]">
                    We may disclose your data if required to do so by law, court
                    order, or governmental authority.
                  </p>
                </Subsection>
              </div>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="06"
                title="Data Retention"
                id="data-retention"
              />
              <p className="text-base leading-8 text-[#52615A]">
                We retain your personal data for as long as necessary to fulfil
                the purposes for which it was collected, or as required by
                applicable law. In general:
              </p>
              <BulletList
                items={[
                  "Application data is retained for up to 5 years for compliance and audit purposes.",
                  "Technical logs are retained for up to 12 months.",
                  "Marketing data is retained until you withdraw consent.",
                ]}
              />
              <p className="text-base leading-8 text-[#52615A]">
                After the applicable retention period, your data will be
                securely deleted or anonymised.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading number="07" title="Cookies" id="cookies" />
              <p className="text-base leading-8 text-[#52615A]">
                We use cookies and similar tracking technologies on our website.
                For detailed information, please refer to our{" "}
                <Link
                  href="/cookie-policy"
                  className="font-semibold text-[#004E34] underline decoration-[#004E34]/30 underline-offset-4"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="08"
                title="Data Security"
                id="data-security"
              />
              <p className="text-base leading-8 text-[#52615A]">
                We implement appropriate technical and organisational security
                measures to protect your personal data against unauthorised
                access, accidental loss, destruction, or alteration. These
                measures include:
              </p>
              <BulletList
                items={[
                  "Encryption of data in transit using SSL/TLS protocols",
                  "Secure servers with restricted access controls",
                  "Regular security assessments and vulnerability testing",
                  "Staff training on data protection and confidentiality",
                ]}
              />
              <p className="text-base leading-8 text-[#52615A]">
                While we take all reasonable precautions, no method of
                electronic transmission or storage is 100% secure. We cannot
                guarantee absolute security.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="09"
                title="International Data Transfers"
                id="data-transfers"
              />
              <p className="text-base leading-8 text-[#52615A]">
                Your data may be transferred to and processed in countries
                outside your country of residence, including the Republic of
                Azerbaijan and other countries where our service providers
                operate. We ensure that appropriate safeguards are in place,
                including standard contractual clauses, to protect your data in
                accordance with applicable law.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="10"
                title="Your Rights"
                id="your-rights"
              />
              <p className="text-base leading-8 text-[#52615A]">
                Depending on your jurisdiction, you may have the following
                rights regarding your personal data:
              </p>
              <BulletList
                items={[
                  "Right of Access: request a copy of the personal data we hold about you.",
                  "Right to Rectification: request correction of inaccurate or incomplete data.",
                  "Right to Erasure: request deletion of your data under certain circumstances.",
                  "Right to Restriction: request that we restrict the processing of your data.",
                  "Right to Data Portability: receive your data in a structured, machine-readable format.",
                  "Right to Object: object to processing based on legitimate interests or for marketing purposes.",
                  "Right to Withdraw Consent: withdraw consent at any time without affecting the lawfulness of prior processing.",
                ]}
              />
              <p className="text-base leading-8 text-[#52615A]">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:support@azevisa.az"
                  className="font-semibold text-[#004E34] underline decoration-[#004E34]/30 underline-offset-4"
                >
                  support@azevisa.az
                </a>
                . We will respond to your request within 30 days.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="11"
                title="Children&apos;s Privacy"
                id="childrens-privacy"
              />
              <p className="text-base leading-8 text-[#52615A]">
                Our services are not directed to children under the age of 16.
                We do not knowingly collect personal data from children. If you
                believe we have inadvertently collected data from a minor, please
                contact us immediately so we can take appropriate action.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="12"
                title="Changes to This Policy"
                id="policy-changes"
              />
              <p className="text-base leading-8 text-[#52615A]">
                We may update this Privacy Policy from time to time. Any
                material changes will be communicated via email or a prominent
                notice on our website. The updated policy will indicate the
                effective date at the top of the document. Your continued use of
                our services after any changes constitutes your acceptance of
                the revised policy.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="13"
                title="Contact Us"
                id="contact"
              />
              <div className="rounded-3xl border border-[#E7ECE9] bg-[#F7FAF8] p-8">
                <p className="text-base leading-8 text-[#52615A]">
                  If you have any questions, concerns, or complaints regarding
                  this Privacy Policy or the way we handle your personal data,
                  please contact us:
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
                  We take privacy complaints seriously and will respond promptly
                  and fairly.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
