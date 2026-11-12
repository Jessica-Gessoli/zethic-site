import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// 11/11/2026 (Jéssica): Checklist antigolpe para o Negócio (aprovado em 01/11/2026) publicado em Materiais grátis.
// O link vai no direct de quem comenta CHECKLIST. Regras: PDF sem cadastro, as 10 atitudes aprovadas, sem preço,
// sem "PME", sem emoji, sem rastreador e Instagram junto do LinkedIn.
const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const PAG = "_fontes/jessicagessoli/checklist-antigolpe/index.html";

test("o PDF existe, tem 1 página e a página leva a ele sem cadastro", () => {
  const pdf = readFileSync(new URL("../assets/docs/checklist-antigolpe-para-o-negocio.pdf", import.meta.url));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.equal((pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length, 1);
  const h = ler(PAG);
  assert.match(h, /<a class="btn" href="\/assets\/docs\/checklist-antigolpe-para-o-negocio\.pdf" type="application\/pdf" download>/);
  assert.doesNotMatch(h, /<form|<input/);
});

test("as 10 atitudes aprovadas e o que fazer se cair no golpe", () => {
  const h = ler(PAG);
  const itens = h.match(/<ol class="regras">([\s\S]*?)<\/ol>/)[1].match(/<li>/g);
  assert.equal(itens.length, 10);
  for (const t of ["Mudou a conta? Confirma.", "Dupla aprovação", "Palavra de segurança", "Treine a equipe", "MED (Mecanismo Especial de Devolução do Pix)"]) {
    assert.ok(h.includes(t), t);
  }
});

test("sem preço, sem PME, sem emoji, sem rastreador e Instagram junto do LinkedIn", () => {
  const h = ler(PAG);
  assert.doesNotMatch(h, /R\$|\bPME\b|pequena e m[ée]dia empresa/i);
  assert.doesNotMatch(h, /\p{Extended_Pictographic}/u);
  assert.match(h, /script-src 'self';/);
  assert.doesNotMatch(h, /<script>|googletagmanager|analytics/);
  const li = (h.match(/linkedin\.com\/in\/jessicagessoli/g) || []).length;
  const ig = (h.match(/instagram\.com\/jessicagessoli\//g) || []).length;
  assert.ok(ig >= li);
});

test("Materiais grátis da página inicial leva ao checklist", () => {
  const h = ler("_fontes/jessicagessoli.html");
  const bloco = h.split('id="materiais"')[1].split("</section>")[0];
  assert.match(bloco, /href="\/jessicagessoli\/checklist-antigolpe\/"/);
});
