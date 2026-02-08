import { id, STORAGE } from "./config.js";
import { updateEditorTheme } from './editor.js';

let THEMES_DATA = {};

/**
 * THEME INITIALIZATION
 * Memuat konfigurasi dari JSON dan menyiapkan UI selector
 */
export async function initThemeSystem() {
    try {
        const response = await fetch("addon/syntax/themes.json");
        if (!response.ok) throw new Error("File themes.json tidak ditemukan");

        THEMES_DATA = await response.json();

        const selector = id("theme-selector");
        if (!selector) return;

        // Generate options dari key JSON
        selector.innerHTML = Object.keys(THEMES_DATA)
            .map(key => `<option value="${key}">${THEMES_DATA[key].name}</option>`)
            .join("");

        const savedTheme = STORAGE.loadTheme();
        selector.value = savedTheme;

        applyTheme(savedTheme);

        selector.addEventListener("change", e => applyTheme(e.target.value));
    } catch (err) {
        console.error("Gagal memuat sistem tema:", err);
        document.documentElement.setAttribute("data-theme", "default");
    }
}

/**
 * THEME APPLICATION
 * Mengonversi properti JSON menjadi CSS Variables dan update editor
 */
export function applyTheme(themeKey) {
    const theme = THEMES_DATA[themeKey];
    if (!theme) return;

    const root = document.documentElement;
    
    // Inject warna ke CSS Variables
    Object.entries(theme.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });

    // Sinkronisasi dengan tema CodeMirror
    const isDark = !themeKey.toLowerCase().includes("light");
    updateEditorTheme(isDark);

    STORAGE.saveTheme(themeKey);
}
