/**
 * Calculate a person's age in years.
 *
 * @param {object} p An object representing a person, implementing a birth Date parameter.
 * @return {number} The age in years of p.
 */
function calculateAge(p) {
    //No argument
    if (!p) {
        throw new Error("missing param p");
    }

    //No birth field
    if (!("birth" in p)) {
        throw new Error("missing birth field");
    }

    //Not a valid date format (invalid)
    if (!(p.birth instanceof Date) || isNaN(p.birth.getTime())) {
        throw new Error("birth must be a valid Date");
    }

    const birth = p.birth;
    const now = new Date();

    if (birth.getFullYear() < 1970) {
        throw new Error("invalid date");
    }

    if (birth > now) {
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

    const dateDiff = new Date(now - birth);
    return Math.abs(dateDiff.getUTCFullYear() - 1970);
}

export {calculateAge}