import React, { useState } from 'react';
import { ExternalLink, Code, Server, Cpu, Layers, Database, Users, Network, Brain, Shield, ShoppingCart, GraduationCap, Eye } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import Modal from './Modal';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const highlightedProjects = [
  {
    title: "Federated Multi-Agent RAG System",
    tags: ["Python", "LangGraph", "Flower", "ChromaDB", "FastAPI"],
    shortDesc: "Multi-agent RAG system with Federated Learning for Soliga‑English translation.",
    fullDesc: "Python multi-agent RAG system with Federated Learning to improve a local Sarvam-2B model for Soliga‑English translation. Optimized for GTX 1650 (4GB VRAM).\n\nFeatures: LangGraph (Router → RAG → Refinement agents), Flower (flwr) for LoRA fine‑tuning, 4‑bit quantization, ChromaDB, FastAPI, speech‑to‑text for Soliga input.",
    techDetails: ["LangGraph multi-agent orchestration", "Flower federated learning framework", "LoRA + 4-bit quantization", "ChromaDB vector store", "FastAPI backend", "Speech-to-text pipeline"],
    github: "https://github.com/akhileshj2004/federated-multi-agent-rag",
    live: null,
    icon: <Brain className="w-6 h-6" />,
    featured: true,
  },
  {
    title: "Graph-Based Route Planner System",
    tags: ["C++", "OOP", "DSA"],
    shortDesc: "City network simulator with A*, BFS, and Prim's Algorithm.",
    fullDesc: "City network simulator for real-time route optimization and infrastructure planning across weighted, directed edges.\n\nArchitected 10+ OOP classes with role-based access control and mutex-protected logging.",
    techDetails: ["A* and BFS algorithms", "Prim's Algorithm", "C++ Object-Oriented Design", "Mutex-protected logging"],
    github: "https://github.com/akhileshj2004/route_planner_in_cpp",
    live: null,
    icon: <Network className="w-6 h-6" />,
    featured: true,
  },
  {
    title: "Packet Vision",
    tags: ["Python", "Flask", "Docker", "Deep Neural Networks"],
    shortDesc: "ML‑powered DDoS detection system. Built during ACM Nexus 2025.",
    fullDesc: "ML‑powered DDoS detection system using Python Flask + Docker + deep neural networks. Built during ACM Nexus 2025 (24‑hr National Hackathon).\n\nEliminates DDoS threats with real-time ML intelligence, containerized deployment, and neural network classification.",
    techDetails: ["Python Flask web framework", "Docker containerization", "Deep Neural Network classifier", "Real-time packet analysis", "REST API endpoints"],
    live: "https://packetvision.up.railway.app",
    github: "https://github.com/akhileshj2004/packet-vision",
    icon: <Shield className="w-6 h-6" />,
    featured: false,
  },
  {
    title: "Interactive 3D Portfolio",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    shortDesc: "High-performance interactive developer portfolio.",
    fullDesc: "Interactive developer portfolio featuring custom CSS 3D physics, Canvas-based matrix rain, and complex state-driven micro-animations.\n\nIntegrated live telemetry tracking using serverless APIs.",
    techDetails: ["React & Vite", "Framer Motion animations", "Canvas API matrix rain", "CSS 3D transforms", "Serverless API telemetry"],
    github: "https://github.com/akhileshj2004/newportfolio",
    live: null,
    icon: <Code className="w-6 h-6" />,
    featured: false,
  }
];

