# PROJECT_BRIEF.md — DashGarage

## 1. Visão geral do projeto

O projeto se chama **DashGarage**.

É um sistema realista de CRM + BI para concessionárias, criado para resolver um problema comercial concreto: registrar leads, acompanhar negociações, controlar veículos, medir vendas, calcular indicadores e transformar tudo em análise de dados.

O objetivo não é criar um projeto genérico de portfólio. O objetivo é simular o máximo possível uma experiência real de mercado para duas frentes:

1. **Portfólio de desenvolvimento/produto da Orbitamos/Vivet**
2. **Portfólio de análise de dados do Rafael**

O sistema precisa gerar dados úteis e analisáveis. O Rafael deve usar o sistema para cadastrar informações da rotina comercial, exportar dados, consultar no SQL, montar dashboards no Power BI, analisar com Python e produzir insights.

Este projeto deve parecer um case real de negócio, não um tutorial.

---

## 2. Contexto dos envolvidos

### Vivet / Orbitamos

Vivet será o responsável pela parte de produto, desenvolvimento e estrutura técnica.

Responsabilidades principais:

* idealizar o produto;
* levantar requisitos;
* criar a arquitetura;
* desenvolver o app web;
* configurar Supabase;
* criar as tabelas;
* criar autenticação;
* criar telas de cadastro, listagem e edição;
* criar deploy na Vercel;
* organizar GitHub;
* escrever documentação técnica;
* preparar o projeto para virar case da Orbitamos.

Vivet não deve fazer as tarefas analíticas que são responsabilidade do Rafael, exceto quando estiver orientando, revisando ou desbloqueando tecnicamente.

### Rafael

Rafael é o usuário de negócio e analista de dados em formação.

Ele trabalha em concessionária e quer entrar na área de análise de dados/BI. Já tem ou está desenvolvendo conhecimentos em:

* Excel avançado;
* SQL;
* Python;
* Power BI;
* programação pela Prepara Cursos;
* formação em ADS ou área próxima.

Responsabilidades principais:

* explicar o processo real de vendas de uma concessionária;
* definir quais campos fazem sentido no CRM;
* cadastrar dados no sistema;
* validar se o sistema representa bem a rotina comercial;
* exportar dados;
* limpar e organizar dados;
* criar consultas SQL;
* criar dashboards no Power BI;
* criar medidas DAX;
* usar Power Query;
* fazer análise exploratória em Python;
* escrever insights e recomendações de negócio;
* documentar o papel dele no projeto.

Rafael precisa colocar a mão na massa em todas as stacks importantes de análise de dados. O objetivo não é entregar tudo pronto para ele, e sim criar uma arena real para ele treinar.

---

## 3. Stack oficial do projeto

### Aplicação web

* Next.js
* TypeScript
* Tailwind CSS
* Supabase JS Client
* Vercel

### Banco de dados

* Supabase PostgreSQL

Motivo: PostgreSQL é forte para currículo, Supabase reduz a complexidade de backend, já fornece autenticação e permite que o projeto seja criado sem custo inicial.

### Autenticação

* Supabase Auth

Perfis desejados no futuro:

* admin/dev;
* vendedor;
* analista.

No MVP, pode começar com login simples por e-mail e senha.

### Análise de dados

* SQL no Supabase SQL Editor;
* Excel para planilhas e conferência;
* Power BI Desktop para dashboard;
* Power Query para tratamento;
* DAX para métricas;
* Python + Pandas + Jupyter Notebook para análise exploratória e previsão simples.

### Versionamento

* GitHub

### Deploy

* Vercel

### Repositório, deploy e banco

* Repositório GitHub: https://github.com/ViniciusVivet/DashGarage.git
* Deploy planejado: Vercel
* Banco e autenticação: Supabase/PostgreSQL com Supabase Auth
* Nome anterior do projeto: AutoCRM Analytics. Toda documentação e interface devem usar **DashGarage** daqui para frente.

---

## 4. Princípio central do projeto

O app web não é o fim do projeto.

O app existe para gerar dados e criar um fluxo real de análise.

Fluxo esperado:

