# Praktikum 3
| NRP | Nama    | 
| ----- | -------- | 
|5025241073    | Nabilah Bunga Sulistia | 
|5025241086    | Callista Fidelya Roba Gultom | 

## 1. Pendahuluan

Program ini merupakan sebuah aplikasi berbasis web yang dirancang untuk
mensimulasikan mekanisme kerja mesin Pushdown Automata (PDA). Fokus utama dari
simulator ini adalah untuk melakukan proses validasi terhadap untai (string)
yang tergolong dalam bahasa bebas konteks (Context-Free Language) dengan notasi
matematis L = {aⁿ bⁿ | n ≥ 1}.

Implementasi : [Praktikum 3](https://callyey.github.io/Praktikum-3-Otomata/)

## 2. Definisi Formal Komponen PDA

Mesin yang diimplementasikan dalam kode program ini didefinisikan secara formal
melalui 7-tuple sebagai berikut:

  - Q (Himpunan State): \{q_0, q_1, q_2, q_3\}
  - Σ (Alfabet Input): \{a, b\}
  - Γ (Alfabet Stack): \{Z, A\}
  - δ (Fungsi Transisi): Didefinisikan dalam logika percabangan program.
  - q0 (State Awal): q_0
  - Z0 (Simbol Awal Stack): Z
  - F (State Penerima): \{q_3\}

## 3. Penjelasan Struktur Kode Program

### 3.1. Struktur Antarmuka (HTML & CSS)

    Arsitektur antarmuka dibangun menggunakan HTML5 untuk menentukan elemen
    struktural dan CSS3 untuk pengaturan tata letak. Penggunaan metode flexbox
    memastikan bahwa elemen konfigurasi dan elemen pengujian string tersaji secara
    paralel. Sistem pewarnaan digunakan sebagai indikator status validasi: warna
    hijau melambangkan diterimanya untai (Accepted), sedangkan warna merah
    melambangkan penolakan untai (Rejected).

### 3.2. Logika Mesin (JavaScript)

    Logika pemrosesan string diimplementasikan dalam berkas script.js dengan urutan
    operasional sebagai berikut:

    1.  Inisialisasi: Program menetapkan state awal pada q_0 dan memasukkan simbol Z
        ke dalam struktur data stack.
    2.  Proses Push (State q0 dan q1):
        - Saat mesin membaca karakter 'a', program akan memasukkan simbol 'A' ke
            dalam stack.
        - Transisi ini merepresentasikan perhitungan jumlah kemunculan n pada
            simbol a.
    3.  Proses Pop (State q1 dan q2):
        - Saat mesin mulai membaca karakter 'b', program akan melakukan operasi
            pop (mengeluarkan) simbol 'A' dari stack.
        - Hal ini bertujuan untuk mencocokkan setiap karakter 'b' dengan karakter
            'a' yang telah disimpan sebelumnya.
    4.  Verifikasi Akhir (Final State q3):
        - Mesin dinyatakan menerima untai jika dan hanya jika seluruh input telah
            terbaca, stack hanya menyisakan simbol awal Z, dan state akhir yang
            dicapai adalah q_3.
        - Jika input habis sebelum stack kosong, atau stack kosong sebelum input
            habis, maka mesin secara otomatis menolak untai tersebut.

## 4. Instruksi Pengoperasian

### 4.1. Persiapan Lokal

    1.  Pastikan seluruh berkas (index.html, style.css, dan script.js) berada dalam
        satu direktori yang sama.
    2.  Jalankan berkas index.html menggunakan peramban web (browser) seperti Google
        Chrome, Mozilla Firefox, atau Microsoft Edge.

    4.2. Prosedur Pengujian

    1.  Masukkan untai yang ingin diuji pada kolom "Masukkan string".
    2.  Klik tombol "CEK VALIDASI".
    3.  Perhatikan area "URUTAN TRANSISI" untuk melihat detail langkah demi langkah
        perubahan state dan kondisi stack.
    4.  Hasil akhir akan ditampilkan pada banner status di bagian tengah layar.

## 5. Contoh Kasus Uji

| Input | Hasil    | Analisis                                             |
| ----- | -------- | ---------------------------------------------------- |
| ab    | DITERIMA | Jumlah 'a' dan 'b' seimbang (n=1).                   |
| aabb  | DITERIMA | Jumlah 'a' dan 'b' seimbang (n=2).                   |
| aaabb | DITOLAK  | Jumlah 'a' lebih banyak dari 'b'.                    |
| aabbb | DITOLAK  | Jumlah 'b' lebih banyak dari 'a'.                    |
| ba    | DITOLAK  | Urutan karakter tidak sesuai dengan definisi bahasa. |
