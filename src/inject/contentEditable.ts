import core from "./core";

function applyCommand(element: Element, command: string): void {
    console.log("contenteditable elements arn't supported yet!");
}

// tslint:disable-next-line:no-empty
function observeChanges(window: Window): void {

}

export default {
    applyCommand: applyCommand,
    observeChanges: observeChanges
};