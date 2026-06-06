create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  papel text not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists public.vendedores (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  ativo boolean not null default true,
  meta_mensal numeric(12, 2) not null default 0,
  percentual_comissao numeric(5, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  nome_cliente text not null,
  telefone text,
  origem text not null,
  modelo_interesse text,
  faixa_orcamento numeric(12, 2),
  forma_pagamento text,
  vendedor_id uuid references public.vendedores(id) on delete set null,
  status text not null default 'Novo lead',
  temperatura text,
  motivo_perda text,
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.veiculos (
  id uuid primary key default gen_random_uuid(),
  marca text not null,
  modelo text not null,
  ano integer,
  versao text,
  tipo text,
  valor_compra numeric(12, 2),
  valor_anunciado numeric(12, 2),
  status text not null default 'disponivel',
  data_entrada date,
  data_venda date,
  observacoes text,
  created_at timestamptz not null default now()
);

create table if not exists public.propostas (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  veiculo_id uuid references public.veiculos(id) on delete set null,
  vendedor_id uuid references public.vendedores(id) on delete set null,
  valor_proposto numeric(12, 2),
  forma_pagamento text,
  status text not null default 'enviada',
  data_proposta date not null default current_date,
  observacoes text,
  created_at timestamptz not null default now()
);

create table if not exists public.vendas (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  veiculo_id uuid references public.veiculos(id) on delete set null,
  vendedor_id uuid references public.vendedores(id) on delete set null,
  valor_vendido numeric(12, 2) not null,
  valor_compra numeric(12, 2) not null default 0,
  margem numeric(12, 2) generated always as (valor_vendido - valor_compra) stored,
  forma_pagamento text,
  comissao numeric(12, 2),
  data_venda date not null default current_date,
  observacoes text,
  created_at timestamptz not null default now()
);

create table if not exists public.atividades (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  tipo text not null,
  descricao text,
  data_atividade timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_leads_updated_at on public.leads;
create trigger set_leads_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.vendedores enable row level security;
alter table public.leads enable row level security;
alter table public.veiculos enable row level security;
alter table public.propostas enable row level security;
alter table public.vendas enable row level security;
alter table public.atividades enable row level security;

create policy "Usuarios autenticados leem profiles"
on public.profiles for select
to authenticated
using (true);

create policy "Usuarios autenticados gerenciam vendedores"
on public.vendedores for all
to authenticated
using (true)
with check (true);

create policy "Usuarios autenticados gerenciam leads"
on public.leads for all
to authenticated
using (true)
with check (true);

create policy "Usuarios autenticados gerenciam veiculos"
on public.veiculos for all
to authenticated
using (true)
with check (true);

create policy "Usuarios autenticados gerenciam propostas"
on public.propostas for all
to authenticated
using (true)
with check (true);

create policy "Usuarios autenticados gerenciam vendas"
on public.vendas for all
to authenticated
using (true)
with check (true);

create policy "Usuarios autenticados gerenciam atividades"
on public.atividades for all
to authenticated
using (true)
with check (true);
