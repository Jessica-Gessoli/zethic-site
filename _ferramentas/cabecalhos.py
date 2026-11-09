#!/usr/bin/env python3
"""Monta o cabeçalho com o menu dos quatro pilares em todas as páginas da Zethic.

Uso (na raiz do repositório):  python3 _ferramentas/cabecalhos.py
Edite os modelos abaixo e rode de novo: as páginas são atualizadas entre os marcadores
<!-- cabecalho:inicio --> ... <!-- cabecalho:fim -->.
Desde 28/10/2026 (decisão da Jéssica) não há barra das marcas: Zethic, Jéssica Gessoli e Pode Curtir não se citam.
Desde 03/11/2026 (Ficha oficial v1.5) a Zethic pode citar a Pode Curtir só como parceira nos serviços de tecnologia
(site, app, automação e TI): a parte de mídia fica com a Pode Curtir, a de tecnologia com a Zethic.
O teste _tests/torres.static.test.mjs confere que nenhuma página ficou diferente do modelo.
Para só conferir, sem gravar:  python3 _ferramentas/cabecalhos.py --conferir
(o teste _tests/cabecalhos-ferramenta.static.test.mjs roda essa conferência).
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
import jornada  # noqa: E402  (trilha e "Próximo passo": aprovado em 06/11/2026, 23h22)

# Páginas da Zethic: recebem o cabeçalho com o menu dos pilares.
# (arquivo, origem usada no botão do WhatsApp, item do menu marcado como página atual)
ZETHIC = [
    ("index.html", "site", None),
    ("quem-somos.html", "quem-somos", "quem-somos"),
    ("seguranca.html", "site", None),
    ("tecnologia.html", "site", None),
    ("financeiro.html", "site", None),
    ("atendimento.html", "site", None),
    ("privacidade.html", "privacidade", None),
    # Loja de pedido de proposta (decisão da Jéssica em 03/11/2026: sem preço no site).
    ("loja.html", "loja", "loja"),
    ("loja-obrigado.html", "loja", None),
    # Compra online dos pacotes de entrada (decisão da Jéssica em 06/11/2026): preço só nesses pacotes. Protótipo.
    ("comprar.html", "comprar", "loja"),
    # Por necessidade e por tamanho da equipe (decisão da Jéssica em 07/11/2026; substitui as páginas por nicho).
    ("para-o-seu-negocio.html", "seu-negocio", None),
]

LOGO = ('<a class="logo" href="/" aria-label="Zethic, início">'
        '<img class="logo-simbolo" src="/assets/img/zethic-marca.svg" alt="" width="34" height="34">'
        '<span aria-hidden="true">Z</span>'
        '<svg class="logo-e" viewBox="0 0 72 52.5" aria-hidden="true" focusable="false"><rect width="72" height="7" rx="1"/>'
        '<rect y="22.75" width="72" height="7" rx="1"/><rect y="45.5" width="72" height="7" rx="1"/></svg>'
        '<span aria-hidden="true">THIC</span></a>')

# Os pilares da Zethic (decisão da Jéssica em 06/11/2026, depois do benchmark de estrutura): o site deixa as frentes
# Organizar, Proteger, Crescer e Conectar e passa a ter 4 pilares, com o nome do departamento que a Zethic assume e opera
# fora da empresa do cliente (decisão de marca de 03/11/2026): Segurança, Tecnologia, Atendimento e Financeiro.
# Os verbos das frentes ficam como frase de abertura de cada página; os endereços antigos redirecionam para o pilar novo.
# Segurança usa a cor p-seg; os outros três, a cor p-tec. Ordem do menu, dos cartões da página inicial e do rodapé.
# Jéssica Gessoli não é pilar nem aparece no site da Zethic (só a frase institucional na Quem somos e a razão social no rodapé).
# A Blindagem de contas é da Jéssica Gessoli (03/11/2026) e não entra aqui.
FRENTES = [
    {
        "id": "seguranca", "pilar": "p-seg", "nome": "Segurança", "rotulo": "Segurança",
        "frase": "Proteger a operação, todos os dias.",
        "pagina": "/seguranca", "ir": "Conhecer Segurança",
        "img": ("/assets/img/proteger-800", 800, 450),
        "servicos": [
            ("/seguranca#soc", "Centro de operações de segurança (SOC)", "O departamento de segurança do Negócio, terceirizado"),
            ("/seguranca#seguranca-gerenciada", "Segurança gerenciada", "Ameaças monitoradas e backup testado"),
            ("/seguranca#it-ot", "Segurança de IT/OT", "Redes da produção, do campo e do escritório separadas e monitoradas"),
            ("/seguranca#infraestrutura-conectada", "Infraestrutura conectada", "Inversores, carregadores, medidores e roteadores protegidos"),
            ("/seguranca#continuidade", "Continuidade e recuperação", "Backup restaurado em teste e operação que volta rápido"),
            ("/seguranca#conscientizacao", "Conscientização e simulação de golpe", "Plataforma implantada e operada, com simulações"),
            ("/seguranca#lgpd", "Implantação da LGPD e de normas", "Controles, registros e evidências no dia a dia"),
        ],
    },
    {
        "id": "tecnologia", "pilar": "p-tec", "nome": "Tecnologia", "rotulo": "Tecnologia",
        "frase": "Organizar e conectar a operação.",
        "pagina": "/tecnologia", "ir": "Conhecer Tecnologia",
        "img": ("/assets/img/organizar-800", 800, 450),
        "servicos": [
            ("/tecnologia#suporte", "Suporte de TI e manutenção", "Computadores, celulares e equipe atendidos todo mês"),
            ("/tecnologia#automacao", "Automação de processos e IA aplicada", "Agentes de IA e integrações, com controle de acesso"),
            ("/tecnologia#processos", "Processos e rotina operacional", "Menos erro e retrabalho no dia a dia"),
            ("/tecnologia#infraestrutura", "Infraestrutura, redes e conectividade", "Infraestrutura que aguenta a operação"),
            ("/tecnologia#nuvem", "Nuvem e identidade digital", "E-mail, contas, custo e acesso sob controle"),
            # 08/11/2026 (Z1 e Z5 aprovados pela Jéssica): implantação para restaurante e delivery, sob proposta.
            ("/tecnologia#pedidos-caixa", "Pedidos, caixa e impressora", "Pedidos de todos os canais chegando certos à cozinha e ao caixa"),
            ("/tecnologia#paineis-intranet", "Painéis de gestão e intranet", "Prazos, certificados e equipe num lugar só"),
            ("/tecnologia#ponto-rh", "Implantação de ponto e RH", "O sistema escolhido configurado e testado com o RH"),
            ("/tecnologia#projetos", "Governança de projetos e serviços de TI", "Escopo, responsáveis e indicadores"),
            ("/tecnologia#industria-agro", "TI e TO para indústria e agro", "Redes privadas, máquinas conectadas e rastreio de origem para exportar"),
            ("/tecnologia#futuro", "No futuro: energia e cidades", "Energia, conectividade e cidades inteligentes, com parceiros"),
        ],
    },
    {
        "id": "atendimento", "pilar": "p-tec", "nome": "Atendimento", "rotulo": "Atendimento",
        "frase": "Crescer pelo WhatsApp, pelo site e pelos dados.",
        "pagina": "/atendimento", "ir": "Conhecer Atendimento",
        "img": ("/assets/img/crescer-800", 800, 450),
        "servicos": [
            ("/atendimento#whatsapp", "Bots de WhatsApp e de comunicação", "Bot com passagem para a equipe e CRM leve"),
            ("/atendimento#dados", "Unificação de redes sociais e de dados", "Vendas, atendimento e redes num painel só"),
            ("/atendimento#site", "Site, app e presença no Google", "O cliente encontra a empresa e chega ao contato"),
            ("/atendimento#produto-digital", "Plataforma para curso e produto digital", "Plataforma, página de vendas e entrega automática"),
        ],
    },
    {
        "id": "financeiro", "pilar": "p-tec", "nome": "Financeiro", "rotulo": "Financeiro",
        "frase": "O financeiro do Negócio sob controle.",
        "pagina": "/financeiro", "ir": "Conhecer Financeiro",
        "img": ("/assets/img/zethic-800", 800, 450),
        "servicos": [
            ("/financeiro#gestao-financeira", "Gestão financeira terceirizada", "Caixa, contas e cobrança operados, com painel"),
            ("/financeiro#auditoria", "Auditoria de contas e contratos", "Valores a recuperar identificados"),
            ("/financeiro#reforma-tributaria", "Adaptação à Reforma Tributária", "Sistemas e processos prontos, junto com o seu contador"),
        ],
    },
]


# Tipos de cliente (aprovado em 06/11/2026, 23h22): o 5º painel do menu leva às páginas por tipo de cliente.
PARA_QUEM = {
    # 07/11/2026: por necessidade, não por nicho de cliente (decisão da Jéssica: ninguém fica de fora).
    "id": "seu-negocio", "pilar": "p-tec", "nome": "Seu Negócio", "rotulo": "Para o seu Negócio",
    "frase": "Escolha pela necessidade: serve para qualquer área.",
    "pagina": "/para-o-seu-negocio", "ir": "Ver todas as necessidades",
    "img": ("/assets/img/zethic-800", 800, 450),
    "servicos": [
        ("/para-o-seu-negocio#sem-ti", "Ninguém cuida da TI", "Suporte de TI e manutenção todo mês"),
        ("/para-o-seu-negocio#dados-sigilosos", "Dados sigilosos de clientes", "Proteção por pessoa e implantação técnica da LGPD"),
        ("/para-o-seu-negocio#nao-pode-parar", "O Negócio não pode parar", "Cópia testada e plano de retorno"),
        ("/para-o-seu-negocio#whatsapp", "Atendo pelo WhatsApp", "Bot e contatos num painel só"),
        ("/para-o-seu-negocio#tamanho", "Pelo tamanho da equipe", "De quem trabalha sozinho à operação crítica"),
    ],
}


def painel(t):
    img, w, h = t["img"]
    servicos = "\n".join(
        '              <li><a href="%s"><strong>%s</strong><span>%s</span></a></li>' % s for s in t["servicos"])
    return f"""        <li class="torre {t['pilar']}">
          <button type="button" class="torre-btn" aria-expanded="false" aria-controls="painel-{t['id']}">{t['nome']}</button>
          <div class="painel" id="painel-{t['id']}">
            <div class="wrap painel-in">
              <a class="painel-capa" href="{t['pagina']}">
                <picture><source type="image/webp" srcset="{img}.webp"><img src="{img}.jpg" alt="" width="{w}" height="{h}" loading="lazy"></picture>
                <span class="painel-rotulo">{t['rotulo']}</span>
                <span class="painel-marca">{t['nome']}</span>
                <span class="painel-frase">{t['frase']}</span>
                <span class="painel-ir">{t['ir']}</span>
              </a>
              <ul class="painel-lista" role="list">
{servicos}
              </ul>
            </div>
          </div>
        </li>"""


def cabecalho(origem, atual, home):
    contato = "#contato" if home else "/#contato"
    qs = ' aria-current="page"' if atual == "quem-somos" else ""
    lj = ' aria-current="page"' if atual == "loja" else ""
    paineis = "\n".join(painel(t) for t in FRENTES + [PARA_QUEM])
    return f"""<!-- cabecalho:inicio -->
