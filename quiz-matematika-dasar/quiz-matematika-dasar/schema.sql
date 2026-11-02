-- Opsional. Tabel ini dibuat otomatis oleh API saat pertama kali dipakai.
-- Jalankan manual hanya jika ingin menyiapkan database lebih dulu:
--   npx wrangler d1 execute quiz-db --remote --file=schema.sql
CREATE TABLE IF NOT EXISTS session (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  status TEXT NOT NULL DEFAULT 'off',
  round INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL DEFAULT 0
);
INSERT OR IGNORE INTO session (id, status, round, updated_at) VALUES (1, 'off', 0, 0);

CREATE TABLE IF NOT EXISTS students (
  round INTEGER NOT NULL,
  name_key TEXT NOT NULL,
  display TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  last_seen INTEGER NOT NULL,
  PRIMARY KEY (round, name_key)
);

CREATE TABLE IF NOT EXISTS answers (
  round INTEGER NOT NULL,
  name_key TEXT NOT NULL,
  n INTEGER NOT NULL,
  choice TEXT NOT NULL,
  correct INTEGER NOT NULL,
  answered_at INTEGER NOT NULL,
  PRIMARY KEY (round, name_key, n)
);
