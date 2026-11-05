import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const PAGINAS = ["podecurtir/loja/index.html", "podecurtir/loja/obrigado/index.html", "podecurtir/termos/index.html",
  "podecurtir/privacidade/index.html", "podecurtir/desistencia/index.html", "podecurtir/parceiros/index.html"];
const JS = ["assets/js/podecurtir-config.js", "assets/js/podecurtir-comum.js", "assets/js/podecurtir-loja.js"];

// 03/11/2026 (aprovado pela Jéssica): a Pode Curtir vende pelo site. Preço publicado só na Pode Curtir.
test("configuração única, com pagamento e Pixel desligados até serem preenchidos", () => {
  const ctx = { window: {} };
  vm.runInNewContext(ler("assets/js/podecurtir-config.js"), ctx);
  const c = ctx.window.PODECURTIR;
  assert.deepEqual(Object.keys(c.ASAAS_LINKS).sort(),
    ["ajuste", "arrumado_cartao", "arrumado_pix", "completa", "essencial", "marca_cartao", "marca_pix", "padrao",
      "plus_gravacao", "plus_livro", "plus_mentoria", "plus_protecao", "plus_site_cartao", "plus_site_pix"]);
  for (const v of Object.values(c.ASAAS_LINKS)) assert.ok(v === "" || /^https:\/\/(www\.)?asaas\.com\//.test(v), "link do Asaas inválido: " + v);
  assert.ok([500, 750, 1200].includes(c.PRECO_AJUSTE), "preço do Ajuste fora da escada aprovada");
  assert.ok(c.PIXEL_ID === "" || /^\d{10,20}$/.test(c.PIXEL_ID));
  assert.equal(c.WHATSAPP, "5519983310769");
  assert.equal(c.EMAIL, "podecurtir@zethic.net");
});

test("preços aprovados em 03/11/2026", () => {
  const js = ler("assets/js/podecurtir-loja.js");
  assert.match(js, /preco: 2000, parcelas: 3/);
  assert.match(js, /preco: 7500, parcelas: 6/);
  assert.match(js, /mensal: 1500/);
  assert.match(js, /mensal: 2800/);
  assert.match(js, /mensal: 4500/);
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

test("desistência: devolução integral em 7 dias (CDC art. 49); depois, retenção de 25% antes do início", () => {
  const t = ler("podecurtir/termos/index.html");
  assert.match(t, /Em até 7 dias corridos da compra pela loja:<\/strong> você pode desistir/);
  assert.match(t, /recebe de volta o valor integral, como prevê o art\. 49 do Código de Defesa do Consumidor/);
  assert.match(t, /Depois de 7 dias, antes de o trabalho começar:<\/strong> o valor pago é devolvido com desconto de 25% do valor total do serviço/);
  assert.match(t, /Depois de 7 dias, com o trabalho em andamento:<\/strong> o valor pago cobre o trabalho já feito/);
  const d = ler("podecurtir/desistencia/index.html");
  assert.match(d, /id="form-desistencia"/);
  assert.match(d, /em até 7 dias corridos da compra, sem dar motivo, e recebe o valor integral/);
  assert.match(d, /desconto de 25% do valor total do serviço/);
  assert.match(ler("podecurtir/loja/obrigado/index.html"), /Em até 7 dias corridos da compra/);
  assert.match(ler("assets/js/podecurtir-loja.js"), /em até 7 dias corridos da compra, pela página Desistir de uma compra, com devolução integral/);
  for (const p of ["podecurtir/termos/index.html", "podecurtir/desistencia/index.html", "podecurtir/loja/obrigado/index.html", "assets/js/podecurtir-loja.js"]) {
    assert.doesNotMatch(ler(p), /Antes de o trabalho começar, você pode desistir|desistir antes de o trabalho começar, sem dar motivo/, p);
  }
});

test("CNPJ preenchido na configuração, sem o rótulo MEI", () => {
  const c = ler("assets/js/podecurtir-config.js");
  assert.match(c, /CNPJ: "\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}"/);
  assert.doesNotMatch(c, /\bMEI\b/);
});

// 04/11/2026: GA4 e Pixel da Meta só depois do aceite; aviso de cookies só com um dos dois configurado.
test("medição só depois do aceite e aviso de cookies só com GA4 ou Pixel configurado", () => {
  const js = ler("assets/js/podecurtir-comum.js");
  assert.match(js, /if \(!medicaoValida\(\)\) return;/);
  assert.match(js, /if \(v === "aceito"\) carregarMedicao\(\); else if \(v !== "recusado"\) banner\(\);/);
  assert.match(js, /function carregarMedicao\(\) \{ carregarPixel\(\); carregarGA\(\); \}/);
  assert.match(js, /allow_google_signals: false/);
  assert.match(js, /"Rejeitar todos"/);
  const ctx = { window: {} };
  vm.runInNewContext(ler("assets/js/podecurtir-config.js"), ctx);
  const ga = ctx.window.PODECURTIR.GA4_ID;
  assert.ok(ga === "" || /^G-[A-Z0-9]{4,20}$/.test(ga), "GA4_ID inválido");
  const priv = ler("podecurtir/privacidade/index.html");
  assert.match(priv, /Google Analytics, só se você aceitar/);
});

// 04/11/2026 (pedido da Jéssica: o site como máquina de vendas; decisão de 04/11 "site = preço pronto"): a página
// inicial passa a mostrar preço. Substitui a regra de 21/10/2026 "nenhum preço na página inicial". O preço da página
// inicial precisa ser o mesmo da loja: mudou na loja, muda aqui.
test("página inicial: preço na primeira dobra igual ao da loja, comprar antes do WhatsApp", () => {
  const h = ler("podecurtir.html");
  const js = ler("assets/js/podecurtir-loja.js");
  const ctx = { window: {} };
  vm.runInNewContext(ler("assets/js/podecurtir-config.js"), ctx);
  const reais = v => "R$ " + v.toLocaleString("pt-BR");
  const ofertas = h.split('class="oferta"').slice(1);
  const card = nome => ofertas.find(o => o.includes("<h3>" + nome + "</h3>"));
  assert.ok(card("Ajuste de Perfil").includes(reais(ctx.window.PODECURTIR.PRECO_AJUSTE)), "Ajuste de Perfil fora do preço da configuração");
  for (const [nome, re] of [["Perfil Arrumado", /nome: "Perfil Arrumado", preco: (\d+), parcelas: (\d+)[^}]*prazo: "([^"]+)"/],
                             ["Marca Completa", /nome: "Marca Completa", preco: (\d+), parcelas: (\d+)[^}]*prazo: "([^"]+)"/]]) {
    const [, preco, parcelas, prazo] = js.match(re);
    const c = card(nome);
    assert.ok(c.includes(reais(Number(preco))), nome + ": preço diferente da loja");
    assert.ok(c.includes("Até " + parcelas + "x sem juros"), nome + ": parcelas diferentes da loja");
    assert.ok(c.includes(prazo), nome + ": prazo diferente da loja");
  }
  const menor = Math.min(...[...js.matchAll(/mensal: (\d+)/g)].map(m => Number(m[1])));
  assert.ok(card("Gestão mensal").includes(reais(menor)), "Gestão mensal: 'a partir de' diferente do menor plano");
  const hero = h.split('<div class="hero">')[1].split("</div>\n  </div>")[0];
  assert.match(hero, /<a class="btn cheio" href="#precos"[^>]*>Ver preços e comprar<\/a>\s*<a class="btn contorno" href="\/fale\?utm_source=podecurtir"/);
  assert.match(h, /id="precos"/);
  assert.match(h, /href="\/podecurtir\/loja\/"[^>]*>Comprar online/);
  assert.match(h, /3 vagas por serviço, em troca de um depoimento com as suas palavras/);
  // identificação também na página inicial (Decreto 7.962/2013, art. 2º)
  assert.match(h, /R\. Teófilo Braga, 489, Sala 05/);
  assert.match(h, /CNPJ 67\.678\.226\/0001-17/);
  assert.match(h, /href="\/podecurtir\/parceiros\/">Seja parceiro/);
});

