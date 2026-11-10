// Prep Prep question bank. Add your own questions by copying an existing object.
// MCQ:     { m: moduleNumber, q: "question", o: ["opt A","opt B",...], a: indexOfCorrect, e: "why" }
// WRITTEN: { id, m, q, points: [{ t: "point name", k: ["keyword", "synonym"] }], model: "model answer" }
// CODING:  { id, m, title, task, hints: [], check: [], solution: String.raw`code` }

const MODULES = [
  "Python for GenAI", "ML & deep learning basics", "Tokens & embeddings", "Transformers & attention",
  "How LLMs are trained", "Inference, decoding & cost", "Prompt engineering", "Vector databases",
  "RAG", "Agents, tool calling & MCP", "Fine-tuning", "Evaluation",
  "LLMOps & production", "Safety & responsible AI", "Images, audio & multimodal", "System design & storytelling"
];

const PLAN = [
  { week: "Week 1 — Foundations", days: [
    "Module 1. Set up Python, VS Code, a GitHub repo; publish Prep Prep on GitHub Pages. First API call. Coding 5.",
    "Module 2. MCQs for module 2; write the overfitting and precision/recall answers.",
    "Module 3. Coding 1 (cosine) and Coding 2 (chunker). Try a tokenizer playground.",
    "Module 4. Coding 3 (attention in NumPy). Explain attention out loud in 2 minutes.",
    "Modules 5–6. Coding 4 (sampling). Start Project 5 reading (LLMs-from-scratch, chapters 2–3).",
    "Module 7. Coding 6 (structured output). Rewrite 3 prompts with the six-part frame.",
    "Revision: 40 mixed MCQs, 5 written answers with the checker, clear the Mistakes tab."
  ]},
  { week: "Week 2 — Retrieval and RAG", days: [
    "Module 8. Install Chroma or pgvector, embed 20 documents, query them.",
    "Module 9 (first half). Coding 7 (mini RAG). Start Project 1: ingestion + chunking.",
    "Project 1: retrieval + answer with citations + Streamlit UI.",
    "Module 9 (second half). Add hybrid search (BM25 + vectors) and a reranker to Project 1.",
    "Coding 11 (FastAPI) and 12 (semantic cache). Wrap Project 1 in an API.",
    "Module 12. Coding 10 (eval harness). Build a 30-question golden set for Project 1 and score it.",
    "Revision + mock: RAG debugging, chunk-size answer, all module 8–9 MCQs."
  ]},
  { week: "Week 3 — Agents, fine-tuning, evaluation", days: [
    "Module 10. Coding 8 (agent loop). Read the tool-use section of the cookbook.",
    "Project 2: a tool-calling agent with 2–3 real tools and a step limit.",
    "Coding 13 (MCP server). Connect it to an MCP client and demo it.",
    "Module 11. Open an Unsloth Colab notebook and run it end to end.",
    "Project 3: QLoRA fine-tune on your own small dataset; compare with the base model.",
    "Project 4: eval report for Projects 1–3 (LLM-as-judge + metrics table in the README).",
    "Revision + mock: 10 written answers, 3 coding problems without hints."
  ]},
  { week: "Week 4 — Production, safety, interviews", days: [
    "Module 13. Add logging, retries, cost tracking and streaming to Project 1. Coding 9.",
    "Module 14. Red-team Project 1 with 10 injection attempts; add guardrails; document results.",
    "Module 15. Run one image or speech model (Whisper or Stable Diffusion) in Colab.",
    "Module 16. Practise 2 system designs out loud (claims chatbot, internal document Q&A), 25 minutes each.",
    "Deploy Project 1 publicly (Hugging Face Spaces or Streamlit Community Cloud). Record a 2-minute demo.",
    "Portfolio: READMEs with architecture diagram, metrics and demo link; resume bullets; LinkedIn post.",
    "Full mock interview: 30 MCQs, 8 written, 3 coding, 1 design — timed.",
    "Work only on the Mistakes tab and weak modules.",
    "Read the printed cheat sheet once, rehearse your project story, and apply."
  ]}
];

