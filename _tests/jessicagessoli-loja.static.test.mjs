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
  assert.deepEqual(Object.keys(c.ASAAS_LINKS).sort(), ["aula", "consultoria", "programa", "sessao"]);
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
  assert.match(js, /id: "programa", nome: "Mentoria de posicionamento · programa de 3 meses", preco: 3200, agora: 0\.5/);
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

test("desistência antes da primeira sessão ou da aula, com retenção de 25% do valor total", () => {
  const t = ler("jessicagessoli/termos/index.html");
  assert.match(t, /Antes da primeira sessão ou da aula:<\/strong> você pode desistir/);
  assert.match(t, /devolvido com desconto de 25% do valor total do serviço/);
  assert.match(t, /Depois de começar:<\/strong> o valor pago cobre as sessões já feitas/);
  assert.match(ler("jessicagessoli/desistencia/index.html"), /id="form-desistencia"/);
  assert.match(ler("assets/js/jessicagessoli-loja.js"), /menos 25% do valor total do serviço/);
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
