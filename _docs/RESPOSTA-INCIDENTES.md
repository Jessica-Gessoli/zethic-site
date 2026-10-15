# Plano de resposta a incidentes do zethic.net

> Controle 8 (monitoramento e resposta). Versão 1.1, 15/10/2026 (inclui o Calendly). Responsável: Jéssica Gessoli.
> Este arquivo fica no repositório e não é publicado no site.

## Como um incidente chega até você

- **Vigia do site** (`.github/workflows/vigia.yml`): roda todo dia às 8h17 e depois de cada envio ao `main`. Se falhar, o GitHub manda um e-mail de execução com falha.
- **Alertas de login** do GitHub e do Google: um acesso que você não reconhece.
- **Aviso de terceiros**: cliente, seguidor ou pesquisador de segurança (pelo e-mail do `security.txt`).

## Primeiros 15 minutos, em qualquer caso

1. **Não apague nada.** Tire prints do que está errado e anote o horário.
2. **Confirme por outro aparelho e outra rede**, no 4G, numa aba anônima. Descarte cache e problema local.
3. **Abra a execução do vigia** no GitHub (aba Actions → Vigia do site) e veja qual linha falhou.
4. Siga o cenário abaixo.

## Cenários

### 1. O vigia diz "está diferente do repositório"

O site publicado não bate com os arquivos do repositório.

1. Veja os últimos commits do `main`. Uma mudança legítima recente explica a diferença? Se sim, rode o vigia de novo em 10 minutos (aba Actions → Run workflow).
2. Se o commit não é seu nem de uma sessão que você autorizou: trate como **cenário 3** (conta do GitHub).
3. Se o repositório está certo e o site não: trate como **cenário 2** (domínio).

### 2. Domínio sequestrado ou DNS alterado

Sinais: zethic.net mostra outro site, o certificado HTTPS é estranho, ou o vigia não consegue conferir nada.

1. Entre no **registrador do domínio** e confira se os registros de DNS ainda apontam para o GitHub Pages.
2. Se não conseguir entrar ou os contatos do domínio mudaram: acione o **suporte do registrador** na hora e peça o bloqueio do domínio.
3. Troque a senha do registrador e da conta de e-mail de recuperação, e revise o segundo fator das duas.
4. Avise nos canais (LinkedIn, Instagram, WhatsApp Business) que o site está fora do ar e que ninguém deve informar dados ou pagar nada por ele.

### 3. Conta do GitHub invadida ou commit desconhecido

1. Troque a senha e confira o segundo fator do GitHub.
2. Em Settings → Sessions, encerre as sessões desconhecidas; em Settings → Applications, revogue apps e tokens que não reconhece.
3. Reverta o commit indevido com `git revert <commit>` e envie ao `main`. O histórico guarda a versão boa; nada precisa ser refeito do zero.
4. Rode o vigia de novo e confirme que tudo está ok.

### 4. Conta Google invadida

1. Troque a senha e faça a Verificação de segurança do Google.
2. Confira quem tem acesso ao Google Analytics (Administrador → Gerenciamento de acesso) e à página de agendamento do Google Agenda.
3. Se a agenda recebeu formulários com dados de pessoas (nome, WhatsApp), veja a seção de LGPD abaixo.
4. Se o login do Calendly é feito pela conta Google, siga também o item 6.

### 5. Site fora do ar sem sinal de invasão

1. Confira o status do GitHub em githubstatus.com.
2. Se for instabilidade do GitHub: avise nos canais e use `wa.me/5519981800221` direto enquanto isso.
3. Se o GitHub responder com erro 429 (limite de uso): avalie colocar uma CDN na frente do site.

### 6. Conta do Calendly invadida

O Calendly recebe a agenda de 30 minutos da página da fundadora (zethic.net/jessicagessoli).

1. Troque a senha do Calendly (ou da conta usada para entrar nele) e confira o segundo fator.
2. Em Integrações, confira as agendas e os aplicativos conectados e remova o que não reconhecer.
3. Confira o evento de 30 minutos: descrição, link da política de privacidade (https://zethic.net/privacidade) e perguntas do formulário. Um invasor pode trocar um link por um site falso.
4. O formulário recebe nome, e-mail e as respostas dos convidados (empresa, cargo, assunto): veja a seção de LGPD abaixo.

## LGPD

O site não guarda dados pessoais, mas as agendas (Google Agenda e Calendly) e o Google Analytics recebem dados de visitantes. Se houver acesso indevido a esses dados, avalie com o advogado a comunicação à ANPD e aos titulares. Pelo regulamento da ANPD (Resolução CD/ANPD nº 15/2024), o prazo é de 3 dias úteis a partir do conhecimento do incidente, quando ele puder causar risco ou dano relevante. Confirme com o advogado.

## Depois do incidente

- Registre o que aconteceu, a causa, o que foi feito e o que muda: data, horário, impacto e decisão.
- Revise este plano se algum passo não funcionou.
