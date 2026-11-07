"""Jornada do usuário no site da Zethic: trilha no topo e "Próximo passo" no fim de cada página.

Aprovado pela Jéssica em 06/11/2026, 23h22: as páginas se ligam nos dois sentidos, de frente para trás e de trás
para frente. A jornada tem 6 etapas (chega, se reconhece, entende, confia, escolhe, fecha) e está desenhada no
documento "Zethic · Benchmark das páginas do site". Este arquivo é a fonte única das ligações:
- TRILHA: o caminho de volta, no topo de cada página interna (Início › Pilares › Segurança).
- PROXIMO: o passo seguinte de cada página (a chamada principal e a secundária).
- LIGADAS: pares de páginas que se indicam uma à outra em "Veja também". Cada par vale nos dois sentidos,
  e o teste _tests/zethic-jornada.static.test.mjs confere a volta no HTML.
Usado por _ferramentas/cabecalhos.py, que grava os blocos entre <!-- trilha:inicio/fim --> e <!-- jornada:inicio/fim -->.
"""

INICIO = ("/", "Início")
PILARES = ("/#pilares", "Pilares")
PARA_QUEM = ("/#para-quem", "Para quem")
LOJA = ("/comprar", "Loja")

# página: (endereço, nome curto, frase do cartão em "Veja também")
PAGINAS = {
    "seguranca.html": ("/seguranca", "Segurança", "SOC, segurança gerenciada, proteção por pessoa e continuidade"),
    "tecnologia.html": ("/tecnologia", "Tecnologia", "Suporte de TI, automação, IA, redes e nuvem"),
    "atendimento.html": ("/atendimento", "Atendimento", "Bot de WhatsApp, dados num painel só e site"),
    "financeiro.html": ("/financeiro", "Financeiro", "Gestão financeira, auditoria de contas e Reforma Tributária"),
    "consultorio.html": ("/consultorio", "Consultório", "Consultórios e clínicas de 1 a 3 pessoas"),
    "contabilidade.html": ("/contabilidade", "Contabilidade", "Escritórios de contabilidade"),
    "advocacia.html": ("/advocacia", "Advocacia", "Escritórios de advocacia"),
    "quem-somos.html": ("/quem-somos", "Quem somos", "Quem faz o trabalho e como a Zethic trabalha"),
}

TRILHA = {
    "seguranca.html": [INICIO, PILARES, "Segurança"],
    "tecnologia.html": [INICIO, PILARES, "Tecnologia"],
    "atendimento.html": [INICIO, PILARES, "Atendimento"],
    "financeiro.html": [INICIO, PILARES, "Financeiro"],
    "consultorio.html": [INICIO, PARA_QUEM, "Consultório"],
    "contabilidade.html": [INICIO, PARA_QUEM, "Contabilidade"],
    "advocacia.html": [INICIO, PARA_QUEM, "Advocacia"],
    "quem-somos.html": [INICIO, "Quem somos"],
    "comprar.html": [INICIO, LOJA, "Comprar agora"],
    "loja.html": [INICIO, LOJA, "Pedir proposta"],
    "loja-obrigado.html": [INICIO, ("/loja", "Loja"), "Pedido recebido"],
    "privacidade.html": [INICIO, "Privacidade e termos de uso"],
}

