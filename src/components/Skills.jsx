import React from 'react';
import { Cpu, SquareTerminal, Wrench, Zap } from 'lucide-react';

const skillCategories = [
  {
    title: "Programming",
    icon: <SquareTerminal className="w-5 h-5 text-cyber-lime" />,
    skills: ["Python", "C++", "SQL", "C"],
    color: "cyber-lime"
  },
  {
    title: "Tools & Infrastructure",
    icon: <Wrench className="w-5 h-5 text-electric-blue" />,
    skills: ["VS Code", "Cursor", "Docker", "Jenkins", "Git", "AWS (EC2, S3)", "Jupyter Notebook", "Overleaf", "PowerBI", "Canva", "PowerShell"],
    color: "electric-blue"
  },
  {
    title: "Advanced Specializations",
    icon: <Zap className="w-5 h-5 text-purple-400" />,
    skills: ["LangChain", "PyTorch", "RAG", "Generative AI", "Linux", "GitHub Copilot", "Selenium"],
    color: "purple-500"
  }
];

const Skills = () => {
  return (
    <section className="py-16 space-y-12" id="skills">
      <div className="flex items-center gap-4">
        <Cpu className="text-purple-400 w-10 h-10" />
        <h2 className="text-4xl text-white font-mono">
          [System_Arsenal]
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((category, idx) => (
          <div key={idx} className={`glass-panel p-6 border-t-2 ${idx === 0 ? 'border-t-cyber-lime/50' : idx === 1 ? 'border-t-electric-blue/50' : 'border-t-purple-500/50'} flex flex-col group`}>
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
                let badgeClass = "text-sm font-sans px-3 py-1.5 rounded-md border transition-all duration-300 shadow-sm ";
                if (idx === 0) badgeClass += "bg-cyber-lime/5 border-cyber-lime/20 text-cyber-lime hover:bg-cyber-lime/10 hover:border-cyber-lime/50 text-glow-lime hover:shadow-[0_0_10px_rgba(0,255,65,0.4)]";
                if (idx === 1) badgeClass += "bg-electric-blue/5 border-electric-blue/20 text-electric-blue hover:bg-electric-blue/10 hover:border-electric-blue/50 text-glow-blue hover:shadow-[0_0_10px_rgba(0,180,255,0.4)]";
                if (idx === 2) badgeClass += "bg-purple-500/5 border-purple-500/20 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50 hover:shadow-[0_0_10px_rgba(168,85,247,0.4)]";

                return (
                  <span key={sIdx} className={badgeClass}>
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
