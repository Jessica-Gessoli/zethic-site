# Lote 3 — 26/01 a 26/02/2027
IG = "No Instagram @jessicagessoli eu traduzo esses temas para quem é dono do Negócio."
BAST = "Os bastidores dessa rotina eu mostro no Instagram @jessicagessoli."
SERIE = 'Série "Pergunta de conselho", parte {n}. ' + IG

POSTS = [
 # ---------------- semana 26–29/01 (27/01 newsletter) ----------------
 dict(slug="2027-01-26-pc-indicadores", rede="linkedin", data="2027-01-26T11:00:00", tipo="documento",
  titulo_doc="Pergunta de conselho: indicadores",
  slides=[
   ("cover", "Três números de cibersegurança que [[cabem na pauta]] do conselho.", "Série Pergunta de conselho, parte 1 →"),
   ("text", "PERGUNTA Nº 1", "Em quanto tempo percebemos e contemos um ataque?", "Se ninguém sabe a resposta, o problema já está aqui: a empresa não mede."),
   ("text", "PERGUNTA Nº 2", "Quantas contas críticas estão sem segunda etapa de login?", "Administradores, financeiro, e-mail da diretoria. O número certo é zero."),
   ("text", "PERGUNTA Nº 3", "Quando testamos a restauração e quanto tempo levou?", "Cópia que nunca foi restaurada é promessa, não é controle."),
   ("list", "COMO USAR", "Na reunião", ["Peça os 3 números a cada trimestre.", "Compare com o trimestre anterior.", "Pergunte o que muda se o número piorar."]),
   ("end", "AGORA ME RESPONDA", "O seu conselho vê [[algum desses]] números hoje?", "Responde nos comentários: 0, 1, 2 ou 3."),
  ],
  texto="""Três números de cibersegurança que cabem na pauta do conselho.

1. Em quanto tempo percebemos e contemos um ataque? Se ninguém sabe, a empresa não mede.
2. Quantas contas críticas estão sem segunda etapa de login? Administradores, financeiro e e-mail da diretoria. O número certo é zero.
3. Quando testamos a restauração e quanto tempo levou? Cópia que nunca foi restaurada é promessa, não é controle.

Peça os três a cada trimestre e compare com o anterior. O conselho não precisa entender a ferramenta. Precisa ver a tendência.

O seu conselho vê algum desses números hoje? Responde nos comentários: 0, 1, 2 ou 3.

""" + SERIE.format(n=1)),

 dict(slug="2027-01-27-ig-pix-golpe", rede="instagram", data="2027-01-27T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Caiu no golpe do Pix? Os [[primeiros minutos]] contam.", "O que fazer agora →"),
   ("text", "PASSO Nº 1", "Conteste no app do banco", "Use o botão de contestação do Pix no app ou ligue para o número oficial do banco. Peça a devolução pelo MED, o mecanismo de devolução do Pix."),
   ("text", "PASSO Nº 2", "Registre o boletim de ocorrência", "Em muitos estados, dá para fazer on-line, na delegacia virtual. Guarde o número."),
   ("text", "PASSO Nº 3", "Guarde as provas", "Comprovante, conversa, número e perfil de quem pediu. Não apague nada."),
   ("end", "AGORA ME RESPONDE", "Você sabia que o Pix tem [[mecanismo de devolução]]?", "Salva este post e manda para quem cuida do financeiro."),
  ],
  texto="""Caiu no golpe do Pix? Os primeiros minutos contam.

1. Conteste no app do banco, pelo botão de contestação do Pix, ou ligue para o número oficial. Conte que foi golpe e peça a devolução pelo MED, o Mecanismo Especial de Devolução do Pix. O prazo é de até 80 dias, mas quanto antes, melhor.
2. Registre o boletim de ocorrência. Em muitos estados, dá para fazer on-line, na delegacia virtual.
3. Guarde as provas: comprovante, conversa, número e perfil de quem pediu.

A devolução não é garantida: depende de ainda haver dinheiro na conta de quem recebeu. Por isso a pressa.

Você sabia que o Pix tem mecanismo de devolução? Salva este post e manda para quem cuida do financeiro.

#pix #golpe #empreendedorismo #segurançadigital #cibersegurança"""),

 dict(slug="2027-01-28-conta-admin-compartilhada", rede="linkedin", data="2027-01-28T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "Senha de administrador [[compartilhada]] não tem dono.", "3 correções simples →"),
   ("text", "CORREÇÃO Nº 1", "Uma conta por pessoa", "Cada administrador com o próprio login. Assim dá para saber quem fez o quê."),
   ("text", "CORREÇÃO Nº 2", "Cofre de senhas", "As contas que precisam ser compartilhadas ficam num cofre, com registro de quem pegou a senha e quando."),
   ("text", "CORREÇÃO Nº 3", "Revisão a cada 3 meses", "Quem ainda precisa de acesso de administrador? Quem não precisa, perde."),
   ("end", "AGORA ME RESPONDA", "Quantas pessoas sabem a [[senha de administrador]] da sua empresa?", "Responde nos comentários com um número. Se não sabe, já é uma resposta."),
  ],
  texto="""Senha de administrador compartilhada não tem dono.

Quando cinco pessoas usam a mesma conta, ninguém sabe quem fez a mudança que derrubou o sistema. E quando uma delas sai da empresa, a senha sai junto.

Três correções simples:
1. Uma conta por pessoa, para saber quem fez o quê.
2. Cofre de senhas para as contas que precisam ser compartilhadas, com registro de quem pegou e quando.
3. Revisão a cada 3 meses: quem não precisa mais de acesso de administrador, perde.

Quantas pessoas sabem a senha de administrador da sua empresa? Responde nos comentários com um número.

""" + IG),

 dict(slug="2027-01-29-antes-da-ferramenta", rede="linkedin", data="2027-01-29T11:00:00", tipo="imagem",
  slides=[("cover", "Antes de comprar ferramenta de segurança, faça [[3 perguntas]].", "As perguntas, na legenda ↓")],
  texto="""Antes de comprar ferramenta de segurança, faça 3 perguntas.

1. Que risco ela reduz, em linguagem de negócio? "Proteger o endpoint" não é resposta. "Evitar que o faturamento pare" é.
2. Quem vai operar? Ferramenta sem gente para olhar os alertas vira custo mensal e falsa tranquilidade.
3. Como vamos saber se funcionou? Defina o número antes da compra, não depois.

Se as três respostas não estiverem claras, a compra pode esperar. O risco não espera, mas compra errada também não o reduz.

Qual dessas perguntas mais falta na sua empresa? Me conta nos comentários.

""" + IG),

 # ---------------- semana 02–05/02 ----------------
 dict(slug="2027-02-02-pc-continuidade", rede="linkedin", data="2027-02-02T11:00:00", tipo="documento",
  titulo_doc="Pergunta de conselho: continuidade",
  slides=[
   ("cover", "Se o sistema principal parar amanhã, [[quem decide]] o quê?", "Série Pergunta de conselho, parte 2 →"),
   ("text", "PERGUNTA Nº 1", "Qual processo volta primeiro?", "A ordem de volta é decisão de negócio, não de TI. Ela define quando a receita volta."),
   ("text", "PERGUNTA Nº 2", "Quanto tempo cada processo aguenta parado?", "Em horas, com o custo de cada hora. Sem esse número, não dá para julgar o plano."),
   ("text", "PERGUNTA Nº 3", "O plano foi testado nos últimos 12 meses?", "Com cronômetro e com a diretoria na sala. Plano que só existe no papel falha no primeiro passo."),
   ("list", "O QUE PEDIR", "Para a próxima reunião", ["A lista dos processos críticos, em ordem.", "O tempo que cada um aguenta parado.", "A data e o resultado do último teste."]),
   ("end", "AGORA ME RESPONDA", "O plano de continuidade da sua empresa [[já foi testado]]?", "Responde nos comentários: sim, não ou não sei."),
  ],
  texto="""Se o sistema principal parar amanhã, quem decide o quê?

Três perguntas de conselho sobre continuidade:
1. Qual processo volta primeiro? A ordem de volta é decisão de negócio e define quando a receita volta.
2. Quanto tempo cada processo aguenta parado? Em horas, com o custo de cada hora.
3. O plano foi testado nos últimos 12 meses? Com cronômetro e com a diretoria na sala.

Para a próxima reunião, peça a lista dos processos críticos em ordem, o tempo que cada um aguenta e o resultado do último teste.

O plano de continuidade da sua empresa já foi testado? Responde nos comentários: sim, não ou não sei.

""" + SERIE.format(n=2)),

 dict(slug="2027-02-03-ia-escondida", rede="linkedin", data="2027-02-03T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "A IA que a sua equipe usa [[sem pedir]] já está dentro da empresa.", "Como trazer para a luz →"),
   ("text", "PASSO Nº 1", "Pergunte sem punir", "Uma pesquisa curta: que ferramentas de IA você usa e para quê. Quem tem medo de punição não responde."),
   ("text", "PASSO Nº 2", "Libere opções aprovadas", "Se a empresa não oferece uma ferramenta segura, a equipe usa a que encontrar."),
   ("text", "PASSO Nº 3", "Aprove rápido", "Pedido de ferramenta nova com resposta em dias, não em meses. Demora vira uso escondido."),
   ("end", "AGORA ME RESPONDA", "A sua empresa sabe [[quais IAs]] a equipe usa?", "Responde nos comentários: sim, mais ou menos ou não."),
  ],
  texto="""A IA que a sua equipe usa sem pedir já está dentro da empresa.

Proibir não resolve. Só empurra o uso para fora do radar. Três passos para trazer para a luz:

1. Pergunte sem punir: uma pesquisa curta sobre que ferramentas de IA cada pessoa usa e para quê.
2. Libere opções aprovadas. Se a empresa não oferece uma ferramenta segura, a equipe usa a que encontrar.
3. Aprove rápido. Pedido de ferramenta nova com resposta em dias, não em meses.

O risco não é a equipe usar IA. É a empresa não saber onde os dados estão indo.

A sua empresa sabe quais IAs a equipe usa? Responde nos comentários: sim, mais ou menos ou não.

""" + IG),

 dict(slug="2027-02-03-ig-celular-perdido", rede="instagram", data="2027-02-03T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Perdeu o celular? O seu [[Negócio]] pode ir junto.", "3 coisas para fazer hoje, antes de perder →"),
   ("text", "ANTES Nº 1", "Bloqueio de tela forte", "Senha ou biometria. Nada de 1234 nem de desenho fácil."),
   ("text", "ANTES Nº 2", "Localizar e apagar à distância", "Ative a função do seu celular para achar, bloquear e apagar o aparelho pela internet."),
   ("text", "ANTES Nº 3", "Cópia do WhatsApp e das fotos", "Conversas com clientes e fotos de notas fiscais precisam estar salvas fora do aparelho."),
   ("end", "AGORA ME RESPONDE", "O seu celular está [[pronto]] para ser perdido?", "Confere hoje e me conta no direct."),
  ],
  texto="""Perdeu o celular? O seu Negócio pode ir junto: banco, WhatsApp com clientes, e-mail e redes.

Três coisas para fazer hoje, antes de perder:
1. Bloqueio de tela forte. Nada de 1234 nem de desenho fácil.
2. Ative a função para localizar, bloquear e apagar o aparelho pela internet.
3. Faça cópia do WhatsApp e das fotos, porque conversas com clientes e notas fiscais precisam estar salvas fora do aparelho.

Se perder: bloqueie o chip com a operadora, avise o banco, bloqueie o aparelho pela função de localizar e troque a senha do e-mail. E deixe ativa desde já a confirmação em duas etapas do WhatsApp.

O seu celular está pronto para ser perdido? Confere hoje e me conta no direct.

#celular #segurançadigital #empreendedorismo #whatsappbusiness #cibersegurança"""),

 dict(slug="2027-02-04-plano-offline", rede="linkedin", data="2027-02-04T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "O plano de crise está no servidor que [[caiu]].", "Onde o plano precisa estar →"),
   ("text", "LUGAR Nº 1", "Fora da rede da empresa", "Uma cópia impressa e uma cópia num lugar que não depende do ambiente atacado."),
   ("text", "LUGAR Nº 2", "Contatos fora do e-mail", "Telefones da diretoria, do jurídico, da seguradora e dos fornecedores críticos, em papel e no celular."),
   ("text", "LUGAR Nº 3", "Um canal combinado", "Se o e-mail e o chat da empresa caírem, onde a diretoria se fala? Decida antes."),
   ("end", "AGORA ME RESPONDA", "Se a rede cair agora, você [[acha]] o plano de crise?", "Responde nos comentários: sim, não ou que plano?"),
  ],
  texto="""O plano de crise está no servidor que caiu.

Parece piada, mas acontece: o plano de resposta mora na pasta da rede, e a rede é uma das primeiras coisas que o ataque derruba.

Onde o plano precisa estar:
1. Fora da rede da empresa: uma cópia impressa e outra num lugar que não depende do ambiente atacado.
2. Contatos fora do e-mail: diretoria, jurídico, seguradora e fornecedores críticos, em papel e no celular.
3. Um canal combinado: se o e-mail e o chat caírem, a diretoria sabe onde se falar.

Se a rede cair agora, você acha o plano de crise? Responde nos comentários: sim, não ou que plano?

""" + BAST),

 dict(slug="2027-02-05-duas-plateias", rede="linkedin", data="2027-02-05T11:00:00", tipo="imagem",
  slides=[("cover", "O mesmo risco, contado para [[duas plateias]].", "A diferença, na legenda ↓")],
  texto="""O mesmo risco, contado para duas plateias.

Para a equipe técnica: "Há uma vulnerabilidade crítica sem correção no servidor do sistema de pedidos."

Para o conselho: "Se esse servidor for atacado, os pedidos param. Cada dia parado custa o faturamento de um dia de pedidos. A correção leva duas semanas e precisa de uma janela de manutenção que o comercial ainda não aprovou."

A primeira versão está certa. A segunda gera decisão.

Traduzir risco não é simplificar. É dizer o que muda no negócio, quanto custa e quem precisa decidir.

Como os riscos de tecnologia chegam ao conselho da sua empresa? Me conta nos comentários.

""" + IG),

 # ---------------- semana 09–12/02 (Carnaval: sem post em 09 e 10/02) ----------------
 dict(slug="2027-02-11-volta-do-feriado", rede="linkedin", data="2027-02-11T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "Voltou do feriado? [[3 conferências]] antes de seguir.", "O que olhar primeiro →"),
   ("text", "CONFERÊNCIA Nº 1", "Alertas do feriado", "Quem olhou os alertas de segurança enquanto a empresa estava fechada? Se ninguém, olhe agora."),
   ("text", "CONFERÊNCIA Nº 2", "Pagamentos agendados", "Confira se algum pagamento ou dado bancário de fornecedor mudou durante a folga."),
   ("text", "CONFERÊNCIA Nº 3", "Acessos fora do horário", "Login de madrugada, de outro país ou de quem estava de férias merece uma pergunta."),
   ("end", "AGORA ME RESPONDA", "Na sua empresa, alguém [[olha os alertas]] no feriado?", "Responde nos comentários: sim, não ou depende."),
  ],
  texto="""Voltou do feriado? Três conferências antes de seguir.

1. Alertas do feriado: quem olhou os alertas de segurança enquanto a empresa estava fechada? Se ninguém, olhe agora.
2. Pagamentos agendados: confira se algum pagamento ou dado bancário de fornecedor mudou durante a folga.
3. Acessos fora do horário: login de madrugada, de outro país ou de quem estava de férias merece uma pergunta.

Feriado não precisa de plantão completo. Precisa de alguém de sobreaviso para alerta grave e de alguém que olhe tudo na volta.

Na sua empresa, alguém olha os alertas no feriado? Responde nos comentários: sim, não ou depende.

""" + IG),

 dict(slug="2027-02-12-relatorio-1-pagina", rede="linkedin", data="2027-02-12T11:00:00", tipo="imagem",
  slides=[("cover", "Relatório de cibersegurança que o conselho lê cabe em [[1 página]].", "A estrutura, na legenda ↓")],
  texto="""Relatório de cibersegurança que o conselho lê cabe em 1 página.

A estrutura:
1. O que mudou desde a última reunião: incidentes, novos riscos, mudanças de regra.
2. O que preocupa: no máximo 3 riscos, cada um com o impacto em dinheiro, tempo ou cliente.
3. O que precisamos decidir: orçamento, prazo, risco aceito. Com opções e recomendação.

O que fica fora: lista de ferramentas, quantidade de alertas e termos técnicos sem tradução.

Se o relatório não termina com uma decisão, ele é informativo. E informativo o conselho lê depois, ou não lê.

Como é o relatório de cibersegurança que chega ao seu conselho? Me conta nos comentários.

""" + IG),

 # ---------------- semana 16–19/02 (17/02 newsletter) ----------------
 dict(slug="2027-02-16-pc-fraude", rede="linkedin", data="2027-02-16T11:00:00", tipo="documento",
  titulo_doc="Pergunta de conselho: fraude",
  slides=[
   ("cover", "Golpe no financeiro [[não é problema de TI]].", "Série Pergunta de conselho, parte 3 →"),
   ("text", "PERGUNTA Nº 1", "Quem pode mudar os dados bancários de um fornecedor?", "Se uma pessoa sozinha muda e paga, a empresa depende da atenção dela."),
   ("text", "PERGUNTA Nº 2", "Pagamento fora do padrão é confirmado por outro canal?", "Por telefone já conhecido, nunca pelo número do e-mail que pediu."),
   ("text", "PERGUNTA Nº 3", "Quanto perdemos com fraude no último ano?", "Se ninguém sabe, a perda está escondida em outra conta."),
   ("list", "O QUE PEDIR", "Para a próxima reunião", ["Quem cadastra e quem aprova pagamentos.", "A regra de confirmação por outro canal.", "As tentativas de fraude do último ano, com valores."]),
   ("end", "AGORA ME RESPONDA", "Na sua empresa, [[uma pessoa sozinha]] consegue mudar e pagar?", "Responde nos comentários: sim, não ou não sei."),
  ],
  texto="""Golpe no financeiro não é problema de TI.

Três perguntas de conselho sobre fraude:
1. Quem pode mudar os dados bancários de um fornecedor? Se uma pessoa sozinha muda e paga, a empresa depende da atenção dela.
2. Pagamento fora do padrão é confirmado por outro canal? Por telefone já conhecido, nunca pelo número do e-mail que pediu.
3. Quanto perdemos com fraude no último ano? Se ninguém sabe, a perda está escondida em outra conta.

Fraude é processo, gente e controle. A tecnologia ajuda, mas a decisão de separar funções é da diretoria.

Na sua empresa, uma pessoa sozinha consegue mudar e pagar? Responde nos comentários: sim, não ou não sei.

""" + SERIE.format(n=3)),

 dict(slug="2027-02-17-ig-ex-funcionario", rede="instagram", data="2027-02-17T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Alguém saiu da equipe? Tire os acessos [[no mesmo dia]].", "A lista do último dia →"),
   ("list", "NO ÚLTIMO DIA", "Tire o acesso a", ["E-mail e WhatsApp do Negócio.", "Banco, maquininha e sistemas.", "Redes sociais e o painel do site."]),
   ("text", "DEPOIS", "Troque as senhas que a pessoa sabia", "Principalmente a do Wi-Fi, a do e-mail principal e a das redes."),
   ("end", "AGORA ME RESPONDE", "Quem já saiu da sua equipe [[ainda tem acesso]] a alguma coisa?", "Confere hoje. Se precisar de ajuda, me chama no direct."),
  ],
  texto="""Alguém saiu da equipe? Tire os acessos no mesmo dia.

No último dia, tire o acesso a:
1. E-mail e WhatsApp do Negócio.
2. Banco, maquininha e sistemas.
3. Redes sociais e o painel do site.

Depois, troque as senhas que a pessoa sabia, principalmente a do Wi-Fi, a do e-mail principal e a das redes.

Não é desconfiança. É cuidado com o Negócio e com quem saiu também.

Quem já saiu da sua equipe ainda tem acesso a alguma coisa? Confere hoje. Se precisar de ajuda, me chama no direct.

#empreendedorismo #gestão #segurançadigital #equipe #cibersegurança"""),

 dict(slug="2027-02-18-atualizacao-adiada", rede="linkedin", data="2027-02-18T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "Atualização adiada é risco aceito [[sem assinatura]].", "Como colocar regra nisso →"),
   ("text", "REGRA Nº 1", "Prazo por gravidade", "Falha crítica tem prazo curto e definido. Falha baixa pode esperar o ciclo normal."),
   ("text", "REGRA Nº 2", "Exceção com dono", "Sistema que não pode ser atualizado vira exceção formal, com dono de negócio e data de revisão."),
   ("text", "REGRA Nº 3", "Exceção vencida vai para a diretoria", "A diretoria vê a lista de exceções vencidas e decide: corrige, isola ou aceita por escrito."),
   ("end", "AGORA ME RESPONDA", "Quem assina o risco de um sistema [[sem atualização]] na sua empresa?", "Responde nos comentários."),
  ],
  texto="""Atualização adiada é risco aceito sem assinatura.

Todo sistema que fica meses sem correção carrega um risco. Alguém aceitou esse risco, mesmo que ninguém tenha escrito.

Três regras simples:
1. Prazo por gravidade: falha crítica tem prazo curto e definido.
2. Exceção com dono: sistema que não pode ser atualizado vira exceção formal, com dono de negócio e data de revisão.
3. Exceção vencida vai para a diretoria, que decide: corrige, isola ou aceita por escrito.

Quem assina o risco de um sistema sem atualização na sua empresa? Responde nos comentários.

""" + IG),

 dict(slug="2027-02-19-dono-do-risco", rede="linkedin", data="2027-02-19T11:00:00", tipo="imagem",
  slides=[("cover", "O dono do risco cibernético [[não é a TI]].", "Por que, na legenda ↓")],
  texto="""O dono do risco cibernético não é a TI.

A TI é dona dos controles. Quem é dono do risco é a área que perde se ele acontecer.

1. Sistema de faturamento parado: o dono do risco é quem responde pela receita.
2. Vazamento de dados de clientes: quem responde pela relação com o cliente.
3. Golpe no pagamento: quem responde pelo financeiro.

Quando o dono do risco é a TI, a decisão de investir vira pedido de orçamento técnico. Quando o dono é o negócio, vira proteção do faturamento.

Na sua empresa, os riscos cibernéticos têm dono fora da TI? Me conta nos comentários.

""" + IG),

 # ---------------- semana 23–26/02 ----------------
 dict(slug="2027-02-23-pc-conformidade", rede="linkedin", data="2027-02-23T11:00:00", tipo="documento",
  titulo_doc="Pergunta de conselho: conformidade",
  slides=[
   ("cover", "Quem na empresa acompanha o que o [[regulador muda]]?", "Série Pergunta de conselho, parte 4 →"),
   ("text", "PERGUNTA Nº 1", "Que regras de cibersegurança e dados valem para nós?", "A LGPD vale para quase todos. O regulador do setor pode somar outras."),
   ("text", "PERGUNTA Nº 2", "Quem acompanha as mudanças e avisa a diretoria?", "Norma nova tem prazo. Se ninguém acompanha, a empresa descobre na fiscalização."),
   ("text", "PERGUNTA Nº 3", "Quando vimos o último relatório de aderência?", "Com o que falta cumprir, o dono de cada item e o prazo."),
   ("list", "O QUE PEDIR", "Para a próxima reunião", ["A lista das regras que se aplicam à empresa.", "O responsável por acompanhar mudanças.", "O que falta cumprir, com prazo."]),
   ("end", "AGORA ME RESPONDA", "A sua empresa sabe [[quais regras]] de cibersegurança precisa cumprir?", "Responde nos comentários: sim, mais ou menos ou não."),
  ],
  texto="""Quem na empresa acompanha o que o regulador muda?

Três perguntas de conselho sobre conformidade:
1. Que regras de cibersegurança e dados valem para nós? A LGPD vale para quase todos. O regulador do setor pode somar outras.
2. Quem acompanha as mudanças e avisa a diretoria? Norma nova tem prazo.
3. Quando vimos o último relatório de aderência, com o que falta, o dono e o prazo?

Na série "O que o regulador exige do board", mostrei o mapa dos principais reguladores. Esta é a pergunta que vem depois: quem cuida disso por nós?

A sua empresa sabe quais regras de cibersegurança precisa cumprir? Responde nos comentários: sim, mais ou menos ou não.

""" + SERIE.format(n=4)),

 dict(slug="2027-02-24-codigo-por-ia", rede="linkedin", data="2027-02-24T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "A IA já escreve código na sua empresa. [[Quem revisa]]?", "3 controles mínimos →"),
   ("text", "CONTROLE Nº 1", "Revisão humana obrigatória", "Código gerado por IA passa pela mesma revisão que o código escrito por uma pessoa. Sem atalho."),
   ("text", "CONTROLE Nº 2", "Verificação automática", "Ferramentas que procuram senhas expostas, componentes vulneráveis e falhas conhecidas antes de publicar."),
   ("text", "CONTROLE Nº 3", "Código da empresa fica na empresa", "Só ferramentas aprovadas recebem código próprio. Nada de colar em conta pessoal ou gratuita."),
   ("end", "AGORA ME RESPONDA", "O código feito com IA na sua empresa [[passa por revisão]]?", "Responde nos comentários: sempre, às vezes ou não sei."),
  ],
  texto="""A IA já escreve código na sua empresa. Quem revisa?

Assistentes de programação aceleram entregas. Também podem sugerir código com falha, e quem está com pressa aceita.

Três controles mínimos:
1. Revisão humana obrigatória, igual à do código escrito por uma pessoa.
2. Verificação automática de senhas expostas, componentes vulneráveis e falhas conhecidas antes de publicar.
3. Código da empresa só em ferramentas aprovadas. Nada de colar em conta pessoal ou gratuita, sem contrato com a empresa.

Velocidade sem revisão só adianta o problema.

O código feito com IA na sua empresa passa por revisão? Responde nos comentários: sempre, às vezes ou não sei.

""" + IG),

 dict(slug="2027-02-24-ig-wifi-separado", rede="instagram", data="2027-02-24T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "O Wi-Fi do cliente é o [[mesmo]] do seu caixa?", "Por que separar →"),
   ("text", "O RISCO", "Tudo na mesma rede", "Quem usa o Wi-Fi do cliente fica na mesma rede do computador do caixa, da maquininha e das câmeras."),
   ("text", "A SOLUÇÃO", "Rede de visitante", "A maioria dos roteadores tem a opção de rede de convidados. Uma rede para clientes, outra para o Negócio."),
   ("text", "E MAIS", "Senha trocada", "Troque a senha da rede do Negócio e a senha de administrador do roteador. Nada de deixar a de fábrica."),
   ("end", "AGORA ME RESPONDE", "O seu Negócio tem [[rede separada]] para clientes?", "Confere hoje e me conta no direct."),
  ],
  texto="""O Wi-Fi do cliente é o mesmo do seu caixa?

Quem usa o Wi-Fi do cliente fica na mesma rede do computador do caixa, da maquininha e das câmeras.

A solução é simples:
1. Use a rede de convidados do roteador. Uma rede para clientes, outra para o Negócio.
2. Troque a senha da rede do Negócio.
3. Troque a senha de administrador do roteador. Nada de deixar a de fábrica.

Se não souber fazer, peça para quem instalou a internet. Leva poucos minutos.

O seu Negócio tem rede separada para clientes? Confere hoje e me conta no direct.

#wifi #empreendedorismo #segurançadigital #comércio #cibersegurança"""),

 dict(slug="2027-02-25-licoes-aprendidas", rede="linkedin", data="2027-02-25T11:00:00", tipo="carrossel",
  slides=[
   ("cover", "Lição aprendida que ninguém aplica é só [[lição anotada]].", "Como fechar o ciclo →"),
   ("text", "PASSO Nº 1", "Registrar em até 2 semanas", "Depois de um incidente, reúna quem participou enquanto a memória está fresca."),
   ("text", "PASSO Nº 2", "Cada ação com dono e prazo", "Ação sem dono não acontece. Ação sem prazo também não."),
   ("text", "PASSO Nº 3", "Conferir em 90 dias", "Alguém de fora da equipe confere se as ações foram feitas e se funcionaram."),
   ("end", "AGORA ME RESPONDA", "As ações do último incidente da sua empresa [[foram feitas]]?", "Responde nos comentários: todas, algumas ou não sei."),
  ],
  texto="""Lição aprendida que ninguém aplica é só lição anotada.

Depois de um incidente, o relatório fica pronto, a equipe respira e as ações ficam para depois. Até o próximo incidente igual.

Como fechar o ciclo:
1. Registrar em até 2 semanas, com quem participou.
2. Cada ação com dono e prazo.
3. Conferir em 90 dias, com alguém de fora da equipe, se as ações foram feitas e se funcionaram.

As ações do último incidente da sua empresa foram feitas? Responde nos comentários: todas, algumas ou não sei.

""" + BAST),

 dict(slug="2027-02-26-palco", rede="linkedin", data="2027-02-26T11:00:00", tipo="imagem",
  slides=[("cover", "Ser apresentadora de palco me ensinou a [[falar de risco]].", "O que aprendi, na legenda ↓")],
  texto="""Ser apresentadora de palco me ensinou a falar de risco.

No Mind The Sec 2026, fui apresentadora de palco. Entre uma palestra e outra, eu tinha poucos minutos para situar uma plateia que mudava o tempo todo.

Três coisas que levei para as conversas com diretoria:
1. Comece pelo que a pessoa vai perder ou ganhar. O termo técnico vem depois, se vier.
2. Uma ideia por vez. Plateia cansada não guarda três mensagens.
3. Termine com o próximo passo. Quem sai sem saber o que fazer esquece rápido.

Conselho e plateia de evento têm uma coisa em comum: pouco tempo e muita informação disputando atenção.

Onde você aprendeu a comunicar melhor? Me conta nos comentários.

""" + BAST),
]
