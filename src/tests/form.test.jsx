import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Form from "../component/Form.jsx";

    vi.mock("react-toastify", () => ({
      toast: {
        loading: vi.fn(() => 1),
        update: vi.fn(),
      },
      ToastContainer: () => <div />,
    }));

    const renderWithRouter = (ui) => {
      return render(
        <MemoryRouter>
          {ui}
        </MemoryRouter>
      );
    };

describe("Form validation", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it("button is disabled when form is incomplete and enabled when valid", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Form />);

      const submitButton = screen.getByRole("button", { name: /submit/i });
      expect(submitButton).toBeDisabled();

      await user.type(screen.getByPlaceholderText("lastname"), "Jean");
      await user.type(screen.getByPlaceholderText("firstname"), "Pierre");
      await user.type(screen.getByPlaceholderText("email"), "jean@example.com");
      await user.type(screen.getByPlaceholderText("birth"), "1995-05-15");
      await user.type(screen.getByPlaceholderText("postCode"), "75001");
      await user.type(screen.getByPlaceholderText("town"), "Paris");

      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });
    });

  it("should save in local storage on successful submission", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Form />);

      await user.type(screen.getByPlaceholderText("lastname"), "Jean");
      await user.type(screen.getByPlaceholderText("firstname"), "Pierre");
      await user.type(screen.getByPlaceholderText("email"), "test@example.com");
      await user.type(screen.getByPlaceholderText("birth"), "1995-05-15");
      await user.type(screen.getByPlaceholderText("postCode"), "75001");
      await user.type(screen.getByPlaceholderText("town"), "Paris");

      await user.click(screen.getByRole("button", { name: /submit/i }));

      await waitFor(() => {
        const storedData = JSON.parse(localStorage.getItem("users"));
        expect(storedData).toHaveLength(1);
      });
    });

});
