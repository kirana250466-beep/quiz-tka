"use strict";

/* ====== state ====== */
const S = {
  role: null, // "student" | "teacher"
  name: "",
  pin: "",
  status: "off",
  round: 0,
  total: 25,
  loaded: false, // data soal siswa sudah dimuat untuk ronde ini
  questions: [],
  progress: [], // [{n, choice, correct, correctKey}]
  idx: 0, // indeks soal yang sedang dikerjakan
  busy: false,
  timer: null,
};
const T = { questions: [], i: 0, tab: "bahas" };

const POLL_MS = 4000;
const $ = (id) => document.getElementById(id);
const VIEWS = ["login", "wait", "quiz", "result", "teacher"];

/* ====== util ====== */
function show(view) {
  VIEWS.forEach((v) => ($("view-" + v).hidden = v !== view));
  window.scrollTo(0, 0);
}

let toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.hidden = true), 3200);
}

async function api(path, { method = "GET", body } = {}) {
  const headers = { "x-name": encodeURIComponent(S.name || "") };
  if (S.pin) headers["x-pin"] = S.pin;
  if (body) headers["content-type"] = "application/json";
  const res = await fetch(path, { method, headers, body: body ? JSON.stringify(body) : undefined, cache: "no-store" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || "error"), { status: res.status, data });
  return data;
}

function el(tag, props = {}, children = []) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") e.className = v;
    else if (k === "text") e.textContent = v;
    else e.setAttribute(k, v);
  }
  [].concat(children).forEach((c) => c && e.append(c));
  return e;
}

function stopPolling() {
  clearInterval(S.timer);
  S.timer = null;
}

/* ====== login / logout ====== */
$("login-form").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const err = $("login-error");
  err.hidden = true;
  const name = $("in-name").value;
  const pin = $("in-pin").value;
  $("btn-login").disabled = true;
  try {
    const r = await api("/api/login", { method: "POST", body: { name, pin } });
    S.role = r.role;
    S.name = r.name;
    S.pin = r.role === "teacher" ? pin : "";
    S.status = r.status;
    S.round = r.round;
    S.total = r.total;
    sessionStorage.setItem("quiz.login", JSON.stringify({ name: S.name, pin: S.pin }));
    enter();
  } catch (e) {
    if (e.data && e.data.needPin) {
      $("pin-row").hidden = false;
      $("in-pin").focus();
      err.textContent = pin ? "PIN salah." : "Masukkan PIN guru.";
    } else if (e.data && e.data.error === "name_required") {
      err.textContent = "Nama belum diisi.";
    } else {
      err.textContent = "Tidak bisa terhubung ke server. Coba lagi.";
    }
    err.hidden = false;
  } finally {
    $("btn-login").disabled = false;
  }
});

function logout() {
  stopPolling();
  sessionStorage.removeItem("quiz.login");
  Object.assign(S, { role: null, name: "", pin: "", loaded: false, questions: [], progress: [], idx: 0, busy: false });
  $("in-name").value = "";
  $("in-pin").value = "";
  $("pin-row").hidden = true;
  show("login");
  $("in-name").focus();
}

document.addEventListener("click", (ev) => {
  if (ev.target.closest('[data-action="logout"]')) logout();
});

function enter() {
  stopPolling();
  if (S.role === "teacher") return enterTeacher();
  S.loaded = false;
  syncStudent();
  S.timer = setInterval(syncStudent, POLL_MS);
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible" || !S.role) return;
  S.role === "student" ? syncStudent() : refreshRoster();
});

/* ====== siswa ====== */
async function syncStudent() {
  if (S.role !== "student" || S.busy) return;
  try {
    const st = await api("/api/status");
    if (st.round !== S.round) {
      S.round = st.round;
      S.loaded = false;
    }
    S.status = st.status;
    S.total = st.total;
    if (st.status === "active" && !S.loaded) await loadQuiz();
    renderStudent();
  } catch (_) {
    /* koneksi putus sebentar: coba lagi di polling berikutnya */
  }
}