1. Rafael cadastra leads, clientes, veículos, propostas e vendas no CRM.
2. Os dados ficam salvos no Supabase/PostgreSQL.
3. Rafael exporta dados ou acessa tabelas para análise.
4. Rafael usa SQL para responder perguntas comerciais.
5. Rafael usa Power BI para criar dashboards.
6. Rafael usa Power Query para tratar dados.
7. Rafael usa DAX para criar medidas.
8. Rafael usa Python/Pandas para análise exploratória e previsão simples.
9. Rafael escreve insights e recomendações.
10. Vivet organiza tudo como case técnico/produto da Orbitamos.

---

## 5. Regras importantes

### Dados reais

Não usar dados reais sensíveis no GitHub.

Nunca publicar:

* telefone real de cliente;
* CPF;
* placa de veículo real;
* endereço;
* nome completo de cliente real;
* dados financeiros sensíveis da loja;
* informações internas sem autorização.

Para o GitHub, usar dados fictícios ou anonimizados.

Se Rafael cadastrar dados reais no sistema privado, eles devem ficar apenas no banco privado e nunca ir para repositório público.

### Divisão de responsabilidade

Vivet cria a ferramenta.

Rafael usa a ferramenta, gera os dados, analisa e apresenta.

Se Vivet fizer SQL, Power BI, DAX, Python e insights no lugar do Rafael, o projeto perde valor para o currículo dele.

Vivet pode orientar com perguntas, revisar entregas e corrigir erros, mas a mão na massa analítica deve ser do Rafael.

---

## 6. Nome do produto

Nome principal:

**DashGarage**

Subtítulo:

**CRM e Inteligência Comercial para Concessionárias**

Descrição curta:

Sistema web para registro de leads, veículos, propostas e vendas em concessionárias, conectado a uma esteira de análise com SQL, Power BI, Excel e Python.

---

## 7. Objetivo de negócio

Concessionárias geralmente lidam com leads vindos de vários canais:

* loja física;
* Instagram;
* WhatsApp;
* OLX;
* Webmotors;
* indicação;
* marketplace;
* tráfego pago.

O problema é que muitas lojas perdem visão sobre:

* quais canais realmente vendem;
* quais vendedores convertem melhor;
* quais veículos ficam parados;
* qual é o ticket médio;
* qual é a margem por venda;
* quais motivos mais fazem perder venda;
* quanto tempo demora para um lead virar venda;
* quais modelos giram mais rápido;
* se a meta está sendo batida;
* onde estão os gargalos do funil.

O DashGarage resolve isso registrando o processo comercial e transformando os dados em indicadores.

---

## 8. KPIs que o projeto deve gerar

O projeto precisa gerar dados suficientes para calcular:

* total de leads;
* total de vendas;
* taxa de conversão;
* faturamento total;
* ticket médio;
* lucro/margem estimada;
* comissão total;
* vendas por vendedor;
* vendas por origem;
* conversão por origem;
* conversão por vendedor;
* veículos em estoque;
* veículos vendidos;
* dias em estoque;
* estoque parado acima de 30, 60 e 90 dias;
* propostas enviadas;
* taxa de propostas convertidas;
* motivos de perda;
* tempo médio entre lead e venda;
* meta mensal;
* percentual de meta batida.

---

## 9. Módulos do sistema web

### 9.1. Login

Tela de login com Supabase Auth.

Campos:

* e-mail;
* senha.

No MVP, pode ter apenas um usuário administrador.

### 9.2. Dashboard interno simples

Esta tela não precisa substituir o Power BI.

Ela deve mostrar apenas uma visão rápida dentro do app:

* total de leads;
* vendas do mês;
* taxa de conversão;
* veículos disponíveis;
* leads em negociação;
* propostas abertas.

O dashboard profissional será feito no Power BI pelo Rafael.

### 9.3. Leads

Tela para cadastrar lead.

Campos:

* nome do cliente;
* telefone;
* origem do lead;
* modelo de interesse;
* faixa de orçamento;
* forma de pagamento desejada;
* vendedor responsável;
* status do lead;
* temperatura do lead;
* observações;
* data de cadastro.

Origens possíveis:

* loja física;
* Instagram;
* WhatsApp;
* OLX;
* Webmotors;
* indicação;
* tráfego pago;
* outro.

Status possíveis:

