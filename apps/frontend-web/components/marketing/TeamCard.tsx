import { marketingCardClass, marketingHeading } from "@/lib/marketing-ui";
import { cn } from "@/lib/cn";

export type TeamCardProps = {
  name: string;
  role: string;
};

function getInitials(name: string): string {
  if (name === "Coming Soon") {
    return "?";
  }
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TeamCard({ name, role }: TeamCardProps) {
  return (
    <div className={cn(marketingCardClass, "text-center")}>
      <div className="mx-auto mb-md flex h-32 w-32 items-center justify-center rounded-full bg-brand-light text-2xl font-semibold text-brand-primary">
        {getInitials(name)}
      </div>
      <h3 className={marketingHeading.h4}>{name}</h3>
      <p className={marketingHeading.body}>{role}</p>
    </div>
  );
}
