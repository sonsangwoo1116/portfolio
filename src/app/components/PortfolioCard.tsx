import { motion } from "motion/react";
import { Github, ArrowRight } from "lucide-react";
import { Project } from "../../config";

interface PortfolioCardProps {
  item: Project;
  index: number;
  featured?: boolean;
}

export function PortfolioCard({ item, index, featured = false }: PortfolioCardProps) {
  const impactChips = item.impact ? item.impact.split(" | ") : [];

  if (featured) {
    return (
      <motion.div
        className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={() => window.location.hash = `project-${item.id}`}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              {item.domain && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  {item.domain}
                </span>
              )}
            </div>
            {item.links.github && (
              <a href={item.links.github} target="_blank" rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={(e) => e.stopPropagation()}>
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{item.title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">{item.description}</p>

          {impactChips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {impactChips.map((chip, i) => (
                <span key={i} className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                  {chip.trim()}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.tags.slice(0, 5).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700">{tag}</span>
            ))}
            {item.tags.length > 5 && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 text-slate-500">+{item.tags.length - 5}</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
            <span>View Case Study</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col h-full cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      onClick={() => window.location.hash = `project-${item.id}`}
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-center justify-between gap-2 mb-3">
          {item.domain && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">{item.domain}</span>
          )}
          {item.links.github && (
            <a href={item.links.github} target="_blank" rel="noopener noreferrer"
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
              onClick={(e) => e.stopPropagation()}>
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <h3 className="font-bold text-base text-slate-900 mb-2 leading-snug">{item.title}</h3>

        {impactChips.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {impactChips.slice(0, 2).map((chip, i) => (
              <span key={i} className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                {chip.trim()}
              </span>
            ))}
          </div>
        )}

        <div className="flex-grow" />

        <div className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors pt-2 border-t border-slate-100">
          <span>View Detail</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
