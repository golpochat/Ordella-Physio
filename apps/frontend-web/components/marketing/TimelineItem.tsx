export type TimelineItemProps = {
  year: string;
  title: string;
  description: string;
};

export function TimelineItem({ year, title, description }: TimelineItemProps) {
  return (
    <div className="relative border-l-2 border-brand-primary/30 pb-xl pl-brand-xl">
      <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-brand-primary" aria-hidden />
      <h4 className="mb-xs font-display text-xl font-semibold text-brand-primary">{year}</h4>
      <h5 className="mb-xs text-lg font-semibold text-foreground">{title}</h5>
      <p className="text-brand-gray">{description}</p>
    </div>
  );
}
