import { unicodeCodes } from "./core";

function applyCommand(element: HTMLInputElement | HTMLTextAreaElement, command: string): void {
    const text = element.value;

    if (text.length > 0) {
        if (command === "reset") {
            applyResetCommand(text, element);
        } else {
            applyEmbedDirectionCommand(command, text, element);
        }
    }
}

function applyEmbedDirectionCommand(
    command: string,
    text: string,
    element: HTMLInputElement | HTMLTextAreaElement): void {
    let startIndex = element.selectionStart;
    let endIndex = element.selectionEnd;

    if (startIndex === endIndex) {
        startIndex = 0;
        endIndex = text.length;
    }

    const [opening, closing] = getControlCharachters(command);
    const pre = text.slice(0, startIndex);
    const subject = text.slice(startIndex, endIndex);
    const post = text.slice(endIndex, text.length);
    const result = pre + opening + subject + closing + post;

    element.value = result;
}

function applyResetCommand(text: string, element: HTMLInputElement | HTMLTextAreaElement): void {
    const result = text
        .replace(unicodeCodes.LEFT_TO_RIGHT_EMBEDDING, "")
        .replace(unicodeCodes.RIGHT_TO_LEFT_EMBEDDING, "")
        .replace(unicodeCodes.POP_DIRECTIONAL_FORMATTING, "");

    element.value = result;
}

function getControlCharachters(command: string): [string, string] {
    if (command === "ltr") {
        return [unicodeCodes.LEFT_TO_RIGHT_EMBEDDING, unicodeCodes.POP_DIRECTIONAL_FORMATTING];
    } else if (command === "rtl") {
        return [unicodeCodes.RIGHT_TO_LEFT_EMBEDDING, unicodeCodes.POP_DIRECTIONAL_FORMATTING];
    }
    return ["", ""];
}

function observeChanges(window: Window): void {
    window.addEventListener("input", (event: Event) => {
        const target = event.target as Element;

        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
            const value: string = target.value;

            if (value.includes(unicodeCodes.LEFT_TO_RIGHT_EMBEDDING)
                || value.includes(unicodeCodes.RIGHT_TO_LEFT_EMBEDDING)
                || value.includes(unicodeCodes.POP_DIRECTIONAL_FORMATTING)) {

                onWatchedInputChanged(event);
            }
        }
    }, true);
}

// tslint:disable-next-line:no-empty
function onWatchedInputChanged(event: Event): void {

}

export default {
    applyCommand,
    observeChanges,
};
