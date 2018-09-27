import { UnicodeContainerNode } from "./UnicodeContainerNode";
import { UnicodeEmbeddingType } from "./UnicodeEmbeddingType";
import { UnicodeNode } from "./UnicodeNode";

export class UnicodeEmbedding extends UnicodeContainerNode {
    public readonly type: UnicodeEmbeddingType;
    public hasOpeningChar: boolean = false;
    public hasClosingChar: boolean = false;

    constructor(
        type: UnicodeEmbeddingType,
        hasOpeningChar = false,
        hasClosingChar = false,
        children?: ReadonlyArray<UnicodeNode>) {
        super(children);

        this.type = type;
        this.hasOpeningChar = hasOpeningChar;
        this.hasClosingChar = hasClosingChar;
    }
}
