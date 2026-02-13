/**
 * Validates a birthdate and ensures the person is at least 18 years old.
 *
 * This function checks that:
 * 1. The birth parameter is a valid Date object
 * 2. The birthdate is not in the future
 * 3. The age calculated from the birthdate is at least 18 years old
 *
 * @function validateAge
 * @param {Date} birth - The birthdate to validate. Must be a valid JavaScript Date object.
 *
 * @throws {Object} Throws an error object with code and message properties if:
 *   - birth is not a valid Date instance or is NaN
 *     {code: "INVALID_DATE", message: "Birth date is invalid"}
 *   - birthdate is in the future
 *     {code: "INVALID_DATE", message: "Birth date cannot be in the future"}
 *   - calculated age is less than 18
 *     {code: "INVALID_AGE", message: "Must be at least 18 years old"}
 *
 * @returns {void} Returns nothing if validation passes
 *
 * @example
 * // Valid usage
 * const birthDate = new Date("1995-05-15");
 * validateAge(birthDate); // Passes if person is 18 or older
 *
 * @example
 * // Invalid usage - throws error
 * const futureBirth = new Date("2030-01-01");
 * validateAge(futureBirth); // Throws error with code "INVALID_DATE"
 */
function validateAge (birth) {
    if (!(birth instanceof Date) || isNaN(birth.getTime())) {
        throw { code: "INVALID_DATE", message: "Birth date is invalid" };
    }
    const now = new Date();

    if(birth > now) {
        throw { code: "INVALID_DATE", message: "Birth date cannot be in the future" };
    }
    let age = now.getFullYear() - birth.getFullYear();

    const hasHadBirthday = now.getMonth() > birth.getMonth() ||
        (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());

    if (!hasHadBirthday) age--;

    if (age < 18) {
        throw { code: "INVALID_AGE", message: "Must be at least 18 years old" };
    }
}

/**
 * Validates a French postal code format.
 *
 * A valid French postal code must be exactly 5 digits (0-9).
 * Examples: "75001", "69000", "13000"
 *
 * @function validatePostCode
 * @param {string} pc - The postal code string to validate
 *
 * @throws {Object} Throws an error object with code and message properties if:
 *   - pc is not a string
 *   - pc does not match the pattern of exactly 5 digits
 *     {code: "INVALID_POST_CODE", message: "Invalid post code"}
 *
 * @returns {void} Returns nothing if validation passes
 *
 * @example
 * // Valid postal codes
 * validatePostCode("75001"); // Paris
 * validatePostCode("13000"); // Marseille
 *
 * @example
 * // Invalid postal codes - throw errors
 * validatePostCode("750");    // Too short
 * validatePostCode("7500A");  // Contains letters
 * validatePostCode("ABC12");  // Wrong format
 */
function validatePostCode (pc) {
    if (typeof pc !== "string" || !/^\d{5}$/.test(pc)) {
        throw({ code: "INVALID_POST_CODE", message: "Invalid post code" });
    }
}

/**
 * Validates a person's name (firstname or lastname) and prevents XSS injection attacks.
 *
 * This function checks that:
 * 1. The name is a string
 * 2. The name does not contain HTML tags (XSS prevention)
 * 3. The name contains only valid characters (letters, accents, hyphens)
 *
 * Valid characters include:
 * - Standard Latin letters: A-Z, a-z
 * - Accented characters: À-Ö, ø-ÿ (for French and other European languages)
 * - Hyphens: - (common in French names)
 *
 * @function validateIdentity
 * @param {string} name - The person's name to validate (firstname or lastname)
 *
 * @throws {Object} Throws an error object with code and message properties if:
 *   - name is not a string
 *     {code: "INVALID_IDENTITY", message: "Invalid name"}
 *   - name contains HTML tags (XSS detection)
 *     {code: "INVALID_IDENTITY", message: "XSS detected"}
 *   - name contains invalid characters
 *     {code: "INVALID_IDENTITY", message: "Invalid characters in name"}
 *
 * @returns {void} Returns nothing if validation passes
 *
 * @example
 * // Valid names
 * validateIdentity("Jean");
 * validateIdentity("Marie-Claire");
 * validateIdentity("François");
 *
 * @example
 * // Invalid names - throw errors
 * validateIdentity("Jean123");        // Contains numbers
 * validateIdentity("<script>alert</script>"); // XSS attempt
 * validateIdentity("Jean@");          // Invalid special character
 */
