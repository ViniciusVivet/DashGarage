create or replace view public.vw_kpis_comerciais as
select
  (select count(*) from public.leads) as total_leads,
  (select count(*) from public.vendas) as total_vendas,
  (select coalesce(sum(valor_vendido), 0) from public.vendas) as faturamento_total,
  (select coalesce(avg(valor_vendido), 0) from public.vendas) as ticket_medio,
  (select coalesce(sum(margem), 0) from public.vendas) as margem_total,
  (select count(*) from public.veiculos where status = 'disponivel') as veiculos_disponiveis;
