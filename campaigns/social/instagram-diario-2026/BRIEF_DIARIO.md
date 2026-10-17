# Brief comum: post diário do Instagram @jessicagessoli (semanas 2 a 26)

## Quem fala e para quem
Jéssica Gessoli, Cibersegurança e IA, desde 2008 em telecom, bancos, seguros, saúde e infraestrutura crítica. No Instagram ela fala com quem é dono do Negócio e com a família dele: linguagem simples, exemplo do dia a dia, fala direta com "você", sem jargão, sem tom de medo. Modelo de comunicação: Nathalia Arcuri (traduz o tema difícil, acolhe, dá o passo prático).

## Regras de texto (obrigatórias)
- Português do Brasil. Sem misturar idiomas (termo em inglês só se traduzido na hora). Sem emoji.
- NUNCA escrever "PME", "pequena e média empresa" nem "pequenas e médias empresas". O público é "o Negócio", com N maiúsculo ("o seu Negócio", "dono do Negócio").
- A área se chama "Cibersegurança e IA". Nunca "Riscos e IA".
- Nenhum nome de cliente, empregador, pessoa física ou vítima. Nenhuma experiência pessoal da Jéssica além de "desde 2008 em telecom, bancos, seguros, saúde e infraestrutura crítica".
- Proibido inventar fato, número, estatística, lei, prazo, data, caso, nome de empresa ou citação. Todo número, lei, prazo ou caso real precisa de fonte pública que você ABRIU nesta sessão (WebFetch) e que diz exatamente aquilo. Na dúvida, escreva sem o número.
- Cena ilustrativa é permitida se for genérica ("Imagine: o financeiro recebe...") e sem números inventados.
- Telefones, links e nomes dentro de mensagens falsas mostradas nos slides são SEMPRE fictícios: links terminam em ".exemplo" (ex.: rastreio-entrega.exemplo); telefone como "0800 XXX XXXX". Nunca um número ou domínio real.
- Empresa cujo nome o golpista usa aparece como vítima da imitação: "golpistas usam o nome do Mercado Livre", nunca "golpe do Mercado Livre" como se a empresa fosse culpada.
- Reclame Aqui: só como padrão de reclamações contado com suas palavras; sem print, sem nome de quem reclamou, sem trecho copiado.
- Feriados e datas sensíveis (Finados, Consciência Negra, Natal): tom respeitoso, sem piada.

## Grade semanal (domingo a sábado)
| Dia | Hora | serie | Série | Formato |
|---|---|---|---|---|
| Domingo | 12:00 | jogo | Golpe ou não? | carrossel de 8 telas |
| Segunda | 10:00 | golpe | Golpe da semana (CASO REAL com fonte) | carrossel de 5 telas |
| Terça | 10:00 | ia | IA no Negócio | carrossel de 5 telas |
| Quarta | 18:00 | mito | Mito ou verdade | carrossel de 5 telas |
| Quinta | 10:00 | direct | Pergunta do direct | carrossel de 5 telas |
| Sexta | 10:00 | check | Checklist de sexta | carrossel de 4 telas |
| Sábado | 10:00 | frase-lat | Frase da semana | imagem única |

No ÚLTIMO domingo de cada mês (29/11/2026, 27/12/2026, 31/01/2027, 28/02/2027, 28/03/2027) o domingo é "Caso de domingo" (serie "caso") no lugar do Golpe ou não?: um caso real contado como reportagem, com fonte.

Às quartas às 10h já sai um carrossel do Instagram de outro calendário; o tema do Mito ou verdade das 18h não pode repetir o tema desse carrossel da mesma quarta (lista em temas_ja_usados.txt).

## Formato do arquivo (Python)
Um arquivo por semana: /tmp/claude-0/-home-claude/b86c6f91-fdbf-5e32-abec-cc9a860672b2/scratchpad/diario/semanaNN.py (NN com dois dígitos). Leia o exemplo semana01.py na mesma pasta. Conteúdo:

```python
TAGS = "#cibersegurança #segurançadigital #empreendedorismo #golpe #donodenegocio"
POSTS = [
 dict(slug="AAAA-MM-DD-palavras-chave", serie="golpe", rede="instagram", data="AAAA-MM-DDTHH:MM:SS", tipo="carrossel",
      slides=[...], texto="""legenda completa""", fonte={"nome": "Nome da fonte", "url": "https://..."}),
 ...
]
```
- 7 posts por semana, na ordem domingo → sábado, com a hora da grade.
- `slug`: data + 2 a 4 palavras sem acento, minúsculas, com hífen. Único.
- `fonte`: obrigatório na segunda (golpe) e no Caso de domingo; nos outros dias só se o post usar fato com fonte. Pode ser lista de dicts se houver mais de uma fonte. A fonte vai no primeiro comentário e o nome dela na última linha da legenda antes das hashtags: "Fonte: <nome>."
- `tipo`: "carrossel" ou "imagem" (sábado).
- Destaque com [[palavra]] (vira marca-texto). No máximo um trecho por título.

