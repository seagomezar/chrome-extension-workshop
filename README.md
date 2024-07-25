```markdown
# Desarrollando una Extensión de Google Chrome con Manifest V3, Google Apps Script y (Por supuesto IA) Gemini Flash

Bienvenidos a este workshop donde aprenderemos a desarrollar una extensión de Google Chrome utilizando Manifest V3, Google Apps Script y Gemini Flash. Cada rama de este repositorio corresponde a un paso específico del taller y contiene su propio README con instrucciones detalladas.

## Tercer Paso: Cómo Crear y Depurar Pop-ups en Extensiones para Chrome

### Introducción

En este post, te enseñaré a crear y depurar pop-ups en extensiones para Chrome. Exploraremos cómo configurar un archivo `popup.html`, agregar hojas de estilo y scripts, y depurar posibles errores. Esta guía paso a paso te ayudará a desarrollar pop-ups funcionales y atractivos para tus extensiones. El pop-up es en la mayoría de los casos el punto de entrada de la aplicación y corresponde en muchos casos a una ventana emergente justo debajo de tu extensión. Puedes definir el nombre del archivo y la ubicación, pero debe estar claramente especificado en el manifiesto mediante:

```json
{
  "action": {
    "default_popup": "popup.html" // o index.html o hola.html
  }
}
```

### Creando el Archivo `popup.html`

Para empezar, necesitamos crear el archivo `popup.html` que será el contenido del pop-up de nuestra extensión.

#### Crear el Archivo `popup.html`

1. Crea un archivo llamado `popup.html` en tu proyecto.
2. Añade el siguiente código básico de HTML:

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulario de Inicio de Sesión</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="login-container">
            <h2>¡Bienvenido de Nuevo!</h2>
            <form>
                <div class="form-group">
                    <label for="email">Correo Electrónico</label>
                    <input type="email" class="form-control" id="email" placeholder="Ingrese su correo electrónico">
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" class="form-control" id="password" placeholder="Ingrese su contraseña">
                </div>
                <button type="submit" class="btn btn-custom btn-block">Iniciar Sesión</button>
            </form>
            <p class="mt-3">¿No tienes una cuenta? <a href="#" style="color: #ff6f61;">Regístrate</a></p>
        </div>
        
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
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

1. Crea un archivo llamado `popup.css` en tu proyecto.
2. Añade el siguiente código CSS:

    ```css
    body {
        background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
        width: 400px;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        margin: 0;
    }
    .login-container {
        background: #fff;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        width: 100%;
        max-width: 400px;
    }
    .login-container h2 {
        color: #ff6f61;
        margin-bottom: 1rem;
    }
    .btn-custom {
        background: #ff6f61;
        border: none;
        color: white;
        transition: background 0.3s;
    }
    .btn-custom:hover {
        background: #ff8f81;
    }
    .form-group label {
        float: left;
    }
    ```

Asegúrate de que el `popup.html` enlace correctamente con esta hoja de estilo:

```html
<link href="popup.css" rel="stylesheet">
```

#### Añadir un Script

1. Crea un archivo llamado `popup.js`.
2. Añade el siguiente código JavaScript:

    ```javascript
    document.addEventListener('DOMContentLoaded', function() {
        alert("De esta manera hemos deshabilitado react por completo y usamos un popup estándar de extensión de chrome solo con html, css y javascript");
    });
    ```

3. Modifica el `popup.html` para incluir este script:

    ```html
    <script src="popup.js"></script>
    ```

#### Recargar y Probar

Recarga la extensión y verifica que los estilos y scripts se apliquen correctamente.

### Depuración de la Extensión

Los errores de la extensión se pueden ver de dos maneras. En primer lugar, los errores no críticos se ven al oprimir el botón "Errores" de la lista de extensiones. En segundo lugar, son los errores críticos. Estos ni siquiera permiten que la extensión se ejecute y principalmente obedecen a errores en el `manifest.json`. La tercera es depurar el pop-up como si fuera una aplicación web normal mediante "Inspeccionar elemento".

#### Depurar el Pop-up

Recuerda que el pop-up no es más que una aplicación independiente aislada y autocontenida en el contenedor de la aplicación, lo cual hace que depurar pop-ups sea crucial para asegurar que tu extensión funcione correctamente. Aquí hay algunos pasos para ayudarte a identificar y corregir errores.

1. **Verificar Errores en Chrome:** Después de recargar tu extensión, abre el pop-up y haz clic derecho para seleccionar "Inspeccionar" como si fuera el sitio web. Esto abrirá las herramientas de desarrollador de Chrome.
2. **Revisar la Consola:** La consola te mostrará cualquier error en tu código. Puedes buscar estos errores en Google para encontrar soluciones.
3. **Depuración en Profundidad:** Utiliza las pestañas de "Sources" y "Network" en las herramientas de desarrollador para identificar problemas con los scripts y las solicitudes de red.

### Importancia de la Política de Seguridad de Contenido (CSP)

La política de seguridad de contenido (CSP) es una característica de seguridad esencial para las extensiones de Chrome que ayuda a prevenir diversos tipos de ataques, como el Cross-Site Scripting (XSS) y la inyección de datos. En el contexto de las extensiones de Chrome, la configuración de CSP se define en el archivo `manifest.json`, bajo la clave `content_security_policy`.

#### Definición de CSP para Páginas de Extensión

En las extensiones de Chrome, la política de seguridad de contenido para las páginas de la extensión se puede especificar de la siguiente manera:

```json
{
  "manifest_version": 3,
  "name": "Mi Extensión Segura",
  "version": "1.0",
  "content_security_policy": {
    "extension_pages": "default-src 'self'; script-src 'self' https://apis.google.com"
  }
}
```

#### Componentes de la Política

- `default-src 'self'`: Esto establece que todos los recursos por defecto solo pueden ser cargados desde el mismo origen que la extensión, es decir, desde el propio paquete de la extensión.
- `script-src 'self' https://apis.google.com`: Permite la carga de scripts únicamente desde el mismo origen y desde el dominio `apis.google.com`. Esta configuración es útil si tu extensión necesita interactuar con servicios de Google.

#### Importancia de CSP en Extensiones

Configurar correctamente la política de seguridad de contenido es crucial para proteger tu extensión y a sus usuarios. Al restringir las fuentes desde las cuales se pueden cargar recursos, se minimizan las posibilidades de ataques de inyección de código y otras amenazas de seguridad.

### Conclusión

Crear y depurar pop-ups en extensiones para Chrome puede parecer complejo al principio, pero siguiendo estos pasos podrás desarrollar pop-ups funcionales y atractivos. Desde la configuración básica del archivo `popup.html` hasta la integración de Bootstrap y la depuración de errores, esta guía te proporciona las herramientas necesarias para mejorar tus extensiones de Chrome. ¡Sigue practic