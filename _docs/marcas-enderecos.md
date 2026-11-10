# Endereços e regras das três marcas

Decisão da Jéssica em 10/11/2026. Este documento é a regra. Os testes em `_tests/marcas-enderecos.static.test.mjs` impedem que ela seja quebrada sem querer.

## 1. Cada marca tem um endereço só

| Marca | Endereço oficial | Onde fica a fonte | Repositório publicado |
|---|---|---|---|
| Zethic | `zethic.net` | raiz deste repositório | `zethic-site` (este) |
| Jéssica Gessoli | `jessicagessoli.zethic.net` | `_fontes/jessicagessoli*` e `_fontes/en/` | `jessicagessoli-site` |
| Pode Curtir | `podecurtir.zethic.net` | `_fontes/podecurtir*` | `podecurtir-site` |

- **Fontes das marcas:** as páginas da Jéssica Gessoli e da Pode Curtir são editadas em `_fontes/`. O Jekyll não publica pastas que começam com `_`.
- **Geração:** `python3 _ferramentas/gerar_marcas.py` gera cada site em `_marcas/<marca>-site`, que é copiado para o repositório da marca (PR de espelho, com merge depois do PR do `zethic-site`).
- **Endereços antigos:** `zethic.net/jessicagessoli*`, `zethic.net/en/jessicagessoli` e `zethic.net/podecurtir*` não têm mais conteúdo. São páginas de redirecionamento geradas pelo mesmo script. Elas levam ao mesmo endereço no subdomínio, com os `?parâmetros` e o `#trecho`, para não quebrar links de bio, posts, PDFs, QR codes e o retorno do Asaas. Elas não entram no Google (`noindex`).
- **Exceção:** o PDF do guia em `zethic.net/jessicagessoli/vaga-real-ou-golpe/` continua publicado, porque o link do direct aponta para ele.

## 2. Mesma estrutura de endereços nas três marcas

| Página | Zethic | Jéssica Gessoli | Pode Curtir |
|---|---|---|---|
| Início | `/` | `/` | `/` (a loja fica na página inicial, em `#loja`) |
| Loja | `/loja` (proposta) e `/comprar` (pacotes com preço) | `/loja/` | `/loja/` leva a `/#loja` |
| Pedido recebido | `/loja/obrigado/` | `/loja/obrigado/` | `/loja/obrigado/` |
| Termos | resumo do contrato em `/comprar` | `/termos/` | `/termos/` |
| Privacidade | `/privacidade` | `/privacidade/` | `/privacidade/` |
| Desistência | `/privacidade#cancelamento` | `/desistencia/` | `/desistencia/` |

**Nomes de endereço:** português, minúsculas, sem acento, palavras separadas por hífen (`/vaga-real-ou-golpe/`, `/conte-seu-golpe/`). Nas marcas, toda página é uma pasta com `index.html` e o endereço termina em `/`.

**Página nova numa marca:** crie a fonte em `_fontes/`, acrescente o par `("/<marca>/<pagina>/", "/<pagina>/")` na lista da marca em `gerar_marcas.py` e rode o script. O redirecionamento em zethic.net e o mapa do site da marca saem sozinhos.

## 3. Links entre as marcas

- **Zethic:** o conteúdo das páginas da Zethic não cita as outras marcas (regra de 28/10/2026). A única exceção é o parágrafo `class="parceria"` das campanhas, que leva a `https://podecurtir.zethic.net/?utm_source=zethic&utm_campaign=<campanha>`.
- **De uma marca para a outra:** o link vai direto ao subdomínio da outra, nunca a `zethic.net/<marca>`. Na fonte, pode-se escrever o caminho antigo (`/podecurtir/termos/`); o gerador troca pelo subdomínio certo.
- **Contato:** os botões de WhatsApp passam por `https://zethic.net/fale?utm_source=<origem>`, que escolhe o número pela origem.

## 4. Regras de negócio por marca

Fonte: arquivos de configuração e testes deste repositório.

| | Zethic | Jéssica Gessoli | Pode Curtir |
|---|---|---|---|
| O que vende | Tecnologia: suporte de TI, segurança, atendimento digital, financeiro | Cibersegurança e IA: Checkup, Diagnóstico, Antigolpe, consulta, mentoria, aula, palestra | Mídia: perfil, redes, foto e vídeo, cardápio e catálogo (página e app pela Zethic, em parceria) |
| WhatsApp | (19) 98180-0221 | (19) 98180-0221 | (19) 98331-0769 |
| E-mail | contato@zethic.net | jessica.gessoli@zethic.net | podecurtir@zethic.net |
| Pagamento | Pix ou boleto, sem cartão; multa de 2% e juros de 1% ao mês | Pix, boleto ou cartão; parcelado só no cartão, com link próprio | Pagamento integral no site; parcelado só no cartão, com link próprio |
| Preço no site | Só nos pacotes de entrada (`/comprar`) | Itens com preço fechado na loja; projetos por proposta | Preço fechado na loja; foto e vídeo sob proposta |
| Preço de fundador | 3 primeiros clientes de cada pacote | Não se aplica | 3 vagas por serviço, em troca de depoimento |
| Desistência | 7 dias depois da compra, devolução integral | 7 dias corridos, nas condições dos Termos | 7 dias, devolução integral |

**Link de pagamento (Asaas):** cada item vendido online tem um link com o valor exato que a página mostra. Se o valor da página e o do link forem diferentes, o item fica fora da configuração e segue pelo pedido manual até os dois baterem.

**Medição:** Google Analytics e Pixel só carregam depois do aceite de cookies. Cada marca tem a sua propriedade.
