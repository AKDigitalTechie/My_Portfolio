export interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location?: string;
  responsibilities: string[];
}

export const experiences: ExperienceItem[] = [
  {
    company: 'ABB',
    role: 'Software Engineer',
    startDate: 'April 2026',
    endDate: 'Present',
    location: 'Bangalore, India',
    responsibilities: [
      'Developing enterprise industrial software and digital platforms for automation applications, including Asset Performance Management.',
      'Building scalable full-stack modules using React, Angular, middleware services, SQL Server, and MongoDB.',
      'Collaborating with global Agile teams.',
      'Designing and executing automation tests for functionality, integration, and production readiness.',
    ],
  },
  {
    company: 'Omnicom Global Solutions',
    role: 'Senior Associate Software Developer',
    startDate: 'April 2025',
    endDate: 'March 2026',
    responsibilities: [
      'Developed responsive React and TypeScript components for campaign management platforms.',
      'Integrated RESTful APIs using Axios and Swagger.',
      'Enhanced internal flowchart builder applications.',
      'Implemented Excel export functionality.',
      'Optimized application performance using lazy loading, memoization, and efficient state handling.',
    ],
  },
  {
    company: 'Omnicom Global solutions',
    role: 'Associate Software Developer',
    startDate: 'January 2024',
    endDate: 'March 2025',
    responsibilities: [
      'Developed backend APIs using C# and .NET microservices.',
      'Integrated frontend workflows with backend services.',
      'Implemented role-based access control and validation logic.',
      'Improved API performance and reliability through logging, exception handling, and code refactoring.',
    ],
  },
  {
    company: 'Omnicom Global solutions',
    role: 'Junior Associate Software Developer',
    startDate: 'March 2023',
    endDate: 'December 2023',
    responsibilities: [
      'Developed reusable React components.',
      'Built interactive chart visualization systems.',
      'Implemented Redux for state management.',
      'Debugged and resolved production issues.',
    ],
  },
  {
    company: 'AnnalECT India',
    role: '.NET Full Stack Developer',
    startDate: 'November 2022',
    endDate: 'February 2023',
    location: 'Advertising and Marketing Technology Industry',
    responsibilities: [],
  },
];
