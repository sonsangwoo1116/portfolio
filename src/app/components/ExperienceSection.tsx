import { motion } from "motion/react";
import { careerData } from "../../config";

export function ExperienceSection() {
  const positions = careerData.experience;

  const formatPeriod = (start: string, end: string | null) => {
    const s = start.replace("-", ".");
    const e = end ? end.replace("-", ".") : "Present";
    return `${s} - ${e}`;
  };

  return (
    <section id="experience">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Experience</h2>
          <p className="text-slate-500 text-base">프로덕션 AI 시스템 설계·구현 경력</p>
        </motion.div>

        <div>
          <div className="space-y-3">
            {positions.map((pos, index) => {
              const hasHighlights = pos.highlights && pos.highlights.length > 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="relative pl-8 pb-4 last:pb-0"
                >
                  {index < positions.length - 1 && (
                    <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-slate-200" />
                  )}
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-blue-500 bg-white" />

                  <div className="rounded-lg border border-slate-200 bg-white hover:shadow-md transition-shadow p-6">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                      <span className="text-base font-semibold text-blue-600">
                        {formatPeriod(pos.startDate, pos.endDate)}
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="text-lg font-bold text-slate-900">{pos.company}</span>
                      <span className="text-slate-300">|</span>
                      <span className="text-base text-slate-700">{pos.title}</span>
                    </div>

                    {hasHighlights && (
                      <div className="space-y-5 mt-4">
                        {pos.highlights!.map((item, i) => {
                          const titleMatch = item.match(/^\[(.+?)\]/);
                          const rawTitle = titleMatch ? titleMatch[1] : null;
                          const title = rawTitle ? rawTitle.replace(/\s*\|.*$/, "") : null;
                          const content = title ? item.replace(/^\[.+?\]\s*/, "") : item;
                          const bullets = content.split(" — ").map(s => s.trim()).filter(Boolean);

                          return (
                            <div key={i} className="border-l-2 border-blue-300 pl-4">
                              {title && (
                                <div className="text-base font-semibold text-slate-800 mb-2">{title}</div>
                              )}
                              <ul className="space-y-1.5">
                                {bullets.map((bullet, j) => (
                                  <li key={j} className="text-sm text-slate-600 flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
    </section>
  );
}
