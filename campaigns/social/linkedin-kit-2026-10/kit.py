# Kit de LinkedIn (25/10/2026): capa da Jéssica Gessoli, capa e logo da página da Zethic, logo e capa da newsletter "Risco Traduzido".
# Uso: python3 kit.py  -> PNGs em ./out (Playwright, tamanhos exatos de cada peça)
import os
from playwright.sync_api import sync_playwright
R = "/home/claude/zethic-site"; D = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(D, "out")
F = f"""@font-face{{font-family:Spectral;src:url(file://{R}/assets/fonts/spectral-latin-400-normal.woff2);font-weight:400}}
@font-face{{font-family:Spectral;src:url(file://{R}/assets/fonts/spectral-latin-500-normal.woff2);font-weight:500}}
@font-face{{font-family:Plex;src:url(file://{R}/assets/fonts/ibm-plex-sans-latin-400-normal.woff2);font-weight:400}}
@font-face{{font-family:Plex;src:url(file://{R}/assets/fonts/ibm-plex-sans-latin-600-normal.woff2);font-weight:600}}
@font-face{{font-family:Pub;src:url(file://{R}/assets/fonts/public-sans-latin-400-normal.woff2);font-weight:400}}
@font-face{{font-family:Pub;src:url(file://{R}/assets/fonts/public-sans-latin-700-normal.woff2);font-weight:700}}
html,body{{margin:0}}*{{box-sizing:border-box}}"""
VG, LAT, POR, LATE = "#12352B", "#D9B76E", "#F3F5F2", "#7E5E22"
NAVY, CIANO = "#02041A", "#00E5FF"
ZMARK = f'<rect x="14" y="13" width="36" height="7" rx="1.5" fill="#FFFFFF"/><rect x="14" y="28.5" width="36" height="7" rx="1.5" fill="{CIANO}"/><rect x="14" y="44" width="36" height="7" rx="1.5" fill="#FFFFFF"/>'
P = {
 # Capa do perfil pessoal (1584x396). A foto de perfil cobre o canto inferior esquerdo no computador: texto à direita.
 "jessicagessoli-linkedin-capa": (1584, 396, f"""<body style="width:1584px;height:396px;background:{VG};color:{POR};position:relative;overflow:hidden">
  <div style="position:absolute;left:560px;top:78px;width:960px">
   <div style="font-family:Spectral;font-weight:400;font-size:62px;line-height:1.08">Risco técnico só protege<br>quando vira decisão.</div>
   <div style="width:120px;height:5px;background:{LAT};margin:30px 0 24px"></div>
   <div style="font-family:Plex;font-weight:600;font-size:22px;letter-spacing:4px;color:{LAT}">CIBERSEGURANÇA E IA · GOVERNANÇA DE IA</div>
   <div style="font-family:Plex;font-size:22px;margin-top:14px;color:#C9D8CF">Palestras, projetos e conteúdo · zethic.net/jessicagessoli · Instagram @jessicagessoli</div>
  </div></body>"""),
 # Logo da newsletter (400x400) e capa (1920x1080)
 "risco-traduzido-logo": (400, 400, f"""<body style="width:400px;height:400px;background:{VG};color:{POR};position:relative;overflow:hidden">
  <div style="position:absolute;left:44px;top:104px;font-family:Spectral;font-size:66px;line-height:1.02">Risco<br>Traduzido</div>
  <div style="position:absolute;left:46px;top:276px;width:90px;height:6px;background:{LAT}"></div>
  <div style="position:absolute;left:46px;top:300px;font-family:Plex;font-weight:600;font-size:18px;letter-spacing:3px;color:{LAT}">JÉSSICA GESSOLI</div></body>"""),
 "risco-traduzido-capa": (1920, 1080, f"""<body style="width:1920px;height:1080px;background:{VG};color:{POR};position:relative;overflow:hidden">
  <div style="position:absolute;left:150px;top:150px;font-family:Plex;font-weight:600;font-size:34px;letter-spacing:6px;color:{LAT}">NEWSLETTER · CIBERSEGURANÇA E IA</div>
  <div style="position:absolute;left:144px;top:250px;font-family:Spectral;font-size:200px;line-height:1">Risco Traduzido</div>
  <div style="position:absolute;left:150px;top:520px;width:220px;height:10px;background:{LAT}"></div>
  <div style="position:absolute;left:150px;top:590px;width:1500px;font-family:Plex;font-size:52px;line-height:1.35;color:#C9D8CF">Risco cibernético e de IA em linguagem de decisão, para diretoria e conselho.</div>
  <div style="position:absolute;left:150px;bottom:140px;font-family:Spectral;font-size:52px">Jéssica Gessoli</div>
  <div style="position:absolute;right:150px;bottom:146px;font-family:Plex;font-size:34px;color:#C9D8CF">Instagram @jessicagessoli</div></body>"""),
 # Página da Zethic: logo (400x400, símbolo oficial do manual: anel ciano e Z) e capa (1128x191)
 "zethic-linkedin-logo": (400, 400, f"""<body style="width:400px;height:400px;background:{NAVY};position:relative;overflow:hidden">
  <svg width="400" height="400" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="#02041A" stroke="#00E5FF" stroke-width="8"></circle><g transform="translate(100 100) scale(0.86) translate(-100 -100)"><rect x="58" y="56" width="84" height="23" rx="2" fill="#FFFFFF"></rect><polygon points="114,79 142,79 86,124 58,124" fill="#FFFFFF"></polygon><rect x="58" y="124" width="84" height="23" rx="2" fill="#FFFFFF"></rect><rect x="67" y="90" width="66" height="23" rx="2" fill="#00E5FF" stroke="#02041A" stroke-width="6"></rect></g></svg></body>"""),
 "zethic-linkedin-capa": (1128, 191, f"""<body style="width:1128px;height:191px;background:{NAVY};color:#FFFFFF;position:relative;overflow:hidden">
  <svg style="position:absolute;right:-150px;top:-170px" width="420" height="420" viewBox="0 0 200 200"><circle cx="100" cy="100" r="88" fill="none" stroke="{CIANO}" stroke-width="5"/></svg>
  <div style="position:absolute;left:80px;top:44px;font-family:Pub;font-weight:700;font-size:38px;line-height:1.1">Cibersegurança e IA <span style="color:{CIANO}">para o Negócio.</span></div>
  <div style="position:absolute;left:80px;top:104px;font-family:Pub;font-size:20px;color:#A7B2D1">Proteger · Organizar · Capacitar e aconselhar · zethic.net</div></body>"""),
 # Página da Pode Curtir (25/10): logo (400x400, visor com o ponto gravando) e capa (1128x191)
 "podecurtir-linkedin-logo": (400, 400, """<body style="width:400px;height:400px;background:#D4124A;position:relative;overflow:hidden">
  <svg width="400" height="400" viewBox="0 0 200 200"><path d="M44 84 V44 H84 M116 44 H156 V84 M156 116 V156 H116 M84 156 H44 V116" fill="none" stroke="#FFFFFF" stroke-width="16"></path><circle cx="100" cy="100" r="30" fill="#FFD23F"></circle></svg></body>"""),
 "podecurtir-linkedin-capa": (1128, 191, """<body style="width:1128px;height:191px;background:#D4124A;color:#FFFFFF;position:relative;overflow:hidden">
  <svg style="position:absolute;left:0;top:0" width="1128" height="191" viewBox="0 0 1128 191"><path d="M24 64 V24 H64 M1064 24 H1104 V64 M1104 127 V167 H1064 M64 167 H24 V127" fill="none" stroke="#FFFFFF" stroke-width="8"></path></svg>
  <div style="position:absolute;left:80px;top:36px;display:flex;align-items:center;gap:10px;font-family:Pub;font-weight:700;font-size:18px"><span style="width:16px;height:16px;border-radius:50%;background:#FFD23F;display:inline-block"></span>Gravando</div>
  <div style="position:absolute;left:80px;top:68px;font-family:Pub;font-weight:700;font-size:38px;line-height:1.1">Foto e vídeo para o seu evento e o seu Negócio.</div>
  <div style="position:absolute;left:80px;top:122px;font-family:Pub;font-size:20px;color:#FFE3EB">Eventos · Negócios · Ensaios · Redes sociais · zethic.net/podecurtir</div></body>"""),
}
with sync_playwright() as p:
    b = p.chromium.launch()
    for nome, (w, h, body) in P.items():
        pg = b.new_page(viewport={"width": w, "height": h})
        hp = os.path.join(OUT, nome + ".html"); open(hp, "w").write(f'<!doctype html><html><head><meta charset="utf-8"><style>{F}</style></head>{body}</html>')
        pg.goto("file://" + hp)
        pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(300)
        pg.screenshot(path=os.path.join(OUT, nome + ".png")); pg.close()
    b.close()
print("ok", len(P))
