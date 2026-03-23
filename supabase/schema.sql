-- CNY Open House Newsletter Subscribers Table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'landing_page',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Only service role can insert/read (server-side only)
CREATE POLICY "Service role full access" ON newsletter_subscribers
  FOR ALL
  USING (auth.role() = 'service_role');

-- Allow anonymous inserts via server action (service role key used server-side)
-- No public read access for privacy

COMMENT ON TABLE newsletter_subscribers IS 'CNY Open House newsletter email subscribers';
COMMENT ON COLUMN newsletter_subscribers.source IS 'Where the subscriber signed up from (e.g., landing_page, footer)';
