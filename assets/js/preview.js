import { DOM } from './config.js';

export function runPreview() {
    let userHTML = DOM.inputs.html.value;
    const userCSS = DOM.inputs.css.value;
    const userJS = DOM.inputs.js.value;

    userHTML = userHTML.replace(/<link[^>]*href=["']style\.css["'][^>]*>/gi, "");
    userHTML = userHTML.replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/gi, "");

    const hasHtmlTag = /<html/i.test(userHTML);
    let finalContent = hasHtmlTag ? userHTML : `
        <!DOCTYPE html><html>
        <head><style>body{margin:0;font-family:sans-serif;} ${userCSS}</style></head>
        <body>${userHTML}<script>try{${userJS}}catch(e){console.error(e)}<\/script></body>
        </html>`;

    if (hasHtmlTag) {
        if (userCSS) finalContent = finalContent.replace(/<\/head>/i, `<style>${userCSS}</style></head>`);
        if (userJS) finalContent = finalContent.replace(/<\/body>/i, `<script>${userJS}<\/script></body>`);
    }

    DOM.frame.srcdoc = finalContent;
}
