# Stories do canal "Conte o seu golpe" (1080x1920). Uso: python3 stories.py <pasta_saida>
# A área tracejada marca onde a Jéssica põe a figurinha (link, enquete ou caixinha) ao publicar.
import os, sys, html, subprocess
R = "/home/claude/zethic-site"; D = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(D, "out")); os.makedirs(OUT, exist_ok=True)
SHOT = os.path.join(D, "..", "shot.py")
CSS = f"""@font-face{{font-family:Plex;src:url(file://{R}/assets/fonts/ibm-plex-sans-latin-400-normal.woff2);font-weight:400}}
@font-face{{font-family:Plex;src:url(file://{R}/assets/fonts/ibm-plex-sans-latin-600-normal.woff2);font-weight:600}}
html,body{{margin:0}}body{{width:1080px;height:1920px;background:#12352B;color:#F3F5F2;font-family:Plex,sans-serif;position:relative;overflow:hidden}}
.cp{{position:absolute;left:88px;top:290px;font-weight:600;font-size:30px;letter-spacing:4px;padding:14px 24px;border-radius:10px;background:#D9B76E;color:#12352B}}
.big{{position:absolute;left:88px;top:420px;width:904px;font-weight:600;font-size:96px;line-height:1.08}}
.sub{{position:absolute;left:88px;top:{{SUBTOP}}px;width:904px;font-size:44px;line-height:1.4;color:#C9D8CF}}
.h{{color:#D9B76E}}
.fig{{position:absolute;left:88px;top:1240px;width:904px;height:300px;border:4px dashed rgba(217,183,110,.55);border-radius:28px}}
.rod{{position:absolute;left:88px;bottom:150px;width:904px;font-size:32px;color:#C9D8CF}}
.cap{{position:absolute;left:290px;top:660px;width:500px;height:500px;border-radius:50%;background:#D9B76E;color:#12352B;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:96px;letter-spacing:2px}}"""
def page(body, subtop=760): return f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS.replace("{SUBTOP}", str(subtop))}</style></head><body>{body}</body></html>'
S = {
 "story-2026-10-23-conte-saiu": ('<div class="cp">CONTE O SEU GOLPE</div><div class="big">Saiu o canal pra você <b class="h">contar o seu golpe.</b></div>'
   '<div class="sub">Sem nome. Sem julgamento. A sua história vira alerta pra quem ainda não recebeu a mesma mensagem.</div><div class="fig"></div>'
   '<div class="rod">Toca no link. Leva poucos minutos.</div>', 820),
 "story-2026-10-24-conte-enquete": ('<div class="cp">CONTE O SEU GOLPE</div><div class="big">Você já contou o seu golpe <b class="h">pra alguém?</b></div>'
   '<div class="sub">Responde aqui embaixo. Só um toque.</div><div class="fig"></div>'
   '<div class="rod">A culpa é de quem roubou, não de quem foi roubado.</div>', 680),
 "story-2026-10-25-conte-caixinha": ('<div class="cp">CONTE O SEU GOLPE</div><div class="big">Qual golpe você queria que alguém <b class="h">tivesse te contado antes?</b></div>'
   '<div class="sub">Me conta na caixinha. Quer contar a história inteira, sem se identificar? zethic.net/conte-seu-golpe</div><div class="fig"></div>'
   '<div class="rod">Os relatos autorizados viram alerta, sem identificar ninguém.</div>', 920),
 "destaque-conte": ('<div class="cap">CONTE</div>', 760),
}
for nome, (body, st) in S.items():
    hp = os.path.join(OUT, nome + ".html"); pp = os.path.join(OUT, nome + ".png")
    open(hp, "w").write(page(body, st)); subprocess.run([sys.executable, SHOT, hp, pp, "1920"], check=True)
print("ok", len(S))