async function loadQuiz() {
  const q = await api("/api/quiz");
  if (!q.ready) return;
  S.round = q.round;
  S.name = q.name;
  S.questions = q.questions;
  S.progress = q.progress;
  S.idx = q.progress.length;
  S.loaded = true;
  if (S.idx < S.total) renderQuestion();
}

function renderStudent() {
  if (!S.loaded) {
    const t = {
      off: S.round === 0
        ? ["Belum dimulai", "Sesi belum dimulai. Tunggu guru memulai sesi."]
        : ["Sesi ditutup", "Sesi sedang dimatikan oleh guru. Tunggu guru membukanya lagi."],
      paused: ["Sesi dijeda", "Guru sedang menjeda sesi. Tunggu sebentar."],
      active: ["Memuat soal", "Sebentar ya..."],
    }[S.status];
    $("wait-title").textContent = t[0];
    $("wait-text").textContent = t[1];
    return show("wait");
  }

  if (S.idx >= S.total) return renderResult();

  if ($("view-quiz").hidden) {
    show("quiz");
    renderQuestion();
  }
  const ov = $("overlay");
  if (S.status === "active") {
    ov.hidden = true;
  } else {
    $("overlay-title").textContent = S.status === "paused" ? "Dijeda oleh guru" : "Sesi ditutup oleh guru";
    $("overlay-text").textContent = S.status === "paused"
      ? "Pengerjaan berhenti sebentar. Jawabanmu aman, lanjut otomatis saat guru melanjutkan."
      : "Jawabanmu tersimpan. Kamu bisa lanjut saat guru membuka sesi lagi.";
    ov.hidden = false;
  }
}

function scoreNow() {
  return S.progress.filter((p) => p.correct).length;
}

function renderQuestion() {
  const q = S.questions[S.idx];
  if (!q) return;
  show("quiz");
  $("q-name").textContent = S.name;
  $("q-avatar").textContent = S.name.charAt(0).toUpperCase();
  $("q-score").textContent = "Benar " + scoreNow();
  $("q-count").textContent = "Soal " + q.n + " dari " + S.total;
  $("q-bar").style.width = (S.idx / S.total) * 100 + "%";
  $("q-text").textContent = q.text;

  const img = $("q-img");
  if (q.image) {
    img.src = q.image;
    img.hidden = false;
  } else {
    img.hidden = true;
    img.removeAttribute("src");
  }

  const box = $("q-options");
  box.replaceChildren();
  q.options.forEach((txt, i) => {
    const letter = "ABCDE"[i];
    const b = el("button", { class: "opt", type: "button", "data-letter": letter }, [
      el("span", { class: "letter", text: letter }),
      el("span", { text: txt }),
    ]);
    b.addEventListener("click", () => submit(letter));
    box.append(b);
  });

  $("q-feedback").hidden = true;
  $("q-next").hidden = true;
  $("q-next").textContent = S.idx === S.total - 1 ? "Lihat hasil" : "Lanjut";
  S.busy = false;
}

async function submit(letter) {
  if (S.busy) return;
  S.busy = true;
  const q = S.questions[S.idx];
  const buttons = [...document.querySelectorAll("#q-options .opt")];
  buttons.forEach((b) => (b.disabled = true));

  try {
    const r = await api("/api/answer", { method: "POST", body: { n: q.n, choice: letter, round: S.round } });
    S.progress.push({ n: q.n, choice: r.choice, correct: r.correct, correctKey: r.correctKey });
    buttons.forEach((b) => {
      const l = b.dataset.letter;
      if (l === r.correctKey) b.classList.add("correct");
      else if (l === r.choice) b.classList.add("wrong");
      else b.classList.add("dim");
    });
    const fb = $("q-feedback");
    fb.className = "feedback " + (r.correct ? "ok" : "bad");
    fb.textContent = r.correct ? "Benar! 🎉" : "Belum tepat. Jawaban yang benar: " + r.correctKey;
    fb.hidden = false;
    $("q-score").textContent = "Benar " + scoreNow();
    $("q-bar").style.width = ((S.idx + 1) / S.total) * 100 + "%";
    $("q-next").hidden = false;
    $("q-next").focus();
    S.busy = false;
  } catch (e) {
    S.busy = false;
    const code = e.data && e.data.error;
    if (code === "not_active") {
      S.status = e.data.status;
      buttons.forEach((b) => (b.disabled = false));
      renderStudent();
    } else if (code === "round_changed") {
      toast("Guru memulai sesi baru. Soal dimuat ulang.");
      S.loaded = false;
      S.round = e.data.round;
      S.status = e.data.status;
      syncStudent();
    } else {
      buttons.forEach((b) => (b.disabled = false));
      toast("Jawaban belum terkirim. Coba klik lagi.");
    }
  }
}

