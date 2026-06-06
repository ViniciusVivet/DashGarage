import { ModulePlaceholder } from "@/components/ModulePlaceholder";

export default function LeadsPage() {
  return (
    <ModulePlaceholder
      description="Controle a entrada de oportunidades comerciais por origem, status, vendedor e temperatura."
      fields={[
        "nome_cliente",
        "telefone",
        "origem",
        "modelo_interesse",
        "faixa_orcamento",
        "forma_pagamento",
        "vendedor_id",
        "status",
        "temperatura",
        "motivo_perda",
        "observacoes",
      ]}
      nextStep="Implementar listagem, formulario de cadastro, edicao, filtros por origem/status e exportacao CSV."
      title="Leads"
    />
  );
}
