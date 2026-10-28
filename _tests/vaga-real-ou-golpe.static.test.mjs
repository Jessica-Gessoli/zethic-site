import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
const html = ler("vaga-real-ou-golpe.html");
const fale = ler("fale.html");

test("página do e-book é da marca Jéssica Gessoli, sem script inline", () => {
  assert.match(html, /class="logo marca-jg"/);
  assert.ok(!/<script>/.test(html), "script inline exige hash na CSP");
  assert.match(html, /<link rel="canonical" href="https:\/\/zethic\.net\/vaga-real-ou-golpe">/);
});

test("pedido do guia vai pelo WhatsApp com origem registrada", () => {
  const ctas = [...html.matchAll(/href="\/fale\?utm_source=([a-z-]+)"/g)].map((m) => m[1]);
  assert.ok(ctas.length >= 2);
  assert.ok(ctas.every((o) => o === "jessicagessoli-vaga"));
  assert.match(fale, /"jessicagessoli-vaga": "Olá, Jéssica! [^"]*guia grátis Vaga real ou golpe\."/);
});

test("coautoria e perfis do Instagram aparecem", () => {
  assert.ok(html.includes("Bárbara Priori"));
  assert.ok(html.includes("https://www.instagram.com/barbara.priori.carreira/"));
  assert.ok(html.includes("https://www.instagram.com/jessicagessoli/"));
  assert.ok(!html.includes("[perfil da Bá]"));
});

test("aviso de privacidade do número e link para a política", () => {
  assert.match(html, /O seu número fica só nessa conversa/);
  assert.match(html, /href="\/privacidade"/);
});

test("página no sitemap e nos materiais grátis", () => {
  assert.match(ler("sitemap.xml"), /<loc>https:\/\/zethic\.net\/vaga-real-ou-golpe<\/loc>/);
  assert.match(ler("jessicagessoli.html"), /href="\/vaga-real-ou-golpe"/);
});

test("sem PME e com Há 18 anos", () => {
  assert.ok(!/\bPME\b|pequena e média empresa/i.test(html));
  assert.match(html, /Há 18 anos/);
});