function validateIdentity (name) {
    if (typeof name !== "string") {
        throw { code: "INVALID_IDENTITY", message: "Invalid name" };
    }

    if (/<[^>]*/.test(name)) {
        throw { code: "INVALID_IDENTITY", message: "XSS detected" };
    }

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\-]+$/.test(name)) {
        throw { code: "INVALID_IDENTITY", message: "Invalid characters in name" };
    }
}

/**
 * Validates an email address format.
 *
 * This function validates the basic structure of an email address.
 * Format: username@domain.extension
 *
 * Valid characters in username: letters, numbers, dots, underscores, hyphens
 * Valid characters in domain: letters, numbers, dots, hyphens
 * Extension must be at least 2 letters
 *
 * @function validateEmail
 * @param {string} email - The email address to validate
 *
 * @throws {Object} Throws an error object with code and message properties if:
 *   - email is not a string
 *   - email does not match the email format pattern
 *     {code: "INVALID_EMAIL", message: "Invalid email format"}
 *
 * @returns {void} Returns nothing if validation passes
 *
 * @example
 * // Valid email addresses
 * validateEmail("john.doe@example.com");
 * validateEmail("user_name@domain.fr");
 * validateEmail("contact-us@my-company.co.uk");
 *
 * @example
 * // Invalid email addresses - throw errors
 * validateEmail("invalid-email");       // Missing @ and domain
 * validateEmail("user@");               // Missing domain
 * validateEmail("@example.com");        // Missing username
 * validateEmail("user@domain");         // Missing extension
 */
function validateEmail (email) {
    if (typeof email !== "string" || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
        throw { code: "INVALID_EMAIL", message: "Invalid email format" };
    }
}

/**
 * Validates a town/city name and prevents XSS injection attacks.
 *
 * This function checks that:
 * 1. The town is a string
 * 2. The town does not contain HTML tags (XSS prevention)
 * 3. The town contains only valid characters (letters, accents, hyphens, spaces)
 *
 * Valid characters include:
 * - Standard Latin letters: A-Z, a-z
 * - Accented characters: À-Ö, ø-ÿ (for French town names)
 * - Hyphens: - (common in French town names, e.g., "Saint-Étienne")
 * - Spaces: (for multi-word town names)
 *
 * @function validateTown
 * @param {string} town - The town/city name to validate
 *
 * @throws {Object} Throws an error object with code and message properties if:
 *   - town is not a string
 *   - town contains invalid characters
 *     {code: "INVALID_TOWN", message: "Invalid town name"}
 *
 * @returns {void} Returns nothing if validation passes
 *
 * @example
 * // Valid town names
 * validateTown("Paris");
 * validateTown("Lyon");
 * validateTown("Saint-Étienne");
 * validateTown("Mont-de-Marsan");
 *
 * @example
 * // Invalid town names - throw errors
 * validateTown("Paris123");     // Contains numbers
 * validateTown("Paris@");       // Contains invalid special character
 * validateTown("<script>");     // Contains HTML tags
 */
function validateTown(town) {
    if (typeof town !== "string" || !/^[A-Za-zÀ-ÖØ-öø-ÿ\s\-]+$/.test(town)) {
        throw { code: "INVALID_TOWN", message: "Invalid town name" };
    }
}

/**
 * Export all validation functions for use in other modules
 * @exports validator
 */
export { validateAge, validatePostCode, validateIdentity, validateEmail, validateTown }
