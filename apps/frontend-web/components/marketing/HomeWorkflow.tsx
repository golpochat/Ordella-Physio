import { marketingHeading } from "@/lib/marketing-ui";
import { cn } from "@/lib/cn";

export type HomeWorkflowProps = {
  step: string;
  title: string;
  description: string;
};

export function HomeWorkflow({ step, title, description }: HomeWorkflowProps) {
  return (
    <div className="fade-in flex items-start gap-xl">
      <div className="font-display text-4xl font-bold leading-tight text-brand-primary" aria-hidden>
        {step}
      </div>
      <div>
        <h3 className={cn("mb-xs", marketingHeading.h4)}>{title}</h3>
        <p className={marketingHeading.body}>{description}</p>
      </div>
    </div>
  );
}
