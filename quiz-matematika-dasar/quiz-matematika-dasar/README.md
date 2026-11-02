# Quiz Matematika Dasar (25 soal)

Website quiz untuk siswa dan guru. Berjalan di Cloudflare Pages, API-nya di Pages Functions (runtime Workers), data di D1.

## Fitur

**Siswa**
- Login dengan nama bebas. Login lagi dengan nama yang sama melanjutkan ke soal berikutnya.
- Mode next terus: begitu pilihan diklik, langsung terlihat benar atau salah, lalu klik Lanjut.
- Pembahasan tidak ditampilkan ke siswa.

**Guru** (login dengan nama `Ferdi`)
- Melihat soal, kunci, dan pembahasan setiap nomor.
- **Mulai Baru**: membuka sesi baru, laman siswa aktif, semua siswa mulai dari soal 1.
- **Pause / Lanjutkan**: laman siswa berhenti sementara, jawaban yang sudah ada tetap aman.
- **Matikan**: siswa belum bisa mengerjakan. Tombol Lanjutkan membuka kembali sesi yang sama tanpa menghapus jawaban.
- Tab Peserta: daftar siswa, jumlah terjawab, dan jumlah benar.

## Deploy (GitHub + Cloudflare)

1. **GitHub**: buat repository baru, lalu upload seluruh isi folder ini (bukan file zip-nya).
2. **Cloudflare Pages**: Workers & Pages, Create, Pages, Connect to Git, pilih repository tadi.
   - Framework preset: `None`
   - Build command: kosongkan
   - Build output directory: `public`
   - Klik Save and Deploy.
3. **Database**: di dashboard Cloudflare buka D1 SQL database, Create, beri nama bebas (misalnya `quiz-db`).
4. **Binding**: buka project Pages, Settings, Bindings, Add, D1 database.
   - Variable name: `DB` (harus persis)
   - D1 database: pilih `quiz-db`
   - Simpan, lalu redeploy (Deployments, titik tiga pada deployment terbaru, Retry deployment).
5. Buka `https://<nama-project>.pages.dev`. Tabel dibuat otomatis saat pertama dipakai.

Bagikan alamat itu ke siswa. Guru masuk dengan nama `Ferdi`, lalu klik **Mulai**.

### PIN guru (opsional)
Secara bawaan siapa pun yang mengetik nama `Ferdi` menjadi guru. Untuk mengunci:
Settings, Variables and secrets, tambahkan `TEACHER_PIN` (tipe Secret), lalu redeploy. Guru akan diminta PIN saat login.

## Menjalankan di komputer sendiri

Butuh Node.js 18 atau lebih baru.

```
npm run dev
```

Buka http://localhost:8788. Data lokal disimpan di folder `.wrangler/` (tidak ikut ke Git).

## Mengubah soal atau kunci jawaban

Semua soal, kunci, dan pembahasan ada di `functions/_lib/questions.js`. Ubah `answer` (A sampai E) atau teksnya, commit, dan Cloudflare akan deploy ulang otomatis. Gambar ada di `public/img/`.

## Struktur

```
public/                 halaman web (index.html, style.css, app.js, img/)
functions/api/[[route]].js   API (login, soal, jawaban, kontrol guru)
functions/_lib/questions.js  bank soal, kunci, pembahasan (hanya di server)
schema.sql              skema tabel (opsional, dibuat otomatis)
```

Kunci dan pembahasan hanya ada di server dan tidak pernah dikirim ke browser siswa.
