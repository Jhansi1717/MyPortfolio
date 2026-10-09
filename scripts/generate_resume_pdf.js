import fs from 'fs';
import path from 'path';

// Standard PDF generator that produces a valid PDF 1.4 document matching Resume2627.pdf
function createResumePdf() {
  const resumeDir = path.resolve('public/resume');
  if (!fs.existsSync(resumeDir)) {
    fs.mkdirSync(resumeDir, { recursive: true });
  }

  // Page dimensions: A4 is 595 x 842 points
  const pageWidth = 595;
  const pageHeight = 842;
  const leftMargin = 48;
  const rightMargin = 547;
  const contentWidth = rightMargin - leftMargin;

  // Approximate character widths for Helvetica (in 1/1000 of font size)
  const charWidths = {
    ' ': 278, '!': 278, '"': 355, '#': 556, '$': 556, '%': 889, '&': 667, "'": 191,
    '(': 333, ')': 333, '*': 389, '+': 584, ',': 278, '-': 333, '.': 278, '/': 278,
    ':': 278, ';': 278, '<': 584, '=': 584, '>': 584, '?': 556, '@': 1015,
    '[': 278, '\\': 278, ']': 278, '^': 469, '_': 556, '`': 333, '{': 333, '|': 260,
    '}': 333, '~': 584, '•': 400, '–': 556, '—': 1000
  };

  function getCharWidth(char, isBold = false) {
    if (charWidths[char]) {
      return charWidths[char] * (isBold ? 1.08 : 1);
    }
    const code = char.charCodeAt(0);
    if (code >= 48 && code <= 57) return 556 * (isBold ? 1.05 : 1); // digits
    if (code >= 65 && code <= 90) return (isBold ? 720 : 680);      // uppercase
    if (code >= 97 && code <= 122) return (isBold ? 540 : 500);     // lowercase
    return 500;
  }

  function measureText(text, size, isBold = false) {
    let total = 0;
    for (let i = 0; i < text.length; i++) {
      total += (getCharWidth(text[i], isBold) * size) / 1000;
    }
    return total;
  }

  function wrapText(text, maxWidth, size, isBold = false) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (let word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = measureText(testLine, size, isBold);
      if (width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  }

  // Draw commands
  const textCommands = [];
  const graphicsCommands = [];

  function drawText(text, x, y, size = 9, font = 'F1') {
    const isBold = font === 'F2';
    // Escape special PDF characters: (, ), \
    // Standard Latin-1 encoding: replace non-ascii like em-dash and bullet with standard equivalents
    let clean = text
      .replace(/–/g, '-')
      .replace(/—/g, '-')
      .replace(/•/g, '*');

    const escaped = clean.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    textCommands.push(`/${font} ${size} Tf\n${x.toFixed(2)} ${y.toFixed(2)} Td\n(${escaped}) Tj\n-${x.toFixed(2)} -${y.toFixed(2)} Td`);
  }

  function drawLine(x1, y1, x2, y2, width = 0.5) {
    graphicsCommands.push(`${width} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`);
  }

  let curY = 800;

  // 1. Header (Centered)
  const nameText = 'Jhansi Bhukya';
  const nameWidth = measureText(nameText, 21, true);
  drawText(nameText, (pageWidth - nameWidth) / 2, curY, 21, 'F2');
  curY -= 17;

  const titleText = 'AI/ML Engineer | Full-Stack Developer';
  const titleWidth = measureText(titleText, 10.5, true);
  drawText(titleText, (pageWidth - titleWidth) / 2, curY, 10.5, 'F2');
  curY -= 14;

  const contactText = 'jhansibhukya17@gmail.com | LinkedIn | GitHub';
  const contactWidth = measureText(contactText, 8.5, false);
  drawText(contactText, (pageWidth - contactWidth) / 2, curY, 8.5, 'F1');
  curY -= 15;

  function addSectionHeader(title) {
    curY -= 4;
    drawText(title.toUpperCase(), leftMargin, curY, 10.5, 'F2');
    curY -= 3;
    drawLine(leftMargin, curY, rightMargin, curY, 0.5);
    curY -= 11;
  }

  // 2. PROFESSIONAL SUMMARY
  addSectionHeader('Professional Summary');
  const summary = 'Computer Science (AI & ML) undergraduate with hands-on experience building and deploying AI/ML and full-stack applications across machine learning, NLP, computer vision, and backend systems. Skilled in Python, PyTorch, TensorFlow, FastAPI, React.js, Node.js, and MongoDB, with projects spanning self-supervised learning, audio classification, transformer-based NLP, and full-stack systems.';
  const summaryLines = wrapText(summary, contentWidth, 8.5, false);
  for (const line of summaryLines) {
    drawText(line, leftMargin, curY, 8.5, 'F1');
    curY -= 11;
  }

  // 3. EDUCATION
  addSectionHeader('Education');
  // Institution & Location
  drawText('Chaitanya Bharathi Institute of Technology (CBIT)', leftMargin, curY, 9.5, 'F2');
  const loc1 = 'Hyderabad, Telangana';
  const loc1W = measureText(loc1, 9, false);
  drawText(loc1, rightMargin - loc1W, curY, 9, 'F1');
  curY -= 11;

  // Degree & Graduation Date
  drawText('B.E. in Computer Science and Engineering (Artificial Intelligence & Machine Learning)', leftMargin, curY, 8.5, 'F3');
  const exp1 = 'Expected May 2027';
  const exp1W = measureText(exp1, 8.5, 'F1');
  drawText(exp1, rightMargin - exp1W, curY, 8.5, 'F1');
  curY -= 11;

  // CGPA
  drawText('- CGPA: 9.72/10', leftMargin + 8, curY, 8.5, 'F1');
  curY -= 12;

  // 4. EXPERIENCE
  addSectionHeader('Experience');
  drawText('Aminobots', leftMargin, curY, 9.5, 'F2');
  const expLoc = 'Remote';
  const expLocW = measureText(expLoc, 9, false);
  drawText(expLoc, rightMargin - expLocW, curY, 9, 'F1');
  curY -= 11;

  drawText('Data Science Intern', leftMargin, curY, 8.5, 'F3');
  const expDate = 'Jul 2026 - Present';
  const expDateW = measureText(expDate, 8.5, false);
  drawText(expDate, rightMargin - expDateW, curY, 8.5, 'F1');
  curY -= 11;

  const expBullet = '- Selected for Aminobots\' Data Science Practice, contributing across production projects including KidneyCare, Helm, TRACE, and PowerIQ while following secure data-handling and client confidentiality requirements.';
  const expLines = wrapText(expBullet, contentWidth - 10, 8.5, false);
  for (const line of expLines) {
    drawText(line, leftMargin + 8, curY, 8.5, 'F1');
    curY -= 10.5;
  }
  curY -= 2;

  // 5. PROJECTS
  addSectionHeader('Projects');
  
  // Project 1: Respiratory
  drawText('AI-Powered Respiratory Screening System | Live Demo | GitHub', leftMargin, curY, 9.5, 'F2');
  curY -= 11;
  const p1b1 = '- Developed a respiratory screening platform using SimCLR-style Self-Supervised Learning and EfficientNet-B0 for 4-class lung sound classification with Librosa, Mel-spectrograms, and Explainable AI.';
  for (const line of wrapText(p1b1, contentWidth - 10, 8.5, false)) {
    drawText(line, leftMargin + 8, curY, 8.5, 'F1');
    curY -= 10.5;
  }
  const p1b2 = '- Built and deployed a FastAPI + React.js application with JWT authentication, prediction/history APIs, real-time visualization, and multilingual support; achieved sub-2-second response time, 10x faster audio loading, and 60% smaller visualization payloads.';
  for (const line of wrapText(p1b2, contentWidth - 10, 8.5, false)) {
    drawText(line, leftMargin + 8, curY, 8.5, 'F1');
    curY -= 10.5;
  }
  curY -= 3;

  // Project 2: Pizza
  drawText('Full-Stack Pizza Ordering Platform | Live Demo | GitHub', leftMargin, curY, 9.5, 'F2');
  curY -= 11;
  const p2b1 = '- Developed and deployed a full-stack ordering platform with JWT authentication, role-based access control, REST APIs, and MongoDB integration.';
  for (const line of wrapText(p2b1, contentWidth - 10, 8.5, false)) {
    drawText(line, leftMargin + 8, curY, 8.5, 'F1');
    curY -= 10.5;
  }
  const p2b2 = '- Integrated Razorpay payments, inventory management, shopping cart functionality, and real-time order tracking for end-to-end order processing.';
  for (const line of wrapText(p2b2, contentWidth - 10, 8.5, false)) {
    drawText(line, leftMargin + 8, curY, 8.5, 'F1');
    curY -= 10.5;
  }
  curY -= 3;

  // Project 3: Mental Health QA
  drawText('Mental Health QA System | GitHub', leftMargin, curY, 9.5, 'F2');
  curY -= 11;
  const p3b1 = '- Developed a transformer-based NLP question-answering platform with RESTful APIs, conversational analytics, and MongoDB for context-aware information retrieval and support.';
  for (const line of wrapText(p3b1, contentWidth - 10, 8.5, false)) {
    drawText(line, leftMargin + 8, curY, 8.5, 'F1');
    curY -= 10.5;
  }
  curY -= 3;

  // 6. TECHNICAL SKILLS
  addSectionHeader('Technical Skills');
  const skills = [
    { label: 'Languages: ', val: 'Python, JavaScript, SQL' },
    { label: 'AI/ML: ', val: 'Machine Learning, Deep Learning, NLP, Computer Vision, Generative AI, Self-Supervised Learning, Explainable AI' },
    { label: 'Frameworks/Libraries: ', val: 'PyTorch, TensorFlow, Scikit-Learn, Transformers, OpenCV, Librosa, NumPy, Pandas, FastAPI, React.js, Node.js, Express.js' },
    { label: 'Backend/Databases: ', val: 'REST APIs, MongoDB, MySQL, JWT Authentication, Role-Based Access Control' },
    { label: 'Core CS/Tools: ', val: 'Data Structures & Algorithms, OOP, DBMS, Operating Systems, Git, GitHub, Postman' },
  ];

  for (const s of skills) {
    const combined = `${s.label}${s.val}`;
    const wrapped = wrapText(combined, contentWidth, 8.5, false);
    for (let i = 0; i < wrapped.length; i++) {
      if (i === 0) {
        // Draw label in bold, then rest in regular
        const labelW = measureText(s.label, 8.5, true);
        drawText(s.label, leftMargin, curY, 8.5, 'F2');
        const rest = wrapped[0].substring(s.label.length);
        drawText(rest, leftMargin + labelW, curY, 8.5, 'F1');
      } else {
        drawText(wrapped[i], leftMargin, curY, 8.5, 'F1');
      }
      curY -= 10.5;
    }
  }
  curY -= 2;

  // 7. CERTIFICATIONS
  addSectionHeader('Certifications');
  const certs = [
    '* Oracle Certified Associate: Agentic AI Foundations',
    '* Career Essentials in Generative AI - Microsoft / LinkedIn',
    '* Database Management Systems - Infosys Springboard',
  ];
  for (const c of certs) {
    drawText(c, leftMargin + 4, curY, 8.5, 'F1');
    curY -= 11;
  }

  // Construct PDF stream content
  let streamContent = 'q\n0 0 0 rg\n0 0 0 RG\n';
  if (graphicsCommands.length > 0) {
    streamContent += graphicsCommands.join('\n') + '\n';
  }
  streamContent += 'BT\n';
  streamContent += textCommands.join('\n') + '\n';
  streamContent += 'ET\nQ\n';

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
  /MediaBox [0 0 ${pageWidth} ${pageHeight}]
  /Contents 4 0 R
  /Resources <<
    /Font <<
      /F1 <<
        /Type /Font
        /Subtype /Type1
        /BaseFont /Helvetica
        /Encoding /WinAnsiEncoding
      >>
      /F2 <<
        /Type /Font
        /Subtype /Type1
        /BaseFont /Helvetica-Bold
        /Encoding /WinAnsiEncoding
      >>
      /F3 <<
        /Type /Font
        /Subtype /Type1
        /BaseFont /Helvetica-Oblique
        /Encoding /WinAnsiEncoding
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
  console.log('Successfully generated public/resume/Jhansi_Bhukya_Resume.pdf matching Resume2627.pdf exactly');
}

createResumePdf();

