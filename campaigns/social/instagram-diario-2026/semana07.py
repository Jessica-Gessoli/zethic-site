# Post diário — semana 7 (29/11 a 05/12/2026). Tema: vender no fim de ano sem cair em golpe.
TAGS = "#cibersegurança #segurançadigital #empreendedorismo #golpe #donodenegocio"

F_VIAGEM = {"nome": "Jornal Opção", "url": "https://www.jornalopcao.com.br/policia/golpe-das-viagens-dos-sonhos-policia-de-goias-desmantela-quadrilha-que-enganou-brasileiros-por-quase-10-anos-769250/"}
F_CACAU = {"nome": "Tribuna de Jundiaí", "url": "https://tribunadejundiai.com.br/mais/brasil/cacau-show-alerta-para-promocoes-falsas-nas-redes-sociais/"}
F_BAND = {"nome": "Band", "url": "https://www.band.com.br/ciencia-e-tecnologia/noticias/como-funciona-o-golpe-da-falsa-agencia-de-viagens-e-proteja-suas-ferias-202512231540"}

POSTS = [
 dict(slug="2026-11-29-caso-viagem-de-papel", serie="caso", rede="instagram", data="2026-11-29T12:00:00", tipo="carrossel",
  slides=[
   ("cover", "A agência indicada por conhecidos [[que sumiu com o dinheiro]].", "Um caso real, tela por tela →"),
   ("text", "O COMEÇO", "Indicação de gente próxima", "Um grupo se apresentava como agência de viagens e oferecia pacotes muito abaixo do mercado, dizendo usar milhas e acordos com companhias aéreas. Os clientes chegavam por indicação."),
   ("text", "A VIRADA", "Desculpas, silêncio e bloqueio", "O pagamento era por Pix em contas de terceiros. Perto da viagem vinham as desculpas: atraso na emissão, falha técnica. Depois, contatos bloqueados e o dinheiro sumia."),
   ("text", "O QUE TERIA EVITADO", "Conferir antes de pagar", "Preço muito abaixo do mercado é sinal de alerta. Pix para conta de outra pessoa, também. Agência séria aceita cartão e recebe em conta da própria empresa."),
   ("end", "AGORA ME RESPONDE", "Você já comprou viagem [[só por indicação]]?", "Salva e manda para quem está planejando as férias de fim de ano."),
  ],
  texto="""Caso de domingo: a agência de viagens indicada por conhecidos que sumia com o dinheiro das viagens.

Em novembro de 2025, a Polícia Civil de Goiás, com apoio da polícia de Mato Grosso do Sul, fez a Operação Viagem de Papel. Segundo a investigação, o grupo oferecia pacotes muito abaixo do mercado, falava em milhas e acordos com companhias aéreas e chegava às vítimas por indicação de pessoas próximas. O pagamento era por Pix em contas de terceiros. Perto da data da viagem vinham as desculpas, e depois os contatos eram bloqueados. A investigação começou depois que uma única família relatou perda de mais de R$ 90 mil.

O que fazer antes de fechar qualquer viagem:
1. Desconfie de preço muito abaixo do mercado, mesmo com indicação.
2. Não pague por Pix para conta de pessoa física ou de terceiros.
3. Prefira quem aceita cartão e recebe em conta da própria empresa.

Indicação ajuda, mas não substitui conferir. Manda para quem está planejando as férias.

Fonte: Jornal Opção e Band (links no primeiro comentário).

""" + TAGS,
  fonte=[F_VIAGEM, F_BAND]),

 dict(slug="2026-11-30-golpe-promocao-falsa", serie="golpe", rede="instagram", data="2026-11-30T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Promoção com nome de marca? [[Golpe.]]", "", "Instagram · agora", "Promoção de Natal: até 85% de desconto só hoje. Jogue e ganhe seu cupom: <u>promo-natal.exemplo</u>"),
   ("text", "COMO FUNCIONA", "Marca famosa, site falso", "Golpistas usam o nome e o logotipo de uma marca conhecida em posts e anúncios nas redes. O link leva a um site diferente do oficial, com desconto grande demais."),
   ("text", "O QUE ELES QUEREM", "Seu pagamento e seus dados", "O site falso pede dados e pagamento para garantir o cupom ou o produto. A marca não fez a promoção, e o produto não chega."),
   ("list", "COMO SE PROTEGER", "Antes de clicar na promoção", ["Desconfie de desconto grande demais anunciado nas redes.", "Procure a promoção no site e nos perfis oficiais da marca.", "Endereço do site diferente do oficial: feche a página."]),
   ("end", "AGORA ME RESPONDE", "Você já viu promoção [[boa demais]] de marca famosa?", "Salva e manda para quem faz as compras de Natal da família."),
  ],
  texto="""Golpe da semana: a promoção de marca famosa que a marca nunca fez.

Em 2025, golpistas usaram o nome e os logotipos da Cacau Show numa falsa promoção de Páscoa, com descontos de até 85%, espalhada no Instagram, no Facebook e no TikTok. A oferta levava a um site diferente do oficial. A empresa informou que não fazia aquela promoção e pediu que os consumidores conferissem sempre os canais oficiais.

No Natal o roteiro se repete com outras marcas: desconto enorme, prazo curto e um link.

Como se proteger:
1. Desconfie de desconto grande demais anunciado nas redes.
2. Procure a promoção no site e nos perfis oficiais da marca.
3. Se o endereço do site for diferente do oficial, feche a página.

E para o seu Negócio: deixe claro para os clientes quais são os seus canais oficiais.

Salva e manda para quem faz as compras de Natal da família.

Fonte: Tribuna de Jundiaí (link no primeiro comentário).

#golpe #promoção #natal #segurançadigital #donodenegocio""",
  fonte=F_CACAU),

 dict(slug="2026-12-01-ia-treino-equipe", serie="ia", rede="instagram", data="2026-12-01T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Use a IA para [[treinar a equipe]] contra golpe em 10 minutos.", "Como fazer →"),
   ("text", "PARA QUE SERVE", "Combinado que a equipe lembra", "No fim de ano entra gente nova e a correria aumenta. Um teste rápido com perguntas ajuda todo mundo a lembrar o que fazer quando chega um pedido estranho."),
   ("text", "O PEDIDO PARA A IA", "Copie e adapte", "\"Crie 5 perguntas simples, de múltipla escolha, para a equipe treinar estas regras do meu Negócio:\" e cole os seus combinados contra golpe."),
   ("list", "CUIDADOS", "Antes de usar com a equipe", ["A IA não sabe as suas regras. Escreva os combinados antes de pedir.", "Não cole nome de cliente, senha nem dado de conta no pedido.", "Confira cada resposta certa. A IA pode errar.", "Faça o teste numa conversa rápida com a equipe."]),
   ("end", "AGORA ME CONTA", "A sua equipe [[acertaria as 5]]?", "Comenta aqui. E salva o post para fazer o teste antes do pico de vendas."),
  ],
  texto="""IA no Negócio: use a IA para treinar a equipe contra golpe em 10 minutos.

No fim de ano entra gente nova e a correria aumenta. Combinado que ninguém lembra não protege. Um teste rápido, com perguntas e respostas, ajuda todo mundo a saber o que fazer quando chega um pedido estranho.

O pedido para copiar:
"Crie 5 perguntas simples, de múltipla escolha, para a equipe treinar estas regras do meu Negócio:" e cole os seus combinados. Por exemplo: código que chega por SMS não se passa para ninguém; pagamento fora do comum, duas pessoas conferem.

Cuidados:
1. A IA não sabe as suas regras. Escreva os combinados antes de pedir.
2. Não cole nome de cliente, senha nem dado de conta no pedido.
3. Confira cada resposta certa antes de usar. A IA pode errar.
4. Faça o teste numa conversa rápida com a equipe.

A sua equipe acertaria as 5? Comenta aqui. E salva o post para fazer o teste antes do pico de vendas.

#inteligenciaartificial #ia #equipe #empreendedorismo #donodenegocio"""),

 dict(slug="2026-12-02-mito-elogios-loja", serie="mito", rede="instagram", data="2026-12-02T18:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Loja cheia de elogios nos comentários é loja confiável.\"", "Arrasta para ver por quê →", "MITO"),
   ("text", "POR QUE É MITO", "Elogio também se fabrica", "Quem monta uma loja falsa pode escrever os próprios elogios e apagar as críticas. Comentário bonito no perfil não prova que alguém recebeu o produto."),
   ("text", "O SINAL DE ALERTA", "Perfil novo, só com elogios", "A Febraban orienta desconfiar de perfil de loja recém-criado, com oferta muito atraente e só depoimentos positivos."),
   ("list", "O QUE CONFERIR", "Fora do perfil da loja", ["Pesquise o nome da loja em sites de reclamação.", "Veja há quanto tempo o perfil existe e se os seguidores combinam com a loja.", "Pague só dentro do ambiente da loja e confira quem recebe o Pix."]),
   ("end", "AGORA ME RESPONDE", "Você já comprou [[só pelos elogios]]?", "Comenta aqui. E manda para quem faz as compras on-line do seu Negócio."),
  ],
  texto="""Mito ou verdade: "Loja cheia de elogios nos comentários é loja confiável."

Mito. Quem monta uma loja falsa pode escrever os próprios elogios e apagar as críticas. Comentário bonito no perfil não prova que alguém recebeu o produto.

A Febraban orienta desconfiar de perfis de loja recém-criados, com ofertas muito atraentes e só depoimentos positivos.

O que conferir, fora do perfil da loja:
1. Pesquise o nome da loja em sites de reclamação.
2. Veja há quanto tempo o perfil existe e se o número de seguidores combina com o tamanho da loja.
3. Pague só dentro do ambiente da loja e confira se quem recebe o Pix é mesmo a loja.

Você já comprou só pelos elogios? Comenta aqui. E manda para quem faz as compras on-line do seu Negócio.

Fonte: Febraban, via SBT News e Diário do Comércio (links no primeiro comentário).

""" + TAGS,
  fonte=[{"nome": "SBT News (alertas da Febraban)", "url": "https://sbtnews.sbt.com.br/noticia/brasil/vai-comprar-na-black-friday-veja-como-evitar-golpes-e-fraudes"},
         {"nome": "Diário do Comércio (dicas da Febraban)", "url": "https://diariodocomercio.com.br/legislacao/black-friday-febraban-golpes/"}]),

 dict(slug="2026-12-03-direct-qrcode-folheto", serie="direct", rede="instagram", data="2026-12-03T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Chegou um folheto com QR Code. [[Posso escanear?]]\"", ""),
   ("text", "RESPOSTA CURTA", "QR Code é um link disfarçado", "Ele leva para um endereço, como um link. A diferença é que você não vê para onde vai antes de apontar a câmera. Por isso vale a mesma regra."),
   ("list", "ANTES DE ABRIR", "Faça assim", ["Olhe o endereço que aparece na tela antes de tocar para abrir.", "QR Code de promoção ou prêmio que você não esperava: não abra.", "Adesivo colado por cima de outro QR Code, em cartaz ou balcão: desconfie."]),
   ("text", "SE FOR PARA PAGAR", "Confira quem recebe", "No Pix por QR Code, leia o nome de quem vai receber e o valor antes de confirmar. Se não bater com a loja ou com o valor combinado, cancele."),
   ("end", "AGORA ME CONTA", "Qual a sua [[dúvida]] sobre golpe ou IA?", "Me manda no direct. A sua pode virar o post da próxima quinta."),
  ],
  texto="""Pergunta do direct: "Chegou um folheto com QR Code de promoção. Posso escanear?"

Resposta curta: o QR Code é um link disfarçado. Ele leva para um endereço, só que você não vê para onde vai antes de apontar a câmera. Por isso vale a mesma regra de qualquer link.

Antes de abrir:
1. Olhe o endereço que aparece na tela antes de tocar para abrir.
2. QR Code de promoção ou prêmio que você não esperava: não abra.
3. Adesivo colado por cima de outro QR Code, em cartaz ou balcão: desconfie e avise o responsável pelo lugar.

Se for para pagar:
4. No Pix por QR Code, leia o nome de quem vai receber e o valor antes de confirmar. Não bateu, cancele.

Vale também para o seu Negócio: de vez em quando, confira se o QR Code do seu balcão continua sendo o seu.

Qual a sua dúvida sobre golpe ou IA? Me manda no direct. A sua pode virar o post da próxima quinta.

""" + TAGS),

 dict(slug="2026-12-04-checklist-pico-vendas", serie="check", rede="instagram", data="2026-12-04T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "4 conferências antes do [[pico de vendas]] de dezembro.", "Quantas você já fez? →", "1", "4"),
   ("list", "CONFERÊNCIAS 1 E 2", "WhatsApp do Negócio", ["Veja os aparelhos conectados ao WhatsApp e saia dos que você não reconhece.", "Combine quem responde os clientes e de qual aparelho."]),
   ("list", "CONFERÊNCIAS 3 E 4", "Pagamentos", ["Combine: pagamento só é confirmado no extrato ou no app do banco.", "Ninguém troca a chave Pix divulgada pelo Negócio sem falar com você."]),
   ("end", "AGORA ME RESPONDE", "Quantas das 4 [[você já fez]]?", "Comenta o número. E faz as outras antes do movimento apertar."),
  ],
  texto="""Checklist de sexta: 4 conferências antes do pico de vendas de dezembro.

No WhatsApp do Negócio:
1. Veja nas configurações os aparelhos conectados à conta e saia dos que você não reconhece.
2. Combine quem responde os clientes e de qual aparelho. Assim fica mais fácil notar um acesso estranho.

Nos pagamentos:
3. Combine com a equipe: pagamento só é confirmado no extrato ou no app do banco.
4. Ninguém troca a chave Pix divulgada pelo Negócio, no perfil, no balcão ou nas mensagens, sem falar com você antes.

Com o movimento apertando, é a hora em que todo mundo confere menos. Por isso vale fazer agora, com calma.

Quantas das 4 você já fez? Comenta o número. Ficou dúvida em alguma? Me chama no direct.

""" + TAGS),

 dict(slug="2026-12-05-frase-indicacao-conferir", serie="frase-lat", rede="instagram", data="2026-12-05T10:00:00", tipo="imagem",
  slides=[("quote", "Indicação ajuda, mas [[não substitui conferir]].", "Frase da semana · Jéssica Gessoli")],
  texto="""Indicação ajuda, mas não substitui conferir.

Amigo que indicou a agência, parente que passou o contato do fornecedor, grupo que recomendou a loja: a indicação abre a porta, mas quem confere antes de pagar é você. Veja se a empresa existe, se recebe em conta no nome dela e se aceita um jeito de pagar que você consegue contestar.

Salva e manda para quem faz as compras da família e do Negócio.

""" + TAGS),
]
