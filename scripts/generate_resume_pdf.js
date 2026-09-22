import fs from 'fs';
import path from 'path';

// Standard PDF generator that produces a valid PDF 1.4 document
function createResumePdf() {
  const resumeDir = path.resolve('public/resume');
  if (!fs.existsSync(resumeDir)) {
    fs.mkdirSync(resumeDir, { recursive: true });
  }

  // Define text lines
  const lines = [
    { text: 'JHANSI BHUKYA', size: 20, font: 'F2', x: 50, y: 790 },
    { text: 'AI/ML Engineer  |  AI Systems Builder  |  Full-Stack Engineer', size: 11, font: 'F2', x: 50, y: 770 },
    { text: 'Hyderabad, India  |  jhansibhukya17@gmail.com  |  linkedin.com/in/jhansibhukya  |  github.com/Jhansi1717', size: 9, font: 'F1', x: 50, y: 755 },
    
    { text: '----------------------------------------------------------------------------------------------------------------------------------', size: 9, font: 'F1', x: 50, y: 742 },
    { text: 'EDUCATION', size: 12, font: 'F2', x: 50, y: 728 },
    { text: 'Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad', size: 10, font: 'F2', x: 50, y: 712 },
    { text: 'B.E. Computer Science & Engineering (Artificial Intelligence & Machine Learning)  |  CGPA: 9.72 / 10.00', size: 9, font: 'F1', x: 50, y: 698 },
    { text: 'Expected Graduation: May 2027', size: 9, font: 'F1', x: 50, y: 686 },
    
    { text: 'Rudrama Devi Junior College, Hanamkonda', size: 10, font: 'F2', x: 50, y: 670 },
    { text: 'Intermediate (MPC - Mathematics, Physics, Chemistry)  |  Score: 98.8%', size: 9, font: 'F1', x: 50, y: 658 },
    
    { text: '----------------------------------------------------------------------------------------------------------------------------------', size: 9, font: 'F1', x: 50, y: 644 },
    { text: 'WORK EXPERIENCE', size: 12, font: 'F2', x: 50, y: 630 },
    { text: 'Data Science Intern - Aminobots', size: 10, font: 'F2', x: 50, y: 614 },
    { text: '15 July 2026 - 14 January 2027  |  Hyderabad, India', size: 9, font: 'F1', x: 50, y: 602 },
    { text: '- Engineered data science pipelines, automated preprocessing workflows, and applied machine learning models.', size: 9, font: 'F1', x: 50, y: 588 },
    { text: '- Collaborated on model evaluation benchmarks and full-stack system integrations.', size: 9, font: 'F1', x: 50, y: 576 },

    { text: '----------------------------------------------------------------------------------------------------------------------------------', size: 9, font: 'F1', x: 50, y: 562 },
    { text: 'SELECTED PROJECTS', size: 12, font: 'F2', x: 50, y: 548 },
    { text: '1. AI-Powered Respiratory Screening System (EfficientNet-B0 + Self-Supervised Learning)', size: 10, font: 'F2', x: 50, y: 532 },
    { text: '- Built multi-class respiratory acoustic disease classification pipeline on ICBHI database with 89.2% accuracy.', size: 9, font: 'F1', x: 50, y: 520 },
    { text: '- Integrated STFT/MFCC spectrogram processing, Grad-CAM interpretability, and REST API deployment.', size: 9, font: 'F1', x: 50, y: 508 },
    { text: '  GitHub: https://github.com/Jhansi1717/AI_Powered_Respiratory_Screening', size: 8.5, font: 'F1', x: 50, y: 496 },

    { text: '2. Mental Health Question-Answering System (Fine-Tuned RoBERTa + NLP Pipeline)', size: 10, font: 'F2', x: 50, y: 480 },
    { text: '- Developed clinical QA system utilizing transformer architectures for empathic context-grounded response generation.', size: 9, font: 'F1', x: 50, y: 468 },
    { text: '- Engineered semantic retrieval, TF-IDF / vector indexing, and low-latency Node.js REST API gateway.', size: 9, font: 'F1', x: 50, y: 456 },
    { text: '  GitHub: https://github.com/Jhansi1717/Mental_Health_QA_System', size: 8.5, font: 'F1', x: 50, y: 444 },

    { text: '3. Full-Stack Pizza Ordering Platform (MERN Stack + JWT + Cloud State Persistence)', size: 10, font: 'F2', x: 50, y: 428 },
    { text: '- Architected end-to-end e-commerce order workflow with role-based auth, MongoDB transaction schemas, and React UI.', size: 9, font: 'F1', x: 50, y: 416 },
    { text: '  GitHub: https://github.com/Jhansi1717/Pizza_ordering_system', size: 8.5, font: 'F1', x: 50, y: 404 },

    { text: '----------------------------------------------------------------------------------------------------------------------------------', size: 9, font: 'F1', x: 50, y: 390 },
    { text: 'TECHNICAL SKILLS', size: 12, font: 'F2', x: 50, y: 376 },
    { text: 'AI / Machine Learning: Machine Learning, Deep Learning, Computer Vision, NLP, Generative AI, Self-Supervised Learning', size: 9, font: 'F1', x: 50, y: 360 },
    { text: 'Software Engineering: Python, JavaScript, React, Node.js, Express.js, REST APIs', size: 9, font: 'F1', x: 50, y: 348 },
    { text: 'Data & Databases: MongoDB, MySQL, NumPy, Pandas, Scikit-Learn', size: 9, font: 'F1', x: 50, y: 336 },
    { text: 'Core Computer Science: Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, Software Engineering', size: 9, font: 'F1', x: 50, y: 324 },

    { text: '----------------------------------------------------------------------------------------------------------------------------------', size: 9, font: 'F1', x: 50, y: 310 },
    { text: 'CERTIFICATIONS & ACCREDITATIONS', size: 12, font: 'F2', x: 50, y: 296 },
    { text: '- Oracle Certified Associate: Agentic AI Foundations (Credential: 103382087AAI26OFA)', size: 9, font: 'F1', x: 50, y: 280 },
    { text: '- NPTEL: Problem Solving Through Programming in C (Elite 63%, Jul-Oct 2024)', size: 9, font: 'F1', x: 50, y: 268 },
    { text: '- NPTEL: Ethical Hacking (Elite 73%, Jul-Oct 2024)', size: 9, font: 'F1', x: 50, y: 256 },
    { text: '- Microsoft / LinkedIn: Career Essentials in Generative AI', size: 9, font: 'F1', x: 50, y: 244 },
    { text: '- Infosys Springboard: Database Management Systems', size: 9, font: 'F1', x: 50, y: 232 },
    { text: '- GeeksforGeeks: Full Stack Developer Bootcamp', size: 9, font: 'F1', x: 50, y: 220 }
  ];

  // Build PDF stream
  let streamContent = 'BT\n';
  lines.forEach(l => {
    const escaped = l.text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    streamContent += `/${l.font} ${l.size} Tf\n`;
    streamContent += `${l.x} ${l.y} Td\n`;
    streamContent += `(${escaped}) Tj\n`;
    streamContent += `-${l.x} -${l.y} Td\n`;
  });
  streamContent += 'ET\n';

  const streamLength = Buffer.byteLength(streamContent, 'utf8');

  let pdf = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 595 842]
  /Contents 4 0 R
  /Resources <<
    /Font <<
      /F1 <<
        /Type /Font
        /Subtype /Type1
        /BaseFont /Helvetica
      >>
      /F2 <<
        /Type /Font
        /Subtype /Type1
        /BaseFont /Helvetica-Bold
      >>
    >>
  >>
