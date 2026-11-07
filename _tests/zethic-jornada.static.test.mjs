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
const CONTEUDO = ["seguranca", "tecnologia", "atendimento", "financeiro", "consultorio", "contabilidade", "advocacia", "quem-somos"];
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

test("cada página por tipo de cliente liga os pilares que usa, e cada pilar volta para ela", () => {
  const usa = { consultorio: ["seguranca", "tecnologia", "atendimento"], contabilidade: ["seguranca", "tecnologia", "financeiro"], advocacia: ["seguranca", "tecnologia", "atendimento"] };
  for (const [tipo, pilares] of Object.entries(usa)) {
    for (const p of pilares) {
      assert.ok(vejaTambem(tipo).includes(p), `${tipo} -> ${p}`);
      assert.ok(vejaTambem(p).includes(tipo), `${p} -> ${tipo}`);
    }
  }
});

test("todo link para um pilar com âncora cai numa seção que existe", () => {
  for (const p of [...CONTEUDO, "index", "ti-do-consultorio"]) {
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
  for (const p of ["consultorio", "contabilidade", "advocacia"]) {
    for (const [, q] of ler(p + ".html").matchAll(/href="\/loja\?itens=([^"#]+)"/g)) {
      for (const par of q.split(",")) assert.ok(ids.includes(par.split(":")[0]), `${p}: item ${par} não existe na loja`);
    }
  }
  assert.match(js, /\[\?&\]itens=/);
  assert.match(ler("assets/js/zethic-comprar.js"), /consultorio: \{ suporte: "suporte_padrao", pessoas: 3, site: false \}/);
  for (const p of ["consultorio.html", "ti-do-consultorio.html"]) assert.match(ler(p), /href="\/comprar\?pacote=consultorio"/, p);
  assert.ok(ctx);
});

test("home: Para quem com os 3 tipos de cliente e sem as listas repetidas do menu", () => {
  const h = ler("index.html");
  const pq = h.split('id="para-quem"')[1].split("</section>")[0];
  for (const p of ["/consultorio", "/contabilidade", "/advocacia"]) assert.match(pq, new RegExp(`href="${p}"`));
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

test("campanha TI do consultório: sem menu, fora do Google, uma chamada de compra e a volta ao consultório", () => {
  const h = ler("ti-do-consultorio.html");
  assert.match(h, /<meta name="robots" content="noindex, follow">/);
  assert.doesNotMatch(h, /<!-- cabecalho:inicio -->|class="menu-lista"/);
  assert.equal([...h.matchAll(/class="btn btn-main"/g)].length, 1);
  assert.match(h, /href="\/consultorio"/);
  assert.match(h, /R\$ 282 por mês<\/b> para 3 pessoas/);
});

test("regras das marcas nas páginas novas: sem PME, sem rótulo MEI, sem preço fora da loja e da campanha", () => {
  for (const p of ["consultorio", "contabilidade", "advocacia", "atendimento", "financeiro", "seguranca", "tecnologia", "index"]) {
    const h = ler(p + ".html").replace(/[Ss]imulaç(?:ão|ões) de golpe/g, "");
    assert.doesNotMatch(h, /\bPME\b|pequena e média empresa|\bMEI\b/i, p);
    assert.doesNotMatch(h, /golpe/i, p);
    // A Segurança tem a calculadora do custo de um dia parado, com campos em reais: fica fora desta checagem.
    if (p !== "seguranca") assert.doesNotMatch(h.replace(/<script[\s\S]*?<\/script>/g, ""), /R\$/, p);
  }
});
