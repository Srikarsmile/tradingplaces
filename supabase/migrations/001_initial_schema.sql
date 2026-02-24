-- Trading Places Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USER PROFILES TABLE
-- ============================================
-- Extended user profile information
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  date_of_birth DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- PRACTICE SESSIONS TABLE
-- ============================================
-- Main table for storing practice sessions
CREATE TABLE IF NOT EXISTS practice_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  selected_scenario_id TEXT NOT NULL,
  notes TEXT,
  learnings TEXT[], -- Array of learning strings
  improvement_tips TEXT[], -- Array of improvement tip strings
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own sessions
CREATE POLICY "Users can view own sessions"
  ON practice_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON practice_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON practice_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions"
  ON practice_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_id ON practice_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_sessions_created_at ON practice_sessions(created_at DESC);

-- ============================================
-- SCENARIO SNAPSHOTS TABLE
-- ============================================
-- Store scenario practice attempts with empathy scores
CREATE TABLE IF NOT EXISTS scenario_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  practice_session_id UUID REFERENCES practice_sessions(id) ON DELETE CASCADE,
  scenario_id TEXT NOT NULL,
  scenario_title TEXT NOT NULL,
  empathy_focus TEXT[], -- Array of focus areas
  customer_score NUMERIC(3, 1) CHECK (customer_score >= 1 AND customer_score <= 5),
  manager_score NUMERIC(3, 1) CHECK (manager_score >= 1 AND manager_score <= 5),
  average_score NUMERIC(3, 1) GENERATED ALWAYS AS ((customer_score + manager_score) / 2) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE scenario_snapshots ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access snapshots from their own sessions
CREATE POLICY "Users can view own scenario snapshots"
  ON scenario_snapshots FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM practice_sessions
      WHERE practice_sessions.id = scenario_snapshots.practice_session_id
      AND practice_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own scenario snapshots"
  ON scenario_snapshots FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM practice_sessions
      WHERE practice_sessions.id = scenario_snapshots.practice_session_id
      AND practice_sessions.user_id = auth.uid()
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_scenario_snapshots_session_id ON scenario_snapshots(practice_session_id);
CREATE INDEX IF NOT EXISTS idx_scenario_snapshots_scenario_id ON scenario_snapshots(scenario_id);

-- ============================================
-- DIALOGUE PRACTICES TABLE
-- ============================================
-- Store dialogue practice sessions with metrics
CREATE TABLE IF NOT EXISTS dialogue_practices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  practice_session_id UUID REFERENCES practice_sessions(id) ON DELETE CASCADE,
  dialogue_id TEXT NOT NULL,
  dialogue_title TEXT NOT NULL,
  connection_score NUMERIC(3, 1) CHECK (connection_score >= 1 AND connection_score <= 5),
  understanding_score NUMERIC(3, 1) CHECK (understanding_score >= 1 AND understanding_score <= 5),
  empathy_signaled_score NUMERIC(3, 1) CHECK (empathy_signaled_score >= 1 AND empathy_signaled_score <= 5),
  clarity_score NUMERIC(3, 1) CHECK (clarity_score >= 1 AND clarity_score <= 5),
  completed_lines INTEGER DEFAULT 0,
  total_lines INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE dialogue_practices ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access dialogue practices from their own sessions
CREATE POLICY "Users can view own dialogue practices"
  ON dialogue_practices FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM practice_sessions
      WHERE practice_sessions.id = dialogue_practices.practice_session_id
      AND practice_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own dialogue practices"
  ON dialogue_practices FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM practice_sessions
      WHERE practice_sessions.id = dialogue_practices.practice_session_id
      AND practice_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own dialogue practices"
  ON dialogue_practices FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM practice_sessions
      WHERE practice_sessions.id = dialogue_practices.practice_session_id
      AND practice_sessions.user_id = auth.uid()
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_dialogue_practices_session_id ON dialogue_practices(practice_session_id);
CREATE INDEX IF NOT EXISTS idx_dialogue_practices_dialogue_id ON dialogue_practices(dialogue_id);

-- ============================================
-- DIALOGUE CHOICES TABLE
-- ============================================
-- Store individual dialogue choices made during practice
CREATE TABLE IF NOT EXISTS dialogue_choices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dialogue_practice_id UUID REFERENCES dialogue_practices(id) ON DELETE CASCADE,
  line_number INTEGER NOT NULL,
  speaker TEXT NOT NULL, -- e.g., "Aisha (customer)"
  prompt TEXT, -- The empathy cue
  selected_option TEXT NOT NULL, -- The option label chosen
  understanding_effect NUMERIC(3, 1) DEFAULT 0,
  empathy_effect NUMERIC(3, 1) DEFAULT 0,
  clarity_effect NUMERIC(3, 1) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE dialogue_choices ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access choices from their own dialogue practices
CREATE POLICY "Users can view own dialogue choices"
  ON dialogue_choices FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM dialogue_practices
      JOIN practice_sessions ON practice_sessions.id = dialogue_practices.practice_session_id
      WHERE dialogue_practices.id = dialogue_choices.dialogue_practice_id
      AND practice_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own dialogue choices"
  ON dialogue_choices FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM dialogue_practices
      JOIN practice_sessions ON practice_sessions.id = dialogue_practices.practice_session_id
      WHERE dialogue_practices.id = dialogue_choices.dialogue_practice_id
      AND practice_sessions.user_id = auth.uid()
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_dialogue_choices_practice_id ON dialogue_choices(dialogue_practice_id);
CREATE INDEX IF NOT EXISTS idx_dialogue_choices_line_number ON dialogue_choices(dialogue_practice_id, line_number);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for practice_sessions
CREATE TRIGGER update_practice_sessions_updated_at
  BEFORE UPDATE ON practice_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for dialogue_practices
CREATE TRIGGER update_dialogue_practices_updated_at
  BEFORE UPDATE ON dialogue_practices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_profiles
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- HELPER VIEWS (Optional but useful)
-- ============================================

-- View for user session summary
CREATE OR REPLACE VIEW user_session_summary AS
SELECT 
  ps.id as session_id,
  ps.user_id,
  ps.selected_scenario_id,
  ps.notes,
  ps.created_at,
  ps.updated_at,
  COUNT(DISTINCT ss.id) as scenario_count,
  COUNT(DISTINCT dp.id) as dialogue_count,
  AVG(dp.connection_score) as avg_connection_score
FROM practice_sessions ps
LEFT JOIN scenario_snapshots ss ON ss.practice_session_id = ps.id
LEFT JOIN dialogue_practices dp ON dp.practice_session_id = ps.id
GROUP BY ps.id, ps.user_id, ps.selected_scenario_id, ps.notes, ps.created_at, ps.updated_at;

-- Grant access to authenticated users
GRANT SELECT ON user_session_summary TO authenticated;
