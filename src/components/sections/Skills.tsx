import {
  Monitor, Server, Database, Cloud, TestTube, Sparkles,
  Atom, Triangle, Component, Braces, FileCode, Code2, Palette, Layers,
  Hash, Network, LayoutTemplate, Webhook, Boxes, Container,
  CloudCog, GitBranch, FlaskConical, MousePointerClick,
  BarChart3, Repeat, CheckCircle, Gauge, Bug, Workflow,
} from 'lucide-react';
import { skillCategories } from '@/data/skills';
import { Reveal, SectionHeading, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor, Server, Database, Cloud, TestTube, Sparkles,
  Atom, Triangle, Component, Braces, FileCode, Code2, Palette, Layers,
  Hash, Network, LayoutTemplate, Webhook, Boxes, Container,
  CloudCog, GitBranch, FlaskConical, MousePointerClick,
  BarChart3, Repeat, CheckCircle, Gauge, Bug, Workflow,
};

export function Skills() {
  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-accent-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading subtitle="A comprehensive technology ecosystem spanning frontend, backend, databases, cloud, and testing.">
          Technical Skills
        </SectionHeading>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const CatIcon = iconMap[category.icon] || Sparkles;
            return (
              <StaggerItem key={category.name}>
                <div className="group relative h-full glass-card p-6 hover:border-primary-500/20 transition-all duration-500 hover:shadow-lg hover:shadow-primary-500/5">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/15 to-accent-500/15 border border-primary-500/20 group-hover:scale-110 group-hover:border-primary-500/40 transition-all duration-300">
                        <CatIcon className="h-5 w-5 text-primary-400" />
                      </div>
                      <h3 className="font-display font-semibold text-lg">{category.name}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => {
                        const SkillIcon = iconMap[skill.icon] || Code2;
                        return (
                          <div
                            key={skill.name}
                            className="flex items-center gap-2 rounded-lg glass px-3 py-2 text-sm hover:bg-white/[0.08] hover:border-primary-500/20 transition-all cursor-default hover:scale-105 duration-200"
                          >
                            <SkillIcon className="h-3.5 w-3.5 text-accent-400" />
                            <span className="font-medium">{skill.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