# página: (chamada principal, chamada secundária), cada uma (endereço, texto)
PROXIMO = {
    "seguranca.html": (("/loja#d-seguranca", "Montar o pedido de Segurança"), ("/comprar", "Comprar proteção por pessoa com o suporte")),
    "tecnologia.html": (("/comprar", "Comprar o suporte de TI"), ("/loja#d-tecnologia", "Pedir proposta de Tecnologia")),
    "atendimento.html": (("/loja#d-atendimento", "Montar o pedido de Atendimento"), ("/agendar?utm_source=atendimento", "Agendar uma conversa")),
    "financeiro.html": (("/loja#d-financeiro", "Montar o pedido do Financeiro"), ("/agendar?utm_source=financeiro", "Agendar uma conversa")),
    "consultorio.html": (("/comprar?pacote=consultorio", "Comprar o suporte do consultório"), ("/loja?itens=lgpd", "Pedir proposta da implantação da LGPD")),
    "contabilidade.html": (("/loja?itens=suporte:completo,lgpd,reforma", "Montar o pedido do escritório"), ("/agendar?utm_source=contabilidade", "Agendar uma conversa")),
    "advocacia.html": (("/loja?itens=suporte:completo,lgpd,continuidade", "Montar o pedido do escritório"), ("/agendar?utm_source=advocacia", "Agendar uma conversa")),
    "quem-somos.html": (("/comprar", "Ver os pacotes com preço"), ("/loja", "Pedir proposta")),
    "loja-obrigado.html": (("/quem-somos", "Conhecer quem faz o trabalho"), ("/comprar", "Voltar à loja")),
}

# Pares que se indicam nos dois sentidos em "Veja também".
LIGADAS = [
    ("seguranca.html", "consultorio.html"), ("seguranca.html", "contabilidade.html"), ("seguranca.html", "advocacia.html"),
    ("tecnologia.html", "consultorio.html"), ("tecnologia.html", "contabilidade.html"), ("tecnologia.html", "advocacia.html"),
    ("atendimento.html", "consultorio.html"), ("atendimento.html", "advocacia.html"),
    ("financeiro.html", "contabilidade.html"),
    ("quem-somos.html", "consultorio.html"), ("quem-somos.html", "contabilidade.html"), ("quem-somos.html", "advocacia.html"),
    ("quem-somos.html", "seguranca.html"), ("quem-somos.html", "tecnologia.html"),
    ("quem-somos.html", "atendimento.html"), ("quem-somos.html", "financeiro.html"),
]
# Depois do pedido, a pessoa pode continuar lendo sobre o tipo de cliente dela (só ida: a confirmação não é destino).
SO_IDA = {"loja-obrigado.html": ["consultorio.html", "contabilidade.html", "advocacia.html"]}

ORDEM = list(PAGINAS)


def vizinhas(arq):
    v = set(SO_IDA.get(arq, []))
    for a, b in LIGADAS:
        if a == arq:
            v.add(b)
        if b == arq:
            v.add(a)
    return sorted(v, key=ORDEM.index)


def trilha(arq):
    passos = TRILHA.get(arq)
    if not passos:
        return None
    itens = []
    for p in passos:
        if isinstance(p, tuple):
            itens.append(f'<li><a href="{p[0]}">{p[1]}</a></li>')
        else:
            itens.append(f'<li aria-current="page">{p}</li>')
    return ('<!-- trilha:inicio -->\n<nav class="trilha" aria-label="Você está em"><div class="wrap"><ol>'
            + "".join(itens) + "</ol></div></nav>\n<!-- trilha:fim -->")


def jornada(arq):
    if arq not in PROXIMO:
        return None
    (h1, t1), (h2, t2) = PROXIMO[arq]
    cartoes = "\n".join(
        f'      <li><a href="{PAGINAS[v][0]}"><strong>{PAGINAS[v][1]}</strong><span>{PAGINAS[v][2]}</span></a></li>'
        for v in vizinhas(arq))
    return f"""<!-- jornada:inicio -->
<section class="proximo" aria-labelledby="t-proximo">
  <div class="wrap">
    <h2 id="t-proximo">Próximo passo</h2>
    <p class="proximo-ctas"><a class="btn btn-line" href="{h1}">{t1}</a> <a class="link-sec" href="{h2}">{t2}</a></p>
    <p class="proximo-rotulo">Veja também</p>
    <ul class="proximo-lista" role="list">
{cartoes}
    </ul>
  </div>
</section>
<!-- jornada:fim -->"""
