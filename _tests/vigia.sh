#!/usr/bin/env bash
# Vigia do zethic.net. Uso: bash _tests/vigia.sh
# ESPERAR=<segundos> tolera a demora da publicação depois de um envio ao main.
set -u
SITE="${SITE:-https://zethic.net}"
PAGINAS="index.html fale.html agendar.html teste-golpe.html privacidade.html diagnostico.html"
limite=$(( $(date +%s) + ${ESPERAR:-0} ))

conferir() {
  falhas=0
  for p in $PAGINAS; do
    url="$SITE/${p%.html}"; [ "$p" = "index.html" ] && url="$SITE/"
    if ! curl -fsSL --max-time 20 -H 'Cache-Control: no-cache' "$url?vigia=$(date +%s)" -o /tmp/pub.html; then
      echo "FALHA: $url não respondeu"; falhas=$((falhas+1)); continue
    fi
    if ! cmp -s /tmp/pub.html "$p"; then
      echo "FALHA: $url está diferente do repositório"; falhas=$((falhas+1))
    else
      echo "ok: $url"
    fi
  done
  if curl -fsSL --max-time 20 "$SITE/fale" | grep -q 'wa.me/5519981800221'; then echo "ok: /fale leva ao WhatsApp da Zethic"; else echo "FALHA: /fale sem o destino oficial"; falhas=$((falhas+1)); fi
  if curl -fsSL --max-time 20 "$SITE/agendar" | grep -q 'calendar.app.google/s1dxqRWcqwvEiK927'; then echo "ok: /agendar leva à agenda da Zethic"; else echo "FALHA: /agendar sem o destino oficial"; falhas=$((falhas+1)); fi
  if curl -fsSL --max-time 20 "$SITE/.well-known/security.txt" | grep -q '^Contact: mailto:contato@zethic.net'; then echo "ok: security.txt"; else echo "FALHA: security.txt ausente ou alterado"; falhas=$((falhas+1)); fi
  codigo=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "http://zethic.net/")
  case "$codigo" in 301|308) echo "ok: http redireciona para https ($codigo)";; *) echo "FALHA: http respondeu $codigo, esperado redirecionar para https"; falhas=$((falhas+1));; esac
  return $falhas
}

while true; do
  conferir && { echo "Vigia: tudo certo."; exit 0; }
  if [ "$(date +%s)" -ge "$limite" ]; then echo "Vigia: encontrou falhas. Veja _docs/RESPOSTA-INCIDENTES.md"; exit 1; fi
  echo "Aguardando a publicação... nova tentativa em 60 s"; sleep 60
done
