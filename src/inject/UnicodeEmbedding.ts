import { UnicodeChar } from "./UnicodeChar";
import { UnicodeCharType } from "./UnicodeCharType";
import { UnicodeContainerNode } from "./UnicodeContainerNode";
import { UnicodeEmbeddingType } from "./UnicodeEmbeddingType";
import { UnicodeNode } from "./UnicodeNode";

export class UnicodeEmbedding extends UnicodeContainerNode {
    constructor(
        children?: ReadonlyArray<UnicodeNode>) {
        super(children);
    }

    get type(): UnicodeEmbeddingType {
        const opening = this.openingChar;
        if (opening) {
            if (opening.type === UnicodeCharType.LeftToRightEmbeddingStart) {
                return UnicodeEmbeddingType.LeftToRight;
            } else if (opening.type === UnicodeCharType.RightToLeftEmbeddingStart) {
                return UnicodeEmbeddingType.RightToLeft;
            }
        }

        return UnicodeEmbeddingType.Natural;
    }

    get openingChar(): UnicodeChar {
        if (this.children.length > 0) {
            const first = this.children[0];

            if (first instanceof UnicodeChar) {
                if (first.type === UnicodeCharType.LeftToRightEmbeddingStart
                    || first.type === UnicodeCharType.RightToLeftEmbeddingStart) {

                    return first;
                }
            }
        }

        return null;
    }

    get closingChar(): UnicodeChar {
        if (this.children.length > 0) {
            const last = this.children[this.children.length - 1];

            if (last instanceof UnicodeChar) {
                if (last.type === UnicodeCharType.EmbeddingEnd) {

                    return last;
                }
            }
        }
    }
}
