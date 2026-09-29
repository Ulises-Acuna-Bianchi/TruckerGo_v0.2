# TruckerGO frontend

## Publicar en GitHub Pages

El workflow `../.github/workflows/deploy-pages.yml` instala las dependencias con
`npm ci`, ejecuta `npm run build` desde `frontend` y publica `frontend/dist`.
Se ejecuta al subir cambios a `main` y también puede iniciarse desde la pestaña
**Actions**, con **Run workflow**.

### Primera publicación

1. En el repositorio de GitHub, entrá a **Settings → Pages**.
2. En **Build and deployment → Source**, elegí **GitHub Actions**.
3. Hacé commit de los archivos de configuración y subilos a `main`.
4. Abrí **Actions → Publicar TruckerGO en GitHub Pages** y esperá que los trabajos
   `build` y `deploy` terminen correctamente. El despliegue muestra la URL final.

Para el repositorio actual, la URL esperada es
`https://ulises-acuna-bianchi.github.io/TruckerGo_v0.2/`.
GitHub mantiene el sitio disponible aunque la computadora de desarrollo esté apagada.

### Rutas, archivos y límites

- `PAGES_BASE_PATH` se obtiene de GitHub Pages durante la compilación. Vite genera
  las URLs de los archivos y `BrowserRouter` usa esa misma base para los enlaces.
  En desarrollo local la base sigue siendo `/`.
- El workflow copia `index.html` a `404.html`. Así GitHub Pages devuelve la
  aplicación al abrir o recargar rutas como `/TruckerGo_v0.2/contacto` o
  `/TruckerGo_v0.2/cargas/zarate-rosario`. React muestra la página correspondiente.
  La respuesta HTTP inicial de esas rutas sigue siendo 404: funciona para navegar
  la demo, pero no equivale a una reescritura con estado 200 para buscadores.
- Se publican también las imágenes, los videos comprimidos y sus posters.
- Las cargas creadas y sus fotos permanecen únicamente en memoria y se borran al
  recargar. Pages no agrega un servidor ni una base de datos. El formulario de
  Contacto sigue siendo una demo y no envía mensajes reales.
- Este despliegue no necesita guardar contraseñas ni claves personales. GitHub
  entrega al workflow una autorización temporal con los permisos indicados en el YAML.
  No se configura ninguna clave de Google Maps.

### Compilar con la base de Pages en tu computadora

Desde `frontend`, podés ejecutar:

```bash
PAGES_BASE_PATH=/TruckerGo_v0.2/ npm run build
npm run preview
```

Abrí `http://localhost:4173/TruckerGo_v0.2/`. El workflow crea el `404.html`
durante la publicación; Vite preview ya tiene su propia resolución de rutas.

[Guía oficial de Vite](https://vite.dev/guide/static-deploy.html#github-pages) ·
[Workflows de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## Mapa de Google en Recorrido

La pantalla `/cargas/:id/recorrido` usa **Maps Embed API** para mostrar un punto o una ruta. Sin clave, conserva el gráfico conceptual.

1. En un proyecto de Google Cloud dedicado a TruckerGO, habilitá únicamente **Maps Embed API** y la facturación requerida por Google.
2. Creá una clave de API exclusiva para Embed. Restringila a **Maps Embed API** y a los sitios autorizados: el origen local de desarrollo (por ejemplo, `http://localhost:5173/*`) y el dominio HTTPS de producción. Usá claves separadas para desarrollo y producción si ambos entornos tienen distinto acceso.
3. En desarrollo, copiá `.env.example` a `.env.local` y completá `VITE_GOOGLE_MAPS_EMBED_KEY`. El archivo `.env.local` está ignorado por Git.
4. En el hosting, configurá `VITE_GOOGLE_MAPS_EMBED_KEY` como variable del proceso de **build** y volvé a compilar al cambiarla. Agregá el dominio publicado a las restricciones de la clave.

La clave aparece en la URL del `iframe` y es visible para quien abra la página. La protección depende de las restricciones configuradas en Google Cloud; no uses una clave sin restricciones ni una credencial privada. La pantalla no solicita GPS. Para el tramo hasta el retiro, el transportista escribe su punto de partida; el dato queda sólo en el estado de la página. Las cargas y sus fotos continúan únicamente en la memoria compartida de React.

[Configuración de Maps Embed](https://developers.google.com/maps/documentation/embed/quickstart) · [Restricciones recomendadas](https://developers.google.com/maps/api-security-best-practices#websites-with-the-maps-embed-api)

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
