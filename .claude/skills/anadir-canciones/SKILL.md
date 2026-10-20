---
name: anadir-canciones
description: Añadir, quitar o corregir canciones del juego Cronología Musical respetando las reglas del catálogo (solo éxitos top 10 en España) y publicarlo en GitHub Pages.
---

# Añadir canciones al catálogo

El catálogo es la constante `SONGS` de `index.html`. Cada canción es `[título, artista, año, género]`.

## Reglas del catálogo

- Solo canciones que fueron **top 10 en España** (Los 40 Principales o Promusicae). Ante la duda, no la añadas.
- El **año** es el de lanzamiento original del sencillo. Evita canciones con año ambiguo (por ejemplo, lanzada un año y éxito en España al siguiente) salvo que el año de lanzamiento esté claro.
- Variedad de **géneros** y de **décadas**; el género es una etiqueta corta en español ("Pop", "Reguetón", "Balada"…).
- No repitas canción y artista. Dos canciones distintas con el mismo título están permitidas.
- Mantén el orden aproximado por año dentro de la lista para que sea fácil de revisar.

## Pasos

1. Comprueba cuántas canciones hay: `node scripts/validate-songs.mjs`.
2. Elige las canciones nuevas siguiendo las reglas y añádelas a `SONGS` en `index.html`.
3. Vuelve a ejecutar `node scripts/validate-songs.mjs` y corrige lo que señale (el hook del proyecto también lo ejecuta tras cada edición de `index.html`).
4. Actualiza el número de canciones, el rango de años y el número de géneros en `README.md`.
5. Haz commit y `git push origin main`. GitHub Pages publica solo; comprueba el resultado en la pestaña Actions ("pages build and deployment"). Si se queda en cola mucho rato o falla porque no hay máquina disponible, relánzalo o sube un cambio pequeño real.
6. Pide a quien lo pidió que recargue https://monsizas.github.io/cronologia-musical/ con Ctrl+F5.

Si no has podido verificar en las listas oficiales que una canción fue top 10, dilo al entregar el cambio.
