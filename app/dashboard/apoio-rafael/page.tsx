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

export default function ApoioRafaelPage() {
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
          Roteiro operacional para transformar o CRM em um case de analise
          comercial com dados, SQL, Power BI e relatorio executivo.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {phases.map((phase) => (
          <article
            className="rounded-lg border border-line bg-white p-5 shadow-soft"
            key={phase.title}
          >
            <h2 className="text-lg font-semibold text-ink">{phase.title}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-graphite/75">
              {phase.items.map((item) => (
                <li className="border-l-2 border-brand/40 pl-3" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {examples.map((example) => (
          <article
            className="rounded-lg border border-line bg-white p-5 shadow-soft"
            key={example.label}
          >
            <h2 className="text-base font-semibold text-ink">{example.label}</h2>
            <p className="mt-3 text-sm leading-6 text-graphite/75">
              {example.value}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-ink">Prompts de pesquisa</h2>
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
          <ul className="mt-4 space-y-3 text-sm leading-6 text-graphite/75">
            {qualityChecks.map((check) => (
              <li className="border-l-2 border-ink/20 pl-3" key={check}>
                {check}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
