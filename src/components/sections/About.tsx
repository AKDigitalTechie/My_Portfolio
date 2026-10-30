import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, MapPin, Briefcase, GraduationCap, Sparkles, Copy, Check } from 'lucide-react';
import { profile } from '@/data/profile';
import { Reveal, SectionHeading } from '@/components/ui/Reveal';

export function About() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-primary-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading subtitle="Get to know the engineer behind the code.">
          A little about me.
        </SectionHeading>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Reveal>
              {profile.about.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-text/80 mb-6"
                >
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
                {[
                  { icon: Briefcase, label: 'Experience', value: '3.7+ Years' },
                  { icon: Code2, label: 'Focus', value: 'Full Stack' },
                  { icon: MapPin, label: 'Location', value: 'Bangalore' },
                ].map((item, i) => (
                  <div key={i} className="glass-card p-4 hover:border-primary-500/20 transition-colors">
                    <item.icon className="h-5 w-5 text-primary-400 mb-2" />
                    <p className="text-xs text-text-muted">{item.label}</p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Interactive Profile Card */}
          <div className="lg:col-span-2">
            <Reveal delay={0.3}>
              <div className="group relative glass-card p-6 hover:border-primary-500/20 transition-all duration-500 hover:shadow-lg hover:shadow-primary-500/10">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-md" />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500">
                        <span className="font-display font-bold text-xl text-white">AK</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg">{profile.name}</h3>
                      <p className="text-sm text-text-muted">{profile.currentRole} @ {profile.currentCompany}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <Briefcase className="h-4 w-4 text-primary-400 shrink-0" />
                      <span className="text-text-muted">Experience:</span>
                      <span className="font-medium">{profile.experience}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-primary-400 shrink-0" />
                      <span className="text-text-muted">Based in:</span>
                      <span className="font-medium">{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <GraduationCap className="h-4 w-4 text-primary-400 shrink-0" />
                      <span className="text-text-muted">Education:</span>
                      <span className="font-medium">BE — Telecommunication</span>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                      <Sparkles className="h-3.5 w-3.5 text-accent-400" />
                      <span>Currently exploring</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Enterprise Software', 'Automation', 'Cloud', 'AI'].map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full glass text-text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="mt-5 w-full flex items-center justify-between glass rounded-xl px-4 py-3 hover:bg-white/[0.06] transition-colors group/copy"
                  >
                    <span className="text-sm text-text-muted font-mono truncate">{profile.email}</span>
                    {copied ? (
                      <Check className="h-4 w-4 text-green-400 shrink-0" />
                    ) : (
                      <Copy className="h-4 w-4 text-text-muted group-hover/copy:text-primary-400 transition-colors shrink-0" />
                    )}
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
