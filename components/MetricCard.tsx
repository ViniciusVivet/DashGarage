type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
};

export function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <p className="text-sm font-medium text-graphite/70">{label}</p>
      <strong className="mt-3 block text-3xl font-semibold tracking-normal text-ink">
        {value}
      </strong>
      <p className="mt-2 text-sm leading-6 text-graphite/70">{helper}</p>
    </article>
  );
}
