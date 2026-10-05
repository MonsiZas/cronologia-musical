# Cronología Musical

Juego web: ordena canciones famosas según su año de lanzamiento en una línea del tiempo. Un solo fallo y se acaba la partida.

- Unas 130 canciones de 1954 a 2024 (lista en `index.html`, constante `SONGS`).
- Cada canción suena con un fragmento de 30 segundos sacado de Deezer (o de iTunes si Deezer no lo tiene). Si no hay fragmento, aparece un enlace a YouTube.
- Si dos canciones son del mismo año, cualquier orden entre ellas es correcto.
- El récord se guarda en el navegador.

## Publicar

Es una web estática de un solo archivo. En GitHub: Settings → Pages → "Deploy from a branch", rama `main`, carpeta `/ (root)`.
