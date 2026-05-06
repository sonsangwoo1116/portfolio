import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

interface DetailHeroProps {
  title: string;
  subtitle: string;
  domain: string;
  date?: string;
  company?: string;
  children?: React.ReactNode; // metric cards slot
}

export function DetailHero({ title, subtitle, domain, date, company, children }: DetailHeroProps) {
  return (
    <>
      {/* Sticky header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-3">
          <button
            onClick={() => { window.location.hash = ""; }}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>
        </div>
      </div>

      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">{domain}</span>
          {date && <span className="text-sm text-slate-500">{date}</span>}
          {company && <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">{company}</span>}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 leading-tight">{title}</h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">{subtitle}</p>

        {children && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            {children}
          </div>
        )}
      </motion.div>
    </>
  );
}
