import { SupabaseCrudPage } from "@/components/SupabaseCrudPage";

export default function VendasPage() {
  return (
    <SupabaseCrudPage
      columns={[
        { key: "lead_id", label: "Lead", type: "reference" },
        { key: "veiculo_id", label: "Veiculo", type: "reference" },
        { key: "vendedor_id", label: "Vendedor", type: "reference" },
        { key: "valor_vendido", label: "Valor vendido", type: "currency" },
        { key: "margem", label: "Margem", type: "currency" },
        { key: "data_venda", label: "Data", type: "date" },
      ]}
      description="Consolide vendas fechadas para gerar faturamento, ticket medio, margem e comissao."
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
        {
          name: "valor_vendido",
          label: "Valor vendido",
          type: "number",
          required: true,
        },
        {
          name: "valor_compra",
          label: "Valor de compra",
          type: "number",
          required: true,
        },
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
        { name: "comissao", label: "Comissao", type: "number" },
        { name: "data_venda", label: "Data da venda", type: "date" },
        { name: "observacoes", label: "Observacoes", type: "textarea" },
      ]}
      orderBy="data_venda"
      table="vendas"
      title="Vendas"
    />
  );
}
