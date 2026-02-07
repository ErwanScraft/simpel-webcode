# simpel-webcode

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE) [![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-brightgreen)](https://erwanscraft.github.io/simpel-webcode)

simpel-webcode — editor kode front-end ringan untuk eksperimen cepat HTML / CSS / JS dengan Live Preview yang responsif dan ringan.

Ringkasan
- Editor tiga-panel (HTML / CSS / JS) dengan:
  - Live preview di iframe (sandboxed)
  - Syntax highlighting ringan
  - Line numbers / gutter yang disinkronkan
  - Autocomplete / suggestion dasar (template untuk tag tertentu)
  - Persistensi ke localStorage
  - Mode preview Desktop / Mobile dan resizer antar panel

Pembaharuan terbaru (0.1.1 — 2026-02-07)
- Dokumentasi: README direvisi penuh — kini berisi:
  - Panduan cepat (quickstart) untuk menjalankan lokal / demo
  - Penjelasan fitur, struktur proyek, dan catatan teknis
  - Rekomendasi peningkatan (editor library, export/import, CI)
  - Peringatan keamanan & privasi mengenai iframe dan localStorage
- CHANGELOG.md ditambahkan untuk melacak versi dan perubahan.

Fitur utama
- Live preview di iframe dengan sandbox="allow-scripts allow-modals"
- Highlighting berbasis regex untuk demo cepat
- Autocomplete dengan template untuk tag HTML (img, a, input, dll.)
- Penyimpanan otomatis ke localStorage
- Pilihan tema & pengaturan editor (UI tersedia)
- Static-first: tidak ada build tool; mudah deploy ke GitHub Pages

Demo
- Jika GitHub Pages aktif: https://erwanscraft.github.io/simpel-webcode

Mulai cepat
1. Clone repo
   git clone https://github.com/ErwanScraft/simpel-webcode.git
   cd simpel-webcode

2. Jalankan server lokal (disarankan, karena module ES)
   - Python 3:
     python -m http.server 8000
     buka http://localhost:8000
   - Node (http-server):
     npm install -g http-server
     http-server -c-1

3. Buka index.html lewat server di browser.

Penggunaan singkat
- Tulis kode di tab HTML/CSS/JS — preview otomatis (debounce ~400ms).
- Gunakan tombol Desktop/Mobile untuk mengubah ukuran preview.
- Klik ⚙️ untuk membuka pengaturan tema/editor.
- Suggestion muncul saat mengetik; klik untuk memasukkan snippet.

Struktur proyek
- index.html
- style.css
- assets/js/
  - main.js, config.js, editor.js, preview.js, ui.js, theme.js
- LICENSE (Apache-2.0)
- CHANGELOG.md

Catatan teknis & rekomendasi
- Highlighting berbasis regex: cukup untuk demo, tapi rentan edge-case. Untuk pengalaman editing lebih baik gunakan CodeMirror / Monaco / Prism.
- Module ES: script menggunakan type="module"; jalankan lewat HTTP(S).
- Security: sandbox membantu tapi allow-scripts mengizinkan eksekusi JS di iframe — hati-hati terhadap kode tak dipercaya.
- Penyimpanan: localStorage menyimpan data hanya di browser pengguna.

Kontribusi
- Buat branch fitur, sertakan deskripsi perubahan, buka PR ke main.
- Lihat CHANGELOG.md untuk versi & riwayat perubahan.

Lisensi
- Apache License 2.0 — lihat file LICENSE

Kontak
- ErwanScraft — https://github.com/ErwanScraft