import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Política de privacidade (cancelamento e devolução) e llms.txt da Zethic.
const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const semTags = (h) => h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

// 04/11/2026: política de cancelamento e devolução da Zethic (antes em cancelamento.static.test.mjs).
test("Zethic: seção de cancelamento e devolução na página de privacidade e termos", () => {
  const h = ler("privacidade.html");
  const secao = semTags(h.split('<h2 id="cancelamento">')[1].split("<h2>")[0]);
  // 07/11/2026: versão 1.15, medição em todas as páginas da Zethic e origem do pedido.
  assert.match(h, /<p class="meta">Versão 1\.1[6-9], atualizada em [^<]*<\/p>/);
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





// Hub de 12/10/2026: o llms.txt é da Zethic e não cita as outras marcas (antes em jessicagessoli-en.static.test.mjs).
test("llms.txt só com a Zethic", () => {
  const llms = readFileSync(new URL("../llms.txt", import.meta.url), "utf8");
  assert.match(llms, /^# Zethic/);
  // Hub de 12/10/2026: a página profissional continua fora. Desde 28/10/2026 o Pode Curtir entra só como marca endossada.
  assert.doesNotMatch(llms, /jessicagessoli/i);
  assert.doesNotMatch(llms, /podecurtir/i); // 28/10/2026: Zethic e Pode Curtir não se citam
  assert.doesNotMatch(llms, /\bPME\b/);
});
