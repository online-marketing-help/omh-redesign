"use client";

import { useId } from "react";

// Form primitives with the states the brief requires (§18 forms, §24):
// label above field, visible required mark, help text, error identification
// not by colour alone, 44px+ tap target. Future Elementor widget: "OMH Form Field".
export function Field({
  label,
  name,
  required,
  help,
  error,
  success,
  disabled,
  type = "text",
  placeholder,
  defaultValue,
  autoComplete,
}: {
  label: string;
  /* Defaults to the visible label so submitted enquiries read as the questions
     the visitor answered. See lib/send-enquiry.tsx. */
  name?: string;
  required?: boolean;
  help?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  autoComplete?: string;
}) {
  const id = useId();
  const describedBy = error ? `${id}-err` : help ? `${id}-help` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-label font-semibold text-ink">
        {label}
        {required && (
          <span className="text-error" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name ?? label}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`min-h-12 w-full rounded-input border-[1.5px] bg-surface px-3.5 text-body text-ink placeholder:text-muted/70
          disabled:cursor-not-allowed disabled:bg-warm disabled:text-muted
          ${error ? "border-error" : success ? "border-success" : "border-line"}`}
      />
      {help && !error && (
        <p id={`${id}-help`} className="text-bsm text-muted">
          {help}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="flex items-center gap-1.5 text-bsm font-medium text-error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-4 shrink-0" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
          {error}
        </p>
      )}
      {success && !error && (
        <p className="flex items-center gap-1.5 text-bsm font-medium text-success">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden>
            <path d="m5 13 4 4L19 7" />
          </svg>
          {success}
        </p>
      )}
    </div>
  );
}
