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
