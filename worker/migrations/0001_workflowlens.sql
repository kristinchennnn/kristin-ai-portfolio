CREATE TABLE IF NOT EXISTS runs (
  id TEXT PRIMARY KEY,
  ip_hash TEXT NOT NULL,
  date_key TEXT NOT NULL,
  run_token_hash TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('extracting', 'review', 'analyzing', 'completed')),
  extraction_json TEXT,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  UNIQUE (ip_hash, date_key)
);

CREATE INDEX IF NOT EXISTS runs_date_status_idx ON runs(date_key, status);
CREATE INDEX IF NOT EXISTS runs_expiry_idx ON runs(expires_at);

CREATE TABLE IF NOT EXISTS reports (
  slug TEXT PRIMARY KEY,
  report_id TEXT NOT NULL UNIQUE,
  delete_token_hash TEXT NOT NULL,
  report_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS reports_expiry_idx ON reports(expires_at);
