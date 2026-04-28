import { motion } from "motion/react";
import { GraduationCap, Calendar } from "lucide-react";
import { careerData } from "../../config";

export function EducationSection() {
  const education = careerData.education;

  return (
    <section id="education" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Education</h2>
          <div className="w-20 h-1 bg-gray-800 mx-auto mb-6" />
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {education.map((edu, index) => {
              const isFeatured = false;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow p-3 h-full`}>
                    <div className={`relative rounded-lg p-2 ${isFeatured ? "bg-gray-100" : ""}`}>
                      <div className="flex items-start gap-4">
                        <div className={`inline-flex p-3 rounded-full shrink-0 ${isFeatured ? "bg-gray-200" : "bg-gray-100"}`}>
                          <GraduationCap className={`w-6 h-6 ${isFeatured ? "text-blue-600" : "text-gray-600"}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{edu.school}</h3>
                          <p className="text-sm font-medium text-gray-700 mb-0.5">{edu.degree}</p>
                          <p className="text-sm text-gray-600 mb-2">{edu.field}</p>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{edu.startYear} - {edu.endYear}</span>
                          </div>
                          {edu.notes && (
                            <div className="text-xs text-gray-500 bg-white/60 rounded-lg px-3 py-2 space-y-1">
                              {edu.notes.split("\n").map((line, idx) => {
                                const linkMatch = line.match(/\((https?:\/\/[^\)]+)\)/);
                                if (linkMatch) {
                                  const url = linkMatch[1];
                                  const text = line.replace(`(${url})`, "").trim();
                                  return (
                                    <p key={idx}>
                                      {text} <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Detail</a>
                                    </p>
                                  );
                                }
                                return <p key={idx}>{line}</p>;
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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
