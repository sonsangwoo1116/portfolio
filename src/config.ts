// ============================================================
// config.ts — 손상우 포트폴리오
// ============================================================

export const profile = {
  name: "손상우",
  title: "AI Research Engineer",
  email: "xhxh9539@gmail.com",
  github: "https://github.com/sonsangwoo1116",
  linkedin: "https://linkedin.com/in/sangwooson",
  heroDescription: "AI 시스템을 설계하고, 실제 문제에 적용합니다.\n\n석사 과정에서 텍스트·음성 멀티모달 데이터 기반 딥러닝 모델을 연구했고, 졸업 후 음성 및 언어 AI 솔루션 기반 회사인 사운드마인드에서 AI Agent와 LLM 기반 서비스를 설계·구현하고 있습니다.\n\nAI 콜봇 대화 엔진 설계부터 기업 고객용 RAG 시스템, 대규모 음성인식 파이프라인까지, AI 서비스의 문제 정의부터 아키텍처 설계, 구현까지 전 과정을 주도하고 있습니다.",
  heroEducation: "한신대학교 IT영상데이터융합(협) 석사 (4.5/4.5, 2023-2025)\n한신대학교 IT콘텐츠학과 학사 (3.77/4.5, 2018-2023)",
  protectedPassword: "1234",
};

