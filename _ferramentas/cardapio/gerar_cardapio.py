#!/usr/bin/env python3
"""Cardápio Pronto (Pode Curtir; página e app pela Zethic, em parceria): gera o cardápio de um restaurante
a partir de uma planilha.

Fonte única (08/11/2026, aprovado pela Jéssica): dados/cardapio.csv, exportado da planilha do Google do
restaurante, e dados/restaurante.json. O mesmo dado gera, de uma vez:
  index.html            cardápio no celular, com pedido pelo WhatsApp (sem taxa por pedido)
  imprimir/index.html   cardápio impresso da entrada (mesmos preços do digital)
  qr.svg                QR code para mesas e balcão
  tema.css              cores do restaurante (sem estilo inline, por causa da CSP)
  manifest.webmanifest  instalação na tela do celular, pelo navegador
  icone.svg             ícone do app
O PDF para a gráfica sai de imprimir/index.html com: node _ferramentas/cardapio/pdf.js <pasta>

Colunas do CSV: categoria, nome, descricao, preco, alergenos, disponivel (sim/não), destaque (sim ou vazio).
Alérgenos: só o que o restaurante informou por escrito. 1 troca = mudar um item (preço, nome, descrição,
foto ou disponibilidade).

Uso: python3 _ferramentas/cardapio/gerar_cardapio.py podecurtir/cardapio/exemplo
"""
import csv, html, json, re, sys, unicodedata
from pathlib import Path

CSP = ("default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; "
       "manifest-src 'self'; connect-src 'none'; base-uri 'none'; form-action 'none'")


SELO = ' <span class="selo">Destaque</span>'


def slug(t):
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")


def brl(v):
    s = f"{v:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return "R$ " + s


def sim(v):
    return (v or "").strip().lower() in ("sim", "s", "x", "1", "true")


def ler(pasta):
    cfg = json.loads((pasta / "dados/restaurante.json").read_text(encoding="utf-8"))
    itens, vistos = [], set()
    with open(pasta / "dados/cardapio.csv", encoding="utf-8", newline="") as f:
        for n, r in enumerate(csv.DictReader(f), start=2):
            nome = (r.get("nome") or "").strip()
            if not nome:
                continue
            try:
                v = str(r["preco"]).replace("R$", "").strip()
                preco = float(v.replace(".", "").replace(",", ".") if "," in v else v)
            except (KeyError, ValueError):
                sys.exit(f"Linha {n}: preço inválido em '{nome}'")
            i = slug(nome)
            if i in vistos:
                sys.exit(f"Linha {n}: item repetido '{nome}'")
            vistos.add(i)
            itens.append({"id": i, "categoria": r["categoria"].strip(), "nome": nome,
                          "descricao": (r.get("descricao") or "").strip(), "preco": preco,
                          "alergenos": (r.get("alergenos") or "").strip(),
                          "disponivel": sim(r.get("disponivel") or "sim"), "destaque": sim(r.get("destaque"))})
    if not itens:
        sys.exit("Planilha vazia")
    return cfg, itens


def categorias(itens):
    ordem = []
    for it in itens:
        if it["categoria"] not in ordem:
            ordem.append(it["categoria"])
    return [(c, [it for it in itens if it["categoria"] == c]) for c in ordem]


def qr_svg(url):
    import qrcode, qrcode.image.svg
    img = qrcode.make(url, image_factory=qrcode.image.svg.SvgPathFillImage, box_size=10, border=2)
    return img.to_string(encoding="unicode")


