import "jest";
import { DebugUnicodeCodes } from "./UnicodeCodes";
import { UnicodeEmbedding } from "./UnicodeEmbedding";
import { UnicodeEmbeddingType } from "./UnicodeEmbeddingType";
import { UnicodeInline } from "./UnicodeInline";
import { UnicodeString } from "./UnicodeString";
import { UnicodeStringParser } from "./UnicodeStringParser";

describe("UnicodeStringParser", () => {
    test("can parse empty string", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("");

        expect(result).toBeInstanceOf(UnicodeString);
        expect(result.parent).toBeNull();
        expect(result.children.length).toBe(0);
    });

    test("can parse a plain text", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("ABC");

        expect(result.children.length).toBe(1);
        expect(result.children[0]).toBeInstanceOf(UnicodeInline);
        expect((result.children[0] as UnicodeInline).text).toBe("ABC");
    });

    test("can parse a LTR embedding", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("→ABC♦");

        const expected = new UnicodeString(
            [
                new UnicodeEmbedding(UnicodeEmbeddingType.LeftToRight, true, true,
                    [
                        new UnicodeInline("ABC"),
                    ]),
            ]);

        expect(result).toEqual(expected);
    });

    test("can parse a RTL embedding", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("←ABC♦");

        const expected = new UnicodeString(
            [
                new UnicodeEmbedding(UnicodeEmbeddingType.RightToLeft, true, true,
                    [
                        new UnicodeInline("ABC"),
                    ]),
            ]);

        expect(result).toEqual(expected);
    });

    test("can parse embedding with missing closing character", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("←ABC");

        const expected = new UnicodeString(
            [
                new UnicodeEmbedding(UnicodeEmbeddingType.RightToLeft, true, false,
                    [
                        new UnicodeInline("ABC"),
                    ]),
            ]);

        expect(result).toEqual(expected);
    });

    test("can parse embedding with missing opening character", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("ABC♦");

        const expected = new UnicodeString(
            [
                new UnicodeInline("ABC"),
                new UnicodeEmbedding(UnicodeEmbeddingType.Natural, false, true),
            ]);

        expect(result).toEqual(expected);
    });

    test("can parse nested embeddings", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("←←ABC♦♦");

        const expected = new UnicodeString(
            [
                new UnicodeEmbedding(UnicodeEmbeddingType.RightToLeft, true, true,
                    [
                        new UnicodeEmbedding(UnicodeEmbeddingType.RightToLeft, true, true,
                            [
                                new UnicodeInline("ABC"),
                            ]),
                    ]),
            ]);

        expect(result).toEqual(expected);
    });

    test("can parse nested different embeddings", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("→←ABC♦♦");

        const expected = new UnicodeString(
            [
                new UnicodeEmbedding(UnicodeEmbeddingType.LeftToRight, true, true,
                    [
                        new UnicodeEmbedding(UnicodeEmbeddingType.RightToLeft, true, true,
                            [
                                new UnicodeInline("ABC"),
                            ]),
                    ]),
            ]);

        expect(result).toEqual(expected);
    });

    test("can parse composed string", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("A→B♦C←D♦E");

        const expected = new UnicodeString(
            [
                new UnicodeInline("A"),
                new UnicodeEmbedding(UnicodeEmbeddingType.LeftToRight, true, true,
                    [
                        new UnicodeInline("B"),
                    ]),
                new UnicodeInline("C"),
                new UnicodeEmbedding(UnicodeEmbeddingType.RightToLeft, true, true,
                    [
                        new UnicodeInline("D"),
                    ]),
                new UnicodeInline("E"),
            ]);

        expect(result).toEqual(expected);
    });
});
