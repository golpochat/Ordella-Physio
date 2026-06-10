import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/marketing/hero-section";

describe("HeroSection", () => {
  it("renders headline and CTAs", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByText("Modern Physiotherapy Practice Management")).toBeInTheDocument();
    expect(screen.getByText(/Scheduling, notes, billing/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Get Started/i })).toHaveAttribute("href", "/pricing");
    expect(screen.getByRole("link", { name: /Book Demo/i })).toHaveAttribute("href", "/contact");
  });
});
