# GenAI Mastery

A complete, beginner-first GenAI course and practice app by **Harsha Varthan E P**.
Installable (PWA), works on phone, tablet and desktop, and keeps working offline after the first visit.

## What's inside
- **62 lessons in 12 levels**: computers and the internet → Python → SQL, NumPy, Pandas → maths for AI → machine learning → deep learning → NLP, tokens, embeddings → transformers and LLMs → APIs, prompting, tool calling, vector databases, RAG, agents, MCP → fine-tuning → evaluation, deployment, LLMOps, safety, multimodal → system design, interviews, portfolio, roles.
- **Every lesson**: the big idea, why it matters, a plain explanation, a real-life example, code you can run, common mistakes, questions you might ask, interview answers, revision lines and a quiz.
- **Practice**: 197 quiz questions, 213 spaced-repetition flashcards, 32 Python labs with automatic tests, 18 SQL labs on a practice database, a Python/SQL playground, 30 answer-writing questions with a key-point checker, a timed mock interview, and a Mistakes list.
- **Cheat sheet**: every lesson's key lines plus a glossary — filter it, or print it to A4/PDF.
- **Optional AI tutor**: ask questions in any lesson, get answers and code reviewed. Uses your own key (Google Gemini and Groq have free tiers).

## Publish on GitHub Pages
1. Create a repository (for example `genai-mastery`).
2. Upload **everything in this folder**, keeping the `fonts`, `icons` and `vendor` folders.
3. Settings → Pages → Source: *Deploy from a branch* → `main` / root → Save.
4. Open `https://<your-username>.github.io/genai-mastery/` after a minute.
5. To install: Chrome/Edge — the install button in the address bar or in the app's Settings; iPhone/iPad — Safari → Share → Add to Home Screen.

## Good to know
- **Progress is saved in the browser.** Use Settings → Export / Import progress to move between devices.
- **Python** runs inside the browser using Pyodide (loaded from cdn.jsdelivr.net). The first run needs internet and downloads about 10 MB; packages like numpy, pandas and scikit-learn download the first time a lesson imports them. After that they're cached.
- **SQL** runs fully offline (sql.js is bundled in `vendor/`).
- **API keys are sensitive.** The tutor key is stored only in your browser and sent only to the provider you choose. Never add a key to any file in this repository. Exported progress files never include it.
- After you upload a new version, open the app once; it shows "A new version is ready — Update".

## Editing content
- Lessons: `course-a.js` (levels 0–3), `course-b.js` (4–7), `course-c.js` (8–11). Copy an existing lesson object and edit its fields.
- Labs and question banks: `practice.js`.
- `outputs.js` holds the real output of each runnable lesson example, shown before you press Run. If you change a lesson's code, press Run in the app to see the new output.
- When you change any file, bump `VERSION` in `sw.js` (for example `gm-v2`) so installed copies update.

Fonts: Inter and JetBrains Mono (SIL Open Font License). SQL engine: sql.js (MIT). Python: Pyodide (MPL-2.0).
