/*document.addEventListener('DOMContentLoaded', function() {
    alert("De esta manera hemos desabilitado react por completo y usamos un popup estandard de extensión de chrome solo con html,css y javascript");
});*/

document.querySelector('#go-to-options').addEventListener('click', function() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  });

document.querySelector('#message-to-background').addEventListener('click', function() {
    chrome.runtime.sendMessage({greeting: "hola"}, function(response) {
      alert(response.farewell);
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting === "hello") {
    alert("Mensaje recibido desde el background");
    sendResponse({farewell: "goodbye"});
  }
});

  const restoreOptions = () => {
    chrome.storage.sync.get(
      { favoriteColor: 'red', likesColor: true },
      (items) => {
        console.log(items.favoriteColor);
        document.querySelector(".login-container").style.backgroundColor = items.favoriteColor;
      }
    );
  };
  
  document.addEventListener('DOMContentLoaded', restoreOptions);