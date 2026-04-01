import React, { useState, useEffect } from 'react';
import { Terminal, ArrowRight, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const skills = [
  "Python", "C++", "AWS", "Docker", "LangChain", "PyTorch", "RAG pipelines"
];

const Hero = () => {
  const [skillIndex, setSkillIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (typedText.length < skills[skillIndex].length) {
        timeout = setTimeout(() => {
          setTypedText(skills[skillIndex].slice(0, typedText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(typedText.slice(0, -1));
        }, 50);
      } else {
        setSkillIndex((prev) => (prev + 1) % skills.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [typedText, typing, skillIndex]);

  return (
    <section className="min-h-[80vh] flex flex-col justify-center relative mt-12 md:mt-24">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-electric-blue/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-12 z-10 w-full lg:max-w-6xl mx-auto">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-cyber-lime/10 border border-cyber-lime/30 px-3 py-1 rounded-full px-4 text-cyber-lime font-mono text-sm">
            <span className="w-2 h-2 rounded-full bg-cyber-lime animate-pulse"></span>
            <span>SYSTEM.ONLINE()</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tighter text-white">
            <span className="text-glow-lime glow-text block mb-2 glitch-hover">AKHILESH</span>
            <span className="text-glow-blue glow-text block glitch-hover">JOSHI</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 font-sans max-w-lg leading-relaxed">
            Computer Science Engineer | <span className="text-electric-blue font-semibold">AI/ML & DevOps Specialist</span> | Software Developer
          </p>

          <div className="glass-panel p-4 mt-6 max-w-md font-mono text-cyber-lime flex flex-col gap-2 rounded-lg border border-white/5 shadow-2xl relative group">
            <div className="absolute inset-0 bg-cyber-lime/0 group-hover:bg-cyber-lime/5 transition-colors duration-500 z-0"></div>
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-2 z-10">
              <Terminal size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500 uppercase">Terminal // Status</span>
            </div>
            <div className="flex items-center gap-2 z-10 h-6">
              <span className="text-blue-400">root@akhilesh:~$</span>
              <span className="text-white">load_skill()</span>
            </div>
            <div className="flex items-center gap-2 z-10 h-6">
              <span className="text-cyber-lime animate-pulse">&gt;</span>
              <span>{typedText}</span>
              <span className="w-2 h-4 bg-cyber-lime animate-pulse"></span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
            <a 
              href="https://github.com/akhileshj2004" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-obsidian border border-white/20 hover:border-cyber-lime text-white px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 neon-glow group"
            >
              <FaGithub size={18} className="group-hover:text-cyber-lime transition-colors" />
              <span>[Access Repository]</span>
            </a>
            
            <a 
              href="https://linkedin.com/in/akhilesh-joshi-aj2004" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-electric-blue/10 border border-electric-blue/30 hover:bg-electric-blue/20 text-electric-blue px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 neon-glow-blue"
            >
              <FaLinkedin size={18} />
              <span>[Link Intelligence]</span>
            </a>

            <a 
              href="#contact" 
              className="flex items-center gap-2 bg-cyber-lime/10 border border-cyber-lime/30 hover:bg-cyber-lime/20 text-cyber-lime px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 neon-glow"
            >
              <Download size={18} />
              <span>[Download Resume]</span>
            </a>
          </div>
        </div>

        {/* Cyberpunk Visual Node / Hex/Avatar Holder */}
        <div className="flex-1 w-full max-w-sm ml-auto hidden md:block">
          <div className="relative aspect-square w-full filter drop-shadow-[0_0_30px_rgba(0,180,255,0.2)]">
            <div className="absolute inset-0 border-2 border-electric-blue/30 rounded-full animate-[spin_15s_linear_infinite]" style={{ borderStyle: 'dashed' }}></div>
            <div className="absolute inset-4 border-2 border-cyber-lime/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
            <div className="absolute inset-12 bg-obsidian rounded-full border border-white/10 flex items-center justify-center overflow-hidden z-10 glass-panel shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] hover:border-cyber-lime/50 transition-colors duration-500">
               <div className="text-center font-mono opacity-50 flex flex-col items-center">
                 <Terminal className="w-12 h-12 mb-2 text-cyber-lime animate-pulse" />
                 <span className="text-xs tracking-widest uppercase">System Ready</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
