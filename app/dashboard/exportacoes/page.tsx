import { ModulePlaceholder } from "@/components/ModulePlaceholder";

export default function ExportacoesPage() {
  return (
    <ModulePlaceholder
      description="Area reservada para preparar os CSVs usados por Rafael no Excel, Power BI, SQL e Python."
      fields={[
        "leads.csv",
        "vendedores.csv",
        "veiculos.csv",
        "propostas.csv",
        "vendas.csv",
      ]}
      nextStep="Implementar botoes de exportacao CSV por tabela apos os CRUDs principais estarem conectados ao Supabase."
      title="Exportacoes"
    />
  );
}
