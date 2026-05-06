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

  // Hash-based routing for project detail pages
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

  // Project detail page — custom pages for key projects
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
    <div className="min-h-screen bg-gray-50">
      <NavigationBar showNavLinks={true} />
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sections.experience && <ExperienceSection />}
        {sections.publications && <PublicationsSection />}
      </div>

      <section id="projects" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          </motion.div>

          {/* Featured Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {projects
              .filter((p) => FEATURED_IDS.includes(p.id))
              .sort((a, b) => FEATURED_IDS.indexOf(a.id) - FEATURED_IDS.indexOf(b.id))
              .map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} featured />
              ))}
          </div>

          {/* Show More Toggle */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAllProjects((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <span>{showAllProjects ? "접기" : `다른 프로젝트 보기 (${projects.length - FEATURED_IDS.length})`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAllProjects ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Other Projects */}
          {showAllProjects && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <FilterBar
                activeDomain={activeDomain}
                onDomainChange={setActiveDomain}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <div className="mt-6">
                {filteredItems.filter((p) => !FEATURED_IDS.includes(p.id)).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {filteredItems
                      .filter((p) => !FEATURED_IDS.includes(p.id))
                      .map((item, index) => (
                        <PortfolioCard key={item.id} item={item} index={index} />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">검색 결과가 없습니다.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sections.awards && <AwardsSection />}
        {sections.academicProjects && <AcademicProjectsSection />}
        {sections.partTimeJob && <PartTimeJobSection />}
      </div>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-xs">
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
