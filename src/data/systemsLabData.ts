/**
 * Factual Systems Lab Architecture Data
 * Grounded strictly in Jhansi Bhukya's verified resume record
 */

export interface SystemLayerNode {
  id: string;
  name: string;
  step: string;
  description: string;
  verifiedApplication: {
    respiratory: string;
    mentalHealth: string;
  };
  technologies: string[];
}

export interface SystemLayer {
  id: 'DATA' | 'MODEL' | 'SYSTEM' | 'PRODUCT';
  number: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  nodes: SystemLayerNode[];
}

export interface ProjectTraceStep {
  label: string;
  layer: 'DATA' | 'MODEL' | 'SYSTEM' | 'PRODUCT';
  nodeRef: string;
  detail: string;
  technicalArtifact: string;
}

export interface ConcreteProjectExample {
  id: string;
  title: string;
  category: string;
  flow: string[];
  description: string;
  traceSteps: ProjectTraceStep[];
}

export const systemsLabLayers: SystemLayer[] = [
  {
    id: 'DATA',
    number: '01',
    title: 'DATA',
    subtitle: 'Signal Ingestion & Signal Conditioning',
    description:
      'Ingests raw physical signals or conversational queries, filters noise, transforms waveforms into mathematical matrices, and validates structural integrity before feeding downstream models.',
    color: '#D49A46',
    nodes: [
      {
        id: 'collection',
        name: 'Collection',
        step: '01',
        description: 'Ingestion of raw physical auscultation audio waveforms or digital conversational user prompts.',
        verifiedApplication: {
          respiratory: 'Raw WAV acoustic recordings gathered via digital stethoscopes and acoustic sensors.',
          mentalHealth: 'Natural language text queries submitted through client input fields.',
        },
        technologies: ['Digital Sensors', 'WAV Files', 'Raw Text Streams'],
      },
      {
        id: 'cleaning',
        name: 'Cleaning',
        step: '02',
        description: 'Noise attenuation, frequency filtering, and string sanitization eliminating ambient artifacts.',
        verifiedApplication: {
          respiratory: 'Bandpass filtering (50 Hz - 2000 Hz) to isolate breath sounds and remove cardiac interference.',
          mentalHealth: 'Input sanitization, whitespace normalization, and character encoding safety checks.',
        },
        technologies: ['NumPy', 'SciPy Bandpass', 'Regex Sanitizers'],
      },
      {
        id: 'preprocessing',
        name: 'Preprocessing',
        step: '03',
        description: 'Transformation of 1D time-series into 2D frequency spectra or tokenized text sequences.',
        verifiedApplication: {
          respiratory: 'Short-Time Fourier Transform (STFT) converting sound waves into Log-Mel spectrogram matrices.',
          mentalHealth: 'Transformer tokenization, subword encoding, and vocabulary index mapping.',
        },
        technologies: ['STFT Log-Mel', 'Mel Filterbanks', 'Subword Tokenizers'],
      },
      {
        id: 'validation',
        name: 'Validation',
        step: '04',
        description: 'Verification of tensor dimensions, signal-to-noise thresholds, and schema conformance.',
        verifiedApplication: {
          respiratory: 'Spectrogram dimension shape check and dynamic amplitude range verification.',
          mentalHealth: 'Prompt sequence length validation and token boundary assertions.',
        },
        technologies: ['Tensor Dimension Assertions', 'Schema Validators'],
      },
    ],
  },
  {
    id: 'MODEL',
    number: '02',
    title: 'MODEL',
    subtitle: 'Neural Representation, Inference & Explainability',
    description:
      'Extracts hierarchical acoustic patterns and deep semantic representations using deep convolutional or transformer backbones, followed by visual interpretability attribution.',
    color: '#E5BA70',
    nodes: [
      {
        id: 'training',
        name: 'Training',
        step: '01',
        description: 'Model optimization using Self-Supervised Learning representation pre-training and supervised fine-tuning.',
        verifiedApplication: {
          respiratory: 'Self-Supervised Learning (SSL) on unannotated acoustic data followed by EfficientNet-B0 fine-tuning.',
          mentalHealth: 'Transformer language model training and domain-specific QA dataset alignment.',
        },
        technologies: ['TensorFlow', 'Self-Supervised Learning', 'Transformers'],
      },
      {
        id: 'evaluation',
        name: 'Evaluation',
        step: '02',
        description: 'Validation against cross-entropy loss, class convergence, and multi-turn response coherence.',
        verifiedApplication: {
          respiratory: 'Categorical cross-entropy monitoring and lung sound anomaly discrimination metrics.',
          mentalHealth: 'Validation loss tracking, perplexity checks, and conversational relevance checks.',
        },
        technologies: ['Validation Loss', 'Categorical Cross-Entropy', 'Evaluation Scripts'],
      },
      {
        id: 'inference',
        name: 'Inference',
        step: '03',
        description: 'Low-latency forward propagation computing probabilistic class distributions or attention weights.',
        verifiedApplication: {
          respiratory: 'EfficientNet-B0 forward pass outputting probabilities for normal, crackles, wheezes, or combined.',
          mentalHealth: 'Transformer multi-head attention forward pass generating context-aware semantic embeddings.',
        },
        technologies: ['EfficientNet-B0', 'Softmax Heads', 'Attention Layers'],
      },
      {
        id: 'explainability',
        name: 'Explainability',
        step: '04',
        description: 'Explainable AI (XAI) computing visual gradient attribution and attention saliency heatmaps.',
        verifiedApplication: {
          respiratory: 'Grad-CAM visual overlays on spectrograms pinpointing exact time-frequency wheeze regions.',
          mentalHealth: 'Attention weight inspection displaying token importance for generated answers.',
        },
        technologies: ['Explainable AI (XAI)', 'Grad-CAM', 'Saliency Mapping'],
      },
    ],
  },
  {
    id: 'SYSTEM',
    number: '03',
    title: 'SYSTEM',
    subtitle: 'Full-Stack Integration, Middleware & Persistence',
    description:
      'Encapsulates neural models within scalable software services, orchestrating requests through RESTful API gateways, backend controllers, and persistent document databases.',
    color: '#D49A46',
    nodes: [
      {
        id: 'frontend',
        name: 'Frontend',
        step: '01',
        description: 'Client user interfaces providing interactive workflows, visual attribution inspection, and query input.',
        verifiedApplication: {
          respiratory: 'Interactive web-based clinical screening console rendering spectrograms and XAI heatmaps.',
          mentalHealth: 'Responsive React.js conversational question-answering application.',
        },
        technologies: ['React.js', 'Tailwind CSS', 'Responsive UI'],
      },
      {
        id: 'api',
        name: 'API',
        step: '02',
        description: 'Stateless RESTful gateway mediating client requests, serialization, and model dispatch.',
        verifiedApplication: {
          respiratory: 'REST endpoints receiving audio payloads and returning structured inference and XAI data.',
          mentalHealth: 'RESTful API gateway routing questions to inference workers and returning answers.',
        },
        technologies: ['RESTful APIs', 'Express / Flask', 'JSON Payloads'],
      },
      {
        id: 'backend',
        name: 'Backend',
        step: '03',
        description: 'Server runtime coordinating conversational analytics, authorization, and background jobs.',
        verifiedApplication: {
          respiratory: 'Python backend orchestrating audio signal processing libraries and TensorFlow model runs.',
          mentalHealth: 'Node.js & Python backend running conversational analytics and response filters.',
        },
        technologies: ['Node.js', 'Python Runtimes', 'Conversational Analytics'],
      },
      {
        id: 'database',
        name: 'Database',
        step: '04',
        description: 'Persistent document store saving session records, analytical telemetry, and metadata.',
        verifiedApplication: {
          respiratory: 'Record storage indexing screening runs, patient session IDs, and output report logs.',
          mentalHealth: 'MongoDB document database persisting query histories, sessions, and analytics.',
        },
        technologies: ['MongoDB', 'NoSQL Document Store', 'JSON Schemas'],
      },
    ],
  },
  {
    id: 'PRODUCT',
    number: '04',
    title: 'PRODUCT',
    subtitle: 'User Interaction, Decision Support & Real-World Utility',
    description:
      'Translates raw engineering computations into accessible human-centric tools that provide actionable decision support and clinical utility.',
    color: '#E5BA70',
    nodes: [
      {
        id: 'user',
        name: 'User',
        step: '01',
        description: 'Primary human stakeholder interacting with the deployed intelligent system.',
        verifiedApplication: {
          respiratory: 'Clinical healthcare practitioner conducting patient pulmonary screening auscultations.',
          mentalHealth: 'End user seeking context-aware mental health and wellness information.',
        },
        technologies: ['Physician / Clinician', 'End User / Seeker'],
      },
      {
        id: 'interface',
        name: 'Interface',
        step: '02',
        description: 'Touchpoint for uploading acoustic audio or submitting multi-turn text dialogues.',
        verifiedApplication: {
          respiratory: 'Screening intake dashboard with audio playback and waveform visualizer.',
          mentalHealth: 'Dialogue interface with instant message rendering and session history.',
        },
        technologies: ['Screening Dashboard', 'Conversational View'],
      },
      {
        id: 'inference-prod',
        name: 'Inference',
        step: '03',
        description: 'Seamless background execution without stalling human workflow.',
        verifiedApplication: {
          respiratory: 'Asynchronous model inference processing audio in seconds without blocking clinic UI.',
          mentalHealth: 'Sub-second transformer inference generating empathetic, context-aware answers.',
        },
        technologies: ['Real-Time Inference', 'Async Pipeline'],
      },
      {
        id: 'result',
        name: 'Result',
        step: '04',
        description: 'Clear, transparent presentation of predictive outcome and visual justification.',
        verifiedApplication: {
          respiratory: 'Screening classification score accompanied by visual Grad-CAM attribution heatmap.',
          mentalHealth: 'Verified context-aware guidance with relevant informational sources.',
        },
        technologies: ['Classification Score', 'Grad-CAM Heatmap', 'Answer Text'],
      },
      {
        id: 'action',
        name: 'Action',
        step: '05',
        description: 'Real-world clinical decision support or conversational follow-up execution.',
        verifiedApplication: {
          respiratory: 'Automated clinical report synthesis assisting referral and diagnostic follow-up.',
          mentalHealth: 'Longitudinal dialogue session logged in MongoDB for continuous tracking.',
        },
        technologies: ['Automated Clinical Report', 'Longitudinal Session Record'],
      },
    ],
  },
];

