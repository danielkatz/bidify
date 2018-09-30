import "jest";
import { UnicodeChar } from "./UnicodeChar";
import { UnicodeCharType } from "./UnicodeCharType";
import { DebugUnicodeCodes } from "./UnicodeCodes";
import { UnicodeEmbedding } from "./UnicodeEmbedding";
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

        const expected = new UnicodeString(
            [
                new UnicodeChar("A", UnicodeCharType.Literal),
                new UnicodeChar("B", UnicodeCharType.Literal),
                new UnicodeChar("C", UnicodeCharType.Literal),
            ]);

        expect(result).toEqual(expected);
    });

    test("can parse a LTR embedding", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("→ABC♦");

        const expected = new UnicodeString(
            [
                new UnicodeEmbedding(
                    new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart),
                    [
                        new UnicodeChar("A", UnicodeCharType.Literal),
                        new UnicodeChar("B", UnicodeCharType.Literal),
                        new UnicodeChar("C", UnicodeCharType.Literal),
                    ],
                    new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd)),
            ]);

        expect(result).toEqual(expected);
    });

    test("can parse a RTL embedding", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("←ABC♦");

        const expected = new UnicodeString(
            [
                new UnicodeEmbedding(
                    new UnicodeChar("←", UnicodeCharType.RightToLeftEmbeddingStart),
                    [
                        new UnicodeChar("A", UnicodeCharType.Literal),
                        new UnicodeChar("B", UnicodeCharType.Literal),
                        new UnicodeChar("C", UnicodeCharType.Literal),
                    ],
                    new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd)),
            ]);

        expect(result).toEqual(expected);
    });

    test("can parse embedding with missing closing character", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("←ABC");

        const expected = new UnicodeString(
            [
                new UnicodeEmbedding(
                    new UnicodeChar("←", UnicodeCharType.RightToLeftEmbeddingStart),
                    [
                        new UnicodeChar("A", UnicodeCharType.Literal),
                        new UnicodeChar("B", UnicodeCharType.Literal),
                        new UnicodeChar("C", UnicodeCharType.Literal),
                    ]),
            ]);

        expect(result).toEqual(expected);
    });

    test("can parse embedding with missing opening character", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("ABC♦");

        const expected = new UnicodeString(
            [
                new UnicodeChar("A", UnicodeCharType.Literal),
                new UnicodeChar("B", UnicodeCharType.Literal),
                new UnicodeChar("C", UnicodeCharType.Literal),
                new UnicodeEmbedding(null, null, new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd)),
            ]);

        expect(result).toEqual(expected);
    });

    test("can parse nested embeddings", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("←←ABC♦♦");

        const expected = new UnicodeString(
            [
                new UnicodeEmbedding(
                    new UnicodeChar("←", UnicodeCharType.RightToLeftEmbeddingStart),
                    [
                        new UnicodeEmbedding(
                            new UnicodeChar("←", UnicodeCharType.RightToLeftEmbeddingStart),
                            [
                                new UnicodeChar("A", UnicodeCharType.Literal),
                                new UnicodeChar("B", UnicodeCharType.Literal),
                                new UnicodeChar("C", UnicodeCharType.Literal),
                            ],
                            new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd)),
                    ],
                    new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd)),
            ]);

        expect(result).toEqual(expected);
    });

    test("can parse nested different embeddings", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("→←ABC♦♦");

        const expected = new UnicodeString(
            [
                new UnicodeEmbedding(
                    new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart),
                    [
                        new UnicodeEmbedding(
                            new UnicodeChar("←", UnicodeCharType.RightToLeftEmbeddingStart),
                            [
                                new UnicodeChar("A", UnicodeCharType.Literal),
                                new UnicodeChar("B", UnicodeCharType.Literal),
                                new UnicodeChar("C", UnicodeCharType.Literal),
                            ],
                            new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd)),
                    ],
                    new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd)),
            ]);

        expect(result).toEqual(expected);
    });

    test("can parse composed string", () => {
        const parser = new UnicodeStringParser(DebugUnicodeCodes);
        const result = parser.parse("A→B♦C←D♦E");

        const expected = new UnicodeString(
            [
                new UnicodeChar("A", UnicodeCharType.Literal),
                new UnicodeEmbedding(
                    new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart),
                    [
                        new UnicodeChar("B", UnicodeCharType.Literal),
                    ],
                    new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd)),
                new UnicodeChar("C", UnicodeCharType.Literal),
                new UnicodeEmbedding(
                    new UnicodeChar("←", UnicodeCharType.RightToLeftEmbeddingStart),
                    [
                        new UnicodeChar("D", UnicodeCharType.Literal),
                    ],
                    new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd)),
                new UnicodeChar("E", UnicodeCharType.Literal),
            ]);

        expect(result).toEqual(expected);
    });
});
