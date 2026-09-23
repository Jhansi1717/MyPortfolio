/**
 * Core Data Models & TypeScript Types
 * Grounded strictly in the resume source of truth
 */

export * from './project';

export interface Profile {
  name: string;
  titles: string[];
  tagline: string;
  summary: string;
  location: string;
  status: string;
  contact: {
    email: string;
    phone?: string;
    location: string;
  };
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  iconName: string;
  username?: string;
  isExternal: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  summary: string;
  bullets: string[];
  technologies: string[];
  featured: boolean;
  route: string;
  status?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  code: string;
  skills: string[];
  description?: string;
}

export interface ResumeConfig {
  filePath: string;
  fileName: string;
  fileFormat: string;
  note?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  specialization?: string;
  period: string;
  location: string;
  cgpaOrGrade: string;
  highlights?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  verifyUrl?: string;
  badgeCode?: string;
}

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

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'academic' | 'internship' | 'leadership' | 'project';
  bullets: string[];
}

export interface SnapshotCategory {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  evidence: string;
  skills: string[];
}

export interface InternshipExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  startDate: string;
  endDate: string;
  duration: string;
  location: string;
  type: string;
  focusLabels: string[];
  scopeNote: string;
  verificationBadge: string;
  contributions?: string[];
  tools?: string[];
  outcomes?: string[];
}

export interface NavigationItem {
  label: string;
  href: string;
  index: string;
  isRoute?: boolean;
}
