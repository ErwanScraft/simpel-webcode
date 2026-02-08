import { DOM, STATE, STORAGE, id } from "./config.js";
import { setZoom, resizePreview } from "./preview.js";
import { handleToolbarAction, moveCursor } from "./toolbar.js";
import { updateTabSize } from "./editor.js";

/**
 * RESIZER LOGIC
 * Mengatur drag handle untuk fleksibilitas tinggi editor vs preview
 */
export function initResizer() {
    const handle = id("drag-handle");
    const previewSec = document.querySelector(".preview-section");
    const frame = id("output-frame");

    const onDrag = e => {
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const pct = (clientY / window.innerHeight) * 100;

        if (pct > 10 && pct < 90) {
            previewSec.style.height = `${pct}%`;
            // Pastikan preview menyesuaikan skala saat container berubah
            resizePreview();
        }
    };

    const stop = () => {
        frame.style.pointerEvents = "auto";
        window.removeEventListener("mousemove", onDrag);
        window.removeEventListener("touchmove", onDrag);
    };

    handle.addEventListener("mousedown", () => {
        frame.style.pointerEvents = "none";
        window.addEventListener("mousemove", onDrag);
        window.addEventListener("mouseup", stop);
    });

    handle.addEventListener(
        "touchstart",
        e => {
            frame.style.pointerEvents = "none";
            window.addEventListener("touchmove", onDrag, { passive: false });
            window.addEventListener("touchend", stop);
        },
        { passive: false }
    );
}

/**
 * TAB MANAGEMENT
 */
export function switchTab(lang, btn) {
    document
        .querySelectorAll(".tab-btn")
        .forEach(b => b.classList.remove("active"));
    document
        .querySelectorAll(".editor-layer")
        .forEach(layer => layer.classList.remove("active"));

    btn.classList.add("active");
    const targetLayer = id(`editor-${lang}`);
    if (targetLayer) targetLayer.classList.add("active");
}

/**
 * PREVIEW MODE CONTROL
 */
export function setPreviewMode(mode = "desktop") {
    STATE.previewMode = mode;

    if (DOM.frame) {
        DOM.frame.className = mode;
        resizePreview();
    }
}

function applyToolbarStatus(isVisible) {
    if (isVisible) {
        document.body.classList.remove("hide-toolbar");
    } else {
        document.body.classList.add("hide-toolbar");
    }
}

/**
 * UI EVENT BINDING
 */
export function setupUIEvents() {
    // Tab Navigation
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const lang =
                btn.id === "btn-settings"
                    ? "settings"
                    : btn.innerText.toLowerCase();
            switchTab(lang, btn);
        });
    });

    // Zoom Controls
    const zoomSlider = id("zoom-slider");
    zoomSlider?.addEventListener("input", e => {
        const value = parseInt(e.target.value);
        setZoom(value);
    });

    // View Mode Controls (Desktop/Mobile)
    const viewSelector = id("view-selector");
    if (viewSelector) {
        viewSelector.addEventListener("change", e => {
            const mode = e.target.value;
            setPreviewMode(mode);
        });
    }

    document.addEventListener("click", e => {
        const btn = e.target.closest(".tool-btn, .key-item");
        const popup = document.getElementById("key-popup");

        if (!btn) {
            // Tutup popup jika klik di luar area toolbar
            if (popup && popup.classList.contains("show")) {
                popup.classList.remove("show");
            }
            return;
        }

        // Cegah event mengalir ke document yang bisa menutup popup seketika
        e.stopPropagation();

        const action = btn.getAttribute("data-action");

        if (["up", "down", "left", "right"].includes(action)) {
            moveCursor(action);
        } else {
            handleToolbarAction(action, btn);
        }
    });

    const tabSelector = id("tab-selector");
    if (tabSelector) {
        // Set nilai awal dari storage
        tabSelector.value = STORAGE.loadTabSize();

        tabSelector.addEventListener("change", e => {
            const newSize = e.target.value;
            updateTabSize(newSize);
            STORAGE.saveTabSize(newSize);
        });
    }

    // Toolbar Toggle Logic
    const toolbarToggle = id("toolbar-toggle");
    if (toolbarToggle) {
        // Load status awal
        const isVisible = STORAGE.loadToolbarStatus();
        toolbarToggle.checked = isVisible;
        applyToolbarStatus(isVisible);

        toolbarToggle.addEventListener("change", e => {
            const status = e.target.checked;
            applyToolbarStatus(status);
            STORAGE.saveToolbarStatus(status);
        });
    }
}
