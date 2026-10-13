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
  assert.match(msg(runWith("?utm_source=diagnostico")), /autoavaliação de cibersegurança no site/);
  assert.match(msg(runWith("?utm_source=teste-golpe")), /Programa Antigolpe/);
  assert.match(msg(runWith("?utm_source=proteger")), /proteger o caixa/);
  assert.match(msg(runWith("?utm_source=organizar")), /organizar e automatizar/);
  assert.match(msg(runWith("?utm_source=crescer")), /atrair mais clientes/);
  assert.match(msg(runWith("?utm_source=aconselhar")), /decidir melhor/);
  assert.match(msg(runWith("?utm_source=podecurtir")), /Pode Curtir e quero um orçamento/);
  assert.match(msg(runWith("?utm_source=jessicagessoli")), /^Olá, Jéssica! Vim pela sua página e gostaria de conversar\.$/);
  assert.match(msg(runWith("?utm_source=jessicagessoli-mentoria")), /mentoria de posicionamento estratégico de negócio e carreira/);
  assert.match(msg(runWith("?utm_source=jessicagessoli-consultoria")), /conversa de 30 minutos/);
  assert.match(msg(runWith("?utm_source=jessicagessoli-palestras")), /palestra ou apresentação de evento/);
});

test("origem desconhecida ou maliciosa cai na mensagem padrão", () => {
  const padrao = runWith("");
  for (const s of ["desconhecido", "__proto__", "toString", "constructor", "%3Cscript%3Ealert(1)%3C/script%3E"]) {
    assert.equal(runWith(`?utm_source=${s}`), padrao, s);
  }
});

test("mensagem padrão é a institucional, codificada corretamente", () => {
  assert.equal(
    msg(runWith("")),
    "Olá! Vim pelo site da Zethic e gostaria de conhecer melhor os serviços de consultoria em cibersegurança, GRC e governança de IA.",
  );
});

test("resultado das iscas: mensagem montada só com números validados", () => {
  assert.equal(
    msg(runWith("?utm_source=diagnostico-resultado&nota=62&moeda=2")),
    "Olá! Fiz a autoavaliação de cibersegurança no site da Zethic. Minha nota foi 62 de 100 e a moeda mais exposta é Prevenção de fraude e de vazamento. Quero entender o próximo passo.",
  );
  assert.match(msg(runWith("?utm_source=teste-golpe-resultado&acertos=7")), /acertei 7 de 10\./);
  const diag = msg(runWith("?utm_source=diagnostico"));
  const golpe = msg(runWith("?utm_source=teste-golpe"));
  for (const qs of ["nota=101&moeda=2", "nota=50&moeda=6", "nota=-1&moeda=0", "nota=5e1&moeda=0", "nota=50", "nota=%3Cb%3E&moeda=1", "nota=50&moeda=__proto__"]) {
    assert.equal(msg(runWith(`?utm_source=diagnostico-resultado&${qs}`)), diag, qs);
  }
  for (const qs of ["acertos=11", "acertos=", "acertos=7%20ou%20mais", "acertos=0x7"]) {
    assert.equal(msg(runWith(`?utm_source=teste-golpe-resultado&${qs}`)), golpe, qs);
  }
});

test("nomes das moedas no /fale seguem a ordem da autoavaliação", () => {
  const diagHtml = readFileSync(new URL("../diagnostico.html", import.meta.url), "utf8");
  const daAutoavaliacao = [...diagHtml.matchAll(/\{ nome: "([^"]+)"/g)].map((m) => m[1]);
  const doFale = JSON.parse(script.match(/var MOEDAS = (\[[^\]]+\]);/)[1]);
  assert.deepEqual(doFale, daAutoavaliacao);
});