* Novo lead;
* Em atendimento;
* Test drive;
* Proposta enviada;
* Negociação;
* Vendido;
* Perdido.

Temperatura:

* frio;
* morno;
* quente.

### 9.4. Clientes

No MVP, cliente pode ser parte do lead.

Em versão mais completa, criar tabela separada de clientes.

Campos:

* nome;
* telefone;
* cidade;
* observações;
* data de criação.

Não inserir CPF no MVP.

### 9.5. Vendedores

Tela simples de vendedores.

Campos:

* nome;
* status ativo/inativo;
* meta mensal;
* percentual de comissão;
* data de cadastro.

### 9.6. Veículos

Tela para cadastrar veículos em estoque.

Campos:

* marca;
* modelo;
* ano;
* versão;
* tipo: novo/usado;
* valor de compra;
* valor anunciado;
* status: disponível/reservado/vendido;
* data de entrada no estoque;
* data de venda;
* observações.

Não usar placa real no projeto público.

### 9.7. Propostas

Tela para registrar proposta comercial.

Campos:

* lead relacionado;
* veículo relacionado;
* vendedor;
* valor proposto;
* forma de pagamento;
* status da proposta;
* data da proposta;
* observações.

Status:

* enviada;
* aceita;
* recusada;
* expirada.

### 9.8. Vendas

Tela para registrar venda.

Campos:

* lead relacionado;
* cliente;
* veículo;
* vendedor;
* valor vendido;
* valor de compra do veículo;
* margem calculada;
* forma de pagamento;
* comissão calculada;
* data da venda;
* observações.

A margem pode ser calculada:

margem = valor_vendido - valor_compra

A comissão pode ser calculada com base no percentual do vendedor, mas também deve permitir ajuste manual no futuro.

### 9.9. Motivos de perda

Quando um lead for marcado como perdido, registrar motivo.

Motivos:

* preço alto;
* não aprovou financiamento;
* comprou em outra loja;
* desistiu;
* sem retorno;
* veículo indisponível;
* outro.

Esse campo é muito importante para análise de funil.

---

## 10. Modelagem inicial do banco

Tabelas mínimas:

* profiles;
* vendedores;
* leads;
* veiculos;
* propostas;
* vendas;
* atividades.

### 10.1. vendedores

Campos sugeridos:

* id uuid primary key;
* nome text not null;
* ativo boolean default true;
* meta_mensal numeric default 0;
* percentual_comissao numeric default 0;
* created_at timestamp.

### 10.2. leads

Campos sugeridos:

* id uuid primary key;
* nome_cliente text not null;
* telefone text;
* origem text not null;
* modelo_interesse text;
* faixa_orcamento numeric;
* forma_pagamento text;
* vendedor_id uuid references vendedores(id);
* status text not null;
* temperatura text;
* motivo_perda text;
* observacoes text;
* created_at timestamp;
* updated_at timestamp.

### 10.3. veiculos

Campos sugeridos:

* id uuid primary key;
* marca text not null;
* modelo text not null;
* ano integer;
* versao text;
* tipo text;
* valor_compra numeric;
* valor_anunciado numeric;
* status text;
* data_entrada date;
* data_venda date;
* observacoes text;
* created_at timestamp.

### 10.4. propostas

Campos sugeridos:

* id uuid primary key;
* lead_id uuid references leads(id);
* veiculo_id uuid references veiculos(id);
* vendedor_id uuid references vendedores(id);
* valor_proposto numeric;
* forma_pagamento text;
* status text;
* data_proposta date;
* observacoes text;
* created_at timestamp.

### 10.5. vendas

Campos sugeridos:

* id uuid primary key;
* lead_id uuid references leads(id);
* veiculo_id uuid references veiculos(id);
* vendedor_id uuid references vendedores(id);
* valor_vendido numeric;
* valor_compra numeric;
* margem numeric;
* forma_pagamento text;
* comissao numeric;
* data_venda date;
* observacoes text;
* created_at timestamp.

### 10.6. atividades

Campos sugeridos:

* id uuid primary key;
* lead_id uuid references leads(id);
* tipo text;
* descricao text;
* data_atividade timestamp;
* created_at timestamp.

Tipos de atividade:

* ligação;
* WhatsApp;
* visita;
* test drive;
* proposta;
* follow-up;
* observação.

