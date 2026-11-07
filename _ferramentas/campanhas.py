"""Campanhas por nicho de Negócio da Zethic: uma página por nicho, fora do menu e fora do Google.

Decisão da Jéssica em 07/11/2026: o site da Zethic não se organiza por nicho de cliente, para não deixar ninguém
de fora; a navegação vai por necessidade (/para-o-seu-negocio). Os nichos ficam só nas campanhas, que são o
destino dos anúncios e das mensagens: cada uma fala a língua de um nicho (mesma promessa do anúncio), tem uma
chamada de compra só, sem menu, e não entra no Google (noindex). A campanha "TI do seu Negócio" serve a quem não
se reconhece em nenhum nicho.

Os endereços antigos /consultorio, /contabilidade e /advocacia (PR #105) redirecionam para a campanha do nicho,
para nenhum link já enviado quebrar.

Para criar um nicho novo: acrescente uma entrada em NICHOS e rode `python3 _ferramentas/campanhas.py`.
"""
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent

# Pacote de entrada de todas as campanhas: Suporte de TI Padrão + proteção para 3 pessoas (ver zethic-comprar.js).
COMPRAR = "/comprar?pacote=equipe_pequena&utm_source=campanha&utm_campaign={slug}"
# Campanhas de novembro ao Carnaval (aprovadas em 07/11/2026): vagas de implantação de janeiro, vendidas antes.
# Depois de 18/12/2026, trocar PRAZO pela campanha de janeiro (implantações e preço público).
PRAZO = ("<b>Vagas de implantação de janeiro:</b> compre até 18/12/2026 e a implantação começa a partir de 4/01/2027. "
         "A vaga fica garantida com a primeira mensalidade.")
CSP = ("default-src 'none'; script-src 'self' https://www.googletagmanager.com; img-src 'self' https://*.google-analytics.com "
       "https://*.googletagmanager.com; font-src 'self'; style-src 'self'; base-uri 'none'; form-action 'none'; "
       "connect-src https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com")
# Black Week (aprovada em 07/11/2026): aparece sozinha de 23 a 30/11/2026 (assets/js/zethic-black-week.js).
BLACK_WEEK = ("<b>Black Week, até 30/11:</b> pague agora só a implantação; a primeira mensalidade vence em janeiro, "
              "e você ganha 1 hora extra de suporte no primeiro mês. O preço não muda.")
SCRIPTS = ('<script src="/assets/js/zethic-black-week.js" defer></script>\n'
           '<script src="/assets/js/zethic-origem.js" defer></script>\n'
           '<script src="/assets/js/medicao.js" defer></script>\n')
PRECO = ("<b>R$ 282 por mês</b> para 3 pessoas, no preço de fundador (3 vagas), marcado no pedido em troca de um "
         "depoimento; depois, R$ 365. Implantação no valor de 1 mensalidade, paga com a primeira. Mínimo de 3 meses.")

SUPORTE = ("Suporte de TI e manutenção", "/tecnologia#suporte")
PROTECAO = ("Proteção por pessoa", "/seguranca#protecao")
LGPD = ("Implantação técnica da LGPD", "/seguranca#lgpd")
CONTINUIDADE = ("Continuidade e recuperação", "/seguranca#continuidade")
NUVEM = ("Nuvem e identidade digital", "/tecnologia#nuvem")
CONSCIENTIZACAO = ("Conscientização e simulações de golpe", "/seguranca#conscientizacao")
WHATSAPP = ("Bot de WhatsApp", "/atendimento#whatsapp")
AUTOMACAO = ("Automação de processos", "/tecnologia#automacao")
REFORMA = ("Reforma Tributária nos sistemas", "/financeiro#reforma-tributaria")

