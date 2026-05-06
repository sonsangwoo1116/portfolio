import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { DemoImage } from "../../components/DemoImage";

export function CallbotDetail() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button onClick={() => { window.location.hash = ""; }}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /><span>Back to Projects</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-700">AI Agent</span>
            <span className="text-sm text-slate-500">2026.03 ~ 진행중</span>
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-slate-100 text-slate-600">(주)사운드마인드</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Agent 기반 콜봇 시스템</h1>
          <p className="text-lg text-slate-600">보험 완전판매 모니터링 자동화를 위한 양방향 음성 콜봇 대화 엔진</p>
        </motion.div>

        {/* 목차 */}
        <Section title="Contents" delay={0.05}>
          <nav className="grid md:grid-cols-2 gap-2">
            {["Overview", "9B + 코드 가드 하이브리드 라우팅", "대화 상태 머신 + sub-room", "본인확인 파싱", "불완전판매 감지 + 상담사 이관", "욕설 감지 + 차단", "역할 및 협업", "Tech Stack"].map((item, i) => (
              <button key={i} onClick={() => document.getElementById(`callbot-${i}`)?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-left">
                {i + 1}. {item}
              </button>
            ))}
          </nav>
        </Section>

        {/* 1. Overview */}
        <div id="callbot-0">
          <Section title="1. Overview" delay={0.1}>
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">핵심 성과</h4>
              <ul className="space-y-1">
                <li className="text-sm text-slate-700">• 엣지 테스트 52/52 PASS (E1~E12 분류 정확도 100%)</li>
                <li className="text-sm text-slate-700">• 5채널 동시 통화 P50 154ms / P99 300ms 미만 (RTX 3090 단일 GPU, 9B)</li>
                <li className="text-sm text-slate-700">• 비동기 히스토리 요약으로 입력 토큰 47% 감축 (3735 → 1985)</li>
                <li className="text-sm text-slate-700">• 9노드 상태 머신 + 10개 LLM Tool Calling + 3중 안전망</li>
              </ul>
            </div>
            <p className="text-base text-slate-700 leading-relaxed mb-3">
              보험 완전판매 모니터링은 보험업법상 법적 의무이나, 수작업 전화는 통화당 인건비가 높고 인력 한계가 있습니다.
              AI 콜봇으로 자동화하되, <strong>고객이 말을 끊거나, 우회적으로 답하거나, 갑자기 민원을 제기하는 등
              비정형 대화 상황에서 의도를 정확히 분류하면서도 GPU 자원을 효율적으로 사용하는 것</strong>이 핵심 과제였습니다.
            </p>
            <p className="text-base text-slate-700 leading-relaxed mb-3">
              WebSocket 기반 양방향 음성 콜봇의 대화 엔진을 설계했습니다. 관리자 발신 트리거 후 AI Agent가 먼저 인사하며
              보험 완전판매 여부를 확인합니다. 공통 9문항 + 상품별 추가질문(8개 카테고리) 스크립트 기반 질문을 자동 수행하고,
              불완전판매 징후를 실시간 탐지하여 상담사에게 이관합니다.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              아키텍처는 4단계에 걸쳐 진화했습니다. 초기 SLM 분류 기반 2-tier 라우팅에서 시작하여,
              위험 발화 누락 보완을 위한 조건부 강제 escalation을 추가했고,
              모델 성능이 충분해지자 단일 LLM 구조로 단순화했으나 9B급 모델의 한국어 의미 구분 한계가 드러나
              현재의 LLM + 코드 가드 하이브리드 구조로 최종 정착했습니다.
            </p>
            <DemoImage src="/portfolio/callbot-1.png" alt="4가지 핵심 기능" caption="01 본인확인 + 자동 모니터링 / 02 불완전판매 위험 자동 감지 / 03 욕설 자동 감지 + 차단 / 04 자동 응대 + 실시간 상담사 이관" />
          </Section>
        </div>

        {/* 2. 하이브리드 라우팅 */}
        <div id="callbot-1">
          <Section title="2. 9B + 코드 가드 하이브리드 라우팅" delay={0.15}>
            <p className="text-base text-slate-700 leading-relaxed mb-3">
              9B급 한국어 LLM은 동사 의미 구분("받았지" vs "들이받았지"), 감탄사 분류, 답변 번복 인지에서 한계가 명확했습니다.
              LLM은 그대로 두고, 모델이 못 잡는 케이스를 코드 레벨 가드 5단계로 보완하는 구조입니다.
            </p>
            <p className="text-sm text-slate-500 mb-4">
              별도 라우터 모듈 없이, 가드 체인 자체가 라우터 역할을 합니다. 발화가 어떤 처리 경로로 갈지 순차적으로 결정합니다.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 my-4">
              <div className="space-y-3">
                <Step num="1" title="욕설 키워드 검출" desc="STT 출력 특성에 맞춘 정규식 패턴 — 1회 경고, 2회 이관. LLM 호출 없이 즉시 처리" />
                <Step num="2" title="STT 오인식 가드" desc="비어있거나 무의미한 STT 출력 필터링 — 직전 봇 응답을 그대로 재발화하여 자연스럽게 재응답 유도" />
                <Step num="3" title="대기 요청 가드" desc={'"잠시만요" 등 대기 표현 감지 — 침묵 타이머 연장 + 안내 멘트'} />
                <Step num="4" title="답변 번복 감지" desc={'"아까 못 들었어요", "다시 생각해보니" 등 번복 패턴 — 9B 모델이 번복을 잘 잡지 못해 regex가 더 안정적'} />
                <Step num="5" title="Fast path" desc={'"네/예/응" 등 단순 긍정 → LLM 호출 생략. 단, expected="no" 질문("강요받으신 적 있나요?")에서는 "네"가 위험 응답이므로 스킵'} />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">
                <strong>위 5단계 모두 미해당 시</strong> → LLM Tool Calling (9B)으로 위임.
                LLM이 채운 분류 결과는 다시 STEP 일관성 검증(step1_verb / step2_match / step3_unrelated)을 거쳐 코드가 최종 교정합니다.
              </p>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mb-3">왜 이렇게 쌓았나</h4>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-slate-700">
                <strong>Fast path:</strong> 모니터링 질문의 압도적 다수 응답이 "네"이므로 LLM 호출 비용 낭비.
                단, expected="no" 질문에서는 "네"가 위험 응답이라 fast path를 스킵합니다.
              </div>
              <div className="text-sm text-slate-700">
                <strong>답변 번복 별도 가드:</strong> 9B 모델이 revise_answer tool을 잘못 트리거하거나 무시하는 케이스가 반복되어,
                regex가 더 안정적이라 판단하고 코드로 가져왔습니다.
              </div>
              <div className="text-sm text-slate-700">
                <strong>위험 감지 LLM 위임:</strong> 처음에는 위험 감지도 keyword regex였으나,
                LLM이 risk_suspected 필드로 직접 판단하도록 옮기고 regex는 fallback(LLM 누락 안전망)으로 강등했습니다.
              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mb-3">성능 지표 (RTX 3090, 9B BF16)</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <MetricCard label="TTFT P50 (1채널)" value="45ms" desc="RTX 3090 단일 GPU" />
              <MetricCard label="TTFT P50 (5채널)" value="154ms" desc="5채널 동시 통화" />
              <MetricCard label="P99 TTFT (5채널)" value="< 300ms" desc="권장 동시 채널 기준" />
              <MetricCard label="TPOT" value="21~29ms" desc="토큰당 출력 시간" />
              <MetricCard label="포화 처리량" value="~18 req/s" desc="최대 동시 처리" />
              <MetricCard label="엣지 테스트" value="52/52 PASS" desc="E1~E12 분류 정확도 100%" />
            </div>

            <h4 className="text-base font-semibold text-slate-800 mt-6 mb-3">토큰 최적화</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <MetricCard label="입력 토큰 감축" value="47%" desc="비동기 히스토리 요약 (3735 → 1985 토큰)" />
              <MetricCard label="시스템 프롬프트 절감" value="약 600 토큰" desc="네이티브 tool calling 전환" />
            </div>
          </Section>
        </div>

        {/* 3. 대화 상태 머신 */}
        <div id="callbot-2">
          <Section title="3. 대화 상태 머신 + sub-room" delay={0.2}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              9노드 상태 머신으로 대화 흐름을 제어하고, 10개 LLM Tool(Function Calling)로 각 단계의 작업을 자동화했습니다.
              각 노드는 별도 핸들러로 분리되어 있고, 엔진의 process 함수는 노드 라우터 역할만 합니다.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 my-4">
              <p className="text-sm font-mono text-slate-600 text-center leading-relaxed">
                ROOT → CONSENT → IDENTITY_VERIFICATION → MONITORING_QA → SUPPLEMENT_QA
                <br />→ AGENT_TRANSFER | PAYMENT_REMINDER → COMPLETED
                <br /><span className="text-slate-400">[+ RECONNECT: 재발신 시 동의 대기]</span>
              </p>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mb-3">sub-room 메커니즘</h4>
            <p className="text-sm text-slate-700 mb-3">
              LLM이 분류한 답변(positive/negative/unclear/skipped)에 따라 메인 노드를 떠나지 않고 자식 방으로 잠깐 우회합니다.
            </p>
            <div className="space-y-2 mb-6">
              <GuardrailItem title="clarify" desc="답변이 모호할 때 진입. 1회차는 LLM이 상세 설명 생성, 2회차부터는 고정 텍스트로 전환 — LLM이 추가 설명을 제대로 참조하지 못하는 한계를 코드가 보완" />
              <GuardrailItem title="redirect" desc="무관한 답변(off-topic) 시 고정 안내 멘트로 질문 복귀 유도" />
              <GuardrailItem title="supplement" desc="부정 답변 시 보완 모니터링(SUPPLEMENT_QA) 흐름으로 전환" />
            </div>

            <h4 className="text-base font-semibold text-slate-800 mb-3">카운터 기반 강제 이관</h4>
            <p className="text-sm text-slate-700 mb-3">
              질문 ID별로 3종 카운터(모호 답변, 부정 답변, 전체 합산)를 추적하여 무한 루프를 방지합니다.
            </p>
            <div className="space-y-2 mb-6">
              <GuardrailItem title="개별 카운터 3회" desc="같은 질문에 모호 또는 부정 답변 3회 반복 시 상담사 이관" />
              <GuardrailItem title="합산 카운터 5회" desc="같은 질문에 총 5회 응답 실패 시 강제 이관" />
              <GuardrailItem title="소프트 안내" desc="개별 2회 또는 합산 4회 도달 시 '답변이 어려우시면 상담원에게 연결해 드릴 수 있습니다' 문구 강제 삽입" />
            </div>

            <h4 className="text-base font-semibold text-slate-800 mb-3">10개 LLM Tool</h4>
            <div className="grid grid-cols-3 gap-2">
              {["get_monitoring_script", "verify_identity", "record_answer", "revise_answer", "request_revision_confirmation", "flag_risk", "transfer_to_agent", "schedule_callback", "end_monitoring", "search_law"].map((tool, i) => (
                <span key={i} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-mono text-center border border-blue-100">{tool}</span>
              ))}
            </div>
          </Section>
        </div>

        {/* 4. 본인확인 */}
        <div id="callbot-3">
          <Section title="4. 본인확인 — 한국어 생년월일 파싱" delay={0.25}>
            <p className="text-base text-slate-700 leading-relaxed mb-3">
              STT 특성상 숫자가 다양한 형태로 인식됩니다. "공공년 칠월 육일", "팔칠년 일월 이일", "00 76" 등을
              모두 처리할 수 있는 다단계 파싱을 구현했습니다.
            </p>
            <p className="text-sm text-slate-500 mb-4">
              생년월일 파싱은 입력 패턴이 다양하지만 결정론적이고 숫자 비교가 핵심이라,
              LLM보다 정규식 다단계 fallback이 더 정확하고 빠릅니다.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Step num="0" title="어미 제거 + 합성수 선처리" desc={'"이천년 칠월 6일이요" → 어미(이요/입니다 등) 제거, "이십삼" → 23 변환'} />
                <Step num="1" title="년/월/일 구조 매칭" desc={'"공공년 칠월 6일" → 한국어 숫자 허용 정규식으로 년/월/일 분리'} />
                <Step num="2a" title="한글 → 아라비아 변환 후 재시도" desc={'"팔칠년 일월 이일" → "87년 1월 2일"로 치환 후 다시 매칭'} />
                <Step num="2b" title="숫자 그룹 분리" desc={'"00 76" → 숫자 덩어리 분리, 3개면 (Y,M,D), 2개면 길이별 분해'} />
                <Step num="2c" title="순수 숫자 추출 (최종 fallback)" desc="위 단계 실패 시 모든 숫자만 추출하여 6자리 조합" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              DB 저장 형식이 YYMMDD일 수도 YYYYMMDD일 수도 있어 4가지 조합으로 크로스 비교. 5회 실패 시 자동 이관.
            </p>
            <DemoImage src="/portfolio/callbot-2.png" alt="본인확인 통화 화면" caption="모바일 통화 + 채팅 UI — 주민등록번호 앞 6자리 본인확인 후 보험 계약 확인 모니터링 자동 진행" />
          </Section>
        </div>

        {/* 5. 불완전판매 감지 + 상담사 이관 */}
        <div id="callbot-4">
          <Section title="5. 불완전판매 감지 + 상담사 이관" delay={0.3}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              LLM 1차 판단 + 키워드 fallback 2차 안전망 + expected=no 정답 차단의 3중 구조로
              불완전판매 징후를 빠짐없이 탐지합니다.
            </p>

            <h4 className="text-base font-semibold text-slate-800 mb-3">3중 안전망</h4>
            <div className="space-y-3 mb-4">
              <GuardrailItem title="1차: LLM risk_suspected 필드" desc="record_answer tool 호출 시 risk_suspected(bool), risk_type(5종: 설계사 대리, 설명 미이행, 계약 미인지, 민원, 사기), risk_evidence(근거)를 함께 채우게 하여 답변 분류와 위험 판단을 한 번의 호출로 통합" />
              <GuardrailItem title="2차: 키워드 fallback" desc="LLM이 risk_suspected=false로 보냈어도 명백한 위험 키워드가 있으면 강제 escalate — 9B의 위험 누락을 보완하는 안전망" />
              <GuardrailItem title="expected=no 정답 차단" desc={'"강요받으신 적 있나요?"에 "아니요"는 정답이지 위험이 아님. LLM이 부정 답변을 위험으로 잡아도 expected=no 질문이면 무시'} />
            </div>

            <h4 className="text-base font-semibold text-slate-800 mb-3">STEP 일관성 검증</h4>
            <p className="text-sm text-slate-700 mb-3">
              LLM이 채운 step1_verb(동사 존재) / step2_match(질문-답변 매칭) / step3_unrelated(무관 여부) 필드 간
              모순을 코드가 검증하여 최종 분류를 교정합니다.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-3 py-2 text-left font-semibold text-slate-700 border-b">모순 패턴</th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700 border-b">교정</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100"><td className="px-3 py-2 text-slate-600">무관 명사 + positive/negative</td><td className="px-3 py-2 text-slate-600">→ skipped</td></tr>
                  <tr className="border-b border-slate-100"><td className="px-3 py-2 text-slate-600">동사 없음 + positive</td><td className="px-3 py-2 text-slate-600">→ skipped (감탄사)</td></tr>
                  <tr className="border-b border-slate-100"><td className="px-3 py-2 text-slate-600">매칭 안 됨 + 부정 키워드</td><td className="px-3 py-2 text-slate-600">→ negative</td></tr>
                  <tr className="border-b border-slate-100"><td className="px-3 py-2 text-slate-600">expected=no + 명백한 부정어 + positive</td><td className="px-3 py-2 text-slate-600">→ negative (정반대 분류 교정)</td></tr>
                  <tr><td className="px-3 py-2 text-slate-600">명확한 부정 패턴 + unclear/skipped</td><td className="px-3 py-2 text-slate-600">→ negative</td></tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mb-3">이관 흐름</h4>
            <p className="text-sm text-slate-700 mb-4">
              위험 감지 시 고정 멘트로 안내 후 상담사에게 이관합니다. 이관 멘트는 LLM이 생성하지 않고 고정 문구를 사용하며,
              비동기로 LLM에게 이관 브리핑(대화 맥락 요약)을 생성시켜 관리자에게 전달합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <DemoImage src="/portfolio/callbot-8.png" alt="불완전판매 감지 → 상담원 연결" caption="모바일 — 보험 가입 확인 중 불완전판매 징후 감지 시 전문 상담원 자동 연결" />
              <DemoImage src="/portfolio/callbot-5.png" alt="실시간 대화 + 이관 브리핑" caption="관리자 — 이관 브리핑 + 실시간 대화 + 대화 이력 조회" />
            </div>
            <DemoImage src="/portfolio/callbot-3.png" alt="관리자 알림 센터" caption="관리자 알림 센터 — 위험 감지 알림, 모니터링 항목 체크리스트 (확인/부정/미확인), AI 브리핑 자동 생성" />
            <DemoImage src="/portfolio/callbot-10.png" alt="상담사 이관 상세" caption="관리자 알림 센터 상세 — AI가 대화 맥락을 분석하여 상담사에게 전달할 브리핑 자동 생성" />
          </Section>
        </div>

        {/* 6. 욕설 감지 + 차단 */}
        <div id="callbot-5">
          <Section title="6. 욕설 감지 + 차단" delay={0.35}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              키워드 1차 + LLM 보조 2차, 두 경로가 같은 카운터를 공유하여 회피 시도를 차단합니다.
            </p>

            <h4 className="text-base font-semibold text-slate-800 mb-3">듀얼 감지 경로</h4>
            <div className="space-y-2 mb-4">
              <GuardrailItem title="1차: 키워드 매칭" desc="음성 입력 특성에 맞춰 STT 변형까지 커버하는 정규식 패턴. 초성 변형(ㅅㅂ)이나 영문 욕설은 STT에서 나오지 않으므로 제외하고, 띄어쓰기 변형만 허용" />
              <GuardrailItem title="2차: LLM 보조" desc="record_answer tool에 profanity_suspected 필드 추가. 키워드에 안 잡힌 변형 욕설(새 비속어, 풍자성 표현)을 LLM이 보조 판단. 단순 거절·놀람은 false 처리" />
            </div>

            <h4 className="text-base font-semibold text-slate-800 mb-3">1회 경고 / 2회 이관</h4>
            <p className="text-sm text-slate-700 mb-4">
              두 경로 모두 같은 카운터를 증가시킵니다. 1차에서 1회, 2차에서 1회 잡혀도 합쳐서 2회가 되면 즉시 이관.
              이관 시 risk_flags에 기록하고 관리자에게 실시간 알림을 전송합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <DemoImage src="/portfolio/callbot-6.png" alt="욕설 탐지 모바일" caption="욕설 탐지 1/2 경고 → 2/2 반복 시 상담사 강제 이관" />
              <DemoImage src="/portfolio/callbot-7.png" alt="욕설 탐지 관리자" caption="관리자 모니터링 결과 — profanity 감지 상세 (리스크: 욕설, 결과: 이관 처리)" />
            </div>
          </Section>
        </div>

        {/* 7. 역할 및 협업 */}
        <div id="callbot-6">
          <Section title="7. 역할 및 협업" delay={0.4}>
            <ul className="space-y-3">
              <BulletItem text="음성 및 대화 엔진 전체(STT/VAD/상태 머신/코드 가드 체인/Tool 스키마) 설계·구현을 주도" />
              <BulletItem text="팀원의 LLM Tool Calling 개발을 코칭하며 병행 진행" />
              <BulletItem text="음성 파이프라인과 대화 로직의 인터페이스를 정의하여 각자 독립 개발이 가능한 구조 설계" />
            </ul>
          </Section>
        </div>

        {/* 8. Tech Stack */}
        <div id="callbot-7">
          <Section title="8. Tech Stack" delay={0.45}>
            <div className="flex flex-wrap gap-2">
              {["Python", "FastAPI", "WebSocket", "LLM Tool Calling", "EXAONE 9B", "Qwen3-ASR", "Silero VAD", "YAML Prompts"].map((tag, i) => (
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

function Step({ num, title, desc }: { num: string; title: string; desc?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">{num}</span>
      <div>
        <span className="text-sm font-medium text-slate-800">{title}</span>
        {desc && <p className="text-xs text-slate-500 mt-0.5">{desc}</p>}
      </div>
    </div>
  );
}

function MetricCard({ label, value, desc }: { label: string; value: string; desc: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="text-lg font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-xs text-slate-500">{desc}</div>
    </div>
  );
}

function GuardrailItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
      <div className="text-sm font-semibold text-slate-800 mb-1">{title}</div>
      <div className="text-xs text-slate-600">{desc}</div>
    </div>
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
