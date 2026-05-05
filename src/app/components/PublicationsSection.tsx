import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { careerData } from "../../config";

export function PublicationsSection() {
  const publications = careerData.publications;

  return (
    <section id="publications" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Publications</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border-b border-gray-200 last:border-b-0"
            >
              <div className="flex gap-6 py-6">
                {/* Index */}
                <span className="text-sm font-mono text-blue-600 font-semibold shrink-0 pt-0.5">
                  [{index + 1}]
                </span>

                {/* Content */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold text-gray-900 leading-snug">
                    &ldquo;{pub.title}&rdquo;
                  </h3>
                  <p className="text-sm text-gray-500">
                    {pub.journal}{pub.date && `, ${pub.date}`}
                  </p>
                  {pub.description && (
                    <p className="text-sm text-gray-500">{pub.description}</p>
                  )}
                  {pub.url && (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Paper</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
