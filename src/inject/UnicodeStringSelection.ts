import { UnicodeChar } from "./UnicodeChar";
import { UnicodeString } from "./UnicodeString";

export class UnicodeStringSelection {
    public readonly context: UnicodeString;
    public selectionStart: number;
    public selectionEnd: number;
    public selectionDirection: "forward" | "backward" | "none";

    constructor(context: UnicodeString) {
        this.context = context;

        this.selectionStart = 0;
        this.selectionEnd = 0;
        this.selectionDirection = "none";
    }

    public get anchorNode(): UnicodeChar {
        return this.context.getCharAt(this.selectionStart);
    }

    public get focusNode(): UnicodeChar {
        return this.context.getCharAt(this.selectionEnd);
    }

    public get isContinuous(): boolean {
        if (this.isCollapsed) {
            return true;
        }

        const anchor = this.anchorNode;
        const focus = this.focusNode;

        if (anchor && this.focusNode) {
            return anchor.parent === focus.parent;
        } else if (anchor && !focus) {
            return anchor.parent === this.context;
        }

        return false;
    }

    public get isCollapsed(): boolean {
        return this.selectionStart === this.selectionEnd;
    }
}
