import { UnicodeContainerNode } from "./UnicodeContainerNode";

export abstract class UnicodeNode {
    public parent: UnicodeContainerNode = null;

    public remove(): void {
        if (this.parent) {
            return this.parent.removeChild(this);
        }
    }

    public abstract serialize(): string;

    public abstract get length(): number;

    public get depth(): number {
        if (this.parent) {
            return this.parent.depth + 1;
        }
        return 0;
    }

    public get index(): number {
        if (this.parent) {
            return this.parent.getChildIndex(this);
        }
        return Number.NaN;
    }

    public get offset(): number {
        if (this.parent) {
            return this.parent.getChildOffset(this);
        }
        return Number.NaN;
    }
}
