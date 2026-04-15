import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/components/auth/login-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Login.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LoginPage() {
  const t = await getTranslations("Login");

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-[#004E34] font-bold text-3xl">azEvisa</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-[#1F2937]">{t("title")}</h1>
            <p className="text-sm text-[#6F7A72] mt-1">{t("subtitle")}</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
