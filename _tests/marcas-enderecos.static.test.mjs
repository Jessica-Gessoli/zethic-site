import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// 10/11/2026 (Jéssica): cada marca tem um endereço só. Regras em _docs/marcas-enderecos.md.
const RAIZ = fileURLToPath(new URL("..", import.meta.url));
const ler = (p) => readFileSync(join(RAIZ, p), "utf8");
function html(dir, fora = []) {
  const out = [];
  for (const n of readdirSync(join(RAIZ, dir))) {
    const p = join(dir, n);
    if (fora.some((f) => p === f || p.startsWith(f + "/"))) continue;
    if (statSync(join(RAIZ, p)).isDirectory()) out.push(...html(p, fora));
    else if (n.endsWith(".html")) out.push(p);
  }
  return out;
}
// O que o Jekyll publica em zethic.net: tudo fora de pastas que começam com _ ou . (e fora de campaigns, excluída no _config.yml).
const publicadas = html(".", []).filter((p) => !relative(".", p).split("/").some((s) => s.startsWith("_") || s.startsWith(".")) && !p.startsWith("campaigns/"));
const redireciona = (h) => /<meta http-equiv="refresh"/.test(h) && !/<main|<h1/.test(h);
const MARCAS = ["jessicagessoli.html", "en/jessicagessoli.html", "jessicagessoli/", "podecurtir.html", "podecurtir/"];

// 10/11/2026 (Jéssica, "apague os links antigos"): só o início de cada marca continua em zethic.net, levando ao
// subdomínio (currículo, kit, guia e Sympla já distribuídos imprimem esses dois endereços). O resto dá 404.
test("zethic.net não mostra mais páginas das marcas: só o início de cada uma redireciona; o resto foi apagado", () => {
  const antigas = publicadas.filter((p) => MARCAS.some((m) => p === m || p.startsWith(m)));
  assert.deepEqual(antigas.sort(), ["en/jessicagessoli.html", "jessicagessoli.html", "podecurtir.html"]);
  for (const p of antigas) {
    const h = ler(p);
    assert.ok(redireciona(h), p + " ainda tem conteúdo");
    assert.match(h, /<link rel="canonical" href="https:\/\/(jessicagessoli|podecurtir)\.zethic\.net\/(en\/)?">/, p);
    assert.match(h, /<meta name="robots" content="noindex/, p);
  }
});

test("páginas da Zethic com conteúdo não levam às cópias antigas das marcas", () => {
  for (const p of publicadas.filter((p) => !redireciona(ler(p)))) {
    assert.doesNotMatch(ler(p), /(href|action|src)="(https:\/\/zethic\.net)?\/(podecurtir|jessicagessoli|en\/jessicagessoli)([\/"#?])/, p);
  }
});

// 12/11/2026 (Jéssica): a Pode Curtir tem a fonte no repositório podecurtir-site; aqui só fica a Jéssica Gessoli.
test("sites das marcas não levam a zethic.net/<marca>; o link entre marcas usa o subdomínio", () => {
  for (const m of ["jessicagessoli-site"]) {
    for (const p of html("_marcas/" + m, ["_marcas/" + m + "/_tests"])) {
      assert.doesNotMatch(ler(p), /https:\/\/zethic\.net\/(podecurtir|jessicagessoli|en\/jessicagessoli)([\/"#?])/, p);
    }
  }
});

test("mesma estrutura nas três marcas: loja, pedido recebido, termos, privacidade e desistência", () => {
  for (const m of ["jessicagessoli-site"]) {
    for (const p of ["index.html", "loja/index.html", "loja/obrigado/index.html", "termos/index.html", "privacidade/index.html", "desistencia/index.html"]) {
      assert.ok(existsSync(join(RAIZ, "_marcas", m, p)), `${m}/${p}`);
    }
  }
  for (const p of ["index.html", "loja.html", "loja/obrigado/index.html", "comprar.html", "privacidade.html"]) assert.ok(existsSync(join(RAIZ, p)), p);
  // 10/11/2026 (Jéssica): apagados os endereços antigos da raiz que nenhum PDF distribuído usa.
  // Ficam /diagnostico, /teste-ia, /teste-golpe e /vaga-real-ou-golpe, que os PDFs do Copia e Cola, do Prompt Joia e do guia levam.
  for (const f of ["diagnostico.html", "teste-ia.html", "teste-golpe.html", "vaga-real-ou-golpe.html"]) assert.ok(redireciona(ler(f)) && /noindex/.test(ler(f)), f);
  for (const f of ["loja-obrigado.html", "copia-e-cola.html", "prompt-joia.html", "conte-seu-golpe.html"]) assert.ok(!existsSync(join(RAIZ, f)), f + " devia estar apagado");
  assert.match(ler("loja.html"), /<a id="link-obrigado" href="\/loja\/obrigado\/" hidden>/);
});

test("nomes de endereço: português, minúsculas, sem acento, palavras com hífen", () => {
  const caminhos = [...publicadas, ...html("_marcas/jessicagessoli-site")]
    .filter((p) => !p.includes("/_tests/")).map((p) => p.replace(/^_marcas\/[a-z]+-site\//, "").replace(/(index)?\.html$/, ""));
  for (const c of caminhos) assert.match(c, /^[a-z0-9/-]*$/, c);
});

test("o documento das regras existe e cita os três endereços oficiais", () => {
  const d = ler("_docs/marcas-enderecos.md");
  for (const h of ["`zethic.net`", "`jessicagessoli.zethic.net`", "`podecurtir.zethic.net`"]) assert.ok(d.includes(h), h);
  assert.match(ler("_ferramentas/gerar_marcas.py"), /_docs\/marcas-enderecos\.md/);
});
