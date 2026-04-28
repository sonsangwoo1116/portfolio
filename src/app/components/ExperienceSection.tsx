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
    <section id="experience" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
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
                    <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-gray-200" />
                  )}
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-blue-500 bg-white" />

                  <div className="rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow p-4">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                      <span className="text-sm font-semibold text-blue-600">
                        {formatPeriod(pos.startDate, pos.endDate)}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="text-base font-bold text-gray-900">{pos.company}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-sm text-gray-700">{pos.title}</span>
                    </div>

                    {hasHighlights && (
                      <div className="space-y-4 mt-3">
                        {pos.highlights!.map((item, i) => {
                          // [프로젝트명 | 기간] 형식에서 제목 추출
                          const titleMatch = item.match(/^\[(.+?)\]/);
                          const title = titleMatch ? titleMatch[1] : null;
                          const content = title ? item.replace(/^\[.+?\]\s*/, "") : item;
                          // — 구분자로 불릿 분리
                          const bullets = content.split(" — ").map(s => s.trim()).filter(Boolean);

                          return (
                            <div key={i} className="border-l-2 border-blue-200 pl-3">
                              {title && (
                                <div className="text-sm font-semibold text-gray-800 mb-1">{title}</div>
                              )}
                              <ul className="space-y-1">
                                {bullets.map((bullet, j) => (
                                  <li key={j} className="text-xs text-gray-600 flex items-start gap-1.5">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
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
      </div>
    </section>
  );
}
