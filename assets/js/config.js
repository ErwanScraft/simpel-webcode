/**
 * APP CONFIGURATION
 */
export const CONFIG = {
    debounceTime: 400,
    defaultTabSize: "2",
    defaultToolbarVisible: true
};

/**
 * APP STATE
 */
export const STATE = { 
    timeout: null,
    previewMode: "desktop" 
};

/**
 * DOM HELPERS & REFERENCES
 */
export const id = x => document.getElementById(x);

export const DOM = {
    containers: {
        html: id("editor-html"),
        css: id("editor-css"),
        js: id("editor-js")
    },
    frame: id("output-frame")
};

/**
 * EDITOR INSTANCES
 * Inisialisasi melalui createEditor() di editor.js
 */
export const EDITORS = {
    html: null,
    css: null,
    js: null
};

/**
 * PERSISTENCE LAYER (LocalStorage)
 */
export const STORAGE = {
    save: (lang, code) => {
        localStorage.setItem(`code_${lang}`, code);
    },
    load: (lang) => {
        return localStorage.getItem(`code_${lang}`) || "";
    },
    saveTheme: (theme) => {
        localStorage.setItem("preferred-theme", theme);
    },
    loadTheme: () => {
        return localStorage.getItem("preferred-theme") || "vs-dark";
    },
    saveTabSize: (size) => {
        localStorage.setItem("tab-size", size);
    },
    loadTabSize: () => {
        return localStorage.getItem("tab-size") || CONFIG.defaultTabSize;
    },
    saveToolbarStatus: (visible) => {
        localStorage.setItem("toolbar-visible", visible);
    },
    loadToolbarStatus: () => {
        const saved = localStorage.getItem("toolbar-visible");
        return saved !== null ? saved === "true" : CONFIG.defaultToolbarVisible;
    }
};
