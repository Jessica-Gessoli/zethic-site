import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");

test("security.txt tem contato oficial e validade em dia", () => {
  const s = ler(".well-known/security.txt");
  assert.match(s, /^Contact: mailto:jessica\.gessoli@zethic\.net$/m);
  const exp = new Date(s.match(/^Expires: (.+)$/m)[1]);
  assert.ok(exp > new Date(), "security.txt vencido: atualize o campo Expires (máximo de 1 ano)");
});

test("configuração publica .well-known e esconde o material interno", () => {
  const c = ler("_config.yml");
  assert.match(c, /include:\s*\n\s*- \.well-known/);
  assert.match(c, /- campaigns/);
  assert.match(c, /- jessicagessoli\.html/);
});

test("sitemap não lista páginas fora do ar", () => {
  assert.ok(!ler("sitemap.xml").includes("/jessicagessoli"));
});
