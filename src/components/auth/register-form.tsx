"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/fetcher";

type RegisterResponse = {
  message: string;
  tokens: {
    access: string;
    refresh: string;
  };
};

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterForm() {
  const t = useTranslations("Register");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched" });

  const password = watch("password");

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const res: RegisterResponse = await fetcher("/accounts/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          password_confirm: data.confirmPassword,
        }),
      });

      document.cookie = `access_token=${res.tokens.access}; path=/; SameSite=Lax`;
      document.cookie = `refresh_token=${res.tokens.refresh}; path=/; SameSite=Lax`;

      toast.success(res.message);
      router.push("/");
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Could not create account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <Field label={t("email")} error={errors.email?.message}>
        <Input
          type="email"
          {...register("email", {
            required: t("validation.emailRequired"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("validation.emailInvalid"),
            },
          })}
          placeholder={t("emailPlaceholder")}
          hasError={!!errors.email}
        />
      </Field>

      <Field label={t("password")} error={errors.password?.message}>
        <Input
          type="password"
          {...register("password", {
            required: t("validation.passwordRequired"),
            minLength: {
              value: 8,
              message: t("validation.passwordMinLength"),
            },
          })}
          placeholder={t("passwordPlaceholder")}
          hasError={!!errors.password}
        />
      </Field>

      <Field
        label={t("confirmPassword")}
        error={errors.confirmPassword?.message}
      >
        <Input
          type="password"
          {...register("confirmPassword", {
            required: t("validation.confirmPasswordRequired"),
            validate: (value) =>
              value === password || t("validation.passwordsMismatch"),
          })}
          placeholder={t("confirmPasswordPlaceholder")}
          hasError={!!errors.confirmPassword}
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-[#004E34] text-white text-sm font-semibold rounded-lg hover:bg-[#003322] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
            </svg>
            {t("submitting")}
          </>
        ) : (
          t("submit")
        )}
      </button>

      <p className="text-sm text-center text-[#6F7A72]">
        {t("hasAccount")}{" "}
        <Link
          href="/login"
          className="font-semibold text-[#004E34] hover:underline underline-offset-4"
        >
          {t("loginLink")}
        </Link>
      </p>
    </form>
  );
}
