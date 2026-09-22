export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerOrganization?: string;
  institution?: string;
  category: string;
  date?: string;
  validUntil?: string;
  credentialId?: string;
  level?: string;
  period?: string;
  duration?: string;
  score?: string;
  assignmentScore?: string;
  proctoredExamScore?: string;
  certifiedCandidates?: number;
  featured?: boolean;
  certificateImage?: string;
  verifyUrl?: string;
  summary?: string;
  skillsHighlighted?: string[];
}

export const certificationsList: Certification[] = [
  {
    id: 'oracle-agentic-ai',
    title: 'Agentic AI Certified Foundations Associate',
    issuer: 'Oracle',
    issuerOrganization: 'Oracle University',
    category: 'Agentic AI / Artificial Intelligence',
    date: 'July 31, 2026',
    validUntil: 'July 31, 2028',
    credentialId: '103382087AAI26OFA',
    level: 'Oracle Certified Foundations Associate',
    featured: true,
    summary:
      'Rigorous industry certification from Oracle University validating core competencies in agentic AI paradigms, autonomous agent loops, multi-agent communication, and foundational AI architectures.',
    skillsHighlighted: [
      'Agentic AI Architectures',
      'Autonomous Agent Design',
      'Multi-Agent Coordination',
      'AI Decision Pipelines',
    ],
  },
  {
    id: 'nptel-c-programming',
    title: 'Problem Solving Through Programming in C',
    issuer: 'NPTEL',
    institution: 'Indian Institute of Technology Kharagpur',
    level: 'Elite',
    period: 'Jul-Oct 2024',
    duration: '12 week course',
    score: '63%',
    assignmentScore: '21.19 / 25',
    proctoredExamScore: '42 / 75',
    certifiedCandidates: 2171,
    credentialId: 'NPTEL24CS123S1050205132',
    category: 'Programming / Problem Solving',
    summary:
      'Rigorous 12-week proctored curriculum delivered by IIT Kharagpur covering algorithmic problem solving, structured data types, pointers, dynamic memory allocation, and algorithmic complexity.',
    skillsHighlighted: [
      'Structured C Programming',
      'Pointer & Memory Manipulation',
      'Algorithm Formulation',
      'Computational Logic',
    ],
  },
  {
    id: 'nptel-ethical-hacking',
    title: 'Ethical Hacking',
    issuer: 'NPTEL',
    institution: 'Indian Institute of Technology Kharagpur',
    level: 'Elite',
    period: 'Jul-Oct 2024',
    duration: '12 week course',
    score: '73%',
    assignmentScore: '22.16 / 25',
    proctoredExamScore: '51 / 75',
    certifiedCandidates: 6948,
    credentialId: 'NPTEL24CS94S450204947',
    category: 'Cybersecurity / Ethical Hacking',
    summary:
      'In-depth 12-week course by IIT Kharagpur exploring network vulnerabilities, penetration testing methodologies, system auditing, cryptography concepts, and defensive security measures.',
    skillsHighlighted: [
      'Penetration Testing Principles',
      'Network Vulnerability Auditing',
      'Security Protocols & Defense',
      'System Threat Analysis',
    ],
  },
  {
    id: 'ms-genai',
    title: 'Career Essentials in Generative AI',
    issuer: 'Microsoft',
    issuerOrganization: 'Microsoft / LinkedIn',
    category: 'Generative AI / Foundations',
    summary:
      'Foundational curriculum covering generative AI concepts, LLM principles, responsible AI ethics, and developer workflow augmentation.',
    skillsHighlighted: [
      'Generative AI Foundations',
      'Responsible AI Frameworks',
      'Large Language Models',
    ],
  },
  {
    id: 'infosys-dbms',
    title: 'Database Management Systems',
    issuer: 'Infosys',
    issuerOrganization: 'Infosys Springboard',
    category: 'Data Architecture / DBMS',
    summary:
      'Comprehensive database engineering program emphasizing relational schema design, SQL optimization, normalization, and ACID transaction guarantees.',
    skillsHighlighted: [
      'Relational Schemas',
      'SQL Query Optimization',
      'ACID & Transactions',
      'Database Indexing',
    ],
  },
  {
    id: 'gfg-fullstack',
    title: 'Full Stack Developer Bootcamp',
    issuer: 'GeeksforGeeks',
    issuerOrganization: 'GeeksforGeeks',
    category: 'Full-Stack Engineering',
    summary:
      'End-to-end full-stack software development curriculum spanning modern reactive client architectures, REST API engineering, and database connectivity.',
    skillsHighlighted: [
      'React & Modern UI',
      'Node.js & Express APIs',
      'REST Architectures',
      'Full-Stack Integration',
    ],
  },
];
