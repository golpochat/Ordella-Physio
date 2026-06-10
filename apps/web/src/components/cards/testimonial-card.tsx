import { Card, CardContent, CardFooter } from "@/components/ui/card";

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

export function TestimonialCard({ quote, author, role, avatar }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <p className="text-muted-foreground">&ldquo;{quote}&rdquo;</p>
      </CardContent>
      <CardFooter className="gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold">{author}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
