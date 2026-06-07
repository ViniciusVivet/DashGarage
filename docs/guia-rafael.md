# Guia de trabalho do Rafael

## Objetivo

Transformar o DashGarage em um case realista de CRM e inteligencia comercial para concessionarias.

O sistema ja tem a base tecnica: Supabase, login, tabelas, KPI inicial e deploy. O papel do Rafael e validar o processo de negocio, popular dados realistas e produzir analises que parecam trabalho de producao.

## Entregas esperadas

1. Mapa do processo comercial de uma concessionaria.
2. Validacao dos campos e status do CRM.
3. Base ficticia realista cadastrada no sistema.
4. Pelo menos 20 queries SQL respondendo perguntas de negocio.
5. Medidas DAX principais para Power BI.
6. Relatorio executivo com insights e recomendacoes.

## Ordem de execucao

### 1. Entender o processo real

Preencher `docs/levantamento-rafael.md`.

O foco nao e escrever bonito. O foco e responder como uma loja realmente trabalha:

- de onde vem o cliente;
- quem atende;
- como o vendedor registra interesse;
- quais etapas existem antes da venda;
- por que uma venda e perdida;
- quais indicadores o gerente olha todo dia.

### 2. Validar o CRM

Preencher `docs/feedback-rafael.md`.

Testar o sistema como se fosse vendedor ou gerente. Anotar:

- campo que falta;
- campo sobrando;
- status confuso;
- etapa que nao parece real;
- informacao importante para decisao comercial.

### 3. Criar massa de dados ficticia

Cadastrar dados realistas, nao dados aleatorios.

Quantidade minima:

- 5 vendedores;
- 50 leads;
- 20 veiculos;
- 20 propostas;
- 10 vendas;
- atividades de contato para alguns leads.

Exemplos de origem:

- WhatsApp;
- Instagram;
- OLX;
- Webmotors;
- indicacao;
- loja fisica;
- trafego pago.

Exemplos de status de lead:

- Novo lead;
- Em atendimento;
- Proposta enviada;
- Negociando;
- Venda fechada;
- Perdido.

Exemplos de motivos de perda:

- Preco acima do esperado;
- Cliente sem financiamento aprovado;
- Comprou em outra loja;
- Veiculo indisponivel;
- Nao respondeu contato;
- Entrada insuficiente.

### 4. Escrever queries SQL de negocio

Usar `database/queries-negocio-rafael.sql`.

Cada query deve responder uma pergunta real, por exemplo:

- Qual origem gera mais leads?
- Qual origem gera mais vendas?
- Qual vendedor vendeu mais?
- Qual vendedor tem maior ticket medio?
- Quais veiculos estao parados ha mais tempo?
- Qual margem media por tipo de veiculo?
- Quantas propostas viraram venda?
- Quais leads estao sem atividade recente?

Formato esperado:

```sql
-- Pergunta: qual origem trouxe mais leads?
-- Uso: ajuda o gerente a decidir onde investir captacao.
select
  origem,
  count(*) as total_leads
from public.leads
group by origem
order by total_leads desc;
```

### 5. Criar medidas para Power BI

Usar `docs/medidas-dax.md`.

Medidas minimas:

- Total Leads;
- Total Vendas;
- Faturamento Total;
- Ticket Medio;
- Margem Total;
- Taxa de Conversao;
- Estoque Disponivel;
- Propostas Enviadas;
- Propostas Aceitas;
- Leads Perdidos.

### 6. Escrever relatorio executivo

Usar `docs/relatorio-executivo-rafael.md`.

O relatorio deve responder:

- o que os dados mostram;
- qual problema comercial aparece;
- quais vendedores/origens/veiculos performam melhor;
- onde existe oportunidade de melhoria;
- quais limitacoes existem na base.

## Prompts para pesquisa

Use estes prompts para estudar antes de preencher:

```txt
Explique como funciona o funil comercial de uma concessionaria de carros usados, desde a entrada do lead ate a venda.
```

```txt
Quais indicadores comerciais um gerente de concessionaria acompanha semanalmente?
```

```txt
Quais sao motivos comuns para perda de venda em uma loja de carros?
```

```txt
Me de exemplos de perguntas de negocio que podem ser respondidas com SQL em um CRM de concessionaria.
```

```txt
Quais medidas DAX sao uteis para um dashboard comercial de vendas de veiculos?
```

## Criterio de qualidade

O trabalho esta bom quando outra pessoa consegue olhar o projeto e entender:

- qual problema de negocio ele resolve;
- como os dados foram modelados;
- quais indicadores importam;
- quais decisoes o gerente poderia tomar com o dashboard;
- o que ainda falta para virar um produto mais completo.
