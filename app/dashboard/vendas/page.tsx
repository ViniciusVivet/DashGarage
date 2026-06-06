import { ModulePlaceholder } from "@/components/ModulePlaceholder";

export default function VendasPage() {
  return (
    <ModulePlaceholder
      description="Consolide vendas fechadas para gerar faturamento, ticket medio, margem e comissao."
      fields={[
        "lead_id",
        "veiculo_id",
        "vendedor_id",
        "valor_vendido",
        "valor_compra",
        "margem",
        "forma_pagamento",
        "comissao",
        "data_venda",
        "observacoes",
      ]}
      nextStep="Implementar calculo automatico de margem e apoio ao calculo de comissao por vendedor."
      title="Vendas"
    />
  );
}
