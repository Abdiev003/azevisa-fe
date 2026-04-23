import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/privacy-policy/section-heading";
import { CookiePolicySidebar } from "@/components/cookie-policy/sidebar";

export const metadata: Metadata = {
  title: "Cookie Policy | AzEvisa",
  description:
    "Learn how AzEvisa.az uses cookies and similar technologies, what choices you have, and how third-party cookies may affect your experience.",
  alternates: { canonical: "/cookie-policy" },
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

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-wide text-[#6F7A72]">
          <Link href="/" className="transition-colors hover:text-[#004E34]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#004E34]">Cookie Policy</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-8 pt-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7E8B84]">
          AzEvisa.az
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-[#004E34] md:text-5xl">
          Cookie Policy
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#52615A]">
          How we use cookies and similar technologies on www.azevisa.az, and
          the choices available to you.
        </p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
          Effective Date: April 18, 2026
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-start gap-12">
          <CookiePolicySidebar />

          <div className="flex min-w-0 flex-1 flex-col gap-14">
            <section className="rounded-3xl border border-[#E7ECE9] bg-[#F7FAF8] p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7E8B84]">
                www.azevisa.az
              </p>
              <p className="mt-4 text-base leading-8 text-[#52615A]">
                This Cookie Policy explains how AzEvisa.az uses cookies and
                similar technologies to make our website work efficiently,
                improve user experience, and support our operational, analytics,
                and consent-based marketing activities.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="01"
                title="What Are Cookies?"
                id="what-are-cookies"
              />
              <p className="text-base leading-8 text-[#52615A]">
                Cookies are small text files that are placed on your device,
                such as a computer, smartphone, or tablet, when you visit a
                website. They are widely used to make websites work efficiently,
                improve user experience, and provide information to website
                operators.
              </p>
              <p className="text-base leading-8 text-[#52615A]">
                Cookies can be session cookies, which expire when you close your
                browser, or persistent cookies, which remain on your device for
                a set period or until you delete them. They can also be
                classified as first-party cookies set by us, or third-party
                cookies set by external services we use.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="02"
                title="How We Use Cookies"
                id="how-we-use"
              />
              <p className="text-base leading-8 text-[#52615A]">
                AzEvisa.az uses cookies and similar technologies on
                www.azevisa.az for the purposes described in this policy,
                including website functionality, analytics, remembering your
                preferences, and consent-based marketing support.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="03"
                title="Types of Cookies We Use"
                id="types-of-cookies"
              />

              <div className="grid gap-5">
                <Subsection
                  title="3.1 Strictly Necessary Cookies"
                  items={[
                    "Session management and security tokens",
                    "Shopping cart or application form state persistence",
                    "Authentication and fraud prevention",
                  ]}
                >
                  <p className="text-base leading-8 text-[#52615A]">
                    These cookies are essential for the website to function and
                    cannot be switched off. They are set in response to actions
                    you take, such as filling in forms or logging into your
                    account. You cannot opt out of these cookies.
                  </p>
                </Subsection>
                <Subsection
                  title="3.2 Performance & Analytics Cookies"
                  items={[
                    "Google Analytics for page views, session duration, and traffic sources",
                    "Error tracking and performance monitoring",
                  ]}
                >
                  <p className="text-base leading-8 text-[#52615A]">
                    These cookies help us understand how visitors interact with
                    our website by collecting anonymous information. This allows
                    us to improve the structure, content, and functionality of
                    our site.
                  </p>
                </Subsection>
                <Subsection
                  title="3.3 Functional Cookies"
                  items={[
                    "Language and region preferences",
                    "Previously entered application data to assist you if you return",
                    "Accessibility settings",
                  ]}
                >
                  <p className="text-base leading-8 text-[#52615A]">
                    These cookies enable the website to remember your
                    preferences and provide enhanced, more personalised
                    features.
                  </p>
                </Subsection>
                <Subsection
                  title="3.4 Marketing & Targeting Cookies"
                  items={[
                    "Retargeting and remarketing pixels",
                    "Social media integration cookies",
                  ]}
                >
                  <p className="text-base leading-8 text-[#52615A]">
                    These cookies may be set through our website by our
                    advertising partners. They may be used to build a profile of
                    your interests and show you relevant advertisements on other
                    websites. We will only use these cookies with your prior
                    consent.
                  </p>
                </Subsection>
              </div>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="04"
                title="Third-Party Cookies"
                id="third-party-cookies"
              />
              <p className="text-base leading-8 text-[#52615A]">
                Some cookies are placed by third-party service providers who
                perform services on our behalf. These may include:
              </p>
              <BulletList
                items={[
                  "Google Analytics for website traffic analysis",
                  "Payment processors for secure transaction handling",
                  "Customer support platforms for live chat functionality",
                ]}
              />
              <p className="text-base leading-8 text-[#52615A]">
                These third parties have their own privacy and cookie policies,
                which we encourage you to review. We do not control these
                third-party cookies.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="05"
                title="Your Cookie Choices"
                id="your-cookie-choices"
              />
              <p className="text-base leading-8 text-[#52615A]">
                When you first visit our website, you will be presented with a
                cookie consent banner. You may choose to accept all cookies,
                accept only necessary cookies, or customise your preferences.
              </p>
              <p className="text-base leading-8 text-[#52615A]">
                You can also manage or disable cookies through your browser
                settings at any time. Please note that disabling certain cookies
                may affect the functionality of our website and your user
                experience.
              </p>

              <div className="rounded-2xl border border-[#E7ECE9] bg-[#FAFCFB] p-6">
                <h3 className="text-lg font-semibold text-[#004E34]">
                  Browser-Level Cookie Controls
                </h3>
                <p className="mt-4 text-base leading-8 text-[#52615A]">
                  Most modern browsers allow you to:
                </p>
                <BulletList
                  items={[
                    "View cookies stored on your device",
                    "Delete individual or all cookies",
                    "Block cookies from specific websites",
                    "Block third-party cookies entirely",
                    "Set your browser to notify you when cookies are being set",
                  ]}
                />
                <p className="mt-5 text-base leading-8 text-[#52615A]">
                  Please refer to your browser&apos;s help documentation for
                  specific instructions. Common browser settings pages:
                </p>
                <BulletList
                  items={[
                    "Google Chrome: Settings > Privacy and security > Cookies",
                    "Mozilla Firefox: Options > Privacy & Security",
                    "Safari: Preferences > Privacy",
                    "Microsoft Edge: Settings > Cookies and site permissions",
                  ]}
                />
              </div>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="06"
                title="Do Not Track"
                id="do-not-track"
              />
              <p className="text-base leading-8 text-[#52615A]">
                Some browsers include a Do Not Track feature that sends a
                signal to websites requesting that your browsing not be tracked.
                Our website does not currently respond to DNT signals, though we
                review this position periodically.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading
                number="07"
                title="Updates to This Cookie Policy"
                id="updates"
              />
              <p className="text-base leading-8 text-[#52615A]">
                We may update this Cookie Policy from time to time to reflect
                changes in the cookies we use or for other operational, legal,
                or regulatory reasons. Any changes will be published on this
                page with an updated effective date.
              </p>
            </section>

            <section className="space-y-6">
              <SectionHeading number="08" title="Contact Us" id="contact" />
              <div className="rounded-3xl border border-[#E7ECE9] bg-[#F7FAF8] p-8">
                <p className="text-base leading-8 text-[#52615A]">
                  If you have any questions about our use of cookies, please
                  contact us:
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
