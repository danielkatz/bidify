import { UnicodeChar } from "./UnicodeChar";
import { UnicodeCharType } from "./UnicodeCharType";
import { UnicodeContainerNode } from "./UnicodeContainerNode";
import { UnicodeEmbeddingDirection } from "./UnicodeEmbeddingDirection";
import { UnicodeNode } from "./UnicodeNode";

export class UnicodeEmbedding extends UnicodeContainerNode {
    // tslint:disable-next-line:variable-name
    private _opening: UnicodeChar = null;

    // tslint:disable-next-line:variable-name
    private _closing: UnicodeChar = null;

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

    public * enumerateChildren(): IterableIterator<UnicodeNode> {
        if (this.opening) {
            yield this.opening;
        }

        yield* super.enumerateChildren();

        if (this.closing) {
            yield this.closing;
        }
    }

    get direction(): UnicodeEmbeddingDirection {
        if (this._opening) {
            if (this._opening.type === UnicodeCharType.LeftToRightEmbeddingStart) {
                return UnicodeEmbeddingDirection.LeftToRight;
            } else if (this._opening.type === UnicodeCharType.RightToLeftEmbeddingStart) {
                return UnicodeEmbeddingDirection.RightToLeft;
            }
        }

        return UnicodeEmbeddingDirection.Natural;
    }

    get opening(): UnicodeChar {
        return this._opening;
    }
    set opening(value: UnicodeChar) {
        if (this._opening) {
            this._opening.parent = null;
        }

        if (value) {
            if (value.parent) {
                throw new Error("node already has a parent");
            }

            this._opening = value;
            this._opening.parent = this;
        }
    }

    get closing(): UnicodeChar {
        return this._closing;
    }
    set closing(value: UnicodeChar) {
        if (this._closing) {
            this._closing.parent = null;
        }

        if (value) {
            if (value.parent) {
                throw new Error("node already has a parent");
            }

            this._closing = value;
            this._closing.parent = this;
        }
    }
}
