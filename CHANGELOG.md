# Changelog

All notable changes to this project will be documented in this file.

The format is based on "Keep a Changelog" and this project adheres to Semantic Versioning.

## [Unreleased]

### Added
- CHANGELOG.md file to document future releases and updates.

### Changed
- N/A

### Fixed
- N/A

---

## [0.1.1] - 2026-02-07
### Changed
- Documentation: Complete rewrite and expansion of README.md to provide a clean, modern, and actionable introduction for users and contributors.
  - Added project overview, features list, demo link, quickstart instructions (including recommended local server commands), usage tips, project structure, technical notes, security & privacy considerations, contribution guidelines, roadmap, and license information.
  - Included badges for License and Demo.
  - Clarified module/ESM usage and the requirement to serve files over HTTP(S) for imports to work reliably.
  - Added recommendations for improving the project (editor libraries, export/import features, CI suggestions).
- Repository metadata: README.md committed (commit: bd2eeefaaf302cc3c4b038a29cbe09ff059e88bf).

### Added
- README.md (expanded) — provides end-user instructions and developer notes.

### Fixed
- N/A

---

## [0.1.0] - 2026-02-07
### Added
- Initial public release files (static front-end live editor):
  - index.html — main UI (editor panels, preview iframe, settings, resizer)
  - style.css — styling, theme variables, editor layout, suggestion popup styling
  - assets/js/
    - main.js — app entry, event initialization, input handlers, persistence init
    - config.js — configuration, DOM helpers, suggestion definitions, localStorage wrapper
    - editor.js — client-side syntax highlighting (regex-based), line numbering, suggestion UI and insertion logic
    - preview.js — (preview runner invoked by editor, responsible for injecting content into sandboxed iframe)
    - ui.js — UI event handling, resizer, tab switching
    - theme.js — theme management (selector integration)
  - LICENSE — Apache-2.0
  - README.md (initial minimal: repository title + short description)

### Changed
- N/A

### Fixed
- N/A

---

Notes
- Highlights and suggestions are implemented with simple regex and in-browser logic suitable for demos; consider integrating a dedicated editor/highlighter (CodeMirror, Monaco, Prism) for production and complex use-cases.
- The live preview runs inside a sandboxed iframe (sandbox="allow-scripts allow-modals"). While sandboxing helps, "allow-scripts" still executes arbitrary JavaScript inside the iframe — avoid loading untrusted code if security is a concern.
- README was expanded to improve onboarding and documentation for contributors; no functional frontend changes were introduced in the 0.1.1 update.