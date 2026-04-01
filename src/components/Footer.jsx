import React from 'react';
import { Mail, Phone, Download, Terminal } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-obsidian py-12 border-t border-white/10 mt-24 relative overflow-hidden" id="contact">
      <div className="absolute top-0 right-[20%] w-96 h-96 bg-electric-blue/5 blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start font-mono text-xl text-white">
            <Terminal className="text-cyber-lime w-6 h-6" />
            <span>AKHILESH_JOSHI</span>
          </div>
          <p className="text-gray-500 font-sans text-sm max-w-sm">
            Computer Science Engineer | AI/ML & DevOps Specialist | Software Developer.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start gap-3 flex-1 md:px-12">
          <a href="mailto:akhileshjoshi2004@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-cyber-lime transition-colors font-mono font-sm group">
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>akhileshjoshi2004@gmail.com</span>
          </a>
          <a href="tel:+918861814369" className="flex items-center gap-3 text-gray-400 hover:text-electric-blue transition-colors font-mono font-sm group">
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>+91 8861814369</span>
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-4">
            <a href="https://github.com/akhileshj2004" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-dark-charcoal border border-white/10 flex items-center justify-center hover:bg-cyber-lime/10 hover:border-cyber-lime transition-colors mt-auto text-gray-400 hover:text-cyber-lime tooltip-trigger">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/akhilesh-joshi-aj2004" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-dark-charcoal border border-white/10 flex items-center justify-center hover:bg-electric-blue/10 hover:border-electric-blue transition-colors text-gray-400 hover:text-electric-blue">
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>

          <a 
            href="#" 
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyber-lime/20 to-electric-blue/20 hover:from-cyber-lime/30 hover:to-electric-blue/30 border border-white/20 hover:border-white transition-all duration-300 rounded-md text-white font-mono text-sm neon-glow"
          >
            <Download className="w-4 h-4" />
            [Download Resume]
          </a>
        </div>
        
      </div>

      <div className="container mx-auto px-6 max-w-7xl mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-600">
        <p>&copy; 2026. ALL RIGHTS RESERVED.</p>
        <p>SYSTEM_VERSION: 2.0.0_CYBERPUNK</p>
      </div>
    </footer>
  );
};

export default Footer;
