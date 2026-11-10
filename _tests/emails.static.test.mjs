import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");

// Regra de 13/10/2026: contato@ é o e-mail geral do site; jessica.gessoli@ só na marca pessoal.
const GERAL = ["index.html", "quem-somos.html", "_fontes/jessicagessoli/diagnostico/index.html", "seguranca.html", "tecnologia.html",
  "atendimento.html", "_fontes/jessicagessoli/teste-golpe/index.html", "privacidade.html", "podecurtir.html",
  "agendar.html", "fale.html", "llms.txt", ".well-known/security.txt"];
const PESSOAL = ["_fontes/jessicagessoli.html", "_fontes/en/jessicagessoli.html"];

test("páginas gerais não usam o e-mail pessoal", () => {
  for (const p of GERAL) assert.doesNotMatch(ler(p), /jessica\.gessoli@zethic\.net/, p);
});

test("marca pessoal mantém jessica.gessoli@ e não usa contato@", () => {
  for (const p of PESSOAL) {
    assert.match(ler(p), /jessica\.gessoli@zethic\.net/, p);
    assert.doesNotMatch(ler(p), /contato@zethic\.net/, p);
  }
});

// 03/11/2026 (Ficha oficial): a Pode Curtir tem e-mail próprio, o mesmo da loja.
test("Pode Curtir mostra o e-mail próprio", () => {
  assert.match(ler("podecurtir.html"), /mailto:podecurtir@zethic\.net/);
  assert.doesNotMatch(ler("podecurtir.html"), /contato@zethic\.net/);
});
