import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");

// 03/11/2026 (aprovado pela Jéssica, estratégia "21 lições"): princípio público da Zethic na home.
test("home publica o princípio 'Seus dados, suas contas, seus acessos'", () => {
  const h = ler("index.html");
  assert.match(h, /<section id="principio" class="principio">/);
  assert.match(h, /<h2 class="revela">Seus dados, suas contas, seus acessos<\/h2>/);
  assert.match(h, /fica registrado no nome do cliente/);
  assert.match(h, /sem pedir senha/);
  assert.ok(h.indexOf('id="principio"') < h.indexOf('class="atalhos"'));
});
