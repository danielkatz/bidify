import AstNode from "./AstNode";

export default class AstCharacterNode extends AstNode {
    public readonly char: string;
    public readonly type: AstCharacterNodeType;

    constructor(character: string, type: AstCharacterNodeType) {
        super();

        if (character.length !== 1) {
            throw new Error("length of character must be 1");
        }

        this.char = character;
        this.type = type;
    }

    public serialize(): string {
        return this.char;
    }

    public get length(): number {
        return this.char.length;
    }
}

export enum AstCharacterNodeType {
    LeftToRightEmbeddingStart = "LTR",
    RightToLeftEmbeddingStart = "RTL",
    EmbeddingEnd = "END",
    Literal = "CHR",
}
