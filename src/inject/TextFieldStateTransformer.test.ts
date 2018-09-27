import "jest";
import TextFieldState from "./TextFieldState";
import { TextFieldStateTransformer, TransformationOperation } from "./TextFieldStateTransformer";

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
