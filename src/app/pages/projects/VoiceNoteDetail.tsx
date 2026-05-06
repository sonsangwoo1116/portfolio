import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function VoiceNoteDetail() {
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
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-700">AI/Voice</span>
            <span className="text-sm text-slate-500">2025.02 - 2025.05</span>
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-slate-100 text-slate-600">(주)사운드마인드</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">VoiceNote — 회의록 분석 플랫폼</h1>
          <p className="text-lg text-slate-600">음성 업로드 → Whisper STT → pyannote 화자분리 → LLM 요약 자동화 파이프라인</p>
        </motion.div>

        {/* 목차 */}
        <Section title="Contents" delay={0.05}>
          <nav className="grid md:grid-cols-2 gap-2">
            {["Background", "System Overview", "STT + VAD 파이프라인", "화자분리 + 라벨 정렬", "LLM Map-Reduce 요약", "TaskManager 상태 관리", "성과", "역할 및 Tech Stack"].map((item, i) => (
              <button key={i} onClick={() => document.getElementById(`vn-${i}`)?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-left">
                {i + 1}. {item}
              </button>
            ))}
          </nav>
        </Section>

        {/* 1. Background */}
        <div id="vn-0">
          <Section title="1. Background" delay={0.1}>
            <p className="text-base text-slate-700 leading-relaxed mb-3">
              음성 녹음을 업로드하면 자동으로 텍스트 변환, 화자 분리, 요약까지 완료되는 회의록 분석 플랫폼입니다.
              2인 개발 팀에서 전체 파이프라인 설계와 핵심 모듈 구현을 담당했습니다.
            </p>
            <p className="text-base text-slate-700 leading-relaxed">
              핵심 과제는 <strong>STT(NPU), 화자분리(GPU), VAD(CPU), LLM(메모리)</strong>이 각각 다른 하드웨어 리소스를 필요로 하는데,
              이를 단일 프로세스로 실행하면 리소스 충돌과 병목이 발생한다는 점이었습니다.
            </p>
          </Section>
        </div>

        {/* 2. System Overview */}
        <div id="vn-1">
          <Section title="2. System Overview" delay={0.15}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              리소스 특성이 다른 컴포넌트를 5개 독립 서비스로 분리하여 병렬 실행과 개별 스케일링이 가능하도록 설계했습니다.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">서비스</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">포트</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">하드웨어</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">역할</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700">API Service</td>
                    <td className="px-4 py-2 text-xs text-slate-500">5500</td>
                    <td className="px-4 py-2 text-xs text-slate-500">-</td>
                    <td className="px-4 py-2 text-xs text-slate-500">파이프라인 오케스트레이션, 상태 관리</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700">STT Service</td>
                    <td className="px-4 py-2 text-xs text-slate-500">5700</td>
                    <td className="px-4 py-2 text-xs text-slate-500">Intel NPU</td>
                    <td className="px-4 py-2 text-xs text-slate-500">Whisper-medium INT8 + OpenVINO</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700">VAD Service</td>
                    <td className="px-4 py-2 text-xs text-slate-500">5800</td>
                    <td className="px-4 py-2 text-xs text-slate-500">CPU</td>
                    <td className="px-4 py-2 text-xs text-slate-500">Silero VAD 음성 구간 검출</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700">Diarizer Service</td>
                    <td className="px-4 py-2 text-xs text-slate-500">5900</td>
                    <td className="px-4 py-2 text-xs text-slate-500">Intel GPU (XPU)</td>
                    <td className="px-4 py-2 text-xs text-slate-500">pyannote 화자분리 3.1</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700">LLM Service</td>
                    <td className="px-4 py-2 text-xs text-slate-500">5600</td>
                    <td className="px-4 py-2 text-xs text-slate-500">Memory</td>
                    <td className="px-4 py-2 text-xs text-slate-500">ko-gemma-2-9b-it INT4 요약/번역</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600">
              각 서비스는 FastAPI로 구현하고, 서비스 간 통신은 HTTP API로 처리합니다.
              Health-check 엔드포인트로 각 서비스의 상태를 모니터링하고, 장애 시 자동 재시도합니다.
            </p>
          </Section>
        </div>

        {/* 3. STT + VAD 파이프라인 */}
        <div id="vn-2">
          <Section title="3. STT + VAD 파이프라인" delay={0.2}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              Whisper는 30초 이내 오디오에 최적화되어 있어, 긴 회의 녹음을 그대로 넣으면 품질이 급격히 떨어집니다.
              Silero VAD로 음성 구간을 검출한 뒤 청크 단위로 분할하여 STT에 전달합니다.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Step num="1" title="오디오 로드 + 리샘플링" desc="16kHz mono로 통일. stereo → mono 변환 자동 처리" />
                <Step num="2" title="Silero VAD 음성 구간 검출" desc="발화 시작/끝 타임스탬프 추출, 무음 구간 제거" />
                <Step num="3" title="청크 분할" desc="VAD 결과 기반으로 Whisper 최적 입력 길이에 맞게 분할" />
                <Step num="4" title="Whisper STT 변환" desc="OpenVINO/whisper-medium-int8-ov, Intel NPU 추론. 타임스탬프 보정 포함" />
                <Step num="5" title="할루시네이션 필터링" desc="반복 텍스트, 비정상 출력 자동 감지 및 제거" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <MetricCard label="STT 모델" value="Whisper-medium" desc="INT8, OpenVINO" />
              <MetricCard label="추론 디바이스" value="Intel NPU" desc="openvino_genai" />
              <MetricCard label="max_new_tokens" value="128" desc="return_timestamps=True" />
            </div>
          </Section>
        </div>

        {/* 4. 화자분리 + 라벨 정렬 */}
        <div id="vn-3">
          <Section title="4. 화자분리 + 라벨 정렬" delay={0.25}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              pyannote/speaker-diarization-3.1로 화자 세그먼트를 추출한 뒤,
              STT 결과의 타임스탬프와 정렬하여 "누가 무슨 말을 했는지" 매핑합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">화자분리 (Diarizer)</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-slate-600">• pyannote/speaker-diarization-3.1</li>
                  <li className="text-xs text-slate-600">• Intel GPU (XPU, DPC++) 추론</li>
                  <li className="text-xs text-slate-600">• 화자별 A, B, C 라벨 자동 부여</li>
                  <li className="text-xs text-slate-600">• 시작/종료 시간 세그먼트 출력</li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">라벨 정렬 파이프라인</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-slate-600">• STT 타임스탬프 ↔ 화자 세그먼트 매칭</li>
                  <li className="text-xs text-slate-600">• 겹치는 구간 → 가장 긴 오버랩 기준 할당</li>
                  <li className="text-xs text-slate-600">• segments: [{'{speaker, text, start, end}'}]</li>
                  <li className="text-xs text-slate-600">• JSON 결과 저장 (results/{'{task_id}'}/stt.json)</li>
                </ul>
              </div>
            </div>
          </Section>
        </div>

        {/* 5. LLM Map-Reduce 요약 */}
        <div id="vn-4">
          <Section title="5. LLM Map-Reduce 요약" delay={0.3}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              화자분리된 대화 텍스트를 LLM으로 요약합니다.
              긴 회의록은 토크나이저 기반 동적 그룹핑으로 분할 → Map 요약 → Reduce 재귀적 축약 파이프라인을 적용합니다.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Step num="1" title="group_by_token_limit()" desc="프롬프트 템플릿 토큰 + 컨텍스트 토큰 합산, max_tokens(2048) 초과 시 새 그룹 생성" />
                <Step num="2" title="Map 요약" desc="각 그룹별 독립 요약. 단일 그룹이면 single_summary 체인으로 바로 처리" />
                <Step num="3" title="Reduce 재귀적 축약" desc="recursive_token_based_reduce() — len(summaries)>1이면 재귀 호출, 최종 하나로 수렴" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">LLM 모델</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-slate-600">• ko-gemma-2-9b-it (OpenVINO INT4)</li>
                  <li className="text-xs text-slate-600">• max_tokens: 2,048</li>
                  <li className="text-xs text-slate-600">• 요약, 번역 프롬프트 YAML 관리</li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">지원 태스크</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-slate-600">• summarize — Map/Reduce 회의 요약</li>
                  <li className="text-xs text-slate-600">• stt_translate — STT 결과 번역</li>
                  <li className="text-xs text-slate-600">• summary_translate — 요약 결과 번역</li>
                </ul>
              </div>
            </div>
          </Section>
        </div>

        {/* 6. TaskManager 상태 관리 */}
        <div id="vn-5">
          <Section title="6. TaskManager 상태 관리" delay={0.35}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              파이프라인의 상태를 추적하고, 각 단계 완료 시 다음 단계를 자동으로 트리거하는 오케스트레이터입니다.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">상태 전이</h4>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="px-2 py-1 bg-white border border-slate-200 rounded">upload</span>
                <span>→</span>
                <span className="px-2 py-1 bg-white border border-slate-200 rounded">stt_in_progress</span>
                <span>→</span>
                <span className="px-2 py-1 bg-white border border-slate-200 rounded">sd_in_progress</span>
                <span>→</span>
                <span className="px-2 py-1 bg-white border border-slate-200 rounded">llm_in_progress</span>
                <span>→</span>
                <span className="px-2 py-1 bg-white border border-slate-200 rounded">final_done</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">자동 체이닝</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-slate-600">• sd_done 상태 감지 → LLM 요약 자동 트리거</li>
                  <li className="text-xs text-slate-600">• asyncio.create_task(run_llm()) 비동기 실행</li>
                  <li className="text-xs text-slate-600">• segments를 파일에서 자동 복원 (_load_segments)</li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">장애 복구</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-slate-600">• task_status.json 영속화 — 재시작 시 복원</li>
                  <li className="text-xs text-slate-600">• *_in_progress → *_error 자동 변환 (비정상 종료 감지)</li>
                  <li className="text-xs text-slate-600">• FIFO 기반 MAX_TASKS=10 관리</li>
                  <li className="text-xs text-slate-600">• /pipeline/retry/{'{task_id}'} 수동 재시도 지원</li>
                </ul>
              </div>
            </div>
          </Section>
        </div>

        {/* 7. 성과 */}
        <div id="vn-6">
          <Section title="7. 성과" delay={0.4}>
            <ul className="space-y-1">
              <li className="text-sm text-slate-700">• STT + 화자분리 + LLM 요약 end-to-end 자동화 파이프라인</li>
              <li className="text-sm text-slate-700">• 5개 마이크로서비스 분리 — 리소스 특성별 독립 스케일링</li>
              <li className="text-sm text-slate-700">• Intel NPU(STT) / GPU(화자분리) / CPU(VAD) 하드웨어별 최적 배치</li>
              <li className="text-sm text-slate-700">• FIFO 큐 기반 비동기 처리 + 장애 복구 자동화</li>
            </ul>
          </Section>
        </div>

        {/* 8. 역할 및 Tech Stack */}
        <div id="vn-7">
          <Section title="8. 역할 및 Tech Stack" delay={0.45}>
            <h4 className="text-base font-semibold text-slate-800 mb-3">역할 (2인 팀, 메인 개발자)</h4>
            <ul className="space-y-2 mb-6">
              <BulletItem text="5개 마이크로서비스 아키텍처 설계 — 하드웨어별 리소스 분리 및 독립 배포 구조" />
              <BulletItem text="VAD 청킹 + 화자 라벨 정렬 파이프라인 개발 — STT 타임스탬프와 화자 세그먼트 매칭" />
              <BulletItem text="Whisper/OpenVINO 기반 STT 최적화 — Intel NPU 추론, 할루시네이션 필터링" />
              <BulletItem text="토크나이저 기반 Map-Reduce 요약 파이프라인 — 재귀적 축약으로 긴 회의록 처리" />
              <BulletItem text="TaskManager 상태 관리 — 자동 체이닝, 장애 복구, FIFO 큐" />
            </ul>
            <h4 className="text-base font-semibold text-slate-800 mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {["Python", "FastAPI", "Whisper", "OpenVINO", "pyannote", "Silero VAD", "ko-gemma-2-9b-it", "LangChain", "RabbitMQ", "Intel NPU/GPU"].map((tag, i) => (
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
