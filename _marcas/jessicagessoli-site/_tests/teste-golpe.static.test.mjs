import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

// 03/11/2026: o teste de golpe é da marca Jéssica Gessoli e mora em jessicagessoli.zethic.net/teste-golpe.
const html = readFileSync(new URL("../teste-golpe.html", import.meta.url), "utf8");

test("endereço canônico e de compartilhamento são da marca", () => {
  assert.match(html, /<link rel="canonical" href="https:\/\/jessicagessoli\.zethic\.net\/teste-golpe">/);
  assert.match(html, /<meta property="og:url" content="https:\/\/jessicagessoli\.zethic\.net\/teste-golpe">/);
});

test("a CSP libera exatamente os scripts embutidos da página", () => {
  const csp = html.match(/script-src([^;]*)/)[1];
  for (const s of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    const h = createHash("sha256").update(s[1]).digest("base64");
    assert.ok(csp.includes(`'sha256-${h}'`), "script embutido sem hash na CSP: o teste não rodaria");
  }
});

test("botões de WhatsApp levam ao /fale da Zethic, inclusive o do resultado", () => {
  assert.doesNotMatch(html, /href: "\/fale/);
  assert.match(html, /href: "https:\/\/zethic\.net\/fale\?utm_source=teste-golpe-resultado/);
  assert.match(html, /href="https:\/\/zethic\.net\/fale\?utm_source=teste-golpe"/);
});

test("teste está no sitemap da marca", () => {
  const sitemap = readFileSync(new URL("../sitemap.xml", import.meta.url), "utf8");
  assert.ok(sitemap.includes("<loc>https://jessicagessoli.zethic.net/teste-golpe</loc>"));
});
