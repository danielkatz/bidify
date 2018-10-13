import { UnicodeChar } from "./UnicodeChar";
import { UnicodeCharType } from "./UnicodeCharType";
import { UnicodeCodes } from "./UnicodeCodes";
import { UnicodeContainerNode } from "./UnicodeContainerNode";
import { UnicodeEmbedding } from "./UnicodeEmbedding";
import { UnicodeNode } from "./UnicodeNode";
import { UnicodeStringParser } from "./UnicodeStringParser";
import { UnicodeStringSelection } from "./UnicodeStringSelection";

export class UnicodeString extends UnicodeContainerNode {

    public static parse(text: string): UnicodeString {
        const parser = new UnicodeStringParser(UnicodeCodes);

        return parser.parse(text);
    }

    private readonly selection: UnicodeStringSelection;

    constructor(children?: ReadonlyArray<UnicodeNode>) {
        super(children);

        this.selection = new UnicodeStringSelection(this);
    }

    public get offset(): number {
        return 0;
    }

    public getSelection(): UnicodeStringSelection {
        return this.selection;
    }

    public setSelection(
        selectionStart: number,
        selectionEnd: number,
        selectionDirection: "forward" | "backward" | "none") {

        this.selection.selectionStart = selectionStart;
        this.selection.selectionEnd = selectionEnd;
        this.selection.selectionDirection = selectionDirection;
    }
}
