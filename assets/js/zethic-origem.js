/* Origem da visita (07/11/2026): guarda utm_source, utm_campaign e utm_medium só nesta aba do navegador
   (sessionStorage, sem cookie) e devolve uma linha para o pedido da loja. Assim a Jéssica sabe qual campanha
   ou qual venda casada trouxe o pedido, mesmo sem a medição de visitas aceita. Nada é enviado sozinho:
   a origem só sai do navegador dentro da mensagem do pedido que a própria pessoa envia. */
(function () {
  var CHAVE = "zethic-origem";
  var q = new URLSearchParams(location.search), o = {};
  ["utm_source", "utm_campaign", "utm_medium"].forEach(function (k) { if (q.get(k)) o[k.replace("utm_", "")] = q.get(k).slice(0, 60); });
  try {
    if (Object.keys(o).length) sessionStorage.setItem(CHAVE, JSON.stringify(o));
    else if (!sessionStorage.getItem(CHAVE) && document.referrer && document.referrer.indexOf(location.host) < 0) {
      sessionStorage.setItem(CHAVE, JSON.stringify({ source: new URL(document.referrer).hostname }));
    }
  } catch (e) {}
  window.zethicOrigem = function () {
    try {
      var s = JSON.parse(sessionStorage.getItem(CHAVE) || "null");
      if (!s) return "";
      return [s.source, s.campaign, s.medium].filter(Boolean).join(" · ");
    } catch (e) { return ""; }
  };
})();
