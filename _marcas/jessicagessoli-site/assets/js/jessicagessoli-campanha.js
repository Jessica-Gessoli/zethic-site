/* Jéssica Gessoli — faixa da campanha do momento, em todas as páginas da jornada (07/11/2026, aprovado pela Jéssica).
   A faixa muda sozinha pela data, no horário de Brasília, de 07/11/2026 ao Carnaval (10/02/2027), e some depois.
   Calendário: https://claude.ai/artifact/Fe9mQrURDMmbpp6b1f11gm · Plano: https://claude.ai/artifact/L7ZK6TeKstheQZCZYUmCMs
   Cada fase: de e ate (AAAA-MM-DD, inclusive), nome da campanha, texto, botão principal e, se houver, um link secundário.
   Os endereços começam pela página da marca, lida do link do cabeçalho: funcionam em zethic.net e no site próprio da marca.
   Para conferir uma data: abra a página com ?campanha-data=AAAA-MM-DD (só muda a faixa; nada é gravado). */
(function () {
  var C = window.JESSICAGESSOLI || {};
  var WHATS = C.WHATSAPP || "5519981800221";
  var FASES = [
    { id: "bf-lista", de: "2026-11-07", ate: "2026-11-12", nome: "Black Friday Segura",
      texto: "O Checkup Black Friday Segura abre em 13/11, com 8 vagas. Entre na lista de espera e compre antes de todo mundo.",
      cta: ["Entrar na lista de espera", "whats:QUERO entrar na lista de espera do Checkup Black Friday Segura"], sec: ["Fazer o Teste de golpe grátis", "teste"] },
    { id: "bf-checkup", de: "2026-11-13", ate: "2026-11-25", nome: "Black Friday Segura",
      texto: "Revise, antes da Black Friday, por onde o golpe entra na sua loja. Checkup por videochamada, R$ 297, 8 vagas, até 25/11.",
      cta: ["Ver o Checkup", "/checkup/"], sec: ["Fazer o Teste de golpe grátis", "teste"] },
    { id: "aula", de: "2026-11-26", ate: "2026-12-09", nome: "Fim de ano sem golpe",
      texto: "Aula ao vivo em 09/12, às 20h: IA segura para o seu Negócio, sem expor os dados dos seus clientes. R$ 97.",
      cta: ["Garantir a vaga na aula", "/loja/?comprar=aula"] },
    { id: "pre-janeiro", de: "2026-12-10", ate: "2026-12-23", nome: "Fim de ano sem golpe",
      texto: "Pague em dezembro, comece em janeiro: Programa Antigolpe Essencial para o Negócio com até 20 pessoas. R$ 2.500, em até 3x no cartão.",
      cta: ["Ver o Programa Antigolpe", "/loja/#item-antigolpe_essencial"], sec: ["Fazer o Teste de golpe grátis", "teste"] },
    { id: "virada", de: "2026-12-24", ate: "2027-01-03", nome: "Comece 2027 protegido",
      texto: "Descubra em 3 minutos onde a sua equipe está exposta a golpe. Teste grátis, com 10 situações reais.",
      cta: ["Fazer o Teste de golpe grátis", "teste"] },
    { id: "janeiro", de: "2027-01-04", ate: "2027-01-24", nome: "Janeiro: o Negócio protegido em 2027",
      texto: "Janeiro é o mês do boleto falso. Deixe por escrito, antes de pagar, quem confere o quê.",
      cta: ["Ver o Programa Antigolpe", "/loja/#item-antigolpe_essencial"], sec: ["Fazer o Teste de golpe grátis", "teste"] },
    { id: "carnaval", de: "2027-01-25", ate: "2027-02-05", nome: "Carnaval sem golpe",
      texto: "No Carnaval, a loja fica com menos gente olhando. Antes de sair, combine por escrito quem confere cada pagamento.",
      cta: ["Ver o Programa Antigolpe", "/loja/#item-antigolpe_essencial"], sec: ["Fazer o Teste de golpe grátis", "teste"] },
    { id: "carnaval-semana", de: "2027-02-06", ate: "2027-02-10", nome: "Carnaval sem golpe",
      texto: "Pix na pressa e perfil da loja invadido são os golpes desta semana. Veja se a sua equipe reconhece.",
      cta: ["Fazer o Teste de golpe grátis", "teste"] }
  ];

  function hoje() {
    var q = /[?&]campanha-data=(\d{4}-\d{2}-\d{2})/.exec(location.search);
    return q ? q[1] : new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10);
  }
  var h = hoje();
  var fase = null;
  for (var i = 0; i < FASES.length; i++) if (h >= FASES[i].de && h <= FASES[i].ate) { fase = FASES[i]; break; }
  if (!fase) return;

  /* Endereço da página da marca: "/jessicagessoli" em zethic.net, "" no site próprio. */
  var marca = document.querySelector(".top .mark, a.marca-jg");
  var base = marca ? (marca.getAttribute("href") || "/jessicagessoli").replace(/\/$/, "") : "/jessicagessoli";
  function url(dest) {
    if (dest === "teste") return base === "" ? "https://zethic.net/teste-golpe" : "/teste-golpe";
    if (dest.indexOf("whats:") === 0) return "https://wa.me/" + WHATS + "?text=" + encodeURIComponent(dest.slice(6));
    return base + dest;
  }
  function caminho(u) { return u.split(/[?#]/)[0].replace(/\/$/, ""); }
  var aqui = location.pathname.replace(/\/$/, "");
  var principal = url(fase.cta[1]);
  /* Na própria página do botão principal (a do Checkup, por exemplo), a faixa não aparece. */
  if (principal.charAt(0) === "/" && caminho(principal) === aqui && !/[#?]/.test(principal)) return;

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  var box = el("aside", "jg-campanha");
  box.setAttribute("aria-label", "Campanha do momento");
  box.setAttribute("data-fase", fase.id);
  var w = el("div", "jg-campanha-wrap");
  var t = el("div", "jg-campanha-texto");
  t.appendChild(el("span", "jg-campanha-nome", fase.nome));
  t.appendChild(el("p", null, fase.texto));
  w.appendChild(t);
  var acoes = el("div", "jg-campanha-acoes");
  function link(par, cls) {
    var a = el("a", cls, par[0]);
    var u = url(par[1]);
    a.href = u;
    if (/^https?:/.test(u)) a.rel = "noopener";
    a.addEventListener("click", function () {
      if (window.zethicEvento) window.zethicEvento("campanha_clique", { fase: fase.id });
      if (window.jgEvento) window.jgEvento("ViewContent", { content_name: "Campanha " + fase.id });
    });
    return a;
  }
  acoes.appendChild(link(fase.cta, "jg-campanha-cta"));
  if (fase.sec) acoes.appendChild(link(fase.sec, "jg-campanha-sec"));
  w.appendChild(acoes);
  box.appendChild(w);

  function por() {
    var cab = document.querySelector("body > header");
    if (cab && cab.parentNode) cab.parentNode.insertBefore(box, cab.nextSibling);
    else document.body.insertBefore(box, document.body.firstChild);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", por); else por();
})();
