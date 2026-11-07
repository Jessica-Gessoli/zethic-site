/* Calendário de campanhas da Zethic até o Carnaval de 2027 (pedido da Jéssica em 07/11/2026, 07h35: "mude
   automaticamente em cada campanha de acordo com o calendário, sem eu precisar mexer até o Carnaval").
   Fonte das datas: documento "Campanhas de novembro ao Carnaval 2027" e o calendário publicado em
   https://claude.ai/artifact/5bowXCaqfR9HXsdS4uBRvX. Só campanhas da Zethic: as da Jéssica Gessoli e da
   Pode Curtir ficam nos sites delas (regra das marcas).

   O que este arquivo faz, em todas as páginas da Zethic:
   1. Escolhe a campanha do dia (horário de Brasília) e preenche a faixa do topo ([data-faixa-campanha]).
   2. Mostra ou esconde qualquer elemento com data-de="AAAA-MM-DD" e/ou data-ate="AAAA-MM-DD" (datas inclusivas).
   3. Diz à loja se é Black Week (window.zethicBlackWeek), para a condição de pagamento valer no carrinho.
   Depois de 10/02/2027 nenhuma faixa aparece e o site volta ao normal.
   Prévia: abra qualquer página com ?data=2026-12-12 (ou ?blackweek=1, que vale como 25/11/2026). */
(function () {
  // Ordem = prioridade: a primeira campanha cujo período inclui o dia é a que aparece na faixa.
  var CAMPANHAS = [
    { id: "black-week", de: "2026-11-23", ate: "2026-11-30", blackWeek: true,
      texto: "Black Week da Zethic, de 23 a 30/11: garanta a implantação de janeiro e pague a primeira mensalidade só em janeiro",
      link: "/comprar?pacote=equipe_pequena" },
    { id: "vagas-janeiro", de: "2026-11-16", ate: "2026-11-30",
      texto: "Vagas de implantação de janeiro abertas até 18/12: compre agora e comece 2027 com a TI do seu Negócio cuidada todo mês",
      link: "/comprar?pacote=equipe_pequena" },
    { id: "reforma-tributaria", de: "2026-12-01", ate: "2026-12-09",
      texto: "Vire o ano pronto para a Reforma Tributária: sistemas, notas e preços ajustados à CBS antes de 1º/01",
      link: "/financeiro#reforma-tributaria" },
    { id: "recesso-vendendo", de: "2026-12-10", ate: "2026-12-18",
      texto: "Última chamada até 18/12: vagas de janeiro e WhatsApp que atende sozinho no recesso",
      link: "/atendimento#whatsapp" },
    { id: "recesso", de: "2026-12-19", ate: "2027-01-03",
      texto: "Recesso de 19/12 a 3/01: a loja segue aberta e os pedidos são respondidos a partir de 4/01",
      link: "/comprar" },
    { id: "cbs-em-vigor", de: "2027-01-04", ate: "2027-01-15",
      texto: "A CBS já vale desde 1º/01: seus sistemas, notas e preços estão ajustados?",
      link: "/financeiro#reforma-tributaria" },
    { id: "comeco-de-ano", de: "2027-01-16", ate: "2027-01-31",
      texto: "Comece 2027 com a TI do seu Negócio cuidada todo mês: suporte, site e automação",
      link: "/para-o-seu-negocio" },
    { id: "carnaval-sem-susto", de: "2027-02-01", ate: "2027-02-05",
      texto: "Carnaval sem susto: site e WhatsApp atendendo enquanto você descansa",
      link: "/atendimento#whatsapp" },
    { id: "carnaval", de: "2027-02-06", ate: "2027-02-10",
      texto: "Bom Carnaval! A loja segue aberta e os pedidos são respondidos a partir de 11/02",
      link: "/comprar" }
  ];
  window.zethicCalendario = CAMPANHAS;

  function hojeBrasilia() {
    var q = location.search, m = /[?&]data=(\d{4}-\d{2}-\d{2})\b/.exec(q);
    if (m) return m[1];
    if (/[?&]blackweek=1\b/.test(q)) return "2026-11-25";
    // Brasília não tem horário de verão desde 2019: UTC-3 o ano inteiro.
    var d = new Date(Date.now() - 3 * 3600 * 1000);
    return d.toISOString().slice(0, 10);
  }
  var hoje = hojeBrasilia();
  var atual = null;
  for (var i = 0; i < CAMPANHAS.length; i++) if (hoje >= CAMPANHAS[i].de && hoje <= CAMPANHAS[i].ate) { atual = CAMPANHAS[i]; break; }
  window.zethicHoje = hoje;
  window.zethicCampanha = atual;
  window.zethicBlackWeek = !!(atual && atual.blackWeek);

  function comUtm(link, id) {
    var p = link.split("#"), base = p[0], sep = base.indexOf("?") < 0 ? "?" : "&";
    return base + sep + "utm_source=faixa&utm_campaign=" + id + (p[1] ? "#" + p[1] : "");
  }

  function aplicar() {
    var faixas = document.querySelectorAll("[data-faixa-campanha]");
    for (var f = 0; f < faixas.length; f++) {
      var el = faixas[f];
      if (!atual) { el.hidden = true; continue; }
      var a = document.createElement("a");
      a.href = comUtm(atual.link, atual.id);
      a.textContent = atual.texto;
      a.setAttribute("data-campanha", atual.id);
      var w = document.createElement("div");
      w.className = "wrap";
      w.appendChild(a);
      el.textContent = "";
      el.appendChild(w);
      el.hidden = false;
    }
    var datados = document.querySelectorAll("[data-de], [data-ate]");
    for (var j = 0; j < datados.length; j++) {
      var de = datados[j].getAttribute("data-de") || "0000-00-00", ate = datados[j].getAttribute("data-ate") || "9999-12-31";
      datados[j].hidden = !(hoje >= de && hoje <= ate);
    }
    if (window.zethicBlackWeek) document.documentElement.classList.add("black-week");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", aplicar); else aplicar();
})();
