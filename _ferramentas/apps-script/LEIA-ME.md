# Pedidos, lembretes, caixa e tela de pedidos — instalação (grátis)

Tudo roda na sua conta Google, sem custo. Leva uns 20 minutos, uma vez só.

## O que este script faz

| O quê | Como |
|---|---|
| Guarda cada pedido do site | Aba **Pedidos** da planilha |
| Guarda cada pedido de desistência e te avisa por e-mail na hora | Aba **Desistências** |
| Confere no Asaas quem pagou, a cada 10 minutos | Aba **Vendas** (valor, taxa, líquido, data de crédito) |
| Lembretes de pedido não pago: 1 h, 24 h e 72 h depois | Só para quem marcou a opção no site. Para sozinho quando a pessoa paga ou clica em "não quero mais avisos" |
| Lista do dia para WhatsApp | Aba **WhatsApp**: mensagem pronta e botão "Abrir"; você toca e envia |
| Fluxo de caixa por marca e por mês | Aba **Resumo**. Você lança as despesas na aba **Saídas** |
| Tela de pedidos com som a cada venda | Abre no navegador do celular, tablet ou computador |
| Apaga pedidos não pagos depois de 90 dias | Como diz a Política de Privacidade |

Limites grátis do Google (contas gmail.com): 100 destinatários de e-mail por dia e 90 minutos de execução automática por dia. Para o volume atual, sobra.

## Passo a passo

1. **Crie a planilha.** Em drive.google.com → Novo → Planilhas Google. Nome sugerido: "Pedidos e caixa".
2. **Abra o editor de script.** Na planilha: Extensões → Apps Script.
3. **Cole o código.**
   - Apague o que estiver no arquivo `Código.gs` e cole todo o conteúdo de `Codigo.gs` desta pasta.
   - Clique no **+** ao lado de "Arquivos" → HTML → nome `Painel` (sem ".html") → cole o conteúdo de `Painel.html`.
   - Salve (ícone do disquete).
4. **Coloque a chave do Asaas** (só você faz; nunca mande pelo chat):
   - No Asaas: Integrações → Chave de API → gerar chave.
   - No Apps Script: ícone de engrenagem (Configurações do projeto) → Propriedades do script → Adicionar propriedade.
   - Propriedade: `ASAAS_API_KEY` · Valor: a chave.
5. **Rode a instalação.** No editor, escolha a função `configurar` no menu de cima e clique em **Executar**. O Google vai pedir autorização: escolha sua conta → "Avançado" → "Acessar (não seguro)" → Permitir. O aviso aparece porque o script é seu e não passou por revisão do Google; é o normal para scripts pessoais.
6. **Publique o endereço que recebe os pedidos.**
   - Implantar → Nova implantação → tipo "App da Web".
   - Executar como: **Eu**. Quem pode acessar: **Qualquer pessoa**.
   - Implantar → copie a URL que termina em `/exec`.
   - Volte em Propriedades do script e adicione `URL_PUBLICA` com essa URL (é usada no link "não quero mais avisos" dos e-mails).
   - **Me mande essa URL.** Eu coloco no site, nas lojas da Pode Curtir e da Jéssica Gessoli (é um endereço público por natureza; não é segredo). As duas lojas usam a mesma planilha; o número do pedido diz a marca (PC- ou JG-), e cada lembrete sai com o nome, o e-mail e o WhatsApp da marca certa.
7. **Publique a tela de pedidos.**
   - Implantar → Nova implantação → "App da Web" de novo.
   - Executar como: **Eu**. Quem pode acessar: **Somente eu**.
   - Copie essa segunda URL `/exec` e salve nos favoritos do aparelho onde a tela vai ficar aberta. Essa URL não vai para o site.
8. **Confirme os campos do Asaas.** Escolha a função `testarAsaas` → Executar → menu Ver → Registros. Aparece uma cobrança real. Me diga se aparecem os campos `value`, `netValue`, `status`, `customer`, `paymentLink` e `billingType` (pode mandar print cobrindo nome e e-mail do cliente).

## Usando no dia a dia

- **Tela de pedidos:** abra a URL do passo 7 e toque em **Ativar som** (os navegadores só liberam som depois de um toque). Deixe a tela aberta e o aparelho na tomada. Cada venda paga toca o alerta e aparece em **Novo**; toque em **Começar** e depois em **Entregue**.
- **WhatsApp:** na aba WhatsApp, toque em **Abrir**, confira a mensagem e envie. Marque a caixa "Enviado".
- **Se alguém responder PARAR por e-mail ou WhatsApp:** na aba Pedidos, escreva `Sim` na coluna **Parar** daquele pedido.
- **Marca de cada venda:** sai do começo do nome do link no Asaas ("Pode Curtir · …", "Jéssica Gessoli · …", "Zethic · …"). Se aparecer "Sem marca", corrija na coluna Marca da aba Vendas; o script não sobrescreve o que você corrigir.
- **Pedido com vários itens:** só vira "Pago" quando a soma dos pagamentos cobre o pedido. Antes disso fica "Pago em parte", e o lembrete avisa que falta o restante. No cartão parcelado, a primeira parcela paga já conta como o item pago.
- **Despesas:** lance na aba Saídas (data, marca, descrição, categoria, valor). O Resumo atualiza sozinho a cada 10 minutos.
- **Desistências:** chegam por e-mail e na aba Desistências. Prazo legal de 7 dias corridos.

## Ao mudar o código depois

Implantar → Gerenciar implantações → lápis em cada implantação → Versão: "Nova versão" → Implantar. Assim as URLs continuam as mesmas.

## O que ainda precisa ser confirmado

- **Nomes dos campos da API do Asaas** e o cabeçalho `access_token`: usei os nomes dos exemplos oficiais; o passo 8 confirma com uma cobrança real.
- **Cruzamento pedido ↔ pagamento** é feito pelo e-mail que o cliente usa no Asaas. Se ele usar outro e-mail, o pedido continua "Aguardando pagamento" e pode receber lembrete mesmo tendo pago; nesse caso, escreva `Pago` na coluna Situação.
- **Teto do MEI** no Resumo usa R$ 81.000 (valor em `TETO_MEI` no começo do código). Confira o valor vigente com a contabilidade.
- Na tela, "Em produção/Entregue" vale para os últimos 30 dias de vendas.
