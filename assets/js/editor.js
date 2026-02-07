import { DOM, STATE, CONFIG, id, STORAGE } from "./config.js";
import { runPreview } from "./preview.js";

const escapeHTML = str =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function highlightCode(code, lang) {
    let safe = escapeHTML(code);
    if (lang === "html") {
        safe = safe.replace(
            /&quot;(.*?)&quot;/g,
            '<span class="hl-string">&quot;$1&quot;</span>'
        );
        safe = safe.replace(
            /(\s)([a-z-]+)(?==)/gi,
            '$1<span class="hl-attr">$2</span>'
        );
        safe = safe.replace(
            /(&lt;\/?[a-z1-6]+|&gt;)/gi,
            '<span class="hl-tag">$1</span>'
        );

        return safe;
    }

    if (lang === "css") {
        return safe
            .replace(
                /(\/\*[\s\S]*?\*\/)/g,
                '<span class="hl-comment">$1</span>'
            )
            .replace(/([^{]+)(?=\{)/g, '<span class="hl-tag">$1</span>')
            .replace(/([a-z-]+)(?=:)/g, '<span class="hl-attr">$1</span>')
            .replace(/(:)([^;]+)/g, '$1<span class="hl-string">$2</span>');
    }
    if (lang === "js") {
        return safe
            .replace(/(\/\/.*)/g, '<span class="hl-comment">$1</span>')
            .replace(
                /(".*?"|'.*?'|`.*?`)/g,
                '<span class="hl-string">$1</span>'
            )
            .replace(
                /\b(const|let|var|function|return|if|else|for|while|async|await)\b/g,
                '<span class="hl-keyword">$1</span>'
            )
            .replace(/\b(\d+)\b/g, '<span class="hl-number">$1</span>')
            .replace(
                /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\()/g,
                '<span class="hl-func">$1</span>'
            );
    }
    return safe;
}

export function updateEditor(lang) {
    const inputEl = DOM.inputs[lang];
    const highlightEl = DOM.highlights[lang];
    const linesEl = DOM.lines[lang];
    const code = inputEl.value;
    
    STORAGE.save(lang, code);

    highlightEl.innerHTML = highlightCode(code, lang) + "\n";
    linesEl.innerHTML = code
        .split("\n")
        .map((_, i) => `<div>${i + 1}</div>`)
        .join("");

    clearTimeout(STATE.timeout);
    STATE.timeout = setTimeout(runPreview, CONFIG.debounceTime);
}

export function showSuggestions(lang, input) {
const box = id("suggestion-box");
    const cursor = input.selectionStart;
    const textBefore = input.value.substring(0, cursor);

    // Regex untuk mengambil kata terakhir setelah spasi, baris baru, atau karakter <
    const words = textBefore.split(/[\s\n<]/);
    let lastWord = words[words.length - 1];

    if (lastWord.length < 1) {
        box.style.display = "none";
        return;
    }

    const matches = CONFIG.suggestions[lang].filter(s =>
        s.name.startsWith(lastWord)
    );

    if (matches.length > 0) {
        // Render dengan deskripsi
        box.innerHTML = matches
            .map(
                m => `
            <div class="suggestion-item" data-value="${m.name}">
                <span class="s-name">${m.name}</span>
                <span class="s-desc" style="font-size: 10px; color: #888; margin-left: 8px;">${m.desc}</span>
            </div>
        `
            )
            .join("");

        box.style.display = "block";

        // Posisi di dekat kursor (posisi dinamis lebih baik)
        const rect = input.getBoundingClientRect();
        box.style.top = `${rect.top + 40}px`;
        box.style.left = `${rect.left + 20}px`;

        box.querySelectorAll(".suggestion-item").forEach(item => {
            item.onclick = () => {
                const name = item.getAttribute("data-value");
                const suggestion = CONFIG.suggestions[lang].find(s => s.name === name);
                const start = cursor - lastWord.length;

                let insertText = "";
                let newCursorPos = 0;

                if (lang === "html") {
                    const charBefore = textBefore.slice(-lastWord.length - 1, -lastWord.length);
                    const prefix = charBefore === "<" ? "" : "<";

                    if (suggestion.template) {
                        // Gunakan template jika tersedia (misal untuk img atau anchor)
                        insertText = `${prefix}${suggestion.template}`;
                        // Atur kursor di dalam atribut pertama (misal di dalam src="" atau href="")
                        const firstQuote = insertText.indexOf('"');
                        newCursorPos = start + (firstQuote !== -1 ? firstQuote + 1 : insertText.length);
                    } else if (suggestion.isVoid) {
                        // Tag tunggal tanpa penutup
                        insertText = `${prefix}${suggestion.name}>`;
                        newCursorPos = start + insertText.length;
                    } else {
                        // Tag berpasangan standard
                        insertText = `${prefix}${suggestion.name}></${suggestion.name}>`;
                        // Kursor di tengah: <p>|</p>
                        newCursorPos = start + prefix.length + suggestion.name.length + 1;
                    }
                } else {
                    // Untuk CSS & JS
                    insertText = suggestion.name;
                    newCursorPos = start + insertText.length;
                }

                input.value =
                    input.value.substring(0, start) +
                    insertText +
                    input.value.substring(cursor);
                
                input.selectionStart = input.selectionEnd = newCursorPos;

                box.style.display = "none";
                updateEditor(lang);
                input.focus();
            };
        });
    } else {
        box.style.display = "none";
    }
}
