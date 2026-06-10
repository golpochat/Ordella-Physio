import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroCta() {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <Button asChild size="lg">
        <Link href="/contact">
          Book Demo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button asChild variant="outline" size="lg">
        <Link href="/pricing">Start Free Trial</Link>
      </Button>
    </div>
  );
}