## Tipos de tela e limites (contando caracteres sem os [[ ]])
- Capa por série:
  - golpe: ("cover", "<título até 34 caracteres, com [[destaque]]>", "", "<canal> · agora", "<mensagem falsa até 150 caracteres; link fictício entre <u></u>>")
  - ia: ("cover", "<título até 70>", "<chamada até 40, termina com →>")
  - mito: ("cover", "\"<crença até 70>\"", "<chamada até 40 →>", "MITO" ou "VERDADE")
  - direct: ("cover", "\"<pergunta até 60>\"", "")
  - check: ("cover", "<título até 70>", "<chamada até 40 →>", "<quantas caixas marcadas>", "<total de itens>")
  - jogo: ("cover", "<título até 60>", "<chamada até 40 →>")
  - caso: ("cover", "<título até 70>", "<chamada até 40 →>")
- ("text", "<RÓTULO EM MAIÚSCULAS até 28>", "<título até 45>", "<corpo até 190>")
- ("list", "<RÓTULO até 28>", "<título até 40>", ["<item até 85>", ... 2 a 4 itens])
- ("end", "<RÓTULO até 28>", "<pergunta até 70>", "<corpo até 110>") — última tela de todo carrossel. No jogo, acrescente um 5º elemento com o texto do botão: "Compartilhar com a família".
- ("msg", "MENSAGEM 1 DE 3", "<canal · remetente fictício>", "<mensagem até 160; link fictício em <u></u>>") — só no jogo.
- ("resp", "GOLPE" ou "NÃO É GOLPE", "<título até 40>", "<explicação até 170>") — só no jogo, logo depois da msg correspondente.
- ("quote", "<frase da Jéssica até 60, com [[destaque]]>", "Frase da semana · Jéssica Gessoli") — sábado, única tela.

Estrutura recomendada:
- golpe: capa · "COMO FUNCIONA" · "O QUE ELES QUEREM" · list "COMO SE PROTEGER" · end.
- ia / mito / direct: capa · 2 telas text ou list · 1 list com o passo prático · end.
- check: capa · list · list · end.
- jogo: capa · msg 1 · resp 1 · msg 2 · resp 2 · msg 3 · resp 3 · end (com botão). Misture: em cada jogo, pelo menos uma das três mensagens é legítima (NÃO É GOLPE) e o resp explica por quê, sem dizer que dispensa conferir.
- caso: capa · 3 text (o começo, a virada, o que teria evitado) · end. Sem nome de vítima.

## Legenda (texto)
- Primeira linha = gancho; depois explicação curta; passos numerados; chamada final (salvar, mandar para alguém, comentar ou direct). 500 a 1.100 caracteres.
- Golpe e caso: frase "Fonte: <nome>." antes das hashtags e "(link no primeiro comentário)" se couber.
- Jogo: convite "Manda no grupo da família e vê quem acerta mais."
- Termine com 5 hashtags relevantes, minúsculas (pode usar TAGS).

## Temas dos meses (puxam as séries)
- 18/10 a 14/11: golpe que chega pelo celular (WhatsApp, Pix, ligação falsa). Finados 02/11.
- 15/11 a 12/12: vender no fim de ano sem cair em golpe. Proclamação 15/11, Consciência Negra 20/11, Black Friday 27/11.
- 13/12 a 09/01: fim de ano e férias, quem cuida do Negócio. Natal 25/12, Ano Novo 01/01.
- 10/01 a 06/02: começar o ano organizado (senhas, acessos, cópias, dados de cliente). Dia Internacional da Proteção de Dados 28/01.
- 07/02 a 06/03: IA no dia a dia do Negócio. Carnaval 09/02.
- 07/03 a 17/04: dinheiro e imposto (golpe da Receita, boleto, fraude no financeiro). Dia da Mulher 08/03, Dia do Consumidor 15/03, Sexta-feira Santa 26/03, Páscoa 28/03.

## Não repetir
Leia temas_ja_usados.txt (mesma pasta): são os posts do Instagram já agendados. Não repita tema nem ângulo deles. Cada redator recebeu uma faixa de semanas e uma lista de golpes reais sugeridos; fique na sua faixa.

## Autoconferência antes de entregar
Rode um script Python que importe seus arquivos e confira: 7 posts por semana, datas e horas da grade, série certa por dia, limites de caracteres de cada tela, legenda entre 500 e 1.100 caracteres (sábado pode ter 250 a 700), fonte presente na segunda e no caso, ausência de "PME", "pequena e média", "Riscos e IA", emoji e de links ou telefones reais nas telas. Corrija o que falhar.
