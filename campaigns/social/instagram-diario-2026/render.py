import html, os, re, subprocess, sys, json
sys.path.insert(0, os.path.dirname(__file__))
import importlib.util
POSTS=[]
for _m in ["semana01"]:
    _sp=importlib.util.spec_from_file_location(_m, os.path.join(os.path.dirname(__file__), _m+".py")); _mod=importlib.util.module_from_spec(_sp); _sp.loader.exec_module(_mod); POSTS+=_mod.POSTS

R = "/home/claude/zethic-site"
OUT = os.environ.get("OUTDIR") or os.path.join(os.path.dirname(__file__), "out")
os.makedirs(OUT, exist_ok=True)
SHOT = os.path.join(os.path.dirname(os.path.dirname(__file__)), "shot.mjs")

CSS = f"""
@font-face{{font-family:Plex;src:url(file://{R}/assets/fonts/ibm-plex-sans-latin-400-normal.woff2);font-weight:400}}
@font-face{{font-family:Plex;src:url(file://{R}/assets/fonts/ibm-plex-sans-latin-600-normal.woff2);font-weight:600}}
html,body{{margin:0}}body{{width:1080px;height:1350px;font-family:Plex;position:relative;overflow:hidden;background:#fff;color:#12352B}}
body.dark{{background:#12352B;color:#F3F5F2}}
.hdr{{position:absolute;left:88px;top:96px;display:flex;align-items:center;gap:26px}}
.av{{width:104px;height:104px;border-radius:50%;background:url(file://{R}/assets/img/jessica-gessoli.jpg) 50% 26%/160%}}
.nm{{font-weight:600;font-size:36px}}.at{{font-size:30px;color:#55655E;margin-top:4px}}
.dark .at{{color:#C9D8CF}}
.pg{{position:absolute;right:92px;top:110px;font-weight:600;font-size:30px;color:#55655E}}.dark .pg{{color:#C9D8CF}}
mark{{background:linear-gradient(transparent 62%,#E6CEA2 62%);color:inherit;padding:0 4px}}
.dark mark{{background:none;color:#D9B76E;padding:0}}
.cover h1{{position:absolute;left:88px;top:300px;width:904px;margin:0;font-weight:600;font-size:104px;line-height:1.1;letter-spacing:-0.5px}}
.cta{{position:absolute;left:88px;bottom:110px;width:900px;font-weight:600;font-size:34px;color:#7E5E22}}
.box{{position:absolute;left:88px;top:330px;width:904px}}
.eb{{font-weight:600;font-size:30px;letter-spacing:4px;color:#7E5E22;margin-bottom:26px}}.dark .eb{{color:#D9B76E}}
.tt{{font-weight:600;font-size:76px;line-height:1.12;margin:0 0 40px}}
.bd{{font-size:44px;line-height:1.4;color:#1A2B25}}.dark .bd{{color:#C9D8CF}}
ol{{margin:0;padding:0;list-style:none;counter-reset:n}}
li{{counter-increment:n;font-size:44px;line-height:1.35;margin:0 0 34px;padding-left:84px;position:relative;color:#1A2B25}}
li:before{{content:counter(n);position:absolute;left:0;top:0;width:56px;height:56px;border-radius:50%;background:#12352B;color:#F3F5F2;font-weight:600;font-size:32px;display:flex;align-items:center;justify-content:center}}
table{{border-collapse:collapse;width:904px}}td{{font-size:36px;line-height:1.3;padding:26px 0;border-top:2px solid #E2E7E2;vertical-align:top}}
.qt{{position:absolute;left:88px;top:330px;width:904px}}.qm{{font-size:200px;line-height:.8;color:#D9B76E;font-weight:600}}.qx{{font-weight:600;font-size:88px;line-height:1.15;margin-top:10px}}.qa{{margin-top:60px;font-size:36px;color:#D9B76E;font-weight:600}}
td.k{{font-weight:600;width:300px;padding-right:24px}}

.cover.s-golpe h1,.cover.s-dk h1,body.cover:has(.tag) h1{{top:345px}}
.tag{{position:absolute;left:88px;top:250px;font-weight:600;font-size:28px;letter-spacing:4px;padding:12px 22px;border-radius:8px;background:#12352B;color:#D9B76E}}
body.s-golpe{{background:#F58028;color:#12352B}}.s-golpe .at,.s-golpe .pg{{color:#12352B;opacity:.8}}.s-golpe mark{{background:#12352B;color:#F58028;padding:0 10px}}.s-golpe .tag{{background:#12352B;color:#F58028}}.s-golpe .cta{{color:#12352B}}
.tri{{position:absolute;right:92px;top:240px;width:0;height:0;border-left:44px solid transparent;border-right:44px solid transparent;border-bottom:78px solid #12352B}}
.tri:after{{content:"!";position:absolute;left:-8px;top:18px;color:#F58028;font-weight:600;font-size:52px}}
.phone{{position:absolute;left:180px;top:640px;width:720px;height:620px;background:#fff;border:14px solid #12352B;border-bottom:none;border-radius:60px 60px 0 0;padding:70px 46px 0;box-sizing:border-box}}
.phone .from{{font-size:26px;color:#55655E;font-weight:600;margin-bottom:18px}}.phone .sms{{background:#E2E7E2;border-radius:28px 28px 28px 6px;padding:28px 32px;font-size:36px;line-height:1.35;color:#1A2B25}}.phone u{{color:#1a5fb4}}
body.s-dk{{background:#12352B;color:#F3F5F2}}.s-dk .at,.s-dk .pg{{color:#C9D8CF}}.s-dk mark{{background:none;color:#D9B76E;padding:0}}.s-dk .cta{{color:#D9B76E}}.s-dk .tag{{background:#D9B76E;color:#12352B}}
.wm{{position:absolute;right:-30px;bottom:-120px;font-weight:600;font-size:620px;line-height:1;color:transparent;-webkit-text-stroke:4px rgba(217,183,110,.35)}}
.stamp{{position:absolute;right:90px;top:820px;transform:rotate(-12deg);border:8px solid #AE4F0B;color:#AE4F0B;font-weight:600;font-size:96px;letter-spacing:8px;padding:6px 34px;border-radius:14px}}
.stamp.ok{{border-color:#21763C;color:#21763C}}
body.s-por{{background:#F3F5F2}}
.foto{{position:absolute;right:0;bottom:0;width:620px;height:720px;background:url(file://{R}/assets/img/jessica-gessoli.jpg) 50% 20%/cover;-webkit-mask-image:linear-gradient(to top,#000 75%,transparent)}}
.bub2{{position:absolute;left:88px;top:330px;width:760px;background:#fff;border-radius:40px;padding:44px 44px 54px;box-shadow:0 6px 0 #E2E7E2;z-index:2}}.bub2 .q{{font-weight:600;font-size:84px;line-height:1.1}}
.bub2:after{{content:"";position:absolute;right:120px;bottom:-46px;border-left:56px solid transparent;border-top:50px solid #fff}}
.chk{{position:absolute;left:88px;top:860px;display:flex;gap:26px}}.chk div{{width:92px;height:92px;border:6px solid #D9B76E;border-radius:16px;position:relative}}
.chk div.ok{{background:#D9B76E}}.chk div.ok:after{{content:"";position:absolute;left:28px;top:8px;width:22px;height:46px;border:solid #12352B;border-width:0 10px 10px 0;transform:rotate(45deg)}}
body.s-lat{{background:#D9B76E;color:#12352B}}.s-lat .at,.s-lat .pg{{color:#12352B;opacity:.75}}.s-lat mark{{background:none;color:#12352B;text-decoration:underline;text-decoration-thickness:8px;text-underline-offset:14px;padding:0}}.s-lat .qm,.s-lat .qa{{color:#12352B}}
"""

