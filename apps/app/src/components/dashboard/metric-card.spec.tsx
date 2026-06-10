import { render, screen } from "@testing-library/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

describe("Dashboard components", () => {
  it("renders metric card", () => {
    render(
      <Card>
        <CardHeader><CardTitle>New Patients</CardTitle></CardHeader>
        <CardContent>12</CardContent>
      </Card>,
    );
    expect(screen.getByText("New Patients")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });
});
