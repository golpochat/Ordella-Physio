import { render, screen } from "@testing-library/react";
import { PricingCard } from "@/components/cards/pricing-card";

describe("PricingCard", () => {
  it("renders tier details", () => {
    render(
      <PricingCard
        name="Starter"
        price={49}
        period="month"
        description="For solo practitioners"
        features={["Scheduling", "SOAP notes"]}
        cta="Start free trial"
      />,
    );
    expect(screen.getByTestId("pricing-card")).toBeInTheDocument();
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("$49")).toBeInTheDocument();
    expect(screen.getByText("Scheduling")).toBeInTheDocument();
  });

  it("renders custom enterprise pricing", () => {
    render(
      <PricingCard
        name="Enterprise"
        price={null}
        period="custom"
        description="For large organizations"
        features={["Dedicated support"]}
        cta="Contact sales"
      />,
    );
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });
});
