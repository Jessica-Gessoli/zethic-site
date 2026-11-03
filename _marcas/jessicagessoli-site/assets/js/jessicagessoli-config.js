/* Jéssica Gessoli — configuração da loja e das páginas de compra (/jessicagessoli/loja, termos, privacidade, desistência).
   Um só lugar para preencher antes de publicar. Campos vazios deixam a função desligada, sem erro.

   ASAAS_LINKS: link de pagamento do Asaas de cada item (https://www.asaas.com/c/...). Vazio = "pagamento em configuração".
     consultoria: 1 hora de consultoria (R$ 400) · sessao: mentoria de posicionamento, sessão avulsa (R$ 400)
     programa: entrada de 50% do programa de mentoria de 3 meses (R$ 1.600) · aula: aula ao vivo (R$ 97)
   AULA_DATA: data e horário da próxima turma da aula ao vivo, como deve aparecer na loja (ex.: "26/11/2026, às 19h").
     Vazio = a aula aparece com "data em breve" e o botão vira "Avise-me quando abrir".
   CHECKOUT_ENDPOINT: webhook do n8n que cria o checkout do Asaas com vários itens e devolve {"url": "..."}.
   FORM_ENDPOINT: webhook do n8n que recebe pedidos de proposta, registros de aceite e pedidos de desistência.
     Os dois endereços precisam estar em connect-src da Content-Security-Policy de cada página.
   PIXEL_ID: ID do Pixel da Meta (só números). Vazio = sem Pixel e sem aviso de cookies.
   CNPJ: aparece no rodapé das páginas de compra (o cadastro público mostra o endereço comercial desde 24/10/2026). */
window.JESSICAGESSOLI = {
  ASAAS_LINKS: {
    consultoria: "",
    sessao: "",
    programa: "",
    aula: ""
  },
  AULA_DATA: "",
  CHECKOUT_ENDPOINT: "",
  FORM_ENDPOINT: "",
  PIXEL_ID: "",
  CNPJ: "67.678.226/0001-17",
  WHATSAPP: "5519981800221",
  WHATSAPP_TEXTO: "(19) 98180-0221",
  EMAIL: "jessica.gessoli@zethic.net"
};
