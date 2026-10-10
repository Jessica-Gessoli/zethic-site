# zethic.net/fale — Endpoint Oficial de Contato

> **Regra:** `zethic.net/fale` é um ativo digital controlado pela Zethic e não deve depender de terceiros como endpoint público primário.
>
> Divulga-se o endereço da Zethic. O destino pode mudar. O endereço permanece.

## Registro do ativo

| Campo | Valor |
|---|---|
| Ativo | Zethic — Endpoint Oficial de Contato |
| Canônico | `https://zethic.net/fale` |
| Proprietário | Zethic |
| Função | Entrada oficial para contato comercial |
| Destino atual | WhatsApp Business da Zethic (`https://wa.me/5519981800221`) |
| Dependência externa | WhatsApp (`wa.me`) |
| Camada controlada pela Zethic | `zethic.net/fale` (este repositório, GitHub Pages, domínio em `CNAME`) |
| Princípio | O endereço público permanece estável mesmo que a infraestrutura de atendimento seja substituída |

## Arquitetura

```
zethic.net/fale  →  fale.html (GitHub Pages, repositório zethic-site)  →  wa.me/5519981800221?text=<mensagem>
```

- O site é HTML estático no GitHub Pages. O Pages **não** oferece redirect HTTP no servidor (301/302/307) nem headers customizados.
- `fale.html` responde 200 e redireciona imediatamente no navegador:
  - **com JavaScript:** `location.replace()` para o destino, com mensagem escolhida por `utm_source` (não deixa `/fale` no histórico);
  - **sem JavaScript:** `<meta http-equiv="refresh" content="0; url=...">` com a mensagem padrão;
  - **fallback manual:** link visível "Abrir o WhatsApp da Zethic".
- Não é 301 de propósito: um redirect permanente fica em cache nos navegadores e buscadores, o que contraria a premissa de que o destino pode mudar. Semântica pretendida: redirect temporário.

### Dependências

| Existe | Não existe |
|---|---|
| GitHub Pages (hospedagem do `zethic.net`) | Encurtadores (contate.me, bit.ly etc.) |
| DNS do `zethic.net` apontando para o GitHub Pages | Servidor, função serverless, Cloudflare |
| WhatsApp (`wa.me`) como destino | Framework, build, bibliotecas, fontes, imagens, scripts de terceiros |
| | Plataforma de analytics (nenhuma instalada no site) |

## Onde o destino está configurado

Arquivo único: `fale.html`.

1. Bloco `CONFIG` dentro do `<script>`: `base` (número), `padrao` (mensagem padrão) e `origens` (mensagens por origem).
2. A URL com a mensagem padrão também aparece, já codificada, em dois pontos de fallback sem JavaScript:
   - `<meta http-equiv="refresh" content="0; url=...">`;
   - `<a id="destino" href="...">`.
3. A CSP (`<meta http-equiv="Content-Security-Policy">`) autoriza o script inline por hash SHA-256. **Qualquer alteração no script exige recalcular o hash.**

O número também aparece no `index.html` (texto do link de contato e JSON-LD). Uma troca de número deve atualizar os dois arquivos.

## Como alterar

### Número ou destino

1. Em `fale.html`, troque `base` no `CONFIG`.
2. Troque a mesma URL no meta refresh e no `href` do link `#destino`.
3. Recalcule o hash da CSP (abaixo).
4. Rode os testes.

Para outro destino (CRM, omnichannel, página de triagem, agenda), troque a URL do `base` e dos fallbacks. O endereço público `zethic.net/fale` e os QR Codes impressos continuam válidos.

### Mensagem padrão

1. Troque `padrao` no `CONFIG`.
2. Gere a versão codificada com `encodeURIComponent` e atualize o meta refresh e o link `#destino`:
   ```sh
   node -e 'console.log(encodeURIComponent(process.argv[1]))' "Nova mensagem"
   ```
3. Recalcule o hash da CSP e rode os testes. O teste estático falha se os fallbacks divergirem do `CONFIG`.

### Nova origem ou campanha

1. Adicione uma chave em `origens` (minúsculas, sem espaços), por exemplo `"youtube": "Olá! Vim pelo YouTube..."`.
2. Divulgue `https://zethic.net/fale?utm_source=youtube`.
3. Recalcule o hash da CSP e rode os testes.

