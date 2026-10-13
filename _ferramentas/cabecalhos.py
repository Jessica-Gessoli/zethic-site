#!/usr/bin/env python3
"""Monta a barra das marcas e o cabeçalho com o menu das cinco frentes em todas as páginas da Zethic.

Uso (na raiz do repositório):  python3 _ferramentas/cabecalhos.py
Edite os modelos abaixo e rode de novo: as páginas são atualizadas entre os marcadores
<!-- grupo:inicio --> ... <!-- grupo:fim --> e <!-- cabecalho:inicio --> ... <!-- cabecalho:fim -->.
O teste _tests/torres.static.test.mjs confere que nenhuma página ficou diferente do modelo.
"""
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent

# Páginas da Zethic: recebem a barra das marcas e o cabeçalho com o menu das frentes.
# (arquivo, origem usada no botão do WhatsApp, item do menu marcado como página atual)
ZETHIC = [
    ("index.html", "site", None),
    ("quem-somos.html", "quem-somos", "quem-somos"),
    ("diagnostico.html", "site", None),
    ("proteger.html", "site", None),
    ("organizar.html", "site", None),
    ("crescer.html", "site", None),
    ("aconselhar.html", "site", None),
    ("teste-golpe.html", "teste-golpe", None),
    ("privacidade.html", "privacidade", None),
]
# Páginas das outras marcas: mantêm o cabeçalho próprio e recebem só a barra do grupo.
MARCAS = [("jessicagessoli.html", "j"), ("podecurtir.html", "p")]

LOGO = ('<a class="logo" href="/" aria-label="Zethic, início"><span aria-hidden="true">Z</span>'
        '<svg class="logo-e" viewBox="0 0 72 52.5" aria-hidden="true" focusable="false"><rect width="72" height="7" rx="1"/>'
        '<rect y="22.75" width="72" height="7" rx="1"/><rect y="45.5" width="72" height="7" rx="1"/></svg>'
        '<span aria-hidden="true">THIC</span></a>')

# As cinco frentes da Zethic (hub aprovado em 12/10/2026), na ordem do menu, dos cartões da página inicial e do rodapé.
# Cada frente pertence a um pilar da categoria: p-seg (segurança), p-tec (tecnologia) ou p-mid (mídia digital).
# Jéssica Gessoli não é frente: aparece só como a porta "Quem fundou a Zethic" e na barra das marcas.
FRENTES = [
    {
        "id": "proteger", "pilar": "p-seg", "nome": "Proteger", "rotulo": "Segurança",
        "frase": "Caixa, operação e dados protegidos.",
        "pagina": "/proteger", "ir": "Conhecer Proteger",
        "img": ("/assets/img/proteger-800", 800, 450),
        "servicos": [
            ("/diagnostico", "Diagnóstico 6 Moedas", "A porta de entrada, com autoavaliação grátis"),
            ("/teste-golpe", "Teste de golpe", "Dez situações reais, grátis"),
            ("/proteger#antigolpe", "Programa Antigolpe", "Equipe que reconhece golpes e regras contra pagamento indevido"),
            ("/proteger#seguranca-gerenciada", "Segurança gerenciada", "Ameaças monitoradas e backup testado"),
            ("/proteger#privacidade", "Privacidade e LGPD", "Dados pessoais tratados com responsabilidade e documentação"),
            ("/proteger#governanca-ia", "Governança de IA", "IA usada com regras, controles e retorno medido"),
        ],
    },
    {
        "id": "organizar", "pilar": "p-tec", "nome": "Organizar", "rotulo": "Tecnologia",
        "frase": "Uma operação que não depende de uma pessoa só.",
        "pagina": "/organizar", "ir": "Conhecer Organizar",
        "img": ("/assets/img/organizar-800", 800, 450),
        "servicos": [
            ("/organizar#processos", "Processos e rotina operacional", "Menos erro e retrabalho no dia a dia"),
            ("/organizar#automacao", "Automação e agentes de IA", "Trabalho repetitivo automatizado, com controle de acesso"),
            ("/organizar#financas", "Finanças e recuperação de valores", "Valores a recuperar identificados e financeiro sob controle"),
            ("/organizar#projetos", "Governança de projetos e serviços", "Escopo, responsáveis e indicadores"),
            ("/organizar#infraestrutura", "Infraestrutura, redes e conectividade", "Infraestrutura que aguenta a operação"),
            ("/organizar#nuvem", "Nuvem e identidade digital", "Custo e acesso sob controle"),
        ],
    },
    {
        "id": "crescer", "pilar": "p-mid", "nome": "Crescer", "rotulo": "Mídia digital",
        "frase": "Mais clientes chegando, com rotina e medição.",
        "pagina": "/crescer", "ir": "Conhecer Crescer",
        "img": ("/assets/img/crescer-800", 800, 450),
        "servicos": [
            ("/crescer#presenca", "Presença digital", "Canais digitais organizados e conectados"),
            ("/crescer#demanda", "Geração de demanda", "Contatos qualificados chegando com rotina e medição"),
            ("/crescer#whatsapp", "WhatsApp e CRM comercial", "Atendimento e vendas com regras, dono e histórico"),
        ],
    },
    {
        "id": "midia", "pilar": "p-mid", "nome": "Mídia digital", "rotulo": "Mídia digital",
        "frase": "Foto e vídeo prontos para postar, com o Pode Curtir.",
        "pagina": "/podecurtir", "ir": "Conhecer o Pode Curtir",
        "img": ("/assets/img/podecurtir-800", 800, 450),
        "servicos": [
            ("/podecurtir#eventos", "Eventos", "Foto, vídeo, gravação e transmissão ao vivo"),
            ("/podecurtir#negocios", "Negócios", "Vídeo institucional, sessão de conteúdo, entrevistas e estúdio"),
            ("/podecurtir#ensaios", "Ensaios", "Fotografia profissional"),
        ],
    },
    {
        "id": "capacitar", "pilar": "p-tec", "nome": "Capacitar e aconselhar", "rotulo": "Tecnologia",
        "frase": "Equipe e diretoria decidindo melhor.",
        "pagina": "/aconselhar", "ir": "Conhecer Capacitar e aconselhar",
        "img": ("/assets/img/aconselhar-800", 800, 450),
        "servicos": [
            ("/aconselhar#capacitacao", "Capacitação em IA", "Pessoas usando IA com produtividade e sem vazar dados"),
            ("/aconselhar#consultoria", "Consultoria especializada", "Uma questão específica resolvida com análise e recomendação"),
            ("/aconselhar#conselheira", "Conselheira de risco", "Apoio mensal à diretoria nas decisões sobre risco digital e IA"),
        ],
    },
]


