import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

// 20/10/2026: canal "Conte o seu golpe" (relatos sem identificação, formulário no Google Forms).
const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const h = ler("conte-seu-golpe.html");
const form = (h.match(/<a class="btn" id="formulario" href="([^"]+)"/) || [])[1];

test("página da marca pessoal, sem script inline, sem rastreador e sem formulário no próprio site", () => {
  assert.match(h, /<html lang="pt-BR">/);
  assert.match(h, /class="g-j atual"/);
  assert.match(h, /script-src 'self';/);
  assert.match(h, /form-action 'none'/);
  assert.doesNotMatch(h, /<script>|googletagmanager|medicao\.js|analytics|<form|<input/);
});

test("sem PME, sem emoji, sem preço e sem culpar a vítima", () => {
  assert.doesNotMatch(h, /\bPME\b|pequena e m[ée]dia empresa|R\$/i);
  assert.doesNotMatch(h, /\p{Extended_Pictographic}/u);
  assert.doesNotMatch(h, /ca[ií]u num golpe|ca[ií]ram num golpe|caiu no golpe/i);
});

test("orienta o que fazer antes e diz que não substitui o boletim de ocorrência", () => {
  assert.match(h, /não substitui o boletim de ocorrência/);
  assert.match(h, /Conteste o Pix no aplicativo do banco/);
});

test("promete o que a política de privacidade cumpre", () => {
  const pol = ler("privacidade.html");
  assert.match(pol, /Versão 1\.11/);
  assert.match(pol, /Conte o seu golpe/);
  assert.match(pol, /Google Forms/);
  assert.match(pol, /até 12 meses/);
  assert.match(pol, /palavra-código/);
  assert.doesNotMatch(pol, /Este site não tem formulário/);
  assert.match(h, /até 12 meses/);
  assert.match(h, /palavra-código/);
  assert.match(h, /href="\/privacidade"/);
});

test("Instagram ao lado do LinkedIn e página no mapa do site", () => {
  const li = (h.match(/linkedin\.com\/in\/jessicagessoli/g) || []).length;
  const ig = (h.match(/instagram\.com\/jessicagessoli\//g) || []).length;
  assert.ok(ig >= li);
  assert.match(ler("sitemap.xml"), /<loc>https:\/\/zethic\.net\/conte-seu-golpe<\/loc>/);
  for (const [, l] of h.matchAll(/href="\/([a-z-]+)(?:#[a-z-]+)?"/g)) assert.ok(existsSync(new URL(`../${l}.html`, import.meta.url)), `/${l}`);
});

test("link do formulário aponta para o Google Forms", { skip: form && form.includes("PENDENTE") ? "o link do Google Forms ainda não foi colado (não fazer merge antes)" : false }, () => {
  assert.match(form, /^https:\/\/(forms\.gle\/[A-Za-z0-9]+|docs\.google\.com\/forms\/d\/(e\/)?[A-Za-z0-9_-]+\/viewform)$/);
});
