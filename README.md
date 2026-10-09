# Jhansi Bhukya — Portfolio

AI/ML Engineer building intelligent systems across machine learning, computer vision, and full-stack engineering.

**Profiles:** [LinkedIn](https://www.linkedin.com/in/jhansibhukya/) · [GitHub](https://github.com/Jhansi1717) · [LeetCode](https://leetcode.com/u/Jhansi_gopal/)

## Overview

- **Education:** B.E. Computer Science & Engineering (AI & ML), Chaitanya Bharathi Institute of Technology (CBIT), expected May 2027
- **CGPA:** 9.72 / 10
- **Experience:** Data Science Intern at Aminobots
- **Location:** Hyderabad, India

This repository contains the portfolio website, project case studies, resume link, and the Ask Jhansi portfolio copilot. The portfolio's own web stack is documented separately from the technologies used in the showcased projects.

## Featured projects

### 01 — AI-Powered Respiratory Screening System

A web application for AI-assisted respiratory sound screening using audio preprocessing, spectrogram-based inference, and result visualization. It is a screening/research aid, not a medical diagnostic device.

- **Live application:** https://respiratory-ai-frontend.onrender.com
- **Source code:** https://github.com/Jhansi1717/AI_Powered_Respiratory_Screening
- **API documentation:** https://respiratory-ai-backend.onrender.com/docs
- **Current implementation:** React, FastAPI, PyTorch, timm, EfficientNet-B0, audio-processing libraries, and PostgreSQL in the deployed environment.

The project repository does not currently publish an independent test-set evaluation or clinical validation study. No clinical accuracy claim is made here.

### 02 — Full-Stack Pizza Ordering Platform / SliceMind

A full-stack pizza ordering application with a React/Vite client and FastAPI backend.

- **Live application:** https://pizza-ordering-system-sand.vercel.app
- **Source code:** https://github.com/Jhansi1717/Pizza_ordering_system
- **Technology documented by the project:** React, Vite, Tailwind CSS, FastAPI, and SQLite/PostgreSQL support.
- **Features described in the project repository:** menu and cart flows, mock OTP login, and demo-mode behavior when the backend is unavailable.

For the authoritative implementation details, consult the linked project repository. Do not infer production payment processing or other integrations unless they are present in the current source.

## Portfolio application architecture

### Frontend

- React 19 and TypeScript
- Vite 8
- Tailwind CSS v4
- Motion
- React Router
- Lucide React

### Server

The Express server in `server.ts` serves the built frontend in production and exposes these endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Basic server health check |
| GET | `/api/chat/status` | Reports whether Gemini is configured |
| POST | `/api/chat` | Ask Jhansi chat endpoint |
| GET | `/api/github` | GitHub profile, repositories, and activity data |
| GET | `/api/leetcode` | LeetCode profile statistics, when available |

The chat endpoint uses the Google Gen AI SDK. Without `GEMINI_API_KEY`, live Gemini responses are unavailable; the status endpoint reports this configuration state. GitHub and LeetCode endpoints can return fallback or unavailable states if external services fail.

## Local development

Requirements: a compatible Node.js version and npm.

```bash
npm install
npm run dev
```

The development server defaults to port `3000`. Set `PORT` to override it when needed.

### Validation and production build

```bash
npm run lint
npm run build
npm start
```

- `npm run lint` runs TypeScript validation using `tsc --noEmit`; it does not run ESLint.
- `npm run build` builds the Vite client and bundles the Express server into `dist/server.cjs`.
- `npm start` runs the bundled production server.

## Environment configuration

Set `GEMINI_API_KEY` as a server-side secret to enable live Gemini-powered Ask Jhansi responses.

- In Google AI Studio, configure it through the available Secrets/environment settings for the app.
- On other hosting platforms, add it in the service's environment-variable settings.
- Never commit a real API key or expose it through client-side code.

`PORT` is optional for local use (defaults to `3000`). Deployment platforms commonly provide their own `PORT`; the server uses that value when supplied.

See `.env.example` for placeholder configuration only. Replace placeholders locally; never commit actual secret values.

## Deploying with Google AI Studio / Cloud Run

1. Open this project in Google AI Studio Build mode.
2. Run `npm run lint` and `npm run build`.
3. Configure `GEMINI_API_KEY` as a secret if you want live Gemini chat.
4. Use **Publish** in AI Studio and follow the deployment flow.
5. Open the published URL once deployment completes.
6. Run the smoke checks below.
7. After confirming the permanent public URL, update the canonical URL, Open Graph URLs, JSON-LD URL, social image URLs, and sitemap to match it.

Deployment availability and any required Cloud project or billing setup depend on your Google account and deployment configuration. Follow the current [Google AI Studio deployment guide](https://ai.google.dev/gemini-api/docs/aistudio-deploying).

The app includes an Express server, so deploy it as a full-stack Node application. A static-only deployment would not serve the `/api/*` endpoints without a separate backend.

## Post-deployment smoke checks

Replace `$APP_URL` with the actual deployed origin before running these examples.

```bash
curl -i "$APP_URL/api/health"
curl -i "$APP_URL/api/chat/status"
```

Also verify manually:

- The homepage loads.
- Refreshing `/projects/respiratory-ai` and `/projects/pizza-ordering` works.
- The resume PDF opens.
- Ask Jhansi works when Gemini is configured and handles the missing-key state clearly.
- GitHub and LeetCode panels handle unavailable external API data.
- The contact form is tested on the actual host; form handling may depend on the platform.
- Mobile navigation works.
- The browser console has no blocking errors.

Do not treat a successful build as proof that every live integration works.

## Resume and credentials

- **Resume:** [public/resume/Jhansi_Bhukya_Resume.pdf](public/resume/Jhansi_Bhukya_Resume.pdf)
- Oracle Certified Associate: Agentic AI Foundations
- Career Essentials in Generative AI — Microsoft / LinkedIn
- Database Management Systems — Infosys Springboard
- Other certifications are presented in the portfolio's Certifications section.

## License and attribution

© 2026 Jhansi Bhukya. All rights reserved.
