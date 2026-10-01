/**
 * Reusable Project & Case Study Data Contract
 * Grounded in factual resume data
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

export interface ArchitecturePipelineStep {
  id: string;
  step: string;
  label: string;
  sublabel: string;
  input: string;
  output: string;
  detail: string;
  technologies: string[];
}

export interface SystemComponentDetail {
  name: string;
  role: string;
  details: string;
  technologies: string[];
}

export interface ModelSpecification {
  label: string;
  value: string;
  description: string;
}

export interface EvaluationCriterion {
  aspect: string;
  validation: string;
  evidence: string;
}

export interface EngineeringSubsystem {
  name: string;
  focus: string;
  implementation: string;
  technologies: string[];
}

export interface ProjectEngineeringReasoning {
  problem: {
    title: string;
    statement: string;
    context: string;
    constraints?: string[];
  };
  system: {
    title: string;
    overview: string;
    components: SystemComponentDetail[];
  };
  modelAI: {
    title: string;
    isApplicable: boolean;
    approach: string;
    details: string;
    specifications: ModelSpecification[];
  };
  engineering: {
    title: string;
    overview: string;
    subsystems: EngineeringSubsystem[];
  };
  evaluation: {
    title: string;
    methodology: string;
    criteria: EvaluationCriterion[];
    factualNote: string;
  };
  tradeoffs: EngineeringDecision[];
  result: {
    title: string;
    measurableOutcomes: string[];
    disclaimer: string;
  };
  architectureVisual: {
    summary: string;
    pipelineSteps: ArchitecturePipelineStep[];
  };
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
  engineeringReasoning?: ProjectEngineeringReasoning;
  apiDocsUrl?: string;
  backendUrl?: string;
}
