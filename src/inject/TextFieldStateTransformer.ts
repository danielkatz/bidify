import { unicodeCodes } from "./core";
import TextFieldState from "./TextFieldState";

export enum TransformationOperation {
    RightToLeft,
    LeftToRight,
    Natural,
}

export class TextFieldStateTransformer {

    public transform(input: TextFieldState, operation: TransformationOperation): TextFieldState {
        const applied = this.applyOperation(input, operation);
        const simplified = this.simplify(applied);

        return simplified;
    }

    public applyOperation(input: TextFieldState, operation: TransformationOperation): TextFieldState {
        return input;
    }

    public simplify(input: TextFieldState): TextFieldState {
        return input;
    }

}
