import { UnicodeChar } from "./UnicodeChar";
import { UnicodeCharType } from "./UnicodeCharType";
import { IUnicodeCodes } from "./UnicodeCodes";
import { UnicodeContainerNode } from "./UnicodeContainerNode";
import { UnicodeEmbedding } from "./UnicodeEmbedding";
import { UnicodeEmbeddingDirection } from "./UnicodeEmbeddingDirection";
import { UnicodeString } from "./UnicodeString";

export class UnicodeStringParser {

    private readonly unicode: IUnicodeCodes;
    private context: UnicodeContainerNode;

    constructor(unicode: IUnicodeCodes) {
        this.unicode = unicode;
    }

    public parse(text: string): UnicodeString {
        const result = new UnicodeString();
        this.context = result;

        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);

            const charNode = this.parseChar(char);

            this.processCharNode(charNode);
        }

        return result;
    }

    private parseChar(char: string): UnicodeChar {
        let charType: UnicodeCharType;
        if (char === this.unicode.LEFT_TO_RIGHT_EMBEDDING) {
            charType = UnicodeCharType.LeftToRightEmbeddingStart;
        } else if (char === this.unicode.RIGHT_TO_LEFT_EMBEDDING) {
            charType = UnicodeCharType.RightToLeftEmbeddingStart;
        } else if (char === this.unicode.POP_DIRECTIONAL_FORMATTING) {
            charType = UnicodeCharType.EmbeddingEnd;
        } else {
            charType = UnicodeCharType.Literal;
        }
        return new UnicodeChar(char, charType);
    }

    private processCharNode(charNode: UnicodeChar): void {
        if (charNode.type === UnicodeCharType.LeftToRightEmbeddingStart) {

            this.startEmbeddingContext(charNode);

        } else if (charNode.type === UnicodeCharType.RightToLeftEmbeddingStart) {

            this.startEmbeddingContext(charNode);

        } else if (charNode.type === UnicodeCharType.EmbeddingEnd) {

            this.closeEmbeddingContext(charNode);

        } else {

            this.context.addChild(charNode);

        }
    }

    private startEmbeddingContext(charNode: UnicodeChar) {
        const embedding = new UnicodeEmbedding();
        embedding.opening = charNode;

        this.context.addChild(embedding);
        this.context = embedding;
    }

    private closeEmbeddingContext(charNode: UnicodeChar) {
        if (this.context instanceof UnicodeEmbedding) {
            this.context.closing = charNode;

            this.context = this.context.parent;
        } else {
            const embedding = new UnicodeEmbedding();
            embedding.closing = charNode;

            this.context.addChild(embedding);
        }
    }
}
