import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const PAGINAS = ["podecurtir.html", "podecurtir/loja/obrigado/index.html", "podecurtir/termos/index.html",
  "podecurtir/privacidade/index.html", "podecurtir/desistencia/index.html", "podecurtir/parceiros/index.html"];
const JS = ["assets/js/podecurtir-config.js", "assets/js/podecurtir-comum.js", "assets/js/podecurtir-loja.js"];

// 03/11/2026 (aprovado pela Jéssica): a Pode Curtir vende pelo site. Preço publicado só na Pode Curtir.
test("configuração única, com pagamento e Pixel desligados até serem preenchidos", () => {
  const ctx = { window: {} };
  vm.runInNewContext(ler("assets/js/podecurtir-config.js"), ctx);
  const c = ctx.window.PODECURTIR;
  assert.deepEqual(Object.keys(c.ASAAS_LINKS).sort(),
    ["ajuste", "arrumado_cartao", "arrumado_pix", "completa", "essencial", "marca_cartao", "marca_pix", "padrao",
      "plus_gravacao", "plus_livro", "plus_mentoria", "plus_protecao", "plus_recuperacao", "plus_site_cartao", "plus_site_pix"]);
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
    assert.match(h, /data-cnpj hidden|CNPJ 67\.678\.226\/0001-17/, p);
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
// 07/11/2026 (aprovado pela Jéssica): página única de venda. A loja entra na página inicial, no lugar dos cartões
// de preço que repetiam a loja (substitui a regra de 04/11 "preço da página inicial igual ao da loja": agora o preço
// existe num lugar só). /podecurtir/loja/ leva para /podecurtir#loja, com o mesmo trecho.
test("página única: loja na página inicial, comprar antes do WhatsApp e endereço antigo levando para lá", () => {
  const h = ler("podecurtir.html");
  const hero = h.split('<div class="hero">')[1].split("</div>\n  </div>")[0];
  assert.match(hero, /<a class="btn cheio" href="#loja"[^>]*>Ver preços e comprar<\/a>\s*<a class="btn contorno" href="\/fale\?utm_source=podecurtir"/);
  assert.doesNotMatch(h, /class="oferta"/, "cartões de preço repetidos voltaram");
  for (const id of ['id="loja"', 'id="vista-loja"', 'id="vista-checkout" hidden', 'id="grade-perfil"', 'id="grade-contas"', 'id="grade-planos"',
    'id="lista-propostas"', 'id="carrinho"', 'id="ir-carrinho"', 'id="tipos-opcoes"', 'id="link-obrigado" href="/podecurtir/loja/obrigado/"'])
    assert.ok(h.includes(id), "falta " + id);
  assert.match(h, /<script src="\/assets\/js\/podecurtir-loja\.js" defer><\/script>/);
  assert.match(h, /href="#loja"[^>]*>Comprar online/);
  assert.match(h, /Preço de fundador: 3 vagas por serviço, em troca de depoimento/);
  assert.equal((h.match(/<h1[ >]/g) || []).length, 1, "uma h1 só");
  assert.doesNotMatch(h, /href="\/podecurtir\/loja\/"/);
  // identificação também na página inicial (Decreto 7.962/2013, art. 2º)
  assert.match(h, /R\. Teófilo Braga, 489, Sala 05/);
  assert.match(h, /CNPJ 67\.678\.226\/0001-17/);
  assert.match(h, /href="\/podecurtir\/parceiros\/">Seja parceiro/);
  const r = ler("podecurtir/loja/index.html");
  assert.match(r, /<meta name="robots" content="noindex, follow">/);
  assert.match(r, /<link rel="canonical" href="https:\/\/zethic\.net\/podecurtir">/);
  assert.match(r, /<meta http-equiv="refresh" content="0; url=https:\/\/zethic\.net\/podecurtir#loja">/);
  assert.match(r, /<script src="\/assets\/js\/podecurtir-redireciona\.js"><\/script>/);
  assert.match(ler("assets/js/podecurtir-redireciona.js"), /location\.replace\(c\.href\.split\("#"\)\[0\] \+ \(location\.hash && location\.hash\.length > 1 \? location\.hash : "#loja"\)\)/);
  assert.doesNotMatch(ler("sitemap.xml"), /podecurtir\/loja\//);
  // review do PR #106: link para um trecho da página, no fechamento, volta à loja antes de rolar; faixa final legível no escuro
  const js = ler("assets/js/podecurtir-loja.js");
  assert.match(js, /if \(!alvo \|\| !\$\("vista-loja"\)\.contains\(alvo\) \|\| !\$\("vista-loja"\)\.hidden\) return false;/);
  assert.match(js, /window\.addEventListener\("hashchange", function \(\) \{ irPara\(location\.hash\); \}\);/);
  assert.match(ler("assets/css/podecurtir-loja.css"), /@media \(prefers-color-scheme:dark\)\{\n  \.pc-inicio \.fim\{background:#1B1530;color:#F4F1F8\}/);
});

// 07/11/2026 (pedido da Jéssica: as páginas se ligam de frente para trás e de trás para frente): o mesmo mapa no
// rodapé de todas as páginas e um bloco "Continue por aqui" no fim de cada página de apoio, sempre com a volta à loja.
test("páginas ligadas nos dois sentidos", () => {
  const todas = ["podecurtir.html", ...PAGINAS.slice(1)];
  const mapa = ['href="/podecurtir#loja"', 'href="/podecurtir#como"', 'href="/podecurtir#duvidas"', 'href="/podecurtir/termos/"',
    'href="/podecurtir/privacidade/" data-link-privacidade', 'href="/podecurtir/desistencia/"', 'href="/podecurtir/parceiros/"'];
  for (const p of todas) {
    const rodape = ler(p).split('<footer class="ident">')[1];
    assert.ok(rodape, p + ": sem rodapé");
    const linha = rodape.split('<p class="mapa">')[1];
    assert.ok(linha, p + ": sem mapa no rodapé");
    for (const m of mapa) assert.ok(linha.split("</p>")[0].includes(m), p + ": mapa sem " + m);
    assert.doesNotMatch(ler(p), /href="\/podecurtir\/loja\/(#[^"]*)?"/, p + ": link para o endereço antigo da loja");
  }
  for (const p of PAGINAS.slice(1)) {
    const seguir = ler(p).split('<nav class="wrap seguir" aria-label="Continue por aqui">')[1];
    assert.ok(seguir, p + ": sem Continue por aqui");
    assert.match(seguir.split("</nav>")[0], /href="\/podecurtir#(loja|como)"/, p);
  }
  const h = ler("podecurtir.html");
  for (const destino of ["/podecurtir/termos/", "/podecurtir/privacidade/", "/podecurtir/desistencia/", "/podecurtir/parceiros/"])
    assert.ok(h.split('<footer class="ident">')[0].includes('href="' + destino + '"'), "página inicial sem link no conteúdo para " + destino);
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
  const loja = ler("podecurtir.html");
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
  assert.match(js, /var plus = PLUS\.filter\(function \(p\) \{ return tem\(cart\.plus, p\.id\) && \(principal \|\| p\.avulso\); \}\);/);
  assert.match(js, /" \(" \+ COM\[p\.marca\] \+ ", em parceria; o seu contato continua sendo a Pode Curtir\)"/);
  assert.match(js, /var COM = \{ jg: "com Jéssica Gessoli", ze: "com a Zethic" \};/);
  assert.match(js, /\$\("plus-lista"\)\.addEventListener\("change"/);
  assert.match(js, /if \(resumo !== resumoAceito\) \{ \$\("aceite"\)\.checked = false;/);
  const loja = ler("podecurtir.html");
  assert.match(loja, /<fieldset id="plus-campo" hidden>/);
  assert.match(loja, /<div class="plus-lista" id="plus-lista"><\/div>/);
  const t = ler("podecurtir/termos/index.html");
  assert.match(t, /<strong>Plus no fechamento do pedido:<\/strong>/);
  assert.match(t, /O Site Essencial pode ser parcelado em até 3x no cartão de crédito, sem juros/);
});

// 06/11/2026 (protótipo aprovado pela Jéssica): tipo de Negócio com sugestão; segurança das contas vendida sozinha,
// feita por Jéssica Gessoli em parceria, sem promessa de recuperar a conta; preço depois das vagas de fundador em cada item.
test("tipos de Negócio, segurança das contas avulsa e preço depois das vagas de fundador", () => {
  const js = ler("assets/js/podecurtir-loja.js");
  for (const id of ["doceria", "salao", "consultorio", "outro"]) assert.match(js, new RegExp('id: "' + id + '"'));
  assert.match(js, /regra de publicidade do seu conselho profissional/);
  const plus = js.split("var PLUS = [")[1].split("];")[0];
  assert.match(plus, /id: "plus_protecao", marca: "jg", nome: "Proteção das contas", preco: 400, avulso: true,/);
  assert.match(plus, /id: "plus_recuperacao", marca: "jg", nome: "Recuperação de conta", preco: 400, avulso: true,/);
  assert.match(plus, /não há garantia de recuperação/);
  assert.doesNotMatch(plus, /id: "plus_(gravacao|livro|mentoria|site)"[^}]*avulso: true/);
  assert.match(js, /Depois, R\$ 3\.200\./);
  assert.match(js, /Depois, R\$ 12\.000\./);
  assert.match(js, /A partir do 4º cliente, R\$ 2\.400 por mês\./);
  assert.match(js, /A partir do 4º cliente, R\$ 4\.480 por mês\./);
  assert.match(js, /A partir do 4º cliente, R\$ 7\.200 por mês\./);
  const loja = ler("podecurtir.html");
  assert.match(loja, /<div class="tipos-opcoes" id="tipos-opcoes"><\/div>/);
  assert.match(loja, /<div class="grade" id="grade-contas"><\/div>/);
  assert.match(loja, /Feitas por Jéssica Gessoli, em parceria\. O seu contato continua sendo a Pode Curtir\./);
  const ctx = { window: {} };
  vm.runInNewContext(ler("assets/js/podecurtir-config.js"), ctx);
  assert.ok("plus_recuperacao" in ctx.window.PODECURTIR.ASAAS_LINKS);
  const t = ler("podecurtir/termos/index.html");
  assert.match(t, /também podem ser compradas sozinhas, na seção Proteção e recuperação de conta/);
});
