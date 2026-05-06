interface DetailGuardrailItemProps {
  title: string;
  desc: string;
}

export function DetailGuardrailItem({ title, desc }: DetailGuardrailItemProps) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
      <div className="text-sm font-bold text-slate-800 mb-1">{title}</div>
      <div className="text-xs text-slate-600 leading-relaxed">{desc}</div>
    </div>
  );
}
