function onClickHandler(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): void {

  chrome.tabs.sendMessage(tab.id, {
    command: info.menuItemId
  });

  console.log(`${info.menuItemId} command was sent to tab ${tab.id}`);
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(() => {

  var id: any = chrome.contextMenus.create({
    "title": chrome.i18n.getMessage("i10n_rootMenu"),
    "contexts": ["editable"],
    "id": "root"
  });

  chrome.contextMenus.create({
    "title": chrome.i18n.getMessage("i10n_ltrCommandMenu"),
    "contexts": ["editable"],
    "parentId": id,
    "id": "ltr"
  });

  chrome.contextMenus.create({
    "title": chrome.i18n.getMessage("i10n_rtlCommandMenu"),
    "contexts": ["editable"],
    "parentId": id,
    "id": "rtl"
  });

  chrome.contextMenus.create({
    "title": chrome.i18n.getMessage("i10n_resetCommandMenu"),
    "contexts": ["editable"],
    "parentId": id,
    "id": "reset"
  });
});