export const concreteProjectExamples: ConcreteProjectExample[] = [
  {
    id: 'respiratory-screening',
    title: 'Respiratory Screening',
    category: 'AI / COMPUTER VISION / AUDIO SIGNAL PROCESSING',
    flow: ['Signal', 'Model', 'XAI', 'Decision Support'],
    description:
      'Translates raw respiratory auscultation signals into verified clinical decision support using EfficientNet-B0 and Explainable AI.',
    traceSteps: [
      {
        label: 'Signal',
        layer: 'DATA',
        nodeRef: 'preprocessing',
        detail:
          'Acoustic lung audio is captured, bandpass-filtered to remove heart sounds, and transformed via STFT into a 2D Log-Mel spectrogram.',
        technicalArtifact: 'Log-Mel Spectrogram Matrix (STFT)',
      },
      {
        label: 'Model',
        layer: 'MODEL',
        nodeRef: 'inference',
        detail:
          'Self-Supervised Learning representations feed an EfficientNet-B0 convolutional neural network to classify respiratory pathologies.',
        technicalArtifact: 'EfficientNet-B0 Deep CNN Classifier',
      },
      {
        label: 'XAI',
        layer: 'MODEL',
        nodeRef: 'explainability',
        detail:
          'Explainable AI (Grad-CAM) generates visual saliency overlays on the spectrogram, highlighting the specific wheeze or crackle frequencies.',
        technicalArtifact: 'Grad-CAM Visual Saliency Attribution',
      },
      {
        label: 'Decision Support',
        layer: 'PRODUCT',
        nodeRef: 'action',
        detail:
          'Synthesizes classification probabilities and visual attribution maps into an automated clinical report for healthcare providers.',
        technicalArtifact: 'Automated Clinical Decision Report',
      },
    ],
  },
  {
    id: 'mental-health-qa',
    title: 'Mental Health QA',
    category: 'NLP / TRANSFORMERS / FULL STACK',
    flow: ['Query', 'Retrieval/Processing', 'Response', 'MongoDB'],
    description:
      'Processes natural language user questions through transformer representations and REST APIs, persisting conversational analytics in MongoDB.',
    traceSteps: [
      {
        label: 'Query',
        layer: 'DATA',
        nodeRef: 'collection',
        detail:
          'User submits natural language question through the responsive React client interface with session identification.',
        technicalArtifact: 'Sanitized Natural Language Prompt',
      },
      {
        label: 'Retrieval/Processing',
        layer: 'MODEL',
        nodeRef: 'inference',
        detail:
          'Transformer attention models encode deep semantic context, and RESTful APIs orchestrate conversational analytics workflows.',
        technicalArtifact: 'Transformer Attention & REST API Middleware',
      },
      {
        label: 'Response',
        layer: 'PRODUCT',
        nodeRef: 'result',
        detail:
          'Context-aware, ranked answer payload is formatted and delivered back to the client interface in real time.',
        technicalArtifact: 'Contextual Conversational Answer Payload',
      },
      {
        label: 'MongoDB',
        layer: 'SYSTEM',
        nodeRef: 'database',
        detail:
          'Interaction logs, query session histories, and conversational analytics are stored in MongoDB document collections.',
        technicalArtifact: 'MongoDB Document Session Record',
      },
    ],
  },
];
