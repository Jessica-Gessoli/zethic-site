import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../jessicagessoli.html", import.meta.url), "utf8");
const secao = html.match(/<section id="recomendacoes"[\s\S]*?<\/section>/)?.[0] ?? "";

test("página pessoal tem a seção de recomendações no menu", () => {
  assert.ok(secao, "seção #recomendacoes ausente");
  assert.match(html, /<a href="#recomendacoes">Recomendações<\/a>/);
});

test("cada recomendação aponta para o LinkedIn de quem recomendou", () => {
  const recs = secao.match(/<figure class="rec">[\s\S]*?<\/figure>/g) ?? [];
  assert.equal(recs.length, 6, "esperadas 6 recomendações");
  for (const r of recs) {
    const cite = r.match(/<blockquote cite="([^"]+)"/)?.[1];
    const link = r.match(/<figcaption><a href="([^"]+)"/)?.[1];
    assert.match(cite ?? "", /^https:\/\/www\.linkedin\.com\/in\/[^/]+\/$/, "cite precisa ser um perfil do LinkedIn");
    assert.equal(link, cite, "o nome deve levar ao mesmo perfil citado");
    assert.match(r, /rel="noopener"/);
  }
});
