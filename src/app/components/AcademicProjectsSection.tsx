import { motion } from "motion/react";
import { careerData } from "../../config";

export function AcademicProjectsSection() {
  const items = careerData.academicProjects;
  if (items.length === 0) return null;

  return (
    <section id="academic" className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-slate-900">Academic Projects</h2>
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
              <div className="flex gap-6 py-6">
                <span className="text-sm font-mono text-blue-600 font-semibold shrink-0 pt-0.5">
                  [{index + 1}]
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold text-slate-900 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {project.institution}, {project.period}
                  </p>
                  <p className="text-sm text-slate-500">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
