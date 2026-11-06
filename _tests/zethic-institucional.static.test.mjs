import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
// Regra de 12/10/2026 (hub), escopo revisto em 28/10/2026: a Zethic é uma empresa de tecnologia, automação e IA com quatro frentes.
// Pode Curtir é marca endossada, fora das frentes; Jéssica Gessoli não é frente, aparece só como "Quem fundou a Zethic".
// O corpo das páginas das frentes continua falando só da Zethic. A Quem somos pode citar a fundadora e o Pode Curtir.
const FRENTES = ["seguranca.html", "tecnologia.html", "atendimento.html", "financeiro.html", "privacidade.html"];

// O que pode citar as outras marcas: barra do grupo, menu, rodapé, razão social, controladora na política de privacidade e o e-mail atual.
const semObrigatorios = (html) => html
  .replace(/<!-- grupo:inicio -->[\s\S]*?<!-- grupo:fim -->/, "")
  .replace(/<!-- cabecalho:inicio -->[\s\S]*?<!-- cabecalho:fim -->/, "")
  .replace(/<footer[^>]*>[\s\S]*?<\/footer>/, "")
  .replace(/"legalName": "[^"]*"/g, "")
  .replace(/jessica\.gessoli@zethic\.net/g, "")
  .replace(/<p>A controladora dos dados é[\s\S]*?<\/p>/, "")
  // Ficha v1.5 (03/11/2026): a Zethic pode citar a Pode Curtir só como parceira de mídia em serviços de tecnologia.
  .replace(/<p class="parceria">[\s\S]*?<\/p>/g, "");

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
  const com = ["diagnostico.html", "teste-golpe.html", "seguranca.html", "privacidade.html"];
  const sem = ["index.html", "quem-somos.html", "tecnologia.html", "atendimento.html", "financeiro.html"];
  for (const p of com) assert.match(ler(p), /<script src="\/assets\/js\/medicao\.js" defer><\/script>/, p);
  for (const p of sem) {
    const h = ler(p);
    assert.doesNotMatch(h, /medicao\.js|data-preferencias-cookies/, p);
    assert.match(h, /Esta página não usa cookies\./, p);
  }
  assert.match(ler("privacidade.html"), /Diagnóstico de Cibersegurança e IA, teste de golpe, Segurança e esta política/);
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

