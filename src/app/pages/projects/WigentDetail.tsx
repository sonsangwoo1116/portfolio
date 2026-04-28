import { motion } from "motion/react";
import { ArrowLeft, Github } from "lucide-react";

export function WigentDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button onClick={() => { window.location.hash = ""; }}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /><span>Back to Projects</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-teal-100 text-teal-700">Side Project</span>
            <span className="text-sm text-gray-500">2026.03</span>
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-yellow-100 text-yellow-700">Build with TRAE Hackathon 대상</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WIGENT — AI Agent 실시간 토론 플랫폼</h1>
          <p className="text-lg text-gray-600">Multi-Agent Orchestrator + 동적 Spawning/Retirement + 랜딩 페이지 자동 생성</p>
          <div className="mt-3">
            <a href="https://github.com/wigtn/wigent" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </motion.div>

        {/* 목차 */}
        <Section title="Contents" delay={0.05}>
          <nav className="grid md:grid-cols-2 gap-2">
            {["Overview", "Orchestrator 토론 흐름", "동적 Spawning / Retirement", "발언자 선택 알고리즘", "랜딩 페이지 생성", "역할 및 Tech Stack"].map((item, i) => (
              <button key={i} onClick={() => document.getElementById(`wg-${i}`)?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-left">
                {i + 1}. {item}
              </button>
            ))}
          </nav>
        </Section>

        {/* 1. Overview */}
        <div id="wg-0">
          <Section title="1. Overview" delay={0.1}>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">핵심 성과</h4>
              <ul className="space-y-1">
                <li className="text-sm text-gray-700">• Multi-Agent Orchestrator — GPT-4o 기반 토론 흐름 제어</li>
                <li className="text-sm text-gray-700">• 동적 에이전트 Spawning/Retirement — 12턴·22턴 자동 교체</li>
                <li className="text-sm text-gray-700">• 발언 횟수 기반 우선순위 선택 — 에이전트 독점 방지</li>
                <li className="text-sm text-gray-700">• 토론 결론 → 구조화 JSON → HTML 랜딩 페이지 자동 생성</li>
                <li className="text-sm text-gray-700">• Build with TRAE 해커톤 대상 수상</li>
              </ul>
            </div>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              주제를 던지면 PM + 도메인 전문가 AI 에이전트들이 자동으로 소환되어 실시간으로 토론하고,
              결론으로 랜딩 페이지를 자동 생성하는 Multi-Agent 토론 플랫폼입니다.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              비즈니스 아이디어 검증에 다양한 관점의 피드백이 필요하지만 전문가를 모으기 어려운 문제를 해결합니다.
              PM이 토론을 진행하고, 주제에 맞는 전문가(마케터, 기술 리드, UX 리서처 등)가 동적으로 참여합니다.
            </p>
          </Section>
        </div>

        {/* 2. Orchestrator 토론 흐름 */}
        <div id="wg-1">
          <Section title="2. Orchestrator 토론 흐름" delay={0.15}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              runDebate() 제너레이터가 전체 토론을 6단계로 오케스트레이션합니다.
              SSE(Server-Sent Events)로 각 이벤트를 실시간 스트리밍하여 클라이언트에서 즉시 렌더링합니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Step num="1" title="에이전트 생성" desc="GPT-4o JSON Mode로 주제에 맞는 전문가 에이전트 동적 생성. PM Agent는 항상 상주(isFixed)" />
                <Step num="2" title="자유 토론 루프" desc="MAX_TURNS(30턴)까지 반복. 턴마다 발언자 선택 → 프롬프트 생성 → 스트리밍 발언" />
                <Step num="3" title="디자이너 합류" desc="턴 3에서 DESIGNER_AGENT 자동 합류 — UI/UX 관점 추가" />
                <Step num="4" title="에이전트 교체" desc="턴 12·22에서 doRetireSpawn() 실행 — 기존 전문가 퇴장, 새 전문가 소환" />
                <Step num="5" title="토론 요약 + 최종 결과" desc="summarizeDebatePrompt → finalResultPrompt로 구조화된 FinalIdea 생성" />
                <Step num="6" title="랜딩 페이지 생성" desc="FinalIdea + 요약을 기반으로 GPT-4o가 완성된 HTML 스트리밍 생성" />
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-3">
              <MetricCard label="최대 턴" value="30" desc="자유 토론" />
              <MetricCard label="모델" value="GPT-4o" desc="temp 0.9" />
              <MetricCard label="타임아웃" value="30s" desc="발언당" />
              <MetricCard label="재시도" value="1회" desc="자동" />
            </div>
          </Section>
        </div>

        {/* 3. 동적 Spawning / Retirement */}
        <div id="wg-2">
          <Section title="3. 동적 Spawning / Retirement" delay={0.2}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              토론이 진행되면서 주제가 변화하면 기존 전문가를 퇴장시키고 새로운 전문가를 소환합니다.
              GPT-4o가 현재 토론 맥락을 분석하여 퇴장 메시지와 새 에이전트의 역할/성격을 결정합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">퇴장 (Retire)</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-gray-600">• 턴 12, 턴 22에서 자동 트리거</li>
                  <li className="text-xs text-gray-600">• isFixed가 아닌 온라인 에이전트 중 가장 오래된 에이전트 선택</li>
                  <li className="text-xs text-gray-600">• GPT-4o가 인수인계 메시지 생성</li>
                  <li className="text-xs text-gray-600">• status: "online" → "offline"</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">소환 (Spawn)</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-gray-600">• retireSpawnPrompt로 교체 이유 + 새 에이전트 정보 생성</li>
                  <li className="text-xs text-gray-600">• name, role, personality, color, emoji 동적 결정</li>
                  <li className="text-xs text-gray-600">• allAgents에 push 후 즉시 토론 참여</li>
                  <li className="text-xs text-gray-600">• spawn_trigger → agent_spawned SSE 이벤트</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              반려(Reject) 시에는 continueDebate()로 8턴 추가 토론을 진행합니다.
              PM이 반려 사실을 언급하며 토론을 재개하고, 동일한 요약→결과→랜딩 파이프라인을 실행합니다.
            </p>
          </Section>
        </div>

        {/* 4. 발언자 선택 알고리즘 */}
        <div id="wg-3">
          <Section title="4. 발언자 선택 알고리즘" delay={0.25}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              단순 로테이션이 아닌 발언 횟수 기반 우선순위 선택으로
              특정 에이전트가 토론을 독점하지 않도록 설계했습니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Step num="1" title="온라인 필터링" desc="status === 'online'인 에이전트만 후보" />
                <Step num="2" title="마지막 발언자 제외" desc="직전 발언자는 후보에서 제외하여 연속 발언 방지" />
                <Step num="3" title="발언 횟수 집계" desc="allMessages에서 에이전트별 발언 횟수를 Map으로 관리" />
                <Step num="4" title="최소 발언자 선택" desc="발언 횟수가 가장 적은 에이전트를 다음 발언자로 선택" />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              에이전트 간 랜덤 딜레이(800-2500ms)를 추가하여 실제 토론처럼 자연스러운 타이밍을 구현합니다.
            </p>
          </Section>
        </div>

        {/* 5. 랜딩 페이지 생성 */}
        <div id="wg-4">
          <Section title="5. 랜딩 페이지 생성" delay={0.3}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              토론이 완료되면 결론을 구조화된 FinalIdea JSON으로 합성하고,
              GPT-4o가 완성된 HTML 랜딩 페이지를 스트리밍 생성합니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Step num="1" title="토론 요약" desc="summarizeDebatePrompt — 전체 토론 내용을 구조화된 요약으로 압축" />
                <Step num="2" title="FinalIdea 생성" desc="finalResultPrompt — title, oneLiner, target 등 구조화된 JSON 추출" />
                <Step num="3" title="HTML 스트리밍" desc="landingPagePrompt → GPT-4o stream, max_tokens 16,000. 실시간 청크 전송" />
                <Step num="4" title="Fallback" desc="GPT 거부 시 FALLBACK_HTML 템플릿 사용. markdown 코드 펜스 자동 제거" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <MetricCard label="생성 타임아웃" value="180s" desc="LANDING_TIMEOUT" />
              <MetricCard label="max_tokens" value="16,000" desc="HTML 생성" />
              <MetricCard label="temperature" value="0.7" desc="창의적 생성" />
            </div>
          </Section>
        </div>

        {/* 6. 역할 및 Tech Stack */}
        <div id="wg-5">
          <Section title="6. 역할 및 Tech Stack" delay={0.35}>
            <h4 className="text-base font-semibold text-gray-800 mb-3">역할 (5인 크루 WIGTN)</h4>
            <ul className="space-y-2 mb-6">
              <BulletItem text="아이디어 제안 및 Multi-Agent Orchestrator 설계·구현" />
              <BulletItem text="동적 Spawning/Retirement 메커니즘 — 에이전트 교체 로직 및 인수인계 플로우" />
              <BulletItem text="발언 횟수 기반 발언자 선택 알고리즘 설계" />
              <BulletItem text="토론 요약 → FinalIdea → 랜딩 페이지 생성 파이프라인" />
            </ul>
            <h4 className="text-base font-semibold text-gray-800 mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {["Next.js 16", "TypeScript", "GPT-4o", "Multi-Agent Orchestration", "SSE Streaming", "Framer Motion"].map((tag, i) => (
                <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">{tag}</span>
              ))}
            </div>
          </Section>
        </div>

      </div>
    </div>
  );
}

// ── Helper Components ──

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

function Step({ num, title, desc }: { num: string; title: string; desc?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">{num}</span>
      <div>
        <span className="text-sm font-medium text-gray-800">{title}</span>
        {desc && <p className="text-xs text-gray-500 mt-0.5">{desc}</p>}
      </div>
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
    <li className="text-base text-gray-700 flex items-start gap-2">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
      <span>{text}</span>
    </li>
  );
}
