import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// 16/11/2026 (Jéssica: "solucionar definitivamente"): a Jéssica Gessoli saiu do zethic-site; a fonte dela é o
// repositório Jessica-Gessoli/jessicagessoli-site, com os testes da marca. Ficam aqui só as partes da Zethic que
// atendem a marca dela: /fale, a política de privacidade de zethic.net, o llms.txt e os endereços antigos.
const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const semTags = (h) => h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const fale = ler("fale.html");

// 04/11/2026: política de cancelamento e devolução da Zethic (antes em cancelamento.static.test.mjs).
test("Zethic: seção de cancelamento e devolução na página de privacidade e termos", () => {
  const h = ler("privacidade.html");
  const secao = semTags(h.split('<h2 id="cancelamento">')[1].split("<h2>")[0]);
  // 07/11/2026: versão 1.15, medição em todas as páginas da Zethic e origem do pedido.
  assert.match(h, /<p class="meta">Versão 1\.16, atualizada em 08\/11\/2026: o pedido de proposta da loja passa a ser registrado numa planilha da Zethic no Google\.<\/p>/);
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

// 21/10/2026: a política de zethic.net cobre o Conte o seu golpe (Jotform, IP) — antes em conte-seu-golpe.static.test.mjs.
test("a política de zethic.net cobre o Conte o seu golpe", () => {
  const pol = ler("privacidade.html");
  assert.match(pol, /Versão 1\.1[2-9]/);
  assert.match(pol, /Conte o seu golpe/);
  assert.match(pol, /Jotform/);
  assert.match(pol, /endereço IP de quem envia/);
  assert.match(pol, /até 12 meses/);
  assert.match(pol, /palavra-código/);
  assert.doesNotMatch(pol, /Este site não tem formulário/);
});

// O /fale monta as mensagens do guia Vaga real ou golpe? (antes em vaga-real-ou-golpe.static.test.mjs).
test("/fale tem as mensagens do guia Vaga real ou golpe?", () => {
  assert.match(fale, /"jessicagessoli-vaga": "Olá, Jéssica! [^"]*guia grátis Vaga real ou golpe\."/);
  assert.match(fale, /"jessicagessoli-vaga-rh": "Olá, Jéssica! [^"]*recrutamento da minha empresa[^"]*"/);
});

test("PDF do guia publicado para o link do direct", () => {
  const pdf = readFileSync(new URL("../assets/docs/guia-vaga-real-ou-golpe.pdf", import.meta.url));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.ok(pdf.length < 2_000_000, "PDF grande demais para o celular");
});

// 10/11/2026 (Jéssica): o endereço antigo fica, porque o PDF do guia já enviado leva a ele.
test("endereço antigo redireciona para o da marca e o PDF do direct continua publicado", () => {
  const antiga = readFileSync(new URL("../vaga-real-ou-golpe.html", import.meta.url), "utf8");
  assert.match(antiga, /<meta http-equiv="refresh" content="0; url=https:\/\/jessicagessoli\.zethic\.net\/vaga-real-ou-golpe\/">/);
  assert.match(antiga, /<meta name="robots" content="noindex, follow">/);
  const pdf = readFileSync(new URL("../jessicagessoli/vaga-real-ou-golpe/guia-vaga-real-ou-golpe.pdf", import.meta.url));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
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
