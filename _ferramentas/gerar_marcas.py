#!/usr/bin/env python3
"""Gera os sites próprios das marcas a partir das páginas publicadas em zethic.net.

Decisão de 21/10/2026: Pode Curtir e Jéssica Gessoli ganham endereço próprio
(podecurtir.zethic.net e jessicagessoli.zethic.net). A fonte continua sendo
podecurtir.html, jessicagessoli.html e en/jessicagessoli.html deste repositório;
este script copia as páginas e os arquivos que elas usam para _marcas/<marca>-site,
troca os endereços pelos novos e aponta para zethic.net o que é da Zethic.

Uso:  python3 _ferramentas/gerar_marcas.py           (gera)
      python3 _ferramentas/gerar_marcas.py --check   (falha se _marcas estiver desatualizado)
"""
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
        found |= set(re.findall(r"/assets/[^\"' ,)]+", (SRC / f).read_text()))
    return sorted(found)

def copy(dest, paths):
    for p in paths:
        s = SRC / p.lstrip("/")
        d = dest / p.lstrip("/")
        d.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(s, d)

def zethic_links(html, own):
    # links relativos que não são da própria marca vão para zethic.net
    def fix(m):
        attr, path = m.group(1), m.group(2)
        if path.startswith("/assets/") or any(path == o or path.startswith(o + "#") or path.startswith(o + "?") for o in own):
            return m.group(0)
        return f'{attr}="{Z}{path}"'
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
      ("/jessicagessoli/cancelamento/", "/cancelamento/")]
def jg_map(i): return [jg[i]] + jg[:i] + jg[i + 1:]
build("jessicagessoli", "jessicagessoli.zethic.net", [
    ("jessicagessoli.html", "index.html", jg_map(0)),
    ("en/jessicagessoli.html", "en/index.html", jg_map(1)),
    ("jessicagessoli/loja/index.html", "loja/index.html", jg_map(2)),
    ("jessicagessoli/loja/obrigado/index.html", "loja/obrigado/index.html", jg_map(3)),
    ("jessicagessoli/termos/index.html", "termos/index.html", jg_map(4)),
    ("jessicagessoli/privacidade/index.html", "privacidade/index.html", jg_map(5)),
    ("jessicagessoli/desistencia/index.html", "desistencia/index.html", jg_map(6)),
    ("jessicagessoli/cancelamento/index.html", "cancelamento/index.html", jg_map(7)),
], ["/assets/fonts/OFL-IBM-Plex-Sans.txt", "/assets/fonts/OFL-Spectral.txt"])
# 03/11/2026 (aprovado pela Jéssica): loja da Pode Curtir com carrinho, termos, privacidade e desistência.
# 04/11/2026: página Seja parceiro (rede curada, modelo C).
# Cada página leva o próprio endereço primeiro (vai para o sitemap) e depois os das outras páginas da marca.
pc = [("/podecurtir", "/"), ("/podecurtir/loja/", "/loja/"), ("/podecurtir/loja/obrigado/", "/loja/obrigado/"),
      ("/podecurtir/termos/", "/termos/"), ("/podecurtir/privacidade/", "/privacidade/"),
      ("/podecurtir/desistencia/", "/desistencia/"), ("/podecurtir/parceiros/", "/parceiros/")]
def pc_map(i): return [pc[i]] + pc[:i] + pc[i + 1:]
build("podecurtir", "podecurtir.zethic.net", [
    ("podecurtir.html", "index.html", pc_map(0)),
    ("podecurtir/loja/index.html", "loja/index.html", pc_map(1)),
    ("podecurtir/loja/obrigado/index.html", "loja/obrigado/index.html", pc_map(2)),
    ("podecurtir/termos/index.html", "termos/index.html", pc_map(3)),
    ("podecurtir/privacidade/index.html", "privacidade/index.html", pc_map(4)),
    ("podecurtir/desistencia/index.html", "desistencia/index.html", pc_map(5)),
    ("podecurtir/parceiros/index.html", "parceiros/index.html", pc_map(6)),
], ["/assets/fonts/OFL.txt"])

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
