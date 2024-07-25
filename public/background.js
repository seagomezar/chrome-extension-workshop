chrome.runtime.onInstalled.addListener(async function (details) {
  if (details.reason === 'install') {
    const url = chrome.i18n.getMessage('installedUrl') || 'https://www.sebastian-gomez.com/category/chrome-extensions';
    chrome.tabs.create(
      { url },
      function (tab) { }
    );
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  setTimeout(sendMessageToPopup, 15000);
  console.log(sender.tab ?
              "Mensaje desde el contenido del script:" + sender.tab.url :
              "Mensaje desde la extensión");
  if (request.greeting === "hola") {
    sendResponse({farewell: "adiós"});
  }
  
});

function sendMessageToPopup() {
  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response);
  });
}