---

## 11. Entregas do Vivet

### Fase 1 — Setup técnico

Vivet deve:

1. Criar repositório no GitHub.
2. Criar projeto Next.js com TypeScript.
3. Configurar Tailwind.
4. Criar projeto no Supabase.
5. Criar variáveis de ambiente.
6. Conectar Next.js ao Supabase.
7. Configurar deploy na Vercel.
8. Criar documentação inicial.

Arquivos esperados:

* README.md;
* PROJECT_BRIEF.md;
* .env.example;
* database/schema.sql;
* database/seed.sql.

### Fase 2 — Banco e autenticação

Vivet deve:

1. Criar tabelas no Supabase.
2. Criar políticas básicas de acesso.
3. Criar login.
4. Criar logout.
5. Proteger rotas internas.
6. Criar usuário inicial para teste.

### Fase 3 — CRUD principal

Vivet deve criar telas para:

* leads;
* vendedores;
* veículos;
* propostas;
* vendas.

Cada módulo precisa ter:

* listagem;
* cadastro;
* edição;
* exclusão ou arquivamento;
* filtros básicos.

### Fase 4 — Exportação

Vivet deve implementar pelo menos uma forma simples de exportar dados:

Opção inicial:

* botão “Exportar CSV” nas tabelas principais.

Tabelas exportáveis:

* leads;
* vendedores;
* veículos;
* propostas;
* vendas.

Isso é essencial para o Rafael usar Excel, Power BI e Python.

### Fase 5 — Documentação técnica

Vivet deve documentar:

* como rodar o projeto;
* como configurar Supabase;
* como criar tabelas;
* como exportar dados;
* como o Rafael deve usar o sistema;
* quais dados podem ou não ser publicados.

### Fase 6 — Case da Orbitamos

Vivet deve criar uma página ou seção de case com:

* problema;
* solução;
* stack;
* prints;
* arquitetura;
* resultados esperados;
* papel da Orbitamos;
* link do projeto;
* link do GitHub.

---

## 12. Entregas do Rafael

### Fase 1 — Levantamento de processo comercial

Rafael deve responder um documento com perguntas:

1. Como um cliente chega na concessionária?
2. Quais canais geram leads?
3. Quais etapas existem até a venda?
4. Quais status fazem sentido?
5. Quais dados um vendedor realmente registra?
6. Quais informações são importantes para o gerente?
7. Quais modelos/veículos costumam girar mais?
8. Quais motivos fazem perder venda?
9. Como comissão é calculada?
10. Quais metas existem no mês?

Entrega do Rafael:

* arquivo `docs/levantamento-rafael.md`.

### Fase 2 — Validação do CRM

Rafael deve testar o sistema criado por Vivet.

Ele deve cadastrar pelo menos:

* 5 vendedores fictícios;
* 50 leads fictícios;
* 20 veículos fictícios;
* 20 propostas;
* 10 vendas.

Depois deve responder:

1. O fluxo ficou parecido com uma concessionária real?
2. Que campo está faltando?
3. Que campo está sobrando?
4. Qual status não faz sentido?
5. O que melhoraria para o vendedor usar de verdade?

Entrega do Rafael:

* arquivo `docs/feedback-rafael.md`.

### Fase 3 — Base de dados

Rafael deve gerar ou cadastrar dados suficientes para análise.

Meta mínima:

* 200 leads;
* 50 veículos;
* 80 propostas;
* 40 vendas;
* pelo menos 6 meses de datas simuladas.

Ele pode fazer isso de duas formas:

1. cadastrar manualmente parte no sistema;
2. preencher planilha CSV modelo para importação ou seed.

Entrega do Rafael:

* `data/leads_exemplo.csv`;
* `data/veiculos_exemplo.csv`;
* `data/propostas_exemplo.csv`;
* `data/vendas_exemplo.csv`.

### Fase 4 — SQL

Rafael deve criar pelo menos 20 queries SQL.

As queries devem responder perguntas reais:

