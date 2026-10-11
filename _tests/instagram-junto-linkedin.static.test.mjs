import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Regra pedida pela Jéssica em 11/10/2026: onde o site cita o LinkedIn pessoal dela, cita também o Instagram.
// O link das recomendações do LinkedIn fica fora da regra, porque aponta para um recurso que só existe lá.
const ler = (caminho) => readFileSync(new URL(`../${caminho}`, import.meta.url), "utf8");
const LINKEDIN = /href="https:\/\/www\.linkedin\.com\/in\/jessicagessoli\/?"/g;
const INSTAGRAM = /href="https:\/\/www\.instagram\.com\/jessicagessoli\/?"/g;

const arquivos = [
  "index.html",
  "jessicagessoli.html",
  "en/jessicagessoli.html",
  "_docs/kit-palestrante.html",
  "_docs/curriculo.html",
  "_docs/resume.html",
];

for (const arquivo of arquivos) {
  test(`${arquivo}: cada menção ao LinkedIn pessoal tem o Instagram ao lado`, () => {
    const texto = ler(arquivo);
    const linkedin = (texto.match(LINKEDIN) ?? []).length;
    const instagram = (texto.match(INSTAGRAM) ?? []).length;
    assert.ok(linkedin > 0, "o arquivo não cita o LinkedIn pessoal");
    assert.ok(instagram >= linkedin, `LinkedIn ${linkedin} vez(es), Instagram ${instagram} vez(es)`);
  });
}

for (const arquivo of ["jessicagessoli.html", "en/jessicagessoli.html"]) {
  test(`${arquivo}: dados estruturados listam LinkedIn e Instagram`, () => {
    const sameAs = ler(arquivo).match(/"sameAs":\s*\[([^\]]*)\]/)?.[1] ?? "";
    assert.match(sameAs, /https:\/\/www\.linkedin\.com\/in\/jessicagessoli"/);
    assert.match(sameAs, /https:\/\/www\.instagram\.com\/jessicagessoli\/"/);
  });

  test(`${arquivo}: o topo da página leva ao LinkedIn e ao Instagram`, () => {
    const acoes = ler(arquivo).match(/<div class="actions">[\s\S]*?<\/div>/)?.[0] ?? "";
    assert.match(acoes, /href="https:\/\/www\.linkedin\.com\/in\/jessicagessoli"/);
    assert.match(acoes, /href="https:\/\/www\.instagram\.com\/jessicagessoli\/"/);
  });
}
