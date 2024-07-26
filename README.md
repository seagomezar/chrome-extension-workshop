```markdown
# Desarrollando una Extensión de Google Chrome con Manifest V3, Google Apps Script y (Por supuesto IA) Gemini Flash

Bienvenidos a este workshop donde aprenderemos a desarrollar una extensión de Google Chrome utilizando Manifest V3, Google Apps Script y Gemini Flash. Cada rama de este repositorio corresponde a un paso específico del taller y contiene su propio README con instrucciones detalladas.

## Sexto Paso: Trabajar con Content Scripts en Extensiones para Chrome

### Introducción

En este post, te mostraré cómo trabajar con content scripts en extensiones para Chrome. Los content scripts son archivos que se ejecutan en el contexto de una página web y permiten modificar su contenido. Vamos a explorar cómo inyectar estos scripts, comunicarnos con el background script y personalizar su ejecución en diferentes sitios web.

### ¿Qué son los Content Scripts?

Los content scripts son archivos de JavaScript que se ejecutan en el contexto de la página web, permitiendo manipular el DOM de la página en la que están inyectados. Estos scripts viven en un mundo aislado, lo que significa que pueden interactuar con la página sin interferir con otros scripts que la página pueda estar ejecutando.

### Configuración Básica de Content Scripts

#### Inyectar Content Scripts

Primero, necesitas configurar tu `manifest.json` para incluir los content scripts. Aquí tienes un ejemplo:

```json
{
  "manifest_version": 3,
  "name": "Mi Extensión",
  "version": "0.0.1",
  "content_scripts": [
    {
      "matches": ["*://*.google.com/*"],
      "js": ["content-script.js"]
    }
  ]
}
```

Este archivo especifica que el `content-script.js` se inyectará en todas las páginas de Google.

#### Crear el Archivo `content-script.js`

Crea un archivo llamado `content-script.js` con el siguiente contenido:

```javascript
alert('Hola, soy un Content Script');
```

#### Verificar la Inyección

Carga tu extensión en Chrome y navega a `google.com`. Deberías ver el mensaje de alerta aparecer, indicando que el content script se ha inyectado correctamente.

### Comunicación entre Content Scripts y Background Scripts

Para realizar tareas más avanzadas, los content scripts deben comunicarse con el background script. Vamos a ver cómo enviar y recibir mensajes entre ellos.

#### Enviar un Mensaje desde el Content Script

Modifica tu `content-script.js` para enviar un mensaje al background script:

```javascript
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
```

#### Recibir el Mensaje en el Background Script

Modifica tu `background.js` para escuchar el mensaje y responder:

```javascript
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting === "hello") {
    sendResponse({farewell: "goodbye"});
  }
});
```

#### Probar la Comunicación

Recarga la extensión y verifica la consola de la página de Google para ver el mensaje de respuesta.

### Personalización de Content Scripts

Puedes personalizar cuándo y dónde se ejecutan los content scripts usando patrones de coincidencia y exclusión.

#### Patrones de Coincidencia

Puedes especificar en qué URLs se deben inyectar los content scripts usando el atributo `matches`. Aquí hay un ejemplo para inyectar en múltiples sitios:

```json
"matches": ["*://*.google.com/*", "*://*.newyorktimes.com/*"]
```

#### Patrones de Exclusión

También puedes excluir ciertos URLs usando `exclude_matches`:

```json
"exclude_matches": ["*://*.newyorktimes.com/business/*"]
```

#### Usar Include y Exclude Globs

Los glob patterns te permiten especificar patrones más complejos para la inclusión y exclusión de URLs. Aquí tienes un ejemplo:

```json
{
  "matches": ["*://*.example.com/*"],
  "exclude_matches": ["*://*.example.com/business/*"]
}
```

### Tutorial: Crear una Extensión de Chrome para Resumir Libros con un Popup Interactivo

En este tutorial, vamos a crear una extensión de Chrome que extrae títulos y autores de libros de una página web, envía esta información a un servidor para obtener resúmenes, y muestra estos resúmenes en un popup interactivo al hacer clic en un ícono junto al título del libro.

#### Paso 1: Configurar el Manifiesto de la Extensión

Crea un archivo `manifest.json` en el directorio de tu proyecto y añade la siguiente configuración:

```json
{
  "manifest_version": 3,
  "name": "Book Summary Extension",
  "version": "1.0",
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content-script.js"]
    }
  ],
  "icons": {
    "16": "icon.png",
    "48": "icon.png",
    "128": "icon.png"
  },
  "web_accessible_resources": [
    {
      "resources": ["icon.png"],
      "matches": ["<all_urls>"]
    }
  ]
}
```

#### Paso 2: Crear el Script de Fondo (`background.js`)

Este script manejará las solicitudes de resúmenes y las respuestas de la API. Crea un archivo `background.js` y añade el siguiente código:

```javascript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.bookTitle && message.bookAuthor) {
    let apiKey = 'YOUR_API_KEY';
    let apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    let requestBody = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Write a Summary with an Introduction, Key Insights, Books Summary and Conclusion about the book “${message.bookTitle}” by \\"${message.bookAuthor}\\" the article should be separated by headings and well explained with examples. Take your time.`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 1,
        topK: 64,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain'
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
      ]
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      sendResponse({ summary: data });
    })
    .catch(error => console.error('Error:', error));
    
    return true; // Esto indica que la respuesta será asíncrona
  }
});
```

#### Paso 3: Crear el Script de Contenido (`content-script.js`)

Este script extraerá los títulos y autores de los libros, enviará solicitudes al background script, y añadirá un ícono junto al título del libro.

```javascript
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.extractBooks) {
    for (let i = 1; i <= 18; i++) {
      let selector = `body > app-root > div > app-home > div.sidebar-listado-libros.mt-2.mt-md-3.pt-md-3 > div > div > div:nth-child(2) > div.row.mx-0 > div > div > div.owl-stage-outer > div > div:nth-child(${i}) > div > div > div:nth-child(2) > a`;
      let authorSelector = `body > app-root > div > app-home > div.sidebar-listado-libros.mt-2.mt-md-3.pt-md-3 > div > div > div:nth-child(2) > div.row.mx-0 > div > div > div.owl-stage-outer > div > div:nth-child(${i}) > div > div > div.col-12.text--gray.text--xl.mb-2.px-0`;
      
      let element = document.querySelector(selector);
      let authorElement = document.querySelector(authorSelector);
      
      if (element && authorElement) {
        let bookTitle = element.innerText;
        let bookAuthor = authorElement.innerText;
        
        try {
          const response = await chrome.runtime.sendMessage({ bookTitle: bookTitle, author: bookAuthor });
          
          if (response.summary) {
            // Añadir el ícono junto al título
            let icon = document.createElement('img');
            icon.src = chrome.runtime.getURL('icon.png'); // Asegúrate de tener un icono en tu extensión
            icon.style.cursor = 'pointer';
            icon.style.marginLeft = '10px';
            icon.style.width = '30px';
            icon.addEventListener('click', () => {
              showSummaryPopup(bookTitle, response.summary);
            });


            element.parentNode.insertBefore(icon, element.nextSibling);
            
            chrome.runtime.sendMessage({ bookTitle: bookTitle, summary: response.summary });
          }
        } catch (error) {
          console.error('Error fetching summary:', error);
        }
      }
    }
  }
});

function showSummaryPopup(title, summary) {
  const summaryData = JSON.parse(summary);

  // Crear la ventana flotante
  let popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.right = '10px';
  popup.style.bottom = '10px';
  popup.style.width = '400px';
  popup.style.maxHeight = '500px';
  popup.style.overflowY = 'auto';
  popup.style.backgroundColor = 'white';
  popup.style.border = '1px solid black';
  popup.style.padding = '15px';
  popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
  popup.style.zIndex = 1000;

  let titleElement = document.createElement('h2');
  titleElement.innerText = summaryData.Title;

  let introductionElement = document.createElement('p');
  introductionElement.innerHTML = `<strong>Introduction:</strong> ${summaryData.Introduction}`;

  let keyInsightsElement = document.createElement('div');
  keyInsightsElement.innerHTML = `<strong>Key Insights:</strong>`;
  summaryData["Key Insights"].forEach(insight => {
    let insightElement = document.createElement('p');
    insightElement.innerHTML = insight;
    keyInsightsElement.appendChild(insightElement);
  });

  let bookSummaryElement = document.createElement('p');
  bookSummaryElement.innerHTML = `<strong>Book Summary:</strong> ${summaryData["Book Summary"]}`;

  let conclusionElement = document.createElement('p');
  conclusionElement.innerHTML = `<strong>Conclusion:</strong> ${summaryData.Conclusion}`;

  let closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.style.display = 'block';
  closeButton.style.margin = '10px auto';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });

  popup.appendChild(titleElement);
  popup.appendChild(introductionElement);
  popup.appendChild(keyInsightsElement);
  popup.appendChild(bookSummaryElement);
  popup.appendChild(conclusionElement);
  popup.appendChild(closeButton);

  document.body.appendChild(popup);
}
```

#### Paso 4: Crear el Popup de la Extensión

El `popup.html` y `popup.js` permitirán al usuario iniciar la extracción de libros y mostrará los resúmenes obtenidos.

##### `popup.html`

Crea un archivo `popup.html` y añade el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Book Summary Extension</title>
  <script src="popup.js"></script>
  <style>
    #fetchSummaries {
      margin-bottom: 10px;
    }
    .summary-container {
      border: 1px solid #ccc;
      margin: 10px 0;
      padding: 10px;
      cursor: pointer;
    }
    .summary-container h2 {
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <h1>Book Summaries</h1>
  <button id="fetchSummaries">Fetch Summaries</button>
  <div id="summaries"></div>
</body>
</html>
```

##### `popup.js`

Crea un archivo `popup.js` y añade el siguiente código:

```javascript
document.getElementById('fetchSummaries').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "fetchSummaries" });
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.bookTitle && message.bookAuthor && message.summary) {
    let summaryData = JSON.parse(message.summary);

    let summaryContainer = document.createElement('div');
    summaryContainer.className = 'summary-container';

    let titleElement = document.createElement('h2');
    titleElement.innerText = summaryData.Title;
    titleElement.addEventListener('click', () => {
      toggleSummaryDetails(summaryContainer);
    });

    let detailsElement = document.createElement('div');
    detailsElement.style.display = 'none';

    let introductionElement = document.createElement('p');
    introductionElement.innerHTML = `<strong>Introduction:</strong> ${summaryData.Introduction}`;

    let keyInsightsElement = document.createElement('div');
    keyInsightsElement.innerHTML = `<strong>Key Insights:</strong>`;
    summaryData["Key Insights"].forEach(insight => {
      let insightElement = document.createElement('p');
      insightElement.innerHTML = insight;
      keyInsightsElement.appendChild(insightElement);
    });

    let bookSummaryElement = document.createElement('p');
    bookSummaryElement.innerHTML = `<strong>Book Summary:</strong> ${summaryData["Book Summary"]}`;

    let conclusionElement = document.createElement('p');
    conclusionElement.innerHTML = `<strong>Conclusion:</strong> ${summaryData.Conclusion}`;

    detailsElement.appendChild(introductionElement);
    detailsElement.appendChild(keyInsightsElement);
    detailsElement.appendChild(bookSummaryElement);
    detailsElement.appendChild(conclusionElement);

    summaryContainer.appendChild(titleElement);
    summaryContainer.appendChild(detailsElement);

    document.getElementById('summaries').appendChild(summaryContainer);
  }
});

