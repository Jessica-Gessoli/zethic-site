import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// 04/11/2026, 22h51 e 22h57 (aprovado pela Jéssica): política de cancelamento e devolução publicada
// para a Jéssica Gessoli e para a Zethic, com as regras do documento "Desistência, cancelamento e devolução".
const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const semTags = (h) => h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

test("Jéssica Gessoli: página da política com as regras aprovadas", () => {
  const h = ler("jessicagessoli/cancelamento/index.html");
  const t = semTags(h);
  assert.match(h, /<link rel="canonical" href="https:\/\/zethic\.net\/jessicagessoli\/cancelamento\/">/);
  assert.match(h, /Content-Security-Policy" content="default-src 'none'; img-src 'self'; font-src 'self'; style-src 'self'; base-uri 'none'; form-action 'none'"/);
  assert.doesNotMatch(h, /<script/, "página sem script");
  assert.match(t, /Em até 7 dias corridos da contratação: você pode desistir sem dar motivo e recebe de volta o valor integral \(art\. 49 do Código de Defesa do Consumidor\)/);
  assert.match(t, /cada sessão feita vale o preço da sessão avulsa/);
  assert.match(t, /Sessão marcada para dentro dos 7 dias: se você marcar uma sessão para dentro desse prazo, ela acontece a seu pedido/);
  assert.match(t, /Depois de 7 dias, antes da primeira sessão ou da aula: o valor pago é devolvido com desconto de 25% do valor total do serviço/);
  assert.match(t, /Fica retido o maior valor entre 25% do valor total do programa e as sessões feitas, cobradas pelo preço da sessão avulsa/);
  assert.match(t, /avise com pelo menos 24 horas de antecedência/);
  assert.match(t, /Para empresas: vale o contrato\. Ele prevê 7 dias depois da assinatura para desistir com devolução integral, enquanto o trabalho não começou/);
  assert.match(t, /Contratos mensais: o cancelamento é feito com aviso de 30 dias, e o mês já pago não é devolvido/);
  assert.match(t, /CNPJ 67\.678\.226\/0001-17/);
  assert.doesNotMatch(t, /R\$/, "a página não publica preço");
  assert.doesNotMatch(t, /\bMEI\b|\bPME\b|Pode Curtir|Zethic,|da Zethic/, "sem rótulo MEI, sem PME e sem citar as outras marcas");
  assert.match(ler("jessicagessoli.html"), /<a href="\/jessicagessoli\/cancelamento\/">Política de cancelamento e devolução<\/a>/);
  assert.match(ler("sitemap.xml"), /<loc>https:\/\/zethic\.net\/jessicagessoli\/cancelamento\/<\/loc>/);
});

test("Zethic: seção de cancelamento e devolução na página de privacidade e termos", () => {
  const h = ler("privacidade.html");
  const secao = semTags(h.split('<h2 id="cancelamento">')[1].split("<h2>")[0]);
  assert.match(h, /<p class="meta">Versão 1\.13, atualizada em 04\/11\/2026\.<\/p>/);
  assert.match(secao, /A Zethic contrata só com empresas, por proposta e contrato escritos/);
  assert.match(secao, /40% na assinatura, 30% na aprovação da versão de teste e 30% quando entram em uso/);
  assert.match(secao, /em até 7 dias corridos da assinatura, enquanto o trabalho não começou, a sua empresa pode desistir sem dar motivo e recebe de volta o valor integral/);
  assert.match(secao, /As outras etapas só são cobradas quando entregues/);
  assert.match(secao, /cancela com aviso de 30 dias, pelo mesmo canal em que contratou, e o mês já pago não é devolvido/);
  assert.match(secao, /Antes do mínimo de 3 meses, a multa é de no máximo 1 mensalidade/);
  assert.match(secao, /contas, dados e acessos são devolvidos à sua empresa no prazo escrito no contrato/);
  assert.doesNotMatch(secao, /R\$|\bMEI\b|Jéssica Gessoli|Pode Curtir/, "sem preço, sem rótulo MEI e sem citar as outras marcas");
  assert.match(h, /<h2>10\. Mudanças nesta página<\/h2>/);
  for (const p of ["index.html", "quem-somos.html", "proteger.html", "organizar.html", "crescer.html", "aconselhar.html", "conectar.html"]) {
    assert.match(ler(p), /<a href="\/privacidade#cancelamento">Cancelamento e devolução<\/a>/, p + ": link no rodapé");
  }
});
