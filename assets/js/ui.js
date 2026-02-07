import { DOM, STATE, id } from "./config.js";

/**
 * Menginisialisasi logika resizer untuk mengatur tinggi preview vs editor
 */
export function initResizer() {
    const handle = id("drag-handle");
    const previewSec = document.querySelector(".preview-section");
    const frame = id("output-frame");

    const onDrag = e => {
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const pct = (clientY / window.innerHeight) * 100;

        // Batasi agar tidak terlalu ke atas atau ke bawah
        if (pct > 10 && pct < 90) {
            previewSec.style.height = `${pct}%`;
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
 * Mengatur skala preview agar pas dengan layar (khusus mode desktop)
 */
export function resizePreview() {
    if (STATE.previewMode === "desktop") {
        const wrapper = document.querySelector(".preview-wrapper");
        const scale = Math.min(
            (wrapper.offsetWidth - 20) / 1280,
            (wrapper.offsetHeight - 20) / 800,
            1
        );
        DOM.frame.style.transform = `scale(${scale})`;
    } else {
        DOM.frame.style.transform = "none";
    }
}

/**
 * Logika perpindahan tab (HTML, CSS, JS)
 */
export function switchTab(lang, btn) {
    document
        .querySelectorAll(".tab-btn")
        .forEach(b => b.classList.remove("active"));
    document
        .querySelectorAll(".editor-layer")
        .forEach(l => l.classList.remove("active"));

    btn.classList.add("active");
    id(`editor-${lang}`).classList.add("active");
}

/**
 * Mengatur mode tampilan preview (Desktop atau Mobile)
 */
export function setPreviewMode(mode = "desktop", btn) {
    // Beri default mode
    STATE.previewMode = mode;
    document
        .querySelectorAll(".btn-view")
        .forEach(b => b.classList.remove("active"));

    // PERBAIKAN: Gunakan optional chaining atau pengecekan if
    if (btn) {
        btn.classList.add("active");
    }

    if (DOM.frame) {
        DOM.frame.className = mode;
    }

    resizePreview();
}

/**
 * Setup event listeners untuk tombol-tombol UI di index.html
 */
export function setupUIEvents() {
    // Tab switching

    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            // Jika yang diklik adalah tombol gerigi, kita tangani terpisah atau beri id khusus
            if (btn.id === "btn-settings") {
                switchTab("settings", btn);
            } else {
                const lang = e.target.innerText.toLowerCase();
                switchTab(lang, e.target);
            }
        });
    });

    // View mode switching
    document.querySelectorAll(".btn-view").forEach(btn => {
        btn.addEventListener("click", e => {
            const mode = e.target.innerText.toLowerCase();
            setPreviewMode(mode, e.target);
        });
    });

    // Resize listener
    window.addEventListener("resize", resizePreview);
}
