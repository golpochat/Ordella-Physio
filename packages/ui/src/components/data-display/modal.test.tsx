import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Modal, ModalContent, ModalTitle } from "../data-display/modal";

describe("Modal", () => {
  it("renders title when open", () => {
    render(
      <Modal open>
        <ModalContent>
          <ModalTitle>Confirm action</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    expect(screen.getByText("Confirm action")).toBeInTheDocument();
  });
});