// Ficha v1.8 (03/11/2026): a LGPD entra na Zethic só como implantação técnica (consultoria segue com a Jéssica Gessoli).
test("páginas da Zethic não falam de golpes, governança, consultoria nem mídia", () => {
  const corpo = (p) => semObrigatorios(ler(p)).replace(/<script[\s\S]*?<\/script>/g, "").replace(/<head>[\s\S]*?<\/head>/, "");
  for (const p of ["index.html", "seguranca.html", "tecnologia.html", "atendimento.html", "financeiro.html"]) {
    // 06/11/2026 (decisão da Jéssica): a Zethic implanta e opera a plataforma de conscientização e de simulação de golpe.
    // Orientar sobre golpe continua com a Jéssica Gessoli; na Zethic, "golpe" só aparece como simulação.
    const semSimulacao = corpo(p).replace(/[Ss]imulaç(?:ão|ões) de golpe/g, "");
    assert.doesNotMatch(semSimulacao, /golpe|governan[çc]a de IA|consultoria|[Mm]entoria|[Mm]ídia digital|[Ff]oto e vídeo/, p);
    for (const m of corpo(p).matchAll(/LGPD/g)) {
      const trecho = corpo(p).slice(Math.max(0, m.index - 160), m.index + 160);
      assert.match(trecho, /[Ii]mplant/, `${p}: LGPD só como implantação técnica`);
    }
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
  for (const p of ["index.html", "atendimento.html", "llms.txt", "_ferramentas/cabecalhos.py"]) assert.doesNotMatch(ler(p), /[Tt]ráfego pago|crescer#trafego/, p);
  assert.match(ler("podecurtir.html"), /<li id="trafego"><strong>Tráfego pago<\/strong>/);
});

// Ficha v1.5 (03/11/2026): a Pode Curtir aparece na Zethic só como parceira nos serviços de tecnologia,
// num parágrafo próprio que separa a mídia (Pode Curtir) da tecnologia (Zethic), numa proposta só.
test("Pode Curtir só como parceira de mídia nos serviços de tecnologia", () => {
  for (const p of ["atendimento.html"]) {
    const ps = ler(p).match(/<p class="parceria">[\s\S]*?<\/p>/g) || [];
    assert.ok(ps.length >= 1, p);
    for (const t of ps) {
      assert.match(t, /mídia fica[m]? com a Pode Curtir|mídia e ficam com a Pode Curtir/, p);
      assert.match(t, /tecnologia, com a Zethic/, p);
      assert.match(t, /Uma proposta só, com linhas separadas\./, p);
    }
  }
});

// Ficha v1.8 (03/11/2026): Conectar deixa claro que a Zethic não vende energia nem acesso à internet.
// Desde 06/11/2026 Conectar faz parte do pilar Tecnologia: TI e TO para indústria e agro e "No futuro".
test("Tecnologia: energia com parceiros, sem venda de energia nem de internet", () => {
  const h = ler("tecnologia.html");
  assert.match(h, /A Zethic não vende energia: integra e opera a tecnologia, com parceiros\./);
  assert.match(h, /A Zethic não vende acesso à internet\./);
  assert.doesNotMatch(h, /[Ss]tarlink|R\$ ?\d/);
  for (const id of ["industria-agro", "futuro", "energia", "cidades", "parceiros"]) assert.match(h, new RegExp(`id="${id}"`), id);
});

// Decisão da Jéssica em 06/11/2026: a Zethic fica só com tecnologia. Capacitação em IA e treinamento técnico são da
// Jéssica Gessoli. A frente Capacitar sai; a plataforma para curso e produto digital vai para Crescer, e /aconselhar
// só leva os links antigos para lá.
test("Zethic só tecnologia: sem frente Capacitar, sem treinamento e sem capacitação em IA", () => {
  for (const p of ["index.html", "quem-somos.html", "seguranca.html", "tecnologia.html", "atendimento.html", "financeiro.html", "privacidade.html", "llms.txt", "sitemap.xml", "_ferramentas/cabecalhos.py"]) {
    const h = ler(p);
    assert.doesNotMatch(h, /Treinamento técnico|Capacitação em IA|>Capacitar<|"Capacitar"|zethic\.net\/aconselhar|href="\/aconselhar/, p);
  }
  assert.match(ler("atendimento.html"), /<article class="svc" id="produto-digital">/);
  const r = ler("aconselhar.html");
  assert.match(r, /<meta http-equiv="refresh" content="0; url=\/atendimento#produto-digital">/);
  assert.match(r, /<meta name="robots" content="noindex, follow">/);
});

// Decisão da Jéssica em 06/11/2026: o site passa das frentes (Organizar, Proteger, Crescer, Conectar) para os 4 pilares
// (Segurança, Tecnologia, Atendimento, Financeiro). Os endereços antigos só redirecionam. As 14 linhas de serviço da
// lista dela ficam na Zethic; a Blindagem de contas é da Jéssica Gessoli (03/11/2026) e sai do site da Zethic.
test("4 pilares: endereços antigos redirecionam e as 14 linhas da Zethic estão no site", () => {
  for (const [antiga, nova] of [["proteger", "/seguranca"], ["organizar", "/tecnologia"], ["crescer", "/atendimento"], ["conectar", "/tecnologia#futuro"]]) {
    const r = ler(`${antiga}.html`);
    assert.match(r, new RegExp(`<meta http-equiv="refresh" content="0; url=${nova}">`), antiga);
    assert.match(r, /<meta name="robots" content="noindex, follow">/, antiga);
  }
  const linhas = {
    "seguranca.html": ["soc", "seguranca-gerenciada", "it-ot", "conscientizacao", "lgpd"],
    "tecnologia.html": ["automacao", "infraestrutura", "nuvem", "industria-agro", "futuro"],
    "atendimento.html": ["site", "whatsapp", "dados"],
    "financeiro.html": ["auditoria", "gestao-financeira", "reforma-tributaria"],
  };
  for (const [p, ids] of Object.entries(linhas)) for (const id of ids) assert.match(ler(p), new RegExp(`id="${id}"`), `${p}#${id}`);
  assert.match(ler("seguranca.html"), /[Ss]imulaç(?:ão|ões) de golpe/);
  assert.match(ler("atendimento.html"), /CRM leve/);
  for (const p of ["index.html", "quem-somos.html", "seguranca.html", "tecnologia.html", "atendimento.html", "financeiro.html", "llms.txt", "_ferramentas/cabecalhos.py"]) {
    assert.doesNotMatch(ler(p).replace(/^#.*$/gm, ""), /[Bb]lindagem/, p);
  }
  const sitemap = ler("sitemap.xml");
  for (const s of ["seguranca", "tecnologia", "atendimento", "financeiro"]) assert.match(sitemap, new RegExp(`zethic\\.net/${s}<`), s);
  assert.doesNotMatch(sitemap, /zethic\.net\/(proteger|organizar|crescer|conectar)</);
});
