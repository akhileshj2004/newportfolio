import React, { useState } from 'react';
import { Cpu, SquareTerminal, Wrench, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from './Modal';

const skillDetails = {
  "Python": { power: 95, desc: "Primary language for ML, data science, automation, and backend development. Extensive experience with NumPy, Pandas, Flask, FastAPI." },
  "C++": { power: 80, desc: "Strong foundation in OOP, data structures, algorithms, and systems programming. Used in competitive programming and embedded systems." },
  "SQL": { power: 85, desc: "Advanced relational database design, complex queries, normalization, and performance optimization across PostgreSQL and MySQL." },
  "C": { power: 70, desc: "Low-level systems programming, memory management, and embedded development fundamentals." },
  "VS Code": { power: 90, desc: "Primary IDE with deep customization, extensions ecosystem, and integrated terminal workflows." },
  "Cursor": { power: 85, desc: "AI-powered code editor for accelerated development with intelligent code completion and refactoring." },
  "Docker": { power: 88, desc: "Containerization expert — multi-stage builds, Docker Compose orchestration, and production deployment pipelines." },
  "Jenkins": { power: 75, desc: "CI/CD pipeline automation, build triggers, artifact management, and deployment orchestration." },
  "Git": { power: 92, desc: "Version control mastery — branching strategies, rebasing, conflict resolution, and collaborative workflows." },
  "AWS (EC2, S3)": { power: 80, desc: "Cloud infrastructure provisioning, compute instances, storage management, and IaC deployment on AWS." },
  "Jupyter Notebook": { power: 88, desc: "Interactive data exploration, ML experimentation, visualization, and reproducible research workflows." },
  "Overleaf": { power: 85, desc: "LaTeX document preparation for academic papers, conference submissions, and research documentation." },
  "PowerBI": { power: 70, desc: "Business intelligence dashboards, data modeling, DAX expressions, and interactive report creation." },
  "Canva": { power: 75, desc: "Visual design for presentations, social media, and marketing materials with brand consistency." },
  "PowerShell": { power: 65, desc: "Windows system administration, automation scripts, and DevOps task management." },
  "LangChain": { power: 90, desc: "Advanced RAG pipelines, multi-agent systems, chain composition, and LLM application architecture." },
  "PyTorch": { power: 82, desc: "Deep learning model development, training loops, custom architectures, and GPU-optimized inference." },
  "RAG": { power: 92, desc: "Retrieval-Augmented Generation — vector stores, embeddings, semantic search, and knowledge-grounded LLM responses." },
  "Generative AI": { power: 88, desc: "Fine-tuning LLMs (QLoRA, LoRA), prompt engineering, agentic AI systems, and domain-adapted generation." },
  "Linux": { power: 85, desc: "System administration, shell scripting, package management, server configuration, and DevOps tooling." },
  "GitHub Copilot": { power: 80, desc: "AI-assisted development for rapid prototyping, code generation, and documentation." },
  "Selenium": { power: 72, desc: "Web automation, browser testing, scraping pipelines, and end-to-end UI testing frameworks." },
};

const skillCategories = [
  {
    title: "Programming",
    icon: <SquareTerminal className="w-5 h-5 text-cyber-lime" />,
    skills: ["Python", "C++", "SQL", "C"],
    colorIdx: 0,
  },
  {
    title: "Tools & Infrastructure",
    icon: <Wrench className="w-5 h-5 text-electric-blue" />,
    skills: ["VS Code", "Cursor", "Docker", "Jenkins", "Git", "AWS (EC2, S3)", "Jupyter Notebook", "Overleaf", "PowerBI", "Canva", "PowerShell"],
    colorIdx: 1,
  },
  {
    title: "Advanced Specializations",
    icon: <Zap className="w-5 h-5 text-purple-400" />,
    skills: ["LangChain", "PyTorch", "RAG", "Generative AI", "Linux", "GitHub Copilot", "Selenium"],
    colorIdx: 2,
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (i) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  })
};

