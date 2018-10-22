import AstNodeGroup from "./AstNodeGroup";

export default abstract class AstNode {
    /** the parent node */
    public parent: AstNodeGroup = null;

    /** returns the string that represents the node */
    public abstract serialize(): string;

    public throwIfHasParent(): void {
        if (this.parent) {
            throw new Error("node already has a parent");
        }
    }

    /** the count of characters in the node */
    public abstract get length(): number;

    /** the depth of the node in the AST tree */
    public get depth(): number {
        if (this.parent) {
            return this.parent.depth + 1;
        }
        return 0;
    }
}
