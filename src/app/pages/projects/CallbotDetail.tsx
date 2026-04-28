import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function CallbotDetail() {
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
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-700">AI Agent</span>
            <span className="text-sm text-gray-500">2026.02 ~ 진행중</span>
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-600">(주)사운드마인드</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Agent 기반 콜봇 시스템</h1>
          <p className="text-lg text-gray-600">보험 완전판매 모니터링 자동화를 위한 양방향 음성 콜봇 대화 엔진</p>
        </motion.div>

        {/* ── 목차 ── */}
        <Section title="Contents" delay={0.05}>
          <nav className="grid md:grid-cols-2 gap-2">
            {["Overview", "System Architecture", "하이브리드 라우팅", "대화 상태 머신 + 가드레일", "본인확인 파싱", "채널 용량 분석", "역할 및 협업", "Tech Stack"].map((item, i) => (
              <a key={i} href={`#callbot-${i}`} className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                {i + 1}. {item}
              </a>
            ))}
          </nav>
        </Section>

        {/* ── 1. Overview ── */}
        <div id="callbot-0">
          <Section title="1. Overview" delay={0.1}>
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">핵심 성과</h4>
              <ul className="space-y-1">
                <li className="text-sm text-blue-700">• LLM 호출 85% 절감, GPU 점유율 2.3%</li>
                <li className="text-sm text-blue-700">• 7노드 상태 머신 + 9개 LLM Tool Calling</li>
                <li className="text-sm text-blue-700">• RTX 3090 1장 기준 5채널 실측, ~30채널 이론 보장</li>
                <li className="text-sm text-blue-700">• 다층 가드레일로 비정형 대화 안정 처리</li>
              </ul>
            </div>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              보험 완전판매 모니터링은 보험업법상 법적 의무이나, 수작업 전화는 통화당 인건비가 높고 인력 한계가 있습니다.
              AI 콜봇으로 자동화하되, <strong>고객이 말을 끊거나, 우회적으로 답하거나, 갑자기 민원을 제기하는 등
              비정형 대화 상황에서 의도를 정확히 분류하면서도 GPU 자원을 효율적으로 사용하는 것</strong>이 핵심 과제였습니다.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              WebSocket 기반 양방향 음성 콜봇의 대화 엔진을 설계했습니다. 관리자 발신 트리거 후 AI Agent가 먼저 인사하며
              보험 완전판매 여부를 확인합니다. 공통 9문항 + 상품별 추가질문(8개 카테고리) 스크립트 기반 질문을 자동 수행하고,
              불완전판매 징후를 실시간 탐지하여 상담사에게 이관합니다.
            </p>
          </Section>
        </div>

        {/* ── 2. System Architecture ── */}
        <div id="callbot-1">
          <Section title="2. System Architecture" delay={0.15}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              브라우저 클라이언트 ↔ STT/LLM/TTS 백엔드 구조로, PSTN 게이트웨이 미연동 상태의 WebSocket 기반 양방향 시스템입니다.
            </p>
            <ImagePlaceholder label="시스템 아키텍처 다이어그램 — Client ↔ WebSocket ↔ STT → 라우팅 → LLM/템플릿 → TTS" />
            <div className="mt-4 grid md:grid-cols-3 gap-3">
              <MetricCard label="듀얼 SLM" value="0.8GB VRAM" desc="EXAONE 1.2B + 32B 동일 GPU 공존" />
              <MetricCard label="의도 분류" value="10-class" desc="SLM + semantic-router 앙상블" />
              <MetricCard label="STT" value="Qwen3-ASR" desc="Silero VAD 기반 음성 구간 감지" />
            </div>
          </Section>
        </div>

        {/* ── 3. 하이브리드 라우팅 ── */}
        <div id="callbot-2">
          <Section title="3. 하이브리드 라우팅 — LLM 호출 85% 절감" delay={0.2}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              모든 발화를 LLM에 넣으면 GPU 비용과 지연이 감당이 안 되는 문제가 있었습니다.
              5단계 파이프라인으로 단순 의도와 복잡 의도를 분리 처리하여 해결했습니다.
            </p>
            <ImagePlaceholder label="5단계 하이브리드 라우팅 플로우차트" />
            <div className="bg-gray-50 rounded-lg p-4 my-4">
              <div className="space-y-3">
                <Step num="1" title="regex 위험 키워드 즉시 검출" desc="정규식 기반 위험 패턴 매칭으로 즉시 분기" />
                <Step num="2" title="STT 오인식 가드레일" desc='"좋습니다"/"감사합니다" 등 배경소음 오인식 필터링' />
                <Step num="3" title="SLM 의도 분류" desc="EXAONE 1.2B (Q4_K_M) 10-class 분류 또는 ko-sroberta semantic-router" />
                <Step num="4" title="문맥 기반 라우트 교정" desc="현재 노드 상태와 이전 대화 맥락을 고려한 보정" />
                <Step num="5" title="현재 노드 유효성 검사" desc="라우팅 결과가 현재 상태 머신 노드에서 유효한지 검증" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-green-800 mb-1">RULE 경로 (85%)</div>
                <div className="text-2xl font-bold text-green-700 mb-1">~15ms</div>
                <div className="text-xs text-green-600">인사·동의·긍정답변·콜백요청 등 8개 단순 의도 → 템플릿 응답 (LLM 미사용)</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-orange-800 mb-1">HEAVY 경로 (15%)</div>
                <div className="text-2xl font-bold text-orange-700 mb-1">LLM Tool Calling</div>
                <div className="text-xs text-orange-600">불만·위험징후·모호응답 등 10개 복잡 의도 → EXAONE 32B AWQ</div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <MetricCard label="1통화당 LLM 호출" value="평균 2회" desc="13턴 / 4분 기준" />
              <MetricCard label="GPU 점유율" value="2.3%" desc="RTX 3090 1장" />
              <MetricCard label="RULE 경로 비율" value="85%" desc="LLM 완전 우회" />
            </div>
            <ImagePlaceholder label="RULE 경로 vs HEAVY 경로 분기 동작 스크린샷" />
          </Section>
        </div>

        {/* ── 4. 대화 상태 머신 ── */}
        <div id="callbot-3">
          <Section title="4. 대화 상태 머신 + 다층 가드레일" delay={0.25}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              7노드 상태 머신으로 대화 흐름을 제어하고, 9개 LLM Tool(Function Calling)로 각 단계의 작업을 자동화했습니다.
              각 노드에서 기대 답변과 실제 답변을 교차 비교하여 불완전판매 징후를 실시간 탐지합니다.
            </p>
            <ImagePlaceholder label="7노드 상태 머신 다이어그램" />
            <div className="bg-gray-50 rounded-lg p-4 my-4">
              <p className="text-sm font-mono text-gray-600 text-center">
                ROOT → CONSENT → IDENTITY_VERIFICATION → MONITORING_QA → SUPPLEMENT_QA → AGENT_TRANSFER / PAYMENT_REMINDER → COMPLETED
              </p>
            </div>

            <h4 className="text-base font-semibold text-gray-800 mb-3">9개 LLM Tool</h4>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {["get_monitoring_script", "verify_identity", "record_answer", "revise_answer", "flag_risk", "transfer_to_agent", "schedule_callback", "end_monitoring", "search_law"].map((tool, i) => (
                <span key={i} className="px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-xs font-mono text-center border border-purple-200">{tool}</span>
              ))}
            </div>

            <h4 className="text-base font-semibold text-gray-800 mb-3">다층 가드레일</h4>
            <div className="space-y-3">
              <GuardrailItem title="off_topic 3단계 에스컬레이션" desc="1회 부드러운 안내 → 2회 강한 경고 → 3회 상담사 이관. off_topic을 절대 부정 답변으로 처리하지 않는 규칙 적용" />
              <GuardrailItem title="명확화 요청 제한" desc="ask_reason/ask_explanation 누적 5회 초과 시 상담사 이관" />
              <GuardrailItem title="노드 재시도 제한" desc="유효하지 않은 라우트 연속 5회 → 상담사 이관 제안" />
              <GuardrailItem title="불완전판매 징후 실시간 탐지" desc='예: COM-009("설계사가 강요했나요?") 기대="no"인데 고객이 긍정 답변 → 즉시 flag_risk + AGENT_TRANSFER' />
            </div>
            <ImagePlaceholder label="상태 머신 기반 대화 진행 화면 — 노드 전환 및 Tool Calling 동작" />
            <ImagePlaceholder label="가드레일 동작 — off_topic 에스컬레이션 / 불완전판매 징후 탐지 화면" />
          </Section>
        </div>

        {/* ── 5. 본인확인 ── */}
        <div id="callbot-4">
          <Section title="5. 본인확인 — 한국어 생년월일 5단계 파싱" delay={0.3}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              STT 특성상 숫자가 다양한 형태로 인식됩니다. "공공년 칠월 육일", "영영년 7월 6일", "00 76" 등을
              모두 처리할 수 있는 5단계 파싱을 구현했습니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Step num="1" title="한국어 년/월/일 구조 매칭" />
                <Step num="2" title="한국어 → 숫자 변환" />
                <Step num="3" title="숫자 그룹 분리" />
                <Step num="4" title="2그룹 스마트 해석" />
                <Step num="5" title="순수 숫자 추출 폴백" />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              6자리 ↔ 8자리(YYYYMMDD) 크로스 비교, 불일치 시 1회 재확인 후 상담사 이관
            </p>
            <ImagePlaceholder label="본인확인 생년월일 파싱 동작 — 다양한 STT 인식 형태 처리 화면" />
          </Section>
        </div>

        {/* ── 6. 채널 용량 ── */}
        <div id="callbot-5">
          <Section title="6. 채널 용량 분석" delay={0.35}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              RTX 3090 실측 데이터 기반으로 채널 용량을 분석하고, 상위 GPU 확장 시 이론 추정치를 산출했습니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">GPU 구성</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">처리량</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">권장 동시 채널</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">근거</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 bg-blue-50">
                    <td className="px-4 py-3 font-medium">RTX 3090 ×1 (현재)</td>
                    <td className="px-4 py-3">~18 req/s</td>
                    <td className="px-4 py-3 font-bold text-blue-700">5채널</td>
                    <td className="px-4 py-3 text-gray-600">실측 — P50: 1ch 45ms / 5ch 154ms</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3">RTX 3090 ×2 (TP=2)</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3 font-bold">~100채널</td>
                    <td className="px-4 py-3 text-gray-600">이론 추정</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3">A100 80GB ×1</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3 font-bold">~300채널</td>
                    <td className="px-4 py-3 text-gray-600">이론 추정</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3">H100 80GB ×1</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3 font-bold">~600채널</td>
                    <td className="px-4 py-3 text-gray-600">이론 추정</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">* RTX 3090 외 GPU 수치는 모델 추론 시간 기반 자체 산출치, 미실측</p>
          </Section>
        </div>

        {/* ── 7. 역할 및 협업 ── */}
        <div id="callbot-6">
          <Section title="7. 역할 및 협업" delay={0.4}>
            <ul className="space-y-3">
              <BulletItem text="음성 AI 전체(STT/VAD/상태 머신) 설계·구현을 주도" />
              <BulletItem text="팀원의 LLM Tool Calling 개발을 코칭하며 병행 진행" />
              <BulletItem text="음성 파이프라인과 대화 로직의 인터페이스를 정의하여 각자 독립 개발이 가능한 구조 설계" />
            </ul>
          </Section>
        </div>

        {/* ── 8. Tech Stack ── */}
        <div id="callbot-7">
          <Section title="8. Tech Stack" delay={0.45}>
            <div className="flex flex-wrap gap-2">
              {["Python", "FastAPI", "WebSocket", "LLM Tool Calling", "EXAONE 1.2B (Q4_K_M)", "EXAONE 32B AWQ", "Qwen3-ASR", "Silero VAD", "ko-sroberta", "YAML Prompts"].map((tag, i) => (
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

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 flex items-center justify-center min-h-[200px] my-4">
      <div className="text-center">
        <div className="text-gray-400 text-4xl mb-2">🖼️</div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xs text-gray-400 mt-1">이미지 준비 중</p>
      </div>
    </div>
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

function GuardrailItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
      <div className="text-sm font-semibold text-red-800 mb-1">{title}</div>
      <div className="text-xs text-red-700">{desc}</div>
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
