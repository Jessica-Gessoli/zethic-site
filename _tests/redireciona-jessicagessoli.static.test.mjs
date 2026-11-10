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

// 10/11/2026 (Jéssica, "apague os links antigos"): só zethic.net/jessicagessoli continua, levando ao subdomínio;
// os outros endereços antigos foram apagados. O PDF do guia fica no endereço do direct.
test("só o início da Jéssica Gessoli continua em zethic.net; os outros endereços antigos foram apagados", () => {
  const h = ler("jessicagessoli.html");
  const url = "https://jessicagessoli.zethic.net/";
  assert.ok(h.includes(`<link rel="canonical" href="${url}">`));
  assert.ok(h.includes(`<meta http-equiv="refresh" content="0; url=${url}">`));
  assert.match(h, /<meta name="robots" content="noindex, follow">/);
  assert.match(h, /<script src="\/assets\/js\/redireciona-marca\.js"><\/script>/);
  assert.doesNotMatch(h, /<main|<h1/, "ainda tem conteúdo");
  assert.ok(ler("en/jessicagessoli.html").includes('<meta http-equiv="refresh" content="0; url=https://jessicagessoli.zethic.net/en/">'), "currículo em inglês já enviado");
  for (const [arq] of antigos.slice(2)) {
    assert.ok(!existsSync(new URL("../" + arq, import.meta.url)), arq + " devia estar apagado");
    assert.ok(existsSync(new URL("../_fontes/" + arq, import.meta.url)), "fonte faltando: " + arq);
  }
  assert.ok(existsSync(new URL("../jessicagessoli/vaga-real-ou-golpe/guia-vaga-real-ou-golpe.pdf", import.meta.url)));
});

test("o redirecionamento leva junto ?parâmetros e #trecho", () => {
  const js = ler("assets/js/redireciona-marca.js");
  assert.match(js, /location\.replace\(c\.href\.split\("#"\)\[0\]\.split\("\?"\)\[0\] \+ location\.search \+ location\.hash\)/);
});

test("Jekyll não publica _fontes e o e-mail de pedido leva à loja no subdomínio", () => {
  assert.doesNotMatch(ler("_config.yml"), /include:[\s\S]*_fontes/);
  assert.match(ler("_ferramentas/apps-script/Codigo.gs"), /loja: "https:\/\/jessicagessoli\.zethic\.net\/loja\/"/);
});
