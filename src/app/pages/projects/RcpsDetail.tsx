import { motion } from "motion/react";
import { ArrowLeft, BookOpen, Github } from "lucide-react";
import { DemoImage } from "../../components/DemoImage";
import { FloatingTOC } from "../../components/FloatingTOC";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export function RcpsDetail() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => { window.location.hash = ""; }}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-amber-100 text-amber-700">Research</span>
            <span className="text-sm text-slate-500">2026.05 - 2026.08</span>
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-700">EMNLP 2026 Industry Track · Accepted</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">RCPS — 문서 RAG 파서 선택·진단 프레임워크</h1>
          <p className="text-lg text-slate-600">
            Retrieval-Conditional Parsing Score (RCPS): Choosing Document Parsers by Retrieval, Not by Appearance
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="https://github.com/wigtn/WigtnOCR-RADP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href={asset("papers/rcps-emnlp-2026-camera-ready.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <BookOpen className="w-4 h-4" /> Camera-Ready PDF
            </a>
          </div>
        </motion.div>

        <FloatingTOC items={[
          { id: "rcps-0", title: "Overview" },
          { id: "rcps-1", title: "Research Question" },
          { id: "rcps-2", title: "RCPS Protocol" },
          { id: "rcps-3", title: "Evaluation" },
          { id: "rcps-4", title: "Coverage" },
          { id: "rcps-5", title: "Parser Training" },
          { id: "rcps-6", title: "역할 및 Tech Stack" },
        ]} />

        <div id="rcps-0">
          <Section title="1. Overview" delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
              <MetricCard label="Publication" value="Accepted" desc="EMNLP 2026 Industry Track" />
              <MetricCard label="Role" value="1st Author" desc="연구·실험·집필·카메라레디 주도" />
              <MetricCard label="Evaluation" value="294p / 663 Q-A" desc="고정 held-out retrieval probe" />
              <MetricCard label="Selection Gain" value="+42.6pp" desc="Hit@1 · MinerU-on → Prod" />
            </div>
            <p className="text-base text-slate-700 leading-relaxed mb-3">
              Document RAG는 파서가 만든 텍스트에서 정보를 검색하지만, 기존 파서 평가는 편집거리나
              경계 품질처럼 <strong>사람이 보기에 얼마나 깔끔한지</strong>를 중심으로 이루어집니다.
              이 연구는 파서를 실제 retrieval 성능으로 선택하는 training-free 프로토콜
              <strong> RCPS</strong>와, 성능 손실이 파서 누락인지 청킹 경계인지 구분하는 coverage 진단을 제안합니다.
            </p>
            <p className="text-base text-slate-700 leading-relaxed">
              핵심 배포 원칙은 단순합니다. <strong>RCPS로 선택하고, coverage로 원인을 진단한 뒤,
              필요한 경우에만 파서를 학습합니다.</strong>
            </p>
            <DemoImage
              src={asset("rcps-overview.png")}
              alt="RCPS 선택과 coverage 진단 워크플로"
              caption="고정 평가 프레임에서 parser-chunker 후보를 RCPS로 선택하고, coverage로 손실 위치를 진단한 뒤 필요한 경우에만 개입하는 전체 워크플로"
            />
          </Section>
        </div>

        <div id="rcps-1">
          <Section title="2. Research Question — 보기 좋은 파서가 검색도 잘할까?" delay={0.15}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              Boundary Clarity(BC)는 청크 경계가 의미적으로 자연스러운지를 측정하지만, 표의 값·단위·문장처럼
              검색에 필요한 내용이 실제로 보존됐는지는 직접 측정하지 않습니다. 그 결과 intrinsic metric과
              downstream retrieval이 서로 반대 방향의 선택을 만들 수 있습니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <CompareCard
                title="MinerU-on"
                rows={[
                  ["Boundary Clarity", "0.713"],
                  ["RCPS", "0.137"],
                  ["Hit@1", "0.123"],
                ]}
              />
              <CompareCard
                title="Prod (WigtnOCR-2B)"
                rows={[
                  ["Boundary Clarity", "0.610"],
                  ["RCPS", "0.583"],
                  ["Hit@1", "0.549"],
                ]}
                accent
              />
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-900">
                MinerU-on은 BC가 더 높지만 Prod보다 Hit@1이 <strong>42.6 percentage points 낮았습니다.</strong>
                동일한 관점에서 Prod의 Hit@1은 MinerU-on의 <strong>4.47배</strong>입니다.
              </p>
            </div>
            <DemoImage
              src={asset("rcps-disconnect.png")}
              alt="Boundary Clarity와 RCPS 불일치 및 Hit@1 비교"
              caption="Intrinsic boundary quality가 실제 retrieval 성능을 잘못 순위화할 수 있음을 보여주는 카메라레디 Figure 4"
            />
          </Section>
        </div>

        <div id="rcps-2">
          <Section title="3. RCPS Protocol" delay={0.2}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              RCPS는 새로운 임베딩 모델이 아니라, 모든 parser-chunker 후보를 같은 조건에서 비교하는
              <strong> 평가 프로토콜</strong>입니다. 별도 학습 없이 기존 검색기의 MRR을 집계합니다.
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-lg px-4 py-3 mb-4 overflow-x-auto">
              <code className="text-sm whitespace-nowrap">
                RCPS(P, C; D, R, K) = average MRR@k over retrievers R and depths K
              </code>
            </div>
            <div className="space-y-3 mb-4">
              <Step num="1" title="후보 인덱스 구축" desc="각 parser P와 chunker C 조합으로 동일한 294페이지 corpus를 인덱싱" />
              <Step num="2" title="고정 프로브 검색" desc="모든 후보에 같은 663 Q-A와 BGE-M3, multilingual-e5-large, Qwen3-Embedding-8B를 적용" />
              <Step num="3" title="공통 relevance 판정" desc="source page가 같고 정규화된 answer span을 포함한 chunk만 relevant로 판정" />
              <Step num="4" title="Retriever-averaged MRR" desc="k={1,5,10}의 MRR을 retriever와 depth 전체에서 평균해 후보를 순위화" />
            </div>
            <DemoImage
              src={asset("rcps-protocol.png")}
              alt="RCPS 평가 프로토콜"
              caption="동일한 Q-A probe, retriever, retrieval depth, relevance rule로 parser-chunker 후보를 비교하는 RCPS 프로토콜"
            />
          </Section>
        </div>

        <div id="rcps-3">
          <Section title="4. Evaluation — Parser × Chunker Full Grid" delay={0.25}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              229개 한국 정부문서 페이지와 65개 arXiv 페이지로 구성한 294페이지 인덱스에서
              663개 Q-A를 검색했습니다. 아래 5개 파서는 모든 페이지 출력이 갖춰진 동일 조건 비교입니다.
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 border-b">Parser</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-slate-700 border-b">BC</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-slate-700 border-b">RCPS</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-slate-700 border-b">Hit@1</th>
                  </tr>
                </thead>
                <tbody>
                  <ResultRow name="Qwen3-VL-30B (teacher)" bc="0.623" rcps="0.584" hit="0.545" />
                  <ResultRow name="Prod (ours, 2B)" bc="0.610" rcps="0.583" hit="0.549" highlight />
                  <ResultRow name="Qwen3-VL-2B (base)" bc="0.520" rcps="0.532" hit="0.500" />
                  <ResultRow name="PaddleOCR" bc="—" rcps="0.140" hit="0.125" />
                  <ResultRow name="MinerU-on" bc="0.713" rcps="0.137" hit="0.123" />
                </tbody>
              </table>
            </div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Prod 고정 시 Chunker 순위</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <MetricCard label="md-h3" value="0.593" desc="1위" />
              <MetricCard label="parser-native" value="0.583" desc="2위" />
              <MetricCard label="LumberChunker" value="0.557" desc="3위" />
              <MetricCard label="fixed500" value="0.535" desc="4위" />
            </div>
          </Section>
        </div>

        <div id="rcps-4">
          <Section title="5. Coverage — 파서 누락과 청킹 분할 분리" delay={0.3}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              낮은 retrieval 점수만으로는 파서를 바꿔야 하는지, chunk overlap을 조정해야 하는지 알 수 없습니다.
              Coverage 진단은 reference span을 세 가지 상태로 분류해 먼저 손봐야 할 레이어를 찾습니다.
            </p>
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <StatusCard title="Covered" desc="정답 span이 하나의 chunk 안에 보존됨" tone="green" />
              <StatusCard title="Split" desc="페이지에는 있지만 chunk 경계에서 분할됨" tone="amber" />
              <StatusCard title="Absent" desc="파서 출력에서 정규화 exact span을 찾을 수 없음" tone="red" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Prod 출력의 <strong>20.2%</strong>는 chunking 전에 이미 exact-span absent</li>
                <li>• 8개 chunker에서 split 비율은 최대 <strong>2.3%</strong></li>
                <li>• Split은 overlap/chunker 조정, absent는 parser 출력 점검·교체가 우선</li>
              </ul>
            </div>
            <DemoImage
              src={asset("rcps-coverage.png")}
              alt="Coverage 진단 결과"
              caption="파서 출력의 20.2% exact-span absence는 청커를 바꿔도 유지되고, chunk-boundary split만 0-2.3% 범위에서 변함"
            />
          </Section>
        </div>

        <div id="rcps-5">
          <Section title="6. Parser Training — 선택 이후의 보조 레버" delay={0.35}>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              Coverage가 parser-side 문제를 가리킬 때를 위해 Retrieval-Aware Document Parsing(RADP)을
              보조 연구로 평가했습니다. 긍정적인 수치만 고르는 대신, 사전 기준과 대조 실험을 함께 보고했습니다.
            </p>
            <div className="space-y-3 mb-4">
              <Step num="1" title="RADP-aux" desc="hidden-state contrastive loss를 추가했지만 사전 정의한 +5pp 성공 기준을 충족하지 못함" />
              <Step num="2" title="RADP-DPO" desc="retrieval reward로 preference pair를 구성. R2/R3는 audited 2,036 Q-A subset에서 Prod 대비 Hit@5 +0.95/+1.15pp" />
              <Step num="3" title="Matched control" desc="edit-distance 기반 Distill이 +1.36pp였고 Distill-DPO paired interval이 0을 포함해 retrieval reward 우월성을 주장하지 않음" />
              <Step num="4" title="Reproducibility" desc="RADP-aux, DPO, Distill, SimPO를 포함한 9개 adapter와 실행 provenance 공개" />
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                같은 수치 단위로 직접 비교할 수는 없지만, 후보 선택의 <strong>42.6pp</strong> 차이와
                학습 체크포인트의 약 <strong>1pp</strong> 차이는 배포에서 선택을 학습보다 먼저 해야 한다는 결론을 뒷받침합니다.
              </p>
            </div>
          </Section>
        </div>

        <div id="rcps-6">
          <Section title="7. 역할 및 Tech Stack" delay={0.4}>
            <h4 className="text-base font-semibold text-slate-800 mb-3">역할 (1저자 / Research Lead)</h4>
            <ul className="space-y-2 mb-6">
              <BulletItem text="연구 질문 정의 및 RCPS 평가 프로토콜·coverage 진단 설계" />
              <BulletItem text="294페이지·663 Q-A parser/chunker full-grid와 3-retriever 평가 파이프라인 구현" />
              <BulletItem text="RADP-aux/DPO/Distill/SimPO 학습 및 paired bootstrap·cross-domain 검증 주도" />
              <BulletItem text="논문 1저자 집필, rebuttal 대응, accepted paper의 camera-ready 수정·수치 감사 총괄" />
              <BulletItem text="평가 코드, 데이터 probe, 결과 manifest, 9개 LoRA adapter 공개 및 재현성 게이트 구축" />
            </ul>
            <h4 className="text-base font-semibold text-slate-800 mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Python",
                "PyTorch",
                "Transformers",
                "Qwen3-VL",
                "BGE-M3",
                "multilingual-e5-large",
                "Qwen3-Embedding-8B",
                "PEFT / LoRA",
                "DPO / SimPO",
                "Bootstrap CI",
                "LaTeX",
                "OpenReview",
              ].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

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

