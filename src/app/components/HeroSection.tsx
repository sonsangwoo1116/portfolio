import { motion } from "motion/react";
import { GraduationCap, Linkedin, Mail, Layers, Mic, Bot } from "lucide-react";
import { profile, projects } from "../../config";

const profileImage = import.meta.env.BASE_URL + "profile.png";

export function HeroSection() {
  const totalProjects = projects.length;
  const domains = [...new Set(projects.map(p => p.domain))];

  return (
    <section className="relative bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-slate-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left: Info (3 cols) */}
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                {profile.name}
              </h1>
              <p className="text-xl font-medium text-slate-500 leading-snug">
                {profile.title}
              </p>

              <div className="text-base text-slate-600 leading-[1.75] max-w-xl space-y-3">
                {profile.heroDescription.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {profile.heroEducation && (
                <div className="flex items-start gap-2.5 text-sm text-slate-500">
                  <GraduationCap className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    {profile.heroEducation.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 hover:border-slate-300 hover:shadow-sm transition-all">
                  <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 hover:border-slate-300 hover:shadow-sm transition-all">
                  <Mail className="w-4 h-4 text-blue-600" /> {profile.email}
                </a>
              )}
            </motion.div>
          </div>

          {/* Right: Profile + Summary (2 cols) */}
          <motion.div
            className="lg:col-span-2 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src={profileImage}
                  alt={`${profile.name} 프로필`}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex justify-center mb-1.5"><Layers className="w-4 h-4 text-blue-600" /></div>
                    <div className="text-xl font-bold text-slate-900">{totalProjects}</div>
                    <div className="text-xs text-slate-500">Projects</div>
                  </div>
                  <div>
                    <div className="flex justify-center mb-1.5"><Bot className="w-4 h-4 text-blue-600" /></div>
                    <div className="text-xl font-bold text-slate-900">{domains.length}</div>
                    <div className="text-xs text-slate-500">Domains</div>
                  </div>
                  <div>
                    <div className="flex justify-center mb-1.5"><Mic className="w-4 h-4 text-blue-600" /></div>
                    <div className="text-xl font-bold text-slate-900">1</div>
                    <div className="text-xs text-slate-500">ACL Paper</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
