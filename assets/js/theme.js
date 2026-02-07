import { id } from './config.js';

let THEMES_DATA = {};

export async function initThemeSystem() {
    try {
        const response = await fetch('addon/syntax/themes.json');
        THEMES_DATA = await response.json();

        const selector = id("theme-selector");
        selector.innerHTML = Object.keys(THEMES_DATA).map(key => 
            `<option value="${key}">${THEMES_DATA[key].name}</option>`
        ).join("");

        const savedTheme = localStorage.getItem("preferred-theme") || "vs-dark";
        selector.value = savedTheme;
        applyTheme(savedTheme);
        
        selector.addEventListener('change', (e) => applyTheme(e.target.value));
    } catch (err) {
        console.error("Gagal memuat tema:", err);
    }
}

export function applyTheme(themeKey) {
    const theme = THEMES_DATA[themeKey];
    if (!theme) return;
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
    localStorage.setItem("preferred-theme", themeKey);
}
