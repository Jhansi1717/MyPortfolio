import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { COPILOT_SYSTEM_INSTRUCTION } from './src/data/copilotKnowledge';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// In-memory caching
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

let githubCache: CacheEntry<any> | null = null;
let leetcodeCache: CacheEntry<any> | null = null;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

// Verified fallback data in case GitHub API hits rate limits (60 req/hr unauthenticated)
const GITHUB_FALLBACK = {
  status: 'fallback',
  user: {
    login: 'Jhansi1717',
    name: 'Jhansi Bhukya',
    html_url: 'https://github.com/Jhansi1717',
    avatar_url: 'https://avatars.githubusercontent.com/u/193582333?v=4',
    public_repos: 8,
    bio: 'AI/ML Engineer · Full-Stack Systems Developer',
    created_at: '2025-01-03T08:43:43Z',
  },
  repos: [
    {
      id: 1,
      name: 'AI_Powered_Respiratory_Screening',
      full_name: 'Jhansi1717/AI_Powered_Respiratory_Screening',
      html_url: 'https://github.com/Jhansi1717/AI_Powered_Respiratory_Screening',
      description: 'Audio signal processing pipeline & EfficientNet-B0 classifier for acoustic disease screening with Grad-CAM attribution.',
      language: 'JavaScript',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-08-28T07:02:11Z',
    },
    {
      id: 2,
      name: 'Mental_Health_QA_System',
      full_name: 'Jhansi1717/Mental_Health_QA_System',
      html_url: 'https://github.com/Jhansi1717/Mental_Health_QA_System',
      description: 'Transformer-based question answering system with REST APIs, NLP processing, and MongoDB conversational telemetry.',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-04-19T19:04:47Z',
    },
    {
      id: 3,
      name: 'Pizza_ordering_system',
      full_name: 'Jhansi1717/Pizza_ordering_system',
      html_url: 'https://github.com/Jhansi1717/Pizza_ordering_system',
      description: 'Full-stack food ordering platform featuring JWT authentication, role-based access control, and transaction lifecycle management.',
      language: 'JavaScript',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-08-15T12:30:00Z',
    },
    {
      id: 4,
      name: 'Food-Health_App',
      full_name: 'Jhansi1717/Food-Health_App',
      html_url: 'https://github.com/Jhansi1717/Food-Health_App',
      description: 'Nutritional and wellness tracking application with personalized dietary recommendations and wellness metrics.',
      language: 'JavaScript',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-07-20T10:15:00Z',
    },
    {
      id: 5,
      name: 'UPSC-OS',
      full_name: 'Jhansi1717/UPSC-OS',
      html_url: 'https://github.com/Jhansi1717/UPSC-OS',
      description: 'Comprehensive study and curriculum organization system designed for structured academic tracking and resource management.',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-06-11T09:40:00Z',
    },
    {
      id: 6,
      name: 'MiniProject',
      full_name: 'Jhansi1717/MiniProject',
      html_url: 'https://github.com/Jhansi1717/MiniProject',
      description: 'Academic software engineering laboratory project implementing foundational algorithms and modular system workflows.',
      language: 'Python',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-05-04T16:20:00Z',
    },
  ],
  languages: [
    { name: 'JavaScript', share: 40, color: '#F7DF1E' },
    { name: 'TypeScript', share: 35, color: '#3178C6' },
    { name: 'Python', share: 25, color: '#3572A5' },
  ],
  recentActivity: [
    {
      repo: 'Jhansi1717/AI_Powered_Respiratory_Screening',
      type: 'PushEvent',
      date: '2026-08-28T07:02:11Z',
      message: 'Acoustic feature extraction and model inference updates',
    },
    {
      repo: 'Jhansi1717/Mental_Health_QA_System',
      type: 'PushEvent',
      date: '2026-04-19T19:04:47Z',
      message: 'Transformer query pipeline and tokenization optimization',
    },
  ],
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Copilot Status Check
app.get('/api/chat/status', (req, res) => {
  const isConfigured = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    status: isConfigured ? 'ready' : 'key_missing',
    configured: isConfigured,
    model: 'gemini-2.5-flash',
  });
});

