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

test("publicações citadas com fonte verificável nas duas versões", () => {
  // 21/10/2026: artigo na Culture Digitali n.º 18 e apresentação na SDPS 2013 (anais ISSN 1090-9389, p. 267 a 271).
  const en = readFileSync(new URL("../en/jessicagessoli.html", import.meta.url), "utf8");
  const cd = /href="https:\/\/www\.diculther\.it\/rivista\/disarmar-a-inteligencia-artificial-ciberseguranca-deepfakes-e-dignidade-humana-na-era-das-identidades-digitais-sinteticas\/"/;
  const anais = /href="https:\/\/sdpsnet\.org\/api\/archive\/documents\/sdps-2013\/SDPS_2013_proceedings\.pdf#page=270"/;
  for (const [pagina, id] of [[html, "publicacoes"], [en, "publications"]]) {
    assert.match(pagina, new RegExp(`<a href="#${id}">`));
    const bloco = pagina.match(new RegExp(`<div id="${id}"[\\s\\S]*?</dl>`))?.[0] ?? "";
    assert.match(bloco, cd);
    assert.match(bloco, anais);
    assert.match(bloco, /ISSN 1090-9389/);
    assert.doesNotMatch(bloco, /utm_source=chatgpt/);
  }
});

test("capítulo da LabLivro no prelo, nas duas versões, sem título de livro nem link ainda", () => {
  // 28/10/2026: layout das páginas em aprovação com a editora. Título oficial do livro, ano e link entram na publicação.
  const en = readFileSync(new URL("../en/jessicagessoli.html", import.meta.url), "utf8");
  const casos = [
    [html, "publicacoes", /<dt>Capítulo de livro, no prelo<\/dt>\s*<dd><strong>Do risco técnico à decisão executiva<\/strong>/],
    [en, "publications", /<dt>Book chapter, forthcoming<\/dt>\s*<dd><strong>From technical risk to executive decision<\/strong>/],
  ];
  for (const [pagina, id, item] of casos) {
    const bloco = pagina.match(new RegExp(`<div id="${id}"[\\s\\S]*?</dl>`))?.[0] ?? "";
    assert.match(bloco, item);
    assert.match(bloco, /LabLivro/);
    const capitulo = bloco.match(/<div>\s*<dt>(?:Capítulo de livro|Book chapter)[\s\S]*?<\/div>/)?.[0] ?? "";
    assert.doesNotMatch(capitulo, /<a /, "capítulo no prelo não deve ter link até a publicação");
  }
});

// 21/10/2026 (decisão da Jéssica, mesma regra da Pode Curtir): a categoria aparece no topo, antes do nome.
test("página profissional: categoria clara acima do nome, em português e em inglês", () => {
  const pt = readFileSync(new URL("../jessicagessoli.html", import.meta.url), "utf8");
  const en = readFileSync(new URL("../en/jessicagessoli.html", import.meta.url), "utf8");
  assert.match(pt, /<p class="categoria">Executiva de Cibersegurança e IA<\/p>\s*<h1>Jéssica Gessoli<\/h1>/);
  assert.match(en, /<p class="categoria">Cybersecurity and AI executive<\/p>\s*<h1>Jéssica Gessoli<\/h1>/);
});
