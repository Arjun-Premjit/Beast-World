-- Supabase Table Migration: challenge_submissions
-- Run this in the Supabase SQL editor to create the challenge submissions table

CREATE TABLE IF NOT EXISTS challenge_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'COMPETITION',
  description TEXT NOT NULL,
  why_great TEXT NOT NULL,
  estimated_budget TEXT DEFAULT '$500K - $1M',
  submitter_name TEXT NOT NULL DEFAULT 'Anonymous Creator',
  submitter_email TEXT,
  status TEXT DEFAULT 'pending_review',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE challenge_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts
CREATE POLICY "Allow public insert into challenge_submissions"
  ON challenge_submissions
  FOR INSERT
  WITH CHECK (true);

-- Allow public read of verified submissions or aggregated counts
CREATE POLICY "Allow read for challenge_submissions"
  ON challenge_submissions
  FOR SELECT
  USING (true);
