interface DetailStepProps {
  num: string;
  title: string;
  desc?: string;
}

export function DetailStep({ num, title, desc }: DetailStepProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
        {num}
      </span>
      <div>
        <span className="text-sm font-semibold text-slate-800">{title}</span>
        {desc && <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>}
      </div>
    </div>
  );
}
