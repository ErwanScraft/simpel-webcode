import { DOM, id, STORAGE} from "./config.js";
import { initThemeSystem } from "./theme.js";
import { updateEditor, showSuggestions } from "./editor.js";
import { initResizer, setupUIEvents, setPreviewMode } from "./ui.js";

function setupInputListeners() {
    ["html", "css", "js"].forEach(lang => {
        const input = DOM.inputs[lang];
        input.addEventListener("input", () => {
            updateEditor(lang);
            showSuggestions(lang, input);
        });
        input.addEventListener("click", () => {
            id("suggestion-box").style.display = "none";
        });
        input.addEventListener("input", () => updateEditor(lang));
        input.addEventListener("scroll", () => {
            DOM.highlights[lang].scrollTop = input.scrollTop;
            DOM.highlights[lang].scrollLeft = input.scrollLeft;
            DOM.lines[lang].scrollTop = input.scrollTop;
        });
        input.addEventListener("keydown", e => {
            if (e.key === "Tab") {
                e.preventDefault();
                const start = input.selectionStart;
                input.value =
                    input.value.substring(0, start) +
                    "    " +
                    input.value.substring(input.selectionEnd);
                input.selectionStart = input.selectionEnd = start + 4;
                updateEditor(lang);
            }
        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    initThemeSystem();
    setupInputListeners();
    initResizer();
    setupUIEvents();
    setPreviewMode();

    const defaultBtn =
        document.querySelector(".btn-view.active") ||
        document.querySelector(".btn-view");
    setPreviewMode("desktop", defaultBtn);

    ["html", "css", "js"].forEach(lang => {
        const savedCode = STORAGE.load(lang);
        if (savedCode) {
            DOM.inputs[lang].value = savedCode;
        }
        updateEditor(lang);
    });

    // Initial Run
    updateEditor("html");
    updateEditor("css");
    updateEditor("js");
});
