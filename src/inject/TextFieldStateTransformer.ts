import { unicodeCodes } from "./core";
import TextFieldState from "./TextFieldState";
import { UnicodeChar } from "./UnicodeChar";
import { UnicodeCharType } from "./UnicodeCharType";
import { UnicodeCodes } from "./UnicodeCodes";
import { UnicodeEmbedding } from "./UnicodeEmbedding";
import { UnicodeString } from "./UnicodeString";

export enum TransformationOperation {
    RightToLeft,
    LeftToRight,
    Clear,
}

export class TextFieldStateTransformer {

    public transform(input: TextFieldState, operation: TransformationOperation): TextFieldState {
        const applied = this.applyOperation(input, operation);

        return applied;
    }

    public applyOperation(input: TextFieldState, operation: TransformationOperation): TextFieldState {

        if (operation === TransformationOperation.LeftToRight) {
            const embedding = new UnicodeEmbedding(
                new UnicodeChar(UnicodeCodes.LEFT_TO_RIGHT_EMBEDDING, UnicodeCharType.LeftToRightEmbeddingStart),
                null,
                new UnicodeChar(UnicodeCodes.POP_DIRECTIONAL_FORMATTING, UnicodeCharType.EmbeddingEnd),
            );

            return this.applyEmbeddingOperation(input, embedding);
        } else if (operation === TransformationOperation.RightToLeft) {
            const embedding = new UnicodeEmbedding(
                new UnicodeChar(UnicodeCodes.RIGHT_TO_LEFT_EMBEDDING, UnicodeCharType.RightToLeftEmbeddingStart),
                null,
                new UnicodeChar(UnicodeCodes.POP_DIRECTIONAL_FORMATTING, UnicodeCharType.EmbeddingEnd),
            );

            return this.applyEmbeddingOperation(input, embedding);
        } else if (operation === TransformationOperation.Clear) {
            return this.applyClearOperation(input);
        }

        return input;
    }

    private applyEmbeddingOperation(input: TextFieldState, embedding: UnicodeEmbedding): TextFieldState {
        const ast = UnicodeString.parse(input.text);
        const selectedCharacters = Array.from(ast.enumerateDescendants())
            .filter((n) =>
                (n instanceof UnicodeChar)
                && (n.offset >= input.selectionStart)
                && (n.offset < input.selectionEnd)) as UnicodeChar[];

        const selectedLiterals = selectedCharacters
            .filter((n) => n.type === UnicodeCharType.Literal);

        if (selectedLiterals.length > 0) {
            const shallowestLiteral = selectedLiterals.concat().sort((a, b) => a.depth - b.depth)[0];
            const selectionParent = shallowestLiteral.parent;
            const insertIndex = shallowestLiteral.index;

            selectionParent.insertChild(embedding, insertIndex);

            for (const literal of selectedLiterals) {
                literal.remove();
                embedding.addChild(literal);
            }

            // TODO: cleanup empty embeddings
            // TODO: set selection to current embedding
        } else {
            // TODO: insert new, or replace current embedding
        }

        const resultText = ast.serialize();
        const result = new TextFieldState(resultText, embedding.offset + 1, embedding.offset + embedding.length - 1);
        return result;
    }

    private applyClearOperation(input: TextFieldState): TextFieldState {
        return input;
    }
}
