import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// 07/11/2026 ("solucione tudo", aprovado pela Jéssica): campanhas de novembro ao Carnaval, vendas casadas entre as
// três marcas e medição para saber qual campanha vende. Plano no documento "Campanhas de novembro ao Carnaval 2027".
const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const CAMPANHAS = ["ti-do-consultorio", "ti-da-contabilidade", "ti-da-advocacia", "ti-da-engenharia", "ti-do-rh", "ti-da-agencia", "ti-do-seu-negocio"];

test("campanhas: prazo das vagas de janeiro, argumento da Zethic (site, WhatsApp, automação) e Pode Curtir como parceira", () => {
  for (const c of CAMPANHAS) {
    const h = ler(c + ".html");
    assert.match(h, /compre até 18\/12\/2026 e a implantação começa a partir de 4\/01\/2027/, c);
    assert.match(h, /href="\/atendimento#site"[\s\S]*href="\/atendimento#whatsapp"[\s\S]*href="\/tecnologia#automacao"/, c);
    assert.match(h, new RegExp(`<p class="parceria">[^<]*<a href="https://podecurtir\\.zethic\\.net/\\?utm_source=zethic&amp;utm_campaign=${c}">Pode Curtir</a>`), c);
    assert.match(h, /zethic-origem\.js/, c);
  }
});

test("pedido com origem e evento de envio, nas duas abas da loja", () => {
  const comprar = ler("assets/js/zethic-comprar.js"), loja = ler("assets/js/zethic-loja.js");
  for (const js of [comprar, loja]) {
    assert.match(js, /"Origem: " \+ origem/);
    assert.match(js, /zethicEvento\("pedido_enviado"/);
  }
  assert.match(ler("assets/js/zethic-origem.js"), /sessionStorage/);
  assert.doesNotMatch(ler("assets/js/zethic-origem.js"), /document\.cookie|localStorage/);
  assert.match(ler("assets/js/medicao.js"), /evento\("oferta_conjunta"/);
});

test("crédito do checkup na loja, sem citar a fundadora nem outra marca na Zethic", () => {
  const h = ler("comprar.html");
  assert.match(h, /<input type="checkbox" id="credito-checkup">/);
  assert.match(ler("assets/js/zethic-comprar.js"), /Crédito de checkup \(últimos 30 dias\): abater da implantação/);
});

test("manutenção mensal do site na loja de proposta e na página por necessidade", () => {
  assert.match(ler("assets/js/zethic-loja.js"), /\{ id: "manutencao-site", nome: "Manutenção mensal do site", tipo: "Mensalidade"/);
  assert.match(ler("para-o-seu-negocio.html"), /href="\/loja\?itens=manutencao-site"/);
  assert.match(ler("para-o-seu-negocio.html"), /"@type": "FAQPage"/);
});

test("sites da Jéssica Gessoli e da Pode Curtir levam à Zethic, com a fundadora declarada do lado da Jéssica", () => {
  for (const p of ["jessicagessoli/checkup/index.html", "jessicagessoli/loja/obrigado/index.html"]) {
    const h = ler(p);
    assert.match(h, /https:\/\/zethic\.net\/para-o-seu-negocio\?utm_source=jessicagessoli/, p);
    assert.match(h, /Jéssica Gessoli é fundadora da Zethic, e você pode contratar a execução com quem preferir\./, p);
  }
  assert.match(ler("podecurtir/loja/obrigado/index.html"), /https:\/\/zethic\.net\/para-o-seu-negocio\?utm_source=podecurtir/);
});

// 07/11/2026, 07h03 (aprovado pela Jéssica): Black Week da Zethic, de 23 a 30/11/2026. Condição de pagamento,
// não desconto: implantação agora, primeira mensalidade em janeiro, 1 hora extra de suporte. Preço igual.
test("Black Week: datas fixas, aparece e some sozinha, sem preço na página inicial", () => {
  const js = ler("assets/js/zethic-black-week.js");
  assert.match(js, /Date\.parse\("2026-11-23T00:00:00-03:00"\)/);
  assert.match(js, /Date\.parse\("2026-12-01T00:00:00-03:00"\)/);
  const home = ler("index.html");
  assert.match(home, /<div class="faixa-bw" data-black-week hidden>/);
  assert.match(home, /zethic-black-week\.js/);
  const faixa = home.split('class="faixa-bw"')[1].split("</div></div>")[0];
  assert.doesNotMatch(faixa, /R\$/);
  assert.doesNotMatch(faixa, /desconto|de R\$|por R\$/i);
});

test("Black Week na loja e nas campanhas: só a implantação agora, mensalidade em janeiro, pedido marcado", () => {
  const c = ler("assets/js/zethic-comprar.js");
  assert.match(c, /hoje: \(bw \? mensal : mensal \* 2\)/);
  assert.match(c, /Black Week: implantação de/);
  assert.match(ler("comprar.html"), /<div class="bw-caixa" data-black-week hidden>/);
  const ordem = ler("comprar.html");
  assert.ok(ordem.indexOf("zethic-black-week.js") < ordem.indexOf("zethic-comprar.js"), "a Black Week carrega antes da loja");
  for (const p of CAMPANHAS) assert.match(ler(p + ".html"), /<p class="campanha-bw" data-black-week hidden>/, p);
});
