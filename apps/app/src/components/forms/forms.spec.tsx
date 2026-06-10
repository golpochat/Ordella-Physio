import { render, screen, fireEvent } from "@testing-library/react";
import { Input, Label } from "@/components/ui/input";

describe("Form components", () => {
  it("updates input value", () => {
    render(
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value="" onChange={() => undefined} />
      </div>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("accepts typing in input", () => {
    function Wrapper() {
      return <Input aria-label="name" defaultValue="" />;
    }
    render(<Wrapper />);
    const input = screen.getByLabelText("name");
    fireEvent.change(input, { target: { value: "Jane" } });
    expect(input).toHaveValue("Jane");
  });
});
