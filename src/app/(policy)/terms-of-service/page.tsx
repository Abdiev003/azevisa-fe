import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/privacy-policy/section-heading";
import { TermsOfUseSidebar } from "@/components/terms-of-service/sidebar";

export const metadata: Metadata = {
  title: "Terms and Conditions | AzEvisa",
  description:
    "Read the terms and conditions governing your use of AzEvisa.az and our Azerbaijan e-Visa assistance services.",
  alternates: { canonical: "/terms-of-service" },
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

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-wide text-[#6F7A72]">
          <Link href="/" className="transition-colors hover:text-[#004E34]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#004E34]">Terms and Conditions</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-8 pt-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7E8B84]">
          AzEvisa.az
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-[#004E34] md:text-5xl">
          Terms and Conditions
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#52615A]">
          Please read these terms carefully before using our visa assistance
          services or submitting an application through our platform.
        </p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
          Effective Date: April 18, 2026
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-start gap-12">
          <TermsOfUseSidebar />

          <div className="flex min-w-0 flex-1 flex-col gap-14">
            <section className="rounded-3xl border border-[#E7ECE9] bg-[#F7FAF8] p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7E8B84]">
                www.azevisa.az
              </p>
              <p className="mt-4 text-base leading-8 text-[#52615A]">
                These Terms and Conditions govern your access to and use of the
                AzEvisa.az website and all related services. AzEvisa.az is a
                private visa assistance service and is not affiliated with,
                endorsed by, or operated by the Government of the Republic of
                Azerbaijan or any other governmental body.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="01"
                title="Introduction and Acceptance"
                id="introduction-acceptance"
              />
              <p className="text-base leading-8 text-[#52615A]">
                By accessing our website or submitting a visa application
                through our platform, you agree to be bound by these Terms. If
                you do not agree with any part of these Terms, you must not use
                our Services.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="02"
                title="Description of Services"
                id="description-of-services"
              />
              <p className="text-base leading-8 text-[#52615A]">
                AzEvisa.az provides a facilitated e-Visa application assistance
                service for individuals seeking to visit the Republic of
                Azerbaijan. Our Services include:
              </p>
              <BulletList
                items={[
                  "Guidance and assistance in completing the visa application form",
                  "Review of application information for accuracy and completeness",
                  "Submission of the visa application to the relevant Azerbaijani authorities",
                  "Communication of application status updates",
                  "Customer support throughout the application process",
                ]}
              />
              <p className="text-base leading-8 text-[#52615A]">
                We act as an intermediary service provider. The final decision
                on whether to grant, refuse, or revoke a visa lies solely with
                the competent authorities of the Republic of Azerbaijan. We do
                not guarantee visa approval.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="03"
                title="Eligibility"
                id="eligibility"
              />
              <p className="text-base leading-8 text-[#52615A]">
                By using our Services, you confirm that:
              </p>
              <BulletList
                items={[
                  "You are at least 18 years of age, or are acting with the consent and supervision of a parent or legal guardian.",
                  "You have the legal capacity to enter into binding agreements.",
                  "All information you provide is accurate, current, and truthful.",
                  "You are not subject to any travel ban or restriction that would prohibit you from travelling to Azerbaijan.",
                ]}
              />
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="04"
                title="User Responsibilities"
                id="user-responsibilities"
              />

              <div className="grid gap-5">
                <Subsection title="4.1 Accuracy of Information">
                  <p className="text-base leading-8 text-[#52615A]">
                    You are solely responsible for ensuring that all
                    information submitted through our platform is accurate,
                    complete, and consistent with your official travel
                    documents. Any errors, omissions, or false statements may
                    result in refusal, delays, or legal consequences. We accept
                    no liability for problems arising from inaccurate
                    information provided by you.
                  </p>
                </Subsection>
                <Subsection title="4.2 Document Validity">
                  <p className="text-base leading-8 text-[#52615A]">
                    You must ensure that your passport is valid for the
                    duration required by Azerbaijani immigration rules,
                    generally at least 6 months beyond your intended stay. We
                    are not responsible for applications rejected due to
                    document invalidity.
                  </p>
                </Subsection>
                <Subsection title="4.3 Account Security">
                  <p className="text-base leading-8 text-[#52615A]">
                    If you create an account on our platform, you are
                    responsible for maintaining the confidentiality of your
                    login credentials and for all activities that occur under
                    your account.
                  </p>
                </Subsection>
              </div>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="05"
                title="Application Process and Timelines"
                id="application-process"
              />
              <p className="text-base leading-8 text-[#52615A]">
                We will process your application and transmit it to the
                relevant authorities promptly upon receipt of complete
                information and payment. Standard processing times are
                estimates only and may vary based on the volume of
                applications, authority processing times, and public holidays.
                We do not guarantee specific processing timelines.
              </p>
              <p className="text-base leading-8 text-[#52615A]">
                We strongly recommend submitting your application well in
                advance of your planned travel date. We are not liable for any
                losses arising from delays outside our control.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="06"
                title="Fees and Payment"
                id="fees-payment"
              />
              <p className="text-base leading-8 text-[#52615A]">
                Our service fee is displayed on the website at the time of
                application and includes:
              </p>
              <BulletList
                items={[
                  "Our administrative and facilitation fee",
                  "The applicable government visa fee",
                ]}
              />
              <p className="text-base leading-8 text-[#52615A]">
                All fees are charged at the time of application submission and
                are non-refundable except as set out in our{" "}
                <Link
                  href="/refund-policy"
                  className="font-semibold text-[#004E34] underline decoration-[#004E34]/30 underline-offset-4"
                >
                  Refund Policy
                </Link>
                . We reserve the right to modify our service fees at any time.
                Changes will be communicated on our website and will not affect
                applications already submitted.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="07"
                title="Intellectual Property"
                id="intellectual-property"
              />
              <p className="text-base leading-8 text-[#52615A]">
                All content on the AzEvisa.az website, including but not
                limited to text, graphics, logos, icons, images, and software,
                is the property of AzEvisa.az or its content licensors and is
                protected by applicable intellectual property laws.
              </p>
              <p className="text-base leading-8 text-[#52615A]">
                You may not reproduce, distribute, modify, or create
                derivative works from any content on this website without our
                prior written consent.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="08"
                title="Prohibited Uses"
                id="prohibited-uses"
              />
              <p className="text-base leading-8 text-[#52615A]">
                You agree not to use our Services to:
              </p>
              <BulletList
                items={[
                  "Submit false, misleading, or fraudulent information",
                  "Impersonate another person or entity",
                  "Violate any applicable law or regulation",
                  "Attempt to gain unauthorised access to our systems",
                  "Interfere with or disrupt the integrity or performance of the website",
                  "Engage in any form of automated data collection, scraping, or crawling",
                  "Use our platform for any purpose other than personal visa application assistance",
                ]}
              />
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="09"
                title="Disclaimer of Warranties"
                id="disclaimer"
              />
              <p className="text-base leading-8 text-[#52615A]">
                Our Services are provided on an &quot;as is&quot; and &quot;as
                available&quot; basis without warranties of any kind, whether
                express or implied. We make no warranty that:
              </p>
              <BulletList
                items={[
                  "Our Services will be uninterrupted, error-free, or available at all times",
                  "Your visa application will be approved by the Azerbaijani authorities",
                  "Information on our website is always current, accurate, or complete",
                ]}
              />
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="10"
                title="Limitation of Liability"
                id="liability"
              />
              <p className="text-base leading-8 text-[#52615A]">
                To the maximum extent permitted by applicable law, AzEvisa.az
                and its directors, employees, and agents shall not be liable
                for any indirect, incidental, special, consequential, or
                punitive damages arising from your use of our Services,
                including but not limited to:
              </p>
              <BulletList
                items={[
                  "Visa refusals by government authorities",
                  "Losses due to travel delays, cancellations, or additional expenses",
                  "Inaccurate information provided by the applicant",
                  "Technical failures, interruptions, or security breaches beyond our control",
                ]}
              />
              <p className="text-base leading-8 text-[#52615A]">
                Our total aggregate liability to you shall not exceed the total
                fees paid by you for the specific application giving rise to
                the claim.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="11"
                title="Third-Party Links and Services"
                id="third-party-links"
              />
              <p className="text-base leading-8 text-[#52615A]">
                Our website may contain links to third-party websites or
                services. These links are provided for your convenience only.
                We have no control over the content, privacy practices, or
                reliability of third-party sites and accept no responsibility
                for them.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="12"
                title="Modifications to Services"
                id="service-modifications"
              />
              <p className="text-base leading-8 text-[#52615A]">
                We reserve the right to modify, suspend, or discontinue any
                part of our Services at any time without prior notice. We will
                not be liable to you or any third party for any modification,
                suspension, or discontinuation of Services.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="13"
                title="Governing Law and Disputes"
                id="governing-law"
              />
              <p className="text-base leading-8 text-[#52615A]">
                These Terms shall be governed by and construed in accordance
                with the laws of the Republic of Azerbaijan. Any disputes
                arising out of or in connection with these Terms shall be
                subject to the exclusive jurisdiction of the competent courts
                of the Republic of Azerbaijan.
              </p>
              <p className="text-base leading-8 text-[#52615A]">
                We encourage you to contact us in the first instance to resolve
                any concerns informally before initiating formal proceedings.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="14"
                title="Changes to These Terms"
                id="terms-changes"
              />
              <p className="text-base leading-8 text-[#52615A]">
                We reserve the right to update these Terms at any time. Any
                material changes will be published on our website with an
                updated effective date. Your continued use of our Services
                following any changes constitutes your acceptance of the
                revised Terms.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="15"
                title="Contact Information"
                id="contact"
              />
              <div className="rounded-3xl border border-[#E7ECE9] bg-[#F7FAF8] p-8">
                <p className="text-base leading-8 text-[#52615A]">
                  If you have any questions about these Terms and Conditions,
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
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
