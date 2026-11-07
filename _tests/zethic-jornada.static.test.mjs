import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";

// 06/11/2026, 23h22 (aprovado pela Jéssica): as páginas da Zethic se ligam nos dois sentidos, com trilha no topo
// e "Próximo passo" no fim. Fonte única: _ferramentas/jornada.py. Jornada desenhada no documento
// "Zethic · Benchmark das páginas do site: otimizar ou juntar numa página só?".
const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const existe = (p) => existsSync(new URL("../" + p, import.meta.url));
const arquivo = (url) => { const c = url.split(/[?#]/)[0].replace(/^\//, ""); return c === "" ? "index.html" : c.endsWith(".html") ? c : c + ".html"; };
const CONTEUDO = ["seguranca", "tecnologia", "atendimento", "financeiro", "para-o-seu-negocio", "quem-somos"];
// 07/11/2026 (Jéssica): o site não se organiza por nicho; os nichos ficam só nas campanhas, fora do menu e do Google.
const CAMPANHAS = ["ti-do-consultorio", "ti-da-contabilidade", "ti-da-advocacia", "ti-da-engenharia", "ti-do-rh", "ti-da-agencia", "ti-do-seu-negocio"];
const ANTIGAS = { consultorio: "ti-do-consultorio", contabilidade: "ti-da-contabilidade", advocacia: "ti-da-advocacia" };
const bloco = (h, nome) => (h.match(new RegExp(`<!-- ${nome}:inicio -->([\\s\\S]*?)<!-- ${nome}:fim -->`)) || [])[1] || "";
const vejaTambem = (p) => [...bloco(ler(p + ".html"), "jornada").split('class="proximo-lista"')[1].matchAll(/href="\/([a-z-]+)"/g)].map((m) => m[1]);

test("toda página interna tem trilha de volta, e a trilha leva a páginas que existem", () => {
  for (const p of [...CONTEUDO, "comprar", "loja", "loja-obrigado", "privacidade"]) {
    const t = bloco(ler(p + ".html"), "trilha");
    assert.match(t, /<nav class="trilha" aria-label="Você está em">/, p);
    assert.match(t, /<li><a href="\/">Início<\/a><\/li>/, p);
    assert.match(t, /<li aria-current="page">/, p);
    for (const [, u] of t.matchAll(/href="([^"]+)"/g)) assert.ok(existe(arquivo(u)), `${p}: ${u}`);
  }
});

test("Veja também vale nos dois sentidos: se A indica B, B indica A", () => {
  for (const a of CONTEUDO) {
    const lista = vejaTambem(a);
    assert.ok(lista.length >= 1, a);
    for (const b of lista) assert.ok(vejaTambem(b).includes(a), `${a} indica ${b}, mas ${b} não volta para ${a}`);
  }
});

test("Para o seu Negócio liga os quatro pilares e cada pilar volta para ela", () => {
  for (const p of ["seguranca", "tecnologia", "atendimento", "financeiro", "quem-somos"]) {
    assert.ok(vejaTambem("para-o-seu-negocio").includes(p), `para-o-seu-negocio -> ${p}`);
    assert.ok(vejaTambem(p).includes("para-o-seu-negocio"), `${p} -> para-o-seu-negocio`);
  }
});

test("site por necessidade: nenhum nicho no menu nem na navegação, e a página cobre qualquer área", () => {
  for (const p of [...CONTEUDO, "index", "comprar", "loja", "loja-obrigado", "privacidade"]) {
    const h = ler(p + ".html");
    assert.doesNotMatch(h, /href="\/(consultorio|contabilidade|advocacia|ti-d[oa]-[a-z-]+)"/, p);
    assert.doesNotMatch(h, /painel-para-quem/, p);
  }
  const n = ler("para-o-seu-negocio.html");
  for (const id of ["sem-ti", "dados-sigilosos", "nao-pode-parar", "equipe-alerta", "whatsapp", "sem-site", "tarefa-repetida", "dinheiro", "operacao-critica", "tamanho"]) assert.match(n, new RegExp(`id="${id}"`), id);
  assert.match(n, /A minha área não está na lista\. Vocês atendem\?/);
  for (const [, a] of ler("_ferramentas/cabecalhos.py").matchAll(/"\/para-o-seu-negocio#([a-z-]+)"/g)) assert.match(n, new RegExp(`id="${a}"`), a);
});

test("todo link para um pilar com âncora cai numa seção que existe", () => {
  for (const p of [...CONTEUDO, "index", ...CAMPANHAS]) {
    const h = ler(p + ".html");
    for (const [, pg, anc] of h.matchAll(/href="\/(seguranca|tecnologia|atendimento|financeiro)#([a-z-]+)"/g)) {
      assert.match(ler(pg + ".html"), new RegExp(`id="${anc}"`), `${p}: /${pg}#${anc}`);
    }
  }
});

test("as chamadas de compra levam a itens que existem na loja", () => {
  const ctx = { window: {}, location: { search: "" }, sessionStorage: { getItem: () => null, setItem() {} }, document: { addEventListener() {}, getElementById: () => null } };
  const js = ler("assets/js/zethic-loja.js");
  const ids = [...js.matchAll(/\{ id: "([a-z-]+)", nome: "[^"]+", tipo:/g)].map((m) => m[1]);
  for (const p of ["para-o-seu-negocio", ...CAMPANHAS]) {
    for (const [, q] of ler(p + ".html").matchAll(/href="\/loja\?itens=([^"#]+)"/g)) {
      for (const par of q.split(",")) assert.ok(ids.includes(par.split(":")[0]), `${p}: item ${par} não existe na loja`);
    }
  }
  assert.match(js, /\[\?&\]itens=/);
  const cj = ler("assets/js/zethic-comprar.js");
  assert.match(cj, /equipe_pequena: \{ suporte: "suporte_padrao", pessoas: 3, site: false \}/);
  assert.match(cj, /consultorio: \{ suporte: "suporte_padrao", pessoas: 3, site: false \}/, "links antigos com pacote=consultorio");
  for (const p of CAMPANHAS) assert.match(ler(p + ".html"), new RegExp(`href="/comprar\\?pacote=equipe_pequena&amp;utm_source=campanha&amp;utm_campaign=${p}"|href="/comprar\\?pacote=equipe_pequena&utm_source=campanha&utm_campaign=${p}"`), p);
  for (const [, pc] of ler("para-o-seu-negocio.html").matchAll(/href="\/comprar\?pacote=([a-z_]+)"/g)) assert.match(cj, new RegExp(`\\b${pc}: \\{`), pc);
  assert.ok(ctx);
});

test("home: Para o seu Negócio por necessidade e sem as listas repetidas do menu", () => {
  const h = ler("index.html");
  const pq = h.split('id="seu-negocio"')[1].split("</section>")[0];
  assert.ok([...pq.matchAll(/href="\/para-o-seu-negocio[#"]/g)].length >= 4);
  assert.doesNotMatch(h, /class="cartao-lista"/);
  assert.doesNotMatch(h, /class="atalhos"/);
  assert.match(h, /href="\/comprar">Comprar um pacote de entrada<\/a>/);
  const main = h.match(/<main[\s\S]*?<\/main>/)[0];
  assert.ok([...main.matchAll(/href=/g)].length <= 25, "a home voltou a ter links demais");
});

test("pilares sem o bloco repetido: cada um com o seu passo a passo e sem o fechamento igual", () => {
  const passos = {};
  for (const p of ["seguranca", "tecnologia", "atendimento", "financeiro"]) {
    const h = ler(p + ".html");
    assert.doesNotMatch(h, /O investimento é combinado depois da primeira conversa\./, p);
    assert.doesNotMatch(h, /<strong>Execução acompanhada<\/strong>/, p);
    passos[p] = h.split("<h2>Como começa</h2>")[1].split("</ol>")[0];
  }
  assert.equal(new Set(Object.values(passos)).size, 4);
});

test("Atendimento e Financeiro com pelo menos 750 palavras no corpo", () => {
  for (const p of ["atendimento", "financeiro"]) {
    const m = ler(p + ".html").match(/<main[\s\S]*?<\/main>/)[0].replace(/<!-- (trilha|jornada):inicio -->[\s\S]*?<!-- \1:fim -->/g, "");
    const n = m.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    assert.ok(n >= 750, `${p}: ${n} palavras`);
  }
});

test("campanhas por nicho: sem menu, fora do Google, uma chamada de compra, preço de entrada e a volta às necessidades", () => {
  for (const c of CAMPANHAS) {
    const h = ler(c + ".html");
    assert.match(h, /<meta name="robots" content="noindex, follow">/, c);
    assert.doesNotMatch(h, /<!-- cabecalho:inicio -->|class="menu-lista"/, c);
    assert.equal([...h.matchAll(/class="btn btn-main"/g)].length, 1, c);
    assert.match(h, /href="\/para-o-seu-negocio"/, c);
    assert.match(h, /R\$ 282 por mês<\/b> para 3 pessoas/, c);
    assert.ok(!ler("sitemap.xml").includes("/" + c + "<"), `${c} no sitemap`);
  }
});

test("endereços antigos por nicho redirecionam para a campanha do nicho, fora do Google e do sitemap", () => {
  for (const [antigo, camp] of Object.entries(ANTIGAS)) {
    const h = ler(antigo + ".html");
    assert.match(h, new RegExp(`<meta http-equiv="refresh" content="0; url=/${camp}">`), antigo);
    assert.match(h, new RegExp(`<link rel="canonical" href="https://zethic.net/${camp}">`), antigo);
    assert.match(h, /noindex/, antigo);
    assert.ok(!ler("sitemap.xml").includes("/" + antigo + "<"), antigo);
  }
});

test("regras das marcas nas páginas novas: sem PME, sem rótulo MEI, sem preço fora da loja e das campanhas", () => {
  for (const p of ["para-o-seu-negocio", "atendimento", "financeiro", "seguranca", "tecnologia", "index"]) {
    const h = ler(p + ".html").replace(/[Ss]imulaç(?:ão|ões) de golpe/g, "");
    assert.doesNotMatch(h, /\bPME\b|pequena e média empresa|\bMEI\b/i, p);
    assert.doesNotMatch(h, /golpe/i, p);
    // A Segurança tem a calculadora do custo de um dia parado, com campos em reais: fica fora desta checagem.
    if (p !== "seguranca") assert.doesNotMatch(h.replace(/<script[\s\S]*?<\/script>/g, ""), /R\$/, p);
  }
});

test("campanhas pela regra das marcas: sem PME, sem rótulo MEI e golpe só em simulações de golpe", () => {
  for (const c of CAMPANHAS) {
    const h = ler(c + ".html").replace(/[Ss]imulaç(?:ão|ões) de golpe/g, "");
    assert.doesNotMatch(h, /\bPME\b|pequena e média empresa|\bMEI\b/i, c);
    assert.doesNotMatch(h, /golpe/i, c);
  }
});
