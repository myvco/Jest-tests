import React from "react";
import { toast } from "react-toastify";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Form from "../component/Form.jsx";
import { createUser, getUsers } from "../services/userService";
import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn()
  };
});

 vi.mock("../services/userService", () => ({
   createUser: vi.fn(),
   getUsers: vi.fn().mockResolvedValue([])
 }));

vi.mock("react-toastify", () => ({
  toast: {
    loading: vi.fn(() => 1),
    update: vi.fn(),
    error: vi.fn(),
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
    vi.clearAllMocks();
  });

  it("should call API and handle success (201)", async () => {
    const user = userEvent.setup();

    createUser.mockResolvedValue({ id: 11 });

    renderWithRouter(<Form />);

    await user.type(screen.getByPlaceholderText("lastname"), "Jean");
    await user.type(screen.getByPlaceholderText("firstname"), "Pierre");
    await user.type(screen.getByPlaceholderText("email"), "test@example.com");
    await user.type(screen.getByPlaceholderText("birth"), "1995-05-15");
    await user.type(screen.getByPlaceholderText("postCode"), "75001");
    await user.type(screen.getByPlaceholderText("town"), "Paris");

    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(createUser).toHaveBeenCalled();
    });
  });

  it("should handle error (400)", async () => {
    const user = userEvent.setup();

    createUser.mockRejectedValue({
      response: {
        status: 400,
        data: { message: "Email already exists" }
      }
    });

    renderWithRouter(<Form />);

    await user.type(screen.getByPlaceholderText("lastname"), "Jean");
    await user.type(screen.getByPlaceholderText("firstname"), "Pierre");
    await user.type(screen.getByPlaceholderText("email"), "test@example.com");
    await user.type(screen.getByPlaceholderText("birth"), "1995-05-15");
    await user.type(screen.getByPlaceholderText("postCode"), "75001");
    await user.type(screen.getByPlaceholderText("town"), "Paris");

    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(toast.update).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          render: expect.stringMatching(/email already exists/i),
          type: "error"
        })
      );
    });
  });

  it("should handle server crash (500)", async () => {
    const user = userEvent.setup();

    createUser.mockRejectedValue({
      response: { status: 500 }
    });

    renderWithRouter(<Form />);

    await user.type(screen.getByPlaceholderText("lastname"), "Jean");
    await user.type(screen.getByPlaceholderText("firstname"), "Pierre");
    await user.type(screen.getByPlaceholderText("email"), "test@example.com");
    await user.type(screen.getByPlaceholderText("birth"), "1995-05-15");
    await user.type(screen.getByPlaceholderText("postCode"), "75001");
    await user.type(screen.getByPlaceholderText("town"), "Paris");

    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(toast.update).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          render: expect.stringMatching(/server error/i),
          type: "error"
        })
      );
    });
  });

    it("should clear error when value becomes valid after touched", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Form />);

      const emailInput = screen.getByPlaceholderText("email");

      await user.click(emailInput);
      await user.tab();

      await user.type(emailInput, "invalid");

      await waitFor(() => {
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      });

      await user.clear(emailInput);
      await user.type(emailInput, "valid@email.com");

      await waitFor(() => {
        expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
      });
    });

    it("should prevent submission if email already exists (case insensitive)", async () => {
      const user = userEvent.setup();

      const existingEmail = "test@example.com";

      const { getUsers } = await import("../services/userService");

      getUsers.mockResolvedValue({
        utilisateurs: [
            { email: existingEmail }
          ]
      });

      renderWithRouter(<Form />);

      await user.type(screen.getByPlaceholderText("lastname"), "Jean");
      await user.type(screen.getByPlaceholderText("firstname"), "Pierre");
      await user.type(screen.getByPlaceholderText("email"), "TEST@example.com"); // majuscules
      await user.type(screen.getByPlaceholderText("birth"), "1995-05-15");
      await user.type(screen.getByPlaceholderText("postCode"), "75001");
      await user.type(screen.getByPlaceholderText("town"), "Paris");

      await user.click(screen.getByRole("button", { name: /submit/i }));

      await waitFor(() => {

        expect(createUser).not.toHaveBeenCalled();

        expect(toast.update).toHaveBeenCalledWith(
          1,
          expect.objectContaining({
            render: expect.stringMatching(/email already exists/i),
            type: "error"
          })
        );
      });
    });

   it("should navigate to home on successful submission", async () => {
     const user = userEvent.setup();

     const mockNavigate = vi.fn();
     useNavigate.mockReturnValue(mockNavigate);

     getUsers.mockResolvedValue([]);
     createUser.mockResolvedValue({ id: 11 });

     renderWithRouter(<Form />);

     await user.type(screen.getByPlaceholderText("lastname"), "Jean");
     await user.type(screen.getByPlaceholderText("firstname"), "Pierre");
     await user.type(screen.getByPlaceholderText("email"), "test@example.com");
     await user.type(screen.getByPlaceholderText("birth"), "1995-05-15");
     await user.type(screen.getByPlaceholderText("postCode"), "75001");
     await user.type(screen.getByPlaceholderText("town"), "Paris");

     await user.click(screen.getByRole("button", { name: /submit/i }));

     await waitFor(() => {
       expect(createUser).toHaveBeenCalled();
     });

     const successCall = toast.update.mock.calls.find(
       call => call[1].onClose
     );

     expect(successCall).toBeDefined();

     successCall[1].onClose();

     expect(mockNavigate).toHaveBeenCalledWith("/");
   });

    it("should handle unexpected error", async () => {
      const user = userEvent.setup();

      createUser.mockRejectedValue(new Error("Network failure"));

      getUsers.mockResolvedValue([]);

      renderWithRouter(<Form />);

      await user.type(screen.getByPlaceholderText("lastname"), "Jean");
      await user.type(screen.getByPlaceholderText("firstname"), "Pierre");
      await user.type(screen.getByPlaceholderText("email"), "test@example.com");
      await user.type(screen.getByPlaceholderText("birth"), "1995-05-15");
      await user.type(screen.getByPlaceholderText("postCode"), "75001");
      await user.type(screen.getByPlaceholderText("town"), "Paris");

      await user.click(screen.getByRole("button", { name: /submit/i }));

      await waitFor(() => {
        expect(toast.update).toHaveBeenCalledWith(
          1,
          expect.objectContaining({
            render: expect.stringMatching(/unexpected error/i),
            type: "error"
          })
        );
      });
    });

});