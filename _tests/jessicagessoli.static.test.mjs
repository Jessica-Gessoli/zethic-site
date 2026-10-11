import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../jessicagessoli.html", import.meta.url), "utf8");
const secao = html.match(/<section id="recomendacoes"[\s\S]*?<\/section>/)?.[0] ?? "";

test("página pessoal tem a seção de recomendações no menu", () => {
  assert.ok(secao, "seção #recomendacoes ausente");
  assert.match(html, /<a href="#recomendacoes">Recomendações<\/a>/);
});

test("seção leva às recomendações no LinkedIn", () => {
  assert.match(secao, /href="https:\/\/www\.linkedin\.com\/in\/jessicagessoli\/details\/recommendations\/" rel="noopener"/);
});

test("recomendação com nome só entra com link para o perfil de quem recomendou", () => {
  // Opção G: nomes entram apenas após autorização registrada; cada um precisa apontar ao próprio perfil.
  for (const r of secao.match(/<figure class="rec">[\s\S]*?<\/figure>/g) ?? []) {
    const cite = r.match(/<blockquote cite="([^"]+)"/)?.[1];
    const link = r.match(/<figcaption><a href="([^"]+)"/)?.[1];
    assert.match(cite ?? "", /^https:\/\/www\.linkedin\.com\/in\/[^/]+\/$/);
    assert.equal(link, cite);
  }
});
