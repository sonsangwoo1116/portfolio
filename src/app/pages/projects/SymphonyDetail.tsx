import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { DemoImage } from "../../components/DemoImage";

export function SymphonyDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
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
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-700">AI/Voice</span>
            <span className="text-sm text-gray-500">2025.11 - 2026.03</span>
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-600">(주)사운드마인드</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">영어 교육용 음성인식 시스템</h1>
          <p className="text-lg text-gray-600">Temporal + Triton + Faster Whisper 기반 대규모 배치 STT 파이프라인</p>
        </motion.div>

        {/* 목차 */}
        <Section title="Contents" delay={0.05}>
          <nav className="grid md:grid-cols-2 gap-2">
            {["Overview", "System Architecture", "3-Worker 분리 아키텍처", "2-Pass Bilingual STT", "Silero VAD + Smart Chunking", "재시도 정책 차등 설계", "보안 (SSRF 2중 방어)", "모니터링 + Tech Stack"].map((item, i) => (
              <button key={i} onClick={() => document.getElementById(`sym-${i}`)?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-left">
                {i + 1}. {item}
              </button>
            ))}
          </nav>
        </Section>

        {/* 1. Overview */}
        <div id="sym-0">
          <Section title="1. Overview" delay={0.1}>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">핵심 성과</h4>
              <ul className="space-y-1">
                <li className="text-sm text-gray-700">• 3-Worker 분리로 성공률 82% → 95%+ 개선</li>
                <li className="text-sm text-gray-700">• RTX 3090 2장에서 분당 200건 안정 처리</li>
                <li className="text-sm text-gray-700">• 2-Pass Bilingual STT로 영어/한국어 혼합 음성 처리</li>
                <li className="text-sm text-gray-700">• Temporal Payload 2MB 제한 → 100MB 파일 처리 가능</li>
                <li className="text-sm text-gray-700">• SSRF 2중 방어 + Graceful Shutdown + RFC 7807 에러 표준</li>
              </ul>
            </div>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              영어/한국어 혼합 음성을 동시에 대량 처리해야 하는 환경에서 안정적으로 동작하는 배치 STT 시스템을 구축했습니다.
              학생들의 발음이 불명확하고 영어와 한국어가 섞여 나오며, 다수의 음성을 동시에 처리해야 하는 제약이 있었습니다.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              초기 단일 Worker 구조에서 <strong>GPU 포화 시 콜백 전달이 수 분 지연</strong>되는 문제(성공률 82-85%)가 있었고,
              이를 3-계층 분리 아키텍처로 해결하여 성공률 95%+를 달성했습니다.
            </p>
            <DemoImage src="/portfolio/symphony-demo.png" alt="Symphony STT Demo" caption="Symphony STT Demo — 음성 파일 업로드 → Gateway → Temporal → Worker → Triton 파이프라인 전체 ✅ 완료. 영어/한국어 혼합 변환 결과" />
          </Section>
        </div>

        {/* 2. System Architecture */}
        <div id="sym-1">
          <Section title="2. System Architecture" delay={0.15}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Client(Spring Boot) → Gateway(FastAPI) → Temporal Server → Worker Container → Triton(GPU) 구조로,
              API Key 인증, Rate Limiting, SSRF 2-Pass 방어, WebSocket 스트리밍을 포함합니다.
            </p>
            <DemoImage src="/portfolio/symphony-architecture.png" alt="System Architecture" caption="전체 시스템 아키텍처 — Client → Gateway → Temporal → 3-Worker → Triton GPU" />
            <div className="mt-4 grid md:grid-cols-4 gap-3">
              <MetricCard label="STT 엔진" value="Faster Whisper" desc="Large-v3-turbo, Triton Backend" />
              <MetricCard label="VAD" value="Silero VAD" desc="ONNX, CPU, thread-local" />
              <MetricCard label="오케스트레이션" value="Temporal" desc="워크플로우 + Activity" />
              <MetricCard label="GPU" value="RTX 3090 ×2" desc="멀티 GPU Round-robin" />
            </div>
          </Section>
        </div>

        {/* 3. 3-Worker 분리 아키텍처 */}
        <div id="sym-2">
          <Section title="3. 3-Worker 분리 아키텍처" delay={0.2}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              초기 구조에서 단일 Worker가 Workflow + STT + Callback을 모두 처리했습니다.
              STT 슬롯이 모두 차면 WorkflowTask가 뒤에 대기하여 워크플로우 진행이 멈추고,
              5분 타임아웃이 발생했습니다(성공률 82-85%).
            </p>
            <DemoImage src="/portfolio/symphony-worker.png" alt="STT 파이프라인 아키텍처" caption="Audio Input → VAD → Smart Chunking → Triton GPU 추론 → Callback 전체 STT 파이프라인" />
            <div className="grid md:grid-cols-3 gap-4 my-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Workflow Worker</h4>
                <p className="text-xs text-gray-600">concurrency: 100</p>
                <p className="text-xs text-gray-600">워크플로우 오케스트레이션 전담</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">STT Worker</h4>
                <p className="text-xs text-gray-600">concurrency: 30, GPU 전담</p>
                <p className="text-xs text-gray-600">다운로드 + STT 통합 (v3.1)</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Callback Worker</h4>
                <p className="text-xs text-gray-600">별도 큐, concurrency: 50</p>
                <p className="text-xs text-gray-600">STT 포화 시에도 콜백 보장 (v3.2)</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <MetricCard label="Before" value="82-85%" desc="단일 Worker, 5분 타임아웃 발생" />
              <MetricCard label="After" value="95%+" desc="하드웨어 추가 없이 개선" />
            </div>
            <h4 className="text-base font-semibold text-gray-800 mb-3">버전별 개선 이력</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <Step num="v2.2.5" title="Temporal Payload 크기 제한 해결" desc="Activity 간 bytes 대신 파일 경로(str) 전달 → 최대 100MB 파일 지원" />
                <Step num="v3.1" title="Activity 통합 (download + transcribe)" desc="Worker 분산 문제 해결 + 파일 I/O 제거로 성능 개선" />
                <Step num="v3.2" title="Callback Queue 분리" desc="STT 워커 포화 시에도 콜백 처리 보장 (task_queue=CALLBACK_TASK_QUEUE)" />
              </div>
            </div>
          </Section>
        </div>

        {/* 4. 2-Pass Bilingual STT */}
        <div id="sym-3">
          <Section title="4. 2-Pass Bilingual STT" delay={0.25}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              "영어 위주 + 간간이 한국어"라는 환경 특성에 맞춰 2-Pass 아키텍처를 설계했습니다.
              Triton 백엔드(faster-whisper) 내부에서 2-Pass 처리하므로 Worker에서는 오디오를 전송하고 결과만 받습니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 my-4">
              <div className="space-y-3">
                <Step num="1" title="Pass 1 — English 모드" desc="빠른 baseline 추론" />
                <Step num="2" title="한국어 감지" desc="텍스트 내 한국어 문자 비율을 휴리스틱으로 분석" />
                <Step num="3" title="Pass 2 — Auto Language Detection" desc="한국어가 감지된 경우에만 재추론 (불필요한 2-Pass 방지)" />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              바이링구얼 프롬프트: "English speech: transcribe in English. 한국어 음성: 반드시 한글로 출력하세요."
              Hallucination 필터는 Triton 백엔드에서 처리합니다.
            </p>
          </Section>
        </div>

        {/* 5. Silero VAD + Smart Chunking */}
        <div id="sym-4">
          <Section title="5. Silero VAD + Smart Chunking" delay={0.3}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Whisper에 긴 오디오를 통으로 넣으면 할루시네이션이 심합니다.
              Silero VAD ONNX로 CPU에서 음성 구간을 검출하고, 24-29초 범위의 Smart Chunking으로 분할합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Silero VAD</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-gray-600">• ONNX Runtime, CPU 추론</li>
                  <li className="text-xs text-gray-600">• thread-local 모델 인스턴스 (스레드당 1회 로드)</li>
                  <li className="text-xs text-gray-600">• VAD 전용 ThreadPool (max_workers=6)</li>
                  <li className="text-xs text-gray-600">• ORT_NUM_THREADS=2로 CPU 포화 방지</li>
                  <li className="text-xs text-gray-600">• 800ms 기준 세그먼트 병합</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Smart Chunking</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-gray-600">• MIN: 24초, TARGET: 27.5초, HARD LIMIT: 29초</li>
                  <li className="text-xs text-gray-600">• 긴 침묵(0.8초) 기준 분할 → 문장 중간 끊김 방지</li>
                  <li className="text-xs text-gray-600">• 5ms micro-fade로 갑작스러운 잘림 노이즈 방지</li>
                  <li className="text-xs text-gray-600">• 25.5초 초과 세그먼트는 0.8초 오버랩으로 재분할</li>
                  <li className="text-xs text-gray-600">• 0.2초 미만 청크 자동 제거</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              멀티 GPU Round-robin 로드밸런싱: <code className="text-xs bg-gray-100 px-1 rounded">_rr_lock</code>으로
              thread-safe하게 다음 Triton URL 선택, 스레드별 gRPC 클라이언트 캐싱으로 TCP/TLS 핸드셰이크 비용 제거.
              비동기 병렬 추론은 <code className="text-xs bg-gray-100 px-1 rounded">asyncio.Semaphore(max_inflight=16)</code>으로 동시 요청 제한.
            </p>
          </Section>
        </div>

        {/* 6. 재시도 정책 */}
        <div id="sym-5">
          <Section title="6. 재시도 정책 차등 설계" delay={0.35}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              모든 작업에 동일한 재시도를 적용하면 GPU 큐 대기 낭비가 발생합니다.
              작업 특성에 따라 재시도 정책을 차등 설계하고, 재시도 불가능한 에러를 명시적으로 분리했습니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">정책</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">interval</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">backoff</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">최대 시도</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">non_retryable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium">NETWORK</td>
                    <td className="px-4 py-3">1초</td>
                    <td className="px-4 py-3">2.0x</td>
                    <td className="px-4 py-3">3회</td>
                    <td className="px-4 py-3 text-xs text-gray-600">InvalidAudio, Validation, Auth</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 font-medium">GPU_INTENSIVE</td>
                    <td className="px-4 py-3">5초</td>
                    <td className="px-4 py-3">2.0x</td>
                    <td className="px-4 py-3 font-bold">1회</td>
                    <td className="px-4 py-3 text-xs text-gray-600">+ CudaOutOfMemoryError</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium">CALLBACK</td>
                    <td className="px-4 py-3">1초</td>
                    <td className="px-4 py-3 font-bold">3.0x</td>
                    <td className="px-4 py-3">4회</td>
                    <td className="px-4 py-3 text-xs text-gray-600">Auth, Validation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              GPU 작업은 큐가 밀려서 실패했으면 재시도해도 또 대기만 하므로 1회로 제한.
              CUDA OOM은 재시도해도 동일 결과이므로 non_retryable로 명시.
              콜백은 결과 전달이 중요하므로 backoff 3배로 4회 재시도.
            </p>
          </Section>
        </div>

        {/* 7. 보안 */}
        <div id="sym-6">
          <Section title="7. 보안 — SSRF 2중 방어" delay={0.4}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Gateway가 콜백 URL을 받아서 Worker가 요청을 보내는 구조이므로, 공격자가 내부 네트워크에 접근할 수 있는
              SSRF(Server-Side Request Forgery) 위험이 있었습니다. 2중 방어를 구현했습니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">1차 방어 (Gateway)</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-gray-600">• 호스트 블랙리스트 (localhost, 127.0.0.1 등)</li>
                  <li className="text-xs text-gray-600">• 내부 도메인 패턴 차단 (.local, .internal, .svc)</li>
                  <li className="text-xs text-gray-600">• 위험 포트 차단 (22, 23, 25, 3389)</li>
                  <li className="text-xs text-gray-600">• IP 직접 검증 (Private/Loopback/Reserved)</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">2차 방어 (Worker)</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-gray-600">• DNS 해석 후 실제 IP가 Private 대역인지 재검증</li>
                  <li className="text-xs text-gray-600">• DNS Rebinding 공격 방어</li>
                  <li className="text-xs text-gray-600">• 화이트리스트 호스트는 검증 건너뜀</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              추가로 Graceful Shutdown(RequestTrackingMiddleware로 활성 요청 추적, shutdown_timeout 동안 완료 대기),
              RFC 7807 Problem Details 에러 표준, hmac.compare_digest(Timing Attack 방어), Path Traversal 검증을 적용했습니다.
            </p>
          </Section>
        </div>

        {/* 8. 모니터링 + Tech Stack */}
        <div id="sym-7">
          <Section title="8. 모니터링 + Tech Stack" delay={0.45}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Prometheus + Grafana + DCGM Exporter로 요청 처리량, GPU 메트릭, Temporal 실행 이력을 실시간 모니터링합니다.
            </p>
            <h4 className="text-base font-semibold text-gray-800 mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {["Python", "FastAPI", "Temporal", "Triton Inference Server", "Faster Whisper Large-v3-turbo", "Silero VAD (ONNX)", "Docker Compose", "Prometheus", "Grafana", "DCGM Exporter", "gRPC", "MinIO"].map((tag, i) => (
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </motion.div>
  );
}

function Step({ num, title, desc }: { num: string; title: string; desc?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex-shrink-0 px-2 py-1 rounded bg-blue-600 text-white text-xs font-bold">{num}</span>
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
