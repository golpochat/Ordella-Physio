import { PageHeader } from "@/components/dashboard/PageHeader";

export type DashboardPlaceholderProps = {
  title: string;
  description?: string;
};

export function DashboardPlaceholder({ title, description }: DashboardPlaceholderProps) {
  return (
    <div className="dashboard-page">
      <PageHeader title={title} subtitle={description} />
      <p className="text-sm text-muted-foreground">Dashboard content coming soon.</p>
    </div>
  );
}
