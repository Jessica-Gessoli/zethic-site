import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
// Regra de 12/10/2026 (hub), escopo revisto em 28/10/2026: a Zethic é uma empresa de tecnologia, automação e IA com quatro frentes.
// Pode Curtir é marca endossada, fora das frentes; Jéssica Gessoli não é frente, aparece só como "Quem fundou a Zethic".
// O corpo das páginas das frentes continua falando só da Zethic. A Quem somos pode citar a fundadora e o Pode Curtir.
const FRENTES = ["proteger.html", "organizar.html", "crescer.html", "aconselhar.html", "privacidade.html"];

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

test("quem somos cita a fundadora e o Pode Curtir, mas não os serviços pessoais dela", () => {
  const resto = semObrigatorios(ler("quem-somos.html"));
  assert.match(resto, /fundada e é dirigida por Jéssica Gessoli, fundadora e diretora executiva/);
  assert.match(resto, /Pode Curtir/);
  assert.doesNotMatch(resto, /mentoria|palestra|recoloca/i);
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
  assert.match(ler("privacidade.html"), /Diagnóstico de Cibersegurança e IA, teste de golpe, Proteger e esta política/);
});

test("contato da home volta a uma coluna no celular", () => {
  assert.match(ler("assets/css/zethic.css"), /@media \(max-width:52rem\)\{\.home \.contact\{grid-template-columns:1fr\}\}/);
});

// 28/10/2026 (fronteiras entre as marcas): golpes, diagnóstico, governança e consultoria são da Jéssica Gessoli.
test("Diagnóstico e Teste de golpe são páginas da Jéssica Gessoli", () => {
  for (const p of ["diagnostico.html", "teste-golpe.html"]) {
    const h = ler(p);
    assert.match(h, /<title>[^<]*\| Jéssica Gessoli<\/title>/, p);
    assert.match(h, /<meta property="og:site_name" content="Jéssica Gessoli">/, p);
    assert.match(h, /class="g-j atual"/, p);
    assert.doesNotMatch(semObrigatorios(h).replace(/zethicEvento/g, ""), /Zethic/, p);
    assert.match(h, /calendly\.com\/jessica-gessoli-zethic/, p);
  }
});

test("páginas da Zethic não falam de golpes, governança, consultoria nem mídia", () => {
  const corpo = (p) => semObrigatorios(ler(p)).replace(/<script[\s\S]*?<\/script>/g, "").replace(/<head>[\s\S]*?<\/head>/, "");
  for (const p of ["index.html", "proteger.html", "organizar.html", "crescer.html", "aconselhar.html"]) {
    assert.doesNotMatch(corpo(p), /golpe|LGPD|governan[çc]a de IA|consultoria|[Mm]entoria|[Mm]ídia digital|[Ff]oto e vídeo/, p);
  }
  assert.doesNotMatch(corpo("quem-somos.html"), /golpe|LGPD|consultoria|[Mm]entoria|[Mm]ídia digital/);
});
