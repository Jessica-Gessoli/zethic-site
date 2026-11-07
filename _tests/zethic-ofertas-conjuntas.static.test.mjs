import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

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
// 07/11/2026, 07h35: o site muda sozinho a cada campanha até o Carnaval, por assets/js/zethic-calendario.js.
const PAGINAS_ZETHIC = ["index", "quem-somos", "seguranca", "tecnologia", "financeiro", "atendimento", "privacidade", "loja", "loja-obrigado", "comprar", "para-o-seu-negocio", ...CAMPANHAS];

function calendario() {
  const js = ler("assets/js/zethic-calendario.js");
  const bloco = js.split("var CAMPANHAS = [")[1].split("];")[0];
  return [...bloco.matchAll(/id: "([a-z-]+)", de: "(\d{4}-\d{2}-\d{2})", ate: "(\d{4}-\d{2}-\d{2})"[\s\S]*?texto: "([^"]+)",\s*link: "([^"]+)"/g)]
    .map((m) => ({ id: m[1], de: m[2], ate: m[3], texto: m[4], link: m[5] }));
}

test("calendário: campanhas da Zethic de 16/11/2026 ao Carnaval, sem buraco de datas e terminando em 10/02/2027", () => {
  const c = calendario();
  assert.ok(c.length >= 9);
  const fora = c.filter((x) => x.id !== "black-week").sort((a, b) => a.de.localeCompare(b.de));
  assert.equal(fora[0].de, "2026-11-16");
  assert.equal(fora[fora.length - 1].ate, "2027-02-10", "a última faixa termina na Quarta-feira de Cinzas");
  for (let i = 1; i < fora.length; i++) {
    const fim = new Date(fora[i - 1].ate + "T12:00:00Z"); fim.setUTCDate(fim.getUTCDate() + 1);
    assert.ok(fim.toISOString().slice(0, 10) >= fora[i].de, `buraco entre ${fora[i - 1].id} e ${fora[i].id}`);
  }
  const bw = c.find((x) => x.id === "black-week");
  assert.deepEqual([bw.de, bw.ate], ["2026-11-23", "2026-11-30"]);
  assert.match(ler("assets/js/zethic-calendario.js"), /blackWeek: true/);
});

test("calendário: faixas pela regra das marcas (sem preço, sem golpe, sem outras marcas) e com links que existem", () => {
  for (const x of calendario()) {
    assert.doesNotMatch(x.texto, /R\$|golpe|Jéssica|Pode Curtir|PME|\bMEI\b/i, x.id);
    const [caminho, ancora] = x.link.split("?")[0].split("#");
    const arq = caminho.replace(/^\//, "") + ".html";
    assert.ok(existsSync(new URL("../" + arq, import.meta.url)), `${x.id}: ${x.link}`);
    if (ancora) assert.match(ler(arq), new RegExp(`id="${ancora}"`), `${x.id}: #${ancora}`);
  }
});

test("todas as páginas da Zethic têm a faixa de campanha e o calendário; a Black Week saiu do código fixo", () => {
  for (const p of PAGINAS_ZETHIC) {
    const h = ler(p + ".html");
    assert.match(h, /<div class="faixa-campanha" data-faixa-campanha hidden><\/div>/, p);
    assert.match(h, /<script src="\/assets\/js\/zethic-calendario\.js" defer><\/script>/, p);
    assert.doesNotMatch(h, /zethic-black-week|data-black-week|faixa-bw/, p);
  }
  const ordem = ler("comprar.html");
  assert.ok(ordem.indexOf("zethic-calendario.js") < ordem.indexOf("zethic-comprar.js"), "o calendário carrega antes da loja");
});

test("Black Week na loja e nas campanhas, e o prazo das vagas troca sozinho depois de 18/12", () => {
  const c = ler("assets/js/zethic-comprar.js");
  assert.match(c, /hoje: \(bw \? mensal : mensal \* 2\)/);
  assert.match(c, /Black Week: implantação de/);
  assert.match(ler("comprar.html"), /<div class="bw-caixa" data-de="2026-11-23" data-ate="2026-11-30" hidden>/);
  for (const p of CAMPANHAS) {
    const h = ler(p + ".html");
    assert.match(h, /<p class="campanha-bw" data-de="2026-11-23" data-ate="2026-11-30" hidden>/, p);
    assert.match(h, /<p class="campanha-prazo" data-ate="2026-12-18">/, p);
    assert.match(h, /<p class="campanha-prazo" data-de="2026-12-19" hidden>/, p);
  }
});
