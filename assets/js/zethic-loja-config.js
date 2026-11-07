/* Zethic — configuração da loja (/loja). Decisão da Jéssica em 03/11/2026: a loja da Zethic é só de pedido de proposta.
   Nenhum preço no site: os valores vão no material "Zethic — planos e valores", enviado depois da conversa.

   FORM_ENDPOINT: webhook (por exemplo, do n8n) que recebe o pedido em JSON e responde 2xx.
     Vazio = o pedido é enviado pelo WhatsApp ou por e-mail, com a mensagem pronta.
     Ao preencher, acrescente o endereço do webhook em connect-src na Content-Security-Policy de loja.html;
     sem isso o navegador bloqueia o envio e a loja volta para o WhatsApp e o e-mail.
     Ao ligar o webhook, atualize também a política de privacidade (privacidade.html, seções 2 e 3): o pedido passa a ser
     enviado ao serviço que recebe o webhook.
   WHATSAPP: número comercial que atende a Zethic (decisão de 31/10/2026), só números, com 55 e DDD.
   EMAIL: e-mail público da Zethic. */
window.ZETHIC_LOJA = {
  FORM_ENDPOINT: "",
  WHATSAPP: "5519981800221",
  WHATSAPP_TEXTO: "(19) 98180-0221",
  EMAIL: "contato@zethic.net"
};
