import { EDITORS, STORAGE } from "./config.js";
import {
    undo,
    redo,
    selectAll,
    indentMore
} from "https://esm.sh/@codemirror/commands";

let isCtrlActive = false;
let isShiftActive = false;

export function handleToolbarAction(action, btn) {
    const activeLayer = document.querySelector(".editor-layer.active");
    if (!activeLayer) return;

    const lang = activeLayer.id.replace("editor-", "");
    const view = EDITORS[lang];
    if (!view) return;

    // Jangan paksa focus jika hanya menekan CTRL/SHIFT agar keyboard HP tidak naik-turun
    if (!["ctrl", "shift", "toggle-popup"].includes(action)) {
        view.focus();
    }

    switch (action) {
        case "ctrl":
            isCtrlActive = !isCtrlActive;
            btn.classList.toggle("active-ctrl", isCtrlActive);
            break;
        case "shift":
            isShiftActive = !isShiftActive;
            btn.classList.toggle("active-shift", isShiftActive);
            break;
        case "toggle-popup":
            const popup = document.getElementById("key-popup");
            popup.classList.toggle("show");
            break;
        case "undo":
            undo(view);
            break;
        case "redo":
            redo(view);
            break;
        case "tab":
            const currentTabSize = parseInt(STORAGE.loadTabSize());
            view.dispatch(
                view.state.replaceSelection(" ".repeat(currentTabSize))
            );
            break;
        default:
            if (action.startsWith("key-")) {
                handleKeyInput(view, action.replace("key-", ""));
            }
    }
}

function handleKeyInput(view, key) {
    // Logika Shortcut CTRL + Key
    if (isCtrlActive) {
        if (key === "a") selectAll(view);
        else if (key === "z") undo(view);
        else if (key === "y") redo(view);
        else {
            // Jika key lain, ketik normal (opsional)
            view.dispatch(view.state.replaceSelection(key));
        }
    } else {
        // Ketik karakter biasa
        let charToInsert = key;
        // Jika SHIFT aktif, buat uppercase jika itu huruf
        if (isShiftActive && key.length === 1) {
            charToInsert = key.toUpperCase();
        }
        view.dispatch(view.state.replaceSelection(charToInsert));
    }

    // Auto-reset modifier jika diinginkan (opsional, agar user tidak lupa)
    // resetModifiers();

    document.getElementById("key-popup").classList.remove("show");
}

function resetModifiers() {
    isCtrlActive = false;
    isShiftActive = false;
    document
        .querySelector('[data-action="ctrl"]')
        ?.classList.remove("active-ctrl");
    document
        .querySelector('[data-action="shift"]')
        ?.classList.remove("active-shift");
}

export function moveCursor(direction) {
    const activeLayer = document.querySelector(".editor-layer.active");
    const lang = activeLayer?.id.replace("editor-", "");
    const view = EDITORS[lang];
    if (!view) return;

    view.focus();
    const keyMap = {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight"
    };

    // Simulasi event keyboard agar CM6 merespon navigasi dan seleksi (jika SHIFT aktif)
    view.contentDOM.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: keyMap[direction],
            ctrlKey: isCtrlActive,
            shiftKey: isShiftActive,
            bubbles: true
        })
    );
}
