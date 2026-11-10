// 07/11/2026 (aprovado pela Jéssica): a faixa da campanha muda sozinha pela data, de 07/11/2026 ao Carnaval (10/02/2027).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const js = ler("assets/js/jessicagessoli-campanha.js");
const fases = [...js.matchAll(/de: "(\d{4}-\d{2}-\d{2})", ate: "(\d{4}-\d{2}-\d{2})"/g)].map((m) => [m[1], m[2]]);

test("as fases cobrem de 07/11/2026 a 10/02/2027, sem buraco e sem sobreposição", () => {
  assert.equal(fases[0][0], "2026-11-07");
  assert.equal(fases.at(-1)[1], "2027-02-10");
  for (let i = 1; i < fases.length; i++) {
    const fim = new Date(fases[i - 1][1] + "T12:00:00Z");
    fim.setUTCDate(fim.getUTCDate() + 1);
    assert.equal(fases[i][0], fim.toISOString().slice(0, 10), "buraco ou sobreposição antes de " + fases[i][0]);
  }
});

test("a faixa entra em todas as páginas da jornada, sem script embutido novo", () => {
  for (const p of ["_fontes/jessicagessoli.html", "_fontes/jessicagessoli/loja/index.html", "_fontes/jessicagessoli/checkup/index.html", "_fontes/jessicagessoli/teste-golpe/index.html", "_fontes/jessicagessoli/diagnostico/index.html"]) {
    const h = ler(p);
    assert.match(h, /jessicagessoli-campanha\.js/, p);
    assert.match(h, /jessicagessoli-campanha\.css/, p);
    assert.match(h, /script-src 'self'/, p);
  }
});

test("datas da campanha batem com a loja: Checkup até 25/11 e aula a partir de 26/11", () => {
  const c = ler("assets/js/jessicagessoli-config.js");
  assert.match(c, /CHECKUP_VENDAS_ATE: "2026-11-25"/);
  assert.match(c, /AULA_VENDAS_DE: "2026-11-26"/);
  assert.match(js, /id: "bf-checkup", de: "2026-11-13", ate: "2026-11-25"/);
  assert.match(js, /id: "aula", de: "2026-11-26", ate: "2026-12-09"/);
});

test("textos da faixa seguem as regras da marca", () => {
  assert.ok(!/PME|pequena e média/i.test(js));
  assert.ok(!/Riscos e IA/.test(js));
});
