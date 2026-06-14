"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import type { ZodType } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { PortalCapability } from "@/lib/portal-capabilities";
import { TenantScopeBanner } from "./tenant-scope-banner";
import { useClinicScope } from "./use-clinic-scope";

export type ClinicFormProps<T extends FieldValues> = {
  schema: ZodType<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  children: (form: UseFormReturn<T>) => ReactNode;
  submitLabel?: string;
  className?: string;
  writeCapability?: PortalCapability;
  showTenantBanner?: boolean;
  id?: string;
};

export function ClinicForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  submitLabel = "Save",
  className,
  writeCapability,
  showTenantBanner = true,
  id,
}: ClinicFormProps<T>) {
  const { can, hasTenant } = useClinicScope();
  const canWrite = writeCapability ? can(writeCapability) : true;
  const form = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  if (!hasTenant) {
    return showTenantBanner ? <TenantScopeBanner /> : null;
  }

  if (writeCapability && !canWrite) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        You do not have permission to submit this form.
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form
        id={id}
        className={cn("space-y-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {showTenantBanner ? <TenantScopeBanner /> : null}
        {children(form)}
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={form.formState.isSubmitting || !canWrite}>
            {form.formState.isSubmitting ? "Saving…" : submitLabel}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export { FormField } from "@/components/ui/form-field";
