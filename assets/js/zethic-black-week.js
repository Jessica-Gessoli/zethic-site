/* Black Week da Zethic (aprovada pela Jéssica em 07/11/2026): de 23 a 30/11/2026, até a Cyber Monday.
   Condição de pagamento, não desconto: quem compra o suporte paga agora só a implantação e a primeira
   mensalidade vence em janeiro; bônus de 1 hora extra de suporte no primeiro mês. O preço não muda.
   Os elementos com data-black-week aparecem sozinhos em 23/11 e somem sozinhos em 01/12 (horário de Brasília).
   Para conferir antes: abra a página com ?blackweek=1. */
(function () {
  var INICIO = Date.parse("2026-11-23T00:00:00-03:00"), FIM = Date.parse("2026-12-01T00:00:00-03:00");
  var agora = Date.now(), previa = /[?&]blackweek=1\b/.test(location.search);
  window.zethicBlackWeek = previa || (agora >= INICIO && agora < FIM);
  function mostrar() {
    if (!window.zethicBlackWeek) return;
    var el = document.querySelectorAll("[data-black-week]");
    for (var i = 0; i < el.length; i++) el[i].hidden = false;
    document.documentElement.classList.add("black-week");
    if (window.zethicBlackWeekAtualizar) window.zethicBlackWeekAtualizar();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mostrar); else mostrar();
})();
