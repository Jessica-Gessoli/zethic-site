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

test("quem somos cita só a fundadora, sem o Pode Curtir e sem os serviços pessoais dela", () => {
  const resto = semObrigatorios(ler("quem-somos.html"));
  assert.match(resto, /fundada e é dirigida por Jéssica Gessoli, fundadora e diretora executiva/);
  assert.doesNotMatch(resto, /href="\/jessicagessoli/); // 28/10/2026: só a frase institucional, sem link
  assert.doesNotMatch(resto, /pode ?curtir|podecurtir/i); // 28/10/2026: Zethic e Pode Curtir separadas
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
    assert.doesNotMatch(h, /<!-- grupo:inicio -->|grupo\.css/, p);
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

// 28/10/2026 (decisão da Jéssica): experiência como tempo de área ("Há 18 anos"), não ano de início,
// e o mercado é o Brasil inteiro (decisão de 25/10/2026), sem Campinas como local de atendimento.
test("páginas da Jéssica: tempo de área e Brasil como mercado", () => {
  for (const p of ["jessicagessoli.html", "en/jessicagessoli.html"]) {
    assert.doesNotMatch(ler(p), /Desde 2008|Since 2008/, p);
    assert.doesNotMatch(ler(p), /<figcaption>Campinas/, p);
  }
  assert.match(ler("jessicagessoli.html"), /Há 18 anos em bancos/);
  for (const p of ["jessicagessoli.html", "diagnostico.html", "teste-golpe.html", "copia-e-cola.html", "teste-ia.html", "conte-seu-golpe.html"]) {
    const rodape = ler(p).match(/<footer[^>]*>[\s\S]*?<\/footer>/)[0];
    assert.doesNotMatch(rodape, /Campinas/, p);
  }
  assert.doesNotMatch(ler("diagnostico.html"), /Atende fora de Campinas/);
});

// 28/10/2026 (decisão da Jéssica): currículos e kit de palestrante sem o título de fundadora e sem a Zethic como cargo.
test("currículos e kit de palestrante sem a Zethic como cargo", () => {
  for (const p of ["_docs/curriculo.html", "_docs/resume.html", "_docs/kit-palestrante.html"]) {
    const h = ler(p).replace(/zethic\.net/g, "");
    assert.doesNotMatch(h, /Zethic|Fundadora|Founder/, p);
  }
});

// 28/10/2026 (fronteiras): o Caderno Copia e Cola é da Jéssica Gessoli e não oferece serviços da Zethic.
test("Caderno Copia e Cola sem serviços da Zethic", () => {
  for (const f of ["caderno-copia-e-cola.pdf", "caderno-prompt-joia.pdf"]) {
    const pdf = readFileSync(new URL(`../assets/docs/${f}`, import.meta.url)).toString("latin1")
      .replace(/\\([0-7]{3})/g, (_, o) => String.fromCharCode(parseInt(o, 8))); // links gravados com escapes octais
    assert.doesNotMatch(pdf, /diagnostico\.html/, f);
    assert.match(pdf, /zethic\.net\/diagnostico\)/, f);
  }
});

// 28/10/2026 (decisão da Jéssica): tráfego pago passa da Zethic (Crescer) para a Pode Curtir.
test("tráfego pago fica na Pode Curtir, fora da Zethic", () => {
  for (const p of ["index.html", "crescer.html", "llms.txt", "_ferramentas/cabecalhos.py"]) assert.doesNotMatch(ler(p), /[Tt]ráfego pago|crescer#trafego/, p);
  assert.match(ler("podecurtir.html"), /<li id="trafego"><strong>Tráfego pago<\/strong>/);
});
