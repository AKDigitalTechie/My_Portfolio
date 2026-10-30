import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, ChevronRight } from 'lucide-react';
import { experiences } from '@/data/experience';
import { Reveal, SectionHeading } from '@/components/ui/Reveal';

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="relative section-padding overflow-hidden">
      <div className="absolute top-1/4 left-0 h-[400px] w-[400px] rounded-full bg-primary-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading subtitle="A progressive career journey across enterprise software, full-stack development, and industrial automation.">
          Professional Experience
        </SectionHeading>

        <div ref={containerRef} className="relative">
          {/* Timeline track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 bg-white/5 rounded-full" />
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 w-[2px] md:-translate-x-1/2 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 rounded-full"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.4, ease: 'backOut' }}
                      className="relative"
                    >
                      <div className="absolute inset-0 rounded-full bg-primary-500/30 blur-md animate-glow-pulse" />
                      <div className="relative flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 border-2 border-bg">
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content card */}
                  <div className={`pl-12 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'} md:w-1/2`}>
                    <Reveal y={30}>
                      <div className="group glass-card p-6 hover:border-primary-500/20 transition-all duration-500 hover:shadow-lg hover:shadow-primary-500/5">
                        <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                          <span className="text-xs font-mono text-primary-400 px-2.5 py-1 rounded-full bg-primary-500/10">
                            {exp.startDate} — {exp.endDate}
                          </span>
                        </div>

                        <h3 className="font-display font-semibold text-lg text-text">{exp.role}</h3>
                        <div className={`flex items-center gap-2 mt-1 mb-4 ${isLeft ? 'md:justify-end' : ''}`}>
                          <Briefcase className="h-4 w-4 text-accent-400" />
                          <span className="text-accent-400 font-medium">{exp.company}</span>
                        </div>

                        {exp.location && (
                          <p className="text-sm text-text-muted mb-3">{exp.location}</p>
                        )}

                        {exp.responsibilities.length > 0 && (
                          <ul className={`space-y-2 ${isLeft ? 'md:text-left' : ''}`}>
                            {exp.responsibilities.map((resp, j) => (
                              <li
                                key={j}
                                className={`flex items-start gap-2 text-sm text-text/70 leading-relaxed ${
                                  isLeft ? 'md:flex-row-reverse md:text-right' : ''
                                }`}
                              >
                                <ChevronRight className="h-4 w-4 text-primary-400 shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
