# Desarrollando una Extensión de Google Chrome con Manifest V3, Google Apps Script y (Por supuesto IA) Gemini Flash

Bienvenidos a este workshop donde aprenderemos a desarrollar una extensión de Google Chrome utilizando Manifest V3, Google Apps Script y Gemini Flash. Cada rama de este repositorio corresponde a un paso específico del taller y contiene su propio README con instrucciones detalladas.

## Segundo Paso: El Manifest V3

### Introducción

En este segundo paso, te guiaré a través de los pasos necesarios para configurar tu propia extensión para Chrome utilizando la versión 3 del manifiesto (Manifest V3). Desde la creación del archivo de manifiesto hasta la configuración de íconos y otros detalles esenciales, cubriremos todo lo que necesitas saber para empezar.

### Primeros Pasos: Creando el Archivo de Manifiesto

El archivo de manifiesto es fundamental para cualquier extensión de Chrome. Proporciona al navegador información crucial sobre la extensión, como los archivos principales y las capacidades que utilizará. Con cada nueva versión del manifiesto, las características de la plataforma de extensiones cambian. En este post, trabajaremos con Manifest V3, y empezaremos creando un archivo JSON para nuestra extensión.

#### Estructura Básica del Archivo de Manifiesto

Crea un archivo llamado `manifest.json` y agrega la siguiente estructura básica:

```json
{
  "manifest_version": 3,
  "name": "Mi Extensión",
  "version": "0.0.1",
  "description": "Descripción de mi extensión"
}
```

### Cargando la Extensión en Chrome

Una vez creado el archivo de manifiesto, el siguiente paso es cargar la extensión en Chrome.

#### Habilitar el Modo de Desarrollador

1. Abre Chrome y navega a `chrome://extensions/`.
2. Activa el "Modo de Desarrollador" en la esquina superior derecha.

#### Cargar la Extensión

1. Haz clic en "Cargar descomprimida".
2. Selecciona la carpeta que contiene tu archivo `manifest.json`.
3. Verás tu extensión listada. Cualquier cambio que hagas en el manifiesto puede ser reflejado al recargar la extensión.

### Añadiendo Íconos a la Extensión

Las extensiones suelen incluir íconos para mejorar la experiencia del usuario. Manifest V3 permite especificar diferentes tamaños de íconos para distintas partes del navegador.

#### Definir Íconos en el Manifiesto

Añade una sección de íconos a tu `manifest.json`:

```json
{
  "manifest_version": 3,
  "name": "Mi Extensión",
  "version": "0.0.1",
  "description": "Descripción de mi extensión",
  "icons": {
    "16": "icon-16.png",
    "48": "icon-48.png",
    "128": "icon-128.png"
  }
}
```

#### Preparar los Archivos de Íconos

Crea íconos en los tamaños especificados (16x16, 48x48, 128x128) y colócalos en la carpeta de tu proyecto.

#### Actualizar y Recargar

Después de actualizar el manifiesto con los íconos, recarga la extensión para ver los cambios reflejados.

### Configurando la Acción de la Extensión

La API `chrome.action` en el Manifest V3 de Google Chrome Extensions permite controlar el ícono de la extensión que aparece en la barra de herramientas del navegador. Esta API es fundamental para gestionar cómo se presenta y se comporta la extensión en la interfaz del usuario.

#### Añadir una Sección de Acción

Actualiza tu `manifest.json` para incluir la sección `action`:

```json
{
  "manifest_version": 3,
  "name": "Mi Extensión",
  "version": "0.0.1",
  "description": "Descripción de mi extensión",
  "icons": {
    "16": "icon-16.png",
    "48": "icon-48.png",
    "128": "icon-128.png"
  },
  "action": {
    "default_icon": {
      "16": "icon-16.png",
      "48": "icon-48.png",
      "128": "icon-128.png"
    },
    "default_title": "Mi Asombrosa Extensión de Chrome"
  }
}
```

### Diferencia entre `icons` y `action.default_icon`

La diferencia principal entre usar `icons` y `action.default_icon` en una extensión de Google Chrome radica en el propósito y el contexto de uso de cada uno:

- **icons:** Define los íconos de la extensión que se utilizan en diferentes contextos dentro de la interfaz de usuario de Chrome.
- **action.default_icon:** Específicamente controla el ícono de la acción de la extensión que aparece en la barra de herramientas del navegador.

### Recargar y Verificar

Recarga la extensión y verifica que los íconos y el título predeterminado aparezcan correctamente en la barra de herramientas.

### Añadiendo Información Adicional

Puedes incluir más información en el manifiesto para personalizar aún más tu extensión.

#### Añadir Correo Electrónico del Autor

Añade una línea en tu `manifest.json` para incluir el correo del autor:

```json
{
  "manifest_version": 3,
  "name": "Mi Extensión",
  "version": "0.0.1",
  "description": "Descripción de mi extensión",
  "icons": {
    "16": "icon-16.png",
    "48": "icon-48.png",
    "128": "icon-128.png"
  },
  "action": {
    "default_icon": {
      "16": "icon-16.png",
      "48": "icon-48.png",
      "128": "icon-128.png"
    },
    "default_title": "Mi Asombrosa Extensión de Chrome"
  },
  "author": "miemail@example.com"
}
```

#### Definir el Idioma Predeterminado

Especifica el idioma predeterminado utilizando `default_locale`:

```json
{
  "manifest_version": 3,
  "name": "Mi Extensión",
  "version": "0.0.1",
  "description": "Descripción de mi extensión",
  "icons": {
    "16": "icon-16.png",
    "48": "icon-48.png",
    "128": "icon-128.png"
  },
  "action": {
    "default_icon": {
      "16": "icon-16.png",
      "48": "icon-48.png",
      "128": "icon-128.png"
    },
    "default_title": "Mi Asombrosa Extensión de Chrome"
  },
  "author": "miemail@example.com",
  "default_locale": "es"
}
```

### Conclusión

Desarrollar extensiones para Chrome puede parecer una tarea desafiante al principio, pero con una buena comprensión del manifiesto y siguiendo estos pasos, puedes crear fácilmente tu primera extensión. A medida que avances, explorarás más características y capacidades para hacer que tu extensión sea aún más útil y atractiva. ¡Buena suerte y manos a la obra!

---

*Este README corresponde al segundo paso del workshop. Asegúrense de revisar las siguientes ramas para continuar con los próximos pasos del desarrollo de su extensión de Chrome.*


Sigue las instrucciones proporcionadas para completar el primer paso y asegúrate de revisar las ramas siguientes para los próximos pasos del workshop.

Para aprender más te invito a que leas mi Post [https://www.sebastian-gomez.com/post/chrome-extensions-capitulo-2-manifest-v3](https://www.sebastian-gomez.com/post/chrome-extensions-capitulo-2-manifest-v3)
