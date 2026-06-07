import { SupabaseCrudPage } from "@/components/SupabaseCrudPage";

export default function PropostasPage() {
  return (
    <SupabaseCrudPage
      columns={[
        { key: "lead_id", label: "Lead", type: "reference" },
        { key: "veiculo_id", label: "Veiculo", type: "reference" },
        { key: "vendedor_id", label: "Vendedor", type: "reference" },
        { key: "valor_proposto", label: "Valor", type: "currency" },
        { key: "status", label: "Status" },
        { key: "data_proposta", label: "Data", type: "date" },
      ]}
      description="Registre propostas comerciais para medir negociacoes abertas e taxa de propostas convertidas."
      fields={[
        {
          name: "lead_id",
          label: "Lead",
          type: "select",
          reference: {
            table: "leads",
            valueKey: "id",
            labelKey: "nome_cliente",
          },
        },
        {
          name: "veiculo_id",
          label: "Veiculo",
          type: "select",
          reference: {
            table: "veiculos",
            valueKey: "id",
            labelKey: "marca",
            labelFallbackKey: "modelo",
          },
        },
        {
          name: "vendedor_id",
          label: "Vendedor",
          type: "select",
          reference: {
            table: "vendedores",
            valueKey: "id",
            labelKey: "nome",
          },
        },
        { name: "valor_proposto", label: "Valor proposto", type: "number" },
        {
          name: "forma_pagamento",
          label: "Forma de pagamento",
          type: "select",
          options: [
            { label: "A vista", value: "A vista" },
            { label: "Financiamento", value: "Financiamento" },
            { label: "Consorcio", value: "Consorcio" },
            { label: "Troca + volta", value: "Troca + volta" },
          ],
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { label: "Enviada", value: "enviada" },
            { label: "Aceita", value: "aceita" },
            { label: "Recusada", value: "recusada" },
            { label: "Expirada", value: "expirada" },
          ],
        },
        { name: "data_proposta", label: "Data da proposta", type: "date" },
        { name: "observacoes", label: "Observacoes", type: "textarea" },
      ]}
      orderBy="data_proposta"
      table="propostas"
      title="Propostas"
    />
  );
}
