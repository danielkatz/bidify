import "jest";
import TextFieldState from "./TextFieldState";
import { TextFieldStateTransformer, TransformationOperation } from "./TextFieldStateTransformer";

const transformer = new TextFieldStateTransformer();

describe("create an empty block", () => {
    test("Test1", () => {
        const input = TextFieldState.fromDebugString("[ABCDEFG]");
        const output = transformer.transform(input, TransformationOperation.RightToLeft).toDebugString();
        expect(output).toBe("←[ABCDEFG]♦");
    });

    test("Test2", () => {
        const input = TextFieldState.fromDebugString("[ABC]DEFG");
        const output = transformer.transform(input, TransformationOperation.RightToLeft).toDebugString();
        expect(output).toBe("←[ABC]♦DEFG");
    });

    test("Test3", () => {
        const input = TextFieldState.fromDebugString("←AB[CD]EFG♦");
        const output = transformer.transform(input, TransformationOperation.LeftToRight).toDebugString();
        expect(output).toBe("←AB→[CD]♦EFG♦");
    });

    test("Test4", () => {
        const input = TextFieldState.fromDebugString("←AB[C♦D]EFG");
        const output = transformer.transform(input, TransformationOperation.LeftToRight).toDebugString();
        expect(output).toBe("←AB♦→[CD]♦EFG");
    });

    // test("LTR", () => {
    //     const input = TextFieldState.fromDebugString("[]ABCDEFG");
    //     const output = transformer.transform(input, TransformationOperation.LeftToRight).toDebugString();
    //     expect(output).toBe("→[]♦ABCDEFG");
    // });

    // test("RTL", () => {
    //     const input = TextFieldState.fromDebugString("[]ABCDEFG");
    //     const output = transformer.transform(input, TransformationOperation.LeftToRight).toDebugString();
    //     expect(output).toBe("←[]♦ABCDEFG");
    // });
});
