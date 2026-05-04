import { useState, useMemo, useEffect } from "react";
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

export default function App() {
  const [activeDomain, setActiveDomain] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

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
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Projects</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6" />
          </div>
          <FilterBar
            activeDomain={activeDomain}
            onDomainChange={setActiveDomain}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <div className="mt-8">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {filteredItems.map((item, index) => (
                  <PortfolioCard key={item.id} item={item} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
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
