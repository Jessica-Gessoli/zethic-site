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
  // 06/11/2026, 23h22: a seção de atalhos saiu (repetia o contato); o princípio vem antes de Como contratar.
  assert.ok(h.indexOf('id="principio"') < h.indexOf('id="como-contratar"'));
});
