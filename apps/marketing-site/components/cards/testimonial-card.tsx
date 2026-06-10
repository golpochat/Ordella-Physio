import { Star } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
  rating: number;
};

export function TestimonialCard({ quote, author, role, rating }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardBody className="pt-6">
        <div className="mb-4 flex gap-1">
          {Array.from({ length: rating }).map((_, index) => (
            <Star key={index} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>
        <blockquote className="text-muted-foreground">&ldquo;{quote}&rdquo;</blockquote>
        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {author
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
