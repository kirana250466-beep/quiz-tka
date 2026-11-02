// API quiz. Berjalan sebagai Cloudflare Pages Function (runtime Workers) dan menyimpan data di D1.
// Semua endpoint ada di bawah /api/*.

import { QUESTIONS, TOTAL, LETTERS, publicQuestions } from "../_lib/questions.js";

const TEACHER_KEY = "ferdi";

/* ---------- util ---------- */

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

class HttpError extends Error {
  constructor(status, code, extra = {}) {
    super(code);
    this.status = status;
    this.code = code;
    this.extra = extra;
  }
}

// Nama bebas: rapikan spasi, buang karakter kontrol, maksimal 40 karakter.
function cleanName(raw) {
  const display = String(raw ?? "")
    .replace(/[\u0000-\u001f\u007f<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
  if (!display) throw new HttpError(400, "name_required");
  return { display, key: display.normalize("NFKC").toLowerCase() };
}

function nameFromHeader(request) {
  let raw = request.headers.get("x-name") || "";
  try {
    raw = decodeURIComponent(raw);
  } catch (_) {}
  return cleanName(raw);
}

/* ---------- database ---------- */

let schemaReady = null;

function ensureSchema(env) {
  if (!env.DB) {
    throw new HttpError(500, "d1_not_bound", {
      message: "Binding D1 dengan nama variabel DB belum dipasang di project Pages.",
    });
  }
  if (!schemaReady) {
    schemaReady = env.DB.batch([
      env.DB.prepare(
        "CREATE TABLE IF NOT EXISTS session (id INTEGER PRIMARY KEY CHECK (id = 1), status TEXT NOT NULL DEFAULT 'off', round INTEGER NOT NULL DEFAULT 0, updated_at INTEGER NOT NULL DEFAULT 0)"
      ),
      env.DB.prepare("INSERT OR IGNORE INTO session (id, status, round, updated_at) VALUES (1, 'off', 0, 0)"),
      env.DB.prepare(
        "CREATE TABLE IF NOT EXISTS students (round INTEGER NOT NULL, name_key TEXT NOT NULL, display TEXT NOT NULL, created_at INTEGER NOT NULL, last_seen INTEGER NOT NULL, PRIMARY KEY (round, name_key))"
      ),
      env.DB.prepare(
        "CREATE TABLE IF NOT EXISTS answers (round INTEGER NOT NULL, name_key TEXT NOT NULL, n INTEGER NOT NULL, choice TEXT NOT NULL, correct INTEGER NOT NULL, answered_at INTEGER NOT NULL, PRIMARY KEY (round, name_key, n))"
      ),
    ]).catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

async function getSession(env) {
  const row = await env.DB.prepare("SELECT status, round FROM session WHERE id = 1").first();
  return { status: row?.status || "off", round: row?.round || 0 };
}

async function registerStudent(env, round, { display, key }) {
  const now = Date.now();
  await env.DB.prepare(
    "INSERT INTO students (round, name_key, display, created_at, last_seen) VALUES (?1, ?2, ?3, ?4, ?4) " +
      "ON CONFLICT (round, name_key) DO UPDATE SET last_seen = excluded.last_seen"
  )
    .bind(round, key, display, now)
    .run();
  const row = await env.DB.prepare("SELECT display FROM students WHERE round = ?1 AND name_key = ?2")
    .bind(round, key)
    .first();
  return row?.display || display;
}

/* ---------- auth guru ---------- */

// Guru = login dengan nama "Ferdi". Jika variabel TEACHER_PIN diisi di Cloudflare,
// guru juga harus memasukkan PIN tersebut.
function requireTeacher(request, env) {
  const { key } = nameFromHeader(request);
  if (key !== TEACHER_KEY) throw new HttpError(403, "teacher_only");
  if (env.TEACHER_PIN && request.headers.get("x-pin") !== String(env.TEACHER_PIN)) {
    throw new HttpError(401, "pin_required");
  }
}

/* ---------- handlers ---------- */

async function login(request, env) {
  const body = await request.json().catch(() => ({}));
  const who = cleanName(body.name);
  const session = await getSession(env);

  if (who.key === TEACHER_KEY) {
    if (env.TEACHER_PIN && String(body.pin ?? "") !== String(env.TEACHER_PIN)) {
      throw new HttpError(401, "pin_required", { needPin: true });
    }
    return json({ role: "teacher", name: "Ferdi", ...session, total: TOTAL });
  }
  return json({ role: "student", name: who.display, ...session, total: TOTAL });
}

async function status(env) {
  return json({ ...(await getSession(env)), total: TOTAL });
}

async function quiz(request, env) {
  const who = nameFromHeader(request);
  if (who.key === TEACHER_KEY) throw new HttpError(403, "student_only");
  const session = await getSession(env);

  if (session.round === 0 || session.status !== "active") {
    return json({ ...session, ready: false, total: TOTAL });
  }

  const display = await registerStudent(env, session.round, who);
  const { results } = await env.DB.prepare(
    "SELECT n, choice, correct FROM answers WHERE round = ?1 AND name_key = ?2 ORDER BY n"
  )
    .bind(session.round, who.key)
    .all();

  const progress = results.map((r) => ({
    n: r.n,
    choice: r.choice,
    correct: !!r.correct,
    correctKey: QUESTIONS[r.n - 1].answer,
  }));

  return json({
    ...session,
    ready: true,
    total: TOTAL,
    name: display,
    questions: publicQuestions(),
    progress,
  });
}

async function answer(request, env) {
  const who = nameFromHeader(request);
  if (who.key === TEACHER_KEY) throw new HttpError(403, "student_only");

  const body = await request.json().catch(() => ({}));
  const n = Number(body.n);
  const choice = String(body.choice || "").toUpperCase();
  if (!Number.isInteger(n) || n < 1 || n > TOTAL || !LETTERS.includes(choice)) {
    throw new HttpError(400, "bad_request");
  }

  const session = await getSession(env);
  if (session.status !== "active") throw new HttpError(409, "not_active", session);
  if (Number(body.round) !== session.round) throw new HttpError(409, "round_changed", session);

  await registerStudent(env, session.round, who);
  const q = QUESTIONS[n - 1];

  const existing = await env.DB.prepare(
    "SELECT choice, correct FROM answers WHERE round = ?1 AND name_key = ?2 AND n = ?3"
  )
    .bind(session.round, who.key, n)
    .first();
  if (existing) {
    return json({ n, choice: existing.choice, correct: !!existing.correct, correctKey: q.answer, repeated: true });
  }

  const countRow = await env.DB.prepare("SELECT COUNT(*) AS c FROM answers WHERE round = ?1 AND name_key = ?2")
    .bind(session.round, who.key)
    .first();
  if (n !== (countRow?.c || 0) + 1) {
    throw new HttpError(400, "out_of_order", { next: (countRow?.c || 0) + 1 });
  }

  const correct = choice === q.answer ? 1 : 0;
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare(
      "INSERT OR IGNORE INTO answers (round, name_key, n, choice, correct, answered_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)"
    ).bind(session.round, who.key, n, choice, correct, now),
    env.DB.prepare("UPDATE students SET last_seen = ?3 WHERE round = ?1 AND name_key = ?2").bind(
      session.round,
      who.key,
      now
    ),
  ]);

  return json({ n, choice, correct: !!correct, correctKey: q.answer });
}

async function teacherQuestions(request, env) {
  requireTeacher(request, env);
  return json({ questions: QUESTIONS, total: TOTAL });
}

async function teacherRoster(request, env) {
  requireTeacher(request, env);
  const session = await getSession(env);
  const { results } = await env.DB.prepare(
    "SELECT s.display AS name, s.last_seen AS lastSeen, " +
      "(SELECT COUNT(*) FROM answers a WHERE a.round = s.round AND a.name_key = s.name_key) AS answered, " +
      "(SELECT COALESCE(SUM(a.correct), 0) FROM answers a WHERE a.round = s.round AND a.name_key = s.name_key) AS correct " +
      "FROM students s WHERE s.round = ?1 ORDER BY s.display COLLATE NOCASE"
  )
    .bind(session.round)
    .all();
  return json({ ...session, total: TOTAL, students: results });
}

async function teacherSession(request, env) {
  requireTeacher(request, env);
  const body = await request.json().catch(() => ({}));
  const cur = await getSession(env);
  const now = Date.now();
  let next;

  switch (body.action) {
    case "start": // mulai baru: ronde baru, semua siswa mulai dari soal 1
      next = { status: "active", round: cur.round + 1 };
      break;
    case "pause":
      if (cur.status !== "active") throw new HttpError(409, "not_active", cur);
      next = { status: "paused", round: cur.round };
      break;
    case "resume": // lanjutkan ronde yang sama tanpa menghapus jawaban
      if (cur.round === 0) throw new HttpError(409, "no_round", cur);
      next = { status: "active", round: cur.round };
      break;
    case "stop":
      next = { status: "off", round: cur.round };
      break;
    default:
      throw new HttpError(400, "bad_action");
  }

  await env.DB.prepare("UPDATE session SET status = ?1, round = ?2, updated_at = ?3 WHERE id = 1")
    .bind(next.status, next.round, now)
    .run();
  return json({ ...next, total: TOTAL });
}

/* ---------- router ---------- */

export async function onRequest({ request, env }) {
  try {
    await ensureSchema(env);
    const path = new URL(request.url).pathname.replace(/\/+$/, "");
    const m = request.method;

    if (path === "/api/login" && m === "POST") return await login(request, env);
    if (path === "/api/status" && m === "GET") return await status(env);
    if (path === "/api/quiz" && m === "GET") return await quiz(request, env);
    if (path === "/api/answer" && m === "POST") return await answer(request, env);
    if (path === "/api/teacher/questions" && m === "GET") return await teacherQuestions(request, env);
    if (path === "/api/teacher/roster" && m === "GET") return await teacherRoster(request, env);
    if (path === "/api/teacher/session" && m === "POST") return await teacherSession(request, env);

    throw new HttpError(404, "not_found");
  } catch (err) {
    if (err instanceof HttpError) return json({ error: err.code, ...err.extra }, err.status);
    console.error(err);
    return json({ error: "server_error", message: String(err?.message || err) }, 500);
  }
}
