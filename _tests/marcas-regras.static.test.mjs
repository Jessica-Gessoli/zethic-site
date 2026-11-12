import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";

const ler = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");

test("Zethic: sem faixa de preço no topo da página inicial", () => {
  assert.doesNotMatch(ler("index.html"), /class="faixa"/);
});

test("Página profissional: a seção se chama Serviços", () => {
  const h = ler("_fontes/jessicagessoli.html");
  assert.match(h, /<a href="#trabalho">Serviços<\/a>/);
  assert.match(h, /<h2 id="t-trabalho">Serviços<\/h2>/);
  assert.doesNotMatch(h, /Como trabalhar comigo/);
});

// 14/10/2026 (aprovado pela Jéssica): símbolos novos das marcas. 28/10/2026: a Pode Curtir não cita mais a Zethic.
test("Símbolo: monograma JG", () => {
  const jg = ler("assets/img/jessicagessoli-icone.svg");
  assert.match(jg, /fill="#12352B"/);
  assert.doesNotMatch(jg, /<text/, "letras em contorno, não dependem de fonte instalada");
  // 12/11/2026: o visor da Pode Curtir e o teste dele foram para o repositório podecurtir-site.
});

// 14/10/2026 (aprovado pela Jéssica, orientação da Goreti): primeiro a conversa, depois o preço. Nenhum valor publicado no site.
test("Zethic: nenhum preço publicado nas páginas", () => {
  // 10/11/2026: o Diagnóstico é da Jéssica Gessoli, que publica preço na loja; saiu desta lista.
  for (const p of ["index.html", "seguranca.html", "tecnologia.html", "atendimento.html", "financeiro.html", "llms.txt"]) {
    const h = ler(p).replace(/<label>[^<]*\(R\$\)/g, "");
    assert.doesNotMatch(h, /R\$ ?\d|[Pp]reço de fundador|minPrice/, p);
  }
});

// 28/10/2026 (decisão da Jéssica): Zethic e Pode Curtir não se citam. O WhatsApp é compartilhado, e a mensagem
// da Pode Curtir cita redes sociais.
// Ficha v1.5 (03/11/2026): exceção única, a Pode Curtir como parceira de mídia num parágrafo class="parceria".
test("Pode Curtir: a Zethic não cita o Pode Curtir", () => {
  for (const p of ["index.html", "quem-somos.html", "seguranca.html", "tecnologia.html", "atendimento.html", "financeiro.html", "llms.txt"]) {
    assert.doesNotMatch(ler(p).replace(/<p class="parceria">[\s\S]*?<\/p>/g, ""), /pode ?curtir|podecurtir|Mídia digital|Orçamento de foto e vídeo/i, p);
  }
  // 12/11/2026: os botões da Pode Curtir vão direto ao WhatsApp dela; o /fale ainda atende links antigos com utm_source=podecurtir.
  assert.match(ler("fale.html"), /"podecurtir": "[^"]*redes sociais ou anúncios\."/);
  // 28/10/2026 (decisão da Jéssica): o rodapé da página dela não traz mais o título de fundadora da Zethic.
  assert.doesNotMatch(ler("_fontes/jessicagessoli.html").match(/<footer>[\s\S]*<\/footer>/)[0], /diretora executiva|Zethic/);
});

// 04/11/2026 (decisão da Jéssica): nome de cliente não aparece misturado com as marcas. As fotos da antiga seção de
// vídeos (pizzaria e dança) estavam sem uso desde 14/10/2026, mas continuavam no ar; saíram do site.
test("site: sem arquivo público com nome de cliente e sem as fotos da antiga seção de vídeos", () => {
  const nomes = [];
  const andar = (dir) => {
    for (const e of readdirSync(new URL("../" + dir, import.meta.url), { withFileTypes: true })) {
      if (e.isDirectory()) andar(dir + e.name + "/"); else nomes.push(dir + e.name);
    }
  };
  andar("assets/");
  for (const n of nomes) {
    // 11/11/2026 (Jéssica, decisão de 10/11/2026): o caso Água na Boca entra no site, só com arquivos agua-na-boca_virginia-*.
    const semCaso = n.replace(/^assets\/(img|video)\/agua-na-boca_virginia-[a-z0-9-]+\.(webp|jpg|mp4)$/, "");
    assert.doesNotMatch(semCaso, /torre-de-prata|torre_de_prata|agua-?na-?boca|aguanaboca|excellent|lucinha|pizzaria/i, n);
  }
  assert.ok(!existsSync(new URL("../assets/video/pode-curtir-torre-de-prata.jpg", import.meta.url)));
  assert.ok(!existsSync(new URL("../assets/video/pode-curtir-danca.jpg", import.meta.url)));
});
