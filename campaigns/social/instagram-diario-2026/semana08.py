# Post diário — semana 8 (06/12 a 12/12/2026). Tema: vender no fim de ano sem cair em golpe.
TAGS = "#cibersegurança #segurançadigital #empreendedorismo #golpe #donodenegocio"

F_ABONO = {"nome": "Diário do Nordeste", "url": "https://diariodonordeste.verdesmares.com.br/negocios/governo-federal-alerta-que-mensagens-sobre-programa-abono-natalino-sao-falsas-1.3457819"}
F_SVR = {"nome": "InfoMoney (Agência Brasil)", "url": "https://www.infomoney.com.br/minhas-financas/banco-central-alerta-sobre-aumento-de-golpes-no-sistema-de-valores-a-receber"}
F_BAND = {"nome": "Band", "url": "https://www.band.com.br/ciencia-e-tecnologia/noticias/como-funciona-o-golpe-da-falsa-agencia-de-viagens-e-proteja-suas-ferias-202512231540"}

POSTS = [
 dict(slug="2026-12-06-jogo-brinde-natal", serie="jogo", rede="instagram", data="2026-12-06T12:00:00", tipo="carrossel",
  slides=[
   ("cover", "Três mensagens de dezembro. [[Qual é golpe?]]", "Arrasta e tenta acertar →"),
   ("msg", "MENSAGEM 1 DE 3", "WhatsApp · Loja Exemplo", "Parabéns! Você ganhou um kit de Natal. Para receber, pague só o frete: <u>kit-natal.exemplo</u>"),
   ("resp", "GOLPE", "Prêmio que cobra taxa", "Você não se inscreveu em nada e o prêmio pede pagamento por link. Brinde de verdade não cobra para chegar."),
   ("msg", "MENSAGEM 2 DE 3", "E-mail · Contabilidade Exemplo", "Bom dia! Segue o lembrete: preciso das notas de novembro até sexta. Pode mandar pelo mesmo e-mail de sempre."),
   ("resp", "NÃO É GOLPE", "Pedido esperado, sem link", "É uma rotina que você já conhece, não pede pagamento nem clique. Na dúvida, responda pelo contato que você já tinha."),
   ("msg", "MENSAGEM 3 DE 3", "SMS · Cartão Exemplo", "Compra aprovada no seu cartão. Não reconhece? Ligue agora para a central: 0800 XXX XXXX"),
   ("resp", "GOLPE", "O número veio na mensagem", "Quem atende é o golpista, fingindo ser o banco. Ligue para o número do verso do cartão ou confira a compra no app do banco."),
   ("end", "AGORA ME CONTA", "Quantas você [[acertou]]?", "Manda no grupo da família e vê quem acerta mais.", "Compartilhar com a família"),
  ],
  texto="""Golpe ou não? Três mensagens que chegam muito em dezembro. Arrasta e tenta acertar antes de ver a resposta.

Mensagem 1: um kit de Natal grátis, é só pagar o frete pelo link.
Mensagem 2: a contabilidade lembrando das notas do mês.
Mensagem 3: um aviso de compra no cartão, com um número para você ligar.

O que ajuda a decidir:
1. Você pediu ou esperava essa mensagem?
2. Ela pede pagamento, código, clique em link ou ligação para um número que veio nela?
3. Tem pressa ou prazo curto?

Mesmo quando a mensagem parece legítima, confira pelo contato que você já tinha.

Manda no grupo da família e vê quem acerta mais. Depois comenta quantas você acertou.

""" + TAGS),

 dict(slug="2026-12-07-golpe-abono-natal", serie="golpe", rede="instagram", data="2026-12-07T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Abono de Natal no Pix? [[Golpe.]]", "", "WhatsApp · agora", "Abono de Natal liberado: R$ 630,00 no seu Pix. Consulte até hoje: <u>abono-natal.exemplo</u>"),
   ("text", "COMO FUNCIONA", "Benefício que não existe", "A mensagem fala de um programa do governo que paga um valor de Natal por Pix. Tem prazo curto para você clicar sem pensar. O programa não existe."),
   ("text", "O QUE ELES QUEREM", "Seus dados e seu clique", "O link leva a um site no exterior, que não é do governo e oferece risco a quem entra. O objetivo é fazer você clicar e agir com pressa."),
   ("list", "COMO SE PROTEGER", "Antes de clicar em benefício", ["Não clique em link de benefício que chegou sem você pedir.", "Procure o programa no portal oficial do governo. Se for real, aparece lá.", "Site do governo usa endereço brasileiro. Link para fora é alerta."]),
   ("end", "AGORA ME RESPONDE", "Alguém da sua família [[já recebeu]] essa mensagem?", "Salva e manda para quem é mais velho no grupo da família."),
  ],
  texto="""Golpe da semana: "Abono de Natal liberado no seu Pix."

Em dezembro de 2023, o Governo Federal alertou que eram falsas as mensagens sobre um tal "Programa Abono Natalino". Elas prometiam R$ 630 por Pix, davam um prazo para pressionar e traziam um link para um site no exterior, que não era do governo. O próprio governo afirmou que não estava realizando esse programa.

No fim de ano, a mesma ideia volta com outros nomes: abono, bônus, 13º extra.

Como se proteger:
1. Não clique em link de benefício que chegou sem você pedir.
2. Procure o programa no gov.br. Se ele for real, aparece lá.
3. Desconfie de prazo curto e de dinheiro inesperado.

Alguém da sua família já recebeu essa mensagem? Salva e manda para quem é mais velho no grupo da família.

Fonte: Diário do Nordeste (link no primeiro comentário).

#golpe #abono #natal #segurançadigital #família""",
  fonte=F_ABONO),

 dict(slug="2026-12-08-ia-explica-contrato", serie="ia", rede="instagram", data="2026-12-08T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "A IA explica o [[contrato da maquininha]] em palavras simples.", "Como pedir sem se expor →"),
   ("text", "ONDE A IA AJUDA", "Tradução do texto difícil", "Cole o trecho das taxas, do prazo de recebimento ou do cancelamento e peça: explique em linguagem simples e liste o que eu devo perguntar."),
   ("text", "ONDE ELA NÃO AJUDA", "Ela pode errar e não decide", "A IA pode entender errado uma cláusula. Ela ajuda a fazer as perguntas certas. A resposta final vem da empresa, por escrito, ou do seu contador."),
   ("list", "COMO FAZER", "Três cuidados", ["Cole só o texto do contrato. Tire CNPJ, CPF, nome e dados de conta.", "Leve a lista de dúvidas para a empresa, pelo canal oficial.", "Na dúvida sobre taxas e imposto, fale com o seu contador."]),
   ("end", "AGORA ME CONTA", "Você já assinou contrato [[sem ler tudo]]?", "Comenta aqui, sem julgamento. E salva para o próximo contrato."),
  ],
  texto="""IA no Negócio: a IA explica o contrato da maquininha em palavras simples.

Taxa por venda, prazo para o dinheiro cair, multa para cancelar. Tudo isso está no contrato, escrito de um jeito difícil. A IA ajuda a traduzir.

Como fazer:
1. Cole só o trecho do contrato. Tire CNPJ, CPF, nome e dados de conta.
2. Peça: "explique em linguagem simples e liste o que eu devo perguntar antes de assinar".
3. Leve a lista de dúvidas para a empresa, pelo canal oficial, e peça a resposta por escrito.
4. Na dúvida sobre taxas e imposto, fale com o seu contador.

Um cuidado: a IA pode entender errado uma cláusula. Ela ajuda a fazer as perguntas certas, mas quem decide é você, com a resposta da empresa.

Vale para maquininha, plataforma de vendas, aluguel e qualquer contrato do Negócio.

Você já assinou contrato sem ler tudo? Comenta aqui, sem julgamento. E salva para o próximo contrato.

#inteligenciaartificial #ia #contrato #empreendedorismo #donodenegocio"""),

 dict(slug="2026-12-09-mito-pix-cartao", serie="mito", rede="instagram", data="2026-12-09T18:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Com loja desconhecida, cartão protege mais que Pix.\"", "Arrasta para ver por quê →", "VERDADE"),
   ("text", "POR QUE É VERDADE", "Cartão dá para contestar", "Pagou no cartão e caiu em golpe? Você pode pedir ao banco ou à operadora do cartão a contestação da compra. O Pix cai na hora."),
   ("text", "E SE FOI PIX", "Peça o MED ao seu banco", "Existe o Mecanismo Especial de Devolução do Pix. Avise o seu banco o quanto antes e peça a abertura do MED alegando fraude. Registre também o boletim."),
   ("list", "NA PRÁTICA", "Compra de quem você não conhece", ["Prefira cartão de crédito.", "Desconfie de quem aceita só Pix para conta de pessoa física.", "Nunca pague para liberar prêmio, encomenda ou dinheiro esquecido."]),
   ("end", "AGORA ME RESPONDE", "Você paga [[mais no Pix]] ou no cartão?", "Comenta aqui. E manda para quem faz as compras do Negócio."),
  ],
  texto="""Mito ou verdade: "Comprando de quem eu não conheço, o cartão me protege mais que o Pix."

Verdade. Se a compra no cartão foi golpe, você pode procurar o banco ou a operadora e pedir a contestação. Já o Pix é instantâneo e muito difícil de recuperar.

Se você pagou por Pix e caiu em golpe, avise o seu banco o quanto antes e peça a abertura do MED, o Mecanismo Especial de Devolução, alegando fraude. E registre o boletim de ocorrência.

Na prática, para compra de quem você não conhece:
1. Prefira cartão de crédito.
2. Desconfie de quem aceita só Pix para conta de pessoa física.
3. Nunca pague para liberar prêmio, encomenda ou dinheiro esquecido.

Você paga mais no Pix ou no cartão? Comenta aqui. E manda para quem faz as compras do Negócio.

Fonte: InfoMoney (Agência Brasil) e Band.

""" + TAGS,
  fonte=[F_SVR, F_BAND]),

 dict(slug="2026-12-10-direct-nota-fiscal-anexo", serie="direct", rede="instagram", data="2026-12-10T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Chegou e-mail com nota fiscal que não pedi. [[Abro?]]\"", ""),
   ("text", "PRIMEIRO", "Não abra o anexo ainda", "Nota fiscal, boleto ou cobrança que você não esperava é uma isca comum. O arquivo ou o link pode instalar um programa no computador."),
   ("list", "CONFIRA ANTES", "Três perguntas rápidas", ["Você comprou algo dessa empresa?", "O endereço do remetente é o mesmo de outras notas dela?", "O e-mail pede para baixar arquivo ou clicar com pressa?"]),
   ("text", "SE AINDA TIVER DÚVIDA", "Pergunte por outro caminho", "Ligue para o fornecedor no número que você já tinha ou confira a nota no portal oficial. Se era golpe, apague o e-mail e avise a equipe."),
   ("end", "AGORA ME CONTA", "Qual a sua [[dúvida]] sobre golpe ou IA?", "Me manda no direct. A sua pode virar o post da próxima quinta."),
  ],
  texto="""Pergunta do direct: "Chegou um e-mail com nota fiscal que eu não pedi. Abro?"

Ainda não. Nota fiscal, cobrança ou pedido que você não esperava é uma isca comum, porque todo Negócio recebe muitas no fim do ano. O anexo ou o link pode instalar um programa no computador.

Antes de abrir:
1. Você comprou algo dessa empresa?
2. O endereço de quem mandou é o mesmo de outras notas dela?
3. O e-mail pede para baixar arquivo ou clicar com pressa?

Se ainda tiver dúvida:
4. Ligue para o fornecedor no número que você já tinha, não no que está no e-mail.
5. Se era golpe, apague e avise a equipe, para ninguém mais abrir.

Qual a sua dúvida sobre golpe ou IA? Me manda no direct. A sua pode virar o post da próxima quinta.

""" + TAGS),

 dict(slug="2026-12-11-checklist-maquininha", serie="check", rede="instagram", data="2026-12-11T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "4 cuidados com a [[maquininha]] do Negócio no fim de ano.", "Quantos você já tem? →", "2", "4"),
   ("list", "CUIDADOS 1 E 2", "No balcão", ["Confira o valor no visor antes de virar a maquininha para o cliente.", "A maquininha não sai da vista de quem está no caixa."]),
   ("list", "CUIDADOS 3 E 4", "No fim do dia", ["Confira as vendas no app oficial da maquininha, não por mensagem.", "Senha do app da maquininha só com quem precisa dela."]),
   ("end", "AGORA ME RESPONDE", "Quantos dos 4 [[você já tem]]?", "Comenta o número. E mostra este post para quem fica no caixa."),
  ],
  texto="""Checklist de sexta: 4 cuidados com a maquininha do Negócio no fim de ano.

No balcão:
1. Confira o valor no visor antes de virar a maquininha para o cliente. Valor errado gera estorno, reclamação e desconfiança.
2. A maquininha não sai da vista de quem está no caixa.

No fim do dia:
3. Confira as vendas no app oficial da maquininha, não por mensagem ou ligação de quem diz ser da empresa.
4. Senha do app da maquininha só com quem precisa dela.

Com mais movimento, mais gente passa pelo caixa. Esses quatro cuidados levam segundos e evitam dor de cabeça em janeiro.

Quantos dos 4 você já tem? Comenta o número. E mostra este post para quem fica no caixa.

""" + TAGS),

 dict(slug="2026-12-12-frase-canal-oficial", serie="frase-lat", rede="instagram", data="2026-12-12T10:00:00", tipo="imagem",
  slides=[("quote", "Oferta só vale se estiver [[no canal oficial]].", "Frase da semana · Jéssica Gessoli")],
  texto="""Oferta só vale se estiver no canal oficial.

Abono de Natal, kit grátis, desconto enorme: antes de clicar, procure no site, no app ou no perfil oficial de quem supostamente está oferecendo. Se não estiver lá, não é oferta, é isca.

Salva e manda no grupo da família.

""" + TAGS),
]