// AI Copilot Grounded Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'A non-empty message string is required.' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({
      error: 'Gemini API key is not configured. Please configure GEMINI_API_KEY in Settings > Secrets.',
    });
  }

  try {
    const ai = getGeminiClient();

    // Build contents array strictly matching @google/genai SDK format
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history) {
        if (item && item.text && (item.role === 'user' || item.role === 'model')) {
          contents.push({
            role: item.role,
            parts: [{ text: String(item.text).slice(0, 4000) }],
          });
        }
      }
    }

    // Append latest user message
    contents.push({
      role: 'user',
      parts: [{ text: message.trim().slice(0, 2000) }],
    });

    // Fallback cascade for temporary demand spikes
    const candidateModels = ['gemini-2.5-flash', 'gemini-3.8-flash', 'gemini-3.1-flash-lite'];
    let result: any = null;
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        result = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: COPILOT_SYSTEM_INSTRUCTION,
            temperature: 0.1, // Strict grounding to eliminate hallucination
          },
        });
        if (result && result.text) {
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${model} unavailable or failed:`, err?.message || err);
        // Continue to next candidate model
      }
    }

    if (!result || !result.text) {
      throw lastError || new Error('All model candidates failed to generate a response.');
    }

    const responseText = result.text.trim() || "That information isn't included in Jhansi's portfolio.";

    return res.json({
      text: responseText,
      status: 'success',
    });
  } catch (error: any) {
    console.error('Error executing Gemini generateContent in /api/chat:', error);
    const errorMessage = error?.message || 'An error occurred while generating response.';
    return res.status(500).json({
      error: errorMessage,
      fallbackMessage: "I encountered a communication issue while reaching the AI service. Please try again.",
    });
  }
});

// GitHub Endpoint with Caching & Fallback
app.get('/api/github', async (req, res) => {
  const now = Date.now();

  // Return cached if fresh
  if (githubCache && now - githubCache.timestamp < CACHE_TTL_MS) {
    return res.json({ ...githubCache.data, cached: true });
  }

  try {
    const headers: Record<string, string> = {
      'User-Agent': 'Portfolio-App-JhansiBhukya',
      Accept: 'application/vnd.github.v3+json',
    };

    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch('https://api.github.com/users/Jhansi1717', { headers, signal: AbortSignal.timeout(5000) }),
      fetch('https://api.github.com/users/Jhansi1717/repos?sort=updated&per_page=10', { headers, signal: AbortSignal.timeout(5000) }),
      fetch('https://api.github.com/users/Jhansi1717/events/public?per_page=10', { headers, signal: AbortSignal.timeout(5000) }).catch(() => null),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      console.warn(`GitHub API rate limit or error: user ${userRes.status}, repos ${reposRes.status}`);
      return res.json({ ...GITHUB_FALLBACK, source: 'fallback_rate_limited' });
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();
    let eventsData: any[] = [];
    if (eventsRes && eventsRes.ok) {
      try {
        eventsData = await eventsRes.json();
      } catch {
        eventsData = [];
      }
    }

    // Process repositories
    const repos = Array.isArray(reposData)
      ? reposData.map((r: any) => ({
          id: r.id,
          name: r.name,
          full_name: r.full_name,
          html_url: r.html_url,
          description: r.description || null,
          language: r.language || 'Code',
          stargazers_count: r.stargazers_count || 0,
          forks_count: r.forks_count || 0,
          updated_at: r.updated_at,
          default_branch: r.default_branch,
        }))
      : GITHUB_FALLBACK.repos;

    // Calculate language frequencies
    const langCounts: Record<string, number> = {};
    repos.forEach((r: any) => {
      if (r.language && r.language !== 'Code') {
        langCounts[r.language] = (langCounts[r.language] || 0) + 1;
      }
    });

    const totalCounted = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
    const langColors: Record<string, string> = {
      Python: '#3572A5',
      TypeScript: '#3178C6',
      JavaScript: '#F7DF1E',
      HTML: '#E34C26',
      CSS: '#563D7C',
    };

    const languages = Object.entries(langCounts).map(([name, count]) => ({
      name,
      share: Math.round((count / totalCounted) * 100),
      color: langColors[name] || '#D49A46',
    }));

    // Process recent activity
    const recentActivity = Array.isArray(eventsData)
      ? eventsData.slice(0, 5).map((e: any) => ({
          repo: e.repo?.name || 'Jhansi1717/repository',
          type: e.type || 'Activity',
          date: e.created_at,
          message: e.payload?.commits?.[0]?.message || 'Repository contribution',
        }))
      : GITHUB_FALLBACK.recentActivity;

    const payload = {
      status: 'live',
      user: {
        login: userData.login,
        name: userData.name || 'Jhansi Bhukya',
        html_url: userData.html_url,
        avatar_url: userData.avatar_url,
        public_repos: userData.public_repos,
        bio: userData.bio,
        created_at: userData.created_at,
      },
      repos,
      languages: languages.length > 0 ? languages : GITHUB_FALLBACK.languages,
      recentActivity,
    };

    githubCache = { data: payload, timestamp: now };
    return res.json({ ...payload, cached: false });
  } catch (error) {
    console.error('Error in /api/github:', error);
    return res.json({ ...GITHUB_FALLBACK, source: 'fallback_error' });
  }
});

// LeetCode Endpoint with Caching
app.get('/api/leetcode', async (req, res) => {
  const now = Date.now();

  // Return cached if fresh
  if (leetcodeCache && now - leetcodeCache.timestamp < CACHE_TTL_MS) {
    return res.json({ ...leetcodeCache.data, cached: true });
  }

  try {
    const username = 'Jhansi_gopal';
    const profileUrl = `https://leetcode.com/u/${username}/`;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      signal: AbortSignal.timeout(5000),
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              profile {
                ranking
                reputation
              }
            }
          }
        `,
        variables: { username },
      }),
    });

    if (!response.ok) {
      console.warn(`LeetCode query failed with HTTP status: ${response.status}`);
      return res.json({
        status: 'unavailable',
        username,
        profileUrl,
        liveData: null,
      });
    }

    const result = await response.json();
    const matchedUser = result.data?.matchedUser;

    if (!matchedUser) {
      return res.json({
        status: 'unavailable',
        username,
        profileUrl,
        liveData: null,
      });
    }

    const subCounts = matchedUser.submitStats?.acSubmissionNum || [];
    const allSolved = subCounts.find((s: any) => s.difficulty === 'All')?.count || 0;
    const easySolved = subCounts.find((s: any) => s.difficulty === 'Easy')?.count || 0;
    const mediumSolved = subCounts.find((s: any) => s.difficulty === 'Medium')?.count || 0;
    const hardSolved = subCounts.find((s: any) => s.difficulty === 'Hard')?.count || 0;

    const payload = {
      status: 'success',
      username,
      profileUrl,
      liveData: {
        ranking: matchedUser.profile?.ranking || null,
        solved: {
          all: allSolved,
          easy: easySolved,
          medium: mediumSolved,
          hard: hardSolved,
        },
      },
    };

    leetcodeCache = { data: payload, timestamp: now };
    return res.json({ ...payload, cached: false });
  } catch (error) {
    console.error('Error fetching LeetCode:', error);
    return res.json({
      status: 'unavailable',
      username: 'Jhansi_gopal',
      profileUrl: 'https://leetcode.com/u/Jhansi_gopal/',
      liveData: null,
    });
  }
});

// Vite & Static Asset Handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
