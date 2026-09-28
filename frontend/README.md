# TruckerGO frontend

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
