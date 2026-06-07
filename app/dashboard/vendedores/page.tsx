import { SupabaseCrudPage } from "@/components/SupabaseCrudPage";

export default function VendedoresPage() {
  return (
    <SupabaseCrudPage
      columns={[
        { key: "nome", label: "Nome" },
        { key: "ativo", label: "Ativo", type: "boolean" },
        { key: "meta_mensal", label: "Meta mensal", type: "currency" },
        { key: "percentual_comissao", label: "Comissao %" },
      ]}
      description="Cadastre a equipe comercial para calcular metas, comissoes e performance por vendedor."
      fields={[
        { name: "nome", label: "Nome", type: "text", required: true },
        { name: "ativo", label: "Ativo", type: "boolean" },
        { name: "meta_mensal", label: "Meta mensal", type: "number" },
        {
          name: "percentual_comissao",
          label: "Comissao %",
          type: "number",
        },
      ]}
      table="vendedores"
      title="Vendedores"
    />
  );
}
