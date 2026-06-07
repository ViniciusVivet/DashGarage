# Medidas DAX

Responsavel: Rafael

## Objetivo

Documentar as medidas que serao usadas em um dashboard comercial no Power BI.

## Medidas minimas

```DAX
Total Leads = COUNTROWS(leads)
```

```DAX
Total Vendas = COUNTROWS(vendas)
```

```DAX
Faturamento Total = SUM(vendas[valor_vendido])
```

```DAX
Ticket Medio = AVERAGE(vendas[valor_vendido])
```

```DAX
Margem Total = SUM(vendas[margem])
```

```DAX
Taxa de Conversao = DIVIDE([Total Vendas], [Total Leads], 0)
```

```DAX
Estoque Disponivel =
CALCULATE(
    COUNTROWS(veiculos),
    veiculos[status] = "disponivel"
)
```

## Medidas para pesquisar e melhorar

- Conversao por origem;
- Faturamento por vendedor;
- Margem media por vendedor;
- Veiculos parados ha mais de 30 dias;
- Propostas aceitas;
- Propostas recusadas;
- Leads sem contato recente.

## Padrao de documentacao

Para cada medida, explicar:

- o que ela calcula;
- para que o gerente usaria;
- qual tabela/campo ela depende.
