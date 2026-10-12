import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Página institucional aprovada pela Jéssica em 11/10/2026: responde às dez perguntas de uma "Quem somos",
// sem conteúdo particular (opção B; a regra de nomes fica em zethic-institucional.static.test.mjs).
const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const pagina = ler("quem-somos.html");
const main = pagina.match(/<main[\s\S]*?<\/main>/)[0];
const texto = main.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

test("quem-somos: endereço próprio e título", () => {
  assert.match(pagina, /<link rel="canonical" href="https:\/\/zethic\.net\/quem-somos">/);
  assert.match(pagina, /<title>Quem somos \| Zethic<\/title>/);
  assert.match(pagina, /"@type": "AboutPage"/);
});

test("quem-somos: responde às dez perguntas", () => {
  const titulos = ["Quem somos", "Por que existimos", "Para quem", "Como trabalhamos", "O que nos diferencia",
    "Em que acreditamos", "Quem conduz o trabalho", "Por que confiar", "Fale com a Zethic", "Dados da empresa"];
  for (const t of titulos) assert.match(main, new RegExp(`<h[123]>${t}</h[123]>`), t);
});

test("quem-somos: compromissos aprovados aparecem como foram aprovados", () => {
  for (const frase of [
    "Primeiro contato em até 4 horas úteis.",
    "Em até 3 dias úteis após a reunião.",
    "Em até 5 dias úteis após o aceite.",
    "Toda recomendação vem com o dado que a sustenta.",
    "a proposta diz por escrito o que fica com cada um",
    "Não há plantão 24 horas",
  ]) assert.ok(texto.includes(frase), frase);
});

test("quem-somos: dados da empresa no corpo, razão social só no rodapé", () => {
  assert.ok(texto.includes("67.678.226/0001-17"));
  assert.ok(texto.includes("Microempreendedor Individual (MEI)"));
  assert.doesNotMatch(main, /Raz[ãa]o social/i);
});

test("quem-somos: uma chamada principal e nenhum telefone pessoal", () => {
  assert.equal((pagina.match(/class="btn btn-main"/g) || []).length, 1);
  assert.doesNotMatch(pagina, /98331|0769/);
  assert.match(pagina, /\+55 19 98180-0221/);
});

test("rodapé das páginas da Zethic leva à Quem somos", () => {
  for (const p of ["index.html", "quem-somos.html", "diagnostico.html", "proteger.html", "organizar.html",
    "crescer.html", "aconselhar.html", "teste-golpe.html", "privacidade.html"]) {
    const rodape = ler(p).match(/<footer>[\s\S]*?<\/footer>/)[0];
    assert.match(rodape, /<a href="\/quem-somos"[^>]*>Quem somos<\/a>/, p);
  }
});

test("mapa do site e llms.txt listam a Quem somos", () => {
  assert.match(ler("sitemap.xml"), /<loc>https:\/\/zethic\.net\/quem-somos<\/loc>/);
  assert.match(ler("llms.txt"), /\(https:\/\/zethic\.net\/quem-somos\)/);
});
