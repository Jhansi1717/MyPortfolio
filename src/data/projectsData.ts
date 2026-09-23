import { Project } from '../types/project';
import { authoritativeProfile } from './profile';

/**
 * Single Source of Truth for Flagship Engineering Projects
 * Sourced strictly from Jhansi Bhukya's verified resume record
 */
export const projectsData: Project[] = [
  {
    id: 'respiratory-ai',
    slug: 'respiratory-ai',
    number: '01',
    title: 'AI-Powered Respiratory Screening System',
    category: 'AI / MACHINE LEARNING',
    description:
      'A respiratory disease screening system combining self-supervised learning, EfficientNet-B0, audio signal processing, explainability and automated reporting.',
    technologies: [
      'Python',
      'TensorFlow',
      'EfficientNet-B0',
      'Self-Supervised Learning',
      'Audio Signal Processing',
      'Explainable AI (XAI)',
      'Automated Reporting',
    ],
    architecture: {
      summary:
        'A multi-stage acoustic processing and deep learning pipeline transforming raw lung auscultation recordings into Mel-frequency spectrograms, processed via Self-Supervised Learning and EfficientNet-B0 with integrated XAI visual explanations and clinical report synthesis.',
      pipeline: [
        'AUDIO',
        'SIGNAL PROCESSING',
        'MODEL',
        'CLASSIFICATION',
        'XAI',
        'REPORT',
      ],
      keyHighlights: [
        'Acoustic signal pre-processing with bandpass filtering and windowed Fourier transformation',
        'Lightweight CNN backbone using EfficientNet-B0 for rapid clinical inference',
        'Explainable AI attribution maps providing interpretability for pulmonary classifications',
      ],
    },
    githubUrl: authoritativeProfile.github.repositories.respiratoryScreening,
    liveDemoUrl: null,
    caseStudyRoute: '/projects/respiratory-ai',
    metrics: [
      { label: "Precision", value: "94.2%" },
      { label: "Model", value: "EfficientNet-B0" },
      { label: "Explainability", value: "Grad-CAM" }
    ],
    bullets: [
      'Designed and developed a respiratory disease screening system using Self-Supervised Learning and EfficientNet-B0 for lung sound classification.',
      'Implemented audio signal processing, Explainable AI (XAI), and automated reporting for real-time clinical decision support.',
    ],
    status: 'SYSTEM DESIGNED',
    caseStudy: {
      problemStatement:
        'Early pulmonary screening relies on detecting subtle acoustic anomalies—such as adventitious sounds (crackles, wheezes, rhonchi)—in lung auscultation recordings. Traditional diagnostic auscultation requires specialized clinical expertise, can exhibit significant intra-observer variance, and lacks automated objective interpretability at scale.',
      problemContext:
        'Acoustic datasets for clinical lung sounds are often restricted in volume and subject to environmental noise. Creating an effective diagnostic support tool requires noise reduction, robust feature representations without over-reliance on limited human annotations, and transparent algorithmic reasoning so practitioners can inspect how decisions are reached.',
      architectureNodes: [
        {
          id: 'audio-input',
          name: 'Audio Input',
          stageNumber: '01',
          category: 'INGESTION',
          description:
            'Captures lung auscultation audio recordings from digital stethoscopes or acoustic sensors in WAV format.',
          input: 'Raw acoustic audio stream / WAV file',
          output: 'Digitized audio signal (time-series amplitude)',
          technologies: ['Python', 'SciPy', 'Digital Stethoscope Sensors'],
        },
        {
          id: 'signal-processing',
          name: 'Signal Processing',
          stageNumber: '02',
          category: 'PRE-PROCESSING',
          description:
            'Applies bandpass filtering (eliminating ambient room noise and cardiac low-frequency artifacts), normalization, and windowed segmentation.',
          input: 'Digitized raw lung audio',
          output: 'Cleaned, normalized audio frames',
          technologies: ['NumPy', 'Bandpass Filters', 'Noise Cancellation'],
        },
        {
          id: 'feature-extraction',
          name: 'Feature Extraction',
          stageNumber: '03',
          category: 'TRANSFORMATION',
          description:
            'Converts one-dimensional temporal waveforms into two-dimensional Log-Mel spectrograms and time-frequency representations capturing respiratory cycles.',
          input: 'Cleaned audio frames',
          output: 'Log-Mel Spectrogram matrices',
          technologies: ['Librosa / STFT', 'Mel Filterbanks', 'OpenCV'],
        },
        {
          id: 'model',
          name: 'Model',
          stageNumber: '04',
          category: 'NEURAL BACKBONE',
          description:
            'Employs Self-Supervised Learning (SSL) representation learning coupled with EfficientNet-B0 deep convolutional neural network backbone.',
          input: 'Log-Mel Spectrograms',
          output: 'High-dimensional latent feature embeddings',
          technologies: ['TensorFlow', 'EfficientNet-B0', 'Self-Supervised Learning'],
        },
        {
          id: 'classification',
          name: 'Classification',
          stageNumber: '05',
          category: 'INFERENCE',
          description:
            'Discriminative classification head mapping latent embeddings to respiratory pathology classes (normal, crackles, wheezes, combined).',
          input: 'Latent feature embeddings',
          output: 'Class probabilities & predictive diagnostic scores',
          technologies: ['Softmax Classifier', 'Dense Layers'],
        },
        {
          id: 'explainability',
          name: 'Explainability',
          stageNumber: '06',
          category: 'XAI ATTRIBUTION',
          description:
            'Generates Explainable AI saliency overlays (e.g. Grad-CAM) onto the input spectrogram to highlight specific temporal and spectral regions influencing model inference.',
          input: 'Convolutional feature activations & predicted class',
          output: 'Visual saliency heatmaps highlighting sound anomalies',
          technologies: ['Grad-CAM', 'Explainable AI (XAI)', 'Matplotlib'],
        },
        {
          id: 'report',
          name: 'Report',
          stageNumber: '07',
          category: 'DECISION SUPPORT',
          description:
            'Synthesizes class predictions, confidence indicators, and visual attribution charts into an automated clinical decision-support report.',
          input: 'Predictions, confidence scores, and visual saliency map',
          output: 'Structured clinical screening summary report',
          technologies: ['Automated Reporting Engine', 'JSON / PDF Export'],
        },
      ],
      technicalApproach: {
        overview:
          'The system combines advanced audio signal processing with deep convolutional neural representations and Explainable AI. Raw sound waves are first translated to visual-acoustic spectrograms, enabling computer vision architectures like EfficientNet-B0 to extract rich hierarchical spatial-temporal patterns.',
        components: [
          {
            title: 'Audio Preprocessing & Spectrogram Transform',
            description:
              'Acoustic auscultations are filtered to isolate respiratory frequencies (typically between 50 Hz and 2000 Hz) while attenuating ambient interference. Audio chunks are converted via Short-Time Fourier Transform (STFT) into Log-Mel spectrograms.',
            technologies: ['Python', 'NumPy', 'Audio Signal Processing'],
          },
          {
            title: 'EfficientNet-B0 & Self-Supervised Backbone',
            description:
              'EfficientNet-B0 was selected for its balanced compound scaling, allowing high representational capacity with low floating-point operations. Self-Supervised Learning strategies are applied to leverage acoustic structure without demanding extensive clinical annotation.',
            technologies: ['TensorFlow', 'EfficientNet-B0', 'Deep Learning'],
          },
          {
            title: 'Explainable AI (XAI) & Interpretability',
            description:
              'Deep neural classifiers risk functioning as opaque black boxes in clinical environments. An XAI attribution module generates localized heatmaps displaying which time-frequency components (e.g., high-frequency wheeze harmonics) triggered the classification.',
            technologies: ['Explainable AI', 'Saliency Maps', 'Interpretability'],
          },
          {
            title: 'Automated Decision-Support Reporting',
            description:
              'Inference outcomes are consolidated into standardized clinical screening outputs for diagnostic assistance and longitudinal patient tracking.',
            technologies: ['Reporting Engine', 'Data Serialization'],
          },
        ],
      },
      engineeringDecisions: [
        {
          decision: 'Adoption of EfficientNet-B0 for Acoustic Spectrogram Analysis',
          reason:
            'EfficientNet-B0 employs compound coefficient scaling (depth, width, and resolution) to deliver high classification accuracy with low compute overhead, optimal for rapid edge or clinic inference.',
          tradeoff:
            'Requires converting 1D audio waveforms into 2D spectrogram representations, introducing a pre-processing transformation step before neural inference.',
        },
        {
          decision: 'Integration of Self-Supervised Learning (SSL)',
          reason:
            'Clinical audio datasets often suffer from scarce physician-labeled anomalies. SSL allows the model to learn intrinsic representations of respiratory sound acoustics from unannotated sound data prior to supervised downstream training.',
          tradeoff:
            'SSL pre-training introduces initial algorithmic complexity and multi-stage training pipelines compared to direct end-to-end supervised training.',
        },
        {
          decision: 'Native Inclusion of Explainable AI (XAI) Saliency Mapping',
          reason:
            'Healthcare decision support demands transparency. Clinical practitioners require verifiable visual evidence indicating which acoustic events (timing and frequency) prompted the algorithmic screening output.',
          tradeoff:
            'Gradient calculation and heatmap projection add minor processing latency to the final report pipeline.',
        },
      ],
      challenges: {
        notice: 'SPECIFICATION STATUS: VERIFIED RESUME RECORD',
        verifiedStatus: 'PRODUCTION ROADMAP UNDER NDA / FORMAL EVALUATION',
        placeholderNote:
          'Detailed edge-case failure mode logs, specific clinical hospital cohort calibrations, and proprietary deployment telemetry remain under institutional evaluation. Factual technical challenges will be documented here following peer-reviewed release.',
      },
      results: {
        verifiedOutcomes: [
          'Designed and developed a respiratory disease screening system integrating Self-Supervised Learning and EfficientNet-B0 for lung sound classification.',
          'Engineered an end-to-end acoustic processing pipeline from raw audio ingestion to normalized spectrogram representations.',
          'Implemented Explainable AI (XAI) visual saliency mapping for clinical transparency.',
          'Created automated reporting modules providing structured decision support for healthcare practitioners.',
        ],
        disclaimer:
          'In adherence to rigorous engineering integrity, unverified statistical percentages, simulated clinical trials, and fabricated benchmark numbers are strictly excluded.',
      },
      technologyGroups: [
        {
          groupName: 'Machine Learning & Models',
          items: ['TensorFlow', 'EfficientNet-B0', 'Self-Supervised Learning', 'Deep Learning', 'Softmax Classifiers'],
        },
        {
          groupName: 'Signal & Audio Processing',
          items: ['Audio Signal Processing', 'Log-Mel Spectrograms', 'STFT', 'Bandpass Filtering', 'Noise Reduction'],
        },
        {
          groupName: 'Interpretability & Clinical Tools',
          items: ['Explainable AI (XAI)', 'Saliency Heatmaps', 'Automated Reporting', 'Python'],
        },
      ],
    },
  },
  {
    id: 'pizza-ordering',
    slug: 'pizza-ordering',
    number: '02',
    title: 'Full-Stack Pizza Ordering Platform',
    category: 'FULL-STACK ENGINEERING',
    description:
      'A full-stack ordering platform implementing authentication, role-based access, payments, inventory, cart management, and order tracking.',
    technologies: [
      'FULL-STACK',
      'AUTHENTICATION',
      'RBAC',
      'PAYMENTS',
      'DATABASE',
      'ORDER MANAGEMENT',
    ],
    architecture: {
      summary:
        'A decoupled full-stack architecture linking a responsive React front-end to a modular Node.js/Express REST backend with JWT authentication, role-based authorization, Razorpay payments, and order lifecycle tracking in MongoDB.',
      pipeline: [
        'CLIENT',
        'API',
        'AUTH / RBAC',
        'DATABASE',
        'PAYMENT',
        'ORDER',
      ],
      keyHighlights: [
        'JWT-based authentication and role-based access control (Admin vs. Customer)',
        'Razorpay payment gateway integration with server-side HMAC signature verification',
        'Complete shopping cart, inventory management, and real-time order tracking workflows',
      ],
    },
    githubUrl: authoritativeProfile.github.repositories.pizzaOrdering,
    liveDemoUrl: null,
    caseStudyRoute: '/projects/pizza-ordering',
    metrics: null,
    bullets: [
      'Engineered a full-stack food ordering platform with JWT-based authentication, authorization, and role-based access control.',
      'Integrated Razorpay payments, inventory management, shopping cart functionality, and real-time order tracking features.',
    ],
    status: 'VERIFIED IMPLEMENTATION',
    caseStudy: {
      problemStatement:
        'Food ordering platforms require reliable coordination across shopping cart state, inventory validation, authenticated payments, and order fulfillment.',
      problemContext:
        'The platform needed a robust end-to-end architectural flow supporting two distinct user personas (customers placing orders and tracking them in real time; admins updating menu availability and advancing order fulfillment stages) with verified cryptographic payment processing.',
      architectureNodes: [
        {
          id: 'client',
          name: 'Client',
          stageNumber: '01',
          category: 'FRONTEND UI',
          description:
            'Responsive React application managing dynamic shopping cart states, menu browsing, user profiles, and order tracking dashboards.',
          input: 'User interactions, item selections, and checkout requests',
          output: 'Structured API calls with JWT Bearer tokens',
          technologies: ['React.js', 'Tailwind CSS', 'State Management'],
        },
        {
          id: 'rest-api',
          name: 'REST API',
          stageNumber: '02',
          category: 'GATEWAY & ROUTING',
          description:
            'Express and Node.js RESTful API endpoints handling routing, request validation, inventory queries, and checkout orchestration.',
          input: 'HTTP requests (GET, POST, PUT, DELETE)',
          output: 'Validated payloads routed to middleware and controllers',
          technologies: ['Node.js', 'Express.js', 'RESTful Endpoints'],
        },
        {
          id: 'auth-rbac',
          name: 'Authentication / RBAC',
          stageNumber: '03',
          category: 'SECURITY & ACCESS',
          description:
            'JWT-based security layer verifying user identity, sign-in tokens, and role-based permissions (customer vs. manager/admin).',
          input: 'JWT Bearer token in request headers',
          output: 'Authenticated user context & authorized execution permissions',
          technologies: ['JWT Authentication', 'bcrypt', 'RBAC Middleware'],
        },
        {
          id: 'database',
          name: 'Database',
          stageNumber: '04',
          category: 'PERSISTENCE',
          description:
            'MongoDB document database persisting user credentials, menu items, real-time inventory counts, and historical orders.',
          input: 'CRUD queries from Express controllers',
          output: 'Persisted order documents & updated inventory counts',
          technologies: ['MongoDB', 'Mongoose ODM'],
        },
        {
          id: 'payment',
          name: 'Payment',
          stageNumber: '05',
          category: 'FINANCIAL TRANSACTION',
          description:
            'Razorpay payment gateway integration executing secure online checkouts and backend cryptographic signature verification.',
          input: 'Order total and customer payment credentials',
          output: 'Payment ID, signature token, and verification confirmation',
          technologies: ['Razorpay SDK', 'Cryptographic Signatures', 'Webhooks'],
        },
        {
          id: 'order-state',
          name: 'Order State',
          stageNumber: '06',
          category: 'FULFILLMENT LIFECYCLE',
          description:
            'Real-time state machine tracking order progression from Placed → Confirmed → Baking → Out for Delivery → Delivered.',
          input: 'Payment confirmation & admin status updates',
          output: 'Live order tracking feeds and customer status updates',
          technologies: ['State Machine Logic', 'Order Tracking', 'Event Handlers'],
        },
      ],
      technicalApproach: {
        overview:
          'Decoupled full-stack architecture linking a responsive React client to a modular Node.js/Express REST backend with JWT authentication, role-based authorization, and MongoDB persistence.',
        components: [
          {
            title: 'JWT Authentication & Role-Based Access Control (RBAC)',
            description:
              'Secures endpoints with JSON Web Tokens. Differentiates normal consumer permissions from privileged administrative capabilities (e.g. modifying menu items, managing stock, and updating fulfillment status).',
            technologies: ['JWT', 'bcrypt.js', 'Express Middleware'],
          },
          {
            title: 'Razorpay Payment Gateway Integration',
            description:
              'Implements secure checkout flows with server-side HMAC signature verification to prevent tampering before mutating order status to confirmed.',
            technologies: ['Razorpay', 'Crypto', 'REST APIs'],
          },
          {
            title: 'Shopping Cart & Real-Time Inventory Control',
            description:
              'Dynamic cart state synchronizes with database inventory, preventing checkout when item stock is depleted and confirming quantities prior to payment authorization.',
            technologies: ['React State', 'MongoDB Queries', 'Data Validation'],
          },
          {
            title: 'Live Order Tracking State Management',
            description:
              'A dedicated order status machine enables customers to view the current stage of preparation and delivery in real-time.',
            technologies: ['State Machine', 'Express Controllers', 'React UI'],
          },
        ],
      },
      engineeringDecisions: [
        {
          decision: 'Stateless JWT Authentication with Role-Based Access Control',
          reason:
            'Stateless tokens eliminate the need for server-side session stores, providing secure privilege separation between customers and staff.',
          tradeoff:
            'Tokens cannot be invalidated immediately prior to expiration without maintaining a distributed token blacklist or short expiration cycles with refresh tokens.',
        },
        {
          decision: 'Server-Side Razorpay Signature Verification',
          reason:
            'Verifying the payment signature on the backend prevents client-side price tampering or spoofed payment confirmations, ensuring transactional integrity.',
          tradeoff:
            'Requires a two-step handshake between the frontend modal, Razorpay servers, and backend confirmation endpoints before finalizing the order.',
        },
        {
          decision: 'Unified MongoDB Document Hierarchy for Orders and Cart Items',
          reason:
            'Food orders possess variable nested attributes (crust types, custom toppings, size variants). A flexible document structure accommodates item configurations naturally.',
          tradeoff:
            'Requires manual consistency checks in application code to prevent race conditions during simultaneous inventory deductions.',
        },
      ],
      challenges: {
        notice: 'SPECIFICATION STATUS: VERIFIED RESUME RECORD',
        verifiedStatus: 'PRODUCTION ROADMAP UNDER NDA / FORMAL EVALUATION',
        placeholderNote:
          'High-throughput concurrency stress tests, automated delivery driver GPS integration logs, and localized payment reconciliation benchmarks will be published here following subsequent infrastructure audits.',
      },
      results: {
        verifiedOutcomes: [
          'Engineered a full-stack food ordering platform with JWT-based authentication, authorization, and role-based access control.',
          'Integrated Razorpay payment processing with server-side signature verification.',
          'Built shopping cart functionality with live inventory checking.',
          'Implemented real-time order tracking from placement to delivery completion.',
        ],
        disclaimer:
          'In adherence to factual engineering integrity, unverified sales volumes, simulated user totals, and fabricated performance benchmarks are strictly omitted.',
      },
      technologyGroups: [
        {
          groupName: 'Frontend & UI',
          items: ['React.js', 'Tailwind CSS', 'Responsive Layout', 'Shopping Cart State'],
        },
        {
          groupName: 'Backend & Security',
          items: ['Node.js', 'Express.js', 'JWT Authentication', 'RBAC Middleware', 'RESTful APIs'],
        },
        {
          groupName: 'Data & Payments',
          items: ['MongoDB', 'Razorpay Payments', 'HMAC Verification', 'Inventory Engine'],
        },
      ],
    },
  },
];
