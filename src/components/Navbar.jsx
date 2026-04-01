import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X } from 'lucide-react';

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500 rounded-2xl border
      ${scrolled
        ? 'bg-obsidian/70 backdrop-blur-xl border-white/10 shadow-[0_0_30px_rgba(0,255,65,0.05)]'
        : 'bg-transparent backdrop-blur-sm border-transparent'}
    `}>
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <Terminal className="w-5 h-5 text-cyber-lime group-hover:animate-pulse" />
          <span className="font-mono text-white text-sm tracking-wide group-hover:text-cyber-lime transition-colors">
            AJ<span className="text-cyber-lime">_</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-mono text-gray-400 hover:text-cyber-lime rounded-lg hover:bg-cyber-lime/5 transition-all duration-300 relative group"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-cyber-lime group-hover:w-[60%] transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-400 hover:text-cyber-lime transition-colors p-1"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 border-t border-white/5 mt-1 animate-[fadeIn_0.2s_ease-out]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-mono text-gray-400 hover:text-cyber-lime hover:pl-2 transition-all duration-200 border-b border-white/5 last:border-0"
            >
              <span className="text-cyber-lime mr-2">&gt;</span>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
