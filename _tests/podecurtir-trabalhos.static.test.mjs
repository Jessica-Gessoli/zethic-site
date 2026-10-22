import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");

// 14/10/2026 (pedido da Goreti, aprovado pela Jéssica): os vídeos de demonstração saem até haver vídeos com edição mais elaborada;
// a página fica só com texto. O título "Você curte, a gente registra." foi trocado por um título direto.
test("Pode Curtir: sem vídeos de demonstração e com título direto", () => {
  const h = ler("podecurtir.html");
  assert.doesNotMatch(h, /class="reel"|class="trabalhos"|<video/);
  assert.match(h, /<h1>Produtora de foto, vídeo e redes sociais\.<\/h1>/);
  assert.doesNotMatch(h + ler("index.html"), /Você curte, a gente registra/);
});

test("Zethic: sem faixa de preço no topo da página inicial", () => {
  assert.doesNotMatch(ler("index.html"), /class="faixa"/);
});

test("Página profissional: a seção se chama Serviços", () => {
  const h = ler("jessicagessoli.html");
  assert.match(h, /<a href="#trabalho">Serviços<\/a>/);
  assert.match(h, /<h2 id="t-trabalho">Serviços<\/h2>/);
  assert.doesNotMatch(h, /Como trabalhar comigo/);
});

// 14/10/2026 (aprovado pela Jéssica): símbolos novos das marcas e endosso da Zethic só em texto.
test("Símbolos: monograma JG e visor da Pode Curtir, com endosso só em texto", () => {
  const jg = ler("assets/img/jessicagessoli-icone.svg");
  assert.match(jg, /fill="#12352B"/);
  assert.doesNotMatch(jg, /<text/, "letras em contorno, não dependem de fonte instalada");
  const pc = ler("assets/img/podecurtir-icone.svg");
  assert.match(pc, /fill="#FFD23F"/);
  assert.match(ler("podecurtir.html"), /Pode Curtir é uma marca da <a href="\/">Zethic<\/a>\./);
  assert.doesNotMatch(ler("podecurtir.html"), /zethic-marca\.svg/);
});

// 14/10/2026 (aprovado pela Jéssica, orientação da Goreti): primeiro a conversa, depois o preço. Nenhum valor publicado no site.
test("Zethic: nenhum preço publicado nas páginas", () => {
  for (const p of ["index.html", "diagnostico.html", "proteger.html", "organizar.html", "crescer.html", "aconselhar.html", "llms.txt"]) {
    const h = ler(p).replace(/<label>[^<]*\(R\$\)/g, "");
    assert.doesNotMatch(h, /R\$ ?\d|[Pp]reço de fundador|minPrice/, p);
  }
});

// 21/10/2026 (retorno da Lucinha, aprovado pela Jéssica): a página diz logo no título que categoria a Pode Curtir é,
// e mostra a frente de redes sociais (Perfil Pronto e gestão mensal), sem preço e sem pedir senha.
test("Pode Curtir: categoria clara e frente de redes sociais", () => {
  const h = ler("podecurtir.html");
  assert.match(h, /<title>Pode Curtir \| Produtora de foto, vídeo e redes sociais em Campinas<\/title>/);
  assert.match(h, /<li id="redes">[\s\S]*Perfil Pronto[\s\S]*Gestão mensal[\s\S]*A gente não pede a sua senha\./);
  assert.doesNotMatch(h, /R\$ ?\d/);
  assert.doesNotMatch(h, /A publicação nas redes e os anúncios ficam com você/);
});

// Revisão do PR #58: a frente nova aparece no menu e no cartão da página inicial, o WhatsApp já cita redes sociais
// e a página da Jéssica Gessoli mantém a Zethic no rodapé, em texto.
test("Pode Curtir: redes sociais no menu, no cartão da home e na mensagem do WhatsApp", () => {
  assert.match(ler("index.html"), /<a href="\/podecurtir#redes"><strong>Redes sociais<\/strong>/);
  assert.match(ler("index.html"), /<li><a href="\/podecurtir#redes">Redes sociais<\/a><\/li>/);
  assert.match(ler("fale.html"), /"podecurtir": "[^"]*redes sociais\."/);
  assert.match(ler("jessicagessoli.html"), /<footer>[\s\S]*diretora executiva da <a href="\/">Zethic<\/a>[\s\S]*<\/footer>/);
});
