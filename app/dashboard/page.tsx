import Link from "next/link";
import { MetricCard } from "@/components/MetricCard";
import { appModules } from "@/lib/modules";

const metrics = [
  {
    label: "Total de leads",
    value: "0",
    helper: "Sera alimentado pela tabela leads no Supabase.",
  },
  {
    label: "Vendas do mes",
    value: "0",
    helper: "Base para faturamento, margem e comissao.",
  },
  {
    label: "Taxa de conversao",
    value: "0%",
    helper: "Vendas fechadas sobre leads cadastrados.",
  },
  {
    label: "Veiculos disponiveis",
    value: "0",
    helper: "Estoque atual para negociacao comercial.",
  },
];

export default function DashboardPage() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-brand">
            Visao interna
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink md:text-4xl">
            Dashboard comercial
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-graphite/75">
            Fundacao do CRM pronta para conectar os dados operacionais ao
            Supabase e gerar a base analitica do Rafael.
          </p>
        </div>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-graphite"
          href="/dashboard/leads"
        >
          Comecar por leads
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {appModules.map((module) => (
          <Link
            className="rounded-lg border border-line bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand"
            href={module.href}
            key={module.href}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold text-ink">{module.label}</h2>
              <span className="rounded-full bg-panel px-3 py-1 text-xs font-semibold uppercase tracking-normal text-graphite/70">
                {module.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-graphite/75">
              {module.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
