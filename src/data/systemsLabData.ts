/**
 * Factual Systems Lab Architecture Data
 * Grounded strictly in Jhansi Bhukya's verified portfolio record
 * Curated to the two featured systems:
 * 01. Respiratory AI (Acoustic Perception & Clinical Decision Support)
 * 02. SliceMind (Full-Stack Pizza Platform & Transactional Fulfillment Engine)
 */

export interface SystemLayerNode {
  id: string;
  name: string;
  step: string;
  description: string;
  verifiedApplication: {
    respiratory: string;
    pizzaPlatform: string;
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
    subtitle: 'Signal Ingestion & Data Transformation',
    description:
      'Ingests raw physical signals or commercial transaction payloads, filters noise, validates schemas, and structures state before downstream processing.',
    color: '#D49A46',
    nodes: [
      {
        id: 'collection',
        name: 'Collection',
        step: '01',
        description: 'Ingestion of raw physical auscultation waveforms or transactional menu ordering payloads.',
        verifiedApplication: {
          respiratory: 'Raw WAV acoustic recordings gathered via digital stethoscopes and acoustic sensors.',
          pizzaPlatform: 'Client shopping cart mutations and customizable pizza configuration state.',
        },
        technologies: ['Digital Sensors', 'WAV Files', 'JSON Payloads'],
      },
      {
        id: 'cleaning',
        name: 'Cleaning',
        step: '02',
        description: 'Noise attenuation, frequency filtering, and request sanitization.',
        verifiedApplication: {
          respiratory: 'Bandpass filtering (50 Hz - 2000 Hz) isolating breath sounds from cardiac interference.',
          pizzaPlatform: 'Server-side request sanitization, item availability checks, and price validation.',
        },
        technologies: ['NumPy', 'SciPy Bandpass', 'Express Validators'],
      },
      {
        id: 'preprocessing',
        name: 'Preprocessing',
        step: '03',
        description: 'Transformation of 1D waveforms into 2D spectrograms or transactional state payloads.',
        verifiedApplication: {
          respiratory: 'Short-Time Fourier Transform (STFT) converting sound waves into Log-Mel spectrogram matrices.',
          pizzaPlatform: 'Order line item aggregation and tax/discount computational preprocessing.',
        },
        technologies: ['STFT Log-Mel', 'Mel Filterbanks', 'Mongoose Schemas'],
      },
      {
        id: 'validation',
        name: 'Validation',
        step: '04',
        description: 'Verification of tensor dimensions, cryptographic tokens, and schema integrity.',
        verifiedApplication: {
          respiratory: 'Spectrogram dimension shape check and dynamic amplitude range verification.',
          pizzaPlatform: 'HMAC-SHA256 signature verification for payment payloads and JWT validation.',
        },
        technologies: ['Tensor Dimension Assertions', 'HMAC Signatures', 'JWT Token Guards'],
      },
    ],
  },
  {
    id: 'MODEL',
    number: '02',
    title: 'MODEL',
    subtitle: 'Representation, Inference & State Machines',
    description:
      'Extracts hierarchical acoustic representations via deep convolutional networks or executes deterministic business state transitions.',
    color: '#E5BA70',
    nodes: [
      {
        id: 'training',
        name: 'Architecture',
        step: '01',
        description: 'Deep neural backbone pre-training or deterministic fulfillment state machine setup.',
        verifiedApplication: {
          respiratory: 'Self-Supervised Learning (SSL) on acoustic data coupled with EfficientNet-B0 backbone.',
          pizzaPlatform: '5-stage deterministic order fulfillment state machine (Placed → Delivered).',
        },
        technologies: ['TensorFlow', 'EfficientNet-B0', 'Fulfillment State Machine'],
      },
      {
        id: 'evaluation',
        name: 'Evaluation',
        step: '02',
        description: 'Loss monitoring, categorical class convergence, and permission integrity checks.',
        verifiedApplication: {
          respiratory: 'Categorical cross-entropy monitoring and lung sound anomaly discrimination metrics.',
          pizzaPlatform: 'Role-Based Access Control (RBAC) middleware verifying customer vs admin routes.',
        },
        technologies: ['Categorical Cross-Entropy', 'RBAC Middleware', 'Evaluation Scripts'],
      },
      {
        id: 'inference',
        name: 'Execution',
        step: '03',
        description: 'Low-latency forward propagation or atomic order state progression.',
        verifiedApplication: {
          respiratory: 'EfficientNet-B0 forward pass outputting probabilities for adventitious sounds.',
          pizzaPlatform: 'Atomic database transaction updates advancing order status in real time.',
        },
        technologies: ['EfficientNet-B0', 'Softmax Heads', 'Atomic Transactions'],
      },
      {
        id: 'explainability',
        name: 'Attribution',
        step: '04',
        description: 'Explainable AI visual saliency mapping or cryptographic audit verification.',
        verifiedApplication: {
          respiratory: 'Grad-CAM visual overlays on spectrograms pinpointing exact time-frequency anomalies.',
          pizzaPlatform: 'Cryptographic receipt generation and payment verification audit logging.',
        },
        technologies: ['Grad-CAM XAI', 'Saliency Heatmaps', 'Audit Logs'],
      },
    ],
  },
  {
    id: 'SYSTEM',
    number: '03',
    title: 'SYSTEM',
    subtitle: 'Full-Stack Integration, Middleware & Persistence',
    description:
      'Encapsulates neural models and business services within scalable software architectures, RESTful API gateways, and MongoDB persistence.',
    color: '#D49A46',
    nodes: [
      {
        id: 'frontend',
        name: 'Frontend',
        step: '01',
        description: 'Client user interfaces providing interactive workflows and live state management.',
        verifiedApplication: {
          respiratory: 'Interactive web-based clinical screening console rendering spectrograms and XAI heatmaps.',
          pizzaPlatform: 'Responsive React.js e-commerce catalog with live cart Context and checkout.',
        },
        technologies: ['React.js', 'Tailwind CSS', 'React Context API'],
      },
      {
        id: 'api',
        name: 'API Gateway',
        step: '02',
        description: 'Stateless RESTful gateway mediating client requests and model/payment dispatch.',
        verifiedApplication: {
          respiratory: 'REST endpoints receiving audio payloads and returning structured classification reports.',
          pizzaPlatform: 'RESTful API controllers routing authentication, order creation, and payment verification.',
        },
        technologies: ['RESTful APIs', 'Express.js', 'JSON Payloads'],
      },
      {
        id: 'backend',
        name: 'Backend',
        step: '03',
        description: 'Server runtime coordinating authentication, payment webhooks, and background processing.',
        verifiedApplication: {
          respiratory: 'Python backend orchestrating audio signal processing libraries and TensorFlow model runs.',
          pizzaPlatform: 'Node.js & Express server managing JWT authentication, bcrypt hashing, and Razorpay.',
        },
        technologies: ['Node.js', 'Python Runtimes', 'bcrypt', 'Razorpay SDK'],
      },
      {
        id: 'database',
        name: 'Database',
        step: '04',
        description: 'Persistent document store saving session records, transaction logs, and schemas.',
        verifiedApplication: {
          respiratory: 'Record storage indexing screening runs, patient session IDs, and output report logs.',
          pizzaPlatform: 'MongoDB document database persisting orders, users, products, and receipts.',
        },
        technologies: ['MongoDB', 'Mongoose ODM', 'JSON Schemas'],
      },
    ],
  },
  {
    id: 'PRODUCT',
    number: '04',
    title: 'PRODUCT',
    subtitle: 'User Interaction, Decision Support & Commercial Utility',
    description:
      'Translates engineering computations into accessible human-centric software providing real-world utility.',
    color: '#E5BA70',
    nodes: [
      {
        id: 'user',
        name: 'User',
        step: '01',
        description: 'Primary human stakeholder interacting with the deployed application.',
        verifiedApplication: {
          respiratory: 'Clinical healthcare practitioner conducting patient pulmonary screening auscultations.',
          pizzaPlatform: 'Online customer placing custom pizza orders or administrator tracking orders.',
        },
        technologies: ['Physician / Clinician', 'Customer / Admin'],
      },
      {
        id: 'interface',
        name: 'Interface',
        step: '02',
        description: 'Touchpoint for uploading acoustic audio or completing multi-item checkout.',
        verifiedApplication: {
          respiratory: 'Screening intake dashboard with audio playback and waveform visualizer.',
          pizzaPlatform: 'Interactive menu catalog with dynamic topping builder and live order tracker.',
        },
        technologies: ['Screening Dashboard', 'E-Commerce Catalog'],
      },
      {
        id: 'inference-prod',
        name: 'Execution',
        step: '03',
        description: 'Seamless execution without stalling user workflow.',
        verifiedApplication: {
          respiratory: 'Asynchronous model inference processing audio in seconds without blocking clinic UI.',
          pizzaPlatform: 'Real-time payment handshake and automated order fulfillment progression.',
        },
        technologies: ['Async Pipeline', 'Payment Handshake'],
      },
      {
        id: 'result',
        name: 'Result',
        step: '04',
        description: 'Clear, transparent presentation of predictive outcome or fulfillment receipt.',
        verifiedApplication: {
          respiratory: 'Screening classification score accompanied by visual Grad-CAM attribution heatmap.',
          pizzaPlatform: 'Verified payment confirmation receipt and real-time order tracking stage.',
        },
        technologies: ['Classification Score', 'Grad-CAM Heatmap', 'Digital Receipt'],
      },
      {
        id: 'action',
        name: 'Action',
        step: '05',
        description: 'Real-world clinical decision support or delivery execution.',
        verifiedApplication: {
          respiratory: 'Automated clinical report synthesis assisting referral and diagnostic follow-up.',
          pizzaPlatform: 'Kitchen preparation handoff and synchronized delivery fulfillment.',
        },
        technologies: ['Automated Clinical Report', 'Kitchen Fulfillment Machine'],
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
    id: 'slicemind-platform',
    title: 'SliceMind Pizza Platform',
    category: 'FULL-STACK SOFTWARE ENGINEERING / MERN',
    flow: ['Cart UI', 'Auth & RBAC', 'Razorpay HMAC', 'MongoDB & State Machine'],
    description:
      'Full-stack MERN food platform with stateless JWT authentication, cryptographic Razorpay payment verification, and 5-stage order fulfillment.',
    traceSteps: [
      {
        label: 'Cart UI',
        layer: 'DATA',
        nodeRef: 'collection',
        detail:
          'User configures custom pizza toppings and submits shopping cart items through the responsive React client.',
        technicalArtifact: 'Dynamic Cart State & Pricing Context',
      },
      {
        label: 'Auth & RBAC',
        layer: 'SYSTEM',
        nodeRef: 'api',
        detail:
          'Node.js and Express RESTful API gateway authenticates user session with stateless JWT tokens and enforces role-based access.',
        technicalArtifact: 'JWT Authentication & RBAC Middleware',
      },
      {
        label: 'Razorpay HMAC',
        layer: 'DATA',
        nodeRef: 'validation',
        detail:
          'Server-side HMAC-SHA256 signature verification confirms payment transaction authenticity before state advancement.',
        technicalArtifact: 'Cryptographic HMAC-SHA256 Signature Verification',
      },
      {
        label: 'MongoDB & State Machine',
        layer: 'PRODUCT',
        nodeRef: 'action',
        detail:
          'Order data is persisted in MongoDB and advanced across the synchronized 5-stage fulfillment state machine.',
        technicalArtifact: 'Mongoose Schemas & 5-Stage Order State Machine',
      },
    ],
  },
];
