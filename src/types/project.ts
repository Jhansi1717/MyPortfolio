/**
 * Reusable Project & Case Study Data Contract
 * Grounded in the factual resume source of truth
 */

export interface ProjectArchitecture {
  summary: string;
  pipeline: string[];
  keyHighlights?: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ArchitectureNode {
  id: string;
  name: string;
  stageNumber: string;
  category: string;
  description: string;
  input?: string;
  output?: string;
  technologies?: string[];
}

export interface EngineeringDecision {
  decision: string;
  reason: string;
  tradeoff: string;
}

export interface TechnologyGroup {
  groupName: string;
  items: string[];
}

export interface TechnicalComponent {
  title: string;
  description: string;
  technologies: string[];
}

export interface ProjectCaseStudy {
  problemStatement: string;
  problemContext: string;
  architectureNodes: ArchitectureNode[];
  technicalApproach: {
    overview: string;
    components: TechnicalComponent[];
  };
  engineeringDecisions: EngineeringDecision[];
  challenges: {
    notice: string;
    verifiedStatus: string;
    placeholderNote: string;
  };
  results: {
    verifiedOutcomes: string[];
    disclaimer: string;
  };
  technologyGroups: TechnologyGroup[];
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  architecture: ProjectArchitecture;
  githubUrl: string;
  liveDemoUrl: string | null; // Nullable as per instructions: no fake live demo URLs
  caseStudyRoute: string;
  metrics: ProjectMetric[] | null; // Nullable: no invented metrics
  bullets: string[]; // Factual bullet points from resume
  status?: string;
  caseStudy: ProjectCaseStudy;
}
