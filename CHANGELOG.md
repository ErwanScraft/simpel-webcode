# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.5.1 (2026-02-08)

## [0.1.1] - 2026-02-07

### Diubah
- Dokumentasi: Penulisan ulang dan perluasan README.md untuk memberikan panduan yang bersih, modern, dan jelas bagi pengguna dan kontributor.
  - Menambahkan gambaran proyek, daftar fitur, tautan demo, instruksi cepat (quickstart) termasuk cara menjalankan server lokal, tips penggunaan, struktur proyek, catatan teknis, pertimbangan keamanan & privasi, panduan kontribusi, roadmap, serta informasi lisensi.
  - Menyertakan badge untuk License dan Demo.
  - Menjelaskan penggunaan module ES dan kebutuhan untuk menjalankan file lewat HTTP(S).
  - Menambahkan rekomendasi peningkatan (menggunakan library editor, fitur export/import, dan penggunaan CI).
- Metadata repositori: README.md diperbarui dan di-commit.

### Ditambahkan
- README.md diperluas — menyediakan instruksi penggunaan, catatan teknis, dan panduan kontribusi.
- CHANGELOG.md dibuat dan diterjemahkan ke Bahasa Indonesia.

### Diperbaiki
- N/A

---

## [0.1.0] - 2026-02-07

### Ditambahkan
- Rilis awal publik (front-end static live editor):  
  - index.html — UI utama (panel editor, iframe preview, pengaturan, resizer)  
  - style.css — styling, variabel tema, layout editor, style suggestion popup  
  - assets/js/  
    - main.js — entry, inisialisasi event, handler input, inisialisasi penyimpanan  
    - config.js — konfigurasi, helper DOM, definisi suggestion, wrapper localStorage  
    - editor.js — highlighting sederhana (berbasis regex), penomoran baris, logika suggestion dan pemasukan template  
    - preview.js — (menjalankan preview dan mengisi konten iframe yang ter-sandbox)  
    - ui.js — penanganan event UI, resizer, pergantian tab  
    - theme.js — manajemen tema  
  - LICENSE — Apache-2.0  
  - README.md (awal, minimal)  

### Diubah
- N/A

### Diperbaiki
- N/A

---

Catatan
- Highlighting dan suggestion diimplementasikan dengan regex sederhana dan logika di sisi klien; cocok untuk demo tetapi memiliki keterbatasan pada kasus kompleks (mis. string multiline atau struktur bersarang). Untuk kebutuhan produksi dan pengalaman editing yang lebih baik, pertimbangkan integrasi dengan library editor seperti CodeMirror atau Monaco.
- Preview berjalan di dalam iframe yang dibatasi (sandbox="allow-scripts allow-modals"). Meskipun sandbox membantu isolasi, opsi "allow-scripts" tetap mengizinkan eksekusi JavaScript di dalam iframe — hindari menjalankan kode dari sumber yang tidak dipercaya jika keamanan menjadi perhatian.
- README telah diperluas untuk memperbaiki onboarding dan dokumentasi untuk kontributor; pembaruan ini bersifat dokumentasi dan tidak mengubah fungsionalitas front-end.