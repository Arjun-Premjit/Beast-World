export interface SignupPayload {
  name: string;
  email: string;
  ageRange: string;
  contentType: string;
  message?: string;
  agreeToUpdates: boolean;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    totalMembers?: number;
  };
}

export interface CommunityStatsResponse {
  success: boolean;
  totalSignups: number;
  recentSignups: Array<{
    id: string;
    displayName: string;
    contentType: string;
    joinedAgo: string;
  }>;
}

export interface ChallengeSubmissionPayload {
  challenge_name: string;
  category: string;
  description: string;
  why_great: string;
  estimated_budget?: string;
  submitter_name?: string;
  submitter_email?: string;
}

export interface ChallengeSubmissionResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    challenge_name: string;
    category: string;
    description: string;
    why_great: string;
    estimated_budget: string;
    submitter_name: string;
    created_at: string;
    supabase_synced: boolean;
    totalSubmissions?: number;
  };
}

export interface ChallengeSubmissionsListResponse {
  success: boolean;
  totalSubmissions: number;
  submissions: Array<{
    id: string;
    challenge_name: string;
    category: string;
    why_great: string;
    estimated_budget: string;
    submitter_name: string;
    status: string;
    time_ago: string;
  }>;
}

export async function submitCommunitySignup(payload: SignupPayload): Promise<SignupResponse> {
  const res = await fetch('/api/community/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Unable to register signup. Please verify inputs.');
  }
  return data;
}

export async function fetchCommunityStats(): Promise<CommunityStatsResponse> {
  const res = await fetch('/api/community/stats');
  if (!res.ok) {
    throw new Error('Could not fetch community roster statistics.');
  }
  return res.json();
}

export async function submitChallengeSubmission(payload: ChallengeSubmissionPayload): Promise<ChallengeSubmissionResponse> {
  const res = await fetch('/api/challenges/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Unable to record challenge submission.');
  }
  return data;
}

export async function fetchChallengeSubmissions(): Promise<ChallengeSubmissionsListResponse> {
  const res = await fetch('/api/challenge-submissions');
  if (!res.ok) {
    throw new Error('Could not fetch recent submissions.');
  }
  return res.json();
}
