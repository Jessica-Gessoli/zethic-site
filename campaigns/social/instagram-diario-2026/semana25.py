# Post diário — semana 25 (04 a 10/04/2027). Tema do mês: dinheiro e imposto.
TAGS = "#cibersegurança #segurançadigital #empreendedorismo #golpe #donodenegocio"

F_SEBRAE_26 = {"nome": "Agência Sebrae de Notícias (17/06/2026)", "url": "https://agenciasebrae.com.br/?p=40706"}
F_MONITOR = {"nome": "Monitor Mercantil (09/04/2025)", "url": "https://monitormercantil.com.br/golpistas-utilizam-identidade-visual-do-simples-nacional-contra-meis-saiba-como-se-proteger/"}
F_SJP = {"nome": "Prefeitura de São José dos Pinhais, via Bem Paraná (03/04/2025)", "url": "https://www.bemparana.com.br/noticias/regiao-metropolitana/cidade-da-grande-curitiba-alerta-sobre-tentativas-de-golpes-contra-meis-entenda/"}
F_CRCSP = {"nome": "CRCSP, com reportagem da Folha de Pernambuco (04/08/2026)", "url": "https://online.crcsp.org.br/portal/noticias/noticia.asp?c=11235"}

POSTS = [
 dict(slug="2027-04-04-jogo-financeiro-mensagens", serie="jogo", rede="instagram", data="2027-04-04T12:00:00", tipo="carrossel",
  slides=[
   ("cover", "Três mensagens para o financeiro. [[Qual é golpe?]]", "Arrasta e tenta acertar →"),
   ("msg", "MENSAGEM 1 DE 3", "E-mail · Notas Fiscais", "Segue a nota fiscal da sua compra. Para ver o arquivo, instale o visualizador: <u>visualizar-nota.exemplo</u>"),
   ("resp", "GOLPE", "Nota não pede programa", "Nota fiscal você confere no portal oficial, pela chave de acesso. Instalar \"visualizador\" mandado por e-mail é abrir a porta do computador."),
   ("msg", "MENSAGEM 2 DE 3", "App do banco · notificação", "O pagamento agendado para hoje foi realizado. Veja o comprovante em Extrato, aqui no app."),
   ("resp", "NÃO É GOLPE", "Aviso que não pede nada", "Aparece dentro do app que você já usa, sobre um pagamento que você agendou, sem link e sem pedido. Mesmo assim, confira no extrato."),
   ("msg", "MENSAGEM 3 DE 3", "SMS · Conta de Luz", "Desconto de 50% na sua conta de luz pagando hoje no Pix. Gere o seu código: <u>desconto-luz.exemplo</u>"),
   ("resp", "GOLPE", "Desconto com pressa e Pix", "Desconto grande, só hoje, com Pix por link de SMS. Confira a conta no app ou no site oficial da distribuidora, digitando o endereço."),
   ("end", "AGORA ME CONTA", "Quantas você [[acertou]]?", "Manda no grupo da família e vê quem acerta mais.", "Compartilhar com a família"),
  ],
  texto="""Golpe ou não? Três mensagens que poderiam chegar para quem cuida do financeiro do Negócio.

Uma é verdadeira e duas são golpe. Arrasta, escolhe a sua resposta antes de ver a explicação e conta quantas você acertou.

O que ajuda a decidir:
1. Nota fiscal não pede para instalar programa. Confira no portal oficial.
2. Desconto grande, só hoje, com Pix por link é sinal de golpe.
3. Aviso que aparece dentro do app que você já usa, sem pedir nada, tende a ser legítimo. Mesmo assim, confira no extrato.

Manda no grupo da família e vê quem acerta mais. E me conta nos comentários quantas você acertou.

""" + TAGS),

 dict(slug="2027-04-05-golpe-taxa-associacao", serie="golpe", rede="instagram", data="2027-04-05T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Boleto de \"anuidade\"? [[Confira.]]", "", "E-mail · agora", "Associação Nacional Fictícia: a taxa anual do seu CNPJ vence hoje. Pague para manter o cadastro: <u>anuidade-cnpj.exemplo</u>"),
   ("text", "COMO FUNCIONA", "Cobrança com cara de oficial", "Chega por carta, e-mail ou WhatsApp, com aparência oficial ou nome de associação. Fala em taxa anual, registro ou filiação, e às vezes em cancelamento do CNPJ."),
   ("text", "O QUE ELES QUEREM", "Que você pague sem dever", "Quem cria essas cobranças usa dados públicos do CNPJ. O MEI não é obrigado a se associar, e pagar pode significar contratar um serviço que você não pediu."),
   ("list", "COMO SE PROTEGER", "Antes de pagar a taxa", ["O imposto mensal do MEI é o DAS, e quem gera a guia é você.", "Gere o DAS só no Portal do Empreendedor ou no app oficial.", "Leia o boleto: quem recebe é órgão público ou empresa privada?", "Na dúvida, pergunte ao seu contador ou ao Sebrae antes de pagar."]),
   ("end", "AGORA ME RESPONDE", "Já chegou uma [[taxa estranha]] no seu CNPJ?", "Comenta aqui e manda para quem abriu MEI há pouco tempo."),
  ],
  texto="""Golpe da semana: o boleto de "taxa anual" ou "associação" que chega no nome do seu CNPJ.

O Sebrae alertou para cobranças de supostas associações ou sindicatos, por carta ou e-mail, geralmente entre R$ 50 e R$ 150, com nomes que soam oficiais. O Monitor Mercantil mostrou empresas privadas que usam dados públicos para mandar boletos com aparência oficial, como uma "Taxa de Registro Empresarial Anual". O MEI não é obrigado a pagar esses documentos nem a se associar.

Como se proteger:
1. O imposto mensal do MEI é o DAS, e quem gera a guia é você.
2. Gere o DAS só no Portal do Empreendedor ou no app oficial.
3. Leia o boleto: quem recebe é órgão público ou uma empresa privada?
4. Na dúvida, pergunte ao seu contador ou ao Sebrae antes de pagar.

Já chegou uma taxa estranha no seu CNPJ? Comenta aqui e manda para quem abriu MEI há pouco tempo.

Fonte: Agência Sebrae de Notícias e Monitor Mercantil (links no primeiro comentário).

#golpe #mei #cnpj #boleto #empreendedorismo""",
  fonte=[F_SEBRAE_26, F_MONITOR]),

 dict(slug="2027-04-06-ia-email-suspeito", serie="ia", rede="instagram", data="2027-04-06T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Dá para pedir à IA para ler um [[e-mail suspeito]]? Dá, com cuidado.", "O jeito seguro de fazer →"),
   ("text", "ONDE A IA AJUDA", "Apontar sinais de alerta", "A IA pode mostrar pressa, ameaça, pedido de pagamento ou de dados no texto. É uma segunda opinião rápida, não um veredito."),
   ("text", "ONDE ELA ERRA", "Ela não sabe a verdade", "A IA não sabe se você deve aquela cobrança nem se o remetente é real. Ela pode dizer que está tudo certo e estar errada."),
   ("list", "COMO FAZER", "Do jeito seguro", ["Copie só o texto. Não clique no link nem abra o anexo para isso.", "Apague nomes, CPF, CNPJ e números de conta antes de colar.", "Seja qual for a resposta, confirme pelo canal oficial que você já conhece."]),
   ("end", "AGORA ME RESPONDE", "Você já usou a IA para [[conferir uma mensagem]]?", "Comenta aqui como foi e salva para lembrar dos três cuidados."),
  ],
  texto="""IA no Negócio: dá para pedir à IA para ler um e-mail suspeito? Dá, com cuidado.

A IA pode apontar sinais de alerta no texto: pressa, ameaça, pedido de pagamento ou de dados. É uma segunda opinião rápida. Mas ela não sabe se você deve aquela cobrança nem se o remetente é real, e pode errar para os dois lados.

Como fazer do jeito seguro:
1. Copie só o texto. Não clique no link nem abra o anexo para isso.
2. Apague nomes, CPF, CNPJ e números de conta antes de colar.
3. Peça: "liste os sinais de golpe neste texto e explique cada um".
4. Seja qual for a resposta, confirme pelo canal oficial que você já conhece.

Quem dá a palavra final é a conferência, não a IA.

Você já usou a IA para conferir uma mensagem? Comenta aqui como foi.

#inteligenciaartificial #ia #golpe #empreendedorismo #segurançadigital"""),

 dict(slug="2027-04-07-mito-qrcode-balcao", serie="mito", rede="instagram", data="2027-04-07T18:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"O QR Code do Pix colado no balcão não precisa ser conferido.\"", "Arrasta para ver por quê →", "MITO"),
   ("text", "POR QUE É MITO", "Adesivo cola por cima", "Um QR Code impresso pode ser coberto por outro, colado por cima. O cliente paga, e o dinheiro vai para quem colou o adesivo, não para o seu Negócio."),
   ("text", "O QUE OLHAR", "O nome que aparece na tela", "Antes de confirmar o Pix, o app mostra para quem vai o dinheiro. Se o nome não é o do seu Negócio, alguma coisa está errada."),
   ("list", "O QUE FAZER", "No balcão do seu Negócio", ["Confira o QR Code impresso todo dia, ao abrir.", "Peça ao cliente para conferir o nome do Negócio na tela antes de pagar.", "Se puder, gere o QR Code na hora, pelo sistema ou pela maquininha."]),
   ("end", "AGORA ME RESPONDE", "Quando você conferiu o [[QR Code]] do balcão pela última vez?", "Comenta aqui e manda para quem abre o Negócio de manhã."),
  ],
  texto="""Mito ou verdade: "O QR Code do Pix colado no balcão não precisa ser conferido."

Mito. Um QR Code impresso pode ser coberto por outro, colado por cima. O cliente paga achando que pagou você, e o dinheiro vai para quem colou o adesivo.

O que ajuda: antes de confirmar o Pix, o app do banco mostra para quem vai o dinheiro. Se o nome não é o do seu Negócio, alguma coisa está errada.

No balcão do seu Negócio:
1. Confira o QR Code impresso todo dia, ao abrir. Passe o dedo: adesivo por cima dá para sentir.
2. Peça ao cliente para conferir o nome do Negócio na tela antes de pagar.
3. Se puder, gere o QR Code na hora da venda, pelo sistema ou pela maquininha.

Quando você conferiu o QR Code do balcão pela última vez? Comenta aqui e manda para quem abre o Negócio de manhã.

""" + TAGS),

 dict(slug="2027-04-08-direct-explicar-equipe", serie="direct", rede="instagram", data="2027-04-08T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Como falo de golpe com a equipe [[sem assustar]]?\"", ""),
   ("text", "PRIMEIRO", "Fale de combinado, não de medo", "Em vez de \"cuidado, vão roubar a gente\", diga \"aqui no Negócio a gente confere assim\". Combinado dá segurança; medo trava."),
   ("list", "COMO FAZER", "Em 10 minutos por semana", ["Mostre um exemplo real de mensagem falsa e peça para a equipe achar o sinal.", "Combine uma regra simples: pagamento fora do comum, duas pessoas conferem.", "Diga que perguntar nunca é bobagem."]),
   ("text", "O MAIS IMPORTANTE", "Ninguém leva bronca por avisar", "Se alguém clicou num link errado, quanto antes contar, melhor. Quem tem medo de bronca esconde, e o problema cresce."),
   ("end", "AGORA ME CONTA", "Qual a sua [[dúvida]] sobre golpe ou IA?", "Me manda no direct. A sua pode virar o post da próxima quinta."),
  ],
  texto="""Pergunta do direct: "Como falo de golpe com a equipe sem assustar?"

Fale de combinado, não de medo. Em vez de "cuidado, vão roubar a gente", diga "aqui no Negócio a gente confere assim". Combinado dá segurança; medo trava.

Como fazer, em 10 minutos por semana:
1. Mostre um exemplo de mensagem falsa e peça para a equipe achar o sinal. Os jogos de domingo daqui servem para isso.
2. Combine uma regra simples: pagamento fora do comum, duas pessoas conferem.
3. Diga que perguntar nunca é bobagem.
4. Deixe claro que ninguém leva bronca por avisar que clicou em algo errado. Quanto antes contar, melhor.

Qual a sua dúvida sobre golpe ou IA? Me manda no direct. A sua pode virar o post da próxima quinta.

""" + TAGS),

 dict(slug="2027-04-09-checklist-maquininha", serie="check", rede="instagram", data="2027-04-09T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "4 cuidados com a [[maquininha]] do Negócio.", "Quantos você já tem? →", "2", "4"),
   ("list", "CUIDADOS 1 E 2", "Na hora da venda", ["Digite o valor e mostre o visor ao cliente antes de ele passar o cartão.", "Confira na maquininha ou no app se a venda foi aprovada antes de entregar."]),
   ("list", "CUIDADOS 3 E 4", "Fora da hora da venda", ["Técnico que aparece sem chamado para trocar a máquina: ligue antes na empresa.", "Fim do dia: a maquininha vai para a gaveta, não fica esquecida no balcão."]),
   ("end", "AGORA ME RESPONDE", "Quantos dos 4 [[você já tem]]?", "Comenta o número e manda para quem fica no caixa."),
  ],
  texto="""Checklist de sexta: 4 cuidados com a maquininha de cartão do Negócio.

1. Digite o valor e mostre o visor ao cliente antes de ele passar o cartão. Evita erro dos dois lados.
2. Confira na maquininha ou no app se a venda foi aprovada antes de entregar o produto.
3. Apareceu um técnico, sem você chamar, para trocar a máquina? Antes de entregar, ligue para a empresa da maquininha no número que você já tem.
4. No fim do dia, a maquininha vai para a gaveta, e não fica esquecida no balcão.

Quantos dos 4 você já tem? Comenta o número e manda para quem fica no caixa. Ficou dúvida em algum? Me chama no direct.

""" + TAGS),

 dict(slug="2027-04-10-frase-cobranca-sozinha", serie="frase-lat", rede="instagram", data="2027-04-10T10:00:00", tipo="imagem",
  slides=[("quote", "Cobrança que chega sozinha [[merece pergunta]].", "Frase da semana · Jéssica Gessoli")],
  texto="""Cobrança que chega sozinha merece pergunta.

Taxa que você não conhecia, boleto que você não pediu, guia que veio por mensagem: antes de pagar, pergunte. Quem cobra? Por quê? Onde eu confiro isso sem usar o link que veio junto?

Salva e manda para quem paga as contas do seu Negócio.

""" + TAGS),
]
