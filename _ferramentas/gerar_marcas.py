#!/usr/bin/env python3
"""Gera os sites próprios das marcas a partir das páginas publicadas em zethic.net.

Decisão de 21/10/2026: Pode Curtir e Jéssica Gessoli ganham endereço próprio
(podecurtir.zethic.net e jessicagessoli.zethic.net). A fonte continua sendo
_fontes/ deste repositório (desde 10/11/2026 as páginas da Pode Curtir e da Jéssica Gessoli saíram de zethic.net:
ficam em _fontes/, que o Jekyll não publica, e zethic.net/podecurtir/* e /jessicagessoli/* só redirecionam para o
subdomínio de cada marca). Regras em _docs/marcas-enderecos.md;
este script copia as páginas e os arquivos que elas usam para _marcas/<marca>-site,
troca os endereços pelos novos e aponta para zethic.net o que é da Zethic.

Uso:  python3 _ferramentas/gerar_marcas.py           (gera)
      python3 _ferramentas/gerar_marcas.py --check   (falha se _marcas estiver desatualizado)
"""
import hashlib
import re, shutil, sys
from pathlib import Path
import filecmp, tempfile
SRC = Path(__file__).resolve().parent.parent
OUT = SRC / "_marcas"
CHECK = "--check" in sys.argv
if CHECK:
    REAL = OUT
    OUT = Path(tempfile.mkdtemp())
Z = "https://zethic.net"

def assets(*files):
    found = set()
    for f in files:
        found |= set(re.findall(r"/assets/[^\"' ,)?#]+", (SRC / f).read_text()))
    return sorted(found)

def copy(dest, paths):
    for p in paths:
        s = SRC / p.lstrip("/")
        d = dest / p.lstrip("/")
        d.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(s, d)

def versionar(html):
    # 11/11/2026: CSS e JS levam ?v=<hash do conteúdo>. Quando o arquivo muda, o endereço muda
    # e o navegador baixa a versão nova junto com a página (sem precisar de Ctrl + Shift + R).
    def v(m):
        caminho = m.group(2)
        h = hashlib.sha256((SRC / caminho.lstrip("/")).read_bytes()).hexdigest()[:10]
        return f'{m.group(1)}="{caminho}?v={h}"'
    return re.sub(r'(href|src)="(/assets/[^"?#]+\.(?:css|js))"', v, html)

def zethic_links(html, own):
    # links relativos que não são da própria marca vão para zethic.net
    def fix(m):
        attr, path = m.group(1), m.group(2)
        if path.startswith("/assets/") or any(path == o or path.startswith(o + "#") or path.startswith(o + "?") for o in own):
            return m.group(0)
        alvo = outra_marca(path)
        return f'{attr}="{alvo}"' if alvo else f'{attr}="{Z}{path}"'
    return re.sub(r'(href|action)="(/[^"]*)"', fix, html)

