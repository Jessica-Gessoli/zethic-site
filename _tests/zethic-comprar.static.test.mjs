import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");

// 06/11/2026 (decisão da Jéssica): a Zethic vende online só os pacotes de entrada, com preço.
// O resto continua por pedido de proposta em /loja, sem preço. Protótipo fora do menu e dos buscadores.
test("compra online: protótipo fora dos buscadores, do sitemap e do llms.txt", () => {
  const h = ler("comprar.html");
  assert.match(h, /<meta name="robots" content="noindex, nofollow">/);
  assert.doesNotMatch(ler("sitemap.xml"), /comprar/);
  assert.doesNotMatch(ler("llms.txt"), /zethic\.net\/comprar/);
  assert.match(h, /style-src 'self'/);
});

test("preços iguais aos do material planos e valores de 06/11/2026", () => {
  const js = ler("assets/js/zethic-comprar.js");
  assert.match(js, /id: "suporte_essencial", nome: "Suporte de TI Essencial", fundador: 145, depois: 190/);
  assert.match(js, /id: "suporte_padrao", nome: "Suporte de TI Padrão", fundador: 225, depois: 290/);
  assert.match(js, /id: "protecao", nome: "Proteção por pessoa", fundador: 19, depois: 25, max: 10/);
  assert.match(js, /id: "site_essencial", nome: "Site estático Essencial", fundador: 3000, depois: 3900/);
});

test("regras de pagamento da Zethic: Pix ou boleto, sem cartão, multa de 2% e juros de 1%, site em 40/30/30", () => {
  const h = ler("comprar.html"), js = ler("assets/js/zethic-comprar.js");
  assert.match(h, /value="Pix"/);
  assert.match(h, /value="Boleto"/);
  assert.doesNotMatch(h, /type="radio"[^>]*value="Cart/i);
  assert.match(js, /multa de 2% e juros de 1% ao mês/);
  assert.match(js, /40% na compra, 30% na aprovação da versão de teste e 30% quando entra em uso/);
  assert.match(js, /mínimo de 3 meses e aviso de 30 dias/);
  assert.match(js, /até 7 dias depois da compra, com devolução integral/);
});

test("configuração: links do Asaas vazios até a Jéssica criar, contato comercial da Zethic", () => {
  const ctx = { window: {} };
  vm.runInNewContext(ler("assets/js/zethic-comprar-config.js"), ctx);
  const c = ctx.window.ZETHIC_COMPRA;
  for (const v of Object.values(c.ASAAS_LINKS)) assert.equal(v, "");
  assert.equal(c.WHATSAPP, "5519981800221");
  assert.equal(c.EMAIL, "contato@zethic.net");
});

test("texto pela regra das marcas: sem PME, sem rótulo MEI e golpe só em simulação de golpe", () => {
  for (const p of ["comprar.html", "assets/js/zethic-comprar.js"]) {
    const t = ler(p).replace(/simulação de golpe/g, "");
    assert.doesNotMatch(t, /\bPME\b|pequena e média empresa/i, p);
    assert.doesNotMatch(t, /\bMEI\b/, p);
    assert.doesNotMatch(t, /golpe/i, p);
  }
});
