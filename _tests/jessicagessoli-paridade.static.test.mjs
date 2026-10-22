import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

// Estratégia de idiomas aprovada em 21/10/2026 (documento "Busca em outro idioma · Benchmark e BSC"):
// um endereço por idioma, as duas versões ligadas e sempre com as mesmas seções (objetivo P1 do BSC),
// sem redirecionamento automático por idioma (objetivo P2, regra do Google Search Central).
const pt = readFileSync(new URL("../jessicagessoli.html", import.meta.url), "utf8");
const en = readFileSync(new URL("../en/jessicagessoli.html", import.meta.url), "utf8");

// Cada par = [id da seção em português, id da mesma seção em inglês].
const pares = [
  ["t-traducao", "t-translation"],
  ["t-trabalho", "t-work"],
  ["t-areas", "t-areas"],
  ["t-trajetoria", "t-experience"],
  ["t-recomendacoes", "t-recommendations"],
  ["t-formacao", "t-education"],
  ["t-contato", "t-contact"],
];

// Exceção conhecida: "Materiais grátis" aponta para ferramentas só em português
// (/copia-e-cola e /teste-ia), feitas para o dono do Negócio no Brasil.
const soPortugues = ["t-materiais"];

const titulos = html => [...html.matchAll(/<h2 id="([^"]+)"/g)].map(m => m[1]);

test("as duas versões têm as mesmas seções, na mesma ordem", () => {
  const ptIds = titulos(pt).filter(id => !soPortugues.includes(id));
  const enIds = titulos(en);
  assert.deepEqual(ptIds, pares.map(p => p[0]), "seções da versão em português mudaram: atualize os pares");
  assert.deepEqual(enIds, pares.map(p => p[1]), "versão em inglês sem a seção correspondente");
});

test("publicações aparecem nas duas versões", () => {
  const conta = (html, re) => (html.match(re) || []).length;
  const bloco = (html, id) => ((html.split(`id="${id}"`)[1] || "").split("</dl>")[0]);
  const ptPub = conta(bloco(pt, "publicacoes"), /<dt>/g);
  const enPub = conta(bloco(en, "publications"), /<dt>/g);
  assert.ok(ptPub > 0, "versão em português sem publicações");
  assert.equal(enPub, ptPub, "número de publicações diferente entre as versões");
});

test("nenhuma página redireciona por idioma do navegador", () => {
  const html = [];
  const varre = dir => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith(".") || e.name === "node_modules") continue;
      const p = new URL(e.name + (e.isDirectory() ? "/" : ""), dir);
      if (e.isDirectory()) varre(p);
      else if (/\.(html|js)$/.test(e.name)) html.push([p.pathname, readFileSync(p, "utf8")]);
    }
  };
  varre(new URL("../", import.meta.url));
  for (const [caminho, texto] of html) {
    assert.ok(!/navigator\.languages?\b/.test(texto), `redirecionamento por idioma em ${caminho}`);
  }
});