def build(name, host, pages, extra_files):
    dest = OUT / f"{name}-site"
    testes = dest / "_tests"
    guardados = {p.name: p.read_bytes() for p in testes.glob("*.mjs")} if testes.exists() and not CHECK else {}
    if dest.exists(): shutil.rmtree(dest)
    dest.mkdir(parents=True)
    if guardados:
        testes.mkdir()
        for n, b in guardados.items(): (testes / n).write_bytes(b)
    base = f"https://{host}"
    for src, out, own_map in pages:
        html = (SRC / src).read_text()
        for old, new in own_map:              # endereços absolutos da marca
            html = html.replace(f'{Z}{old}"', f'{base}{new}"').replace(f'{Z}{old}#', f'{base}{new}#')
        html = html.replace(f"{Z}/assets/", f"{base}/assets/")
        html = zethic_links(html, [o for o, _ in own_map])   # primeiro: o que não é da marca vai para zethic.net
        for old, new in own_map:              # depois: links relativos da marca
            html = re.sub(rf'(href|action)="{re.escape(old)}([#?"])', lambda m: f'{m.group(1)}="{new}{m.group(2)}', html)
        html = versionar(html)
        (dest / out).parent.mkdir(parents=True, exist_ok=True)
        (dest / out).write_text(html)
    css = [a for a in assets(*[p[0] for p in pages]) if a.endswith(".css")]
    allassets = set(assets(*[p[0] for p in pages], *[c.lstrip("/") for c in css]))
    copy(dest, sorted(allassets) + extra_files)
    (dest / "CNAME").write_text(host + "\n")
    (dest / ".nojekyll").write_text("")
    # páginas com noindex (confirmação de pedido) ficam fora do sitemap
    urls = "".join(f"  <url><loc>{base}{new}</loc></url>\n" for src, _, m in pages for old, new in m[:1]
                   if 'content="noindex' not in (SRC / src).read_text())
    (dest / "sitemap.xml").write_text(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}</urlset>\n')
    (dest / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {base}/sitemap.xml\n")
    return dest

# 03/11/2026 (aprovado pela Jéssica): loja da Jéssica Gessoli com consultoria por hora, mentoria e aula, termos,
# privacidade e desistência. Cada página leva o próprio endereço primeiro (vai para o sitemap) e depois os das outras.
jg = [("/jessicagessoli", "/"), ("/en/jessicagessoli", "/en/"), ("/jessicagessoli/loja/", "/loja/"),
      ("/jessicagessoli/loja/obrigado/", "/loja/obrigado/"), ("/jessicagessoli/termos/", "/termos/"),
      ("/jessicagessoli/privacidade/", "/privacidade/"), ("/jessicagessoli/desistencia/", "/desistencia/"),
      ("/jessicagessoli/cancelamento/", "/cancelamento/"), ("/jessicagessoli/checkup/", "/checkup/"),
      # 09/11/2026 (Jéssica): o guia Vaga real ou golpe? é da marca Jéssica Gessoli.
      ("/jessicagessoli/vaga-real-ou-golpe/", "/vaga-real-ou-golpe/"),
      # 10/11/2026 (Jéssica): materiais grátis e Diagnóstico saem de zethic.net e vão para a marca Jéssica Gessoli.
      ("/jessicagessoli/diagnostico/", "/diagnostico/"), ("/jessicagessoli/teste-golpe/", "/teste-golpe/"),
      ("/jessicagessoli/teste-ia/", "/teste-ia/"), ("/jessicagessoli/copia-e-cola/", "/copia-e-cola/"),
      ("/jessicagessoli/conte-seu-golpe/", "/conte-seu-golpe/"),
      # 10/11/2026 (Jéssica): página do conceito Entre os times (roda de cores da segurança).
      ("/jessicagessoli/entre-os-times/", "/entre-os-times/"),
      # 11/11/2026 (Jéssica): Checklist antigolpe para o Negócio em Materiais grátis; o link vai no direct de quem comenta CHECKLIST.
      ("/jessicagessoli/checklist-antigolpe/", "/checklist-antigolpe/")]
def jg_map(i): return [jg[i]] + jg[:i] + jg[i + 1:]
# 03/11/2026 (aprovado pela Jéssica): loja da Pode Curtir com carrinho, termos, privacidade e desistência.
# 04/11/2026: página Seja parceiro (rede curada, modelo C).
# Cada página leva o próprio endereço primeiro (vai para o sitemap) e depois os das outras páginas da marca.
pc = [("/podecurtir", "/"), ("/podecurtir/loja/", "/loja/"), ("/podecurtir/loja/obrigado/", "/loja/obrigado/"),
      ("/podecurtir/termos/", "/termos/"), ("/podecurtir/privacidade/", "/privacidade/"),
      ("/podecurtir/desistencia/", "/desistencia/"), ("/podecurtir/parceiros/", "/parceiros/"),
      # 08/11/2026 (D3 aprovado pela Jéssica): cardápio de exemplo, gerado por _ferramentas/cardapio/gerar_cardapio.py
      ("/podecurtir/cardapio/exemplo/", "/cardapio/exemplo/"), ("/podecurtir/cardapio/exemplo/imprimir/", "/cardapio/exemplo/imprimir/"),
      # 08/11/2026 (aprovado pela Jéssica): exemplo de cozinha de delivery, sem cardápio impresso
      ("/podecurtir/cardapio/exemplo-delivery/", "/cardapio/exemplo-delivery/")]
def pc_map(i): return [pc[i]] + pc[:i] + pc[i + 1:]

# 10/11/2026 (Jéssica): link de uma marca para a outra vai direto ao subdomínio da outra, nunca à cópia antiga em zethic.net.
MARCAS = [(pc, "https://podecurtir.zethic.net"), (jg, "https://jessicagessoli.zethic.net")]
def outra_marca(path):
    base, sep, resto = re.match(r"([^#?]*)([#?]?)(.*)", path).groups()
    for pares, host in MARCAS:
        for old, new in pares:
            if base == old or base + "/" == old:
                return host + new + sep + resto
    return None

build("jessicagessoli", "jessicagessoli.zethic.net", [
    ("_fontes/jessicagessoli.html", "index.html", jg_map(0)),
    ("_fontes/en/jessicagessoli.html", "en/index.html", jg_map(1)),
    ("_fontes/jessicagessoli/loja/index.html", "loja/index.html", jg_map(2)),
    ("_fontes/jessicagessoli/loja/obrigado/index.html", "loja/obrigado/index.html", jg_map(3)),
    ("_fontes/jessicagessoli/termos/index.html", "termos/index.html", jg_map(4)),
    ("_fontes/jessicagessoli/privacidade/index.html", "privacidade/index.html", jg_map(5)),
    ("_fontes/jessicagessoli/desistencia/index.html", "desistencia/index.html", jg_map(6)),
    ("_fontes/jessicagessoli/cancelamento/index.html", "cancelamento/index.html", jg_map(7)),
    ("_fontes/jessicagessoli/checkup/index.html", "checkup/index.html", jg_map(8)),
    ("_fontes/jessicagessoli/vaga-real-ou-golpe/index.html", "vaga-real-ou-golpe/index.html", jg_map(9)),
    ("_fontes/jessicagessoli/diagnostico/index.html", "diagnostico/index.html", jg_map(10)),
    ("_fontes/jessicagessoli/teste-golpe/index.html", "teste-golpe/index.html", jg_map(11)),
    ("_fontes/jessicagessoli/teste-ia/index.html", "teste-ia/index.html", jg_map(12)),
    ("_fontes/jessicagessoli/copia-e-cola/index.html", "copia-e-cola/index.html", jg_map(13)),
    ("_fontes/jessicagessoli/conte-seu-golpe/index.html", "conte-seu-golpe/index.html", jg_map(14)),
    ("_fontes/jessicagessoli/entre-os-times/index.html", "entre-os-times/index.html", jg_map(15)),
    ("_fontes/jessicagessoli/checklist-antigolpe/index.html", "checklist-antigolpe/index.html", jg_map(16)),
], ["/assets/fonts/OFL-IBM-Plex-Sans.txt", "/assets/fonts/OFL-Spectral.txt"])
# 10/11/2026 (Jéssica): zethic.net/jessicagessoli/* não mostra mais as páginas; cada endereço antigo redireciona para
# o mesmo endereço em jessicagessoli.zethic.net, levando junto ?parâmetros e #trecho (links de posts, PDFs e do Asaas).
REDIR = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; base-uri 'none'; form-action 'none'">
<!-- Gerado por _ferramentas/gerar_marcas.py. A página fica em {url}; este endereço só redireciona. -->
<link rel="canonical" href="{url}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url={url}">
<script src="/assets/js/redireciona-marca.js"></script>
<title>{nome}</title>
</head>
<body>
<p>Esta página mudou para <a href="{url}">{url}</a>.</p>
</body>
</html>
"""
# 10/11/2026 (Jéssica): /en/jessicagessoli também fica, porque o currículo em inglês já enviado leva a ele.
# 10/11/2026 (Jéssica, "apague os links antigos"): só o início de cada marca continua em zethic.net, levando ao
# subdomínio, porque o currículo, o kit de palestrante, o guia em PDF e o crédito do Sympla já distribuídos imprimem
# zethic.net/jessicagessoli e zethic.net/podecurtir. Os outros endereços antigos foram apagados e dão 404.
# O PDF do guia em jessicagessoli/vaga-real-ou-golpe/ continua, porque o link do direct aponta para ele.
MANTIDOS = {"/jessicagessoli", "/en/jessicagessoli", "/podecurtir"}
def redirecionar(pares, host, nome):
    for old, new in pares:
        dest = SRC / (old.lstrip("/") + ".html" if not old.endswith("/") else old.lstrip("/") + "index.html")
        if old not in MANTIDOS:
            if CHECK and dest.exists():
                print(f"endereço antigo que devia estar apagado: {dest.relative_to(SRC)}"); sys.exit(1)
            if not CHECK and dest.exists():
                dest.unlink()
                for pasta in dest.parents:
                    if pasta == SRC or any(pasta.iterdir()): break
                    pasta.rmdir()
            continue
        conteudo = REDIR.format(url=f"https://{host}{new}", nome=nome)
        if CHECK:
            if not dest.exists() or dest.read_text() != conteudo:
                print(f"redirecionamento desatualizado: {dest.relative_to(SRC)}"); sys.exit(1)
        else:
            dest.parent.mkdir(parents=True, exist_ok=True); dest.write_text(conteudo)
redirecionar(jg, "jessicagessoli.zethic.net", "Jéssica Gessoli")

# 10/11/2026 (Jéssica): a Pode Curtir também sai de zethic.net; os endereços antigos só redirecionam.
redirecionar(pc, "podecurtir.zethic.net", "Pode Curtir")
pc_dest = build("podecurtir", "podecurtir.zethic.net", [
    ("_fontes/podecurtir.html", "index.html", pc_map(0)),
    ("_fontes/podecurtir/loja/index.html", "loja/index.html", pc_map(1)),
    ("_fontes/podecurtir/loja/obrigado/index.html", "loja/obrigado/index.html", pc_map(2)),
    ("_fontes/podecurtir/termos/index.html", "termos/index.html", pc_map(3)),
    ("_fontes/podecurtir/privacidade/index.html", "privacidade/index.html", pc_map(4)),
    ("_fontes/podecurtir/desistencia/index.html", "desistencia/index.html", pc_map(5)),
    ("_fontes/podecurtir/parceiros/index.html", "parceiros/index.html", pc_map(6)),
    ("_fontes/podecurtir/cardapio/exemplo/index.html", "cardapio/exemplo/index.html", pc_map(7)),
    ("_fontes/podecurtir/cardapio/exemplo/imprimir/index.html", "cardapio/exemplo/imprimir/index.html", pc_map(8)),
    ("_fontes/podecurtir/cardapio/exemplo-delivery/index.html", "cardapio/exemplo-delivery/index.html", pc_map(9)),
], ["/assets/fonts/OFL.txt"])
# Arquivos do cardápio de exemplo que a página carrega por caminho relativo (a planilha em dados/ fica só na fonte).
for pasta in ("exemplo", "exemplo-delivery"):
    for f in ("tema.css", "qr.svg", "icone.svg", "manifest.webmanifest", "cardapio-impresso.pdf"):
        if (SRC / "_fontes/podecurtir/cardapio" / pasta / f).exists():
            shutil.copy2(SRC / "_fontes/podecurtir/cardapio" / pasta / f, pc_dest / "cardapio" / pasta / f)

if CHECK:
    def diff(a, b):
        c = filecmp.dircmp(a, b, ignore=["_tests"])
        ruins = c.left_only + c.right_only + c.diff_files
        for sub in c.common_dirs: ruins += [f"{sub}/{x}" for x in diff(a / sub, b / sub)]
        return ruins
    ruins = [f"{m}: {x}" for m in ("jessicagessoli-site", "podecurtir-site") for x in diff(OUT / m, REAL / m)]
    if ruins:
        print("_marcas desatualizado; rode python3 _ferramentas/gerar_marcas.py\n" + "\n".join(ruins))
        sys.exit(1)
    print("_marcas em dia")
