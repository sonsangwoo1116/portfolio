import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function CallbotDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => { window.location.hash = ""; }}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-700">AI Agent</span>
            <span className="text-sm text-gray-500">2026.02 ~ 진행중</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Agent 기반 콜봇 시스템</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
            <p className="text-base font-medium text-blue-700">LLM 호출 85% 절감, GPU 점유율 2.3% | RTX 3090 1장 기준 ~30채널 피크 보장</p>
          </div>
        </motion.div>

        {/* Overview */}
        <Section title="Overview" delay={0.1}>
          <p className="text-base text-gray-700 leading-relaxed">
            보험 완전판매 모니터링은 보험업법상 법적 의무이나, 수작업 전화는 통화당 인건비가 높고 인력 한계가 있습니다.
            AI 콜봇으로 자동화하되, 고객이 말을 끊거나, 우회적으로 답하거나, 갑자기 민원을 제기하는 등 비정형 대화 상황에서
            의도를 정확히 분류하면서도 GPU 자원을 효율적으로 사용하는 것이 핵심 과제였습니다.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mt-3">
            WebSocket 기반 양방향 음성 콜봇의 대화 엔진을 설계했습니다. 관리자 발신 트리거 후 AI Agent가 먼저 인사하며
            보험 완전판매 여부를 확인합니다. 공통 9문항(COM-001~COM-009) + 상품별 추가질문(현재 8개 카테고리)
            스크립트 기반 질문을 자동 수행하고, 불완전판매 징후를 실시간 탐지하여 상담사에게 이관합니다.
          </p>
        </Section>

        {/* 하이브리드 라우팅 */}
        <Section title="하이브리드 라우팅 — LLM 호출 85% 절감" delay={0.2}>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            모든 발화를 LLM에 넣으면 GPU 비용과 지연이 감당이 안 되는 문제가 있었습니다.
            5단계 파이프라인으로 단순 의도와 복잡 의도를 분리 처리했습니다.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="space-y-2">
              <Step num="1" title="regex 위험 키워드 즉시 검출" />
              <Step num="2" title='STT 오인식 가드레일 — "좋습니다"/"감사합니다" 배경소음 필터링' />
              <Step num="3" title="SLM(EXAONE 1.2B Q4_K_M) 또는 ko-sroberta semantic-router 의도 분류" />
              <Step num="4" title="문맥 기반 라우트 교정" />
              <Step num="5" title="현재 노드 유효성 검사" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <MetricCard label="RULE 경로 (85%)" value="~15ms" desc="인사·동의·긍정답변 등 8개 단순 의도 → 템플릿 응답 (LLM 미사용)" />
            <MetricCard label="HEAVY 경로 (15%)" value="LLM Tool Calling" desc="불만·위험징후·모호응답 등 10개 복잡 의도 → EXAONE 32B AWQ" />
          </div>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <MetricCard label="1통화당 LLM 호출" value="평균 2회" desc="13턴 / 4분 기준" />
            <MetricCard label="GPU 점유율" value="2.3%" desc="RTX 3090 1장" />
            <MetricCard label="SLM VRAM" value="0.8GB" desc="EXAONE 1.2B + 32B 동일 GPU 공존" />
          </div>
        </Section>

        {/* 대화 상태 머신 */}
        <Section title="대화 상태 머신 + 다층 가드레일" delay={0.3}>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            7노드 상태 머신으로 대화 흐름을 제어하고, 9개 LLM Tool(Function Calling)로 각 단계의 작업을 자동화했습니다.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm font-mono text-gray-600">
              ROOT → CONSENT → IDENTITY_VERIFICATION → MONITORING_QA → SUPPLEMENT_QA → AGENT_TRANSFER / PAYMENT_REMINDER → COMPLETED
            </p>
          </div>
          <h4 className="text-base font-semibold text-gray-800 mb-3">9개 LLM Tool</h4>
          <div className="grid md:grid-cols-3 gap-2 mb-4">
            {["get_monitoring_script", "verify_identity", "record_answer", "revise_answer", "flag_risk", "transfer_to_agent", "schedule_callback", "end_monitoring", "search_law"].map((tool, i) => (
              <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-mono text-center">{tool}</span>
            ))}
          </div>
          <h4 className="text-base font-semibold text-gray-800 mb-3">다층 가드레일</h4>
          <ul className="space-y-2">
            <BulletItem text="무관 발화(off_topic) 3단계 에스컬레이션: 1회 부드러운 안내 → 2회 강한 경고 → 3회 상담사 이관. off_topic을 절대 부정 답변으로 처리하지 않는 규칙 적용" />
            <BulletItem text="명확화 요청(ask_reason/ask_explanation) 누적 5회 제한: 초과 시 상담사 이관" />
            <BulletItem text="노드 재시도 5회 제한: 유효하지 않은 라우트 연속 5회 → 상담사 이관 제안" />
            <BulletItem text="불완전판매 징후 실시간 탐지: 기대 답변과 실제 답변 교차 비교 → 즉시 flag_risk + AGENT_TRANSFER" />
          </ul>
        </Section>

        {/* 본인확인 */}
        <Section title="본인확인 — 한국어 생년월일 5단계 파싱" delay={0.35}>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            STT 특성상 숫자가 다양한 형태로 인식됩니다. "공공년 칠월 육일", "영영년 7월 6일", "00 76" 등을
            모두 처리할 수 있는 5단계 파싱을 구현했습니다.
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              <Step num="1" title="한국어 년/월/일 구조 매칭" />
              <Step num="2" title="한국어 → 숫자 변환" />
              <Step num="3" title="숫자 그룹 분리" />
              <Step num="4" title="2그룹 스마트 해석" />
              <Step num="5" title="순수 숫자 추출 폴백" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            6자리 ↔ 8자리(YYYYMMDD) 크로스 비교, 불일치 시 1회 재확인 후 상담사 이관
          </p>
        </Section>

        {/* 채널 용량 */}
        <Section title="채널 용량 분석" delay={0.4}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">GPU 구성</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">처리량</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">권장 동시 채널</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">근거</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 bg-blue-50">
                  <td className="px-4 py-2 font-medium">RTX 3090 ×1 (현재 운영)</td>
                  <td className="px-4 py-2">~18 req/s</td>
                  <td className="px-4 py-2 font-bold text-blue-700">5채널</td>
                  <td className="px-4 py-2 text-gray-600">실측 — P50: 1ch 45ms / 5ch 154ms</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-2">RTX 3090 ×2 (TP=2)</td>
                  <td className="px-4 py-2">-</td>
                  <td className="px-4 py-2 font-bold">~100채널</td>
                  <td className="px-4 py-2 text-gray-600">이론 추정</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-2">A100 80GB ×1</td>
                  <td className="px-4 py-2">-</td>
                  <td className="px-4 py-2 font-bold">~300채널</td>
                  <td className="px-4 py-2 text-gray-600">이론 추정</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* 역할 및 협업 */}
        <Section title="역할 및 협업" delay={0.45}>
          <ul className="space-y-2">
            <BulletItem text="음성 AI 전체(STT/VAD/상태 머신) 설계·구현을 주도" />
            <BulletItem text="팀원의 LLM tool calling 개발을 코칭하며 병행 진행" />
            <BulletItem text="음성 파이프라인과 대화 로직의 인터페이스를 정의하여 각자 독립 개발이 가능한 구조 설계" />
          </ul>
        </Section>

        {/* Tech Stack */}
        <Section title="Tech Stack" delay={0.5}>
          <div className="flex flex-wrap gap-2">
            {["Python", "FastAPI", "WebSocket", "LLM Tool Calling", "EXAONE 1.2B", "EXAONE 32B AWQ", "Qwen3-ASR", "Silero VAD", "ko-sroberta", "YAML Prompts"].map((tag, i) => (
              <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">{tag}</span>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

// Helper components
function Section({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </motion.div>
  );
}

function Step({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">{num}</span>
      <span className="text-sm text-gray-700">{title}</span>
    </div>
  );
}

function MetricCard({ label, value, desc }: { label: string; value: string; desc: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-lg font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-xs text-gray-600">{desc}</div>
    </div>
  );
}

function BulletItem({ text }: { text: string }) {
  return (
    <li className="text-sm text-gray-700 flex items-start gap-2">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
      <span>{text}</span>
    </li>
  );
}
