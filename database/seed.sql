insert into public.vendedores (nome, meta_mensal, percentual_comissao)
values
  ('Ana Souza', 120000, 1.5),
  ('Bruno Lima', 100000, 1.4),
  ('Carla Mendes', 90000, 1.3)
on conflict do nothing;

insert into public.veiculos (
  marca,
  modelo,
  ano,
  versao,
  tipo,
  valor_compra,
  valor_anunciado,
  status,
  data_entrada
)
values
  ('Toyota', 'Corolla', 2021, 'XEi 2.0', 'usado', 98000, 112900, 'disponivel', current_date - 42),
  ('Honda', 'HR-V', 2020, 'EXL', 'usado', 93000, 106900, 'disponivel', current_date - 67),
  ('Chevrolet', 'Onix', 2023, 'Premier', 'usado', 71000, 82900, 'reservado', current_date - 18)
on conflict do nothing;
