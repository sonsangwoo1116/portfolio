import { motion } from "motion/react";
import { careerData } from "../../config";

export function AcademicProjectsSection() {
  const items = careerData.academicProjects;
  if (items.length === 0) return null;

  return (
    <section id="academic" className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Academic Projects</h2>
      </motion.div>

      <div>
        {items.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="border-b border-slate-200 last:border-b-0"
          >
            <div className="flex gap-5 py-5">
              <span className="text-xs font-mono text-slate-400 font-semibold shrink-0 pt-0.5">
                [{index + 1}]
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-500">
                  {project.institution}, {project.period}
                </p>
                <p className="text-xs text-slate-500">{project.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
