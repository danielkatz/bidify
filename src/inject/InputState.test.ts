import "jest";
import InputState from "./InputState";

test("Throws if value is null", () => {
    const f = () => new InputState(null, 0, 0);
    expect(f).toThrow();
});

test("Throws if value is undefined", () => {
    const f = () => new InputState(undefined, 0, 0);
    expect(f).toThrow();
});

test("Throws if selectionEnd is out of bounds", () => {
    const f = () => new InputState("foo", 0, 4);
    expect(f).toThrow();
});

test("Throws if selectionStart larger than selectionEnd", () => {
    const f = () => new InputState("foo", 1, 0);
    expect(f).toThrow();
});

test("Can instansiate an InputState", () => {
    expect(new InputState("foo", 1, 3)).toEqual({
        value: "foo",
        selectionStart: 1,
        selectionEnd: 3,
    });
});

test("Can generate empty value", () => {
    const input = new InputState("", 0, 0);
    expect(input.toDebugString()).toBe("[]");
});

test("Can generate LRE sybmol", () => {
    const input = new InputState("\u202A", 0, 0);
    expect(input.toDebugString()).toBe("[]→");
});

test("Can generate RLE sybmol", () => {
    const input = new InputState("\u202B", 0, 0);
    expect(input.toDebugString()).toBe("[]←");
});

test("Can generate PDF sybmol", () => {
    const input = new InputState("\u202C", 0, 0);
    expect(input.toDebugString()).toBe("[]♦");
});

test("Can generate combination", () => {
    const input = new InputState("A" + "\u202B" + "BCDE" + "\u202C" + "FG", 2, 5);
    expect(input.toDebugString()).toBe("A←[BCD]E♦FG");
});