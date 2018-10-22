import AstNode from "./AstNode";

export default abstract class AstNodeGroup extends AstNode {
    /** add node to the group */
    public abstract add(node: AstNode): void;

    /** insert node to the group in a specific index */
    public abstract insert(node: AstNode, index: number): void;

    /** remove node from the group */
    public abstract remove(node: AstNode): void;

    /** the index of a child node in the group */
    public abstract indexOf(node: AstNode): number;

    /** read-only array of child nodes */
    public abstract get nodes(): ReadonlyArray<AstNode>;
}
