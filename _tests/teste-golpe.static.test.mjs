import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const html = readFileSync(new URL("../teste-golpe.html", import.meta.url), "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

test("CSP autoriza o script inline pelo hash correto", () => {
  const hash = createHash("sha256").update(script).digest("base64");
  assert.ok(html.includes(`'sha256-${hash}'`), "hash da CSP desatualizado");
});

test("as 10 situações têm código estável e único", () => {
  const ids = [...script.matchAll(/id: "(s\d{2}-[a-z0-9-]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, 10);
  assert.equal(new Set(ids).size, 10);
});

test("medição envia conclusão e erros só uma vez por visita", () => {
  assert.match(script, /zethicEvento\("teste_golpe_concluido", \{ acertos: acertos, nivel: nv\[0\] \}\)/);
  assert.match(script, /zethicEvento\("teste_golpe_erro", \{ situacao: Q\[i\]\.id, escolha:/);
  assert.match(script, /if \(!enviado && window\.zethicEvento\)/);
});

test("texto de privacidade da página não promete que nada é enviado", () => {
  assert.ok(!html.includes("Nada é enviado"));
});