def pagina_digital(cfg, itens):
    e = html.escape
    nav = "".join(f'<a href="#{slug(c)}">{e(c)}</a>' for c, _ in categorias(itens))
    secoes = []
    for c, lista in categorias(itens):
        lis = []
        for it in lista:
            al = f'<p class="alergenos">Contém: {e(it["alergenos"])}</p>' if it["alergenos"] else ""
            if it["disponivel"]:
                acao = (f'<div class="qtd" data-id="{it["id"]}"><button type="button" class="menos" aria-label="Tirar um {e(it["nome"])}" hidden>−</button>'
                        f'<span class="n" hidden>0</span><button type="button" class="mais" aria-label="Pôr um {e(it["nome"])} no pedido">+</button></div>')
            else:
                acao = '<span class="indisp">Indisponível hoje</span>'
            lis.append(f'<li class="item{" destaque" if it["destaque"] else ""}{"" if it["disponivel"] else " fora"}" data-id="{it["id"]}" '
                       f'data-nome="{e(it["nome"])}" data-preco="{it["preco"]:.2f}">'
                       f'<div class="txt"><h3>{e(it["nome"])}{SELO if it["destaque"] else ""}</h3>'
                       f'<p>{e(it["descricao"])}</p>{al}</div><div class="lado"><span class="preco">{brl(it["preco"])}</span>{acao}</div></li>')
        secoes.append(f'<section id="{slug(c)}"><h2>{e(c)}</h2><ul>{"".join(lis)}</ul></section>')
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="{CSP}">
<title>Cardápio · {e(cfg["nome"])}</title>
<meta name="description" content="{e(cfg["descricao"])} Cardápio com pedido pelo WhatsApp.">
<meta name="robots" content="noindex">
<meta name="theme-color" content="{e(cfg["cor"])}">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icone.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icone.svg">
<link rel="stylesheet" href="/assets/css/cardapio.css">
<link rel="stylesheet" href="tema.css">
<script src="/assets/js/cardapio.js" defer></script>
</head>
<body data-whatsapp="{e(cfg["whatsapp"])}" data-inicio="{e(cfg["mensagem_inicio"])}">
<p class="aviso">{e(cfg["aviso"])}</p>
<header class="topo"><h1>{e(cfg["nome"])}</h1><p>{e(cfg["descricao"])}</p><p class="info">{e(cfg["horario"])} · {e(cfg["endereco"])}</p></header>
<nav class="cats" aria-label="Categorias">{nav}</nav>
<main>{"".join(secoes)}
<p class="nota">Preços em reais, iguais aos do cardápio impresso. Alérgenos conforme informado pelo restaurante. Atualizado em {e(cfg["atualizado_em"])}.</p>
<p class="nota"><a href="imprimir/">Versão para imprimir</a></p>
</main>
<div class="barra" id="barra" hidden><button type="button" id="abrir">Ver pedido · <span id="barra-qtd">0</span> itens · <span id="barra-total">R$ 0,00</span></button></div>
<div class="painel" id="painel" role="dialog" aria-modal="true" aria-labelledby="t-pedido" hidden>
  <div class="caixa">
    <h2 id="t-pedido">Seu pedido</h2>
    <ul id="linhas"></ul>
    <p class="total">Total <span id="total">R$ 0,00</span></p>
    <label>Seu nome<input id="nome" autocomplete="name"></label>
    <fieldset><legend>Como prefere</legend>
      <label class="op"><input type="radio" name="tipo" value="Retirar no balcão" checked> Retirar no balcão</label>
      <label class="op"><input type="radio" name="tipo" value="Entrega"> Entrega</label>
      <label class="op"><input type="radio" name="tipo" value="Comer aqui"> Comer aqui</label>
    </fieldset>
    <label>Observação<textarea id="obs" rows="2"></textarea></label>
    <a class="enviar" id="enviar" href="https://wa.me/{e(cfg["whatsapp"])}" rel="noopener">Enviar pelo WhatsApp</a>
    <button type="button" class="fechar" id="fechar">Continuar escolhendo</button>
    <p class="nota">O pedido só vale depois que o restaurante confirmar pelo WhatsApp.</p>
  </div>
</div>
<footer class="rodape"><p>{e(cfg["rodape"])}</p></footer>
</body>
</html>
'''


def pagina_impressa(cfg, itens):
    e = html.escape
    secoes = []
    for c, lista in categorias(itens):
        lis = "".join(
            f'<li><div><b>{e(it["nome"])}</b>{"" if it["disponivel"] else " <i>(indisponível)</i>"}<span>{e(it["descricao"])}'
            f'{(" Contém: " + e(it["alergenos"]) + ".") if it["alergenos"] else ""}</span></div><b class="p">{brl(it["preco"])}</b></li>'
            for it in lista)
        secoes.append(f'<section><h2>{e(c)}</h2><ul>{lis}</ul></section>')
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="{CSP}">
<title>Cardápio impresso · {e(cfg["nome"])}</title>
<meta name="robots" content="noindex">
<link rel="stylesheet" href="/assets/css/cardapio.css">
<link rel="stylesheet" href="../tema.css">
</head>
<body class="impresso">
<p class="aviso">{e(cfg["aviso"])}</p>
<header class="topo"><h1>{e(cfg["nome"])}</h1><p>{e(cfg["descricao"])} · {e(cfg["horario"])}</p></header>
<div class="colunas">{"".join(secoes)}</div>
<div class="qr-bloco"><img src="../qr.svg" alt="QR code do cardápio digital" width="110" height="110"><p>Aponte a câmera para ver o cardápio no celular e pedir pelo WhatsApp.<br>Preços em reais, iguais aos do cardápio digital. Alérgenos conforme informado pelo restaurante. Atualizado em {e(cfg["atualizado_em"])}.</p></div>
</body>
</html>
'''


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    pasta = Path(sys.argv[1])
    cfg, itens = ler(pasta)
    (pasta / "imprimir").mkdir(exist_ok=True)
    (pasta / "index.html").write_text(pagina_digital(cfg, itens), encoding="utf-8")
    (pasta / "imprimir/index.html").write_text(pagina_impressa(cfg, itens), encoding="utf-8")
    (pasta / "tema.css").write_text(f':root{{--cor:{cfg["cor"]};--fundo:{cfg["cor_fundo"]}}}\n', encoding="utf-8")
    (pasta / "qr.svg").write_text(qr_svg(cfg["url"]), encoding="utf-8")
    inicial = html.escape(cfg["nome"][:1].upper())
    (pasta / "icone.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="96" fill="{cfg["cor"]}"/>'
        f'<text x="256" y="330" font-family="Arial, sans-serif" font-size="260" font-weight="700" fill="#fff" text-anchor="middle">{inicial}</text></svg>\n',
        encoding="utf-8")
    (pasta / "manifest.webmanifest").write_text(json.dumps({
        "name": "Cardápio · " + cfg["nome"], "short_name": cfg["nome"][:12], "start_url": "./", "scope": "./",
        "display": "standalone", "background_color": cfg["cor_fundo"], "theme_color": cfg["cor"], "lang": "pt-BR",
        "icons": [{"src": "icone.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any"}]},
        ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{cfg['nome']}: {len(itens)} itens em {len(categorias(itens))} categorias")


if __name__ == "__main__":
    main()