export interface Project {
  id: string;
  code?: string;
  title: string;
  description: string;
  domain: string;
  tags: string[];
  links: {
    live?: string;
    github?: string;
    external?: string;
  };
  protected: boolean;
  image?: string;
  date?: string;
  problemStatement?: string;
  technicalDetails?: string[];
  impact?: string;
  futureImprovements?: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "AI Agent 기반 콜봇 시스템",
    description: "보험 완전판매 모니터링 AI Agent 기반 콜봇 시스템에서 모든 발화를 LLM에 넣으면 GPU 비용과 지연이 감당되지 않는 문제를 해결했습니다. 단순 의도는 약 15ms 템플릿 응답으로, 복잡 의도만 LLM Tool Calling으로 흘려보내는 5단계 규칙 기반 가드를 9노드 상태 머신과 10개 Tool Calling 위에 직접 설계해, RTX 3090 단일 GPU에서 9B 모델로 5채널 동시 통화 P50 154ms / P99 300ms 미만, 엣지 테스트 52/52 PASS, 입력 토큰 47% 감축을 달성했습니다.",
    domain: "AI Agent",
    tags: ["Python", "FastAPI", "LLM Tool Calling", "EXAONE 9B", "Qwen3-ASR", "Silero VAD"],
    links: {},
    protected: false,
    date: "2026.03 ~ 진행중",
    problemStatement: "9B급 한국어 LLM의 동사 의미 구분·감탄사 분류·답변 번복 인지 한계를 코드 레벨 가드로 보완하면서, GPU 비용을 통제해야 하는 것이 핵심 과제였습니다.",
    technicalDetails: [
      "9노드 상태 머신(ROOT → CONSENT → IDENTITY_VERIFICATION → MONITORING_QA → SUPPLEMENT_QA → AGENT_TRANSFER / PAYMENT_REMINDER → COMPLETED + RECONNECT) + 10개 LLM Tool 기반 AI Agent 대화 흐름 설계",
      "9B LLM + 5단계 규칙 기반 가드 — 욕설 키워드 → STT 오인식 → 대기 요청 → 답변 번복 감지 → Fast path. TTFT P50 45ms(1채널), P99 < 300ms(5채널), 포화 ~18 req/s. 비동기 히스토리 요약으로 입력 토큰 47% 감축(3735→1985)",
      "불완전판매 3중 안전망: LLM risk_suspected 1차 → 키워드 fallback 2차 → STEP 일관성 검증(step1_verb/step2_match/step3_unrelated 모순 교정). expected=no 정답 차단으로 오탐 방지",
      "음성 및 대화 엔진 전체(STT/VAD/상태 머신/가드 체인/Tool 스키마) 설계·구현 주도, 팀원 LLM 개발 코칭 병행",
    ],
    impact: "엣지 52/52 PASS, 5채널 P50 154ms / P99 < 300ms, 입력 토큰 47% 감축 | 9노드 + 10 Tool Calling",
  },
  {
    id: "3",
    title: "영어 교육용 음성인식 시스템",
    description: "Triton + Faster Whisper 기반 대규모 배치 STT 파이프라인입니다. 영어/한국어 혼합 음성을 동시에 대량 처리해야 하는 환경에서 안정적으로 동작하는 시스템을 구축했습니다.",
    domain: "AI/Voice",
    tags: ["Python", "FastAPI", "Temporal", "Triton Inference Server", "Faster Whisper", "Silero VAD", "Docker Compose", "Prometheus", "Grafana"],
    links: {},
    protected: false,
    date: "2025.11 - 2026.03",
    problemStatement: "초기 단일 Worker가 STT + 콜백을 모두 처리하는 구조에서 GPU 포화 시 콜백 전달이 수 분 지연되는 문제 발생 (성공률 82-85%)",
    technicalDetails: [
      "Gateway/STT Worker/Callback Worker 3-계층으로 분리하여 해결. 하드웨어 추가 없이 성공률 95%+, RTX 3090 2장에서 분당 200건 안정 처리 달성",
      "영어/한국어 혼합 음성을 처리하기 위해 2-Pass Bilingual STT 아키텍처 설계. Pass 1에서 English 모드로 빠른 baseline 추론 후, 한국어가 감지된 경우에만 Pass 2로 재추론",
      "Silero VAD ONNX로 CPU에서 음성 구간 검출, 24-29초 범위의 Smart Chunking으로 Whisper 할루시네이션 억제. 문장 중간 끊김 방지",
      "Temporal Activity 간 2MB 데이터 전달 제한을 파일 경로 전달 방식으로 우회하여 100MB 파일까지 처리 가능. 작업 유형별 재시도 정책 차등 설계(GPU 1회/네트워크 3회/콜백 4회)",
      "Prometheus + Grafana + DCGM Exporter로 요청 처리량, GPU 메트릭, Temporal 실행 이력을 실시간 모니터링",
    ],
    impact: "성공률 82% → 95%+ 개선, 분당 200건 안정 처리 | 3-Worker 분리 아키텍처",
  },
  {
    id: "4",
    title: "기업 문서 RAG 질의응답 시스템",
    description: "기업 데이터 플랫폼 상용화 데모로 개발한 실시간 문서 업로드 RAG 챗봇입니다. 문서를 업로드하면 즉시 파싱 → 임베딩 → VectorDB 인덱싱이 완료되어 바로 검색과 질의응답이 가능합니다.",
    domain: "LLM/RAG",
    tags: ["Python", "FastAPI", "LangGraph", "LangChain", "vLLM (Qwen3-14B-AWQ)", "Ollama (BGE-M3)", "Chroma", "Upstage Document Parse", "Streamlit"],
    links: {},
    protected: false,
    date: "2025.06 - 2025.07",
    problemStatement: "문서 처리 중 채팅이 블로킹되는 문제와 PDF 구조 손실로 인한 RAG 품질 저하가 핵심 과제였습니다.",
    technicalDetails: [
      "문서 처리(동기, 무거움)와 채팅(비동기, 가벼움)의 실행 패턴이 달라 LangGraph 듀얼 그래프(DocumentManagement/ChatBot)로 독립 설계. 단일 그래프로 합치면 문서 처리 중 채팅이 블로킹되는 문제 해결",
      "일반 텍스트 추출 대신 Upstage Document Parse를 선택하여 Markdown 구조 보존. PDF의 제목, 목차, 표, 리스트 구조가 유지되어 청킹 시 의미 단위 보존. 캐시 디렉토리로 중복 API 호출 방지",
      "대규모 문서 요약을 위해 Map(페이지별 요약, batch_size=20) → Reduce(토큰 제한 2048 고려 재귀적 축약) 패턴 구현. 토큰 기반 그루핑으로 컨텍스트 오버플로우 방지",
      "외부 임베딩 API 대신 로컬 Ollama(BGE-M3)를 선택하여 API 비용/지연 없이 다국어 임베딩 지원. 멀티 유저 데이터 격리",
    ],
    impact: "LangGraph 듀얼 그래프 | 최대 50MB/100페이지 문서 즉시 처리 | Map-Reduce 재귀적 요약",
  },
  {
    id: "5",
    title: "커스텀 음성 키워드 인식 시스템",
    description: "사운드마인드의 음성 AI 서비스에 사용할 한국어 웨이크워드 인식 시스템을 개발했습니다. KWT-3 Transformer 기반으로 모델을 학습하고, TFLite 양자화를 거쳐 엣지 디바이스에서 실행 가능한 수준까지 경량화했습니다.",
    domain: "AI/Voice",
    tags: ["TensorFlow 2.4", "KWT-3 Transformer", "TFLite", "CUDA 11", "Mel Spectrogram", "SpecAugment"],
    links: {},
    protected: false,
    date: "2025.03 - 2025.07",
    problemStatement: "초기 단순 argmax 방식에서는 False Alarm Rate가 2.04%였습니다. 웨이크워드 시스템에서 오탐은 인식 실패보다 치명적입니다.",
    technicalDetails: [
      "이중 임계값(T1=0.92 후보 수집, T2=0.934 확정) + score buffer 방식의 Dual-Threshold 검출 설계. 0.1초 stride 슬라이딩 윈도우로 최근 10프레임 관리. 연속 배경소음 테스트(431,991 윈도우)에서 0건의 False Alarm 달성",
      "커스텀 한국어 키워드라 학습 데이터가 부족한 문제를 다차원 데이터 증강으로 해결. 오프라인 증강(5배 확장) + 학습 시 증강(SpecAugment + 배경 소음 합성). RMS 정규화로 일관된 SNR 유지",
      "TFLite INT8 post-training 양자화로 엣지 디바이스 배포. Mel Spectrogram 연산을 모델 내부에 포함하여 별도 전처리 없이 오디오 직접 입력 가능",
    ],
    impact: "인식률 96.81%, 오탐률 0.0% (43만+ 윈도우 테스트) | TFLite INT8 엣지 배포",
  },
  {
    id: "6",
    title: "VoiceNote — 회의록 분석 플랫폼",
    description: "음성 녹음을 업로드하면 Whisper STT → pyannote 화자분리 → LLM 요약까지 자동으로 수행하는 회의록 분석 플랫폼을 개발했습니다. STT(NPU)/화자분리(GPU)/LLM(메모리)/VAD(CPU) 리소스 특성에 따라 5개 마이크로서비스로 분리했습니다.",
    domain: "AI/Voice",
    tags: ["Python", "FastAPI", "Whisper", "OpenVINO", "pyannote", "Intel NPU"],
    links: {},
    protected: false,
    date: "2025.02 - 2025.05",
    problemStatement: "pyannote와 Whisper의 타임스탬프는 독립적으로 계산된 별개의 결과라 불일치 문제가 있었고, Whisper에 긴 오디오를 통으로 넣으면 할루시네이션이 심한 문제가 있었습니다.",
    technicalDetails: [
      "겹침 구간의 시간 가중치로 가장 가능성 높은 화자를 판정하는 화자-텍스트 정렬 알고리즘을 직접 구현. 매칭 실패 시 인접 시간 → 직전 화자 → 직후 화자 3단계 폴백 적용",
      "Whisper 30초 제한에 맞춘 VAD 기반 청크 분할 처리로 할루시네이션 해결. 누적 오프셋으로 절대 시간 추적, 이전 청크의 나머지 파형을 다음 청크에 이어붙여 경계 단어 잘림 방지",
      "상태 자동 복구, 업로드 한 번으로 최종 결과까지 자동 도달, OpenVINO NPU 가속 Whisper INT8 양자화 추론",
    ],
    impact: "5개 마이크로서비스 | 화자-텍스트 정렬 3단계 폴백 | VAD 기반 청크 분할",
  },
  {
    id: "7",
    title: "시니어 케어 챗봇",
    description: "입사 후 첫 단독 프로젝트로, 고령자의 일일 건강 상태를 대화형으로 체크하는 AI 챗봇을 개발했습니다. 고령자가 대답이 모호하거나 질문을 이해하지 못하는 경우가 빈번한 문제를 해결했습니다.",
    domain: "LLM/RAG",
    tags: ["Ollama (Gemma3-27B)", "Streamlit", "LangChain", "WhisperX", "KADI TTS", "YAML Prompts"],
    links: {},
    protected: false,
    date: "2025.02 - 2025.05",
    problemStatement: "고령자의 비정형 답변에서 건강 상태를 파악하고 5개 영역(식사/약 복용/수면/운동/건강)을 효율적으로 순차 체크하는 것이 핵심 과제였습니다.",
    technicalDetails: [
      "2단계 상태 머신(메인 5상태 + 16개 서브 상태, 40+ 조건부 전이) 설계. 30+ 엔티티 키 정의, 상호 배타적 쌍은 코드에서 강제하여 LLM 할루시네이션 방지",
      "10+ YAML 프롬프트 템플릿으로 고령자 맞춤 대화 설계. 같은 질문 2회 이상 반복 방지 카운터 관리",
    ],
    impact: "2단계 상태 머신 (16개 서브 상태, 40+ 전이) | LLM 엔티티 추출 + 30+ 엔티티 키",
  },
  {
    id: "8",
    title: "WIGENT — AI Agent 실시간 토론 플랫폼",
    description: "주제를 던지면 PM + 도메인 전문가 AI 에이전트들이 자동 소환되어 실시간으로 토론하고, 결론으로 랜딩 페이지를 자동 생성하는 Multi-Agent 토론 플랫폼입니다. 아이디어 제안 및 에이전트 시스템 설계·구현을 담당했습니다. 🏆 Build with TRAE Hackathon 대상",
    domain: "Side Project",
    tags: ["Next.js 16", "TypeScript", "GPT-4o", "Multi-Agent Orchestration", "Framer Motion"],
    links: { github: "https://github.com/wigtn/wigent" },
    protected: false,
    date: "2026.03",
    problemStatement: "비즈니스 아이디어 검증에 다양한 관점의 피드백이 필요하나, 전문가를 모으기 어려운 문제.",
    technicalDetails: [
      "GPT-4o 기반 Orchestrator가 토론 흐름을 제어. PM Agent는 항상 상주하며 토론을 진행하고, 도메인 전문가(마케터, 기술 리드, UX 리서처 등)는 주제에 따라 동적으로 생성",
      "토론이 진행되면서 주제가 변화하면 Orchestrator가 기존 전문가를 퇴장시키고 새로운 전문가를 소환. 12턴차와 22턴차에 자동 교체, 퇴장 시 인수인계 메시지. 최대 30턴",
      "단순 로테이션이 아닌 발언 횟수 기반 우선순위 선택으로 특정 에이전트가 토론을 독점하지 않도록 설계",
      "토론 결론을 구조화된 JSON으로 합성하고, GPT-4o가 완성된 HTML 랜딩 페이지를 생성. 채팅 UI에서 랜딩 페이지로 애니메이션 전환",
    ],
    impact: "Multi-Agent Orchestrator + 동적 Spawning/Retirement | 최대 30턴 토론 | 랜딩페이지 자동 생성 | 🏆 해커톤 대상",
  },
  {
    id: "9",
    title: "WIGVO — AI 실시간 전화통역 플랫폼",
    description: "실제 전화망(PSTN)을 통한 양방향 LLM 기반 실시간 음성 통역 플랫폼입니다. 상대방은 앱 설치 없이 일반 전화로 통역 서비스를 이용할 수 있습니다. PSTN 환경에서 AI TTS 음성이 80-600ms 후 에코로 돌아와 무한 번역 루프가 발생하는 문제를 해결했습니다. AI/음성 핵심 모듈 설계·구현 담당.",
    domain: "Side Project",
    tags: ["Python 3.12", "FastAPI", "OpenAI Realtime API", "Twilio PSTN", "Silero VAD", "Supabase", "Google Cloud Run", "Next.js 16", "React Native"],
    links: { github: "https://github.com/wigtn/wigvo-v2" },
    protected: false,
    date: "2026.02",
    problemStatement: "PSTN의 μ-law 비선형 양자화 때문에 상관관계 기반 에코 탐지는 10건 중 3건 오탐이 발생하여 사용할 수 없었습니다.",
    technicalDetails: [
      "에코 루프를 구조적으로 차단하기 위해 두 개의 독립적인 OpenAI Realtime API 세션으로 분리. Session A(발신→수신, 557ms P50)와 Session B(수신→발신)가 각각 독립 동작",
      "확정적인 3단계 에코 필터링: Echo Gate(무음 프레임 교체) → RMS Energy Gate(에코: 100-400, 실제 발화: 500-2000+) → Silero VAD(로컬, Server VAD의 발화 감지를 480ms로 단축)",
      "Voice-to-Voice, Text-to-Voice, Full Agent(function calling) 3가지 통신 모드를 Strategy 패턴으로 구현",
      "Anti-Hallucination 3중 방어: 응답 기대 체크, 번역 속도 검증(100자/초 초과 시 드롭), STT 환각 차단",
      "Google Cloud Run 프로덕션 배포. 전문 통역 대비 9-11배 저렴한 $0.27/min 비용 달성",
    ],
    impact: "148통 에코 0건, 555ms 레이턴시, $0.18/분 | ACL 2026 System Demonstrations Accept (Rating 7.50)",
  },
  {
    id: "10",
    title: "소상공인용 디지털 인텔리전스 플랫폼",
    description: "엣지 디바이스를 활용한 온디바이스 실시간 고객 행동 인식, 결제 정보 분석 및 고객 분류/결제 예측 알고리즘 구현",
    domain: "Research",
    tags: ["Edge AI", "온디바이스", "행동 인식"],
    links: {},
    protected: false,
    date: "2023.10 ~ 2024.12",
    impact: "중소벤처기업부 | 온디바이스 실시간 고객 행동 인식 + 결제 예측",
  },
  {
    id: "11",
    title: "메타버스 자율트윈 핵심기술 연구",
    description: "텍스트·음성 데이터 활용 우울증 분류 시스템, 감정 기반 칵테일 추천 IoT 시스템 구현",
    domain: "Research",
    tags: ["멀티모달", "우울증 분류", "IoT"],
    links: {},
    protected: false,
    date: "2022.09 ~ 2024.12",
    impact: "과학기술정보통신부 | 텍스트·음성 멀티모달 우울증 분류 + 감정 기반 IoT",
  },
  {
    id: "12",
    title: "5G 환경 온디바이스 IoT 고속 지능 엔진 개발",
    description: "이미지 전처리, 행동 인지 데이터셋 제작, 온디바이스 다중 사용자 행동 인식 모델 개발",
    domain: "Research",
    tags: ["5G", "온디바이스", "행동 인식"],
    links: {},
    protected: false,
    date: "2022.09 ~ 2023.08",
    impact: "과학기술정보통신부 | 온디바이스 다중 사용자 행동 인식 모델",
  },
];

