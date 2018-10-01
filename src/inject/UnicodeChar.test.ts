import "jest";
import { UnicodeChar } from "./UnicodeChar";
import { UnicodeCharType } from "./UnicodeCharType";
import { UnicodeString } from "./UnicodeString";

describe("UnicodeChar", () => {
    describe("constructor", () => {
        test("throws when char is empty string", () => {
            const t = () => new UnicodeChar("", UnicodeCharType.Literal);

            expect(t).toThrow();
        });

        test("throws when char is longer than one charachter", () => {
            const t = () => new UnicodeChar("AB", UnicodeCharType.Literal);

            expect(t).toThrow();
        });
    });

    describe("parent", () => {
        test("returns null when unparented", () => {
            const char = new UnicodeChar("A", UnicodeCharType.Literal);

            expect(char.parent).toBeNull();
        });

        test("returns parent when exists", () => {
            const char = new UnicodeChar("A", UnicodeCharType.Literal);
            const parent = new UnicodeString([char]);

            expect(char.parent).toBe(parent);
        });
    });

    describe("length", () => {
        test("returns 1", () => {
            const char = new UnicodeChar("A", UnicodeCharType.Literal);

            expect(char.length).toBe(1);
        });
    });

    describe("offset", () => {
        test("returns NaN when unparented", () => {
            const char = new UnicodeChar("A", UnicodeCharType.Literal);

            expect(char.offset).toBeNaN();
        });
    });
});
