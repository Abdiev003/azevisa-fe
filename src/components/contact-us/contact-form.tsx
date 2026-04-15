"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CheckIcon } from "@/components/icons";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fetcher } from "@/lib/fetcher";
import { toast } from "sonner";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const t = useTranslations("ContactUs");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ mode: "onTouched" });

  async function onSubmit(_data: FormValues) {
    setIsSubmitting(true);

    try {
      const res = await fetcher("/pages/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${_data.firstName} ${_data.lastName}`,
          email: _data.email,
          subject: _data.subject,
          message: _data.message,
        }),
      });

      toast.success(res.message || "Your message has been sent successfully!");
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error(
        "An error occurred while sending your message. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#004E34]/10">
          <CheckIcon />
        </div>
        <h3 className="text-xl font-bold text-[#004E34]">
          {t("form.successTitle")}
        </h3>
        <p className="text-sm text-[#6F7A72] max-w-sm">
          {t("form.successText")}
        </p>
        <button
          onClick={() => {
            reset();
            setSubmitted(false);
          }}
          className="mt-2 text-sm font-semibold text-[#004E34] underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          {t("form.sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* First + Last name row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label={t("form.firstName.label")}
          error={errors.firstName?.message}
        >
          <Input
            {...register("firstName", {
              required: t("validation.firstNameRequired"),
            })}
            placeholder={t("form.firstName.placeholder")}
            hasError={!!errors.firstName}
          />
        </Field>
        <Field
          label={t("form.lastName.label")}
          error={errors.lastName?.message}
        >
          <Input
            {...register("lastName", {
              required: t("validation.lastNameRequired"),
            })}
            placeholder={t("form.lastName.placeholder")}
            hasError={!!errors.lastName}
          />
        </Field>
      </div>

      {/* Email */}
      <Field label={t("form.email.label")} error={errors.email?.message}>
        <Input
          type="email"
          {...register("email", {
            required: t("validation.emailRequired"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("validation.emailInvalid"),
            },
          })}
          placeholder={t("form.email.placeholder")}
          hasError={!!errors.email}
        />
      </Field>

      {/* Subject */}
      <Field label={t("form.subject.label")} error={errors.subject?.message}>
        <Select
          {...register("subject", {
            required: t("validation.subjectRequired"),
          })}
          hasError={!!errors.subject}
          defaultValue=""
        >
          <option value="" disabled>
            {t("form.subject.placeholder")}
          </option>
          <option value="application">
            {t("form.subject.options.application")}
          </option>
          <option value="payment">{t("form.subject.options.payment")}</option>
          <option value="refund">{t("form.subject.options.refund")}</option>
          <option value="technical">
            {t("form.subject.options.technical")}
          </option>
          <option value="general">{t("form.subject.options.general")}</option>
        </Select>
      </Field>

      {/* Message */}
      <Field label={t("form.message.label")} error={errors.message?.message}>
        <Textarea
          rows={5}
          {...register("message", {
            required: t("validation.messageRequired"),
            minLength: { value: 20, message: t("validation.messageTooShort") },
          })}
          placeholder={t("form.message.placeholder")}
          hasError={!!errors.message}
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
            {t("form.submitting")}
          </>
        ) : (
          t("form.submit")
        )}
      </button>
    </form>
  );
}