export const sections = {
  experience: true,
  education: false,
  certifications: false,
  publications: true,
  awards: true,
  academicProjects: true,
  teaching: false,
  partTimeJob: true,
  groupActivity: false,
  mentoring: false,
};

export interface Position { company: string; title: string; description: string; location: string; startDate: string; endDate: string | null; highlights?: string[]; }
export interface Education { school: string; degree: string; field: string; startYear: number; endYear: number; notes?: string; }
export interface Certification { name: string; authority: string; date: string; url?: string; }
export interface Award { title: string; organization: string; date: string; description?: string; }
export interface Publication { title: string; journal?: string; date: string; url?: string; description?: string; }
export interface AcademicProject { title: string; institution: string; period: string; description: string; role?: string; }
export interface TeachingExperience { course: string; institution: string; period: string; description?: string; }
export interface PartTimeJob { company: string; role: string; period: string; description?: string; }
export interface GroupActivity { name: string; role: string; period: string; description?: string; }
export interface MentoringExperience { title: string; organization: string; period: string; description?: string; }

export const careerData = {
  experience: [
    {
      company: "(주)사운드마인드",
      title: "팀장 / AX",
      description: "AI Agent 설계·구현 주도, 팀원 코칭 및 프로젝트 리드",
      location: "서울",
      startDate: "2026-03",
      endDate: null,
      highlights: [
        "[AI Agent 기반 콜봇 시스템 | 2026.03 ~ 진행중] 5단계 규칙 기반 가드를 9노드 상태 머신 + 10개 Tool Calling 위에 설계 — RTX 3090 단일 GPU, 9B 모델로 5채널 동시 통화 P50 154ms / P99 300ms 미만, 엣지 52/52 PASS, 입력 토큰 47% 감축 — 불완전판매 3중 안전망(LLM 1차 + 키워드 fallback 2차 + STEP 일관성 검증), 욕설 듀얼 감지(키워드+LLM) — 음성 및 대화 엔진 전체 설계·구현 주도 + 팀원 LLM 개발 코칭",
      ],
    },
    {
      company: "(주)사운드마인드",
      title: "매니저 / AX",
      description: "음성 AI 모델 개발, LLM 기반 서비스 설계·구현, 프로덕션 배포",
      location: "서울",
      startDate: "2025-01",
      endDate: "2026-02",
      highlights: [
        "[영어 교육용 음성인식 시스템 | 2025.11 - 2026.03] Temporal + Triton + Faster Whisper 기반 대규모 배치 STT 파이프라인 설계·구현 — 3-Worker 분리 아키텍처로 성공률 82% → 95%+ 개선, RTX 3090 2장에서 분당 200건 안정 처리 — 2-Pass Bilingual STT 설계로 영어/한국어 혼합 음성 처리 — Silero VAD + 24-29초 Smart Chunking, 작업 유형별 재시도 정책 차등 설계",
        "[기업 문서 RAG 질의응답 시스템 | 2025.06 - 2025.07] 문서 업로드 즉시 VectorDB 인덱싱 + RAG 기반 Q&A 및 요약 챗봇 개발 — LangGraph 듀얼 그래프(DocumentManagement/ChatBot) 설계로 문서 처리·채팅 블로킹 해결 — Upstage Document Parse + 토크나이저 기반 동적 Map-Reduce 요약, 최대 50MB/100페이지 즉시 처리 — 로컬 임베딩(BGE-M3)으로 외부 API 의존성 제거, 멀티 유저 데이터 격리",
        "[커스텀 음성 키워드 인식 시스템 | 2025.03 - 2025.07] KWT-3 Transformer 기반 한국어 키워드 인식 모델 개발 — Dual-Threshold 검출 설계로 오탐률 2.04% → 0.0% 달성 (43만+ 윈도우 FA 테스트), 인식률 96.81% — 배경소음 RMS 정규화 + SNR 20dB 노이즈 혼합으로 모델 일반화 성능 개선 — TFLite INT8 양자화로 모델 75% 경량화 → 엣지 디바이스 배포",
        "[회의록 분석 플랫폼 - VoiceNote | 2025.02 - 2025.05] Whisper STT + pyannote 화자분리 + LLM 요약 통합 5개 마이크로서비스 설계·구현 — 화자-텍스트 정렬 알고리즘 직접 구현 (겹침 구간 시간 가중치 + 3단계 폴백) — Whisper 30초 제한에 맞춘 VAD 기반 청크 분할로 할루시네이션 해결, OpenVINO NPU 가속 추론",
        "[시니어 케어 챗봇 | 2025.02 - 2025.05] LLM 기반 고령자 일일 건강체크 AI 챗봇 설계·개발 — 2단계 상태 머신 (16개 서브 상태, 40+ 조건부 전이) + 30+ 엔티티 키 기반 대화 자동 분기 — 10+ YAML 프롬프트 설계",
      ],
    },
    {
      company: "디지털새싹",
      title: "AI 교육 멘토",
      description: "AI·데이터 분석 강의, 초·중·고 블록 코딩/딥러닝 교육 멘토링",
      location: "경기",
      startDate: "2023-01",
      endDate: "2024-07",
      highlights: [
        "초·중·고 대상 AI·데이터 분석 강의 보조 및 블록 코딩/딥러닝 교육 멘토링 수행",
      ],
    },
  ] as Position[],

  education: [
    { school: "한신대학교", degree: "석사", field: "IT영상데이터융합(협)", startYear: 2023, endYear: 2025, notes: "학점 4.5/4.5\n졸업 논문: 메타버스에서 텍스트 및 음성 데이터를 활용한 우울증 분류 시스템 (https://dl.nanet.go.kr/detail/KDMT12025000059160)" },
    { school: "한신대학교", degree: "학사", field: "IT콘텐츠학과", startYear: 2018, endYear: 2023, notes: "학점 3.77/4.5" },
  ] as Education[],

  certifications: [] as Certification[],

  publications: [
    { title: "WIGVO: Real-Time Bidirectional Speech Translation over Legacy PSTN Calls via Dual-Session Echo Gating", journal: "ACL 2026 System Demonstrations", date: "2026", description: "Accepted (Rating 7.50)" },
    { title: "Implementation of an IoT Cocktail Machine Using ChatGPT API and ConvAnalyser in the Metaverse", journal: "IEEE Metacom 2024", date: "2024.08", url: "https://ieeexplore.ieee.org/document/10740121/" },
    { title: "A metaverse Avatar Teleport System Using an AIoT Pose Estimation Device", journal: "IEEE Metacom 2023", date: "2023.06", url: "https://ieeexplore.ieee.org/document/10271892/" },
    { title: "IoT 웨어러블 디바이스의 생체 데이터를 활용한 트래블 로깅 시스템 구현", journal: "한국인터넷정보학회 추계학술대회", date: "2023.10" },
    { title: "XR 콘텐츠에 대한 사용자 생체 반응 데이터 수집 시스템 구현", journal: "한국항행학회 종합학술대회", date: "2022.10" },
    { title: "메타버스 내 출석 확인 및 공지를 위한 IoT 모션 및 진동 센서의 디지털 트윈 개발", journal: "한국통신학회 하계종합학술대회", date: "2022.06", url: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11107719" },
  ] as Publication[],

  awards: [
    { title: "Build with TRAE 해커톤 · 대상", organization: "TRAE", date: "2026", description: "WIGENT: AI Agent 실시간 토론 플랫폼" },
    { title: "International oneM2M Hackathon · Encouragement Award", organization: "oneM2M", date: "2022", description: "IoT 웨어러블 생체 데이터 트래블 로깅 시스템" },
    { title: "한신정보과학/융합논문 발표대회 · 우수논문상", organization: "한신대학교", date: "2022", description: "CNN 기반 스쿼트 자세 분석 시스템" },
    { title: "제 3회 한신 ABC 캠프 해커톤 · 우수상", organization: "한신대학교", date: "2022", description: "스쿼트 자세 분석 홈트레이닝 시스템" },
    { title: "제 2회 한신 ABC 캠프 해커톤 · 우수상", organization: "한신대학교", date: "2022", description: "유니티 활용 오산시 홍보 콘텐츠 제작" },
  ] as Award[],

  academicProjects: [
    { title: "엣지 디바이스를 활용한 소상공인용 디지털 인텔리전스 플랫폼 구축", institution: "중소벤처기업부", period: "2023.10 ~ 2024.12", description: "온디바이스 실시간 고객 행동 인식, 결제 정보 분석 및 고객 분류/결제 예측 알고리즘 구현" },
    { title: "메타버스 자율트윈 핵심기술 연구", institution: "과학기술정보통신부", period: "2022.09 ~ 2024.12", description: "텍스트·음성 데이터 활용 우울증 분류 시스템, 감정 기반 칵테일 추천 IoT 시스템 구현" },
    { title: "5G 환경 온디바이스 IoT 고속 지능 HW/SW 엔진 기술 개발", institution: "과학기술정보통신부", period: "2022.09 ~ 2023.08", description: "이미지 전처리, 행동 인지 데이터셋 제작, 온디바이스 다중 사용자 행동 인식 모델 개발" },
  ] as AcademicProject[],

  teaching: [] as TeachingExperience[],

  partTimeJobs: [] as PartTimeJob[],

  groupActivities: [] as GroupActivity[],
  mentoring: [] as MentoringExperience[],
};
