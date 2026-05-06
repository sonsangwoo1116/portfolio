import { motion } from "motion/react";

interface DetailSectionProps {
  title: string;
  delay?: number;
  children: React.ReactNode;
  id?: string;
}

export function DetailSection({ title, delay = 0, children, id }: DetailSectionProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 leading-tight">{title}</h2>
      {children}
    </motion.div>
  );
}
