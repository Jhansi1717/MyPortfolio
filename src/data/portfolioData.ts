/**
 * Factual Portfolio Data for Jhansi Bhukya
 * Sourced directly from resume without embellishment
 */
import {
  Profile,
  SocialLink,
  SkillCategory,
  EducationItem,
  CertificationItem,
  NavigationItem,
  SnapshotCategory,
  InternshipExperience,
  ResumeConfig,
} from '../types';
import { authoritativeProfile } from './profile';

export { authoritativeProfile };

export const resumeConfig: ResumeConfig = {
  filePath: '/resume/Jhansi_Bhukya_Resume.pdf',
  fileName: 'Jhansi_Bhukya_Resume.pdf',
  fileFormat: 'PDF',
  note: 'Primary static resume asset located at /public/resume/Jhansi_Bhukya_Resume.pdf',
};

export const profileData: Profile = {
  name: 'Jhansi Bhukya',
  titles: [
    'AI/ML Engineer',
    'AI Systems Builder',
    'Full-Stack Engineer',
  ],
  tagline: 'Engineering intelligent machine systems and scalable full-stack architectures.',
  summary:
    'Computer Science & Engineering (AI & ML) student specializing in Artificial Intelligence, Machine Learning, Computer Vision, NLP, and Full-Stack Engineering. Skilled in building AI-powered applications and scalable software solutions using Python, React, Node.js, MongoDB, and TensorFlow. Strong foundation in DSA, OOP, DBMS, Operating Systems, and Software Engineering.',
  location: 'Hyderabad, India',
  status: 'OPEN FOR AI/ML & ENGINEERING OPPORTUNITIES',
  contact: {
    email: 'jhansibhukya17@gmail.com',
    phone: '+91 7207653560',
    location: 'Hyderabad, India',
  },
};

export const navigationItems: NavigationItem[] = [
  { label: 'WORK', href: '#projects', index: '01' },
  { label: 'EXPERIENCE', href: '#experience', index: '02' },
  { label: 'SYSTEMS', href: '#systems-lab', index: '03' },
  { label: 'ABOUT', href: '#about', index: '04' },
  { label: 'CONTACT', href: '#contact', index: '05' },
];

export const socialLinks: SocialLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: authoritativeProfile.linkedin.profileUrl,
    iconName: 'Linkedin',
    username: authoritativeProfile.linkedin.username,
    isExternal: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    url: authoritativeProfile.github.profileUrl,
    iconName: 'Github',
    username: authoritativeProfile.github.username,
    isExternal: true,
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    url: authoritativeProfile.leetcode.profileUrl,
    iconName: 'Code2',
    username: authoritativeProfile.leetcode.username,
    isExternal: true,
  },
  {
    id: 'email',
    label: 'Email',
    url: `mailto:${authoritativeProfile.email}`,
    iconName: 'Mail',
    username: authoritativeProfile.email,
    isExternal: false,
  },
];

// Flagship projects decoupled into dedicated data module
export { projectsData } from './projectsData';

export const skillCategoriesData: SkillCategory[] = [
  {
    id: 'ai-ml',
    code: '01 / INTELLIGENCE',
    name: 'AI & Machine Learning',
    description: 'Foundational and modern deep learning, neural architectures, and computer vision models.',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Natural Language Processing (NLP)',
      'Generative AI',
      'Self-Supervised Learning',
      'TensorFlow',
      'Transformers',
      'Scikit-Learn',
      'OpenCV',
      'NumPy',
      'Pandas',
    ],
  },
  {
    id: 'languages',
    code: '02 / SYNTAX & RUNTIMES',
    name: 'Programming Languages',
    description: 'Core languages for algorithm implementation, backend systems, and data pipelines.',
    skills: ['Python', 'JavaScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    id: 'web-backend',
    code: '03 / FULL-STACK PLATFORMS',
    name: 'Web & Systems Development',
    description: 'Full-stack reactive web applications, REST architectures, and state handling.',
    skills: [
      'React.js',
      'Node.js',
      'Express.js',
      'RESTful APIs',
      'JWT Authentication',
      'Tailwind CSS',
    ],
  },
  {
    id: 'data-infra',
    code: '04 / PERSISTENCE & TOOLING',
    name: 'Databases & Developer Tools',
    description: 'Document and relational stores with industry-standard development workflows.',
    skills: [
      'MongoDB',
      'MySQL',
      'Git',
      'GitHub',
      'Postman',
      'VS Code',
    ],
  },
  {
    id: 'core-cs',
    code: '05 / COMPUTATIONAL FOUNDATION',
    name: 'Core Computer Science',
    description: 'Theoretical computing principles driving reliable, performant software engineering.',
    skills: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (OOP)',
      'Database Management Systems (DBMS)',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
    ],
  },
];

