import Link from "next/link";

type ModulePlaceholderProps = {
  title: string;
  description: string;
  fields: string[];
  nextStep: string;
};

export function ModulePlaceholder({
  title,
  description,
  fields,
  nextStep,
}: ModulePlaceholderProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-brand">
            Modulo CRM
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-graphite/75">
            {description}
          </p>
        </div>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-graphite"
          href="/dashboard"
        >
          Voltar ao dashboard
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-ink">Campos previstos</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                className="rounded-md border border-line bg-panel px-3 py-2 text-sm text-graphite"
                key={field}
              >
                {field}
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-ink">Proximo passo</h2>
          <p className="mt-3 text-sm leading-6 text-graphite/75">{nextStep}</p>
        </aside>
      </div>
    </section>
  );
}
