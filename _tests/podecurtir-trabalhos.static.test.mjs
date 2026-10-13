import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";

const raiz = new URL("../", import.meta.url);
const ler = (p) => readFileSync(new URL(p, raiz), "utf8");

test("Pode Curtir mostra os trabalhos com vídeo leve e capa", () => {
  const h = ler("podecurtir.html");
  const videos = [...h.matchAll(/<video[^>]*>[\s\S]*?<\/video>/g)].map((m) => m[0]);
  assert.equal(videos.length, 2);
  for (const v of videos) {
    assert.match(v, /preload="none"/);
    assert.match(v, /playsinline/);
    const capa = v.match(/poster="\/([^"]+)"/)[1];
    const src = v.match(/src="\/([^"]+\.mp4)"/)[1];
    assert.ok(existsSync(new URL(capa, raiz)), capa);
    assert.ok(statSync(new URL(src, raiz)).size < 4 * 1024 * 1024, `${src} acima de 4 MB`);
  }
});
