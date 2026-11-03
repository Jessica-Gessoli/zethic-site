/* Pode Curtir — configuração da loja e das páginas de compra (/podecurtir/loja, termos, privacidade, desistência).
   Um só lugar para preencher antes de publicar. Campos vazios deixam a função desligada, sem erro.

   ASAAS_LINKS: link de pagamento do Asaas de cada item (https://www.asaas.com/c/...). Vazio = "pagamento em configuração".
   PRECO_AJUSTE: preço atual do Ajuste de Perfil (500 do 1º ao 3º cliente, 750 do 4º ao 6º, 1200 a partir do 7º).
     Ao trocar o preço, troque também ASAAS_LINKS.ajuste pelo link do novo valor.
   VAGAS_500_RESTANTES: número de vagas que ainda restam a R$ 500 (0 a 3). null = não mostra contador.
   CHECKOUT_ENDPOINT: webhook do n8n que cria o checkout do Asaas com vários itens e devolve {"url": "..."}.
   FORM_ENDPOINT: webhook do n8n que recebe pedidos de proposta, registros de aceite e pedidos de desistência.
     Os dois endereços precisam estar em connect-src da Content-Security-Policy de cada página.
   PIXEL_ID: ID do Pixel da Meta (só números). Vazio = sem Pixel e sem aviso de cookies.
   CNPJ: preencher só depois de confirmar que a consulta pública do CNPJ mostra o endereço comercial. */
window.PODECURTIR = {
  ASAAS_LINKS: {
    ajuste: "",
    arrumado: "",
    marca: "",
    essencial: "",
    padrao: ""
  },
  PRECO_AJUSTE: 500,
  VAGAS_500_RESTANTES: null,
  CHECKOUT_ENDPOINT: "",
  FORM_ENDPOINT: "",
  PIXEL_ID: "",
  CNPJ: "",
  WHATSAPP: "5519983310769",
  WHATSAPP_TEXTO: "(19) 98331-0769",
  EMAIL: "podecurtir@zethic.net"
};
