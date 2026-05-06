interface DetailStepProps {
  num: string;
  title: string;
  desc?: string;
}

export function DetailStep({ num, title, desc }: DetailStepProps) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-700 text-white text-sm font-bold flex items-center justify-center">
        {num}
      </span>
      <div>
        <span className="text-base font-bold text-slate-900">{title}</span>
        {desc && <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{desc}</p>}
      </div>
    </div>
  );
}
