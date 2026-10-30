import { Award, Trophy, GraduationCap, Clock, CheckCircle2, BookOpen } from 'lucide-react';
import { certifications, achievements } from '@/data/credentials';
import { education } from '@/data/education';
import { Reveal, SectionHeading, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';

export function Certifications() {
  return (
    <section id="certifications" className="relative section-padding overflow-hidden">
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-primary-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading subtitle="Professional certifications, recognition awards, and academic foundation.">
          Certifications & Achievements
        </SectionHeading>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-5 w-5 text-primary-400" />
                <h3 className="font-display font-semibold text-xl">Certifications</h3>
              </div>
            </Reveal>

            <StaggerContainer className="space-y-3">
              {certifications.map((cert) => (
                <StaggerItem key={cert.title}>
                  <div className="group glass-card p-5 flex items-center gap-4 hover:border-primary-500/20 transition-all duration-300">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/15 to-accent-500/15 border border-primary-500/20 group-hover:scale-105 transition-transform">
                      {cert.status === 'completed' ? (
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      ) : (
                        <Clock className="h-6 w-6 text-accent-400 animate-pulse" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm leading-snug">{cert.title}</h4>
                      <p className="text-xs text-text-muted mt-1">
                        {cert.issuer}
                        {cert.status === 'in-progress' && (
                          <span className="text-accent-400 ml-2">— In Progress</span>
                        )}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Achievements */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="h-5 w-5 text-accent-400" />
                <h3 className="font-display font-semibold text-xl">Achievements</h3>
              </div>
            </Reveal>

            <StaggerContainer className="space-y-3">
              {achievements.map((ach) => (
                <StaggerItem key={ach.title}>
                  <div className="group glass-card p-5 hover:border-accent-500/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/15 to-primary-500/15 border border-accent-500/20 group-hover:scale-105 transition-transform">
                        <Trophy className="h-6 w-6 text-accent-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{ach.title}</h4>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">{ach.description}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Education */}
        <div className="mt-16">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="h-5 w-5 text-primary-400" />
              <h3 className="font-display font-semibold text-xl">Education</h3>
            </div>
          </Reveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-4">
            {education.map((edu) => (
              <StaggerItem key={edu.degree}>
                <div className="group glass-card p-6 hover:border-primary-500/20 transition-all duration-300 h-full">
                  <BookOpen className="h-5 w-5 text-primary-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-medium text-sm leading-snug">{edu.degree}</h4>
                  <p className="text-xs text-text-muted mt-2">{edu.institution}</p>
                  <p className="text-xs font-mono text-primary-400 mt-2">{edu.period}</p>
                  {edu.detail && (
                    <p className="text-xs text-accent-400 mt-1 font-medium">{edu.detail}</p>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
