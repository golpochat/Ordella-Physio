import type { ReactNode } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";

export type ListPageProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  loadingRows?: number;
  children: ReactNode;
};

export function ListPage({
  title,
  subtitle,
  action,
  isLoading = false,
  isError = false,
  onRetry,
  loadingRows = 4,
  children,
}: ListPageProps) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} action={action} />
      {isLoading ? <PageLoading rows={loadingRows} /> : null}
      {isError ? <PageError onRetry={onRetry} /> : null}
      {!isLoading && !isError ? children : null}
    </>
  );
}
