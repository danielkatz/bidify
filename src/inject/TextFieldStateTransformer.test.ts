import "jest";
import { TextFieldStateTransformer, TransformationOperation } from "./TextFieldStateTransformer";
import TextFieldState from "./TextFieldState";

const transformer = new TextFieldStateTransformer();

describe("create an empty block", () => {
    test("LTR", () => {
        const input = TextFieldState.fromDebugString("[]ABCDEFG");
        const output = transformer.transform(input, TransformationOperation.LeftToRight).toDebugString();
        expect(output).toBe("→[]♦ABCDEFG");
    });

    test("RTL", () => {
        const input = TextFieldState.fromDebugString("[]ABCDEFG");
        const output = transformer.transform(input, TransformationOperation.LeftToRight).toDebugString();
        expect(output).toBe("←[]♦ABCDEFG");
    });
});