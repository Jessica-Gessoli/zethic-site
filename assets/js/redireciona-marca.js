/* Endereço antigo de uma marca em zethic.net: leva para o endereço oficial (link canônico da página),
   com os mesmos ?parâmetros e #trecho, para não perder a origem do pedido nem o item da loja (10/11/2026). */
(function () {
  var c = document.querySelector('link[rel="canonical"]');
  if (c) location.replace(c.href.split("#")[0].split("?")[0] + location.search + location.hash);
})();
