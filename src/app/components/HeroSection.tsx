import { motion } from "motion/react";
import { Briefcase, GraduationCap, Linkedin, Mail } from "lucide-react";
import { profile } from "../../config";

// profile.png 또는 profile.svg 중 존재하는 파일 사용
// 본인 사진으로 교체하려면 public/profile.png를 덮어쓰세요
const profileImage = import.meta.env.BASE_URL + "profile.png";

export function HeroSection() {
  return (
    <section className="relative bg-slate-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-slate-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-slate-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Profile Image - Left Side */}
          <motion.div
            className="order-1 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[3/4] max-w-xs mx-auto lg:mx-0 lg:max-w-full">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-slate-200/40 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-slate-200/40 rounded-full blur-2xl"></div>

              {/* Main image */}
              <div className="relative h-full rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-slate-500/10 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                <img
                  src={profileImage}
                  alt={`${profile.name} 프로필`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    console.error('Profile image failed to load:', profileImage);
                  }}
                />

              </div>
            </div>
          </motion.div>

          {/* Profile Info - Right Side */}
          <div className="space-y-8 order-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {profile.name}
                <span className="block text-xl sm:text-2xl lg:text-3xl font-light text-slate-600 mt-4">
                  {profile.title}
                </span>
              </h1>

              <div className="text-lg text-slate-600 leading-relaxed max-w-xl tracking-tight space-y-3">
                {profile.heroDescription.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              {profile.heroEducation && (
                <div className="mt-2 text-sm text-slate-500">
                  <div className="space-y-0.5">
                    {profile.heroEducation.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-6 flex items-center gap-6"
            >
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <img src={import.meta.env.BASE_URL + "logo-linkedin.png"} alt="LinkedIn" className="w-5 h-5 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
              {profile.email && (
                <div className="group flex items-center gap-3 text-slate-700">
                  <img src={import.meta.env.BASE_URL + "logo-gmail.png"} alt="Gmail" className="w-5 h-5 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                  <span className="text-sm">{profile.email}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