$("q-next").addEventListener("click", () => {
  S.idx += 1;
  if (S.idx >= S.total) renderResult();
  else renderQuestion();
});

function renderResult() {
  const correct = scoreNow();
  $("r-name").textContent = S.name;
  $("r-correct").textContent = correct;
  $("r-total").textContent = S.total;
  $("r-percent").textContent = Math.round((correct / S.total) * 100) + "% benar";
  const grid = $("r-grid");
  grid.replaceChildren();
  for (let n = 1; n <= S.total; n++) {
    const p = S.progress.find((x) => x.n === n);
    grid.append(el("span", { class: "cell " + (p ? (p.correct ? "ok" : "bad") : ""), text: String(n) }));
  }
  show("result");
}

/* ====== guru ====== */
async function enterTeacher() {
  show("teacher");
  try {
    const q = await api("/api/teacher/questions");
    T.questions = q.questions;
  } catch (e) {
    if (e.status === 401) {
      toast("PIN guru tidak valid.");
      return logout();
    }
    toast("Gagal memuat soal. Muat ulang halaman.");
    return;
  }
  buildNavGrid();
  renderTeacherQuestion();
  setTab(T.tab);
  await refreshRoster();
  S.timer = setInterval(refreshRoster, POLL_MS);
}

function buildNavGrid() {
  const g = $("t-grid");
  g.replaceChildren();
  T.questions.forEach((q, i) => {
    const b = el("button", { class: "cell", type: "button", "aria-label": "Soal " + q.n, text: String(q.n) });
    b.addEventListener("click", () => {
      T.i = i;
      renderTeacherQuestion();
    });
    g.append(b);
  });
}

function renderTeacherQuestion() {
  const q = T.questions[T.i];
  if (!q) return;
  [...$("t-grid").children].forEach((c, i) => c.classList.toggle("current", i === T.i));
  $("t-qno").textContent = "Soal " + q.n + " dari " + T.questions.length;
  $("t-qtext").textContent = q.text;

  const qi = $("t-qimg");
  qi.hidden = !q.image;
  if (q.image) qi.src = q.image;

  const box = $("t-options");
  box.replaceChildren();
  q.options.forEach((txt, i) => {
    const letter = "ABCDE"[i];
    const isKey = letter === q.answer;
    box.append(
      el("div", { class: "opt" + (isKey ? " correct" : "") }, [
        el("span", { class: "letter", text: letter }),
        el("span", { text: txt + (isKey ? "  ✓" : "") }),
      ])
    );
  });

  const optText = q.options["ABCDE".indexOf(q.answer)];
  $("t-answer").textContent = q.answer + ". " + optText;

  const ei = $("t-eimg");
  ei.hidden = !q.explainImage;
  if (q.explainImage) ei.src = q.explainImage;
  $("t-explain").innerHTML = q.explain; // konten dari server milik sendiri, bukan input pengguna

  $("t-prev").disabled = T.i === 0;
  $("t-next").disabled = T.i === T.questions.length - 1;
}

$("t-prev").addEventListener("click", () => {
  if (T.i > 0) {
    T.i--;
    renderTeacherQuestion();
    $("t-card").scrollIntoView({ block: "start", behavior: "smooth" });
  }
});
$("t-next").addEventListener("click", () => {
  if (T.i < T.questions.length - 1) {
    T.i++;
    renderTeacherQuestion();
    $("t-card").scrollIntoView({ block: "start", behavior: "smooth" });
  }
});

