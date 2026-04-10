import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/privacy-policy/section-heading";
import { CookiePolicySidebar } from "@/components/cookie-policy/sidebar";
import {
  InfoIcon,
  ToggleIcon,
  ToggleOffIcon,
  ChromeIcon,
  FirefoxIcon,
  SafariIcon,
  EdgeIcon,
  MailIcon,
  ExternalLinkIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Cookie Policy | AzEvisa",
  description:
    "Learn how AzEvisa uses cookies to improve your experience on our Azerbaijan eVisa application platform. Manage your cookie preferences here.",
  alternates: { canonical: "/cookie-policy" },
  robots: { index: true, follow: false },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#6F7A72]">
          <Link href="/" className="hover:text-[#004E34] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#004E34]">Cookie Policy</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl px-6 pt-10 pb-8 mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#004E34] leading-tight">
          Cookie Policy
        </h1>
        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
          Last Updated: February 2025
        </p>
      </div>

      <div className="max-w-6xl px-6 pb-20 mx-auto">
        <div className="flex items-start gap-12">
          {/* Sticky Sidebar */}
          <CookiePolicySidebar />

          {/* Content */}
          <div className="flex flex-col flex-1 min-w-0 gap-14">
            {/* 01 What Are Cookies */}
            <section>
              <SectionHeading
                number="01"
                title="What Are Cookies"
                id="what-are-cookies"
              />
              <div className="mt-5 flex flex-col gap-4 text-[#374151] text-sm leading-7">
                <p>
                  Cookies are small text files that are stored on your device
                  (computer, tablet, or smartphone) when you visit a website.
                  They allow the website to recognize your device and remember
                  certain information about your visit.
                </p>
                <div className="flex gap-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <span className="text-blue-500 shrink-0 mt-0.5">
                    <InfoIcon />
                  </span>
                  <p className="text-sm text-[#374151] leading-6">
                    Cookies do not contain personal information such as your
                    name or payment details. They are used to improve the
                    functionality and performance of our platform.
                  </p>
                </div>
              </div>
            </section>

            {/* 02 How We Use Cookies */}
            <section>
              <SectionHeading
                number="02"
                title="How We Use Cookies"
                id="how-we-use"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                azEvisa uses cookies for the following purposes:
              </p>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                {[
                  {
                    label: "Authentication",
                    color: "text-[#004E34]",
                    text: "Keeping you logged into your session while you complete your visa application.",
                  },
                  {
                    label: "Preferences",
                    color: "text-blue-600",
                    text: "Remembering your language selection, currency, and other display preferences.",
                  },
                  {
                    label: "Analytics",
                    color: "text-purple-600",
                    text: "Understanding how users navigate our platform so we can improve the experience.",
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

            {/* 03 Types of Cookies */}
            <section>
              <SectionHeading
                number="03"
                title="Types of Cookies"
                id="types-of-cookies"
              />
              <div className="flex flex-col gap-3 mt-5">
                {[
                  {
                    title: "Strictly Necessary Cookies",
                    text: "These cookies are essential for the website to function properly. They enable core features such as session management, secure login, and form submissions. They cannot be disabled.",
                    badge: "Always On",
                    badgeClass: "bg-[#004E34] text-white",
                    on: true,
                  },
                  {
                    title: "Performance & Analytics Cookies",
                    text: "These cookies collect anonymous information about how visitors use our site (e.g., pages visited, time on site). We use this data to optimize performance.",
                    badge: "User Choice",
                    badgeClass: "bg-gray-200 text-[#374151]",
                    on: false,
                  },
                  {
                    title: "Functional Cookies",
                    text: "These cookies allow the website to remember your preferences and provide enhanced, personalized features such as language settings and saved form progress.",
                    badge: "User Choice",
                    badgeClass: "bg-gray-200 text-[#374151]",
                    on: false,
                  },
                  {
                    title: "Marketing & Targeting Cookies",
                    text: "Used to deliver relevant advertisements and track the effectiveness of marketing campaigns. These are only activated with your explicit consent.",
                    badge: "User Choice",
                    badgeClass: "bg-gray-200 text-[#374151]",
                    on: false,
                  },
                ].map(({ title, text, badge, badgeClass, on }) => (
                  <div
                    key={title}
                    className="flex items-start justify-between gap-4 px-5 py-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0">
                        {on ? <ToggleIcon /> : <ToggleOffIcon />}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#1F2937]">
                          {title}
                        </p>
                        <p className="text-xs text-[#6F7A72] mt-1 leading-5">
                          {text}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full whitespace-nowrap ${badgeClass}`}
                    >
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 04 Third-Party Cookies */}
            <section>
              <SectionHeading
                number="04"
                title="Third-Party Cookies"
                id="third-party"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                Some cookies on our platform are placed by trusted third-party
                services we use to operate and improve our services:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-left bg-gray-50">
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#94A3B8] border border-gray-200">
                        Provider
                      </th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#94A3B8] border border-gray-200">
                        Purpose
                      </th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#94A3B8] border border-gray-200">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        provider: "Google Analytics",
                        purpose: "Usage analytics and user behavior tracking",
                        category: "Analytics",
                      },
                      {
                        provider: "Stripe",
                        purpose:
                          "Secure payment processing and fraud prevention",
                        category: "Necessary",
                      },
                      {
                        provider: "Cloudflare",
                        purpose: "CDN, DDoS protection and performance",
                        category: "Necessary",
                      },
                      {
                        provider: "Intercom",
                        purpose: "Customer support chat widget",
                        category: "Functional",
                      },
                      {
                        provider: "Facebook Pixel",
                        purpose: "Conversion tracking and retargeting ads",
                        category: "Marketing",
                      },
                    ].map(({ provider, purpose, category }) => (
                      <tr key={provider} className="border-b border-gray-100">
                        <td className="px-4 py-3 text-[#1F2937] font-medium border border-gray-200">
                          {provider}
                        </td>
                        <td className="px-4 py-3 text-[#6F7A72] border border-gray-200">
                          {purpose}
                        </td>
                        <td className="px-4 py-3 border border-gray-200">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              category === "Necessary"
                                ? "bg-[#004E34]/10 text-[#004E34]"
                                : category === "Analytics"
                                  ? "bg-purple-100 text-purple-700"
                                  : category === "Functional"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 05 Cookie Duration */}
            <section>
              <SectionHeading
                number="05"
                title="Cookie Duration"
                id="cookie-duration"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                Cookies we use fall into two categories based on how long they
                remain on your device:
              </p>
              <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                <div className="bg-[#003322] rounded-xl p-6">
                  <p className="mb-2 text-sm font-semibold text-white">
                    Session Cookies
                  </p>
                  <p className="text-[#94A3B8] text-xs leading-5">
                    Temporary cookies that are erased when you close your
                    browser. They are used to maintain your session state during
                    a single visit — for example, keeping your application form
                    data intact as you navigate between steps.
                  </p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl">
                  <p className="text-[#1F2937] font-semibold text-sm mb-2">
                    Persistent Cookies
                  </p>
                  <p className="text-[#6F7A72] text-xs leading-5">
                    These remain on your device for a set period (typically 30
                    days to 2 years) or until manually deleted. They help us
                    remember your preferences and provide a consistent
                    experience across return visits.
                  </p>
                </div>
              </div>
            </section>

            {/* 06 Managing Cookies */}
            <section>
              <SectionHeading
                number="06"
                title="Managing Cookies"
                id="managing-cookies"
              />
              <div className="mt-5 flex flex-col gap-4 text-sm text-[#6F7A72] leading-7">
                <p>
                  You have full control over which non-essential cookies are
                  active on your device. You can manage your preferences at any
                  time through our cookie consent banner or the settings below.
                </p>
                <div className="flex gap-3 p-4 border rounded-lg border-amber-300 bg-amber-50">
                  <span className="text-amber-500 shrink-0 mt-0.5">
                    <InfoIcon />
                  </span>
                  <p className="text-sm text-[#374151] leading-6">
                    Disabling certain cookies may affect the functionality of
                    our platform. Strictly necessary cookies cannot be disabled
                    as they are required for the service to operate.
                  </p>
                </div>
              </div>
            </section>

            {/* 07 Browser Settings */}
            <section>
              <SectionHeading
                number="07"
                title="Browser Settings"
                id="browser-settings"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                You can also control cookies directly through your browser
                settings. Here is how to manage cookies in popular browsers:
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-4">
                {[
                  {
                    icon: <ChromeIcon />,
                    label: "Chrome",
                    href: "https://support.google.com/chrome/answer/95647",
                  },
                  {
                    icon: <FirefoxIcon />,
                    label: "Firefox",
                    href: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer",
                  },
                  {
                    icon: <SafariIcon />,
                    label: "Safari",
                    href: "https://support.apple.com/en-gb/guide/safari/sfri11471/mac",
                  },
                  {
                    icon: <EdgeIcon />,
                    label: "Edge",
                    href: "https://support.microsoft.com/en-us/windows/delete-and-manage-cookies",
                  },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 border border-gray-200 rounded-lg py-5 px-3 hover:border-[#004E34] transition-colors cursor-pointer"
                  >
                    {icon}
                    <span className="text-xs font-semibold text-[#6F7A72] text-center">
                      {label}
                    </span>
                    <span className="text-xs text-[#004E34] underline">
                      View Guide
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 08 Updates to This Policy */}
            <section>
              <SectionHeading
                number="08"
                title="Updates to This Policy"
                id="updates"
              />
              <p className="mt-4 text-sm text-[#6F7A72] leading-7">
                We may update this Cookie Policy periodically to reflect changes
                in technology, legislation, or our data practices. When we make
                significant changes, we will notify you via a prominent banner
                on our website or by email if you have an active application on
                file.
              </p>
              <p className="mt-3 text-sm text-[#6F7A72] leading-7">
                The date at the top of this page will always reflect when this
                policy was last revised. We encourage you to review this policy
                periodically to stay informed about how we use cookies.
              </p>
            </section>

            {/* 09 Contact Us */}
            <section>
              <SectionHeading number="09" title="Contact Us" id="contact" />
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
                    Mailing Address
                  </p>
                  <address className="not-italic text-sm text-[#6F7A72] leading-6">
                    azEvisa Privacy Team
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
