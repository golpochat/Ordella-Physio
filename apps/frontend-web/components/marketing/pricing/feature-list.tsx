import { Check } from "@ordella/shared-icons";

export type FeatureListProps = {
  features: string[];
};

export function FeatureList({ features }: FeatureListProps) {
  return (
    <ul className="space-y-3">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-sm">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
