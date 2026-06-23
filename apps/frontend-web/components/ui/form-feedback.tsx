import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FeedbackProps = {
  children?: ReactNode;
  className?: string;
  id?: string;
};

/** Inline validation message below a field. */
export function FormFieldError({ children, className, id }: FeedbackProps) {
  if (!children) {
    return null;
  }

  return (
    <p id={id} className={cn("form-field-error", className)} role="alert">
      {children}
    </p>
  );
}

/** Form-level or page-level error banner. */
export function FormErrorBanner({ children, className, id }: FeedbackProps) {
  if (!children) {
    return null;
  }

  return (
    <p id={id} className={cn("form-error-banner", className)} role="alert">
      {children}
    </p>
  );
}

/** Success confirmation banner (auth flows, saves). */
export function FormSuccessBanner({ children, className, id }: FeedbackProps) {
  if (!children) {
    return null;
  }

  return (
    <p id={id} className={cn("form-success-banner", className)} role="status">
      {children}
    </p>
  );
}

/** Apply when a field fails validation (`aria-invalid` companion). */
export function formInputInvalidClass(hasError: boolean): string | undefined {
  return hasError ? "form-input-invalid" : undefined;
}