1. Quantos leads entraram por mês?
2. Quantas vendas foram fechadas por mês?
3. Qual é a taxa de conversão geral?
4. Qual origem tem maior conversão?
5. Qual origem gera mais leads?
6. Qual vendedor vende mais?
7. Qual vendedor converte melhor?
8. Qual é o ticket médio?
9. Qual é o faturamento total?
10. Qual é a margem total?
11. Quais veículos estão há mais de 60 dias no estoque?
12. Qual modelo tem maior giro?
13. Qual motivo de perda mais aparece?
14. Quantas propostas viram venda?
15. Qual forma de pagamento é mais usada?
16. Qual vendedor gera maior margem?
17. Qual mês teve melhor performance?
18. Qual canal tem pior conversão?
19. Quantos leads estão em negociação?
20. Qual percentual da meta foi batido?

Entrega do Rafael:

* `database/queries-negocio-rafael.sql`.

### Fase 5 — Excel

Rafael deve exportar CSVs e abrir no Excel.

Ele deve criar:

* tabela dinâmica de vendas por mês;
* tabela dinâmica de vendas por vendedor;
* gráfico de vendas por origem;
* relatório simples de comissão;
* conferência de valores totais.

Entrega do Rafael:

* `excel/relatorio-comercial-rafael.xlsx`;
* prints em `excel/prints/`.

### Fase 6 — Power BI

Rafael deve criar um dashboard no Power BI Desktop.

Páginas obrigatórias:

1. Visão Geral
2. Funil Comercial
3. Vendas
4. Vendedores
5. Estoque
6. Canais e Origens
7. Previsão ou Tendência

Medidas DAX obrigatórias:

* Total Leads;
* Total Vendas;
* Taxa Conversão;
* Faturamento Total;
* Ticket Médio;
* Margem Total;
* Margem %;
* Comissão Total;
* Leads em Aberto;
* Propostas Enviadas;
* Propostas Convertidas;
* Dias Médios em Estoque;
* Meta Batida %.

Entrega do Rafael:

* `dashboard/dashgarage.pbix`;
* `dashboard/prints/`;
* `docs/medidas-dax.md`.

### Fase 7 — Python

Rafael deve criar um notebook com Pandas.

O notebook precisa conter:

1. importação dos CSVs;
2. limpeza dos dados;
3. análise exploratória;
4. gráficos;
5. análise de vendas mensais;
6. análise de conversão por origem;
7. análise de estoque parado;
8. análise de vendedores;
9. previsão simples de vendas;
10. conclusões.

Entrega do Rafael:

* `notebooks/analise-comercial-rafael.ipynb`.

### Fase 8 — Storytelling com dados

Rafael deve escrever um relatório executivo.

O relatório deve ter:

* problema analisado;
* base usada;
* principais KPIs;
* 5 insights;
* 5 recomendações;
* limitações dos dados;
* próximos passos.

Entrega do Rafael:

* `docs/relatorio-executivo-rafael.md`.

Exemplo de insight esperado:

“Apesar do Instagram gerar o maior volume de leads, a taxa de conversão foi inferior à indicação. Isso sugere que a loja deve continuar usando Instagram para volume, mas criar uma campanha de indicação para aumentar fechamento.”

---

## 13. Como Vivet deve delegar para Rafael

Vivet não deve passar tarefas vagas como:

“faz aí o dashboard”.

Vivet deve passar tarefas com entrada, saída e prazo.

Modelo de delegação:

### Tarefa para Rafael

**Objetivo:** o que ele precisa resolver.
**Entrada:** quais arquivos/dados ele deve usar.
**Ferramenta:** Excel, SQL, Power BI, Python etc.
**Entrega:** qual arquivo ele deve devolver.
**Critério de pronto:** como saber se está correto.
**Dúvidas permitidas:** onde ele pode pedir ajuda.

Exemplo:

Tarefa: Criar consultas SQL de funil comercial.

Objetivo:
Descobrir onde os leads estão travando no processo de venda.

Entrada:
Tabelas `leads`, `propostas` e `vendas` no Supabase.

Ferramenta:
Supabase SQL Editor.

Entrega:
Arquivo `database/queries-funil-rafael.sql` com pelo menos 5 queries comentadas.

Critério de pronto:
Cada query deve ter comentário explicando qual pergunta de negócio responde.

---

## 14. Como Rafael deve enviar as entregas

Opções simples:

### Opção 1 — Google Drive

Rafael cria uma pasta:

`DashGarage - Entregas Rafael`

