"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { Field, inputClass } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  createDraftApplication,
  getLatestDraftApplication,
  submitApplication,
  updateApplicationStep,
  uploadDocument,
} from "@/actions/applications";

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
  passportIssuingCountry: string;
  addressInAzerbaijan: string;
  passportCopy: FileList | null;
  // Step 5 — Review
  declaration: boolean;
  // Step 6 — Visa Type
  visaType: string;
  stayDurationDays: string;
  applicantNotes: string;
}


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
    occupationBusinessOwner: string;
    occupationStudent: string;
    occupationRetired: string;
    occupationUnemployed: string;
    occupationGovernment: string;
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
    passportIssuingCountry: string;
    passportIssuingCountryPlaceholder: string;
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
    placeOfBirth: string;
    sex: string;
    occupation: string;
    email: string;
    passportNumber: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    passportIssuingCountry: string;
    uploadedDoc: string;
    addressInAzerbaijan: string;
    emptyValue: string;
    declarationLabel: string;
    back: string;
    next: string;
  };
  step6: {
    number: string;
    title: string;
    subtitle: string;
    visaType: string;
    visaTypePlaceholder: string;
    stayDurationDays: string;
    stayDurationDaysPlaceholder: string;
    applicantNotes: string;
    applicantNotesPlaceholder: string;
    orderTitle: string;
    visaFeeLabel: string;
    serviceFeeLabel: string;
    totalLabel: string;
    supportText: string;
    back: string;
    submit: string;
    submissionSuccess: string;
  };
  validation: {
    required: string;
    email: string;
    passportFormat: string;
    fileRequired: string;
    fileSize: string;
    fileType: string;
    declarationRequired: string;
    stayDurationMax: string;
  };
}

type CountryOption = {
  id: number;
  name: string;
  availablePurposes: {
    id: number;
    name: string;
  }[];
};

type VisaTypePrice = {
  purposeId: number;
  purposeType: string;
  totalPrice: number;
  currency: string;
};

