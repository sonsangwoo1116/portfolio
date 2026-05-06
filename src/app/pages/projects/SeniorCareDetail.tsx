import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function SeniorCareDetail() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button onClick={() => { window.location.hash = ""; }}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /><span>Back to Projects</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-purple-100 text-purple-700">LLM/RAG</span>
            <span className="text-sm text-slate-500">2025.02 - 2025.05</span>
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-slate-100 text-slate-600">(주)사운드마인드</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">시니어 케어 챗봇</h1>
          <p className="text-lg text-slate-600">LLM 기반 고령자 일일 건강체크 AI 챗봇 — 2단계 상태 머신 + 엔티티 추출</p>
        </motion.div>

        {/* 목차 */}
        <Section title="Contents" delay={0.05}>
          <nav className="grid md:grid-cols-2 gap-2">
            {["Overview", "System Design", "LLM 엔티티 추출", "YAML 프롬프트 설계", "자동 건너뛰기 + 반복 방지", "종합 요약 생성", "역할 및 Tech Stack"].map((item, i) => (
              <button key={i} onClick={() => document.getElementById(`sc-${i}`)?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-left">
                {i + 1}. {item}
              </button>
            ))}
          </nav>
        </Section>

        {/* 1. Overview */}
        <div id="sc-0">
          <Section title="1. Overview" delay={0.1}>
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">주요 성과</h4>
              <ul className="space-y-1">
                <li className="text-sm text-slate-700">• 2단계 상태 머신 — 5개 메인 상태 + 16개 서브 상태, 40+ 조건부 전이</li>
                <li className="text-sm text-slate-700">• 30+ 엔티티 키 기반 LLM 구조화 추출 + 상호 배타적 쌍 충돌 해소</li>
                <li className="text-sm text-slate-700">• 10+ YAML 프롬프트 — 서브 상태별 맞춤 대화 생성</li>
                <li className="text-sm text-slate-700">• 텍스트/음성 듀얼 입출력 (STT: WhisperX, TTS: KADI)</li>
              </ul>
            </div>
            <p className="text-base text-slate-700 leading-relaxed mb-3">
              고령자의 일일 건강 상태를 대화형으로 체크하는 AI 챗봇입니다.
              <strong>식사, 약 복용, 수면, 운동, 건강 상태</strong> 5가지 영역을 순차적으로 확인하고,
              마지막에 종합 요약과 격려 메시지를 제공합니다.
            </p>
            <p className="text-base text-slate-700 leading-relaxed">
              핵심 과제는 고령자의 비정형 답변("그냥 좀 먹었어", "아까 뭐 먹었는데")에서
              정확한 건강 정보를 추출하고, 이미 확보된 정보에 대해서는 중복 질문 없이
              자동으로 다음 단계로 넘어가는 대화 흐름을 설계하는 것이었습니다.
            </p>
          </Section>
        </div>

        {/* 2. System Design */}
        <div id="sc-1">
          <Section title="2. System Design" delay={0.15}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              메인 상태(state)와 서브 상태(sub_state)를 분리하여 대화 흐름을 제어합니다.
              메인 상태는 체크 영역(식사→약→수면→운동→건강→종합)을 결정하고,
              서브 상태는 각 영역 내에서 세부 질문의 순서와 분기를 관리합니다.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">메인 상태</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">서브 상태</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">분기 조건</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700" rowSpan={4}>meal_check</td>
                    <td className="px-4 py-2 text-xs text-slate-600">meal_eat_check</td>
                    <td className="px-4 py-2 text-xs text-slate-500">EAT_YES → food_check / EAT_NO → reason_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-600">meal_food_check</td>
                    <td className="px-4 py-2 text-xs text-slate-500">FOOD 확보 → amount_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-600">meal_amount_check</td>
                    <td className="px-4 py-2 text-xs text-slate-500">AMOUNT 확보 → drug_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-600">meal_reason_check</td>
                    <td className="px-4 py-2 text-xs text-slate-500">EAT_REASON 확보 → drug_check (2회 실패 시 강제 진행)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700" rowSpan={5}>drug_check</td>
                    <td className="px-4 py-2 text-xs text-slate-600">drug_regular_check</td>
                    <td className="px-4 py-2 text-xs text-slate-500">REGULAR_YES → taken_check / REGULAR_NO → sleep_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-600">drug_taken_check</td>
                    <td className="px-4 py-2 text-xs text-slate-500">YES → name/time 확인 게이트 / NO → reason_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-600">drug_name_check</td>
                    <td className="px-4 py-2 text-xs text-slate-500">NAME 확보 → time_check 또는 sleep_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-600">drug_time_check</td>
                    <td className="px-4 py-2 text-xs text-slate-500">TIME 확보 → sleep_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-600">drug_reason_check</td>
                    <td className="px-4 py-2 text-xs text-slate-500">REASON 확보 → sleep_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700" rowSpan={3}>sleep_check</td>
                    <td className="px-4 py-2 text-xs text-slate-600">sleep_quality_check</td>
                    <td className="px-4 py-2 text-xs text-slate-500">YES/NO 확보 → hours_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-600">sleep_hours_check</td>
                    <td className="px-4 py-2 text-xs text-slate-500">HOURS 확보 → NO면 reason_check / YES면 activity_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-600">sleep_reason_check</td>
                    <td className="px-4 py-2 text-xs text-slate-500">REASON 확보 → activity_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700" rowSpan={2}>activity_check</td>
                    <td className="px-4 py-2 text-xs text-slate-600">activity_done_check</td>
                    <td className="px-4 py-2 text-xs text-slate-500">YES → content_check / NO → reason_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-600">activity_content/reason</td>
                    <td className="px-4 py-2 text-xs text-slate-500">확보 → health_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700" rowSpan={2}>health_check</td>
                    <td className="px-4 py-2 text-xs text-slate-600">health_check_start</td>
                    <td className="px-4 py-2 text-xs text-slate-500">GOOD → end / BAD → detail_check</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-600">health_check_detail</td>
                    <td className="px-4 py-2 text-xs text-slate-500">DETAIL 확보 → end_check</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium text-slate-700">end_check</td>
                    <td className="px-4 py-2 text-xs text-slate-600">end_summary</td>
                    <td className="px-4 py-2 text-xs text-slate-500">전체 context_dict 기반 종합 요약 생성</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        {/* 3. LLM 엔티티 추출 */}
        <div id="sc-2">
          <Section title="3. LLM 엔티티 추출" delay={0.2}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              사용자 발화에서 JSON 형태의 구조화된 엔티티를 추출합니다.
              현재 상태(state)를 컨텍스트로 전달하여 모호한 답변("네", "좀 그래요")의 의미를 추론합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">엔티티 키 (30+)</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-slate-700 mb-1">식사</p>
                    <p className="text-xs text-slate-500">EAT_YES/NO, FOOD, AMOUNT, EAT_REASON</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-700 mb-1">약 복용</p>
                    <p className="text-xs text-slate-500">DRUG_REGULAR_YES/NO, DRUG_YES/NO, DRUG_NAME, DRUG_TIME, DRUG_REASON</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-700 mb-1">수면</p>
                    <p className="text-xs text-slate-500">SLEEP_YES/NO, SLEEP_HOURS, SLEEP_REASON</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-700 mb-1">운동</p>
                    <p className="text-xs text-slate-500">ACTIVITY_YES/NO, ACTIVITY_CONTENT, ACTIVITY_REASON</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-700 mb-1">건강</p>
                    <p className="text-xs text-slate-500">HEALTH_GOOD/BAD, HEALTH_DETAIL</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">상호 배타적 쌍 충돌 해소</h4>
                <p className="text-xs text-slate-600 mb-2">
                  LLM이 EAT_YES와 EAT_NO를 동시에 추출하는 할루시네이션 방지를 위해
                  코드에서 상호 배타적 쌍을 강제합니다.
                </p>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 font-mono">EAT_YES ↔ EAT_NO</p>
                  <p className="text-xs text-slate-500 font-mono">DRUG_YES ↔ DRUG_NO</p>
                  <p className="text-xs text-slate-500 font-mono">SLEEP_YES ↔ SLEEP_NO</p>
                  <p className="text-xs text-slate-500 font-mono">ACTIVITY_YES ↔ ACTIVITY_NO</p>
                  <p className="text-xs text-slate-500 font-mono">HEALTH_GOOD ↔ HEALTH_BAD</p>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  EAT_NO가 True이면 FOOD, AMOUNT 키도 자동 삭제하여
                  일관성을 유지합니다.
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* 4. YAML 프롬프트 설계 */}
        <div id="sc-3">
          <Section title="4. YAML 프롬프트 설계" delay={0.25}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              서브 상태별로 별도의 YAML 프롬프트를 관리합니다.
              각 프롬프트에 현재 state, sub_state, context(기존 수집 정보), user_input을 포맷팅하여
              LLM이 대화 흐름을 이해한 상태에서 자연스러운 후속 질문을 생성합니다.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">프롬프트 파일</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">대상 서브 상태</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["entity_prompt.yaml", "전체 — 엔티티 추출 전용"],
                    ["meal_eat_prompt.yaml", "meal_eat_check"],
                    ["meal_food_prompt.yaml", "meal_food_check"],
                    ["meal_amount_prompt.yaml", "meal_amount_check"],
                    ["meal_reason_prompt.yaml", "meal_reason_check"],
                    ["drug_check_prompt.yaml", "drug_regular/taken/name/time/reason"],
                    ["sleep_check_prompt.yaml", "sleep_quality/hours/reason"],
                    ["activity_check_prompt.yaml", "activity_done/content/reason"],
                    ["health_check_prompt.yaml", "health_check_start/detail"],
                    ["end_prompt.yaml", "end_summary — 종합 요약"],
                  ].map(([file, target], i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="px-4 py-2 text-xs font-mono text-slate-700">{file}</td>
                      <td className="px-4 py-2 text-xs text-slate-500">{target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600">
              식사 관련은 세부 질문마다 별도 프롬프트(eat/food/amount/reason)로 분리하여
              고령자 사용자에게 맞는 어투와 질문 방식을 최적화했습니다.
              약 복용/수면/운동은 카테고리별 하나의 프롬프트에서 sub_state에 따라 분기합니다.
            </p>
          </Section>
        </div>

        {/* 5. 자동 건너뛰기 + 반복 방지 */}
        <div id="sc-4">
          <Section title="5. 자동 건너뛰기 + 반복 방지" delay={0.3}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              고령자가 앞선 답변에서 이미 여러 정보를 한꺼번에 제공하는 경우가 많습니다.
              ("밥 먹고 약도 먹었어, 잠은 잘 잤어")
              이런 경우 이미 확보된 정보의 체크 단계를 자동으로 건너뜁니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">maybe_skip_state()</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-slate-600">• 각 메인 상태 진입 시 context_dict 확인</li>
                  <li className="text-xs text-slate-600">• 필수 엔티티가 이미 있으면 while 루프로 연속 건너뛰기</li>
                  <li className="text-xs text-slate-600">• drug_check: DRUG_YES+NAME+TIME 또는 DRUG_NO+REASON</li>
                  <li className="text-xs text-slate-600">• sleep_check: YES/NO + HOURS</li>
                  <li className="text-xs text-slate-600">• activity_check: YES/NO + CONTENT/REASON</li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">반복 방지 카운터</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-slate-600">• meal_reason_reask_count로 재질문 횟수 관리</li>
                  <li className="text-xs text-slate-600">• 1회 재질문 후에도 정보 없으면 강제 진행</li>
                  <li className="text-xs text-slate-600">• 고령자가 답변을 회피하는 상황 대응</li>
                  <li className="text-xs text-slate-600">• 동일 sub_state에 머물면서 프롬프트 톤만 변경</li>
                </ul>
              </div>
            </div>
          </Section>
        </div>

        {/* 6. 종합 요약 생성 */}
        <div id="sc-5">
          <Section title="6. 종합 요약 생성" delay={0.35}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              5개 영역 체크가 완료되면 end_check 상태로 전이됩니다.
              전체 context_dict를 문자열로 직렬화하여 end_prompt.yaml에 전달하고,
              LLM이 수집된 정보를 기반으로 종합 건강 요약과 격려 메시지를 스트리밍 생성합니다.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">수집 데이터 예시</h4>
              <pre className="text-xs text-slate-600 font-mono whitespace-pre-wrap">
{`EAT_YES=True, FOOD=김치찌개, AMOUNT=한 공기,
DRUG_REGULAR_YES=True, DRUG_YES=True, DRUG_NAME=혈압약, DRUG_TIME=아침 식사 후,
SLEEP_YES=True, SLEEP_HOURS=7시간,
ACTIVITY_YES=True, ACTIVITY_CONTENT=산책,
HEALTH_GOOD=True`}
              </pre>
            </div>
            <p className="text-sm text-slate-600">
              입출력은 텍스트 입력/음성 입력을 선택할 수 있고,
              출력은 텍스트 전용 또는 텍스트+TTS(KADI 기반 KSS 여성 화자)를 지원합니다.
            </p>
          </Section>
        </div>

        {/* 7. 역할 및 Tech Stack */}
        <div id="sc-6">
          <Section title="7. 역할 및 Tech Stack" delay={0.4}>
            <h4 className="text-base font-semibold text-slate-800 mb-3">역할 (단독 개발)</h4>
            <ul className="space-y-2 mb-6">
              <BulletItem text="2단계 상태 머신 설계 — 5개 메인 상태 + 16개 서브 상태, 40+ 조건부 전이 로직" />
              <BulletItem text="LLM 엔티티 추출 + 상호 배타적 쌍 충돌 해소 로직 구현" />
              <BulletItem text="10+ YAML 프롬프트 설계 — 고령자 맞춤 어투, 서브 상태별 분기" />
              <BulletItem text="자동 건너뛰기(maybe_skip_state) + 반복 방지 카운터 설계" />
              <BulletItem text="Streamlit 데모 UI + WhisperX STT + KADI TTS 통합" />
            </ul>
            <h4 className="text-base font-semibold text-slate-800 mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {["Python", "Ollama (Gemma3-27B Q4)", "LangChain", "Streamlit", "WhisperX", "KADI TTS", "YAML Prompts"].map((tag, i) => (
                <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">{tag}</span>
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
      className="bg-white rounded-xl border border-slate-200 p-6 mb-6"
    >
      <h2 className="text-xl font-bold text-slate-900 mb-4">{title}</h2>
      {children}
    </motion.div>
  );
}

function BulletItem({ text }: { text: string }) {
  return (
    <li className="text-base text-slate-700 flex items-start gap-2">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
      <span>{text}</span>
    </li>
  );
}
