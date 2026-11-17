#!/usr/bin/env python3
"""Mantém em zethic.net só os endereços antigos das marcas, que levam aos sites próprios.

Decisão de 21/10/2026: Pode Curtir e Jéssica Gessoli ganham endereço próprio (podecurtir.zethic.net e
jessicagessoli.zethic.net). Desde 12/11/2026 a Pode Curtir e desde 16/11/2026 a Jéssica Gessoli têm a fonte no
próprio repositório (Jessica-Gessoli/podecurtir-site e Jessica-Gessoli/jessicagessoli-site), editado direto. Este
gerador não monta mais nenhum site de marca: só escreve o redirecionamento de zethic.net/podecurtir e confere que os
outros endereços antigos foram apagados, incluindo todos os da Jéssica Gessoli (desde 16/11/2026).
Regras em _docs/marcas-enderecos.md.

Uso:  python3 _ferramentas/gerar_marcas.py           (gera)
      python3 _ferramentas/gerar_marcas.py --check   (falha se algum redirecionamento estiver desatualizado)
"""
import sys
from pathlib import Path
SRC = Path(__file__).resolve().parent.parent
CHECK = "--check" in sys.argv
Z = "https://zethic.net"

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
      ("/jessicagessoli/checklist-antigolpe/", "/checklist-antigolpe/"),
      # 16/11/2026 (Jéssica): página permanente de palestras, destino do QR Code do último slide. Endereço fixo.
      ("/jessicagessoli/conecte-se/", "/conecte-se/")]
pc = [("/podecurtir", "/"), ("/podecurtir/loja/", "/loja/"), ("/podecurtir/loja/obrigado/", "/loja/obrigado/"),
      ("/podecurtir/termos/", "/termos/"), ("/podecurtir/privacidade/", "/privacidade/"),
      ("/podecurtir/desistencia/", "/desistencia/"), ("/podecurtir/parceiros/", "/parceiros/"),
      # 08/11/2026 (D3 aprovado pela Jéssica): cardápio de exemplo, gerado por _ferramentas/cardapio/gerar_cardapio.py
      ("/podecurtir/cardapio/exemplo/", "/cardapio/exemplo/"), ("/podecurtir/cardapio/exemplo/imprimir/", "/cardapio/exemplo/imprimir/"),
      # 08/11/2026 (aprovado pela Jéssica): exemplo de cozinha de delivery, sem cardápio impresso
      ("/podecurtir/cardapio/exemplo-delivery/", "/cardapio/exemplo-delivery/")]
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
# 16/11/2026 (Jéssica: "não quero nada na Zethic. Vamos desvincular tudo", opção "Apagar já"): zethic.net/jessicagessoli
# e zethic.net/en/jessicagessoli também foram apagados. A lista jg continua aqui só para o gerador e o --check
# garantirem que nenhum endereço antigo da Jéssica Gessoli volte a zethic.net.
MANTIDOS = {"/podecurtir"}
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
# 12/11/2026 (Jéssica: "tudo que é da Pode Curtir somente na Pode Curtir"): a fonte da Pode Curtir passou para o
# repositório Jessica-Gessoli/podecurtir-site, que é editado direto. Este gerador não monta mais o site da Pode Curtir;
# aqui ficam só o endereço antigo zethic.net/podecurtir (redirecionamento acima) e os links das outras marcas para ela.

# 16/11/2026 (Jéssica: "solucionar definitivamente"): a Jéssica Gessoli também sai do zethic-site; a fonte dela é o
# repositório Jessica-Gessoli/jessicagessoli-site, editado direto. Nenhum endereço dela fica em zethic.net.

print("redirecionamentos em dia" if CHECK else "redirecionamentos gerados")
