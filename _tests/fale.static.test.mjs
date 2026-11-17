// Validação estática de /fale — sem dependências. Executar: node --test _tests/
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import vm from "node:vm";

const html = readFileSync(new URL("../fale.html", import.meta.url), "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const WA = "https://wa.me/5519981800221";

function runWith(search) {
  let target = null;
  const anchor = { href: "" };
  vm.runInNewContext(script, {
    URLSearchParams,
    encodeURIComponent,
    window: { location: { search, replace: (u) => { target = u; } } },
    document: { getElementById: () => anchor },
  });
  assert.equal(anchor.href, target, "link alternativo deve apontar para o mesmo destino");
  return target;
}

const msg = (u) => decodeURIComponent(u.split("?text=")[1]);

test("noindex e referrer restrito", () => {
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.match(html, /<meta name="referrer" content="origin">/);
});

test("hash da CSP corresponde ao script inline", () => {
  const hash = createHash("sha256").update(script).digest("base64");
  assert.ok(html.includes(`script-src 'sha256-${hash}'`), `hash esperado: ${hash}`);
});

test("fallback sem JS (meta refresh e link) usa a mensagem padrão do CONFIG", () => {
  const padrao = runWith("");
  assert.ok(html.includes(`<meta http-equiv="refresh" content="0; url=${padrao}">`));
  assert.ok(html.includes(`<a id="destino" href="${padrao}"`));
});

test("destino é sempre o WhatsApp oficial", () => {
  for (const qs of ["", "?utm_source=google", "?url=https://evil.example", "?utm_source=https://evil.example"]) {
    assert.ok(runWith(qs).startsWith(`${WA}?text=`), qs);
  }
});

test("mensagens contextuais por utm_source (case-insensitive) e UTMs adicionais aceitas", () => {
  assert.match(msg(runWith("?utm_source=google")), /no Google/);
  assert.match(msg(runWith("?utm_source=instagram")), /pelo Instagram/);
  assert.match(msg(runWith("?utm_source=LinkedIn&utm_medium=post&utm_campaign=c&utm_content=x&utm_term=y")), /pelo LinkedIn/);
  assert.match(msg(runWith("?utm_source=grc")), /estruturar GRC/);
  assert.match(msg(runWith("?utm_source=proteger")), /segurança gerenciada/);
  assert.match(msg(runWith("?utm_source=organizar")), /organizar e automatizar/);
  assert.match(msg(runWith("?utm_source=crescer")), /atrair mais clientes/);
  assert.match(msg(runWith("?utm_source=aconselhar")), /plataforma do meu curso ou produto digital/);
  assert.match(msg(runWith("?utm_source=podecurtir")), /Pode Curtir e quero um orçamento/);
  // 16/11/2026: origens da Jéssica Gessoli (jessicagessoli-*, diagnostico, teste-golpe) saíram; caem na mensagem da Zethic.
  for (const o of ["jessicagessoli", "jessicagessoli-vaga", "diagnostico", "teste-golpe", "diagnostico-resultado"]) {
    assert.equal(msg(runWith(`?utm_source=${o}`)), msg(runWith("")), o);
  }
  for (const o of ["grc", "governanca-ia", "patrimonio-digital"]) {
    assert.match(msg(runWith(`?utm_source=${o}`)), /^Olá, Jéssica!/, o);
  }
});

test("origem desconhecida ou maliciosa cai na mensagem padrão", () => {
  const padrao = runWith("");
  for (const s of ["desconhecido", "__proto__", "toString", "constructor", "%3Cscript%3Ealert(1)%3C/script%3E"]) {
    assert.equal(runWith(`?utm_source=${s}`), padrao, s);
  }
});

// 28/10/2026: a Zethic é tecnologia, automação e IA; consultoria, GRC e governança ficam com a Jéssica Gessoli.
test("mensagem padrão é a institucional, codificada corretamente", () => {
  assert.equal(
    msg(runWith("")),
    "Olá! Vim pelo site da Zethic e gostaria de conhecer melhor os serviços de tecnologia, automação e IA.",
  );
});

// 16/11/2026 (Jéssica: "não quero nada na Zethic"): o que é da Jéssica Gessoli saiu do /fale e de zethic.net.

// 14/10/2026 (decisão da Jéssica): o (19) 98180-0221 é o nível 1 da Zethic e da Jéssica Gessoli.
// 03/11/2026 (Ficha oficial): o (19) 98331-0769 passou a ser o WhatsApp da Pode Curtir; no /fale, só a origem podecurtir vai para ele.
test("origens da Zethic e da Jéssica vão para o 0221; a da Pode Curtir, para o 0769", () => {
  for (const o of ["", "?utm_source=site", "?utm_source=jessicagessoli", "?utm_source=jessicagessoli-palestras", "?utm_source=desconhecido"]) {
    assert.ok(runWith(o).startsWith(WA + "?text="), o || "padrão");
  }
  for (const o of ["?utm_source=podecurtir", "?utm_source=PodeCurtir&utm_medium=bio"]) {
    const u = runWith(o);
    assert.ok(u.startsWith("https://wa.me/5519983310769?text="), o);
    assert.match(msg(u), /Pode Curtir e quero um orçamento/, o);
  }
});

test("o 0769 não aparece nas páginas da Zethic", async () => {
  const { readdirSync } = await import("node:fs");
  const raiz = new URL("../", import.meta.url);
  const arquivos = [...readdirSync(raiz).filter((f) => /\.(html|txt|xml)$/.test(f)), ...readdirSync(new URL("_docs/", raiz)).filter((f) => f.endsWith(".html")).map((f) => "_docs/" + f)];
  // 03/11/2026: o /fale é a exceção, porque leva a origem podecurtir ao WhatsApp da Pode Curtir.
  // 04/11/2026: a página inicial da Pode Curtir também mostra o número dela no rodapé, como as páginas de compra.
  for (const p of arquivos.filter((f) => f !== "fale.html")) assert.doesNotMatch(readFileSync(new URL(p, raiz), "utf8"), /98331|0769|5519983310769/, p);
});
