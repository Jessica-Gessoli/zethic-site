# Post diário — semana 26 (11 a 17/04/2027). Última semana do projeto de 6 meses. Tema do mês: dinheiro e imposto.
TAGS = "#cibersegurança #segurançadigital #empreendedorismo #golpe #donodenegocio"

F_PODER = {"nome": "Poder360, com alerta do Ministério da Previdência Social (25/04/2025)", "url": "https://www.poder360.com.br/poder-governo/inss-governo-alerta-para-golpes-que-prometem-ressarcir-aposentados/"}
F_CB = {"nome": "Correio Braziliense (29/04/2025)", "url": "https://www.correiobraziliense.com.br/cbradar/policia-federal-emite-alerta-para-quem-recebeu-comunicacao-do-inss/"}

POSTS = [
 dict(slug="2027-04-11-jogo-ultima-rodada", serie="jogo", rede="instagram", data="2027-04-11T12:00:00", tipo="carrossel",
  slides=[
   ("cover", "Última rodada do semestre: três mensagens. [[Qual é golpe?]]", "Arrasta e tenta acertar →"),
   ("msg", "MENSAGEM 1 DE 3", "E-mail · Registro de Sites", "O endereço do site do seu Negócio expira hoje. Renove agora para não perder: <u>renova-dominio.exemplo</u>"),
   ("resp", "GOLPE", "Renovação pelo link do e-mail", "Pressa e link para pagar. Renovação você confere no painel da empresa onde contratou o site, entrando pelo caminho de sempre."),
   ("msg", "MENSAGEM 2 DE 3", "WhatsApp · Cliente de sempre", "Oi! Posso passar aí amanhã às 10h para buscar o meu pedido?"),
   ("resp", "NÃO É GOLPE", "Conversa sem pedido estranho", "Número que você já conhece, assunto que faz sentido e nenhum pedido de dinheiro, código ou dado. Se algo mudar no meio da conversa, confira."),
   ("msg", "MENSAGEM 3 DE 3", "SMS · Benefícios", "Seu cartão de vale-alimentação será bloqueado. Atualize seus dados hoje: <u>beneficio-atualiza.exemplo</u>"),
   ("resp", "GOLPE", "Bloqueio com link", "Ameaça de bloqueio e link para atualizar dados. Confira no app oficial do cartão ou com o RH, nunca pelo link da mensagem."),
   ("end", "AGORA ME CONTA", "Quantas você [[acertou]]?", "Manda no grupo da família e vê quem acerta mais.", "Compartilhar com a família"),
  ],
  texto="""Golpe ou não? Esta é a última rodada do semestre.

Três mensagens: uma é verdadeira e duas são golpe. Arrasta, escolhe a sua resposta antes de ver a explicação e conta quantas você acertou.

O que ajuda a decidir:
1. Pressa e link para pagar ou "atualizar dados" são sinal de golpe.
2. Renovação, bloqueio e cobrança você confere pelo caminho de sempre, nunca pelo link da mensagem.
3. Conversa de quem você conhece, sem pedido de dinheiro, código ou dado, tende a ser legítima. Se algo mudar no meio, confira.

Manda no grupo da família e vê quem acerta mais. E me conta nos comentários: quantas você acertou?

""" + TAGS),

 dict(slug="2027-04-12-golpe-falso-inss", serie="golpe", rede="instagram", data="2027-04-12T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Devolução do INSS? [[Cuidado.]]", "", "SMS · agora", "INSS: você tem valores a receber de descontos indevidos no seu benefício. Consulte e receba: <u>ressarcimento-beneficio.exemplo</u>"),
   ("text", "COMO FUNCIONA", "Golpe em cima de caso real", "Em 2025, uma operação da Polícia Federal e da CGU revelou descontos indevidos em benefícios do INSS. Golpistas passaram a mandar mensagens prometendo devolver o valor."),
   ("text", "O QUE ELES QUEREM", "Os dados do aposentado", "O link da mensagem serve para roubar dados pessoais de aposentados e pensionistas. O governo orientou: não acesse link que trate de ressarcimento."),
   ("list", "COMO SE PROTEGER", "Antes de clicar", ["Não clique em link sobre devolução de valores do INSS.", "Confira descontos no extrato de pagamento, no app ou site Meu INSS.", "Não passe dados nem senha para quem prometer devolução rápida."]),
   ("end", "AGORA ME RESPONDE", "Tem alguém [[aposentado]] na sua família ou na sua equipe?", "Salva e manda para essa pessoa ainda hoje."),
  ],
  texto="""Golpe da semana: "Você tem valores a receber do INSS. Consulte e receba."

Em 2025, a Operação Sem Desconto, da Polícia Federal e da Controladoria-Geral da União, revelou descontos de mensalidades associativas feitos sem autorização em benefícios do INSS. Golpistas aproveitaram o caso real para mandar mensagens prometendo devolver esses valores. O objetivo é roubar dados de aposentados e pensionistas.

Como se proteger:
1. Não clique em link sobre devolução de valores do INSS, seja por e-mail, SMS ou aplicativo de mensagem.
2. Confira se houve desconto no extrato de pagamento, no app ou site Meu INSS.
3. Não passe dados nem senha para quem prometer devolução rápida.

Tem alguém aposentado na sua família ou na sua equipe? Salva e manda para essa pessoa ainda hoje.

Fonte: Poder360, com alerta do Ministério da Previdência Social, e Correio Braziliense (links no primeiro comentário).

#golpe #inss #aposentados #segurançadigital #família""",
  fonte=[F_PODER, F_CB]),

 dict(slug="2027-04-13-ia-regras-financeiro", serie="ia", rede="instagram", data="2027-04-13T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "3 regras para usar IA no [[financeiro]] do Negócio.", "Para guardar e mostrar à equipe →"),
   ("text", "REGRA 1", "Dado de banco não entra", "Senha, número de conta, extrato e dado de cliente ficam fora da conversa com a IA. Para organizar e explicar, ela não precisa disso."),
   ("text", "REGRA 2", "Número da IA se confere", "A IA pode errar conta, data e valor com toda a segurança do mundo. Qualquer número que ela der, confira antes de usar."),
   ("list", "REGRA 3", "Decisão de pagar é de gente", ["A IA organiza, resume e escreve.", "Quem decide pagar, e para quem, é uma pessoa da equipe.", "Pagamento fora do comum continua com duas pessoas conferindo."]),
   ("end", "AGORA ME RESPONDE", "Qual das 3 regras o seu Negócio [[já segue]]?", "Comenta o número e salva para mostrar à equipe."),
  ],
  texto="""IA no Negócio: 3 regras para usar IA no financeiro.

A IA ajuda muito a organizar planilha, resumir e escrever mensagem. No financeiro, ela pede três regras:

1. Dado de banco não entra. Senha, número de conta, extrato e dado de cliente ficam fora da conversa. Para organizar e explicar, a IA não precisa disso.
2. Número da IA se confere. Ela pode errar conta, data e valor com toda a segurança do mundo. Confira antes de usar.
3. Decisão de pagar é de gente. A IA organiza; quem decide pagar, e para quem, é uma pessoa da equipe. Pagamento fora do comum continua com duas pessoas conferindo.

Qual das 3 regras o seu Negócio já segue? Comenta o número e salva para mostrar à equipe.

#inteligenciaartificial #ia #financeiro #empreendedorismo #donodenegocio"""),

 dict(slug="2027-04-14-mito-conferir-desconfiar", serie="mito", rede="instagram", data="2027-04-14T18:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Conferir por outro caminho é desconfiar do cliente.\"", "Arrasta para ver por quê →", "MITO"),
   ("text", "POR QUE É MITO", "Conferir é cuidar", "Quando você liga para confirmar um pedido de pagamento, está protegendo o cliente também. Se o pedido for falso, quem perde dinheiro pode ser ele."),
   ("text", "COMO FALAR", "Transforme em regra da casa", "\"Aqui no Negócio a gente sempre confirma por telefone.\" Dito como regra, ninguém leva para o lado pessoal."),
   ("list", "O QUE FAZER", "Para conferir sem constranger", ["Avise antes: conte para clientes e fornecedores que você sempre confirma.", "Ligue para o número que você já tinha, não o da mensagem.", "Agradeça quando alguém conferir com você também."]),
   ("end", "AGORA ME RESPONDE", "Você já deixou de conferir [[por vergonha]]?", "Comenta aqui. Sem julgamento: quase todo mundo já deixou."),
  ],
  texto="""Mito ou verdade: "Conferir por outro caminho é desconfiar do cliente."

Mito. Quando você liga para confirmar um pedido de pagamento, está protegendo o cliente também. Se o pedido for falso, quem perde dinheiro pode ser ele.

O segredo é transformar em regra da casa: "Aqui no Negócio a gente sempre confirma por telefone." Dito assim, ninguém leva para o lado pessoal.

Para conferir sem constranger:
1. Avise antes: conte para clientes e fornecedores que você sempre confirma.
2. Ligue para o número que você já tinha, não o que veio na mensagem.
3. Agradeça quando alguém conferir com você também.

Você já deixou de conferir por vergonha? Comenta aqui. Sem julgamento: quase todo mundo já deixou.

""" + TAGS),

 dict(slug="2027-04-15-direct-por-onde-comecar", serie="direct", rede="instagram", data="2027-04-15T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Não fiz nada até agora. [[Por onde eu começo?]]\"", ""),
   ("text", "PRIMEIRO", "Sem culpa", "Ninguém faz tudo de uma vez. O que importa é começar pelo que protege mais e cabe na sua semana."),
   ("list", "COMECE POR AQUI", "Três passos para esta semana", ["Confirmação em duas etapas no e-mail, no banco e no WhatsApp do Negócio.", "Regra da casa: pagamento fora do comum, duas pessoas conferem.", "Pedido de dinheiro por mensagem: desliga, e liga você para o número que já tinha."]),
   ("text", "DEPOIS", "Um passo por semana", "Volte nos posts salvos e escolha um por semana. Devagar e todo dia vale mais do que tudo num dia só."),
   ("end", "AGORA ME CONTA", "Qual dos 3 passos você [[vai fazer primeiro]]?", "Me conta no direct. Vou adorar saber."),
  ],
  texto="""Pergunta do direct: "Não fiz nada até agora. Por onde eu começo?"

Sem culpa. Ninguém faz tudo de uma vez. O que importa é começar pelo que protege mais e cabe na sua semana.

Três passos para esta semana:
1. Ative a confirmação em duas etapas no e-mail, no banco e no WhatsApp do Negócio.
2. Combine a regra da casa: pagamento fora do comum, duas pessoas conferem.
3. Pedido de dinheiro por mensagem? Desliga, e liga você para o número que já tinha.

Depois, volte nos posts que você salvou por aqui e escolha um por semana. Devagar e sempre vale mais do que tudo num dia só.

Qual dos 3 passos você vai fazer primeiro? Me conta no direct.

""" + TAGS),

 dict(slug="2027-04-16-checklist-sexta-financeiro", serie="check", rede="instagram", data="2027-04-16T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "4 conferências do financeiro para [[toda sexta]].", "Quantas você já faz? →", "1", "4"),
   ("list", "CONFERÊNCIAS 1 E 2", "O que entrou e saiu", ["Olhe o extrato da semana e pergunte sobre o que você não reconhece.", "Confira os pagamentos agendados para a próxima semana: valor e quem recebe."]),
   ("list", "CONFERÊNCIAS 3 E 4", "O que ficou para trás", ["Veja se todos os comprovantes da semana estão na pasta certa.", "Revise quem tem acesso ao banco e tire quem não precisa mais."]),
   ("end", "AGORA ME RESPONDE", "Quantas das 4 você [[já faz]]?", "Comenta o número. Quinze minutos toda sexta mudam o mês."),
  ],
  texto="""Checklist de sexta: 4 conferências do financeiro para fazer toda sexta-feira.

1. Olhe o extrato da semana e pergunte sobre o que você não reconhece.
2. Confira os pagamentos agendados para a próxima semana: valor, data e quem recebe.
3. Veja se todos os comprovantes da semana estão na pasta certa.
4. Revise quem tem acesso ao banco e tire quem não precisa mais.

Quinze minutos toda sexta deixam o golpe com pouco espaço para passar despercebido. Coloca um lembrete no celular e transforma em hábito.

Quantas das 4 você já faz? Comenta o número. Ficou dúvida em alguma? Me chama no direct.

""" + TAGS),

 dict(slug="2027-04-17-frase-obrigada", serie="frase-lat", rede="instagram", data="2027-04-17T10:00:00", tipo="imagem",
  slides=[("quote", "Obrigada por [[conferir comigo]] todos os dias.", "Frase da semana · Jéssica Gessoli")],
  texto="""Obrigada por conferir comigo todos os dias.

Foram seis meses de post diário: golpe da semana, IA no Negócio, mito ou verdade, perguntas do direct, checklist e o jogo de domingo com a família. Cada comentário, cada post salvo e cada mensagem no direct fez parte disso.

Se fosse para levar uma coisa só: na dúvida, pare e confira por outro caminho.

Obrigada de coração. Salva este post para lembrar.

""" + TAGS),
]
