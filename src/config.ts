// ============================================================
// config.ts — 손상우 포트폴리오
// ============================================================

export const profile = {
  name: "손상우",
  title: "AI Engineer",
  email: "xhxh9539@gmail.com",
  github: "https://github.com/sonsangwoo1116",
  linkedin: "https://linkedin.com/in/sangwooson",
  heroDescription: "AI 시스템을 설계하고, 실제 문제에 적용합니다.\n\n석사 과정에서 텍스트·음성 멀티모달 데이터 기반 딥러닝 모델을 연구했고, 졸업 후 사운드마인드에서 AI Agent와 LLM 기반 서비스를 설계·구현하고 있습니다.\n\n사운드마인드에서 AI 콜봇 대화 엔진 설계부터 기업 고객용 RAG 시스템, 대규모 음성인식 파이프라인까지, AI 서비스의 문제 정의부터 아키텍처 설계, 구현까지 전 과정을 주도하고 있습니다.",
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
    description: "보험 완전판매 모니터링 자동화를 위한 양방향 음성 콜봇 대화 엔진 설계 (아웃바운드 + 인바운드)",
    domain: "AI Agent",
    tags: ["Python", "FastAPI", "LLM Tool Calling", "EXAONE", "Qwen3-ASR", "Silero VAD"],
    links: {},
    protected: false,
    date: "2026.02 ~ 진행중",
    problemStatement: "비정형 대화에서 의도를 정확히 분류하면서 GPU 비용을 통제해야 하는 제약",
    technicalDetails: [
      "7노드 상태 머신 + 9개 LLM Tool Calling 기반 AI Agent 대화 흐름 설계",
      "5단계 하이브리드 라우팅 — LLM 호출 85% 절감, GPU 점유율 2.3%",
      "다층 가드레일: off_topic 3단계 에스컬레이션, 명확화·재시도 제한, 불완전판매 징후 실시간 탐지",
      "음성 AI 전체 설계·구현 주도 + 팀원 LLM 개발 코칭",
    ],
    impact: "RTX 3090 1장 기준 ~30채널 피크 보장",
  },
  {
    id: "2",
    title: "다국어 동시통역 및 음성 분석 시스템",
    description: "고객사별 요구사항에 맞춘 3가지 AI 솔루션 설계·구축",
    domain: "AI/Voice",
    tags: ["Python", "Qwen3-ASR", "Qwen3-TTS", "TranslateGemma", "Aho-Corasick", "Gemini API"],
    links: {},
    protected: false,
    date: "2026.02 ~ 진행중",
    problemStatement: "통역은 단일 GPU에서 3개 모델 동시 서빙, 위험 탐지는 sub-ms 지연이라는 서로 다른 제약",
    technicalDetails: [
      "다국어 통역: 단일 GPU에서 ASR+번역+TTS 3개 모델 VRAM 분배 설계, 13개 언어 동시 서빙",
      "위험 발화 탐지: 7단계 규칙 기반 NLP 파이프라인 sub-ms 처리, 안전 문맥 필터링으로 오탐 억제",
      "상담 어시스트: 3개 AI 에이전트 병렬 실행으로 응답 시간 ~1/3 단축",
    ],
    impact: "단일 GPU에서 3개 모델 동시 서빙, 13개 언어 지원",
  },
  {
    id: "3",
    title: "영어 교육용 음성인식 시스템",
    description: "Temporal + Triton + Faster Whisper 기반 대규모 배치 STT 파이프라인 설계·구현",
    domain: "AI/Voice",
    tags: ["Python", "FastAPI", "Temporal", "Triton", "Faster Whisper", "Silero VAD", "Docker", "Prometheus", "Grafana"],
    links: {},
    protected: false,
    date: "2025.11 - 2026.03",
    problemStatement: "단일 Worker 구조에서 GPU 포화 시 결과 전달이 수 분 지연 (성공률 82%)",
    technicalDetails: [
      "3-Worker 분리 아키텍처로 성공률 82% → 95%+ 개선, RTX 3090 2장에서 분당 200건 안정 처리",
      "2-Pass Bilingual STT 설계로 영어/한국어 혼합 음성 처리",
      "Silero VAD + 24-29초 Smart Chunking, 작업 유형별 재시도 정책 차등 설계",
    ],
    impact: "성공률 82% → 95%+, 분당 200건 안정 처리",
  },
  {
    id: "4",
    title: "기업 문서 RAG 질의응답 시스템",
    description: "문서 업로드 즉시 VectorDB 인덱싱 + RAG 기반 Q&A 및 요약 챗봇 개발",
    domain: "LLM/RAG",
    tags: ["Python", "FastAPI", "LangGraph", "LangChain", "vLLM", "Ollama", "Chroma", "Upstage", "Streamlit"],
    links: {},
    protected: false,
    date: "2025.06 - 2025.07",
    problemStatement: "문서 처리 중 채팅이 블로킹되는 문제와 PDF 구조 손실로 인한 RAG 품질 저하",
    technicalDetails: [
      "LangGraph 듀얼 그래프(DocumentManagement/ChatBot) 설계로 블로킹 해결",
      "Upstage Document Parse + 토크나이저 기반 동적 Map-Reduce 요약 — 최대 50MB/100페이지 즉시 처리",
      "로컬 임베딩(BGE-M3)으로 외부 API 의존성 제거, 멀티 유저 데이터 격리",
    ],
    impact: "최대 50MB/100페이지 문서 즉시 검색·요약",
  },
  {
    id: "5",
    title: "커스텀 음성 키워드 인식 시스템",
    description: "KWT-3 Transformer 기반 한국어 키워드 인식 모델 개발",
    domain: "AI/Voice",
    tags: ["TensorFlow", "KWT-3", "TFLite", "CUDA", "Mel Spectrogram", "SpecAugment"],
    links: {},
    protected: false,
    date: "2025.03 - 2025.07",
    problemStatement: "단일 임계값에서 오탐률 2.04%로 웨이크워드 시스템에서 치명적",
    technicalDetails: [
      "Dual-Threshold 검출 설계로 오탐률 2.04% → 0.0% 달성 (43만+ 윈도우 FA 테스트), 인식률 96.81%",
      "배경소음 RMS 정규화 + SNR 20dB 노이즈 혼합으로 모델 일반화 성능 개선",
      "TFLite INT8 양자화로 모델 75% 경량화 → 엣지 디바이스 배포",
    ],
    impact: "인식률 96.81%, 오탐률 0.0%",
  },
  {
    id: "6",
    title: "VoiceNote — 회의록 분석 플랫폼",
    description: "Whisper STT + pyannote 화자분리 + LLM 요약 통합 5개 마이크로서비스 설계·구현",
    domain: "AI/Voice",
    tags: ["Python", "FastAPI", "Whisper", "OpenVINO", "pyannote", "Intel NPU"],
    links: {},
    protected: false,
    date: "2025.02 - 2025.05",
    problemStatement: "음성 녹음에서 화자별 발화 분리와 자동 요약 필요",
    technicalDetails: [
      "화자-텍스트 정렬 알고리즘 직접 구현 (겹침 구간 시간 가중치 + 3단계 폴백)",
      "Whisper 30초 제한에 맞춘 VAD 기반 청크 분할 처리로 할루시네이션 해결",
      "OpenVINO NPU 가속 Whisper INT8 양자화 추론",
    ],
    impact: "5개 마이크로서비스, 업로드 한 번으로 최종 결과까지 자동 도달",
  },
  {
    id: "7",
    title: "시니어 케어 챗봇",
    description: "LLM 기반 고령자 일일 건강체크 AI 챗봇 설계·개발",
    domain: "LLM/RAG",
    tags: ["Ollama", "Gemma3-27B", "Streamlit", "LangChain", "WhisperX", "KADI TTS"],
    links: {},
    protected: false,
    date: "2025.02 - 2025.05",
    problemStatement: "고령자의 비정형 답변에서 건강 상태 파악 + 5개 영역 순차 체크",
    technicalDetails: [
      "2단계 상태 머신 (16개 서브 상태, 40+ 조건부 전이) + 30+ 엔티티 키 기반 대화 자동 분기",
      "SLM→LLM 전환 판단 (HyperCLOVAX 1.5B → Gemma3-27B), 10+ YAML 프롬프트 설계",
    ],
    impact: "LLM 기반 엔티티 추출로 비정형 답변 자동 분기",
  },
  {
    id: "8",
    title: "WIGENT — AI Agent 실시간 토론 플랫폼",
    description: "Multi-Agent 토론 플랫폼 — 아이디어 제안 + 에이전트 시스템 설계·구현. 🏆 해커톤 대상",
    domain: "Side Project",
    tags: ["Next.js 16", "TypeScript", "GPT-4o", "Multi-Agent", "Framer Motion"],
    links: { github: "https://github.com/wigtn/wigent" },
    protected: false,
    date: "2026.03",
    problemStatement: "아이디어 검증에 다양한 관점의 피드백이 필요하나 전문가를 모으기 어려움",
    technicalDetails: [
      "GPT-4o Orchestrator + PM Agent 상주 + 도메인 전문가 동적 Spawning/Retirement",
      "발언 횟수 기반 우선순위 선택으로 토론 독점 방지, 최대 30턴",
      "토론 결론 JSON 합성 → 랜딩 페이지 자동 생성",
    ],
    impact: "Build with TRAE 해커톤 대상 수상",
  },
  {
    id: "9",
    title: "WIGVO v2 — AI 실시간 전화통역",
    description: "PSTN 양방향 음성 통역 — AI/음성 핵심 모듈 설계·구현. ACL 2026 Accept",
    domain: "Side Project",
    tags: ["Python", "FastAPI", "OpenAI Realtime API", "Twilio", "Silero VAD", "GCP"],
    links: { github: "https://github.com/wigtn/wigvo-v2" },
    protected: false,
    date: "2026.02",
    problemStatement: "PSTN 환경에서 TTS 에코가 무한 번역 루프를 유발",
    technicalDetails: [
      "듀얼 세션 아키텍처 + 3단계 에코 필터, 147통 에코 0건",
      "557ms 중앙 레이턴시, $0.27/분",
    ],
    impact: "ACL 2026 System Demonstrations Accept (2저자, Rating 7.50)",
  },
  {
    id: "10",
    title: "WIGVU — YouTube AI 분석 서비스",
    description: "FastAPI AI 서비스 전체 + 프롬프트 + WhisperX STT/VAD 담당",
    domain: "Side Project",
    tags: ["Next.js", "NestJS", "FastAPI", "GPT-4o-mini", "WhisperX", "Docker"],
    links: { github: "https://github.com/wigtn/wigvu" },
    protected: false,
    date: "2026.01",
    problemStatement: "YouTube 영상 핵심 내용을 빠르게 파악하고 학습에 활용하기 어려움",
    technicalDetails: [
      "4개 언어별 정량적 난이도 분석 (CEFR/TOPIK/JLPT/HSK) + 레벨별 적응 프롬프트",
      "Circuit Breaker 패턴으로 AI 서비스 장애 대비",
    ],
    impact: "4개 언어 난이도 분석 + 레벨별 적응 프롬프트",
  },
];

export const sections = {
  experience: true,
  education: true,
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
      description: "AI Agent 개발 및 LLM 기반 서비스 구축, 음성 AI 모델 개발 및 프로덕션 배포",
      location: "서울",
      startDate: "2025-01",
      endDate: null,
      highlights: [
        "AI 콜봇 대화 엔진, RAG 시스템, 음성인식 파이프라인 등 AI 서비스 전 과정 주도",
        "팀원 LLM 개발 코칭 및 기술 리드",
      ],
    },
  ] as Position[],

  education: [
    { school: "한신대학교", degree: "석사", field: "IT영상데이터융합(협)", startYear: 2023, endYear: 2025, notes: "학점 4.5/4.5 | 졸업 논문: 메타버스에서 텍스트 및 음성 데이터를 활용한 우울증 분류 시스템" },
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

  partTimeJobs: [
    { company: "디지털새싹", role: "보조강사", period: "2023.01 - 2024.07", description: "AI·데이터 분석 강의 보조, 초·중·고 블록 코딩/딥러닝 교육 멘토링" },
  ] as PartTimeJob[],

  groupActivities: [] as GroupActivity[],
  mentoring: [] as MentoringExperience[],
};
