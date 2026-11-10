// 07/11/2026 (aprovado pela Jéssica): máquina de vendas para a Black Friday.
// Página só do Checkup, compra rápida na loja e contato opcional no resultado do Teste de golpe.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const checkup = ler("_fontes/jessicagessoli/checkup/index.html");
const ckJs = ler("assets/js/jessicagessoli-checkup.js");
const loja = ler("assets/js/jessicagessoli-loja.js");
const lojaHtml = ler("_fontes/jessicagessoli/loja/index.html");
const teste = ler("_fontes/jessicagessoli/teste-golpe/index.html");
const priv = ler("_fontes/jessicagessoli/privacidade/index.html");

test("página do Checkup: um botão principal, preço visível e sem script embutido", () => {
  assert.equal((checkup.match(/class="btn-jg/g) || []).length, 1);
  assert.match(checkup, /R\$ 297/);
  assert.ok(!/<script>/.test(checkup), "script embutido exige hash na CSP");
  assert.match(checkup, /jessicagessoli-checkup\.js/);
  // 10/11/2026 (Jéssica): o endereço oficial no Google é o subdomínio da marca; a cópia em zethic.net aponta para ele.
  assert.match(checkup, /<link rel="canonical" href="https:\/\/jessicagessoli\.zethic\.net\/checkup\/">/);
  assert.match(ler("_marcas/jessicagessoli-site/sitemap.xml"), /jessicagessoli\.zethic\.net\/checkup\//);
});

test("página do Checkup segue as datas de venda da configuração", () => {
  assert.match(ckJs, /CHECKUP_VENDAS_DE/);
  assert.match(ckJs, /CHECKUP_VENDAS_ATE/);
  assert.match(ckJs, /\?comprar=checkup/);
});

test("loja: compra rápida só para Checkup e aula, e só quando vendáveis", () => {
  assert.equal((loja.match(/rapido: true/g) || []).length, 2);
  assert.match(loja, /x\.rapido && vendivel\(x\)/);
  assert.match(loja, /get\("comprar"\)/);
  assert.match(lojaHtml, /id="whats-rotulo"/);
});

test("Teste de golpe: resultado sem pedir dado; contato opcional com aceite e política", () => {
  assert.match(teste, /Para ver o resultado, nenhum dado pessoal é pedido/);
  assert.match(teste, /if \(!ok\.checked\) falta\.push\("aceite"\)/);
  // 10/11/2026: link relativo, para funcionar em zethic.net/jessicagessoli e no site próprio da marca.
  assert.match(teste, /href: "\.\.\/privacidade\/"/);
  assert.match(teste, /tipo: "lead_teste_golpe"/);
  assert.match(teste, /connect-src https:\/\/jessicagessoli\.app\.n8n\.cloud/);
  assert.match(priv, /Resultado do Teste de golpe por escrito/);
});

test("medição do contato não leva nome nem contato", () => {
  const ev = teste.match(/zethicEvento\("teste_golpe_contato", ([^)]*)\)/);
  assert.ok(ev);
  assert.ok(!/\bn\b|\bc\b|nome|contato:/.test(ev[1].replace(/canal/g, "")), ev[1]);
});
