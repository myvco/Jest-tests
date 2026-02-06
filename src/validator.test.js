import {
    validateAge,
    validatePostCode,
    validateIdentity,
    validateEmail
} from "./validator.js";

describe("Validation form", () => {

    // AGE
    it('should throw "invalid date" for future birth date', () => {
        expect(() =>
            validateAge(new Date("2030-01-01"))
        ).toThrow(expect.objectContaining({ code: "INVALID_DATE" }));
    });

    it("should accept 18 years old", () => {
        expect(() =>
            validateAge(new Date("1999-03-01"))
        ).not.toThrow();
    });

    it("should reject age under 18", () => {
        expect(() =>
            validateAge(new Date("2008-03-02"))
        ).toThrow(expect.objectContaining({ code: "INVALID_AGE" }));
    });

    it("should handle leap year birthday", () => {
        expect(() =>
            validateAge(new Date("2008-02-29"))
        ).toThrow(expect.objectContaining({ code: "INVALID_AGE" }));
    });

    //POST CODE
    it("should accept a valid post code", () => {
        expect(() => validatePostCode("37000")).not.toThrow();
    });

    it("should reject invalid post code", () => {
        ["3700", "ABCDE", "3700A"].forEach(cp => {
            expect(() =>
                validatePostCode(cp)
            ).toThrow(expect.objectContaining({ code: "INVALID_POST_CODE" }));
        });
    });

    //IDENTITY
    it("should accept valid name", () => {
        expect(() => validateIdentity("Jean-Michel")).not.toThrow();
        expect(() => validateIdentity("loïse")).not.toThrow();
    });

    it("should reject invalid names or XSS injection", () => {
        ["Jean123", "loï/se", "<script>alert(1)</script>"].forEach(name => {
            expect(() =>
                validateIdentity(name)
            ).toThrow(expect.objectContaining({ code: "INVALID_IDENTITY" }));
        });
    });

    //MAIL
    it("should accept a valid mail", () => {
        expect(() =>
            validateEmail("test@gmail.com")
        ).not.toThrow();
    });

    it("should reject invalid emails", () => {
        ["test@", "@example.com", "test.com", "//test@gmail.com"].forEach(email => {
            expect(() =>
                validateEmail(email)
            ).toThrow(expect.objectContaining({ code: "INVALID_EMAIL" }));
        });
    });

});
