export interface Project {
  title: string;
  category: string;
  description: string;
  techStack: string[];
  gradient: string;
}

export const projects: Project[] = [
  {
    title: 'Flowchart Builder',
    category: 'Interactive Application',
    description:
      'An interactive application for building and managing flowcharts with drag-and-drop nodes, custom connectors, and real-time canvas updates.',
    techStack: ['React', 'TypeScript', 'Redux'],
    gradient: 'from-primary-500/20 to-accent-500/20',
  },
  {
    title: 'Campaign Management Platform',
    category: 'Enterprise Frontend',
    description:
      'Enterprise frontend components and campaign management workflows with responsive layouts, API integration, and role-based access.',
    techStack: ['React', 'TypeScript', 'REST APIs', 'Axios'],
    gradient: 'from-accent-500/20 to-primary-500/20',
  },
  {
    title: 'Inventory Management Application',
    category: 'Full-Stack Application',
    description:
      'Full-stack application using .NET and modern frontend technologies for inventory tracking, CRUD operations, and data persistence.',
    techStack: ['.NET', 'C#', 'React', 'SQL Server'],
    gradient: 'from-primary-400/20 to-accent-400/20',
  },
  {
    title: 'Excel Integration Application',
    category: 'Data & Export Workflows',
    description:
      'Excel-based functionality and data export workflows enabling spreadsheet generation, data transformation, and automated export pipelines.',
    techStack: ['React', 'TypeScript', 'Excel Export'],
    gradient: 'from-accent-400/20 to-primary-400/20',
  },
  {
    title: 'Enterprise API & Microservices',
    category: 'Backend Architecture',
    description:
      'Backend services, REST API integrations, and application architecture built on .NET microservices with logging, exception handling, and refactoring.',
    techStack: ['C#', '.NET', 'Microservices', 'REST APIs'],
    gradient: 'from-primary-500/20 to-accent-400/20',
  },
];
