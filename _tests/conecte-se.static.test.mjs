import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// 16/11/2026 (Jéssica): /conecte-se/ é o destino fixo do QR Code projetado no fim das palestras.
// O endereço nunca muda; só o conteúdo. Sem GA4 nem formulário: a plateia inclui estudantes menores de idade.
const fonte = readFileSync(new URL("../_fontes/jessicagessoli/conecte-se/index.html", import.meta.url), "utf8");
const gerada = readFileSync(new URL("../_marcas/jessicagessoli-site/conecte-se/index.html", import.meta.url), "utf8");
const sitemap = readFileSync(new URL("../_marcas/jessicagessoli-site/sitemap.xml", import.meta.url), "utf8");

test("endereço permanente do QR Code", () => {
  assert.match(gerada, /<link rel="canonical" href="https:\/\/jessicagessoli\.zethic\.net\/conecte-se\/">/);
  assert.match(sitemap, /<loc>https:\/\/jessicagessoli\.zethic\.net\/conecte-se\/<\/loc>/);
});

test("três canais oficiais com os endereços validados", () => {
  assert.match(gerada, /href="https:\/\/www\.instagram\.com\/jessicagessoli\/"/);
  assert.match(gerada, /href="https:\/\/www\.linkedin\.com\/in\/jessicagessoli"/);
  assert.doesNotMatch(gerada, /linkedin\.com\/in\/jgessoli/);
  assert.match(gerada, /<a class="canal" href="\/">/);
});

test("links externos abrem com noopener noreferrer", () => {
  for (const m of gerada.matchAll(/<a [^>]*href="https?:\/\/[^"]+"[^>]*>/g)) {
    assert.match(m[0], /target="_blank" rel="noopener noreferrer"/, m[0]);
  }
});

test("sem medição, sem formulário e sem telefone", () => {
  for (const html of [fonte, gerada]) {
    assert.doesNotMatch(html, /googletagmanager|gtag|medicao\.js|connect\.facebook/);
    assert.doesNotMatch(html, /<form|<input|<textarea/);
    assert.doesNotMatch(html, /wa\.me|tel:|98180|98331/);
  }
  assert.match(gerada, /script-src 'none'/);
});

test("acessibilidade básica", () => {
  assert.match(gerada, /<html lang="pt-BR">/);
  assert.match(gerada, /class="pular" href="#canais"/);
  assert.equal((gerada.match(/<h1[ >]/g) || []).length, 1);
  for (const m of gerada.matchAll(/<img [^>]*>/g)) assert.match(m[0], /alt="/, m[0]);
});
