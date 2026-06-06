export type AppModule = {
  href: string;
  label: string;
  description: string;
  status: "fundacao" | "proximo";
};

export const appModules: AppModule[] = [
  {
    href: "/dashboard/leads",
    label: "Leads",
    description: "Entrada, origem, status, temperatura e motivo de perda.",
    status: "fundacao",
  },
  {
    href: "/dashboard/vendedores",
    label: "Vendedores",
    description: "Equipe comercial, metas mensais e percentual de comissao.",
    status: "fundacao",
  },
  {
    href: "/dashboard/veiculos",
    label: "Veiculos",
    description: "Estoque, valores, dias parados e status de venda.",
    status: "fundacao",
  },
  {
    href: "/dashboard/propostas",
    label: "Propostas",
    description: "Ofertas enviadas, aceitas, recusadas e expiradas.",
    status: "fundacao",
  },
  {
    href: "/dashboard/vendas",
    label: "Vendas",
    description: "Faturamento, margem, comissao e forma de pagamento.",
    status: "fundacao",
  },
  {
    href: "/dashboard/exportacoes",
    label: "Exportacoes",
    description: "Base CSV para Excel, Power BI, SQL e Python.",
    status: "proximo",
  },
];
