```markdown
# Desarrollando una Extensión de Google Chrome con Manifest V3, Google Apps Script y (Por supuesto IA) Gemini Flash

Bienvenidos a este workshop donde aprenderemos a desarrollar una extensión de Google Chrome utilizando Manifest V3, Google Apps Script y Gemini Flash. Cada rama de este repositorio corresponde a un paso específico del taller y contiene su propio README con instrucciones detalladas.

## Primer Paso: Configuración Inicial

En este primer paso, configuraremos nuestro entorno de desarrollo y crearemos la estructura básica de nuestra extensión para Chrome usando React.js.

### Requisitos Previos

- **Node.js y npm:** Asegúrense de tener Node.js y npm instalados en su máquina. Pueden descargarlos desde [nodejs.org](https://nodejs.org).

### Pasos a Seguir

1. **Crear un Nuevo Proyecto con Create React App:**

   ```bash
   npx create-react-app my-chrome-extension
   cd my-chrome-extension
   ```

2. **Modificar el `package.json`:**

   Abran el archivo `package.json` y añadan las configuraciones específicas para extensiones de Chrome.

3. **Crear los Archivos del Manifiesto:**

   En la raíz del proyecto, creen un archivo `manifest.json` con la siguiente estructura básica:

   ```json
   {
     "manifest_version": 3,
     "name": "Mi Extensión de Chrome",
     "version": "1.0",
     "action": {
       "default_popup": "index.html",
       "default_icon": {
         "16": "icon-16.png",
         "48": "icon-48.png",
         "128": "icon-128.png"
       }
     },
     "permissions": [
       "activeTab"
     ]
   }
   ```

4. **Añadir Iconos:**

   Colocar los iconos requeridos en la carpeta `public`.

5. **Añadir Iconos:**

   Modifica el archivo index.css para darle el ancho y alto correcto al body para visualizar la aplicación correctamente:

    ```css
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 400px;
        height: 400px;
    }
    ```

6. **Construir y Cargar la Extensión:**

   - **Compilar el proyecto:**

     ```bash
     npm run build
     ```

   - **Cargar la extensión en Chrome:**
     1. Ir a `chrome://extensions/`
     2. Activar el "Modo de Desarrollador"
     3. Hacer clic en "Cargar extensión descomprimida"
     4. Seleccionar la carpeta `build` de su proyecto

### Conclusión

Al completar estos pasos, habrán configurado el entorno de desarrollo y creado la estructura básica de su extensión de Chrome. ¡Estén atentos para el siguiente paso donde comenzaremos a agregar funcionalidad a nuestra extensión!

---

*Este README corresponde al primer paso del workshop. Asegúrense de revisar las siguientes ramas para continuar con los próximos pasos del desarrollo de su extensión de Chrome.*
```

Sigue las instrucciones proporcionadas para completar el primer paso y asegúrate de revisar las ramas siguientes para los próximos pasos del workshop.

Para aprender más te invito a que leas mi Post [https://www.sebastian-gomez.com/post/chrome-extensions-capitulo-1-introduccion](https://www.sebastian-gomez.com/post/chrome-extensions-capitulo-1-introduccion)