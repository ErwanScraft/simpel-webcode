import { EditorView, basicSetup } from "https://esm.sh/codemirror";
import { Compartment } from "https://esm.sh/@codemirror/state";
import { keymap } from "https://esm.sh/@codemirror/view";
import { indentWithTab } from "https://esm.sh/@codemirror/commands";
import { javascript } from "https://esm.sh/@codemirror/lang-javascript";
import { html } from "https://esm.sh/@codemirror/lang-html";
import { css } from "https://esm.sh/@codemirror/lang-css";
import { oneDark } from "https://esm.sh/@codemirror/theme-one-dark";
import { undo, redo } from "https://esm.sh/@codemirror/commands";
import { DOM, EDITORS, STATE, CONFIG, STORAGE } from "./config.js";
import { runPreview } from "./preview.js";
import { indentUnit } from "https://esm.sh/@codemirror/language";
const themeConfig = new Compartment();
const tabConfig = new Compartment();
/**
 * CORE EDITOR CREATION
 */
export function createEditor(lang, container) {
    const languageConf = {
        html: html(),
        css: css(),
        js: javascript()
    };

    // Auto-save dan debounce preview saat dokumen berubah
    const updateListener = EditorView.updateListener.of(update => {
        if (update.docChanged) {
            const code = update.state.doc.toString();
            STORAGE.save(lang, code);

            clearTimeout(STATE.timeout);
            STATE.timeout = setTimeout(runPreview, CONFIG.debounceTime);
        }
    });

    const editor = new EditorView({
        doc: STORAGE.load(lang),
        extensions: [
            basicSetup,
            keymap.of([indentWithTab]),
            languageConf[lang],
            themeConfig.of(oneDark),
            tabConfig.of(
                indentUnit.of(" ".repeat(parseInt(STORAGE.loadTabSize())))
            ),
            updateListener,
            EditorView.theme({
                "&": {
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                },
                ".cm-scroller": {
                    overflow: "auto",
                    flexGrow: 1
                },
                ".cm-content": {
                    fontFamily: "'JetBrains Mono', monospace"
                }
            })
        ],
        parent: container
    });

    EDITORS[lang] = editor;
    return editor;
}

/**
 * THEME MANAGEMENT
 */
export function updateEditorTheme(isDark) {
    const theme = isDark ? oneDark : [];

    Object.values(EDITORS).forEach(editor => {
        if (editor) {
            editor.dispatch({
                effects: themeConfig.reconfigure(theme)
            });
        }
    });
}

/**
 * UTILS
 */
export function getCode(lang) {
    return EDITORS[lang] ? EDITORS[lang].state.doc.toString() : "";
}

/**
 * HISTORY CONTROLS
 */
export function executeUndo(view) {
    undo(view);
}

export function executeRedo(view) {
    redo(view);
}

export function updateTabSize(size) {
    const spaceString = " ".repeat(parseInt(size));
    Object.values(EDITORS).forEach(editor => {
        if (editor) {
            editor.dispatch({
                effects: tabConfig.reconfigure(indentUnit.of(spaceString))
            });
        }
    });
}
