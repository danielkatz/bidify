import core from "./core";

function applyCommand(element: HTMLInputElement | HTMLTextAreaElement, command: string): void {
    let text = element.value;

    if (text.length > 0) {
        if (command === "reset") {
            applyResetCommand(text, element);
        } else {
            applyEmbedDirectionCommand(command, text, element);
        }
    }
}

function applyEmbedDirectionCommand(command: string, text: string, element: HTMLInputElement | HTMLTextAreaElement): void {
    let startIndex = element.selectionStart;
    let endIndex = element.selectionEnd;

    if (startIndex === endIndex) {
        startIndex = 0;
        endIndex = text.length;
    }

    let [opening, closing] = getControlCharachters(command);
    let pre = text.slice(0, startIndex);
    let subject = text.slice(startIndex, endIndex);
    let post = text.slice(endIndex, text.length);
    let result = pre + opening + subject + closing + post;

    element.value = result;
}

function applyResetCommand(text: string, element: HTMLInputElement | HTMLTextAreaElement): void {
    let result = text
        .replace(core.LEFT_TO_RIGHT_EMBEDDING, "")
        .replace(core.RIGHT_TO_LEFT_EMBEDDING, "")
        .replace(core.POP_DIRECTIONAL_FORMATTING, "");

    element.value = result;
}

function getControlCharachters(command: string): [string, string] {
    if (command === "ltr") {
        return [core.LEFT_TO_RIGHT_EMBEDDING, core.POP_DIRECTIONAL_FORMATTING];
    } else if (command === "rtl") {
        return [core.RIGHT_TO_LEFT_EMBEDDING, core.POP_DIRECTIONAL_FORMATTING];
    }
    return ["", ""];
}

function observeChanges(window: Window): void {
    window.addEventListener("input", (event: Event) => {
        let target = <Element>event.target;

        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
            let value: string = target.value;

            if (value.includes(core.LEFT_TO_RIGHT_EMBEDDING)
                || value.includes(core.RIGHT_TO_LEFT_EMBEDDING)
                || value.includes(core.POP_DIRECTIONAL_FORMATTING)) {

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
