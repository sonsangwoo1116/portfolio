import { motion } from "motion/react";
import { Github, ArrowRight } from "lucide-react";
import { Project } from "../../config";

interface PortfolioCardProps {
  item: Project;
  index: number;
}

const domainConfig: Record<string, { label: string; color: string }> = {
  "AI Agent": { label: "AI Agent", color: "bg-slate-100 text-slate-700" },
  "AI/Voice": { label: "AI/Voice", color: "bg-slate-100 text-slate-700" },
  "LLM/RAG": { label: "LLM/RAG", color: "bg-slate-100 text-slate-700" },
  "Side Project": { label: "Side Project", color: "bg-slate-100 text-slate-700" },
};

export function PortfolioCard({ item, index }: PortfolioCardProps) {
  const domainInfo = item.domain ? domainConfig[item.domain] : null;

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200 flex flex-col h-full cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => window.location.hash = `project-${item.id}`}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Badge + Date */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {domainInfo && (
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${domainInfo.color}`}>
                {domainInfo.label}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {item.links.github && (
              <a
                href={item.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                title="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-slate-900 mb-2">
          {item.title}
        </h3>

        {/* Impact (한줄 성과) */}
        {item.impact && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.impact.split(" | ").map((chip, i) => (
              <span key={i} className="inline-flex px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700">
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* View Detail */}
        <div className="flex items-center justify-end gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          <span>View Detail</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}
