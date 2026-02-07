import { getCode } from "./editor.js";
import { DOM, STATE } from "./config.js";

let zoomFactor = 1.0;

/**
 * CORE PREVIEW RENDERING
 */
export function runPreview() {
    const userHTML = getCode("html");
    const userCSS = getCode("css");
    const userJS = getCode("js");

    // Bersihkan tag eksternal agar tidak terjadi duplikasi
    const cleanHTML = userHTML
        .replace(/<link[^>]*href=["']style\.css["'][^>]*>/gi, "")
        .replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/gi, "");

    const hasHtmlTag = /<html/i.test(cleanHTML);

    let finalContent = hasHtmlTag
        ? cleanHTML
        : `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { margin: 0; font-family: sans-serif; color: #333; }
                ${userCSS}
            </style>
        </head>
        <body>
            ${cleanHTML}
            <script>
                try {
                    ${userJS}
                } catch (e) {
                    console.error("JS Error: ", e.message);
                }
            <\/script>
        </body>
        </html>`;

    // Inject CSS/JS jika user menulis struktur HTML lengkap
    if (hasHtmlTag) {
        if (userCSS) finalContent = finalContent.replace(/<\/head>/i, `<style>${userCSS}</style></head>`);
        if (userJS) finalContent = finalContent.replace(/<\/body>/i, `<script>${userJS}<\/script></body>`);
    }

    if (DOM.frame) {
        DOM.frame.srcdoc = finalContent;
        requestAnimationFrame(resizePreview);
    }
}

/**
 * RESPONSIVE & ZOOM ENGINE
 */
export function resizePreview() {
    const wrapper = document.querySelector(".preview-wrapper");
    const zoomDisplay = document.getElementById("zoom-level");
    
    if (!wrapper || !DOM.frame) return;

    const isMobile = STATE.previewMode === "mobile";
    const targetWidth = isMobile ? 430 : 1280;
    const targetHeight = isMobile ? 932 : 800;

    const padding = 60;
    let baseScale = Math.min(
        (wrapper.offsetWidth - padding) / targetWidth,
        (wrapper.offsetHeight - padding) / targetHeight
    );

    if (baseScale > 1) baseScale = 1;
    const finalScale = baseScale * zoomFactor;

    DOM.frame.style.transformOrigin = "center center";
    DOM.frame.style.transform = `scale(${finalScale})`;

    if (zoomDisplay) {
        zoomDisplay.innerText = `${Math.round(zoomFactor * 100)}%`;
    }
}

export function changeZoom(delta) {
    const newZoom = zoomFactor + delta;
    if (newZoom >= 0.25 && newZoom <= 2.0) {
        zoomFactor = newZoom;
        resizePreview();
    }
}

window.addEventListener("resize", resizePreview);
