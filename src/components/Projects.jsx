import React from 'react';
import { ExternalLink, Code, Server, Cpu, Layers, Database, Users, Network, Brain, Shield, ShoppingCart, GraduationCap, Stethoscope, BookOpen, Wifi, Activity, Lock, Camera } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

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
    desc: "Multi-agent RAG system with Federated Learning to improve a local Sarvam-2B model for Soliga‑English translation. Optimized for GTX 1650 (4GB VRAM). Features LangGraph agents, LoRA fine‑tuning with 4‑bit quantization, and speech‑to‑text for Soliga input.",
    github: null,
    live: null,
    icon: <Brain className="w-6 h-6" />,
    featured: true,
  },
  {
    title: "Packet Vision",
    tags: ["Python", "Flask", "Docker", "Deep Neural Networks"],
    desc: "ML‑powered DDoS detection system. Built during ACM Nexus 2025 (24‑hr National Hackathon).",
    live: "https://packetvision.up.railway.app",
    github: "https://github.com/akhileshj2004/packet-vision",
    icon: <Shield className="w-6 h-6" />,
    featured: true,
  },
  {
    title: "RBI Compliance Assistant",
    tags: ["Generative AI", "Mistral-7B", "QLoRA", "BLEU/ROUGE"],
    desc: "Generative AI system fine‑tuned on RBI circulars. Implements BLEU/ROUGE validation for financial regulation accuracy.",
    github: null,
    live: null,
    icon: <Cpu className="w-6 h-6" />,
    featured: false,
  },
  {
    title: "ShopSync",
    tags: ["AWS EC2", "Docker Compose", "IaC"],
    desc: "Collaborative shopping list web app with full DevOps pipeline. Reduced deployment time from hours to minutes.",
    github: "https://github.com/akhileshj2004/shared-shopping-list",
    live: null,
    icon: <ShoppingCart className="w-6 h-6" />,
    featured: false,
  },
  {
    title: "AlumniBridge",
    tags: ["Web", "Social Platform"],
    desc: "Alumni‑student interaction platform with verified profiles, job opportunities, event registration, mentorship connections.",
    github: "https://github.com/akhileshj2004/AlumniBridge",
    live: null,
    icon: <GraduationCap className="w-6 h-6" />,
    featured: false,
  },
];

const additionalProjects = [
  {
    title: "Watermelon Classification",
    desc: "Computer vision achieving 98% accuracy in ripeness classification using visual, audio, and data analysis.",
    tags: "Python, TensorFlow, OpenCV",
  },
  {
    title: "Smart Traffic Management System",
    desc: "Dijkstra's algorithm for route planning, BFS for city connectivity, parking slot reservations.",
    github: "https://github.com/akhileshj2004/SmartTraffic_DSA",
    tags: "DSA, C++",
  },
  {
    title: "Blockchain Profile Verification",
    desc: "OTP‑based verification with credential validation.",
    github: "https://github.com/akhileshj2004/blockchain-profile-verification",
    tags: "Blockchain",
  },
  {
    title: "Library Management System",
    desc: "Normalized relational DB schema for automated lending/inventory.",
    github: "https://github.com/akhileshj2004/sqlLibrarysystem",
    tags: "SQL",
  },
  {
    title: "Hospital Management System",
    desc: "Medical appointment booking and healthcare record management.",
    github: "https://github.com/akhileshj2004/medicalappointment",
    tags: "C++, OOP",
  },
  {
    title: "Recipe Manager",
    desc: "Comprehensive recipe management with search by ingredients/ratings, veg/non‑veg organization.",
    tags: "MERN / C++",
  },
  {
    title: "5G LTE IoT Simulation (NS‑3)",
    desc: "Performance analysis of UDP communication, throughput, delay, and MQTT efficiency.",
    tags: "NS-3, IoT",
  },
  {
    title: "EEG Artifact Removal System",
    desc: "Zynq board implementation for sleep monitoring.",
    tags: "FPGA, Zynq",
  },
  {
    title: "Systems Biology",
    desc: "Cytoscape, The Virtual Brain.",
    tags: "Bioinformatics",
  },
];

const Projects = () => {
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

      {/* Highlighted Projects Grid */}
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
          <Tilt 
             tiltMaxAngleX={8} 
             tiltMaxAngleY={8} 
             glareEnable={true} 
             glareMaxOpacity={0.15}
             glareColor="#00FF41"
             glarePosition="all"
             className="h-full"
           >
            <div className={`glass-panel p-6 h-full flex flex-col group neon-glow bg-dark-charcoal hover:bg-obsidian transition-colors duration-500 relative ${idx === 0 ? 'border-l-4 border-l-cyber-lime/60' : ''}`}>
              {/* Top accent bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyber-lime/0 via-cyber-lime/50 to-cyber-lime/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Featured badge */}
              {proj.featured && (
                <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyber-lime/10 text-cyber-lime border border-cyber-lime/30 uppercase tracking-wider">
                  Featured
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                 <div className="p-3 bg-cyber-lime/10 rounded-lg text-cyber-lime">
                   {proj.icon}
                 </div>
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
              
              <p className="text-gray-400 font-sans leading-relaxed mb-6 flex-1">
                {proj.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto border-t border-white/5 pt-4">
                {proj.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-xs font-mono text-electric-blue bg-electric-blue/10 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Tilt>
          </motion.div>
        ))}
      </div>

      {/* Additional Projects */}
      <div className="glass-panel p-6 mt-12 bg-obsidian">
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
      </div>
    </section>
  );
};

export default Projects;
