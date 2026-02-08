import { DOM, STORAGE, id } from "./modules/config.js";
import { initThemeSystem } from "./modules/theme.js";
import { createEditor } from "./modules/editor.js";
import { initResizer, setupUIEvents, setPreviewMode } from "./modules/ui.js";
import { runPreview } from "./modules/preview.js";
import { handleToolbarAction } from "./modules/toolbar.js";

/**
 * APP INITIALIZATION
 * Titik masuk utama untuk menjalankan seluruh sistem editor
 */
async function initApp() {
    try {
        // 1. Load Theme System
        await initThemeSystem();

        // 2. Initialize Editors
        createEditor("html", DOM.containers.html);
        createEditor("css", DOM.containers.css);
        createEditor("js", DOM.containers.js);

        // 3. Setup UI Components & Events
        initResizer();
        setupUIEvents();

        // 4. Set Default View State
        const viewSelector = id("view-selector");
        if (viewSelector) {
            viewSelector.value = "desktop";
            setPreviewMode("desktop");
        }

        // 5. Initial Render
        setTimeout(runPreview, 100);

        console.log("Application initialized successfully");
    } catch (error) {
        console.error("Initialization failed:", error);
    }

    const toolbarVisible = STORAGE.loadToolbarStatus();
    if (!toolbarVisible) document.body.classList.add("hide-toolbar");
}

// Global Error Handling untuk Preview Frame
window.addEventListener("error", e => {
    if (e.target.tagName === "IFRAME") {
        console.warn("Preview rendering error detected.");
    }
});

// Bootstrap Application
window.addEventListener("DOMContentLoaded", initApp);
