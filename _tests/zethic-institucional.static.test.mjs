import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
// Regra de 11/10/2026 (substitui a opção B): a Zethic reúne três marcas, como um grupo.
// A home apresenta Zethic, Jéssica Gessoli e Pode Curtir; o topo (barra do grupo e menu) e o rodapé ligam as marcas em todas as páginas.
// O corpo das páginas das frentes da Zethic continua falando só da Zethic.
const FRENTES = ["quem-somos.html", "diagnostico.html", "proteger.html", "organizar.html", "crescer.html", "aconselhar.html", "teste-golpe.html", "privacidade.html"];

// O que pode citar as outras marcas: barra do grupo, menu, rodapé, razão social, controladora na política de privacidade e o e-mail atual.
const semObrigatorios = (html) => html
  .replace(/<!-- grupo:inicio -->[\s\S]*?<!-- grupo:fim -->/, "")
  .replace(/<!-- cabecalho:inicio -->[\s\S]*?<!-- cabecalho:fim -->/, "")
  .replace(/<footer[^>]*>[\s\S]*?<\/footer>/, "")
  .replace(/"legalName": "[^"]*"/g, "")
  .replace(/jessica\.gessoli@zethic\.net/g, "")
  .replace(/<p>A controladora dos dados é[\s\S]*?<\/p>/, "");

test("corpo das páginas das frentes fala só da Zethic", () => {
  for (const p of FRENTES) {
    const resto = semObrigatorios(ler(p));
    assert.doesNotMatch(resto, /j[ée]ssica|jessicagessoli|pode ?curtir|podecurtir/i, p);
  }
});

test("perguntas frequentes migraram para o Diagnóstico, com dados estruturados", () => {
  const d = ler("diagnostico.html");
  assert.match(d, /<section id="perguntas">/);
  assert.match(d, /"@type": "FAQPage"/);
  assert.doesNotMatch(ler("index.html"), /FAQPage|id="perguntas"/);
});

test("medição (Google Analytics) só nas páginas com ferramenta e na política de privacidade", () => {
  const com = ["diagnostico.html", "teste-golpe.html", "proteger.html", "privacidade.html"];
  const sem = ["index.html", "quem-somos.html", "organizar.html", "crescer.html", "aconselhar.html"];
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
