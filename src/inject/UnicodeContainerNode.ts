import _ from "lodash";
import { UnicodeNode } from "./UnicodeNode";

export abstract class UnicodeContainerNode extends UnicodeNode {
    // tslint:disable-next-line:variable-name
    private readonly _children: UnicodeNode[] = [];

    constructor(children?: ReadonlyArray<UnicodeNode>) {
        super();

        if (children) {
            children.forEach((n, i) => this.addChild(n));
        }
    }

    public addChild(child: UnicodeNode) {
        this._children.push(child);
        child.parent = this;
    }

    public removeChild(child: UnicodeNode) {
        const index = this._children.indexOf(child);
        if (index > 0) {
            this._children.splice(index, 1);
            child.parent = null;
        }
    }

    get children(): ReadonlyArray<UnicodeNode> {
        return this._children;
    }
}
