import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, ArrowUp } from 'lucide-react';
import { socialsData, type SocialLink } from '../data/socials';
import { navigationData } from '../data/navigation';
import { profileData } from '../data/profile';

const renderSocialIcon = (iconName: string) => {
  switch (iconName) {
    case 'Github':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case 'Linkedin':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      );
    case 'Instagram':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      );
    case 'Mail':
      return <Mail className="w-4 h-4" />;
    case 'Twitter':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'MessageSquare':
      return <MessageSquare className="w-4 h-4" />;
    default:
      return <Mail className="w-4 h-4" />;
  }
};

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#070709] relative z-20 py-12 px-6 sm:px-10 lg:px-16 text-neutral-400">
      <div className="max-w-6xl mx-auto flex flex-col space-y-10">
        {/* Top Row: Brand, Nav & Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Brand & Subtitle */}
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="font-mono text-xl font-bold text-white tracking-wider hover:text-neutral-300 transition-colors"
            >
              {profileData.brand}
            </a>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 max-w-sm">
              {profileData.bio.quote}
            </p>
          </div>

          {/* Quick Navigation Jump */}
          <div className="flex flex-wrap justify-center gap-6">
            {navigationData.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="font-mono text-xs text-neutral-400 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Social Media Link Badges */}
          <div className="flex items-center gap-3">
            {socialsData.map((social: SocialLink) => (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, rotate: 3, scale: 1.05 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/15 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors shadow-sm"
                aria-label={social.name}
              >
                {renderSocialIcon(social.icon)}
              </motion.a>
            ))}
          </div>

        </div>

        {/* Bottom Row: Copyright & Back-to-Top */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>
            © {new Date().getFullYear()} {profileData.name.full}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-400 hover:text-white transition-all duration-300 group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
