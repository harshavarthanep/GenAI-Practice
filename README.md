# Prep Prep — GenAI interview prep

A printable cheat sheet plus a practice app for GenAI / AI Engineer / LLM Engineer / AI Product interviews.

| File | What it is |
|---|---|
| `index.html` | **Prep Prep** practice app — 30-day plan tracker, 73 MCQs, 30 written questions with an answer checker, 13 coding problems with hints and solutions, a Mistakes list, optional AI review |
| `questions.js` | All questions and the plan. Add your own by copying an existing entry |
| `cheatsheet.html` | 16-module cheat sheet with beginner explanations, examples, “say it in the interview” lines, 60 quick-fire definitions, the plan and the projects. Print it from the browser (A4, one module per page) |

## Put it on GitHub Pages

1. Create a new repository, e.g. `genai-prep`.
2. Upload `index.html`, `questions.js`, `cheatsheet.html` and this `README.md` (Add file → Upload files).
3. Settings → Pages → Source: *Deploy from a branch* → Branch: `main` / root → Save.
4. Open `https://<your-username>.github.io/genai-prep/` after a minute.

Progress is saved in your browser’s local storage, so use the same browser each day.

**AI review (optional):** add your own Anthropic API key in the *AI review* tab. The key is sensitive — it stays in your browser only. Never put it in any file in this repo.

## The method — every day

1. **Learn** the module in `cheatsheet.html` (20–40 min).
2. **Practise** it in Prep Prep: MCQs → one written answer → one coding problem (30–45 min).
3. **Build** the project for that week (45–90 min).
4. Say one “Say it in the interview” box out loud.

## 30-day plan

**Week 1 — Foundations:** Python for GenAI, ML basics, tokens and embeddings, transformers, LLM training, decoding, prompting.
**Week 2 — RAG:** vector databases, chunking, hybrid search, reranking, FastAPI, evaluation. Build Project 1.
**Week 3 — Agents, fine-tuning, evaluation:** tool calling, MCP server, QLoRA fine-tune, eval report. Projects 2, 3, 4.
**Week 4 — Production and interviews:** LLMOps, safety, multimodal, system design, deploy, portfolio, mock interviews, apply.

The day-by-day version is in the Plan tab and in section B of the cheat sheet.

## Portfolio projects

Build these in your own repos. The links are references to learn from — don’t fork and submit them; recreate them with your own data, your own README and an evaluation table.

1. **Policy Q&A with citations (RAG)** — public PDFs → cited answers, hybrid search + reranker, Streamlit or FastAPI, deployed.
   Learn from: [langchain-ai/rag-from-scratch](https://github.com/langchain-ai/rag-from-scratch), [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) (`rag_tutorials`, `chat_with_X_tutorials`)
2. **Tool-using agent + MCP server** — e.g. a job-hunt agent that scores job posts against your resume and drafts cover notes, with a step limit and approval before sending.
   Learn from: [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk), [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph), [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks)
3. **QLoRA fine-tune** — small open model that turns messy text into clean JSON; compare against the base model.
   Learn from: [unslothai/unsloth](https://github.com/unslothai/unsloth) (free Colab notebooks), [huggingface/peft](https://github.com/huggingface/peft)
4. **Evaluation dashboard** — golden set + code checks + LLM-as-judge over projects 1–3.
   Learn from: [openai/openai-cookbook](https://github.com/openai/openai-cookbook) (evals examples)
5. **GPT from scratch** — tiny GPT trained on Thirukkural or other Tamil text, to understand attention and training deeply.
   Learn from: [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch), [karpathy/nanoGPT](https://github.com/karpathy/nanoGPT)

Free courses to lean on: [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners), [mlabonne/llm-course](https://github.com/mlabonne/llm-course).

**Every project README:** problem in one line · demo link or GIF · architecture diagram · stack · how to run · evaluation table with numbers · limitations · next steps.

Use only public data or your own — never employer or client data.

---
*Think Different Be Different — Harsha Varthan E P*
