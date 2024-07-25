```markdown
# Desarrollando una Extensión de Google Chrome con Manifest V3, Google Apps Script y (Por supuesto IA) Gemini Flash

Bienvenidos a este workshop donde aprenderemos a desarrollar una extensión de Google Chrome utilizando Manifest V3, Google Apps Script y Gemini Flash. Cada rama de este repositorio corresponde a un paso específico del taller y contiene su propio README con instrucciones detalladas.

## Tercer Paso: Cómo Crear y Depurar Pop-ups en Extensiones para Chrome

### Introducción

En este post, te enseñaré a crear y depurar pop-ups en extensiones para Chrome. Exploraremos cómo configurar un archivo `popup.html`, agregar hojas de estilo y scripts, y depurar posibles errores. Esta guía paso a paso te ayudará a desarrollar pop-ups funcionales y atractivos para tus extensiones.

### Creando el Archivo `popup.html`

Para empezar, necesitamos crear el archivo `popup.html` que será el contenido del pop-up de nuestra extensión.

#### Crear el Archivo `popup.html`

Crea un archivo llamado `popup.html` en tu proyecto y añade el siguiente código básico de HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Popup</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

#### Actualizar el Manifiesto

Modifica el archivo `manifest.json` para incluir el pop-up:

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
  }
}
```

#### Verificar los Cambios

Recarga la extensión en Chrome y verifica que el pop-up aparezca correctamente al hacer clic en el icono de la extensión.

### Añadiendo Estilos y Scripts

Para mejorar el diseño y la funcionalidad de tu pop-up, puedes agregar hojas de estilo CSS y scripts JavaScript.

#### Crear una Hoja de Estilo

Crea un archivo llamado `popup.css` en tu proyecto y añade el siguiente código CSS:

```css
body {
  width: 400px;
  height: 400px;
}
```

Asegúrate de que el `popup.html` enlace correctamente con esta hoja de estilo.

#### Añadir un Script

Crea un archivo llamado `popup.js` y añade el siguiente código JavaScript:

```javascript
alert('Hello Pop-up');
```

Modifica el `popup.html` para incluir este script:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Popup</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <h1>Hello World</h1>
  <script src="popup.js"></script>
</body>
</html>
```

#### Recargar y Probar

Recarga la extensión y verifica que los estilos y scripts se apliquen correctamente.

### Integrando Bootstrap

Para un diseño más avanzado, puedes integrar Bootstrap en tu pop-up.

#### Añadir Bootstrap

Añade los enlaces a Bootstrap en tu `popup.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Popup</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<body>
  <h1>Hello World</h1>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>
</html>
```

#### Añadir Elementos de Bootstrap

Utiliza clases de Bootstrap para mejorar el diseño de tu pop-up. Por ejemplo, puedes añadir un formulario:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Popup</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<body>
  <h1>Hello World</h1>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>
</html>
```

#### Recargar y Verificar

Recarga la extensión y asegúrate de que los estilos de Bootstrap se apliquen correctamente.

### Depuración de Pop-ups

Depurar pop-ups es crucial para asegurar que tu extensión funcione correctamente. Aquí hay algunos pasos para ayudarte a identificar y corregir errores.

#### Verificar Errores en Chrome

Después de recargar tu extensión, abre el pop-up y haz clic derecho para seleccionar "Inspeccionar". Esto abrirá las herramientas de desarrollador de Chrome.

#### Revisar la Consola

La consola te mostrará cualquier error en tu código. Puedes buscar estos errores en Google para encontrar soluciones.

#### Depuración en Profundidad

Utiliza las pestañas de "Sources" y "Network" en las herramientas de desarrollador para identificar problemas con los scripts y las solicitudes de red.

### Conclusión

Crear y depurar pop-ups en extensiones para Chrome puede parecer complejo al principio, pero siguiendo estos pasos podrás desarrollar pop-ups funcionales y atractivos. Desde la configuración básica del archivo `popup.html` hasta la integración de Bootstrap y la depuración de errores, esta guía te proporciona las herramientas necesarias para mejorar tus extensiones de Chrome. ¡Sigue practicando y mejorando tus habilidades para crear extensiones aún más útiles y sofisticadas!

---

*Este README corresponde al tercer paso del workshop. Asegúrense de revisar las siguientes ramas para continuar con los próximos pasos del desarrollo de su extensión de Chrome.*
```

Este README te guiará a través del tercer paso del workshop, cubriendo cómo crear y depurar pop-ups para tu extensión de Chrome. Asegúrate de seguir cada instrucción y revisar las ramas siguientes para continuar con el desarrollo de tu extensión.