>>
endobj
4 0 obj
<<
  /Length ${streamLength}
>>
stream
${streamContent}endstream
endobj
`;

  // Compute xref
  const parts = pdf.split('\n');
  let currentOffset = 0;
  const offsets = [0];
  const objIndices = [1, 2, 3, 4];
  
  // Calculate offsets for objects 1, 2, 3, 4
  const obj1Pos = pdf.indexOf('1 0 obj');
  const obj2Pos = pdf.indexOf('2 0 obj');
  const obj3Pos = pdf.indexOf('3 0 obj');
  const obj4Pos = pdf.indexOf('4 0 obj');

  const xref = `xref
0 5
0000000000 65535 f 
${obj1Pos.toString().padStart(10, '0')} 00000 n 
${obj2Pos.toString().padStart(10, '0')} 00000 n 
${obj3Pos.toString().padStart(10, '0')} 00000 n 
${obj4Pos.toString().padStart(10, '0')} 00000 n 
trailer
<<
  /Size 5
  /Root 1 0 R
>>
startxref
${pdf.length}
%%EOF`;

  const finalPdf = pdf + xref;

  fs.writeFileSync(path.resolve('public/resume/Jhansi_Bhukya_Resume.pdf'), finalPdf);
  fs.writeFileSync(path.resolve('public/resume.pdf'), finalPdf);
  console.log('Successfully generated public/resume/Jhansi_Bhukya_Resume.pdf and public/resume.pdf');
}

createResumePdf();
