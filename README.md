# Ruta Cordillera

Votación del parche para el Festival Cordillera 2026 — quién ve a quién, en cada bloque de horario, entre los 4 escenarios y los 2 días.

Es una sola página (`index.html`, sin build ni framework) que guarda los votos en **Convex** (base de datos en tiempo real) para que todos los amigos vean los votos de los demás al instante, sin necesitar cuenta de Claude ni de nada.

## Poner esto a andar (una sola vez)

1. **Instalar dependencias:**
   ```
   npm install
   ```

2. **Crear el proyecto de Convex** (pide iniciar sesión en el navegador la primera vez — cuenta gratis, sin tarjeta):
   ```
   npx convex dev
   ```
   Esto crea el proyecto, sube `convex/schema.ts` y `convex/votes.ts`, y te deja corriendo en modo desarrollo (Ctrl+C para salir). También genera un archivo `.env.local` con la URL del deployment (algo como `https://algun-nombre-123.convex.cloud`) — ese archivo no se sube a git.

3. **Copiar esa URL a `index.html`:** busca la línea
   ```js
   var CONVEX_URL = "REEMPLAZAR_CON_TU_CONVEX_URL";
   ```
   y pon ahí la URL real.

4. **Desplegar Convex a producción** (para que quede corriendo sin que tengas que dejar `npx convex dev` abierto):
   ```
   npx convex deploy
   ```
   Esto te da una URL de producción — reemplaza `CONVEX_URL` con esa (no con la de `dev`) antes de publicar el sitio.

5. **Subir `index.html` a GitHub Pages** (o cualquier hosting estático): con GitHub Pages activado en este repo (Settings → Pages → Deploy from branch → `main` / `/ (root)`), el sitio queda en `https://hnpz22.github.io/ruta-cordillera/`.

## Estructura

- `index.html` — toda la app (HTML + CSS + JS), sin dependencias de build.
- `convex/schema.ts` — la tabla `votes` (un documento por amigo+bloque).
- `convex/votes.ts` — las funciones `list` (leer todos los votos), `setVote` (crear/actualizar un voto) y `deleteVote` (quitar un voto).

## Mecánica de la app

Recorrido guiado bloque por bloque (10 bloques sábado + 10 domingo): en cada bloque hay 2 artistas que chocan de horario en escenarios distintos, y cada quien elige uno, o "empate" (quiere ver los dos), o "ninguno" (pasa ese bloque). Al final: mapa del parque y resultados con el ganador de cada bloque (corona) y un plan sugerido sin cruces de horario.
