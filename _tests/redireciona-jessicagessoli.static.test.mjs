import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

// 10/11/2026 (Jéssica): as páginas da Jéssica Gessoli saíram de zethic.net. As fontes ficam em _fontes/ (o Jekyll não
// publica pastas com _) e cada endereço antigo só redireciona para o mesmo endereço em jessicagessoli.zethic.net.
const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const antigos = [
  ["jessicagessoli.html", "/"], ["en/jessicagessoli.html", "/en/"],
  ...["loja", "loja/obrigado", "termos", "privacidade", "desistencia", "cancelamento", "checkup", "vaga-real-ou-golpe",
      "diagnostico", "teste-golpe", "teste-ia", "copia-e-cola", "conte-seu-golpe"].map((p) => [`jessicagessoli/${p}/index.html`, `/${p}/`]),
];

test("cada endereço antigo em zethic.net só redireciona para jessicagessoli.zethic.net", () => {
  for (const [arq, novo] of antigos) {
    const h = ler(arq);
    const url = `https://jessicagessoli.zethic.net${novo}`;
    assert.ok(h.includes(`<link rel="canonical" href="${url}">`), arq);
    assert.ok(h.includes(`<meta http-equiv="refresh" content="0; url=${url}">`), arq);
    assert.match(h, /<meta name="robots" content="noindex, follow">/, arq);
    assert.match(h, /<script src="\/assets\/js\/redireciona-marca\.js"><\/script>/, arq);
    assert.doesNotMatch(h, /<main|<h1/, arq + " ainda tem conteúdo");
    assert.ok(existsSync(new URL("../_fontes/" + arq, import.meta.url)), "fonte faltando: " + arq);
  }
});

test("o redirecionamento leva junto ?parâmetros e #trecho", () => {
  const js = ler("assets/js/redireciona-marca.js");
  assert.match(js, /location\.replace\(c\.href\.split\("#"\)\[0\]\.split\("\?"\)\[0\] \+ location\.search \+ location\.hash\)/);
});

test("Jekyll não publica _fontes e o e-mail de pedido leva à loja no subdomínio", () => {
  assert.doesNotMatch(ler("_config.yml"), /include:[\s\S]*_fontes/);
  assert.match(ler("_ferramentas/apps-script/Codigo.gs"), /loja: "https:\/\/jessicagessoli\.zethic\.net\/loja\/"/);
});
