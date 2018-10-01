import { UnicodeCharType } from "./UnicodeCharType";
import { UnicodeNode } from "./UnicodeNode";

export class UnicodeChar extends UnicodeNode {
    public readonly char: string;
    public readonly type: UnicodeCharType;

    constructor(char: string, type: UnicodeCharType) {
        super();

        if (char.length !== 1) {
            throw new Error("char argument must be one charachter long");
        }

        this.char = char;
        this.type = type;
    }

    public serialize(): string {
        return this.char;
    }

    public get length(): number {
        return this.char.length;
    }
}
