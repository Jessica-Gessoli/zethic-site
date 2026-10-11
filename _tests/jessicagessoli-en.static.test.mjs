import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pt = readFileSync(new URL("../jessicagessoli.html", import.meta.url), "utf8");
const en = readFileSync(new URL("../en/jessicagessoli.html", import.meta.url), "utf8");
const sitemap = readFileSync(new URL("../sitemap.xml", import.meta.url), "utf8");

const alternates = [
  '<link rel="alternate" hreflang="pt-BR" href="https://zethic.net/jessicagessoli">',
  '<link rel="alternate" hreflang="en" href="https://zethic.net/en/jessicagessoli">',
  '<link rel="alternate" hreflang="x-default" href="https://zethic.net/jessicagessoli">',
];

test("as duas versões declaram hreflang recíproco", () => {
  for (const a of alternates) {
    assert.ok(pt.includes(a), `PT sem ${a}`);
    assert.ok(en.includes(a), `EN sem ${a}`);
  }
});

test("versão em inglês tem idioma, canônico e troca de idioma", () => {
  assert.match(en, /<html lang="en">/);
  assert.match(en, /<link rel="canonical" href="https:\/\/zethic\.net\/en\/jessicagessoli">/);
  assert.match(en, /<a href="\/jessicagessoli" lang="pt-BR" hreflang="pt-BR">Português<\/a>/);
  assert.match(pt, /<a href="\/en\/jessicagessoli" lang="en" hreflang="en">English<\/a>/);
});

test("versão em inglês não mistura português no texto visível", () => {
  const visivel = en.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ")
    .replace(/Fit Por Favor|Rumo Logística|Santander Brasil|Unimed Campinas|São Paulo|Português|Jéssica/g, "");
  for (const palavra of [" de ", " para ", " com ", " risco", " decisão", " diretoria", "Agendar", "Conversar"]) {
    assert.ok(!visivel.includes(palavra), `trecho em português: "${palavra.trim()}"`);
  }
});

test("agenda de 30 minutos aparece nas duas versões", () => {
  assert.match(pt, /<a class="btn" href="\/agendar">Agendar 30 minutos<\/a>/);
  assert.match(en, /<a class="btn" href="\/agendar">Book a 30-minute call<\/a>/);
});

test("nível de cargo: sem promessa de diretoria ou conselho como alvo", () => {
  for (const html of [pt, en]) {
    assert.doesNotMatch(html, /Posições executivas|Executiva de risco|Conselheira|board member/);
  }
});

test("sitemap lista a versão em inglês", () => {
  assert.match(sitemap, /<loc>https:\/\/zethic\.net\/en\/jessicagessoli<\/loc>/);
});
