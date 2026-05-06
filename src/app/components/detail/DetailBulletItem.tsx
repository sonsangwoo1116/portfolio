interface DetailBulletItemProps {
  text: string;
}

export function DetailBulletItem({ text }: DetailBulletItemProps) {
  return (
    <li className="flex items-start gap-2.5 text-[15px] text-slate-600 leading-relaxed">
      <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
      <span>{text}</span>
    </li>
  );
}
