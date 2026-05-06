import { motion } from "motion/react";
import { ArrowLeft, Github } from "lucide-react";
import { DemoImage } from "../../components/DemoImage";

export function WigentDetail() {
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
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-teal-100 text-teal-700">Side Project</span>
            <span className="text-sm text-slate-500">2026.03</span>
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-yellow-100 text-yellow-700">Build with TRAE Hackathon 대상</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">WIGENT — AI Agent 실시간 토론 플랫폼</h1>
          <p className="text-lg text-slate-600">Drop a topic, watch AI agents debate it live — then a landing page writes itself</p>
          <div className="mt-3">
            <a href="https://github.com/wigtn/wigent" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </motion.div>

        {/* 목차 */}
        <Section title="Contents" delay={0.05}>
          <nav className="grid md:grid-cols-2 gap-2">
            {["Background", "Contract-First Development", "Multi-Agent Orchestrator", "동적 Spawning / Retirement", "랜딩 페이지 즉시 생성", "4번의 피벗", "8가지 에이전트 디자인 패턴", "역할 및 Tech Stack"].map((item, i) => (
              <button key={i} onClick={() => document.getElementById(`wg-${i}`)?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-left">
                {i + 1}. {item}
              </button>
            ))}
          </nav>
        </Section>

        {/* 1. Background */}
        <div id="wg-0">
          <Section title="1. Background" delay={0.1}>
            <p className="text-base text-slate-700 leading-relaxed mb-3">
              주제를 던지면 PM + 도메인 전문가 AI 에이전트들이 Slack 스타일 채팅 UI에서 실시간으로 토론하고,
              합의에 도달하면 랜딩 페이지가 자동 생성되는 Multi-Agent 토론 플랫폼입니다.
            </p>
            <p className="text-base text-slate-700 leading-relaxed mb-3">
              개인 브레인스토밍은 편견이 있고, 팀 토론은 시간이 걸리고, 기존 AI 채팅은 단일 관점만 제공합니다.
              WIGENT는 여러 전문가 에이전트가 서로 다른 관점에서 실시간으로 논쟁하여 이 문제를 해결합니다.
            </p>
            <p className="text-base text-slate-700 leading-relaxed">
              Build with TRAE Seoul (ByteDance) 해커톤에서 3인 엔지니어 팀으로 3.5시간 만에 개발하여 <strong>대상(Grand Prize)</strong>을 수상했습니다.
            </p>
            <DemoImage src="/portfolio/wigent-demo.png" alt="WIGENT 초기 화면" caption="주제 입력 화면 — 프리셋(한국문화 수출, 1인 SaaS, Z세대 소설) 또는 자유 주제 입력" />
          </Section>
        </div>

        {/* 2. Contract-First Development */}
        <div id="wg-1">
          <Section title="2. Contract-First Development" delay={0.15}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              13:43에 281줄의 <code className="text-xs bg-slate-100 px-1 rounded">types.ts</code>를 커밋하여
              모든 인터페이스(Agent, AgentMessage, SSEEvent, FinalIdea 등)를 먼저 확정했습니다.
              이 계약서를 기반으로 3개 스트림이 동시에 병렬 개발을 시작, <strong>13:51에 0건의 충돌로 병합 완료</strong>했습니다.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">스트림</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">담당</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">첫 커밋</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">결과물</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700">P1: 백엔드</td>
                    <td className="px-4 py-2 text-xs text-slate-500">swson</td>
                    <td className="px-4 py-2 text-xs text-slate-500">13:48</td>
                    <td className="px-4 py-2 text-xs text-slate-500">orchestrator.ts, prompts.ts, SSE API 라우트</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700">P2: Slack UI</td>
                    <td className="px-4 py-2 text-xs text-slate-500">hwcho</td>
                    <td className="px-4 py-2 text-xs text-slate-500">13:49</td>
                    <td className="px-4 py-2 text-xs text-slate-500">10개 채팅 컴포넌트 (다크 테마, 타이핑 표시, 입퇴장 메시지)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700">P3: Hooks + I/O</td>
                    <td className="px-4 py-2 text-xs text-slate-500">hskim</td>
                    <td className="px-4 py-2 text-xs text-slate-500">13:49</td>
                    <td className="px-4 py-2 text-xs text-slate-500">useDebate (441줄), TopicInput, LandingPageView</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600">
              5분의 타입 정의 투자로 3.5시간 해커톤에서 병합 충돌 0건을 달성.
              Claude Code를 활용한 병렬 생성으로 개별 출력을 곱셈할 수 있었습니다.
            </p>
          </Section>
        </div>

        {/* 3. Multi-Agent Orchestrator */}
        <div id="wg-2">
          <Section title="3. Multi-Agent Orchestrator" delay={0.2}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              AsyncGenerator 기반 토론 엔진이 typed SSE event를 yield하며 전체 토론을 오케스트레이션합니다.
              13개 SSE 이벤트 타입으로 에이전트 생성, 발언, 퇴장, 스포닝, 결과, 랜딩 페이지까지 실시간 스트리밍합니다.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-3">토론 파이프라인</h4>
              <div className="space-y-3">
                <Step num="1" title="에이전트 생성" desc="GPT-4o JSON Mode로 주제에 맞는 전문가 동적 생성. PM은 항상 상주(isFixed)" />
                <Step num="2" title="30턴 자유 토론" desc="턴마다 발언 횟수 기반 발언자 선택 → 프롬프트 → 스트리밍 발언. 800-2500ms 랜덤 딜레이" />
                <Step num="3" title="디자이너 합류 (턴 3)" desc="UI/UX 관점 추가 — '3초 안에 이해 못하면 실패' 같은 구체적 발화 습관 설정" />
                <Step num="4" title="에이전트 교체 (턴 12, 22)" desc="기존 전문가 퇴장 + 인수인계 메시지 → 새 전문가 소환 (신선한 관점)" />
                <Step num="5" title="강제 수렴 (턴 25+)" desc="시스템 프롬프트 변경으로 자연스러운 합의 유도" />
                <Step num="6" title="요약 → 결과 → 랜딩 페이지" desc="토론 요약 → 투자자 피치 수준 구조화 → HTML 스트리밍 생성" />
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">발언자 선택 알고리즘</h4>
              <div className="space-y-1">
                <p className="text-xs text-slate-600">1. status === "online" 에이전트만 필터링</p>
                <p className="text-xs text-slate-600">2. 직전 발언자 제외 — 연속 발언 방지</p>
                <p className="text-xs text-slate-600">3. 발언 횟수 오름차순 정렬 — 가장 적게 말한 에이전트 우선</p>
                <p className="text-xs text-slate-600 mt-1 italic">단순 로테이션이 아닌 균형 있는 참여를 보장</p>
              </div>
            </div>
            <DemoImage src="/portfolio/wigent-debate.png" alt="Slack 스타일 실시간 토론" caption="PM 김현우 + 문화 커뮤니케이터 이지훈 + 디자이너 박지윤이 실시간 토론. 왼쪽 사이드바에 ONLINE 에이전트 목록, 다크 테마 채팅 UI" />
          </Section>
        </div>

        {/* 4. 동적 Spawning / Retirement */}
        <div id="wg-3">
          <Section title="4. 동적 Spawning / Retirement" delay={0.25}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              토론 주제가 변화하면 기존 전문가를 퇴장시키고 맥락에 맞는 새 전문가를 소환합니다.
              GPT-4o가 현재 토론 흐름을 분석하여 퇴장 메시지와 새 에이전트의 역할/성격/발화 습관을 결정합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">Retirement</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-slate-600">• 턴 12, 턴 22에서 자동 트리거</li>
                  <li className="text-xs text-slate-600">• isFixed가 아닌 가장 오래된 온라인 에이전트 선택</li>
                  <li className="text-xs text-slate-600">• 자연스러운 인수인계 메시지 생성</li>
                  <li className="text-xs text-slate-600">• agent_retire SSE 이벤트 → UI에서 퇴장 애니메이션</li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">Spawning</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-slate-600">• retireSpawnPrompt로 교체 이유 + 새 에이전트 생성</li>
                  <li className="text-xs text-slate-600">• name, role, personality, color, emoji 동적 결정</li>
                  <li className="text-xs text-slate-600">• 구체적 발화 습관 설정 (페르소나 엔지니어링)</li>
                  <li className="text-xs text-slate-600">• spawn_trigger → agent_spawned SSE 이벤트</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">Human-in-the-Loop</h4>
              <p className="text-xs text-slate-600">
                사용자가 결과를 거절하면 PM이 거절 사실을 알리고 <code className="text-xs bg-slate-100 px-1 rounded">continueDebate()</code>로
                8턴 추가 토론을 진행합니다. 후반 토론(수렴 단계) 프롬프트를 적용하여 빠르게 새 결론에 도달합니다.
              </p>
            </div>
            <DemoImage src="/portfolio/wigent-spawn-retire.png" alt="에이전트 퇴장 및 새 전문가 입장" caption="박민수 퇴장('좋은 논의였습니다') → 이수혁 기술 전문가 입장. OFFLINE 섹션에 이전 에이전트 표시" />
          </Section>
        </div>

        {/* 5. 랜딩 페이지 즉시 생성 */}
        <div id="wg-4">
          <Section title="5. 랜딩 페이지 즉시 생성" delay={0.3}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              토론 결론을 구조화된 FinalIdea JSON으로 합성하고,
              9가지 디자인 템플릿(Glassmorphism, Neobrutalism, Editorial 등) 중 하나를 즉시 적용합니다.
              백그라운드에서 GPT-4o가 16,000 토큰까지 HTML을 스트리밍 생성합니다.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Step num="1" title="토론 요약" desc="summarizeDebatePrompt — 전체 토론을 구조화된 요약으로 압축" />
                <Step num="2" title="FinalIdea 생성" desc="title, oneLiner, target 등 투자자 피치 수준으로 구조화" />
                <Step num="3" title="템플릿 즉시 적용" desc="9가지 디자인 템플릿 중 선택, 60초 대기 없이 즉시 렌더링" />
                <Step num="4" title="HTML 스트리밍" desc="GPT-4o stream, max_tokens 16,000. Sandbox iframe에서 렌더링" />
                <Step num="5" title="Fallback" desc="GPT 거부 시 FALLBACK_HTML 템플릿 사용. markdown 코드 펜스 자동 제거" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              채팅 UI에서 랜딩 페이지로 Framer Motion 애니메이션 전환 — 토론 결과가 실제 제품으로 변환되는 "와우 모멘트"를 구현했습니다.
            </p>
            <DemoImage src="/portfolio/wigent-landing.png" alt="자동 생성된 랜딩 페이지" caption="'코리안 미라지' 랜딩 페이지 — TARGET·DIFFERENTIATOR·REVENUE 카드 + Next Steps. 우측에 '결과 반려'(추가 토론) / '결과 만족' / 'Next.js 코드 추출' 버튼" />
          </Section>
        </div>

        {/* 6. 4번의 피벗 */}
        <div id="wg-5">
          <Section title="6. 3.5시간 안의 4번의 피벗" delay={0.35}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              3.5시간 해커톤 동안 4번의 대담한 피벗을 실행했고, 각각 30분 이내에 구현을 완료했습니다.
            </p>
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-600">38분</span>
                  <h4 className="text-sm font-semibold text-slate-800">Pivot 1: Slack UI + 전체 페이지 전환</h4>
                </div>
                <p className="text-xs text-slate-600">채팅 UI가 랜딩 페이지로 변환되는 "와우 모멘트" 컨셉 확정. 심사 기준을 역설계하여 아키텍처 설계</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-600">109분</span>
                  <h4 className="text-sm font-semibold text-slate-800">Pivot 2: 3라운드 고정 → 30턴 자유 토론</h4>
                </div>
                <p className="text-xs text-slate-600">3개 고정 라운드에서 30턴 자유 토론으로 변경. GPT 호출 10→~35회 증가했지만 자연스러움 대폭 향상</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-600">157분</span>
                  <h4 className="text-sm font-semibold text-slate-800">Pivot 3: 템플릿 기반 즉시 렌더링</h4>
                </div>
                <p className="text-xs text-slate-600">"60초 대기" 제거. 9가지 디자인 템플릿을 즉시 적용하고 백그라운드에서 GPT가 생성</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-600">174분</span>
                  <h4 className="text-sm font-semibold text-slate-800">Pivot 4: 강제 수렴 프롬프트</h4>
                </div>
                <p className="text-xs text-slate-600">턴 25 이후 시스템 프롬프트를 변경하여 에이전트들의 자연스러운 합의 유도</p>
              </div>
            </div>
          </Section>
        </div>

        {/* 7. 8가지 에이전트 디자인 패턴 */}
        <div id="wg-6">
          <Section title="7. 8가지 에이전트 디자인 패턴" delay={0.4}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">패턴</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">구현</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">목적</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Orchestrator", "orchestrator.ts AsyncGenerator", "중앙 조율, 6단계 파이프라인"],
                    ["Specialist Agent", "토픽별 도메인 전문가 동적 생성", "주제 맞춤 전문성"],
                    ["Persistent Agent", "PM & Designer (isFixed: true)", "스코프 크립 방지"],
                    ["Agent Spawning", "턴 12, 22에서 새 에이전트 생성", "신선한 관점 추가"],
                    ["Agent Retirement", "인수인계 메시지 + 퇴장 애니메이션", "우아한 전환"],
                    ["Multi-turn Debate", "4개 자동 페이즈의 30턴 토론", "깊이 있는 탐색"],
                    ["Result Synthesis", "FinalIdea JSON → HTML 랜딩 페이지", "실행 가능한 아웃풋"],
                    ["Human-in-the-Loop", "거절 → 8턴 추가 → 새 결과", "사용자 제어권"],
                  ].map(([pattern, impl, purpose], i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="px-4 py-2 text-xs font-medium text-slate-700">{pattern}</td>
                      <td className="px-4 py-2 text-xs text-slate-500">{impl}</td>
                      <td className="px-4 py-2 text-xs text-slate-500">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        {/* 8. 역할 및 Tech Stack */}
        <div id="wg-7">
          <Section title="8. 역할 및 Tech Stack" delay={0.45}>
            <h4 className="text-base font-semibold text-slate-800 mb-3">역할 (3인 팀, WIGTN 크루)</h4>
            <ul className="space-y-2 mb-6">
              <BulletItem text="아이디어 제안 및 프로젝트 컨셉 설계" />
              <BulletItem text="P1: 백엔드 전체 구현 — orchestrator.ts, prompts.ts, SSE API 라우트" />
              <BulletItem text="Multi-Agent Orchestrator 설계 및 GPT-4o 기반 에이전트 동적 Spawning/Retirement 로직 구현" />
            </ul>

            <h4 className="text-base font-semibold text-slate-800 mb-3">개발 타임라인</h4>
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex gap-3"><span className="font-mono font-medium text-slate-700 w-12">12:59</span><span>PRD v1.0 작성</span></div>
                <div className="flex gap-3"><span className="font-mono font-medium text-slate-700 w-12">13:37</span><span>PRD v2.0 — Slack UI + 전체 페이지 전환 컨셉 확정</span></div>
                <div className="flex gap-3"><span className="font-mono font-medium text-slate-700 w-12">13:43</span><span>types.ts 계약서 커밋 (281줄)</span></div>
                <div className="flex gap-3"><span className="font-mono font-medium text-slate-700 w-12">13:48</span><span>P1 + P2 + P3 동시 커밋 → <strong>13:51 병합 완료 (충돌 0건)</strong></span></div>
                <div className="flex gap-3"><span className="font-mono font-medium text-slate-700 w-12">13:54</span><span>E2E 프로토타입 작동 (55분)</span></div>
                <div className="flex gap-3"><span className="font-mono font-medium text-slate-700 w-12">14:09</span><span>디자이너 에이전트 추가</span></div>
                <div className="flex gap-3"><span className="font-mono font-medium text-slate-700 w-12">14:48</span><span>라운드 → 자유 토론 피벗</span></div>
                <div className="flex gap-3"><span className="font-mono font-medium text-slate-700 w-12">15:06</span><span>9개 디자인 템플릿 즉시 렌더링</span></div>
                <div className="flex gap-3"><span className="font-mono font-medium text-slate-700 w-12">15:07</span><span>거절 → 추가 토론 패턴</span></div>
                <div className="flex gap-3"><span className="font-mono font-medium text-slate-700 w-12">15:13</span><span>강제 수렴 프롬프트</span></div>
                <div className="flex gap-3"><span className="font-mono font-medium text-slate-700 w-12">15:55</span><span>최종 커밋</span></div>
              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {["Next.js 16", "React 19", "TypeScript", "GPT-4o", "SSE Streaming", "AsyncGenerator", "Framer Motion", "Tailwind CSS v4", "useReducer (13 events)", "Sandbox iframe"].map((tag, i) => (
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
