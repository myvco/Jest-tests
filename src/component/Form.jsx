/**
 * @module Form
 * @description A React form component for user registration with comprehensive field validation.
 */

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { createUser, getUsers } from "../services/userService";
import {
    validateAge,
    validatePostCode,
    validateIdentity,
    validateEmail,
    validateTown,
} from "../utils/validator";

/**
 * Initial form state with empty fields for all registration inputs
 * @type {Object}
 * @property {string} lastname - User's last name
 * @property {string} firstname - User's first name
 * @property {string} email - User's email address
 * @property {string} birth - User's birth date (ISO format)
 * @property {string} postCode - User's postal code
 * @property {string} town - User's city/town
 */
const initialState = {
    lastname: "",
    firstname: "",
    email: "",
    birth: "",
    postCode: "",
    town: ""
};

/**
 * Form Component - A comprehensive registration form with real-time validation.
 *
 * This React component provides a user registration form with the following features:
 * - Real-time field validation using validator functions
 * - Disabled submit button until all fields are valid
 * - Toast notifications for user feedback
 * - Local storage persistence of submitted data
 * - Error message display for each field
 * - Support for all required registration fields
 *
 * The component manages:
 * 1. Form state - Current values of all input fields
 * 2. Error state - Validation errors for each field
 * 3. Validity state - Boolean flag indicating if the entire form is valid
 *
 * All fields are required and validated using specific validation rules:
 * - lastname/firstname: Letters and accents only, no numbers or special characters (XSS safe)
 * - email: Valid email format with @ and domain
 * - birth: Valid date, must be 18+ years old, not in future, after 1970
 * - postCode: French format, exactly 5 digits
 * - town: Letters and accents, hyphens and spaces allowed (XSS safe)
 *
 * @component
 * @returns {React.ReactElement} A form container with input fields and submission button
 *
 * @state {Object} form - Current form values
 *   - Updated on input change via handleChange
 *   - Reset to initialState after successful submission
 *
 * @state {Object} errors - Validation error messages
 *   - Keys match field names (lastname, firstname, email, birth, postCode, town)
 *   - Values are error message strings or undefined if field is valid
 *
 * @state {boolean} isValid - Overall form validity
 *   - true when all fields are filled and have no errors
 *   - Controls disabled state of submit button
 *
 * @see {@link validateAge} - Birth date validation function
 * @see {@link validatePostCode} - Postal code validation function
 * @see {@link validateIdentity} - Name validation function
 * @see {@link validateEmail} - Email validation function
 * @see {@link validateTown} - Town name validation function
 */
