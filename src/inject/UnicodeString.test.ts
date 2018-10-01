import "jest";
import { UnicodeChar } from "./UnicodeChar";
import { UnicodeCharType } from "./UnicodeCharType";
import { UnicodeEmbedding } from "./UnicodeEmbedding";
import { UnicodeString } from "./UnicodeString";

describe("UnicodeString", () => {
    describe("constructor", () => {
        test("0 arguments supplied", () => {
            const str = new UnicodeString();

            expect(str.children.length).toBe(0);
        });

        test("1 argument supplied", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const str = new UnicodeString([child]);

            expect(str.children).toContain(child);
        });

        test("sets parent property of children", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const str = new UnicodeString([child]);

            expect(child.parent).toBe(str);
        });
    });

    describe("addChild", () => {
        test("adds child to children", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const str = new UnicodeString();

            str.addChild(child);

            expect(str.children).toContain(child);
        });

        test("sets parent property to this instance", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const str = new UnicodeString();

            str.addChild(child);

            expect(child.parent).toBe(str);
        });

        test("throws if node already has a parent", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const str1 = new UnicodeString([child]);
            const str2 = new UnicodeString();

            const t = () => str2.addChild(child);

            expect(t).toThrow();
        });
    });

    describe("removeChild", () => {
        test("removes child from children", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const str = new UnicodeString([child]);

            str.removeChild(child);

            expect(str.children).not.toContain(child);
        });

        test("sets parent property to null", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const str = new UnicodeString([child]);

            str.removeChild(child);

            expect(child.parent).toBeNull();
        });
    });

    describe("length", () => {
        test("returns 0 when no children", () => {
            const str = new UnicodeString();

            expect(str.length).toBe(0);
        });

        test("counts children to the length", () => {
            const str = new UnicodeString([
                new UnicodeChar("A", UnicodeCharType.Literal),
            ]);

            expect(str.length).toBe(1);
        });

        test("can count length recursively", () => {
            const str = new UnicodeString([
                new UnicodeChar("A", UnicodeCharType.Literal),
                new UnicodeEmbedding(
                    new UnicodeChar("←", UnicodeCharType.RightToLeftEmbeddingStart),
                    [
                        new UnicodeChar("B", UnicodeCharType.Literal),
                    ],
                    new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd)),
            ]);

            expect(str.length).toBe(4);
        });
    });

    describe("getChildOffset", () => {
        test("counts children to the offset of children", () => {
            const child1 = new UnicodeChar("A", UnicodeCharType.Literal);
            const child2 = new UnicodeChar("B", UnicodeCharType.Literal);
            const str = new UnicodeString([
                child1,
                child2,
            ]);

            expect(str.getChildOffset(child1)).toBe(0);
            expect(str.getChildOffset(child2)).toBe(1);
        });

        test("can count offset of children with nested embeddings", () => {
            const child = new UnicodeChar("C", UnicodeCharType.Literal);
            const str = new UnicodeString([
                new UnicodeEmbedding(
                    new UnicodeChar("←", UnicodeCharType.RightToLeftEmbeddingStart),
                    [
                        new UnicodeChar("A", UnicodeCharType.Literal),
                        new UnicodeChar("B", UnicodeCharType.Literal),
                    ],
                    new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd)),
                child]);

            expect(str.getChildOffset(child)).toBe(4);
        });

        test("throws when child arg is not a child of this instance", () => {
            const nonChild = new UnicodeChar("A", UnicodeCharType.Literal);
            const str = new UnicodeString();

            expect(() => str.getChildOffset(nonChild)).toThrow();
        });
    });
});
