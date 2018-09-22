import "jest";
import TextFieldState from "./TextFieldState";

describe("constructor", () => {
    test("throws if value is null", () => {
        const f = () => new TextFieldState(null, 0, 0);
        expect(f).toThrow();
    });

    test("throws if value is undefined", () => {
        const f = () => new TextFieldState(undefined, 0, 0);
        expect(f).toThrow();
    });

    test("throws if selectionEnd is out of bounds", () => {
        const f = () => new TextFieldState("foo", 0, 4);
        expect(f).toThrow();
    });

    test("throws if selectionStart larger than selectionEnd", () => {
        const f = () => new TextFieldState("foo", 1, 0);
        expect(f).toThrow();
    });

    test("can instansiate an TextFieldState", () => {
        expect(new TextFieldState("foo", 1, 3)).toEqual({
            value: "foo",
            selectionStart: 1,
            selectionEnd: 3,
        });
    });
});

describe("toDebugString", () => {
    test("can generate empty value", () => {
        const input = new TextFieldState("", 0, 0);
        expect(input.toDebugString()).toBe("[]");
    });

    test("can generate LRE sybmol", () => {
        const input = new TextFieldState("\u202A", 0, 0);
        expect(input.toDebugString()).toBe("[]→");
    });

    test("can generate RLE sybmol", () => {
        const input = new TextFieldState("\u202B", 0, 0);
        expect(input.toDebugString()).toBe("[]←");
    });

    test("can generate PDF sybmol", () => {
        const input = new TextFieldState("\u202C", 0, 0);
        expect(input.toDebugString()).toBe("[]♦");
    });

    test("can generate combination", () => {
        const input = new TextFieldState("A" + "\u202B" + "BCDE" + "\u202C" + "FG", 2, 5);
        expect(input.toDebugString()).toBe("A←[BCD]E♦FG");
    });
});

describe("fromDebugString", () => {
    test("requires selection symbols", () => {
        const f = () => TextFieldState.fromDebugString("");
        expect(f).toThrow();
    });

    test("requires end selection symbol", () => {
        const f = () => TextFieldState.fromDebugString("[");
        expect(f).toThrow();
    });

    test("requires selection start symbol", () => {
        const f = () => TextFieldState.fromDebugString("]");
        expect(f).toThrow();
    });

    test("requires selection start before end", () => {
        const f = () => TextFieldState.fromDebugString("][");
        expect(f).toThrow();
    });

    test("can parse empty string", () => {
        const result = TextFieldState.fromDebugString("[]");
        expect(result).toEqual({
            value: "",
            selectionStart: 0,
            selectionEnd: 0,
        });
    });

    test("can parse non-empty string with collaped selection at index 0", () => {
        const result = TextFieldState.fromDebugString("[]ABCDEFG");
        expect(result).toEqual({
            value: "ABCDEFG",
            selectionStart: 0,
            selectionEnd: 0,
        });
    });

    test("can parse non-empty string with collaped selection at the end", () => {
        const result = TextFieldState.fromDebugString("ABCDEFG[]");
        expect(result).toEqual({
            value: "ABCDEFG",
            selectionStart: 7,
            selectionEnd: 7,
        });
    });

    test("can parse non-empty string with selection", () => {
        const result = TextFieldState.fromDebugString("AB[CDE]FG");
        expect(result).toEqual({
            value: "ABCDEFG",
            selectionStart: 2,
            selectionEnd: 5,
        });
    });

    test("can parse LRE sybmol", () => {
        const result = TextFieldState.fromDebugString("[]→");
        expect(result).toEqual({
            value: "\u202A",
            selectionStart: 0,
            selectionEnd: 0,
        });
    });

    test("can parse RLE sybmol", () => {
        const result = TextFieldState.fromDebugString("[]←");
        expect(result).toEqual({
            value: "\u202B",
            selectionStart: 0,
            selectionEnd: 0,
        });
    });

    test("can parse PDF sybmol", () => {
        const result = TextFieldState.fromDebugString("[]♦");
        expect(result).toEqual({
            value: "\u202C",
            selectionStart: 0,
            selectionEnd: 0,
        });
    });

    test("can parse combination", () => {
        const result = TextFieldState.fromDebugString("A←[BCD]E♦FG");
        expect(result).toEqual({
            value: "A" + "\u202B" + "BCDE" + "\u202C" + "FG",
            selectionStart: 2,
            selectionEnd: 5,
        });
    });
});