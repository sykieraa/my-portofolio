import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ProjectItem } from '../data/projects';
import { easeSmooth } from '../utils/animationVariants';

interface ProjectCardProps {
  project: ProjectItem;
  isCenter: boolean;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isCenter,
  onSelect,
}) => {
  return (
    <motion.div
      animate={{
        scale: isCenter ? 1.05 : 0.95,
        opacity: isCenter ? 1 : 0.65,
      }}
      transition={{ duration: 0.5, ease: easeSmooth }}
      className={`relative w-[320px] sm:w-[360px] md:w-[400px] flex-shrink-0 rounded-[28px] overflow-hidden transition-all duration-500 flex flex-col justify-between ${
        isCenter
          ? 'bg-[#0e0e12] border border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.06)] ring-1 ring-white/10'
          : 'bg-[#0a0a0d] border border-white/[0.07] shadow-xl hover:border-white/15'
      }`}
    >
      {/* Top Image Preview Container */}
      <div className="p-4 pb-0">
        <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden bg-[#141419] border border-white/[0.08] group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Category Chip */}
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-neutral-300 font-semibold">
              {project.category}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight line-clamp-1">
            {project.title}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed">
            {project.shortDesc}
          </p>
        </div>

        {/* Tech tags preview */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="font-mono text-[10px] text-neutral-400 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="font-mono text-[10px] text-neutral-500 px-1.5 py-0.5">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
          <span className="font-mono text-xs text-neutral-500 flex items-center gap-1.5">
            {project.links.demo || project.links.video ? (
              <span className="flex items-center gap-1 text-emerald-400/90 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {project.links.video ? 'Demo Video' : 'Live Demo'}
              </span>
            ) : (
              <span className="text-neutral-500">No Link</span>
            )}
          </span>

          <button
            onClick={() => onSelect(project)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/15 border border-white/15 text-white font-mono text-xs font-medium tracking-wide transition-all duration-300 group"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
