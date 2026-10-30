export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  detail?: string;
}

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Engineering — Telecommunication',
    institution: 'KSIT — VTU',
    period: '2018 – 2022',
    detail: 'CGPA: 8.0/10',
  },
  {
    degree: 'PUC — Computer and Information Science',
    institution: 'Pre-University',
    period: '2016 – 2018',
  },
  {
    degree: 'SSLC — Science',
    institution: 'Secondary Education',
    period: '2015 – 2016',
  },
];
