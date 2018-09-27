import { UnicodeNode } from "./UnicodeNode";

export class UnicodeInline extends UnicodeNode {
    public readonly text: string;

    constructor(text: string) {
        super();

        this.text = text;
    }
}
