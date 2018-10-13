import { UnicodeChar } from "./UnicodeChar";
import { UnicodeCharType } from "./UnicodeCharType";
import { UnicodeCodes } from "./UnicodeCodes";
import { UnicodeContainerNode } from "./UnicodeContainerNode";
import { UnicodeEmbedding } from "./UnicodeEmbedding";
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

    public get offset(): number {
        return 0;
    }
}