Dentro:

* SQL;
* Excel;
* Power BI;
* Python;
* Prints;
* Relatório.

Ele compartilha com Vivet.

### Opção 2 — GitHub via Vivet

Se Rafael ainda não souber GitHub:

1. Rafael envia os arquivos por Drive ou WhatsApp.
2. Vivet revisa.
3. Vivet sobe no GitHub em uma pasta com nome do Rafael.
4. O README deixa claro quais entregas foram feitas pelo Rafael.

### Opção 3 — GitHub direto

Se Rafael souber:

1. Rafael clona o repo.
2. Cria branch `rafael-analytics`.
3. Coloca arquivos nas pastas certas.
4. Faz commit.
5. Abre Pull Request.

Para início, usar Opção 1 ou 2. Não travar o projeto por GitHub.

---

## 15. Estrutura recomendada do repositório

DashGarage/
│
├── README.md
├── PROJECT_BRIEF.md
├── .env.example
│
├── app/
│   └── web/
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   ├── queries-negocio-rafael.sql
│   └── views.sql
│
├── data/
│   ├── leads_exemplo.csv
│   ├── vendedores_exemplo.csv
│   ├── veiculos_exemplo.csv
│   ├── propostas_exemplo.csv
│   └── vendas_exemplo.csv
│
├── docs/
│   ├── levantamento-rafael.md
│   ├── feedback-rafael.md
│   ├── dicionario-de-dados.md
│   ├── medidas-dax.md
│   ├── relatorio-executivo-rafael.md
│   └── case-orbitamos.md
│
├── dashboard/
│   ├── DashGarage.pbix
│   └── prints/
│
├── notebooks/
│   └── analise-comercial-rafael.ipynb
│
├── excel/
│   ├── relatorio-comercial-rafael.xlsx
│   └── prints/
│
└── pitch/
└── apresentacao-case.pdf

---

## 16. Critérios de sucesso

O projeto só será considerado forte se tiver:

* app online funcionando;
* Supabase/PostgreSQL configurado;
* CRUD de leads, veículos, vendedores, propostas e vendas;
* exportação CSV;
* base fictícia/anônima com volume suficiente;
* 20 queries SQL feitas pelo Rafael;
* dashboard Power BI feito pelo Rafael;
* medidas DAX documentadas;
* notebook Python feito pelo Rafael;
* relatório executivo com insights reais;
* README profissional;
* prints do sistema;
* prints do dashboard;
* explicação clara do papel de Vivet e Rafael.

---

## 17. O que NÃO fazer

Não criar apenas uma landing page.

Não criar apenas dashboard sem sistema.

Não criar dados aleatórios sem lógica comercial.

Não deixar Vivet fazer toda parte de dados.

Não publicar dados reais sensíveis.

Não usar stack paga no início.

Não depender de Power BI Pro para apresentar o projeto.

Não complicar com backend próprio se Supabase resolve o MVP.

Não transformar o projeto em “sistema gigante infinito”.

---

## 18. Ordem prática de execução

### Sprint 1 — Fundação

Responsável principal: Vivet

* criar repo;
* criar Next.js;
* criar Supabase;
* criar schema SQL;
* criar tela de login;
* criar layout base.

Delegar para Rafael:

* responder levantamento do processo comercial;
* listar campos essenciais;
* validar status e motivos de perda.

### Sprint 2 — CRM MVP

Responsável principal: Vivet

* CRUD de vendedores;
* CRUD de leads;
* CRUD de veículos;
* CRUD de propostas;
* CRUD de vendas;
* filtros básicos.

Delegar para Rafael:

* testar fluxo;
* cadastrar dados fictícios;
* apontar campos faltantes;
* validar se o sistema parece loja real.

### Sprint 3 — Exportação e dados

Responsável principal: Vivet

* exportar CSV;
* organizar dados;
* criar seeds fictícios.

Delegar para Rafael:

* gerar/cadastrar base com pelo menos 200 leads;
* exportar CSV;
* conferir no Excel.

### Sprint 4 — SQL

Responsável principal: Rafael

* criar 20 queries SQL;
* comentar cada query;
* explicar a pergunta de negócio respondida.

Vivet apenas revisa e orienta.

### Sprint 5 — Power BI

