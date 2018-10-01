import { UnicodeNode } from "./UnicodeNode";
import { UnicodeString } from "./UnicodeString";

export class UnicodeStringSelection {
    public readonly context: UnicodeString;
    public readonly anchorNode: UnicodeNode;
    public readonly focusNode: UnicodeNode;

    constructor(context: UnicodeString, anchorNode: UnicodeNode, focusNode: UnicodeNode) {
        this.context = context;
        this.anchorNode = anchorNode;
        this.focusNode = focusNode;
    }

    get isCollapsed(): boolean {
        return this.anchorNode === this.focusNode;
    }
}
