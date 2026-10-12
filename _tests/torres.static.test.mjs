import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

// Zethic em torres (11/10/2026): barra do grupo em todas as páginas, menu das marcas nas páginas da Zethic,
// home com banners em movimento, cartões das marcas e atalhos. Os blocos são gerados por _ferramentas/cabecalhos.py.
const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const existe = (p) => existsSync(new URL("../" + p, import.meta.url));
const ZETHIC = ["index.html", "quem-somos.html", "diagnostico.html", "proteger.html", "organizar.html", "crescer.html", "aconselhar.html", "teste-golpe.html", "privacidade.html"];
const MARCAS = { "jessicagessoli.html": "g-j", "podecurtir.html": "g-p" };
const bloco = (html, nome) => html.match(new RegExp(`<!-- ${nome}:inicio -->([\\s\\S]*?)<!-- ${nome}:fim -->`))?.[1] ?? "";

test("barra do grupo em todas as páginas, com a marca da página destacada", () => {
  for (const p of [...ZETHIC, ...Object.keys(MARCAS)]) {
    const html = ler(p);
    const g = bloco(html, "grupo");
    assert.ok(g, `${p}: sem barra do grupo`);
    for (const [href, nome] of [["/", "Zethic"], ["/jessicagessoli", "Jéssica Gessoli"], ["/podecurtir", "Pode Curtir"]]) {
      assert.match(g, new RegExp(`href="${href}">${nome}</a>`), `${p}: ${nome}`);
    }
    const atual = MARCAS[p] ?? (p === "quem-somos.html" ? "g-q" : "g-z");
    assert.match(g, new RegExp(`class="${atual} atual"`), p);
    assert.equal((g.match(/ atual"/g) || []).length, 1, p);
    assert.match(html, /<link rel="stylesheet" href="\/assets\/css\/grupo\.css">/, p);
    assert.match(html, /style-src 'self'/, `${p}: a política de segurança precisa permitir as folhas de estilo do próprio site`);
    // A barra vem logo depois do atalho "Pular para o conteúdo", que continua sendo o primeiro item da página.
    assert.ok(html.indexOf('class="skip"') < html.indexOf("<!-- grupo:inicio -->"), p);
  }
});

test("menu das marcas igual em todas as páginas da Zethic", () => {
  const normalizar = (h) => h.replace(/utm_source=[a-z-]+/g, "").replace(/ aria-current="page"/g, "").replace(/href="#contato"/g, 'href="/#contato"');
  const modelo = normalizar(bloco(ler("index.html"), "cabecalho"));
  assert.ok(modelo);
  for (const p of ZETHIC) {
    const html = ler(p);
    assert.equal(normalizar(bloco(html, "cabecalho")), modelo, p);
    assert.match(html, /<script src="\/assets\/js\/torres\.js"><\/script>/, p);
    assert.match(html, /script-src 'self'/, `${p}: a política de segurança precisa permitir o script do próprio site`);
  }
});

test("cada marca do menu abre um painel acessível", () => {
  const c = bloco(ler("index.html"), "cabecalho");
  for (const id of ["zethic", "jessicagessoli", "podecurtir"]) {
    assert.match(c, new RegExp(`<button type="button" class="torre-btn" aria-expanded="false" aria-controls="painel-${id}">`), id);
    assert.match(c, new RegExp(`<div class="painel" id="painel-${id}">`), id);
  }
  assert.match(c, /class="menu-btn" aria-expanded="false" aria-controls="menu-principal"/);
});

test("todo link de serviço leva a uma página e a uma âncora que existem", () => {
  const html = ler("index.html");
  const links = new Set([...html.matchAll(/href="(\/(?:proteger|organizar|crescer|aconselhar|diagnostico|teste-golpe|quem-somos|jessicagessoli|podecurtir)(?:#[a-z-]+)?)"/g)].map((m) => m[1]));
  assert.ok(links.size >= 15, `só ${links.size} links`);
  for (const l of links) {
    const [caminho, ancora] = l.split("#");
    const arq = caminho.slice(1) + ".html";
    assert.ok(existe(arq), `${l}: página não existe`);
    if (ancora) assert.match(ler(arq), new RegExp(`id="${ancora}"`), `${l}: âncora não existe`);
  }
});

test("home: três banners, um título principal e uma chamada principal", () => {
  const h = ler("index.html");
  const main = h.match(/<main[\s\S]*?<\/main>/)[0];
  assert.equal((main.match(/class="slide /g) || []).length, 3);
  assert.equal((main.match(/class="ponto(?: ativo)?"/g) || []).length, 3);
  assert.equal((h.match(/<h1[ >]/g) || []).length, 1);
  assert.equal((h.match(/class="btn btn-main"/g) || []).length, 1);
  assert.match(main, /<button type="button" class="pausa">Pausar<\/button>/);
  assert.equal((main.match(/class="cartao c-[zjp]/g) || []).length, 3);
  assert.doesNotMatch(h, /98331|0769/);
});

test("imagens com texto alternativo e tamanho declarado", () => {
  for (const p of ZETHIC) {
    for (const img of ler(p).match(/<img[^>]*>/g) || []) {
      assert.match(img, /\balt="/, `${p}: ${img}`);
      assert.match(img, /\bwidth="\d+" height="\d+"/, `${p}: ${img}`);
      const src = img.match(/src="\/([^"]+)"/)?.[1];
      if (src) assert.ok(existe(src), `${p}: imagem não encontrada ${src}`);
    }
  }
});

test("movimento respeita quem pede menos movimento", () => {
  const css = ler("assets/css/torres.css");
  const calmo = css.slice(css.indexOf("@media (prefers-reduced-motion:reduce)"));
  assert.ok(calmo.length > 100);
  for (const s of [".slide.ativo .slide-img img", "html.js .revela", ".ponto.ativo .barra"]) assert.ok(calmo.includes(s), s);
  const js = ler("assets/js/torres.js");
  assert.match(js, /prefers-reduced-motion: reduce/);
  assert.match(js, /pausadoPeloUsuario = calmo/);
});
