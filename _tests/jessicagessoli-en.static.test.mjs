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

test("descrição até 160 caracteres e imagem de compartilhamento 1200x630 nas duas versões", () => {
  for (const [html, img] of [[pt, "jessica-gessoli-og.jpg"], [en, "jessica-gessoli-og-en.jpg"]]) {
    const desc = html.match(/<meta name="description" content="([^"]*)">/)[1];
    assert.ok(desc.length <= 160, `descrição com ${desc.length} caracteres`);
    assert.ok(html.includes(`content="https://zethic.net/assets/img/${img}"`));
    assert.match(html, /og:image:width" content="1200"/);
    assert.match(html, /twitter:card" content="summary_large_image"/);
  }
});

test("foto com WebP e arquivos existentes", () => {
  for (const html of [pt, en]) assert.match(html, /<source type="image\/webp" srcset="\/assets\/img\/jessica-gessoli-400\.webp 400w, \/assets\/img\/jessica-gessoli\.webp 800w"/);
  for (const f of ["jessica-gessoli.webp", "jessica-gessoli-400.webp", "jessica-gessoli-400.jpg", "jessica-gessoli-og.jpg", "jessica-gessoli-og-en.jpg"])
    assert.ok(readFileSync(new URL(`../assets/img/${f}`, import.meta.url)).length > 1000, f);
});

test("ProfilePage válido nas duas versões e llms.txt só com a Zethic", () => {
  for (const html of [pt, en]) {
    const j = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(j["@type"], "ProfilePage");
    assert.equal(j.mainEntity["@type"], "Person");
  }
  const llms = readFileSync(new URL("../llms.txt", import.meta.url), "utf8");
  assert.match(llms, /^# Zethic/);
  // Hub de 12/10/2026: o Pode Curtir é a frente Mídia digital e entra no llms.txt; a página profissional continua fora.
  assert.doesNotMatch(llms, /jessicagessoli/i);
  assert.match(llms, /\(https:\/\/zethic\.net\/podecurtir\)/);
  assert.doesNotMatch(llms, /\bPME\b/);
});

test("currículo de 1 página para baixar em cada idioma", () => {
  assert.match(pt, /<a href="\/assets\/docs\/jessica-gessoli-cv\.pdf" type="application\/pdf">Currículo \(PDF, 1 página\)<\/a>/);
  assert.match(en, /<a href="\/assets\/docs\/jessica-gessoli-resume\.pdf" type="application\/pdf">Resume \(PDF, 1 page\)<\/a>/);
  for (const f of ["jessica-gessoli-cv.pdf", "jessica-gessoli-resume.pdf"]) {
    const pdf = readFileSync(new URL(`../assets/docs/${f}`, import.meta.url));
    assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
    assert.equal((pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length, 1, `${f} precisa ter 1 página`);
  }
});
