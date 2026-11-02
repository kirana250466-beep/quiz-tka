// Bank soal. File ini hanya dibaca server (Pages Functions), jadi kunci jawaban
// dan pembahasan tidak pernah dikirim ke siswa sebelum mereka menjawab.
//
// Untuk mengubah kunci jawaban, ganti nilai `answer` (A sampai E) lalu deploy ulang.
// Field `image` = gambar di soal, `explainImage` = gambar di pembahasan (folder public/img).

export const QUESTIONS = [
  {
    n: 1,
    text: "Jika W, X, Y, dan Z adalah anggota bilangan riil, maka persamaan berikut ini yang berbeda dengan W(X + Y + Z) adalah ....",
    options: ["(X + Y + Z)W", "W(X + Z) + WY", "WX + WY + WZ", "W(X + Y) + WZ", "WX + Y + Z"],
    answer: "E",
    explain: `
<p>Arti <b>W(X + Y + Z)</b>: W dikalikan dengan <b>semua</b> yang ada di dalam kurung, yaitu W×X, W×Y, dan W×Z, lalu dijumlahkan. Jadi hasilnya <b>WX + WY + WZ</b>.</p>
<p>Bayangkan W adalah harga satu permen, sedangkan X, Y, dan Z adalah jumlah permen yang dibeli tiga orang. Total bayar bisa dihitung sekaligus, yaitu W × (X + Y + Z), atau dihitung per orang lalu dijumlahkan, yaitu WX + WY + WZ. Hasilnya sama.</p>
<p>Cek tiap pilihan:</p>
<ul>
<li>A. (X + Y + Z)W hanya membalik urutan perkalian. Hasilnya sama.</li>
<li>B. W(X + Z) + WY = WX + WZ + WY. Sama.</li>
<li>C. WX + WY + WZ. Sama persis.</li>
<li>D. W(X + Y) + WZ = WX + WY + WZ. Sama.</li>
<li>E. WX + Y + Z. Hanya X yang dikali W, sedangkan Y dan Z dibiarkan sendiri. <b>Ini berbeda.</b></li>
</ul>
<p>Bukti dengan angka: misal W = 2, X = 1, Y = 3, Z = 4. Maka W(X + Y + Z) = 2 × 8 = 16, sedangkan pilihan E = 2×1 + 3 + 4 = 9. Hasilnya tidak sama, jadi jawabannya E.</p>
<p class="key">Intinya: angka di luar kurung harus mengalikan semua isi kurung, bukan hanya yang pertama.</p>`,
  },
  {
    n: 2,
    text: "Seorang penjual kayu memerlukan empat balok kayu yang masing-masing berukuran 2 kaki kali 10 inci. Apabila kayu akan dijual hanya dalam ukuran kaki, maka banyaknya kayu yang harus dibeli oleh penjual kayu tersebut adalah ....",
    options: ["Tidak dapat ditentukan", "11", "10", "12", "9"],
    answer: "A",
    explain: `
<p>Penjual membutuhkan 4 balok, masing-masing berukuran 2 kaki × 10 inci. Untuk tahu berapa batang kayu yang harus dibeli, kita harus tahu <b>berapa ukuran satu batang kayu yang dijual</b> (panjangnya berapa kaki, lebarnya berapa).</p>
<p>Soal tidak menyebutkan ukuran kayu yang dijual itu. Tanpa data tersebut, jumlah kayu yang dibeli tidak bisa dihitung.</p>
<p>Contoh sehari-hari: kita butuh 4 potong kain berukuran 2 m × 10 cm, tetapi tidak diberi tahu kain dijual dalam gulungan selebar berapa. Kita tidak bisa memastikan harus beli berapa gulung.</p>
<p>Angka 9, 10, 11, atau 12 hanya akan benar jika ukuran kayu yang dijual diketahui. Karena tidak diketahui, jawaban yang tepat adalah <b>tidak dapat ditentukan</b>.</p>
<p class="key">Intinya: kalau data yang dibutuhkan tidak ada di soal, jawabannya bisa jadi "tidak dapat ditentukan".</p>`,
  },
  {
    n: 3,
    text: "Perhatikan gambar di bawah ini. Gambar tersebut merupakan gambar sebuah persegi panjang yang lebarnya 4 cm. Rasio antara daerah yang diarsir dengan daerah yang tidak diarsir adalah ....",
    image: "img/s03.png",
    options: ["(4 + x)/(4 − x)", "(2 + x)/(2 − x)", "(4 + x)/8", "(2 − x)/(2 + x)", "(2 + x)/4"],
    answer: "A",
    explain: `
<p>Gambar terbagi menjadi dua daerah: daerah <b>diarsir</b> (abu-abu) berbentuk <b>trapesium</b>, dan daerah <b>tidak diarsir</b> berbentuk <b>segitiga siku-siku</b>.</p>
<p>Rumus yang dipakai:<br>Luas trapesium = ½ × (jumlah dua sisi sejajar) × tinggi<br>Luas segitiga = ½ × alas × tinggi</p>
<p>Dua sisi sejajar trapesium adalah sisi kiri (<b>x</b>) dan sisi kanan (<b>4</b>), jadi jumlahnya <b>(4 + x)</b>. Sisi tegak segitiga adalah sisa dari sisi 4 setelah dikurangi x, yaitu <b>(4 − x)</b>. Jarak mendatar antara sisi kiri dan sisi kanan sama untuk kedua bangun. Sebut saja <b>p</b> (panjang persegi panjang).</p>
<p>Hitung rasionya:<br>Luas arsir : Luas tidak arsir = [½ × (4 + x) × p] : [½ × (4 − x) × p]</p>
<p>Angka ½ dan p ada di kedua bagian, sehingga bisa dicoret. Tersisa <b>(4 + x) : (4 − x)</b>, atau ditulis <b>(4 + x)/(4 − x)</b>.</p>
<p class="key">Intinya: karena tingginya sama, yang menentukan rasio hanya jumlah sisi sejajar dibanding sisi tegak segitiga.</p>`,
  },
  {
    n: 4,
    // Catatan: file sumber tidak memuat kalimat "luas segitiga 54" di soal, padahal pembahasan
    // memakainya. Kalimat itu ditambahkan di sini supaya soal bisa dikerjakan.
    text: "Cermati gambar di bawah ini. Jika luas segitiga pada gambar adalah 54, maka nilai c adalah ....",
    image: "img/s04.png",
    options: ["6", "9", "12", "2", "3"],
    answer: "E",
    explainImage: "img/s04-p.png",
    explain: `
<p>Segitiga pada gambar adalah segitiga siku-siku. Ketiga titik sudutnya berada di (c, c), (5c, c), dan (5c, 4c).</p>
<p><b>Alas</b> segitiga dihitung dari c sampai 5c, yaitu 5c − c = <b>4c</b>.<br><b>Tinggi</b> segitiga dihitung dari c sampai 4c, yaitu 4c − c = <b>3c</b>.</p>
<p>Luas segitiga = ½ × alas × tinggi = ½ × 4c × 3c = <b>6c²</b>. (Angka: ½ × 4 × 3 = 6, sedangkan c × c = c².)</p>
<p>Luas segitiga diketahui 54, maka 6c² = 54. Bagi kedua sisi dengan 6, hasilnya c² = 9. c² = 9 artinya c adalah bilangan yang jika dikali dirinya sendiri hasilnya 9, yaitu <b>c = 3</b>.</p>
<p class="key">Intinya: ukuran alas dan tinggi dibaca dari selisih angka pada garis kotak-kotaknya.</p>`,
  },
  {
    n: 5,
    text: "Selembar kertas persegi yang berukuran 6 cm akan dipotong membentuk sebuah lingkaran. Rasio luas lingkaran maksimum yang dapat dibentuk dengan luas persegi yang paling mendekati adalah ...",
    options: ["2:3", "3:4", "1:2", "3:5", "2:7"],
    answer: "B",
    explainImage: "img/s05-p.png",
    explain: `
<p>Lingkaran <b>terbesar</b> yang bisa dipotong dari kertas persegi akan menyentuh keempat sisinya. Jadi garis tengah (diameter) lingkaran sama dengan sisi persegi, yaitu 6 cm. Jari-jarinya <b>3 cm</b>.</p>
<p>Luas lingkaran = π × r × r = 3,14 × 3 × 3 = <b>28,26 cm²</b>.<br>Luas persegi = 6 × 6 = <b>36 cm²</b>.</p>
<p>Rasio = 28,26 : 36. Jika dibagi, hasilnya sekitar 0,78. Pilihan yang paling dekat: 3:4 = 0,75 (pilihan lain: 2:3 ≈ 0,67; 3:5 = 0,6; 1:2 = 0,5; 2:7 ≈ 0,29).</p>
<p><b>Cara cepat:</b> jari-jari = r, maka sisi persegi = 2r. Rasio = πr² : (2r)² = πr² : 4r² = π : 4 ≈ 3,14 : 4 ≈ <b>3 : 4</b>. Berapa pun ukuran persegi, rasionya selalu π : 4.</p>
<p class="key">Intinya: lingkaran terbesar dalam persegi selalu memenuhi sekitar tiga perempat luas persegi.</p>`,
  },
  {
    n: 6,
    text: "Di kebun apel Pak Jack, perbandingan antara apel hijau dan apel merah adalah 4:3. Terdapat 75% dari apel hijau memiliki rasa yang asam. Berapakah proporsi terbesar yang mungkin dari total apel hijau dan apel merah yang memiliki rasa yang asam?",
    options: ["7/8", "7/6", "7/5", "5/7", "6/7"],
    answer: "E",
    explain: `
<p>Agar mudah, misalkan total apel ada <b>70 buah</b>. Perbandingan hijau : merah = 4 : 3 (jumlah 7 bagian), sehingga 1 bagian = 10 buah. Apel hijau = 40 buah, apel merah = 30 buah.</p>
<p>Apel hijau yang asam = 75% × 40 = <b>30 buah</b>.</p>
<p>Soal meminta proporsi <b>terbesar yang mungkin</b>. Proporsinya paling besar jika <b>semua apel merah</b> juga asam, yaitu 30 buah. Total apel asam paling banyak = 30 + 30 = <b>60 buah</b> dari 70 buah.</p>
<p>Proporsi = 60/70 = <b>6/7</b>.</p>
<p>Pilihan 7/6 mustahil karena lebih dari 1 (bagian tidak mungkin lebih besar dari keseluruhan). Pilihan 7/8 dan 7/5 juga lebih besar dari 6/7, padahal 6/7 sudah merupakan batas paling besar.</p>
<p class="key">Intinya: untuk mencari "nilai terbesar yang mungkin", anggap semua unsur yang belum pasti berada dalam kondisi paling menguntungkan.</p>`,
  },
  {
    n: 7,
    text: "Seorang koki mengambil 10% dari tepung cadangannya untuk memasak pesanan yang baru saja diterima. Jika koki tersebut harus mengembalikan tepung sebanyak 90 kg untuk mengembalikan tepung cadangan tersebut ke ukuran semula, maka tepung cadangan Koki awalnya adalah .....",
    options: ["100 kg", "900 kg", "910 kg", "810 kg", "190 kg"],
    answer: "B",
    explain: `
<p>Misalkan tepung awal = X kg. Koki mengambil 10% dari X, sehingga tepung berkurang sebanyak 10% × X. Agar tepung kembali seperti semula, koki harus mengembalikan tepat sejumlah yang diambil, yaitu 90 kg.</p>
<p>Artinya <b>10% dari X = 90 kg</b>. 0,1 × X = 90, maka X = 90 ÷ 0,1 = <b>900 kg</b>.</p>
<p>Cek: 10% dari 900 = 90 kg. Sisa tepung 900 − 90 = 810 kg, lalu ditambah 90 kg, kembali menjadi 900 kg. Sesuai.</p>
<p>Hati-hati pilihan 810 kg: itu adalah <b>sisa tepung setelah diambil</b>, bukan tepung awal.</p>
<p class="key">Intinya: 10% sama dengan seper sepuluh, jadi kalau 10% nilainya 90, keseluruhannya adalah 90 × 10 = 900.</p>`,
  },
  {
    n: 8,
    text: "Sebanyak 40% tong berbentuk silinder berisi air hujan. Jika tong tersebut memiliki ukuran radius 2 m dan tinggi 5 m, maka banyak air yang harus ditambahkan agar tong tersebut terisi penuh dengan air adalah .... m³.",
    options: ["6π", "12π", "10π", "8π", "14π"],
    answer: "B",
    explain: `
<p>Tong baru terisi 40%, berarti bagian yang masih kosong = 100% − 40% = <b>60%</b>.</p>
<p>Volume tong penuh (silinder) = π × r × r × tinggi = π × 2 × 2 × 5 = <b>20π m³</b>.</p>
<p>Air yang harus ditambahkan = bagian kosong = 60% × 20π = 0,6 × 20π = <b>12π m³</b>.</p>
<p>Hati-hati pilihan 8π: itu adalah isi air yang <b>sudah ada</b> (40% × 20π = 8π), bukan yang harus ditambahkan.</p>
<p class="key">Intinya: air yang perlu ditambah sama dengan bagian yang masih kosong.</p>`,
  },
  {
    n: 9,
    text: "Roni ingin membuat bingkai untuk foto besar yang baru saja dibelinya. Foto tersebut berbentuk persegi panjang dengan perbandingan ukuran 3: 2 serta panjang sisi yang paling pendek adalah 15 inci. Ukuran bahan yang diperlukan untuk membuat bingkai foto tersebut adalah .... inchi.",
    options: ["75", "57", "20", "22", "78"],
    answer: "A",
    explain: `
<p>Perbandingan panjang : lebar = 3 : 2. Sisi yang paling pendek adalah lebar, yaitu 2 bagian, nilainya <b>15 inci</b>.</p>
<p>Satu bagian = 15 ÷ 2 = 7,5 inci. Panjang = 3 bagian = 3 × 7,5 = <b>22,5 inci</b>. (Bisa juga: 3/2 × 15 = 22,5.)</p>
<p>Bingkai mengelilingi foto, sehingga bahan yang diperlukan sama dengan <b>keliling</b> persegi panjang.</p>
<p>Keliling = 2 × (panjang + lebar) = 2 × (22,5 + 15) = 2 × 37,5 = <b>75 inci</b>.</p>
<p class="key">Intinya: bingkai = keliling, sedangkan alas atau karpet = luas.</p>`,
  },
  {
    n: 10,
    text: "Jika diketahui 1 < K < 5 dan 1 < L < 5, maka hubungan antara K dan L adalah ....",
    options: ["K > L", "K < L", "K = 0", "K = L", "L = 0"],
    answer: "D",
    explain: `
<p>Tanda 1 &lt; K &lt; 5 artinya K adalah bilangan yang lebih dari 1 dan kurang dari 5. Begitu juga L: lebih dari 1 dan kurang dari 5. Jadi K dan L memiliki <b>batas dan daerah nilai yang persis sama</b>, yaitu semua bilangan di antara 1 dan 5.</p>
<p>Dalam bentuk himpunan: {x │ 1 &lt; x &lt; 5} untuk K dan {x │ 1 &lt; x &lt; 5} untuk L. Kedua himpunan itu sama.</p>
<p>Cek pilihan lain:</p>
<ul>
<li>K &gt; L dan K &lt; L: tidak ada yang membuat K lebih besar atau lebih kecil dari L, karena keduanya dibatasi dengan cara yang sama.</li>
<li>K = 0 dan L = 0: mustahil, karena nilainya harus lebih dari 1.</li>
</ul>
<p>Maka hubungan yang sesuai adalah <b>K = L</b>.</p>
<p><b>Catatan:</b> yang sama adalah <b>daerah nilainya</b>, belum tentu angka K dan L pasti sama. Karena pilihan "tidak dapat ditentukan" tidak tersedia, D adalah pilihan yang paling sesuai.</p>`,
  },
  {
    n: 11,
    text: "Banyaknya bilangan bulat yang terdiri dari dua digit serta habis dibagi dengan 5 dan 6 adalah ....",
    options: ["4", "8", "6", "2", "3"],
    answer: "E",
    explain: `
<p>Bilangan dua digit adalah bilangan dari <b>10 sampai 99</b>. "Habis dibagi 5 dan 6" artinya bilangan itu kelipatan 5 <b>sekaligus</b> kelipatan 6.</p>
<p>Karena 5 dan 6 tidak punya faktor yang sama (selain 1), bilangan yang habis dibagi keduanya adalah kelipatan dari 5 × 6 = <b>30</b>.</p>
<p>Kelipatan 30: 30, 60, 90, 120, ... Yang masih dua digit hanya <b>30, 60, dan 90</b> (120 sudah tiga digit).</p>
<p>Cek: 30 ÷ 5 = 6 dan 30 ÷ 6 = 5. Begitu pula 60 (÷5 = 12, ÷6 = 10) dan 90 (÷5 = 18, ÷6 = 15).</p>
<p>Jadi banyaknya ada <b>3 bilangan</b>.</p>`,
  },
  {
    n: 12,
    text: "Jordan memiliki berat badan dua kali dari Max. Sementara, berat badan Max adalah 60% berat badan Bren. Jika berat badan Damar adalah 50% dari berat badan Lukas dan berat badan Lukas adalah 190% berat badan Jordan, maka yang memiliki berat badan paling ringan adalah ....",
    options: ["Jordan", "Damar", "Max", "Lukas", "Bren"],
    answer: "C",
    explain: `
<p>Agar mudah, kita <b>misalkan berat Max = 100 kg</b>. Angka ini hanya pemisalan; urutan siapa paling ringan tidak berubah untuk berat berapa pun.</p>
<p>Hitung berat yang lain satu per satu:</p>
<ul>
<li>Jordan = 2 × Max = 2 × 100 = <b>200 kg</b></li>
<li>Bren: Max adalah 60% dari Bren, sehingga Bren = 100 ÷ 0,6 ≈ <b>166,7 kg</b></li>
<li>Lukas = 190% × Jordan = 1,9 × 200 = <b>380 kg</b></li>
<li>Damar = 50% × Lukas = 0,5 × 380 = <b>190 kg</b></li>
</ul>
<p>Urutkan dari yang paling ringan: Max (100) &lt; Bren (166,7) &lt; Damar (190) &lt; Jordan (200) &lt; Lukas (380).</p>
<p>Yang paling ringan adalah <b>Max</b>.</p>
<p class="key">Intinya: pilih satu orang sebagai patokan, lalu hitung berat yang lain berdasarkan patokan itu.</p>`,
  },
  {
    n: 13,
    text: "Jika nilai dari r = 1/3 s dan rs tidak sama dengan 0, maka rasio antara r dan 3s adalah ...",
    options: ["1/9", "1/3", "1/7", "1/8", "1/6"],
    answer: "A",
    explain: `
<p>Diketahui r = 1/3 s. Artinya r adalah sepertiga dari s. Rasio r dan 3s ditulis r : 3s.</p>
<p>Ganti r dengan 1/3 s, sehingga menjadi (1/3 s) : 3s. Karena rs tidak sama dengan 0, nilai s bukan nol, sehingga s boleh "dicoret" di kedua sisi. Tersisa <b>1/3 : 3</b>.</p>
<p>Kalikan kedua sisi dengan 3 agar tidak ada pecahan: (1/3 × 3) : (3 × 3) = <b>1 : 9</b>, atau ditulis <b>1/9</b>.</p>
<p>Cek dengan angka: jika s = 3, maka r = 1 dan 3s = 9. Rasio r : 3s = 1 : 9. Sesuai.</p>`,
  },
  {
    n: 14,
    text: "Di perpustakaan daerah Sukamaju, setiap novel terdapat dua buku sains, dan setiap buku sains terdapat tujuh buku ekonomi. Dengan demikian perbandingan antara buku ekonomi, buku sains, dan novel adalah ...",
    options: ["7 : 2 : 1", "14 : 7 : 2", "14 : 2 : 1", "7 : 1 : 2", "14 : 7 : 1"],
    answer: "C",
    explain: `
<p>Mulai dari <b>1 novel</b>. Setiap novel ada 2 buku sains, jadi ada <b>2 buku sains</b>. Setiap 1 buku sains ada 7 buku ekonomi. Karena ada 2 buku sains, buku ekonominya 2 × 7 = <b>14 buku</b>.</p>
<p>Jadi untuk 1 novel: sains = 2, ekonomi = 14. Soal meminta urutan <b>ekonomi : sains : novel</b>, yaitu <b>14 : 2 : 1</b>.</p>
<p>Kesalahan yang sering terjadi: memilih 7 : 2 : 1 karena lupa mengalikan 2 × 7. Perhatikan juga urutan yang diminta soal.</p>`,
  },
  {
    n: 15,
    text: "Nia sedang melakukan survei terhadap beberapa orang di sekitarnya. Di survei pertama, terdapat n responden, di mana sebanyak 60% menyatakan bahwa kuliah itu penting. Pada survei kedua, bertambah sebanyak x responden yang semuanya menyetujui bahwa kuliah itu penting. Setelah digabung, sebanyak tujuh puluh persen dari semua responden Nia setuju bahwa kuliah itu penting. Nilai x yang tepat adalah ....",
    options: ["n/5", "n/2", "3n", "n/6", "n/3"],
    answer: "E",
    explain: `
<p><b>Survei pertama:</b> n responden, 60% setuju, jadi yang setuju = 0,6n.<br><b>Survei kedua:</b> x responden dan semuanya setuju, jadi yang setuju = x.<br><b>Gabungan:</b> jumlah responden = n + x, jumlah yang setuju = 0,6n + x.</p>
<p>Jumlah yang setuju ini adalah 70% dari seluruh responden. Susun persamaannya:</p>
<p>0,6n + x = 0,7 × (n + x) = 0,7n + 0,7x.</p>
<p>Kumpulkan yang sejenis: x − 0,7x = 0,7n − 0,6n, sehingga 0,3x = 0,1n. x = 0,1n ÷ 0,3 = <b>n/3</b>.</p>
<p>Cek dengan angka: misal n = 30. Survei pertama: 60% × 30 = 18 orang setuju. Maka x = 30/3 = 10, semuanya setuju. Gabungan: 40 responden, 18 + 10 = 28 setuju, dan 28/40 = 0,7 = 70%. Sesuai.</p>`,
  },
  {
    n: 16,
    // Catatan: soal tertulis pulpen "naik 2%", sedangkan kunci memakai 20% (lihat catatan di pembahasan).
    text: "Minggu lalu, harga satu lusin buku sama dengan harga sepuluh biji pulpen. Namun, di bulan minggu ini, harga satu lusin buku naik 20% begitupun dengan harga sepuluh biji pulpen naik 2%. Maka tambahan uang yang diperlukan untuk membeli satu lusin buku dan sepuluh biji pulpen adalah ....",
    options: ["20%", "10%", "12%", "16%", "15%"],
    answer: "A",
    explain: `
<p>Harga 1 lusin buku <b>sama</b> dengan harga 10 biji pulpen. Agar mudah, misalkan masing-masing <b>Rp100.000</b>. Maka uang yang dibutuhkan sebelum naik = 100.000 + 100.000 = <b>Rp200.000</b>.</p>
<p><b>Buku</b> naik 20%: kenaikannya 20% × 100.000 = 20.000, sehingga harga baru = <b>Rp120.000</b>.<br><b>Pulpen</b> juga dihitung naik 20% (lihat catatan di bawah): harga baru 10 pulpen = <b>Rp120.000</b>.</p>
<p>Total setelah naik = 120.000 + 120.000 = <b>Rp240.000</b>. Tambahan uang = 240.000 − 200.000 = <b>Rp40.000</b>. Dalam persen: 40.000 ÷ 200.000 = 0,2 = <b>20%</b>.</p>
<p><b>Cara cepat:</b> kedua barang harganya sama dan naik dengan persentase yang sama, jadi total belanja pun naik dengan persentase yang sama, yaitu 20%.</p>
<p><b>Catatan:</b> di soal tertulis pulpen "naik 2%", tetapi perhitungan kunci memakai kenaikan <b>20%</b> untuk pulpen (kata "begitupun" berarti sama-sama naik 20%). Jika pulpen benar-benar hanya naik 2%, maka totalnya 120.000 + 102.000 = 222.000, atau tambah 11%, dan angka itu tidak ada di pilihan jawaban. Karena itu soal dibaca sebagai 20%, dan jawabannya A.</p>
<p class="key">Intinya: jika dua barang berharga sama naik dengan persen yang sama, total belanjanya naik dengan persen yang sama pula.</p>`,
  },
  {
    n: 17,
    text: "Sebuah sepeda motor dapat menghabiskan satu liter bensin setelah menempuh jarak 20 km jika berjalan dengan kecepatan 50 km per jam. Jika kecepatannya berubah menjadi 60 km per jam, jarak yang dapat ditempuh dengan satu liter bensin berkurang sebanyak 12%. Jarak yang dapat ditempuh oleh sepeda motor tersebut dengan 11 liter bensin dan kecepatan 60 km per jam adalah .... km.",
    options: ["95,1", "193,6", "204,3", "200", "170,3"],
    answer: "B",
    explain: `
<p>Pada kecepatan 50 km/jam, 1 liter bensin dapat menempuh <b>20 km</b>. Pada kecepatan 60 km/jam, jarak per 1 liter <b>berkurang 12%</b> dari 20 km.</p>
<p>Besar pengurangannya = 12% × 20 = 0,12 × 20 = <b>2,4 km</b>. Jarak per 1 liter sekarang = 20 − 2,4 = <b>17,6 km</b>. (Bisa juga: sisa 88% × 20 = 17,6.)</p>
<p>Bensin yang tersedia <b>11 liter</b>, sehingga jarak total = 17,6 × 11 = 176 + 17,6 = <b>193,6 km</b>.</p>
<p>Cek lain: jika tanpa pengurangan, 11 liter menempuh 20 × 11 = 220 km. Dikurangi 12%: 220 − 26,4 = 193,6 km. Hasilnya sama.</p>
<p>Angka 50 km/jam dan 60 km/jam hanya menjelaskan keadaannya. Yang dipakai untuk menghitung adalah <b>20 km</b>, <b>12%</b>, dan <b>11 liter</b>.</p>
<p class="key">Intinya: "berkurang 12%" artinya yang tersisa 88% dari nilai semula.</p>`,
  },
  {
    n: 18,
    // Catatan: kunci mengikuti file sumber (B). Lihat catatan di pembahasan.
    text: "Seluruh siswa kelas XI di SMA Cahaya Bangsa yang terdiri dari 100 orang disurvei mengenai apakah mereka pernah mengunjungi perpustakaan sekolah dan perpustakaan daerah. Berdasarkan hasil survei, terdapat 72 siswa yang pernah mengunjungi perpustakaan sekolah dan 52 siswa pernah mengunjungi perpustakaan daerah. Jumlah yang tidak mungkin untuk siswa yang pernah mengunjungi perpustakaan sekolah dan perpustakaan daerah adalah ....",
    options: ["25", "24", "52", "32", "20"],
    answer: "B",
    explain: `
<p>Jumlah siswa seluruhnya hanya <b>100 orang</b>. Namun jika 72 siswa (perpustakaan sekolah) dan 52 siswa (perpustakaan daerah) dijumlahkan, hasilnya 72 + 52 = <b>124</b>. Angka 124 lebih besar dari 100. Artinya ada siswa yang <b>terhitung dua kali</b>, yaitu siswa yang pernah mengunjungi <b>kedua</b> perpustakaan.</p>
<p>Jumlah yang terhitung dua kali = 124 − 100 = <b>24 orang</b>. Ini adalah jumlah <b>paling sedikit</b> siswa yang pernah mengunjungi kedua perpustakaan.</p>
<p>Cek: jika yang ke keduanya 24 orang, maka yang hanya ke perpustakaan sekolah = 72 − 24 = 48, dan yang hanya ke perpustakaan daerah = 52 − 24 = 28. Total = 48 + 28 + 24 = 100. Pas, tidak ada siswa yang tidak berkunjung sama sekali.</p>
<p>Jumlah paling banyak yang bisa ke keduanya adalah <b>52</b> (yaitu seluruh pengunjung perpustakaan daerah juga pernah ke perpustakaan sekolah). Jadi jumlah siswa yang ke kedua perpustakaan hanya mungkin berkisar <b>24 sampai 52</b>.</p>
<p>Cek pilihan: 25, 24, 52, dan 32 berada di antara 24 dan 52 (mungkin terjadi). Angka 20 di bawah 24 (mustahil terjadi).</p>
<p><b>Catatan penting:</b> pembahasan pada kunci menghitung <b>jumlah minimal</b> (24), sehingga kunci memilih <b>B</b>. Namun kalimat soal berbunyi "jumlah yang <b>tidak mungkin</b>". Jika dibaca apa adanya, angka yang tidak mungkin adalah <b>20 (pilihan E)</b>, sedangkan 24 justru angka terkecil yang masih mungkin. Kemungkinan soal aslinya menanyakan jumlah paling sedikit. Mohon dicek kembali dengan soal aslinya.</p>
<p class="key">Intinya: jika dua kelompok bila dijumlahkan melebihi total, selisihnya adalah jumlah paling sedikit yang berada di kedua kelompok.</p>`,
  },
  {
    n: 19,
    text: "Pada bulan Oktober, negara A memiliki populasi penduduk sebanyak P. Di bulan itu, terdapat L kasus Leukemia, dengan tingkat Leukemia per kapita sebanyak L/P. Jika dalam sepuluh bulan ke depan kasus Leukemia di negara tersebut menurun sebanyak 50% dengan populasi yang meningkat sebanyak 50%, persentase perubahan tingkat Leukemia per kapita di negara tersebut dalam sepuluh bulan ke depan adalah ....",
    options: ["Naik sebesar 33 1/3%", "Naik sebesar 66 2/3%", "Turun sebanyak 50%", "Turun sebanyak 75%", "Turun sebesar 66 2/3%"],
    answer: "E",
    explain: `
<p><b>Arti istilahnya:</b> "tingkat Leukemia per kapita" adalah jumlah penderita dibagi jumlah penduduk, yaitu seberapa banyak penderita untuk setiap penduduk. Jadi ada dua hal yang berubah sekaligus: jumlah penderita dan jumlah penduduk.</p>
<p><b>Langkah 1 – Keadaan awal.</b> Penderita = L, penduduk = P. Maka tingkatnya adalah L/P.</p>
<p><b>Langkah 2 – Sepuluh bulan kemudian.</b> Kasus turun 50%, artinya tinggal setengahnya: ½L. Penduduk naik 50%, artinya menjadi 1½ kali lipat: 1,5P.</p>
<p><b>Langkah 3 – Tingkat yang baru.</b> ½L ÷ 1,5P. Karena ½ ÷ 1,5 = 1/3, tingkat yang baru adalah 1/3 × (L/P). Artinya tingkat sekarang tinggal sepertiga dari tingkat awal.</p>
<p><b>Langkah 4 – Ubah menjadi persen perubahan.</b> Awalnya 1 bagian penuh (100%), sekarang tinggal 1/3 bagian. Yang hilang adalah 1 − 1/3 = 2/3 bagian, yaitu 66 2/3%. Karena berkurang, perubahannya adalah <b>turun 66 2/3%</b>.</p>
<p><b>Contoh dengan angka:</b> misalkan awalnya ada 100 penderita di antara 1.000 penduduk, tingkatnya 100 ÷ 1.000 = 0,10. Sepuluh bulan kemudian penderita tinggal 50 dan penduduk menjadi 1.500, tingkatnya 50 ÷ 1.500 ≈ 0,033. Dari 0,10 menjadi 0,033 berarti tinggal sepertiganya (turun dua pertiganya).</p>
<p class="key">Tips: jangan langsung memilih "Turun 50%". Angka 50% itu hanya perubahan jumlah kasus. Karena penduduknya ikut bertambah, jatah penderita untuk tiap penduduk menjadi lebih kecil lagi.</p>`,
  },
  {
    n: 20,
    text: "Sebuah angka akan dikatakan sempurna jika besar angka tersebut sama dengan jumlah seluruh faktor positifnya yang kurang dari angka itu sendiri. Angka berikut yang dapat dikatakan sempurna adalah ....",
    options: ["1", "4", "10", "8", "6"],
    answer: "E",
    explain: `
<p><b>Arti istilahnya:</b> faktor (pembagi) suatu angka adalah angka-angka yang dapat membagi angka itu tanpa sisa. Contohnya, pembagi 6 adalah 1, 2, 3, dan 6. Sebuah angka disebut <b>sempurna</b> jika semua pembaginya, kecuali angka itu sendiri, dijumlahkan hasilnya persis sama dengan angka tersebut.</p>
<p>Mari kita periksa kelima pilihan satu per satu:</p>
<table>
<tr><th>Angka</th><th>Pembagi (selain angka itu sendiri)</th><th>Jumlah pembagi</th><th>Sama dengan angkanya?</th></tr>
<tr><td>1</td><td>tidak ada</td><td>0</td><td>Tidak (0 ≠ 1)</td></tr>
<tr><td>4</td><td>1, 2</td><td>1 + 2 = 3</td><td>Tidak (3 ≠ 4)</td></tr>
<tr><td>10</td><td>1, 2, 5</td><td>1 + 2 + 5 = 8</td><td>Tidak (8 ≠ 10)</td></tr>
<tr><td>8</td><td>1, 2, 4</td><td>1 + 2 + 4 = 7</td><td>Tidak (7 ≠ 8)</td></tr>
<tr><td><b>6</b></td><td>1, 2, 3</td><td><b>1 + 2 + 3 = 6</b></td><td><b>Ya</b> (6 = 6)</td></tr>
</table>
<p>Hanya angka 6 yang jumlah pembaginya sama dengan dirinya sendiri, sehingga 6 adalah angka sempurna.</p>
<p><b>Catatan penting:</b> kunci jawaban di sumber soal tertulis C (10), tetapi perhitungan pada pembahasan sumber itu sendiri menunjukkan bahwa 10 menghasilkan 8 (bukan 10), sedangkan 6 menghasilkan 6. Jadi jawaban yang benar adalah <b>E (6)</b>; kemungkinan ada kekeliruan pada kunci di sumbernya.</p>`,
  },
  {
    n: 21,
    // Catatan: soal tertulis "DE = y", sedangkan gambar pembahasan dan kunci memakai y sebagai DC.
    text: "Perhatikan gambar berikut. Berdasarkan gambar di atas, diketahui bahwa luas bujur sangkar ABCE adalah x² dan panjang DE = y. Maka, luas segitiga AED yang tepat adalah .....",
    image: "img/s21.png",
    options: ["1/2(x² − y)", "½x² − ½xy", "x² − xy", "1/2y(x − y)", "xy − x²"],
    answer: "B",
    explainImage: "img/s21-p.png",
    explain: `
<p><b>Langkah 1 – Kenali bangunnya.</b> "Bujur sangkar" sama dengan persegi: keempat sisinya sama panjang. Luasnya x², artinya panjang sisinya adalah x (karena sisi × sisi = x × x = x²).</p>
<p><b>Langkah 2 – Lihat segitiga AED.</b> Segitiga AED adalah bagian berwarna biru pada gambar. Ia berdiri tegak di pojok E, sehingga <b>tingginya = sisi AE = x</b> dan <b>alasnya = ED</b>.</p>
<p><b>Langkah 3 – Cari panjang alas ED.</b> Seluruh sisi bawah EC panjangnya x, dan sisi itu terbagi menjadi dua bagian: ED dan DC. Bila DC = y, maka ED = x − y (sisa setelah dikurangi y).</p>
<p><b>Langkah 4 – Hitung luas segitiga.</b> Luas segitiga = ½ × alas × tinggi = ½ × (x − y) × x = ½x(x − y). Kalikan x ke dalam kurung: <b>½x² − ½xy</b>. Itulah pilihan B.</p>
<p><b>Catatan penting:</b> pada soal tertulis DE = y, tetapi gambar pembahasan di sumber soal menandai y pada bagian DC (dari D ke C), dan hanya dengan pengertian itu jawaban B muncul. Jika benar DE = y, luas segitiga AED hanya ½ × x × y = ½xy, yang tidak ada di pilihan jawaban. Jadi pada soal ini y dibaca sebagai panjang DC.</p>`,
  },
  {
    n: 22,
    text: "Perhatikan gambar sebuah persegi panjang di bawah ini. Jika luas segitiga siku-siku sama kaki ABE adalah 7 cm dan panjang EC adalah 3 kali BE, maka luas ABCD adalah .... cm.",
    image: "img/s22.png",
    options: ["21", "28", "42", "60", "56"],
    answer: "E",
    explainImage: "img/s22-p.png",
    explain: `
<p><b>Langkah 1 – Pahami gambarnya.</b> ABCD adalah persegi panjang. Titik E terletak di sisi bawah BC, dan segitiga ABE (berwarna biru) berada di pojok kiri bawah. Karena E ada di antara B dan C, maka BC = BE + EC.</p>
<p><b>Langkah 2 – Ubah "luas segitiga" menjadi "luas persegi panjang kecil".</b> Luas segitiga = ½ × AB × BE = 7. Kalau kedua ruas dikalikan 2, diperoleh AB × BE = 14. Dengan kata lain, persegi panjang kecil berukuran AB × BE luasnya 14 (tepat dua kali luas segitiga).</p>
<p><b>Langkah 3 – Cari panjang seluruh alas.</b> EC = 3 × BE, sehingga BC = BE + 3 × BE = 4 × BE. Jadi seluruh alas sama dengan 4 potong yang selebar BE.</p>
<p><b>Langkah 4 – Hitung luas ABCD.</b> Luas ABCD = AB × BC = AB × (4 × BE) = 4 × (AB × BE) = 4 × 14 = <b>56 cm²</b>.</p>
<p><b>Cara membayangkannya:</b> persegi panjang ABCD terdiri dari 4 potongan persegi panjang kecil yang sama (masing-masing luasnya 14). Maka luas seluruhnya 4 × 14 = 56.</p>
<p class="key">Tips: kata "sama kaki" pada soal tidak diperlukan untuk menghitung. Yang dipakai hanyalah luas segitiga dan perbandingan BE dengan EC.</p>`,
  },
  {
    n: 23,
    text: "Sebuah tiang bendera setinggi 98 m memiliki bayangan sepanjang 42 m ketika didirikan di bawah teriknya matahari. Panjang bayangan untuk tiang bendera dengan tinggi 35 m di posisi dan waktu yang sama adalah ....",
    options: ["10m", "20m", "5m", "15m", "25m"],
    answer: "D",
    explainImage: "img/s23-p.png",
    explain: `
<p><b>Ide utamanya:</b> pada tempat dan waktu yang sama, matahari miringnya sama. Karena itu, semua benda yang berdiri tegak punya perbandingan "tinggi benda : panjang bayangan" yang sama. Benda yang tingginya dua kali lipat akan punya bayangan dua kali lipat juga.</p>
<p><b>Langkah 1 – Cari perbandingan dari tiang pertama.</b> 98 : 42. Bagi kedua angka dengan 14 sehingga menjadi 7 : 3. Artinya, setiap tinggi 7 m menghasilkan bayangan 3 m.</p>
<p><b>Langkah 2 – Terapkan pada tiang kedua.</b> Tinggi 35 m sama dengan 5 kali 7 m (karena 35 ÷ 7 = 5). Maka bayangannya juga 5 kali 3 m = <b>15 m</b>.</p>
<p><b>Langkah 3 – Cara dengan rumus perbandingan.</b> 98/42 = 35/X, sehingga X = (42 × 35) ÷ 98 = 1.470 ÷ 98 = 15 m.</p>
<p><b>Pengecekan:</b> 35 : 15 disederhanakan (dibagi 5) menjadi 7 : 3, sama dengan perbandingan tiang pertama. Jadi jawabannya benar.</p>`,
  },
  {
    n: 24,
    text: "Sebuah tanah kosong yang berbentuk persegi dengan ukuran lebar 50 m dan panjang 120 m akan dibagi dua dengan sebuah garis diagonal yang membagi kebun tersebut menjadi dua lahan yang sama besar. Jika salah satu lahan kebun ingin dikelilingi dengan pagar, panjang pagar yang diperlukan untuk mengelilingi satu lahan tersebut adalah .... m.",
    options: ["300", "200", "180", "170", "350"],
    answer: "A",
    explainImage: "img/s24-p.png",
    explain: `
<p><b>Langkah 1 – Bayangkan bentuknya.</b> Tanah berbentuk persegi panjang 120 m × 50 m. Bila dipotong lurus dari pojok ke pojok (diagonal), terbentuk dua segitiga yang sama besar. Satu segitiga itulah satu lahan yang akan dipagari.</p>
<p><b>Langkah 2 – Tentukan sisi-sisi satu lahan.</b> Satu lahan (segitiga) punya tiga sisi: lebar 50 m, panjang 120 m, dan sisi miring (diagonal) yang belum diketahui. Pagar harus mengelilingi ketiga sisi itu.</p>
<p><b>Langkah 3 – Hitung panjang diagonal.</b> Segitiganya bersudut siku-siku, jadi pakai rumus Pythagoras: diagonal = √(50² + 120²) = √(2.500 + 14.400) = √16.900 = 130 m. Cara cepat: perbandingan 50 : 120 sama dengan 5 : 12, dan pasangan ini selalu memiliki sisi miring 13 (tiga bilangan 5-12-13). Dikali 10 menjadi 50-120-130.</p>
<p><b>Langkah 4 – Jumlahkan ketiga sisi.</b> Panjang pagar = 50 + 120 + 130 = <b>300 m</b>.</p>
<p class="key">Tips: yang dipagari hanya satu lahan (satu segitiga), bukan seluruh tanah. Kalau seluruh tanah yang dipagari, panjangnya 2 × (50 + 120) = 340 m, dan itu bukan jawaban soal ini.</p>`,
  },
  {
    n: 25,
    text: "Jika diketahui nilai dari A + B + C = 6, maka dengan logika yang sama, nilai dari H + K + L =",
    options: ["17", "24", "25", "10", "31"],
    answer: "E",
    explain: `
<p><b>Langkah 1 – Temukan pola.</b> Soal memberi petunjuk A + B + C = 6. Jika setiap huruf diganti dengan nomor urutnya dalam abjad, A = 1, B = 2, C = 3, maka 1 + 2 + 3 = 6. Cocok, berarti polanya benar: <b>setiap huruf bernilai sama dengan nomor urutnya dalam abjad</b>.</p>
<p><b>Langkah 2 – Tulis nomor urut huruf yang dibutuhkan.</b> Hitung dari A:</p>
<table>
<tr><th>Huruf</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</th><th>K</th><th>L</th></tr>
<tr><th>Nomor</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td class="hl">8</td><td>9</td><td>10</td><td class="hl">11</td><td class="hl">12</td></tr>
</table>
<p><b>Langkah 3 – Jumlahkan.</b> H = 8, K = 11, L = 12. Maka H + K + L = 8 + 11 + 12 = <b>31</b>.</p>`,
  },
];

export const TOTAL = QUESTIONS.length;
export const LETTERS = ["A", "B", "C", "D", "E"];

// Versi untuk siswa: tanpa kunci dan tanpa pembahasan.
export function publicQuestions() {
  return QUESTIONS.map((q) => ({
    n: q.n,
    text: q.text,
    image: q.image || null,
    options: q.options,
  }));
}