# slug: rótulo, título da aba, descrição, h1, lead, dores (4), serviços [(nome, link, frase)], itens da proposta
NICHOS = {
    "ti-do-consultorio": dict(
        rotulo="TI do consultório", antigo="consultorio",
        h1="O computador do consultório cuidado todo mês. Você só atende.",
        lead="Para consultórios e clínicas: suporte de TI pelo WhatsApp, cópia dos arquivos dos pacientes testada e as contas de cada pessoa protegidas.",
        dores=["O computador travou no meio do atendimento e ninguém sabia a quem chamar.",
               "Os arquivos dos pacientes estão num computador só, sem cópia testada.",
               "A agenda e as conversas com os pacientes dependem de um único celular.",
               "Ninguém sabe dizer quem tem a senha de cada sistema."],
        servicos=[(SUPORTE, "Computador e celular atendidos todo mês, pelo WhatsApp e pelo e-mail."),
                  (PROTECAO, "Antivírus gerenciado, verificação em duas etapas e backup com teste de restauração."),
                  (LGPD, "Controle de acesso aos dados de saúde dos pacientes. Não substitui a avaliação jurídica."),
                  (WHATSAPP, "Confirmação de consulta e respostas a endereço e horário, com passagem para a recepção.")],
        proposta="suporte:completo,lgpd"),
    "ti-da-contabilidade": dict(
        rotulo="TI da contabilidade", antigo="contabilidade",
        h1="A TI do escritório em dia na semana de entrega.",
        lead="Para escritórios de contabilidade: computadores, certificado digital, cópia dos arquivos dos clientes e proteção das contas, operados pela Zethic.",
        dores=["O certificado digital venceu na semana de entrega.",
               "Um computador parado atrasou o prazo de um cliente.",
               "Os arquivos fiscais dos clientes ficam num servidor sem cópia testada.",
               "A mesma senha é usada em vários sistemas."],
        servicos=[(SUPORTE, "A equipe atendida todo mês, com os certificados digitais A1 e A3 e os sistemas do setor."),
                  (PROTECAO, "Cada pessoa com as contas e os arquivos protegidos."),
                  (CONTINUIDADE, "Cópia dos arquivos fiscais com teste de restauração e plano de retorno."),
                  (REFORMA, "Os sistemas do escritório preparados para a Reforma Tributária.")],
        proposta="suporte:completo,lgpd,reforma"),
    "ti-da-advocacia": dict(
        rotulo="TI da advocacia", antigo="advocacia",
        h1="O sigilo do cliente protegido e o escritório funcionando.",
        lead="Para escritórios de advocacia: suporte de TI, e-mail do escritório em domínio próprio, certificado digital e cópia dos processos testada.",
        dores=["Um cliente recebeu um boleto falso em nome do escritório.",
               "O e-mail pessoal é usado para assuntos do escritório.",
               "O certificado digital do processo eletrônico ficou num computador só.",
               "Um ex-colaborador ainda tem acesso às pastas de clientes."],
        servicos=[(SUPORTE, "A equipe atendida todo mês, com o certificado digital e o e-mail do escritório."),
                  (PROTECAO, "Verificação em duas etapas e antivírus gerenciado para cada pessoa."),
                  (CONSCIENTIZACAO, "A equipe treinada para reconhecer mensagem falsa em nome de cliente e de banco."),
                  (CONTINUIDADE, "Cópia dos processos com teste de restauração.")],
        proposta="suporte:completo,lgpd,continuidade"),
    "ti-da-engenharia": dict(
        rotulo="TI da engenharia e das obras",
        h1="Projeto salvo, obra conectada e a equipe trabalhando.",
        lead="Para escritórios de engenharia, arquitetura e obras: computadores de projeto, celulares de campo, arquivos acessíveis na obra com controle e cópia testada.",
        dores=["Um arquivo de projeto se perdeu porque não tinha cópia.",
               "A equipe da obra recebe os arquivos por pendrive ou por conversa no celular.",
               "A licença do programa de projeto venceu e ninguém percebeu.",
               "O computador de projeto parou na véspera da entrega."],
        servicos=[(SUPORTE, "Computadores de projeto e celulares de campo atendidos todo mês, com controle de licenças."),
                  (NUVEM, "Arquivos de projeto acessíveis no escritório e na obra, com acesso por pessoa."),
                  (PROTECAO, "Cada pessoa com as contas e os arquivos protegidos."),
                  (CONTINUIDADE, "Cópia dos projetos com teste de restauração.")],
        proposta="suporte:completo,nuvem,continuidade"),
    "ti-do-rh": dict(
        rotulo="TI do RH e do recrutamento",
        h1="Dados de candidatos e da equipe protegidos, e o RH sem parar.",
        lead="Para áreas e consultorias de RH e recrutamento: suporte de TI, acessos que entram e saem com cada pessoa e os dados pessoais tratados com controle.",
        dores=["Currículos e documentos de candidatos ficam no e-mail pessoal e em pastas abertas.",
               "Um ex-colaborador ainda tem acesso aos sistemas.",
               "A folha e os documentos da equipe dependem de um computador só.",
               "Chega mensagem falsa em nome de candidato ou de banco toda semana."],
        servicos=[(SUPORTE, "Computadores e celulares da equipe atendidos todo mês."),
                  (NUVEM, "Entrada e saída de pessoas com os acessos liberados e retirados no mesmo dia."),
                  (LGPD, "Controle de acesso aos dados de candidatos e colaboradores. Não substitui a avaliação jurídica."),
                  (PROTECAO, "Verificação em duas etapas e antivírus gerenciado para cada pessoa.")],
        proposta="suporte:completo,lgpd,nuvem"),
    "ti-da-agencia": dict(
        rotulo="TI da agência de marketing",
        h1="Arquivos de cliente seguros e a equipe criando sem travar.",
        lead="Para agências de marketing, comunicação e design: computadores de edição atendidos, contas de cliente protegidas e arquivos organizados na nuvem.",
        dores=["O material de um cliente está espalhado em vários computadores e drives pessoais.",
               "As senhas das contas dos clientes ficam numa planilha.",
               "Um computador lento travou a edição na véspera da entrega.",
               "Ninguém sabe quem ainda tem acesso a cada conta."],
        servicos=[(SUPORTE, "Computadores de edição e celulares atendidos todo mês."),
                  (PROTECAO, "Verificação em duas etapas nas contas de cada pessoa da equipe."),
                  (NUVEM, "Arquivos dos clientes num lugar só, com acesso por pessoa."),
                  (AUTOMACAO, "Relatórios e tarefas repetidas feitos sozinhos.")],
        proposta="suporte:completo,nuvem,automacao"),
    "ti-do-seu-negocio": dict(
        rotulo="TI do seu Negócio",
        h1="A TI do seu Negócio cuidada todo mês. Você cuida do resto.",
        lead="Para qualquer Negócio, de qualquer área: suporte de TI pelo WhatsApp, cópia dos arquivos testada e as contas de cada pessoa protegidas.",
        dores=["O computador travou e ninguém sabia a quem chamar.",
               "Os arquivos importantes estão num computador só, sem cópia testada.",
               "O Negócio inteiro depende de um único celular.",
               "Ninguém sabe dizer quem tem a senha de cada sistema."],
        servicos=[(SUPORTE, "Computador e celular atendidos todo mês, pelo WhatsApp e pelo e-mail."),
                  (PROTECAO, "Antivírus gerenciado, verificação em duas etapas e backup com teste de restauração."),
                  (CONTINUIDADE, "Plano de retorno combinado antes do problema."),
                  (LGPD, "Medidas técnicas para os dados dos seus clientes. Não substitui a avaliação jurídica.")],
        proposta="suporte:completo"),
}

