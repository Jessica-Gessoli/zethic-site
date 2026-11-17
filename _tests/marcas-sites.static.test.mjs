import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// 12/11/2026 a Pode Curtir e 16/11/2026 a Jéssica Gessoli passaram a ter a fonte e os testes no próprio repositório.
// Aqui ficam só os endereços antigos de zethic.net, que levam aos sites delas.
const raiz = fileURLToPath(new URL("../", import.meta.url));

test("redirecionamentos das marcas em dia", () => {
  const r = spawnSync("python3", ["-I", "_ferramentas/gerar_marcas.py", "--check"], { cwd: raiz, encoding: "utf8" });
  assert.equal(r.status, 0, r.stdout + r.stderr);
});
