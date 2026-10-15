CAL = "https://calendly.com/jessica-gessoli-zethic/conversa-de-30-minutos-com-a-jessica-gessoli"
COMENTARIO_PT = "Se a sua diretoria quer transformar risco cibernético em decisão, vamos conversar 30 minutos: " + CAL
COMENTARIO_EN = "If your board wants to turn cyber risk into business decisions, let's talk for 30 minutes: " + CAL

# Slide kinds: cover(h, cta) | text(eyebrow, title, body) | list(eyebrow, title, items) | end(eyebrow, title, body)
# [[palavra]] = destaque em latão

POSTS = [
 dict(slug="2026-10-22-susep-638", rede="linkedin", data="2026-10-22T11:00:00", tipo="documento",
  titulo_doc="O que o regulador exige do board: seguradoras",
  slides=[
   ("cover", "Seguradora: a SUSEP já cobra cibersegurança do [[CONSELHO]].", "O que mudou em 2026 →"),
   ("text", "A REGRA BASE", "Circular SUSEP 638/2021", "Continua valendo. Pede política de segurança cibernética, resposta a incidentes e regras para terceirizar processamento e armazenamento de dados, inclusive em nuvem."),
   ("text", "O QUE MUDOU EM 2026", "Contratos na mesa da Susep", "A Resolução Susep 90/2026, de 20/08, alterou a Circular 638: contratos de terceirização de dados, com alterações e aditivos, precisam estar acessíveis à Susep quando ela pedir."),
   ("text", "E MAIS", "Manual de Orientações", "Em julho de 2026, a Susep publicou um manual orientativo com o que espera na política, nos incidentes, na continuidade e no relatório anual sobre incidentes e vulnerabilidades."),
   ("list", "PARA O CONSELHO", "3 perguntas para a próxima reunião", ["Sabemos quais fornecedores processam nossos dados?", "Os contratos e aditivos estão prontos se a Susep pedir amanhã?", "Quem aprova a política e quem lê o relatório anual de incidentes?"]),
   ("end", "AGORA ME RESPONDA", "Quantos dos seus contratos de nuvem você consegue [[mostrar hoje]]?", "Fontes: Susep e CQCS (julho e agosto de 2026)."),
  ],
  texto="""Seguradora: a SUSEP já cobra cibersegurança do conselho, e 2026 trouxe duas mudanças.

A Circular SUSEP 638/2021 continua valendo: política de segurança cibernética, resposta a incidentes e regras para terceirizar dados e nuvem.

O que mudou:
1. A Resolução Susep 90/2026, de 20/08, exige que contratos de terceirização de dados, com alterações e aditivos, estejam acessíveis à Susep quando ela pedir.
2. Em julho, a Susep publicou um Manual de Orientações sobre Segurança Cibernética, orientativo, com o que espera da política, dos incidentes e do relatório anual.
3. Na prática, o fornecedor de nuvem virou assunto de conselho, não só de TI.

Pergunta honesta: se a Susep pedir amanhã os contratos de nuvem e os aditivos, quanto tempo a sua empresa leva para entregar?

Série "O que o regulador exige do board", parte 2. No Instagram @jessicagessoli eu traduzo esses temas para quem é dono do Negócio."""),

 dict(slug="2026-10-23-ti-to-operacao", rede="linkedin", data="2026-10-23T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "Quando o ataque chega na operação, o problema [[não é mais]] de TI.", "TI e TO para quem decide →"),
   ("text", "DUAS REDES, DOIS MUNDOS", "TI e TO", "TI cuida de dados e escritório: e-mail, ERP, sistemas de venda. TO comanda o mundo físico: sinalização, energia, sensores, trens."),
   ("text", "O RISCO", "Quando as duas se encontram", "A TO foi feita para nunca parar, não para receber atualização toda semana. Quando ela se liga à rede da TI, herda as ameaças da TI."),
   ("text", "O QUE EU VI EM FERROVIA", "O crítico que ninguém lista", "Fiz teste de estresse no prédio inteiro e implantei links de rádio. A operação dependia de comunicação que não aparecia em nenhuma lista de sistemas críticos."),
   ("list", "PARA A DIRETORIA", "3 perguntas", ["A rede da operação está separada da rede do escritório?", "Quem acessa os sistemas da operação de fora da empresa?", "Quantas horas a operação aguenta sem a TI?"]),
   ("end", "AGORA ME RESPONDA", "Na sua empresa, quem é o [[dono]] do risco da operação?", "TI, operação ou ninguém? Responde nos comentários."),
  ],
  texto="""Quando o ataque chega na operação, o problema não é mais de TI.

TI cuida de dados e escritório. TO, a tecnologia operacional, comanda o mundo físico: sinalização, energia, sensores, trens.

O risco aparece quando as duas se encontram. A TO foi feita para nunca parar, não para receber atualização toda semana, e herda as ameaças da TI quando se liga a ela.

Em infraestrutura crítica ferroviária, fiz teste de estresse no prédio inteiro e implantei links de rádio. A operação dependia de comunicação que não aparecia em nenhuma lista de sistemas críticos.

Três perguntas para a diretoria:
1. A rede da operação está separada da rede do escritório?
2. Quem acessa os sistemas da operação de fora da empresa?
3. Quantas horas a operação aguenta sem a TI?

Na sua empresa, quem é o dono do risco da operação: TI, operação ou ninguém? Me conta nos comentários.

Os bastidores dessa rotina eu mostro no Instagram @jessicagessoli."""),

 dict(slug="2026-10-27-aneel-964", rede="linkedin", data="2026-10-27T11:00:00", tipo="documento",
  titulo_doc="O que o regulador exige do board: setor elétrico",
  slides=[
   ("cover", "Setor elétrico: cibersegurança é [[obrigação]] desde 2022.", "O que a ANEEL pede →"),
   ("text", "A REGRA", "REN ANEEL 964/2021", "Pede política de segurança cibernética, um modelo de maturidade aplicado todo ano, classificação de dados e procedimentos para prevenir e tratar incidentes. Prazo de adequação: 1º de julho de 2022."),
   ("text", "NOTIFICAR E COMPARTILHAR", "Ninguém resolve sozinho", "Incidentes de maior impacto vão para a equipe de coordenação setorial. Informações sobre ameaças são compartilhadas entre os agentes, de forma sigilosa."),
   ("text", "EM 2026", "A ANEEL reforçou a governança", "As Portarias ANEEL 7.058 e 7.062, de fevereiro de 2026, reforçaram a governança de cibersegurança, inclusive com uma equipe de resposta a incidentes dentro da própria agência."),
   ("list", "PARA O CONSELHO", "3 perguntas", ["Qual foi o resultado do último modelo de maturidade, e o que mudou depois dele?", "Quem decide notificar a equipe setorial, e em quanto tempo?", "Os registros pedidos pela ANEEL estão prontos para envio?"]),
   ("end", "AGORA ME RESPONDA", "A maturidade da sua empresa [[subiu]] desde a última medição?", "Fontes: ANEEL, Brasil Energia (2022) e Machado Meyer (maio de 2026)."),
  ],
  texto="""Setor elétrico: cibersegurança deixou de ser boa prática e virou obrigação em 2022.

A REN ANEEL 964/2021 pede política de segurança cibernética, modelo de maturidade aplicado todo ano, classificação de dados e procedimentos para prevenir e tratar incidentes. O prazo de adequação foi 1º de julho de 2022.

Três pontos que chegam ao conselho:
1. Incidentes de maior impacto vão para a equipe de coordenação setorial.
2. Ameaças são compartilhadas entre os agentes, de forma sigilosa.
3. Em fevereiro de 2026, as Portarias ANEEL 7.058 e 7.062 reforçaram a governança de cibersegurança.

A pergunta que eu levaria à próxima reunião: a maturidade da empresa subiu desde a última medição, e o que mudou por causa dela?

Série "O que o regulador exige do board", parte 3. No Instagram @jessicagessoli eu traduzo esses temas para quem é dono do Negócio."""),

 dict(slug="2026-10-28-ia-5-controles", rede="linkedin", data="2026-10-28T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "Antes de colocar IA em [[produção]]: 5 controles mínimos.", "Governança de IA na prática →"),
   ("text", "CONTROLE Nº 1", "Inventário", "Saber quais modelos e ferramentas de IA estão em uso, por quem e com quais dados. O que não está na lista não tem dono."),
   ("text", "CONTROLE Nº 2", "Regra para os dados de entrada", "Definir por escrito o que pode e o que nunca pode entrar num prompt: dado de cliente, contrato, código, estratégia."),
   ("text", "CONTROLE Nº 3", "Um dono de negócio por caso de uso", "Cada uso de IA precisa de um responsável na área que se beneficia dele. A TI cuida da ferramenta; o risco é do negócio."),
   ("text", "CONTROLE Nº 4", "Testar antes e vigiar depois", "Testar respostas erradas, vazamento de dados e manipulação do prompt antes de liberar. Depois, acompanhar o uso real."),
   ("text", "CONTROLE Nº 5", "Plano de saída", "Saber como desligar a IA ou voltar ao processo manual se ela errar. Sem isso, o erro vira rotina."),
   ("end", "AGORA ME RESPONDA", "Quantos desses 5 a sua empresa [[já tem]]?", "Responde nos comentários com um número de 0 a 5."),
  ],
  texto="""Antes de colocar IA em produção, cinco controles mínimos. Nenhum deles exige comprar ferramenta nova.

1. Inventário: quais modelos estão em uso, por quem e com quais dados.
2. Regra para os dados de entrada: o que nunca pode entrar num prompt.
3. Um dono de negócio por caso de uso. A TI cuida da ferramenta; o risco é do negócio.
4. Testar antes e vigiar depois: respostas erradas, vazamento e manipulação do prompt.
5. Plano de saída: como desligar ou voltar ao processo manual se a IA errar.

Quantos desses 5 a sua empresa já tem? Responde com um número de 0 a 5.

No Instagram @jessicagessoli eu mostro a versão desses controles para quem é dono do Negócio."""),

 dict(slug="2026-10-29-board-cyber-brazil-en", rede="linkedin", data="2026-10-29T11:00:00", tipo="imagem-tabela",
  slides=[
   ("table", "ONE PAGE FOR THE BOARD", "Cyber rules in Brazil's regulated sectors",
    [("Banks", "CMN Resolution 4,893/2021, amended by CMN 5,274/2025"),
     ("Insurers", "SUSEP Circular 638/2021, amended by Susep Resolution 90/2026"),
     ("Power", "ANEEL Normative Resolution 964/2021"),
     ("Anyone with personal data", "ANPD Resolution 15/2024: notify relevant incidents within 3 business days")]),
  ],
  texto="""Board-level cyber risk in Brazil's regulated sectors, on one page.

If your company operates in Brazil, these are the rules your board should know by name:

1. Banks: CMN Resolution 4,893/2021, amended by CMN Resolution 5,274/2025.
2. Insurers: SUSEP Circular 638/2021, amended by Susep Resolution 90/2026.
3. Power: ANEEL Normative Resolution 964/2021.
4. Anyone handling personal data: ANPD Resolution 15/2024, which sets 3 business days to notify relevant incidents.

Different regulators, same question for the board: who owns cyber risk, and how fast can we prove it?

Which of these is on your board's agenda this year?

I share the Portuguese version of these topics for business owners on Instagram @jessicagessoli."""),

 dict(slug="2026-10-30-sala-de-crise", rede="linkedin", data="2026-10-30T11:00:00", tipo="imagem",
  slides=[("cover", "Na sala de crise, o primeiro inimigo é a [[dúvida]].", "O que aprendi em incidentes críticos, na legenda ↓")],
  texto="""Na sala de crise, o primeiro inimigo não é o ataque. É a dúvida.

Já estive em sala de crise de banco, com sistema crítico parado e cliente esperando. O que separa uma crise curta de uma longa raramente é técnico:

1. Um comandante só. Quando todo mundo decide, ninguém decide.
2. Linha do tempo escrita desde o primeiro minuto. A memória falha às 3 da manhã.
3. Atualização curta para a diretoria em horário fixo, mesmo sem novidade. Silêncio vira boato.

A sua empresa já sabe quem comanda a próxima crise? Me conta nos comentários.

Os bastidores dessa rotina eu mostro no Instagram @jessicagessoli."""),

 dict(slug="2026-11-03-anpd-incidente", rede="linkedin", data="2026-11-03T11:00:00", tipo="documento",
  titulo_doc="O que o regulador exige do board: dados pessoais",
  slides=[
   ("cover", "Vazou dado pessoal? O relógio da ANPD [[já começou]].", "O que o board precisa saber →"),
   ("text", "A REGRA", "Resolução CD/ANPD 15/2024", "Incidente que possa causar risco ou dano relevante aos titulares deve ser comunicado à ANPD em até 3 dias úteis."),
   ("list", "QUANDO É RELEVANTE", "Afeta direitos e envolve ao menos um destes dados", ["Sensíveis, ou de crianças, adolescentes e idosos", "Financeiros ou de autenticação", "Protegidos por sigilo, ou em larga escala"]),
   ("text", "MESMO SEM COMUNICAR", "O registro é obrigatório", "Todo incidente, comunicado ou não, fica registrado por pelo menos 5 anos."),
   ("list", "PARA O CONSELHO", "3 perguntas", ["Quem decide se o incidente é relevante?", "Em 3 dias úteis, temos o que a ANPD vai pedir?", "Onde está o registro dos incidentes dos últimos anos?"]),
   ("end", "AGORA ME RESPONDA", "Sua empresa conseguiria comunicar em [[3 dias úteis]]?", "Fonte: Resolução CD/ANPD 15/2024 (KLA Advogados)."),
  ],
  texto="""Vazou dado pessoal? O relógio da ANPD já começou.

A Resolução CD/ANPD 15/2024 manda comunicar à ANPD, em até 3 dias úteis, o incidente que possa causar risco ou dano relevante aos titulares.

Três pontos que o board precisa ter claros:
1. É relevante quando afeta direitos dos titulares e envolve dados sensíveis, de crianças, adolescentes ou idosos, financeiros, de autenticação, protegidos por sigilo ou em larga escala.
2. Todo incidente, comunicado ou não, fica registrado por pelo menos 5 anos.
3. Três dias úteis passam rápido quando ninguém sabe quem decide.

A sua empresa conseguiria comunicar em 3 dias úteis? Me conta nos comentários.

Série "O que o regulador exige do board", parte 4. No Instagram @jessicagessoli eu traduzo esses temas para quem é dono do Negócio."""),

 dict(slug="2026-11-05-pontos-unicos-falha", rede="linkedin", data="2026-11-05T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "3 pontos únicos de [[falha]] que ninguém audita.", "Portos, ferrovias e operações críticas →"),
   ("text", "PONTO Nº 1", "O link de comunicação", "Rádio e enlaces que ligam a operação ao centro de controle. Se o link cai, o plano não chega a quem precisa agir."),
   ("text", "PONTO Nº 2", "A energia do centro de controle", "Nobreak e gerador testados com carga real, não só na planilha de manutenção."),
   ("text", "PONTO Nº 3", "A pessoa que sabe", "O técnico que conhece a configuração e nunca documentou. Quando ele sai de férias, o risco sai junto."),
   ("end", "AGORA ME RESPONDA", "Qual desses três a sua operação [[já testou]]?", "Responde nos comentários: 1, 2, 3 ou nenhum."),
  ],
  texto="""Três pontos únicos de falha que quase ninguém audita em operações críticas.

1. O link de comunicação. Em ferrovia, implantei links de rádio e aprendi: se o link cai, o plano não chega a quem precisa agir.
2. A energia do centro de controle. Nobreak e gerador precisam ser testados com carga real, não só na planilha.
3. A pessoa que sabe. O técnico que conhece a configuração e nunca documentou.

Nenhum dos três aparece numa auditoria de sistemas. Todos param a operação.

Qual desses três a sua operação já testou? Responde: 1, 2, 3 ou nenhum.

Os bastidores dessa rotina eu mostro no Instagram @jessicagessoli."""),

 dict(slug="2026-11-06-ia-banco-2a-linha", rede="linkedin", data="2026-11-06T11:00:00", tipo="imagem",
  slides=[("cover", "IA no banco: a 2ª linha precisa perguntar [[antes]].", "As 3 perguntas, na legenda ↓")],
  texto="""IA no banco: a segunda linha de defesa precisa perguntar antes, não depois.

Quando a área de negócio leva um modelo de IA para produção, risco e compliance costumam ser chamados no fim. Três perguntas mudam isso:

1. O modelo consegue explicar a decisão que tomou, para um cliente e para um auditor?
2. Quem valida os dados que entram no modelo, e com que frequência?
3. Como esse uso de IA aparece no inventário de riscos e no relato ao conselho?

Se a segunda linha não consegue responder às três, o modelo ainda não está pronto.

Qual dessas perguntas é a mais difícil de responder hoje? Me conta nos comentários.

No Instagram @jessicagessoli eu falo de IA para quem é dono do Negócio."""),

 # ---------------- Instagram ----------------
 dict(slug="2026-10-21-ig-ia-equipe", rede="instagram", data="2026-10-21T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Seu funcionário colou dado de cliente no ChatGPT. E [[agora]]?", "3 regras para combinar hoje →"),
   ("text", "ISSO JÁ ACONTECE", "Um em cada três", "Um terço dos profissionais usa IA que a empresa não aprovou (Thomson Reuters, 2026)."),
   ("text", "PROIBIR NÃO RESOLVE", "O uso só fica escondido", "O caminho é combinar regras simples, que a equipe entende e consegue seguir."),
   ("list", "COMBINE COM A EQUIPE", "3 regras", ["Dado de cliente não entra em IA aberta.", "As ferramentas liberadas ficam numa lista.", "Errou? Avisa na hora, sem medo de punição."]),
   ("end", "AGORA ME RESPONDE", "Sua equipe [[sabe]] essas 3 regras?", "Me chama no direct que eu te ajudo a montar."),
  ],
  texto="""Seu funcionário colou dado de cliente no ChatGPT. E agora?

Isso já acontece: um terço dos profissionais usa IA que a empresa não aprovou (Thomson Reuters, 2026).

Proibir não resolve. O uso só fica escondido. Combine 3 regras com a equipe:

1. Dado de cliente não entra em IA aberta.
2. As ferramentas liberadas ficam numa lista.
3. Errou? Avisa na hora, sem medo de punição.

Sua equipe sabe essas 3 regras? Me chama no direct que eu te ajudo a montar.

#cibersegurança #inteligenciaartificial #LGPD #empreendedorismo #segurançadainformação"""),

 dict(slug="2026-10-28-ig-ia-5-regras", rede="instagram", data="2026-10-28T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Vai usar IA com cliente? 5 regras [[antes]].", "Salva para a próxima reunião →"),
   ("list", "REGRAS 1 A 3", "Antes de começar", ["Faça a lista de quais IAs a equipe usa.", "Defina o que nunca entra no prompt.", "Escolha um responsável por cada uso."]),
   ("list", "REGRAS 4 E 5", "Antes de entregar", ["Confira a resposta antes de mandar ao cliente.", "Tenha um plano B se a IA errar ou sair do ar."]),
   ("end", "AGORA ME RESPONDE", "Quantas dessas 5 o seu Negócio [[já segue]]?", "Comenta o número ou me chama no direct."),
  ],
  texto="""Vai usar IA com cliente? Cinco regras antes.

1. Faça a lista de quais IAs a equipe usa.
2. Defina o que nunca entra no prompt.
3. Escolha um responsável por cada uso.
4. Confira a resposta antes de mandar ao cliente.
5. Tenha um plano B se a IA errar ou sair do ar.

Nenhuma exige comprar ferramenta. Exige decisão.

Quantas dessas 5 o seu Negócio já segue? Comenta o número ou me chama no direct.

#inteligenciaartificial #cibersegurança #empreendedorismo #gestão #segurançadainformação"""),

 dict(slug="2026-11-04-ig-vazou-dado", rede="instagram", data="2026-11-04T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Vazou dado de cliente? Você tem [[3 dias úteis]].", "O que a ANPD pede →"),
   ("text", "A REGRA", "Até 3 dias úteis", "A ANPD pede que o incidente com risco ou dano relevante aos titulares seja comunicado em até 3 dias úteis (Resolução CD/ANPD 15/2024)."),
   ("list", "QUANDO É RELEVANTE", "Dados que acendem o alerta", ["Dados de saúde e outros sensíveis", "Dados financeiros ou senhas", "Dados de crianças, adolescentes ou idosos"]),
   ("list", "FAÇA HOJE", "3 coisas", ["Anote onde estão os dados dos seus clientes.", "Defina quem decide se precisa comunicar.", "Guarde o registro de todo incidente por 5 anos."]),
   ("end", "AGORA ME RESPONDE", "Seu Negócio conseguiria em [[3 dias úteis]]?", "Me chama no direct que eu te mostro por onde começar."),
  ],
  texto="""Vazou dado de cliente? Você tem 3 dias úteis.

A ANPD pede que o incidente com risco ou dano relevante aos titulares seja comunicado em até 3 dias úteis (Resolução CD/ANPD 15/2024).

Acende o alerta quando envolve dados de saúde e outros sensíveis, dados financeiros ou senhas, e dados de crianças, adolescentes ou idosos.

Faça hoje:
1. Anote onde estão os dados dos seus clientes.
2. Defina quem decide se precisa comunicar.
3. Guarde o registro de todo incidente por 5 anos.

Seu Negócio conseguiria em 3 dias úteis? Me chama no direct que eu te mostro por onde começar.

#LGPD #cibersegurança #proteçãodedados #empreendedorismo #segurançadainformação"""),
]
