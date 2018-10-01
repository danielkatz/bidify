import { UnicodeContainerNode } from "./UnicodeContainerNode";

export abstract class UnicodeNode {
    public parent: UnicodeContainerNode = null;

    public abstract serialize(): string;

    public abstract get length(): number;

    public get offset(): number {
        if (this.parent) {
            return this.parent.getChildOffset(this);
        }
        return Number.NaN;
    }
}
