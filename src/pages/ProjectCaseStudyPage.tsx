import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Terminal,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Boxes,
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { Container } from '../components/primitives/Container';
import { Badge } from '../components/primitives/Badge';
import { Button } from '../components/primitives/Button';
import { InteractiveArchitectureDiagram } from '../components/projects/InteractiveArchitectureDiagram';
import { ProjectVisualStack } from '../components/projects/ProjectVisualStack';

export const ProjectCaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Scroll to apex on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  }, [slug, shouldReduceMotion]);

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="py-24">
        <Container size="narrow" className="text-center">
          <div className="font-mono text-xs text-[#D49A46] uppercase tracking-widest mb-3">
            ERROR: 404 // NOT FOUND
          </div>
          <h1 className="font-display text-3xl font-bold uppercase text-[#F2EBDD] mb-4">
            SPECIFICATION NOT LOCATED
          </h1>
          <p className="text-sm text-[#AAA398] mb-8 font-mono">
            The requested project route <code className="text-[#E5BA70]">/projects/{slug}</code> is not registered in the system registry.
          </p>
          <Link to="/#projects">
            <Button variant="secondary" size="md" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
              RETURN TO SELECTED SYSTEMS
            </Button>
          </Link>
        </Container>
      </div>
    );
  }

  // Related systems: other portfolio projects
  const relatedProjects = projectsData.filter((p) => p.id !== project.id);

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
      animate={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
      exit={shouldReduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: -12, scale: 0.99 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="py-12 md:py-20 border-b border-[#292720]"
      aria-labelledby="case-study-title"
    >
      <Container size="wide">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#AAA398] hover:text-[#D49A46] transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46] rounded-xs px-1 py-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO SELECTED SYSTEMS</span>
          </Link>
        </div>

        {/* =========================================================================
            01 / OVERVIEW
            ========================================================================= */}
        <header className="pb-12 border-b border-[#292720]">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D49A46] px-2.5 py-1 rounded-xs bg-[#171612] border border-[#292720]">
              SYS_{project.number}
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#AAA398]">
              {project.category}
            </span>
            {project.status && (
              <Badge variant="outline" size="sm">
                {project.status}
              </Badge>
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-4xl">
              <h1
                id="case-study-title"
                className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#F2EBDD] tracking-tight leading-[1.1]"
              >
                {project.title}
              </h1>

              <p className="mt-5 text-base sm:text-xl text-[#DCD6CA] font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Header GitHub CTA */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#090907] bg-[#D49A46] hover:bg-[#E5BA70] px-5 py-3 rounded-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Only render live demo if non-null */}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#E5BA70] border border-[#D49A46] hover:bg-[#D49A46]/10 px-4 py-3 rounded-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LIVE DEMO</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Large Editorial Project Visual Feature */}
        <div className="mt-10 mb-12">
          <div className="relative rounded-xs overflow-hidden border border-[#2E2B22] bg-[#0D0C09] p-4 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-t-2 border-t-[#D49A46]/70">
            <div className="max-w-4xl mx-auto">
              <ProjectVisualStack
                projectId={project.id}
                isHovered={false}
                isMobileActive={false}
              />
            </div>
          </div>
        </div>

        {/* Case Study Body */}
        <div className="space-y-16 md:space-y-24 mt-12 md:mt-16">
          {/* =========================================================================
              02 / PROBLEM
              ========================================================================= */}
          <section id="problem" aria-labelledby="section-02-title">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
              <span>02 // PROBLEM</span>
            </div>
            <h2
              id="section-02-title"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-6"
            >
              PROBLEM DEFINITION & CLINICAL / SYSTEM CONTEXT
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 p-6 sm:p-8 rounded-sm bg-[#11100C] border border-[#292720]">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#68645C] mb-3">
                  PRIMARY BOTTLENECK / MOTIVATION
                </h3>
                <p className="text-sm sm:text-base text-[#DCD6CA] leading-relaxed font-light mb-6">
                  {project.caseStudy.problemStatement}
                </p>

                <h3 className="font-mono text-xs uppercase tracking-wider text-[#68645C] mb-3">
                  ENGINEERING CONSTRAINTS
                </h3>
                <p className="text-sm sm:text-base text-[#AAA398] leading-relaxed font-light">
                  {project.caseStudy.problemContext}
                </p>
              </div>

              {/* Factual Resume Core Highlights */}
              <div className="lg:col-span-4 p-6 rounded-sm bg-[#171612] border border-[#292720] flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-[#E5BA70] mb-4 pb-2 border-b border-[#292720]">
                    VERIFIED IMPLEMENTATION
                  </div>
                  <ul className="space-y-3">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#AAA398] leading-relaxed">
                        <CheckCircle className="w-3.5 h-3.5 text-[#D49A46] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[#292720]">
                  <span className="font-mono text-[10px] uppercase text-[#68645C]">
                    SOURCE: RESUME GROUND TRUTH RECORD
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              RESPIRATORY AI SPECIALIZED SECTIONS
              ========================================================================= */}
          {project.id === 'respiratory-ai' && (
            <>
              {/* Input & Preprocessing */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-sm bg-[#14130F] border border-[#292720]">
                  <div className="font-mono text-[10px] uppercase text-[#D49A46] mb-4 tracking-widest">02.1 // INPUT & DATA</div>
                  <h3 className="font-display text-xl font-bold text-[#F2EBDD] mb-4">ACOUSTIC INGESTION</h3>
                  <p className="text-sm text-[#AAA398] leading-relaxed mb-4">
                    Captures lung auscultation recordings from digital sensors. The raw data is a time-series amplitude signal that requires isolation from environmental artifacts.
                  </p>
                  <div className="font-mono text-[10px] text-[#68645C] uppercase">STREAMS: WAV_CH09 / 44.1 KHZ</div>
                </div>
                <div className="p-6 sm:p-8 rounded-sm bg-[#14130F] border border-[#292720]">
                  <div className="font-mono text-[10px] uppercase text-[#D49A46] mb-4 tracking-widest">02.2 // PREPROCESSING</div>
                  <h3 className="font-display text-xl font-bold text-[#F2EBDD] mb-4">SIGNAL NORMALIZATION</h3>
                  <p className="text-sm text-[#AAA398] leading-relaxed mb-4">
                    Applies bandpass filtering (50Hz - 2000Hz) and Short-Time Fourier Transform (STFT) to generate Log-Mel Spectrograms, translating audio into a vision-compatible spatial format.
                  </p>
                  <div className="font-mono text-[10px] text-[#68645C] uppercase">OP: STFT / MEL-FILTERBANK</div>
                </div>
              </section>

              {/* Model & Inference */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-sm bg-[#14130F] border border-[#292720]">
                  <div className="font-mono text-[10px] uppercase text-[#D49A46] mb-4 tracking-widest">02.3 // MODEL BACKBONE</div>
                  <h3 className="font-display text-xl font-bold text-[#F2EBDD] mb-4">EFFICIENTNET-B0 + SSL</h3>
                  <p className="text-sm text-[#AAA398] leading-relaxed mb-4">
                    Utilizes a lightweight CNN backbone for compound scaling. Self-Supervised Learning (SSL) pre-training allows the model to learn acoustic hierarchies from unlabelled respiratory data.
                  </p>
                  <div className="font-mono text-[10px] text-[#68645C] uppercase">PARAMS: 5.3M / COMPOUND SCALING</div>
                </div>
                <div className="p-6 sm:p-8 rounded-sm bg-[#14130F] border border-[#292720]">
                  <div className="font-mono text-[10px] uppercase text-[#D49A46] mb-4 tracking-widest">02.4 // INFERENCE & EVALUATION</div>
                  <h3 className="font-display text-xl font-bold text-[#F2EBDD] mb-4">CLASSIFICATION ENGINE</h3>
                  <p className="text-sm text-[#AAA398] leading-relaxed mb-4">
                    Maps latent embeddings to clinical classes (Normal, Crackles, Wheezes). Accuracy is maintained through cross-entropy loss optimization and rigorous validation cycles.
                  </p>
                  <div className="font-mono text-[10px] text-[#68645C] uppercase">LATENCY: &lt; 200MS / INFERENCE</div>
                </div>
              </section>

              {/* Explainability */}
              <section className="p-6 sm:p-8 rounded-sm bg-[#14130F] border border-[#292720]">
                <div className="font-mono text-[10px] uppercase text-[#D49A46] mb-4 tracking-widest">02.5 // EXPLAINABILITY (XAI)</div>
                <h3 className="font-display text-xl font-bold text-[#F2EBDD] mb-4">GRAD-CAM ATTRIBUTION MAPPING</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <p className="text-sm text-[#AAA398] leading-relaxed">
                    To ensure clinical transparency, the system generates localized heatmaps over the input spectrogram. This reveals exactly which temporal and frequency components (e.g., high-pitched wheeze harmonics) influenced the model's diagnostic screening.
                  </p>
                  <div className="p-4 bg-[#090907] border border-[#292720] rounded-xs font-mono text-[10px] text-[#68645C]">
                    [ LOG: XAI_ACTIVATION_MAP_GEN ]<br/>
                    [ GRADIENT_BACKPROP: COMPLETE ]<br/>
                    [ SALIENCY_OVERLAY: SUCCESSFUL ]
                  </div>
                </div>
              </section>
            </>
          )}

          {/* =========================================================================
              PIZZA PLATFORM SPECIALIZED SECTIONS
              ========================================================================= */}
          {project.id === 'pizza-ordering' && (
            <>
              {/* Auth & RBAC */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-sm bg-[#14130F] border border-[#292720]">
                  <div className="font-mono text-[10px] uppercase text-[#D49A46] mb-4 tracking-widest">02.1 // AUTHENTICATION</div>
                  <h3 className="font-display text-xl font-bold text-[#F2EBDD] mb-4">JWT STATELESS SECURITY</h3>
                  <p className="text-sm text-[#AAA398] leading-relaxed mb-4">
                    Implements secure user sessions using JSON Web Tokens (JWT) and bcrypt password hashing. Stateless verification eliminates server session overhead while protecting API routes.
                  </p>
                  <div className="font-mono text-[10px] text-[#68645C] uppercase">ALGO: HS256 / BCRYPT_GEN</div>
                </div>
                <div className="p-6 sm:p-8 rounded-sm bg-[#14130F] border border-[#292720]">
                  <div className="font-mono text-[10px] uppercase text-[#D49A46] mb-4 tracking-widest">02.2 // RBAC</div>
                  <h3 className="font-display text-xl font-bold text-[#F2EBDD] mb-4">ROLE-BASED PERMISSIONS</h3>
                  <p className="text-sm text-[#AAA398] leading-relaxed mb-4">
                    Differentiates between Customer and Admin personas. Middleware ensures only authenticated admins can mutate menu items, manage inventory, or update order fulfillment stages.
                  </p>
                  <div className="font-mono text-[10px] text-[#68645C] uppercase">MIDDLEWARE: VERIFY_ADMIN / VERIFY_USER</div>
                </div>
              </section>

              {/* Database & Payments */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-sm bg-[#14130F] border border-[#292720]">
                  <div className="font-mono text-[10px] uppercase text-[#D49A46] mb-4 tracking-widest">02.3 // DATABASE</div>
                  <h3 className="font-display text-xl font-bold text-[#F2EBDD] mb-4">MONGODB PERSISTENCE</h3>
                  <p className="text-sm text-[#AAA398] leading-relaxed mb-4">
                    Utilizes a flexible document schema to handle nested pizza configurations (custom toppings, crusts, sizes). Mongoose ODM is used for schema validation and indexing.
                  </p>
                  <div className="font-mono text-[10px] text-[#68645C] uppercase">ENGINE: MONGODB / MONGOOSE ODM</div>
                </div>
                <div className="p-6 sm:p-8 rounded-sm bg-[#14130F] border border-[#292720]">
                  <div className="font-mono text-[10px] uppercase text-[#D49A46] mb-4 tracking-widest">02.4 // PAYMENTS</div>
                  <h3 className="font-display text-xl font-bold text-[#F2EBDD] mb-4">RAZORPAY INTEGRATION</h3>
                  <p className="text-sm text-[#AAA398] leading-relaxed mb-4">
                    Secure financial transactions with server-side HMAC signature verification. Orders are only confirmed after cryptographic proof of payment success is validated.
                  </p>
                  <div className="font-mono text-[10px] text-[#68645C] uppercase">GATEWAY: RAZORPAY / SHA256_HMAC</div>
                </div>
              </section>

              {/* Order Workflow: Deterministic State Transitions */}
              <section className="p-6 sm:p-8 rounded-sm bg-[#14130F] border border-[#292720]">
                <div className="font-mono text-[10px] uppercase text-[#D49A46] mb-4 tracking-widest">02.5 // ORDER WORKFLOW</div>
                <h3 className="font-display text-xl font-bold text-[#F2EBDD] mb-4">DETERMINISTIC STATE MACHINE</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <p className="text-sm text-[#AAA398] leading-relaxed">
                    Orders progress through a strictly defined lifecycle without state drift: Placed → Confirmed → Baking → Out for Delivery → Delivered. Customers track progression while privileged admin roles advance the stages upon verified triggers.
                  </p>
                  <div className="p-4 bg-[#090907] border border-[#292720] rounded-xs space-y-2">
                    <div className="font-mono text-[10px] text-[#D49A46] uppercase tracking-wider pb-1.5 border-b border-[#201F19]">
                      LIFECYCLE STATE TRANSITIONS
                    </div>
                    <div className="grid grid-cols-5 gap-1.5 pt-1">
                      {[
                        { step: '01', name: 'PLACED' },
                        { step: '02', name: 'CONFIRMED' },
                        { step: '03', name: 'BAKING' },
                        { step: '04', name: 'DISPATCH' },
                        { step: '05', name: 'DELIVERED' },
                      ].map((s) => (
                        <div key={s.step} className="p-2 rounded-xs bg-[#14130F] border border-[#24221C] text-center">
                          <span className="block font-mono text-[8px] text-[#68645C]">{s.step}</span>
                          <span className="block font-mono text-[9px] text-[#DCD6CA] font-medium truncate">{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* =========================================================================
              03 / SYSTEM ARCHITECTURE
              ========================================================================= */}
          <section id="architecture" aria-labelledby="section-03-title">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
              <span>03 // SYSTEM ARCHITECTURE</span>
            </div>
            <h2
              id="section-03-title"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-6"
            >
              INTERACTIVE ARCHITECTURE VISUALIZATION
            </h2>

            <p className="text-sm text-[#AAA398] max-w-3xl mb-6 font-light">
              {project.architecture.summary}
            </p>

            {/* Interactive Architecture Diagram Component */}
            <InteractiveArchitectureDiagram
              nodes={project.caseStudy.architectureNodes}
              projectTitle={project.title}
              projectNumber={project.number}
            />
          </section>

          {/* =========================================================================
              04 / TECHNICAL APPROACH
              ========================================================================= */}
          <section id="approach" aria-labelledby="section-04-title">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
              <span>04 // TECHNICAL APPROACH</span>
            </div>
            <h2
              id="section-04-title"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-6"
            >
              TECHNOLOGIES, MODELS, APIS & ENGINEERING COMPONENTS
            </h2>

            <p className="text-sm sm:text-base text-[#DCD6CA] max-w-4xl mb-8 leading-relaxed font-light">
              {project.caseStudy.technicalApproach.overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.caseStudy.technicalApproach.components.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-sm bg-[#11100C] border border-[#292720] hover:border-[#68645C] transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#D49A46]">
                      0{idx + 1} // SUBSYSTEM
                    </span>
                    <Terminal className="w-4 h-4 text-[#68645C]" />
                  </div>

                  <h3 className="font-display text-lg font-bold uppercase text-[#F2EBDD] mb-2">
                    {comp.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#AAA398] leading-relaxed mb-4 font-light">
                    {comp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#292720]/80">
                    {comp.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-[#E5BA70] bg-[#171612] px-2 py-0.5 rounded-xs border border-[#292720]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              05 / ENGINEERING DECISIONS
              ========================================================================= */}
          <section id="decisions" aria-labelledby="section-05-title">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
              <span>05 // ENGINEERING DECISIONS</span>
            </div>
            <h2
              id="section-05-title"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-2"
            >
              DECISION, REASON & TRADEOFF ANALYSIS
            </h2>
            <p className="text-xs font-mono uppercase text-[#68645C] mb-6">
              GROUNDED IN FACTUAL ARCHITECTURAL CONSTRAINTS
            </p>

            <div className="space-y-4">
              {project.caseStudy.engineeringDecisions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-sm bg-[#11100C] border border-[#292720]"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-xs bg-[#171612] border border-[#292720] text-[#D49A46]">
                      DECISION 0{idx + 1}
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-bold uppercase text-[#F2EBDD]">
                      {item.decision}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#292720]">
                    <div className="p-4 rounded-xs bg-[#171612] border border-[#292720]">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#D49A46] mb-1.5 flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3" />
                        <span>ARCHITECTURAL REASON</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#DCD6CA] leading-relaxed font-light">
                        {item.reason}
                      </p>
                    </div>

                    <div className="p-4 rounded-xs bg-[#171612] border border-[#292720]">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#888175] mb-1.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>ENGINEERING TRADEOFF</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#AAA398] leading-relaxed font-light">
                        {item.tradeoff}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              06 / CHALLENGES
              ========================================================================= */}
          <section id="challenges" aria-labelledby="section-06-title">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
              <span>06 // CHALLENGES</span>
            </div>
            <h2
              id="section-06-title"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-2"
            >
              TECHNICAL CHALLENGES & VALIDATION BOUNDARIES
            </h2>
            <p className="text-xs font-mono uppercase text-[#68645C] mb-6">
              SPECIFICATION PLACEHOLDER STRUCTURE (FACTUAL DISCLOSURE RESTRICTIONS)
            </p>

            <div className="p-6 sm:p-8 rounded-sm bg-[#11100C] border border-[#292720] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#292720]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D49A46]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#E5BA70]">
                    {project.caseStudy.challenges.notice}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#68645C] px-2 py-0.5 rounded-xs bg-[#171612] border border-[#292720]">
                  {project.caseStudy.challenges.verifiedStatus}
                </span>
              </div>

              <div className="py-6">
                <p className="text-sm text-[#AAA398] leading-relaxed font-mono">
                  {project.caseStudy.challenges.placeholderNote}
                </p>
              </div>

              <div className="p-4 rounded-xs bg-[#171612] border border-[#292720] flex items-start gap-3">
                <Terminal className="w-4 h-4 text-[#D49A46] shrink-0 mt-0.5" />
                <div className="text-xs text-[#68645C] font-mono leading-relaxed">
                  NOTE: Under strict factual portfolio rules, challenges, telemetry reports, and failure modes are not artificially generated or embellished. Only verified technical milestones from authenticated sources are presented.
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              07 / RESULTS
              ========================================================================= */}
          <section id="results" aria-labelledby="section-07-title">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
              <span>07 // RESULTS</span>
            </div>
            <h2
              id="section-07-title"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-2"
            >
              VERIFIED OUTCOMES
            </h2>
            <p className="text-xs font-mono uppercase text-[#68645C] mb-6">
              NO SYNTHETIC BENCHMARKS, ACCURACY RATES, OR ESTIMATED USER METRICS
            </p>

            <div className="p-6 sm:p-8 rounded-sm bg-[#11100C] border border-[#292720]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {project.caseStudy.results.verifiedOutcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xs bg-[#171612] border border-[#292720] flex items-start gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-[#D49A46] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#F2EBDD] leading-relaxed">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#292720] flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#888175] shrink-0 mt-0.5" />
                <p className="text-xs text-[#888175] font-mono leading-relaxed">
                  {project.caseStudy.results.disclaimer}
                </p>
              </div>
            </div>
          </section>

          {/* =========================================================================
              08 / TECHNOLOGIES
              ========================================================================= */}
          <section id="technologies" aria-labelledby="section-08-title">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
              <span>08 // TECHNOLOGIES</span>
            </div>
            <h2
              id="section-08-title"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-6"
            >
              TECHNOLOGY CHIPS GROUPED BY DOMAIN
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.caseStudy.technologyGroups.map((grp) => (
                <div
                  key={grp.groupName}
                  className="p-6 rounded-sm bg-[#11100C] border border-[#292720]"
                >
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D49A46] mb-4 pb-2 border-b border-[#292720]">
                    <Boxes className="w-3.5 h-3.5" />
                    <span>{grp.groupName}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {grp.items.map((tech) => (
                      <Badge key={tech} variant="default" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              09 / REPOSITORY
              ========================================================================= */}
          <section id="repository" aria-labelledby="section-09-title">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
              <span>09 // REPOSITORY</span>
            </div>
            <h2
              id="section-09-title"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-6"
            >
              SOURCE REPOSITORY & SPECIFICATIONS
            </h2>

            <div className="p-6 sm:p-8 rounded-sm bg-[#11100C] border border-[#292720] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#AAA398] mb-2">
                  <Github className="w-4 h-4 text-[#D49A46]" />
                  <span>GITHUB REPOSITORY</span>
                </div>
                <div className="font-mono text-sm sm:text-base text-[#F2EBDD] font-bold break-all">
                  {project.githubUrl}
                </div>
                <p className="text-xs text-[#888175] mt-2 font-mono">
                  Contains system source files, pipelines, architectures, and implementation documents.
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#090907] bg-[#D49A46] hover:bg-[#E5BA70] px-5 py-3 rounded-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                  aria-label={`Open GitHub repository for ${project.title}`}
                >
                  <Github className="w-4 h-4" />
                  <span>[ OPEN GITHUB REPOSITORY ]</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </section>

          {/* =========================================================================
              10 / RELATED SYSTEMS
              ========================================================================= */}
          <section id="related" aria-labelledby="section-10-title" className="pt-8 border-t border-[#292720]">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
              <span>10 // RELATED SYSTEMS</span>
            </div>
            <h2
              id="section-10-title"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-6"
            >
              EXPLORE OTHER PORTFOLIO ARCHITECTURES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((relProj) => (
                <Link
                  key={relProj.id}
                  to={relProj.caseStudyRoute}
                  className="group p-6 sm:p-8 rounded-sm bg-[#11100C] border border-[#292720] hover:border-[#D49A46] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#D49A46] block"
                  aria-label={`View Case Study: ${relProj.title}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#D49A46] px-2 py-0.5 rounded-xs bg-[#171612] border border-[#292720]">
                      SYS_{relProj.number}
                    </span>
                    <span className="font-mono text-xs text-[#AAA398] group-hover:text-[#F2EBDD] flex items-center gap-1">
                      <span>VIEW SYSTEM</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold uppercase text-[#F2EBDD] group-hover:text-[#FFFDF9] transition-colors mb-2">
                    {relProj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#AAA398] line-clamp-2 leading-relaxed font-light mb-4">
                    {relProj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#292720]/60">
                    {relProj.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] text-[#888175] bg-[#171612] px-2 py-0.5 rounded-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {relProj.technologies.length > 4 && (
                      <span className="font-mono text-[10px] text-[#68645C] px-1 py-0.5">
                        +{relProj.technologies.length - 4} MORE
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </motion.article>
  );
};
