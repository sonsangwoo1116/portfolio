import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { NavigationBar } from "./components/NavigationBar";
import { HeroSection } from "./components/HeroSection";
import { FilterBar } from "./components/FilterBar";
import { PortfolioCard } from "./components/PortfolioCard";
import { ProjectDetailPage } from "./components/ProjectDetailPage";
import { CallbotDetail } from "./pages/projects/CallbotDetail";
import { RagDetail } from "./pages/projects/RagDetail";
import { SymphonyDetail } from "./pages/projects/SymphonyDetail";
import { KeywordSpottingDetail } from "./pages/projects/KeywordSpottingDetail";
import { VoiceNoteDetail } from "./pages/projects/VoiceNoteDetail";
import { SeniorCareDetail } from "./pages/projects/SeniorCareDetail";
import { WigentDetail } from "./pages/projects/WigentDetail";
import { WigvoDetail } from "./pages/projects/WigvoDetail";
import { ExperienceSection } from "./components/ExperienceSection";
import { EducationSection } from "./components/EducationSection";
import { PublicationsSection } from "./components/PublicationsSection";
import { AwardsSection } from "./components/AwardsSection";
import { AcademicProjectsSection } from "./components/AcademicProjectsSection";
import { PartTimeJobSection } from "./components/PartTimeJobSection";
import { projects, sections } from "../config";

const FEATURED_IDS = ["1", "9"]; // 콜봇, WIGVO

export default function App() {
  const [activeDomain, setActiveDomain] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith("project-")) {
        setActiveProjectId(hash.replace("project-", ""));
        window.scrollTo(0, 0);
      } else {
        setActiveProjectId(null);
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const filteredItems = useMemo(() => {
    return projects.filter((item) => {
      const matchesDomain = activeDomain === "all" || item.domain === activeDomain;
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesDomain && matchesSearch;
    });
  }, [activeDomain, searchQuery]);

  if (activeProjectId) {
    if (activeProjectId === "1") return <CallbotDetail />;
    if (activeProjectId === "3") return <SymphonyDetail />;
    if (activeProjectId === "4") return <RagDetail />;
    if (activeProjectId === "5") return <KeywordSpottingDetail />;
    if (activeProjectId === "6") return <VoiceNoteDetail />;
    if (activeProjectId === "7") return <SeniorCareDetail />;
    if (activeProjectId === "8") return <WigentDetail />;
    if (activeProjectId === "9") return <WigvoDetail />;
    const project = projects.find(p => p.id === activeProjectId);
    if (project) return <ProjectDetailPage project={project} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar showNavLinks={true} />
      <HeroSection />

      {/* Featured Case Studies */}
      <section id="projects" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Featured Projects</h2>
            <p className="text-slate-500 text-base">운영 환경에 배포된 주요 AI 시스템</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects
              .filter((p) => FEATURED_IDS.includes(p.id))
              .sort((a, b) => FEATURED_IDS.indexOf(a.id) - FEATURED_IDS.indexOf(b.id))
              .map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} featured />
              ))}
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Other Projects</h2>
            <button
              onClick={() => setShowAllProjects((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition-all"
            >
              <span>{showAllProjects ? "접기" : `${projects.length - FEATURED_IDS.length}개 프로젝트`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAllProjects ? "rotate-180" : ""}`} />
            </button>
          </div>

          {!showAllProjects && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects
                .filter((p) => !FEATURED_IDS.includes(p.id))
                .slice(0, 3)
                .map((item, index) => (
                  <PortfolioCard key={item.id} item={item} index={index} />
                ))}
            </div>
          )}

          {showAllProjects && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FilterBar
                activeDomain={activeDomain}
                onDomainChange={setActiveDomain}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <div className="mt-6">
                {filteredItems.filter((p) => !FEATURED_IDS.includes(p.id)).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredItems
                      .filter((p) => !FEATURED_IDS.includes(p.id))
                      .map((item, index) => (
                        <PortfolioCard key={item.id} item={item} index={index} />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-500">검색 결과가 없습니다.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Experience */}
      <div className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
          {sections.experience && <ExperienceSection />}
        </div>
      </div>

      {/* Publications + Awards + Academic + PartTime */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-12">
        {sections.publications && <PublicationsSection />}
        {sections.awards && <AwardsSection />}
        {sections.academicProjects && <AcademicProjectsSection />}
        {sections.partTimeJob && <PartTimeJobSection />}
      </div>

      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-8">
          <p className="text-center text-slate-400 text-xs">
            Last Updated:{" "}
            {new Date().toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </footer>
    </div>
  );
}
