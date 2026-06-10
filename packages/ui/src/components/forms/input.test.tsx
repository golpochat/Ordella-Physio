import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "../forms/input";

describe("Input", () => {
  it("renders with label association", () => {
    render(
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" placeholder="you@example.com" />
      </div>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="name" />);
    const input = screen.getByLabelText("name");
    await user.type(input, "Jane");
    expect(input).toHaveValue("Jane");
  });
});
