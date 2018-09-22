import _ from "lodash";
import { unicodeCodes } from "./core";

const LEFT_TO_RIGHT_EMBEDDING_SYMBOL = "→";
const RIGHT_TO_LEFT_EMBEDDING_SYMBOL = "←";
const POP_DIRECTIONAL_FORMATTING_SYMBOL = "♦";
const SELECTION_START_SYMBOL = "[";
const SELECTION_END_SYMBOL = "]";

export default class TextFieldState {
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

    static fromDebugString(value: string): TextFieldState {
        const selectionStart = value.indexOf(SELECTION_START_SYMBOL);
        const selectionEnd = value.lastIndexOf(SELECTION_END_SYMBOL) - 1;

        if (selectionStart < 0 || selectionEnd < 0)
            throw `debug string must contain at least '${SELECTION_START_SYMBOL}' and '${SELECTION_END_SYMBOL}' symbols`;

        value = value.substring(0, selectionStart) + value.substring(selectionStart + 1, value.length);
        value = value.substring(0, selectionEnd) + value.substring(selectionEnd + 1, value.length);

        value = value
            .replace(LEFT_TO_RIGHT_EMBEDDING_SYMBOL, unicodeCodes.LEFT_TO_RIGHT_EMBEDDING)
            .replace(RIGHT_TO_LEFT_EMBEDDING_SYMBOL, unicodeCodes.RIGHT_TO_LEFT_EMBEDDING)
            .replace(POP_DIRECTIONAL_FORMATTING_SYMBOL, unicodeCodes.POP_DIRECTIONAL_FORMATTING);

        return new TextFieldState(value, selectionStart, selectionEnd);
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