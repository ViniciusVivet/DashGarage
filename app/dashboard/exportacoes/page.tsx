"use client";

import { useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const exports = [
  {
    table: "leads",
    label: "Leads",
    description: "Clientes interessados, origem, status, vendedor e motivo de perda.",
  },
  {
    table: "vendedores",
    label: "Vendedores",
    description: "Equipe comercial, metas mensais e percentual de comissao.",
  },
  {
    table: "veiculos",
    label: "Veiculos",
    description: "Estoque, valores, status e datas de entrada ou venda.",
  },
  {
    table: "propostas",
    label: "Propostas",
    description: "Ofertas enviadas, aceitas, recusadas ou expiradas.",
  },
  {
    table: "vendas",
    label: "Vendas",
    description: "Faturamento, margem, comissao e forma de pagamento.",
  },
];

type ExportRow = Record<string, string | number | boolean | null>;

function toCsv(rows: ExportRow[]) {
  if (rows.length === 0) return "";

  const columns = Object.keys(rows[0]);
  const escapeCell = (value: unknown) => {
    const text = String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  };

  const header = columns.map(escapeCell).join(",");
  const body = rows
    .map((row) => columns.map((column) => escapeCell(row[column])).join(","))
    .join("\n");

  return `${header}\n${body}`;
}

function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function ExportacoesPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [loadingTable, setLoadingTable] = useState<string | null>(null);

  async function handleExport(table: string) {
    if (!isSupabaseConfigured || !supabase) {
      setMessage("Supabase ainda nao configurado.");
      return;
    }

    setLoadingTable(table);
    setMessage(null);

    const { data, error } = await supabase.from(table).select("*");

    if (error) {
      setMessage(error.message);
      setLoadingTable(null);
      return;
    }

    const rows = (data ?? []) as ExportRow[];
    if (rows.length === 0) {
      setMessage(`A tabela ${table} ainda nao tem registros para exportar.`);
      setLoadingTable(null);
      return;
    }

    downloadCsv(`${table}.csv`, toCsv(rows));
    setMessage(`${rows.length} registros exportados de ${table}.`);
    setLoadingTable(null);
  }

  return (
    <section className="space-y-6">
      <div className="border-b border-line pb-6">
        <p className="text-sm font-semibold uppercase tracking-normal text-brand">
          Analise
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink md:text-4xl">
          Exportacoes
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-graphite/75">
          Baixe os CSVs usados pelo Rafael no Excel, Power BI, SQL e Python.
        </p>
      </div>

      {message ? (
        <p className="rounded-md border border-line bg-white px-4 py-3 text-sm text-graphite shadow-soft">
          {message}
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {exports.map((item) => (
          <article
            className="rounded-lg border border-line bg-white p-5 shadow-soft"
            key={item.table}
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h2 className="text-lg font-semibold text-ink">{item.label}</h2>
                <p className="mt-2 text-sm leading-6 text-graphite/70">
                  {item.description}
                </p>
              </div>
              <button
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-graphite disabled:opacity-60"
                disabled={loadingTable === item.table}
                onClick={() => handleExport(item.table)}
                type="button"
              >
                {loadingTable === item.table ? "Exportando..." : "Baixar CSV"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
