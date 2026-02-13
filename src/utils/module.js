/**
 * @module module
 * @description Utility module for age calculation based on birth date.
 * Provides functions to calculate a person's exact age in years.
 */

/**
 * Calculates a person's age in years based on their birth date.
 *
 * This function computes the exact age of a person by comparing their birth date
 * with a reference date (defaults to today). It performs comprehensive validation
 * to ensure the birth date is valid, not in the future, and represents a real date.
 *
 * The function validates:
 * 1. Input parameter `p` is provided
 * 2. The person object has a `birth` field
 * 3. The `birth` field is a valid JavaScript Date object
 * 4. The birth year is not before 1970 (data constraint)
 * 5. The birth date is not in the future
 * 6. The date is a valid calendar date (e.g., February 30 is invalid)
 *
 * @function calculateAge
 *
 * @param {Object} p - The person object containing birth information
 * @param {Date} p.birth - The birth date as a JavaScript Date object
 *                         Example: new Date("1995-05-15") or new Date(1995, 4, 15)
 *
 * @param {Date} [currentDate=new Date()] - Optional reference date for age calculation.
 *                                           Defaults to today's date if not provided.
 *                                           Useful for testing or calculating age at a specific date.
 *
 * @returns {number} The age in years. Calculated by comparing birth year with current year,
 *                   adjusted downward by 1 if the birthday hasn't occurred yet this year.
 *
 * @throws {Error} Throws an Error with descriptive message if validation fails:
 *   - "missing param p" if the person object `p` is not provided (null, undefined, etc.)
 *   - "missing birth field" if the person object doesn't have a `birth` property
 *   - "birth must be a valid Date" if `birth` is not a valid Date instance or is invalid (e.g., NaN)
 *   - "invalid date" if:
 *     * birth year is before 1970 (data constraint)
 *     * birth date is in the future (after currentDate)
 *     * the date is invalid on the calendar (e.g., Feb 30, Apr 31)
 *
 * @return {number} The calculated age in years.
 */
function calculateAge(p, currentDate = new Date()) {

    if (!p) {
        throw new Error("missing param p");
    }

    if (!("birth" in p)) {
        throw new Error("missing birth field");
    }

    if (!(p.birth instanceof Date) || isNaN(p.birth.getTime())) {
        throw new Error("birth must be a valid Date");
    }

    const birth = p.birth;

    if (birth.getFullYear() < 1970) {
        throw new Error("invalid date");
    }

    if (birth > currentDate) {
        throw new Error("invalid date");
    }

    const existingDate = new Date(
        birth.getFullYear(),
        birth.getMonth(),
        birth.getDate()
    );

    if (
        existingDate.getFullYear() !== birth.getFullYear() ||
        existingDate.getMonth() !== birth.getMonth() ||
        existingDate.getDate() !== birth.getDate()
    ) {
        throw new Error("invalid date");
    }

    let age = currentDate.getFullYear() - birth.getFullYear();

    const hasHadBirthday =
        currentDate.getMonth() > birth.getMonth() ||
        (currentDate.getMonth() === birth.getMonth() &&
            currentDate.getDate() >= birth.getDate());

    if (!hasHadBirthday) age--;

    return age;
}

/**
 * Export the calculateAge function for use in other modules
 * @exports module
 */
export {calculateAge}