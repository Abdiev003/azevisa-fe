"use client";

import { useState, useCallback } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Field, inputClass } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useUserStore } from "../providers/user-store-provider";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ApplicationFormData {
  // Step 1 — Country / Region
  nationality: string;
  documentType: string;
  // Step 2 — Arrival Date
  arrivalDate: string;
  purposeOfVisit: string;
  // Step 3 — Personal Information
  firstName: string;
  surname: string;
  otherNames: string;
  dateOfBirth: string;
  countryOfBirth: string;
  placeOfBirth: string;
  sex: string;
  occupation: string;
  mobileNumber: string;
  address: string;
  email: string;
  // Step 4 — Passport Details
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportCopy: FileList | null;
  addressInAzerbaijan: string;
  // Step 5 — Review
  declaration: boolean;
  // Step 6 — Payment
  paymentMethod: "card" | "paypal";
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  paymentAgreement: boolean;
}

const VISA_PRICE = 26;
const SERVICE_FEE = 0;

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------

export interface ApplyLabels {
  sidebar: {
    title: string;
    stepOf: string;
    steps: {
      countryRegion: string;
      arrivalDate: string;
      personalInfo: string;
      passportDetails: string;
      review: string;
      payment: string;
    };
  };
  step1: {
    number: string;
    title: string;
    subtitle: string;
    nationality: string;
    nationalityPlaceholder: string;
    documentType: string;
    documentTypePlaceholder: string;
    docOrdinary: string;
    docOfficial: string;
    docDiplomatic: string;
    docEmergency: string;
    next: string;
  };
  step2: {
    number: string;
    title: string;
    subtitle: string;
    arrivalDate: string;
    purposeOfVisit: string;
    purposePlaceholder: string;
    purposeTourism: string;
    purposeBusiness: string;
    purposeTransit: string;
    purposeEducation: string;
    purposeMedical: string;
    back: string;
    next: string;
  };
  step3: {
    number: string;
    title: string;
    subtitle: string;
    firstName: string;
    firstNamePlaceholder: string;
    surname: string;
    surnamePlaceholder: string;
    otherNames: string;
    otherNamesPlaceholder: string;
    dateOfBirth: string;
    countryOfBirth: string;
    countryOfBirthPlaceholder: string;
    placeOfBirth: string;
    placeOfBirthPlaceholder: string;
    sex: string;
    sexPlaceholder: string;
    sexMale: string;
    sexFemale: string;
    occupation: string;
    occupationPlaceholder: string;
    occupationEmployed: string;
    occupationSelfEmployed: string;
    occupationStudent: string;
    occupationRetired: string;
    occupationUnemployed: string;
    occupationGovernment: string;
    occupationMilitary: string;
    occupationHealthcare: string;
    occupationTeacher: string;
    occupationOther: string;
    mobileNumber: string;
    mobileNumberPlaceholder: string;
    address: string;
    addressPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    emailNote: string;
    back: string;
    next: string;
  };
  step4: {
    number: string;
    title: string;
    subtitle: string;
    passportNumber: string;
    passportNumberPlaceholder: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    passportCopyTitle: string;
    passportCopyDesc: string;
    passportCopyWarning: string;
    passportCopyDrop: string;
    addressInAzerbaijan: string;
    addressInAzerbaijanPlaceholder: string;
    back: string;
    next: string;
  };
  step5: {
    number: string;
    title: string;
    subtitle: string;
    countryRegionTitle: string;
    arrivalDateTitle: string;
    personalTitle: string;
    passportTitle: string;
    edit: string;
    nationality: string;
    documentType: string;
    arrivalDate: string;
    purposeOfVisit: string;
    fullName: string;
    dateOfBirth: string;
    countryOfBirth: string;
    sex: string;
    occupation: string;
    email: string;
    passportNumber: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    uploadedDoc: string;
    addressInAzerbaijan: string;
    declarationLabel: string;
    back: string;
    next: string;
  };
  step6: {
    number: string;
    title: string;
    subtitle: string;
    portalTitle: string;
    cardTab: string;
    paypalTab: string;
    cardName: string;
    cardNamePlaceholder: string;
    cardNumber: string;
    cardNumberPlaceholder: string;
    cardExpiry: string;
    cardExpiryPlaceholder: string;
    cardCvv: string;
    cardCvvPlaceholder: string;
    agreementLabel: string;
    orderTitle: string;
    visaFeeLabel: string;
    serviceFeeLabel: string;
    totalLabel: string;
    supportText: string;
    back: string;
    submit: string;
  };
  validation: {
    required: string;
    email: string;
    passportFormat: string;
    fileRequired: string;
    fileSize: string;
    fileType: string;
    declarationRequired: string;
    paymentAgreementRequired: string;
  };
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

function Sidebar({
  current,
  labels,
}: {
  current: number;
  labels: ApplyLabels;
}) {
  const stepLabels = [
    labels.sidebar.steps.countryRegion,
    labels.sidebar.steps.arrivalDate,
    labels.sidebar.steps.personalInfo,
    labels.sidebar.steps.passportDetails,
    labels.sidebar.steps.review,
    labels.sidebar.steps.payment,
  ];

  const stepOf = labels.sidebar.stepOf
    .replace("{current}", String(current + 1))
    .replace("{total}", "6");

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-[#004E34] text-white rounded-xl overflow-hidden">
      <div className="px-5 py-6 border-b border-white/10">
        <p className="mb-1 text-xs font-semibold tracking-widest uppercase text-white/60">
          {labels.sidebar.title}
        </p>
        <p className="text-sm font-medium text-white/90">{stepOf}</p>
        {/* progress bar */}
        <div className="mt-3 h-1.5 w-full rounded-full bg-white/20">
          <div
            className="h-1.5 rounded-full bg-[#C8A84B] transition-all duration-500"
            style={{ width: `${((current + 1) / 6) * 100}%` }}
          />
        </div>
      </div>
      <nav className="flex flex-col gap-0.5 px-3 py-4">
        {stepLabels.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div
              key={i}
              className={twMerge(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                active &&
                  "bg-white/10 border-l-2 border-[#C8A84B] pl-2.5 text-white font-semibold",
                done && "text-white/50",
                !active && !done && "text-white/40",
              )}
            >
              <span
                className={twMerge(
                  "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0",
                  active && "bg-[#C8A84B] text-[#003322]",
                  done && "bg-white/20 text-white/60",
                  !active && !done && "bg-white/10 text-white/30",
                )}
              >
                {done ? (
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-3 h-3"
                  >
                    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className="truncate">{label}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Navigation buttons
// ---------------------------------------------------------------------------

function NavButtons({
  onBack,
  onNext,
  backLabel,
  nextLabel,
  nextIsSubmit,
  loading,
}: {
  onBack?: () => void;
  onNext?: () => void;
  backLabel: string;
  nextLabel: string;
  nextIsSubmit?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="flex items-center justify-between pt-6 mt-2 border-t border-gray-100">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#004E34] text-[#004E34] text-sm font-semibold hover:bg-[#004E34]/5 transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L4.862 9.25H16.25A.75.75 0 0 1 17 10z"
              clipRule="evenodd"
            />
          </svg>
          {backLabel}
        </button>
      ) : (
        <div />
      )}
      <button
        type={nextIsSubmit ? "submit" : "button"}
        onClick={!nextIsSubmit ? onNext : undefined}
        disabled={loading}
        className={twMerge(
          "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors",
          nextIsSubmit
            ? "bg-[#C8A84B] hover:bg-[#b9973e] text-white"
            : "bg-[#004E34] hover:bg-[#003322] text-white",
          loading && "opacity-60 cursor-not-allowed",
        )}
      >
        {loading ? (
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0 1 8-8v8H4z"
            />
          </svg>
        ) : null}
        {nextLabel}
        {!nextIsSubmit && (
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step header
// ---------------------------------------------------------------------------

function StepHeader({
  num,
  title,
  subtitle,
}: {
  num: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-7">
      <p className="text-5xl font-black text-[#004E34]/10 leading-none mb-1">
        {num}
      </p>
      <h2 className="text-xl font-bold text-[#1F2937]">{title}</h2>
      <p className="text-sm text-[#6F7A72] mt-1">{subtitle}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 1 — Country / Region
// ---------------------------------------------------------------------------

function Step1({
  labels,
  onNext,
}: {
  labels: ApplyLabels;
  onNext: () => void;
}) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<ApplicationFormData>();

  const handleNext = async () => {
    const ok = await trigger(["nationality", "documentType"]);
    if (ok) onNext();
  };

  const l = labels.step1;
  const v = labels.validation;

  return (
    <div>
      <StepHeader num={l.number} title={l.title} subtitle={l.subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
        <Field label={l.nationality} error={errors.nationality?.message}>
          <Select
            {...register("nationality", { required: v.required })}
            hasError={!!errors.nationality}
          >
            <option value="">{l.nationalityPlaceholder}</option>
            {EVISA_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={l.documentType} error={errors.documentType?.message}>
          <Select
            {...register("documentType", { required: v.required })}
            hasError={!!errors.documentType}
          >
            <option value="">{l.documentTypePlaceholder}</option>
            <option value="ordinary">{l.docOrdinary}</option>
            <option value="official">{l.docOfficial}</option>
            <option value="diplomatic">{l.docDiplomatic}</option>
            <option value="emergency">{l.docEmergency}</option>
          </Select>
        </Field>
      </div>
      <NavButtons nextLabel={l.next} backLabel="" onNext={handleNext} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 2 — Arrival Date
// ---------------------------------------------------------------------------

function Step2({
  labels,
  onBack,
  onNext,
}: {
  labels: ApplyLabels;
  onBack: () => void;
  onNext: () => void;
}) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<ApplicationFormData>();

  const handleNext = async () => {
    const ok = await trigger(["arrivalDate", "purposeOfVisit"]);
    if (ok) onNext();
  };

  const l = labels.step2;
  const v = labels.validation;

  return (
    <div>
      <StepHeader num={l.number} title={l.title} subtitle={l.subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
        <Field label={l.arrivalDate} error={errors.arrivalDate?.message}>
          <Input
            {...register("arrivalDate", { required: v.required })}
            type="date"
            hasError={!!errors.arrivalDate}
            className="text-[#1F2937]"
          />
        </Field>
        <Field label={l.purposeOfVisit} error={errors.purposeOfVisit?.message}>
          <Select
            {...register("purposeOfVisit", { required: v.required })}
            hasError={!!errors.purposeOfVisit}
          >
            <option value="">{l.purposePlaceholder}</option>
            <option value="tourism">{l.purposeTourism}</option>
            <option value="business">{l.purposeBusiness}</option>
            <option value="transit">{l.purposeTransit}</option>
            <option value="education">{l.purposeEducation}</option>
            <option value="medical">{l.purposeMedical}</option>
          </Select>
        </Field>
      </div>
      <NavButtons
        onBack={onBack}
        onNext={handleNext}
        backLabel={l.back}
        nextLabel={l.next}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3 — Personal Information
// ---------------------------------------------------------------------------

function Step3({
  labels,
  onBack,
  onNext,
}: {
  labels: ApplyLabels;
  onBack: () => void;
  onNext: () => void;
}) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<ApplicationFormData>();

  const step3Fields: (keyof ApplicationFormData)[] = [
    "firstName",
    "surname",
    "dateOfBirth",
    "countryOfBirth",
    "placeOfBirth",
    "sex",
    "occupation",
    "mobileNumber",
    "address",
    "email",
  ];

  const handleNext = async () => {
    const ok = await trigger(step3Fields);
    if (ok) onNext();
  };

  const l = labels.step3;
  const v = labels.validation;

  return (
    <div>
      <StepHeader num={l.number} title={l.title} subtitle={l.subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
        <Field label={l.firstName} error={errors.firstName?.message}>
          <Input
            {...register("firstName", { required: v.required })}
            placeholder={l.firstNamePlaceholder}
            hasError={!!errors.firstName}
          />
        </Field>
        <Field label={l.surname} error={errors.surname?.message}>
          <Input
            {...register("surname", { required: v.required })}
            placeholder={l.surnamePlaceholder}
            hasError={!!errors.surname}
          />
        </Field>
        <Field label={l.otherNames} error={undefined}>
          <Input
            {...register("otherNames")}
            placeholder={l.otherNamesPlaceholder}
          />
        </Field>
        <Field label={l.dateOfBirth} error={errors.dateOfBirth?.message}>
          <Input
            {...register("dateOfBirth", { required: v.required })}
            type="date"
            hasError={!!errors.dateOfBirth}
          />
        </Field>
        {/* countryOfBirth uses ALL_COUNTRIES — a person can be born anywhere */}
        <Field label={l.countryOfBirth} error={errors.countryOfBirth?.message}>
          <Select
            {...register("countryOfBirth", { required: v.required })}
            hasError={!!errors.countryOfBirth}
          >
            <option value="">{l.countryOfBirthPlaceholder}</option>
            {ALL_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={l.placeOfBirth} error={errors.placeOfBirth?.message}>
          <Input
            {...register("placeOfBirth", { required: v.required })}
            placeholder={l.placeOfBirthPlaceholder}
            hasError={!!errors.placeOfBirth}
          />
        </Field>
        <Field label={l.sex} error={errors.sex?.message}>
          <Select
            {...register("sex", { required: v.required })}
            hasError={!!errors.sex}
          >
            <option value="">{l.sexPlaceholder}</option>
            <option value="male">{l.sexMale}</option>
            <option value="female">{l.sexFemale}</option>
          </Select>
        </Field>
        <Field label={l.occupation} error={errors.occupation?.message}>
          <Select
            {...register("occupation", { required: v.required })}
            hasError={!!errors.occupation}
          >
            <option value="">{l.occupationPlaceholder}</option>
            <option value="employed">{l.occupationEmployed}</option>
            <option value="self-employed">{l.occupationSelfEmployed}</option>
            <option value="student">{l.occupationStudent}</option>
            <option value="retired">{l.occupationRetired}</option>
            <option value="unemployed">{l.occupationUnemployed}</option>
            <option value="government">{l.occupationGovernment}</option>
            <option value="military">{l.occupationMilitary}</option>
            <option value="healthcare">{l.occupationHealthcare}</option>
            <option value="teacher">{l.occupationTeacher}</option>
            <option value="other">{l.occupationOther}</option>
          </Select>
        </Field>
        <Field label={l.mobileNumber} error={errors.mobileNumber?.message}>
          <div className="flex">
            <span
              className={twMerge(
                inputClass(!!errors.mobileNumber),
                "rounded-r-none border-r-0 w-auto px-3 bg-gray-50 text-[#6F7A72] shrink-0",
              )}
            >
              +
            </span>
            <Input
              {...register("mobileNumber", { required: v.required })}
              placeholder={l.mobileNumberPlaceholder}
              hasError={!!errors.mobileNumber}
              className="rounded-l-none"
            />
          </div>
        </Field>
        <Field label={l.address} error={errors.address?.message}>
          <Input
            {...register("address", { required: v.required })}
            placeholder={l.addressPlaceholder}
            hasError={!!errors.address}
          />
        </Field>
      </div>
      <div className="mt-4">
        <Field label={l.email} error={errors.email?.message}>
          <Input
            {...register("email", {
              required: v.required,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: v.email,
              },
            })}
            type="email"
            placeholder={l.emailPlaceholder}
            hasError={!!errors.email}
          />
        </Field>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#6F7A72]">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-3.5 h-3.5 text-[#004E34] shrink-0"
          >
            <path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm.75 4.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 .75.75h2.5a.75.75 0 0 0 0-1.5H8.75V5.25z" />
          </svg>
          {l.emailNote}
        </p>
      </div>
      <NavButtons
        onBack={onBack}
        onNext={handleNext}
        backLabel={l.back}
        nextLabel={l.next}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 4 — Passport Details
// ---------------------------------------------------------------------------

function Step4({
  labels,
  onBack,
  onNext,
}: {
  labels: ApplyLabels;
  onBack: () => void;
  onNext: () => void;
}) {
  const {
    register,
    formState: { errors },
    trigger,
    watch,
  } = useFormContext<ApplicationFormData>();

  const step4Fields: (keyof ApplicationFormData)[] = [
    "passportNumber",
    "passportIssueDate",
    "passportExpiryDate",
    "passportCopy",
    "addressInAzerbaijan",
  ];

  const handleNext = async () => {
    const ok = await trigger(step4Fields);
    if (ok) onNext();
  };

  const fileVal = watch("passportCopy");
  const fileName = fileVal && fileVal.length > 0 ? fileVal[0]?.name : null;

  const l = labels.step4;
  const v = labels.validation;

  return (
    <div>
      <StepHeader num={l.number} title={l.title} subtitle={l.subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
        <Field label={l.passportNumber} error={errors.passportNumber?.message}>
          <Input
            {...register("passportNumber", {
              required: v.required,
              pattern: {
                value: /^[A-Z0-9]{6,12}$/i,
                message: v.passportFormat,
              },
            })}
            placeholder={l.passportNumberPlaceholder}
            hasError={!!errors.passportNumber}
          />
        </Field>
        <div />
        <Field
          label={l.passportIssueDate}
          error={errors.passportIssueDate?.message}
        >
          <Input
            {...register("passportIssueDate", { required: v.required })}
            type="date"
            hasError={!!errors.passportIssueDate}
          />
        </Field>
        <Field
          label={l.passportExpiryDate}
          error={errors.passportExpiryDate?.message}
        >
          <Input
            {...register("passportExpiryDate", { required: v.required })}
            type="date"
            hasError={!!errors.passportExpiryDate}
          />
        </Field>
      </div>

      {/* Passport copy upload */}
      <div className="mt-6 overflow-hidden border border-gray-200 rounded-xl bg-gray-50">
        <div className="px-5 py-4 bg-white border-b border-gray-200">
          <h3 className="text-sm font-semibold text-[#1F2937]">
            {l.passportCopyTitle}
          </h3>
          <p className="text-xs text-[#6F7A72] mt-0.5">{l.passportCopyDesc}</p>
          <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#004E34] bg-[#004E34]/8 px-2 py-0.5 rounded-full">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h7A2.5 2.5 0 0 1 14 2.5v11a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5V2.5z" />
            </svg>
            {l.passportCopyWarning}
          </span>
        </div>
        <label className="flex flex-col items-center justify-center gap-3 px-6 py-8 transition-colors cursor-pointer hover:bg-gray-100">
          <input
            {...register("passportCopy", {
              required: v.fileRequired,
              validate: {
                size: (files) =>
                  !files ||
                  files.length === 0 ||
                  files[0].size <= 5 * 1024 * 1024 ||
                  v.fileSize,
                type: (files) =>
                  !files ||
                  files.length === 0 ||
                  ["image/jpeg", "application/pdf"].includes(files[0].type) ||
                  v.fileType,
              },
            })}
            type="file"
            accept=".jpg,.jpeg,.pdf"
            className="sr-only"
          />
          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="w-12 h-12 text-[#004E34]/30"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <rect x="8" y="4" width="32" height="40" rx="3" />
            <path d="M16 14h16M16 20h16M16 26h10" />
          </svg>
          {fileName ? (
            <span className="text-sm font-medium text-[#004E34]">
              {fileName}
            </span>
          ) : (
            <span className="text-sm text-[#6F7A72] text-center">
              {l.passportCopyDrop}
            </span>
          )}
        </label>
        {errors.passportCopy && (
          <p className="flex items-center gap-1 px-5 pb-3 text-xs text-red-500">
            <span>⚠</span> {errors.passportCopy.message}
          </p>
        )}
      </div>

      <div className="mt-4">
        <Field
          label={l.addressInAzerbaijan}
          error={errors.addressInAzerbaijan?.message}
        >
          <Input
            {...register("addressInAzerbaijan", { required: v.required })}
            placeholder={l.addressInAzerbaijanPlaceholder}
            hasError={!!errors.addressInAzerbaijan}
          />
        </Field>
      </div>

      <NavButtons
        onBack={onBack}
        onNext={handleNext}
        backLabel={l.back}
        nextLabel={l.next}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 5 — Review & Submit
// ---------------------------------------------------------------------------

function ReviewSection({
  title,
  editLabel,
  onEdit,
  rows,
}: {
  title: string;
  editLabel: string;
  onEdit: () => void;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="overflow-hidden border border-gray-200 rounded-xl">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-[#1F2937]">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#004E34] hover:text-[#003322] transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z" />
          </svg>
          {editLabel}
        </button>
      </div>
      <div className="divide-y divide-gray-50">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-5 py-2.5"
          >
            <span className="text-xs text-[#6F7A72]">{row.label}</span>
            <span className="text-xs font-medium text-[#1F2937]">
              {row.value || "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step5({
  labels,
  onBack,
  onNext,
  goToStep,
}: {
  labels: ApplyLabels;
  onBack: () => void;
  onNext: () => void;
  goToStep: (step: number) => void;
}) {
  const {
    register,
    formState: { errors },
    trigger,
    watch,
  } = useFormContext<ApplicationFormData>();

  const values = watch();

  const handleNext = async () => {
    const ok = await trigger(["declaration"]);
    if (ok) onNext();
  };

  const l = labels.step5;

  return (
    <div>
      <StepHeader num={l.number} title={l.title} subtitle={l.subtitle} />
      <div className="flex flex-col gap-4">
        <ReviewSection
          title={l.countryRegionTitle}
          editLabel={l.edit}
          onEdit={() => goToStep(0)}
          rows={[
            { label: l.nationality, value: values.nationality },
            { label: l.documentType, value: values.documentType },
          ]}
        />
        <ReviewSection
          title={l.arrivalDateTitle}
          editLabel={l.edit}
          onEdit={() => goToStep(1)}
          rows={[
            { label: l.arrivalDate, value: values.arrivalDate },
            { label: l.purposeOfVisit, value: values.purposeOfVisit },
          ]}
        />
        <ReviewSection
          title={l.personalTitle}
          editLabel={l.edit}
          onEdit={() => goToStep(2)}
          rows={[
            {
              label: l.fullName,
              value: [values.firstName, values.surname, values.otherNames]
                .filter(Boolean)
                .join(" "),
            },
            { label: l.dateOfBirth, value: values.dateOfBirth },
            { label: l.countryOfBirth, value: values.countryOfBirth },
            { label: l.sex, value: values.sex },
            { label: l.occupation, value: values.occupation },
            { label: l.email, value: values.email },
          ]}
        />
        <ReviewSection
          title={l.passportTitle}
          editLabel={l.edit}
          onEdit={() => goToStep(3)}
          rows={[
            { label: l.passportNumber, value: values.passportNumber },
            { label: l.passportIssueDate, value: values.passportIssueDate },
            { label: l.passportExpiryDate, value: values.passportExpiryDate },
            {
              label: l.uploadedDoc,
              value:
                values.passportCopy && values.passportCopy.length > 0
                  ? (values.passportCopy[0]?.name ?? "—")
                  : "—",
            },
            { label: l.addressInAzerbaijan, value: values.addressInAzerbaijan },
          ]}
        />
      </div>

      {/* Declaration */}
      <div className="px-5 py-4 mt-5 border border-gray-200 rounded-xl bg-gray-50">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register("declaration", {
              validate: (v) =>
                v === true || labels.validation.declarationRequired,
            })}
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#004E34] cursor-pointer"
          />
          <span className="text-xs text-[#6F7A72] leading-relaxed">
            {l.declarationLabel}
          </span>
        </label>
        {errors.declaration && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
            <span>⚠</span> {errors.declaration.message}
          </p>
        )}
      </div>

      <NavButtons
        onBack={onBack}
        onNext={handleNext}
        backLabel={l.back}
        nextLabel={l.next}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 6 — Payment
// ---------------------------------------------------------------------------

function Step6({
  labels,
  onBack,
  loading,
}: {
  labels: ApplyLabels;
  onBack: () => void;
  loading: boolean;
}) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<ApplicationFormData>();

  const paymentMethod = watch("paymentMethod");
  const price = VISA_PRICE;

  const l = labels.step6;

  return (
    <div>
      <StepHeader num={l.number} title={l.title} subtitle={l.subtitle} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Payment form */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden bg-white border border-gray-200 rounded-xl">
            <div className="px-5 py-4 bg-[#004E34] text-white flex items-center gap-2">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1zm3 8V5.5a3 3 0 1 0-6 0V9h6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold">{l.portalTitle}</span>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {(["card", "paypal"] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setValue("paymentMethod", method)}
                  className={twMerge(
                    "flex-1 py-3 text-sm font-semibold transition-colors",
                    paymentMethod === method
                      ? "border-b-2 border-[#004E34] text-[#004E34]"
                      : "text-[#6F7A72] hover:text-[#1F2937]",
                  )}
                >
                  {method === "card" ? l.cardTab : l.paypalTab}
                </button>
              ))}
            </div>

            <div className="px-5 py-5">
              {paymentMethod === "card" ? (
                <div className="flex flex-col gap-4">
                  <Field label={l.cardName} error={errors.cardName?.message}>
                    <Input
                      {...register("cardName", {
                        required: labels.validation.required,
                      })}
                      placeholder={l.cardNamePlaceholder}
                      hasError={!!errors.cardName}
                    />
                  </Field>
                  <Field
                    label={l.cardNumber}
                    error={errors.cardNumber?.message}
                  >
                    <Input
                      {...register("cardNumber", {
                        required: labels.validation.required,
                      })}
                      placeholder={l.cardNumberPlaceholder}
                      hasError={!!errors.cardNumber}
                      maxLength={19}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      label={l.cardExpiry}
                      error={errors.cardExpiry?.message}
                    >
                      <Input
                        {...register("cardExpiry", {
                          required: labels.validation.required,
                        })}
                        placeholder={l.cardExpiryPlaceholder}
                        hasError={!!errors.cardExpiry}
                        maxLength={5}
                      />
                    </Field>
                    <Field label={l.cardCvv} error={errors.cardCvv?.message}>
                      <Input
                        {...register("cardCvv", {
                          required: labels.validation.required,
                        })}
                        placeholder={l.cardCvvPlaceholder}
                        hasError={!!errors.cardCvv}
                        maxLength={4}
                      />
                    </Field>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 py-8">
                  <svg viewBox="0 0 60 24" className="h-8" aria-label="PayPal">
                    <path
                      d="M22.9 6.5c-.6-3.3-3.5-4.8-7.1-4.8H8.4a1 1 0 0 0-1 .9L4.9 18.7a.6.6 0 0 0 .6.7h4.3l1.1-6.8v.2a1 1 0 0 1 1-.9h2.1c4 0 7.1-1.6 8-6.3v-.1z"
                      fill="#003087"
                    />
                    <path
                      d="M33.9 6c0 0-.1 0 0 0-.7-3.5-3.6-5-7.2-5h-7.5a1 1 0 0 0-1 .9L15.6 19c-.1.4.2.8.6.8h4.6l1.2-7.5-.1.4a1 1 0 0 1 1-.9H25c4 0 7.1-1.6 8-6.4.1-.5.1-.9.1-1.3a4 4 0 0 0-.2-.1z"
                      fill="#0070E0"
                    />
                    <path
                      d="M22.9 6.5a7 7 0 0 0-.4 1c-.9 4.6-3.8 6.2-7.6 6.2H13a1 1 0 0 0-1 .9l-1.3 8a.6.6 0 0 0 .6.7h3.9a.9.9 0 0 0 .9-.8l.6-4 .9-5.7h1.5c3.4 0 6-.8 7-4.9z"
                      fill="#00AAEE"
                    />
                  </svg>
                  <p className="text-sm text-[#6F7A72]">
                    You will be redirected to PayPal to complete payment.
                  </p>
                </div>
              )}

              {/* Agreement */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    {...register("paymentAgreement", {
                      validate: (v) =>
                        v === true ||
                        labels.validation.paymentAgreementRequired,
                    })}
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 accent-[#004E34] cursor-pointer"
                  />
                  <span className="text-xs text-[#6F7A72] leading-relaxed">
                    {l.agreementLabel}
                  </span>
                </label>
                {errors.paymentAgreement && (
                  <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
                    <span>⚠</span> {errors.paymentAgreement.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="overflow-hidden bg-white border border-gray-200 rounded-xl">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-[#1F2937]">
                {l.orderTitle}
              </h3>
            </div>
            <div className="px-5 py-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6F7A72]">{l.visaFeeLabel}</span>
                <span className="font-medium text-[#1F2937]">${price}.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6F7A72]">{l.serviceFeeLabel}</span>
                <span className="font-medium text-[#1F2937]">
                  ${SERVICE_FEE}.00
                </span>
              </div>
              <div className="pt-2.5 mt-1 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-bold text-[#1F2937]">
                  {l.totalLabel}
                </span>
                <span className="text-xl font-black text-[#004E34]">
                  ${price + SERVICE_FEE}.00
                </span>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="rounded-xl bg-[#004E34]/5 border border-[#004E34]/15 px-4 py-4 flex gap-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 text-[#004E34] shrink-0 mt-0.5"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-5 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
            </svg>
            <p className="text-xs text-[#6F7A72] leading-relaxed">
              {l.supportText}
            </p>
          </div>
        </div>
      </div>

      <NavButtons
        onBack={onBack}
        backLabel={l.back}
        nextLabel={l.submit}
        nextIsSubmit
        loading={loading}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main wizard
// ---------------------------------------------------------------------------

export function ApplyWizard({ labels }: { labels: ApplyLabels }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const { user } = useUserStore();

  const methods = useForm<ApplicationFormData>({
    mode: "onBlur",
    defaultValues: {
      nationality: "",
      documentType: "",
      arrivalDate: "",
      purposeOfVisit: "",
      firstName: "",
      surname: "",
      otherNames: "",
      dateOfBirth: "",
      countryOfBirth: "",
      placeOfBirth: "",
      sex: "",
      occupation: "",
      mobileNumber: "",
      address: "",
      email: user?.email || "",
      passportNumber: "",
      passportIssueDate: "",
      passportExpiryDate: "",
      passportCopy: null,
      addressInAzerbaijan: "",
      declaration: false,
      paymentMethod: "card",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      paymentAgreement: false,
    },
  });

  const next = useCallback(() => setCurrentStep((s) => Math.min(s + 1, 5)), []);
  const back = useCallback(() => setCurrentStep((s) => Math.max(s - 1, 0)), []);
  const goToStep = useCallback((step: number) => setCurrentStep(step), []);

  const handleSubmit = methods.handleSubmit(async () => {
    setSubmitting(true);
    // Application submission logic goes here
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    alert("Application submitted successfully!");
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex items-start gap-6">
          <Sidebar current={currentStep} labels={labels} />
          <div className="flex-1 min-w-0 px-6 bg-white border border-gray-200 shadow-sm rounded-xl py-7">
            {currentStep === 0 && <Step1 labels={labels} onNext={next} />}
            {currentStep === 1 && (
              <Step2 labels={labels} onBack={back} onNext={next} />
            )}
            {currentStep === 2 && (
              <Step3 labels={labels} onBack={back} onNext={next} />
            )}
            {currentStep === 3 && (
              <Step4 labels={labels} onBack={back} onNext={next} />
            )}
            {currentStep === 4 && (
              <Step5
                labels={labels}
                onBack={back}
                onNext={next}
                goToStep={goToStep}
              />
            )}
            {currentStep === 5 && (
              <Step6 labels={labels} onBack={back} loading={submitting} />
            )}
          </div>
        </div>

        {/* Mobile step indicator */}
        <div className="flex items-center justify-center gap-2 mt-4 lg:hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={twMerge(
                "h-1.5 rounded-full transition-all",
                i === currentStep
                  ? "w-6 bg-[#004E34]"
                  : i < currentStep
                    ? "w-3 bg-[#004E34]/40"
                    : "w-3 bg-gray-200",
              )}
            />
          ))}
        </div>
      </form>
    </FormProvider>
  );
}

// ---------------------------------------------------------------------------
// EVISA_COUNTRIES — Step 1: Nationality
// Only countries eligible for Azerbaijan e-Visa (ASAN Visa system).
// Visa-free countries (Turkey, Russia, Georgia, etc.) are intentionally excluded.
// ---------------------------------------------------------------------------

const EVISA_COUNTRIES = [
  "Algeria",
  "Antigua and Barbuda",
  "Argentina",
  "Australia",
  "Austria",
  "Bahamas",
  "Bahrain",
  "Barbados",
  "Belgium",
  "Belize",
  "Bolivia",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Cambodia",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Fiji",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Guatemala",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kuwait",
  "Laos",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malaysia",
  "Maldives",
  "Malta",
  "Mexico",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "San Marino",
  "Saudi Arabia",
  "Seychelles",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Trinidad and Tobago",
  "Turkmenistan",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Vatican City",
  "Venezuela",
  "Vietnam",
];

// ---------------------------------------------------------------------------
// ALL_COUNTRIES — Step 3: Country of Birth
// Full world list — a person can be born in any country regardless of e-visa eligibility.
// ---------------------------------------------------------------------------

const ALL_COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "San Marino",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
