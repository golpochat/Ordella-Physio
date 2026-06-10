import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/hooks/use-theme";

describe("Navbar", () => {
  it("renders brand and navigation links", () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText("Ordella Physio")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute("href", "/pricing");
  });
});
