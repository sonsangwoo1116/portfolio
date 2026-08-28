import { motion } from "motion/react";
import { GraduationCap, Briefcase, BookOpen, Award, Target, Lightbulb } from "lucide-react";

export function AboutSection() {
  const experiences = [
    {
      period: "2025.01 - 2026.06.12",
      title: "(주)사운드마인드",
      role: "팀장 / AX",
      description: "AI Agent 개발 및 LLM 기반 서비스 구축, 음성 AI 모델 개발 및 프로덕션 배포, 팀원 LLM 개발 코칭"
    },
  ];

  const expertise = [
    {
      icon: Lightbulb,
      title: "AI Agent",
      description: "상태 머신, LLM Tool Calling, 가드레일 기반 대화 에이전트 설계",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "LLM/RAG",
      description: "LangGraph, RAG 파이프라인, Map-Reduce 요약, 프롬프트 엔지니어링",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BookOpen,
      title: "Voice AI",
      description: "STT/TTS 모델 서빙, VAD, 에코 필터, 실시간 음성 처리",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: GraduationCap,
      title: "ML Serving",
      description: "Triton, vLLM, TensorRT, Docker 기반 모델 서빙 및 최적화",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "EMNLP 2026 Accepted",
      description: "Industry Track · RCPS · 1st Author"
    },
    {
      icon: Award,
      title: "ACL 2026 Presented",
      description: "System Demonstrations · Rating 7.50 · 2nd Author"
    },
    {
      icon: Award,
      title: "해커톤 대상",
      description: "Build with TRAE · WIGENT: AI Agent 실시간 토론 플랫폼"
    },
    {
      icon: GraduationCap,
      title: "석사 4.5/4.5",
      description: "한신대학교 IT영상데이터융합(협) · 멀티모달 딥러닝 연구"
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            석사 과정에서 텍스트·음성 멀티모달 데이터 기반 딥러닝 모델을 연구했고,
            졸업 후 사운드마인드에서 AI Agent와 LLM 기반 서비스를 설계·구현했습니다.
            이후 실시간 음성 통역과 문서 RAG 평가 연구를 ACL 2026 및 EMNLP 2026 논문으로 확장했습니다.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Core Expertise</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white p-6 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`}></div>
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${item.color} mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Experience</h3>
          <div className="max-w-3xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {index < experiences.length - 1 && (
                  <div className="absolute left-[7px] top-8 bottom-0 w-0.5 bg-blue-300"></div>
                )}
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-blue-500 shadow-lg"></div>
                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-600">{exp.period}</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{exp.title}</h4>
                  <p className="text-md text-gray-700 font-medium mb-2">{exp.role}</p>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Achievements</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-4 rounded-full bg-gray-200 mb-4">
                  <achievement.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills & Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gray-100 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Python", "PyTorch", "TensorFlow",
              "FastAPI", "LangGraph", "LangChain",
              "vLLM", "Triton", "TensorRT",
              "Docker", "Temporal",
              "OpenAI API", "Whisper", "Silero VAD",
              "RAG", "LLM Tool Calling", "Multi-Agent",
              "Prometheus", "Grafana",
              "Git", "GitHub Actions"
            ].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
