import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown, Download, MapPin, Building2, Briefcase,
} from 'lucide-react';
import { SiReact, SiAngular, SiTypescript, SiDotnet, SiMongodb } from 'react-icons/si';
import { DiMsqlServer } from 'react-icons/di';
import { VscAzureDevops } from 'react-icons/vsc';
import type { IconType } from 'react-icons';
import { profile } from '@/data/profile';

interface TechItem {
  label: string;
  icon?: IconType;
  color?: string;
  image?: string;
}

const techStack: TechItem[] = [
  { label: 'React', icon: SiReact, color: '#61DAFB' },
  { label: 'Angular', icon: SiAngular, color: '#DD0031' },
  { label: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { label: 'C# / .NET', icon: SiDotnet, color: '#7C5CFF' },
  { label: 'SQL Server', icon: DiMsqlServer, color: '#E53935' },
  { label: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { label: 'Azure DevOps', icon: VscAzureDevops, color: '#2899F5' },
  { label: 'Playwright', image: `${import.meta.env.BASE_URL}icons/playwright.svg` },
];

const heroIcons = [
  { icon: Briefcase, label: 'Experience', value: '3.7+ Years' },
  { icon: Building2, label: 'Currently', value: 'SWE @ ABB' },
  { icon: MapPin, label: 'Location', value: 'Bangalore, India' },
];

function TechIcons({ size, className = '' }: { size: 'sm' | 'lg'; className?: string }) {
  const tile = size === 'lg' ? 'h-11 w-11 xl:h-12 xl:w-12' : 'h-10 w-10';
  const glyph = size === 'lg' ? 'h-6 w-6 xl:h-7 xl:w-7' : 'h-5 w-5';

  return (
    <div className={`flex gap-1.5 xl:gap-2 ${className}`}>
      {techStack.map((tech, i) => (
        <motion.div
          key={tech.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 + i * 0.07 }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
            className={`group relative flex ${tile} items-center justify-center rounded-xl glass hover:bg-white/[0.08] hover:border-primary-500/40 transition-colors`}
            aria-label={tech.label}
          >
            {tech.icon ? (
              <tech.icon
                className={`${glyph} transition-transform group-hover:scale-110`}
                style={{ color: tech.color }}
              />
            ) : (
              <img
                src={tech.image}
                alt={tech.label}
                className={`${glyph} transition-transform group-hover:scale-110`}
              />
            )}
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md glass-strong px-2 py-1 text-[11px] font-mono text-text opacity-0 group-hover:opacity-100 transition-opacity">
              {tech.label}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export function Hero({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onReady?.(), 600);
    return () => clearTimeout(timer);
  }, [onReady]);

  const scrollToContent = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary-500/15 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-accent-500/15 blur-[100px]" />
      </div>

      {/* Profile photo */}
      <div className="absolute right-6 md:right-12 lg:right-20 xl:right-32 top-[54%] -translate-y-1/2 z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mx-auto w-fit"
        >
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 opacity-60 blur-xl" />
          <div className="relative rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 p-[2px]">
            <img
              src={`${import.meta.env.BASE_URL}profile.jpg`}
              alt={profile.name}
              className="h-[300px] w-[300px] xl:h-[340px] xl:w-[340px] rounded-3xl object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-sm text-text-muted font-mono">Available for opportunities</span>
          </div>
        </motion.div>

        <TechIcons size="lg" className="mt-5 justify-center" />
      </div>

      {/* Gradient overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />

      {/* First screen: hero content + scroll indicator */}
      <div className="relative min-h-screen">
      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 md:px-12 lg:px-20 py-28 lg:py-0">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05]"
          >
            Hi, I'm <span className="gradient-text">Ajay Kumar</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-6 text-xl md:text-2xl font-medium text-text/90"
          >
            Software Engineer <span className="text-text-muted mx-1">|</span> Full Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-6 text-lg text-text-muted max-w-xl leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <button onClick={scrollToContent} className="btn-primary">
              Explore My Work
              <ArrowDown className="h-4 w-4" />
            </button>
            <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn-secondary">
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-14 flex flex-wrap gap-3"
          >
            {heroIcons.map((item, i) => (
              <div
                key={i}
                className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-white/[0.06] transition-colors"
              >
                <item.icon className="h-4 w-4 text-primary-400" />
                <div className="flex flex-col">
                  <span className="text-xs text-text-muted">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-muted font-mono uppercase tracking-widest">Scroll</span>
        <div className="h-10 w-6 rounded-full border border-white/10 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-primary-400"
          />
        </div>
      </motion.div>
      </div>

      {/* Mobile / tablet: photo, availability and tech icons (below the scroll indicator) */}
      <div className="relative z-10 lg:hidden px-6 md:px-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-fit">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 opacity-60 blur-lg" />
            <div className="relative rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 p-[2px]">
              <img
                src={`${import.meta.env.BASE_URL}profile.jpg`}
                alt={profile.name}
                className="h-48 w-48 sm:h-56 sm:w-56 rounded-2xl object-cover"
              />
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-sm text-text-muted font-mono">Available for opportunities</span>
          </div>

          <TechIcons size="sm" className="mt-5 flex-wrap justify-center" />
        </motion.div>
      </div>
    </section>
  );
}
