# Tira o print de um slide HTML. Uso: python3 shot.py entrada.html saida.png [altura]
# Altura padrão 1350 (post 1080x1350); use 1920 para Stories (1080x1920).
import sys
from playwright.sync_api import sync_playwright
src, out = sys.argv[1], sys.argv[2]
h = int(sys.argv[3]) if len(sys.argv) > 3 else 1350
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1080, "height": h})
    pg.goto("file://" + src)
    pg.evaluate("document.fonts.ready")
    pg.wait_for_timeout(300)
    pg.screenshot(path=out)
    b.close()
