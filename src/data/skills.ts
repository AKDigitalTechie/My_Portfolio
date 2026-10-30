export interface SkillCategory {
  name: string;
  icon: string;
  skills: { name: string; icon: string }[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: 'Monitor',
    skills: [
      { name: 'React.js', icon: 'Atom' },
      { name: 'Angular', icon: 'Triangle' },
      { name: 'Vue.js', icon: 'Component' },
      { name: 'JavaScript', icon: 'Braces' },
      { name: 'TypeScript', icon: 'FileCode' },
      { name: 'HTML5', icon: 'Code2' },
      { name: 'CSS3', icon: 'Palette' },
      { name: 'Redux', icon: 'Layers' },
    ],
  },
  {
    name: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'C#', icon: 'Hash' },
      { name: '.NET', icon: 'Network' },
      { name: 'ASP.NET MVC', icon: 'LayoutTemplate' },
      { name: 'RESTful APIs', icon: 'Webhook' },
      { name: 'Microservices', icon: 'Boxes' },
    ],
  },
  {
    name: 'Databases',
    icon: 'Database',
    skills: [
      { name: 'SQL Server', icon: 'Database' },
      { name: 'MongoDB', icon: 'Container' },
      { name: 'PostgreSQL', icon: 'Database' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: 'Cloud',
    skills: [
      { name: 'Oracle Cloud', icon: 'Cloud' },
      { name: 'Azure DevOps', icon: 'CloudCog' },
      { name: 'Git', icon: 'GitBranch' },
    ],
  },
  {
    name: 'Testing',
    icon: 'TestTube',
    skills: [
      { name: 'Jest', icon: 'FlaskConical' },
      { name: 'Vitest', icon: 'TestTube' },
      { name: 'UI Automation', icon: 'MousePointerClick' },
      { name: 'API Testing', icon: 'Webhook' },
    ],
  },
  {
    name: 'Other',
    icon: 'Sparkles',
    skills: [
      { name: 'Power BI', icon: 'BarChart3' },
      { name: 'Agile', icon: 'Repeat' },
      { name: 'TDD', icon: 'CheckCircle' },
      { name: 'Performance Optimization', icon: 'Gauge' },
      { name: 'Debugging', icon: 'Bug' },
      { name: 'System Design', icon: 'Workflow' },
    ],
  },
];
