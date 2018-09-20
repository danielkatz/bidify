import { unicodeCodes } from "./core";

const LEFT_TO_RIGHT_EMBEDDING_SYMBOL = "→";
const RIGHT_TO_LEFT_EMBEDDING_SYMBOL = "←";
const POP_DIRECTIONAL_FORMATTING_SYMBOL = "♦";
const SELECTION_START_SYMBOL = "[";
const SELECTION_END_SYMBOL = "]";

export default class InputState {
    constructor(
        public readonly value: string,
        public readonly selectionStart: number,
        public readonly selectionEnd: number) {

        if (typeof value !== "string")
            throw "value must be a string value";

        if (selectionStart < 0)
            throw "selectionStart should be a positive number";

        if (selectionStart > selectionEnd)
            throw "selectionStart cannot be larger than selectionEnd";

        if (selectionEnd > value.length) {
            throw "selectionEnd cannot be larger than the length of value";
        }
    }

    toDebugString(): string {
        let result = "";

        if (this.value.length === 0) {
            result += SELECTION_START_SYMBOL;
            result += SELECTION_END_SYMBOL;
        } else {
            for (let i = 0; i < this.value.length; i++) {
                let char = this.value.charAt(i);

                if (i === this.selectionStart) {
                    result += SELECTION_START_SYMBOL;
                }

                if (i === this.selectionEnd) {
                    result += SELECTION_END_SYMBOL;
                }

                if (char === unicodeCodes.LEFT_TO_RIGHT_EMBEDDING) {
                    result += LEFT_TO_RIGHT_EMBEDDING_SYMBOL;
                } else if (char === unicodeCodes.RIGHT_TO_LEFT_EMBEDDING) {
                    result += RIGHT_TO_LEFT_EMBEDDING_SYMBOL;
                } else if (char === unicodeCodes.POP_DIRECTIONAL_FORMATTING) {
                    result += POP_DIRECTIONAL_FORMATTING_SYMBOL;
                } else {
                    result += char;
                }
            }
        }

        return result;
    }
}