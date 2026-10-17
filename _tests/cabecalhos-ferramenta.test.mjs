import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// A ferramenta _ferramentas/cabecalhos.py gera a barra das marcas e o cabeçalho das páginas.
// Em 15/10/2026 ela estava defasada em relação ao PR #38: se fosse rodada, tirava o símbolo do logo de 9 páginas.
// Este teste roda a ferramenta só para conferir (sem gravar) e falha se alguma página ficaria diferente do modelo.
const raiz = fileURLToPath(new URL("..", import.meta.url));

test("a ferramenta de cabeçalhos gera exatamente o que está nas páginas", () => {
  const r = spawnSync("python3", ["-B", "_ferramentas/cabecalhos.py", "--conferir"], { cwd: raiz, encoding: "utf8" });
  assert.equal(r.error, undefined, `não consegui rodar python3: ${r.error}`);
  assert.equal(r.status, 0, `páginas diferentes do modelo da ferramenta:\n${r.stdout}\n${r.stderr}`);
});

test("o modelo do logo inclui o símbolo do círculo com anel (PR #38)", () => {
  const r = spawnSync("python3", ["-B", "-c", "import importlib.util,sys;s=importlib.util.spec_from_file_location('c','_ferramentas/cabecalhos.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);print(m.LOGO)"], { cwd: raiz, encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /<img class="logo-simbolo" src="\/assets\/img\/zethic-marca\.svg" alt="" width="34" height="34">/);
});
