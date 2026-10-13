import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const raiz = new URL("../", import.meta.url);
const ler = (p) => readFileSync(new URL(p, raiz), "utf8");

test("Pode Curtir: cada trabalho leva direto ao reel no Instagram", () => {
  const h = ler("podecurtir.html");
  const reels = [...h.matchAll(/<a class="reel" href="([^"]+)"[\s\S]*?<\/a>/g)];
  assert.equal(reels.length, 2);
  for (const [bloco, url] of reels) {
    assert.match(url, /^https:\/\/www\.instagram\.com\/reel\/[A-Za-z0-9_-]+\/$/);
    const capa = bloco.match(/src="\/([^"]+)"/)[1];
    assert.ok(existsSync(new URL(capa, raiz)), capa);
    assert.match(bloco, /alt="[^"]+"/);
  }
  assert.doesNotMatch(h, /<video/);
});
