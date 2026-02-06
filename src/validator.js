/**
 * Validate that age is minimum 18 years old based on date birth
 *
 * @param {Date} birth in the input
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
};

/**
 *Validates french post code format
 *
 * @param {string} pc to validate must contain 5 digits
 */
function validatePostCode (pc) {
    if (typeof pc !== "string" || !/^\d{5}$/.test(pc)) {
        throw({ code: "INVALID_POST_CODE", message: "Invalid post code" });
    }
};


/**
 *Validates a person's identity by name and reject xss injection
 *
 * @param {string} name to validate
 */
function validateIdentity (name) {
    if (typeof name !== "string") {
        throw { code: "INVALID_IDENTITY", message: "Invalid name" };
    }

    if (/<[^>]*/.test(name)) {
        throw { code: "INVALID_IDENTITY", message: "XSS detected" };
    };

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\-]+$/.test(name)) {
        throw { code: "INVALID_IDENTITY", message: "Invalid characters in name" };
    }
};

/**
 *Validates an email format
 *
 * @param {string} email to validates
 */
function validateEmail (email) {
    if (typeof email !== "string" || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
        throw { code: "INVALID_EMAIL", message: "Invalid email format" };
    }
};

export {validateAge, validatePostCode, validateIdentity, validateEmail }