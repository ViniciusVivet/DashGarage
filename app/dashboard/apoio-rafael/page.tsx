"use client";

import { useState } from "react";

const tabs = [
  { id: "orientacao", label: "Orientacao" },
  { id: "projeto", label: "Como funciona" },
  { id: "arquivos", label: "Mapa de arquivos" },
  { id: "fluxo", label: "Fluxo dos dados" },
  { id: "estudo", label: "Roteiro de estudo" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const phases = [
  {
    title: "1. Entender o processo",
    items: [
      "Mapear como o cliente chega na concessionaria.",
      "Listar canais: WhatsApp, Instagram, OLX, Webmotors, indicacao e loja fisica.",
      "Descrever etapas do funil: novo lead, atendimento, proposta, negociacao, venda ou perda.",
      "Definir quais dados o vendedor precisa registrar no dia a dia.",
    ],
  },
  {
    title: "2. Validar o CRM",
    items: [
      "Testar se os campos fazem sentido para vendedor e gerente.",
      "Anotar campo faltando, campo sobrando e status confuso.",
      "Sugerir melhoria explicando impacto comercial.",
      "Separar sugestoes por prioridade: alta, media ou baixa.",
    ],
  },
  {
    title: "3. Popular dados realistas",
    items: [
      "Cadastrar pelo menos 5 vendedores, 50 leads, 20 veiculos, 20 propostas e 10 vendas.",
      "Evitar nomes genericos como Cliente 1 ou Carro 1.",
      "Variar origens, status, formas de pagamento e motivos de perda.",
      "Criar dados que contem uma historia comercial plausivel.",
    ],
  },
  {
    title: "4. Analisar e apresentar",
    items: [
      "Exportar CSVs para Excel ou Power BI.",
      "Criar queries SQL respondendo perguntas de negocio.",
      "Montar medidas DAX principais.",
      "Escrever relatorio executivo com insights, recomendacoes e limitacoes.",
    ],
  },
];

const examples = [
  {
    label: "Lead realista",
    value:
      "Marcos Oliveira | Webmotors | Honda HR-V | R$ 105.000 | Financiamento | Proposta enviada | Cliente quer entrada de R$ 30 mil.",
  },
  {
    label: "Motivo de perda",
    value:
      "Cliente sem financiamento aprovado. Retomar contato em 30 dias se conseguir nova entrada.",
  },
  {
    label: "Insight esperado",
    value:
      "Webmotors gerou menos leads que Instagram, mas converteu melhor. Recomendacao: manter Instagram para volume e priorizar Webmotors para leads quentes.",
  },
];

const projectStack = [
  {
    title: "Next.js",
    text: "Framework que organiza as paginas do sistema. Tudo dentro de `app/` vira rota do site.",
  },
  {
    title: "TypeScript",
    text: "JavaScript com tipos. Ajuda a evitar erro de campo errado, funcao errada ou dado no formato errado.",
  },
  {
    title: "Tailwind CSS",
    text: "Camada visual. As classes como `rounded-md`, `border` e `text-sm` definem layout e estilo.",
  },
  {
    title: "Supabase",
    text: "Backend pronto com PostgreSQL, autenticacao e API. Evita criar servidor, login e conexao com banco do zero.",
  },
  {
    title: "Vercel",
    text: "Plataforma que publica o site. Cada push no GitHub gera um novo deploy.",
  },
];

const fileMap = [
  {
    file: "app/dashboard/page.tsx",
    role: "Dashboard inicial. Busca a view `vw_kpis_comerciais` no Supabase e mostra os KPIs.",
  },
  {
    file: "components/SupabaseCrudPage.tsx",
    role: "Componente reutilizavel dos cadastros. Ele lista, cadastra, edita, remove e exporta CSV.",
  },
  {
    file: "app/dashboard/leads/page.tsx",
    role: "Configura a tela de leads: campos, colunas, origem, status, vendedor e motivo de perda.",
  },
  {
    file: "app/dashboard/veiculos/page.tsx",
    role: "Configura a tela de veiculos: estoque, valores, status e datas.",
  },
  {
    file: "app/dashboard/propostas/page.tsx",
    role: "Liga lead, veiculo e vendedor para registrar propostas comerciais.",
  },
  {
    file: "app/dashboard/vendas/page.tsx",
    role: "Registra venda fechada. O banco calcula margem com valor vendido menos valor de compra.",
  },
  {
    file: "lib/supabase.ts",
    role: "Cria o cliente Supabase usando `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.",
  },
  {
    file: "database/schema.sql",
    role: "Define as tabelas, relacoes, seguranca e trigger de atualizacao.",
  },
  {
    file: "database/views.sql",
    role: "Cria a view de KPIs comerciais usada pelo dashboard.",
  },
];

const dataFlow = [
  {
    title: "1. Usuario faz login",
    text: "`app/login/page.tsx` chama `supabase.auth.signInWithPassword`. Se der certo, manda para `/dashboard`.",
  },
  {
    title: "2. Layout protege o dashboard",
    text: "`components/AppShell.tsx` verifica a sessao. Sem login, redireciona para `/login`.",
  },
  {
    title: "3. Usuario cadastra dados",
    text: "As paginas de leads, veiculos, vendedores, propostas e vendas usam `SupabaseCrudPage`.",
  },
  {
    title: "4. Componente conversa com Supabase",
    text: "`SupabaseCrudPage` usa `.from(tabela).select`, `.insert`, `.update` e `.delete`.",
  },
  {
    title: "5. Banco guarda e relaciona",
    text: "O Supabase salva em PostgreSQL. Propostas e vendas podem apontar para lead, vendedor e veiculo.",
  },
  {
    title: "6. Dashboard calcula indicador",
    text: "A view `vw_kpis_comerciais` resume leads, vendas, faturamento, ticket medio, margem e estoque.",
  },
];

const codeHighlights = [
  {
    label: "Conexao com Supabase",
    code: "createClient(supabaseUrl, supabaseAnonKey)",
    meaning:
      "Essa linha cria a ponte entre o frontend e o Supabase. Sem ela, o app nao consegue autenticar nem buscar dados.",
  },
  {
    label: "Buscar dados",
    code: 'supabase.from(table).select("*")',
    meaning:
      "Busca todos os registros de uma tabela. E o equivalente pratico a consultar uma tabela do banco.",
  },
  {
    label: "Cadastrar dados",
    code: "supabase.from(table).insert(payload)",
    meaning:
      "Envia os dados do formulario para o Supabase salvar na tabela correta.",
  },
  {
    label: "Atualizar dados",
    code: 'supabase.from(table).update(payload).eq("id", editingId)',
    meaning:
      "Atualiza um registro especifico usando o `id`. O `id` e a chave primaria da linha.",
  },
  {
    label: "KPIs",
    code: 'supabase.from("vw_kpis_comerciais").select("*").single()',
    meaning:
      "Busca uma linha resumida com os indicadores comerciais que aparecem no dashboard.",
  },
];

const studySteps = [
  {
    title: "Dia 1: usar o sistema",
    tasks: [
      "Entrar no dashboard.",
      "Cadastrar vendedores, veiculos e leads.",
      "Entender quais campos aparecem em cada modulo.",
      "Anotar duvidas de negocio, nao de codigo.",
    ],
  },
  {
    title: "Dia 2: entender dados",
    tasks: [
      "Abrir Exportacoes e baixar CSVs.",
      "Ver quais colunas existem em cada tabela.",
      "Relacionar lead, vendedor, veiculo, proposta e venda.",
      "Pensar quais perguntas um gerente faria.",
    ],
  },
  {
    title: "Dia 3: estudar SQL",
    tasks: [
      "Abrir `database/queries-negocio-rafael.sql`.",
      "Criar queries de origem, vendedor, status, margem e estoque.",
      "Comentar cada query com a pergunta de negocio respondida.",
      "Evitar query sem utilidade pratica.",
    ],
  },
  {
    title: "Dia 4: transformar em decisao",
    tasks: [
      "Criar medidas no Power BI ou documentar DAX.",
      "Escrever insights no relatorio executivo.",
      "Separar recomendacoes por impacto comercial.",
      "Explicar limitacoes dos dados ficticios.",
    ],
  },
];

const prompts = [
  "Explique como funciona o funil comercial de uma concessionaria de carros usados, desde a entrada do lead ate a venda.",
  "Quais indicadores comerciais um gerente de concessionaria acompanha semanalmente?",
  "Quais sao motivos comuns para perda de venda em uma loja de carros?",
  "Me de 20 perguntas de negocio que podem ser respondidas com SQL em um CRM de concessionaria.",
  "Quais medidas DAX sao uteis para um dashboard comercial de vendas de veiculos?",
];

const qualityChecks = [
  "Os dados parecem de uma concessionaria real.",
  "Cada campo importante tem motivo para existir.",
  "As queries respondem perguntas comerciais, nao so contagens soltas.",
  "O relatorio recomenda decisoes praticas para o gerente.",
  "As limitacoes da base estao claras.",
];

function CardList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3 text-sm leading-6 text-graphite/75">
      {items.map((item) => (
        <li className="border-l-2 border-brand/40 pl-3" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ApoioRafaelPage() {
  const [activeTab, setActiveTab] = useState<TabId>("orientacao");

  return (
    <section className="space-y-8">
      <div className="border-b border-line pb-6">
        <p className="text-sm font-semibold uppercase tracking-normal text-brand">
          Orientacao
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink md:text-4xl">
          Apoio Rafael
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-graphite/75">
          Roteiro operacional e tecnico para estudar o projeto, entender os
          dados e transformar o CRM em um case de analise comercial.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-line pb-3">
        {tabs.map((tab) => (
          <button
            className={`h-10 shrink-0 rounded-md px-4 text-sm font-semibold transition ${
              activeTab === tab.id
                ? "bg-ink text-white"
                : "border border-line bg-white text-graphite hover:border-brand hover:text-brand"
            }`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "orientacao" ? (
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            {phases.map((phase) => (
              <article
                className="rounded-lg border border-line bg-white p-5 shadow-soft"
                key={phase.title}
              >
                <h2 className="text-lg font-semibold text-ink">
                  {phase.title}
                </h2>
                <CardList items={phase.items} />
              </article>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {examples.map((example) => (
              <article
                className="rounded-lg border border-line bg-white p-5 shadow-soft"
                key={example.label}
              >
                <h2 className="text-base font-semibold text-ink">
                  {example.label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-graphite/75">
                  {example.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {activeTab === "projeto" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-white p-5 shadow-soft lg:col-span-2">
            <h2 className="text-lg font-semibold text-ink">
              O que foi construido
            </h2>
            <p className="mt-3 text-sm leading-6 text-graphite/75">
              O DashGarage e um CRM comercial para concessionaria. Ele permite
              registrar leads, vendedores, veiculos, propostas e vendas. Esses
              dados alimentam KPIs no dashboard e podem ser exportados para
              Excel, Power BI, SQL e Python.
            </p>
          </article>

          {projectStack.map((item) => (
            <article
              className="rounded-lg border border-line bg-white p-5 shadow-soft"
              key={item.title}
            >
              <h2 className="text-lg font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-graphite/75">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      ) : null}

      {activeTab === "arquivos" ? (
        <div className="grid gap-4">
          {fileMap.map((item) => (
            <article
              className="rounded-lg border border-line bg-white p-5 shadow-soft"
              key={item.file}
            >
              <h2 className="font-mono text-sm font-semibold text-ink">
                {item.file}
              </h2>
              <p className="mt-2 text-sm leading-6 text-graphite/75">
                {item.role}
              </p>
            </article>
          ))}
        </div>
      ) : null}

      {activeTab === "fluxo" ? (
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            {dataFlow.map((item) => (
              <article
                className="rounded-lg border border-line bg-white p-5 shadow-soft"
                key={item.title}
              >
                <h2 className="text-lg font-semibold text-ink">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-graphite/75">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold text-ink">
              Linhas de codigo para entender
            </h2>
            <div className="mt-4 grid gap-3">
              {codeHighlights.map((item) => (
                <div
                  className="rounded-md border border-line bg-panel p-4"
                  key={item.label}
                >
                  <p className="text-sm font-semibold text-ink">{item.label}</p>
                  <code className="mt-2 block overflow-x-auto rounded bg-white px-3 py-2 text-xs text-graphite">
                    {item.code}
                  </code>
                  <p className="mt-2 text-sm leading-6 text-graphite/75">
                    {item.meaning}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      ) : null}

      {activeTab === "estudo" ? (
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            {studySteps.map((step) => (
              <article
                className="rounded-lg border border-line bg-white p-5 shadow-soft"
                key={step.title}
              >
                <h2 className="text-lg font-semibold text-ink">{step.title}</h2>
                <CardList items={step.tasks} />
              </article>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
              <h2 className="text-lg font-semibold text-ink">
                Prompts de pesquisa
              </h2>
              <div className="mt-4 grid gap-3">
                {prompts.map((prompt) => (
                  <p
                    className="rounded-md border border-line bg-panel px-4 py-3 text-sm leading-6 text-graphite"
                    key={prompt}
                  >
                    {prompt}
                  </p>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
              <h2 className="text-lg font-semibold text-ink">
                Criterio de qualidade
              </h2>
              <CardList items={qualityChecks} />
            </article>
          </div>
        </div>
      ) : null}
    </section>
  );
}
