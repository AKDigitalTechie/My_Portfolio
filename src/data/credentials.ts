export interface Certification {
  title: string;
  issuer: string;
  status: 'completed' | 'in-progress';
}

export const certifications: Certification[] = [
  { title: 'Oracle Cloud Infrastructure AI Foundations Associate', issuer: 'Oracle', status: 'completed' },
  { title: 'ReactJS Associate', issuer: 'LearnTube AI', status: 'completed' },
  { title: 'Oracle Cloud Essentials Learner', issuer: 'Oracle', status: 'completed' },
  { title: 'Certified Full Stack Developer', issuer: 'Simplilearn', status: 'completed' },
  { title: 'Microsoft AZ-240', issuer: 'Microsoft', status: 'in-progress' },
];

export interface Achievement {
  title: string;
  description: string;
}

export const achievements: Achievement[] = [
  {
    title: 'Top Performer — Full Stack Training',
    description: 'Achieved 95% overall score in Full Stack development training.',
  },
  {
    title: 'Rockstar Rookie Award 2026',
    description: 'Recognized for exceptional debugging skills.',
  },
  {
    title: 'Annalectual of the Quarter Award 2025',
    description: 'Awarded for outstanding contributions and performance.',
  },
];
