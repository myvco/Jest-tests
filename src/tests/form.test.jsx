import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../component/Form.jsx"

describe("Form validation", () => {

    it ("button is disabled when form is incomplete and invalid or enabled when completed and valid", async () => {
        const user = userEvent.setup();

        render(<Form />);

        const submitButton = screen.getByRole("button", { name: /submit/i });

        expect(submitButton).toBeDisabled();

        const lastnameInput = screen.getByPlaceholderText("lastname");
        const firstnameInput = screen.getByPlaceholderText("firstname");
        const emailInput = screen.getByPlaceholderText("email");
        const birthInput = screen.getByPlaceholderText("birth");
        const postCodeInput = screen.getByPlaceholderText("postCode");
        const townInput = screen.getByPlaceholderText("town");

        await user.type(lastnameInput, "Jean");
        await user.type(firstnameInput, "Pierre");
        await user.type(emailInput, "jean@example.com");
        await user.type(birthInput, "1995-05-15");
        await user.type(postCodeInput, "75001");
        await user.type(townInput, "Paris");

        expect(submitButton).toBeEnabled();
    });

    it ("shows error messages for invalid fields in red", async () => {
        const user = userEvent.setup();

        render(<Form />);

        const lastnameInput = screen.getByPlaceholderText("lastname");
        const emailInput = screen.getByPlaceholderText("email");

        await user.type(lastnameInput, "Jean123");
        await user.tab(lastnameInput);
        expect(screen.getByText(/invalid characters in name/i)).toBeInTheDocument();
        expect(lastnameInput).toHaveClass("text-red-500");

        await user.type(emailInput, "invalid-email");
        await user.tab(emailInput);
        expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
        expect(emailInput).toHaveClass("text-red-500");
    });

    it ("should show loading and success message on form submission", async () => {
        const user = userEvent.setup();

        render(<Form />);

        const submitButton = screen.getByRole("button", { name: /submit/i });
        const lastnameInput = screen.getByPlaceholderText("lastname");
        const firstnameInput = screen.getByPlaceholderText("firstname");
        const emailInput = screen.getByPlaceholderText("email");
        const birthInput = screen.getByPlaceholderText("birth");
        const postCodeInput = screen.getByPlaceholderText("postCode");
        const townInput = screen.getByPlaceholderText("town");

        await user.type(lastnameInput, "Jean");
        await user.type(firstnameInput, "Pierre");
        await user.type(emailInput, "test@example.com");
        await user.type(birthInput, "1995-05-15");
        await user.type(postCodeInput, "75001");
        await user.type(townInput, "Paris");

        await user.click(submitButton);

        expect(screen.getByText(/submitting form/i)).toBeInTheDocument();

        const successMessage = await screen.findByText(/form successfully submitted!/i);
        expect(successMessage).toBeInTheDocument();
    });

    it ("should empty form and disable submit button after successful submission", async () => {
        const user = userEvent.setup();

        render(<Form />);

        const submitButton = screen.getByRole("button", { name: /submit/i });
        const lastnameInput = screen.getByPlaceholderText("lastname");
        const firstnameInput = screen.getByPlaceholderText("firstname");
        const emailInput = screen.getByPlaceholderText("email");
        const birthInput = screen.getByPlaceholderText("birth");
        const postCodeInput = screen.getByPlaceholderText("postCode");
        const townInput = screen.getByPlaceholderText("town");

        await user.type(lastnameInput, "Jean");
        await user.type(firstnameInput, "Pierre");
        await user.type(emailInput, "test@example.fr");
        await user.type(birthInput, "1995-05-15");
        await user.type(postCodeInput, "75001");
        await user.type(townInput, "Paris");

        await user.click(submitButton);

        const successMessage = await screen.findByText(/form successfully submitted!/i);
        expect(successMessage).toBeInTheDocument();

        expect(lastnameInput).toHaveValue("");
        expect(firstnameInput).toHaveValue("");
        expect(emailInput).toHaveValue("");
        expect(birthInput).toHaveValue("");
        expect(postCodeInput).toHaveValue("");
        expect(townInput).toHaveValue("");

        expect(submitButton).toBeDisabled();
    });

    it ("should save in local storage on successful submission", async () => {
        beforeEach(() => {
            localStorage.clear();
        });

        const user = userEvent.setup();

        render(<Form />);

        const submitButton = screen.getByRole("button", { name: /submit/i });
        const lastnameInput = screen.getByPlaceholderText("lastname");
        const firstnameInput = screen.getByPlaceholderText("firstname");
        const emailInput = screen.getByPlaceholderText("email");
        const birthInput = screen.getByPlaceholderText("birth");
        const postCodeInput = screen.getByPlaceholderText("postCode");
        const townInput = screen.getByPlaceholderText("town");

        await user.type(lastnameInput, "Jean");
        await user.type(firstnameInput, "Pierre");
        await user.type(emailInput, "test@example.com");
        await user.type(birthInput, "1995-05-15");
        await user.type(postCodeInput, "75001");
        await user.type(townInput, "Paris");

        await user.click(submitButton);

        const successMessage = await screen.findByText(/form successfully submitted!/i);
        expect(successMessage).toBeInTheDocument();

        const storedData = JSON.parse(localStorage.getItem("user"));

        expect(storedData).toEqual({
            lastname: "Jean",
            firstname: "Pierre",
            email: "test@example.com",
            birth: "1995-05-15",
            postCode: "75001",
            town: "Paris"
        });
    })
});

