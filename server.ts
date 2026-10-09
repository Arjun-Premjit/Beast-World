import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const SIGNUPS_FILE = path.join(DATA_DIR, 'signups.json');
const CHALLENGE_SUBMISSIONS_FILE = path.join(DATA_DIR, 'challenge_submissions.json');

// Supabase Client Setup (Graceful initialization if credentials provided)
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

if (supabase) {
  console.log('✅ Supabase client successfully configured for challenge_submissions table.');
} else {
  console.log('ℹ️ Supabase environment variables not supplied; using persistent challenge_submissions database file.');
}

export interface CommunitySignup {
  id: string;
  name: string;
  email: string;
  ageRange: string;
  contentType: string;
  message: string;
  createdAt: string;
}

export interface ChallengeSubmission {
  id: string;
  challenge_name: string;
  category: string;
  description: string;
  why_great: string;
  estimated_budget: string;
  submitter_name: string;
  submitter_email?: string;
  status: 'pending_review' | 'shortlisted' | 'archived';
  created_at: string;
}

function readJsonFile<T>(filePath: string, defaultVal: T[]): T[] {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), 'utf-8');
      return defaultVal;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultVal;
  }
}

function writeJsonFile<T>(filePath: string, data: T[]): boolean {
  try {
    const tempFile = `${filePath}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, filePath);
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

// Initial seed signups
const initialSignups: CommunitySignup[] = [
  {
    id: 'sig_seed_001',
    name: 'Marcus Vance',
    email: 'marcus.v@fan.world',
    ageRange: '18-24',
    contentType: 'Extreme Survival',
    message: 'Following Jimmy since 2017. Ready for the next global challenge drop!',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'sig_seed_002',
    name: 'Elena Rostova',
    email: 'elena.r@fan.world',
    ageRange: '25-34',
    contentType: 'Philanthropy & Giving',
    message: 'Inspired by the clean water wells project. Want to contribute to community builds.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'sig_seed_003',
    name: 'Jordan Kai',
    email: 'jordan.k@fan.world',
    ageRange: '18-24',
    contentType: 'High-Stakes Competitions',
    message: 'Huge fan of the tactical strategy challenges and escape rooms.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

// Initial seed challenge submissions
const initialSubmissions: ChallengeSubmission[] = [
  {
    id: 'sub_seed_001',
    challenge_name: 'Survive 48 Hours in an Automated Robot Factory',
    category: 'SURVIVAL',
    description: 'Contestants navigate an active automotive robotics assembly line where robotic arms move containers and unlock daily rations.',
    why_great: 'The visual spectacle of industrial robotics combined with intense suspense creates massive retention and endless creative thumbnail moments.',
    estimated_budget: '$1,000,000+',
    submitter_name: 'Liam Chen',
    submitter_email: 'liam.c@creator.net',
    status: 'shortlisted',
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'sub_seed_002',
    challenge_name: 'Last To Leave The Subterranean Bank Vault',
    category: 'MONEY',
    description: '10 contestants lock themselves inside a real bank vault with $1,000,000 in cash. Every 4 hours, a mysterious temptation box appears.',
    why_great: 'Classic MrBeast endurance psychology where greed, paranoia, and physical discomfort battle for life-changing money.',
    estimated_budget: '$500,000 - $1,000,000',
    submitter_name: 'Sarah Jenkins',
    submitter_email: 'sarah.j@fan.org',
    status: 'pending_review',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];

if (!fs.existsSync(SIGNUPS_FILE)) {
  writeJsonFile(SIGNUPS_FILE, initialSignups);
}

if (!fs.existsSync(CHALLENGE_SUBMISSIONS_FILE)) {
  writeJsonFile(CHALLENGE_SUBMISSIONS_FILE, initialSubmissions);
}

// --- API ROUTES ---

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    server: 'BeastWorld Server',
    supabaseConnected: !!supabase,
    timestamp: new Date().toISOString()
  });
});

// Community Signup - POST /api/community/signup
app.post('/api/community/signup', (req: Request, res: Response): void => {
  try {
    const { name, email, ageRange, contentType, message } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid full name (at least 2 characters).'
      });
      return;
    }

    if (!email || typeof email !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      res.status(400).json({
        success: false,
        message: 'Please enter a valid email format.'
      });
      return;
    }

    if (!ageRange || typeof ageRange !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Please select an age range.'
      });
      return;
    }

    if (!contentType || typeof contentType !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Please select your favorite content category.'
      });
      return;
    }

    // Read current signups
    const signups = readJsonFile<CommunitySignup>(SIGNUPS_FILE, initialSignups);

    // Duplicate check
    const existing = signups.find(s => s.email.toLowerCase() === trimmedEmail);
    if (existing) {
      res.status(409).json({
        success: false,
        message: 'This email is already registered in the Beast Community network.'
      });
      return;
    }

    const newRecord: CommunitySignup = {
      id: `sig_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: trimmedEmail,
      ageRange: ageRange.trim(),
      contentType: contentType.trim(),
      message: (message || '').trim(),
      createdAt: new Date().toISOString(),
    };

    signups.unshift(newRecord);
    writeJsonFile(SIGNUPS_FILE, signups);

    res.status(201).json({
      success: true,
      message: "You're in. Welcome to the Beast Community network!",
      data: {
        id: newRecord.id,
        name: newRecord.name,
        email: newRecord.email,
        createdAt: newRecord.createdAt,
        totalMembers: signups.length,
      }
    });
  } catch (error) {
    console.error('Error handling community signup:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing signup. Please try again shortly.'
    });
  }
});

