import { unicodeCodes } from "./core";
import TextFieldState from "./TextFieldState";

export enum TransformationOperation {
    RightToLeft,
    LeftToRight,
    Natural
}

export class TextFieldStateStransformer {

    transform(input: TextFieldState, operation: TransformationOperation): TextFieldState {
        var applied = this.applyOperation(input, operation);
        var simplified = this.simplify(applied);

        return simplified;
    }

    applyOperation(input: TextFieldState, operation: TransformationOperation): TextFieldState {
        return input;
    }

    simplify(input: TextFieldState): TextFieldState {
        return input;
    }

}