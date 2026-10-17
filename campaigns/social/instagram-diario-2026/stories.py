import os, re, json, html, subprocess, sys, importlib.util, glob
D = os.path.dirname(os.path.abspath(__file__)); R = "/home/claude/zethic-site"
CAMPDIR = os.environ.get("CAMPDIR", os.path.join(D, "..", "esp", "camp")); OUT = os.environ.get("OUTDIR", os.path.join(D, "..", "esp", "stories"))
os.makedirs(OUT, exist_ok=True)
sp = importlib.util.spec_from_file_location("campanhas", os.path.join(D, "campanhas.py")); cm = importlib.util.module_from_spec(sp); sp.loader.exec_module(cm)
P = {}
for f in sorted(glob.glob(os.path.join(D, "semana*.py"))) + [os.path.join(D, "campanha_consumidor.py")]:
    s2 = importlib.util.spec_from_file_location(os.path.basename(f)[:-3], f); m = importlib.util.module_from_spec(s2); s2.loader.exec_module(m)
    for p in m.POSTS: P[p["slug"]] = p
clean = lambda t: re.sub(r"\[\[(.+?)\]\]", r"\1", t).strip('"')
hl = lambda t: re.sub(r"\[\[(.+?)\]\]", r'<b class="h">\1</b>', html.escape(t, quote=False))
SERIE = {"jogo": "GOLPE OU NÃO?", "golpe": "GOLPE DA SEMANA", "ia": "IA NO NEGÓCIO", "mito": "MITO OU VERDADE", "direct": "PERGUNTA DO DIRECT", "check": "CHECKLIST DE SEXTA", "frase-lat": "FRASE DA SEMANA", "caso": "CASO DE DOMINGO"}
CSS = f"""@font-face{{font-family:Plex;src:url(file://{R}/assets/fonts/ibm-plex-sans-latin-400-normal.woff2);font-weight:400}}
@font-face{{font-family:Plex;src:url(file://{R}/assets/fonts/ibm-plex-sans-latin-600-normal.woff2);font-weight:600}}
html,body{{margin:0}}body{{width:1080px;height:1920px;background:#12352B;color:#F3F5F2;font-family:Plex,sans-serif;position:relative;overflow:hidden}}
.cp{{position:absolute;left:88px;top:290px;font-weight:600;font-size:30px;letter-spacing:4px;padding:14px 24px;border-radius:10px;background:#D9B76E;color:#12352B}}
.dia{{position:absolute;left:88px;top:380px;font-weight:600;font-size:40px;letter-spacing:6px;color:#D9B76E}}
.se{{position:absolute;left:88px;top:445px;font-size:32px;letter-spacing:3px;color:#C9D8CF}}
.t{{position:absolute;left:88px;top:500px;width:904px;font-weight:600;font-size:72px;line-height:1.12}}
.h{{color:#D9B76E;font-weight:600}}
.th{{position:absolute;left:88px;bottom:690px;width:360px;border-radius:18px;box-shadow:0 0 0 6px #D9B76E}}
.cta{{position:absolute;left:500px;bottom:720px;width:492px;font-weight:600;font-size:40px;line-height:1.3;color:#F3F5F2}}.cta small{{display:block;font-weight:400;font-size:32px;color:#C9D8CF;margin-top:16px}}
.big{{position:absolute;left:88px;top:560px;width:904px;font-weight:600;font-size:96px;line-height:1.08}}
.sub{{position:absolute;left:88px;top:860px;width:904px;font-size:44px;line-height:1.4;color:#C9D8CF}}
.btn{{position:absolute;left:88px;top:1110px;font-weight:600;font-size:40px;padding:22px 40px;border-radius:999px;background:#D9B76E;color:#12352B}}"""
def page(body): return f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>{body}</body></html>'
jobs = []; man = []
def add(name, body):
    hp = os.path.join(OUT, name + ".html"); pp = os.path.join(OUT, name + ".png"); open(hp, "w").write(page(body)); jobs.extend([hp, pp]); man.append(name + ".png")
for k, c in cm.CAMP.items():
    nome = c["nome"]; tot = c["total"]
    t = P[c["teaser"]]["data"][:10]
    add(f"story-{t}-{k}-amanha", f'<div class="cp">{nome}</div><div class="dia">COMEÇA AMANHÃ</div><div class="big">{tot} dias. {tot} posts.<br><b class="h">Zero golpe.</b></div><div class="sub">{html.escape(c["chamada"].split(":",1)[1].strip().split(". ")[0])}.</div><div class="btn">Ativa as notificações do perfil</div>')
    for i, slug in enumerate(c["dias"], 1):
        p = P[slug]; n = len(p["slides"]); img = os.path.join(CAMPDIR, f"{slug}-1.png" if n > 1 else f"{slug}.png")
        hora = p["data"][11:16].replace(":00", "h")
        tit = p["slides"][0][1]
        last = i == tot
        cta = "Post novo no feed.<small>Toca no perfil para ver.</small>" if not last else "Último dia.<small>Manda a semana inteira para quem precisa.</small>"
        add(f"story-{p['data'][:10]}-{k}-dia{i}", f'<div class="cp">{nome}</div><div class="dia">DIA {i} DE {tot} · {hora}</div><div class="se">{SERIE.get(p["serie"],"")}</div><div class="t">{hl(tit)}</div><img class="th" src="file://{os.path.abspath(img)}"><div class="cta">{cta}</div>')
subprocess.run(["node", os.path.join(D, "..", "story.mjs")] + jobs, check=True)
json.dump(man, open(os.path.join(OUT, "manifest.json"), "w"), ensure_ascii=False, indent=1)
print("ok", len(man))
