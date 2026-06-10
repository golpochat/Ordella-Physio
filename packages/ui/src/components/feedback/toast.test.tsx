import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { toast, Toaster } from "../feedback/toast";

describe("Toast system", () => {
  afterEach(() => cleanup());

  it("renders toast via hook", async () => {
    render(<Toaster />);
    toast({ title: "Saved", description: "Changes were saved successfully." });
    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Changes were saved successfully.")).toBeInTheDocument();
  });
});
