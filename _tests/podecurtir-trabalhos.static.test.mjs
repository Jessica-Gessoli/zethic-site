import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");

// 14/10/2026 (pedido da Goreti, aprovado pela Jéssica): os vídeos de demonstração saem até haver vídeos com edição mais elaborada;
// a página fica só com texto. O título "Você curte, a gente registra." foi trocado por um título direto.
test("Pode Curtir: sem vídeos de demonstração e com título direto", () => {
  const h = ler("podecurtir.html");
  assert.doesNotMatch(h, /class="reel"|class="trabalhos"|<video/);
  assert.match(h, /<h1>Foto e vídeo para o seu evento e o seu Negócio\.<\/h1>/);
  assert.doesNotMatch(h + ler("index.html"), /Você curte, a gente registra/);
});

test("Zethic: sem faixa de preço no topo da página inicial", () => {
  assert.doesNotMatch(ler("index.html"), /class="faixa"/);
});

test("Página profissional: a seção se chama Serviços", () => {
  const h = ler("jessicagessoli.html");
  assert.match(h, /<a href="#trabalho">Serviços<\/a>/);
  assert.match(h, /<h2 id="t-trabalho">Serviços<\/h2>/);
  assert.doesNotMatch(h, /Como trabalhar comigo/);
});

// 14/10/2026 (aprovado pela Jéssica): símbolos novos das marcas e endosso da Zethic só em texto.
test("Símbolos: monograma JG e visor da Pode Curtir, com endosso só em texto", () => {
  const jg = ler("assets/img/jessicagessoli-icone.svg");
  assert.match(jg, /fill="#12352B"/);
  assert.doesNotMatch(jg, /<text/, "letras em contorno, não dependem de fonte instalada");
  const pc = ler("assets/img/podecurtir-icone.svg");
  assert.match(pc, /fill="#FFD23F"/);
  assert.match(ler("podecurtir.html"), /Pode Curtir é uma marca da <a href="\/">Zethic<\/a>\./);
  assert.doesNotMatch(ler("podecurtir.html"), /zethic-marca\.svg/);
});
