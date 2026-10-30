import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Code2 } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection(navLinks.map((l) => l.id));
  const scrollProgress = useScrollProgress();

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="relative glass-strong rounded-2xl px-4 py-3 md:px-6 md:py-3.5">
            <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary-500 to-accent-500" style={{ width: `${scrollProgress}%` }} />

            <div className="flex items-center justify-between">
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2.5 group"
                aria-label="Go to home"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-shadow">
                  <Code2 className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <span className="font-display font-semibold text-sm hidden sm:block">
                  Ajay Kumar
                </span>
              </button>

              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors duration-300"
                    style={{ color: activeSection === link.id ? '#F8FAFC' : '#94A3B8' }}
                  >
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-white/5 border border-white/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="hidden md:inline-flex btn-primary text-sm py-2 px-4"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </button>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg glass hover:bg-white/10 transition-colors"
                  aria-label="Toggle menu"
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={() => setIsOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[280px] glass-strong border-l border-white/10 p-6 pt-24"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                      activeSection === link.id
                        ? 'text-white bg-white/5'
                        : 'text-text-muted hover:text-white hover:bg-white/5'
                    }`}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {activeSection === link.id && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-gradient-to-b from-primary-500 to-accent-500" />
                    )}
                    {link.label}
                  </motion.button>
                ))}

                <button
                  onClick={() => handleNavClick('contact')}
                  className="btn-primary mt-4 w-full text-sm"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
