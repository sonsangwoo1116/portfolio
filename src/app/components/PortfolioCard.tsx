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
        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-200 flex flex-col h-full cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={() => window.location.hash = `project-${item.id}`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Badge + GitHub */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              {item.domain && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                  {item.domain}
                </span>
              )}
            </div>
            {item.links.github && (
              <a
                href={item.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg text-gray-900 mb-2 leading-snug">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
            {item.description}
          </p>

          {/* Impact Chips */}
          {impactChips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {impactChips.map((chip, i) => (
                <span key={i} className="inline-flex px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700">
                  {chip.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.tags.slice(0, 4).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700">
                {tag}
              </span>
            ))}
            {item.tags.length > 4 && (
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-gray-50 text-gray-500">
                +{item.tags.length - 4}
              </span>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* View Detail */}
          <div className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
            <span>View Case Study</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </motion.div>
    );
  }

  // Compact card
  return (
    <motion.div
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-200 flex flex-col h-full cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      onClick={() => window.location.hash = `project-${item.id}`}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Badge + GitHub */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {item.domain && (
              <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                {item.domain}
              </span>
            )}
          </div>
          {item.links.github && (
            <a
              href={item.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {item.title}
        </h3>

        {/* Impact Chips */}
        {impactChips.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {impactChips.slice(0, 2).map((chip, i) => (
              <span key={i} className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700">
                {chip.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* View Detail */}
        <div className="flex items-center justify-end gap-1 text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
          <span>View Detail</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