<div class="faixa-campanha" data-faixa-campanha hidden></div>
<header>
  <div class="wrap bar">
    {LOGO}
    <nav id="menu-principal" class="menu" aria-label="Principal">
      <ul class="menu-lista" role="list">
{paineis}
        <li><a class="menu-link" href="/loja"{lj}>Loja</a></li>
        <li class="so-celular"><a class="menu-link" href="/quem-somos"{qs}>Quem somos</a></li>
        <li class="so-celular"><a class="menu-link" href="{contato}">Contato</a></li>
      </ul>
    </nav>
    <a class="btn btn-topo" href="/fale?utm_source={origem}">Falar no WhatsApp</a>
    <button type="button" class="menu-btn" aria-expanded="false" aria-controls="menu-principal">Menu</button>
  </div>
</header>
<!-- cabecalho:fim -->"""


def trocar_bloco(texto, nome, novo, alvo_inicial=None, depois_de=None):
    padrao = re.compile(r"<!-- %s:inicio -->.*?<!-- %s:fim -->" % (nome, nome), re.S)
    if padrao.search(texto):
        return padrao.sub(lambda m: novo, texto, count=1)
    if alvo_inicial:
        m = re.search(alvo_inicial, texto, re.S)
        assert m, f"não achei onde colocar o bloco {nome}"
        return texto[:m.start()] + novo + texto[m.end():]
    m = re.search(depois_de, texto)
    assert m, f"não achei onde colocar o bloco {nome}"
    return texto[:m.end()] + "\n" + novo + texto[m.end():]


def garantir_no_head(texto, linha):
    if linha in texto:
        return texto
    return texto.replace("</head>", linha + "\n</head>", 1)


def aplicar_jornada(arq, t):
    """Trilha logo depois de <main id="conteudo"> e "Próximo passo" logo antes de </main> (ver jornada.py)."""
    tr = jornada.trilha(arq)
    if tr:
        t = re.sub(r'\n?\s*<p class="crumb">.*?</p>', "", t, count=1, flags=re.S)
        if "<!-- trilha:inicio -->" in t:
            t = trocar_bloco(t, "trilha", tr)
        else:
            m = re.search(r'<main id="conteudo"[^>]*>', t)
            assert m, f"{arq}: sem <main id=\"conteudo\">"
            t = t[:m.end()] + "\n" + tr + t[m.end():]
    jn = jornada.jornada(arq)
    if jn:
        if "<!-- jornada:inicio -->" in t:
            t = trocar_bloco(t, "jornada", jn)
        else:
            i = t.rindex("</main>")
            t = t[:i].rstrip() + "\n\n" + jn + "\n" + t[i:]
    return t


def main(conferir=False):
    """Atualiza as páginas. Com --conferir, não grava nada: só aponta as páginas que mudariam."""
    diferentes = []

    def gravar(p, original, novo):
        if novo == original:
            print("ok", p.name)
        elif conferir:
            diferentes.append(p.name)
            print("DIFERENTE", p.name)
        else:
            p.write_text(novo, encoding="utf-8")
            print("atualizada", p.name)

    for arq, origem, atual in ZETHIC:
        p = RAIZ / arq
        original = p.read_text(encoding="utf-8")
        t = original
        t = trocar_bloco(t, "cabecalho", cabecalho(origem, atual, arq == "index.html"), alvo_inicial=r"<header>.*?</header>")
        t = re.sub(r"<!-- grupo:inicio -->.*?<!-- grupo:fim -->\n?", "", t, flags=re.S)
        t = t.replace('<link rel="stylesheet" href="/assets/css/grupo.css">\n', "")
        t = garantir_no_head(t, '<link rel="stylesheet" href="/assets/css/torres.css">')
        t = garantir_no_head(t, '<script src="/assets/js/torres.js"></script>')
        t = aplicar_jornada(arq, t)
        gravar(p, original, t)
    if conferir and diferentes:
        print("Páginas diferentes do modelo:", ", ".join(diferentes))
        return 1
    return 0


if __name__ == "__main__":
    import sys
    sys.exit(main(conferir="--conferir" in sys.argv[1:]))
