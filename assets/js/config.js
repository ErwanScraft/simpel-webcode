export const CONFIG = {
    debounceTime: 400,
    suggestions: {
        html: [
            { name: "div", desc: "Kontainer blok generik (Flow Content)", isVoid: false },
            { name: "span", desc: "Kontainer inline generik (Phrasing Content)", isVoid: false },
            { name: "h1", desc: "Heading tingkat utama", isVoid: false },
            { name: "p", desc: "Paragraf teks", isVoid: false },
            { name: "a", desc: "Hyperlink ke halaman lain (Anchor)", isVoid: false, template: '<a href=""></a>', offset: 9 },
            { name: "img", desc: "Embedded Image (Void element)", isVoid: true, template: '<img src="" alt="">' },
            { name: "button", desc: "Elemen interaktif pemicu aksi", isVoid: false },
            { name: "input", desc: "Field input data pengguna (Void element)", isVoid: true, template: '<input type="text">' },
            { name: "ul", desc: "Unordered List (Daftar poin)", isVoid: false },
            { name: "li", desc: "List Item", isVoid: false },
            { name: "section", desc: "Bagian generik dari dokumen", isVoid: false },
            { name: "br", desc: "Line Break (Pindah baris)", isVoid: true },
            { name: "hr", desc: "Thematic Break (Garis horizontal)", isVoid: true }
        ],
        css: [
            { name: "display: flex;", desc: "Mengaktifkan layout Flexbox" },
            { name: "grid-template-columns:", desc: "Definisi kolom CSS Grid" },
            { name: "color:", desc: "Menentukan warna teks" },
            { name: "background-color:", desc: "Menentukan warna latar belakang" },
            { name: "border-radius:", desc: "Membuat sudut elemen melengkung" }
        ],
        js: [
            { name: "addEventListener", desc: "Menambahkan event handler ke target" },
            { name: "querySelector", desc: "Mengambil elemen pertama berdasarkan selector CSS" },
            { name: "forEach", desc: "Melakukan iterasi pada setiap elemen array" }
        ]
    }
};

export const STATE = { timeout: null, previewMode: "desktop" };

export const id = x => document.getElementById(x);

export const DOM = {
    inputs: { html: id("in-html"), css: id("in-css"), js: id("in-js") },
    highlights: { html: id("hl-html"), css: id("hl-css"), js: id("hl-js") },
    lines: { html: id("lines-html"), css: id("lines-css"), js: id("lines-js") },
    frame: id("output-frame")
};

export const STORAGE = {
    save: (lang, code) => {
        localStorage.setItem(`code_${lang}`, code);
    },
    load: (lang) => {
        return localStorage.getItem(`code_${lang}`) || "";
    }
};