function Form() {
    const [form, setForm] = useState(initialState);
      const [errors, setErrors] = useState({});
      const [touched, setTouched] = useState({});
      const [isValid, setIsValid] = useState(false);
      const navigate = useNavigate();

    /**
     * Validates a single form field using appropriate validator function.
     *
     * Calls the correct validation function based on field type and catches
     * any validation errors, returning the error message if validation fails.
     *
     * @function validateField
     * @param {string} name - The field name (lastname, firstname, email, birth, postCode, town)
     * @param {string} value - The field value to validate
     *
     * @returns {string|undefined} Error message if validation fails, undefined if valid
     *
     * @throws {Object} Catches validation errors from validator functions
     *   Each validator throws {code: string, message: string} on error
     */
    const validateField = (name, value) => {
        try {
          if (name === "email") {
            validateEmail(value);
          } else if (name === "lastname" || name === "firstname") {
            validateIdentity(value);
          } else if (name === "birth") {
            if (!value) throw { message: "This field is required" };
            validateAge(new Date(value));
          } else if (name === "postCode") {
            validatePostCode(value);
          } else if (name === "town") {
            validateTown(value);
          }
          return undefined;
        } catch (err) {
          return err.message || err.code;
        }
      };

    /**
     * Validates the entire form and updates error and validity states.
     *
     * Checks all fields for:
     * 1. Presence (not empty, null, undefined, or whitespace)
     * 2. Validity (passes field-specific validation)
     *
     * Updates the errors state with validation messages and sets isValid flag.
     *
     * @function validateForm
     * @returns {Object} Object containing validation results
     *   @returns {Object} newErrors - Map of field names to error messages
     *   @returns {boolean} allFilled - True if all fields have values
     *   @returns {boolean} noErrors - True if all fields pass validation
     *
     */
    const validateForm = () => {
        const newErrors = {};

        Object.entries(form).forEach(([name, value]) => {
          if (!value || String(value).trim() === "") {
            newErrors[name] = "This field is required";
          } else {
            const fieldError = validateField(name, value);
            if (fieldError) newErrors[name] = fieldError;
          }
        });

        setErrors(newErrors);

        const noErrors = Object.keys(newErrors).length === 0;
        const allFilled = Object.values(form).every(
          (v) => v && String(v).trim() !== ""
        );

        setIsValid(noErrors && allFilled);

        return { noErrors, allFilled };
      };

    /**
     * Effect hook that validates the form whenever form state changes.
     * Provides real-time validation feedback to the user.
     *
     * @effect
     * @dependency {Object} form - Re-validates when any field value changes
     */
    useEffect(() => {
        validateForm();
    }, [form]);

    /**
     * Handles input field changes and updates form state.
     * Triggered on every keystroke or date selection change.
     *
     * @function handleChange
     * @param {Event} e - The change event from input element
     * @param {string} e.target.name - The field name
     * @param {string} e.target.value - The new field value
     *
     * Updates the form state for the changed field while preserving other fields.
     * The validateForm effect hook will automatically validate the updated form.
     */
   const handleChange = (e) => {
       const { name, value } = e.target;
       setForm((prev) => ({ ...prev, [name]: value }));

       if (touched[name]) {
         const error = validateField(name, value);
         setErrors((prev) => ({ ...prev, [name]: error }));
       }
     };

    /**
     * Handles form submission.
     * Validates the form and saves data to localStorage if valid.
     * Displays success/error toast notifications to the user.
     *
     * @function handleSubmit
     * @param {Event} e - The submit event
     * @param {function} e.preventDefault - Prevents default form submission behavior
     *
     * Process:
     * 1. Prevent default form submission
     * 2. Validate the form one final time
     * 3. If invalid, return early without submitting
     * 4. Save form data to localStorage under "user" key
     * 5. Show loading toast
     * 6. After 300ms: clear form, show success toast
     *
     */
    const handleSubmit = async (e) => {
      e.preventDefault();

      const { noErrors, allFilled } = validateForm();
      if (!noErrors || !allFilled) return;

      const id = toast.loading("Submitting form...");

      try {
        const existingUsers = await getUsers();

        const emailAlreadyExists = existingUsers.some(
          user => user.email.toLowerCase() === form.email.toLowerCase()
        );

        if (emailAlreadyExists) {
          toast.update(id, {
            render: "Email already exists",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });

          setErrors(prev => ({
            ...prev,
            email: "Email already exists"
          }));

          return;
        }

        await createUser(form);

        toast.update(id, {
          render: "Form successfully submitted!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
          onClose: () => navigate("/"),
        });

        setForm(initialState);
        setTouched({});
        setErrors({});
        setIsValid(false);

      } catch (error) {

          if (error.response?.status === 400) {

            const message = error.response.data?.message || "Email already exists";

            toast.update(id, {
              render: message,
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });

          }
          else if (error.response?.status === 500) {

            toast.update(id, {
              render: "Server error. Please try again later.",
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });

          }
          else {

            toast.update(id, {
              render: "Unexpected error occurred.",
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
          }
        }
    };

    /**
     * Render the registration form component
     *
     * Layout:
     * - Form title "Registration Form"
     * - Bordered section containing form fields
     * - Six input fields: lastname, firstname, email, birth, postCode, town
     * - Submit button (disabled until form is valid)
     * - Toast notification container
     *
     */
     return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="w-full max-w-3xl bg-[#f8f5f1] rounded-3xl shadow-xl p-10">

            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Registration Form
            </h1>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">

              {Object.keys(initialState).map((field) => (
                <div key={field}>
                  <input
                    type={field === "birth" ? "date" : "text"}
                    name={field}
                    placeholder={field}
                    value={form[field]}
                    onChange={handleChange}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, [field]: true }));
                      const error = validateField(field, form[field]);
                      setErrors((prev) => ({ ...prev, [field]: error }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl border transition
                    ${
                      touched[field] && errors[field]
                        ? "border-red-400 bg-red-50 focus:ring-red-200"
                        : "border-gray-300 focus:ring-indigo-200"
                    }
                    focus:outline-none focus:ring-2`}
                  />

                  {touched[field] && errors[field] && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-3 rounded-xl font-semibold transition
                  ${
                    isValid
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Submit
              </button>
            </form>

            <ToastContainer />
          </div>
        </div>
      );
    }

export default Form;