Responsável principal: Rafael

* conectar/importar CSVs;
* tratar no Power Query;
* criar modelo;
* criar medidas DAX;
* criar dashboard.

Vivet pode ajudar com layout e organização visual.

### Sprint 6 — Python

Responsável principal: Rafael

* abrir Jupyter;
* importar CSVs;
* limpar dados;
* gerar gráficos;
* fazer previsão simples;
* escrever conclusões.

Vivet pode ajudar com erros de ambiente e revisão.

### Sprint 7 — Case final

Responsabilidade compartilhada

Vivet:

* README;
* case Orbitamos;
* arquitetura;
* prints do app;
* deploy;
* vídeo ou página de apresentação.

Rafael:

* relatório executivo;
* prints do Power BI;
* explicação dos insights;
* currículo e LinkedIn.

---

## 19. Como o projeto entra no currículo

### Para Vivet / Orbitamos

Título:

**DashGarage — CRM e BI Comercial para Concessionárias**

Descrição:

Desenvolvi uma solução web para cadastro e análise de leads, veículos, propostas e vendas em concessionárias, integrando Next.js, TypeScript, Supabase/PostgreSQL, autenticação, CRUDs, exportação CSV e deploy na Vercel. O sistema foi usado como base para uma esteira analítica com SQL, Power BI, Excel e Python, gerando indicadores comerciais como taxa de conversão, faturamento, ticket médio, margem, comissão, performance de vendedores e estoque parado.

Stack:

Next.js, TypeScript, Supabase, PostgreSQL, Vercel, GitHub, Power BI, SQL.

### Para Rafael

Título:

**DashGarage — Análise de Dados para Concessionária**

Descrição:

Atuei na estruturação e análise de dados comerciais de uma concessionária fictícia/anonimizada, utilizando SQL, Excel, Power BI, Power Query, DAX e Python/Pandas. Desenvolvi consultas de negócio, dashboards de vendas, funil comercial, performance de vendedores, estoque parado, comissões e previsão simples de vendas, além de relatório executivo com insights e recomendações comerciais.

Stack:

SQL, Power BI, Excel, Power Query, DAX, Python, Pandas, KPIs, Storytelling com Dados.

---

## 20. Primeira missão do Codex

A primeira missão do Codex é criar a fundação técnica do projeto.

Criar um projeto Next.js com TypeScript e Tailwind, conectado ao Supabase, com estrutura preparada para um CRM de concessionária.

Entregas iniciais:

1. Setup do projeto.
2. Layout base.
3. Tela de login.
4. Rotas protegidas.
5. Página inicial do dashboard.
6. Estrutura de pastas.
7. Arquivo `.env.example`.
8. Documentação de setup.
9. SQL inicial para tabelas:

   * vendedores;
   * leads;
   * veiculos;
   * propostas;
   * vendas;
   * atividades.

O código deve ser simples, limpo e fácil de manter.

Evitar overengineering.

Priorizar MVP utilizável.

---

## 21. Prompt inicial sugerido para Codex

Você é o Codex atuando como desenvolvedor fullstack sênior neste repositório.

Leia o arquivo `PROJECT_BRIEF.md` inteiro antes de codar.

Crie a fundação do projeto **DashGarage**, um CRM + BI para concessionárias.

Stack obrigatória:

* Next.js
* TypeScript
* Tailwind CSS
* Supabase/PostgreSQL
* Supabase Auth
* Vercel-ready

Objetivo da primeira entrega:

* criar app funcional;
* configurar conexão com Supabase;
* criar tela de login;
* criar layout interno;
* criar rota protegida `/dashboard`;
* criar páginas placeholder para:

  * leads;
  * vendedores;
  * veículos;
  * propostas;
  * vendas;
  * exportações;
* criar componentes base de navegação;
* criar `.env.example`;
* criar SQL inicial em `database/schema.sql`;
* criar documentação no README.

Não implemente funcionalidades avançadas ainda.

Não invente escopo fora do brief.

Priorize código simples, legível, tipado e fácil de continuar.

Ao final, explique:

1. quais arquivos foram criados;
2. como rodar localmente;
3. quais variáveis de ambiente configurar;
4. quais tabelas criar no Supabase;
5. próximo passo recomendado.