type VisaTypeOption = {
  id: number;
  name: string;
  processingTimeText: string;
  maxStayDays: number;
  validityDays: number;
  prices: VisaTypePrice[];
};

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
  countryOptions,
}: {
  labels: ApplyLabels;
  onNext: () => Promise<void>;
  countryOptions: CountryOption[];
}) {
  const {
    register,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useFormContext<ApplicationFormData>();

  const nationality = watch("nationality");

  useEffect(() => {
    setValue("purposeOfVisit", "");
  }, [nationality, setValue]);

  const handleNext = async () => {
    const ok = await trigger(["nationality", "documentType"]);
    if (ok) await onNext();
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
            {countryOptions.map((country) => (
              <option key={country.id} value={String(country.id)}>
                {country.name}
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
            <option value="ordinary_passport">{l.docOrdinary}</option>
            <option value="service_passport">{l.docOfficial}</option>
            <option value="diplomatic_passport">{l.docDiplomatic}</option>
            <option value="travel_document">{l.docEmergency}</option>
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
  countryOptions,
}: {
  labels: ApplyLabels;
  onBack: () => void;
  onNext: () => Promise<void>;
  countryOptions: CountryOption[];
}) {
  const {
    register,
    formState: { errors },
    trigger,
    watch,
  } = useFormContext<ApplicationFormData>();

  const handleNext = async () => {
    const ok = await trigger(["arrivalDate", "purposeOfVisit"]);
    if (ok) await onNext();
  };

  const l = labels.step2;
  const v = labels.validation;
  const selectedCountry = countryOptions.find(
    (country) => String(country.id) === watch("nationality"),
  );

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
            {selectedCountry?.availablePurposes.map((purpose) => (
              <option key={purpose.id} value={String(purpose.id)}>
                {purpose.name}
              </option>
            ))}
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
  countryOptions,
}: {
  labels: ApplyLabels;
  onBack: () => void;
  onNext: () => Promise<void>;
  countryOptions: CountryOption[];
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
    if (ok) await onNext();
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
        <Field label={l.countryOfBirth} error={errors.countryOfBirth?.message}>
          <Select
            {...register("countryOfBirth", { required: v.required })}
            hasError={!!errors.countryOfBirth}
          >
            <option value="">{l.countryOfBirthPlaceholder}</option>
            {countryOptions.map((country) => (
              <option key={country.id} value={String(country.id)}>
                {country.name}
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
            <option value="self_employed">{l.occupationSelfEmployed}</option>
            <option value="business_owner">{l.occupationBusinessOwner}</option>
            <option value="student">{l.occupationStudent}</option>
            <option value="retired">{l.occupationRetired}</option>
            <option value="unemployed">{l.occupationUnemployed}</option>
            <option value="government">{l.occupationGovernment}</option>
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
  countryOptions,
}: {
  labels: ApplyLabels;
  onBack: () => void;
  onNext: () => Promise<void>;
  countryOptions: CountryOption[];
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
    "passportIssuingCountry",
    "addressInAzerbaijan",
  ];

  const handleNext = async () => {
    const ok = await trigger(step4Fields);
    if (ok) await onNext();
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
        <Field
          label={l.passportIssuingCountry}
          error={errors.passportIssuingCountry?.message}
        >
          <Select
            {...register("passportIssuingCountry", { required: v.required })}
            hasError={!!errors.passportIssuingCountry}
          >
            <option value="">{l.passportIssuingCountryPlaceholder}</option>
            {countryOptions.map((country) => (
              <option key={country.id} value={String(country.id)}>
                {country.name}
              </option>
            ))}
          </Select>
        </Field>
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
                  ["image/jpeg", "image/png", "application/pdf"].includes(
                    files[0].type,
                  ) ||
                  v.fileType,
              },
            })}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
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
              {row.value}
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
  countryOptions,
}: {
  labels: ApplyLabels;
  onBack: () => void;
  onNext: () => Promise<void>;
  goToStep: (step: number) => void;
  countryOptions: CountryOption[];
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
    if (ok) await onNext();
  };

  const l = labels.step5;
  const selectedNationality =
    countryOptions.find((country) => String(country.id) === values.nationality)
      ?.name ?? l.emptyValue;
  const selectedCountryOfBirth =
    countryOptions.find(
      (country) => String(country.id) === values.countryOfBirth,
    )?.name ?? l.emptyValue;
  const selectedPassportIssuingCountry =
    countryOptions.find(
      (country) => String(country.id) === values.passportIssuingCountry,
    )?.name ?? l.emptyValue;
  const selectedPurpose =
    countryOptions
      .find((country) => String(country.id) === values.nationality)
      ?.availablePurposes.find(
        (purpose) => String(purpose.id) === values.purposeOfVisit,
      )?.name ?? l.emptyValue;
  const documentTypeLabels: Record<string, string> = {
    ordinary_passport: labels.step1.docOrdinary,
    service_passport: labels.step1.docOfficial,
    diplomatic_passport: labels.step1.docDiplomatic,
    travel_document: labels.step1.docEmergency,
  };
  const genderLabels: Record<string, string> = {
    male: labels.step3.sexMale,
    female: labels.step3.sexFemale,
  };
  const occupationLabels: Record<string, string> = {
    employed: labels.step3.occupationEmployed,
    self_employed: labels.step3.occupationSelfEmployed,
    business_owner: labels.step3.occupationBusinessOwner,
    student: labels.step3.occupationStudent,
    retired: labels.step3.occupationRetired,
    unemployed: labels.step3.occupationUnemployed,
    government: labels.step3.occupationGovernment,
    other: labels.step3.occupationOther,
  };

  return (
    <div>
      <StepHeader num={l.number} title={l.title} subtitle={l.subtitle} />
      <div className="flex flex-col gap-4">
        <ReviewSection
          title={l.countryRegionTitle}
          editLabel={l.edit}
          onEdit={() => goToStep(0)}
          rows={[
            { label: l.nationality, value: selectedNationality },
            {
              label: l.documentType,
              value: documentTypeLabels[values.documentType] ?? l.emptyValue,
            },
          ]}
        />
        <ReviewSection
          title={l.arrivalDateTitle}
          editLabel={l.edit}
          onEdit={() => goToStep(1)}
          rows={[
            { label: l.arrivalDate, value: values.arrivalDate },
            { label: l.purposeOfVisit, value: selectedPurpose },
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
            { label: l.countryOfBirth, value: selectedCountryOfBirth },
            {
              label: l.placeOfBirth,
              value: values.placeOfBirth || l.emptyValue,
            },
            { label: l.sex, value: genderLabels[values.sex] ?? l.emptyValue },
            {
              label: l.occupation,
              value: occupationLabels[values.occupation] ?? l.emptyValue,
            },
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
              label: l.passportIssuingCountry,
              value: selectedPassportIssuingCountry,
            },
            {
              label: l.uploadedDoc,
              value:
                values.passportCopy && values.passportCopy.length > 0
                  ? (values.passportCopy[0]?.name ?? l.emptyValue)
                  : l.emptyValue,
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
// Step 6 — Visa Type
// ---------------------------------------------------------------------------

function Step6({
  labels,
  onBack,
  loading,
  visaTypes,
}: {
  labels: ApplyLabels;
  onBack: () => void;
  loading: boolean;
  visaTypes: VisaTypeOption[];
}) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<ApplicationFormData>();

  const l = labels.step6;
  const v = labels.validation;
  const visaType = watch("visaType");
  const purposeOfVisit = watch("purposeOfVisit");
  const selectedVisaType = visaTypes.find((vt) => String(vt.id) === visaType) ?? null;
  const selectedPrice = selectedVisaType?.prices.find(
    (p) => String(p.purposeId) === purposeOfVisit,
  ) ?? null;

  return (
    <div>
      <StepHeader num={l.number} title={l.title} subtitle={l.subtitle} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Visa type form */}
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
              <span className="text-sm font-semibold">{l.visaType}</span>
            </div>

            <div className="px-5 py-5 flex flex-col gap-4">
              <Field label={l.visaType} error={errors.visaType?.message}>
                <Select
                  {...register("visaType", { required: v.required })}
                  hasError={!!errors.visaType}
                >
                  <option value="">{l.visaTypePlaceholder}</option>
                  {visaTypes.map((vt) => (
                    <option key={vt.id} value={String(vt.id)}>
                      {vt.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field
                label={l.stayDurationDays}
                error={errors.stayDurationDays?.message}
              >
                <Input
                  {...register("stayDurationDays", {
                    required: v.required,
                    validate: (value) =>
                      Number(value) <= 30 || v.stayDurationMax,
                  })}
                  type="number"
                  min={1}
                  max={30}
                  placeholder={l.stayDurationDaysPlaceholder}
                  hasError={!!errors.stayDurationDays}
                />
              </Field>
              <Field label={l.applicantNotes} error={undefined}>
                <textarea
                  {...register("applicantNotes")}
                  rows={5}
                  placeholder={l.applicantNotesPlaceholder}
                  className={twMerge(
                    inputClass(false),
                    "min-h-28 resize-y py-3",
                  )}
                />
              </Field>
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
                <span className="font-medium text-[#1F2937]">
                  {selectedPrice ? `$${selectedPrice.totalPrice}` : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6F7A72]">{l.serviceFeeLabel}</span>
                <span className="font-medium text-[#1F2937]">—</span>
              </div>
              {selectedVisaType && (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6F7A72]">Processing time</span>
                    <span className="font-medium text-[#1F2937]">
                      {selectedVisaType.processingTimeText}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6F7A72]">Validity</span>
                    <span className="font-medium text-[#1F2937]">
                      {selectedVisaType.validityDays} days
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6F7A72]">Max stay</span>
                    <span className="font-medium text-[#1F2937]">
                      {selectedVisaType.maxStayDays} days
                    </span>
                  </div>
                </>
              )}
              <div className="pt-2.5 mt-1 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-bold text-[#1F2937]">
                  {l.totalLabel}
                </span>
                <span className="text-xl font-black text-[#004E34]">
                  {selectedPrice ? `$${selectedPrice.totalPrice}` : "—"}
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
// Success screen
// ---------------------------------------------------------------------------

function SuccessScreen({ referenceNumber }: { referenceNumber: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#004E34]/10 mb-6">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 text-[#004E34]"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-[#1F2937] mb-2">
        Application Submitted!
      </h2>
      <p className="text-[#6F7A72] text-sm max-w-sm mb-6">
        Your application has been received. We will review it and send updates
        to your email address.
      </p>

      <div className="bg-[#004E34]/5 border border-[#004E34]/20 rounded-xl px-6 py-4 mb-8">
        <p className="text-xs text-[#6F7A72] mb-1">Reference Number</p>
        <p className="text-xl font-bold tracking-widest text-[#004E34]">
          {referenceNumber}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="/check-status"
          className="px-6 py-2.5 rounded-lg bg-[#004E34] text-white text-sm font-semibold hover:bg-[#003322] transition-colors"
        >
          Check Status
        </a>
        <a
          href="/"
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-[#6F7A72] text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Failed screen
// ---------------------------------------------------------------------------

function FailedScreen({
  errorMessage,
  onRetry,
}: {
  errorMessage: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 text-red-500"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M15 9l-6 6M9 9l6 6" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-[#1F2937] mb-2">
        Submission Failed
      </h2>
      <p className="text-[#6F7A72] text-sm max-w-sm mb-3">
        Something went wrong while submitting your application.
      </p>
      {errorMessage && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-2.5 max-w-sm mb-8">
          {errorMessage}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="px-6 py-2.5 rounded-lg bg-[#004E34] text-white text-sm font-semibold hover:bg-[#003322] transition-colors"
        >
          Try Again
        </button>
        <a
          href="/contact-us"
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-[#6F7A72] text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main wizard
// ---------------------------------------------------------------------------

export function ApplyWizard({
  labels,
  countryOptions,
  visaTypes,
}: {
  labels: ApplyLabels;
  countryOptions: CountryOption[];
  visaTypes: VisaTypeOption[];
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "failed">("idle");
  const [submissionError, setSubmissionError] = useState("");

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
      email: "",
      passportNumber: "",
      passportIssueDate: "",
      passportExpiryDate: "",
      passportIssuingCountry: "",
      addressInAzerbaijan: "",
      passportCopy: null,
      declaration: false,
      visaType: "",
      stayDurationDays: "30",
      applicantNotes: "",
    },
  });

  const next = useCallback(() => setCurrentStep((s) => Math.min(s + 1, 5)), []);
  const back = useCallback(() => setCurrentStep((s) => Math.max(s - 1, 0)), []);
  const goToStep = useCallback((step: number) => setCurrentStep(step), []);

  const extractReferenceNumber = useCallback((data: unknown): string | null => {
    if (!data || typeof data !== "object") {
      return null;
    }

    const source = data as Record<string, unknown>;

    if (typeof source.reference_number === "string") {
      return source.reference_number;
    }

    if (
      source.application &&
      typeof source.application === "object" &&
      source.application !== null &&
      typeof (source.application as Record<string, unknown>)
        .reference_number === "string"
    ) {
      return (source.application as Record<string, string>).reference_number;
    }

    return null;
  }, []);

  const ensureDraftApplication = useCallback(async () => {
    if (referenceNumber) {
      return referenceNumber;
    }

    const nationalityId = Number(methods.getValues("nationality"));
    if (!Number.isFinite(nationalityId) || nationalityId <= 0) {
      throw new Error(labels.validation.required);
    }

    const created = await createDraftApplication({
      nationality: nationalityId,
    });

    if (!created.success) {
      throw new Error(created.error);
    }

    let nextReferenceNumber = extractReferenceNumber(created.data);

    if (!nextReferenceNumber) {
      const latestDraft = await getLatestDraftApplication();

      if (!latestDraft.success) {
        throw new Error(latestDraft.error);
      }

      nextReferenceNumber = extractReferenceNumber(latestDraft.data);
    }

    if (!nextReferenceNumber) {
      throw new Error("Application reference number was not returned.");
    }

    setReferenceNumber(nextReferenceNumber);
    return nextReferenceNumber;
  }, [
    extractReferenceNumber,
    labels.validation.required,
    methods,
    referenceNumber,
  ]);

  const persistStep = useCallback(
    async (
      step: number,
      payload: Record<string, string | number | boolean>,
    ) => {
      const currentReferenceNumber = await ensureDraftApplication();
      const result = await updateApplicationStep(
        currentReferenceNumber,
        step,
        payload,
      );

      if (!result.success) {
        throw new Error(result.error);
      }
    },
    [ensureDraftApplication],
  );

  const handleStep1Next = useCallback(async () => {
    next();
  }, [next]);

  const handleStep2Next = useCallback(async () => {
    try {
      await persistStep(1, {
        nationality: Number(methods.getValues("nationality")),
        document_type: methods.getValues("documentType"),
        arrival_date: methods.getValues("arrivalDate"),
        visa_purpose: Number(methods.getValues("purposeOfVisit")),
      });
      next();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }, [methods, next, persistStep]);

  const handleStep3Next = useCallback(async () => {
    try {
      await persistStep(2, {
        first_name: methods.getValues("firstName"),
        last_name: methods.getValues("surname"),
        other_names: methods.getValues("otherNames"),
        date_of_birth: methods.getValues("dateOfBirth"),
        country_of_birth: Number(methods.getValues("countryOfBirth")),
        place_of_birth: methods.getValues("placeOfBirth"),
        gender: methods.getValues("sex"),
        occupation: methods.getValues("occupation"),
        mobile_number: methods.getValues("mobileNumber"),
        address: methods.getValues("address"),
        email: methods.getValues("email"),
      });
      next();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }, [methods, next, persistStep]);

  const handleStep4Next = useCallback(async () => {
    try {
      const ref = await ensureDraftApplication();

      await persistStep(3, {
        passport_number: methods.getValues("passportNumber"),
        passport_issue_date: methods.getValues("passportIssueDate"),
        passport_expiry_date: methods.getValues("passportExpiryDate"),
        passport_issuing_country: Number(
          methods.getValues("passportIssuingCountry"),
        ),
        address_in_azerbaijan: methods.getValues("addressInAzerbaijan"),
      });

      const files = methods.getValues("passportCopy");
      if (files && files.length > 0) {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("document_type", "passport_photo");
        const result = await uploadDocument(ref, formData);
        if (!result.success) {
          toast.error(result.error);
          return;
        }
      }

      next();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }, [ensureDraftApplication, methods, next, persistStep]);

  const handleStep5Next = useCallback(async () => {
    next();
  }, [next]);

  const handleSubmit = methods.handleSubmit(async () => {
    setSubmitting(true);
    try {
      await persistStep(4, {
        visa_type: Number(methods.getValues("visaType")),
        stay_duration_days: Number(methods.getValues("stayDurationDays")),
        applicant_notes: methods.getValues("applicantNotes"),
      });

      const currentReferenceNumber = await ensureDraftApplication();
      const result = await submitApplication(currentReferenceNumber);

      if (!result.success) {
        setSubmissionError(result.error);
        setSubmissionStatus("failed");
        return;
      }

      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : String(error));
      setSubmissionStatus("failed");
    } finally {
      setSubmitting(false);
    }
  });

  if (submissionStatus === "success") {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
        <SuccessScreen referenceNumber={referenceNumber ?? ""} />
      </div>
    );
  }

  if (submissionStatus === "failed") {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
        <FailedScreen
          errorMessage={submissionError}
          onRetry={() => {
            setSubmissionStatus("idle");
            setSubmissionError("");
          }}
        />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex items-start gap-6">
          <Sidebar current={currentStep} labels={labels} />
          <div className="flex-1 min-w-0 px-6 bg-white border border-gray-200 shadow-sm rounded-xl py-7">
            {currentStep === 0 && (
              <Step1
                labels={labels}
                onNext={handleStep1Next}
                countryOptions={countryOptions}
              />
            )}
            {currentStep === 1 && (
              <Step2
                labels={labels}
                onBack={back}
                onNext={handleStep2Next}
                countryOptions={countryOptions}
              />
            )}
            {currentStep === 2 && (
              <Step3
                labels={labels}
                onBack={back}
                onNext={handleStep3Next}
                countryOptions={countryOptions}
              />
            )}
            {currentStep === 3 && (
              <Step4
                labels={labels}
                onBack={back}
                onNext={handleStep4Next}
                countryOptions={countryOptions}
              />
            )}
            {currentStep === 4 && (
              <Step5
                labels={labels}
                onBack={back}
                onNext={handleStep5Next}
                goToStep={goToStep}
                countryOptions={countryOptions}
              />
            )}
            {currentStep === 5 && (
              <Step6
                labels={labels}
                onBack={back}
                loading={submitting}
                visaTypes={visaTypes}
              />
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
