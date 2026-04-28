import { motion } from "motion/react";
import { ArrowLeft, Github, Globe, ExternalLink } from "lucide-react";
import { Project } from "../../config";

interface ProjectDetailPageProps {
  project: Project;
}

const domainConfig: Record<string, { label: string; color: string }> = {
  "AI Agent": { label: "AI Agent", color: "bg-blue-100 text-blue-700" },
  "AI/Voice": { label: "AI/Voice", color: "bg-green-100 text-green-700" },
  "LLM/RAG": { label: "LLM/RAG", color: "bg-purple-100 text-purple-700" },
  "Side Project": { label: "Side Project", color: "bg-teal-100 text-teal-700" },
};

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const domainInfo = project.domain ? domainConfig[project.domain] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => { window.location.hash = ""; }}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            {domainInfo && (
              <span className={`px-3 py-1 rounded-md text-sm font-medium ${domainInfo.color}`}>
                {domainInfo.label}
              </span>
            )}
            <span className="text-sm text-gray-500">{project.date}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>

          {/* Impact */}
          {project.impact && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4">
              <p className="text-base font-medium text-blue-700">{project.impact}</p>
            </div>
          )}

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                <Globe className="w-4 h-4" /> Live Demo
              </a>
            )}
            {project.links.external && (
              <a href={project.links.external} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                <ExternalLink className="w-4 h-4" /> External
              </a>
            )}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-3">Overview</h2>
          <p className="text-base text-gray-700 leading-relaxed">{project.description}</p>
        </motion.div>

        {/* Problem Statement */}
        {project.problemStatement && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-3">💡 Problem</h2>
            <p className="text-base text-gray-700 leading-relaxed">{project.problemStatement}</p>
          </motion.div>
        )}

        {/* Technical Details */}
        {project.technicalDetails && project.technicalDetails.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">🔧 Technical Details</h2>
            <ul className="space-y-3">
              {project.technicalDetails.map((detail, i) => (
                <li key={i} className="text-base text-gray-700 leading-relaxed flex items-start gap-3">
                  <span className="mt-2 w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Future Improvements */}
        {project.futureImprovements && project.futureImprovements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">🚀 Future Plans</h2>
            <ul className="space-y-3">
              {project.futureImprovements.map((item, i) => (
                <li key={i} className="text-base text-gray-700 leading-relaxed flex items-start gap-3">
                  <span className="mt-2 w-2 h-2 rounded-full bg-green-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
