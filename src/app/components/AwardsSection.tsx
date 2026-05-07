import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { careerData } from "../../config";

const INITIAL_COUNT = 3;

export function AwardsSection() {
  const awards = careerData.awards;
  const [showAll, setShowAll] = useState(false);
  const visibleAwards = showAll ? awards : awards.slice(0, INITIAL_COUNT);

  return (
    <section id="awards" className="py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {visibleAwards.map((award, index) => (
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

        {awards.length > INITIAL_COUNT && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <span>{showAll ? "접기" : `더보기 (${awards.length - INITIAL_COUNT})`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
