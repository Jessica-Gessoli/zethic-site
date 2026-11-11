import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

// Padrão dos vídeos da Jéssica Gessoli no site (_docs/videos-site.md, 11/11/2026).
// Enquanto nenhuma página tiver <video>, os testes passam sem verificar nada.
const RAIZ = new URL("../", import.meta.url).pathname;
const paginas = [];
const varrer = (d) => {
  for (const n of readdirSync(join(RAIZ, d))) {
    const c = join(d, n);
    if (statSync(join(RAIZ, c)).isDirectory()) varrer(c);
    else if (c.endsWith(".html")) paginas.push(c);
  }
};
varrer("_fontes");

for (const p of paginas) {
  const html = readFileSync(join(RAIZ, p), "utf8");
  const videos = html.match(/<video[\s\S]*?<\/video>/g) ?? [];
  if (!videos.length) continue;
  test(`${p}: a política de segurança libera mídia só do próprio site`, () => {
    const csp = html.match(/Content-Security-Policy" content="([^"]+)"/)?.[1] ?? "";
    assert.match(csp, /media-src 'self'/);
  });
  videos.forEach((v, i) => {
    test(`${p}: vídeo ${i + 1} segue o padrão`, () => {
      assert.doesNotMatch(v, /\bautoplay\b/, "sem reprodução automática");
      assert.match(v, /\bcontrols\b/);
      assert.match(v, /preload="none"/);
      assert.match(v, /\bplaysinline\b/);
      assert.match(v, /poster="\/assets\/[^"]+\.jpg"/, "capa .jpg obrigatória");
      assert.match(v, /<track kind="captions" srclang="pt-BR"[^>]*src="\/assets\/[^"]+\.vtt"[^>]*default/, "legenda .vtt em português");
      assert.match(v, /type="video\/webm"/);
      assert.match(v, /type="video\/mp4"/);
      for (const arq of v.match(/\/assets\/[^"]+/g)) {
        assert.ok(existsSync(join(RAIZ, arq)), `arquivo ${arq} não existe`);
        if (/\.(mp4|webm)$/.test(arq)) assert.ok(statSync(join(RAIZ, arq)).size <= 3.5 * 1024 * 1024, `${arq} passa de ~3 MB`);
      }
    });
  });
}

test("o estilo do vídeo vertical existe", () => {
  const css = readFileSync(join(RAIZ, "assets/css/jessicagessoli-video.css"), "utf8");
  assert.match(css, /aspect-ratio:9\/16/);
});
