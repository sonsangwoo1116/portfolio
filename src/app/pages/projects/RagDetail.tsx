import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function RagDetail() {
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
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-purple-100 text-purple-700">LLM/RAG</span>
            <span className="text-sm text-gray-500">2025.06 - 2025.07</span>
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-600">(주)사운드마인드</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">기업 문서 RAG 질의응답 시스템</h1>
          <p className="text-lg text-gray-600">문서 업로드 즉시 VectorDB 인덱싱 + RAG 기반 Q&A 및 요약 챗봇</p>
        </motion.div>

        {/* 목차 */}
        <Section title="Contents" delay={0.05}>
          <nav className="grid md:grid-cols-2 gap-2">
            {["Overview", "System Architecture", "LangGraph 듀얼 그래프", "문서 파싱 및 구조 보존", "Map-Reduce 요약", "로컬 임베딩 + 멀티 유저", "역할", "Tech Stack"].map((item, i) => (
              <button key={i} onClick={() => document.getElementById(`rag-${i}`)?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-left">
                {i + 1}. {item}
              </button>
            ))}
          </nav>
        </Section>

        {/* 1. Overview */}
        <div id="rag-0">
          <Section title="1. Overview" delay={0.1}>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">핵심 성과</h4>
              <ul className="space-y-1">
                <li className="text-sm text-gray-700">• LangGraph 듀얼 그래프로 문서 처리·채팅 블로킹 해결</li>
                <li className="text-sm text-gray-700">• 최대 50MB / 100페이지 문서 즉시 처리</li>
                <li className="text-sm text-gray-700">• 토크나이저 기반 동적 Map-Reduce 재귀적 요약</li>
                <li className="text-sm text-gray-700">• 로컬 임베딩(BGE-M3)으로 외부 API 의존성 제거</li>
              </ul>
            </div>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              기업 데이터 플랫폼 상용화 데모로 개발한 실시간 문서 업로드 RAG 챗봇입니다.
              문서를 업로드하면 즉시 파싱 → 임베딩 → VectorDB 인덱싱이 완료되어 바로 검색과 질의응답이 가능합니다.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              핵심 과제는 두 가지였습니다. 첫째, <strong>문서 처리(파싱→임베딩→인덱싱) 중 채팅이 블로킹</strong>되는 문제.
              둘째, <strong>PDF 텍스트 추출 시 표/제목/이미지 구조가 손실</strong>되어 RAG 청킹 품질이 떨어지는 문제.
            </p>
          </Section>
        </div>

        {/* 2. System Architecture */}
        <div id="rag-1">
          <Section title="2. System Architecture" delay={0.15}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              DocumentManagement와 ChatBot 두 개의 독립적인 LangGraph 그래프로 구성됩니다.
              각 그래프는 내부에서 조건부 라우팅으로 워크플로우를 자동 분기합니다.
            </p>
            <ImagePlaceholder label="시스템 아키텍처 — DocumentManagement Graph + ChatBot Graph + VectorDB + vLLM" />
            <div className="mt-4 grid md:grid-cols-3 gap-3">
              <MetricCard label="LLM" value="Qwen3-14B-AWQ" desc="vLLM 서빙, max_tokens 2048" />
              <MetricCard label="Embedding" value="BGE-M3" desc="로컬 Ollama, 100개 언어" />
              <MetricCard label="VectorDB" value="Chroma" desc="즉시 인덱싱, 유저별 격리" />
            </div>
          </Section>
        </div>

        {/* 3. LangGraph 듀얼 그래프 */}
        <div id="rag-2">
          <Section title="3. LangGraph 듀얼 그래프" delay={0.2}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              문서 처리(동기, 무거움)와 채팅(비동기, 가벼움)의 실행 패턴이 달라
              단일 그래프로 합치면 문서 처리 중 채팅이 블로킹되는 문제가 발생했습니다.
              이를 해결하기 위해 두 개의 독립적인 LangGraph 그래프로 분리 설계했습니다.
            </p>
            <ImagePlaceholder label="LangGraph 듀얼 그래프 플로우 — DocumentManagement(Add/Delete 분기) + ChatBot(QA/Summary 분기)" />
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">DocumentManagement Graph</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-gray-600">• RoutingNodeLogic → Add / Delete 분기</li>
                  <li className="text-xs text-gray-600">• Parse → Chunk → VectorDB Add</li>
                  <li className="text-xs text-gray-600">• 동기 처리, 무거운 작업</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">ChatBot Graph</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-gray-600">• TaskRouting → QA / Summary 분기</li>
                  <li className="text-xs text-gray-600">• VectorCheck → Retrieval → Answer</li>
                  <li className="text-xs text-gray-600">• 비동기 스트리밍, 가벼운 작업</li>
                </ul>
              </div>
            </div>
            <ImagePlaceholder label="DocumentManagement 동작 스크린샷 — 문서 업로드 → 파싱 → 인덱싱" />
          </Section>
        </div>

        {/* 4. 문서 파싱 및 구조 보존 */}
        <div id="rag-3">
          <Section title="4. 문서 파싱 및 구조 보존" delay={0.25}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              일반 텍스트 추출(pdfplumber, PyPDF)로는 PDF의 표, 제목 계층, 이미지, 목차 구조가 전부 손실됩니다.
              RAG 청킹할 때 의미 단위를 놓치게 되어 — 표의 헤더와 데이터가 별개 청크에 들어가는 등 — 검색 품질이 떨어졌습니다.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Upstage Document Parse를 적용하여 PDF를 Markdown으로 변환, 구조를 보존했습니다.
              페이지별로 Document를 생성하고 metadata에 page/total_pages를 포함시켜 검색 시 페이지 필터링이 가능합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Before — 일반 텍스트 추출</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-gray-600">• 표 구조 손실</li>
                  <li className="text-xs text-gray-600">• 제목 계층 무시</li>
                  <li className="text-xs text-gray-600">• 이미지 참조 누락</li>
                  <li className="text-xs text-gray-600">• 청킹 시 의미 단위 깨짐</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">After — Upstage Document Parse</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-gray-600">• Markdown 구조 보존</li>
                  <li className="text-xs text-gray-600">• 제목/목차/표/리스트 유지</li>
                  <li className="text-xs text-gray-600">• 이미지 base64 → PNG 저장</li>
                  <li className="text-xs text-gray-600">• 페이지별 metadata 포함</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              파싱 결과를 json_tmp/ 디렉토리에 캐시하여 동일 문서 재업로드 시 API 중복 호출을 차단했습니다.
            </p>
            <ImagePlaceholder label="문서 파싱 결과 비교 — 일반 텍스트 vs Upstage Document Parse Markdown" />
          </Section>
        </div>

        {/* 5. Map-Reduce 요약 */}
        <div id="rag-4">
          <Section title="5. Map-Reduce 요약" delay={0.3}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              대규모 문서 요약에서 고정 배치 크기(예: 5개씩)로 묶으면 각 요약의 길이가 달라서
              어떤 묶음은 토큰이 넘치고 어떤 묶음은 남는 문제가 있었습니다.
              실제 토크나이저로 토큰 수를 계산해서 max_tokens를 초과하지 않게 동적으로 그룹을 생성하는 방식으로 해결했습니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Step num="1" title="Map — 페이지별 요약" desc="batch_size=20으로 GPU 병렬 처리" />
                <Step num="2" title="Group — 토크나이저 기반 동적 그룹핑" desc="프롬프트 템플릿 토큰 + 각 컨텍스트 토큰을 합산하여 max_tokens(2048) 초과 방지" />
                <Step num="3" title="Reduce — 재귀적 축약" desc="Reduce 결과가 여전히 여러 청크이면 다시 Reduce → 최종 하나로 수렴" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <MetricCard label="Map 배치" value="20" desc="페이지별 병렬 요약" />
              <MetricCard label="토큰 제한" value="2,048" desc="Reduce 단계 max_tokens" />
              <MetricCard label="최대 문서" value="50MB / 100페이지" desc="안정적 처리 확인" />
            </div>
            <ImagePlaceholder label="Map-Reduce 요약 동작 — 대규모 문서 요약 결과 스크린샷" />
          </Section>
        </div>

        {/* 6. 로컬 임베딩 + 멀티 유저 */}
        <div id="rag-5">
          <Section title="6. 로컬 임베딩 + 멀티 유저 데이터 격리" delay={0.35}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              외부 임베딩 API(OpenAI, Cohere)는 요청당 비용, 네트워크 지연, 가용성 의존 문제가 있습니다.
              로컬 Ollama(BGE-M3)를 선택하여 무료, 즉시, 항상 가용한 임베딩을 제공했습니다.
              100개 언어를 지원하여 다국어 요구사항도 충족합니다.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              멀티 유저 환경에서 데이터 오염을 방지하기 위해 <code className="text-sm bg-gray-100 px-1 rounded">history/{'{date}_{uuid}'}/</code> 구조로
              raw JSON, 이미지, VectorDB를 사용자별 완전 분리했습니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">외부 API 방식</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-gray-600">• 요청당 비용 발생</li>
                  <li className="text-xs text-gray-600">• 네트워크 지연</li>
                  <li className="text-xs text-gray-600">• 가용성 의존</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">로컬 Ollama (BGE-M3)</h4>
                <ul className="space-y-1">
                  <li className="text-xs text-gray-600">• 무료, 즉시, 항상 가용</li>
                  <li className="text-xs text-gray-600">• 100개 언어 지원</li>
                  <li className="text-xs text-gray-600">• 외부 의존성 제거</li>
                </ul>
              </div>
            </div>
            <ImagePlaceholder label="RAG Q&A 동작 — 문서 검색 + 응답 생성 스크린샷" />
          </Section>
        </div>

        {/* 7. 역할 */}
        <div id="rag-6">
          <Section title="7. 역할" delay={0.4}>
            <ul className="space-y-3">
              <BulletItem text="전체 RAG 파이프라인(파싱 → 임베딩 → 검색 → 응답 → 요약) 설계부터 구현까지 단독 수행" />
              <BulletItem text="LangGraph 그래프 2개의 아키텍처, 토큰 기반 그룹핑, 멀티유저 격리 등 세부 설계 전부 직접" />
              <BulletItem text="Streamlit 데모 UI + FastAPI 백엔드 + vLLM 서빙 구성" />
            </ul>
          </Section>
        </div>

        {/* 8. Tech Stack */}
        <div id="rag-7">
          <Section title="8. Tech Stack" delay={0.45}>
            <div className="flex flex-wrap gap-2">
              {["Python", "FastAPI", "LangGraph", "LangChain", "vLLM (Qwen3-14B-AWQ)", "Ollama (BGE-M3)", "Chroma", "Upstage Document Parse", "Streamlit"].map((tag, i) => (
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

function BulletItem({ text }: { text: string }) {
  return (
    <li className="text-base text-gray-700 flex items-start gap-2">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
      <span>{text}</span>
    </li>
  );
}
