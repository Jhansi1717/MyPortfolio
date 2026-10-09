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
    'Full-Stack Developer',
  ],
  tagline: 'Engineering intelligent machine systems and scalable full-stack architectures.',
  summary:
    'Computer Science (AI & ML) undergraduate with hands-on experience building and deploying AI/ML and full-stack applications across machine learning, NLP, computer vision, and backend systems. Skilled in Python, PyTorch, TensorFlow, FastAPI, React.js, Node.js, and MongoDB, with projects spanning self-supervised learning, audio classification, transformer-based NLP, and full-stack systems.',
  location: 'Hyderabad, Telangana, India',
  status: 'OPEN FOR AI/ML & ENGINEERING OPPORTUNITIES',
  contact: {
    email: 'jhansibhukya17@gmail.com',
    location: 'Hyderabad, Telangana, India',
  },
};

export const navigationItems: NavigationItem[] = [
  { label: 'WORK', href: '#selected-work', index: '01' },
  { label: 'EXPERIENCE', href: '#experience', index: '02' },
  { label: 'ABOUT', href: '#about', index: '03' },
  { label: 'CONTACT', href: '#contact', index: '04' },
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
      'NLP',
      'Computer Vision',
      'Generative AI',
      'Self-Supervised Learning',
      'Explainable AI',
    ],
  },
  {
    id: 'languages',
    code: '02 / SYNTAX & RUNTIMES',
    name: 'Programming Languages',
    description: 'Core languages for algorithm implementation, backend systems, and data pipelines.',
    skills: ['Python', 'JavaScript', 'SQL'],
  },
  {
    id: 'frameworks-libraries',
    code: '03 / FRAMEWORKS & LIBRARIES',
    name: 'Frameworks & Libraries',
    description: 'Machine learning, signal processing, and full-stack runtime libraries.',
    skills: [
      'PyTorch',
      'TensorFlow',
      'Scikit-Learn',
      'Transformers',
      'OpenCV',
      'Librosa',
      'NumPy',
      'Pandas',
      'FastAPI',
      'React.js',
      'Node.js',
      'Express.js',
    ],
  },
  {
    id: 'backend-databases',
    code: '04 / PERSISTENCE & SECURITY',
    name: 'Backend & Databases',
    description: 'REST architecture, access control, and document and relational databases.',
    skills: [
      'REST APIs',
      'MongoDB',
      'MySQL',
      'JWT Authentication',
      'Role-Based Access Control',
    ],
  },
  {
    id: 'core-cs-tools',
    code: '05 / COMPUTATIONAL FOUNDATION',
    name: 'Core CS & Tools',
    description: 'Theoretical computing principles driving reliable, performant software engineering.',
    skills: [
      'Data Structures & Algorithms',
      'OOP',
      'DBMS',
      'Operating Systems',
      'Git',
      'GitHub',
      'Postman',
    ],
  },
];

export const educationData: EducationItem[] = [
  {
    id: 'cbit',
    institution: 'Chaitanya Bharathi Institute of Technology (CBIT)',
    degree: 'B.E. in Computer Science and Engineering',
    specialization: 'Artificial Intelligence & Machine Learning',
    period: 'Expected May 2027',
    location: 'Hyderabad, Telangana',
    cgpaOrGrade: '9.72/10',
    highlights: [
      'Specializing in Artificial Intelligence and Machine Learning: deep neural networks, computer vision, natural language processing, and distributed systems.',
      'Maintained consistent top-tier academic distinction with a 9.72/10 CGPA.',
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
      'Scored 98.8% in Telangana State Board (IPE).',
    ],
  },
];

export { certificationsList } from './certifications';

export const certificationsData: CertificationItem[] = [
  {
    id: 'oracle-agentic-ai',
    title: 'Oracle Certified Associate: Agentic AI Foundations',
    issuer: 'Oracle',
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
      'NLP',
      'Computer Vision',
      'Generative AI',
      'Self-Supervised Learning',
      'Explainable AI',
    ],
  },
  {
    id: 'frameworks-libraries',
    code: '02 / FRAMEWORKS & LIBRARIES',
    name: 'FRAMEWORKS & LIBRARIES',
    subtitle: 'Applied Machine Learning & Application Stacks',
    evidence: 'APPLIED IN: PyTorch, TensorFlow, FastAPI, React.js',
    skills: [
      'PyTorch',
      'TensorFlow',
      'Scikit-Learn',
      'Transformers',
      'OpenCV',
      'Librosa',
      'FastAPI',
      'React.js',
    ],
  },
  {
    id: 'backend-databases',
    code: '03 / BACKEND & DATABASES',
    name: 'BACKEND & DATABASES',
    subtitle: 'Storage Engines, APIs & Access Control',
    evidence: 'APPLIED IN: Pizza Ordering Platform, REST Gateways',
    skills: [
      'Python',
      'JavaScript',
      'SQL',
      'REST APIs',
      'MongoDB',
      'MySQL',
      'JWT Authentication',
      'Role-Based Access Control',
    ],
  },
  {
    id: 'core-cs-tools',
    code: '04 / FOUNDATIONS',
    name: 'CORE CS & TOOLS',
    subtitle: 'Theoretical Foundations & Systems Rigor',
    evidence: 'ACADEMIC FOUNDATION: 9.72 / 10 CGPA @ CBIT',
    skills: [
      'Data Structures & Algorithms',
      'OOP',
      'DBMS',
      'Operating Systems',
      'Git',
      'GitHub',
      'Postman',
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
  period: 'JUL 2026 – PRESENT',
  startDate: 'JUL 2026',
  endDate: 'PRESENT',
  duration: 'CURRENT',
  location: 'REMOTE',
  type: 'DATA SCIENCE PRACTICE',
  focusLabels: ['DATA SCIENCE', 'PRODUCTION PROJECTS', 'SECURE DATA HANDLING'],
  scopeNote:
    'Selected for Aminobots’ Data Science Practice, contributing across production projects including KidneyCare, Helm, TRACE, and PowerIQ while following secure data-handling and client confidentiality requirements.',
  verificationBadge: 'DATA SCIENCE PRACTICE',
  contributions: [
    'Contributing across production projects including KidneyCare, Helm, TRACE, and PowerIQ.',
    'Selected for Aminobots’ Data Science Practice, executing machine learning workflows and data pipelines.',
    'Following secure data-handling protocols and enterprise client confidentiality requirements.',
  ],
  tools: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Git'],
  outcomes: [
    'Contributed across KidneyCare, Helm, TRACE, and PowerIQ production initiatives.',
    'Maintained secure data-handling and client confidentiality standards.',
  ],
};