// Community stats - GET /api/community/stats
app.get('/api/community/stats', (_req: Request, res: Response) => {
  try {
    const signups = readJsonFile<CommunitySignup>(SIGNUPS_FILE, initialSignups);
    
    const recent = signups.slice(0, 6).map(s => {
      const parts = s.name.split(' ');
      const initials = parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : s.name;
      return {
        id: s.id,
        displayName: initials,
        contentType: s.contentType,
        joinedAgo: timeAgo(new Date(s.createdAt)),
      };
    });

    res.json({
      success: true,
      totalSignups: signups.length + 84200,
      recentSignups: recent,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not fetch stats' });
  }
});

// ==========================================
// CHALLENGE SUBMISSIONS FEATURE (SUPABASE & TABLE)
// ==========================================

// Submit a Challenge Idea - POST /api/challenges/submit
app.post(['/api/challenges/submit', '/api/challenges/submit-idea', '/api/challenge-submissions'], async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      challenge_name,
      title, // Fallback parameter name
      description,
      why_great,
      why_it_fits,
      category,
      estimated_budget,
      estimatedScale,
      submitter_name,
      submitterName,
      submitter_email,
      submitterEmail
    } = req.body;

    const finalChallengeName = (challenge_name || title || '').trim();
    const finalDescription = (description || '').trim();
    const finalWhyGreat = (why_great || why_it_fits || '').trim();
    const finalCategory = (category || 'COMPETITION').trim().toUpperCase();
    const finalBudget = (estimated_budget || estimatedScale || '$500K - $1M').trim();
    const finalSubmitterName = (submitter_name || submitterName || 'Community Creator').trim();
    const finalSubmitterEmail = (submitter_email || submitterEmail || '').trim().toLowerCase();

    // 1. Validation
    if (!finalChallengeName || finalChallengeName.length < 3) {
      res.status(400).json({
        success: false,
        message: 'Please provide a challenge title (at least 3 characters).'
      });
      return;
    }

    if (!finalDescription || finalDescription.length < 15) {
      res.status(400).json({
        success: false,
        message: 'Please explain the challenge mechanics (at least 15 characters).'
      });
      return;
    }

    if (!finalWhyGreat || finalWhyGreat.length < 10) {
      res.status(400).json({
        success: false,
        message: 'Please explain why this would be a great MrBeast challenge (at least 10 characters).'
      });
      return;
    }

    if (finalSubmitterEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(finalSubmitterEmail)) {
        res.status(400).json({
          success: false,
          message: 'Please provide a valid email format if providing an email.'
        });
        return;
      }
    }

    const newSubmission: ChallengeSubmission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      challenge_name: finalChallengeName,
      category: finalCategory,
      description: finalDescription,
      why_great: finalWhyGreat,
      estimated_budget: finalBudget,
      submitter_name: finalSubmitterName,
      submitter_email: finalSubmitterEmail || undefined,
      status: 'pending_review',
      created_at: new Date().toISOString(),
    };

    // 2. Persist to Supabase if client is initialized
    let supabaseSaved = false;
    if (supabase) {
      try {
        const { error: sbError } = await supabase
          .from('challenge_submissions')
          .insert([{
            challenge_name: newSubmission.challenge_name,
            category: newSubmission.category,
            description: newSubmission.description,
            why_great: newSubmission.why_great,
            estimated_budget: newSubmission.estimated_budget,
            submitter_name: newSubmission.submitter_name,
            submitter_email: newSubmission.submitter_email,
            status: newSubmission.status,
            created_at: newSubmission.created_at,
          }]);

        if (!sbError) {
          supabaseSaved = true;
          console.log(`✅ Challenge submission saved to Supabase table: ${finalChallengeName}`);
        } else {
          console.warn('Supabase insert warning, persisting to local table:', sbError.message);
        }
      } catch (sbEx) {
        console.warn('Supabase exception, falling back to local table:', sbEx);
      }
    }

    // 3. Persist to resilient local database table (guarantees persistence across restarts)
    const submissions = readJsonFile<ChallengeSubmission>(CHALLENGE_SUBMISSIONS_FILE, initialSubmissions);
    submissions.unshift(newSubmission);
    writeJsonFile(CHALLENGE_SUBMISSIONS_FILE, submissions);

    res.status(201).json({
      success: true,
      message: 'Challenge idea successfully vaulted into the challenge_submissions table!',
      data: {
        id: newSubmission.id,
        challenge_name: newSubmission.challenge_name,
        category: newSubmission.category,
        description: newSubmission.description,
        why_great: newSubmission.why_great,
        estimated_budget: newSubmission.estimated_budget,
        submitter_name: newSubmission.submitter_name,
        created_at: newSubmission.created_at,
        supabase_synced: supabaseSaved,
        totalSubmissions: submissions.length,
      }
    });
  } catch (error: any) {
    console.error('Error recording challenge submission:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record challenge submission. Please try again shortly.'
    });
  }
});

// Get Challenge Submissions - GET /api/challenge-submissions
app.get('/api/challenge-submissions', (_req: Request, res: Response) => {
  try {
    const submissions = readJsonFile<ChallengeSubmission>(CHALLENGE_SUBMISSIONS_FILE, initialSubmissions);
    
    // Return sanitized public list
    const publicList = submissions.slice(0, 10).map(s => ({
      id: s.id,
      challenge_name: s.challenge_name,
      category: s.category,
      why_great: s.why_great,
      estimated_budget: s.estimated_budget,
      submitter_name: s.submitter_name,
      status: s.status,
      time_ago: timeAgo(new Date(s.created_at)),
    }));

    res.json({
      success: true,
      totalSubmissions: submissions.length,
      submissions: publicList,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not fetch challenge submissions' });
  }
});

function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Development and Production server setup
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`⚡ BEAST // WORLD server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
