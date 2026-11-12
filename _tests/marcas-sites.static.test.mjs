import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Decisão de 21/10/2026: o site próprio da Jéssica Gessoli é gerado de jessicagessoli.html. Mudou a página aqui, regenere _marcas.
// 12/11/2026 (Jéssica): a Pode Curtir tem a fonte e os testes no repositório podecurtir-site.
const raiz = fileURLToPath(new URL("../", import.meta.url));

test("_marcas está em dia com as páginas de origem", () => {
  const r = spawnSync("python3", ["-I", "_ferramentas/gerar_marcas.py", "--check"], { cwd: raiz, encoding: "utf8" });
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

for (const marca of ["jessicagessoli-site"]) {
  test(`testes do site ${marca} passam`, () => {
    const dir = `${raiz}_marcas/${marca}`;
    const arquivos = readdirSync(`${dir}/_tests`).filter(f => f.endsWith(".mjs")).map(f => `_tests/${f}`);
    const r = spawnSync(process.execPath, ["--test", ...arquivos], { cwd: dir, encoding: "utf8" });
    assert.equal(r.status, 0, r.stdout.split("\n").filter(l => /not ok|error/.test(l)).join("\n"));
  });
}
