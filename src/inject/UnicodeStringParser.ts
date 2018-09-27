import { IUnicodeCodes } from "./UnicodeCodes";
import { UnicodeContainerNode } from "./UnicodeContainerNode";
import { UnicodeEmbedding } from "./UnicodeEmbedding";
import { UnicodeEmbeddingType } from "./UnicodeEmbeddingType";
import { UnicodeInline } from "./UnicodeInline";
import { UnicodeString } from "./UnicodeString";

export class UnicodeStringParser {

    private readonly unicode: IUnicodeCodes;
    private parent: UnicodeContainerNode;
    private pendingStringSegment: string;

    constructor(unicode: IUnicodeCodes) {
        this.unicode = unicode;
    }

    public parse(text: string): UnicodeString {
        const result = new UnicodeString();
        this.parent = result;
        this.pendingStringSegment = "";

        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);

            if (char === this.unicode.LEFT_TO_RIGHT_EMBEDDING) {

                this.openDirectionalSegment(UnicodeEmbeddingType.LeftToRight);

            } else if (char === this.unicode.RIGHT_TO_LEFT_EMBEDDING) {

                this.openDirectionalSegment(UnicodeEmbeddingType.RightToLeft);

            } else if (char === this.unicode.POP_DIRECTIONAL_FORMATTING) {

                this.closeDirectionalSegment();

            } else {

                this.pendingStringSegment += char;

            }
        }

        this.commitPendingStringSegment();

        return result;
    }

    private commitPendingStringSegment() {
        if (this.pendingStringSegment) {
            const inline = new UnicodeInline(this.pendingStringSegment);

            this.parent.addChild(inline);
            this.pendingStringSegment = "";
        }
    }

    private openDirectionalSegment(direction: UnicodeEmbeddingType) {
        this.commitPendingStringSegment();

        const embedding = new UnicodeEmbedding(direction);
        embedding.hasOpeningChar = true;

        this.parent.addChild(embedding);
        this.parent = embedding;
    }

    private closeDirectionalSegment() {
        this.commitPendingStringSegment();

        if (this.parent instanceof UnicodeEmbedding) {
            this.parent.hasClosingChar = true;
            this.parent = this.parent.parent;
        } else {
            const embedding = new UnicodeEmbedding(UnicodeEmbeddingType.Natural);
            embedding.hasOpeningChar = false;
            embedding.hasClosingChar = true;
            this.parent.addChild(embedding);
        }
    }
}
