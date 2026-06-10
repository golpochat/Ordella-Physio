export type DashboardPlaceholderProps = {
  title: string;
  description?: string;
};

export function DashboardPlaceholder({ title, description }: DashboardPlaceholderProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description ? <p className="text-muted-foreground">{description}</p> : null}
      </div>
      <p className="text-sm text-muted-foreground">Dashboard content coming soon.</p>
    </div>
  );
}
