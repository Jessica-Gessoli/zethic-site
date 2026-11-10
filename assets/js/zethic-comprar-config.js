/* Zethic — configuração da compra online dos pacotes de entrada (/comprar). Protótipo de 06/11/2026.
   Decisão da Jéssica em 06/11/2026: a Zethic vende online só os pacotes de entrada, com preço; o resto segue por
   pedido de proposta em /loja, sem preço. Valores do material privado "Zethic — planos e valores" (06/11/2026).

   ASAAS_LINKS: link de pagamento do Asaas de cada item. Vazio = "pagamento em configuração": a página monta a mensagem
     do pedido para o WhatsApp e o e-mail, e a Zethic responde com o link. Regra de pagamento das três marcas (06/11/2026):
     Pix ou boleto, com vencimento escrito; atraso com multa de 2% e juros de 1% ao mês. Sem cartão na Zethic.
     Os planos mensais pedem assinatura no Asaas, uma por plano; a proteção por pessoa varia com o número de pessoas,
     então entra na mesma cobrança, pelo valor total que a página calcula.
     10/11/2026: cada cobrança que a página mostra para pagar agora tem a sua chave, com o valor exato
     (preço de fundador sem sufixo; preço de depois com "_depois"). O pedido só mostra os links quando todas as
     cobranças dele têm link; senão segue o fluxo manual. Proteção por pessoa e Black Week ficam sempre no manual.
       suporte_essencial            assinatura mensal R$ 145 (criado em 09/11/2026)
       suporte_essencial_implantacao  avulsa R$ 145        suporte_essencial_depois / _implantacao_depois  R$ 190
       suporte_padrao               assinatura mensal R$ 225 (criado em 09/11/2026)
       suporte_padrao_implantacao   avulsa R$ 225          suporte_padrao_depois / _implantacao_depois     R$ 290
       site_essencial_entrada       avulsa R$ 1.200 (40% de R$ 3.000)   site_essencial_entrada_depois  R$ 1.560
     Todos por Boleto bancário / Pix, limite de 3 vendas nos de fundador. O link plus_site_pix da Pode Curtir
     (R$ 3.000 à vista, https://www.asaas.com/000/c/bzy6eqhwdy5pq3pn) não serve aqui: esta página cobra 40% de entrada.
   FUNDADOR: true enquanto o pacote tiver vaga de fundador (3 primeiros clientes de cada pacote); false = preço depois. */
window.ZETHIC_COMPRA = {
  ASAAS_LINKS: {
    suporte_essencial: "https://www.asaas.com/000/c/2an08d2egagr2h6c",
    suporte_essencial_implantacao: "",
    suporte_essencial_depois: "",
    suporte_essencial_implantacao_depois: "",
    suporte_padrao: "https://www.asaas.com/000/c/jwndlm6fc17wcry3",
    suporte_padrao_implantacao: "",
    suporte_padrao_depois: "",
    suporte_padrao_implantacao_depois: "",
    site_essencial_entrada: "",
    site_essencial_entrada_depois: ""
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
