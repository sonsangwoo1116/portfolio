interface DetailBulletItemProps {
  text: string;
}

export function DetailBulletItem({ text }: DetailBulletItemProps) {
  return (
    <li className="text-base text-slate-600 flex items-start gap-2">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
      <span>{text}</span>
    </li>
  );
}