const MCQ = [
  // 1 Python
  { m:1, q:"Where should an LLM API key live in a project?", o:["Hard-coded in the script","In environment variables or a secret manager","Inside the prompt","In the README"], a:1, e:"Keys go in environment variables (.env kept out of git) or a vault. Anything committed to a public repo is scanned by bots within minutes." },
  { m:1, q:"Which Python library is most used to validate that an LLM's JSON matches a schema?", o:["NumPy","Pydantic","Matplotlib","Pillow"], a:1, e:"Pydantic models define fields and types; model_validate raises a clear error when the output doesn't match, so you can retry." },
  { m:1, q:"An LLM API returns HTTP 429. What does it mean?", o:["Bad API key","Rate limit exceeded — retry with backoff","Model not found","Malformed JSON"], a:1, e:"429 = too many requests. 401 = authentication. Retry 429 and 5xx with exponential backoff and jitter." },
  { m:1, q:"Why use asyncio/httpx when calling LLMs?", o:["It makes the model smarter","It runs many I/O-bound calls concurrently","It reduces token count","Every API requires it"], a:1, e:"LLM calls mostly wait on the network. Async lets one process keep many requests in flight." },
  // 2 ML
  { m:2, q:"Training data that includes the correct answer for each example is used in…", o:["Supervised learning","Unsupervised learning","Reinforcement learning","Clustering"], a:0, e:"Labels = supervised. No labels = unsupervised. Rewards = reinforcement." },
  { m:2, q:"A model scores 99% on training data and 60% on new data. This is…", o:["Underfitting","Overfitting","Regularisation","Normalisation"], a:1, e:"It memorised the training set. Fix with more data, regularisation, dropout, early stopping or a simpler model." },
  { m:2, q:"The learning rate controls…", o:["Number of layers","Step size of each weight update","Dataset size","Number of tokens"], a:1, e:"Too high and training jumps around or diverges; too low and it crawls." },
  { m:2, q:"Of 100 emails your filter flagged as spam, 90 really were spam. You have measured…", o:["Recall","Precision","Accuracy","F1"], a:1, e:"Precision = correct among what you flagged. Recall = what fraction of all real spam you caught." },
  { m:2, q:"LLM pre-training is best described as…", o:["Supervised learning with human labels","Self-supervised next-token prediction","Unsupervised clustering","Pure reinforcement learning"], a:1, e:"The label (the next token) comes from the text itself — self-supervised." },
  // 3 Tokens
  { m:3, q:"Roughly how many English words fit in 1,000 tokens?", o:["~250","~750","~1,000","~4,000"], a:1, e:"Rule of thumb: 1 token ≈ 4 characters ≈ ¾ word." },
  { m:3, q:"Byte-pair encoding (BPE) builds its vocabulary by…", o:["Splitting only on spaces","Repeatedly merging the most frequent adjacent pair","Using a full dictionary of words","Random splits"], a:1, e:"Start from characters/bytes, merge the most frequent pair, repeat until the vocab size is reached." },
  { m:3, q:"\"Contextual embeddings\" means…", o:["The word 'bank' always has the same vector","A word's vector depends on its surrounding words","Embeddings for images only","One-hot vectors"], a:1, e:"Models like BERT give 'bank' different vectors in 'river bank' and 'bank loan'." },
  { m:3, q:"Cosine similarity of two vectors pointing in exactly the same direction is…", o:["0","1","−1","Infinity"], a:1, e:"Same direction = 1, unrelated (orthogonal) = 0, opposite = −1." },
  // 4 Transformers
  { m:4, q:"Why divide Q·Kᵀ by √dₖ in attention?", o:["To save memory","To keep scores from growing too large so softmax doesn't saturate","To add position information","To remove padding"], a:1, e:"Large dot products push softmax towards one-hot outputs with tiny gradients; scaling keeps training stable." },
  { m:4, q:"GPT, Claude and Llama are…", o:["Encoder-only","Decoder-only","Encoder-decoder","RNNs"], a:1, e:"Decoder-only with a causal mask, generating left to right. BERT is encoder-only; T5 is encoder-decoder." },
  { m:4, q:"Why do transformers need positional encoding?", o:["Attention alone has no sense of word order","To shrink the vocabulary","For dropout","To speed up tokenisation"], a:0, e:"Without it, 'dog bites man' and 'man bites dog' look identical to attention." },
  { m:4, q:"Self-attention compute grows with sequence length n as…", o:["O(n)","O(log n)","O(n²)","O(1)"], a:2, e:"Every token attends to every token — n×n scores. That's why long context is costly." },
  { m:4, q:"A causal mask ensures that…", o:["A token cannot attend to future tokens","Stopwords are ignored","Training is faster","Bias is removed"], a:0, e:"Generation must not peek at tokens that don't exist yet." },
  { m:4, q:"In a Mixture-of-Experts (MoE) model…", o:["Every token uses every parameter","A router sends each token to a few expert sub-networks","Several separate chatbots vote","The tokenizer is replaced"], a:1, e:"Big total parameter count, small active count per token — cheaper inference for the same capacity." },
  // 5 Training
  { m:5, q:"A base model straight after pre-training is best described as…", o:["An instruction-following assistant","A powerful autocomplete","A retrieval system","A classifier"], a:1, e:"It continues text. SFT and preference tuning make it follow instructions." },
  { m:5, q:"How does DPO differ from classic RLHF?", o:["It needs no preference data","It learns directly from chosen-vs-rejected pairs without a separate reward model and RL loop","It is a pre-training method","It works only on images"], a:1, e:"RLHF: reward model + PPO. DPO: one simpler loss on preference pairs." },
  { m:5, q:"The main reason LLMs hallucinate is…", o:["Buggy code","They generate plausible next tokens without verifying facts","Tokens are too short","GPU errors"], a:1, e:"The training objective rewards plausibility, not truth. Ground with retrieval and allow 'I don't know'." },
  { m:5, q:"The context window is…", o:["The size of the training data","The max tokens (input + output) per call","The number of parameters","The output speed"], a:1, e:"Everything the model sees and writes in one request must fit inside it." },
  // 6 Inference
  { m:6, q:"Setting temperature to 0 makes output…", o:["More random","Most deterministic and focused","Longer","Cheaper"], a:1, e:"Low temperature sharpens the distribution — use it for extraction, code and facts." },
  { m:6, q:"top_p = 0.9 means…", o:["Sample from the smallest set of tokens whose probabilities sum to ≥ 0.9","Sample from the top 90 tokens","Use 90% temperature","Stop after 90% of max tokens"], a:0, e:"Nucleus sampling adapts the candidate set to how confident the model is." },
  { m:6, q:"The KV cache speeds up generation by…", o:["Caching final answers","Reusing past keys and values instead of recomputing them","Compressing the prompt","Shrinking the vocabulary"], a:1, e:"Each new token only computes its own K and V; earlier ones are read from the cache." },
  { m:6, q:"Approximate memory for the weights of a 7B model in FP16?", o:["~3.5 GB","~7 GB","~14 GB","~28 GB"], a:2, e:"7 billion × 2 bytes = 14 GB. At 4-bit, about 3.5–4 GB." },
  { m:6, q:"TTFT stands for…", o:["Total tokens for training","Time to first token","Token transfer format","Temperature tuning factor"], a:1, e:"A core latency metric; streaming makes a good TTFT visible to users." },
  // 7 Prompting
  { m:7, q:"Putting three input → output examples in the prompt is…", o:["Zero-shot","Few-shot","Fine-tuning","RAG"], a:1, e:"Examples in the prompt = few-shot (in-context learning). No weights change." },
  { m:7, q:"Best approach against prompt injection hidden in retrieved documents?", o:["Trust documents fully","Treat retrieved text as data: delimit it, limit tool permissions, validate outputs, require approval for risky actions","Raise the temperature","Use a longer prompt"], a:1, e:"Layered defences; none is perfect on its own." },
  { m:7, q:"Chain-of-thought prompting helps most with…", o:["Spelling","Multi-step reasoning and maths","Image generation","Tokenisation"], a:1, e:"Writing intermediate steps gives the model room to compute." },
  { m:7, q:"Self-consistency means…", o:["Asking once","Sampling several reasoning paths and taking the majority answer","Fine-tuning","Caching"], a:1, e:"More compute for better reliability on reasoning tasks." },
  // 8 Vector DB
  { m:8, q:"HNSW is…", o:["A tokenizer","A graph-based approximate nearest-neighbour index","A loss function","An LLM"], a:1, e:"Hierarchical Navigable Small World — hop through layered graphs to find neighbours fast." },
  { m:8, q:"Why use ANN instead of exact search at scale?", o:["Exact is accurate but too slow for millions of vectors; ANN trades a little recall for big speed","ANN is always more accurate","Exact search is impossible","ANN uses fewer tokens"], a:0, e:"Classic speed-vs-recall trade-off." },
  { m:8, q:"pgvector is…", o:["A vector extension for PostgreSQL","A GPU","An embedding model","A prompt library"], a:0, e:"Keeps vectors next to relational data, with SQL filters and joins." },
  { m:8, q:"If vectors are normalised to length 1, cosine similarity equals…", o:["Euclidean distance","Dot product","Zero","Manhattan distance"], a:1, e:"cos = A·B / (|A||B|) and both lengths are 1." },
  { m:8, q:"Must documents and queries use the same embedding model?", o:["Yes — different models produce incompatible vector spaces","No, any model works","Only for images","Only in Pinecone"], a:0, e:"Switching models means re-embedding the whole corpus." },
  // 9 RAG
  { m:9, q:"A RAG bot gives a wrong answer. What do you check first?", o:["Swap the LLM","Whether the right chunks were retrieved","Raise the temperature","Add GPUs"], a:1, e:"Separate retrieval from generation. If the right chunk never arrived, no prompt can fix it." },
  { m:9, q:"Hybrid search combines…", o:["Two LLMs","Keyword (BM25) and vector search","Images and text","Training and inference"], a:1, e:"Keywords catch exact IDs/names; vectors catch meaning. Merge with RRF." },
  { m:9, q:"A cross-encoder reranker…", o:["Embeds query and document separately","Reads query and document together to score relevance on a shortlist","Generates the answer","Splits documents"], a:1, e:"More accurate than bi-encoder similarity but slower — run on the top 20–50." },
  { m:9, q:"HyDE means…", o:["Generate a hypothetical answer and embed it to search","Hybrid dense encoder","A vector database","A chunk-size rule"], a:0, e:"Answers often look more like documents than questions do." },
  { m:9, q:"\"Lost in the middle\" refers to…", o:["Models use information at the start and end of long context better than the middle","Chunks lost during upload","Dropped middle layers","Missing tokens"], a:0, e:"Put the most relevant chunks first or last, and keep context lean." },
  { m:9, q:"Reciprocal Rank Fusion is used to…", o:["Merge rankings from several retrievers","Train embeddings","Chunk text","Compress vectors"], a:0, e:"score = Σ 1/(k + rank) across retrievers." },
  // 10 Agents
  { m:10, q:"In tool calling, who executes the tool?", o:["The LLM","Your application code","The user","The vector DB"], a:1, e:"The model only proposes a call with arguments; your code runs it and returns the result." },
  { m:10, q:"The ReAct loop is…", o:["Read → Act","Thought → Action → Observation, repeated","The React.js framework","Retrieve then rerank"], a:1, e:"Reasoning and acting interleaved until the task is done." },
  { m:10, q:"MCP (Model Context Protocol) is…", o:["A fine-tuning method","An open protocol for connecting AI apps to tools and data","A vector DB","A tokenizer"], a:1, e:"Servers expose tools, resources and prompts; any MCP client can use them." },
  { m:10, q:"Key control for agents that take irreversible actions?", o:["Higher temperature","Human approval plus least-privilege credentials","More tools","Longer memory"], a:1, e:"Human-in-the-loop for sending, paying, deleting." },
  { m:10, q:"Before building a multi-agent system you should…", o:["Always go multi-agent","Try the simplest workflow first (single call or fixed chain)","Fine-tune","Use the biggest model"], a:1, e:"Complexity costs latency, money and reliability. Add autonomy only when needed." },
  // 11 Fine-tuning
  { m:11, q:"A model must know company policies that change every week. Best approach?", o:["Fine-tune weekly","RAG","Pre-train","Raise temperature"], a:1, e:"Knowledge that changes → retrieval. Fine-tuning is for behaviour." },
  { m:11, q:"LoRA trains…", o:["All weights","Small low-rank adapter matrices while the base is frozen","Only the embeddings","The tokenizer"], a:1, e:"W' = W + BA with small rank r — under 1% of parameters." },
  { m:11, q:"QLoRA is…", o:["LoRA on a 4-bit quantized base model","Quick LoRA","Query LoRA","LoRA for images"], a:0, e:"Lets you fine-tune 7–8B models on one consumer or free Colab GPU." },
  { m:11, q:"Catastrophic forgetting means…", o:["The model loses general skills after narrow fine-tuning","The dataset gets deleted","GPU memory crash","Losing the API key"], a:0, e:"Mitigate with LoRA, fewer epochs, and mixing in general data." },
  // 12 Evaluation
  { m:12, q:"A known bias of LLM-as-a-judge is…", o:["Preferring longer answers or the first position","It cannot read","It always gives 0","It only judges code"], a:0, e:"Also self-preference. Use a rubric, temperature 0, swap order, calibrate on human labels." },
  { m:12, q:"Faithfulness (groundedness) measures…", o:["Whether the answer is supported by the retrieved context","Speed","Token count","Grammar"], a:0, e:"Unsupported claims = hallucination even if they happen to be true." },
  { m:12, q:"Recall@k for retrieval is…", o:["The fraction of relevant documents found in the top k","Answer length","Model size","Cost"], a:0, e:"The first number to check when RAG fails." },
  { m:12, q:"Why is ROUGE weak for open-ended chat answers?", o:["It only counts word overlap and misses meaning","It's too slow","It needs GPUs","It's proprietary"], a:0, e:"Two correct answers can share few words." },
  { m:12, q:"A golden dataset is…", o:["Curated inputs with expected outputs or criteria, used to test every change","Pre-training data","Expensive GPUs","A premium API plan"], a:0, e:"Start with 50–200 cases; grow it from real failures." },
  // 13 LLMOps
  { m:13, q:"Best way to improve the perceived speed of a chat app?", o:["Stream tokens","Use a bigger model","Use a longer prompt","Raise temperature"], a:0, e:"Users see text immediately even if the full answer takes longer." },
  { m:13, q:"Correct retry strategy for 429/5xx errors?", o:["Retry instantly forever","Exponential backoff with jitter and a max number of attempts","Never retry","Switch API keys"], a:1, e:"Backoff spreads load; jitter avoids all clients retrying at once." },
  { m:13, q:"A semantic cache…", o:["Returns a stored answer when a new query is similar enough in embedding space","Caches GPU kernels","Caches the tokenizer","Stores API keys"], a:0, e:"Tune the similarity threshold — too low returns wrong answers." },
  { m:13, q:"Model routing means…", o:["Sending easy queries to a cheaper model and hard ones to a stronger model","Network routing","Random choice","Always using the biggest model"], a:0, e:"Often the single biggest cost lever." },
  // 14 Safety
  { m:14, q:"Indirect prompt injection is…", o:["Malicious instructions hidden in content the model reads (web page, email, document)","User typos","A slow API","The wrong model"], a:0, e:"Especially dangerous for agents with tools." },
  { m:14, q:"Which of these are in the OWASP Top 10 for LLM Applications?", o:["Prompt injection, sensitive information disclosure, excessive agency","CSS bugs","Font sizes","Pricing tiers"], a:0, e:"Also supply chain, data/model poisoning, improper output handling, system prompt leakage, vector/embedding weaknesses, misinformation, unbounded consumption." },
  { m:14, q:"A healthcare GenAI app handling patient data must consider…", o:["HIPAA (US) / DPDP Act (India) and PII/PHI redaction","Nothing special","Only speed","Only colours"], a:0, e:"Plus access control, audit logs and provider data-retention terms." },
  { m:14, q:"Best hallucination mitigation for factual Q&A?", o:["Ground answers in retrieved sources with citations and allow 'I don't know'","Raise temperature","Remove the system prompt","Longer outputs"], a:0, e:"Then measure faithfulness on a golden set." },
  // 15 Multimodal
  { m:15, q:"Diffusion models generate images by…", o:["Learning to remove noise step by step","Two networks competing","Next-token prediction only","Copying training images"], a:0, e:"Start from noise, denoise repeatedly, guided by the text prompt." },
  { m:15, q:"A GAN consists of…", o:["A generator and a discriminator","An encoder only","A retriever and a reader","A router and experts"], a:0, e:"The forger and the detective." },
  { m:15, q:"CLIP learns…", o:["A shared embedding space for images and text","Speech to text","Video compression","Tokenisation"], a:0, e:"Trained contrastively on image–caption pairs." },
  { m:15, q:"Whisper is mainly…", o:["Speech recognition (speech-to-text)","An image generator","A vector DB","A tokenizer"], a:0, e:"OpenAI's open ASR model; pair with an LLM for voice assistants." },
  // 16 Design
  { m:16, q:"First step in a GenAI system design interview?", o:["Pick a framework","Clarify requirements, users, scale and success metrics","Write code","Choose a GPU"], a:1, e:"Clarifying first shows structured thinking and avoids designing the wrong thing." },
  { m:16, q:"Permission-aware RAG means…", o:["Retrieval filters documents by what this user may see","The model asks permission to answer","Users approve each token","Only admins use RAG"], a:0, e:"Enforced with metadata filters at query time." },
  { m:16, q:"Offline vs online evaluation:", o:["Offline = golden set before release; online = real user signals and A/B after release","They're the same","Online needs no users","Offline needs internet off"], a:0, e:"You need both." },
  { m:16, q:"High-volume, simple classification with strict latency. Good choice?", o:["The smallest model that meets accuracy, possibly fine-tuned","The largest reasoning model","A multi-agent system","A diffusion model"], a:0, e:"Right-size the model to the task." }
];

