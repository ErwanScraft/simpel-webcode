# simpel-webcode

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE) [![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-brightgreen)](https://erwanscraft.github.io/simpel-webcode)

Deskripsi

simpel-webcode adalah editor kode front-end ringan untuk eksperimen cepat HTML, CSS, dan JavaScript dengan tampilan Live Preview.

Fitur utama

- Editor tiga panel: HTML / CSS / JS
- Live preview terisolasi via iframe (sandbox="allow-scripts allow-modals")
- Syntax highlighting sederhana (regex-based)
- Gutter / nomor baris yang disinkronkan
- Autocomplete / suggestion dasar dengan template untuk beberapa tag HTML
- Penyimpanan lokal menggunakan localStorage
- Mode preview Desktop / Mobile dan resizer antar panel
- Sistem tema dan pengaturan editor (tersedia di UI)

Demo

Jika GitHub Pages diaktifkan untuk repo ini, demo dapat diakses di:

https://erwanscraft.github.io/simpel-webcode

Mulai cepat

1. Clone repository:

   git clone https://github.com/ErwanScraft/simpel-webcode.git
   cd simpel-webcode

2. Buka langsung (opsional):
   - Anda bisa membuka index.html langsung di browser, namun beberapa browser membatasi import module lewat file://.

3. Disarankan jalankan server lokal:

   - Python 3:
     python -m http.server 8000
     lalu buka http://localhost:8000

   - Node (http-server):
     npm install -g http-server
     http-server -c-1

   - VS Code (Live Server): klik "Go Live"

Cara pakai singkat

- Ketik kode pada tab HTML / CSS / JS; preview akan terupdate otomatis (debounce ~400ms).
- Gunakan tombol "Desktop" / "Mobile" untuk mengubah ukuran preview.
- Klik ⚙️ untuk membuka pengaturan tema/editor.
- Saat mengetik, suggestion box akan menawarkan snippet/tag; klik untuk menyisipkan.

Struktur proyek

- index.html — UI utama
- style.css — gaya & tema
- assets/js/
  - main.js — entry point dan inisialisasi
  - config.js — konfigurasi, helper DOM, localStorage wrapper
  - editor.js — highlighter, line numbers, suggestion handling
  - preview.js — (mengatur isi iframe preview)
  - ui.js — (event UI, resizer, tab switching)
  - theme.js — (sistem tema)
- README.md, LICENSE

Catatan teknis

- Highlighting saat ini menggunakan regex sederhana — baik untuk demo, tetapi rentan terhadap edge-case (string multiline, nested structures). Untuk kebutuhan editing lebih lengkap, pertimbangkan menggunakan CodeMirror, Monaco, atau Prism.
- Script menggunakan module ES (type="module"). Jalankan lewat HTTP(S) agar imports berjalan lancar.
- Proyek ini bersifat statis — tidak ada package.json atau build pipeline.

Keamanan & privasi

- Iframe menggunakan sandbox namun masih mengizinkan eksekusi skrip (allow-scripts) — jangan jalankan kode yang tidak dipercaya.
- Kode disimpan di localStorage pengguna dan tidak dikirim ke server secara default.
- Untuk isolasi lebih kuat, pertimbangkan menjalankan preview di origin terpisah atau menghapus izin allow-scripts dan menyediakan metode render yang lebih aman.

Kontribusi

- Pull request & issue diterima. Panduan singkat:
  1. Buat branch fitur: git checkout -b feat/nama-fitur
  2. Commit perubahan dengan pesan jelas
  3. Buka PR ke branch main dengan deskripsi dan langkah reproduksi (jika bug)

Roadmap singkat (opsional)

- Ganti highlighter regex dengan library editor yang lebih canggih (CodeMirror / Monaco).
- Tambah fitur export/import (ZIP, permalink, Gist).
- Tambah undo/redo, search/replace, dan testing unit kecil.
- CI: tambah GitHub Actions untuk linting dan deploy otomatis ke GitHub Pages.

License

Apache License 2.0 — lihat file LICENSE untuk keterangan lengkap.

Contact

ErwanScraft — https://github.com/ErwanScraft