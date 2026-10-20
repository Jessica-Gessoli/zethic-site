import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

// 18/10/2026: páginas de captação da marca pessoal (Caderno Prompt Joia e teste de IA segura).
// 19/10/2026: a série e o caderno passam a se chamar "Copia e Cola"; /prompt-joia redireciona para /copia-e-cola.
// Regras: identidade da marca pessoal, sem preço, sem "PME", sem rastreador e sem coleta de dados.
const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const PAGINAS = ["copia-e-cola.html", "teste-ia.html"];
const WA = "https://wa.me/5519981800221?text=";
const texto = (h) => decodeURIComponent(h.split("?text=")[1]);

test("o caderno em PDF existe e a página leva a ele sem cadastro", () => {
  const pdf = readFileSync(new URL("../assets/docs/caderno-copia-e-cola.pdf", import.meta.url));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  const h = ler("copia-e-cola.html");
  assert.match(h, /<a class="btn" href="\/assets\/docs\/caderno-copia-e-cola\.pdf" type="application\/pdf" download>Baixar o caderno grátis \(PDF\)<\/a>/);
  assert.doesNotMatch(h, /<form|<input/);
});

test("sem rastreador, sem script inline e sem coleta", () => {
  for (const p of PAGINAS) {
    const h = ler(p);
    assert.match(h, /script-src 'self';/, p);
    assert.doesNotMatch(h, /<script>|googletagmanager|medicao\.js|analytics/, p);
    for (const src of h.match(/<script[^>]*src="([^"]+)"/g) || []) assert.match(src, /src="\/assets\/js\//, p);
  }
  for (const js of ["assets/js/teste-ia.js", "assets/js/compartilhar.js"]) {
    assert.doesNotMatch(ler(js), /localStorage|sessionStorage|document\.cookie|fetch\(|XMLHttpRequest|sendBeacon|zethicEvento/, js);
  }
});

test("identidade da marca pessoal, sem cores da Zethic nem da Pode Curtir", () => {
  for (const p of PAGINAS) {
    const h = ler(p);
    assert.match(h, /<link rel="stylesheet" href="\/assets\/css\/jessicagessoli\.css">/, p);
    assert.match(h, /class="g-j atual"/, p);
    assert.match(h, /<html lang="pt-BR">/, p);
  }
  const css = ler("assets/css/copia-e-cola.css");
  assert.doesNotMatch(css, /#00E5FF|#02041A|#FF5C9A|#FFD23F|#D4124A|cyan|pink|yellow/i);
});

test("sem preço, sem PME e sem emoji", () => {
  for (const p of [...PAGINAS, "assets/js/teste-ia.js"]) {
    const h = ler(p);
    assert.doesNotMatch(h, /R\$|\bPME\b|pequena e m[ée]dia empresa/i, p);
    assert.doesNotMatch(h, /\p{Extended_Pictographic}/u, p);
  }
});

test("LinkedIn sempre com o Instagram ao lado", () => {
  for (const p of PAGINAS) {
    const h = ler(p);
    const li = (h.match(/linkedin\.com\/in\/jessicagessoli/g) || []).length;
    const ig = (h.match(/instagram\.com\/jessicagessoli\//g) || []).length;
    assert.ok(ig >= li, `${p}: LinkedIn ${li}, Instagram ${ig}`);
  }
});

test("mensagens do WhatsApp vão para o número público com o texto combinado", () => {
  const h = ler("copia-e-cola.html");
  const links = [...h.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)].map((m) => m[1]);
  assert.ok(links.some((l) => l.startsWith(WA) && texto(l) === "Olá, Jéssica! Quero receber os próximos Copia e Cola."));
  assert.ok(links.some((l) => l.startsWith("https://wa.me/?text=") && texto(l) === "Olha este caderno com 26 prompts prontos para o Negócio: https://zethic.net/copia-e-cola.html"));
  const js = ler("assets/js/teste-ia.js");
  const wa = [...js.matchAll(/href: "(https:\/\/wa\.me\/[^"]+)"/g)].map((m) => m[1]);
  assert.ok(wa.some((l) => l.startsWith(WA) && texto(l) === "Olá, Jéssica! Fiz o teste de IA segura e quero conversar."));
  assert.ok(wa.some((l) => l.startsWith("https://wa.me/?text=") && texto(l) === "Faça este teste de 2 minutos: https://zethic.net/teste-ia.html"));
});

test("as 10 regras Antes de colar e a fonte da ANPD", () => {
  const h = ler("copia-e-cola.html");
  const regras = h.match(/<ol class="regras">([\s\S]*?)<\/ol>/)[1].match(/<li>/g);
  assert.equal(regras.length, 10);
  assert.match(h, /radar_tecnologico_ia_generativa_anpd\.pdf/);
  assert.match(h, /google_workspace_prompting_guide_abridged_smbs_startups_september2024\.pdf/);
});

test("teste: 10 perguntas com resposta de risco e dica, e aviso de privacidade", () => {
  const h = ler("teste-ia.html");
  const fs = [...h.matchAll(/<fieldset data-risco="(sim|nao)" data-curta="[^"]+" data-dica="[^"]+">\s*<legend>/g)];
  assert.equal(fs.length, 10);
  assert.deepEqual(fs.map((m) => m[1]), ["sim", "sim", "sim", "nao", "nao", "sim", "nao", "sim", "nao", "nao"]);
  assert.match(h, /Nenhuma resposta é salva ou enviada\. O teste roda só no seu navegador\./);
  const js = ler("assets/js/teste-ia.js");
  for (const f of ["Bom caminho. Mantenha as regras e revise a cada trimestre.", "Atenção. Há brechas que se resolvem com regras simples.", "Risco alto. Os dados do seu Negócio podem estar saindo pela IA."]) assert.ok(js.includes(f), f);
  assert.match(js, /n <= 2 \?[\s\S]*n <= 5 \?/);
});

test("links internos levam a páginas que existem e o mapa do site lista as duas", () => {
  for (const p of PAGINAS) {
    for (const [, l] of ler(p).matchAll(/href="\/([a-z-]+)(?:#[a-z-]+)?"/g)) assert.ok(existsSync(new URL(`../${l}.html`, import.meta.url)), `${p}: /${l}`);
  }
  const sm = ler("sitemap.xml");
  for (const u of ["copia-e-cola", "teste-ia"]) assert.match(sm, new RegExp(`<loc>https://zethic\\.net/${u}</loc>`));
  const pessoal = ler("jessicagessoli.html");
  assert.match(pessoal, /href="\/copia-e-cola"/);
  assert.match(pessoal, /href="\/teste-ia"/);
});

test("o nome antigo só sobrevive no redirecionamento de /prompt-joia", () => {
  for (const p of [...PAGINAS, "jessicagessoli.html", "llms.txt", "sitemap.xml", "assets/js/teste-ia.js", "assets/css/copia-e-cola.css"]) {
    assert.doesNotMatch(ler(p), /joia/i, p);
  }
  const r = ler("prompt-joia.html");
  assert.match(r, /<meta http-equiv="refresh" content="0; url=\/copia-e-cola">/);
  assert.match(r, /<link rel="canonical" href="https:\/\/zethic\.net\/copia-e-cola">/);
  assert.match(r, /<meta name="robots" content="noindex, follow">/);
  assert.match(r, /href="\/copia-e-cola"/);
  // Quem salvou o link direto do PDF antigo recebe o caderno novo (o GitHub Pages não redireciona arquivos).
  const novo = readFileSync(new URL("../assets/docs/caderno-copia-e-cola.pdf", import.meta.url));
  const antigo = readFileSync(new URL("../assets/docs/caderno-prompt-joia.pdf", import.meta.url));
  assert.ok(novo.equals(antigo));
});
