import { motion } from "motion/react";

export function OverviewSection() {
  return (
    <section id="overview" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Career Overview
          </h2>
          <div className="w-20 h-1 bg-gray-800 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AI 콜봇 대화 엔진, RAG 시스템, 음성인식 파이프라인 등
            AI 서비스의 문제 정의부터 아키텍처 설계, 구현까지
            전 과정을 주도해왔습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
