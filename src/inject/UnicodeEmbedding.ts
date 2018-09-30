import { UnicodeChar } from "./UnicodeChar";
import { UnicodeCharType } from "./UnicodeCharType";
import { UnicodeContainerNode } from "./UnicodeContainerNode";
import { UnicodeEmbeddingDirection } from "./UnicodeEmbeddingDirection";
import { UnicodeNode } from "./UnicodeNode";

export class UnicodeEmbedding extends UnicodeContainerNode {
    public opening: UnicodeChar = null;
    public closing: UnicodeChar = null;

    constructor(
        opening: UnicodeChar = null,
        children?: ReadonlyArray<UnicodeNode>,
        closing: UnicodeChar = null) {
        super(children);

        this.opening = opening;
        this.closing = closing;
    }

    public addChild(child: UnicodeNode) {
        if (child instanceof UnicodeChar && child.type !== UnicodeCharType.Literal) {
            throw new Error("direction control charachters should be added via dedicated properties");
        }

        super.addChild(child);
    }

    get direction(): UnicodeEmbeddingDirection {
        if (this.opening) {
            if (this.opening.type === UnicodeCharType.LeftToRightEmbeddingStart) {
                return UnicodeEmbeddingDirection.LeftToRight;
            } else if (this.opening.type === UnicodeCharType.RightToLeftEmbeddingStart) {
                return UnicodeEmbeddingDirection.RightToLeft;
            }
        }

        return UnicodeEmbeddingDirection.Natural;
    }
}
