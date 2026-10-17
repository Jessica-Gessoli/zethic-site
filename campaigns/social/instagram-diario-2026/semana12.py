# Post diário — semana 12 (03 a 09/01/2027). Transição: volta das férias e começo do ano organizado.
TAGS = "#cibersegurança #segurançadigital #empreendedorismo #golpe #donodenegocio"

POSTS = [
 dict(slug="2027-01-03-jogo-volta-ferias", serie="jogo", rede="instagram", data="2027-01-03T12:00:00", tipo="carrossel",
  slides=[
   ("cover", "Golpe ou não? Edição [[volta das férias]].", "Três mensagens, você decide →"),
   ("msg", "MENSAGEM 1 DE 3", "E-mail · Fornecedor Exemplo", "Feliz ano novo! Mudamos de banco. Pague hoje a fatura em aberto nesta nova conta para evitar multa. Dados em anexo."),
   ("resp", "GOLPE", "Conta nova, com pressa, por e-mail", "Troca de conta para pagamento se confirma por um telefone que você já tinha, antes de pagar. O e-mail pode ter sido imitado ou invadido."),
   ("msg", "MENSAGEM 2 DE 3", "Loja de aplicativos do celular", "Nova versão do aplicativo do seu banco disponível. Toque em Atualizar."),
   ("resp", "NÃO É GOLPE", "Atualizar pela loja é o caminho certo", "O aviso apareceu dentro da loja oficial do celular, sem link e sem pressa. Ainda assim, confira o nome do aplicativo e quem publicou antes de tocar."),
   ("msg", "MENSAGEM 3 DE 3", "WhatsApp · número desconhecido", "Oi! Sou cliente novo. Mandei o pedido neste arquivo, instala para ver as fotos dos produtos: <u>pedido-janeiro.exemplo</u>"),
   ("resp", "GOLPE", "Pedido não precisa ser instalado", "Foto e pedido se abrem sem instalar nada. Arquivo que pede instalação pode colocar um programa espião no celular. Peça as fotos direto na conversa."),
   ("end", "QUANTAS VOCÊ ACERTOU?", "Acertou as [[três]]? Desafia a família.", "Manda no grupo e vê quem acerta mais. Semana que vem tem mais.", "Compartilhar com a família"),
  ],
  texto="""Golpe ou não? Edição volta das férias. Três mensagens, você decide.

Na volta do recesso, a caixa de entrada está lotada e todo mundo quer resolver tudo rápido. É aí que o golpe passa.

Mensagem 1: "Mudamos de banco, pague hoje nesta nova conta." Golpe. Troca de conta se confirma por telefone que você já tinha.
Mensagem 2: aviso de atualização do app do banco dentro da loja oficial do celular. Não é golpe, mas confira o nome do app e quem publicou.
Mensagem 3: "cliente novo" pedindo para instalar um arquivo para ver o pedido. Golpe. Foto e pedido não precisam ser instalados.

O que levar daqui:
1. Fornecedor trocou de conta? Confirme por um telefone que você já tinha antes de pagar.
2. Atualização, só pela loja oficial do celular.
3. Arquivo que pede para instalar algo: não instale.

Quantas você acertou? Manda no grupo da família e vê quem acerta mais.

""" + TAGS),

 dict(slug="2027-01-04-golpe-ipva-falso", serie="golpe", rede="instagram", data="2027-01-04T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "IPVA por link? [[É golpe.]]", "", "WhatsApp · agora", "IPVA 2027 em aberto. Pague hoje por Pix e evite multa e juros: <u>ipva-pagamento.exemplo</u>"),
   ("text", "COMO FUNCIONA", "Site que copia o oficial", "Chega boleto falso ou mensagem por WhatsApp e e-mail. O link leva a um site que imita a página da Secretaria da Fazenda. Mensagem em nome do Detran também merece desconfiança."),
   ("text", "O QUE ELES QUEREM", "Que você pague no lugar errado", "O Pix ou o boleto vai para a conta do golpista, não para o estado. Você paga e o imposto continua em aberto."),
   ("list", "COMO SE PROTEGER", "Antes de pagar o IPVA", ["Em SP, a Fazenda não manda boleto, link ou cobrança por mensagem.", "Pague pelo Renavam no banco ou no site oficial da Secretaria da Fazenda.", "No Pix, o recebedor deve ser a Secretaria da Fazenda e Planejamento."]),
   ("end", "AGORA ME RESPONDE", "Quem paga o IPVA dos [[carros do Negócio]]?", "Salva e manda para essa pessoa antes do vencimento."),
  ],
  texto="""Golpe da semana: "IPVA em aberto. Pague hoje por Pix e evite multa."

Todo começo de ano é igual: chega a época do IPVA e chegam junto os boletos falsos, as mensagens por WhatsApp e e-mail e os sites que copiam a página oficial. Em janeiro de 2026, a Secretaria da Fazenda de São Paulo alertou que esses sites imitam a aparência da página dela para desviar o pagamento.

Como se proteger:
1. Em SP, a Fazenda informa que não envia boleto, mensagem, link nem cobrança por e-mail, aplicativo de mensagem ou rede social. Recebeu? Desconfie.
2. Pague pelo Renavam, no banco, no aplicativo do banco ou pelo site oficial.
3. No Pix, use só o site oficial da Secretaria da Fazenda e confira o recebedor: Secretaria da Fazenda e Planejamento, no Banco do Brasil.
4. Está em outro estado? Use só o site oficial da Secretaria da Fazenda do seu estado.

Quem paga o IPVA dos carros do Negócio? Salva e manda para essa pessoa antes do vencimento.

Fonte: Band, com orientações da Secretaria da Fazenda de SP (link no primeiro comentário).

#golpe #ipva #segurançadigital #empreendedorismo #donodenegocio""",
  fonte={"nome": "Band Vale: Procon Taubaté alerta contribuintes sobre golpes no pagamento do IPVA 2026", "url": "https://www.band.com.br/band-vale/noticias/procon-taubate-alerta-contribuintes-sobre-golpes-no-pagamento-do-ipva-2026-202601150919"}),

 dict(slug="2027-01-05-ia-calendario-contas", serie="ia", rede="instagram", data="2027-01-05T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Use a IA para montar o [[calendário de contas]] do ano.", "O pedido pronto para copiar →"),
   ("text", "O PROBLEMA", "Conta esquecida vira multa", "Imposto, aluguel, renovação do site, licença de sistema: cada um vence num mês. Quando a lista mora só na cabeça do dono, alguma coisa escapa."),
   ("text", "O PEDIDO PARA A IA", "Copie e adapte", "\"Monte uma tabela com as contas fixas de um Negócio de [seu ramo], com mês, quem paga e onde conferir o valor oficial.\" Depois, complete com o que é seu."),
   ("list", "CUIDADOS", "Antes de confiar na lista", ["Não coloque CPF, CNPJ, senha nem dado de cliente no pedido.", "Confira cada data no documento oficial, não na resposta da IA.", "Guarde a tabela onde a equipe que paga consegue ver."]),
   ("end", "AGORA ME RESPONDE", "Qual conta do Negócio [[sempre pega você]] de surpresa?", "Comenta aqui. A sua pode estar na lista de outro dono."),
  ],
  texto="""IA no Negócio: use a IA para montar o calendário de contas do ano.

Imposto, aluguel, renovação do site, licença de sistema. Cada um vence num mês diferente e, quando a lista mora só na cabeça do dono, alguma coisa escapa.

O pedido pronto para copiar:
"Monte uma tabela com as contas fixas de um Negócio de [seu ramo], com o mês de vencimento, quem paga e onde conferir o valor oficial."

Depois:
1. Complete a tabela com o que é do seu Negócio.
2. Não coloque CPF, CNPJ, senha nem dado de cliente no pedido.
3. Confira cada data no documento oficial. A IA ajuda a organizar, mas pode errar data.
4. Guarde a tabela onde quem paga as contas consegue ver.

Qual conta do Negócio sempre pega você de surpresa? Comenta aqui.

""" + TAGS),

 dict(slug="2027-01-06-mito-antivirus-basta", serie="mito", rede="instagram", data="2027-01-06T18:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Tenho antivírus, então estou protegido.\"", "Arrasta para ver por quê →", "MITO"),
   ("text", "POR QUE É MITO", "O antivírus não vê tudo", "Ele ajuda contra programas maliciosos. Mas não impede você de digitar a senha num site falso nem de pagar um boleto falso. Nesses golpes, quem age é você."),
   ("text", "ONDE O GOLPE ENTRA", "Pela conversa, não pelo vírus", "Mensagem com pressa, ligação convincente, link parecido com o oficial. Nada disso precisa de vírus para dar certo."),
   ("list", "O QUE FAZER", "Antivírus mais três hábitos", ["Mantenha o antivírus e o sistema atualizados.", "Senha só no app ou site que você abriu sozinho.", "Pagamento fora do comum: confirme por um telefone que você já tinha."]),
   ("end", "AGORA ME RESPONDE", "Você já achou que o [[antivírus]] resolvia tudo?", "Comenta aqui. Sem julgamento: muita gente acha."),
  ],
  texto="""Mito ou verdade: "Tenho antivírus, então estou protegido."

Mito. O antivírus ajuda contra programas maliciosos, e vale ter. Mas ele não impede você de digitar a senha num site falso nem de pagar um boleto falso. Nesses golpes, quem faz a ação é você, convencido por uma mensagem ou ligação.

O golpe entra pela conversa: pressa, link parecido com o oficial, pedido de pagamento fora do comum.

Antivírus mais três hábitos:
1. Mantenha o antivírus e o sistema do computador atualizados.
2. Senha só no app ou no site que você abriu sozinho.
3. Pagamento fora do comum: confirme por um telefone que você já tinha.

Você já achou que o antivírus resolvia tudo? Comenta aqui. Salva e manda para quem cuida do computador do Negócio.

""" + TAGS),

 dict(slug="2027-01-07-direct-emails-ferias", serie="direct", rede="instagram", data="2027-01-07T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Voltei e tem muito [[e-mail estranho]]. Apago tudo?\"", ""),
   ("text", "PRIMEIRO", "Não abra anexo nem link", "Na volta das férias, o volume engana. Antes de apagar, não clique em nada que você não esperava, mesmo que venha com nome conhecido."),
   ("list", "SEPARE EM TRÊS", "O que fazer com cada um", ["Golpe claro: marque como lixo eletrônico e apague.", "Parece de cliente ou fornecedor: confirme por telefone que você já tinha.", "Cobrança com pressa: confira no site oficial antes de pagar."]),
   ("text", "SE JÁ CLICOU", "Faça agora", "Se digitou senha, troque essa senha e ative a confirmação em duas etapas. Se pagou algo, ligue para o número oficial do banco."),
   ("end", "AGORA ME CONTA", "Qual a sua [[dúvida]] sobre golpe ou IA?", "Me manda no direct. A sua pode virar o post da próxima quinta."),
  ],
  texto="""Pergunta do direct: "Voltei das férias e tem muito e-mail estranho. Apago tudo?"

Pode apagar, mas com método. O volume da volta engana e é aí que a gente clica sem pensar.

1. Não abra anexo nem link de mensagem que você não esperava, mesmo com nome conhecido.
2. Golpe claro: marque como lixo eletrônico e apague.
3. Parece de cliente ou fornecedor, mas está estranho: confirme por um telefone que você já tinha.
4. Cobrança com pressa: confira no site oficial antes de pagar.
5. Se já clicou e digitou senha, troque essa senha e ative a confirmação em duas etapas. Se pagou algo, ligue para o número oficial do banco.

Qual a sua dúvida sobre golpe ou IA? Me manda no direct. A sua pode virar o post da próxima quinta.

""" + TAGS),

 dict(slug="2027-01-08-checklist-volta-ferias", serie="check", rede="instagram", data="2027-01-08T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "4 conferências na [[volta das férias]].", "Quantas você já fez? →", "1", "4"),
   ("list", "CONFERÊNCIAS 1 E 2", "Aparelhos e dinheiro", ["Atualize computadores e celulares que ficaram parados.", "Confira o extrato do Negócio no período em que ninguém estava olhando."]),
   ("list", "CONFERÊNCIAS 3 E 4", "E-mail e cópias", ["Veja se o e-mail tem regra de encaminhamento que você não criou.", "Confirme que a cópia de segurança dos arquivos continuou rodando."]),
   ("end", "AGORA ME RESPONDE", "Quantas das 4 [[você já fez]]?", "Comenta o número. Dá para fazer as que faltam ainda hoje."),
  ],
  texto="""Checklist de sexta: 4 conferências na volta das férias.

O Negócio ficou mais quieto, mas os golpes não tiraram férias. Antes de engatar o ano:

1. Atualize computadores e celulares que ficaram parados. Atualização acumulada é porta aberta.
2. Confira o extrato do Negócio no período em que ninguém estava olhando. Lançamento estranho, ligue para o banco pelo número oficial.
3. Veja nas configurações do e-mail se existe uma regra de encaminhamento que você não criou. Golpista usa isso para ler tudo sem ser visto.
4. Confirme que a cópia de segurança dos arquivos continuou rodando nas férias.

Quantas das 4 você já fez? Comenta o número. Ficou dúvida em alguma? Me chama no direct.

""" + TAGS),

 dict(slug="2027-01-09-frase-quem-acessa", serie="frase-lat", rede="instagram", data="2027-01-09T10:00:00", tipo="imagem",
  slides=[("quote", "Ano organizado começa por [[quem acessa o quê]].", "Frase da semana · Jéssica Gessoli")],
  texto="""Ano organizado começa por quem acessa o quê.

Banco, e-mail, redes, sistema de vendas. Antes de qualquer meta nova, vale saber quem entra em cada lugar do seu Negócio. É o assunto das próximas semanas aqui.

Salva e manda para o seu sócio ou para quem cuida do administrativo.

""" + TAGS),
]
