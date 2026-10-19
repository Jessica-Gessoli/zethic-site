import os, html, json, subprocess, re
D = os.path.dirname(os.path.abspath(__file__)); R = "/home/claude/zethic-site"
OUT = os.path.join(D, "..", "esp", "radar_stories"); os.makedirs(OUT, exist_ok=True)
S = [
 ("2026-10-19T12:00:00","story-2026-10-19-feira-empreendedor","FEIRA DO EMPREENDEDOR · 19 A 22/10","Vai à Feira do Empreendedor do [[Sebrae-SP]]?","Inscrição e credenciamento só pelo site oficial do Sebrae-SP. Link que chega por mensagem: confira no site oficial antes de clicar.","alerta"),
 ("2026-10-26T12:00:00","story-2026-10-26-pix-avise-banco","PIX","Caiu num golpe no Pix? [[Avise o banco na hora.]]","O mecanismo de devolução do Pix segue o dinheiro por várias contas. Mas a devolução não é garantida: quanto antes o banco souber, maior a chance.","alerta"),
 ("2026-11-03T12:00:00","story-2026-11-03-titulo-eleitor","TÍTULO DE ELEITOR","O cadastro eleitoral reabre hoje. [[O golpe do título cancelado também.]]","Regularizar o título é gratuito. Confira só no app e-Título ou no site do TSE, digitando o endereço você mesmo.","alerta"),
 ("2026-11-11T12:00:00","story-2026-11-11-onze-onze","11.11","Hoje é 11.11. [[Começa a temporada das lojas falsas.]]","Desconto grande demais, loja que você não conhece, Pix para pessoa física: pare e confira. No dia 22 começa a Semana da Compra Segura.","alerta"),
 ("2026-11-19T12:00:00","story-2026-11-19-empreendedorismo-feminino-1","DIA DO EMPREENDEDORISMO FEMININO","3 decisões de segurança que toda [[dona de Negócio]] toma sem time de TI","1 de 3 · Confirmação em duas etapas no WhatsApp, no Instagram e no app do banco do Negócio.","calmo"),
 ("2026-11-19T12:05:00","story-2026-11-19-empreendedorismo-feminino-2","DIA DO EMPREENDEDORISMO FEMININO","Pix acima de um valor? [[Só você aprova.]]","2 de 3 · E, antes de aprovar, confirme o pedido por outro canal: ligação ou mensagem para o número que você já tem.","calmo"),
 ("2026-11-19T12:10:00","story-2026-11-19-empreendedorismo-feminino-3","DIA DO EMPREENDEDORISMO FEMININO","Uma [[palavra-código]] para pedido de dinheiro.","3 de 3 · Combine com a família e com a equipe. Pedido urgente sem a palavra-código: não paga. Qual das 3 você já fez? Me conta no direct.","calmo"),
 ("2026-12-03T12:00:00","story-2026-12-03-justificativa-1turno","JUSTIFICATIVA ELEITORAL","Hoje vence o prazo para justificar a ausência no [[1º turno]].","Faça pelo app e-Título, pelo site da Justiça Eleitoral ou no cartório eleitoral. Multa eleitoral nunca vai para Pix de pessoa física.","alerta"),
 ("2027-01-06T12:00:00","story-2027-01-06-imposto-novo","IMPOSTO NOVO EM 2027","2027 começou com [[mudança de imposto]].","Recebeu boleto ou cobrança de \"regularização\" que não esperava? Confira com o seu contador antes de pagar.","calmo"),
 ("2027-01-08T12:00:00","story-2027-01-08-justificativa-2turno","JUSTIFICATIVA ELEITORAL","Hoje vence o prazo para justificar a ausência no [[2º turno]].","Faça pelo app e-Título, pelo site da Justiça Eleitoral ou no cartório eleitoral. Multa eleitoral nunca vai para Pix de pessoa física.","alerta"),
 ("2027-03-01T12:00:00","story-2027-03-01-comprovante-pix","PIX","A partir de hoje, comprovante de Pix [[não tem propaganda nem link]].","Recebeu um \"comprovante\" com link para clicar? Desconfie. Confira o Pix no app do seu banco.","alerta"),
 ("2027-03-31T12:00:00","story-2027-03-31-dia-do-backup","DIA MUNDIAL DO BACKUP","Se o computador do Negócio sumir hoje, [[você abre amanhã?]]","Cópia de segurança fora do computador e um teste de recuperação por mês. Hoje é um bom dia para começar.","calmo"),
 ("2027-03-31T15:00:00","story-2027-03-31-defis","DEFIS · SIMPLES NACIONAL","Hoje vence a [[DEFIS]] do Simples Nacional.","Mensagem de \"pendência na Receita\" com link ou boleto? Confira com o seu contador ou no portal oficial do Simples Nacional, digitando o endereço.","alerta"),
]
hl = lambda t: re.sub(r"\[\[(.+?)\]\]", r'<b class="h">\1</b>', html.escape(t, quote=False))
CSS = f"""@font-face{{font-family:Plex;src:url(file://{R}/assets/fonts/ibm-plex-sans-latin-400-normal.woff2);font-weight:400}}
@font-face{{font-family:Plex;src:url(file://{R}/assets/fonts/ibm-plex-sans-latin-600-normal.woff2);font-weight:600}}
html,body{{margin:0}}body{{width:1080px;height:1920px;background:#12352B;color:#F3F5F2;font-family:Plex,sans-serif;position:relative;overflow:hidden}}
.hd{{position:absolute;left:88px;top:290px;display:flex;align-items:center;gap:22px}}.av{{width:84px;height:84px;border-radius:50%;background:url(file://{R}/assets/img/jessica-gessoli.jpg) center/cover;box-shadow:0 0 0 4px #D9B76E}}
.nm{{font-weight:600;font-size:34px}}.at{{font-size:28px;color:#C9D8CF}}
.cp{{position:absolute;left:88px;top:430px;font-weight:600;font-size:28px;letter-spacing:4px;padding:14px 24px;border-radius:10px;background:#D9B76E;color:#12352B}}
.cp.alerta{{background:#F58028;color:#12352B}}.cp.alerta:before{{content:"⚠ "}}
.t{{position:absolute;left:88px;top:540px;width:904px;font-weight:600;font-size:84px;line-height:1.1}}
.h{{color:#D9B76E;font-weight:600}}
.b{{position:absolute;left:88px;top:960px;width:904px;font-size:44px;line-height:1.4;color:#C9D8CF}}"""
jobs=[]; man=[]
for dt,nm,tag,tit,body,tom in S:
    h=f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body><div class="hd"><div class="av"></div><div><div class="nm">Jéssica Gessoli</div><div class="at">@jessicagessoli</div></div></div><div class="cp {tom}">{html.escape(tag)}</div><div class="t">{hl(tit)}</div><div class="b">{html.escape(body)}</div></body></html>'
    hp=os.path.join(OUT,nm+".html"); pp=os.path.join(OUT,nm+".png"); open(hp,"w").write(h); jobs+= [hp,pp]
    man.append(dict(data=dt,arquivo=nm+".png",alt=re.sub(r"\[\[|\]\]","",tit)+" "+body))
subprocess.run(["node", os.path.join(D,"..","story.mjs")]+jobs, check=True)
json.dump(man,open(os.path.join(OUT,"manifest.json"),"w"),ensure_ascii=False,indent=1); print("ok",len(man))
