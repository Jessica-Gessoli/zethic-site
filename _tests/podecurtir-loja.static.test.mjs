import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const PAGINAS = ["podecurtir/loja/index.html", "podecurtir/loja/obrigado/index.html", "podecurtir/termos/index.html",
  "podecurtir/privacidade/index.html", "podecurtir/desistencia/index.html"];
const JS = ["assets/js/podecurtir-config.js", "assets/js/podecurtir-comum.js", "assets/js/podecurtir-loja.js"];

// 03/11/2026 (aprovado pela Jéssica): a Pode Curtir vende pelo site. Preço publicado só na Pode Curtir.
test("configuração única, com pagamento e Pixel desligados até serem preenchidos", () => {
  const ctx = { window: {} };
  vm.runInNewContext(ler("assets/js/podecurtir-config.js"), ctx);
  const c = ctx.window.PODECURTIR;
  assert.deepEqual(Object.keys(c.ASAAS_LINKS).sort(), ["ajuste", "arrumado", "essencial", "marca", "padrao"]);
  for (const v of Object.values(c.ASAAS_LINKS)) assert.ok(v === "" || /^https:\/\/(www\.)?asaas\.com\//.test(v), "link do Asaas inválido: " + v);
  assert.ok([500, 750, 1200].includes(c.PRECO_AJUSTE), "preço do Ajuste fora da escada aprovada");
  assert.ok(c.PIXEL_ID === "" || /^\d{10,20}$/.test(c.PIXEL_ID));
  assert.equal(c.WHATSAPP, "5519983310769");
  assert.equal(c.EMAIL, "podecurtir@zethic.net");
});

test("preços aprovados em 03/11/2026", () => {
  const js = ler("assets/js/podecurtir-loja.js");
  assert.match(js, /preco: 2000, agora: 0\.5/);
  assert.match(js, /preco: 7500, agora: 0\.5/);
  assert.match(js, /mensal: 1500/);
  assert.match(js, /mensal: 2800/);
  assert.match(js, /R\$ 500 do 1º ao 3º cliente, R\$ 750 do 4º ao 6º e R\$ 1\.200 a partir do 7º/);
});

test("páginas de compra: CSP sem inline, identificação e links de termos, privacidade e desistência", () => {
  for (const p of PAGINAS) {
    const h = ler(p);
    const csp = h.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/);
    assert.ok(csp, p + ": sem CSP");
    assert.doesNotMatch(csp[1], /unsafe-inline|unsafe-eval/, p);
    assert.doesNotMatch(h, /<script>|style="|onclick=/, p + ": script ou estilo inline");
    assert.match(h, /R\. Teófilo Braga, 489, Sala 05/, p);
    assert.match(h, /podecurtir@zethic\.net/, p);
    assert.match(h, /98331-0769/, p);
    assert.match(h, /data-cnpj hidden/, p);
    assert.match(h, /href="\/podecurtir\/termos\/"/, p);
    assert.match(h, /href="\/podecurtir\/privacidade\/" data-link-privacidade/, p);
    assert.match(h, /href="\/podecurtir\/desistencia\/"/, p);
  }
});

test("regras das marcas nas páginas de compra", () => {
  for (const p of [...PAGINAS, ...JS]) {
    const h = ler(p);
    assert.doesNotMatch(h, /golpe/i, p + ": a Pode Curtir não fala de golpe");
    assert.doesNotMatch(h, /\bPME\b|pequena e média empresa/i, p);
    assert.doesNotMatch(h, /\bMEI\b/, p + ": sem o rótulo MEI");
    assert.doesNotMatch(h, /Virgínia|Água na Boca|Lucinha|Excellent/i, p + ": sem nome de cliente");
  }
});

test("desistência antes de o trabalho começar, com retenção de 25% do valor total", () => {
  const t = ler("podecurtir/termos/index.html");
  assert.match(t, /Antes de o trabalho começar:<\/strong> você pode desistir/);
  assert.match(t, /devolvido com desconto de 25% do valor total do serviço/);
  assert.match(t, /Com o trabalho em andamento:<\/strong> o valor pago cobre o trabalho já feito/);
  const d = ler("podecurtir/desistencia/index.html");
  assert.match(d, /id="form-desistencia"/);
  assert.match(d, /desconto de 25% do valor total do serviço/);
  assert.match(ler("assets/js/podecurtir-loja.js"), /menos 25% do valor total do serviço/);
  for (const p of ["podecurtir/termos/index.html", "podecurtir/desistencia/index.html", "podecurtir/loja/obrigado/index.html", "assets/js/podecurtir-loja.js"]) {
    assert.doesNotMatch(ler(p), /devolução integral|7 dias da compra|7 dias depois da compra/, p);
  }
});

test("CNPJ preenchido na configuração, sem o rótulo MEI", () => {
  const c = ler("assets/js/podecurtir-config.js");
  assert.match(c, /CNPJ: "\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}"/);
  assert.doesNotMatch(c, /\bMEI\b/);
});

test("Pixel só depois do aceite e aviso de cookies só com Pixel configurado", () => {
  const js = ler("assets/js/podecurtir-comum.js");
  assert.match(js, /if \(!pixelValido\(\)\) return;/);
  assert.match(js, /if \(v === "aceito"\) carregarPixel\(\); else if \(v !== "recusado"\) banner\(\);/);
  assert.match(js, /"Rejeitar todos"/);
});

test("página da Pode Curtir leva à loja, sem preço", () => {
  const h = ler("podecurtir.html");
  assert.match(h, /href="\/podecurtir\/loja\/">Comprar online/);
  assert.doesNotMatch(h, /R\$ ?\d/);
});

test("loja: preço de fundador só nos itens a preço de fundador, aceite zerado quando o pedido muda e nada se perde sem registro", () => {
  const js = ler("assets/js/podecurtir-loja.js");
  assert.match(js, /fundador: PRECO_AJUSTE === 500/);
  assert.match(js, /if \(t\.fundador && !\$\("fundador"\)\.checked\)/);
  assert.match(js, /\$\("fundador-campo"\)\.hidden = !t\.fundador;/);
  assert.doesNotMatch(js, /t\.pagos\.length && !\$\("fundador"\)/);
  assert.match(js, /if \(resumo !== resumoAceito\) \{ \$\("aceite"\)\.checked = false;/);
  assert.match(js, /if \(ok\) location\.href = url;\s*else manual\(/);
  assert.doesNotMatch(js, /registrar\(pedido\); location\.href = url;/);
});
