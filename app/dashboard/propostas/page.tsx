import { ModulePlaceholder } from "@/components/ModulePlaceholder";

export default function PropostasPage() {
  return (
    <ModulePlaceholder
      description="Registre propostas comerciais para medir negociacoes abertas e taxa de propostas convertidas."
      fields={[
        "lead_id",
        "veiculo_id",
        "vendedor_id",
        "valor_proposto",
        "forma_pagamento",
        "status",
        "data_proposta",
        "observacoes",
      ]}
      nextStep="Implementar relacoes com leads, veiculos e vendedores, com status enviada, aceita, recusada e expirada."
      title="Propostas"
    />
  );
}