LOGO = ('<span aria-hidden="true">Z</span><svg class="logo-e" viewBox="0 0 72 52.5" aria-hidden="true" focusable="false">'
        '<rect width="72" height="7" rx="1"/><rect y="22.75" width="72" height="7" rx="1"/><rect y="45.5" width="72" height="7" rx="1"/></svg>'
        '<span aria-hidden="true">THIC</span>')

CABECA = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titulo} | Zethic</title>
<meta name="description" content="{desc}">
<meta http-equiv="Content-Security-Policy" content="{csp}">
<meta name="color-scheme" content="dark">
<meta name="robots" content="noindex, follow">
{extra}<link rel="preload" href="/assets/fonts/public-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/public-sans-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="icon" href="/assets/img/zethic-marca.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/zethic-marca-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/img/zethic-marca-180.png">
<meta name="theme-color" content="#02041A">
<link rel="stylesheet" href="/assets/css/zethic.css">
<link rel="stylesheet" href="/assets/css/torres.css">
</head>
"""

RODAPE = f"""<footer>
  <div class="wrap">
    <div class="logo" role="img" aria-label="Zethic">{LOGO}</div>
    <p>© 2026 Zethic. Razão social: Jessica Caroline da Silva Secco Gessoli.</p>
    <p>CNPJ 67.678.226/0001-17. Campinas, São Paulo, Brasil.</p>
    <p><a href="https://www.linkedin.com/company/144656905/">LinkedIn</a> · <a href="https://www.instagram.com/zethic_net/">Instagram</a> · <a href="/quem-somos">Quem somos</a> · <a href="/privacidade">Privacidade e termos de uso</a> · <a href="/privacidade#cancelamento">Cancelamento e devolução</a>. Cookies só com a sua permissão.<a href="#" data-preferencias-cookies hidden> · Preferências de cookies</a> O pedido fica guardado só nesta aba do navegador até ser enviado. Pagamento por Pix ou boleto, na página do Asaas.</p>
  </div>
