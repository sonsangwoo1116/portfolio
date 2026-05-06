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
      className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm"
    >
      <h2 className="text-xl font-bold text-slate-900 mb-4">{title}</h2>
      {children}
    </motion.div>
  );
}
