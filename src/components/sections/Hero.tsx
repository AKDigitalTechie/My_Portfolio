import { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, MapPin, Building2, Briefcase } from 'lucide-react';
import { profile } from '@/data/profile';

const Workspace3DScene = lazy(() =>
  import('@/components/three/Workspace3DScene').then((m) => ({ default: m.Workspace3DScene })),
);

function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary-500/15 blur-[120px]" />
      <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-accent-500/15 blur-[100px]" />
      <div className="relative glass-strong rounded-2xl p-8 max-w-md border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
            <div className="h-3 w-3 rounded-full bg-green-400/60" />
          </div>
        </div>
        <div className="space-y-2 font-mono text-sm">
          <p className="text-text-muted">{'>'} const developer = {`{`}</p>
          <p className="text-primary-400 pl-4">name: <span className="text-text">'Ajay Kumar'</span>,</p>
          <p className="text-primary-400 pl-4">role: <span className="text-text">'Software Engineer'</span>,</p>
          <p className="text-primary-400 pl-4">location: <span className="text-text">'Bangalore'</span></p>
          <p className="text-text-muted">{`}`}</p>
        </div>
      </div>
    </div>
  );
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

const heroIcons = [
  { icon: Briefcase, label: 'Experience', value: '3.7+ Years' },
  { icon: Building2, label: 'Currently', value: 'SWE @ ABB' },
  { icon: MapPin, label: 'Location', value: 'Bangalore, India' },
];

export function Hero({ onReady }: { onReady?: () => void }) {
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setWebglAvailable(hasWebGL());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => onReady?.(), 600);
      return () => clearTimeout(timer);
    }
  }, [mounted, onReady]);

  const scrollToContent = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0">
        {webglAvailable ? (
          <Suspense fallback={<HeroFallback />}>
            <Workspace3DScene className="absolute inset-0" />
          </Suspense>
        ) : (
          <HeroFallback />
        )}
      </div>

      {/* Gradient overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-sm text-text-muted font-mono">Available for opportunities</span>
          </motion.div>

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
            <a href={`mailto:${profile.email}`} className="btn-secondary">
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
    </section>
  );
}
