import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const PAGINAS = ["loja.html", "loja-obrigado.html"];
const JS = ["assets/js/zethic-loja-config.js", "assets/js/zethic-loja.js"];
const semTags = (h) => h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");

// 03/11/2026, 22h07 (decisão da Jéssica): a loja da Zethic é só de pedido de proposta. O site continua sem preço;
// os valores vão no material "Zethic — planos e valores", enviado depois da conversa (aprovado às 21h49).
test("loja sem preço: nenhum valor em reais nem percentual de cobrança nas páginas e no catálogo", () => {
  for (const p of [...PAGINAS, ...JS, "assets/css/zethic-loja.css"]) {
    const h = ler(p);
    assert.doesNotMatch(h, /R\$|\bpreco\b|price/i, p + ": a loja da Zethic não mostra preço");
    assert.doesNotMatch(h, /30% do valor recuperado|preço de fundador/i, p);
  }
});

test("configuração: envio desligado até o webhook ser preenchido, com WhatsApp e e-mail da Zethic", () => {
  const ctx = { window: {} };
  vm.runInNewContext(ler("assets/js/zethic-loja-config.js"), ctx);
  const c = ctx.window.ZETHIC_LOJA;
  assert.equal(c.FORM_ENDPOINT, "");
  assert.equal(c.WHATSAPP, "5519981800221");
  assert.equal(c.EMAIL, "contato@zethic.net");
});

