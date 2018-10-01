import { UnicodeCodes } from "./UnicodeCodes";
import { UnicodeContainerNode } from "./UnicodeContainerNode";
import { UnicodeNode } from "./UnicodeNode";
import { UnicodeStringParser } from "./UnicodeStringParser";
import { UnicodeStringSelection } from "./UnicodeStringSelection";

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

    public getChildOffset(child: UnicodeNode) {
        let offset = this.offset;
        const childIndex = this.children.indexOf(child);

        if (childIndex < 0) {
            throw new Error(`${child} is not a child of this node`);
        }

        for (let i = 0; i < childIndex; i++) {
            const item = this.children[i];
            offset += item.length;
        }

        return offset;
    }

    public get offset(): number {
        return 0;
    }

    public getSelection(): UnicodeStringSelection {
        throw new Error("Not implemented");
    }

    public setSelection(value: UnicodeStringSelection);
    public setSelection(startIndex: number, endIndex: number);
    public setSelection(startIndexOrSelection: number | UnicodeStringSelection, endIndex?: number) {
        if (startIndexOrSelection instanceof UnicodeStringSelection) {
            const selection = startIndexOrSelection;

            throw new Error("Not implemented");
        } else {
            throw new Error("Not implemented");
        }
    }
}
