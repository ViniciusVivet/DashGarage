import { SupabaseCrudPage } from "@/components/SupabaseCrudPage";

export default function VeiculosPage() {
  return (
    <SupabaseCrudPage
      columns={[
        { key: "marca", label: "Marca" },
        { key: "modelo", label: "Modelo" },
        { key: "ano", label: "Ano" },
        { key: "valor_anunciado", label: "Valor anunciado", type: "currency" },
        { key: "status", label: "Status" },
        { key: "data_entrada", label: "Entrada", type: "date" },
      ]}
      description="Organize o estoque da concessionaria e acompanhe disponibilidade, reserva, venda e preco."
      fields={[
        { name: "marca", label: "Marca", type: "text", required: true },
        { name: "modelo", label: "Modelo", type: "text", required: true },
        { name: "ano", label: "Ano", type: "number" },
        { name: "versao", label: "Versao", type: "text" },
        {
          name: "tipo",
          label: "Tipo",
          type: "select",
          options: [
            { label: "Novo", value: "novo" },
            { label: "Usado", value: "usado" },
            { label: "Seminovo", value: "seminovo" },
          ],
        },
        { name: "valor_compra", label: "Valor de compra", type: "number" },
        { name: "valor_anunciado", label: "Valor anunciado", type: "number" },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { label: "Disponivel", value: "disponivel" },
            { label: "Reservado", value: "reservado" },
            { label: "Vendido", value: "vendido" },
          ],
        },
        { name: "data_entrada", label: "Data de entrada", type: "date" },
        { name: "data_venda", label: "Data de venda", type: "date" },
        { name: "observacoes", label: "Observacoes", type: "textarea" },
      ]}
      table="veiculos"
      title="Veiculos"
      urlFilters={[
        {
          param: "status",
          column: "status",
          label: "status",
          allowedValues: ["disponivel", "reservado", "vendido"],
        },
      ]}
    />
  );
}
