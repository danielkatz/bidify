import _ from "lodash";

const LEFT_TO_RIGHT_EMBEDDING: string = "\u202A";
const RIGHT_TO_LEFT_EMBEDDING: string = "\u202B";
const POP_DIRECTIONAL_FORMATTING: string = "\u202C";

function onCommand(command: string): void {
    const doc: Document = getActiveDocument();

    if (doc) {
        const editable: Element = doc.activeElement;

        if (editable) {
            if (editable instanceof HTMLInputElement || editable instanceof HTMLTextAreaElement) {
                applyCommandToSimpleInputElement(editable, command);
            } else if (editable.attributes.getNamedItem("contenteditable").value === "true") {
                applyCommandToContentEditableElement(editable, command);
            }

        } else {
            console.log("Active Document doesn't have an active element!");
        }
    } else {
        console.log("Active Document is in an unsupported state!");
    }
}

function getActiveDocument(): Document {
    let doc: Document = window.document;

    while (doc) {
        let elem: Element = doc.activeElement;

        if (elem && elem instanceof HTMLIFrameElement) {
            doc = elem.contentDocument;
        } else {
            return doc;
        }
    }

    return null;
}

function applyCommandToSimpleInputElement(element: HTMLInputElement | HTMLTextAreaElement, command: string): void {
    let startIndex: number = element.selectionStart;
    let endIndex: number = element.selectionEnd;
    let text: string = element.value;

    if (text.length > 0) {
        if (startIndex === endIndex) {
            startIndex = 0;
            endIndex = text.length;
        }

        if (command === "reset") {
            let result: string = text
                .replace(LEFT_TO_RIGHT_EMBEDDING, "")
                .replace(RIGHT_TO_LEFT_EMBEDDING, "")
                .replace(POP_DIRECTIONAL_FORMATTING, "");

            element.value = result;
        } else {
            let [opening, closing] = getControlCharachters(command);
            let pre: string = text.slice(0, startIndex);
            let subject: string = text.slice(startIndex, endIndex);
            let post: string = text.slice(endIndex, text.length);

            let result: string = pre + opening + subject + closing + post;

            element.value = result;
        }
    }
}

function getControlCharachters(command: string): [string, string] {
    if (command === "ltr") {
        return [LEFT_TO_RIGHT_EMBEDDING, POP_DIRECTIONAL_FORMATTING];
    } else if (command === "rtl") {
        return [RIGHT_TO_LEFT_EMBEDDING, POP_DIRECTIONAL_FORMATTING];
    }
    return ["", ""];
}

function applyCommandToContentEditableElement(element: Element, command: string): void {
    console.log("contenteditable elements arn't supported yet!");
}

// tslint:disable-next-line:no-empty
function onWatchedInputChanged(event: Event): void { }

chrome.runtime.onMessage.addListener((request, sender) => onCommand(request.command));

window.addEventListener("input", (event: Event) => {
    let target: Element = <Element>event.target;

    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        var value: string = target.value;

        if (value.includes(LEFT_TO_RIGHT_EMBEDDING)
            || value.includes(RIGHT_TO_LEFT_EMBEDDING)
            || value.includes(POP_DIRECTIONAL_FORMATTING)) {

            onWatchedInputChanged(event);
        }
    }
}, true);