def grupo(atual):
    def item(classe, href, nome, chave):
        marca = ' class="%s atual"' % classe if chave == atual else ' class="%s"' % classe
        return '    <a%s href="%s">%s</a>' % (marca, href, nome)
    linhas = [
        "<!-- grupo:inicio -->",
        '<nav class="grupo" aria-label="Marcas">',
        '  <div class="grupo-in">',
        item("g-z", "/", "Zethic", "z"),
        item("g-j", "/jessicagessoli", "Jéssica Gessoli", "j"),
        item("g-p", "/podecurtir", "Pode Curtir", "p"),
        item("g-q", "/quem-somos", "Quem somos", "q"),
        "  </div>",
        "</nav>",
        "<!-- grupo:fim -->",
    ]
    return "\n".join(linhas)


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
    paineis = "\n".join(painel(t) for t in FRENTES)
    return f"""<!-- cabecalho:inicio -->
<header>
  <div class="wrap bar">
    {LOGO}
    <nav id="menu-principal" class="menu" aria-label="Principal">
      <ul class="menu-lista" role="list">
{paineis}
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


def main():
    for arq, origem, atual in ZETHIC:
        p = RAIZ / arq
        t = p.read_text(encoding="utf-8")
        t = trocar_bloco(t, "cabecalho", cabecalho(origem, atual, arq == "index.html"), alvo_inicial=r"<header>.*?</header>")
        t = trocar_bloco(t, "grupo", grupo("q" if atual == "quem-somos" else "z"), depois_de=r'<a class="skip"[^>]*>[^<]*</a>')
        t = garantir_no_head(t, '<link rel="stylesheet" href="/assets/css/grupo.css">')
        t = garantir_no_head(t, '<link rel="stylesheet" href="/assets/css/torres.css">')
        t = garantir_no_head(t, '<script src="/assets/js/torres.js"></script>')
        p.write_text(t, encoding="utf-8")
        print("ok", arq)
    for arq, chave in MARCAS:
        p = RAIZ / arq
        t = p.read_text(encoding="utf-8")
        t = trocar_bloco(t, "grupo", grupo(chave), depois_de=r'<a class="skip"[^>]*>[^<]*</a>')
        t = garantir_no_head(t, '<link rel="stylesheet" href="/assets/css/grupo.css">')
        p.write_text(t, encoding="utf-8")
        print("ok", arq)


if __name__ == "__main__":
    main()
