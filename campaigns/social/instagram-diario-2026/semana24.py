# Post diário — semana 24 (28/03 a 03/04/2027). Tema do mês: dinheiro e imposto. Páscoa 28/03 (último domingo do mês: Caso de domingo).
TAGS = "#cibersegurança #segurançadigital #empreendedorismo #golpe #donodenegocio"

F_PB = {"nome": "Paraíba Business (20/08/2026)", "url": "https://paraibabusiness.com.br/golpe-com-falsa-nf-e-acende-alerta-para-empresas-da-paraiba/"}
F_CANALTECH = {"nome": "Canaltech (02/06/2022)", "url": "https://canaltech.com.br/seguranca/como-evitar-golpes-com-notas-fiscais-eletronicas-217824/"}
F_FENACON = {"nome": "Fenacon (09/06/2025)", "url": "https://fenacon.org.br/?p=43770"}
F_SEBRAE_26 = {"nome": "Agência Sebrae de Notícias (17/06/2026)", "url": "https://agenciasebrae.com.br/?p=40706"}
F_CRCSP = {"nome": "CRCSP, com reportagem da Folha de Pernambuco (04/08/2026)", "url": "https://online.crcsp.org.br/portal/noticias/noticia.asp?c=11235"}

POSTS = [
 dict(slug="2027-03-28-caso-nota-fiscal-falsa", serie="caso", rede="instagram", data="2027-03-28T12:00:00", tipo="carrossel",
  slides=[
   ("cover", "A nota fiscal que chegou por e-mail [[não era nota fiscal]].", "Um caso real de 2026 →"),
   ("text", "O COMEÇO", "Assunto que todo Negócio abre", "Em agosto de 2026, uma empresa de cibersegurança alertou para um golpe mirando empresas da Paraíba. A isca: nota fiscal, cobrança e pendência de imposto."),
   ("text", "A VIRADA", "O arquivo era a armadilha", "Páginas falsas imitavam serviços da nota fiscal eletrônica, das Secretarias da Fazenda e do portal do governo para levar a pessoa a baixar arquivos que rodam comandos."),
   ("text", "O QUE TERIA EVITADO", "Conferir no portal oficial", "Consultar a nota no portal oficial, digitando o endereço. Não abrir arquivo nem instalar \"visualizador\" que chegou por e-mail ou mensagem."),
   ("end", "AGORA ME RESPONDE", "Quem abre as [[notas fiscais]] no seu Negócio?", "Salva e manda para essa pessoa. Ela é quem mais precisa deste caso."),
  ],
  texto="""Hoje é Páscoa. Que seja um dia de descanso com quem você ama. Se sobrar um tempinho, fica aqui o Caso de domingo.

Em agosto de 2026, uma empresa de cibersegurança alertou para uma campanha de golpe, identificada no fim de julho, mirando empresas da Paraíba. As mensagens falavam de nota fiscal eletrônica, cobranças e supostas pendências de imposto. Páginas falsas imitavam serviços da NF-e, das Secretarias da Fazenda e do gov.br para levar a pessoa a baixar arquivos capazes de rodar comandos no computador.

Segundo a reportagem, financeiro, contabilidade, compras e administração são as áreas mais expostas, porque lidam com nota e cobrança todo dia.

O que teria evitado:
1. Consultar a nota no portal oficial, digitando o endereço.
2. Conferir a chave de acesso da nota no portal da NF-e ou da Secretaria da Fazenda.
3. Não abrir arquivo nem instalar "visualizador" recebido por e-mail ou mensagem.

Quem abre as notas no seu Negócio? Manda para essa pessoa.

Fonte: Paraíba Business e Canaltech (links no primeiro comentário).

#golpe #notafiscal #financeiro #cibersegurança #empreendedorismo""",
  fonte=[F_PB, F_CANALTECH]),

 dict(slug="2027-03-29-golpe-esocial-falso", serie="golpe", rede="instagram", data="2027-03-29T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "E-mail do eSocial? [[É golpe.]]", "", "E-mail · agora", "eSocial: sua empresa tem pendência de atualização cadastral. Regularize para evitar suspensão: <u>esocial-pendencia.exemplo</u>"),
   ("text", "COMO FUNCIONA", "Ameaça para quem contrata", "Chega por e-mail para o empregador dizendo que existe uma pendência de atualização cadastral e ameaçando suspender benefícios dos funcionários."),
   ("text", "O QUE ELES QUEREM", "Que você clique com medo", "O medo de prejudicar a equipe faz a pessoa clicar no link, abrir o anexo ou pagar. A Fenacon alertou: o eSocial não manda essa notificação."),
   ("list", "COMO SE PROTEGER", "Antes de clicar", ["Não clique no link, não abra o anexo e não pague nada.", "Desconfie de mensagem que ameaça tirar direito ou benefício.", "Confira no e-CAC, no Domicílio Eletrônico Trabalhista ou no Meu INSS.", "Caiu? Registre boletim de ocorrência e avise o seu contador."]),
   ("end", "AGORA ME RESPONDE", "Quem recebe os [[e-mails do governo]] no seu Negócio?", "Salva e manda para essa pessoa e para o seu contador."),
  ],
  texto="""Golpe da semana: "eSocial: sua empresa tem pendência de atualização cadastral."

Empregadores receberam e-mails dizendo que havia uma pendência no eSocial e ameaçando suspender benefícios dos funcionários. A Fenacon alertou: o aviso é falso, e o eSocial não envia essa notificação aos empregadores.

Como se proteger:
1. Não clique no link, não abra o anexo e não faça nenhum pagamento.
2. Desconfie de mensagem alarmista, que ameaça tirar direito ou benefício.
3. Confira só pelos canais oficiais: e-CAC, Domicílio Eletrônico Trabalhista e Meu INSS.
4. Se caiu, registre boletim de ocorrência e avise o seu contador.

Quem recebe os e-mails do governo no seu Negócio? Salva e manda para essa pessoa e para o seu contador. Ficou dúvida? Me chama no direct.

Fonte: Fenacon (link no primeiro comentário).

#golpe #esocial #empregador #segurançadigital #empreendedorismo""",
  fonte=F_FENACON),

 dict(slug="2027-03-30-ia-roteiro-pagamentos", serie="ia", rede="instagram", data="2027-03-30T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Peça à IA o [[passo a passo]] de como o seu Negócio paga as contas.", "Como montar em 15 minutos →"),
   ("text", "O PROBLEMA", "Cada um paga de um jeito", "Quando o jeito de pagar está só na cabeça de alguém, ninguém percebe o pagamento fora do padrão. É nessa brecha que o golpe passa."),
   ("text", "ONDE A IA AJUDA", "Transforma conversa em regra", "Conte para a IA, com suas palavras, como as contas são pagas hoje. Peça um passo a passo curto, numerado, para colar na parede do financeiro."),
   ("list", "O QUE PEDIR NO TEXTO", "Quatro pontos que não podem faltar", ["Onde cada conta chega e quem confere.", "Quando uma segunda pessoa precisa aprovar.", "O que fazer se pedirem para mudar a conta de pagamento.", "Onde guardar o comprovante."]),
   ("end", "AGORA ME RESPONDE", "O jeito de pagar do seu Negócio [[está escrito]]?", "Salva e monta o seu ainda nesta semana."),
  ],
  texto="""IA no Negócio: peça à IA o passo a passo de como o seu Negócio paga as contas.

Quando o jeito de pagar está só na cabeça de alguém, ninguém percebe o pagamento fora do padrão. É nessa brecha que o golpe passa.

Como fazer:
1. Conte para a IA, com suas palavras, como as contas são pagas hoje. Sem colar senha, número de conta ou nome de cliente.
2. Peça um passo a passo curto e numerado, em linguagem simples.
3. Confira se o texto tem: onde cada conta chega e quem confere; quando uma segunda pessoa aprova; o que fazer se pedirem para mudar a conta de pagamento; onde guardar o comprovante.
4. Leia tudo, corrija o que não for verdade e mostre para a equipe.

A IA organiza, mas quem decide a regra é você.

O jeito de pagar do seu Negócio está escrito? Salva e monta o seu ainda nesta semana.

#inteligenciaartificial #ia #financeiro #empreendedorismo #donodenegocio"""),

 dict(slug="2027-03-31-mito-antivirus-anexo", serie="mito", rede="instagram", data="2027-03-31T18:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Tenho antivírus, então posso abrir qualquer anexo.\"", "Arrasta para ver por quê →", "MITO"),
   ("text", "POR QUE É MITO", "Antivírus ajuda, não decide", "O antivírus é uma camada de proteção, não uma garantia. Quem decide abrir o arquivo continua sendo você."),
   ("text", "O SINAL MAIS CLARO", "Nota fiscal não é programa", "Nota fiscal por e-mail costuma vir em PDF ou XML. Arquivo que termina em .exe chegando como nota fiscal é malicioso, com certeza."),
   ("list", "O QUE FAZER", "Antes de abrir o anexo", ["Você esperava esse arquivo? Se não, confirme com quem mandou.", "Confira a nota no portal da Secretaria da Fazenda, pela chave de acesso.", "Nunca instale \"visualizador\" que veio junto com o e-mail."]),
   ("end", "AGORA ME RESPONDE", "Você confere o [[final do nome]] do arquivo antes de abrir?", "Comenta aqui e manda para quem abre os e-mails do Negócio."),
  ],
  texto="""Mito ou verdade: "Tenho antivírus, então posso abrir qualquer anexo."

Mito. O antivírus é uma camada de proteção, não uma garantia. Quem decide abrir o arquivo continua sendo você.

Um sinal claro, segundo especialista ouvido pelo Canaltech: nota fiscal por e-mail costuma vir em PDF ou XML. Arquivo que termina em .exe chegando como nota fiscal é malicioso.

Antes de abrir o anexo:
1. Você esperava esse arquivo? Se não, confirme com quem mandou, por outro caminho.
2. Confira a nota no portal da NF-e ou da Secretaria da Fazenda, pela chave de acesso.
3. Nunca instale "visualizador" que veio junto com o e-mail.

Você confere o final do nome do arquivo antes de abrir? Comenta aqui e manda para quem abre os e-mails do Negócio.

Fontes: Canaltech; Paraíba Business.

""" + TAGS,
  fonte=[F_CANALTECH, F_PB]),

 dict(slug="2027-04-01-direct-senha-govbr-contador", serie="direct", rede="instagram", data="2027-04-01T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Posso passar a minha [[senha do gov.br]] para o contador?\"", ""),
   ("text", "A RESPOSTA CURTA", "Existe um jeito melhor", "Essa senha abre muita coisa no seu nome, não só a parte do Negócio. Mandar a senha por mensagem não é o único jeito de dar acesso, nem o mais recomendado."),
   ("list", "O CAMINHO MAIS SEGURO", "Um acesso só do contador", ["Pergunte ao contador sobre a procuração eletrônica na plataforma do governo.", "Com ela, ele entra com o acesso dele, que fica registrado.", "Você pode cancelar a autorização quando quiser."]),
   ("text", "E A SUA CONTA", "A senha continua só sua", "Use uma senha que só serve para essa conta, ative a confirmação em duas etapas e olhe de vez em quando o histórico de acessos da sua conta."),
   ("end", "AGORA ME CONTA", "Qual a sua [[dúvida]] sobre golpe ou IA?", "Me manda no direct. A sua pode virar o post da próxima quinta."),
  ],
  texto="""Pergunta do direct: "Posso passar a minha senha do gov.br para o contador?"

Não é falta de confiança no contador. É cuidado com uma chave que abre muita coisa no seu nome, não só a parte do Negócio. E mandar a senha por mensagem não é o único jeito de dar acesso, nem o mais recomendado.

O caminho mais seguro:
1. Pergunte ao seu contador sobre a procuração eletrônica pelo gov.br. Você autoriza, e ele entra com o acesso dele, que fica registrado.
2. Se a senha já foi passada, troque hoje e autorize do jeito certo.
3. Você pode cancelar a autorização quando quiser.

E cuide da sua conta:
4. Use uma senha só para o gov.br, com confirmação em duas etapas.
5. Olhe de vez em quando o histórico de acessos.

Qual a sua dúvida sobre golpe ou IA? Me manda no direct. A sua pode virar o post da próxima quinta.

Fonte: Jornal Contábil.

""" + TAGS,
  fonte={"nome": "Jornal Contábil (03/08/2026): É seguro passar a senha do Gov.br para o meu contador?", "url": "https://jornalcontabil.com.br/noticia/e-seguro-passar-a-senha-do-gov-br-para-o-meu-contador/amp/"}),

 dict(slug="2027-04-02-checklist-email-financeiro", serie="check", rede="instagram", data="2027-04-02T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "4 ajustes no [[e-mail do financeiro]] antes do fim de semana.", "Quantos você já fez? →", "1", "4"),
   ("list", "AJUSTES 1 E 2", "Travar a entrada", ["Ative a confirmação em duas etapas no e-mail do financeiro.", "Troque a senha se ela é a mesma de outra conta."]),
   ("list", "AJUSTES 3 E 4", "O que sai e o que chega", ["Nas configurações, veja se existe encaminhamento automático que você não criou.", "Pedido por e-mail para mudar a conta de pagamento: confirme por telefone."]),
   ("end", "AGORA ME RESPONDE", "Quantos dos 4 [[você já fez]]?", "Comenta o número. Leva poucos minutos para fazer os que faltam."),
  ],
  texto="""Checklist de sexta: 4 ajustes no e-mail do financeiro antes do fim de semana.

É por esse e-mail que chegam boletos, notas fiscais e avisos de cobrança. Vale proteger primeiro.

1. Ative a confirmação em duas etapas.
2. Troque a senha se ela é a mesma de outra conta.
3. Nas configurações, veja se existe encaminhamento automático que você não criou. Se existir, apague e troque a senha.
4. Chegou pedido por e-mail para mudar a conta de pagamento de um fornecedor? Confirme por telefone, no número que você já tinha, antes de pagar.

Quantos dos 4 você já fez? Comenta o número. Ficou dúvida em algum? Me chama no direct.

""" + TAGS),

 dict(slug="2027-04-03-frase-cobranca-verdadeira", serie="frase-lat", rede="instagram", data="2027-04-03T10:00:00", tipo="imagem",
  slides=[("quote", "Cobrança verdadeira [[aguenta conferência]].", "Frase da semana · Jéssica Gessoli")],
  texto="""Cobrança verdadeira aguenta conferência.

Quem cobra de verdade não se importa que você confira no site oficial, ligue para o número que já tinha ou pergunte ao seu contador. Quem fica bravo com a conferência, ou diz que não dá tempo, está mostrando quem é.

Salva e manda para quem paga as contas do seu Negócio.

""" + TAGS),
]
