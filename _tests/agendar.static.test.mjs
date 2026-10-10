// Validação estática de /agendar — sem dependências. Executar: node --test _tests/agendar.static.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const html = readFileSync(new URL("../agendar.html", import.meta.url), "utf8");
const AGENDA = "https://calendar.app.google/s1dxqRWcqwvEiK927";
test("noindex, sem script e CSP restritiva", () => {
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.doesNotMatch(html, /<script/);
  assert.match(html, /default-src 'none'/);
});
test("meta refresh e link apontam para a mesma agenda", () => {
  assert.ok(html.includes(`<meta http-equiv="refresh" content="0; url=${AGENDA}">`));
  assert.ok(html.includes(`<a id="destino" href="${AGENDA}"`));
});
