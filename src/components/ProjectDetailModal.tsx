import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Play, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import type { ProjectItem } from '../data/projects';
import { easeSmooth } from '../utils/animationVariants';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  projects: ProjectItem[];
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  projects,
  onClose,
  onSelectProject,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    setIsVideoOpen(false);
  }, [project?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (project) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, projects]);

  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : 0;
  const handlePrev = () => {
    if (!project) return;
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    onSelectProject(projects[prevIdx]);
  };
  const handleNext = () => {
    if (!project) return;
    const nextIdx = (currentIndex + 1) % projects.length;
    onSelectProject(projects[nextIdx]);
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
        >
          {/* Dark Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.5, ease: easeSmooth }}
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-[32px] bg-[#0c0c10] border border-white/12 shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-6 sm:p-8 md:p-10 text-white"
          >
          {/* Header Navigation Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white font-mono text-xs transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Showcase</span>
            </button>

            {/* Prev / Next Switcher Controls */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-neutral-500 mr-2">
                {currentIndex + 1} / {projects.length}
              </span>
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 ml-2 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 text-neutral-300 hover:text-white transition-all"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main 2-Column Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 pt-8">
            
            {/* Left Column: Title, Overview, Stats, Tech Tags, Video & Action Buttons */}
            <div className="lg:col-span-6 flex flex-col space-y-5">
              
              {/* Category & Title */}
              <div className="space-y-3">
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: easeSmooth }}
                  className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block"
                >
                  {project.category}
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: easeSmooth }}
                  className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight"
                >
                  {project.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: easeSmooth }}
                  className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed pt-1"
                >
                  {project.fullDesc}
                </motion.p>
              </div>

              {/* Statistics Row */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: easeSmooth }}
                className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                {project.stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-mono text-[10px] sm:text-xs text-neutral-500 uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <span className="font-display text-base sm:text-lg font-bold text-white mt-1">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Tech Stack Pills */}
              <div className="space-y-2">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + idx * 0.05, ease: easeSmooth }}
                      className="font-mono text-xs text-neutral-300 px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Video Demo Player (Placed directly above CTA Action Buttons) */}
              <AnimatePresence>
                {isVideoOpen && project.links.video && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.98 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: easeSmooth }}
                    className="overflow-hidden rounded-2xl bg-black border border-white/15 shadow-2xl relative"
                  >
                    <div className="relative">
                      <video
                        key={project.links.video}
                        src={project.links.video}
                        poster={project.image}
                        controls
                        autoPlay
                        playsInline
                        className="w-full aspect-video object-contain bg-black"
                      />
                      <button
                        type="button"
                        onClick={() => setIsVideoOpen(false)}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-black/75 hover:bg-black text-neutral-300 hover:text-white border border-white/20 backdrop-blur-md transition-all shadow-lg z-10"
                        aria-label="Close video demo"
                        title="Close video demo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: easeSmooth }}
                className="flex flex-wrap gap-3 pt-2"
              >
                {project.links.video && (
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen((prev) => !prev)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg ${
                      isVideoOpen
                        ? 'bg-neutral-800 text-white border border-white/20 hover:bg-neutral-700 shadow-black/40'
                        : 'bg-white text-black hover:bg-neutral-200 shadow-white/10'
                    }`}
                  >
                    <span>{isVideoOpen ? 'Hide Demo' : 'Watch Demo'}</span>
                    {isVideoOpen ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 fill-current" />
                    )}
                  </button>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#16161c] hover:bg-[#202028] border border-white/15 text-white font-medium text-sm transition-all duration-300"
                  >
                    <span>View Live Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#16161c] hover:bg-[#202028] border border-white/15 text-white font-medium text-sm transition-all duration-300"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>Source Code</span>
                  </a>
                )}
              </motion.div>

            </div>

            {/* Right Column: High-Res Image & Key Features Card */}
            <div className="lg:col-span-6 space-y-6">

              {/* Project Mockup Preview */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: easeSmooth }}
                className="relative rounded-[24px] overflow-hidden bg-[#141419] border border-white/15 shadow-2xl group"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </motion.div>

              {/* Key Features Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: easeSmooth }}
                className="p-6 rounded-[24px] bg-[#111116] border border-white/[0.08] space-y-4"
              >
                <h4 className="font-display text-base font-bold text-white tracking-wide flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Key Architectural Features
                </h4>
                <ul className="space-y-2.5">
                  {project.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>

          </div>
        </motion.div>
      </motion.div>
    )}
    </AnimatePresence>
  );
};