</footer>
{{scripts}}</body>
</html>
"""


def campanha(slug, n):
    dores = "\n".join(f"        <li>{d}</li>" for d in n["dores"])
    cartoes = "\n".join(
        f'        <article class="svc">\n          <h3>{nome}</h3>\n          <p>{frase}</p>\n'
        f'          <p class="nota"><a href="{link}">Ver em detalhe</a></p>\n        </article>'
        for (nome, link), frase in n["servicos"])
    desc = n["lead"]
    comprar = COMPRAR.format(slug=slug)
    return CABECA.format(titulo=n["rotulo"], desc=desc, extra="", csp=CSP) + f"""<body class="frente p-tec campanha">

<a class="skip" href="#conteudo">Pular para o conteúdo</a>

<header>
  <div class="wrap bar">
    <a class="logo" href="/para-o-seu-negocio" aria-label="Zethic, página Para o seu Negócio"><img class="logo-simbolo" src="/assets/img/zethic-marca.svg" alt="" width="34" height="34">{LOGO}</a>
  </div>
</header>

<main id="conteudo">
  <section class="hero hex door-hero">
    <div class="wrap">
      <p class="rotulo-pilar">{n['rotulo']}</p>
      <h1>{n['h1']}</h1>
      <p class="lead">{n['lead']}</p>
      <ul class="situ campanha-lista" role="list">
        <li>Até 4 computadores e 4 celulares, com 2 horas de suporte por mês</li>
        <li>Antivírus gerenciado e verificação em duas etapas para cada pessoa</li>
        <li>Backup em nuvem com teste de restauração a cada 3 meses</li>
      </ul>
      <p class="campanha-preco">{PRECO}</p>
      <p class="campanha-prazo">{PRAZO}</p>
      <p class="campanha-bw" data-black-week hidden>{BLACK_WEEK}</p>
      <div class="hero-ctas">
        <a class="btn btn-main" href="{comprar}">Comprar o suporte de TI</a>
        <a class="link-sec" href="/loja?itens={n['proposta']}">Equipe de 4 pessoas ou mais? Pedir proposta</a>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2>Algum destes já aconteceu?</h2>
      <ul class="situ" role="list">
{dores}
      </ul>
    </div>
  </section>

  <section class="alt papel">
    <div class="wrap">
      <h2>O que a Zethic assume</h2>
      <div class="svc-grid">
{cartoes}
      </div>
      <p class="steps-nota">Outra necessidade? <a href="/para-o-seu-negocio">Veja tudo o que a Zethic faz para o seu Negócio</a>.</p>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2>E para vender mais</h2>
      <p class="lead">Com a TI em dia, o próximo passo é o estabelecimento atender e vender sozinho.</p>
      <ul class="situ" role="list">
        <li><a href="/atendimento#site">Site no ar e mantido todo mês</a>: textos, fotos, formulário e WhatsApp testados.</li>
        <li><a href="/atendimento#whatsapp">Bot de WhatsApp</a> que responde na hora, inclusive no recesso e nos feriados.</li>
        <li><a href="/tecnologia#automacao">Automação e IA aplicada</a>: a tarefa repetida feita sozinha.</li>
      </ul>
      <p class="parceria">Quer mais gente chegando no seu site e no seu WhatsApp? A <a href="https://podecurtir.zethic.net/?utm_source=zethic&amp;utm_campaign={slug}">Pode Curtir</a> cuida das redes, do conteúdo e das campanhas, em parceria com a Zethic.</p>
    </div>
  </section>
</main>

""" + RODAPE.format(scripts=SCRIPTS)


def redirecionamento(antigo, slug):
    destino = f"/{slug}"
    extra = (f'<meta http-equiv="refresh" content="0; url={destino}">\n'
             f'<link rel="canonical" href="https://zethic.net{destino}">\n')
    return CABECA.format(titulo="Página movida", desc="Esta página mudou de endereço.", extra=extra,
                         csp="default-src 'none'; style-src 'self'; font-src 'self'; img-src 'self'") + f"""<body class="frente p-tec campanha">
<main id="conteudo">
  <section class="hero">
    <div class="wrap">
      <p class="lead">Esta página mudou de endereço: <a href="{destino}">{destino}</a>.</p>
    </div>
  </section>
</main>
</body>
</html>
"""


def gerar():
    for slug, n in NICHOS.items():
        (RAIZ / f"{slug}.html").write_text(campanha(slug, n), encoding="utf-8")
        if n.get("antigo"):
            (RAIZ / f"{n['antigo']}.html").write_text(redirecionamento(n["antigo"], slug), encoding="utf-8")


if __name__ == "__main__":
    gerar()
    print("campanhas:", ", ".join(NICHOS))
