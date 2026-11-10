/* Zethic — configuração da compra online dos pacotes de entrada (/comprar). Protótipo de 06/11/2026.
   Decisão da Jéssica em 06/11/2026: a Zethic vende online só os pacotes de entrada, com preço; o resto segue por
   pedido de proposta em /loja, sem preço. Valores do material privado "Zethic — planos e valores" (06/11/2026).

   ASAAS_LINKS: link de pagamento do Asaas de cada item. Vazio = "pagamento em configuração": a página monta a mensagem
     do pedido para o WhatsApp e o e-mail, e a Zethic responde com o link. Regra de pagamento das três marcas (06/11/2026):
     Pix ou boleto, com vencimento escrito; atraso com multa de 2% e juros de 1% ao mês. Sem cartão na Zethic.
     Os planos mensais pedem assinatura no Asaas, uma por plano; a proteção por pessoa varia com o número de pessoas,
     então entra na mesma cobrança, pelo valor total que a página calcula.
     09/11/2026: a Jéssica criou no Asaas (Boleto bancário / Pix, limite de 3 vendas, preço de fundador, valor cheio):
       suporte_essencial R$ 145/mês https://www.asaas.com/000/c/2an08d2egagr2h6c
       suporte_padrao R$ 225/mês https://www.asaas.com/000/c/jwndlm6fc17wcry3
       site_essencial: o link plus_site_pix da Pode Curtir, R$ 3.000 à vista https://www.asaas.com/000/c/bzy6eqhwdy5pq3pn
     Ficam fora de ASAAS_LINKS porque esta página cobra outra coisa: preço de depois quando o fundador não é marcado,
     implantação + 1ª mensalidade no suporte e 40% de entrada no site. Ligar só quando os valores da página e do link baterem.
   FUNDADOR: true enquanto o pacote tiver vaga de fundador (3 primeiros clientes de cada pacote); false = preço depois. */
window.ZETHIC_COMPRA = {
  ASAAS_LINKS: {
    suporte_essencial: "",
    suporte_padrao: "",
    site_essencial: ""
  },
  FUNDADOR: {
    suporte_essencial: true,
    suporte_padrao: true,
    protecao: true,
    site_essencial: true
  },
  WHATSAPP: "5519981800221",
  WHATSAPP_TEXTO: "(19) 98180-0221",
  EMAIL: "contato@zethic.net"
};
