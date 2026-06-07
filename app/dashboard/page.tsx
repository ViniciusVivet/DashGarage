"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { appModules } from "@/lib/modules";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type CommercialKpis = {
  total_leads: number;
  total_vendas: number;
  faturamento_total: number;
  ticket_medio: number;
  margem_total: number;
  veiculos_disponiveis: number;
};

const emptyKpis: CommercialKpis = {
  total_leads: 0,
  total_vendas: 0,
  faturamento_total: 0,
  ticket_medio: 0,
  margem_total: 0,
  veiculos_disponiveis: 0,
};

const numberFormatter = new Intl.NumberFormat("pt-BR");
const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const percentFormatter = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  maximumFractionDigits: 1,
});

export default function DashboardPage() {
  const [kpis, setKpis] = useState<CommercialKpis>(emptyKpis);
  const [loadingKpis, setLoadingKpis] = useState(true);
  const [kpiError, setKpiError] = useState<string | null>(null);

  useEffect(() => {
    async function loadKpis() {
      if (!isSupabaseConfigured || !supabase) {
        setKpiError("Supabase ainda nao configurado.");
        setLoadingKpis(false);
        return;
      }

      const { data, error } = await supabase
        .from("vw_kpis_comerciais")
        .select("*")
        .single();

      if (error) {
        setKpiError("Nao foi possivel carregar os KPIs do Supabase.");
        setLoadingKpis(false);
        return;
      }

      setKpis({
        total_leads: Number(data?.total_leads ?? 0),
        total_vendas: Number(data?.total_vendas ?? 0),
        faturamento_total: Number(data?.faturamento_total ?? 0),
        ticket_medio: Number(data?.ticket_medio ?? 0),
        margem_total: Number(data?.margem_total ?? 0),
        veiculos_disponiveis: Number(data?.veiculos_disponiveis ?? 0),
      });
      setKpiError(null);
      setLoadingKpis(false);
    }

    loadKpis();
  }, []);

  const metrics = useMemo(() => {
    const conversionRate =
      kpis.total_leads > 0 ? kpis.total_vendas / kpis.total_leads : 0;

    return [
      {
        label: "Total de leads",
        value: loadingKpis ? "..." : numberFormatter.format(kpis.total_leads),
        helper: "Leads cadastrados no Supabase.",
      },
      {
        label: "Vendas fechadas",
        value: loadingKpis ? "..." : numberFormatter.format(kpis.total_vendas),
        helper: `Faturamento total: ${currencyFormatter.format(
          kpis.faturamento_total,
        )}.`,
      },
      {
        label: "Taxa de conversao",
        value: loadingKpis ? "..." : percentFormatter.format(conversionRate),
        helper: `Ticket medio: ${currencyFormatter.format(kpis.ticket_medio)}.`,
      },
      {
        label: "Veiculos disponiveis",
        value: loadingKpis
          ? "..."
          : numberFormatter.format(kpis.veiculos_disponiveis),
        helper: `Margem total: ${currencyFormatter.format(kpis.margem_total)}.`,
      },
    ];
  }, [kpis, loadingKpis]);

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

      {kpiError ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {kpiError}
        </p>
      ) : null}

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
