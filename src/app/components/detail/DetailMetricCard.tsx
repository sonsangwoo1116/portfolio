interface DetailMetricCardProps {
  label: string;
  value: string;
  desc?: string;
}

export function DetailMetricCard({ label, value, desc }: DetailMetricCardProps) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="text-xl font-extrabold text-slate-900 leading-tight mb-0.5">{value}</div>
      {desc && <div className="text-xs text-slate-500">{desc}</div>}
    </div>
  );
}
