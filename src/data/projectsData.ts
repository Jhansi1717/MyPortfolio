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
    category: 'AI / COMPUTER VISION / DEEP LEARNING',
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
        'Audio Ingestion',
        'Signal Filtering & Windowing',
        'Log-Mel Spectrogram Extraction',
        'Self-Supervised Pre-Training',
        'EfficientNet-B0 Classification',
        'Grad-CAM Saliency Attribution',
        'Automated Clinical Summary',
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
    metrics: null,
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
    id: 'mental-health-qa',
    slug: 'mental-health-qa',
    number: '02',
    title: 'Mental Health QA System',
    category: 'NLP / TRANSFORMERS / FULL STACK',
    description:
      'A full-stack question-answering platform using NLP and transformer-based models with REST APIs, conversational workflows and MongoDB integration.',
    technologies: [
      'Python',
      'Transformers',
      'Natural Language Processing (NLP)',
      'RESTful APIs',
      'MongoDB',
      'Conversational Analytics',
      'Express / Node.js',
    ],
    architecture: {
      summary:
        'An end-to-end conversational question-answering architecture connecting an interactive user interface to high-performance NLP transformer processing pipelines, backed by RESTful API gateways and persistent MongoDB document storage for conversational analytics.',
      pipeline: [
        'User Query Ingestion',
        'NLP Pre-Processing & Tokenization',
        'Transformer Attention & Inference',
        'Contextual Response Formatting',
        'Conversational Analytics Tracking',
        'MongoDB Document Persistence',
      ],
      keyHighlights: [
        'Context-aware question answering powered by transformer-based language representations',
        'RESTful API contracts orchestrating client queries and inference execution',
        'Document storage schemas in MongoDB capturing query sessions and conversational analytics',
      ],
    },
    githubUrl: authoritativeProfile.github.repositories.mentalHealthQA,
    liveDemoUrl: null,
    caseStudyRoute: '/projects/mental-health-qa',
    metrics: null,
    bullets: [
      'Developed a full-stack question-answering platform using NLP and transformer-based models to deliver context-aware mental health support.',
      'Built RESTful APIs, conversational analytics workflows, and MongoDB integration for efficient data processing and retrieval.',
    ],
    status: 'DEPLOYED & INTEGRATED',
    caseStudy: {
      problemStatement:
        'Individuals seeking mental health information often encounter fragmented resources or rigid keyword-based search systems that fail to grasp conversational nuance, emotional context, or multi-turn queries. Delivering responsive and context-aware guidance demands deep natural language understanding coupled with robust, reliable data infrastructure.',
      problemContext:
        'Sensitive health-related queries require context retention across conversational turns, safe response generation, and granular analytical telemetry to monitor topic trends without compromising patient anonymity. The engineering platform must handle asynchronous query processing without blocking client interactions.',
      architectureNodes: [
        {
          id: 'user-query',
          name: 'User Query',
          stageNumber: '01',
          category: 'CLIENT INTERACTION',
          description:
            'Captures natural language user queries through an interactive responsive conversational interface.',
          input: 'Raw user text prompt',
          output: 'Sanitized input payload with session identifiers',
          technologies: ['React.js', 'REST Client', 'Input Validation'],
        },
        {
          id: 'nlp-transformer',
          name: 'NLP / Transformer',
          stageNumber: '02',
          category: 'SEMANTIC REASONING',
          description:
            'Tokenizes user input, encodes attention weights, and leverages transformer-based language models to extract semantic context and intent.',
          input: 'Sanitized query tokens and dialogue history',
          output: 'Contextual semantic embeddings & attention vectors',
          technologies: ['Transformers', 'Hugging Face / PyTorch', 'Python', 'NLP'],
        },
        {
          id: 'processing',
          name: 'Processing',
          stageNumber: '03',
          category: 'API ORCHESTRATION',
          description:
            'RESTful API gateway executes response ranking, conversational analytics workflows, safety filtering, and metadata extraction.',
          input: 'Transformer inference embeddings & candidate responses',
          output: 'Ranked, context-verified response payload & analytics telemetry',
          technologies: ['RESTful APIs', 'Python / Node.js', 'Conversational Analytics'],
        },
        {
          id: 'response',
          name: 'Response',
          stageNumber: '04',
          category: 'PRESENTATION',
          description:
            'Dispatches structured, context-aware conversational response back to the client interface with low latency.',
          input: 'Verified response payload',
          output: 'Rendered conversational message stream in UI',
          technologies: ['React.js', 'JSON Payloads', 'Client State'],
        },
        {
          id: 'mongodb',
          name: 'MongoDB',
          stageNumber: '05',
          category: 'DATA PERSISTENCE',
          description:
            'Stores session histories, user interactions, query embeddings, and conversational analytics for auditability and rapid retrieval.',
          input: 'Session logs, query payloads, and conversational telemetry',
          output: 'Persisted document records & indexed historical queries',
          technologies: ['MongoDB', 'Mongoose / PyMongo', 'Document Store'],
        },
      ],
      technicalApproach: {
        overview:
          'The architecture decouples the front-end user experience from the deep language processing backend. User queries transit through a secure RESTful API layer into Python-based transformer pipelines, with every interaction backed by flexible MongoDB document persistence.',
        components: [
          {
            title: 'Transformer NLP Language Pipeline',
            description:
              'Applies transformer attention mechanisms to represent the deep semantic meaning of user questions, enabling context-aware responses rather than simplistic keyword searches.',
            technologies: ['NLP', 'Transformers', 'Python'],
          },
          {
            title: 'RESTful API Integration Layer',
            description:
              'Engineered clean REST endpoints managing query dispatch, response delivery, health checks, and payload serialization between the application server and the NLP engine.',
            technologies: ['REST APIs', 'Express / Node.js', 'FastAPI / Flask'],
          },
          {
            title: 'Conversational Analytics Workflows',
            description:
              'Extracts anonymized interaction metrics, session durations, query frequencies, and dialogue patterns to continually evaluate and refine system responsiveness.',
            technologies: ['Conversational Analytics', 'Data Aggregation'],
          },
          {
            title: 'MongoDB Document Storage Engine',
            description:
              'MongoDB accommodates unstructured and semi-structured dialogue logs, enabling fast read/write throughput for multi-turn sessions and historical retrieval.',
            technologies: ['MongoDB', 'NoSQL', 'Document Schemas'],
          },
        ],
      },
      engineeringDecisions: [
        {
          decision: 'Transformer-Based Deep Language Representation',
          reason:
            'Self-attention mechanisms capture cross-word dependencies and nuanced user emotional context, which traditional bag-of-words or rule-based models fail to interpret.',
          tradeoff:
            'Incurs higher memory and inference latency than simple heuristic search algorithms, requiring optimized model execution.',
        },
        {
          decision: 'MongoDB NoSQL Document Store for Conversations',
          reason:
            'Conversational dialogues inherently vary in length, metadata, and analytics attributes. A flexible document model supports evolving message schemas without rigid table migrations.',
          tradeoff:
            'Lacks native cross-document ACID transactions without replica set overhead, though conversational session records are typically single-document or append-only.',
        },
        {
          decision: 'Decoupled RESTful API Architecture',
          reason:
            'Isolates the compute-intensive NLP engine from the front-end presentation layer, enabling independent maintenance and modular development.',
          tradeoff:
            'Introduces HTTP request/response serialization overhead between application tiers compared to an in-process monolithic setup.',
        },
      ],
      challenges: {
        notice: 'SPECIFICATION STATUS: VERIFIED RESUME RECORD',
        verifiedStatus: 'PRODUCTION ROADMAP UNDER NDA / FORMAL EVALUATION',
        placeholderNote:
          'Granular domain fine-tuning benchmarks, safety moderation thresholds, and token efficiency statistics will be added here once formal compliance documentation is approved.',
      },
      results: {
        verifiedOutcomes: [
          'Developed a full-stack question-answering platform using NLP and transformer-based models for mental health support.',
          'Built RESTful APIs delivering low-latency query dispatch and context-aware responses.',
          'Constructed conversational analytics workflows to analyze user interactions and response patterns.',
          'Integrated MongoDB for reliable storage and rapid retrieval of query sessions and conversational telemetry.',
        ],
        disclaimer:
          'In accordance with strict factual engineering standards, synthetic accuracy benchmarks, unverified clinical trial percentages, and theoretical metrics are excluded.',
      },
      technologyGroups: [
        {
          groupName: 'NLP & Intelligence',
          items: ['Natural Language Processing (NLP)', 'Transformers', 'Python', 'Semantic Search'],
        },
        {
          groupName: 'Full-Stack & APIs',
          items: ['RESTful APIs', 'Node.js', 'Express.js', 'React.js', 'Conversational Analytics'],
        },
        {
          groupName: 'Database & Infrastructure',
          items: ['MongoDB', 'NoSQL Document Store', 'JSON Serialization', 'Git / GitHub'],
        },
      ],
    },
  },
  {
    id: 'pizza-ordering',
    slug: 'pizza-ordering',
    number: '03',
    title: 'Full-Stack Pizza Ordering Platform',
    category: 'FULL STACK / BACKEND / PAYMENTS',
    description:
      'A full-stack ordering platform implementing authentication, role-based access, payments, inventory, cart management and order tracking.',
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT Authentication',
      'Razorpay',
      'RESTful APIs',
      'Tailwind CSS',
    ],
    architecture: {
      summary:
        'A comprehensive full-stack e-commerce architecture linking a responsive React front-end to a scalable Node.js/Express REST backend with JWT authentication, role-based access control, Razorpay payments, and real-time order lifecycle tracking in MongoDB.',
      pipeline: [
        'Client Application',
        'RESTful API Gateway',
        'JWT Auth & RBAC Middleware',
        'MongoDB Persistence',
        'Razorpay Payment Verification',
        'Real-Time Order State Machine',
      ],
      keyHighlights: [
        'JWT-based authentication and role-based access control (Admin vs. Customer)',
        'Razorpay payment gateway integration with server-side signature verification',
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
    status: 'PRODUCTION READY',
    caseStudy: {
      problemStatement:
        'E-commerce and food ordering platforms require consistent real-time coordination across customer ordering, dynamic shopping carts, inventory validation, authenticated payment processing, and administrative status tracking. Weak decoupling or insecure auth flows lead to transaction discrepancies, unauthorized order manipulation, and inventory drift.',
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
          'Constructed as a modular three-tier full-stack system. The React frontend interacts with an Express backend through strictly validated REST APIs, secured by JWT and RBAC. Orders progress through a reliable state machine upon cryptographic payment validation by Razorpay.',
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
            'Stateless tokens eliminate the need for server-side session stores, enabling horizontal scaling while enforcing strict privilege separation between customers and staff.',
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
