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
            {["Overview", "System Architecture", "DocumentManagement Graph", "ChatBot Graph", "문서 파싱 및 구조 보존", "Map-Reduce 요약", "로컬 임베딩 + 멀티 유저", "역할 및 Tech Stack"].map((item, i) => (
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
                <li className="text-sm text-gray-700">• 청크 500토큰 / 오버랩 100토큰, 검색 Top-3</li>
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
              DocumentManagement와 ChatBot 두 개의 독립적인 LangGraph StateGraph로 구성됩니다.
              문서 처리(동기, 무거움)와 채팅(비동기, 가벼움)의 실행 패턴이 달라 단일 그래프로 합치면
              문서 처리 중 채팅이 블로킹되는 문제가 발생하여 분리했습니다.
            </p>
            <ImagePlaceholder label="시스템 아키텍처 — DocumentManagement Graph + ChatBot Graph + Chroma VectorDB + vLLM(Qwen3-14B-AWQ) + Ollama(BGE-M3)" />
            <div className="mt-4 grid md:grid-cols-4 gap-3">
              <MetricCard label="LLM" value="Qwen3-14B-AWQ" desc="vLLM 서빙, port 8000" />
              <MetricCard label="Embedding" value="BGE-M3" desc="로컬 Ollama" />
              <MetricCard label="VectorDB" value="Chroma" desc="유저별 persist" />
              <MetricCard label="API" value="FastAPI" desc="port 10101" />
            </div>
          </Section>
        </div>

        {/* 3. DocumentManagement Graph */}
        <div id="rag-2">
          <Section title="3. DocumentManagement Graph" delay={0.2}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              문서 추가(Add)와 삭제(Delete)를 처리하는 그래프입니다. RoutingNodeLogic이 operation에 따라 분기하고,
              Add 경로에서는 7단계 파이프라인을 거쳐 VectorDB에 인덱싱됩니다.
            </p>
            <ImagePlaceholder label="DocumentManagement Graph 플로우 다이어그램" />
            <div className="bg-gray-50 rounded-lg p-4 my-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Add 경로 — 7개 노드</h4>
              <div className="space-y-3">
                <Step num="1" title="routing_node" desc="RoutingNodeLogic — Add / Delete 분기" />
                <Step num="2" title="create_history_node" desc="사용자별 이력 디렉토리 생성 (history/{date}_{uuid}/)" />
                <Step num="3" title="document_parse_node" desc="Upstage Document Parse API로 PDF → JSON (캐시 적용)" />
                <Step num="4" title="make_documents_node" desc="JSON → 페이지별 LangChain Document 생성 (metadata: page/total_pages)" />
                <Step num="5" title="chunking_node" desc="chunk_size=500, chunk_overlap=100으로 분할" />
                <Step num="6" title="add_vector_db_node" desc="Ollama BGE-M3 임베딩 → Chroma VectorDB 저장" />
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Delete 경로</h4>
                <p className="text-sm text-gray-600">routing_node → delete_vector_db_node → END</p>
              </div>
            </div>
            <ImagePlaceholder label="문서 업로드 → 파싱 → 인덱싱 동작 스크린샷" />
          </Section>
        </div>

        {/* 4. ChatBot Graph */}
        <div id="rag-3">
          <Section title="4. ChatBot Graph" delay={0.25}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              사용자 질의를 처리하는 그래프입니다. TaskRoutingNodeLogic이 task(QA/Summary)에 따라 분기하고,
              QA 경로에서는 VectorDB 존재 여부를 먼저 확인합니다.
            </p>
            <ImagePlaceholder label="ChatBot Graph 플로우 다이어그램" />
            <div className="grid md:grid-cols-2 gap-4 my-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">QA 경로</h4>
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">1. TaskRouting → "QA"</p>
                  <p className="text-xs text-gray-600">2. VectorCheckNode — VectorDB 존재 확인</p>
                  <p className="text-xs text-gray-600">3-a. 있으면 → GetRetrievalNode (Top-3 검색) → GetAnswerNode (스트리밍 응답)</p>
                  <p className="text-xs text-gray-600">3-b. 없으면 → EmptyVectorResponseNode ("문서를 업로드해주세요")</p>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Summary 경로</h4>
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">1. TaskRouting → "Summary"</p>
                  <p className="text-xs text-gray-600">2. DocumentSummaryNode</p>
                  <p className="text-xs text-gray-600">3. Map(페이지별 요약) → Reduce(재귀적 축약)</p>
                  <p className="text-xs text-gray-600">4. figure/chart 카테고리 자동 필터링</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <MetricCard label="검색 결과" value="Top-3" desc="similarity_search k=3" />
              <MetricCard label="LLM 온도" value="0.0" desc="결정적 응답" />
              <MetricCard label="최대 토큰" value="2,048" desc="max_tokens" />
            </div>
            <ImagePlaceholder label="RAG Q&A 동작 스크린샷 — 질의 → 검색 → 응답 생성" />
          </Section>
        </div>

        {/* 5. 문서 파싱 및 구조 보존 */}
        <div id="rag-4">
          <Section title="5. 문서 파싱 및 구조 보존" delay={0.3}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              일반 텍스트 추출로는 PDF의 표, 제목 계층, 이미지 구조가 전부 손실됩니다.
              Upstage Document Parse API를 사용하여 HTML/Markdown/Text 3가지 형식으로 변환하고,
              figure/chart는 base64로 인코딩하여 PNG로 저장합니다.
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
                  <li className="text-xs text-gray-600">• HTML/Markdown/Text 3형식 출력</li>
                  <li className="text-xs text-gray-600">• 제목/목차/표/리스트 구조 보존</li>
                  <li className="text-xs text-gray-600">• figure/chart base64 → PNG 저장</li>
                  <li className="text-xs text-gray-600">• 페이지별 Document + metadata</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              파싱 결과를 json_tmp/ 디렉토리에 캐시합니다. <code className="text-xs bg-gray-100 px-1 rounded">ExistCheck(output_file)</code>로
              동일 문서 재업로드 시 API 중복 호출을 차단하여 비용과 지연을 절감합니다.
            </p>
            <p className="text-sm text-gray-600">
              Summary에서는 <code className="text-xs bg-gray-100 px-1 rounded">_get_pages()</code>에서
              figure/chart 카테고리를 자동 필터링하여 텍스트 요약에 이미지 설명이 섞이지 않도록 합니다.
            </p>
            <ImagePlaceholder label="문서 파싱 결과 비교 — 일반 텍스트 vs Upstage Markdown 변환" />
          </Section>
        </div>

        {/* 6. Map-Reduce 요약 */}
        <div id="rag-5">
          <Section title="6. Map-Reduce 요약" delay={0.35}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              고정 배치 크기로 묶으면 각 요약의 길이가 달라서 토큰 오버플로우가 발생합니다.
              <code className="text-xs bg-gray-100 px-1 rounded">group_by_token_limit()</code>으로
              실제 토크나이저(Qwen)로 프롬프트 템플릿 토큰 + 각 컨텍스트 토큰을 합산하여
              max_tokens를 초과하지 않게 동적으로 그룹을 생성합니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Step num="1" title="Map — 페이지별 요약" desc="batch_size=20, GPU 병렬 처리. figure/chart 카테고리 자동 제외" />
                <Step num="2" title="Group — 토크나이저 기반 동적 그룹핑" desc="template_token + context_token 합산, max_tokens(2048) 초과 시 새 그룹 생성" />
                <Step num="3" title="Reduce — 재귀적 축약" desc="_reduce_summarize()가 len(chunks)>1이면 재귀 호출 → 최종 하나로 수렴" />
                <Step num="4" title="Final — 최종 요약 스트리밍" desc="마지막 청크를 reduce_chain.astream()으로 실시간 전송" />
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

        {/* 7. 로컬 임베딩 + 멀티 유저 */}
        <div id="rag-6">
          <Section title="7. 로컬 임베딩 + 멀티 유저 데이터 격리" delay={0.4}>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              외부 임베딩 API의 비용/지연/가용성 문제를 해결하기 위해 로컬 Ollama(BGE-M3)를 선택했습니다.
              100개 언어를 지원하여 다국어 요구사항도 충족합니다.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              멀티 유저 환경에서 데이터 오염을 방지하기 위해
              <code className="text-xs bg-gray-100 px-1 rounded">history/{'{date}_{uuid}'}/</code> 구조로
              raw JSON, 이미지, VectorDB(persist_directory)를 사용자별 완전 분리했습니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">유저별 디렉토리 구조</h4>
              <pre className="text-xs text-gray-600 font-mono">
{`history/{date}_{uuid}/
├── raw/          # Upstage 파싱 JSON + 이미지
├── images/       # figure/chart PNG
└── vectorDB/     # Chroma persist_directory`}
              </pre>
            </div>
            <p className="text-sm text-gray-600">
              스트리밍 응답에서는 <code className="text-xs bg-gray-100 px-1 rounded">token_generator()</code>의
              finally 블록에서 전체 응답과 검색 결과를 한 번에 로깅합니다.
              사용자는 즉시 토큰을 받고, 관리자는 완전한 로그를 수집할 수 있습니다.
            </p>
            <ImagePlaceholder label="RAG Q&A 동작 — 검색 결과 + 응답 생성 스크린샷" />
          </Section>
        </div>

        {/* 8. 역할 및 Tech Stack */}
        <div id="rag-7">
          <Section title="8. 역할 및 Tech Stack" delay={0.45}>
            <h4 className="text-base font-semibold text-gray-800 mb-3">역할</h4>
            <ul className="space-y-2 mb-6">
              <BulletItem text="전체 RAG 파이프라인(파싱 → 임베딩 → 검색 → 응답 → 요약) 설계부터 구현까지 단독 수행" />
              <BulletItem text="LangGraph 듀얼 그래프 아키텍처, 토큰 기반 그룹핑, 멀티유저 격리 등 세부 설계 전부 직접" />
              <BulletItem text="Streamlit 데모 UI + FastAPI 백엔드(port 10101) + vLLM 서빙(port 8000) 구성" />
            </ul>
            <h4 className="text-base font-semibold text-gray-800 mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {["Python", "FastAPI", "LangGraph", "LangChain", "vLLM (Qwen3-14B-AWQ)", "Ollama (BGE-M3)", "Chroma", "Upstage Document Parse", "Streamlit", "AutoTokenizer"].map((tag, i) => (
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
