"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type FieldType = "text" | "number" | "date" | "select" | "textarea" | "boolean";

type SelectOption = {
  label: string;
  value: string;
};

type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: SelectOption[];
  reference?: {
    table: string;
    valueKey: string;
    labelKey: string;
    labelFallbackKey?: string;
  };
};

type ColumnConfig = {
  key: string;
  label: string;
  type?: "currency" | "date" | "boolean" | "reference";
};

type RowData = Record<string, string | number | boolean | null | undefined>;
type ReferenceMap = Record<string, SelectOption[]>;
type ToastKind = "success" | "error" | "warning" | "info";

type Toast = {
  kind: ToastKind;
  text: string;
};

type SupabaseCrudPageProps = {
  title: string;
  description: string;
  table: string;
  fields: FieldConfig[];
  columns: ColumnConfig[];
  orderBy?: string;
  urlFilters?: UrlFilterConfig[];
};

type UrlFilterConfig = {
  param: string;
  column: string;
  label: string;
  allowedValues: string[];
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function emptyForm(fields: FieldConfig[]) {
  return fields.reduce<Record<string, string | boolean>>((acc, field) => {
    acc[field.name] = field.type === "boolean" ? true : "";
    return acc;
  }, {});
}

function buildPayload(fields: FieldConfig[], form: Record<string, string | boolean>) {
  return fields.reduce<RowData>((acc, field) => {
    const value = form[field.name];

    if (field.type === "boolean") {
      acc[field.name] = Boolean(value);
      return acc;
    }

    if (typeof value !== "string" || value.trim() === "") {
      return acc;
    }

    if (field.type === "number") {
      acc[field.name] = Number(value);
      return acc;
    }

    acc[field.name] = value.trim();
    return acc;
  }, {});
}

function toCsv(rows: RowData[], columns: ColumnConfig[]) {
  const escapeCell = (value: unknown) => {
    const text = String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  };

  const header = columns.map((column) => escapeCell(column.label)).join(",");
  const body = rows
    .map((row) => columns.map((column) => escapeCell(row[column.key])).join(","))
    .join("\n");

  return [header, body].filter(Boolean).join("\n");
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

function humanizeError(error: string) {
  if (error.includes("violates foreign key constraint")) {
    return "Este registro esta ligado a outro cadastro. Em vez de remover, altere o status ou remova primeiro os registros relacionados.";
  }

  if (error.includes("violates row-level security")) {
    return "Seu usuario nao tem permissao para esta acao. Verifique se esta logado com o usuario correto.";
  }

  if (error.includes("duplicate key")) {
    return "Ja existe um registro com estes dados. Revise antes de cadastrar de novo.";
  }

  if (error.includes("invalid input syntax")) {
    return "Algum campo foi preenchido em formato invalido. Confira valores, datas e numeros.";
  }

  return error;
}

function ToastMessage({ toast }: { toast: Toast }) {
  const styles: Record<ToastKind, string> = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-800",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    info: "border-line bg-white text-graphite",
  };

  return (
    <div
      aria-live="polite"
      className={`fixed right-5 top-5 z-50 max-w-sm rounded-md border px-4 py-3 text-sm shadow-soft ${styles[toast.kind]}`}
      role="status"
    >
      {toast.text}
    </div>
  );
}

export function SupabaseCrudPage({
  title,
  description,
  table,
  fields,
  columns,
  orderBy = "created_at",
  urlFilters = [],
}: SupabaseCrudPageProps) {
  const pathname = usePathname();
  const [rows, setRows] = useState<RowData[]>([]);
  const [form, setForm] = useState<Record<string, string | boolean>>(() =>
    emptyForm(fields),
  );
  const [references, setReferences] = useState<ReferenceMap>({});
  const [activeFilters, setActiveFilters] = useState<
    { column: string; label: string; value: string }[]
  >([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const referenceFields = useMemo(
    () => fields.filter((field) => field.reference),
    [fields],
  );

  function showToast(kind: ToastKind, text: string) {
    setToast({ kind, text });
  }

  useEffect(() => {
    if (!toast) return;

    const timeout = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (urlFilters.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const filters = urlFilters.flatMap((filter) => {
      const value = params.get(filter.param);

      if (!value || !filter.allowedValues.includes(value)) {
        return [];
      }

      return [{ column: filter.column, label: filter.label, value }];
    });

    setActiveFilters(filters);
  }, [urlFilters]);

  async function loadRows() {
    const client = supabase;
    if (!client) return;

    setLoading(true);
    let query = client.from(table).select("*");

    activeFilters.forEach((filter) => {
      query = query.eq(filter.column, filter.value);
    });

    const { data, error } = await query.order(orderBy, { ascending: false });

    if (error) {
      showToast("error", `Nao foi possivel carregar ${title.toLowerCase()}.`);
      setLoading(false);
      return;
    }

    setRows((data ?? []) as RowData[]);
    setLoading(false);
  }

  async function loadReferences() {
    const client = supabase;
    if (!client) return;

    const entries = await Promise.all(
      referenceFields.map(async (field) => {
        const ref = field.reference!;
        const { data } = await client
          .from(ref.table)
          .select("*")
          .order(ref.labelKey, { ascending: true });

        const options =
          data?.map((item: RowData) => {
            const mainLabel = item[ref.labelKey];
            const fallbackLabel = ref.labelFallbackKey
              ? item[ref.labelFallbackKey]
              : null;

            return {
              value: String(item[ref.valueKey]),
              label: [mainLabel, fallbackLabel].filter(Boolean).join(" - "),
            };
          }) ?? [];

        return [field.name, options] as const;
      }),
    );

    setReferences(Object.fromEntries(entries));
  }

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      showToast("error", "Supabase ainda nao configurado.");
      setLoading(false);
      return;
    }

    loadReferences();
    loadRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, activeFilters]);

  function updateField(name: string, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm(fields));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client = supabase;
    if (!client) return;

    const missingField = fields.find((field) => {
      const value = form[field.name];
      return field.required && typeof value === "string" && value.trim() === "";
    });

    if (missingField) {
      showToast("warning", `Preencha o campo obrigatorio: ${missingField.label}.`);
      return;
    }

    setSaving(true);
    setToast(null);

    const payload = buildPayload(fields, form);
    const result = editingId
      ? await client.from(table).update(payload).eq("id", editingId)
      : await client.from(table).insert(payload);

    if (result.error) {
      showToast("error", humanizeError(result.error.message));
      setSaving(false);
      return;
    }

    showToast(
      "success",
      editingId ? "Registro atualizado com sucesso." : "Registro cadastrado.",
    );
    resetForm();
    await loadRows();
    await loadReferences();
    setSaving(false);
  }

  function handleEdit(row: RowData) {
    const nextForm = emptyForm(fields);

    fields.forEach((field) => {
      const value = row[field.name];
      if (field.type === "boolean") {
        nextForm[field.name] = Boolean(value);
      } else {
        nextForm[field.name] = value == null ? "" : String(value);
      }
    });

    setEditingId(String(row.id));
    setForm(nextForm);
    showToast("info", "Modo de edicao ativado. Revise os campos e salve.");
  }

  async function handleDelete(row: RowData) {
    const client = supabase;
    if (!client || !row.id) return;
    const confirmed = window.confirm(
      "Remover este registro? Se ele estiver ligado a propostas ou vendas, o banco pode bloquear a remocao.",
    );
    if (!confirmed) {
      showToast("info", "Remocao cancelada.");
      return;
    }

    const { error } = await client.from(table).delete().eq("id", row.id);
    if (error) {
      showToast("error", humanizeError(error.message));
      return;
    }

    showToast("success", "Registro removido.");
    await loadRows();
  }

  function formatValue(row: RowData, column: ColumnConfig) {
    const value = row[column.key];

    if (column.type === "currency") {
      return currencyFormatter.format(Number(value ?? 0));
    }

    if (column.type === "boolean") {
      return value ? "Sim" : "Nao";
    }

    if (column.type === "date") {
      return value ? String(value).slice(0, 10).split("-").reverse().join("/") : "-";
    }

    if (column.type === "reference") {
      return (
        references[column.key]?.find((option) => option.value === String(value))
          ?.label ?? "-"
      );
    }

    return value == null || value === "" ? "-" : String(value);
  }

  function handleExport() {
    if (rows.length === 0) {
      showToast("warning", "Nao ha registros nesta tabela para exportar.");
      return;
    }

    downloadCsv(`${table}.csv`, toCsv(rows, columns));
    showToast("success", `CSV de ${title.toLowerCase()} exportado.`);
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-brand">
            Operacao
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-graphite/75">
            {description}
          </p>
        </div>
        <button
          className="inline-flex h-10 items-center justify-center rounded-md border border-line px-4 text-sm font-semibold text-graphite transition hover:border-brand hover:text-brand"
          onClick={handleExport}
          type="button"
        >
          Exportar CSV
        </button>
      </div>

      {toast ? <ToastMessage toast={toast} /> : null}

      {activeFilters.length > 0 ? (
        <div className="flex flex-col justify-between gap-3 rounded-md border border-brand/20 bg-brand/5 px-4 py-3 text-sm text-graphite md:flex-row md:items-center">
          <span>
            Filtro ativo:{" "}
            {activeFilters
              .map((filter) => `${filter.label} ${filter.value}`)
              .join(", ")}
          </span>
          <a
            className="font-semibold text-brand hover:text-ink"
            href={pathname}
          >
            Limpar filtro
          </a>
        </div>
      ) : null}

      <form
        className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft lg:grid-cols-4"
        noValidate
        onSubmit={handleSubmit}
      >
        {fields.map((field) => (
          <label
            className={
              field.type === "textarea"
                ? "grid gap-2 lg:col-span-4"
                : "grid gap-2"
            }
            key={field.name}
          >
            <span className="text-sm font-medium text-graphite">
              {field.label}
              {field.required ? <span className="text-red-600"> *</span> : null}
            </span>
            {field.type === "textarea" ? (
              <textarea
                className="min-h-24 rounded-md border border-line px-3 py-2 text-sm outline-none transition focus:border-brand"
                onChange={(event) => updateField(field.name, event.target.value)}
                value={String(form[field.name] ?? "")}
              />
            ) : field.type === "select" ? (
              <select
                className="h-10 rounded-md border border-line px-3 text-sm outline-none transition focus:border-brand"
                onChange={(event) => updateField(field.name, event.target.value)}
                required={field.required}
                value={String(form[field.name] ?? "")}
              >
                <option value="">Selecione</option>
                {(field.options ?? references[field.name] ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "boolean" ? (
              <select
                className="h-10 rounded-md border border-line px-3 text-sm outline-none transition focus:border-brand"
                onChange={(event) =>
                  updateField(field.name, event.target.value === "true")
                }
                value={String(form[field.name] ?? true)}
              >
                <option value="true">Sim</option>
                <option value="false">Nao</option>
              </select>
            ) : (
              <input
                className="h-10 rounded-md border border-line px-3 text-sm outline-none transition focus:border-brand"
                onChange={(event) => updateField(field.name, event.target.value)}
                required={field.required}
                type={field.type}
                value={String(form[field.name] ?? "")}
              />
            )}
          </label>
        ))}

        <div className="flex flex-wrap items-end gap-3 lg:col-span-4">
          <button
            className="inline-flex h-10 items-center justify-center rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-graphite disabled:opacity-60"
            disabled={saving}
            type="submit"
          >
            {saving ? "Salvando..." : editingId ? "Salvar alteracoes" : "Cadastrar"}
          </button>
          {editingId ? (
            <button
              className="inline-flex h-10 items-center justify-center rounded-md border border-line px-4 text-sm font-semibold text-graphite transition hover:border-brand hover:text-brand"
              onClick={resetForm}
              type="button"
            >
              Cancelar edicao
            </button>
          ) : null}
        </div>
      </form>

      <div className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-panel text-xs uppercase tracking-normal text-graphite/70">
              <tr>
                {columns.map((column) => (
                  <th className="px-4 py-3 font-semibold" key={column.key}>
                    {column.label}
                  </th>
                ))}
                <th className="px-4 py-3 font-semibold">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {loading ? (
                <tr>
                  <td className="px-4 py-5 text-graphite/70" colSpan={columns.length + 1}>
                    Carregando...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td className="px-4 py-5 text-graphite/70" colSpan={columns.length + 1}>
                    Nenhum registro cadastrado.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr className="align-top" key={String(row.id)}>
                    {columns.map((column) => (
                      <td className="max-w-64 px-4 py-3 text-graphite" key={column.key}>
                        {formatValue(row, column)}
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-4 py-3">
                      <button
                        className="mr-3 text-sm font-semibold text-brand hover:text-ink"
                        onClick={() => handleEdit(row)}
                        type="button"
                      >
                        Editar
                      </button>
                      <button
                        className="text-sm font-semibold text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(row)}
                        type="button"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
