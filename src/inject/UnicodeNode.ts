import { UnicodeContainerNode } from "./UnicodeContainerNode";

export abstract class UnicodeNode {
    public parent: UnicodeContainerNode = null;

    public abstract serialize(): string;
}
