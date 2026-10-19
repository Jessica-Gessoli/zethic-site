# Post diário — semana 22 (14 a 20/03/2027). Tema do mês: dinheiro e imposto. Dia do Consumidor 15/03.
TAGS = "#cibersegurança #segurançadigital #empreendedorismo #golpe #donodenegocio"

F_PCPR = {"nome": "Polícia Civil do Paraná, via Bem Paraná (12/03/2026)", "url": "https://www.bemparana.com.br/noticias/parana/pcpr-orienta-populacao-a-como-evitar-golpes-nas-promocoes-do-dia-do-consumidor/"}
F_SBT_CONS = {"nome": "SBT News (11/03/2024)", "url": "https://sbtnews.sbt.com.br/noticia/tecnologia/nao-seja-enganado-na-semana-do-consumidor-confira-dicas-para-nao-cair-em-golpes"}

POSTS = [
 dict(slug="2027-03-14-jogo-compras-consumidor", serie="jogo", rede="instagram", data="2027-03-14T12:00:00", tipo="carrossel",
  slides=[
   ("cover", "Semana do Consumidor: três mensagens. [[Qual é golpe?]]", "Arrasta e tenta acertar →"),
   ("msg", "MENSAGEM 1 DE 3", "SMS · Ofertas", "Só hoje: tudo com 80% de desconto no Dia do Consumidor. Últimas unidades: <u>super-ofertas.exemplo</u>"),
   ("resp", "GOLPE", "Pressa e desconto exagerado", "Link por SMS, preço muito abaixo do normal e \"últimas unidades\". Se quiser a oferta, abra o site da loja digitando o endereço você mesmo."),
   ("msg", "MENSAGEM 2 DE 3", "E-mail · Loja onde você comprou", "Recebemos o seu pedido. Ele aparece em Meus pedidos, no app da loja. Qualquer dúvida, fale pelo app."),
   ("resp", "NÃO É GOLPE", "Confirma, não cobra", "Você fez a compra, e o aviso não pede pagamento, senha nem clique em link. Mesmo assim, confira o pedido abrindo o app que você já usa."),
   ("msg", "MENSAGEM 3 DE 3", "WhatsApp · Loja Fictícia", "Parabéns, você ganhou um cupom exclusivo! Confirme CPF e dados do cartão para liberar: <u>cupom-loja.exemplo</u>"),
   ("resp", "GOLPE", "Cupom que pede cartão", "Cupom de verdade não pede os dados do cartão para ser liberado. CPF e cartão só no momento da compra, no site oficial."),
   ("end", "AGORA ME CONTA", "Quantas você [[acertou]]?", "Manda no grupo da família e vê quem acerta mais.", "Compartilhar com a família"),
  ],
  texto="""Golpe ou não? Amanhã é Dia do Consumidor, e as ofertas já estão chegando no seu celular.

Separei três mensagens desta semana. Uma é verdadeira e duas são golpe. Arrasta, escolhe a sua resposta antes de ver a explicação e conta quantas você acertou.

O que ajuda a decidir:
1. Pressa, "últimas unidades" e desconto exagerado juntos pedem conferência.
2. Cupom ou oferta que pede dados do cartão para "liberar" é sinal de golpe.
3. Na dúvida, abra o site ou o app da loja digitando o endereço você mesmo.

Manda no grupo da família e vê quem acerta mais. Depois me conta nos comentários quantas você acertou.

""" + TAGS),

 dict(slug="2027-03-15-golpe-ofertas-falsas", serie="golpe", rede="instagram", data="2027-03-15T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Oferta imperdível? [[Confira.]]", "", "Anúncio · agora", "Dia do Consumidor: celular com 70% de desconto só hoje. Pague no Pix e garanta o seu: <u>loja-promo.exemplo</u>"),
   ("text", "COMO FUNCIONA", "Site falso imitando loja real", "Golpistas criam sites que imitam lojas conhecidas, com descontos exagerados. O pagamento vai para eles. Alguns links podem até invadir o computador."),
   ("text", "O QUE ELES QUEREM", "Seu pagamento e seus dados", "O site pede pagamento e preenchimento de cadastro. O dinheiro vai para o golpista, e os dados que você digitou ficam com ele."),
   ("list", "COMO SE PROTEGER", "Antes de pagar a oferta", ["Confira se o endereço do site é o mesmo do site oficial da loja.", "Não clique em link de oferta que chegou por mensagem ou anúncio.", "Em página suspeita, não preencha nada e não pague.", "Caiu? Junte capturas de tela e comprovantes e registre boletim de ocorrência."]),
   ("end", "AGORA ME RESPONDE", "Você ou o seu Negócio [[compra pela internet]] nesta semana?", "Salva e manda para quem faz as compras do Negócio."),
  ],
  texto="""Golpe da semana: a oferta do Dia do Consumidor que leva para um site falso.

A Polícia Civil do Paraná alertou para sites que imitam lojas conhecidas, anunciam descontos exagerados e mandam boletos e links de pagamento falsos. Segundo o alerta, alguns links podem até permitir a invasão do computador de quem clica.

Como se proteger:
1. Confira se o endereço do site é o mesmo do site oficial da loja.
2. Não clique em link de oferta que chegou por mensagem, rede social ou anúncio.
3. Em página suspeita, não preencha formulário, não informe dados e não pague.
4. Caiu? Junte capturas de tela, links, mensagens e comprovantes e registre boletim de ocorrência.

Salva e manda para quem faz as compras do Negócio. Ficou dúvida? Me chama no direct.

Fonte: Polícia Civil do Paraná, via Bem Paraná (link no primeiro comentário).

#golpe #diadoconsumidor #compras #segurançadigital #empreendedorismo""",
  fonte=F_PCPR),

 dict(slug="2027-03-16-ia-cobranca-cliente", serie="ia", rede="instagram", data="2027-03-16T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Use a IA para escrever a [[cobrança]] do cliente que atrasou.", "Como pedir sem expor o cliente →"),
   ("text", "O PROBLEMA", "Cobrar dá vergonha", "Muita gente adia a cobrança porque não sabe como começar a conversa. Um texto pronto, educado e firme ajuda você a mandar no mesmo dia."),
   ("text", "COMO A IA AJUDA", "O tom certo em segundos", "Peça: \"Escreva uma mensagem curta lembrando um cliente de um pagamento atrasado, em tom firme e respeitoso\". Depois ajuste ao seu jeito."),
   ("list", "ANTES DE ENVIAR", "Cuidados com a cobrança", ["Não coloque nome, CPF nem valor do cliente no pedido para a IA.", "Use só a chave Pix ou a conta que o cliente já conhece.", "Mande pelo canal de sempre, para o cliente reconhecer que é você."]),
   ("end", "AGORA ME RESPONDE", "Cobrar cliente é [[fácil ou difícil]] para você?", "Comenta aqui. E salva para usar na próxima cobrança."),
  ],
  texto="""IA no Negócio: use a IA para escrever a cobrança do cliente que atrasou.

Muita gente adia a cobrança porque não sabe como começar a conversa. Com um texto pronto, educado e firme, fica mais fácil mandar no mesmo dia.

Como pedir:
1. Escreva para a IA: "Faça uma mensagem curta lembrando um cliente de um pagamento atrasado, em tom firme e respeitoso."
2. Não coloque nome, CPF nem valor do cliente no pedido. Você completa depois.
3. Ajuste ao seu jeito de falar e leia antes de enviar.

E um cuidado que protege o cliente também: cobre sempre pelo canal de sempre e com a chave Pix ou a conta que ele já conhece. Se o seu Negócio nunca muda o jeito de cobrar, o cliente desconfia quando alguém aparece cobrando diferente em seu nome.

Cobrar cliente é fácil ou difícil para você? Comenta aqui e salva para a próxima cobrança.

#inteligenciaartificial #ia #financeiro #empreendedorismo #donodenegocio"""),

 dict(slug="2027-03-17-mito-perfil-loja", serie="mito", rede="instagram", data="2027-03-17T18:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Se a loja tem perfil no Instagram, ela é confiável.\"", "Arrasta para ver por quê →", "MITO"),
   ("text", "POR QUE É MITO", "Perfil se copia em minutos", "Golpistas copiam fotos e informações de lojas, pousadas e restaurantes de verdade para montar perfis falsos parecidos com os originais."),
   ("text", "O QUE ELES FAZEM", "Levam você para fora", "Com o perfil falso, mandam mensagem com oferta ou prêmio e levam a conversa para um link de pagamento ou um site que não é o oficial."),
   ("list", "O QUE FAZER", "Antes de comprar pelo perfil", ["Confira se o perfil é o mesmo que aparece no site oficial da loja.", "Desconfie de perfil que procura você primeiro com oferta.", "Pague só no site ou no app oficial, nunca por link no direct."]),
   ("end", "AGORA ME RESPONDE", "Você já viu um perfil [[copiando uma loja]]?", "Comenta aqui e manda para quem compra pelo Instagram."),
  ],
  texto="""Mito ou verdade: "Se a loja tem perfil no Instagram, ela é confiável."

Mito. A Polícia Civil do Paraná alertou que golpistas copiam imagens e informações de lojas, pousadas, hotéis e restaurantes para criar perfis falsos. Depois mandam mensagem oferecendo vantagem e tiram a conversa do canal oficial.

Antes de comprar pelo perfil:
1. Confira se é o mesmo perfil que aparece no site oficial da loja.
2. Desconfie de perfil que procura você primeiro com oferta ou prêmio.
3. Pague só no site ou no app oficial, nunca por link mandado no direct.

Você já viu um perfil copiando uma loja? Comenta aqui e manda para quem compra pelo Instagram.

Fonte: Polícia Civil do Paraná, via Bem Paraná.

""" + TAGS,
  fonte=F_PCPR),

 dict(slug="2027-03-18-direct-produto-nao-chegou", serie="direct", rede="instagram", data="2027-03-18T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Comprei num site e o produto [[não chegou]]. E agora?\"", ""),
   ("text", "PRIMEIRO", "Guarde tudo", "Faça captura de tela da página, do anúncio e das conversas. Guarde o link, o comprovante de pagamento e qualquer número de telefone usado."),
   ("list", "DEPOIS", "Registre e reclame", ["Registre boletim de ocorrência, na delegacia ou pela internet.", "Reclame no Procon ou na plataforma do governo para consumidores.", "Avise o seu banco ou a operadora do cartão pelo canal oficial."]),
   ("text", "DA PRÓXIMA VEZ", "Confira antes de pagar", "Antes de comprar em loja nova, digite você mesmo o endereço do site e confira se é o oficial. Desconto exagerado pede mais cuidado."),
   ("end", "AGORA ME CONTA", "Qual a sua [[dúvida]] sobre golpe ou IA?", "Me manda no direct. A sua pode virar o post da próxima quinta."),
  ],
  texto="""Pergunta do direct: "Comprei num site e o produto não chegou. E agora?"

Primeiro, respira. O que fazer:

1. Guarde tudo: capturas de tela da página, do anúncio e das conversas, o link, o comprovante de pagamento e os telefones usados.
2. Registre boletim de ocorrência, na delegacia ou pela internet.
3. Registre reclamação no consumidor.gov.br ou no Procon.
4. Avise o seu banco ou a operadora do cartão pelo canal oficial.

Da próxima vez, antes de comprar em loja nova, digite você mesmo o endereço do site e confira se é o oficial.

Qual a sua dúvida sobre golpe ou IA? Me manda no direct. A sua pode virar o post da próxima quinta.

Fontes: Polícia Civil do Paraná, via Bem Paraná; SBT News.

""" + TAGS,
  fonte=[F_PCPR, F_SBT_CONS]),

 dict(slug="2027-03-19-checklist-loja-nova", serie="check", rede="instagram", data="2027-03-19T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "4 conferências antes de comprar de [[loja nova]].", "Quantas você já faz? →", "1", "4"),
   ("list", "CONFERÊNCIAS 1 E 2", "O site e a empresa", ["Digite você mesmo o endereço do site, em vez de clicar no anúncio.", "Consulte o CNPJ da loja no site da Receita Federal."]),
   ("list", "CONFERÊNCIAS 3 E 4", "A fama e o preço", ["Veja a reputação da loja no Reclame Aqui e na lista de sites a evitar do Procon-SP.", "Compare o preço em outras lojas. Muito abaixo de todas pede cuidado."]),
   ("end", "AGORA ME RESPONDE", "Quantas das 4 você [[já faz]]?", "Comenta o número e manda para quem compra pelo Negócio."),
  ],
  texto="""Checklist de sexta: 4 conferências antes de comprar de loja nova.

1. Digite você mesmo o endereço do site, em vez de clicar no anúncio.
2. Consulte o CNPJ da loja no site da Receita Federal.
3. Veja a reputação da loja no Reclame Aqui e na lista "Evite esses sites", do Procon-SP.
4. Compare o preço em outras lojas. Muito abaixo de todas pede cuidado.

Leva poucos minutos e evita o pagamento que não volta.

Quantas das 4 você já faz? Comenta o número e manda para quem compra pelo Negócio. Ficou dúvida? Me chama no direct.

Fonte: SBT News.

""" + TAGS,
  fonte=F_SBT_CONS),

 dict(slug="2027-03-20-frase-oferta-espera", serie="frase-lat", rede="instagram", data="2027-03-20T10:00:00", tipo="imagem",
  slides=[("quote", "Oferta boa [[espera você conferir]].", "Frase da semana · Jéssica Gessoli")],
  texto="""Oferta boa espera você conferir.

Se o desconto só vale "nos próximos minutos" e o pagamento tem que ser agora, a pressa é parte do golpe. Feche a mensagem, abra o site oficial da loja digitando o endereço e veja se a oferta está lá.

Salva e manda para quem faz as compras do Negócio.

""" + TAGS),
]
