import { describe, it, expect } from 'vitest';
import { calculateAge } from "../utils/module.js";

/**
 * @function calculateAge
 */
describe('calculateAge Unit Test Suites', () => {

    it('should return a correct age', () => {
        const loise = { birth: new Date('1991-11-07') };

        const fakeDate = new Date('2026-12-01');

        expect(calculateAge(loise, fakeDate)).toBe(35);
    });

    it('should throw a "missing param p" error', () => {
        expect(() => calculateAge())
            .toThrow("missing param p");
    });

    it('should throw "missing birth field" error', () => {
        expect(() => calculateAge({}))
            .toThrow("missing birth field");
    });

    it('should throw "birth must be a valid Date" error', () => {
        const invalidValues = [undefined, null, {}, 123, new Date("invalid")];

        invalidValues.forEach(value => {
            expect(() => calculateAge({ birth: value }))
                .toThrow("birth must be a valid Date");
        });
    });

    it('should throw "invalid date" for past or future dates', () => {
        const invalidBirthDates = [
            new Date(1969, 11, 31),
            new Date(Date.now() + 1)
        ];

        invalidBirthDates.forEach(date => {
            expect(() => calculateAge({ birth: date }))
                .toThrow("invalid date");
        });
    });

});


//"1997/11/02"
/**c'est plutot si la date est malformé
par exemple le 13ieme mois
ou le 30 fevrier
ou avant 1970
ou dans le futur 🙂
donc la je t'ai donné 4 tests possibles haha**/