const additionalProjects = [
  { title: "Watermelon Classification", desc: "Computer vision achieving 98% accuracy in ripeness classification.", tags: "Python, TensorFlow, OpenCV" },
  { title: "Blockchain Profile Verification", desc: "OTP‑based verification with credential validation.", github: "https://github.com/akhileshj2004/blockchain-profile-verification", tags: "Blockchain" },
  { title: "Library Management System", desc: "Normalized relational DB schema for automated lending.", github: "https://github.com/akhileshj2004/sqlLibrarysystem", tags: "SQL" },
  { title: "Hospital Management System", desc: "Medical appointment booking and healthcare records.", github: "https://github.com/akhileshj2004/medicalappointment", tags: "C++, OOP" },
  { title: "Recipe Manager", desc: "Recipe management with search by ingredients/ratings.", tags: "MERN / C++" },
  { title: "5G LTE IoT Simulation (NS‑3)", desc: "UDP throughput, delay, and MQTT efficiency analysis.", tags: "NS-3, IoT" },
  { title: "EEG Artifact Removal", desc: "Zynq board implementation for sleep monitoring.", tags: "FPGA, Zynq" },
  { title: "Systems Biology", desc: "Cytoscape, The Virtual Brain.", tags: "Bioinformatics" },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="py-16 space-y-12" id="projects">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4"
      >
        <Code className="text-electric-blue w-10 h-10" />
        <h2 className="text-4xl text-white font-mono">
          [Data Nodes] <span className="text-electric-blue text-2xl font-sans tracking-tight">/ Projects</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {highlightedProjects.map((proj, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={idx === 0 ? 'md:col-span-2 xl:col-span-2' : ''}
          >
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable={true} glareMaxOpacity={0.15} glareColor="#00FF41" glarePosition="all" className="h-full">
              <div className={`glass-panel p-6 h-full flex flex-col group neon-glow bg-dark-charcoal hover:bg-obsidian transition-colors duration-500 relative ${idx === 0 ? 'border-l-4 border-l-cyber-lime/60' : ''}`}>
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyber-lime/0 via-cyber-lime/50 to-cyber-lime/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {proj.featured && (
                  <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyber-lime/10 text-cyber-lime border border-cyber-lime/30 uppercase tracking-wider">
                    Featured
                  </div>
                )}

                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-cyber-lime/10 rounded-lg text-cyber-lime">{proj.icon}</div>
                  <div className="flex gap-3">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors p-1">
                        <FaGithub className="w-5 h-5" />
                      </a>
                    )}
                    {proj.live && (
                      <a href={proj.live} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyber-lime transition-colors p-1">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-mono text-white mb-3 group-hover:text-cyber-lime transition-colors">{proj.title}</h3>
                <p className="text-gray-400 font-sans leading-relaxed mb-4 flex-1">{proj.shortDesc}</p>

                <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4 mb-4">
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-mono text-electric-blue bg-electric-blue/10 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(proj)}
                  className="flex items-center gap-2 text-sm font-mono text-cyber-lime border border-cyber-lime/30 rounded-lg px-4 py-2 hover:bg-cyber-lime/10 transition-all duration-300 w-fit hover:scale-105 active:scale-95"
                >
                  <Eye size={14} />
                  [View Details]
                </button>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/* Additional Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-panel p-6 mt-12 bg-obsidian"
      >
        <h4 className="text-xl font-mono text-gray-500 mb-6 border-l-2 border-gray-600 pl-4">Additional_Modules()</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {additionalProjects.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2 text-sm font-sans text-gray-300 p-4 bg-dark-charcoal border border-white/5 rounded-md hover:border-cyber-lime/30 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-cyber-lime font-mono">&gt;</span>
                  <span className="text-white font-semibold group-hover:text-cyber-lime transition-colors">{item.title}</span>
                </div>
                {item.github && (
                  <a href={item.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <FaGithub className="w-4 h-4" />
                  </a>
                )}
              </div>
              <p className="text-gray-500 text-xs pl-5">{item.desc}</p>
              <span className="text-[10px] font-mono text-electric-blue/60 pl-5">{item.tags}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        accent="cyber-lime"
      >
        {selectedProject && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-cyber-lime/10 rounded-lg text-cyber-lime">{selectedProject.icon}</div>
              {selectedProject.featured && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyber-lime/10 text-cyber-lime border border-cyber-lime/30 uppercase">Featured</span>
              )}
            </div>

            <p className="text-gray-300 font-sans leading-relaxed whitespace-pre-line text-sm">
              {selectedProject.fullDesc}
            </p>

            <div>
              <h4 className="text-xs font-mono text-gray-500 uppercase mb-3 tracking-wider">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-mono px-3 py-1.5 rounded-md bg-electric-blue/10 text-electric-blue border border-electric-blue/20">{tag}</span>
                ))}
              </div>
            </div>

            {selectedProject.techDetails && (
              <div>
                <h4 className="text-xs font-mono text-gray-500 uppercase mb-3 tracking-wider">Key Features</h4>
                <ul className="space-y-2">
                  {selectedProject.techDetails.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400 font-sans">
                      <span className="text-cyber-lime mt-0.5 flex-shrink-0">▸</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(selectedProject.github || selectedProject.live) && (
              <div className="flex gap-3 pt-3 border-t border-white/10">
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-mono text-white bg-white/5 border border-white/10 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    <FaGithub size={14} /> GitHub
                  </a>
                )}
                {selectedProject.live && (
                  <a href={selectedProject.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-mono text-cyber-lime bg-cyber-lime/10 border border-cyber-lime/30 px-4 py-2 rounded-lg hover:bg-cyber-lime/20 transition-colors">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Projects;