function setTab(tab) {
  T.tab = tab;
  $("panel-bahas").hidden = tab !== "bahas";
  $("panel-peserta").hidden = tab !== "peserta";
  ["bahas", "peserta"].forEach((t) => {
    const b = $("tab-" + t);
    b.classList.toggle("active", t === tab);
    b.setAttribute("aria-selected", String(t === tab));
  });
}
document.querySelectorAll(".tab").forEach((b) => b.addEventListener("click", () => setTab(b.dataset.tab)));

async function refreshRoster() {
  if (S.role !== "teacher") return;
  try {
    const r = await api("/api/teacher/roster");
    S.status = r.status;
    S.round = r.round;
    renderControls();
    renderRoster(r);
  } catch (e) {
    if (e.status === 401) logout();
  }
}

function renderControls() {
  const chip = $("t-status");
  const label = { active: "Aktif", paused: "Dijeda", off: "Mati" }[S.status];
  chip.textContent = label;
  chip.className = "chip " + { active: "on", paused: "paused", off: "off" }[S.status];

  $("t-info").textContent =
    S.round === 0 ? "Belum pernah dimulai." : "Sesi ke-" + S.round + (S.status === "active" ? ", siswa bisa mengerjakan." : ", siswa belum bisa mengerjakan.");

  $("t-pause").hidden = S.status !== "active";
  $("t-resume").hidden = S.status === "active" || S.round === 0;
  $("t-stop").hidden = S.status === "off";
  $("t-start").textContent = S.round === 0 ? "Mulai" : "Mulai Baru";
}

function renderRoster(r) {
  $("t-count").textContent = r.students.length;
  const table = $("t-roster");
  $("t-roster-empty").hidden = r.students.length > 0;
  table.hidden = r.students.length === 0;
  const body = table.querySelector("tbody");
  body.replaceChildren();
  r.students.forEach((s) => {
    const pct = Math.round((s.answered / r.total) * 100);
    const progress = el("td", {}, [
      document.createTextNode(s.answered + " / " + r.total),
      el("span", { class: "bar" }, [el("i", { style: "width:" + pct + "%" })]),
    ]);
    body.append(
      el("tr", {}, [
        el("td", { text: s.name }),
        progress,
        el("td", { text: String(s.correct) }),
        el("td", { text: ago(s.lastSeen) }),
      ])
    );
  });
}

function ago(ts) {
  const sec = Math.max(0, Math.round((Date.now() - ts) / 1000));
  if (sec < 10) return "baru saja";
  if (sec < 60) return sec + " detik lalu";
  const min = Math.round(sec / 60);
  if (min < 60) return min + " menit lalu";
  return Math.round(min / 60) + " jam lalu";
}

async function teacherAction(action) {
  try {
    await api("/api/teacher/session", { method: "POST", body: { action } });
    await refreshRoster();
  } catch (_) {
    toast("Perintah gagal dikirim. Coba lagi.");
  }
}

$("t-start").addEventListener("click", () => {
  if (S.round > 0 && !confirm("Mulai sesi baru? Semua siswa akan mulai lagi dari soal 1. Jawaban sesi sebelumnya tidak ikut dihitung.")) return;
  teacherAction("start");
});
$("t-pause").addEventListener("click", () => teacherAction("pause"));
$("t-resume").addEventListener("click", () => teacherAction("resume"));
$("t-stop").addEventListener("click", () => {
  if (confirm("Matikan sesi? Siswa tidak bisa mengerjakan sampai kamu membukanya lagi.")) teacherAction("stop");
});

/* ====== awal ====== */
(function init() {
  show("login");
  try {
    const saved = JSON.parse(sessionStorage.getItem("quiz.login") || "null");
    if (saved && saved.name) {
      $("in-name").value = saved.name;
      $("in-pin").value = saved.pin || "";
      $("login-form").requestSubmit();
    }
  } catch (_) {}
})();