def hl(t):
    t = html.escape(t)
    return re.sub(r"\[\[(.+?)\]\]", r"<mark>\1</mark>", t)

def header(i, n, dark=False):
    pg = f'<div class="pg">{i}/{n}</div>' if n > 1 else ""
    return f'<div class="hdr"><div class="av"></div><div><div class="nm">Jéssica Gessoli</div><div class="at">@jessicagessoli</div></div></div>{pg}'

SERIE = None
def slide_html(s, i, n):
    kind = s[0]
    se = SERIE
    dark = kind in ("end","quote")
    body = header(i, n, dark)
    if kind == "cover" and se == "golpe":
        body += f'<div class="tag">GOLPE DA SEMANA</div><div class="tri"></div><h1 style="font-size:96px">{hl(s[1])}</h1><div class="phone"><div class="from">{html.escape(s[3])}</div><div class="sms">{s[4]}</div></div>'
        cls = "cover s-golpe"
    elif kind == "cover" and se == "ia":
        body = '<div class="wm">IA</div>' + header(i, n, True) + f'<div class="tag">IA NO NEGÓCIO</div><h1>{hl(s[1])}</h1><div class="cta">{hl(s[2])}</div>'
        cls = "cover s-dk"
    elif kind == "cover" and se == "mito":
        body += f'<div class="tag">MITO OU VERDADE</div><h1>{hl(s[1])}</h1><div class="stamp{" ok" if s[3]=="VERDADE" else ""}">{s[3]}</div><div class="cta">{hl(s[2])}</div>'
        cls = "cover"
    elif kind == "cover" and se == "direct":
        body = '<div class="foto"></div>' + header(i, n) + f'<div class="tag">PERGUNTA DO DIRECT</div><div class="bub2"><div class="q">{hl(s[1])}</div></div>'
        cls = "cover s-por"
    elif kind == "cover" and se == "check":
        ok = int(s[3]); tot = int(s[4])
        boxes = "".join('<div class="ok"></div>' if k < ok else '<div></div>' for k in range(tot))
        body = header(i, n, True) + f'<div class="tag">CHECKLIST DE SEXTA</div><h1>{hl(s[1])}</h1><div class="chk">{boxes}</div><div class="cta">{hl(s[2])}</div>'
        cls = "cover s-dk"
    elif kind == "cover":
        body += f'<h1>{hl(s[1])}</h1><div class="cta">{hl(s[2])}</div>'
        cls = "cover"
    elif kind == "text":
        body += f'<div class="box"><div class="eb">{hl(s[1])}</div><div class="tt">{hl(s[2])}</div><div class="bd">{hl(s[3])}</div></div>'
        cls = ""
    elif kind == "list":
        items = "".join(f"<li>{hl(x)}</li>" for x in s[3])
        body += f'<div class="box"><div class="eb">{hl(s[1])}</div><div class="tt">{hl(s[2])}</div><ol>{items}</ol></div>'
        cls = ""
    elif kind == "end":
        body += f'<div class="box"><div class="eb">{hl(s[1])}</div><div class="tt">{hl(s[2])}</div><div class="bd">{hl(s[3])}</div></div>'
        cls = "dark"
    elif kind == "quote" and se == "frase-lat":
        body = header(i, n) + f'<div class="qt"><div class="qm">“</div><div class="qx">{hl(s[1])}</div><div class="qa">{hl(s[2])}</div></div>'
        cls = "s-lat"
    elif kind == "quote":
        body += f'<div class="qt"><div class="qm">“</div><div class="qx">{hl(s[1])}</div><div class="qa">{hl(s[2])}</div></div>'
        cls = "dark"
    elif kind == "table":
        small = len(s[3]) > 5
        st = ' style="font-size:27px;padding:15px 0"' if small else ''
        rows = "".join(f'<tr><td class="k"{st}>{hl(a)}</td><td{st}>{hl(b)}</td></tr>' for a, b in s[3])
        body += f'<div class="box" style="top:{'250' if small else '300'}px"><div class="eb">{hl(s[1])}</div><div class="tt" style="font-size:{'60' if small else '68'}px">{hl(s[2])}</div><table>{rows}</table></div>'
        cls = ""
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body class="{cls}">{body}</body></html>'

manifest = []
ONLY = os.environ.get("ONLY","").split(",") if os.environ.get("ONLY") else None
SUF = os.environ.get("SUF","")
for p in POSTS:
    if ONLY and p["slug"] not in ONLY: continue
    SERIE = p.get("serie")
    n = len(p["slides"])
    files = []
    for i, s in enumerate(p["slides"], 1):
        name = (f'{p["slug"]}{SUF}-{i}' if n > 1 else p["slug"]+SUF)
        hp = os.path.join(OUT, name + ".html"); pp = os.path.join(OUT, name + ".png")
        open(hp, "w").write(slide_html(s, i, n))
        subprocess.run(["node", SHOT, hp, pp], check=True)
        files.append(name + ".png")
    manifest.append({"slug": p["slug"], "files": files})
json.dump(manifest, open(os.path.join(OUT, "manifest.json"), "w"), ensure_ascii=False, indent=1)
print("ok", sum(len(m["files"]) for m in manifest), "imagens")
