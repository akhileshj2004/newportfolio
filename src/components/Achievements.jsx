import React, { useState } from 'react';
import { Award, Trophy, Star, ChevronDown, ChevronUp, Mic, Globe, Users, Code2, Camera, BookOpen, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const leadership = [
  "Google Student Ambassador (2025)",
  "Chairperson, ArcStack Tech Club, KLE Tech (2025–26)",
  "Tech Lead, KLE Center for Technology, Innovation and Entrepreneurship (2024–25)",
  "Secretary, Human Resource and Literature Club, KLE Tech (2025)",
  "Media & Publicity Lead, IEEE Student Branch, KLE Tech (2023)",
  "Campus Lead, Techfest IIT Bombay (2023–25)"
];

const hackathons = [
  "HackConclave'24 – IIT Guwahati",
  "HacktoFuture'25 – KLS GIT",
  "Hack2Future'26 – IIIT Dharwad"
];

const awards = [
  "Minor Project of the Semester Award (6th Semester, 2025)",
  "Best Project of the Semester Award – Exploratory Data Analytics (2024)"
];

const certifications = [
  "Applied Generative AI – Infosys Springboard (2025)",
  "DevOps Foundation Certification – Infosys Springboard (2025)",
  "Introduction to Cloud – Google Cloud",
  "Machine Learning Specialization – DeepLearning.ai / Stanford (2023–24)",
  "Practical AWS for DevOps – Hands‑on AWS DevOps services",
  "Linux for Cloud & DevOps Engineers – Advanced Linux administration",
  "Operating System Basics – Cisco (2025)",
  "JNCIA‑Junos Associate – Juniper Networks",
  "MongoDB for SQL Professionals",
  "Geodata Processing with Python – ISRO (2023)",
  "Python for Data Science and AI – IBM (2023)",
  "Introduction to AI – IBM (2023)",
  "Introduction to Generative AI – Google Cloud (2023)",
  "WiDS Datathon participation",
  "9th Summer School on AI – IIIT Hyderabad",
];

const workshopsSpeaking = [
  "Speaker: Research Methodologies, Presentation Skills, LinkedIn Optimization (KLE Tech)",
  "Participant: 9th Summer School on AI (IIIT Hyderabad), Cybersecurity Workshop (IIIT Dharwad)",
  "GEN AI Workshop 2025 (End‑to‑End projects, Agentic AI)",
];

const conferencesEvents = [
  "IEEE INNOVA2024 International Conference – presented diabetes management research",
  "IP YATRA 2024 – Intellectual property rights workshop",
  "GDG DevFest'22–24 – Google Developer Group conferences",
  "Nvidia GTC 2025 – GPU Technology Conference (virtual)",
  "PUPA 2024 – National‑level project exhibition",
];

const competitionsHackathons = [
  "Reverse Coding X Competition – algorithm analysis under time constraints",
  "ACM NEXUS 2.0 – 24-hour national hackathon (DDoS protection)",
  "HackConclave'24 – finalist (IIT Guwahati)",
  "WiDS Datathon (2024)",
  "Bharatiya Antariksh Hackathon (2025)",
  "Google Agent AI Hackathon (2025)",
];

const communityMentorship = [
  "Active Member: Open Source Connect India, Internet Society, Google Cloud & NVIDIA communities, IEEE",
  "Open Source Contributor: GSSoC, Hacktoberfest, Hack Club Global",
  "Guided 20+ teams for ML research projects",
];

const creativeOther = [
  "Photography – composition, lighting, digital post‑processing",
];

const Achievements = () => {
  const [showExtras, setShowExtras] = useState(false);

  return (
    <section className="py-16 space-y-12" id="achievements">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4"
      >
        <Trophy className="text-yellow-400 w-10 h-10" />
        <h2 className="text-4xl text-white font-mono">
          [Milestones.log]
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="space-y-6">
          <div className="glass-panel p-6 h-full bg-obsidian border-l-4 border-l-yellow-400 group">
            <h3 className="text-xl font-mono text-yellow-400 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5" /> Leadership_Badges
            </h3>
            <div className="space-y-4">
              {leadership.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-cyber-lime mt-1 flex-shrink-0" />
                  <span className="text-gray-300 font-sans group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8 flex flex-col justify-between">
          <div className="glass-panel p-6 bg-dark-charcoal border border-white/5 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent z-0 pointer-events-none"></div>
            <h3 className="text-xl font-mono text-electric-blue mb-4 relative z-10">&gt; Hackathon_Finalist()</h3>
            <ul className="space-y-2 relative z-10 text-gray-400 font-sans">
              {hackathons.map((h, i) => (
                <li key={i} className="pl-4 border-l border-white/10 group-hover:border-electric-blue/50 transition-colors">
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-6 bg-dark-charcoal border border-white/5 relative group">
            <h3 className="text-xl font-mono text-cyber-lime mb-4">&gt; Special_Awards()</h3>
            <ul className="space-y-3 font-sans text-gray-300">
              {awards.map((a, i) => (
                <li key={i} className="flex items-center gap-2 bg-obsidian p-3 rounded-md border border-white/5 group-hover:border-cyber-lime/30 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime"></span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Expandable: Certs + Extracurriculars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="pt-6 border-t border-white/10"
      >
        <button
          onClick={() => setShowExtras(!showExtras)}
          className="flex items-center gap-2 text-cyber-lime font-mono mx-auto hover:text-white transition-colors py-2 px-6 rounded-md border border-cyber-lime/30 hover:bg-cyber-lime/10"
        >
          {showExtras ? '[Collapse Detail Logs]' : '[Expand: Certifications & Extracurriculars]'}
          {showExtras ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <AnimatePresence>
          {showExtras && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-8 space-y-8">
                
                {/* Certifications */}
                <div className="glass-panel p-6 bg-obsidian">
              <h4 className="text-lg font-mono text-purple-400 mb-5 border-b border-white/10 pb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> certs.txt
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex gap-2 text-sm text-gray-400 font-sans p-2 rounded hover:bg-white/5 transition-colors">
                    <span className="text-purple-400 flex-shrink-0">&gt;</span>
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Extracurricular Activities */}
            <div className="glass-panel p-6 bg-obsidian">
              <h4 className="text-lg font-mono text-pink-400 mb-5 border-b border-white/10 pb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" /> extracurricular.log
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Workshops & Speaking */}
                <div className="space-y-3">
                  <h5 className="text-sm font-mono text-cyan-400 flex items-center gap-2 mb-3">
                    <Mic className="w-3.5 h-3.5" /> Workshops & Speaking
                  </h5>
                  {workshopsSpeaking.map((e, i) => (
                    <div key={i} className="flex gap-2 text-xs text-gray-400 font-sans">
                      <span className="text-cyan-400 flex-shrink-0">~</span>
                      <span>{e}</span>
                    </div>
                  ))}
                </div>

                {/* Conferences & Events */}
                <div className="space-y-3">
                  <h5 className="text-sm font-mono text-amber-400 flex items-center gap-2 mb-3">
                    <Globe className="w-3.5 h-3.5" /> Conferences & Events
                  </h5>
                  {conferencesEvents.map((e, i) => (
                    <div key={i} className="flex gap-2 text-xs text-gray-400 font-sans">
                      <span className="text-amber-400 flex-shrink-0">~</span>
                      <span>{e}</span>
                    </div>
                  ))}
                </div>

                {/* Competitions & Hackathons */}
                <div className="space-y-3">
                  <h5 className="text-sm font-mono text-red-400 flex items-center gap-2 mb-3">
                    <Code2 className="w-3.5 h-3.5" /> Competitions & Hackathons
                  </h5>
                  {competitionsHackathons.map((e, i) => (
                    <div key={i} className="flex gap-2 text-xs text-gray-400 font-sans">
                      <span className="text-red-400 flex-shrink-0">~</span>
                      <span>{e}</span>
                    </div>
                  ))}
                </div>

                {/* Community & Mentorship */}
                <div className="space-y-3">
                  <h5 className="text-sm font-mono text-green-400 flex items-center gap-2 mb-3">
                    <Users className="w-3.5 h-3.5" /> Community & Mentorship
                  </h5>
                  {communityMentorship.map((e, i) => (
                    <div key={i} className="flex gap-2 text-xs text-gray-400 font-sans">
                      <span className="text-green-400 flex-shrink-0">~</span>
                      <span>{e}</span>
                    </div>
                  ))}

                  <h5 className="text-sm font-mono text-violet-400 flex items-center gap-2 mt-5 mb-3">
                    <Camera className="w-3.5 h-3.5" /> Creative & Other
                  </h5>
                  {creativeOther.map((e, i) => (
                    <div key={i} className="flex gap-2 text-xs text-gray-400 font-sans">
                      <span className="text-violet-400 flex-shrink-0">~</span>
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Achievements;
