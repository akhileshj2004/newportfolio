import React, { useState } from 'react';
import { Network, Database, BrainCircuit, Activity, Lock, FlaskConical, LayoutGrid, Eye } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import Modal from './Modal';

const publications = [
  {
    title: "A Holistic Approach to Diabetes Management: Integrating Sentiment Analysis with Clinical and Behavioral Data",
    authorship: "First Author",
    venue: "SMARTCOM 2026, to be published in Springer LNNS",
    icon: <Activity className="w-8 h-8 text-cyber-lime" />,
    fullDesc: "Proposes a comprehensive framework integrating sentiment analysis from patient reviews with clinical metrics and behavioral data to improve diabetes management outcomes.\n\nUses NLP pipelines for sentiment extraction, combined with structured clinical datasets for multi-modal predictive modeling.",
    keywords: ["Sentiment Analysis", "NLP", "Clinical Data", "Diabetes", "Multi-modal ML"],
  },
  {
    title: "RBI Compliance Assistant",
    authorship: "Corresponding Author",
    venue: "IJCACI 2025, to be published in Springer LNNS",
    icon: <Database className="w-8 h-8 text-electric-blue" />,
    fullDesc: "Develops a domain-adapted generative AI assistant fine-tuned on Reserve Bank of India circulars using Mistral-7B with QLoRA.\n\nValidates response quality through BLEU and ROUGE metrics, enabling compliance officers to query regulations in natural language.",
    keywords: ["Gen AI", "Mistral-7B", "QLoRA", "Financial NLP", "BLEU/ROUGE"],
  },
  {
    title: "Classification of Watermelons based on Ripeness using Multimodal Data",
    authorship: "First Author",
    venue: "ITAI 2025, published in Springer LNNS",
    icon: <BrainCircuit className="w-8 h-8 text-purple-400" />,
    fullDesc: "Achieves 98% accuracy in watermelon ripeness classification using a multimodal approach combining visual (image), audio (tapping sound), and sensor data.\n\nEmploys computer vision with TensorFlow/OpenCV and audio feature extraction for robust classification.",
    keywords: ["Computer Vision", "Multimodal ML", "TensorFlow", "OpenCV", "Agriculture AI"],
  },
  {
    title: "Exploratory Data Analytics of COVID-19 Vaccination Drive in India",
    authorship: "Corresponding Author",
    venue: "IEEE Xplore (10847026), 2024",
    icon: <Network className="w-8 h-8 text-yellow-400" />,
    fullDesc: "Comprehensive exploratory data analysis of India's COVID-19 vaccination campaign, analyzing distribution patterns, demographic coverage, and regional disparities.\n\nPublished in IEEE Xplore with data-driven insights for public health policy.",
    keywords: ["Data Analytics", "COVID-19", "Public Health", "IEEE", "Visualization"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Experience = () => {
  const [selectedPub, setSelectedPub] = useState(null);

  return (
    <section className="py-20 flex flex-col gap-12" id="experience">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-8"
      >
        <FlaskConical className="text-cyber-lime w-10 h-10" />
        <h2 className="text-4xl">
          [<span className="text-white">Experience & Research</span>]
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="glass-panel p-8 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-lime/10 blur-[50px] pointer-events-none group-hover:bg-cyber-lime/20 transition-colors duration-500" />
        <div className="flex items-start gap-4 flex-col md:flex-row justify-between">
          <div className="space-y-4 relative z-10 w-full">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-mono text-cyber-lime glitch-hover inline-block">AI Intern</h3>
                <p className="text-electric-blue text-lg font-sans">IIIT Dharwad</p>
              </div>
              <span className="text-gray-500 font-mono text-sm border border-gray-700 px-3 py-1 rounded-full bg-dark-charcoal">Jan 2026 – May 2026</span>
            </div>
            <p className="text-gray-300 font-sans leading-relaxed text-lg pt-2 md:max-w-3xl">
              Developing a <span className="text-white font-semibold">Retrieval‑Augmented Generation (RAG)</span> pipeline to enhance LLM responses using local knowledge bases. Integrating localized embeddings and semantic search vectors to significantly improve the accuracy and context-awareness of the pipeline over unstructured data sources.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 space-y-6">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-mono text-gray-400 border-l-2 border-electric-blue pl-4 mb-8"
        >
          Research Publications // <span className="text-electric-blue">Data Deck</span>
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((pub, idx) => (
            <motion.div key={idx} custom={idx} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.1} scale={1.02} className="h-full">
                <div className="glass-panel p-6 h-full flex flex-col gap-4 border-t-2 border-t-white/5 relative group hover:border-t-cyber-lime/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-0" />
                  <div className="relative z-10 flex justify-between items-start">
                    {pub.icon}
                    <span className="text-xs font-mono px-2 py-1 bg-obsidian border border-gray-700 rounded-md text-gray-400 opacity-80 group-hover:opacity-100 transition-opacity">
                      {pub.authorship}
                    </span>
                  </div>
                  <h4 className="relative z-10 text-white font-mono text-lg flex-1 mt-2">{pub.title}</h4>
                  <div className="relative z-10 text-sm font-sans text-electric-blue pt-3 border-t border-white/10 mt-auto">{pub.venue}</div>

                  <button
                    onClick={() => setSelectedPub(pub)}
                    className="relative z-10 flex items-center gap-2 text-xs font-mono text-cyber-lime border border-cyber-lime/30 rounded-lg px-3 py-1.5 hover:bg-cyber-lime/10 transition-all duration-300 w-fit mt-2 hover:scale-105 active:scale-95"
                  >
                    <Eye size={12} />
                    [View Details]
                  </button>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Research Detail Modal */}
      <Modal
        isOpen={!!selectedPub}
        onClose={() => setSelectedPub(null)}
        title={selectedPub?.title}
        accent="electric-blue"
      >
        {selectedPub && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-electric-blue/10 rounded-lg">{selectedPub.icon}</div>
              <div>
                <span className="text-xs font-mono text-gray-400 block">{selectedPub.authorship}</span>
                <span className="text-sm font-sans text-electric-blue">{selectedPub.venue}</span>
              </div>
            </div>

            <p className="text-gray-300 font-sans leading-relaxed whitespace-pre-line text-sm">
              {selectedPub.fullDesc}
            </p>

            {selectedPub.keywords && (
              <div>
                <h4 className="text-xs font-mono text-gray-500 uppercase mb-3 tracking-wider">Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPub.keywords.map((kw, i) => (
                    <span key={i} className="text-xs font-mono px-3 py-1.5 rounded-md bg-electric-blue/10 text-electric-blue border border-electric-blue/20">{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Experience;
