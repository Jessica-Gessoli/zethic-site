# Post diário — semana 13 (10 a 16/01/2027). Tema do mês: começar o ano organizado (senhas, acessos, cópias, dados de cliente).
TAGS = "#cibersegurança #segurançadigital #empreendedorismo #golpe #donodenegocio"

POSTS = [
 dict(slug="2027-01-10-jogo-codigo-desconto", serie="jogo", rede="instagram", data="2027-01-10T12:00:00", tipo="carrossel",
  slides=[
   ("cover", "Golpe ou não? Três mensagens para [[treinar o olho]].", "Arrasta e responde de cabeça →"),
   ("msg", "MENSAGEM 1 DE 3", "SMS · logo depois de você entrar no app do banco", "Seu código de verificação é 482913. Não compartilhe este código com ninguém."),
   ("resp", "NÃO É GOLPE", "Você pediu, o código chegou", "Você acabou de entrar no app e o código veio na hora, avisando para não compartilhar. Isso é o normal. Se chegar código que você não pediu, não passe para ninguém."),
   ("msg", "MENSAGEM 2 DE 3", "WhatsApp · Desconto na conta de luz", "Sua conta de luz tem 50% de desconto se paga hoje. Gere o Pix aqui: <u>energia-desconto.exemplo</u>"),
   ("resp", "GOLPE", "Desconto com prazo de hoje", "Pressa, desconto grande e Pix por link. Conta de luz se paga pelo app da distribuidora, pelo banco ou pela fatura que você já recebe."),
   ("msg", "MENSAGEM 3 DE 3", "Direct do Instagram · perfil sem foto", "Adoramos seu Negócio! Queremos fechar uma parceria paga. Só falta pagar a taxa de cadastro: <u>parceria-marcas.exemplo</u>"),
   ("resp", "GOLPE", "Parceria que cobra para começar", "Quem quer pagar você não cobra taxa antes. Pesquise a marca por conta própria e desconfie de perfil novo, sem foto e com pressa."),
   ("end", "QUANTAS VOCÊ ACERTOU?", "Acertou as [[três]]? Desafia a família.", "Manda no grupo e vê quem acerta mais. Domingo que vem tem mais.", "Compartilhar com a família"),
  ],
  texto="""Golpe ou não? Três mensagens para treinar o olho.

Mensagem 1: código de verificação que chegou logo depois de você entrar no app do banco. Não é golpe. Você pediu, ele veio. O golpe começa quando alguém pede para você passar esse código.

Mensagem 2: "50% de desconto na conta de luz se pagar hoje pelo Pix." Golpe. Pressa, desconto grande e link de pagamento.

Mensagem 3: "parceria paga" no direct que cobra taxa de cadastro antes. Golpe. Quem quer pagar você não cobra para começar.

O que levar daqui:
1. Código de verificação é só seu. Ninguém de verdade pede.
2. Conta se paga pelo app oficial ou pela fatura que você já recebe.
3. Proposta que pede dinheiro antes: pesquise a empresa por conta própria.

Quantas você acertou? Manda no grupo da família e vê quem acerta mais.

""" + TAGS),

 dict(slug="2027-01-11-golpe-falso-advogado", serie="golpe", rede="instagram", data="2027-01-11T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Ganhou o processo? [[Calma.]]", "", "WhatsApp · agora", "Aqui é do escritório. Seu processo saiu a favor. Para liberar o valor, pague hoje as custas por Pix. Documento em anexo."),
   ("text", "COMO FUNCIONA", "Golpista se passa por advogado", "Usa perfil falso e dados reais do seu processo. Diz que há dinheiro para você receber e manda documento com cara de oficial: decisão, cálculo, ordem de liberação."),
   ("text", "O QUE ELES QUEREM", "Um Pix antecipado", "Pedem depósito, geralmente por Pix, para taxa, imposto ou custas que liberariam o valor. Depois do pagamento, somem."),
   ("list", "COMO SE PROTEGER", "Antes de pagar qualquer custa", ["Ligue para o seu advogado no número que você já tinha.", "Confira o advogado no cadastro oficial da OAB.", "Guarde mensagens e documentos e registre boletim de ocorrência."]),
   ("end", "AGORA ME RESPONDE", "O seu Negócio tem algum [[processo em andamento]]?", "Salva e avisa quem acompanha o processo, e o seu advogado também."),
  ],
  texto="""Golpe da semana: "Seu processo saiu a favor. Para liberar o valor, pague as custas por Pix."

Golpistas se passam por advogados ou escritórios, usam perfil falso e dados reais do seu processo. Dizem que há dinheiro para você receber e mandam documento com cara de oficial. Depois pedem um depósito antecipado, geralmente por Pix, para taxa, imposto ou custas. Pagou, eles somem.

E é frequente: de fevereiro a setembro de 2025, a OAB SP recebeu 3.977 denúncias de golpes pelo WhatsApp com uso indevido de credenciais de advogados, e 76,3% delas tiveram prejuízo financeiro.

Como se proteger:
1. Nunca pague nada antes de confirmar direto com o seu advogado, no número que você já tinha.
2. Desconfie de pressa.
3. Confira o profissional no cadastro oficial da OAB.
4. Caiu? Avise o seu advogado, registre boletim de ocorrência e guarde mensagens, áudios e documentos.

O seu Negócio tem processo em andamento? Salva e manda para quem acompanha.

Fonte: Justiça Federal em São Paulo e OAB SP (links no primeiro comentário).

#golpe #falsoadvogado #segurançadigital #empreendedorismo #donodenegocio""",
  fonte=[{"nome": "Justiça Federal em São Paulo (TRF3): campanha alerta para golpe do falso advogado", "url": "https://web.trf3.jus.br/noticias-sjsp/Noticiar/ExibirNoticia/2353-campanha-alerta-para-golpe-do-falso-advogado"},
         {"nome": "OAB SP, Jornal da Advocacia: OAB SP pede que WhatsApp seja responsabilizado por perfis de falsos advogados", "url": "https://www.oabsp.org.br/jornaldaadvocacia/25-12-10-1508-oab-sp-pede-que-whatsapp-seja-responsabilizado-por-perfis-de-falsos-advogados"}]),

 dict(slug="2027-01-12-ia-lista-acessos", serie="ia", rede="instagram", data="2027-01-12T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Peça para a IA montar a [[lista de acessos]] do seu Negócio.", "O pedido pronto para copiar →"),
   ("text", "PARA QUE SERVE", "Saber quem entra onde", "Banco, e-mail, redes, sistema de vendas, site. Quando alguém sai ou um aparelho some, a lista mostra na hora o que precisa ser trocado."),
   ("text", "O PEDIDO PARA A IA", "Copie e adapte", "\"Monte uma planilha com estas colunas: sistema, quem usa, e-mail de recuperação, tem confirmação em duas etapas, última revisão.\""),
   ("list", "CUIDADOS", "O que não entra no pedido", ["Nunca cole senha, código ou chave na IA.", "Preencha a planilha você mesmo, fora da conversa com a IA.", "Guarde a planilha num lugar com senha e acesso restrito."]),
   ("end", "AGORA ME RESPONDE", "Quantos [[acessos]] você acha que o seu Negócio tem?", "Chuta um número nos comentários. Depois conta de verdade."),
  ],
  texto="""IA no Negócio: peça para a IA montar a lista de acessos do seu Negócio.

Banco, e-mail, redes sociais, sistema de vendas, site, maquininha. Quase todo dono sabe que tem muitos acessos, mas pouca gente tem isso escrito. Quando alguém sai da equipe ou um celular some, essa lista mostra na hora o que precisa ser trocado.

O pedido pronto para copiar:
"Monte uma planilha com estas colunas: sistema, quem usa, e-mail de recuperação, tem confirmação em duas etapas, data da última revisão."

Depois:
1. Preencha a planilha você mesmo, fora da conversa com a IA.
2. Nunca cole senha, código ou chave de acesso na IA.
3. Guarde a planilha num lugar com senha e acesso restrito.

Quantos acessos você acha que o seu Negócio tem? Chuta um número nos comentários e depois conta de verdade.

""" + TAGS),

 dict(slug="2027-01-13-mito-dado-cliente-cpf", serie="mito", rede="instagram", data="2027-01-13T18:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Dado de cliente é só CPF e número de cartão.\"", "Arrasta para ver por quê →", "MITO"),
   ("text", "POR QUE É MITO", "Dado de cliente é muito mais", "Nome, telefone, endereço, e-mail, o que ele comprou, a foto do documento na conversa. Tudo isso conta e tudo isso pode ser usado num golpe."),
   ("text", "COMO O GOLPE USA", "Dado que dá credibilidade", "Golpista que sabe o nome do cliente e o que ele comprou soa como você. Por isso a lista de clientes vale tanto para ele."),
   ("list", "O QUE FAZER", "Cuidar do que você já tem", ["Saiba onde estão os dados: WhatsApp, planilha, caderno, e-mail.", "Dê acesso só a quem precisa para trabalhar.", "Apague o que você não usa mais."]),
   ("end", "AGORA ME RESPONDE", "Onde fica a [[lista de clientes]] do seu Negócio?", "Comenta aqui. Muita gente descobre que está em cinco lugares."),
  ],
  texto="""Mito ou verdade: "Dado de cliente é só CPF e número de cartão."

Mito. Nome, telefone, endereço, e-mail, histórico de compras, a foto do documento que ficou na conversa do WhatsApp. Tudo isso é dado de cliente.

E tudo isso vale para o golpista. Quem sabe o nome do cliente e o que ele comprou consegue mandar uma mensagem que soa exatamente como o seu Negócio.

Cuidar do que você já tem:
1. Saiba onde estão os dados: WhatsApp, planilha, caderno, e-mail, sistema.
2. Dê acesso só a quem precisa deles para trabalhar.
3. Apague o que você não usa mais.

Onde fica a lista de clientes do seu Negócio? Comenta aqui. Salva e manda para quem atende os clientes.

""" + TAGS),

 dict(slug="2027-01-14-direct-sobrinho-redes", serie="direct", rede="instagram", data="2027-01-14T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Quem cuida das minhas redes [[precisa da minha senha]]?\"", ""),
   ("text", "A RESPOSTA CURTA", "Se der para evitar, evite", "Muitas plataformas deixam você dar acesso a outra pessoa sem passar a sua senha. Procure nas configurações por pessoas, acessos ou funções."),
   ("text", "POR QUE IMPORTA", "Senha sua é chave da casa toda", "Com a sua senha, a pessoa entra em tudo e pode até trocar o e-mail da conta. Com acesso próprio, você tira quando quiser."),
   ("list", "O PASSO PRÁTICO", "Faça assim", ["Dê acesso pelo próprio painel da rede social, com o nome da pessoa.", "Se já passou a senha, troque e ative a confirmação em duas etapas.", "O e-mail e o telefone da conta têm que ser seus, não de quem ajuda."]),
   ("end", "AGORA ME CONTA", "Qual a sua [[dúvida]] sobre golpe ou IA?", "Me manda no direct. A sua pode virar o post da próxima quinta."),
  ],
  texto="""Pergunta do direct: "Quem cuida das minhas redes precisa da minha senha?"

Se der para evitar, evite. Muitas plataformas deixam você dar acesso a outra pessoa sem passar a sua senha. Procure nas configurações por pessoas, acessos ou funções.

Por que isso importa: com a sua senha, a pessoa entra em tudo e pode até trocar o e-mail da conta. Com um acesso próprio, você tira quando quiser, sem trocar nada.

O passo prático:
1. Dê acesso pelo próprio painel da rede social, com o nome da pessoa.
2. Se você já passou a senha, troque agora e ative a confirmação em duas etapas.
3. O e-mail e o telefone de recuperação da conta têm que ser seus, não de quem ajuda.

Vale para sobrinho, agência, profissional autônomo ou funcionário.

Qual a sua dúvida sobre golpe ou IA? Me manda no direct. A sua pode virar o post da próxima quinta.

""" + TAGS),

 dict(slug="2027-01-15-checklist-acessos", serie="check", rede="instagram", data="2027-01-15T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "4 passos para [[organizar os acessos]] do Negócio.", "Quantos você já fez? →", "1", "4"),
   ("list", "PASSOS 1 E 2", "Listar e dar dono", ["Liste os sistemas: banco, e-mail, redes, vendas, site.", "Para cada um, anote quem usa e quem é o responsável."]),
   ("list", "PASSOS 3 E 4", "Recuperar e travar", ["Confira se o e-mail e o telefone de recuperação são do Negócio.", "Ative a confirmação em duas etapas onde ainda não tem."]),
   ("end", "AGORA ME RESPONDE", "Quantos dos 4 [[você já fez]]?", "Comenta o número. Começa pelo banco e pelo e-mail."),
  ],
  texto="""Checklist de sexta: 4 passos para organizar os acessos do Negócio.

1. Liste os sistemas que o Negócio usa: banco, e-mail, redes sociais, sistema de vendas, site.
2. Para cada um, anote quem usa e quem é o responsável.
3. Confira se o e-mail e o telefone de recuperação de cada conta são do Negócio, e não de alguém que já saiu ou de quem montou a conta anos atrás.
4. Ative a confirmação em duas etapas onde ainda não tem.

Se não der para fazer tudo hoje, comece pelo banco e pelo e-mail. Quem tem o e-mail consegue trocar a senha de quase todo o resto.

Quantos dos 4 você já fez? Comenta o número. Ficou dúvida? Me chama no direct.

""" + TAGS),

 dict(slug="2027-01-16-frase-senha-emprestada", serie="frase-lat", rede="instagram", data="2027-01-16T10:00:00", tipo="imagem",
  slides=[("quote", "Senha emprestada é [[porta sem dono]].", "Frase da semana · Jéssica Gessoli")],
  texto="""Senha emprestada é porta sem dono.

Quando todo mundo usa a mesma senha, ninguém sabe quem entrou, quando entrou e o que fez. Cada pessoa com o seu acesso, e você no controle de quem entra.

Salva e manda para quem divide senha no seu Negócio.

""" + TAGS),
]
