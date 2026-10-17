# Post diário — semana 23 (21 a 27/03/2027). Tema do mês: dinheiro e imposto. Sexta-feira Santa 26/03.
TAGS = "#cibersegurança #segurançadigital #empreendedorismo #golpe #donodenegocio"

F_SEBRAE_26 = {"nome": "Agência Sebrae de Notícias (17/06/2026)", "url": "https://agenciasebrae.com.br/?p=40706"}
F_SBT_RECEITA = {"nome": "SBT News, com alerta da Receita Federal (02/05/2025)", "url": "https://sbtnews.sbt.com.br/noticia/economia/receita-federal-alerta-para-tentativa-de-golpe-contra-quem-possui-mei"}

POSTS = [
 dict(slug="2027-03-21-jogo-cobrancas-negocio", serie="jogo", rede="instagram", data="2027-03-21T12:00:00", tipo="carrossel",
  slides=[
   ("cover", "Três mensagens que chegaram no Negócio. [[Qual é golpe?]]", "Arrasta e tenta acertar →"),
   ("msg", "MENSAGEM 1 DE 3", "E-mail · Cliente Fictício", "Segue o pedido de compra em anexo. O arquivo está compactado e a senha para abrir é 1234."),
   ("resp", "GOLPE", "Anexo compactado com senha", "Arquivo inesperado, fechado com senha, é um jeito de esconder o que tem dentro. Ligue para o cliente no número que você já tinha antes de abrir."),
   ("msg", "MENSAGEM 2 DE 3", "WhatsApp · Seu contador", "Oi! Já pode gerar a guia do mês no portal, como sempre. Qualquer dúvida, me liga."),
   ("resp", "NÃO É GOLPE", "Lembrete sem link", "Vem de quem você conhece, não traz link nem boleto e manda você para o caminho de sempre. Na dúvida, ligue para o número que já tinha."),
   ("msg", "MENSAGEM 3 DE 3", "SMS · Central Fictícia", "Sua maquininha será bloqueada hoje. Atualize seus dados para continuar vendendo: <u>atualiza-cadastro.exemplo</u>"),
   ("resp", "GOLPE", "Ameaça com prazo curto", "Bloqueio \"hoje\" e link para atualizar dados é a receita da pressa. Confira no app ou no telefone oficial que você já usa."),
   ("end", "AGORA ME CONTA", "Quantas você [[acertou]]?", "Manda no grupo da família e vê quem acerta mais.", "Compartilhar com a família"),
  ],
  texto="""Golpe ou não? Três mensagens que poderiam chegar no seu Negócio nesta semana.

Uma é verdadeira e duas são golpe. Arrasta, escolhe a sua resposta antes de ver a explicação e conta quantas você acertou.

O que ajuda a decidir:
1. Anexo inesperado, ainda mais fechado com senha, pede uma ligação antes de abrir.
2. Ameaça com prazo curto e link para "atualizar dados" é sinal de golpe.
3. Mensagem que manda você para o caminho de sempre, sem link e sem boleto, tende a ser legítima. Mesmo assim, na dúvida, confira.

Manda no grupo da família e vê quem acerta mais. E me conta nos comentários quantas você acertou.

""" + TAGS),

 dict(slug="2027-03-22-golpe-das-falso", serie="golpe", rede="instagram", data="2027-03-22T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Seu CNPJ vai ser cancelado? [[Não.]]", "", "SMS · agora", "Seu CNPJ será cancelado por falta de pagamento do DAS. Regularize hoje: <u>regulariza-mei.exemplo</u>"),
   ("text", "COMO FUNCIONA", "Ameaça de cancelar o CNPJ", "Chega por SMS, WhatsApp ou e-mail falando em cancelamento, dívida ativa ou notificação. O link leva a um site que imita o Portal do Empreendedor e gera uma guia falsa."),
   ("text", "O QUE ELES QUEREM", "Seu pagamento e seus dados", "A guia falsa manda o dinheiro para o golpista. O site ainda pode coletar os dados do Negócio. A Receita Federal diz que essas mensagens são falsas."),
   ("list", "COMO SE PROTEGER", "Antes de pagar o DAS", ["Gere o DAS você mesmo, no Portal do Empreendedor ou no app oficial do MEI.", "Não pague guia nem boleto mandado por mensagem.", "Confira o beneficiário: Receita Federal ou Simples Nacional.", "Na dúvida, fale com o Sebrae ou com o seu contador antes de pagar."]),
   ("end", "AGORA ME RESPONDE", "Você ou alguém que você conhece [[já recebeu]] essa mensagem?", "Salva e manda para quem tem MEI."),
  ],
  texto="""Golpe da semana: "Seu CNPJ será cancelado por falta de pagamento do DAS."

A mensagem chega por SMS, WhatsApp ou e-mail e leva para um site que imita o Portal do Empreendedor e gera uma guia falsa. A Receita Federal alertou que essas informações são falsas e que não usa SMS nem WhatsApp para cobrança. O Sebrae reforça: a Receita e o Sebrae não mandam cobranças nem guias por mensagem.

Como se proteger:
1. Gere o DAS você mesmo, no Portal do Empreendedor ou no app oficial do MEI.
2. Não pague guia nem boleto mandado por mensagem.
3. Confira o beneficiário: deve ser a Receita Federal ou o Simples Nacional.
4. Site oficial termina em gov.br. Na dúvida, fale com o Sebrae ou com o seu contador.

Salva e manda para quem tem MEI. Ficou dúvida? Me chama no direct.

Fonte: Agência Sebrae de Notícias e SBT News, com alerta da Receita Federal (links no primeiro comentário).

#golpe #mei #das #receitafederal #empreendedorismo""",
  fonte=[F_SEBRAE_26, F_SBT_RECEITA]),

 dict(slug="2027-03-23-ia-aviso-clientes", serie="ia", rede="instagram", data="2027-03-23T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Use a IA para escrever o [[aviso de pagamento]] para os seus clientes.", "O que o aviso precisa dizer →"),
   ("text", "POR QUE AVISAR", "Golpista usa o nome do Negócio", "Quando o cliente sabe como você cobra, fica mais difícil alguém se passar pelo seu Negócio e pedir pagamento em outra conta ou por outro canal."),
   ("text", "ONDE A IA AJUDA", "Texto curto e claro", "A IA escreve rápido em tom simples. Você só precisa dizer como o seu Negócio cobra de verdade. Ela não inventa a regra: quem decide é você."),
   ("list", "COMO PEDIR", "Peça um aviso com estes pontos", ["Por quais canais o Negócio manda cobrança, e por quais nunca manda.", "Em nome de quem sai a cobrança: razão social e CNPJ.", "O que o cliente faz na dúvida: ligar no número que já tem."]),
   ("end", "AGORA ME RESPONDE", "Seus clientes sabem [[como você cobra]]?", "Salva e escreve o seu aviso ainda nesta semana."),
  ],
  texto="""IA no Negócio: use a IA para escrever o aviso de pagamento para os seus clientes.

Quando o cliente sabe como o seu Negócio cobra, fica mais difícil alguém se passar por você e pedir pagamento em outra conta ou por outro canal.

Peça para a IA um aviso curto, em tom simples, com:
1. Por quais canais o Negócio manda cobrança, e por quais nunca manda.
2. Em nome de quem sai a cobrança: razão social e CNPJ.
3. O que o cliente faz na dúvida: ligar no número que já tem do Negócio.

A IA escreve rápido, mas ela não sabe como você cobra. Leia o texto inteiro antes de mandar e corrija o que não for verdade.

Depois, coloque o aviso na mensagem de boas-vindas, no rodapé do e-mail ou fixado nas redes do Negócio.

Seus clientes sabem como você cobra? Salva e escreve o seu aviso ainda nesta semana.

#inteligenciaartificial #ia #clientes #empreendedorismo #donodenegocio"""),

 dict(slug="2027-03-24-mito-senha-banco-equipe", serie="mito", rede="instagram", data="2027-03-24T18:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"A senha do banco do Negócio pode ficar com toda a equipe.\"", "Arrasta para ver por quê →", "MITO"),
   ("text", "POR QUE É MITO", "Senha dividida não tem dono", "Quando todos usam a mesma senha, ninguém sabe quem fez cada pagamento. E se a senha vazar, não dá para saber por onde saiu."),
   ("text", "O QUE MUDA NA PRÁTICA", "Cada um com seu acesso", "Quem precisa ver o extrato não precisa pagar. Quem paga não precisa mudar limite. Acesso separado deixa cada um com o que usa."),
   ("list", "O QUE FAZER", "Esta semana", ["Pergunte ao seu banco se dá para criar acessos separados por pessoa.", "Troque a senha que hoje está com mais de uma pessoa.", "Pagamento fora do comum: duas pessoas conferem antes."]),
   ("end", "AGORA ME RESPONDE", "No seu Negócio, [[quantas pessoas]] sabem a senha do banco?", "Comenta aqui. Sem julgamento: é mais comum do que parece."),
  ],
  texto="""Mito ou verdade: "A senha do banco do Negócio pode ficar com toda a equipe."

Mito. Quando todos usam a mesma senha, ninguém sabe quem fez cada pagamento. E se a senha vazar, não dá para saber por onde ela saiu.

Quem precisa ver o extrato não precisa pagar. Quem paga não precisa mudar limite. Acesso separado deixa cada pessoa só com o que usa.

O que fazer esta semana:
1. Pergunte ao seu banco se dá para criar acessos separados por pessoa.
2. Troque a senha que hoje está com mais de uma pessoa.
3. Pagamento fora do comum: duas pessoas conferem antes.

No seu Negócio, quantas pessoas sabem a senha do banco? Comenta aqui. Sem julgamento: é mais comum do que parece.

""" + TAGS),

 dict(slug="2027-03-25-direct-guardar-comprovantes", serie="direct", rede="instagram", data="2027-03-25T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Onde eu guardo os [[comprovantes]] do Negócio?\"", ""),
   ("text", "PRIMEIRO", "Um lugar só", "Comprovante no celular de um, no e-mail de outro e no papel da gaveta se perde. Escolha um lugar só e avise a equipe qual é."),
   ("list", "COMO ORGANIZAR", "Do jeito simples", ["Uma pasta por mês, com o mesmo padrão de nome: data, quem recebeu, valor.", "Salve o comprovante no mesmo dia do pagamento.", "Deixe uma cópia fora do computador, em outro lugar seguro."]),
   ("text", "POR QUE AJUDA", "Achar rápido é se proteger", "Se aparecer uma cobrança dizendo que você não pagou, o comprovante achado em um minuto resolve a conversa e evita pagar duas vezes."),
   ("end", "AGORA ME CONTA", "Qual a sua [[dúvida]] sobre golpe ou IA?", "Me manda no direct. A sua pode virar o post da próxima quinta."),
  ],
  texto="""Pergunta do direct: "Onde eu guardo os comprovantes do Negócio?"

Em um lugar só. Comprovante no celular de um, no e-mail de outro e no papel da gaveta se perde justamente quando você precisa dele.

Como organizar, do jeito simples:
1. Uma pasta por mês, com o mesmo padrão de nome: data, quem recebeu, valor.
2. Salve o comprovante no mesmo dia do pagamento.
3. Avise a equipe qual é o lugar.
4. Deixe uma cópia fora do computador, em outro lugar seguro.

Por que isso protege: se chegar uma cobrança dizendo que você não pagou, o comprovante achado em um minuto resolve a conversa e evita pagar duas vezes. Quem quer o seu dinheiro conta com a sua bagunça.

Qual a sua dúvida sobre golpe ou IA? Me manda no direct. A sua pode virar o post da próxima quinta.

""" + TAGS),

 dict(slug="2027-03-26-checklist-feriado-santo", serie="check", rede="instagram", data="2027-03-26T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Sexta-feira Santa: 4 cuidados para o Negócio [[descansar]] também.", "Quantos você já fez? →", "1", "4"),
   ("list", "CUIDADOS 1 E 2", "Antes de fechar", ["Confira os pagamentos agendados: valor, data e quem recebe.", "Combine quem responde se algo der errado e por qual telefone."]),
   ("list", "CUIDADOS 3 E 4", "Durante o feriado", ["Cobrança \"urgente\" no feriado espera o primeiro dia útil para ser conferida.", "Avise a equipe: ninguém do Negócio pede Pix por mensagem."]),
   ("end", "AGORA ME RESPONDE", "Quantos dos 4 [[você já fez]]?", "Comenta o número. E um bom feriado para você e sua família."),
  ],
  texto="""Hoje é Sexta-feira Santa, dia de pausa e de reflexão para muita gente. Para o Negócio também descansar, 4 cuidados rápidos:

1. Confira os pagamentos agendados: valor, data e quem recebe.
2. Combine quem responde se algo der errado e por qual telefone.
3. Cobrança "urgente" que chegar no feriado espera o primeiro dia útil para ser conferida com calma.
4. Avise a equipe: ninguém do Negócio pede Pix por mensagem, nem no feriado.

Golpe adora dia em que todo mundo está longe do trabalho. Dez minutos de conferência hoje deixam o resto do feriado tranquilo.

Quantos dos 4 você já fez? Comenta o número. E um bom feriado para você e para a sua família.

""" + TAGS),

 dict(slug="2027-03-27-frase-conferir-minuto", serie="frase-lat", rede="instagram", data="2027-03-27T10:00:00", tipo="imagem",
  slides=[("quote", "Conferir leva um minuto. [[Desfazer leva muito mais.]]", "Frase da semana · Jéssica Gessoli")],
  texto="""Conferir leva um minuto. Desfazer leva muito mais.

Ligar para o número que você já tinha, abrir o site oficial digitando o endereço, pedir para outra pessoa olhar o boleto: tudo isso cabe em um minuto. Recuperar um pagamento feito para golpista dá muito mais trabalho, quando dá.

Salva e manda para quem paga as contas do seu Negócio.

""" + TAGS),
]
