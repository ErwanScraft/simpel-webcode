import { DOM, STATE, id } from "./config.js";
import { setZoom, resizePreview } from "./preview.js";

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
}
