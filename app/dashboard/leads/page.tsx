import { SupabaseCrudPage } from "@/components/SupabaseCrudPage";

export default function LeadsPage() {
  return (
    <SupabaseCrudPage
      columns={[
        { key: "nome_cliente", label: "Cliente" },
        { key: "telefone", label: "Telefone" },
        { key: "origem", label: "Origem" },
        { key: "modelo_interesse", label: "Interesse" },
        { key: "vendedor_id", label: "Vendedor", type: "reference" },
        { key: "status", label: "Status" },
      ]}
      description="Controle a entrada de oportunidades comerciais por origem, status, vendedor e temperatura."
      fields={[
        {
          name: "nome_cliente",
          label: "Nome do cliente",
          type: "text",
          required: true,
        },
        { name: "telefone", label: "Telefone", type: "text" },
        {
          name: "origem",
          label: "Origem",
          type: "select",
          required: true,
          options: [
            { label: "WhatsApp", value: "WhatsApp" },
            { label: "Instagram", value: "Instagram" },
            { label: "OLX", value: "OLX" },
            { label: "Webmotors", value: "Webmotors" },
            { label: "Indicacao", value: "Indicacao" },
            { label: "Loja fisica", value: "Loja fisica" },
            { label: "Trafego pago", value: "Trafego pago" },
          ],
        },
        { name: "modelo_interesse", label: "Modelo de interesse", type: "text" },
        { name: "faixa_orcamento", label: "Faixa de orcamento", type: "number" },
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
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { label: "Novo lead", value: "Novo lead" },
            { label: "Em atendimento", value: "Em atendimento" },
            { label: "Proposta enviada", value: "Proposta enviada" },
            { label: "Negociando", value: "Negociando" },
            { label: "Venda fechada", value: "Venda fechada" },
            { label: "Perdido", value: "Perdido" },
          ],
        },
        {
          name: "temperatura",
          label: "Temperatura",
          type: "select",
          options: [
            { label: "Frio", value: "Frio" },
            { label: "Morno", value: "Morno" },
            { label: "Quente", value: "Quente" },
          ],
        },
        {
          name: "motivo_perda",
          label: "Motivo de perda",
          type: "select",
          options: [
            { label: "Preco acima do esperado", value: "Preco acima do esperado" },
            {
              label: "Financiamento nao aprovado",
              value: "Financiamento nao aprovado",
            },
            { label: "Comprou em outra loja", value: "Comprou em outra loja" },
            { label: "Veiculo indisponivel", value: "Veiculo indisponivel" },
            { label: "Nao respondeu contato", value: "Nao respondeu contato" },
            { label: "Entrada insuficiente", value: "Entrada insuficiente" },
          ],
        },
        { name: "observacoes", label: "Observacoes", type: "textarea" },
      ]}
      table="leads"
      title="Leads"
    />
  );
}
