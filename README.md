```markdown
# Desarrollando una Extensión de Google Chrome con Manifest V3, Google Apps Script y (Por supuesto IA) Gemini Flash

Bienvenidos a este workshop donde aprenderemos a desarrollar una extensión de Google Chrome utilizando Manifest V3, Google Apps Script y Gemini Flash. Cada rama de este repositorio corresponde a un paso específico del taller y contiene su propio README con instrucciones detalladas.

## Cuarto Paso: La Página de Opciones en las Extensiones de Chrome

### Añadiendo una Página de Opciones a tu Extensión

Al igual que las extensiones permiten a los usuarios personalizar el navegador Chrome, la página de opciones permite la personalización de la extensión. Usa la página de opciones para habilitar funciones y permitir que los usuarios elijan qué características son relevantes para sus necesidades.

### Acceder a la Página de Opciones

Los usuarios pueden acceder a la página de opciones mediante un enlace directo o haciendo clic derecho en el ícono de la extensión en la barra de herramientas y seleccionando "Opciones". También pueden navegar a la página de opciones abriendo `chrome://extensions`, ubicando la extensión deseada, haciendo clic en "Detalles" y seleccionando el enlace de opciones.

### Crear el Archivo `options.html`

En la carpeta de tu proyecto, crea un archivo llamado `options.html` y añade el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi color favorito</title>
</head>

<body>
    <select id="color">
        <option value="red">rojo</option>
        <option value="green">verde</option>
        <option value="blue">azul</option>
        <option value="yellow">amarillo</option>
    </select>

    <label>
        <input type="checkbox" id="like" />
        Me gustan los colores
    </label>

    <div id="status"></div>
    <button id="save">Guardar</button>

    <script src="options.js"></script>
</body>

</html>
```

### Actualizar el Manifiesto

Abre tu archivo `manifest.json` y añade la referencia a la página de opciones:

```json
{
  "manifest_version": 3,
  "name": "Mi Extensión",
  "version": "0.0.1",
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon-16.png",
      "48": "icon-48.png",
      "128": "icon-128.png"
    }
  },
  "options_page": "options.html"
}
```

### CSS y JavaScript

La página de opciones permite usar HTML, CSS y JavaScript, aunque la interacción con otras partes de la aplicación es limitada y se realiza principalmente a través del almacenamiento de Chrome.

#### Crear `options.js`

Crea un archivo llamado `options.js` y añade el siguiente código JavaScript:

```javascript
// Guarda las opciones en chrome.storage
const saveOptions = () => {
    // Obtiene el valor del color seleccionado y el estado del checkbox
    const color = document.getElementById('color').value;
    const likesColor = document.getElementById('like').checked;
  
    // Guarda los valores en chrome.storage.sync
    chrome.storage.sync.set(
      { favoriteColor: color, likesColor: likesColor },
      () => {
        // Actualiza el estado para informar al usuario que las opciones fueron guardadas
        const status = document.getElementById('status');
        status.textContent = 'Opciones guardadas.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };
  
// Restaura el estado de la caja de selección y el checkbox usando las preferencias
// almacenadas en chrome.storage
const restoreOptions = () => {
    chrome.storage.sync.get(
      { favoriteColor: 'red', likesColor: true },
      (items) => {
        // Establece los valores obtenidos en los elementos del formulario
        document.getElementById('color').value = items.favoriteColor;
        document.getElementById('like').checked = items.likesColor;
      }
    );
  };
  
// Añade un evento para restaurar las opciones cuando el contenido del documento se ha cargado
document.addEventListener('DOMContentLoaded', restoreOptions);

// Añade un evento para guardar las opciones cuando se hace clic en el botón de guardar
document.getElementById('save').addEventListener('click', saveOptions);
```

#### Actualizar Permisos en `manifest.json`

Añade el permiso de almacenamiento en el `manifest.json`:

```json
"permissions": [
    "activeTab",
    "scripting",
    "storage"
]
```

### Declarar el Comportamiento de la Página de Opciones

#### Opciones de Página Completa

Las opciones de página completa se muestran en una nueva pestaña del navegador. Para registrar una página de opciones de página completa, incluye el archivo HTML correspondiente en el campo `options_page` del manifiesto:

```json
{
  "name": "Mi Extensión",
  ...
  "options_page": "options.html",
  ...
}
```

#### Opciones Incorporadas

Las opciones incorporadas permiten a los usuarios ajustar la configuración de la extensión sin salir de la página de administración de extensiones de Chrome. Para declarar opciones incorporadas, registra el archivo HTML en el campo `options_ui` del manifiesto de la extensión, y establece la clave `open_in_tab` en `false`:

```json
{
  "name": "Mi Extensión",
  ...
  "options_ui": {
    "page": "options.html",
    "open_in_tab": false
  },
  ...
}
```

### Interacción con el Popup

Puedes usar la API de Storage para obtener datos y aplicarlos según sea necesario. Por ejemplo, puedes cambiar el `backgroundColor` del formulario en el archivo `popup.js`:

```javascript
const restoreOptions = () => {
    chrome.storage.sync.get(
      { favoriteColor: 'red', likesColor: true },
      (items) => {
        document.querySelector(".login-container").style.backgroundColor = items.favoriteColor;
      }
    );
  };
  
document.addEventListener('DOMContentLoaded', restoreOptions);
```

### Vínculo a la Página de Opciones

Una extensión puede vincularse directamente a la página de opciones llamando a `chrome.runtime.openOptionsPage()`. Por ejemplo, agrega un botón en una ventana emergente para dirigir al usuario a la página de opciones.

#### Código en `popup.html`:

```html
<button id="go-to-options">Go to options</button>
<script src="popup.js"></script>
```

#### Código en `popup.js`:

```javascript
document.querySelector('#go-to-options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage(); // Abre la página de opciones si es compatible
  } else {
    window.open(chrome.runtime.getURL('options.html')); // Fallback para versiones anteriores de Chrome
  }
});
```

### Conclusión

Este post te ha mostrado cómo añadir una página de opciones a tu extensión. Elegir el tipo adecuado de página de opciones depende de la complejidad y la cantidad de configuraciones que necesita tu extensión. Las opciones incorporadas son ideales para configuraciones rápidas y sencillas, mientras que las opciones de página completa son mejores para configuraciones más detalladas y complejas. Siguiendo estos pasos, estarás mejor preparado para crear tu proyecto.

Espero que hayas encontrado útil esta guía. ¡Sigue practicando y mejorando tus habilidades de desarrollo!

---

*Este README corresponde al cuarto paso del workshop. Asegúrate de revisar las siguientes ramas para continuar con los próximos pasos del desarrollo de tu extensión de Chrome.*
```

Este README te guiará a través del cuarto paso del workshop, cubriendo cómo crear y configurar una página de opciones para tu extensión de Chrome. Asegúrate de seguir cada instrucción y revisar las ramas siguientes para continuar con el desarrollo de tu extensión.