const PowerBar = ({ power, color }) => {
  const colorMap = {
    0: 'bg-cyber-lime',
    1: 'bg-electric-blue',
    2: 'bg-purple-400',
  };
  return (
    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mt-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${power}%` }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`h-full rounded-full ${colorMap[color] || 'bg-cyber-lime'}`}
        style={{ boxShadow: `0 0 10px currentColor` }}
      />
    </div>
  );
};

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const handleSkillClick = (skill, colorIdx) => {
    setSelectedSkill(skill);
    setSelectedColorIdx(colorIdx);
  };

  const detail = selectedSkill ? skillDetails[selectedSkill] : null;
  const accentMap = { 0: 'cyber-lime', 1: 'electric-blue', 2: 'purple' };

  return (
    <section className="py-16 space-y-12" id="skills">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4"
      >
        <Cpu className="text-purple-400 w-10 h-10" />
        <h2 className="text-4xl text-white font-mono">[System_Arsenal]</h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className={`glass-panel p-6 border-t-2 ${idx === 0 ? 'border-t-cyber-lime/50' : idx === 1 ? 'border-t-electric-blue/50' : 'border-t-purple-500/50'} flex flex-col group relative overflow-hidden`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 blur-[40px] pointer-events-none transition-colors duration-500 rounded-full
              ${idx === 0 ? 'bg-cyber-lime/10 group-hover:bg-cyber-lime/20' :
                idx === 1 ? 'bg-electric-blue/10 group-hover:bg-electric-blue/20' :
                'bg-purple-500/10 group-hover:bg-purple-500/20'}`} />

            <div className="flex items-center gap-3 mb-6 bg-obsidian/50 p-3 rounded-md border border-white/5 w-fit z-10">
              {category.icon}
              <h3 className="text-lg font-mono text-gray-300 tracking-tight">{category.title}</h3>
            </div>

            <div className="flex flex-wrap gap-3 z-10">
              {category.skills.map((skill, sIdx) => {
                let badgeClass = "text-sm font-sans px-3 py-1.5 rounded-md border transition-all duration-300 shadow-sm cursor-pointer select-none ";
                if (idx === 0) badgeClass += "bg-cyber-lime/5 border-cyber-lime/20 text-cyber-lime hover:bg-cyber-lime/15 hover:border-cyber-lime/50 hover:shadow-[0_0_12px_rgba(0,255,65,0.4)]";
                if (idx === 1) badgeClass += "bg-electric-blue/5 border-electric-blue/20 text-electric-blue hover:bg-electric-blue/15 hover:border-electric-blue/50 hover:shadow-[0_0_12px_rgba(0,180,255,0.4)]";
                if (idx === 2) badgeClass += "bg-purple-500/5 border-purple-500/20 text-purple-400 hover:bg-purple-500/15 hover:border-purple-500/50 hover:shadow-[0_0_12px_rgba(168,85,247,0.4)]";

                return (
                  <motion.button
                    key={sIdx}
                    custom={sIdx}
                    variants={chipVariants}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSkillClick(skill, idx)}
                    className={badgeClass}
                  >
                    {skill}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Skill Detail Modal */}
      <Modal
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        title={selectedSkill}
        accent={accentMap[selectedColorIdx]}
      >
        {detail && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Proficiency Level</span>
              <span className={`text-2xl font-mono font-bold ${selectedColorIdx === 0 ? 'text-cyber-lime' : selectedColorIdx === 1 ? 'text-electric-blue' : 'text-purple-400'}`}>
                {detail.power}%
              </span>
            </div>
            <PowerBar power={detail.power} color={selectedColorIdx} />

            <div className="pt-3">
              <h4 className="text-xs font-mono text-gray-500 uppercase mb-3 tracking-wider">Description</h4>
              <p className="text-gray-300 font-sans leading-relaxed text-sm">
                {detail.desc}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Skills;