export const educationData: EducationItem[] = [
  {
    id: 'cbit',
    institution: 'Chaitanya Bharathi Institute of Technology',
    degree: 'B.E. Computer Science & Engineering',
    specialization: 'Artificial Intelligence & Machine Learning',
    period: 'Expected May 2027',
    location: 'Hyderabad, Telangana',
    cgpaOrGrade: '9.72 / 10',
    highlights: [
      'Specializing in Artificial Intelligence and Machine Learning: deep neural networks, computer vision, natural language processing, and distributed systems.',
      'Maintained consistent top-tier academic distinction with a 9.72 / 10 CGPA.',
    ],
  },
  {
    id: 'rudrama-devi',
    institution: 'Rudrama Devi Junior College',
    degree: 'Intermediate (MPC — Mathematics, Physics, Chemistry)',
    period: '2021 – 2023',
    location: 'Hanamkonda, Telangana',
    cgpaOrGrade: '98.8% (IPE)',
    highlights: [
      'Scored 98.8% distinction in Telangana State Board (IPE).',
      'High-percentile academic standing across core analytical sciences.',
    ],
  },
];

export { certificationsList } from './certifications';

export const certificationsData: CertificationItem[] = [
  {
    id: 'oracle-agentic-ai',
    title: 'Agentic AI Certified Foundations Associate',
    issuer: 'Oracle',
  },
  {
    id: 'nptel-c-programming',
    title: 'Problem Solving Through Programming in C',
    issuer: 'NPTEL (IIT Kharagpur)',
  },
  {
    id: 'nptel-ethical-hacking',
    title: 'Ethical Hacking',
    issuer: 'NPTEL (IIT Kharagpur)',
  },
  {
    id: 'ms-genai',
    title: 'Career Essentials in Generative AI',
    issuer: 'Microsoft / LinkedIn',
  },
  {
    id: 'infosys-dbms',
    title: 'Database Management Systems',
    issuer: 'Infosys Springboard',
  },
  {
    id: 'gfg-fullstack',
    title: 'Full Stack Developer Bootcamp',
    issuer: 'GeeksforGeeks',
  },
];


/**
 * TECHNICAL PROFILE
 * Factual capabilities grouped into four structural categories
 * No skill percentages, no progress bars, no unverified expertise levels
 */
export const engineeringSnapshotData: SnapshotCategory[] = [
  {
    id: 'ai-ml',
    code: '01 / AI & ML',
    name: 'AI / MACHINE LEARNING',
    subtitle: 'Neural Architectures & Algorithmic Learning',
    evidence: 'APPLIED IN: Respiratory AI, Mental Health QA',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'NLP',
      'Generative AI',
      'Self-Supervised Learning',
    ],
  },
  {
    id: 'engineering',
    code: '02 / SOFTWARE',
    name: 'SOFTWARE ENGINEERING',
    subtitle: 'Full-Stack Execution & System Runtimes',
    evidence: 'APPLIED IN: Food Ordering Platform, REST Gateways',
    skills: [
      'Python',
      'JavaScript',
      'React',
      'Node.js',
      'Express.js',
      'REST APIs',
    ],
  },
  {
    id: 'data',
    code: '03 / DATA',
    name: 'DATA',
    subtitle: 'Storage Engines & Analytical Pipelines',
    evidence: 'APPLIED IN: Signal Processing, Document Clustering',
    skills: [
      'MongoDB',
      'MySQL',
      'NumPy',
      'Pandas',
      'Scikit-Learn',
    ],
  },
  {
    id: 'core-cs',
    code: '04 / FOUNDATIONS',
    name: 'CORE COMPUTER SCIENCE',
    subtitle: 'Theoretical Foundations & Systems Rigor',
    evidence: 'ACADEMIC FOUNDATION: 9.72 / 10 CGPA @ CBIT',
    skills: [
      'Data Structures & Algorithms',
      'OOP',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
    ],
  },
];

/**
 * EXPERIENCE
 * Verified Industry Internship
 * Editorial representation strictly adhering to factual record
 */
export const internshipExperienceData: InternshipExperience = {
  id: 'aminobots-internship',
  role: 'DATA SCIENCE INTERN',
  company: 'AMINOBOTS',
  period: '15 JUL 2026 — 14 JAN 2027',
  startDate: '15 JUL 2026',
  endDate: '14 JAN 2027',
  duration: '6 MONTHS',
  location: 'HYDERABAD, INDIA',
  type: 'INDUSTRY INTERNSHIP',
  focusLabels: ['DATA SCIENCE', 'MACHINE LEARNING', 'SYSTEM INTEGRATION'],
  scopeNote:
    'Professional industry internship focused on data science pipelines, automated preprocessing workflows, and applied machine learning integration.',
  verificationBadge: 'VERIFIED APPOINTMENT',
};
