import _ from "lodash";
import { UnicodeNode } from "./UnicodeNode";

export abstract class UnicodeContainerNode extends UnicodeNode {
    protected readonly _children: UnicodeNode[] = [];

    constructor(children?: ReadonlyArray<UnicodeNode>) {
        super();

        if (children) {
            children.forEach((n, i) => this.addChild(n));
        }
    }

    public addChild(child: UnicodeNode) {
        if (child.parent) {
            throw new Error("node already has a parent");
        }

        this._children.push(child);
        child.parent = this;
    }

    public removeChild(child: UnicodeNode) {
        const index = this._children.indexOf(child);
        if (index >= 0) {
            this._children.splice(index, 1);
            child.parent = null;
        }
    }

    public getChildOffset(child: UnicodeNode) {
        let offset = this.offset;

        for (const node of this.children) {
            if (node === child) {
                return offset;
            } else {
                offset += node.length;
            }
        }

        throw new Error(`${child} is not a child of this node`);
    }

    public serialize(): string {
        let result = "";

        this.children.forEach((c, i) => result += c.serialize());

        return result;
    }

    protected * enumerateChildren(): IterableIterator<UnicodeNode> {
        yield* this._children;
    }

    protected * enumerateDescendants(): IterableIterator<UnicodeNode> {
        for (const node of this.children) {
            yield node;
            if (node instanceof UnicodeContainerNode) {
                yield* node.enumerateDescendants();
            }
        }
    }

    get children(): ReadonlyArray<UnicodeNode> {
        return Array.from(this.enumerateChildren());
    }

    public get length(): number {
        const list = this.children;
        if (list.length === 0) {
            return 0;
        }

        return list
            .map((n) => n.length)
            .reduce((a, b) => a + b);
    }
}
