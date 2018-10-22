import AstCharacterNode from "./AstCharacterNode";
import AstNode from "./AstNode";
import AstNodeGroup from "./AstNodeGroup";

export default class AstEmbeddingNode extends AstNodeGroup {
    private _opening: AstCharacterNode = null;
    private _closing: AstCharacterNode = null;
    private readonly _nodes: AstNode[] = [];

    public add(node: AstNode): void {
        node.throwIfHasParent();

        throw new Error("Method not implemented.");
    }

    public insert(node: AstNode, index: number): void {
        node.throwIfHasParent();

        throw new Error("Method not implemented.");
    }

    public remove(node: AstNode): void {
        throw new Error("Method not implemented.");
    }

    public indexOf(node: AstNode): number {
        throw new Error("Method not implemented.");
    }

    public serialize(): string {
        throw new Error("Method not implemented.");
    }

    public nodes: ReadonlyArray<AstNode>;

    public length: number;
}
