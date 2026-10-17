# Post diário — semana 10 (20/12 a 26/12/2026). Tema: fim de ano e férias, quem cuida do Negócio. Natal 25/12.
TAGS = "#cibersegurança #segurançadigital #empreendedorismo #golpe #donodenegocio"

F_PCPR = {"nome": "Agência Estadual de Notícias do Paraná (Polícia Civil do Paraná)", "url": "https://www.parana.pr.gov.br/Audio/PCPR-alerta-para-golpe-do-aluguel-de-imoveis-na-temporada-de-verao"}
F_FEBRABAN = {"nome": "Febraban, publicado em O Especialista (Banco Safra)", "url": "https://oespecialista.safra.com.br/alerta-como-evitar-o-golpe-da-maquininha/"}

POSTS = [
 dict(slug="2026-12-20-jogo-semana-natal", serie="jogo", rede="instagram", data="2026-12-20T12:00:00", tipo="carrossel",
  slides=[
   ("cover", "Três mensagens da semana do Natal. [[Qual é golpe?]]", "Arrasta e tenta acertar →"),
   ("msg", "MENSAGEM 1 DE 3", "WhatsApp · Campanha de Natal", "Ajude uma família a ter ceia neste Natal. Doe qualquer valor pelo link: <u>natal-solidario.exemplo</u>"),
   ("resp", "GOLPE", "Solidariedade usada como isca", "Pedido de doação de quem você não conhece, com link. Para ajudar, doe direto a uma instituição que você já conhece, pelo canal oficial dela."),
   ("msg", "MENSAGEM 2 DE 3", "E-mail · Loja Exemplo", "Seu pedido foi entregue hoje às 14h na portaria. Obrigado pela compra e boas festas!"),
   ("resp", "NÃO É GOLPE", "Aviso de algo que você comprou", "Não pede pagamento, código nem clique. Bate com uma compra que você fez. Mesmo assim, confira o pedido no app ou no site da loja."),
   ("msg", "MENSAGEM 3 DE 3", "SMS · Cartão Benefícios", "Seu cartão foi sorteado para receber dinheiro de volta no Natal. Confirme seus dados até meia-noite: <u>premio-natal.exemplo</u>"),
   ("resp", "GOLPE", "Sorteio que você não entrou", "Sorteio sem inscrição, prazo de horas e pedido de dados por link. Benefício do cartão aparece no app oficial do banco."),
   ("end", "AGORA ME CONTA", "Quantas você [[acertou]]?", "Manda no grupo da família e vê quem acerta mais.", "Compartilhar com a família"),
  ],
  texto="""Golpe ou não? Três mensagens que chegam na semana do Natal. Arrasta e tenta acertar antes de ver a resposta.

Mensagem 1: uma campanha de Natal pedindo doação por link.
Mensagem 2: a loja avisando que o presente foi entregue na portaria.
Mensagem 3: dinheiro de volta de Natal sorteado para o seu cartão.

O que ajuda a decidir:
1. Você comprou ou se inscreveu em alguma coisa?
2. A mensagem pede Pix, dados ou clique em link?
3. Você conhece quem está pedindo ou tem pressa e prazo curto?

Mesmo quando parece legítima, confira no app ou no site de quem mandou. E, para doar, prefira quem você já conhece.

Manda no grupo da família e vê quem acerta mais. Depois comenta quantas você acertou.

#golpe #natal #boasfestas #segurançadigital #família"""),

 dict(slug="2026-12-21-golpe-aluguel-temporada", serie="golpe", rede="instagram", data="2026-12-21T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Casa barata demais? [[Golpe.]]", "", "WhatsApp · agora", "Casa para o Réveillon com vaga ainda! Preço especial só hoje. Fotos aqui: <u>casa-temporada.exemplo</u>"),
   ("text", "COMO FUNCIONA", "Anúncio copiado de casa real", "Golpistas copiam fotos e descrição de um imóvel de verdade e publicam em redes sociais, sites de anúncio e grupos de WhatsApp, com preço muito abaixo do normal."),
   ("text", "O QUE ELES QUEREM", "O sinal por Pix", "Pedem pagamento fora de plataformas conhecidas, com pressa para garantir a data. O objetivo é receber antes que você perceba que o anúncio é cópia."),
   ("list", "COMO SE PROTEGER", "Antes de pagar o sinal", ["Desconfie de preço muito abaixo e de perfil novo, sem avaliações.", "Antes do Pix, confira se o nome da conta é o do anunciante.", "Prefira plataformas que intermediam o pagamento e guardam a conversa."]),
   ("end", "AGORA ME RESPONDE", "Você já alugou casa [[por anúncio em grupo]]?", "Salva e manda para quem está procurando casa para o fim de ano."),
  ],
  texto="""Golpe da semana: a casa de temporada barata que nunca foi de quem anunciou.

A Polícia Civil do Paraná alertou para o golpe do aluguel na temporada de verão. Os golpistas copiam fotos e descrições de um imóvel de verdade e publicam anúncios duplicados, com preço muito abaixo do normal, em redes sociais, sites de anúncio e grupos de WhatsApp. Pedem o pagamento fora das plataformas conhecidas, com pressa.

Como se proteger:
1. Desconfie de preço muito abaixo do normal e de perfil novo ou sem avaliações.
2. Antes do Pix, confira se o nome do dono da conta é o mesmo do anunciante.
3. Prefira plataformas reconhecidas, que intermediam o pagamento e registram a conversa.
4. Se cair, registre o boletim de ocorrência o quanto antes, com todas as provas.

Você já alugou casa por anúncio em grupo? Salva e manda para quem está procurando casa para o fim de ano.

Fonte: Polícia Civil do Paraná, pela Agência Estadual de Notícias (link no primeiro comentário).

#golpe #aluguel #temporada #férias #segurançadigital""",
  fonte=F_PCPR),

 dict(slug="2026-12-22-ia-app-novo", serie="ia", rede="instagram", data="2026-12-22T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Baixou um app de IA nas festas? [[Confira antes]] de dar acesso.", "O que olhar →"),
   ("text", "O QUE ACONTECE", "Nome famoso não prova nada", "Qualquer pessoa pode publicar um app com nome e ícone parecidos com os de uma IA conhecida. Antes de instalar, veja quem publicou."),
   ("text", "O QUE ELE PEDE", "Acesso demais é sinal de alerta", "App de IA que pede contatos, SMS, fotos ou controle da tela sem motivo pode estar atrás dos seus dados, não do seu texto."),
   ("list", "ANTES DE INSTALAR", "Três conferências", ["Baixe só pela loja oficial e confira o nome de quem publicou.", "Negue permissão que não tem a ver com o que o app faz.", "Não envie documento, foto de cliente ou planilha do Negócio a app desconhecido."]),
   ("end", "AGORA ME CONTA", "Qual app de IA [[você usa]] no Negócio?", "Comenta aqui. E salva para conferir antes de instalar o próximo."),
  ],
  texto="""IA no Negócio: baixou um app de IA nas festas? Confira antes de dar acesso.

No fim de ano, com mais tempo livre, muita gente testa aplicativo novo. Só que qualquer pessoa pode publicar um app com nome e ícone parecidos com os de uma IA conhecida. Nome famoso não prova quem fez.

Antes de instalar:
1. Baixe só pela loja oficial do celular e confira o nome de quem publicou o aplicativo.
2. Veja as permissões. App de IA que pede contatos, SMS, fotos ou controle da tela sem motivo merece desconfiança. Negue o que não tem a ver com o que ele faz.
3. Não envie documento, foto de cliente ou planilha do Negócio para app que você não conhece.

Se já instalou e ficou na dúvida, desinstale e troque a senha que você usou para entrar nele.

Qual app de IA você usa no Negócio? Comenta aqui. E salva para conferir antes de instalar o próximo.

#inteligenciaartificial #ia #aplicativos #segurançadigital #donodenegocio"""),

 dict(slug="2026-12-23-mito-golpista-folga", serie="mito", rede="instagram", data="2026-12-23T18:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Na semana do Natal, golpista também tira folga.\"", "Arrasta para ver por quê →", "MITO"),
   ("text", "POR QUE É MITO", "A festa é a melhor hora", "Fim de ano tem mais compra, mais entrega, mais viagem e mais mensagem. Tudo o que o golpe precisa para passar no meio."),
   ("text", "O QUE MUDA NO NEGÓCIO", "Menos gente para conferir", "Com equipe de folga e você com a família, sobra pouca gente para confirmar pagamento, responder cliente e estranhar um pedido fora do comum."),
   ("list", "O QUE FAZER", "Para o feriado passar tranquilo", ["Pagamento fora do comum espera o próximo dia útil.", "Deixe claro quem pode aprovar pagamento no feriado.", "Pedido urgente de dinheiro: ligue para a pessoa antes de pagar."]),
   ("end", "AGORA ME RESPONDE", "Quem confere os pagamentos [[no seu feriado]]?", "Comenta aqui. E combina isso com a equipe ainda hoje."),
  ],
  texto="""Mito ou verdade: "Na semana do Natal, golpista também tira folga."

Mito. Fim de ano tem mais compra, mais entrega, mais viagem e mais mensagem. Tudo o que o golpe precisa para passar no meio da correria.

E no Negócio ainda tem menos gente para conferir: equipe de folga, você com a família, ninguém olhando o pagamento fora do comum.

Para o feriado passar tranquilo:
1. Pagamento fora do comum espera o próximo dia útil.
2. Deixe claro quem pode aprovar pagamento durante o feriado.
3. Pedido urgente de dinheiro, mesmo de alguém conhecido: ligue para a pessoa antes de pagar.

Descansar é parte do trabalho. Com esses combinados, dá para descansar de verdade.

Quem confere os pagamentos no seu feriado? Comenta aqui. E combina isso com a equipe ainda hoje.

""" + TAGS),

 dict(slug="2026-12-24-direct-aviso-ausencia", serie="direct", rede="instagram", data="2026-12-24T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "\"Vou fechar no feriado. [[Como aviso]] os clientes?\"", ""),
   ("text", "O CUIDADO", "Aviso que não ajuda o golpista", "Avise as datas e os canais oficiais. Não precisa dizer onde você vai estar nem que a loja vai ficar vazia."),
   ("list", "O QUE COLOCAR NO AVISO", "Modelo simples", ["Datas em que o Negócio fecha e reabre.", "Os canais oficiais de atendimento, e só eles.", "Uma frase: não pedimos pagamento por mensagem neste período."]),
   ("text", "ONDE PUBLICAR", "Nos lugares que o cliente vê", "Na mensagem de ausência do WhatsApp Business, nos destaques do Instagram e na resposta automática do e-mail."),
   ("end", "AGORA ME CONTA", "Qual a sua [[dúvida]] sobre golpe ou IA?", "Me manda no direct. A sua pode virar o post da próxima quinta."),
  ],
  texto="""Pergunta do direct: "Vou fechar o Negócio no feriado. Como aviso os clientes?"

Avisar é ótimo: o cliente se organiza e não fica sem resposta. O cuidado é não entregar informação que ajude golpista. Datas e canais oficiais, sim. Onde você vai estar e que a loja vai ficar vazia, não precisa.

O que colocar no aviso:
1. As datas em que o Negócio fecha e reabre.
2. Os canais oficiais de atendimento, e só eles.
3. Uma frase: "Não pedimos pagamento por mensagem neste período."

Onde publicar: na mensagem de ausência do WhatsApp Business, nos destaques do Instagram e na resposta automática do e-mail.

Essa última frase protege o seu cliente. Se alguém pedir Pix em nome do seu Negócio no feriado, ele já sabe que não é você.

Qual a sua dúvida sobre golpe ou IA? Me manda no direct. A sua pode virar o post da próxima quinta.

""" + TAGS),

 dict(slug="2026-12-25-checklist-natal-familia", serie="check", rede="instagram", data="2026-12-25T10:00:00", tipo="carrossel",
  slides=[
   ("cover", "Feliz Natal. 4 combinados para [[proteger a família]].", "Quantos vocês já têm? →", "1", "4"),
   ("list", "COMBINADOS 1 E 2", "Entre vocês", ["Uma palavra da família para confirmar pedido de dinheiro.", "Pedido urgente de dinheiro: liga para a pessoa antes de pagar."]),
   ("list", "COMBINADOS 3 E 4", "Com o que chega", ["Presente ou brinde inesperado que cobra taxa: desconfie.", "Ajude quem é mais velho a ativar os alertas de compra do banco."]),
   ("end", "AGORA ME RESPONDE", "Quantos dos 4 vocês [[já combinaram]]?", "Aproveita que a família está junta hoje e combina os que faltam."),
  ],
  texto="""Feliz Natal. Que hoje seja dia de mesa cheia, abraço e descanso.

E, se couber entre uma conversa e outra, aproveite que a família está junta para fazer 4 combinados simples:

1. Escolham uma palavra da família para confirmar qualquer pedido de dinheiro.
2. Pedido urgente de dinheiro por mensagem: liga para a pessoa antes de pagar.
3. Presente ou brinde inesperado que cobra taxa para ser entregue: desconfie.
4. Ajude quem é mais velho a ativar os alertas de compra do banco, para ver na hora qualquer gasto.

Os itens 3 e 4 estão entre as orientações da Febraban contra golpes com falsos entregadores.

Quantos dos 4 vocês já combinaram? Comenta aqui. E boas festas para você e para quem você ama.

Fonte: Febraban.

#natal #família #golpe #segurançadigital #cibersegurança""",
  fonte=F_FEBRABAN),

 dict(slug="2026-12-26-frase-deixar-combinado", serie="frase-lat", rede="instagram", data="2026-12-26T10:00:00", tipo="imagem",
  slides=[("quote", "Descansar também é [[deixar combinado]].", "Frase da semana · Jéssica Gessoli")],
  texto="""Descansar também é deixar combinado.

Quem aprova pagamento, o que espera a sua volta, para quem ligar se algo estranho acontecer. Combinado feito antes, descanso tranquilo depois.

Salva e manda para quem cuida do Negócio com você nesta semana entre o Natal e o Ano Novo.

""" + TAGS),
]
