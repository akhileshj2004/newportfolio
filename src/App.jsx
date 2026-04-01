import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import CyberPenguin from './components/CyberPenguin';
import LiquidCursor from './components/LiquidCursor';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div className={`min-h-screen text-gray-300 relative selection:bg-cyber-lime selection:text-black font-sans transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="fixed inset-0 z-0 bg-dark-charcoal opacity-90 pointer-events-none" />
        <div className="fixed inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none" />

        {/* Cyberpunk ambient glows */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-lime/10 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-electric-blue/10 blur-[120px] rounded-full pointer-events-none z-0" />

        <Navbar />
        <NewsTicker />

        <main className="relative z-10 container mx-auto px-6 py-8 max-w-7xl flex flex-col gap-24">
          <Hero />
          <Projects />
          <Experience />
          <Skills />
          <Achievements />
        </main>

        <Footer />
        <LiquidCursor />
        {loaded && <CyberPenguin />}
      </div>
    </>
  );
}

export default App;
