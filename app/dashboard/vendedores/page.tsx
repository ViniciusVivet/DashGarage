import { ModulePlaceholder } from "@/components/ModulePlaceholder";

export default function VendedoresPage() {
  return (
    <ModulePlaceholder
      description="Cadastre a equipe comercial para calcular metas, comissoes e performance por vendedor."
      fields={[
        "nome",
        "ativo",
        "meta_mensal",
        "percentual_comissao",
        "created_at",
      ]}
      nextStep="Implementar CRUD simples e vincular vendedores aos leads, propostas e vendas."
      title="Vendedores"
    />
  );
}
