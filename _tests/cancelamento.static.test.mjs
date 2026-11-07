import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// 04/11/2026, 22h51 e 22h57 (aprovado pela Jéssica): política de cancelamento e devolução publicada
// para a Jéssica Gessoli e para a Zethic, com as regras do documento "Desistência, cancelamento e devolução".
const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const semTags = (h) => h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

// 06/11/2026 (aprovado pela Jéssica): as regras saíram da página própria e ficaram na cláusula 8 dos termos.
// O endereço antigo continua existindo só para levar à cláusula, fora do Google.
test("Jéssica Gessoli: regras de cancelamento na cláusula 8 dos termos", () => {
  const t = semTags(ler("jessicagessoli/termos/index.html").split('<h2 id="desistencia">')[1].split('<h2 id="dados">')[0]);
  assert.match(t, /Estas regras valem para quem contratou a distância: pela loja, pelo WhatsApp ou por e-mail/);
  assert.match(t, /recebe de volta o valor integral \(art\. 49 do Código de Defesa do Consumidor\)/);
  assert.match(t, /Depois de 7 dias, antes da primeira sessão ou da aula: o valor pago é devolvido com desconto de 25% do valor total do serviço/);
  assert.match(t, /Fica retido o maior valor entre 25% do valor total do programa e as sessões feitas/);
  assert.match(t, /o contrato prevê 7 dias depois da assinatura para desistir com devolução integral, enquanto o trabalho não começou/);
  assert.match(t, /Nos contratos mensais, o cancelamento é feito com aviso de 30 dias, e o mês já pago não é devolvido/);
  assert.match(t, /Como pedir\. Comprou pela loja\? Use a página Desistir de uma compra/);
  assert.match(t, /a resposta completa sai em até 5 dias/);
});

test("Jéssica Gessoli: o endereço antigo leva à cláusula 8 e sai do Google", () => {
  const h = ler("jessicagessoli/cancelamento/index.html");
  assert.match(h, /<meta http-equiv="refresh" content="0; url=\.\.\/termos\/#desistencia">/);
  assert.match(h, /<link rel="canonical" href="https:\/\/zethic\.net\/jessicagessoli\/termos\/">/);
  assert.match(h, /<meta name="robots" content="noindex, follow">/);
  assert.doesNotMatch(h, /<script/, "página sem script");
  assert.match(ler("jessicagessoli.html"), /<a href="\/jessicagessoli\/termos\/#desistencia">Cancelamento e devolução<\/a>/);
  assert.doesNotMatch(ler("sitemap.xml"), /jessicagessoli\/cancelamento/);
});

test("Zethic: seção de cancelamento e devolução na página de privacidade e termos", () => {
  const h = ler("privacidade.html");
  const secao = semTags(h.split('<h2 id="cancelamento">')[1].split("<h2>")[0]);
  // 06/11/2026: versão 1.14, com a compra dos pacotes de entrada na loja.
  assert.match(h, /<p class="meta">Versão 1\.14, atualizada em 06\/11\/2026: compra dos pacotes de entrada na loja\.<\/p>/);
  assert.match(secao, /A Zethic contrata só com empresas, por proposta e contrato escritos/);
  assert.match(secao, /40% na assinatura, 30% na aprovação da versão de teste e 30% quando entram em uso/);
  assert.match(secao, /em até 7 dias corridos da assinatura, enquanto o trabalho não começou, a sua empresa pode desistir sem dar motivo e recebe de volta o valor integral/);
  assert.match(secao, /As outras etapas só são cobradas quando entregues/);
  assert.match(secao, /cancela com aviso de 30 dias, pelo mesmo canal em que contratou, e o mês já pago não é devolvido/);
  assert.match(secao, /Antes do mínimo de 3 meses, a multa é de no máximo 1 mensalidade/);
  assert.match(secao, /contas, dados e acessos são devolvidos à sua empresa no prazo escrito no contrato/);
  assert.doesNotMatch(secao, /R\$|\bMEI\b|Jéssica Gessoli|Pode Curtir/, "sem preço, sem rótulo MEI e sem citar as outras marcas");
  assert.match(h, /<h2>10\. Mudanças nesta página<\/h2>/);
  for (const p of ["index.html", "quem-somos.html", "seguranca.html", "tecnologia.html", "atendimento.html", "financeiro.html"]) {
    assert.match(ler(p), /<a href="\/privacidade#cancelamento">Cancelamento e devolução<\/a>/, p + ": link no rodapé");
  }
});
