import { useState, useEffect, lazy, Suspense } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { DownloadToast } from '@/components/DownloadToast';
import { Hero } from '@/components/sections/Hero';
import { prefetchResume } from '@/lib/resume';

const loadAbout = () => import('@/components/sections/About').then((m) => ({ default: m.About }));
const loadSkills = () => import('@/components/sections/Skills').then((m) => ({ default: m.Skills }));
const loadExperience = () =>
  import('@/components/sections/Experience').then((m) => ({ default: m.Experience }));
const loadProjects = () =>
  import('@/components/sections/Projects').then((m) => ({ default: m.Projects }));
const loadCertifications = () =>
  import('@/components/sections/Certifications').then((m) => ({ default: m.Certifications }));
const loadContact = () =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact }));
const loadFooter = () => import('@/components/Footer').then((m) => ({ default: m.Footer }));

const About = lazy(loadAbout);
const Skills = lazy(loadSkills);
const Experience = lazy(loadExperience);
const Projects = lazy(loadProjects);
const Certifications = lazy(loadCertifications);
const Contact = lazy(loadContact);
const Footer = lazy(loadFooter);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // After the first screen is up, quietly load the rest of the page and the resume.
  useEffect(() => {
    const preload = () => {
      [loadAbout, loadSkills, loadExperience, loadProjects, loadCertifications, loadContact, loadFooter].forEach(
        (load) => void load(),
      );
      prefetchResume();
    };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(preload, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(preload, 1500);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + Math.random() * 25 + 20, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setIsLoading(false), 120);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <>
      <LoadingScreen progress={progress} isLoading={isLoading} />
      <CustomCursor />
      <DownloadToast />

      <div className="relative min-h-screen bg-bg">
        {/* Ambient background gradients */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-0 h-[600px] w-[600px] blob-primary opacity-40" />
          <div className="absolute bottom-0 right-0 h-[600px] w-[600px] blob-accent opacity-40" />
        </div>

        <Navbar />

        <main className="relative z-10">
          <Hero onReady={() => {}} />
          <Suspense fallback={null}>
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certifications />
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
