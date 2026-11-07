import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// 06/11/2026 (aprovado pela Jéssica): as páginas da Jéssica Gessoli se ligam nos dois sentidos.
// Página principal -> item certo da loja; loja -> serviço na página principal; testes grátis -> loja;
// páginas de compra -> termos, privacidade, desistência e de volta.
const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const principal = ler("jessicagessoli.html");
const js = ler("assets/js/jessicagessoli-loja.js");
const ids = (re, s) => [...s.matchAll(re)].map((m) => m[1]);

test("cada link da página principal para a loja aponta para um item ou proposta que existe", () => {
  const links = ids(/href="\/jessicagessoli\/loja\/(#[^"]*)?"/g, principal);
  assert.ok(links.length >= 15, "poucos links para a loja");
  const itens = ids(/\{ id: "([^"]+)", nome:/g, js);
  for (const h of links.filter(Boolean)) {
    const m = h.match(/^#(item|proposta)-(.+)$/);
    assert.ok(m, "âncora fora do padrão: " + h);
    assert.ok(itens.includes(m[2]), "item inexistente na loja: " + h);
  }
  assert.equal(links.filter((h) => !h).length, 3, "sem âncora, só o menu, a introdução dos serviços e o rodapé");
});

test("a loja volta para o serviço certo na página principal", () => {
  const anchors = ids(/<li id="([^"]+)">/g, principal).concat(["comecar"]);
  const sobre = js.split("var SOBRE = {")[1].split("};")[0];
  for (const [, item, alvo] of sobre.matchAll(/(\w+): "([\w-]+)"/g)) assert.ok(anchors.includes(alvo), item + " -> #" + alvo + " não existe");
  for (const item of ids(/\{ id: "([^"]+)", nome:/g, js).filter((i) => i !== "aula-aviso")) assert.match(sobre, new RegExp("\\b" + item + ": \""), "item sem volta: " + item);
  assert.match(js, /'<article class="item" id="item-' \+ p\.id/);
  assert.match(js, /'<div class="proposta" id="proposta-' \+ a\.id/);
  assert.match(js, /window\.addEventListener\("hashchange"/);
  assert.match(ler("jessicagessoli/loja/index.html"), /<a href="\/jessicagessoli#perfis">para quem é cada serviço<\/a>/);
});

test("Para quem é: os 3 perfis na página principal, com caminho para a loja", () => {
  const bloco = principal.split('id="perfis"')[1].split("</ul>")[0];
  for (const p of ["Comércio que vende pelo Instagram e pelo WhatsApp", "Escritórios de contabilidade", "Exportadoras de café e do agro"]) assert.match(bloco, new RegExp(p));
  assert.match(bloco, /href="\/teste-golpe"/);
  assert.match(bloco, /#item-checkup/);
  assert.match(bloco, /#item-aula/);
  assert.doesNotMatch(bloco, /Marta|Rogério|Paula/, "personas fictícias não aparecem para o cliente");
});

test("testes grátis levam à loja da Jéssica Gessoli", () => {
  assert.match(ler("teste-golpe.html"), /href: "\/jessicagessoli\/loja\/#item-antigolpe_essencial"/);
  assert.match(ler("diagnostico.html"), /href: "\/jessicagessoli\/loja\/#item-diagnostico_essencial"/);
  assert.match(principal, /<a href="\/teste-golpe">Grátis: Teste de golpe, em 3 minutos<\/a>/);
});

test("páginas de serviço fora do Google; termos e loja dentro", () => {
  for (const p of ["jessicagessoli/privacidade/index.html", "jessicagessoli/desistencia/index.html", "jessicagessoli/cancelamento/index.html"]) {
    assert.match(ler(p), /<meta name="robots" content="noindex, follow">/, p);
  }
  const sm = ler("sitemap.xml");
  for (const u of ["privacidade", "desistencia", "cancelamento"]) assert.doesNotMatch(sm, new RegExp("jessicagessoli/" + u + "/"), u);
  for (const u of ["loja", "termos"]) assert.match(sm, new RegExp("<loc>https://zethic\\.net/jessicagessoli/" + u + "/</loc>"), u);
});

test("rodapé da página principal leva às páginas de compra", () => {
  const rodape = principal.split("<footer>")[1];
  for (const h of ["/jessicagessoli/loja/", "/jessicagessoli/termos/", "/jessicagessoli/termos/#desistencia", "/jessicagessoli/desistencia/"]) assert.ok(rodape.includes('href="' + h + '"'), h);
});
