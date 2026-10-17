# Post diário — semana 18 (14 a 20/02/2027). Tema do mês: IA no dia a dia do Negócio.
TAGS = "#cibersegurança #segurançadigital #empreendedorismo #golpe #donodenegocio"
TAGS_IA = "#inteligenciaartificial #ia #empreendedorismo #segurançadigital #donodenegocio"

POSTS = [
 dict(slug="2027-02-14-jogo-cliente-oferta", serie="jogo", rede="instagram", data="2027-02-14T12:00:00", tipo="carrossel",
  slides=[
   ("cover", "Três mensagens da semana. [[Qual é golpe?]]", "Arrasta e tenta acertar →"),
   ("msg", "MENSAGEM 1 DE 3", "WhatsApp · cliente", "Oi! Vi o post de vocês. Vocês abrem no sábado de manhã?"),
   ("resp", "NÃO É GOLPE", "Pergunta comum, sem pedido", "Não pede dinheiro, código nem clique. É o tipo de mensagem que todo Negócio recebe. Responda normalmente."),
   ("msg", "MENSAGEM 2 DE 3", "Facebook · anúncio de loja", "Liquidação: celular top de linha pela metade do preço. Pague no Pix e receba amanhã: <u>oferta-relampago.exemplo</u>"),
   ("resp", "GOLPE", "Preço impossível, só Pix", "Desconto fora da realidade, pressa e pagamento só no Pix são o trio da loja falsa. Procure a loja pelo site oficial."),
   ("msg", "MENSAGEM 3 DE 3", "E-mail · ferramenta de IA", "Sua conta será desativada em 24 horas. Confirme seu acesso agora: <u>acesso-ia.exemplo</u>"),
   ("resp", "GOLPE", "Prazo curto e link de acesso", "Ameaça de bloqueio com link para digitar senha é o jeito mais comum de roubar conta. Entre pelo site oficial, nunca pelo link."),
   ("end", "AGORA ME CONTA", "Quantas você [[acertou]]?", "Manda no grupo da família e vê quem acerta mais.", "Compartilhar com a família"),
  ],
  texto="""Golpe ou não? Três mensagens que poderiam chegar no celular do seu Negócio esta semana.

1. Um cliente perguntando se vocês abrem no sábado de manhã.
2. Um anúncio de celular top de linha pela metade do preço, pagamento só no Pix.
3. Um e-mail dizendo que a sua conta da ferramenta de IA será desativada em 24 horas.

Respostas no carrossel. O que separa uma da outra:
1. Mensagem que não pede dinheiro, código nem clique costuma ser só uma mensagem.
2. Preço impossível, pressa e Pix juntos são sinal de loja falsa.
3. Link para digitar senha com ameaça de bloqueio: entre pelo site oficial, nunca pelo link.

Manda no grupo da família e vê quem acerta mais. Quantas você acertou? Comenta aqui.

""" + TAGS),

 dict(slug="2027-02-15-golpe-falso-suporte", serie="golpe", rede="instagram", data="2027-02-15T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Tela pede para ligar? [[É golpe.]]", "", "Navegador · agora", "Alerta de segurança: seu computador foi bloqueado. Não desligue. Ligue agora para o suporte: 0800 XXX XXXX"),
   ("text", "COMO FUNCIONA", "Janela que finge ser alerta", "Começa com um e-mail prometendo reembolso. O clique abre uma janela que imita alerta da Microsoft, parece travar o computador e manda ligar para um número."),
   ("text", "O QUE ELES QUEREM", "Sua senha ou o seu computador", "Do outro lado, um falso técnico pede seus dados de acesso ou convence você a instalar um programa de acesso remoto. Aí ele controla a máquina."),
   ("list", "COMO SE PROTEGER", "Antes de ligar para qualquer suporte", ["Não ligue para número que aparece em janela na tela.", "Aperte a tecla Esc: segundo a reportagem, ela fecha essa janela falsa.", "Não instale programa de acesso remoto a pedido de quem te procurou."]),
   ("end", "AGORA ME RESPONDE", "Quem no seu Negócio [[saberia o que fazer]] se essa tela aparecesse?", "Salva e manda para quem usa o computador do caixa ou do escritório."),
  ],
  texto="""Golpe da semana: a tela diz que o computador foi bloqueado e manda você ligar para o suporte.

Segundo reportagem do Canaltech, com base em pesquisa da Cofense, o golpe começa com um e-mail de falso reembolso. O clique abre uma janela que imita um alerta de segurança da Microsoft, dá a impressão de que você perdeu o controle do mouse e mostra um número para ligar. Do outro lado, um falso técnico pede seus dados de acesso ou convence você a instalar um programa de acesso remoto.

Golpistas usam o nome da Microsoft para parecer confiáveis. A reportagem lembra: a Microsoft nunca trancaria o navegador nem pediria para ligar ao suporte por uma janela dessas.

Como se proteger:
1. Não ligue para número que aparece em janela na tela.
2. Aperte a tecla Esc: segundo a reportagem, basta isso para fechar a janela.
3. Não instale programa de acesso remoto a pedido de quem te procurou.

Salva e manda para quem usa o computador do caixa ou do escritório.

Fonte: Canaltech (link no primeiro comentário).

#golpe #suportetecnico #computador #segurançadigital #empreendedorismo""",
  fonte={"nome": "Canaltech, 17/10/2025: Golpe do suporte falso da Microsoft trava PC e leva a roubo de dados", "url": "https://canaltech.com.br/seguranca/golpe-do-suporte-falso-da-microsoft-trava-pc-e-leva-a-roubo-de-dados/"}),

 dict(slug="2027-02-16-ia-resposta-cliente", serie="ia", rede="instagram", data="2027-02-16T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "IA para responder cliente: [[rascunho]], não piloto automático.", "Como montar as suas respostas →"),
   ("text", "ONDE ELA AJUDA", "As perguntas de sempre", "Horário, endereço, formas de pagamento, prazo de entrega. Você responde isso todo dia. A IA ajuda a deixar essas respostas prontas e bem escritas."),
   ("text", "ONDE ELA NÃO DECIDE", "Preço, prazo e promessa", "Desconto, troca, prazo especial e reclamação pedem uma pessoa. A IA não conhece o combinado de cada cliente."),
   ("list", "PASSO A PASSO", "Monte as suas respostas prontas", ["Liste as 5 perguntas que mais chegam no seu WhatsApp.", "Peça para a IA escrever uma resposta curta para cada uma.", "Revise, ajuste ao seu jeito e salve como resposta rápida."]),
   ("end", "AGORA ME RESPONDE", "Qual pergunta de cliente [[você mais responde]]?", "Comenta aqui. Pode virar o seu primeiro teste com IA."),
  ],
  texto="""IA no Negócio: use a IA para responder cliente como rascunho, não como piloto automático.

Horário, endereço, formas de pagamento, prazo de entrega. Você responde isso todos os dias. A IA ajuda a deixar essas respostas prontas e bem escritas, para você ganhar tempo.

Mas desconto, troca, prazo especial e reclamação pedem uma pessoa. A IA não conhece o combinado de cada cliente.

Passo a passo:
1. Liste as 5 perguntas que mais chegam no seu WhatsApp.
2. Peça para a IA escrever uma resposta curta e simpática para cada uma.
3. Revise, ajuste ao seu jeito de falar e salve como resposta rápida.
4. Não coloque nome, telefone ou pedido de cliente no texto que você manda para a IA.

Qual pergunta de cliente você mais responde? Comenta aqui. Pode virar o seu primeiro teste com IA.

""" + TAGS_IA),

 dict(slug="2027-02-17-mito-entender-tecnologia", serie="mito", rede="instagram", data="2027-02-17T18:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Preciso entender de tecnologia para usar IA no meu Negócio.\"", "Arrasta para ver por quê →", "MITO"),
   ("text", "POR QUE É MITO", "Você pede como fala", "As ferramentas de IA mais usadas hoje funcionam por conversa. Você escreve o pedido com as suas palavras, como faria com alguém da equipe."),
   ("text", "O QUE VOCÊ PRECISA SABER", "O seu Negócio, não o código", "Quem conhece o cliente, o preço e o jeito de atender é você. Isso pesa mais no resultado do que qualquer conhecimento técnico."),
   ("list", "COMO COMEÇAR", "Primeiro teste, sem risco", ["Escolha uma tarefa chata e repetitiva da semana.", "Peça com contexto: quem é o cliente e o tom que você quer.", "Teste sem dado de cliente e confira o resultado."]),
   ("end", "AGORA ME RESPONDE", "O que te [[trava]] para começar a usar IA?", "Comenta aqui. A sua dúvida pode virar post."),
  ],
  texto="""Mito ou verdade: "Preciso entender de tecnologia para usar IA no meu Negócio."

Mito. As ferramentas de IA mais usadas hoje funcionam por conversa. Você escreve o pedido com as suas palavras, do jeito que explicaria para alguém da equipe.

O que faz diferença no resultado é conhecer o seu Negócio: o cliente, o preço, o jeito de atender. Isso você já sabe.

Como começar sem risco:
1. Escolha uma tarefa chata e repetitiva da semana.
2. Peça com contexto: para quem é, para que serve e o tom que você quer.
3. Teste sem dado de cliente e confira o resultado antes de usar.
4. Não gostou? Peça de novo, explicando o que mudar.

O que te trava para começar a usar IA? Comenta aqui. A sua dúvida pode virar post.

""" + TAGS_IA),

 dict(slug="2027-02-18-direct-melhor-ia", serie="direct", rede="instagram", data="2027-02-18T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Qual é a [[melhor IA]] para o meu Negócio?\"", ""),
   ("text", "A RESPOSTA CURTA", "A que resolve a sua tarefa", "Não existe uma melhor para todo mundo. Antes de escolher a ferramenta, escolha o problema: responder cliente, escrever post, organizar planilha."),
   ("list", "COMO ESCOLHER", "Teste com calma", ["Teste duas ferramentas com o mesmo pedido e compare.", "Use texto de exemplo, sem dado de cliente.", "Leia o que a ferramenta diz que faz com o que você digita."]),
   ("list", "DEPOIS DE ESCOLHER", "Conta do Negócio, bem cuidada", ["Crie a conta com o e-mail do Negócio.", "Ative a confirmação em duas etapas.", "Combine com a equipe o que pode e o que não pode colocar ali."]),
   ("end", "AGORA ME CONTA", "Qual a sua [[dúvida]] sobre golpe ou IA?", "Me manda no direct. A sua pode virar o post da próxima quinta."),
  ],
  texto="""Pergunta do direct: "Qual é a melhor IA para o meu Negócio?"

Resposta curta: a que resolve a sua tarefa. Não existe uma melhor para todo mundo. Antes de escolher a ferramenta, escolha o problema: responder cliente, escrever post, organizar uma planilha.

Como escolher:
1. Teste duas ferramentas com o mesmo pedido e compare o resultado.
2. Use texto de exemplo, sem dado de cliente.
3. Leia o que a ferramenta diz que faz com o que você digita.

Depois de escolher:
4. Crie a conta com o e-mail do Negócio, não o pessoal.
5. Ative a confirmação em duas etapas.
6. Combine com a equipe o que pode e o que não pode colocar ali.

Qual a sua dúvida sobre golpe ou IA? Me manda no direct. A sua pode virar o post da próxima quinta.

""" + TAGS_IA),

 dict(slug="2027-02-19-checklist-tarefas-ia", serie="check", rede="instagram", data="2027-02-19T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "4 tarefas da semana que a [[IA pode adiantar]] no Negócio.", "Quantas você já usa? →", "1", "4"),
   ("list", "TAREFAS 1 E 2", "Escrever melhor e mais rápido", ["Rascunho da legenda do post da semana.", "Revisão de texto de e-mail ou proposta, sem dado de cliente."]),
   ("list", "TAREFAS 3 E 4", "Organizar a cabeça", ["Lista de tarefas da semana a partir das suas anotações soltas.", "Ideias de perguntas para fazer ao fornecedor ou ao contador."]),
   ("end", "AGORA ME RESPONDE", "Quantas das 4 você [[já usa]]?", "Comenta o número. Escolha uma e teste na segunda."),
  ],
  texto="""Checklist de sexta: 4 tarefas da semana que a IA pode adiantar no seu Negócio.

1. Rascunho da legenda do post da semana.
2. Revisão de texto de e-mail ou proposta, sem dado de cliente.
3. Lista de tarefas da semana a partir das suas anotações soltas.
4. Ideias de perguntas para fazer ao fornecedor ou ao contador.

Em todas, a regra é a mesma: a IA faz o rascunho, você confere e decide. E nada de senha, documento ou dado de cliente no pedido.

Quantas das 4 você já usa? Comenta o número. Escolha uma e teste na segunda.

""" + TAGS_IA),

 dict(slug="2027-02-20-frase-tarefa-ferramenta", serie="frase-lat", rede="instagram", data="2027-02-20T10:00:00", tipo="imagem",
  slides=[("quote", "Comece pela tarefa, [[não pela ferramenta]].", "Frase da semana · Jéssica Gessoli")],
  texto="""Comece pela tarefa, não pela ferramenta.

Antes de perguntar qual IA usar, pergunte o que está tomando o seu tempo no Negócio. Com a tarefa clara, fica fácil escolher a ferramenta e conferir se ela ajudou.

Salva e manda para o seu sócio ou para quem cuida do dia a dia com você.

""" + TAGS_IA),
]