function toggleSummaryDetails(summaryContainer) {
  let detailsElement = summaryContainer.querySelector('div');
  if (detailsElement.style.display === 'none') {
    detailsElement.style.display = 'block';
  } else {
    detailsElement.style.display = 'none';
  }
}
```

#### Paso 5: Añadir el Ícono de la Extensión

Asegúrate de tener un archivo de ícono `icon.png` en el directorio de tu proyecto. Este ícono se utilizará para indicar que hay un resumen disponible junto al título del libro.

#### Paso 6: Prueba la Extensión

1. Abre Chrome y ve a `chrome://extensions/`.
2. Activa el "Modo de desarrollador".
3. Haz clic en "Cargar descomprimida" y selecciona el directorio de tu proyecto.
4. Abre una página web compatible con la estructura seleccionada para los libros.
5. Haz clic en el ícono de la extensión y luego en "Fetch Summaries".

Deberías ver los íconos junto a los títulos de los libros y, al hacer clic en ellos, una ventana emergente mostrando el resumen del libro.

### Resumen

Hemos creado una extensión de Chrome que extrae títulos y autores de libros de una página web, envía esta información a un servidor para obtener resúmenes, y muestra estos resúmenes en un popup interactivo. Hemos cubierto la configuración del manifiesto, la implementación de los scripts de fondo y de contenido, y la configuración del popup de la extensión.

Los content scripts son una herramienta poderosa para modificar el comportamiento de las páginas web desde una extensión para Chrome. Al entender cómo inyectar estos scripts, comunicarse con el background script y personalizar su ejecución, puedes crear extensiones más efectivas y funcionales. Sigue explorando estas técnicas para aprovechar al máximo las capacidades de los content scripts en tus proyectos de extensión para Chrome.

---

*Este README corresponde al sexto paso del workshop. Asegúrate de revisar las siguientes ramas para continuar con los próximos pasos del desarrollo de tu extensión de Chrome.*
```

Este README te guiará a través del sexto paso del workshop, cubriendo cómo trabajar con content scripts en tu extensión de Chrome. Asegúrate de seguir cada instrucción y revisar las ramas siguientes para continuar con el desarrollo de tu extensión.