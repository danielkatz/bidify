import _ from "lodash";
import simpleField from "./simpleField";
import contentEditable from "./contentEditable";

function onCommand(command: string): void {
    const doc = getActiveDocument();

    if (doc) {
        const editable = doc.activeElement;

        if (editable) {
            if (editable instanceof HTMLInputElement || editable instanceof HTMLTextAreaElement) {
                simpleField.applyCommand(editable, command);
            } else if (editable.attributes.getNamedItem("contenteditable").value === "true") {
                contentEditable.applyCommand(editable, command);
            }

        } else {
            console.log("Active Document doesn't have an active element!");
        }
    } else {
        console.log("Active Document is in an unsupported state!");
    }
}

function getActiveDocument(): Document {
    let doc = window.document;

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

chrome.runtime.onMessage.addListener((request, sender) => onCommand(request.command));

simpleField.observeChanges(window);
contentEditable.observeChanges(window);