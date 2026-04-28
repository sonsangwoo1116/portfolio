import { motion } from "motion/react";
import { ArrowLeft, Github } from "lucide-react";

export function WigvoDetail() {
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
            <span className="text-sm text-gray-500">2025.11 - 2026.02</span>
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-700">ACL 2026 System Demos Accept</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WIGVO — AI 실시간 전화통역 플랫폼</h1>
          <p className="text-lg text-gray-600">Real-Time Bidirectional Speech Translation over Legacy PSTN Calls via Dual-Session Echo Gating</p>
          <div className="mt-3 flex gap-2">
            <a href="https://github.com/wigtn/wigvo-v2" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </motion.div>

        {/* 목차 */}
        <Section title="Contents" delay={0.05}>
          <nav className="grid md:grid-cols-2 gap-2">
            {["Overview", "듀얼 세션 아키텍처", "Stage 1 — Echo Gate (7단계 진화)", "Stage 2 — PSTN VAD 독립 아키텍처", "Stage 3 — Whisper 환각 필터", "Strategy 패턴 — 3가지 통신 파이프라인", "프로덕션 메트릭 (148통)", "역할 및 Tech Stack"].map((item, i) => (
              <button key={i} onClick={() => document.getElementById(`wv-${i}`)?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-left">
                {i + 1}. {item}
              </button>
            ))}
          </nav>
        </Section>

        {/* 1. Overview */}
        <div id="wv-0">
          <Section title="1. Overview" delay={0.1}>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">프로덕션 지표 (148통 PSTN 통화)</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MetricCard label="Session A 지연" value="555ms" desc="P50, P95: 1,169ms" />
                <MetricCard label="에코 루프" value="0건" desc="프로토타입 80% → 0%" />
                <MetricCard label="환각 차단" value="0.3%↓" desc="콜당 평균 0.7건" />
                <MetricCard label="비용" value="$0.18/분" desc="최적화 후 33% 감소" />
              </div>
            </div>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              상대방은 앱 설치 없이 일반 전화만 받으면 됩니다.
              실제 전화망(PSTN)을 통한 양방향 LLM 기반 실시간 음성 통역 플랫폼입니다.
              재한 외국인 220만, 해외 체류 한국인 280만, 청각·언어 장애인 39만 명의 언어 장벽을 해결합니다.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              PSTN 환경은 일반 음성인식과 근본적으로 다릅니다. G.711 μ-law 8kHz 협대역 코덱, 80-600ms 가변 지연, 상수 코덱 압축 노이즈.
              AI가 생성한 TTS 음성이 전화망을 타고 에코로 돌아와 STT→번역→TTS 무한 루프가 발생하는 문제가 핵심 과제였습니다.
              <strong>초기 테스트 10회 중 8회가 에코 루프를 경험</strong>했습니다.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              하드웨어 AEC나 통신사 인프라 없이 소프트웨어만으로 PSTN 양방향 번역을 달성했으며,
              ACL 2026 System Demonstrations에 Accept되었습니다 (Rating 7.50).
            </p>
          </Section>
        </div>

        {/* 2. 듀얼 세션 아키텍처 */}
        <div id="wv-1">
          <Section title="2. 듀얼 세션 아키텍처" delay={0.15}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              에코 루프를 구조적으로 차단하기 위해 두 개의 독립적인 OpenAI Realtime API 세션으로 분리했습니다.
              단일 세션 양방향 방식은 프로덕션에서 에코 루프를 방지할 수 없어 폐기했습니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Session A (브라우저 → 전화)</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-gray-600">• 사용자 음성 → STT → 번역 → TTS → 상대방</li>
                  <li className="text-xs text-gray-600">• 16kHz PCM 입력 → G.711 μ-law 출력</li>
                  <li className="text-xs text-gray-600">• <strong>P50: 555ms</strong> / P95: 1,169ms</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Session B (전화 → 브라우저)</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-gray-600">• 상대방 음성 → 3단계 필터 → STT → 번역 → 자막/음성</li>
                  <li className="text-xs text-gray-600">• 8kHz G.711 μ-law 입력, P50: 2,868ms</li>
                  <li className="text-xs text-gray-600">• 발성 길이와 상관 (Pearson r=0.400)</li>
                </ul>
              </div>
            </div>
            <DemoImage src="/portfolio/wigvo-architecture.png" alt="WIGVO 시스템 아키텍처" caption="Session A(빨강): 사용자 음성 → OpenAI Realtime API → G.711 → Twilio PSTN. Session B(파랑): PSTN 오디오 → 3-Stage Filter → Session B Pipeline. Echo Windows가 TTS 에코를 차단" />
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">3계층 구조</h4>
              <div className="space-y-2">
                <p className="text-xs text-gray-600"><span className="font-medium">Layer 1 (Transport)</span>: Twilio Media Streams + Browser WebSocket</p>
                <p className="text-xs text-gray-600"><span className="font-medium">Layer 2 (Pipeline)</span>: AudioRouter가 Strategy 패턴으로 V2V/T2V/Agent 모드 위임</p>
                <p className="text-xs text-gray-600"><span className="font-medium">Layer 3 (Sessions)</span>: Session A + Session B, 6-turn 슬라이딩 컨텍스트</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                STT는 Realtime API 내 Whisper-1 유지, 번역은 GPT-4o-mini Chat API(temperature=0)로 분리.
                Realtime API의 번역은 환각을 유발하므로 context_prune_keep=0으로 완전 차단.
              </p>
            </div>
          </Section>
        </div>

        {/* 3. Echo Gate */}
        <div id="wv-2">
          <Section title="3. Stage 1 — Echo Gate (7단계 진화)" delay={0.2}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              음성 지문(Pearson 상관)부터 시작하여 7단계를 거쳐 최종 Echo Gate를 완성했습니다.
              핵심 돌파구는 <strong>"Drop vs Replace"</strong>의 발견이었습니다.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Drop vs Replace</h4>
              <p className="text-xs text-gray-600">
                오디오를 드롭하면 Server VAD가 "스트림 중단"으로 해석하여 speech_stopped를 발생시키지 않습니다.
                μ-law 무음(0xFF)으로 <strong>대체</strong>하면 스트림 연속성을 유지하면서 VAD가 침묵을 올바르게 인식합니다.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">최종 Echo Gate — 3단 구조</h4>
              <div className="space-y-3">
                <Step num="1" title="에코 윈도우" desc="TTS 재생 중 PSTN 오디오를 μ-law silence(0xFF)로 대체 + 0.5초 지터 마진" />
                <Step num="2" title="Dynamic Settling" desc="TTS 길이 × 0.3 (0.5s-1.5s 클램프)으로 AGC 회복 노이즈 억제. RMS ≥ 500 통과" />
                <Step num="3" title="일반 구간" desc="RMS ≥ 150 에너지 임계값. 에코 게이트 중 상대방이 실제로 말하면(RMS > 임계) 즉시 해제" />
              </div>
            </div>
            <DemoImage src="/portfolio/wigvo-pipeline.png" alt="3-Stage 오디오 필터 파이프라인" caption="(A) Echo Gate → Energy Gate → Silero VAD 플로우차트. (B) Echo Gate Complementary Operation — TTS 재생 중 Active Filtering → Dynamic Settling → Normal VAD 시간축 다이어그램" />
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">7단계 진화 — Ablation</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-white">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b">방법</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b">에코</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b">대화 지연</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b">채택</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-3 py-2 text-xs text-gray-700">Audio Fingerprint (Pearson)</td>
                      <td className="px-3 py-2 text-xs text-red-600">미해결</td>
                      <td className="px-3 py-2 text-xs text-gray-500">—</td>
                      <td className="px-3 py-2 text-xs text-gray-500">G.711 μ-law 비선형 양자화</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-3 py-2 text-xs text-gray-700">고정 Echo Gate (2.5s)</td>
                      <td className="px-3 py-2 text-xs text-green-600">해결</td>
                      <td className="px-3 py-2 text-xs text-red-600">방해됨</td>
                      <td className="px-3 py-2 text-xs text-gray-500">대화 흐름 단절</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-3 py-2 text-xs text-gray-700">Dynamic Cooldown</td>
                      <td className="px-3 py-2 text-xs text-green-600">해결</td>
                      <td className="px-3 py-2 text-xs text-yellow-600">개선됨</td>
                      <td className="px-3 py-2 text-xs text-gray-500">AGC 노이즈 스파이크</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-xs font-medium text-gray-700">Silence + RMS + Settling + Silero</td>
                      <td className="px-3 py-2 text-xs text-green-600 font-medium">해결</td>
                      <td className="px-3 py-2 text-xs text-green-600 font-medium">최소화</td>
                      <td className="px-3 py-2 text-xs font-medium text-blue-600">최종 채택</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Section>
        </div>

        {/* 4. PSTN VAD */}
        <div id="wv-3">
          <Section title="4. Stage 2 — PSTN VAD 독립 아키텍처" delay={0.25}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              OpenAI Server VAD는 깨끗한 광대역 음성을 가정합니다.
              PSTN 배경 노이즈(RMS 50-200)를 "음성 진행 중"으로 인식하여 speech_stopped가 15-72초 지연되거나 미발동합니다.
              에코 윈도우 중 프레임 수준 제어도 불가능하여 Silero VAD로 전환했습니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">2단 독립 필터</h4>
              <div className="space-y-3">
                <Step num="1" title="RMS Energy Gate" desc="에코 윈도우 RMS ≥ 500, Settling RMS ≥ 200, 일반 RMS ≥ 150. 에코/노이즈/발화를 에너지로 1차 분리" />
                <Step num="2" title="Silero VAD" desc="에너지 게이트 통과 프레임에 신경망 판정. 8kHz → 16kHz 영차 보간(zero-order hold)" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">비대칭 이력 상태 머신</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-gray-600">• Onset: 160ms (5 프레임) — 엄격</li>
                  <li className="text-xs text-gray-600">• Offset: 800ms (25 프레임) — 관대</li>
                  <li className="text-xs text-gray-600">• 최소 발성 250ms</li>
                  <li className="text-xs text-gray-600">• 최소 피크 RMS 300</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">결과</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-gray-600">• speech_stopped 지연: <strong>15-72초 → 480ms</strong></li>
                  <li className="text-xs text-gray-600">• 콜당 VAD 오탐: 평균 1.8건</li>
                  <li className="text-xs text-gray-600">• 약한 신호는 노이즈로 거부하여 안전성 확보</li>
                </ul>
              </div>
            </div>
          </Section>
        </div>

        {/* 5. Whisper 환각 필터 */}
        <div id="wv-4">
          <Section title="5. Stage 3 — Whisper 환각 필터" delay={0.3}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              PSTN 노이즈가 Whisper-1에 진입하면 학습 데이터(YouTube, 방송)에서 학습한
              "그럴듯한" 텍스트를 생성합니다. "MBC 뉴스, 이덕영입니다", "시청해주셔서 감사합니다" 같은 환각이
              실제로 수신자 전화에 도달하는 문제를 해결해야 했습니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">3-Stage 파이프라인</h4>
              <div className="space-y-3">
                <Step num="0" title="Pre-STT" desc="Echo Gate + Silence Injection으로 오염된 음성 사전 차단" />
                <Step num="1" title="Post-STT" desc="한국어 29개 + 영어 22개 = 51개 방송 패턴 블록리스트. 4단계 텍스트 필터 (최소 길이, 침묵 타임아웃, 반복 구문, 신뢰도)" />
                <Step num="2" title="Post-Translation — 3-Level Guardrail" desc="L1 (Pass, 0ms) / L2 (즉시 TTS + 배경 수정, 0ms) / L3 (차단 + GPT-4o-mini 수정, ~800ms)" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <MetricCard label="환각 누수율" value="0.3%↓" desc="148 콜 기준" />
              <MetricCard label="콜당 차단" value="0.7건" desc="평균" />
              <MetricCard label="L1 비율" value="95%+" desc="추가 지연 0ms" />
            </div>
          </Section>
        </div>

        {/* 6. Strategy 패턴 */}
        <div id="wv-5">
          <Section title="6. Strategy 패턴 — 3가지 통신 파이프라인" delay={0.35}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              초기 monolithic AudioRouter를 thin delegator + 3개 독립 파이프라인으로 리팩터링하여 코드 73% 감소.
              통화 중에도 V2V ↔ T2V ↔ Agent 모드를 실시간 전환할 수 있습니다.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">모드</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">사용 사례</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">특이 사항</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">비율</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-sm font-medium text-gray-700">Voice-to-Voice</td>
                    <td className="px-4 py-2 text-xs text-gray-500">양방향 음성 통역</td>
                    <td className="px-4 py-2 text-xs text-gray-500">3단계 인터럽트 우선순위</td>
                    <td className="px-4 py-2 text-xs text-gray-500">30.8%</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-sm font-medium text-gray-700">Text-to-Voice</td>
                    <td className="px-4 py-2 text-xs text-gray-500">청각/언어 장애, 콜포비아</td>
                    <td className="px-4 py-2 text-xs text-gray-500">per-response instruction override</td>
                    <td className="px-4 py-2 text-xs text-gray-500">68.6%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium text-gray-700">Full Agent</td>
                    <td className="px-4 py-2 text-xs text-gray-500">예약/주문 AI 대리 통화</td>
                    <td className="px-4 py-2 text-xs text-gray-500">Function Calling + FunctionExecutor</td>
                    <td className="px-4 py-2 text-xs text-gray-500">0.6%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">공통 모듈</h4>
              <div className="grid md:grid-cols-2 gap-2">
                <p className="text-xs text-gray-600"><span className="font-medium">EchoGateManager</span> — 파이프라인 간 공유 에코 방지</p>
                <p className="text-xs text-gray-600"><span className="font-medium">ChatTranslator</span> — T2V/Agent Session B 번역</p>
                <p className="text-xs text-gray-600"><span className="font-medium">InterruptHandler</span> — 3-Level 인터럽트 우선순위</p>
                <p className="text-xs text-gray-600"><span className="font-medium">RingBuffer</span> — 30초 미전달 오디오 보존</p>
              </div>
            </div>
          </Section>
        </div>

        {/* 7. 프로덕션 메트릭 */}
        <div id="wv-6">
          <Section title="7. 프로덕션 메트릭 (148통)" delay={0.4}>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">카테고리</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">지표</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">값</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-xs font-medium text-gray-700" rowSpan={3}>지연시간</td>
                    <td className="px-4 py-2 text-xs text-gray-600">Session A P50 / P95</td>
                    <td className="px-4 py-2 text-xs font-medium text-gray-900">555ms / 1,169ms</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-xs text-gray-600">Session B P50</td>
                    <td className="px-4 py-2 text-xs text-gray-900">2,868ms</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-xs text-gray-600">첫 메시지 P50 (cold start)</td>
                    <td className="px-4 py-2 text-xs text-gray-900">1,215ms</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-xs font-medium text-gray-700" rowSpan={4}>안전성</td>
                    <td className="px-4 py-2 text-xs text-gray-600">에코 루프</td>
                    <td className="px-4 py-2 text-xs font-medium text-gray-900">0 / 148 콜</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-xs text-gray-600">콜당 에코 게이트 활성화</td>
                    <td className="px-4 py-2 text-xs text-gray-900">평균 7.0회</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-xs text-gray-600">콜당 VAD 오탐</td>
                    <td className="px-4 py-2 text-xs text-gray-900">평균 1.8건</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-xs text-gray-600">콜당 환각 차단</td>
                    <td className="px-4 py-2 text-xs text-gray-900">평균 0.7건</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-xs font-medium text-gray-700" rowSpan={2}>비용</td>
                    <td className="px-4 py-2 text-xs text-gray-600">V2V / T2V</td>
                    <td className="px-4 py-2 text-xs text-gray-900">$0.30 / $0.29 per min</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-xs text-gray-600">최적화 후</td>
                    <td className="px-4 py-2 text-xs font-medium text-gray-900">$0.18/min (33% 감소)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xs font-medium text-gray-700">코드베이스</td>
                    <td className="px-4 py-2 text-xs text-gray-600">소스 / 테스트</td>
                    <td className="px-4 py-2 text-xs text-gray-900">17,414 lines / 434 pytest</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <DemoImage src="/portfolio/wigvo-latency.png" alt="E2E 지연시간 분포" caption="Session A (N=814 turns) / Session B (N=744 turns) 지연시간 히스토그램" />
              <DemoImage src="/portfolio/wigvo-scatter.png" alt="발화 길이 vs 지연시간" caption="발화 길이 vs Session B 지연시간 산점도 (Pearson r=0.400, p<0.001)" />
            </div>
          </Section>
        </div>

        {/* 8. 역할 및 Tech Stack */}
        <div id="wv-7">
          <Section title="8. 역할 및 Tech Stack" delay={0.45}>
            <h4 className="text-base font-semibold text-gray-800 mb-3">역할 (5인 크루 WIGTN, AI/음성 핵심 모듈)</h4>
            <ul className="space-y-2 mb-6">
              <BulletItem text="듀얼 세션 아키텍처 설계 — Session A(발신→수신) + Session B(수신→발신) 독립 분리" />
              <BulletItem text="3단계 에코 필터 설계·구현 — Echo Gate(Silence Injection) → RMS Energy Gate → Silero VAD" />
              <BulletItem text="Whisper 환각 필터 — 51개 방송 패턴 블록리스트 + 3-Level Guardrail" />
              <BulletItem text="Strategy 패턴 리팩터링 — V2V/T2V/FullAgent 3가지 통신 파이프라인" />
              <BulletItem text="PSTN 실전 통화 148통 테스트 참여 + 프로덕션 배포 (Google Cloud Run)" />
            </ul>
            <h4 className="text-base font-semibold text-gray-800 mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {["Python 3.12", "FastAPI", "OpenAI Realtime API", "GPT-4o-mini", "Silero VAD (ONNX)", "Twilio PSTN", "Supabase", "Google Cloud Run", "Docker", "Next.js 16", "React Native", "pytest (434)"].map((tag, i) => (
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

function DemoImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <div className="my-4">
      <img src={src} alt={alt} className="w-full rounded-lg border border-gray-200 shadow-sm" />
      {caption && <p className="text-xs text-gray-500 mt-2 text-center">{caption}</p>}
    </div>
  );
}

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
