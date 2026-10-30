import { Code2, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { profile } from '@/data/profile';
import { navLinks } from '@/data/navigation';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[200px] w-[600px] rounded-full bg-primary-500/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12 lg:px-20 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-display font-semibold">{profile.name}</p>
              <p className="text-xs text-text-muted">{profile.role}</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-sm text-text-muted hover:text-primary-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg glass hover:bg-white/10 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg glass hover:bg-white/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="flex h-9 w-9 items-center justify-center rounded-lg glass hover:bg-white/10 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Ajay Kumar. All rights reserved.
          </p>
          <p className="text-xs text-text-muted font-mono">
            Built with React, Three.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
