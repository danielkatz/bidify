import "jest";
import { UnicodeChar } from "./UnicodeChar";
import { UnicodeCharType } from "./UnicodeCharType";
import { UnicodeEmbedding } from "./UnicodeEmbedding";
import { UnicodeEmbeddingDirection } from "./UnicodeEmbeddingDirection";
import { UnicodeString } from "./UnicodeString";

describe("UnicodeEmbedding", () => {
    describe("constructor", () => {

        test("0 arguments supplied", () => {
            const embedding = new UnicodeEmbedding();

            expect(embedding.opening).toBe(null);
            expect(embedding.children.length).toBe(0);
            expect(embedding.content.length).toBe(0);
            expect(embedding.closing).toBe(null);
        });

        test("1 argument supplied", () => {
            const opening = new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart);
            const embedding = new UnicodeEmbedding(opening);

            expect(embedding.opening).toBe(opening);
            expect(embedding.closing).toBe(null);

            expect(embedding.children).toContain(opening);
            expect(embedding.content).not.toContain(opening);
        });

        test("2 arguments supplied", () => {
            const opening = new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart);
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const embedding = new UnicodeEmbedding(opening, [child]);

            expect(embedding.opening).toBe(opening);
            expect(embedding.closing).toBe(null);

            expect(embedding.children).toContain(opening);
            expect(embedding.children).toContain(child);

            expect(embedding.content).not.toContain(opening);
            expect(embedding.content).toContain(child);
        });

        test("3 arguments supplied", () => {
            const opening = new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart);
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const closing = new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd);
            const embedding = new UnicodeEmbedding(opening, [child], closing);

            expect(embedding.opening).toBe(opening);
            expect(embedding.closing).toBe(closing);

            expect(embedding.children).toContain(opening);
            expect(embedding.children).toContain(child);
            expect(embedding.children).toContain(closing);

            expect(embedding.content).not.toContain(opening);
            expect(embedding.content).toContain(child);
            expect(embedding.content).not.toContain(closing);
        });

        test("sets parent property of children", () => {
            const opening = new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart);
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const closing = new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd);
            const embedding = new UnicodeEmbedding(opening, [child], closing);

            expect(opening.parent).toBe(embedding);
            expect(child.parent).toBe(embedding);
            expect(closing.parent).toBe(embedding);
        });
    });

    describe("addChild", () => {
        test("adds child to children", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const embedding = new UnicodeEmbedding();

            embedding.addChild(child);

            expect(embedding.children).toContain(child);
            expect(embedding.content).toContain(child);
        });

        test("sets parent property to this instance", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const embedding = new UnicodeEmbedding();

            embedding.addChild(child);

            expect(child.parent).toBe(embedding);
        });

        test("throws if node already has a parent", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const embedding1 = new UnicodeEmbedding(null, [child], null);
            const embedding2 = new UnicodeEmbedding();

            const t = () => embedding2.addChild(child);

            expect(t).toThrow();
        });
    });

    describe("removeChild", () => {
        test("removes child from children", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const embedding = new UnicodeEmbedding(null, [child], null);

            embedding.removeChild(child);

            expect(embedding.children).not.toContain(child);
            expect(embedding.content).not.toContain(child);
        });

        test("sets parent property to null", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const embedding = new UnicodeEmbedding(null, [child], null);

            embedding.removeChild(child);

            expect(child.parent).toBeNull();
        });
    });

    describe("opening", () => {
        test("adds to children array", () => {
            const opening = new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart);
            const embedding = new UnicodeEmbedding();

            embedding.opening = opening;

            expect(embedding.children).toContain(opening);
        });

        test("releases old opening", () => {
            const opening1 = new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart);
            const opening2 = new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart);
            const embedding = new UnicodeEmbedding(opening1);

            embedding.opening = opening2;

            expect(opening1.parent).toBeNull();
        });

        test("throws if node already has a parent", () => {
            const opening = new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart);
            const embedding1 = new UnicodeEmbedding(opening);
            const embedding2 = new UnicodeEmbedding();

            const t = () => embedding2.opening = opening;

            expect(t).toThrow();
        });
    });

    describe("closing", () => {
        test("adds to children array", () => {
            const closing = new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd);
            const embedding = new UnicodeEmbedding();

            embedding.closing = closing;

            expect(embedding.children).toContain(closing);
        });

        test("releases old closing", () => {
            const closing1 = new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd);
            const closing2 = new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd);
            const embedding = new UnicodeEmbedding(null, [], closing1);

            embedding.closing = closing2;

            expect(closing1.parent).toBeNull();
        });

        test("throws if node already has a parent", () => {
            const closing = new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd);
            const embedding1 = new UnicodeEmbedding(null, [], closing);
            const embedding2 = new UnicodeEmbedding();

            const t = () => embedding2.closing = closing;

            expect(t).toThrow();
        });
    });

    describe("direction", () => {
        test("returns Natural when no opening char", () => {
            const embedding = new UnicodeEmbedding();

            expect(embedding.direction).toBe(UnicodeEmbeddingDirection.Natural);
        });

        test("can return correct direction", () => {
            const ltrOpening = new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart);
            const rtlOpening = new UnicodeChar("←", UnicodeCharType.RightToLeftEmbeddingStart);
            const ltr = new UnicodeEmbedding(ltrOpening);
            const rtl = new UnicodeEmbedding(rtlOpening);

            expect(ltr.direction).toBe(UnicodeEmbeddingDirection.LeftToRight);
            expect(rtl.direction).toBe(UnicodeEmbeddingDirection.RightToLeft);
        });
    });

    describe("length", () => {
        test("returns 0 when no children", () => {
            const embedding = new UnicodeEmbedding();

            expect(embedding.length).toBe(0);
        });

        test("counts opening char to the length", () => {
            const embedding = new UnicodeEmbedding(
                new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart));

            expect(embedding.length).toBe(1);
        });

        test("counts closing char to the length", () => {
            const embedding = new UnicodeEmbedding(
                null,
                [],
                new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd));

            expect(embedding.length).toBe(1);
        });

        test("counts children to the length", () => {
            const embedding = new UnicodeEmbedding(
                null,
                [
                    new UnicodeChar("A", UnicodeCharType.Literal),
                ],
                null);

            expect(embedding.length).toBe(1);
        });

        test("can count combined length", () => {
            const embedding = new UnicodeEmbedding(
                new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart),
                [
                    new UnicodeChar("A", UnicodeCharType.Literal),
                    new UnicodeChar("B", UnicodeCharType.Literal),
                ],
                new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd));

            expect(embedding.length).toBe(4);
        });

        test("can count length recursively", () => {
            const embedding = new UnicodeEmbedding(
                new UnicodeChar("←", UnicodeCharType.RightToLeftEmbeddingStart),
                [
                    new UnicodeChar("A", UnicodeCharType.Literal),
                    new UnicodeEmbedding(
                        new UnicodeChar("←", UnicodeCharType.RightToLeftEmbeddingStart),
                        [
                            new UnicodeChar("B", UnicodeCharType.Literal),
                        ],
                        new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd)),
                ],
                new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd));

            expect(embedding.length).toBe(6);
        });
    });

    describe("getChildOffset", () => {
        test("returns NaN when unparented", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const embedding = new UnicodeEmbedding(null, [child], null);

            expect(embedding.getChildOffset(child)).toBeNaN();
        });

        test("counts opening char to the offset of children", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const embedding = new UnicodeEmbedding(
                new UnicodeChar("→", UnicodeCharType.LeftToRightEmbeddingStart),
                [child]);
            const unicode = new UnicodeString([embedding]);

            expect(embedding.getChildOffset(child)).toBe(1);
        });

        test("dont count closing char to the offset of children", () => {
            const child = new UnicodeChar("A", UnicodeCharType.Literal);
            const embedding = new UnicodeEmbedding(
                null,
                [child],
                new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd));
            const unicode = new UnicodeString([embedding]);

            expect(embedding.getChildOffset(child)).toBe(0);
        });

        test("counts children to the offset of children", () => {
            const child1 = new UnicodeChar("A", UnicodeCharType.Literal);
            const child2 = new UnicodeChar("B", UnicodeCharType.Literal);
            const embedding = new UnicodeEmbedding(
                null,
                [
                    child1,
                    child2,
                ],
                null);
            const unicode = new UnicodeString([embedding]);

            expect(embedding.getChildOffset(child1)).toBe(0);
            expect(embedding.getChildOffset(child2)).toBe(1);
        });

        test("can count offset of children with nested embeddings", () => {
            const child = new UnicodeChar("C", UnicodeCharType.Literal);
            const embedding = new UnicodeEmbedding(
                new UnicodeChar("←", UnicodeCharType.RightToLeftEmbeddingStart),
                [
                    new UnicodeEmbedding(
                        new UnicodeChar("←", UnicodeCharType.RightToLeftEmbeddingStart),
                        [
                            new UnicodeChar("A", UnicodeCharType.Literal),
                            new UnicodeChar("B", UnicodeCharType.Literal),
                        ],
                        new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd)),
                    child,
                ],
                new UnicodeChar("♦", UnicodeCharType.EmbeddingEnd));
            const unicode = new UnicodeString([embedding]);

            expect(embedding.getChildOffset(child)).toBe(5);
        });

        test("throws when child arg is not a child of this instance", () => {
            const nonChild = new UnicodeChar("A", UnicodeCharType.Literal);
            const embedding = new UnicodeEmbedding();
            const unicode = new UnicodeString([embedding]);

            expect(() => embedding.getChildOffset(nonChild)).toThrow();
        });
    });
});
