/* Jéssica Gessoli — configuração da loja e das páginas de compra (/jessicagessoli/loja, termos, privacidade, desistência).
   Um só lugar para preencher antes de publicar. Campos vazios deixam a função desligada, sem erro.

   ASAAS_LINKS: link de pagamento do Asaas de cada item (https://www.asaas.com/c/...). Vazio = "pagamento em configuração".
     consultoria: Consulta com retorno, 1 hora + 1 hora de retorno em até 30 dias (R$ 400; 09/11/2026) · sessao: mentoria de posicionamento, sessão avulsa (R$ 400)
     checkup: Checkup Black Friday Segura (R$ 297; aprovado em 06/11/2026)
     programa_pix e programa_cartao: programa de mentoria de 3 meses (R$ 3.200, pagamento integral; 04/11/2026):
       _pix para Pix ou boleto, à vista; _cartao só cartão, em até 3x sem juros · aula: aula ao vivo (R$ 97)
     06/11/2026: escopo (conversa de escopo, R$ 400) ·
       antigolpe_essencial_pix e _cartao (R$ 2.500; cartão em até 3x) · diagnostico_essencial_pix e _cartao (R$ 7.500;
       cartão em até 6x) · palestra_online (R$ 5.000, à vista)
     09/11/2026: os 12 links acima foram criados pela Jéssica no Asaas; os _cartao só aceitam cartão, sem juros para o cliente.
     08/11/2026 (Jéssica): a proteção das contas saiu desta loja e passou para a Zethic (faixa Leve junto da Pode Curtir).
   CHECKUP_VENDAS_DE e CHECKUP_VENDAS_ATE: primeiro e último dia de venda do Checkup (AAAA-MM-DD, horário de Brasília).
     Antes da abertura o item aparece com "vendas a partir de"; depois do último dia ele sai da loja.
   AULA_DATA: data e horário da próxima turma da aula ao vivo, como deve aparecer na loja (ex.: "26/11/2026, às 19h").
     Vazio = a aula aparece com "data em breve" e o botão vira "Avise-me quando abrir".
   AULA_VENDAS_DE e AULA_VENDAS_ATE (07/11/2026): primeiro e último dia de venda da turma (AAAA-MM-DD, Brasília).
     Antes da abertura, a loja mostra a data e o botão "Avise-me quando abrir"; depois do último dia, volta a "data em breve".
   CHECKOUT_ENDPOINT: webhook do n8n que cria o checkout do Asaas com vários itens e devolve {"url": "..."}.
   FORM_ENDPOINT: webhook do n8n que recebe pedidos de proposta, registros de aceite e pedidos de desistência.
     Os dois endereços precisam estar em connect-src da Content-Security-Policy de cada página.
   PIXEL_ID: ID do Pixel da Meta (só números). Vazio = sem Pixel e sem aviso de cookies.
   CNPJ: aparece no rodapé das páginas de compra (o cadastro público mostra o endereço comercial desde 24/10/2026). */
window.JESSICAGESSOLI = {
  ASAAS_LINKS: {
    consultoria: "https://www.asaas.com/000/c/jxk4eo1xj772iv57",
    checkup: "https://www.asaas.com/000/c/j6gedz7ocltnpkyb",
    sessao: "https://www.asaas.com/000/c/3rmf0lvzexssrhd0",
    programa_pix: "https://www.asaas.com/000/c/wds9bdzl3gjv0h04",
    programa_cartao: "https://www.asaas.com/000/c/3os6w9ygpkv7z6j1",
    aula: "https://www.asaas.com/000/c/su4d39uwgcfisgjc",
    escopo: "https://www.asaas.com/000/c/4h5kpzz3gl0ny2bx",
    antigolpe_essencial_pix: "https://www.asaas.com/000/c/3ta54onmficm6edr",
    antigolpe_essencial_cartao: "https://www.asaas.com/000/c/zwydiz1xqtdq0ugd",
    diagnostico_essencial_pix: "https://www.asaas.com/000/c/dugwbf96dbdvheoh",
    diagnostico_essencial_cartao: "https://www.asaas.com/000/c/icpo7yz08ey3kwql",
    palestra_online: "https://www.asaas.com/000/c/0ny6varbw4c5hgwb"
  },
  CHECKUP_VENDAS_DE: "2026-11-13",
  CHECKUP_VENDAS_ATE: "2026-11-25",
  AULA_DATA: "09/12/2026, às 20h",
  AULA_VENDAS_DE: "2026-11-26",
  AULA_VENDAS_ATE: "2026-12-09",
  CHECKOUT_ENDPOINT: "",
  FORM_ENDPOINT: "",
  PIXEL_ID: "",
  CNPJ: "67.678.226/0001-17",
  WHATSAPP: "5519981800221",
  WHATSAPP_TEXTO: "(19) 98180-0221",
  EMAIL: "jessica.gessoli@zethic.net"
};
