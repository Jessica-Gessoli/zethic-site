# Zethic — site institucional

Domínio canônico: https://zethic.net/

## Revisão de conteúdo — 21/09/2026

Proposta de apresentação das sete frentes da empresa: posicionamento e presença digital; projetos digitais; fotografia; audiovisual; eventos; governança/cibersegurança; instalação e configuração de câmeras. Mantém condições de contratação, testes e limites de escopo. Catálogo não equivale a homologação técnica ou caso executado.

Esta revisão é candidata a publicação. A branch e a PR não confirmam aprovação, merge, deploy, indexação ou alteração do Google/LinkedIn. Contatos corporativos e dados empresariais já existentes foram preservados; a situação cadastral atual precisa ser reconciliada antes da publicação. Não adicionar endereço residencial ou dados privados de clientes.

## Verificação local

Na raiz do repositório, com Python 3:

```bash
python3 scripts/check_site.py
```

O teste verifica a estrutura básica, sete frentes, âncoras, identidade canônica, JSON-LD, contatos e ausência de campos de localização residencial. Não é auditoria completa de segurança, acessibilidade, desempenho ou SEO e não consulta serviços externos.

## Publicação e rollback

Revisar o diff e a página em navegador desktop/mobile antes de decidir o merge. Não alterar CNAME, DNS, campanhas ou credenciais nesta entrega. O conteúdo só passa a valer em produção após o processo de publicação aplicável e conferência do endereço público. Para cancelar a proposta, fechar a PR sem merge. Histórico permanece no Git.

Veja `docs/CHANGELOG_2026-09-21.md`. A revisão complementa a análise documental da PR #2, sem substituí-la ou concluir suas pendências automaticamente.
