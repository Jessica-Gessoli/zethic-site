import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const PAGINAS = ["jessicagessoli/loja/index.html", "jessicagessoli/loja/obrigado/index.html", "jessicagessoli/termos/index.html",
  "jessicagessoli/privacidade/index.html", "jessicagessoli/desistencia/index.html"];
const JS = ["assets/js/jessicagessoli-config.js", "assets/js/jessicagessoli-comum.js", "assets/js/jessicagessoli-loja.js"];

// 03/11/2026 (aprovado pela Jéssica): a Jéssica Gessoli vende pelo site a consultoria por hora, a mentoria de
// posicionamento e a aula ao vivo. Os outros serviços entram como pedido de proposta, sem preço publicado.
test("configuração única, com pagamento, aula e Pixel desligados até serem preenchidos", () => {
  const ctx = { window: {} };
  vm.runInNewContext(ler("assets/js/jessicagessoli-config.js"), ctx);
  const c = ctx.window.JESSICAGESSOLI;
  assert.deepEqual(Object.keys(c.ASAAS_LINKS).sort(), ["aula", "consultoria", "programa_cartao", "programa_pix", "sessao"]);
  for (const v of Object.values(c.ASAAS_LINKS)) assert.ok(v === "" || /^https:\/\/(www\.)?asaas\.com\//.test(v), "link do Asaas inválido: " + v);
  assert.equal(typeof c.AULA_DATA, "string");
  assert.ok(c.PIXEL_ID === "" || /^\d{10,20}$/.test(c.PIXEL_ID));
  assert.equal(c.WHATSAPP, "5519981800221");
  assert.equal(c.EMAIL, "jessica.gessoli@zethic.net");
  assert.match(String(c.CNPJ), /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
});

test("preços aprovados em 03/11/2026 e mais nenhum", () => {
  const js = ler("assets/js/jessicagessoli-loja.js");
  assert.match(js, /id: "consultoria", nome: "Consultoria · 1 hora", preco: 400, agora: 1/);
  assert.match(js, /id: "sessao", nome: "Mentoria de posicionamento · sessão avulsa", preco: 400, agora: 1/);
  assert.match(js, /id: "programa", nome: "Mentoria de posicionamento · programa de 3 meses", preco: 3200, agora: 1, parcelas: 3, em: "no"/);
  assert.match(js, /id: "aula", nome: "Aula ao vivo · IA segura para o seu Negócio", preco: 97, agora: 1/);
  assert.equal((js.match(/preco: \d+/g) || []).length, 4, "item com preço fora dos aprovados");
  const propostas = js.split("var PROPOSTAS")[1].split("];")[0];
  assert.doesNotMatch(propostas, /R\$ ?\d|preco/, "proposta com preço publicado");
});

test("aula sem data não é vendida: vira aviso da próxima turma", () => {
  const js = ler("assets/js/jessicagessoli-loja.js");
  assert.match(js, /function vendivel\(p\) \{ return !p\.aula \|\| !!AULA_DATA; \}/);
  assert.match(js, /if \(!AULA_DATA\) PROPOSTAS\.push\(\{ id: "aula-aviso"/);
});

test("páginas de compra: CSP sem inline, identificação e links de termos, privacidade e desistência", () => {
  for (const p of PAGINAS) {
    const h = ler(p);
    const csp = h.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/);
    assert.ok(csp, p + ": sem CSP");
    assert.doesNotMatch(csp[1], /unsafe-inline|unsafe-eval/, p);
    assert.doesNotMatch(h, /<script>|style="|onclick=/, p + ": script ou estilo inline");
    assert.match(h, /R\. Teófilo Braga, 489, Sala 05/, p);
    assert.match(h, /jessica\.gessoli@zethic\.net/, p);
    assert.match(h, /98180-0221/, p);
    assert.match(h, /data-cnpj hidden/, p);
    assert.match(h, /href="\/jessicagessoli\/termos\/"/, p);
    assert.match(h, /href="\/jessicagessoli\/privacidade\/" data-link-privacidade/, p);
    assert.match(h, /href="\/jessicagessoli\/desistencia\/"/, p);
    assert.match(h, /href="\/assets\/css\/jessicagessoli-loja\.css"/, p);
    assert.doesNotMatch(h, /podecurtir|98331-0769/i, p + ": sem misturar com a Pode Curtir");
  }
});

test("regras da marca nas páginas de compra", () => {
  for (const p of [...PAGINAS, ...JS]) {
    const h = ler(p);
    assert.doesNotMatch(h, /\bPME\b|pequena e média empresa/i, p);
    assert.doesNotMatch(h, /Riscos e IA/, p + ": a área se chama Cibersegurança e IA");
    assert.doesNotMatch(h, /\bMEI\b/, p + ": sem o rótulo MEI");
    assert.doesNotMatch(h, /Virgínia|Água na Boca|Lucinha|Excellent/i, p + ": sem nome de cliente");
  }
});

test("desistência: devolução integral em 7 dias (CDC art. 49), menos o que já foi feito; depois, retenção de 25% antes do início", () => {
  const t = ler("jessicagessoli/termos/index.html");
  assert.match(t, /Em até 7 dias corridos da compra pela loja:<\/strong> você pode desistir/);
  assert.match(t, /recebe de volta o valor integral \(art\. 49 do Código de Defesa do Consumidor\)/);
  assert.match(t, /Sessão ou aula feita dentro dos 7 dias:<\/strong> o que já aconteceu é descontado\. No programa de mentoria, R\$ 400 por sessão feita/);
  assert.match(t, /Depois de 7 dias, antes da primeira sessão ou da aula:<\/strong> o valor pago é devolvido com desconto de 25% do valor total do serviço/);
  assert.match(t, /Depois de 7 dias, com as sessões em andamento:<\/strong> o valor pago cobre as sessões já feitas/);
  const d = ler("jessicagessoli/desistencia/index.html");
  assert.match(d, /id="form-desistencia"/);
  assert.match(d, /em até 7 dias corridos da compra, sem dar motivo, e recebe o valor integral, menos as sessões ou a aula já feitas/);
  assert.match(d, /desconto de 25% do valor total do serviço/);
  assert.match(ler("jessicagessoli/loja/obrigado/index.html"), /Em até 7 dias corridos da compra/);
  assert.match(ler("assets/js/jessicagessoli-loja.js"), /em até 7 dias corridos da compra, pela página Desistir de uma compra, com devolução integral/);
  for (const p of ["jessicagessoli/termos/index.html", "jessicagessoli/desistencia/index.html", "jessicagessoli/loja/obrigado/index.html", "assets/js/jessicagessoli-loja.js"]) {
    assert.doesNotMatch(ler(p), /Antes da primeira sessão ou da aula:<\/strong> você pode desistir|Você pode desistir antes da primeira sessão ou da aula|desistência: antes da primeira sessão ou da aula|<strong>Desistência:<\/strong> antes da primeira/, p);
  }
});

test("aceite zerado quando o pedido muda e nada se perde sem registro", () => {
  const js = ler("assets/js/jessicagessoli-loja.js");
  assert.match(js, /if \(resumo !== resumoAceito\) \{ \$\("aceite"\)\.checked = false;/);
  assert.match(js, /if \(ok\) location\.href = url;\s*else manual\(/);
  assert.doesNotMatch(js, /registrar\(pedido\); location\.href = url;/);
});

test("Pixel só depois do aceite e aviso de cookies só com Pixel configurado", () => {
  const js = ler("assets/js/jessicagessoli-comum.js");
  assert.match(js, /if \(!pixelValido\(\)\) return;/);
  assert.match(js, /if \(v === "aceito"\) carregarPixel\(\); else if \(v !== "recusado"\) banner\(\);/);
  assert.match(js, /"Rejeitar todos"/);
});

test("página da Jéssica Gessoli leva à loja, sem preço", () => {
  const h = ler("jessicagessoli.html");
  assert.match(h, /<a href="\/jessicagessoli\/loja\/">Loja<\/a>/);
  assert.match(h, /href="\/jessicagessoli\/loja\/">loja online<\/a>/);
  assert.doesNotMatch(h, /R\$ ?\d/);
});

// 04/11/2026 (decisão da Jéssica, como na loja da Pode Curtir): no site, pagamento integral; parcelado só no cartão,
// com um link para Pix ou boleto à vista e outro para cartão.
test("pagamento integral no site, parcelado só no cartão", () => {
  const js = ler("assets/js/jessicagessoli-loja.js");
  assert.doesNotMatch(js, /agora: 0\.|saldo|Entrada de 50%|5ª sessão/);
  assert.match(js, /function linkDe\(p\) \{ return LINKS\[p\.parcelas \? p\.id \+ "_" \+ forma\(\) : p\.id\]; \}/);
  assert.match(js, /&& !forma\(\)\) falta\.push\("forma de pagamento"\)/);
  const loja = ler("jessicagessoli/loja/index.html");
  assert.match(loja, /<input type="radio" id="forma-pix" name="forma" value="pix">/);
  assert.match(loja, /<input type="radio" id="forma-cartao" name="forma" value="cartao">/);
  const t = ler("jessicagessoli/termos/index.html");
  assert.doesNotMatch(t, /50% na compra|5ª sessão/);
  assert.match(t, /programa de mentoria de 3 meses pode ser parcelado em até 3x, sem juros/);
  for (const p of ["jessicagessoli/loja/index.html", "jessicagessoli/termos/index.html"]) assert.match(ler(p), /por Pix, boleto ou cartão/, p);
});
