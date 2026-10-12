import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const PAGINAS = ["index.html", "diagnostico.html", "proteger.html", "organizar.html", "crescer.html", "aconselhar.html", "teste-golpe.html", "privacidade.html"];

// O que precisa ficar por lei ou por decisão: razão social no rodapé, controladora na política de privacidade e o e-mail atual.
const semObrigatorios = (html) => html
  .replace(/<footer>[\s\S]*?<\/footer>/, "")
  .replace(/"legalName": "[^"]*"/g, "")
  .replace(/jessica\.gessoli@zethic\.net/g, "")
  .replace(/<p>A controladora dos dados é[\s\S]*?<\/p>/, "");

test("páginas da Zethic sem conteúdo particular da Jéssica ou do Pode Curtir", () => {
  for (const p of PAGINAS) {
    const resto = semObrigatorios(ler(p));
    assert.doesNotMatch(resto, /j[ée]ssica|jessicagessoli|pode ?curtir|podecurtir/i, p);
  }
});

test("home é um hub minimalista: 4 blocos, uma chamada principal, sem botão fixo nem textura", () => {
  const h = ler("index.html");
  const main = h.match(/<main[\s\S]*?<\/main>/)[0];
  assert.equal((main.match(/<section/g) || []).length, 4);
  assert.equal((h.match(/class="btn btn-main"/g) || []).length, 1);
  assert.doesNotMatch(h, /sticky-cta|class="[^"]*\bhex\b/);
  const palavras = main.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  assert.ok(palavras <= 250, `home com ${palavras} palavras`);
  for (const f of ["/proteger", "/organizar", "/crescer", "/aconselhar", "/diagnostico", "/agendar"]) assert.ok(h.includes(`href="${f}`), f);
});

test("perguntas frequentes migraram para o Diagnóstico, com dados estruturados", () => {
  const d = ler("diagnostico.html");
  assert.match(d, /<section id="perguntas">/);
  assert.match(d, /"@type": "FAQPage"/);
  assert.doesNotMatch(ler("index.html"), /FAQPage|id="perguntas"/);
});

test("medição (Google Analytics) só nas páginas com ferramenta e na política de privacidade", () => {
  const com = ["diagnostico.html", "teste-golpe.html", "proteger.html", "privacidade.html"];
  const sem = ["index.html", "organizar.html", "crescer.html", "aconselhar.html"];
  for (const p of com) assert.match(ler(p), /<script src="\/assets\/js\/medicao\.js" defer><\/script>/, p);
  for (const p of sem) {
    const h = ler(p);
    assert.doesNotMatch(h, /medicao\.js|data-preferencias-cookies/, p);
    assert.match(h, /Esta página não usa cookies\./, p);
  }
  assert.match(ler("privacidade.html"), /Diagnóstico 6 Moedas, teste de golpe, Proteger e esta política/);
});

test("contato da home volta a uma coluna no celular", () => {
  assert.match(ler("assets/css/zethic.css"), /@media \(max-width:52rem\)\{\.home \.contact\{grid-template-columns:1fr\}\}/);
});
