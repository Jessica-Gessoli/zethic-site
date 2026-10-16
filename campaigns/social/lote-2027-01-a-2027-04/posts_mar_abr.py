# Lote 3 — 02/03 a 16/04/2027
IG = "No Instagram @jessicagessoli eu traduzo esses temas para quem é dono do Negócio."
BAST = "Os bastidores dessa rotina eu mostro no Instagram @jessicagessoli."
SERIE = 'Série "Pergunta de conselho", parte {n}. ' + IG

POSTS = [
 # ---------------- semana 02–05/03 (03/03 newsletter) ----------------
 dict(slug="2027-03-02-pc-reputacao", rede="linkedin", data="2027-03-02T11:00:00", tipo="documento",
  titulo_doc="Pergunta de conselho: reputação",
  slides=[
   ("cover", "No incidente, o [[silêncio]] também comunica.", "Série Pergunta de conselho, parte 5 →"),
   ("text", "PERGUNTA Nº 1", "Quem fala em nome da empresa?", "Uma voz só, escolhida antes. Na crise, cada área falando uma coisa vira notícia."),
   ("text", "PERGUNTA Nº 2", "A primeira mensagem já está escrita?", "Um modelo aprovado pelo jurídico, pronto para ajustar. Escrever do zero na crise leva horas."),
   ("text", "PERGUNTA Nº 3", "Sabemos os prazos para avisar?", "A Resolução CD/ANPD 15/2024 dá 3 dias úteis, contados de quando a empresa sabe do incidente, para avisar a ANPD e os titulares se houver risco relevante."),
   ("list", "O QUE PEDIR", "Para a próxima reunião", ["O nome de quem fala na crise.", "O modelo da primeira mensagem.", "A lista de prazos de comunicação."]),
   ("end", "AGORA ME RESPONDA", "A sua empresa já tem a [[primeira mensagem]] pronta?", "Responde nos comentários: sim, não ou não sei."),
  ],
  texto="""No incidente, o silêncio também comunica.

Três perguntas de conselho sobre reputação:
1. Quem fala em nome da empresa? Uma voz só, escolhida antes da crise.
2. A primeira mensagem já está escrita? Um modelo aprovado pelo jurídico, pronto para ajustar.
3. Sabemos os prazos para avisar? A Resolução CD/ANPD 15/2024 dá 3 dias úteis, contados de quando a empresa sabe que o incidente afetou dados pessoais, para comunicar à ANPD e aos titulares se houver risco ou dano relevante. O regulador do setor pode ter outro prazo.

A reputação não se perde no ataque. Perde-se na resposta.

A sua empresa já tem a primeira mensagem pronta? Responde nos comentários: sim, não ou não sei.

""" + SERIE.format(n=5)),

 dict(slug="2027-03-03-ig-perfil-falso", rede="instagram", data="2027-03-03T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Criaram um perfil [[falso]] do seu Negócio?", "O que fazer →"),
   ("text", "PASSO Nº 1", "Denuncie o perfil", "Use a opção de denunciar como falsa identidade e peça para clientes e amigos denunciarem também."),
   ("text", "PASSO Nº 2", "Avise os seus clientes", "Post e stories dizendo qual é o seu único perfil e o seu único número de WhatsApp."),
   ("text", "PASSO Nº 3", "Guarde as provas", "Prints do perfil falso, das mensagens e de quem caiu no golpe. Elas ajudam na denúncia e no boletim de ocorrência."),
   ("end", "AGORA ME RESPONDE", "O seu cliente sabe qual é o seu [[único]] perfil?", "Deixa isso fixado na bio. Ficou dúvida? Me chama no direct."),
  ],
  texto="""Criaram um perfil falso do seu Negócio?

O que fazer:
1. Denuncie o perfil como falsa identidade e peça para clientes e amigos denunciarem também.
2. Avise os seus clientes em post e stories: qual é o seu único perfil e o seu único número de WhatsApp.
3. Guarde as provas: prints do perfil, das mensagens e de quem caiu no golpe.

Para prevenir: deixe na bio o seu número oficial e diga que você nunca pede pagamento por outro canal.

O seu cliente sabe qual é o seu único perfil? Deixa isso fixado na bio. Ficou dúvida? Me chama no direct.

#instagram #perfilfalso #empreendedorismo #golpe #segurançadigital"""),

 dict(slug="2027-03-04-teste-de-invasao", rede="linkedin", data="2027-03-04T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "Teste de invasão que termina num relatório de 200 páginas [[não protege ninguém]].", "O que pedir antes de contratar →"),
   ("text", "PEDIDO Nº 1", "Escopo no que importa", "O teste cobre os sistemas que sustentam a receita, não só o site institucional."),
   ("text", "PEDIDO Nº 2", "Achados por impacto no negócio", "Cada falha com o que um atacante conseguiria fazer: parar, roubar dados ou desviar dinheiro."),
   ("text", "PEDIDO Nº 3", "Novo teste depois da correção", "Só assim a empresa sabe se a falha foi mesmo corrigida."),
   ("end", "AGORA ME RESPONDA", "O último teste de invasão da sua empresa [[teve novo teste]] depois da correção?", "Responde nos comentários: sim, não ou nunca fizemos."),
  ],
  texto="""Teste de invasão que termina num relatório de 200 páginas não protege ninguém.

O que pedir antes de contratar:
1. Escopo no que importa: os sistemas que sustentam a receita, não só o site institucional.
2. Achados por impacto no negócio: o que um atacante conseguiria fazer com cada falha, como parar a operação, roubar dados ou desviar dinheiro.
3. Novo teste depois da correção. Só assim a empresa sabe se a falha foi mesmo corrigida.

O valor do teste não está no que ele encontra. Está no que a empresa corrige depois.

O último teste de invasão da sua empresa teve novo teste depois da correção? Responde nos comentários: sim, não ou nunca fizemos.

""" + IG),

 dict(slug="2027-03-05-pergunta-certa", rede="linkedin", data="2027-03-05T11:00:00", tipo="imagem",
  slides=[("cover", "Conselheiro não precisa ser técnico. Precisa fazer a [[pergunta certa]].", "As perguntas, na legenda ↓")],
  texto="""Conselheiro não precisa ser técnico. Precisa fazer a pergunta certa.

Quando o tema é cibersegurança, muitos conselheiros ficam em silêncio por medo de não entender a resposta. Três perguntas que não exigem nenhum conhecimento técnico:

1. Qual é o pior cenário para o nosso negócio, e quanto ele custa?
2. O que mudou desde a última vez que falamos disso?
3. O que vocês precisam que este conselho decida?

Se a resposta vier cheia de sigla, peça de novo em linguagem de negócio. Essa é a melhor forma de ajudar quem está do outro lado da mesa.

Qual pergunta você faria? Me conta nos comentários.

""" + IG),

 # ---------------- semana 09–12/03 ----------------
 dict(slug="2027-03-09-pc-contratos", rede="linkedin", data="2027-03-09T11:00:00", tipo="documento",
  titulo_doc="Pergunta de conselho: contratos",
  slides=[
   ("cover", "Quando o fornecedor falha, o que protege a sua empresa é o [[contrato]].", "Série Pergunta de conselho, parte 6 →"),
   ("text", "PERGUNTA Nº 1", "Em quanto tempo o fornecedor nos avisa de um incidente?", "Se o contrato não diz, você pode saber pela imprensa."),
   ("text", "PERGUNTA Nº 2", "Podemos auditar ou pedir evidências?", "Relatório de auditoria, certificação ou questionário. Sem esse direito, sobra a confiança."),
   ("text", "PERGUNTA Nº 3", "O que acontece com os nossos dados quando o contrato acaba?", "Devolução, prazo e prova de exclusão. Dado esquecido no fornecedor continua sendo seu risco."),
   ("list", "O QUE PEDIR", "Para a próxima reunião", ["A lista dos fornecedores críticos.", "Quais contratos têm essas 3 cláusulas.", "O plano para os que não têm."]),
   ("end", "AGORA ME RESPONDA", "Os contratos com os seus fornecedores críticos têm [[prazo de aviso]]?", "Responde nos comentários: todos, alguns ou nenhum."),
  ],
  texto="""Quando o fornecedor falha, o que protege a sua empresa é o contrato.

Três perguntas de conselho sobre contratos:
1. Em quanto tempo o fornecedor nos avisa de um incidente? Se o contrato não diz, você pode saber pela imprensa.
2. Podemos auditar ou pedir evidências? Sem esse direito, sobra a confiança.
3. O que acontece com os nossos dados quando o contrato acaba? Devolução, prazo e prova de exclusão.

Para a próxima reunião, peça a lista dos fornecedores críticos e quais contratos têm essas três cláusulas.

Os contratos com os seus fornecedores críticos têm prazo de aviso? Responde nos comentários: todos, alguns ou nenhum.

""" + SERIE.format(n=6)),

 dict(slug="2027-03-10-ia-erra-com-confianca", rede="linkedin", data="2027-03-10T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "A IA erra [[com confiança]]. O controle precisa ser seu.", "3 regras para usar sem tropeçar →"),
   ("text", "REGRA Nº 1", "Fonte para todo fato", "Número, lei, nome ou data vindo da IA só entra num documento depois de conferido na fonte."),
   ("text", "REGRA Nº 2", "Pessoa revisa o que vai para o cliente", "Resposta, proposta ou parecer gerado por IA passa por alguém antes de sair."),
   ("text", "REGRA Nº 3", "Erro registrado", "Quando a IA errar, registre onde e como. É assim que a empresa aprende onde não confiar."),
   ("end", "AGORA ME RESPONDA", "Na sua empresa, alguém [[confere]] o que a IA escreve?", "Responde nos comentários: sempre, às vezes ou nunca."),
  ],
  texto="""A IA erra com confiança. O controle precisa ser seu.

Ferramentas de IA podem inventar um número, uma lei ou uma referência com o mesmo tom de quem está certo. O problema não é o erro. É ninguém conferir.

Três regras:
1. Fonte para todo fato: número, lei, nome ou data só entra num documento depois de conferido na fonte.
2. Pessoa revisa o que vai para o cliente.
3. Erro registrado: quando a IA errar, anote onde e como.

Na sua empresa, alguém confere o que a IA escreve? Responde nos comentários: sempre, às vezes ou nunca.

""" + IG),

 dict(slug="2027-03-10-ig-ia-segura", rede="instagram", data="2027-03-10T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "3 usos seguros de IA para o seu Negócio começar [[hoje]].", "Sem dado de cliente →"),
   ("text", "USO Nº 1", "Rascunho de post", "Peça ideias e textos para as redes. Você revisa e coloca o seu jeito."),
   ("text", "USO Nº 2", "Resposta para dúvidas comuns", "Horário, entrega, formas de pagamento. Texto padrão, sem nome nem dado de cliente."),
   ("text", "USO Nº 3", "Organizar a semana", "Lista de tarefas, roteiro de reunião, resumo de um texto público."),
   ("end", "AGORA ME RESPONDE", "Você já usa IA no seu [[Negócio]]?", "Me conta no direct para que você usa."),
  ],
  texto="""3 usos seguros de IA para o seu Negócio começar hoje.

1. Rascunho de post: peça ideias e textos para as redes. Você revisa e coloca o seu jeito.
2. Resposta para dúvidas comuns: horário, entrega, formas de pagamento. Texto padrão, sem nome nem dado de cliente.
3. Organizar a semana: lista de tarefas, roteiro de reunião, resumo de um texto público.

A regra que vale para todos: dado de cliente, contrato e senha não entram em IA gratuita ou de conta pessoal.

Você já usa IA no seu Negócio? Me conta no direct para que você usa.

#inteligenciaartificial #IA #empreendedorismo #produtividade #marketingdigital"""),

 dict(slug="2027-03-11-acesso-remoto-fornecedor", rede="linkedin", data="2027-03-11T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "O acesso remoto do fornecedor está [[ligado agora]]?", "3 controles →"),
   ("text", "CONTROLE Nº 1", "Liga quando precisa", "Acesso remoto de fornecedor fica desligado e é liberado só para a tarefa, com prazo."),
   ("text", "CONTROLE Nº 2", "Uma conta por pessoa", "Nada de login genérico do fornecedor. Cada técnico com a própria conta e segunda etapa."),
   ("text", "CONTROLE Nº 3", "Registro do que foi feito", "Quem entrou, quando e o que mudou. Se der problema, é por aí que se começa."),
   ("end", "AGORA ME RESPONDA", "Quantos fornecedores têm [[acesso remoto]] ao seu ambiente hoje?", "Responde nos comentários com um número, ou com não sei."),
  ],
  texto="""O acesso remoto do fornecedor está ligado agora?

Acesso remoto de fornecedor esquecido ligado é uma porta aberta, com a chave na mão de quem você não controla.

Três controles:
1. Liga quando precisa: acesso liberado só para a tarefa, com prazo.
2. Uma conta por pessoa: nada de login genérico do fornecedor. Cada técnico com a própria conta e segunda etapa.
3. Registro do que foi feito: quem entrou, quando e o que mudou.

Quantos fornecedores têm acesso remoto ao seu ambiente hoje? Responde nos comentários com um número, ou com não sei.

""" + IG),

 dict(slug="2027-03-12-conformidade-nao-e-seguranca", rede="linkedin", data="2027-03-12T11:00:00", tipo="imagem",
  slides=[("cover", "Passar na auditoria não quer dizer [[estar protegido]].", "A diferença, na legenda ↓")],
  texto="""Passar na auditoria não quer dizer estar protegido.

Conformidade responde: "temos a política, o processo e a evidência?"
Segurança responde: "o ataque de amanhã para aqui?"

As duas importam, mas não são a mesma coisa:
1. Uma política aprovada não garante que alguém a siga.
2. Um controle testado uma vez por ano pode falhar nos outros 364 dias.
3. A norma define o mínimo. O atacante não lê a norma.

Use a auditoria como ponto de partida, não como linha de chegada.

Na sua empresa, a conversa sobre segurança termina quando a auditoria passa? Me conta nos comentários.

""" + IG),

 # ---------------- semana 16–19/03 (17/03 newsletter) ----------------
 dict(slug="2027-03-16-pc-ia-negocio", rede="linkedin", data="2027-03-16T11:00:00", tipo="documento",
  titulo_doc="Pergunta de conselho: inteligência artificial",
  slides=[
   ("cover", "Dizer não à IA [[também é um risco]].", "Série Pergunta de conselho, parte 7 →"),
   ("text", "PERGUNTA Nº 1", "Que uso de IA traz receita ou eficiência?", "Comece pelo valor. Um uso sem ganho claro não justifica nenhum risco."),
   ("text", "PERGUNTA Nº 2", "Que risco aceitamos, e quem assina?", "Dados envolvidos, decisões automáticas, dependência de fornecedor. O dono do uso assina o risco."),
   ("text", "PERGUNTA Nº 3", "Como saberemos se deu certo?", "Uma meta antes de começar e uma revisão em data marcada para continuar, ajustar ou parar."),
   ("list", "O QUE PEDIR", "Para a próxima reunião", ["Os usos de IA em andamento, com o ganho esperado.", "O dono e o risco de cada um.", "A data da próxima revisão."]),
   ("end", "AGORA ME RESPONDA", "O seu conselho discute IA como [[risco]] ou como [[oportunidade]]?", "Responde nos comentários: risco, oportunidade ou os dois."),
  ],
  texto="""Dizer não à IA também é um risco.

O concorrente que usa bem a IA atende mais rápido e gasta menos. Três perguntas de conselho para decidir com critério:

1. Que uso de IA traz receita ou eficiência? Comece pelo valor.
2. Que risco aceitamos, e quem assina? Dados envolvidos, decisões automáticas, dependência de fornecedor.
3. Como saberemos se deu certo? Uma meta antes de começar e uma revisão em data marcada.

Governança de IA não é freio. É o que permite acelerar sem perder o controle.

O seu conselho discute IA como risco ou como oportunidade? Responde nos comentários: risco, oportunidade ou os dois.

""" + SERIE.format(n=7)),

 dict(slug="2027-03-17-ig-comprovante-falso", rede="instagram", data="2027-03-17T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "O cliente mostrou o comprovante do Pix. O dinheiro [[caiu]]?", "Como não cair no golpe →"),
   ("text", "O GOLPE", "Comprovante falso", "Comprovante de Pix pode ser montado ou editado para parecer real."),
   ("text", "A REGRA", "Confira no app do banco", "Só entregue o produto depois de ver o dinheiro no extrato da sua conta. O comprovante não basta."),
   ("text", "NA CORRERIA", "Combine com a equipe", "Quem atende sabe que precisa conferir no app ou perguntar para quem tem acesso."),
   ("end", "AGORA ME RESPONDE", "Você já recebeu [[comprovante falso]]?", "Me conta no direct. Você não está sozinho."),
  ],
  texto="""O cliente mostrou o comprovante do Pix. O dinheiro caiu?

Comprovante de Pix pode ser montado ou editado para parecer real.

A regra é simples:
1. Só entregue o produto depois de ver o dinheiro no extrato do app do banco.
2. O comprovante na tela do cliente não basta.
3. Combine com a equipe: quem atende confere no app ou pergunta para quem tem acesso.

Na correria do balcão, é aí que o golpe passa.

Você já recebeu comprovante falso? Me conta no direct. Você não está sozinho.

#pix #golpe #empreendedorismo #comércio #segurançadigital"""),

 dict(slug="2027-03-18-board-questions-en", rede="linkedin", data="2027-03-18T11:00:00", tipo="imagem",
  slides=[("table", "ONE PAGE FOR THE BOARD", "Three cyber questions for any board in Brazil", [
     ("Detection", "How long does it take us to detect and contain an attack?"),
     ("Recovery", "When did we last restore from backup, and how long did it take?"),
     ("Fraud", "Can one person change a supplier's bank details and approve the payment alone?"),
   ])],
  texto="""Three cyber questions I would put on any board agenda in Brazil.

1. How long does it take us to detect and contain an attack? If nobody knows, the company is not measuring.
2. When did we last restore from backup, and how long did it take? A backup that has never been restored is a promise, not a control.
3. Can one person change a supplier's bank details and approve the payment alone? If so, the company depends on that person's attention.

None of these questions requires technical knowledge. All of them lead to a business decision.

In Brazil, sector regulators already set cyber rules for banks, payment institutions, securities firms, insurers, telecom and energy companies. For everyone else, these three questions are a good place to start.

Which of these would your board answer with confidence?

On Instagram (@jessicagessoli), I cover these topics in Portuguese for business owners."""),

 dict(slug="2027-03-19-desde-2008-setores", rede="linkedin", data="2027-03-19T11:00:00", tipo="imagem",
  slides=[("cover", "Cinco setores, uma lição: risco só muda quando vira [[decisão]].", "O que levei de cada um, na legenda ↓")],
  texto="""Cinco setores, uma lição: risco só muda quando vira decisão.

Desde 2008, passei por telecom, bancos, seguros, saúde e infraestrutura crítica. Cada setor fala uma língua:

1. Em banco e seguro, a régua é o regulador e a perda financeira.
2. Na saúde, é o dado do paciente e a continuidade do atendimento.
3. Em telecom e infraestrutura crítica, é a operação que não pode parar.

Em todos, o risco só saiu da planilha quando alguém com poder de decisão entendeu o que estava em jogo e assinou.

Em que setor você trabalha, e qual é a régua de risco dele? Me conta nos comentários.

Os bastidores dessa trajetória eu mostro no Instagram @jessicagessoli."""),

 # ---------------- semana 23–26/03 (26/03 Sexta-feira Santa: sem post) ----------------
 dict(slug="2027-03-23-pc-seguro-cibernetico", rede="linkedin", data="2027-03-23T11:00:00", tipo="documento",
  titulo_doc="Pergunta de conselho: seguro cibernético",
  slides=[
   ("cover", "Seguro cibernético [[não substitui]] controle. Antes de contratar, 3 perguntas.", "Série Pergunta de conselho, parte 8 →"),
   ("text", "PERGUNTA Nº 1", "O que a apólice cobre e o que exclui?", "Paralisação, resposta ao incidente, processos de terceiros e multas, quando a lei permitir. Leia as exclusões antes do valor."),
   ("text", "PERGUNTA Nº 2", "O que declaramos no questionário é verdade hoje?", "Declaração inexata pode virar discussão na hora do sinistro. Confira cada resposta com quem opera."),
   ("text", "PERGUNTA Nº 3", "Quem aciona a seguradora, e em que prazo?", "O aviso de sinistro tem regras. Ele precisa estar no plano de crise, com telefone e responsável."),
   ("list", "O QUE PEDIR", "Para a próxima reunião", ["O resumo de coberturas e exclusões.", "O questionário revisado por quem opera.", "O passo de aviso no plano de crise."]),
   ("end", "AGORA ME RESPONDA", "A sua empresa tem seguro cibernético, ou [[está avaliando]]?", "Responde nos comentários: tem, avaliando ou não."),
  ],
  texto="""Seguro cibernético não substitui controle. Antes de contratar, 3 perguntas de conselho:

1. O que a apólice cobre e o que exclui? Paralisação, resposta ao incidente, processos movidos por terceiros e multas, quando a lei permitir. Leia as exclusões antes do valor.
2. O que declaramos no questionário é verdade hoje? Declaração inexata pode virar discussão na hora do sinistro.
3. Quem aciona a seguradora, e em que prazo? O aviso de sinistro precisa estar no plano de crise, com telefone e responsável.

O seguro transfere parte da perda. A decisão de proteger continua sendo da empresa.

A sua empresa tem seguro cibernético, ou está avaliando? Responde nos comentários: tem, avaliando ou não.

""" + SERIE.format(n=8)),

 dict(slug="2027-03-24-ia-numeros-conselho", rede="linkedin", data="2027-03-24T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "Três números de IA que o [[conselho]] deveria ver.", "Simples de medir →"),
   ("text", "NÚMERO Nº 1", "Quantos usos de IA estão aprovados", "E quantos estão em uso sem aprovação, pelo que a empresa conseguiu descobrir."),
   ("text", "NÚMERO Nº 2", "Quantos erros ou incidentes", "Resposta errada para cliente, dado exposto, decisão revertida. Com o que foi feito em cada um."),
   ("text", "NÚMERO Nº 3", "Quanto ganhamos", "Horas economizadas, receita nova ou custo evitado. Sem esse número, a IA vira moda."),
   ("end", "AGORA ME RESPONDA", "A sua empresa mede [[algum]] desses números?", "Responde nos comentários: 0, 1, 2 ou 3."),
  ],
  texto="""Três números de IA que o conselho deveria ver.

1. Quantos usos de IA estão aprovados, e quantos estão em uso sem aprovação.
2. Quantos erros ou incidentes: resposta errada para cliente, dado exposto, decisão revertida.
3. Quanto ganhamos: horas economizadas, receita nova ou custo evitado.

O primeiro mostra controle. O segundo mostra risco. O terceiro mostra se vale a pena continuar.

A sua empresa mede algum desses números? Responde nos comentários: 0, 1, 2 ou 3.

""" + IG),

 dict(slug="2027-03-24-ig-link-pagamento-falso", rede="instagram", data="2027-03-24T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Seu cliente recebeu um link de pagamento [[em nome do seu Negócio]]. Não foi você.", "Como proteger quem compra de você →"),
   ("text", "PASSO Nº 1", "Um canal oficial só", "Diga na bio, no site e no atendimento qual é o único número e o único jeito de pagar."),
   ("text", "PASSO Nº 2", "Avise antes do golpe", "Um aviso fixo: nós nunca mandamos link de pagamento por outro número."),
   ("text", "PASSO Nº 3", "Se acontecer", "Avise os clientes nas redes, guarde as provas e registre boletim de ocorrência."),
   ("end", "AGORA ME RESPONDE", "O seu cliente sabe o [[único jeito]] de pagar você?", "Deixa isso claro hoje. Ficou dúvida? Me chama no direct."),
  ],
  texto="""Seu cliente recebeu um link de pagamento em nome do seu Negócio. Não foi você.

Golpistas copiam nome, logo e foto do Negócio para cobrar seus clientes.

Como proteger quem compra de você:
1. Um canal oficial só: diga na bio, no site e no atendimento qual é o único número e o único jeito de pagar.
2. Avise antes do golpe: nós nunca mandamos link de pagamento por outro número.
3. Se acontecer: avise os clientes nas redes, guarde as provas e registre boletim de ocorrência.

O seu cliente sabe o único jeito de pagar você? Ficou dúvida? Me chama no direct.

#golpe #empreendedorismo #vendas #pagamento #segurançadigital"""),

 dict(slug="2027-03-25-mudanca-com-volta", rede="linkedin", data="2027-03-25T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "Toda mudança em sistema crítico precisa de um [[caminho de volta]].", "3 regras de mudança →"),
   ("text", "REGRA Nº 1", "Plano de volta antes", "Se a mudança der errado, como voltamos e em quanto tempo? Sem resposta, não muda."),
   ("text", "REGRA Nº 2", "Aprovação de quem sente o impacto", "A área de negócio aprova a janela. Não é só a TI que decide quando parar."),
   ("text", "REGRA Nº 3", "Aviso antes, registro depois", "Quem usa o sistema sabe antes. O que mudou fica registrado para quem vier investigar."),
   ("end", "AGORA ME RESPONDA", "A última mudança que deu errado na sua empresa [[tinha volta]]?", "Responde nos comentários: tinha, não tinha ou não sei."),
  ],
  texto="""Toda mudança em sistema crítico precisa de um caminho de volta.

Uma atualização mal planejada pode parar a operação tanto quanto um ataque.

Três regras de mudança:
1. Plano de volta antes: se der errado, como voltamos e em quanto tempo?
2. Aprovação de quem sente o impacto: a área de negócio aprova a janela.
3. Aviso antes, registro depois: quem usa sabe antes, e o que mudou fica registrado.

A última mudança que deu errado na sua empresa tinha volta? Responde nos comentários: tinha, não tinha ou não sei.

""" + BAST),

 # ---------------- semana 30/03–02/04 (31/03 newsletter) ----------------
 dict(slug="2027-03-30-pc-apetite-risco", rede="linkedin", data="2027-03-30T11:00:00", tipo="documento",
  titulo_doc="Pergunta de conselho: apetite de risco",
  slides=[
   ("cover", "Quanto risco a empresa aceita? Se ninguém [[escreveu]], ninguém sabe.", "Série Pergunta de conselho, parte 9 →"),
   ("text", "PERGUNTA Nº 1", "Que perda aceitamos sem levar ao conselho?", "Um valor e um tempo de parada. Acima disso, o conselho precisa saber."),
   ("text", "PERGUNTA Nº 2", "O que não pode acontecer de jeito nenhum?", "Vazamento de dados sensíveis, parada de um processo vital. Para esses, tolerância perto de zero."),
   ("text", "PERGUNTA Nº 3", "Quem pode aceitar risco acima do limite?", "E por quanto tempo. Aceite sem prazo vira permanente."),
   ("list", "O QUE PEDIR", "Para a próxima reunião", ["Uma página com os limites de perda e de parada.", "A lista do que é inaceitável.", "Quem aprova exceções e por quanto tempo."]),
   ("end", "AGORA ME RESPONDA", "O apetite de risco da sua empresa [[está escrito]]?", "Responde nos comentários: sim, em parte ou não."),
  ],
  texto="""Quanto risco a empresa aceita? Se ninguém escreveu, ninguém sabe.

Três perguntas de conselho sobre apetite de risco:
1. Que perda aceitamos sem levar ao conselho? Um valor e um tempo de parada.
2. O que não pode acontecer de jeito nenhum? Para esses casos, tolerância perto de zero.
3. Quem pode aceitar risco acima do limite, e por quanto tempo? Aceite sem prazo vira permanente.

Uma página escrita evita duas coisas: gastar demais com o que não importa e de menos com o que importa.

O apetite de risco da sua empresa está escrito? Responde nos comentários: sim, em parte ou não.

""" + SERIE.format(n=9)),

 dict(slug="2027-03-31-ig-golpe-receita", rede="instagram", data="2027-03-31T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Época de imposto de renda é época de [[golpe da Receita]].", "Como se proteger →"),
   ("text", "O GOLPE", "Mensagem com link", "SMS, e-mail ou WhatsApp dizendo que há pendência, multa ou restituição, com um link para resolver."),
   ("text", "A REGRA", "Vá pelo caminho oficial", "Não clique. Digite você mesmo o endereço da Receita no navegador e confira no e-CAC, entrando com a sua conta gov.br."),
   ("text", "E MAIS", "Nada de pagar por link", "A Receita não manda cobrança por WhatsApp, SMS ou e-mail com link. Boleto ou Pix recebido assim é golpe."),
   ("end", "AGORA ME RESPONDE", "Você já recebeu mensagem [[falsa da Receita]]?", "Manda este post para quem faz a sua declaração."),
  ],
  texto="""Época de imposto de renda é época de golpe da Receita.

O golpe: SMS, e-mail ou WhatsApp dizendo que há pendência, multa ou restituição, com um link para resolver.

Como se proteger:
1. Não clique. Digite você mesmo o endereço da Receita no navegador e confira no e-CAC, entrando com a sua conta gov.br.
2. Pendência de verdade aparece no sistema oficial.
3. A Receita não manda cobrança por WhatsApp, SMS ou e-mail com link. Boleto ou Pix recebido assim é golpe.

Vale para você e para o CNPJ do seu Negócio.

Você já recebeu mensagem falsa da Receita? Manda este post para quem faz a sua declaração.

#impostoderenda #golpe #empreendedorismo #mei #segurançadigital"""),

 dict(slug="2027-04-01-registros", rede="linkedin", data="2027-04-01T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "Registro que ninguém lê só serve [[depois]] do estrago.", "3 decisões sobre registros →"),
   ("text", "DECISÃO Nº 1", "O que registrar", "Login, mudança de acesso, ação de administrador e saída de dados. Comece pelos sistemas críticos."),
   ("text", "DECISÃO Nº 2", "Por quanto tempo guardar", "O suficiente para investigar um ataque que só foi percebido meses depois, e o que a lei ou o contrato pedirem."),
   ("text", "DECISÃO Nº 3", "Quem olha, e quando", "Alerta para o que é grave, revisão periódica para o resto. Registro sem dono é só armazenamento."),
   ("end", "AGORA ME RESPONDA", "Na sua empresa, alguém [[olha os registros]] antes do incidente?", "Responde nos comentários: sim, às vezes ou só depois."),
  ],
  texto="""Registro que ninguém lê só serve depois do estrago.

Os registros de acesso e de atividade dos sistemas contam a história de um ataque. Mas só ajudam a evitar o próximo se alguém olhar antes.

Três decisões:
1. O que registrar: login, mudança de acesso, ação de administrador e saída de dados.
2. Por quanto tempo guardar: o suficiente para investigar um ataque percebido meses depois, e o que a lei ou o contrato pedirem.
3. Quem olha, e quando: alerta para o que é grave, revisão periódica para o resto.

Na sua empresa, alguém olha os registros antes do incidente? Responde nos comentários: sim, às vezes ou só depois.

""" + IG),

 dict(slug="2027-04-02-culpa-nao-e-causa", rede="linkedin", data="2027-04-02T11:00:00", tipo="imagem",
  slides=[("cover", "\"Foi erro humano\" [[não é causa raiz]].", "Por que, na legenda ↓")],
  texto=""""Foi erro humano" não é causa raiz.

Quando um incidente termina com "a pessoa clicou" ou "o analista errou", a investigação parou cedo demais.

As perguntas que vêm depois:
1. Por que o processo permitiu que um clique causasse tanto estrago?
2. Por que o erro não foi percebido antes?
3. O que a pessoa sabia, e o que deveria saber, naquele momento?

Empresa que pune quem erra aprende a esconder erro. Empresa que corrige o processo aprende a errar menos.

Na sua empresa, depois de um incidente, se procura um culpado ou uma causa? Me conta nos comentários.

""" + IG),

 # ---------------- semana 06–09/04 ----------------
 dict(slug="2027-04-06-pc-auditoria", rede="linkedin", data="2027-04-06T11:00:00", tipo="documento",
  titulo_doc="Pergunta de conselho: auditoria",
  slides=[
   ("cover", "O que o conselho deve pedir à [[auditoria]] sobre cibersegurança.", "Série Pergunta de conselho, parte 10 →"),
   ("text", "PERGUNTA Nº 1", "O que foi testado, e não só documentado?", "Ver a política é diferente de ver o controle funcionando. Peça o que foi testado na prática."),
   ("text", "PERGUNTA Nº 2", "Que achados antigos continuam abertos?", "Achado repetido de um ano para o outro é sinal de decisão que ninguém tomou."),
   ("text", "PERGUNTA Nº 3", "Quem é dono de cada achado?", "Um nome na área de negócio, com prazo. Achado sem dono vira item permanente do relatório."),
   ("list", "O QUE PEDIR", "Para a próxima reunião", ["Os controles testados no último ciclo.", "Os achados abertos há mais de 1 ano.", "O dono e o prazo de cada um."]),
   ("end", "AGORA ME RESPONDA", "Na sua empresa, há achado de cibersegurança [[aberto há mais de 1 ano]]?", "Responde nos comentários: sim, não ou não sei."),
  ],
  texto="""O que o conselho deve pedir à auditoria sobre cibersegurança.

Três perguntas de conselho:
1. O que foi testado, e não só documentado? Ver a política é diferente de ver o controle funcionando.
2. Que achados antigos continuam abertos? Achado repetido de um ano para o outro é decisão que ninguém tomou.
3. Quem é dono de cada achado? Um nome na área de negócio, com prazo.

A auditoria interna é a terceira linha do modelo de governança. Ela só protege se o conselho cobrar o que ela encontrou.

Na sua empresa, há achado de cibersegurança aberto há mais de 1 ano? Responde nos comentários: sim, não ou não sei.

""" + SERIE.format(n=10)),

 dict(slug="2027-04-07-treinar-ia", rede="linkedin", data="2027-04-07T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "Treinar a equipe em IA é [[controle]], não benefício.", "O que todo treino precisa ter →"),
   ("text", "TEMA Nº 1", "O que não colar", "Dados de clientes, contratos, código e estratégia. Com exemplos do dia a dia de cada área."),
   ("text", "TEMA Nº 2", "Como conferir a resposta", "A IA pode errar com confiança. Fato importante se confere na fonte."),
   ("text", "TEMA Nº 3", "A quem avisar", "Se algo der errado, a pessoa sabe para quem contar, sem medo de punição."),
   ("end", "AGORA ME RESPONDA", "A sua equipe já recebeu [[treino]] para usar IA?", "Responde nos comentários: sim, não ou está nos planos."),
  ],
  texto="""Treinar a equipe em IA é controle, não benefício.

A política de IA diz o que pode. O treino garante que as pessoas saibam aplicar.

O que todo treino precisa ter:
1. O que não colar: dados de clientes, contratos, código e estratégia, com exemplos do dia a dia de cada área.
2. Como conferir a resposta: fato importante se confere na fonte.
3. A quem avisar: se algo der errado, a pessoa sabe para quem contar, sem medo de punição.

Uma hora bem feita vale mais que um documento de 20 páginas que ninguém lê.

A sua equipe já recebeu treino para usar IA? Responde nos comentários: sim, não ou está nos planos.

""" + IG),

 dict(slug="2027-04-07-ig-tres-copias", rede="instagram", data="2027-04-07T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Se o computador do seu Negócio morrer hoje, o que você [[perde]]?", "A regra das 3 cópias →"),
   ("text", "CÓPIA Nº 1", "O original", "Os arquivos no computador ou no celular onde você trabalha."),
   ("text", "CÓPIA Nº 2", "Na nuvem", "Uma cópia automática na nuvem, com histórico de versões e confirmação em duas etapas."),
   ("text", "CÓPIA Nº 3", "Fora da internet", "Um HD externo que fica desconectado do computador, atualizado pelo menos uma vez por mês."),
   ("end", "AGORA ME RESPONDE", "Quantas cópias dos arquivos do seu Negócio [[você tem]]?", "Me conta no direct: 1, 2 ou 3."),
  ],
  texto="""Se o computador do seu Negócio morrer hoje, o que você perde?

A regra das 3 cópias:
1. O original, no computador ou no celular onde você trabalha.
2. Uma cópia automática na nuvem, com histórico de versões e confirmação em duas etapas.
3. Uma cópia fora da internet, num HD externo que fica desconectado do computador e é atualizado pelo menos uma vez por mês.

A terceira é a que salva quando um vírus apaga ou sequestra o que está conectado.

E uma vez por mês, abra um arquivo da cópia para ter certeza de que ela funciona.

Quantas cópias dos arquivos do seu Negócio você tem? Me conta no direct: 1, 2 ou 3.

#backup #empreendedorismo #segurançadigital #dicas #cibersegurança"""),

 dict(slug="2027-04-08-tempo-e-dado", rede="linkedin", data="2027-04-08T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "Quanto tempo parado e quanto dado [[perdido]] a empresa aguenta?", "RTO e RPO em linguagem de diretoria →"),
   ("text", "TEMPO PARA VOLTAR (RTO)", "Em quantas horas o processo precisa voltar?", "Depois disso, a parada vira multa, cliente perdido ou operação travada."),
   ("text", "DADO QUE PODE PERDER (RPO)", "Quantas horas de dados a empresa aceita refazer?", "Se a última cópia é de ontem à noite, o dia inteiro precisa ser refeito."),
   ("text", "A CONTA", "Os dois números definem o investimento", "Voltar em 1 hora custa mais que voltar em 2 dias. A diretoria decide quanto vale cada processo."),
   ("end", "AGORA ME RESPONDA", "A sua empresa tem esses dois números [[por processo]]?", "Responde nos comentários: sim, alguns ou não."),
  ],
  texto="""Quanto tempo parado e quanto dado perdido a empresa aguenta?

Dois números traduzem continuidade para a diretoria:
1. Tempo para voltar (RTO): em quantas horas o processo precisa voltar antes que a parada vire multa ou cliente perdido.
2. Dado que pode perder (RPO): quantas horas de dados a empresa aceita refazer. Se a última cópia é de ontem à noite, o dia inteiro precisa ser refeito.

Os dois definem o investimento. Voltar em 1 hora custa mais que voltar em 2 dias. Quem decide quanto vale cada processo é o negócio.

A sua empresa tem esses dois números por processo? Responde nos comentários: sim, alguns ou não.

""" + BAST),

 dict(slug="2027-04-09-metas-teatro", rede="linkedin", data="2027-04-09T11:00:00", tipo="imagem",
  slides=[("cover", "Meta de segurança que só mede [[esforço]] vira teatro.", "A diferença, na legenda ↓")],
  texto="""Meta de segurança que só mede esforço vira teatro.

"100% da equipe fez o treinamento" mede esforço.
"O tempo até alguém avisar sobre um e-mail suspeito caiu pela metade" mede resultado.

Três trocas que melhoram o relatório:
1. Quantidade de treinos → quantas pessoas avisaram sobre uma tentativa real.
2. Quantidade de alertas → tempo para perceber e conter.
3. Quantidade de políticas → controles testados que funcionaram.

O conselho não precisa saber quanto a equipe trabalhou. Precisa saber se o risco caiu.

Qual meta de segurança da sua empresa mede esforço e não resultado? Me conta nos comentários.

""" + IG),

 # ---------------- semana 13–16/04 (14/04 newsletter) ----------------
 dict(slug="2027-04-13-pc-resumo", rede="linkedin", data="2027-04-13T11:00:00", tipo="documento",
  titulo_doc="Pergunta de conselho: as perguntas da série",
  slides=[
   ("cover", "As perguntas de conselho [[em uma página]].", "Série Pergunta de conselho, parte 11 →"),
   ("table", "PARTES 1 A 5", "Medir, continuar, proteger", [
     ("Indicadores", "Em quanto tempo percebemos e contemos um ataque?"),
     ("Continuidade", "O plano foi testado nos últimos 12 meses?"),
     ("Fraude", "Uma pessoa sozinha consegue mudar dados bancários e pagar?"),
     ("Conformidade", "Quem acompanha o que o regulador muda?"),
     ("Reputação", "A primeira mensagem da crise já está escrita?"),
   ]),
   ("table", "PARTES 6 A 10", "Contratar, decidir, cobrar", [
     ("Contratos", "Em quanto tempo o fornecedor nos avisa de um incidente?"),
     ("IA", "Que uso de IA traz valor, e quem assina o risco?"),
     ("Seguro", "O que a apólice exclui?"),
     ("Apetite de risco", "Que perda aceitamos sem levar ao conselho?"),
     ("Auditoria", "Que achados antigos continuam abertos?"),
   ]),
   ("end", "AGORA ME RESPONDA", "Qual dessas perguntas o seu conselho [[ainda não fez]]?", "Responde nos comentários com o tema."),
  ],
  texto="""As perguntas de conselho em uma página.

Em 10 partes, a série "Pergunta de conselho" passou por indicadores, continuidade, fraude, conformidade, reputação, contratos, IA, seguro cibernético, apetite de risco e auditoria. Uma pergunta de cada:

1. Em quanto tempo percebemos e contemos um ataque?
2. O plano de continuidade foi testado nos últimos 12 meses?
3. Uma pessoa sozinha consegue mudar dados bancários e pagar?
4. Quem acompanha o que o regulador muda?
5. A primeira mensagem da crise já está escrita?
6. Em quanto tempo o fornecedor nos avisa de um incidente?
7. Que uso de IA traz valor, e quem assina o risco?
8. O que a apólice de seguro exclui?
9. Que perda aceitamos sem levar ao conselho?
10. Que achados de auditoria continuam abertos?

Qual dessas perguntas o seu conselho ainda não fez? Responde nos comentários com o tema.

""" + SERIE.format(n=11)),

 dict(slug="2027-04-14-ig-lista-semestre", rede="instagram", data="2027-04-14T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "5 coisas que o seu Negócio [[já deveria ter feito]] neste semestre.", "Confere a lista →"),
   ("list", "PROTEÇÃO", "Contas", ["Confirmação em duas etapas no e-mail, no banco e no WhatsApp.", "Gerenciador de senhas, uma senha por conta."]),
   ("list", "DINHEIRO", "Pagamentos", ["Pagamento novo confirmado por telefone conhecido.", "Pix conferido no app, não no comprovante."]),
   ("list", "CONTINUIDADE", "Cópias", ["Cópia dos arquivos fora do computador, testada."]),
   ("end", "AGORA ME RESPONDE", "Quantas das 5 o seu Negócio [[já fez]]?", "Me conta no direct o número. Eu te ajudo com o resto."),
  ],
  texto="""5 coisas que o seu Negócio já deveria ter feito neste semestre:

1. Confirmação em duas etapas no e-mail, no banco e no WhatsApp.
2. Gerenciador de senhas, com uma senha diferente para cada conta.
3. Pagamento novo confirmado por telefone já conhecido.
4. Pix conferido no app do banco, não no comprovante.
5. Cópia dos arquivos fora do computador, testada.

Nenhuma delas exige comprar ferramenta cara. Todas exigem decidir fazer.

Quantas das 5 o seu Negócio já fez? Me conta no direct o número. Eu te ajudo com o resto.

#empreendedorismo #segurançadigital #cibersegurança #gestão #dicas"""),

 dict(slug="2027-04-15-cinco-controles", rede="linkedin", data="2027-04-15T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "Se eu tivesse que escolher [[5 controles]] para começar.", "Os que, na minha leitura, mais reduzem risco por real investido →"),
   ("list", "CONTAS", "Acesso", ["Segunda etapa de login em todas as contas críticas.", "Conta de administrador individual, nunca compartilhada."]),
   ("list", "DINHEIRO", "Pagamentos", ["Confirmação por outro canal para pagamento fora do padrão."]),
   ("list", "CONTINUIDADE", "Recuperação", ["Cópia fora da rede, com restauração testada.", "Plano de crise impresso, com contatos fora do e-mail."]),
   ("end", "AGORA ME RESPONDA", "Quais desses 5 a sua empresa [[já tem]]?", "Responde nos comentários com o número."),
  ],
  texto="""Se eu tivesse que escolher 5 controles para começar:

1. Segunda etapa de login em todas as contas críticas.
2. Conta de administrador individual, nunca compartilhada.
3. Confirmação por outro canal para pagamento fora do padrão.
4. Cópia fora da rede, com restauração testada.
5. Plano de crise impresso, com contatos fora do e-mail.

Não são os únicos. São os que, na minha leitura, mais reduzem risco por real investido, e nenhum depende de ferramenta cara.

Quais desses 5 a sua empresa já tem? Responde nos comentários com o número.

""" + IG),

 dict(slug="2027-04-16-proximo-semestre", rede="linkedin", data="2027-04-16T11:00:00", tipo="imagem",
  slides=[("cover", "Três decisões de cibersegurança para levar ao [[próximo semestre]].", "As decisões, na legenda ↓")],
  texto="""Três decisões de cibersegurança para levar ao próximo semestre.

1. Escolher os 3 números que o conselho vai acompanhar a cada trimestre, e quem traz cada um.
2. Testar o plano de crise com a diretoria na sala, com cronômetro, até o fim do próximo semestre.
3. Escrever em uma página quanto risco a empresa aceita, e quem pode aceitar mais que isso.

Nenhuma delas é técnica. Todas cabem em uma reunião de diretoria.

Qual dessas a sua empresa vai fazer primeiro? Me conta nos comentários.

""" + IG),
]
