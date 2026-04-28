import { motion } from "motion/react";
import { Github, ArrowRight } from "lucide-react";
import { Project } from "../../config";

interface PortfolioCardProps {
  item: Project;
  index: number;
}

const domainConfig: Record<string, { label: string; color: string }> = {
  "AI Agent": { label: "AI Agent", color: "bg-blue-100 text-blue-700" },
  "AI/Voice": { label: "AI/Voice", color: "bg-green-100 text-green-700" },
  "LLM/RAG": { label: "LLM/RAG", color: "bg-purple-100 text-purple-700" },
  "Side Project": { label: "Side Project", color: "bg-teal-100 text-teal-700" },
};

export function PortfolioCard({ item, index }: PortfolioCardProps) {
  const domainInfo = item.domain ? domainConfig[item.domain] : null;

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col h-full cursor-pointer"
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
            <span className="text-xs text-gray-500">{item.date}</span>
            {item.links.github && (
              <a
                href={item.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                title="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {item.title}
        </h3>

        {/* Impact (한줄 성과) */}
        {item.impact && (
          <p className="text-sm font-medium text-blue-600 mb-3">{item.impact}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.slice(0, 5).map((tag, i) => (
            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
              {tag}
            </span>
          ))}
          {item.tags.length > 5 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-xs">
              +{item.tags.length - 5}
            </span>
          )}
        </div>

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
