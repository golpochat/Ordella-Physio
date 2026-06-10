"use client";

import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

export type AppFormProps<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
  onSubmit: (values: T) => void | Promise<void>;
  children: (form: UseFormReturn<T>) => ReactNode;
  className?: string;
};

export function Form<T extends FieldValues>({
  defaultValues,
  onSubmit,
  children,
  className,
}: AppFormProps<T>) {
  const form = useForm<T>({ defaultValues });

  return (
    <FormProvider {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        {children(form)}
      </form>
    </FormProvider>
  );
}
