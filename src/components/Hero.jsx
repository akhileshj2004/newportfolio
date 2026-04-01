import React, { useState, useEffect } from 'react';
import { Terminal, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const skills = [
  "Python", "C++", "AWS", "Docker", "LangChain", "PyTorch", "RAG pipelines"
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
});

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
    <section className="min-h-[80vh] flex flex-col justify-center relative mt-12 md:mt-24" id="home">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-electric-blue/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-12 z-10 w-full lg:max-w-6xl mx-auto">
        <div className="flex-1 space-y-6">
          <motion.div {...fadeUp(0.2)} className="inline-flex items-center space-x-2 bg-cyber-lime/10 border border-cyber-lime/30 py-1 rounded-full px-4 text-cyber-lime font-mono text-sm">
            <span className="w-2 h-2 rounded-full bg-cyber-lime animate-pulse"></span>
            <span>SYSTEM.ONLINE()</span>
          </motion.div>

          <motion.h1 {...fadeUp(0.35)} className="text-5xl md:text-7xl font-mono font-bold tracking-tighter text-white flex flex-wrap gap-x-6 gap-y-2">
            <span className="text-glow-lime glow-text glitch-hover glitch-text" data-text="AKHILESH">AKHILESH</span>
            <span className="text-glow-blue glow-text glitch-hover glitch-text" data-text="JOSHI">JOSHI</span>
          </motion.h1>

          <motion.p {...fadeUp(0.5)} className="text-xl md:text-2xl text-gray-400 font-sans max-w-lg leading-relaxed">
            Computer Science Engineer | <span className="text-electric-blue font-semibold">AI/ML & DevOps Specialist</span> | Software Developer
          </motion.p>

          <motion.div {...fadeUp(0.65)} className="glass-panel p-4 mt-6 max-w-md font-mono text-cyber-lime flex flex-col gap-2 rounded-lg border border-white/5 shadow-2xl relative group">
            <div className="absolute inset-0 bg-cyber-lime/0 group-hover:bg-cyber-lime/5 transition-colors duration-500 z-0 rounded-lg"></div>
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
          </motion.div>

          <motion.div {...fadeUp(0.8)} className="flex flex-wrap gap-4 pt-6">
            <a
              href="https://github.com/akhileshj2004"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-obsidian border border-white/20 hover:border-cyber-lime text-white px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 neon-glow group hover:scale-105"
            >
              <FaGithub size={18} className="group-hover:text-cyber-lime transition-colors" />
              <span className="bracket-hover">Access Repository</span>
            </a>

            <a
              href="https://linkedin.com/in/akhilesh-joshi-aj2004"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-electric-blue/10 border border-electric-blue/30 hover:bg-electric-blue/20 text-electric-blue px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 neon-glow-blue hover:scale-105"
            >
              <FaLinkedin size={18} />
              <span className="bracket-hover">Link Intelligence</span>
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 bg-cyber-lime/10 border border-cyber-lime/30 hover:bg-cyber-lime/20 text-cyber-lime px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 neon-glow hover:scale-105"
            >
              <Download size={18} />
              <span className="bracket-hover">Download Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Cyberpunk Visual Node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 w-full max-w-sm ml-auto hidden md:block"
        >
          <div className="relative aspect-square w-full filter drop-shadow-[0_0_30px_rgba(0,180,255,0.2)]">
            {/* Radar Sweep Ring */}
            <div className="absolute inset-0 rounded-full border border-electric-blue/20 overflow-hidden">
               <div className="absolute w-1/2 h-1/2 bottom-1/2 right-1/2 origin-bottom-right bg-gradient-to-tr from-electric-blue/0 via-electric-blue/10 to-electric-blue/40 animate-[spin_4s_linear_infinite]" />
            </div>
            
            <div className="absolute inset-0 border-[3px] border-electric-blue/30 rounded-full animate-[spin_15s_linear_infinite] border-dashed"></div>
            <div className="absolute inset-4 border-2 border-cyber-lime/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
            
            {/* Scanning line across the circle */}
            <div className="absolute inset-8 rounded-full overflow-hidden border border-cyber-lime/10">
              <div className="absolute top-0 w-full h-[2px] bg-cyber-lime/40 shadow-[0_0_10px_rgba(0,255,65,1)] animate-[float_3s_ease-in-out_infinite]" />
            </div>

            <div className="absolute inset-12 bg-obsidian rounded-full border border-white/10 flex items-center justify-center z-10 glass-panel shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] hover:border-cyber-lime/50 transition-colors duration-500 overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[length:10px_10px] opacity-20" />
               <div className="text-center font-mono opacity-50 flex flex-col items-center group-hover:opacity-100 transition-opacity">
                 <Terminal className="w-12 h-12 mb-2 text-cyber-lime animate-pulse" />
                 <span className="text-xs tracking-widest uppercase glitch-text" data-text="SYSTEM READY">System Ready</span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
