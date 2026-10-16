import { useState } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { PortfolioSection } from './sections/PortfolioSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';
import { useScrollSpy } from './hooks/useScrollSpy';

export function App() {
  const [loading, setLoading] = useState(true);
  const activeSection = useScrollSpy(['home', 'about', 'experience', 'portfolio', 'contact'], 200);

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-[#A1A1AA] overflow-x-hidden font-sans">
      {/* Global Background Grid - Fixed Layer */}
      <div className="fixed inset-0 bg-tech-grid opacity-80 pointer-events-none z-[1]" />
      
      {/* Multiple Spotlight Highlights - Fixed Layered */}
      <div className="fixed inset-0 pointer-events-none z-[2]">
        <div className="absolute inset-0 spotlight-top-left" />
        <div className="absolute inset-0 spotlight-top-right" />
        <div className="absolute inset-0 spotlight-center" />
        <div className="absolute inset-0 spotlight-bottom-right" />
      </div>

      {/* 1. Custom Cursor */}
      <CustomCursor />

      {/* 2. Welcome Preloader Timeline */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 3. Floating Pill Navigation */}
      <Navbar activeSection={activeSection} />

      {/* 4. Main Content Sections */}
      <main className="relative z-[10]">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <PortfolioSection />
        <ContactSection />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}

export default App;
