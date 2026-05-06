import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function KeywordSpottingDetail() {
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
            <span className="text-sm text-slate-500">2025.03 - 2025.07</span>
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-slate-100 text-slate-600">(주)사운드마인드</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">커스텀 음성 키워드 인식 시스템</h1>
          <p className="text-lg text-slate-600">한국어 웨이크워드("깨비야") 인식 — KWT-3 Transformer + TFLite 엣지 배포</p>
        </motion.div>

        {/* 목차 */}
        <Section title="Contents" delay={0.05}>
          <nav className="grid md:grid-cols-2 gap-2">
            {["Overview", "System Architecture", "데이터 증강 전략", "Dual-Threshold 검출", "TFLite 양자화", "성과", "역할 및 Tech Stack"].map((item, i) => (
              <button key={i} onClick={() => document.getElementById(`kws-${i}`)?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-left">
                {i + 1}. {item}
              </button>
            ))}
          </nav>
        </Section>

        {/* 1. Overview */}
        <div id="kws-0">
          <Section title="1. Overview" delay={0.1}>
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">주요 성과</h4>
              <ul className="space-y-1">
                <li className="text-sm text-slate-700">• 웨이크워드 인식률 96.81% (6,041 / 6,240 샘플)</li>
                <li className="text-sm text-slate-700">• False Alarm Rate 0.0% — 12시간+ 연속 테스트, 431,991 윈도우</li>
                <li className="text-sm text-slate-700">• TFLite INT8 양자화로 엣지 디바이스 배포</li>
                <li className="text-sm text-slate-700">• 노이즈 환경(SNR 20dB) 인식률 86.60% — Clean 대비 +38.49%p</li>
              </ul>
            </div>
            <p className="text-base text-slate-700 leading-relaxed mb-3">
              사운드마인드의 음성 AI 서비스에서 사용자가 "깨비야"라고 호출하면 시스템이 활성화되는 웨이크워드 감지 기능을 단독 개발했습니다.
            </p>
            <p className="text-base text-slate-700 leading-relaxed">
              핵심 과제는 두 가지였습니다. 첫째, <strong>한국어 커스텀 키워드라 학습 데이터가 부족</strong>한 문제.
              둘째, <strong>실환경 배경 소음 속에서 False Alarm 없이 동작</strong>해야 하는 문제.
              초기 단순 argmax 방식에서는 FA Rate가 2.04%였는데, 웨이크워드 시스템에서 오탐은 인식 실패보다 치명적입니다.
            </p>
          </Section>
        </div>

        {/* 2. System Architecture */}
        <div id="kws-1">
          <Section title="2. System Architecture" delay={0.15}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              RNN/CNN 대신 Transformer를 선택한 이유는 1초 오디오 윈도우에서 글로벌 self-attention이
              장거리 음향 의존성을 더 잘 포착하기 때문입니다. 웨이크워드는 고유한 시간적 패턴을 가지므로
              time-domain attention이 효과적입니다.
            </p>
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <MetricCard label="입력" value="Mel Spectrogram" desc="98×40 (16kHz)" />
              <MetricCard label="구조" value="12L / 3H / 192d" desc="Encoder, MLP=768" />
              <MetricCard label="출력" value="3-class Softmax" desc="silence, unknown, kkaebiya" />
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">Mel Spectrogram 파라미터</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="text-xs text-slate-600"><span className="font-medium">Window</span>: 30ms</div>
                <div className="text-xs text-slate-600"><span className="font-medium">Stride</span>: 10ms</div>
                <div className="text-xs text-slate-600"><span className="font-medium">Mel bins</span>: 80</div>
                <div className="text-xs text-slate-600"><span className="font-medium">DCT</span>: 40</div>
                <div className="text-xs text-slate-600"><span className="font-medium">n_fft</span>: 512→1024</div>
                <div className="text-xs text-slate-600"><span className="font-medium">Upper edge</span>: 7600Hz</div>
                <div className="text-xs text-slate-600"><span className="font-medium">Attention</span>: time</div>
                <div className="text-xs text-slate-600"><span className="font-medium">Dropout</span>: 0.0</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                n_fft를 512에서 1024로 올려 주파수 해상도를 개선. Dropout을 0.0으로 설정하고 SpecAugment + 노이즈 합성에 의존 — 소규모 키워드 태스크에서 더 효과적
              </p>
            </div>
          </Section>
        </div>

        {/* 3. 데이터 증강 전략 */}
        <div id="kws-2">
          <Section title="3. 데이터 증강 전략" delay={0.2}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              커스텀 한국어 키워드라 공개 데이터셋이 없고, 자체 녹음 데이터만으로는 부족했습니다.
              다차원 데이터 증강으로 학습 데이터를 5배 확장하여 이 문제를 해결했습니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">오프라인 증강 (5배 확장)</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-slate-600">• <strong>Pitch Shifting</strong> — +2 semitone</li>
                  <li className="text-xs text-slate-600">• <strong>Time Stretching</strong> — 1.2x 속도</li>
                  <li className="text-xs text-slate-600">• <strong>Gaussian Noise</strong> — σ=0.005</li>
                  <li className="text-xs text-slate-600">• <strong>Volume Augmentation</strong> — 1.5x, clip(-1, 1)</li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">학습 시 온라인 증강</h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-slate-600">• <strong>SpecAugment</strong> — time mask 2×25, freq mask 2×7</li>
                  <li className="text-xs text-slate-600">• <strong>배경 소음 합성</strong> — volume=0.1, frequency=70%</li>
                  <li className="text-xs text-slate-600">• <strong>Resample</strong> — 15% 확률</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">RMS 정규화</h4>
              <p className="text-xs text-slate-600">
                녹음 환경별 음량 차이를 보정하기 위해 키워드 RMS=0.07, 배경소음 RMS=0.05로 통일.
                일관된 SNR을 유지하여 학습 조건을 안정화했습니다.
              </p>
            </div>
          </Section>
        </div>

        {/* 4. Dual-Threshold 검출 */}
        <div id="kws-3">
          <Section title="4. Dual-Threshold 검출" delay={0.25}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              초기 단순 argmax 방식에서는 FA Rate가 2.04%였습니다. 이를 0.0%로 낮추기 위해
              이중 임계값 + score buffer 방식을 설계했습니다.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Step num="1" title="슬라이딩 윈도우" desc="0.1초 stride로 연속 1초 오디오를 윈도우 처리" />
                <Step num="2" title="Score Buffer" desc="최근 10프레임의 스코어를 버퍼에 관리" />
                <Step num="3" title="T1 후보 수집" desc="T1(0.92) 이상인 히트 횟수 카운트" />
                <Step num="4" title="T2 확정" desc="MAX(score_buffer) > T2(0.934) 동시 충족 시 감지 확정" />
                <Step num="5" title="버퍼 초기화" desc="감지 확정 후 score_buffer.clear() — 중복 감지 방지" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">Before — 단순 argmax</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-slate-600">• FA Rate: <strong className="text-red-600">2.04%</strong></li>
                  <li className="text-xs text-slate-600">• 순간 노이즈에도 오탐 발생</li>
                  <li className="text-xs text-slate-600">• 서비스 사용 불가 수준</li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">After — Dual-Threshold + Buffer</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-slate-600">• FA Rate: <strong className="text-green-600">0.0%</strong></li>
                  <li className="text-xs text-slate-600">• 431,991 윈도우 / 12시간+ 연속 테스트</li>
                  <li className="text-xs text-slate-600">• 0건의 False Alarm</li>
                </ul>
              </div>
            </div>
          </Section>
        </div>

        {/* 5. TFLite 양자화 */}
        <div id="kws-4">
          <Section title="5. TFLite 양자화" delay={0.3}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              학습된 모델을 엣지 디바이스에서 실행하기 위해 TFLite 변환 + INT8 post-training 양자화를 적용했습니다.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Step num="1" title="SavedModel → TFLite 변환" desc="OPTIMIZE_FOR_SIZE 옵션으로 모델 크기 최적화" />
                <Step num="2" title="INT8 Post-training 양자화" desc="모델 크기 약 75% 감소" />
                <Step num="3" title="Mel Spectrogram 내장" desc="모델 내부에 Mel 연산 포함 — 별도 전처리 없이 오디오 직접 입력" />
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Non-streaming(일괄 처리)과 Streaming(외부 상태, 실시간 처리) 두 가지 모드를 지원합니다.
              TFLite 변환 시 입력 shape을 고정하여 인터프리터 최적화를 적용했습니다.
            </p>
          </Section>
        </div>

        {/* 6. 성과 */}
        <div id="kws-5">
          <Section title="6. 성과" delay={0.35}>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">테스트</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">결과</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm text-slate-700">웨이크워드 인식률</td>
                    <td className="px-4 py-2 text-sm font-bold text-slate-900">96.81%</td>
                    <td className="px-4 py-2 text-xs text-slate-500">6,041 / 6,240 샘플</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm text-slate-700">False Alarm Rate</td>
                    <td className="px-4 py-2 text-sm font-bold text-slate-900">0.0%</td>
                    <td className="px-4 py-2 text-xs text-slate-500">0 / 431,991 윈도우 (12시간+ 연속)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-sm text-slate-700">노이즈 환경 인식률 (SNR 20dB)</td>
                    <td className="px-4 py-2 text-sm font-bold text-slate-900">86.60%</td>
                    <td className="px-4 py-2 text-xs text-slate-500">Clean 48.11% 대비 +38.49%p</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600">
              노이즈 환경에서 오히려 인식률이 올라간 이유는 학습 시 배경 소음 합성(volume=0.1, frequency=70%)을
              적극 적용하여 노이즈에 강건한 모델이 만들어졌기 때문입니다. Clean 환경의 낮은 인식률은
              Dual-Threshold 검출 조건이 엄격하기 때문 — FA 방지를 우선한 트레이드오프입니다.
            </p>
          </Section>
        </div>

        {/* 7. 역할 및 Tech Stack */}
        <div id="kws-6">
          <Section title="7. 역할 및 Tech Stack" delay={0.4}>
            <h4 className="text-base font-semibold text-slate-800 mb-3">역할</h4>
            <ul className="space-y-2 mb-6">
              <BulletItem text="모델 선정(KWT-3), 데이터 증강, 학습, FA 테스트, TFLite 양자화까지 전체 파이프라인 단독 수행" />
              <BulletItem text="Dual-Threshold + Score Buffer 검출 로직 설계 — FA Rate 2.04% → 0.0% 개선" />
              <BulletItem text="A/B 테스트 프레임워크 구축 — Clean vs. Noisy 환경 비교 자동화" />
            </ul>
            <h4 className="text-base font-semibold text-slate-800 mb-3">주요 기술 결정</h4>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">결정</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">이유</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-700">KWT-3 &gt; RNN/CNN</td>
                    <td className="px-4 py-2 text-xs text-slate-500">1초 윈도우에서 글로벌 attention이 시간적 패턴 포착에 유리</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-700">Dual-Threshold + Buffer</td>
                    <td className="px-4 py-2 text-xs text-slate-500">단일 threshold로는 2.04% FA → 이중 조건으로 0.0%</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-700">Dropout=0.0</td>
                    <td className="px-4 py-2 text-xs text-slate-500">소규모 태스크에서 SpecAugment + 노이즈 합성이 더 효과적</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2 text-xs text-slate-700">n_fft 512→1024</td>
                    <td className="px-4 py-2 text-xs text-slate-500">주파수 해상도 개선으로 한국어 음소 구분력 향상</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4 className="text-base font-semibold text-slate-800 mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {["Python", "TensorFlow 2.4", "KWT-3 Transformer", "TFLite", "CUDA 11", "Mel Spectrogram", "SpecAugment", "Silero VAD", "librosa"].map((tag, i) => (
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
