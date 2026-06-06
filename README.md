# DashGarage

CRM e inteligencia comercial para concessionarias, criado para registrar leads,
vendedores, veiculos, propostas e vendas em um fluxo conectado ao Supabase e
preparado para analise com SQL, Excel, Power BI e Python.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL
- Vercel

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Variaveis de ambiente

Crie `.env.local` com base em `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

Use apenas a anon key publica do Supabase. Nao commitar `.env`, service role key
ou qualquer dado sensivel.

## Supabase

1. Crie um projeto no Supabase.
2. Abra o SQL Editor.
3. Rode `database/schema.sql`.
4. Opcionalmente rode `database/seed.sql` para dados ficticios iniciais.
5. Crie um usuario em Authentication para acessar o app.

## Deploy na Vercel

O repositorio oficial e:

`https://github.com/ViniciusVivet/DashGarage.git`

Na Vercel, importe o repositorio, configure as variaveis de ambiente do Supabase
e publique usando o preset padrao de Next.js.

## Primeira entrega

- Tela de login com Supabase Auth.
- Rota protegida `/dashboard`.
- Layout interno com navegacao.
- Pagina inicial de KPIs.
- Paginas base para leads, vendedores, veiculos, propostas, vendas e exportacoes.
- Schema SQL inicial com RLS para usuarios autenticados.

## Proximas tarefas para Rafael

1. Preencher `docs/levantamento-rafael.md` com o processo real de vendas.
2. Validar campos, status e motivos de perda do CRM.
3. Cadastrar dados ficticios quando os CRUDs estiverem prontos.
4. Produzir SQL, Excel, Power BI e Python nas pastas indicadas no briefing.
