import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// 11/11/2026: nos sites das marcas, CSS e JS levam ?v=<hash>, para o navegador baixar o estilo novo junto com a página.
test("sites das marcas: CSS e JS com versão no endereço", () => {
  for (const f of ["jessicagessoli-site/index.html", "jessicagessoli-site/en/index.html", "podecurtir-site/index.html"]) {
    const h = readFileSync(new URL(`../_marcas/${f}`, import.meta.url), "utf8");
    const refs = [...h.matchAll(/(?:href|src)="(\/assets\/[^"]+\.(?:css|js)[^"]*)"/g)].map(m => m[1]);
    assert.ok(refs.length > 0, f);
    for (const r of refs) assert.match(r, /\?v=[0-9a-f]{10}$/, `${f}: ${r}`);
  }
});
