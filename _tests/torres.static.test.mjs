import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

// Zethic como hub (aprovado em 12/10/2026): barra das marcas em todas as páginas, menu das cinco frentes nas páginas da Zethic,
// página inicial com vitrine em movimento, cartões das frentes, porta da fundadora e atalhos.
// Os blocos do topo são gerados por _ferramentas/cabecalhos.py.
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

const FRENTES = { proteger: "p-seg", organizar: "p-tec", crescer: "p-mid", midia: "p-mid", capacitar: "p-tec" };

test("cada frente do menu abre um painel acessível, na cor do seu pilar", () => {
  const c = bloco(ler("index.html"), "cabecalho");
  for (const [id, pilar] of Object.entries(FRENTES)) {
    assert.match(c, new RegExp(`<li class="torre ${pilar}">\\s*<button type="button" class="torre-btn" aria-expanded="false" aria-controls="painel-${id}">`), id);
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

test("Jéssica Gessoli não é frente: só a porta \"Quem fundou a Zethic\" e a barra das marcas", () => {
  const h = ler("index.html");
  assert.doesNotMatch(bloco(h, "cabecalho"), /jessicagessoli|J[ée]ssica/);
  const main = h.match(/<main[\s\S]*?<\/main>/)[0];
  assert.equal((main.match(/href="\/jessicagessoli[^"]*"/g) || []).length, 1, "uma única porta para a página profissional");
  assert.match(main, /Quem fundou a Zethic/);
  assert.doesNotMatch(main, /mentoria|palestra|recoloca|kit-palestrante/i);
});

test("home: quatro destaques, um título principal e uma chamada principal", () => {
  const h = ler("index.html");
  const main = h.match(/<main[\s\S]*?<\/main>/)[0];
  assert.equal((main.match(/class="slide /g) || []).length, 4);
  assert.equal((main.match(/class="ponto p-[a-z]+(?: ativo)?"/g) || []).length, 4);
  assert.match(main, /<h1>Tecnologia, segurança e mídia digital para o Negócio\.<\/h1>/);
  assert.equal((h.match(/<h1[ >]/g) || []).length, 1);
  assert.equal((h.match(/class="btn btn-main"/g) || []).length, 1);
  assert.match(main, /<button type="button" class="pausa">Pausar<\/button>/);
  const cartoes = [...main.matchAll(/class="cartao (p-[a-z]+) revela"[\s\S]*?<h3>([^<]+)<\/h3>/g)].map((m) => [m[2], m[1]]);
  assert.deepEqual(cartoes, [["Proteger", "p-seg"], ["Organizar", "p-tec"], ["Crescer", "p-mid"], ["Mídia digital", "p-mid"], ["Capacitar e aconselhar", "p-tec"]]);
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

test("cores do sistema de design: pilares e tema claro", () => {
  const css = ler("assets/css/torres.css");
  for (const t of ["--pilar-seguranca:#00E5FF", "--pilar-tecnologia:#9B8CFF", "--pilar-midia:#FF5C9A", "--ciano-texto:#00E5FF"]) assert.ok(css.includes(t), t);
  const z = ler("assets/css/zethic.css");
  for (const t of ["--ciano-texto:#006E84", "--pilar-seguranca:#007A8F", "--pilar-tecnologia:#5B45E0", "--pilar-midia:#C2185B", "background:#F4F6FB"]) assert.ok(z.includes(t), t);
  for (const [p, pilar] of [["proteger.html", "p-seg"], ["organizar.html", "p-tec"], ["crescer.html", "p-mid"], ["aconselhar.html", "p-tec"]]) {
    const h = ler(p);
    assert.match(h, new RegExp(`<body class="frente ${pilar}">`), p);
    assert.match(h, /<p class="rotulo-pilar">/, p);
    assert.match(h, /<section class="alt papel"/, p);
  }
});

test("atendimento: raio de 100 km de Campinas com a cidade de São Paulo, sem \"remoto a partir de Campinas\"", () => {
  for (const p of [...ZETHIC, "podecurtir.html", "llms.txt"]) {
    assert.doesNotMatch(ler(p), /remoto, a partir de Campinas|Atendimento remoto|Remoto, também fora|Hortolândia, Jundiaí e região/, p);
  }
  for (const p of ["index.html", "quem-somos.html", "diagnostico.html", "podecurtir.html", "llms.txt"]) {
    assert.match(ler(p), /raio de 100 km de Campinas,? (?:SP, )?incluindo a cidade de São Paulo/, p);
  }
});

test("autoavaliação: a frase de privacidade segue a política", () => {
  const d = ler("diagnostico.html");
  assert.doesNotMatch(d, /nada é enviado/);
  assert.match(d, /não são enviadas nem guardadas/);
  assert.match(ler("privacidade.html"), /não são enviadas nem guardadas\. Se você aceitou a medição, só a nota final e a moeda mais exposta são registradas/);
});
