(function () {
  function onClickHandler(info, tab) {

    chrome.tabs.sendMessage(tab.id, {
      command: info.menuItemId
    });

    console.log(`${info.menuItemId} command was sent to tab ${tab.id}`);
  };

  chrome.contextMenus.onClicked.addListener(onClickHandler);

  chrome.runtime.onInstalled.addListener(function () {

    var id = chrome.contextMenus.create({
      "title": "Force Direction",
      "contexts": ["editable"],
      "id": "root"
    });

    chrome.contextMenus.create({
      "title": "Left to Right",
      "contexts": ["editable"],
      "parentId": id,
      "id": "ltr"
    });

    chrome.contextMenus.create({
      "title": "Right to Left",
      "contexts": ["editable"],
      "parentId": id,
      "id": "rtl"
    });

    chrome.contextMenus.create({
      "title": "Reset",
      "contexts": ["editable"],
      "parentId": id,
      "id": "reset"
    });
  });
})();