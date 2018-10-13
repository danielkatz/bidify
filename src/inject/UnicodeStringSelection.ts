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

    public get isCollapsed(): boolean {
        return this.selectionStart === this.selectionEnd;
    }
}
