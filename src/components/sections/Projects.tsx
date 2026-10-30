import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Layers } from 'lucide-react';
import { projects } from '@/data/projects';
import { Reveal, SectionHeading, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { Project } from '@/data/projects';

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      <div className="absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-accent-500/5 blur-[140px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading subtitle="Selected projects from professional experience — built with modern technologies and enterprise-grade architecture.">
          Featured Projects
        </SectionHeading>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <StaggerItem key={project.title}>
              <button
                onClick={() => setSelected(project)}
                className="group relative h-full text-left glass-card overflow-hidden hover:border-primary-500/20 transition-all duration-500 hover:shadow-lg hover:shadow-primary-500/10 w-full"
                style={{ perspective: '1000px' }}
              >
                {/* Visual representation */}
                <div className={`relative h-40 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Layers className="h-16 w-16 text-white/10 group-hover:text-white/20 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full glass text-text-muted">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full glass group-hover:bg-primary-500/20 transition-colors">
                      <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-primary-400 transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-md glass text-text-muted font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-500 to-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </button>
            </StaggerItem>
          ))}

          {/* CTA card */}
          <StaggerItem>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-full min-h-[280px] flex flex-col items-center justify-center glass-card p-6 hover:border-accent-500/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-primary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col items-center text-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500/15 to-accent-500/15 border border-primary-500/20 group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="h-6 w-6 text-primary-400" />
                </div>
                <h3 className="font-display font-semibold text-lg">Let's Connect</h3>
                <p className="text-sm text-text-muted max-w-[200px]">
                  Interested in my work? Let's discuss how I can contribute to your team.
                </p>
              </div>
            </a>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={() => setSelected(null)} />
            <motion.div
              className="relative glass-strong rounded-2xl max-w-lg w-full p-8 border border-white/10"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full glass hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-400">
                {selected.category}
              </span>
              <h3 className="font-display font-bold text-2xl mt-4 mb-3">{selected.title}</h3>
              <p className="text-text/80 leading-relaxed mb-6">{selected.description}</p>

              <div>
                <p className="text-sm text-text-muted mb-3 font-medium">Technology Stack</p>
                <div className="flex flex-wrap gap-2">
                  {selected.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1.5 rounded-lg glass font-mono text-text"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-6 text-xs text-text-muted leading-relaxed">
                This project is based on professional work experience. Details are shared as summaries without disclosing confidential information.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
