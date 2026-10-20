#!/usr/bin/env node
// Valida la lista SONGS de index.html y la sintaxis del script del juego.
// Uso: node scripts/validate-songs.mjs [ruta/a/index.html]
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const file = process.argv[2] || join(dirname(fileURLToPath(import.meta.url)), "..", "index.html");
const html = readFileSync(file, "utf8");
const errors = [];

const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
if (!script) errors.push("No se encuentra el <script> del juego.");
else {
  try { new vm.Script(script); } catch (e) { errors.push("Error de sintaxis en el script: " + e.message); }
}

const block = script?.match(/const SONGS = (\[[\s\S]*?\])\.map\(/)?.[1];
let songs = [];
if (!block) errors.push("No se encuentra la lista SONGS.");
else {
  try { songs = vm.runInNewContext(block); } catch (e) { errors.push("La lista SONGS no se puede leer: " + e.message); }
}

const maxYear = new Date().getFullYear();
const seen = new Map();
const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
songs.forEach((s, i) => {
  const where = `#${i + 1} ${JSON.stringify(s)}`;
  if (!Array.isArray(s) || s.length !== 4) { errors.push(`${where}: debe ser [título, artista, año, género].`); return; }
  const [title, artist, year, genre] = s;
  if (typeof title !== "string" || !title.trim()) errors.push(`${where}: falta el título.`);
  if (typeof artist !== "string" || !artist.trim()) errors.push(`${where}: falta el artista.`);
  if (!Number.isInteger(year) || year < 1950 || year > maxYear) errors.push(`${where}: año no válido.`);
  if (typeof genre !== "string" || !genre.trim()) errors.push(`${where}: falta el género.`);
  const key = norm(title) + "|" + norm(artist);
  if (seen.has(key)) errors.push(`${where}: duplicada (ya está en la #${seen.get(key)}).`);
  else seen.set(key, i + 1);
});

if (errors.length) {
  console.error(`validate-songs: ${errors.length} problema(s) en ${file}`);
  errors.forEach(e => console.error(" - " + e));
  process.exit(1);
}
const years = songs.map(s => s[2]);
console.log(`validate-songs: OK, ${songs.length} canciones (${Math.min(...years)}–${Math.max(...years)}), ${new Set(songs.map(s => s[3])).size} géneros.`);