test("pedido não se perde: sem webhook ou com falha, a mensagem pronta vai para o WhatsApp e o e-mail", () => {
  const js = ler("assets/js/zethic-loja.js");
  assert.match(js, /if \(!C\.FORM_ENDPOINT \|\| !window\.fetch\) return Promise\.resolve\(false\);/);
  assert.match(js, /if \(ok\) \{ pedido = \[\]; salvar\(\); location\.href = /);
  assert.match(js, /else manual\(texto\);/);
  assert.match(js, /"https:\/\/wa\.me\/"/);
  assert.match(js, /"mailto:"/);
});

test("catálogo pela fronteira de 03/11 (Ficha v1.11 e v1.12): sem capacitação em IA, sem treinamento técnico (06/11) e sem blindagem de contas", () => {
  const js = ler("assets/js/zethic-loja.js");
  const catalogo = js.split("var DEPTOS")[1].split("var SERVICOS")[0];
  assert.doesNotMatch(catalogo, /Capacitação em IA|capacitacao|[Bb]lindagem|[Tt]reinamento/);
  // 06/11/2026 (decisão da Jéssica): os departamentos seguem os 4 pilares do site, na ordem do menu.
  const deptos = [...catalogo.matchAll(/\n    \{ id: "([a-z-]+)", nome: "([^"]+)"/g)].map((m) => m[2]);
  assert.deepEqual(deptos, ["Segurança", "Tecnologia", "Atendimento", "Financeiro"]);
  assert.match(catalogo, /[Ss]imulaç(?:ão|ões) de golpe/);
  assert.match(catalogo, /CRM leve/);
  assert.doesNotMatch(catalogo, /link: "\/(proteger|organizar|crescer|conectar)/);
  for (const s of ["site", "bot", "projetos", "seguranca-gerenciada", "soc", "gestao-financeira", "auditoria", "reforma"]) assert.match(catalogo, new RegExp('id: "' + s + '"'));
});

test("páginas: CSP sem inline, cabeçalho da Zethic, privacidade e consentimento", () => {
  for (const p of PAGINAS) {
    const h = ler(p);
    const csp = h.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/);
    assert.ok(csp, p + ": sem CSP");
    assert.doesNotMatch(csp[1], /unsafe-inline|unsafe-eval/, p);
    assert.doesNotMatch(h, /<script>|style="|onclick=/, p + ": script ou estilo inline");
    assert.match(h, /<!-- cabecalho:inicio -->[\s\S]*href="\/loja"[\s\S]*<!-- cabecalho:fim -->/, p);
    assert.match(h, /href="\/privacidade"/, p);
    assert.match(h, /CNPJ 67\.678\.226\/0001-17/, p);
  }
  const loja = ler("loja.html");
  assert.match(loja, /<input type="checkbox" id="consentimento" required>/);
  assert.match(loja, /Sem pagamento e sem compromisso/);
  assert.match(ler("loja-obrigado.html"), /<meta name="robots" content="noindex, nofollow">/);
});

test("regras da marca na loja", () => {
  for (const p of [...PAGINAS, ...JS]) {
    // Só o que a pessoa vê: sem comentários de código e sem a razão social, que o rodapé precisa mostrar.
    const h = p.endsWith(".html") ? semTags(ler(p)).replace(/Razão social: Jessica Caroline da Silva Secco Gessoli\./, "") : ler(p).replace(/\/\*[\s\S]*?\*\//g, "");
    assert.doesNotMatch(h, /\bPME\b|pequena e média empresa/i, p);
    assert.doesNotMatch(h, /\bMEI\b/, p + ": sem o rótulo MEI");
    assert.doesNotMatch(h, /Jéssica Gessoli|Jessica|Pode Curtir/i, p + ": a fundadora e as outras marcas não aparecem na Zethic");
    assert.doesNotMatch(h, /Virgínia|Água na Boca|Lucinha|Excellent/i, p + ": sem nome de cliente");
  }
});

test("pedido de proposta na política de privacidade", () => {
  assert.match(ler("privacidade.html"), /<td>Você monta um pedido de proposta na loja<\/td>/);
  assert.match(ler("sitemap.xml"), /<loc>https:\/\/zethic\.net\/loja<\/loc>/);
});

// 04/11/2026, 22h51 (aprovado pela Jéssica): desistência e cancelamento nos contratos da Zethic, só com empresas.
test("condições de desistência e cancelamento no pedido de proposta", () => {
  const h = ler("loja.html");
  assert.match(h, /em até 7 dias da assinatura, antes de o trabalho começar, recebe de volta o valor integral/);
  assert.match(h, /as outras etapas só são cobradas quando entregues/);
  assert.match(h, /cancela com aviso de 30 dias, pelo mesmo canal em que contratou, e o mês já pago não é devolvido/);
  assert.match(h, /Antes do mínimo de 3 meses, a multa é de no máximo 1 mensalidade/);
  assert.match(h, /contas, dados e acessos são devolvidos no prazo escrito no contrato/);
  assert.match(h, /As regras completas estão em <a href="\/privacidade#cancelamento">Cancelamento e devolução<\/a>/);
  for (const p of PAGINAS) assert.match(ler(p), /<a href="\/privacidade#cancelamento">Cancelamento e devolução<\/a>\./, p + ": link no rodapé");
});

// 06/11/2026, 06h33 (aprovado pela Jéssica): site estático, site em movimento e loja virtual com níveis, sem preço na loja.
test("site em movimento e loja virtual com níveis, sem preço", () => {
  const js = ler("assets/js/zethic-loja.js");
  assert.match(js, /id: "site-movimento", nome: "Site em movimento"[^\n]*niveis: NIVEIS_MOVIMENTO/);
  assert.match(js, /id: "loja-virtual", nome: "Loja virtual"[^\n]*niveis: NIVEIS_LOJA/);
  for (const n of ["Loja de serviços", "Até 30 produtos cadastrados", "Até 100 produtos cadastrados", "Até 5 páginas animadas"]) assert.ok(js.includes(n), n);
  assert.doesNotMatch(js, /R\$ ?\d/);
});

// 06/11/2026: Chegada ao Brasil é oferta atual; minerais críticos entram em "No futuro".
test("loja: Chegada ao Brasil sob proposta e minerais críticos no futuro", () => {
  const js = readFileSync(new URL("../assets/js/zethic-loja.js", import.meta.url), "utf8");
  assert.match(js, /nome: "Chegada ao Brasil", tipo: "Sob proposta"/);
  assert.match(js, /id: "minerais"[^}]*tipo: "No futuro/);
  assert.doesNotMatch(js, /Parceira local de empresas de fora/);
  assert.match(js, /regra EUDR/);
});