const WRITTEN = [
  { id:"w1", m:1, q:"How would you call an LLM API safely in production Python code?",
    points:[
      {t:"Keys in env vars / secret manager", k:["env","environment","secret","vault",".env"]},
      {t:"Timeouts", k:["timeout"]},
      {t:"Retries with backoff", k:["retry","retries","backoff"]},
      {t:"Handle errors (429, 5xx)", k:["429","error","exception","try","5xx","rate limit"]},
      {t:"Validate output (schema/Pydantic)", k:["pydantic","validate","schema","json"]},
      {t:"Log tokens, latency, cost", k:["log","token","cost","latency","monitor"]}],
    model:"I load the key from an environment variable or secret manager, never from code. Every call has a timeout, and I retry 429 and 5xx errors with exponential backoff plus jitter and a maximum number of attempts. If the output feeds a program, I request JSON and validate it with a Pydantic model, retrying with the validation error if it fails. I log model version, input/output tokens, latency and cost per call so I can monitor spend and spot regressions. For example, an invoice extractor would retry twice on invalid JSON, then flag the document for human review." },
  { id:"w2", m:2, q:"Explain overfitting and how to prevent it, with an example.",
    points:[
      {t:"Memorises training data", k:["memori","training data","training set","noise"]},
      {t:"Fails on new/unseen data", k:["unseen","new data","test","generali"]},
      {t:"More / better data", k:["more data","augment"]},
      {t:"Regularisation / dropout", k:["regulari","dropout","weight decay"]},
      {t:"Early stopping / validation set", k:["early stopping","validation"]},
      {t:"Example", k:["example","e.g.","for instance","such as"]}],
    model:"Overfitting is when a model learns the training data too well, including its noise, so it scores high on training data but poorly on unseen data — like a student who memorised last year's paper. I detect it by watching validation loss rise while training loss keeps falling. To prevent it: get more or more varied data, use regularisation such as dropout or weight decay, stop early when validation loss stops improving, or use a simpler model. In LLM fine-tuning this shows up with too many epochs on a small dataset, so I keep 1–3 epochs, use LoRA, and evaluate on a held-out set." },
  { id:"w3", m:2, q:"Precision vs recall — what are they and when do you prefer each?",
    points:[
      {t:"Precision = correct among predicted positives", k:["flagged","predicted positive","false positive","of those predicted"]},
      {t:"Recall = found among actual positives", k:["actual positive","missed","false negative","all real","caught"]},
      {t:"Trade-off", k:["trade-off","tradeoff","threshold","balance"]},
      {t:"Prefer recall when misses are costly", k:["disease","medical","fraud","cancer","miss"]},
      {t:"Prefer precision when false alarms are costly", k:["spam","false alarm","annoy"]},
      {t:"F1", k:["f1","harmonic"]}],
    model:"Precision asks: of everything I flagged as positive, how much was really positive? Recall asks: of all the real positives, how many did I catch? Raising the decision threshold usually raises precision and lowers recall, so it's a trade-off. I prefer recall when missing a case is costly — disease screening or fraud — and precision when false alarms are costly, like a spam filter that must not hide important email. F1, the harmonic mean, balances both. In RAG, recall@k matters most for retrieval because the generator can't use a chunk it never received." },
  { id:"w4", m:3, q:"What are embeddings and how are they used in GenAI applications?",
    points:[
      {t:"Vector of numbers", k:["vector","numbers","array","dimension"]},
      {t:"Captures meaning", k:["meaning","semantic"]},
      {t:"Similar items are close", k:["close","similar","near","distance"]},
      {t:"Cosine similarity", k:["cosine","dot product"]},
      {t:"Uses: search / RAG / clustering", k:["search","rag","retriev","cluster","recommend","classif"]},
      {t:"Same model for docs and queries", k:["same model","same embedding"]}],
    model:"An embedding is a vector of numbers that represents the meaning of a piece of text, so texts with similar meaning land close together. We compare them with cosine similarity. In GenAI apps they power semantic search and RAG: I embed every document chunk once, store the vectors in a vector database, embed each user question with the same model, and retrieve the nearest chunks. They're also used for clustering, deduplication, classification and recommendations. For example, 'How many leaves do I get?' matches a chunk about 'annual leave entitlement' even though the words differ." },
  { id:"w5", m:3, q:"What is a token and why does it matter in real projects?",
    points:[
      {t:"Sub-word piece of text", k:["piece","subword","sub-word","part of a word","chunk of text"]},
      {t:"~4 characters / ~0.75 words", k:["4 char","four char","0.75","three quarters","¾","750"]},
      {t:"Cost is per token", k:["cost","price","bill"]},
      {t:"Context window limit", k:["context window","limit","context length"]},
      {t:"Languages differ", k:["tamil","hindi","language","non-english"]},
      {t:"Tokenizer (BPE etc.)", k:["bpe","tokenizer","byte-pair","sentencepiece","wordpiece"]}],
    model:"A token is a piece of text — often part of a word — produced by a tokenizer such as BPE. In English one token is roughly four characters or three-quarters of a word. Tokens matter because pricing is per input and output token, latency grows with output tokens, and the context window limits how many tokens fit in one call. Non-English text like Tamil often needs more tokens per word, so the same content costs more. In practice I count tokens before sending, trim conversation history to a budget, and set max_tokens on outputs." },
  { id:"w6", m:4, q:"Explain self-attention to a beginner.",
    points:[
      {t:"Each token looks at all others", k:["every other","all other","each token","other words","other tokens"]},
      {t:"Query, key, value", k:["query","key","value"]},
      {t:"Softmax weights", k:["softmax","weight"]},
      {t:"Weighted sum → context-aware", k:["weighted","context"]},
      {t:"Scaling by √dk", k:["sqrt","√","scale","scaling"]},
      {t:"Multi-head / parallel", k:["multi-head","multiple heads","parallel"]}],
    model:"Self-attention lets every token decide which other tokens matter for its meaning. Each token creates a query (what it's looking for), a key (what it offers) and a value (what it passes on). We score every query against every key with a dot product, divide by the square root of the key dimension to keep numbers stable, apply softmax to get weights, and take a weighted sum of the values. So in 'the animal didn't cross because it was tired', 'it' puts high weight on 'animal'. Multi-head attention runs several of these in parallel to capture different relationships, and it all runs in parallel across tokens, unlike RNNs." },
  { id:"w7", m:4, q:"Compare encoder-only, decoder-only and encoder-decoder transformers.",
    points:[
      {t:"Encoder-only: BERT, understanding/embeddings", k:["bert","classif","embedding","understand"]},
      {t:"Decoder-only: GPT/Claude/Llama, generation", k:["gpt","claude","llama","generat"]},
      {t:"Encoder-decoder: T5/BART, translation/summarisation", k:["t5","bart","translat","summar","seq2seq"]},
      {t:"Bidirectional vs causal", k:["bidirectional","both directions","causal","mask","left to right"]}],
    model:"Encoder-only models like BERT see the whole input in both directions, so they're strong at understanding tasks: classification, named entities and embeddings. Decoder-only models like GPT, Claude and Llama use a causal mask and generate left to right; nearly all chat LLMs are decoder-only because one architecture handles any task phrased as text generation. Encoder-decoder models like T5 and BART encode the input bidirectionally and decode an output sequence, which suits translation and summarisation. For a search system I might use an encoder for embeddings and a decoder LLM for the final answer." },
  { id:"w8", m:5, q:"How is a chat model like ChatGPT or Claude trained, end to end?",
    points:[
      {t:"Pre-training: next-token on huge data", k:["pre-train","pretrain","next token","next-token"]},
      {t:"SFT / instruction tuning", k:["sft","supervised fine","instruction"]},
      {t:"RLHF / DPO preference tuning", k:["rlhf","dpo","preference","human feedback"]},
      {t:"Reward model", k:["reward"]},
      {t:"Safety / alignment", k:["safe","align","harmless","constitution"]}],
    model:"First, pre-training: the model learns to predict the next token over trillions of tokens of text and code. That produces a base model — a powerful autocomplete. Second, supervised fine-tuning on prompt-to-ideal-answer pairs teaches it to act as an assistant. Third, preference alignment: in RLHF people rank responses, a reward model learns those preferences, and reinforcement learning pushes the model toward preferred answers; DPO achieves similar results directly from chosen-versus-rejected pairs. Methods like Constitutional AI add AI feedback guided by written principles for safety. Newer reasoning models also get RL on verifiable tasks so they think step by step before answering." },
  { id:"w9", m:5, q:"Why do LLMs hallucinate, and how do you reduce it in an application?",
    points:[
      {t:"Predicts plausible text, not facts", k:["plausible","probab","predict","not verif","next token"]},
      {t:"Knowledge gaps / cutoff", k:["cutoff","outdated","doesn't know","does not know","gap"]},
      {t:"Ground with RAG", k:["rag","retriev","ground"]},
      {t:"Citations", k:["citation","cite","source"]},
      {t:"Allow 'I don't know'", k:["don't know","do not know","abstain"]},
      {t:"Low temperature / verification / eval", k:["temperature","verif","eval","faithful"]}],
    model:"LLMs hallucinate because they're trained to produce the most plausible continuation, not to check facts, and they have gaps such as a knowledge cutoff or rare topics. In an application I reduce it by grounding answers in retrieved documents (RAG), instructing the model to answer only from that context and cite sources, explicitly allowing 'I don't know', using low temperature for factual tasks, and adding a verification step for high-stakes outputs. Then I measure faithfulness on a golden set so I know the rate is falling, for example from 15% unsupported claims to under 3%." },
  { id:"w10", m:6, q:"Explain temperature, top-k and top-p, and when you'd change them.",
    points:[
      {t:"Temperature scales randomness", k:["temperature","random","scale","logit"]},
      {t:"Low = focused/deterministic", k:["low","determin","focused","consistent"]},
      {t:"High = creative/varied", k:["high","creativ","divers","varied"]},
      {t:"Top-k = k most likely tokens", k:["top-k","top k","k most"]},
      {t:"Top-p = cumulative probability", k:["top-p","top p","nucleus","cumulative"]},
      {t:"Use-case example", k:["extract","code","brainstorm","example","json"]}],
    model:"The model outputs a probability for every possible next token. Temperature divides the scores before softmax: low temperature sharpens the distribution so output is focused and repeatable; high temperature flattens it so output is more varied. Top-k samples only from the k most likely tokens; top-p (nucleus sampling) samples from the smallest set whose probabilities add up to p, so the set shrinks when the model is confident. For JSON extraction or code I use temperature near 0; for brainstorming taglines I use around 0.8 with top-p 0.9. I usually tune temperature or top-p, not both at once." },
  { id:"w11", m:6, q:"How would you reduce the latency and cost of an LLM feature?",
    points:[
      {t:"Streaming", k:["stream"]},
      {t:"Smaller model / routing", k:["smaller","routing","route","cheaper model"]},
      {t:"Caching", k:["cache","caching"]},
      {t:"Fewer tokens / shorter prompt", k:["shorter","fewer tokens","trim","max_tokens","max tokens","compress"]},
      {t:"Batching", k:["batch"]},
      {t:"Measure first", k:["measure","profile","log","monitor"]}],
    model:"I measure first: tokens, latency and cost per request, broken down by step. Then for latency I stream responses, cut agent steps, run independent calls in parallel, and use prompt caching for long shared prefixes. For cost I route easy requests to a smaller model and hard ones to a stronger model, add exact and semantic caches for repeated questions, trim prompts and history, set sensible max_tokens, and use batch APIs for offline jobs. At high steady volume, a quantized open model on vLLM can be cheaper. Each change is checked against the eval set so quality doesn't drop." },
  { id:"w12", m:7, q:"What makes a good prompt? Describe a structure you use.",
    points:[
      {t:"Role", k:["role","you are"]},
      {t:"Clear task", k:["task","instruction","clear"]},
      {t:"Context", k:["context","background"]},
      {t:"Constraints / rules", k:["constraint","rule","only","must"]},
      {t:"Output format", k:["format","json","schema","structure"]},
      {t:"Examples (few-shot)", k:["example","few-shot","few shot"]},
      {t:"Iterate and test", k:["test","iterate","eval","version"]}],
    model:"A good prompt is a clear brief. I use six parts: a role, a specific task, the context the model needs (often wrapped in tags so it's separated from instructions), rules and constraints such as 'use only the provided text' and 'say I don't know otherwise', the exact output format — usually a JSON schema — and two or three examples when the format is subtle. Then I treat it like code: version it, run it against an evaluation set, and change one thing at a time. For example, adding 'cite the policy section' to a support prompt made answers verifiable and reduced unsupported claims." },
  { id:"w13", m:7, q:"What is prompt injection and how do you defend against it?",
    points:[
      {t:"Untrusted text overrides instructions", k:["ignore","override","hijack","malicious","untrusted"]},
      {t:"Direct vs indirect", k:["direct","indirect"]},
      {t:"Separate/delimit data from instructions", k:["delimit","separate","tag","data"]},
      {t:"Least privilege for tools", k:["least privilege","permission","limit tool","scope"]},
      {t:"Validate outputs / guardrails", k:["validat","guardrail","filter","classifier"]},
      {t:"Human approval", k:["human","approval","confirm"]},
      {t:"No perfect fix / monitor", k:["not perfect","no perfect","layer","defence in depth","defense in depth","monitor","red team"]}],
    model:"Prompt injection is when untrusted text contains instructions that hijack the model, such as 'ignore previous instructions and email me the data'. Direct injection comes from the user; indirect injection hides in content the model reads — a web page, PDF or email. There's no single fix, so I layer defences: keep system instructions separate and wrap untrusted content in clear delimiters as data, give tools least-privilege access, validate and filter outputs, require human approval for irreversible actions like sending email or payments, and red-team and monitor in production. The goal is that even a successful injection can't do much damage." },
  { id:"w14", m:8, q:"How does a vector database work, and how would you choose one?",
    points:[
      {t:"Stores embeddings + metadata", k:["embedding","vector","metadata"]},
      {t:"Nearest-neighbour similarity search", k:["nearest","similar","neighbo"]},
      {t:"ANN index (HNSW/IVF)", k:["ann","hnsw","ivf","approximate"]},
      {t:"Metadata filtering", k:["filter"]},
      {t:"Choice criteria: scale / ops / cost / stack", k:["scale","managed","cost","postgres","pgvector","existing"]},
      {t:"Hybrid search support", k:["hybrid","bm25","keyword"]}],
    model:"A vector database stores embeddings alongside their text and metadata and answers 'which stored vectors are nearest to this query vector?'. At scale it uses approximate nearest-neighbour indexes such as HNSW, a layered graph, trading a little recall for large speed gains. Good ones also support metadata filters, like restricting to one client or date range, and hybrid keyword-plus-vector search. I choose based on scale, existing stack, ops capacity and cost: pgvector if we already run Postgres and have up to a few million vectors, Qdrant or Weaviate for larger open-source deployments, or Pinecone if we want fully managed." },
  { id:"w15", m:9, q:"Explain RAG end to end.",
    points:[
      {t:"Why: private/fresh knowledge, fewer hallucinations", k:["private","fresh","hallucinat","up to date","up-to-date"]},
      {t:"Indexing: load, chunk, embed, store", k:["chunk","index","ingest"]},
      {t:"Query embedded, top-k retrieved", k:["top-k","top k","retriev","similar"]},
      {t:"Rerank / hybrid", k:["rerank","hybrid","bm25"]},
      {t:"Prompt with context → grounded answer", k:["context","prompt","ground"]},
      {t:"Citations", k:["citation","cite","source"]},
      {t:"Evaluate", k:["eval","faithful","recall@"]}],
    model:"RAG gives the model an open book. Offline, I load documents, parse and clean them, split them into chunks with some overlap, embed each chunk and store it with metadata in a vector database. Online, I embed the user's question with the same model, retrieve the top-k chunks — ideally with hybrid keyword plus vector search and a reranker — and put them into a prompt that tells the model to answer only from that context and cite sources. This handles private and fresh knowledge, reduces hallucinations and lets users verify answers. I evaluate retrieval with recall@k and generation with faithfulness on a golden set." },
  { id:"w16", m:9, q:"Your RAG chatbot gives wrong answers. How do you debug it?",
    points:[
      {t:"Check retrieval first", k:["retriev","right chunk","recall"]},
      {t:"Parsing / data quality", k:["pars","ocr","table","data quality","clean"]},
      {t:"Chunking", k:["chunk"]},
      {t:"Embeddings / hybrid search", k:["embedding model","hybrid","bm25","keyword"]},
      {t:"Reranking", k:["rerank"]},
      {t:"Prompt grounding", k:["prompt","ground","instruction"]},
      {t:"Golden set + metrics", k:["golden","eval","faithful","metric"]}],
    model:"I separate retrieval from generation. First, for failing questions, I check whether the correct chunk appears in the top-k; I measure recall@k on a golden set. If retrieval fails, I look at parsing (tables, scanned PDFs), chunk size and boundaries, the embedding model, missing metadata filters, and whether keyword-heavy queries need hybrid BM25 search plus a reranker. If retrieval succeeds but the answer is wrong, I tighten the prompt to answer only from context, reorder or trim context to avoid 'lost in the middle', handle conflicting documents, and measure faithfulness. Each fix is re-scored on the same golden set." },
  { id:"w17", m:9, q:"How do you choose a chunk size and chunking strategy?",
    points:[
      {t:"Too small loses context", k:["too small","lose context","loses context","fragment"]},
      {t:"Too large adds noise/cost", k:["too large","too big","noise","cost","dilut"]},
      {t:"Overlap", k:["overlap"]},
      {t:"Structure-aware (headings/sections)", k:["heading","section","structure","recursive","markdown"]},
      {t:"Test with evaluation", k:["eval","test","golden","recall"]},
      {t:"Parent-child / small-to-big", k:["parent","small-to-big","small to big"]}],
    model:"It depends on the documents and questions, so I decide with data. Chunks that are too small lose context and split answers across pieces; chunks that are too large dilute relevance and waste tokens. I start with structure-aware recursive splitting — by heading, then paragraph — around 300–800 tokens with 10–20% overlap, keeping tables whole. For precise retrieval with enough context I use parent–child: retrieve small chunks, pass their parent section to the model. Then I compare two or three settings on a golden set using recall@k and answer faithfulness, and pick the winner." },
  { id:"w18", m:10, q:"What is an AI agent, and how is it different from a chatbot or a workflow?",
    points:[
      {t:"LLM decides actions", k:["decide","choose","plan"]},
      {t:"Uses tools", k:["tool"]},
      {t:"Loop with observations", k:["loop","observ","iterat","repeat"]},
      {t:"Memory", k:["memory"]},
      {t:"Workflow = fixed path vs agent = dynamic", k:["fixed","predefined","workflow","dynamic"]},
      {t:"Guardrails / limits", k:["limit","guardrail","human","max steps","step limit"]}],
    model:"An agent is an LLM running in a loop: it plans the next step, calls a tool such as search, a database or an API, observes the result, and repeats until the goal is met, often with memory of earlier steps. A plain chatbot just replies to each message. A workflow also uses LLMs and tools, but the path is fixed in code — classify, then retrieve, then answer. Agents are useful when the steps can't be predicted in advance, but they're slower, costlier and less predictable, so I start with a workflow and add autonomy only where needed, always with step limits, validated tool inputs and human approval for risky actions." },
  { id:"w19", m:10, q:"Explain function calling / tool use step by step.",
    points:[
      {t:"Describe tools with JSON schema", k:["schema","json","describe","definition"]},
      {t:"Model returns tool name + arguments", k:["argument","tool name","returns a call","tool_use"]},
      {t:"Your code executes", k:["your code","application","execute","run the"]},
      {t:"Result sent back", k:["result","send back","tool_result","observation"]},
      {t:"Final answer", k:["final"]},
      {t:"Validate args / handle errors", k:["validat","error"]}],
    model:"First I describe each tool to the model with a name, a clear description and a JSON schema for its arguments. When a user asks something like 'what's the weather in Chennai?', the model doesn't answer directly; it returns a structured tool call — the tool name and arguments such as city: Chennai. My application validates those arguments and executes the real function or API. I send the result back to the model as a tool result, and it either calls another tool or writes the final answer. The model never runs code itself; my code stays in control, which is where I add validation, permissions and error handling." },
  { id:"w20", m:10, q:"What is MCP and why does it matter?",
    points:[
      {t:"Open protocol / standard", k:["open","protocol","standard"]},
      {t:"Introduced by Anthropic (2024)", k:["anthropic","2024"]},
      {t:"Client–server", k:["client","server"]},
      {t:"Tools, resources, prompts", k:["tool","resource","prompt"]},
      {t:"Build once, reuse everywhere", k:["once","reuse","any client","many","usb"]},
      {t:"Security / auth", k:["auth","security","permission"]}],
    model:"MCP, the Model Context Protocol, is an open standard introduced by Anthropic in 2024 for connecting AI applications to external tools and data. An MCP server exposes tools (actions), resources (data) and prompts; an MCP client — Claude apps, IDEs, agent frameworks — connects to it. It matters because you build an integration once and any compatible client can use it, instead of writing custom glue for every app and model; people compare it to USB-C for AI. In practice I'd wrap an internal API as an MCP server, with authentication and least-privilege permissions, so different assistants can use it safely." },
  { id:"w21", m:11, q:"Prompting vs RAG vs fine-tuning — how do you decide?",
    points:[
      {t:"Prompting first (cheap, fast)", k:["prompt first","start with prompt","cheap","prompting"]},
      {t:"RAG for knowledge / fresh / private / citations", k:["knowledge","fresh","private","citation","rag"]},
      {t:"Fine-tune for behaviour / format / style", k:["behavio","format","style","tone"]},
      {t:"Fine-tune for smaller/cheaper model", k:["smaller","cheaper","latency","distil"]},
      {t:"Combine", k:["combine","both","together"]},
      {t:"Data and evaluation", k:["data","eval"]}],
    model:"I climb a ladder. Start with prompting because it's cheapest and fastest to change. If the problem is missing or changing knowledge — company policies, recent data — use RAG, which also gives citations. If the problem is behaviour — a consistent output format, tone, domain jargon, a narrow task — or I need a smaller, cheaper, faster model to match a big one, fine-tune, usually with LoRA. Often the best system combines them: a fine-tuned model that follows our format, fed by RAG. The decision is driven by an evaluation set: I only move up the ladder when the cheaper option measurably fails." },
  { id:"w22", m:11, q:"Explain LoRA and QLoRA.",
    points:[
      {t:"Freeze base weights", k:["freeze","frozen"]},
      {t:"Low-rank matrices A and B", k:["low-rank","low rank","matrices","a and b","ba"]},
      {t:"Few trainable parameters", k:["few","small","1%","fraction","less than"]},
      {t:"Rank r", k:["rank"]},
      {t:"QLoRA = 4-bit quantized base", k:["4-bit","4 bit","quantiz"]},
      {t:"Fits on one GPU / cheap", k:["gpu","memory","cheap","colab"]}],
    model:"LoRA, low-rank adaptation, freezes the original model weights and learns a small update for selected weight matrices as the product of two thin matrices, B times A, with a small rank r such as 8 to 64. That means training well under 1% of the parameters, needing far less GPU memory, and producing adapters of a few megabytes that can be swapped per task. QLoRA applies LoRA on top of a base model loaded in 4-bit quantization, which cuts memory further so a 7–8B model can be fine-tuned on a single consumer or free Colab GPU with little quality loss." },
  { id:"w23", m:12, q:"How do you evaluate an LLM application?",
    points:[
      {t:"Golden dataset", k:["golden","test set","dataset"]},
      {t:"Define criteria / metrics", k:["criteria","metric","rubric"]},
      {t:"Code checks / exact match", k:["exact","code check","format","json","assert"]},
      {t:"LLM-as-judge", k:["judge"]},
      {t:"Human review", k:["human"]},
      {t:"RAG: retrieval + generation metrics", k:["recall","faithful","retriev"]},
      {t:"Online: A/B, feedback", k:["a/b","online","feedback","production"]},
      {t:"Regression on every change", k:["regression","ci","every change"]}],
    model:"I start by defining what 'good' means for the task, then build a golden dataset of 50–200 realistic inputs with expected answers or rubrics, including edge and adversarial cases. I score with layered methods: code checks for format and exact answers, an LLM judge with a clear rubric calibrated against human labels, and human review for high-stakes samples. For RAG I split retrieval metrics like recall@k from generation metrics like faithfulness. I run this suite as a regression test on every prompt, model or index change, and after release I track online signals: A/B results, thumbs up/down, task success, cost and latency." },
  { id:"w24", m:12, q:"What is LLM-as-a-judge and what are its pitfalls?",
    points:[
      {t:"Model grades outputs with a rubric", k:["rubric","grade","score"]},
      {t:"Pointwise vs pairwise", k:["pairwise","pointwise","compare"]},
      {t:"Position bias", k:["position","order"]},
      {t:"Verbosity bias", k:["verbos","longer","length"]},
      {t:"Self-preference", k:["self-preference","own output","same model","self preference"]},
      {t:"Calibrate with humans", k:["human","calibrat","agreement"]}],
    model:"LLM-as-a-judge uses a strong model to grade outputs, either pointwise against a rubric — say faithfulness from 1 to 5 — or pairwise, choosing the better of two answers. It scales evaluation cheaply, but it has biases: position bias (favouring the first answer), verbosity bias (favouring longer answers) and self-preference (favouring outputs from its own model family). I mitigate with a specific rubric and examples, temperature 0, asking for reasoning before the score, swapping answer order in pairwise tests, and checking agreement with a sample of human labels before trusting it." },
  { id:"w25", m:13, q:"How would you deploy and monitor an LLM app in production?",
    points:[
      {t:"API service / container", k:["api","fastapi","container","docker","service"]},
      {t:"Secrets management", k:["secret","vault","env"]},
      {t:"Retries / fallbacks / timeouts", k:["retry","fallback","timeout"]},
      {t:"Tracing & logging tokens/latency/cost", k:["trac","log","token","latency","cost"]},
      {t:"Dashboards & alerts", k:["dashboard","alert","monitor"]},
      {t:"Versioned prompts + regression evals", k:["version","regression","eval"]},
      {t:"Guardrails", k:["guardrail","moderation","pii"]},
      {t:"Feedback loop", k:["feedback"]}],
    model:"I package the app as an API service, for example FastAPI in a container, with secrets from a vault. A model gateway handles routing, timeouts, retries with backoff and fallback models. Input and output guardrails handle PII redaction, moderation and schema validation. Every call is traced with the prompt version, model, tokens, latency and cost using a tool like Langfuse or LangSmith, feeding dashboards and alerts on error rate, latency and spend. Prompts and models are versioned, every change must pass the regression eval suite, and releases go out as canaries. User feedback and failed cases flow back into the golden set." },
  { id:"w26", m:14, q:"How would you build a safe GenAI assistant in healthcare?",
    points:[
      {t:"Privacy: PII/PHI, HIPAA/DPDP", k:["pii","phi","hipaa","dpdp","privacy","redact"]},
      {t:"Access control / permission-aware retrieval", k:["access","permission","role"]},
      {t:"Grounding + citations", k:["ground","citation","source","rag"]},
      {t:"No medical advice / human in loop", k:["medical advice","human","clinician","escalat"]},
      {t:"Guardrails / moderation", k:["guardrail","moderation","filter"]},
      {t:"Audit logs", k:["audit","log"]},
      {t:"Evaluation / red-teaming", k:["eval","red team","red-team","test"]}],
    model:"I'd start with privacy: minimise data, redact PHI before it reaches the model or logs, follow HIPAA or India's DPDP Act, and check the provider's data-retention terms. Retrieval is permission-aware so users only see documents they're allowed to. Answers are grounded in approved sources with citations and an explicit 'I don't know'. Output guardrails block diagnosis or treatment advice and escalate to a human for anything clinical or high-impact. Every interaction is audit-logged. Before launch I red-team for prompt injection and data leakage, and I evaluate accuracy and faithfulness on a reviewed golden set, re-running it on every change." },
  { id:"w27", m:15, q:"Explain how diffusion models generate images.",
    points:[
      {t:"Forward process adds noise", k:["add noise","adding noise","forward"]},
      {t:"Model learns to denoise", k:["denois","remove noise","removing noise","reverse"]},
      {t:"Generation starts from random noise", k:["random noise","pure noise","start from noise"]},
      {t:"Many steps", k:["step","iterat"]},
      {t:"Text conditioning (CLIP/text encoder)", k:["text","clip","prompt","condition"]},
      {t:"Latent space (Stable Diffusion)", k:["latent","vae"]}],
    model:"During training, a diffusion model takes real images and gradually adds noise over many steps, learning to predict and remove that noise at each step. To generate, it starts from pure random noise and repeatedly denoises it, step by step, until an image appears. The process is conditioned on a text embedding from a text encoder such as CLIP, so the denoising moves toward what the prompt describes; classifier-free guidance controls how strictly. Stable Diffusion does all this in a compressed latent space produced by a VAE, which makes it far cheaper than working on full-resolution pixels." },
  { id:"w28", m:16, q:"Design a document Q&A assistant over 50,000 internal PDFs.",
    points:[
      {t:"Clarify users, scale, latency, success", k:["clarify","users","latency","scale","success"]},
      {t:"Ingestion: parse, OCR, chunk, embed", k:["pars","ocr","chunk","ingest"]},
      {t:"Vector DB + hybrid + metadata", k:["vector","hybrid","metadata","bm25"]},
      {t:"Permissions", k:["permission","access"]},
      {t:"Rerank + LLM with citations", k:["rerank","citation","cite"]},
      {t:"Evaluation", k:["eval","golden","recall","faithful"]},
      {t:"Cost/latency: caching, routing, streaming", k:["cache","routing","stream","cost"]},
      {t:"Monitoring & feedback", k:["monitor","feedback","trac"]}],
    model:"First I'd clarify: who uses it, how many queries per day, latency target, document types, update frequency, permissions and how we'll measure success. Ingestion: layout-aware parsing with OCR for scans, structure-aware chunking, embeddings, stored in a vector DB with metadata like department and access group, plus a BM25 index; re-index on document change. Query: rewrite the question, hybrid retrieval filtered by the user's permissions, rerank the top 30, and answer with a prompt that requires citations and allows 'I don't know'. Evaluation with a 150-question golden set for recall@k and faithfulness. Stream responses, cache frequent questions, route simple ones to a small model, and trace everything with feedback buttons feeding the golden set." },
  { id:"w29", m:16, q:"How would you measure the success of a GenAI feature from a business point of view?",
    points:[
      {t:"Business outcome metric", k:["deflection","resolution","time saved","revenue","conversion","outcome"]},
      {t:"Quality / accuracy", k:["quality","accura","eval","faithful"]},
      {t:"Adoption / usage", k:["adoption","usage","active","retention"]},
      {t:"Cost per task", k:["cost"]},
      {t:"User satisfaction", k:["csat","satisfaction","feedback","nps"]},
      {t:"Safety / incidents", k:["safety","incident","escalat","risk"]}],
    model:"I'd tie it to the outcome the feature exists for. For a support bot that's resolution or deflection rate and time to resolution; for an internal tool, hours saved per week. Alongside that I'd track quality from the evaluation suite, adoption and retention, cost per resolved task including model spend, user satisfaction via CSAT or thumbs feedback, and safety signals like escalations and incidents. I'd set a baseline before launch, run an A/B or phased rollout, and review all of these on one dashboard, so we can show for example that 38% of tickets are resolved without an agent at ₹4 per ticket." },
  { id:"w30", m:16, q:"Tell me about a GenAI project you built.",
    points:[
      {t:"Situation / problem", k:["problem","situation","needed","challenge"]},
      {t:"Your role", k:["i built","i designed","my role","i owned","i led"]},
      {t:"Architecture / stack", k:["stack","python","rag","vector","fastapi","streamlit","architecture"]},
      {t:"Hardest problem and fix", k:["hardest","issue","bug","fixed","solved"]},
      {t:"Measured result", k:["%","percent","reduced","improved","from","seconds"]},
      {t:"Learning / next steps", k:["learn","next","improve","would change"]}],
    model:"Use STAR plus learning. Example: 'Policy documents were hard to search, so people asked the same questions repeatedly. I built a RAG assistant over public insurance policy PDFs: layout-aware parsing, section-based chunking, hybrid BM25 plus vector search in Chroma, a reranker, and an answer prompt that requires citations, served with FastAPI and Streamlit. The hardest problem was tables being split across chunks, which caused wrong answers; I kept tables whole and added parent-section retrieval. On a 40-question golden set, recall@5 went from 62% to 88% and faithfulness to 94%. Next I'd add permission filters and an online feedback loop.'" }
];

