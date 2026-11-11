# Vídeos da Jéssica Gessoli no site

Regra decidida em 10/11/2026 (`PLANO.md` da Captação 01): o vídeo só entra no site **depois** que o Reel correspondente for publicado no Instagram. Trabalho em andamento não vai ao ar antes da hora.

## Onde entra cada vídeo da Captação 01

| Peça | Vídeo | Página (fonte) | Lugar |
|---|---|---|---|
| W1 | M01 · Comece aqui | `_fontes/jessicagessoli.html` | Na seção `#trajetoria` (Trajetória), ao lado do texto |
| W2 | M02 · O que soluciono | `_fontes/jessicagessoli/diagnostico/index.html` | Na seção "O que você recebe" |
| W3 | M03 · Proteja-se | `_fontes/jessicagessoli/teste-golpe/index.html` | Logo abaixo do topo ("Sua empresa cai num golpe?") |
| W4 | M04 · Hora parada | Radar (post "Quanto custa uma hora parada") | Quando a página do Radar existir |

## Arquivos (pasta `assets/video/`)

O formato é vertical 9:16. A versão 16:9 foi descartada porque todo o material da Captação 01 é vertical.

```bash
# MP4 H.264 (todos os navegadores), cerca de 3 MB para 60 s
ffmpeg -i M01-final.mp4 -vf "scale=720:1280" -c:v libx264 -preset slow -crf 30 -maxrate 380k -bufsize 760k \
  -c:a aac -b:a 64k -ac 1 -movflags +faststart assets/video/jg-comece-aqui.mp4
# WebM VP9 (menor, para quem aceita)
ffmpeg -i M01-final.mp4 -vf "scale=720:1280" -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 \
  -c:a libopus -b:a 48k -ac 1 assets/video/jg-comece-aqui.webm
# Capa: um quadro do próprio vídeo
ffmpeg -ss 2 -i M01-final.mp4 -frames:v 1 -vf "scale=720:1280" -q:v 4 assets/video/jg-comece-aqui.jpg
# Legenda: converter o .srt aprovado para .vtt
ffmpeg -i M01.srt assets/video/jg-comece-aqui.vtt
```

O vídeo do site é o **sem legenda gravada**. Quem lê a legenda é o navegador, pelo arquivo `.vtt`, o que é melhor para acessibilidade e para o Google.

## HTML

```html
<link rel="stylesheet" href="/assets/css/jessicagessoli-video.css">
…
<figure class="video-vertical">
  <video controls playsinline preload="none" width="720" height="1280"
         poster="/assets/video/jg-comece-aqui.jpg" aria-label="Vídeo: Comece aqui, com Jéssica Gessoli">
    <source src="/assets/video/jg-comece-aqui.webm" type="video/webm">
    <source src="/assets/video/jg-comece-aqui.mp4" type="video/mp4">
    <track kind="captions" srclang="pt-BR" label="Português" src="/assets/video/jg-comece-aqui.vtt" default>
  </video>
  <figcaption>Comece aqui: quem eu sou e o que eu faço, em 1 minuto.</figcaption>
</figure>
```

Na mesma página, a política de segurança (`Content-Security-Policy`) precisa ganhar `media-src 'self';`. Sem isso, o navegador bloqueia o vídeo e a legenda.

## Conferência

O teste `_tests/jessicagessoli-video.static.test.mjs` falha se um vídeo:
- toca sozinho;
- não tem capa, legenda `.vtt`, MP4 e WebM;
- passa de ~3 MB;
- está numa página sem `media-src 'self'`.

Depois de mexer nas fontes, rode `python3 _ferramentas/gerar_marcas.py` para atualizar o site da marca.
