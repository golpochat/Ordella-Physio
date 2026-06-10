import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

type PricingCardProps = {
  name: string;
  price: number | null;
  period: string;
  description: string;
  features: readonly string[];
  cta: string;
  highlighted?: boolean;
};

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted = false,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col",
        highlighted && "border-primary shadow-lg ring-1 ring-primary/20",
      )}
      data-testid="pricing-card"
    >
      <CardHeader>
        {highlighted ? (
          <span className="mb-2 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Most popular
          </span>
        ) : null}
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          {price !== null ? (
            <p className="text-4xl font-bold">
              ${price}
              <span className="text-base font-normal text-muted-foreground">/{period}</span>
            </p>
          ) : (
            <p className="text-4xl font-bold">Custom</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3 text-sm">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant={highlighted ? "default" : "outline"}>
          <Link href={price === null ? "/contact" : "/pricing"}>{cta}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
