import { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Certifications } from '@/components/sections/Certifications';
import { Contact } from '@/components/sections/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + Math.random() * 15 + 5, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <>
      <LoadingScreen progress={progress} isLoading={isLoading} />
      <CustomCursor />

      <div className="relative min-h-screen bg-bg">
        {/* Ambient background gradients */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-primary-500/[0.03] blur-[150px]" />
          <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-accent-500/[0.03] blur-[150px]" />
        </div>

        <Navbar />

        <main className="relative z-10">
          <Hero onReady={() => {}} />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
