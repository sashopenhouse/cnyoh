-- CNY's Open House — Supabase Schema
-- Run this in your Supabase SQL Editor

-- ─────────────────────────────────────────
-- Contact / Service Inquiries
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business TEXT,
  service TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'landing_page',
  status TEXT DEFAULT 'new',  -- new | contacted | closed
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_inquiries(status);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON contact_inquiries
  FOR ALL
  USING (auth.role() = 'service_role');

COMMENT ON TABLE contact_inquiries IS 'CNY\'s Open House service inquiry submissions from the landing page';
COMMENT ON COLUMN contact_inquiries.status IS 'Workflow status: new | contacted | closed';

-- ─────────────────────────────────────────
-- Newsletter Subscribers (kept for reference)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'landing_page',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'service_role');