const CODING = [
  { id:"c1", m:3, title:"Cosine similarity and top-k search",
    task:"Write cosine(a, b) and top_k(query_vec, doc_vecs, k) that returns the k most similar documents as (index, score) pairs, highest first. Handle zero vectors.",
    hints:["cos = dot(a, b) / (norm(a) * norm(b))","Guard against division by zero.","sorted(..., key=lambda x: x[1], reverse=True)[:k]"],
    check:["Returns 1.0 for identical vectors","No crash on a zero vector","Sorted highest first","Explains O(n·d) cost and why ANN is used at scale"],
    solution:String.raw`import numpy as np

def cosine(a, b):
    a, b = np.array(a, dtype=float), np.array(b, dtype=float)
    denom = np.linalg.norm(a) * np.linalg.norm(b)
    return 0.0 if denom == 0 else float(a @ b / denom)

def top_k(query_vec, doc_vecs, k=3):
    scores = [(i, cosine(query_vec, v)) for i, v in enumerate(doc_vecs)]
    return sorted(scores, key=lambda x: x[1], reverse=True)[:k]

docs = [[1, 0, 1], [0, 1, 0], [1, 1, 1]]
print(top_k([1, 0, 1], docs, k=2))   # [(0, ~1.0), (2, 0.816...)]` },

  { id:"c2", m:9, title:"Text chunker with overlap",
    task:"Write chunk_text(text, chunk_size, overlap) that splits text into word-based chunks of chunk_size words where consecutive chunks share overlap words. Reject overlap >= chunk_size.",
    hints:["step = chunk_size - overlap","Stop when the current chunk reaches the end of the text.","Test on a tiny string such as 'w0 w1 ... w9'."],
    check:["Consecutive chunks share exactly `overlap` words","No empty or duplicate final chunk","Raises an error for invalid overlap","Can explain why overlap helps retrieval"],
    solution:String.raw`def chunk_text(text, chunk_size=200, overlap=40):
    if overlap >= chunk_size:
        raise ValueError("overlap must be smaller than chunk_size")
    words = text.split()
    chunks, start = [], 0
    step = chunk_size - overlap
    while start < len(words):
        chunks.append(" ".join(words[start:start + chunk_size]))
        if start + chunk_size >= len(words):
            break
        start += step
    return chunks

sample = " ".join(f"w{i}" for i in range(10))
print(chunk_text(sample, chunk_size=4, overlap=1))
# ['w0 w1 w2 w3', 'w3 w4 w5 w6', 'w6 w7 w8 w9']` },

  { id:"c3", m:4, title:"Scaled dot-product attention in NumPy",
    task:"Implement attention(Q, K, V, causal=False) returning the output and the attention weights. Use a numerically stable softmax and support a causal mask.",
    hints:["scores = Q @ K.T / sqrt(d_k)","Subtract the row max before exp for stability.","np.triu(ones, k=1) marks future positions; set them to a large negative number."],
    check:["Weights in each row sum to 1","Upper triangle is 0 when causal=True","Output shape is (n_tokens, d_v)","Can explain why √dₖ is used"],
    solution:String.raw`import numpy as np

def softmax(x, axis=-1):
    x = x - x.max(axis=axis, keepdims=True)   # numerical stability
    e = np.exp(x)
    return e / e.sum(axis=axis, keepdims=True)

def attention(Q, K, V, causal=False):
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)            # (n, n)
    if causal:
        n = scores.shape[0]
        mask = np.triu(np.ones((n, n)), k=1).astype(bool)
        scores = np.where(mask, -1e9, scores)  # hide future tokens
    weights = softmax(scores, axis=-1)
    return weights @ V, weights

np.random.seed(0)
X = np.random.randn(4, 8)                      # 4 tokens, dimension 8
Wq, Wk, Wv = (np.random.randn(8, 8) for _ in range(3))
out, w = attention(X @ Wq, X @ Wk, X @ Wv, causal=True)
print(out.shape)                               # (4, 8)
print(w.round(2))                              # upper triangle is 0` },

  { id:"c4", m:6, title:"Sampling: temperature, top-k, top-p",
    task:"Write sample_next(logits, temperature, top_k, top_p) that returns the index of the next token. temperature=0 means greedy.",
    hints:["Divide logits by temperature, then softmax.","Sort probabilities descending; keep the first k for top-k.","For top-p, keep the smallest prefix whose cumulative probability reaches p; renormalise before sampling."],
    check:["temperature=0 always returns argmax","Removed tokens get probability 0","Probabilities are renormalised","Can explain when to use each setting"],
    solution:String.raw`import numpy as np

def sample_next(logits, temperature=1.0, top_k=None, top_p=None, rng=None):
    rng = rng or np.random.default_rng()
    logits = np.array(logits, dtype=float)
    if temperature == 0:
        return int(np.argmax(logits))              # greedy
    logits = logits / temperature
    probs = np.exp(logits - logits.max())
    probs /= probs.sum()
    order = np.argsort(probs)[::-1]                # most likely first
    keep = np.ones_like(probs, dtype=bool)
    if top_k is not None:
        keep[:] = False
        keep[order[:top_k]] = True
    if top_p is not None:
        cum = np.cumsum(probs[order])
        cutoff = np.searchsorted(cum, top_p) + 1   # smallest set reaching top_p
        nucleus = np.zeros_like(keep)
        nucleus[order[:cutoff]] = True
        keep &= nucleus
    probs = np.where(keep, probs, 0)
    probs /= probs.sum()
    return int(rng.choice(len(probs), p=probs))

logits = [2.0, 1.0, 0.1, -1.0]
print(sample_next(logits, temperature=0))                  # 0
print(sample_next(logits, temperature=0.7, top_p=0.9))     # usually 0 or 1` },

  { id:"c5", m:1, title:"Retry with exponential backoff and jitter",
    task:"Write with_retry(fn, max_attempts, base, cap) that calls fn and retries on rate-limit or timeout errors with exponential backoff and full jitter. Re-raise after the last attempt.",
    hints:["delay = min(cap, base * 2 ** (attempt - 1))","Full jitter: random.uniform(0, delay)","Only retry errors that are worth retrying (429, timeouts, 5xx) — not 401."],
    check:["Doesn't retry forever","Re-raises the original error at the end","Delay grows exponentially and is capped","Knows that official SDKs also have a max_retries option"],
    solution:String.raw`import random, time

class RateLimitError(Exception):
    pass

def with_retry(fn, max_attempts=5, base=1.0, cap=30.0):
    for attempt in range(1, max_attempts + 1):
        try:
            return fn()
        except (RateLimitError, TimeoutError) as e:
            if attempt == max_attempts:
                raise
            delay = min(cap, base * 2 ** (attempt - 1))
            delay = random.uniform(0, delay)            # full jitter
            print(f"attempt {attempt} failed ({e}); retrying in {delay:.1f}s")
            time.sleep(delay)

# demo: fails twice, then succeeds
calls = {"n": 0}
def flaky():
    calls["n"] += 1
    if calls["n"] < 3:
        raise RateLimitError("429")
    return "ok"

print(with_retry(flaky, base=0.1))` },

  { id:"c6", m:7, title:"Structured output with Pydantic and a repair retry",
    task:"Extract vendor, total and currency from invoice text using an LLM. Validate with Pydantic; if the JSON is invalid, retry with the error message added to the prompt (max 3 tries).",
    hints:["Define class Invoice(BaseModel) with typed fields.","Catch both json.JSONDecodeError and ValidationError.","Feed the error back so the model can fix itself."],
    check:["Uses a schema, not string parsing","Bounded retries","Untrusted text wrapped in tags","Fails loudly (or flags for review) after max tries"],
    solution:String.raw`import json
from pydantic import BaseModel, ValidationError, Field

class Invoice(BaseModel):
    vendor: str
    total: float = Field(ge=0)
    currency: str

def call_llm(prompt):          # replace with a real API call (temperature 0)
    return '{"vendor": "Acme", "total": 1250.5, "currency": "INR"}'

def extract_invoice(text, max_tries=3):
    prompt = ("Extract vendor, total, currency from the invoice below. "
              "Reply with JSON only, keys: vendor, total, currency.\n"
              f"<invoice>{text}</invoice>")
    for _ in range(max_tries):
        raw = call_llm(prompt)
        try:
            return Invoice.model_validate(json.loads(raw))
        except (json.JSONDecodeError, ValidationError) as err:
            prompt += f"\nYour last reply was invalid: {err}. Return valid JSON only."
    raise ValueError("model never returned valid JSON")

print(extract_invoice("Acme Pvt Ltd ... Grand total Rs 1,250.50"))` },

  { id:"c7", m:9, title:"Mini RAG pipeline from scratch",
    task:"Build index → retrieve → prompt for three small policy documents without any framework. Use a simple word-count embedding as a stand-in, retrieve top-k by cosine, and build a grounded prompt that asks for citations.",
    hints:["Counter of lowercase words is a fine stand-in embedding.","Index once; embed the query at question time.","The prompt must say: only use the context, cite [file], say you don't know."],
    check:["Indexing and querying are separate steps","Right document ranks first","Prompt enforces grounding and citations","Can say what to swap for production (real embeddings, vector DB, reranker)"],
    solution:String.raw`import math, re
from collections import Counter

DOCS = {
    "leave.md": "Employees get 12 casual leaves per year. Unused casual leave lapses in December.",
    "wfh.md": "Work from home is allowed two days a week with manager approval.",
    "travel.md": "Travel claims must be submitted within 30 days with receipts.",
}

def embed(text):                       # stand-in: word counts; swap for a real embedding model
    return Counter(re.findall(r"[a-z0-9]+", text.lower()))

def cos(a, b):
    dot = sum(a[t] * b[t] for t in a)
    na = math.sqrt(sum(v * v for v in a.values()))
    nb = math.sqrt(sum(v * v for v in b.values()))
    return dot / (na * nb) if na and nb else 0.0

INDEX = [(name, text, embed(text)) for name, text in DOCS.items()]   # indexing step

def retrieve(query, k=2):
    q = embed(query)
    return sorted(INDEX, key=lambda d: cos(q, d[2]), reverse=True)[:k]

def build_prompt(query, hits):
    context = "\n".join(f"[{name}] {text}" for name, text, _ in hits)
    return ("Answer using ONLY the context. Cite sources like [file]. "
            "If the answer is not in the context, say you don't know.\n"
            f"<context>\n{context}\n</context>\nQuestion: {query}")

q = "How many casual leaves do I get?"
hits = retrieve(q)
print([h[0] for h in hits])            # leave.md first
print(build_prompt(q, hits))           # send this to the LLM` },

  { id:"c8", m:10, title:"Tool-calling agent loop",
    task:"Write run_agent(user_msg, max_steps) that loops: ask the model for a decision, run the chosen tool with its arguments, append the result, and stop on a final answer or step limit. Handle unknown tools and bad arguments.",
    hints:["Keep a TOOLS dict mapping names to functions.","The model's decision is either a tool call or a final answer.","Catch TypeError for wrong arguments and return the error to the model."],
    check:["Has a hard step limit","Unknown tool and bad args don't crash the loop","Tool results go back into messages","Can explain where human approval would go"],
    solution:String.raw`def calculator(expression: str) -> str:
    allowed = set("0123456789+-*/(). ")
    if not set(expression) <= allowed:
        return "error: invalid characters"
    return str(eval(expression))            # acceptable only because input is whitelisted

def get_weather(city: str) -> str:
    return {"chennai": "33°C, humid"}.get(city.lower(), "unknown")

TOOLS = {"calculator": calculator, "get_weather": get_weather}

def fake_llm(messages):
    """Stands in for a real model with tool calling."""
    if messages[-1]["role"] == "user":
        return {"tool": "calculator", "args": {"expression": "1250*18/100"}}
    return {"final": f"GST on 1250 at 18% is {messages[-1]['content']}."}

def run_agent(user_msg, max_steps=5):
    messages = [{"role": "user", "content": user_msg}]
    for step in range(max_steps):            # hard stop prevents infinite loops
        decision = fake_llm(messages)
        if "final" in decision:
            return decision["final"]
        name, args = decision["tool"], decision["args"]
        if name not in TOOLS:
            result = f"error: unknown tool {name}"
        else:
            try:
                result = TOOLS[name](**args)
            except TypeError as e:           # model sent wrong arguments
                result = f"error: {e}"
        print(f"step {step}: {name}({args}) -> {result}")
        messages.append({"role": "tool", "content": result})
    return "Stopped: too many steps."

print(run_agent("What is 18% GST on 1250?"))` },

  { id:"c9", m:13, title:"Conversation memory with a token budget",
    task:"Write trim_history(system, history, new_msg, budget, reserve_for_answer) that keeps the newest messages that fit in the token budget, and makes sure the kept history starts with a user turn.",
    hints:["Rough count: len(text) // 4 tokens.","Walk history from newest to oldest.","Many chat APIs require the first message to be from the user."],
    check:["Never exceeds the budget","Keeps newest messages, drops oldest","History starts with a user turn","Knows to use the real tokenizer/counting API for exact numbers"],
    solution:String.raw`def count_tokens(text):
    return max(1, len(text) // 4)      # rough: ~4 chars per token; use the real tokenizer for exact counts

def trim_history(system, history, new_msg, budget=1000, reserve_for_answer=300):
    limit = (budget - reserve_for_answer
             - count_tokens(system) - count_tokens(new_msg["content"]))
    kept, used = [], 0
    for msg in reversed(history):       # newest first
        t = count_tokens(msg["content"])
        if used + t > limit:
            break
        kept.append(msg)
        used += t
    while kept and kept[-1]["role"] != "user":   # oldest kept must be a user turn
        kept.pop()
    return list(reversed(kept)) + [new_msg]

history = [{"role": "user", "content": "x" * 2000},
           {"role": "assistant", "content": "y" * 400},
           {"role": "user", "content": "z" * 400},
           {"role": "assistant", "content": "w" * 400}]
msgs = trim_history("You are helpful.", history, {"role": "user", "content": "next?"})
print([m["role"] for m in msgs])   # ['user', 'assistant', 'user']` },

  { id:"c10", m:12, title:"Evaluation harness: exact match + LLM judge",
    task:"Given a golden set of questions and expected answers, run your app on each, score exact match (after normalising) and a judge score, and print a report. Show why exact match alone is too strict.",
    hints:["Normalise: lowercase, strip punctuation and extra spaces.","The judge prompt needs the question, reference and answer, and returns JSON.","Report per-case rows and totals."],
    check:["Normalisation before comparing","Judge prompt includes a reference answer","Totals reported","Can explain judge biases and calibration"],
    solution:String.raw`golden = [
    {"q": "Capital of India?", "expected": "New Delhi"},
    {"q": "2 + 2?", "expected": "4"},
    {"q": "Who wrote Thirukkural?", "expected": "Thiruvalluvar"},
]

def my_app(question):                      # the system under test
    return {"Capital of India?": "New Delhi",
            "2 + 2?": "The answer is 4",
            "Who wrote Thirukkural?": "Kambar"}[question]

def normalize(s):
    return " ".join(s.lower().strip(" .").split())

def exact_match(pred, exp):
    return normalize(pred) == normalize(exp)

JUDGE_PROMPT = """You are grading an answer.
Question: {q}
Reference: {expected}
Answer: {pred}
Reply with JSON: {{"score": 1 if the answer means the same as the reference else 0, "reason": "..."}}"""

def llm_judge(q, expected, pred):          # stub: replace with a real model call at temperature 0
    return 1 if normalize(expected) in normalize(pred) else 0

def evaluate():
    em_total = judge_total = 0
    for case in golden:
        pred = my_app(case["q"])
        em = exact_match(pred, case["expected"])
        j = llm_judge(case["q"], case["expected"], pred)
        em_total += em
        judge_total += j
        print(f"{case['q']:<25} {pred:<18} EM={int(em)} judge={j}")
    n = len(golden)
    print(f"Exact match {em_total}/{n} | Judge {judge_total}/{n}")

evaluate()   # EM 1/3 (too strict), judge 2/3 (catches the wrong author)` },

  { id:"c11", m:13, title:"Serve your RAG pipeline with FastAPI",
    task:"Create a POST /ask endpoint with request and response models (question → answer + sources), input length limits and a clean error for timeouts.",
    hints:["Pydantic models for request and response.","Field(min_length=..., max_length=...) blocks empty and huge inputs.","Raise HTTPException with a clear status code."],
    check:["Typed request/response","Input validation","Meaningful error codes","Knows how to run it and open /docs"],
    solution:String.raw`# pip install fastapi uvicorn pydantic
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI()

class AskRequest(BaseModel):
    question: str = Field(min_length=3, max_length=2000)

class AskResponse(BaseModel):
    answer: str
    sources: list[str]

def answer_with_rag(question: str) -> AskResponse:   # plug in exercise 7 here
    return AskResponse(answer="Employees get 12 casual leaves.", sources=["leave.md"])

@app.post("/ask", response_model=AskResponse)
def ask(req: AskRequest):
    try:
        return answer_with_rag(req.question)
    except TimeoutError:
        raise HTTPException(status_code=504, detail="Model timed out, please retry")

# save as main.py, run: uvicorn main:app --reload
# then open http://127.0.0.1:8000/docs to try it` },

  { id:"c12", m:13, title:"Semantic cache",
    task:"Build a SemanticCache with get(query) and set(query, answer) that returns a cached answer when a new query's embedding similarity is above a threshold.",
    hints:["Store normalised vectors so dot product = cosine.","Find the best match with argmax.","Threshold too low → wrong answers; too high → few hits."],
    check:["Returns None on an empty cache","Uses a threshold","Normalised vectors","Can discuss stale entries and TTL"],
    solution:String.raw`import numpy as np

class SemanticCache:
    def __init__(self, embed_fn, threshold=0.92):
        self.embed, self.threshold = embed_fn, threshold
        self.keys, self.values = [], []

    def get(self, query):
        if not self.keys:
            return None
        q = self.embed(query)
        sims = np.array(self.keys) @ q             # normalised, so dot = cosine
        best = int(sims.argmax())
        return self.values[best] if sims[best] >= self.threshold else None

    def set(self, query, answer):
        self.keys.append(self.embed(query))
        self.values.append(answer)

def toy_embed(text):                                # replace with a real embedding model
    v = np.zeros(26)
    for ch in text.lower():
        if "a" <= ch <= "z":
            v[ord(ch) - 97] += 1
    n = np.linalg.norm(v)
    return v / n if n else v

cache = SemanticCache(toy_embed, threshold=0.9)
cache.set("What is RAG?", "Retrieval-augmented generation ...")
print(cache.get("what is rag"))     # hit
print(cache.get("Explain LoRA"))    # None -> call the LLM, then cache.set(...)` },

  { id:"c13", m:10, title:"Minimal MCP server",
    task:"Expose one tool, leave_balance(employee_id), through an MCP server using the official Python SDK, with a docstring the model can read.",
    hints:["pip install \"mcp[cli]\"","from mcp.server.fastmcp import FastMCP","Decorate the function with @mcp.tool(); type hints become the schema."],
    check:["Clear tool name and docstring","Typed arguments","Runs with mcp.run()","Can explain client/server and tools/resources/prompts"],
    solution:String.raw`# pip install "mcp[cli]"
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("leave-policy")

@mcp.tool()
def leave_balance(employee_id: str) -> str:
    """Return remaining casual leaves for an employee."""
    return {"E001": "7 days"}.get(employee_id, "not found")

if __name__ == "__main__":
    mcp.run()       # stdio transport; connect it from an MCP client` }
];