function MetricCard({ label, value, desc }: { label: string; value: string; desc: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="text-lg font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-xs text-slate-600">{desc}</div>
    </div>
  );
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">{num}</span>
      <div>
        <span className="text-sm font-medium text-slate-800">{title}</span>
        <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function CompareCard({ title, rows, accent = false }: { title: string; rows: [string, string][]; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${accent ? "bg-blue-50 border-blue-200" : "bg-slate-50 border-slate-200"}`}>
      <h4 className="text-sm font-semibold text-slate-900 mb-3">{title}</h4>
      <dl className="space-y-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <dt className="text-xs text-slate-600">{label}</dt>
            <dd className="text-sm font-semibold text-slate-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ResultRow({ name, bc, rcps, hit, highlight = false }: { name: string; bc: string; rcps: string; hit: string; highlight?: boolean }) {
  return (
    <tr className={`border-b border-slate-100 last:border-b-0 ${highlight ? "bg-blue-50" : ""}`}>
      <td className={`px-4 py-2 text-xs ${highlight ? "font-semibold text-blue-900" : "text-slate-700"}`}>{name}</td>
      <td className="px-4 py-2 text-xs text-right text-slate-600">{bc}</td>
      <td className={`px-4 py-2 text-xs text-right ${highlight ? "font-semibold text-blue-900" : "text-slate-600"}`}>{rcps}</td>
      <td className={`px-4 py-2 text-xs text-right ${highlight ? "font-semibold text-blue-900" : "text-slate-600"}`}>{hit}</td>
    </tr>
  );
}

function StatusCard({ title, desc, tone }: { title: string; desc: string; tone: "green" | "amber" | "red" }) {
  const toneClasses = {
    green: "bg-green-50 border-green-200 text-green-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    red: "bg-red-50 border-red-200 text-red-800",
  };
  return (
    <div className={`rounded-lg border p-4 ${toneClasses[tone]}`}>
      <div className="text-sm font-semibold mb-1">{title}</div>
      <p className="text-xs opacity-80">{desc}</p>
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
