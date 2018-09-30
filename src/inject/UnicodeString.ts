import { UnicodeCodes } from "./UnicodeCodes";
import { UnicodeContainerNode } from "./UnicodeContainerNode";
import { UnicodeNode } from "./UnicodeNode";
import { UnicodeStringParser } from "./UnicodeStringParser";

export class UnicodeString extends UnicodeContainerNode {
    public static parse(text: string): UnicodeString {
        const parser = new UnicodeStringParser(UnicodeCodes);

        return parser.parse(text);
    }

    constructor(children?: ReadonlyArray<UnicodeNode>) {
        super(children);
    }

    public serialize(): string {
        let result = "";

        this.children.forEach((c, i) => result += c.serialize());

        return result;
    }
}
