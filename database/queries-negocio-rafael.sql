-- Arquivo reservado para Rafael.
-- Objetivo: criar pelo menos 20 queries SQL comentadas respondendo perguntas comerciais reais.

-- Padrao esperado:
-- 1. Escrever a pergunta de negocio.
-- 2. Explicar para que essa query serve.
-- 3. Escrever o SQL.

-- Exemplo 1
-- Pergunta: qual origem trouxe mais leads?
-- Uso: ajuda o gerente a entender quais canais geram mais oportunidades.
select
  origem,
  count(*) as total_leads
from public.leads
group by origem
order by total_leads desc;

-- Exemplo 2
-- Pergunta: quantos veiculos existem por status?
-- Uso: ajuda a separar estoque disponivel, reservado e vendido.
select
  status,
  count(*) as total_veiculos
from public.veiculos
group by status
order by total_veiculos desc;

-- Ideias de queries para completar:
-- 1. Origem com mais leads.
-- 2. Origem com mais vendas.
-- 3. Taxa de conversao por origem.
-- 4. Total vendido por vendedor.
-- 5. Ticket medio por vendedor.
-- 6. Margem total por vendedor.
-- 7. Veiculos disponiveis por marca.
-- 8. Veiculos parados ha mais de 30 dias.
-- 9. Propostas por status.
-- 10. Propostas aceitas por vendedor.
-- 11. Leads perdidos por motivo.
-- 12. Leads sem vendedor atribuido.
-- 13. Leads sem atividade recente.
-- 14. Tempo medio entre lead e venda.
-- 15. Valor medio anunciado por marca.
-- 16. Margem media por veiculo vendido.
-- 17. Vendas por forma de pagamento.
-- 18. Leads por temperatura.
-- 19. Vendas por mes.
-- 20. Ranking de vendedores contra meta mensal.
