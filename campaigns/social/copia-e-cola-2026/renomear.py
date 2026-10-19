# Troca o nome da série "Prompt Joia" por "Copia e Cola" nas artes já prontas (decisão da Jéssica, 19/10/2026).
# Apaga só os trechos com o nome antigo e escreve o texto novo com as medidas originais
# (calibradas pixel a pixel contra as artes da série). Uso: python3 renomear.py
import os, glob, re, html
from playwright.sync_api import sync_playwright
AQUI = os.path.dirname(os.path.abspath(__file__))
ORIG = os.path.join(AQUI, "..", "prompt-joia-2026")
R = "/home/claude/zethic-site"
NOME = "COPIA E COLA"
FONT = f"""@font-face{{font-family:Plex;src:url(file://{R}/assets/fonts/ibm-plex-sans-latin-400-normal.woff2);font-weight:400}}
@font-face{{font-family:Plex;src:url(file://{R}/assets/fonts/ibm-plex-sans-latin-600-normal.woff2);font-weight:600}}"""
POR = "#F3F5F2"; LATAO = "#D9B76E"; GARRAFA = "#12352B"; TINTA = "#1A2B25"
def apaga(x0, y0, x1, y1, cor):
    return f'<div style="position:absolute;left:{x0}px;top:{y0}px;width:{x1-x0}px;height:{y1-y0}px;background:{cor}"></div>'
def capa(n):
    # selo: pílula latão em x=88, y=250, altura 61; texto 28 px, espaçamento 4 px, a 22 px da borda
    return (apaga(84, 246, 700, 315, POR) +
        f'<div style="position:absolute;left:88px;top:250px;height:61px;padding:0 22px;border-radius:30.5px;background:{LATAO};box-sizing:border-box">'
        f'<div style="margin-top:12px;color:{GARRAFA};font-weight:600;font-size:28px;letter-spacing:4px;white-space:nowrap">{NOME} Nº {n:02d}</div></div>')
def ultima(n):
    return (apaga(80, 325, 1000, 375, LATAO) +
        f'<div style="position:absolute;left:88px;top:330px;color:{GARRAFA};font-weight:600;font-size:30px;letter-spacing:4px;white-space:nowrap">{NOME} Nº {n:02d} DE 26</div>' +
        apaga(80, 712, 1000, 900, LATAO) +
        f'<div style="position:absolute;left:88px;top:718px;width:904px;color:{GARRAFA};font-weight:600;font-size:36px;line-height:1.3">Toda quinta tem um Copia e Cola novo. Qual tarefa você quer na próxima? Me conta nos comentários.</div>')
def capa26_titulo():
    return (apaga(80, 335, 1000, 672, POR) +
        '<style>mark{background:linear-gradient(transparent 62%,#E6CEA2 62%);color:inherit;padding:0 4px}</style>'
        f'<h1 style="position:absolute;left:88px;top:345px;width:904px;margin:0;font-weight:600;font-size:90px;line-height:1.1;letter-spacing:-0.5px;color:{GARRAFA}">O último Copia&nbsp;e&nbsp;Cola: <mark>o prompt que cria os seus prompts</mark>.</h1>')
def tela2_26():
    return (apaga(80, 505, 1000, 640, POR) +
        f'<div style="position:absolute;left:88px;top:509px;width:904px;color:{TINTA};font-weight:400;font-size:44px;line-height:1.4">Depois de 25 edições, você já sabe as peças. Agora a IA monta o pedido com você.</div>')
def main():
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1080, "height": 1350})
        feitos = []
        for f in sorted(glob.glob(os.path.join(ORIG, os.environ.get("SO","*-prompt-joia-*-*.png")))):
            m = re.search(r"(\d{4}-\d{2}-\d{2})-prompt-joia-(\d{2})-(\d)\.png$", f)
            data, n, tela = m.group(1), int(m.group(2)), int(m.group(3))
            camadas = ""
            if tela == 1: camadas = capa(n) + (capa26_titulo() if n == 26 else "")
            elif tela == 5: camadas = ultima(n)
            elif tela == 2 and n == 26: camadas = tela2_26()
            saida = os.path.join(AQUI, f"{data}-copia-e-cola-{n:02d}-{tela}.png")
            if not camadas:
                if not os.path.exists(saida): os.link(f, saida) if False else __import__("shutil").copyfile(f, saida)
                continue
            doc = (f'<!doctype html><html><head><meta charset="utf-8"><style>{FONT}html,body{{margin:0}}'
                   f'body{{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:Plex;background:url(file://{f}) 0 0/1080px 1350px no-repeat}}</style></head><body>{camadas}</body></html>')
            tmp = os.path.join(AQUI, "_tmp.html"); open(tmp, "w", encoding="utf-8").write(doc)
            pg.goto("file://" + tmp); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(150)
            pg.screenshot(path=saida); feitos.append(os.path.basename(saida))
        os.remove(os.path.join(AQUI, "_tmp.html")); b.close()
    print("ok", len(feitos), "telas refeitas")
if __name__ == "__main__": main()
