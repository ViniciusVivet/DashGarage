import { ModulePlaceholder } from "@/components/ModulePlaceholder";

export default function VeiculosPage() {
  return (
    <ModulePlaceholder
      description="Organize o estoque da concessionaria sem expor placas ou dados sensiveis no repositorio publico."
      fields={[
        "marca",
        "modelo",
        "ano",
        "versao",
        "tipo",
        "valor_compra",
        "valor_anunciado",
        "status",
        "data_entrada",
        "data_venda",
        "observacoes",
      ]}
      nextStep="Implementar filtros por status, tipo, dias em estoque e preparar calculo de estoque parado."
      title="Veiculos"
    />
  );
}