// 04/11/2026: página de parceiros sem promessa de renda, sem cara de emprego e com a regra de publicidade do CONAR.
test("seja parceiro: sem promessa de renda, sem vínculo e com marcação de publicidade", () => {
  const h = ler("podecurtir/parceiros/index.html");
  assert.match(h, /Sem vínculo de emprego, sem horário e sem exclusividade/);
  assert.match(h, /Não há promessa de volume de pedidos nem de renda/);
  assert.match(h, /#publi/);
  assert.doesNotMatch(h, /R\$ ?\d|ganhe até|renda extra garantida/i);
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

// 04/11/2026 (decisões da Jéssica): no site, preço pronto e pagamento integral; parcelado só no cartão, com um link
// para Pix ou boleto à vista e outro para cartão; a Gestão Completa é vendida no site, com assinatura; WhatsApp para orçamento.
test("site: pagamento integral, parcelado só no cartão e Gestão Completa com assinatura", () => {
  const js = ler("assets/js/podecurtir-loja.js");
  assert.match(js, /function linkDe\(p\) \{ return LINKS\[p\.parcelas \? p\.id \+ "_" \+ forma\(\) : p\.id\]; \}/);
  assert.match(js, /&& !forma\(\)\) falta\.push\("forma de pagamento"\)/);
  assert.doesNotMatch(js, /p\.agora|t\.saldo|Entrada de 50%|saldo antes da entrega/);
  const propostas = js.split("var PROPOSTAS")[1].split("];")[0];
  assert.doesNotMatch(propostas, /Gestão Completa/);
  const loja = ler("podecurtir/loja/index.html");
  assert.match(loja, /<input type="radio" id="forma-pix" name="forma" value="pix">/);
  assert.match(loja, /<input type="radio" id="forma-cartao" name="forma" value="cartao">/);
  assert.match(loja, /por Pix, boleto ou cartão/);
  const t = ler("podecurtir/termos/index.html");
  assert.doesNotMatch(t, /entrada de 50%|gestão Completa\)/i);
  assert.match(t, /Perfil Arrumado pode ser parcelado em até 3x e a Marca Completa em até 6x, sem juros/);
  const ctx = { window: {} };
  vm.runInNewContext(ler("assets/js/podecurtir-config.js"), ctx);
  for (const [k, v] of Object.entries(ctx.window.PODECURTIR.ASAAS_LINKS)) {
    if (k.startsWith("plus_") && v === "") continue; // plus: "pagamento em configuração" até o link existir
    assert.match(v, /^https:\/\/www\.asaas\.com\/000\/c\/[a-z0-9]{16}$/, k);
  }
});

// 04/11/2026 (decisão da Jéssica, Ficha v1.17): plus no fechamento do pedido, marcado pelo cliente, com escopo e preço
// fechados; os feitos em parceria em linha separada, com o nome de quem faz; trabalhos maiores seguem por proposta.
test("plus no fechamento: preços aprovados, só com serviço pago, parceria identificada e aceite renovado", () => {
  const js = ler("assets/js/podecurtir-loja.js");
  const plus = js.split("var PLUS = [")[1].split("];")[0];
  assert.match(plus, /id: "plus_gravacao", marca: "pc", nome: "Sessão de fotos de 1 hora", preco: 500,/);
  assert.match(plus, /id: "plus_livro", marca: "pc", nome: "Capa e diagramação do e-book", preco: 1500,/);
  assert.match(plus, /id: "plus_protecao", marca: "jg", nome: "Proteção das contas", preco: 400,/);
  assert.match(plus, /id: "plus_mentoria", marca: "jg", nome: "Mentoria em IA · 1 hora", preco: 400,/);
  assert.match(plus, /id: "plus_site", marca: "ze", nome: "Site Essencial", preco: 3000, parcelas: 3, em: "no", fundador: true,/);
  assert.match(js, /var plus = pagos\.length \? PLUS\.filter/);
  assert.match(js, /" \(" \+ COM\[p\.marca\] \+ ", em parceria; o seu contato continua sendo a Pode Curtir\)"/);
  assert.match(js, /var COM = \{ jg: "com Jéssica Gessoli", ze: "com a Zethic" \};/);
  assert.match(js, /\$\("plus-lista"\)\.addEventListener\("change"/);
  assert.match(js, /if \(resumo !== resumoAceito\) \{ \$\("aceite"\)\.checked = false;/);
  const loja = ler("podecurtir/loja/index.html");
  assert.match(loja, /<fieldset id="plus-campo" hidden>/);
  assert.match(loja, /<div class="plus-lista" id="plus-lista"><\/div>/);
  const t = ler("podecurtir/termos/index.html");
  assert.match(t, /<strong>Plus no fechamento do pedido:<\/strong>/);
  assert.match(t, /O Site Essencial pode ser parcelado em até 3x no cartão de crédito, sem juros/);
});
