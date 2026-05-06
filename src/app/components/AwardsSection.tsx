import { motion } from "motion/react";
import { careerData } from "../../config";

export function AwardsSection() {
  const awards = careerData.awards;

  return (
    <section id="awards" className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-slate-900">Awards</h2>
        </motion.div>

        <div>
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border-b border-slate-200 last:border-b-0"
            >
              <div className="flex gap-6 py-6">
                {/* Index */}
                <span className="text-sm font-mono text-slate-400 font-semibold shrink-0 pt-0.5">
                  [{index + 1}]
                </span>

                {/* Content */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold text-slate-900 leading-snug">
                    {award.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {award.organization}{award.date && `, ${award.date}`}
                  </p>
                  {award.description && (
                    <p className="text-sm text-slate-500">{award.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
    </section>
  );
}