Origens disponíveis hoje: `google`, `instagram`, `linkedin`, `patrimonio-digital`, `governanca-ia`, `grc`, `indicacao`. Qualquer outro valor, inclusive ausente, usa a mensagem padrão. A comparação ignora maiúsculas e minúsculas.

### Recalcular o hash da CSP

```sh
node -e 'const s=require("fs").readFileSync("fale.html","utf8").match(/<script>([\s\S]*?)<\/script>/)[1];console.log(require("crypto").createHash("sha256").update(s).digest("base64"))'
```

Substitua o valor em `script-src 'sha256-...'`. Com hash errado, o navegador bloqueia o script e a página cai no fallback sem JavaScript, com a mensagem padrão.

## Rastreamento (UTM)

- Parâmetros aceitos: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` e `utm_term`. Nenhum quebra o redirecionamento.
- Só `utm_source` altera o comportamento, escolhendo a mensagem. Os demais são ignorados pela página.
- **Não há analytics instalado no site**, então as UTMs não são registradas hoje. Na prática, o sinal de origem que chega ao atendimento é a mensagem contextual.
- **Oportunidade (não implementada):** se o site adotar uma plataforma de analytics, registre o evento em `fale.html` antes do `location.replace()`. Isso exige incluir o domínio do analytics na CSP.
- `<meta name="referrer" content="origin">` impede que a query string com as UTMs seja enviada ao WhatsApp.

## Segurança

- **Sem open redirect:** o destino é constante. Parâmetros como `?url=` são ignorados.
- **Sem XSS:** `utm_source` só seleciona uma chave de uma lista fixa, verificada com `hasOwnProperty`, o que impede o uso de `__proto__` ou `constructor`. Nada vindo da URL é escrito no DOM.
- **Encoding:** a mensagem é codificada com `encodeURIComponent`.
- **CSP restritiva:** `default-src 'none'`, script inline só por hash, `base-uri` e `form-action` bloqueados.
- **HTTPS:** depende da opção "Enforce HTTPS" do GitHub Pages. Confirme em *Settings → Pages* do repositório.
- **Cache:** o GitHub Pages serve com cache curto, em torno de 10 minutos. Uma troca de destino pode levar esse tempo para propagar.
- **Robôs:** `noindex, nofollow`. A página não entra no `sitemap.xml` e não é bloqueada no `robots.txt`, para que o `noindex` seja lido.

## QR Code oficial

- `assets/qr/zethic-fale.svg` (vetorial, para impressão) e `assets/qr/zethic-fale.png`.
- Conteúdo: `https://zethic.net/fale`, nunca `wa.me`. Assim o destino pode mudar sem reimprimir material.
- Correção de erro nível M, versão 2. Leitura confirmada na geração (o decode devolveu exatamente a URL).
- Arte final com identidade visual: não produzida. Use o SVG como base.

## Testes

```sh
# Estáticos, sem dependências (Node 18+):
node --test _tests/fale.static.test.mjs

# E2E no Chromium (desktop, mobile, sem JS); requer Playwright:
PW=$(npm root -g)/playwright node _tests/fale.e2e.mjs
```

O Jekyll do GitHub Pages ignora as pastas `_tests/` e `_docs/` (prefixo `_`), então elas não são publicadas.

### Verificação após publicar

```sh
curl -sI https://zethic.net/fale          # esperado: 200, sem loop
curl -sI http://zethic.net/fale           # esperado: 301 para https (com Enforce HTTPS ativo)
curl -s  https://zethic.net/fale | grep -o 'wa.me/[0-9]*'   # esperado: wa.me/5519981800221
```

Depois, abrir no celular e no desktop:
- `https://zethic.net/fale` → WhatsApp com a mensagem padrão;
- `https://zethic.net/fale?utm_source=instagram` → mensagem do Instagram.

## Rollback

```sh
git revert <commit>   # remove fale.html, QR e docs
git push origin main  # o GitHub Pages republica em minutos
```

Nenhum DNS, servidor ou outra rota é alterado por esta funcionalidade.

## Evolução possível

Um redirect HTTP 302 na borda exigiria colocar Cloudflare (Redirect Rule ou Worker) na frente do `zethic.net`, o que significa migrar o DNS. Não foi adotado por ser mudança de infraestrutura crítica.
