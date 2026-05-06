interface DetailMetricCardProps {
  label: string;
  value: string;
  desc?: string;
}

export function DetailMetricCard({ label, value, desc }: DetailMetricCardProps) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
      <div className="text-xs font-medium text-slate-500 mb-1">{label}</div>
      <div className="text-2xl font-extrabold text-slate-900 leading-tight mb-1">{value}</div>
      {desc && <div className="text-xs text-slate-500">{desc}</div>}
    </div>
  );
}
