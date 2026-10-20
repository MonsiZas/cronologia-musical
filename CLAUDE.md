# Cronología Musical

Juego web: el jugador escucha un fragmento de una canción (sin ver título ni artista) y la coloca en una línea del tiempo horizontal según su año de lanzamiento. Un fallo termina la partida.

## Estructura

- `index.html`: todo el juego (HTML, CSS y JS en un solo archivo, sin dependencias ni build).
  - `SONGS`: catálogo, `[título, artista, año, género]`.
  - Audio: fragmentos de 30 s buscados en tiempo real en Deezer (JSONP), con iTunes como respaldo y enlace a YouTube si no hay fragmento. El audio solo suena al pulsar el botón y se para al colocar una canción.
  - Pantallas por dirección (#normal, #reto, #decadas/1980, #generos/pop…): menú, elección de década o género en tarjetas (solo las que tienen `MIN_CARD` = 25 canciones o más) y partida.
  - Modos: partida libre con filtros de década y familia de género (`GENRE_GROUPS`; todo género nuevo debe estar en una familia) y reto diario (`DAILY_SIZE` canciones elegidas con una semilla a partir de la fecha de Madrid; resultado guardado en localStorage).
  - La línea del tiempo se compacta (`compact`, `mini`) para caber en una pantalla.
- `favicon.svg`: icono de vinilo.
- `scripts/validate-songs.mjs`: valida `SONGS` y la sintaxis del script. Se ejecuta en un hook tras cada edición de `index.html`.

## Reglas decididas

- El catálogo solo incluye canciones que fueron top 10 en España. Ver la skill `anadir-canciones`.
- Textos de la interfaz en español.
- Publicación: push a `main`; GitHub Pages la sirve en https://monsizas.github.io/cronologia-musical/.

## Comprobar cambios

- `node scripts/validate-songs.mjs`
- Abrir `index.html` en un navegador; desde un contenedor sin acceso a Deezer el audio cae al enlace de YouTube, así que el audio real solo se prueba en la web publicada.
