import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, type ProjectItem } from '../data/projects';
import { certificatesData, type CertificateItem } from '../data/certificates';
import { ProjectCarousel } from '../components/ProjectCarousel';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { CertificateCarousel } from '../components/CertificateCarousel';
import { CertificateModal } from '../components/CertificateModal';
import { TechStackGrid } from '../components/TechStackGrid';
import { easeSmooth } from '../utils/animationVariants';

type TabType = 'projects' | 'certificates' | 'tech-stack';

interface TabItem {
  id: TabType;
  label: string;
}

const tabs: TabItem[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'tech-stack', label: 'Tech Stack' },
];

export const PortfolioSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section
      id="portfolio"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 sm:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Background Grid and Highlights - Now Global in App.tsx */}

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeSmooth }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
          >
            Portfolio Showcase
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: easeSmooth }}
            className="font-sans text-sm sm:text-base text-neutral-400 max-w-xl"
          >
            Explore my journey through projects, certifications, and technical expertise.
          </motion.p>
        </div>

        {/* Segmented Control Switcher matching Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeSmooth }}
          className="flex justify-center"
        >
          <div className="relative p-1.5 rounded-full bg-[#111116] border border-white/[0.08] flex items-center shadow-lg shadow-black/50">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 px-5 sm:px-8 py-2.5 rounded-full font-mono text-xs sm:text-sm font-medium tracking-wide transition-colors duration-400 ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {tab.label}

                  {/* Active Sliding Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 rounded-full bg-[#272730] border border-white/15 -z-10 shadow-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content Display */}
        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            {activeTab === 'projects' && (
              <motion.div
                key="tab-projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: easeSmooth }}
              >
                <ProjectCarousel
                  projects={projectsData}
                  onSelectProject={(project) => setSelectedProject(project)}
                />
              </motion.div>
            )}

            {activeTab === 'certificates' && (
              <motion.div
                key="tab-certificates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: easeSmooth }}
              >
                <CertificateCarousel
                  certificates={certificatesData}
                  onSelectCertificate={(cert) => setSelectedCert(cert)}
                />
              </motion.div>
            )}

            {activeTab === 'tech-stack' && (
              <motion.div
                key="tab-tech-stack"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: easeSmooth }}
              >
                <TechStackGrid />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        projects={projectsData}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};
