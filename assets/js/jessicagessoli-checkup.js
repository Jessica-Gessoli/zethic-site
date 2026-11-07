/* Jéssica Gessoli — página do Checkup Black Friday Segura (/jessicagessoli/checkup/), 07/11/2026.
   Um botão só, que muda com as datas de venda (CHECKUP_VENDAS_DE e CHECKUP_VENDAS_ATE, horário de Brasília).
   Sem JavaScript, o botão leva ao Checkup na loja. */
(function () {
  var C = window.JESSICAGESSOLI || {};
  var a = document.getElementById("checkup-cta"), est = document.getElementById("checkup-estado");
  if (!a || !est) return;
  var hoje = new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10);
  var de = String(C.CHECKUP_VENDAS_DE || "").trim(), ate = String(C.CHECKUP_VENDAS_ATE || "").trim();
  var dataBR = function (d) { return d.split("-").reverse().slice(0, 2).join("/"); };
  var loja = a.getAttribute("href").split("#")[0];
  if (de && hoje < de) {
    a.textContent = "Vendas a partir de " + dataBR(de);
    a.removeAttribute("href"); a.setAttribute("aria-disabled", "true"); a.classList.add("checkup-espera");
    est.textContent = "Enquanto isso, faça o Teste de golpe grátis e veja onde a sua equipe está exposta.";
  } else if (ate && hoje > ate) {
    a.textContent = "Ver os serviços na loja";
    a.setAttribute("href", loja);
    est.textContent = "As vendas do Checkup Black Friday Segura terminaram em " + dataBR(ate) + ".";
  } else {
    a.textContent = "Comprar o Checkup · R$ 297";
    a.setAttribute("href", loja + "?comprar=checkup");
  }
  if (window.jgEvento) window.jgEvento("ViewContent", { content_name: "Checkup Black Friday Segura", value: 297, currency: "BRL" });
})();
