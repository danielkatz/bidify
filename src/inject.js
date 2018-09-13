(function () {
    const simpleElements = ["INPUT", "TEXTAREA"];
    const LEFT_TO_RIGHT_EMBEDDING = "\u202A";
    const RIGHT_TO_LEFT_EMBEDDING = "\u202B";
    const POP_DIRECTIONAL_FORMATTING = "\u202C";

    function onCommand(command) {
        const doc = getActiveDocument();

        if (doc) {
            const editable = doc.activeElement;

            if (editable) {
                if (simpleElements.includes(editable.nodeName)) {
                    applyCommandToSimpleInputElement(editable, command);
                } else if (editable.attributes["contenteditable"].value === "true") {
                    applyCommandToContentEditableElement(editable, command);
                }

            } else {
                console.log("Active Document doesn't have an active element!");
            }
        } else {
            console.log("Active Document is in an unsupported state!");
        }
    }

    function getActiveDocument() {
        let doc = window.document;

        while (doc) {
            let elem = doc.activeElement;

            if (elem && elem.nodeName === "IFRAME") {
                doc = elem.contentDocument;
            } else {
                return doc;
            }
        }

        return null;
    }

    function applyCommandToSimpleInputElement(element, command) {
        let startIndex = element.selectionStart;
        let endIndex = element.selectionEnd;
        let text = element.value;

        if (text.length > 0) {
            if (startIndex === endIndex) {
                startIndex = 0;
                endIndex = text.length;
            }

            if (command === "reset") {
                let result = text
                    .replace(LEFT_TO_RIGHT_EMBEDDING, "")
                    .replace(RIGHT_TO_LEFT_EMBEDDING, "")
                    .replace(POP_DIRECTIONAL_FORMATTING, "");

                element.value = result;
            } else {
                let [opening, closing] = getControlCharachters(command);
                let pre = text.slice(0, startIndex);
                let subject = text.slice(startIndex, endIndex);
                let post = text.slice(endIndex, text.length);

                let result = pre + opening + subject + closing + post;

                element.value = result;
            }
        }
    }

    function getControlCharachters(command) {
        if (command === "ltr") {
            return [LEFT_TO_RIGHT_EMBEDDING, POP_DIRECTIONAL_FORMATTING];
        } else if (command === "rtl") {
            return [RIGHT_TO_LEFT_EMBEDDING, POP_DIRECTIONAL_FORMATTING];
        }
        return ["", ""];
    }

    function applyCommandToContentEditableElement(element, command) {
        console.log("contenteditable elements arn't supported yet!");
    }

    function onWatchedInputChanged(event) {
        
    }

    chrome.runtime.onMessage.addListener((request, sender) => onCommand(request.command));

    window.addEventListener("input", (event) => {
        if (simpleElements.includes(event.target.nodeName)) {
            var value = event.target.value;

            if (value.includes(LEFT_TO_RIGHT_EMBEDDING)
                || value.includes(RIGHT_TO_LEFT_EMBEDDING)
                || value.includes(POP_DIRECTIONAL_FORMATTING)) {

                onWatchedInputChanged(event);
            }
        }
    }, true);
})();