import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");

// Regra de 13/10/2026: contato@ é o e-mail geral do site; jessica.gessoli@ só na marca pessoal.
const GERAL = ["index.html", "quem-somos.html", "_fontes/jessicagessoli/diagnostico/index.html", "seguranca.html", "tecnologia.html",
  "atendimento.html", "_fontes/jessicagessoli/teste-golpe/index.html", "privacidade.html",
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

// 12/11/2026: o teste do e-mail próprio da Pode Curtir (podecurtir@zethic.net) foi para o repositório podecurtir-site,
// que passou a ser a fonte da Pode Curtir.
