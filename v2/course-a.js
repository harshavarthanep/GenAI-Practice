/* GenAI Mastery — course content, part 1 (Levels 0–3).
   Lesson fields: id, lv (level), t (title), min (minutes), big (one-line idea), why (why it matters),
   body (paragraphs; "- " = bullet; **bold**, `code`, ==highlight==), ex (real-life example),
   lang (py | sql | sh | text), run (true = runnable here), code, mist (mistakes), faq [[q, a]],
   iq [[interview q, answer]], cheat (one-liners), quiz [[q, [options], answerIndex, why]], cards [[front, back]] */
globalThis.LEVELS = [
  { n: 0, t: "Start from zero", d: "How computers and the internet work, thinking like a programmer, your tools.", stage: 0 },
  { n: 1, t: "Python", d: "The language of AI, from your first variable to APIs, classes and interview problems.", stage: 0 },
  { n: 2, t: "Data & SQL", d: "Ask questions of databases with SQL, then work with data in NumPy and Pandas.", stage: 0 },
  { n: 3, t: "Maths for AI", d: "Vectors, probability and slopes — only the intuition you actually need.", stage: 0 },
  { n: 4, t: "Machine learning", d: "How machines learn from examples, how to measure them, and how they fail.", stage: 1 },
  { n: 5, t: "Deep learning", d: "Neural networks, how they train, and the architectures that came before transformers.", stage: 1 },
  { n: 6, t: "Language & NLP", d: "Turning text into numbers: classic NLP, tokens and embeddings.", stage: 1 },
  { n: 7, t: "Transformers & LLMs", d: "Attention, how LLMs are trained and run, and where they break.", stage: 1 },
  { n: 8, t: "Building with LLMs", d: "APIs, prompting, structured output, vector databases, RAG, agents and MCP.", stage: 2 },
  { n: 9, t: "Customising models", d: "Fine-tuning with LoRA and QLoRA, data, preference tuning and distillation.", stage: 2 },
  { n: 10, t: "Production & responsibility", d: "Evaluation, deployment, LLMOps, safety, ethics and multimodal models.", stage: 3 },
  { n: 11, t: "Interviews & career", d: "System design, the interview playbook, portfolio projects and roles.", stage: 3 }
];
globalThis.STAGES = [
  { t: "Foundations", d: "Levels 0–3. Learn to code, query data and understand the maths." },
  { t: "Core AI", d: "Levels 4–7. Understand how machine learning and LLMs really work." },
  { t: "Build", d: "Levels 8–9. Build real GenAI apps: RAG, agents, fine-tuning." },
  { t: "Ship & get hired", d: "Levels 10–11. Make it production-ready and crack the interview." }
];
globalThis.COURSE = globalThis.COURSE || [];
COURSE.push(

/* ================= LEVEL 0 — START FROM ZERO ================= */
{ id: "computers", lv: 0, t: "How computers and the internet work", min: 15,
  big: "A computer stores numbers and follows instructions; the internet is computers sending each other requests and responses.",
  why: "Every AI app is software running on computers that talk over the internet. When someone says “the model runs on GPUs” or “the API returned 429”, you need to know exactly what that means.",
  body: [
    "**Hardware** is the physical machine:",
    "- **CPU** — the general-purpose brain. Follows instructions one after another, very fast.",
    "- **GPU** — thousands of small cores doing maths at the same time. ==AI uses GPUs because neural networks are mostly huge multiplications that can run in parallel.==",
    "- **RAM** — short-term working memory. Fast, but wiped when power goes off.",
    "- **Storage (SSD)** — long-term memory for files.",
    "**Everything is numbers.** Text, photos and audio are stored as numbers (ultimately 0s and 1s). That is why a model can “read” text or “see” images — it only ever does maths on numbers.",
    "**Software** is a list of instructions. The **operating system** (Windows, macOS, Linux, Android) manages the hardware so other programs can run.",
    "**The internet** works by request and response. Your app (the **client**) sends a **request** to another computer (the **server**), which sends back a **response**. The rules for this conversation are called **HTTP**; the address is a **URL**.",
    "An **API** (application programming interface) is a menu one program offers to other programs: “send me this, I’ll send you that.” Data usually travels as **JSON**, a simple text format.",
    "**Status codes** tell you what happened: `200` OK · `400` your request is wrong · `401` missing or bad key · `404` not found · `429` too many requests · `500` server error.",
    "The **cloud** is renting other people’s computers (AWS, Azure, Google Cloud). When you call an AI model through an API, it runs on the provider’s GPUs, not on your laptop."
  ],
  ex: "Ordering on Swiggy: the app (client) sends your order as JSON to Swiggy’s server through its API; the server replies 200 with an order ID. Calling ChatGPT or Claude from code is the same: you send JSON with your prompt, you get JSON back with the answer.",
  lang: "py", run: true,
  code: `import json

order = {"item": "Masala dosa", "qty": 2, "price": 60}
text = json.dumps(order)        # Python dict -> JSON text (what travels over the internet)
print(text)

back = json.loads(text)         # JSON text -> Python dict again
print("Total:", back["qty"] * back["price"])`,
  mist: ["Thinking the AI model runs inside your laptop when you use an API — it runs on the provider’s servers.", "Confusing RAM (temporary) with storage (permanent).", "Treating every error the same — the status code tells you whether to fix your request (4xx) or wait and retry (429, 5xx)."],
  faq: [
    ["Why do AI models need GPUs?", "A neural network is mostly multiplying huge grids of numbers. A GPU does thousands of these multiplications at once, so it is often 10–100× faster than a CPU for this work."],
    ["What is the difference between an API and a website?", "A website is made for people (pages, buttons). An API is made for programs (structured requests and JSON responses). Many companies offer both."],
    ["Is JSON a programming language?", "No. It is a text format for data — like a very strict form. Every programming language can read and write it."],
    ["What is HTTPS?", "HTTP with encryption, so nobody in the middle can read your data or your API key. Always use HTTPS for APIs."]
  ],
  iq: [["What happens when you call an LLM API?", "My code builds a JSON request with the model name, messages and settings, and sends it over HTTPS with an API key in a header. The provider runs the model on GPUs and returns JSON with the generated text and token usage. I check the status code: 200 is success, 401 means a bad key, 429 means I’m rate-limited and should retry with exponential backoff, and 5xx means a server problem worth retrying."]],
  cheat: ["CPU = general instructions; GPU = parallel maths (why AI uses GPUs).", "RAM = short-term; SSD = long-term.", "Client → request → server → response (HTTP). API = menu for programs. JSON = data format.", "200 OK · 400 bad request · 401 auth · 404 not found · 429 rate limit · 5xx server."],
  quiz: [["Why are GPUs used for AI?", ["They have more storage", "They do many maths operations in parallel", "They are cheaper than CPUs", "They have faster internet"], 1, "Neural networks are huge matrix multiplications; GPUs run thousands of them at once."],
         ["An API returns status 429. What does it mean?", ["Success", "Not found", "Too many requests — slow down and retry", "Bad JSON"], 2, "429 = rate limited. Wait, then retry with backoff."]],
  cards: [["API", "A menu one program offers to others: send a structured request, get a structured (usually JSON) response."], ["JSON", "A text format for structured data, e.g. {\"name\": \"Harsha\", \"city\": \"Chennai\"}."], ["HTTP 401 vs 429", "401 = missing/invalid key. 429 = too many requests (rate limit)."]]
},

{ id: "think", lv: 0, t: "Think like a programmer", min: 15,
  big: "Programming is breaking a problem into small, exact steps a computer can follow — and checking that each step works.",
  why: "Coding interviews test how you think, not memorised syntax. Even when AI writes code for you, you must know what to ask for and whether the answer is right.",
  body: [
    "An **algorithm** is a recipe: exact steps that turn an **input** into an **output**.",
    "**Pseudocode** is the recipe written in plain words before you write real code. It separates *thinking* from *typing*.",
    "Most programs are combinations of a few patterns:",
    "- **Do something to every item** (a loop).",
    "- **Keep a running total or count** (an accumulator).",
    "- **Choose between paths** (a condition).",
    "- **Package steps under a name** so you can reuse them (a function).",
    "**Decomposition**: break a big problem into small ones. “Build a chatbot for my documents” becomes: read files → split text → find relevant parts → ask the model → show the answer.",
    "**Edge cases** are unusual inputs that break code: an empty list, zero, a negative number, missing data, a very long text. ==Good programmers ask “what could go wrong?” before they ask “does it work?”==",
    "**Debugging is the scientific method:** reproduce the problem → read the error (the last line first) → guess the cause → test the guess (print values) → fix → test again.",
    "**Coding with AI the right way:** describe the input, the output, an example and the edge cases; then read every line it gives you, run it, and test it. You are the reviewer."
  ],
  ex: "A bill-splitting app: input = list of item prices and number of friends; process = add the prices, add GST, divide; output = amount per person. Edge cases: zero friends, an empty bill, rounding paise.",
  lang: "py", run: true,
  code: `# Pseudocode:
#   total = 0
#   for each price in the bill: add it to total
#   add 18% GST
#   split between friends (but never divide by zero!)

prices = [120, 60, 45]
friends = 3

total = 0
for p in prices:
    total = total + p
with_gst = total * 1.18

if friends > 0:
    print("Each pays:", round(with_gst / friends, 2))
else:
    print("Need at least one person")`,
  mist: ["Starting to type code before understanding the problem.", "Ignoring edge cases such as empty inputs or zero.", "Copying AI-generated code without running and testing it."],
  faq: [
    ["I’m not good at maths. Can I still learn to code and work in AI?", "Yes. Most programming is logic and patience. For AI you need the intuition behind a few ideas (vectors, probability, slopes), which Level 3 explains in plain language."],
    ["How do I get unstuck?", "Read the last line of the error, print the values just before the crash, shrink the problem to the smallest example that fails, then search or ask AI with the exact error and your code."],
    ["Should I memorise syntax?", "No. Understand the patterns (loop, condition, function). Syntax you can look up; interviewers care that you can reason and explain."],
    ["If AI can write code, why learn?", "Because you have to describe the problem precisely, judge whether the code is correct, fix it when it breaks and explain it in interviews. That needs understanding."]
  ],
  iq: [["How do you approach a coding problem you haven’t seen before?", "I restate the problem and confirm the input and output with an example, ask about edge cases, and write the simplest correct solution first in pseudocode. Then I code it, test it with a normal case and edge cases, and finally discuss time complexity and improvements. I think out loud the whole time so the interviewer can follow my reasoning."]],
  cheat: ["Understand → example → edge cases → pseudocode → code → test → improve.", "Patterns: loop, accumulator, condition, function.", "Debug: reproduce → read last line of error → print values → shrink → fix → retest."],
  quiz: [["What should you do first with a new coding problem?", ["Start typing code", "Clarify the input, output and an example", "Optimise for speed", "Pick a library"], 1, "Understanding comes first; it prevents solving the wrong problem."],
         ["Which is an edge case for a function that averages a list?", ["A list of 3 numbers", "An empty list", "A list of decimals", "A sorted list"], 1, "Averaging an empty list divides by zero."]],
  cards: [["Algorithm", "A precise, step-by-step recipe that turns input into output."], ["Edge case", "An unusual input that can break code: empty, zero, negative, missing, huge."]]
},

{ id: "tools", lv: 0, t: "Your toolkit: VS Code, terminal, Git, GitHub, Colab", min: 20,
  big: "Developers write code in an editor, run it from a terminal, save versions with Git and share them on GitHub.",
  why: "Every employer expects you to use Git and GitHub; your GitHub profile is your portfolio. Google Colab gives you free GPUs for AI experiments.",
  body: [
    "**Python**: install from python.org (on Windows tick “Add Python to PATH”). Check with `python --version`.",
    "**VS Code**: a free editor. Add the Python extension. Open a folder, create `app.py`, run it.",
    "**Terminal** (command line): type commands instead of clicking. Key ones: `cd folder` (go into), `ls` or `dir` (list files), `python app.py` (run a file).",
    "**Virtual environment** — a private box of packages for one project, so project A’s versions don’t break project B. Create it once, activate it every time you work.",
    "**pip** installs packages (`pip install requests`). `requirements.txt` lists them so anyone can rebuild your setup.",
    "**Secrets**: put API keys in a `.env` file and add `.env` to `.gitignore` so it is never uploaded.",
    "**Git** saves snapshots (**commits**) of your project so you can go back in time. **Branches** let you try ideas safely.",
    "**GitHub** is the website that hosts your Git projects online — for backup, sharing, collaboration (pull requests) and free hosting (GitHub Pages).",
    "**Jupyter notebooks** and **Google Colab** let you run code cell by cell and see results immediately — ideal for experiments and AI. Colab gives free GPUs.",
    "On your phone, use this app’s **Python playground** to practise anywhere."
  ],
  ex: "Git is like save points in a game: before the boss fight (a risky change) you save, and if it goes wrong you load the last save. A good commit message reads like a diary entry: “Add chunking to RAG pipeline”.",
  lang: "sh", run: false,
  code: `python -m venv .venv                 # create a virtual environment (once)
# Windows: .venv\\Scripts\\activate     Mac/Linux: source .venv/bin/activate
pip install requests python-dotenv   # install packages
pip freeze > requirements.txt        # record them

git init                             # start tracking this folder
git add .                            # stage all changes
git commit -m "First version of my RAG app"
git branch -M main
git remote add origin https://github.com/<you>/rag-app.git
git push -u origin main              # upload to GitHub`,
  mist: ["Committing `.env` or API keys to GitHub.", "Installing everything globally instead of in a virtual environment.", "Vague commit messages like “update”."],
  faq: [
    ["What is the difference between Git and GitHub?", "Git is the tool on your computer that tracks versions. GitHub is a website that stores Git projects online so you can share and collaborate."],
    ["Why a virtual environment?", "Different projects need different package versions. A virtual environment keeps each project’s packages separate so nothing clashes."],
    ["Notebook or .py file?", "Notebooks are great for exploring and showing results step by step. `.py` files are for real apps and reuse. Many projects start in a notebook and move to `.py`."],
    ["Do I need a powerful laptop?", "No. Use Google Colab or Kaggle for free GPUs, and API models run on the provider’s servers."]
  ],
  iq: [["How do you manage secrets in a project?", "I keep them in environment variables, loaded from a .env file with python-dotenv during development. .env is in .gitignore and I commit a .env.example without real values. In production I use the platform’s secret manager. If a key ever leaks, I revoke it immediately and rotate it."]],
  cheat: ["python -m venv .venv → activate → pip install → pip freeze > requirements.txt", "git add . → git commit -m \"msg\" → git push", ".env for secrets, listed in .gitignore", "Colab/Kaggle = free GPU notebooks"],
  quiz: [["Where should an API key go?", ["In the code", "In a .env file listed in .gitignore", "In the README", "In a commit message"], 1, "Keys must never be committed; .env + .gitignore keeps them local."],
         ["A Git commit is…", ["A snapshot of your project at a moment in time", "A server", "A Python package", "A deleted branch"], 0, "Commits are save points you can return to."]],
  cards: [["Virtual environment", "An isolated set of Python packages for one project."], ["Commit", "A saved snapshot of changes in Git, with a message."], ["requirements.txt", "List of packages so others can run: pip install -r requirements.txt"]]
},

/* ================= LEVEL 1 — PYTHON ================= */
{ id: "py-vars", lv: 1, t: "Variables and data types", min: 15,
  big: "A variable is a label for a value; its type tells Python what kind of value it is and what you can do with it.",
  why: "Every program stores and changes data — a prompt, a price, a list of documents. Types decide what is allowed: \"5\" + \"5\" is \"55\", but 5 + 5 is 10.",
  body: [
    "Create a variable with `=`: `city = \"Chennai\"`. The name is on the left, the value on the right.",
    "The core types:",
    "- `int` — whole numbers: `42`",
    "- `float` — decimals: `3.14`",
    "- `str` — text, in quotes: `\"hello\"`",
    "- `bool` — `True` or `False`",
    "- `None` — “nothing here yet”",
    "`type(x)` tells you the type. Convert with `int(\"5\")`, `float(\"2.5\")`, `str(10)`.",
    "Python is **dynamically typed**: you don’t declare types; a variable can point to a new type later.",
    "Names: use `snake_case`, start with a letter, no spaces. Choose names that explain the value: `total_price`, not `tp`.",
    "`=` **assigns**; `==` **compares**. Mixing them up is the most common beginner bug."
  ],
  ex: "A food order: item = \"Masala dosa\" (str), qty = 2 (int), price = 60.0 (float), paid = False (bool), coupon = None.",
  lang: "py", run: true,
  code: `item = "Masala dosa"
qty = 2
price = 60.0
paid = False
coupon = None

print(type(item), type(qty), type(price), type(paid))
print("Total:", qty * price)

print("5" + "5", 5 + 5)      # text joins, numbers add
print(int("5") + 5)          # convert text to a number first
print(0.1 + 0.2)             # tiny float rounding error
print(round(0.1 + 0.2, 2))`,
  mist: ["Adding text and numbers: \"5\" + 5 raises TypeError — convert first.", "Using = instead of == in a condition.", "Names with spaces or starting with a digit."],
  faq: [
    ["Why does 0.1 + 0.2 print 0.30000000000000004?", "Computers store decimals in binary, which cannot represent some fractions exactly. Round for display, and use the decimal module for money."],
    ["What is None used for?", "To say “no value yet” — for example an optional coupon, or a function that found nothing."],
    ["Do I need to declare types?", "No. Type hints (`price: float = 60.0`) are optional labels that help editors and tools catch mistakes; Pydantic uses them to validate data."]
  ],
  iq: [["What is the difference between mutable and immutable types?", "Immutable values cannot be changed in place — int, float, str, tuple; any change creates a new object. Mutable ones can — list, dict, set. It matters when passing values to functions and for default arguments: a mutable default like def f(x=[]) is shared across calls."]],
  cheat: ["int 5 · float 5.0 · str \"5\" · bool True/False · None", "type(x) · int(\"5\") · str(5) · float(\"2.5\")", "= assigns, == compares", "Round money for display; decimal module for exact money."],
  quiz: [["What does \"3\" + \"4\" give?", ["7", "\"34\"", "An error", "34.0"], 1, "Strings join end to end."],
         ["Which type is immutable?", ["list", "dict", "str", "set"], 2, "Strings can’t be changed in place; methods return new strings."]],
  cards: [["Variable", "A name that refers to a value in memory."], ["Mutable vs immutable", "Mutable can change in place (list, dict, set); immutable can’t (int, str, tuple)."]]
},

{ id: "py-strings", lv: 1, t: "Strings, operators and f-strings", min: 20,
  big: "Strings are text. GenAI work is mostly string work: building prompts, cleaning documents and reading model output.",
  why: "Prompts are strings. Cleaning text from PDFs, splitting it into chunks and filling prompt templates with f-strings are everyday GenAI tasks.",
  body: [
    "**Arithmetic**: `+ - * /`, `//` (whole-number division), `%` (remainder), `**` (power).",
    "**Comparison**: `== != < > <= >=` give `True`/`False`. **Logic**: `and`, `or`, `not`.",
    "**Indexing**: `s[0]` first character, `s[-1]` last. **Slicing**: `s[1:4]` — from 1 up to but *not including* 4.",
    "Useful methods: `.lower()`, `.upper()`, `.strip()` (trim spaces), `.replace(a, b)`, `.split()` (to a list of words), `\" \".join(list)` (back to text), `.startswith()`, `.find()`.",
    "**f-strings** insert values into text: `f\"Hello {name}, total {amount:.2f}\"`.",
    "**Triple quotes** `\"\"\"...\"\"\"` hold multi-line text — perfect for prompt templates.",
    "`\\n` is a new line. `len(s)` counts characters.",
    "Strings are **immutable**: `s.upper()` returns a *new* string; it does not change `s`."
  ],
  ex: "Text copied from a policy PDF arrives full of extra spaces and line breaks. You clean it with split/join, then drop it into a prompt template with an f-string.",
  lang: "py", run: true,
  code: `raw = "   Policy:  Dental cover is 50%  \\n"
clean = " ".join(raw.split())          # collapse spaces and newlines
print(clean, "|", len(clean))

question = "Is dental covered?"
prompt = f"""Answer using only the policy below.
Policy: {clean}
Question: {question}"""
print(prompt)

words = clean.split()
print(words[:3], words[-1])
print(17 // 5, 17 % 5, 2 ** 10)
print(f"{1234.5678:.2f}")`,
  mist: ["Expecting s.upper() to change s — save the result.", "Off-by-one slices: the end index is excluded.", "Forgetting the f before an f-string, so {name} prints literally."],
  faq: [
    ["Why does s[1:4] stop before 4?", "Python includes the start and excludes the end, so s[:3] + s[3:] always rebuilds s exactly and s[0:3] has exactly 3 characters."],
    ["What is the difference between / and //?", "/ always gives a decimal (7/2 = 3.5); // rounds down to a whole number (7//2 = 3); % gives the remainder (7%2 = 1)."],
    ["Single or double quotes?", "Either works. Use whichever lets you avoid escaping: \"It's fine\" or 'He said \"hi\"'."]
  ],
  iq: [["How would you clean raw text before embedding it or sending it to an LLM?", "Normalise whitespace, remove headers, footers and boilerplate, fix encoding problems, keep useful structure like headings and lists, and mask personal data. I would only lowercase for keyword search, not for the LLM. Then I chunk it."]],
  cheat: ["s[0] first · s[-1] last · s[a:b] excludes b", ".lower() .strip() .split() \" \".join(x) .replace(a,b)", "f\"{x:.2f}\" formats to 2 decimals", "// floor division · % remainder · ** power"],
  quiz: [["\"GenAI\"[1:3] is…", ["\"Ge\"", "\"en\"", "\"enA\"", "\"nA\""], 1, "Index 1 is 'e', index 2 is 'n'; 3 is excluded."],
         ["7 % 3 equals…", ["2", "1", "2.33", "0"], 1, "7 = 2×3 + 1, so the remainder is 1."]],
  cards: [["f-string", "f\"Hello {name}\" inserts variables into text."], ["split / join", "\"a b\".split() → ['a','b'];  \" \".join(['a','b']) → 'a b'"]]
},

{ id: "py-collections", lv: 1, t: "Lists, dictionaries, sets and tuples", min: 25,
  big: "Collections hold many values: lists keep order, dicts look things up by key, sets keep unique items, tuples are fixed records.",
  why: "A chat conversation is a list of dicts. A document with metadata is a dict. Unique tags are a set. This is the shape of every LLM API.",
  body: [
    "**List** `[...]` — ordered, changeable. `items.append(x)`, `items[0]`, `len(items)`, slicing works like strings. `sorted(items)` returns a new sorted list; `items.sort()` sorts in place.",
    "**Dict** `{key: value}` — look up by key: `doc[\"text\"]`. Use `doc.get(\"author\", \"unknown\")` when a key might be missing. Loop with `.items()`.",
    "**Set** `{...}` — unique items only; checking `x in s` is very fast.",
    "**Tuple** `(a, b)` — fixed; good for records like coordinates. **Unpacking**: `lat, lon = point`.",
    "Collections nest: a list of dicts is how chat APIs represent messages.",
    "`in` checks membership: `\"hr\" in tags`.",
    "Speed matters at scale: finding an item in a **list** means scanning it (slow for big lists); a **dict** or **set** jumps straight to it using **hashing**."
  ],
  ex: "A chatbot conversation is a list of messages, each a dict with a role and content. A retrieved document is a dict: {\"id\": 7, \"text\": \"…\", \"source\": \"leave.pdf\"}.",
  lang: "py", run: true,
  code: `messages = [
    {"role": "system", "content": "You are a helpful tutor."},
    {"role": "user", "content": "What is RAG?"},
]
messages.append({"role": "assistant", "content": "Retrieval-augmented generation."})
for m in messages:
    print(m["role"], "->", m["content"])

doc = {"id": 7, "text": "Leave policy", "tags": ["hr", "policy"]}
print(doc.get("author", "unknown"))

tags = set(["hr", "policy", "hr"])     # duplicates disappear
print(sorted(tags), "hr" in tags)

point = (13.08, 80.27)                 # Chennai (lat, lon)
lat, lon = point
print(lat)`,
  mist: ["doc[\"missing\"] raises KeyError — use .get() with a default.", "x = items.sort() — sort() returns None; use sorted(items) for a new list.", "Changing a list while looping over it."],
  faq: [
    ["When should I use a dict instead of a list?", "Use a list when order matters and you go by position (chat history). Use a dict when you look things up by name (a document’s text or source)."],
    ["Why is checking membership in a set fast?", "Sets and dicts use hashing: Python computes where an item would live and jumps straight there — O(1) on average — instead of scanning everything."],
    ["Why do sets print in a random order?", "Sets are unordered. If you need a stable order, use sorted(my_set)."]
  ],
  iq: [["What is the time complexity of looking up a key in a dict versus searching a list?", "A dict lookup is O(1) on average because of hashing; searching an unsorted list is O(n). So to deduplicate chunk IDs or count words, I use a set or dict, not a list."]],
  cheat: ["list [1,2] · .append() · sorted(x) · x.sort() (in place)", "dict {\"k\": v} · d.get(k, default) · d.items()", "set {1,2} unique, fast 'in' · tuple (a, b) fixed", "Chat messages = list of {\"role\", \"content\"} dicts"],
  quiz: [["Safest way to read a dict key that may not exist?", ["d[key]", "d.get(key, default)", "d.key", "d(key)"], 1, ".get returns the default instead of raising KeyError."],
         ["Average time to check whether an item is in a set?", ["O(n)", "O(1)", "O(log n)", "O(n²)"], 1, "Hashing makes membership checks constant time on average."]],
  cards: [["dict.get", "d.get(key, default) returns default instead of raising KeyError."], ["List vs tuple", "List can change; tuple is fixed and used for records."], ["Hashing", "Turning a key into a location so lookups jump straight to it (O(1))."]]
},

{ id: "py-flow", lv: 1, t: "Conditions and loops", min: 20,
  big: "Conditions choose which path to take; loops repeat work for every item or until something happens.",
  why: "Routing a question to the right handler, retrying a failed API call, processing 10,000 documents — all of it is conditions and loops.",
  body: [
    "`if` / `elif` / `else` choose a path. Indentation (4 spaces) shows which lines belong to which block.",
    "**Truthiness**: `0`, `\"\"`, `[]`, `{}` and `None` count as False; anything else counts as True.",
    "`for x in items:` repeats for every item. `range(5)` gives 0 to 4. `enumerate(items)` gives position and item. `zip(a, b)` walks two lists together.",
    "`while condition:` repeats until the condition becomes False — make sure it can end.",
    "`break` leaves the loop; `continue` skips to the next round.",
    "**Counting pattern**: `counts[w] = counts.get(w, 0) + 1` — the basis of word frequency, bag-of-words and BM25 search."
  ],
  ex: "A support bot routes messages: if it mentions “refund”, send to billing; if “password”, to account; otherwise to general. A retry loop tries an API call up to 3 times.",
  lang: "py", run: true,
  code: `def route(msg):
    m = msg.lower()
    if "refund" in m or "money back" in m:
        return "billing"
    elif "password" in m:
        return "account"
    else:
        return "general"

for msg in ["I want a refund", "Reset my password", "Hi there"]:
    print(msg, "->", route(msg))

counts = {}
for word in "the cat and the hat".split():
    counts[word] = counts.get(word, 0) + 1
print(counts)

for i, name in enumerate(["doc_a", "doc_b"], start=1):
    print(i, name)

attempt = 0
while attempt < 3:
    attempt += 1
    print("attempt", attempt)
    if attempt == 2:
        print("success")
        break`,
  mist: ["Infinite while loops — the condition never becomes False.", "Wrong indentation, which silently changes which lines are inside the loop.", "Off-by-one with range: range(5) stops at 4."],
  faq: [
    ["When do I use for and when while?", "Use for when you know what you are looping over (a list, a range). Use while when you loop until something happens (success, user quits) — and make sure it can end."],
    ["What does enumerate do?", "It gives you the position and the item together: for i, item in enumerate(items)."],
    ["Why does Python use indentation instead of brackets?", "To force readable code. The indentation is the structure, so it must be consistent (4 spaces)."]
  ],
  iq: [["How would you count word frequencies in a document?", "Loop over the words and keep a dict of counts with counts.get(word, 0) + 1, or use collections.Counter. It is O(n). Lowercasing and stripping punctuation first gives cleaner counts. This is the foundation of bag-of-words and BM25 keyword search."]],
  cheat: ["if / elif / else — indentation matters", "for x in items · range(n) · enumerate(items) · zip(a, b)", "while cond: … break / continue", "counts[k] = counts.get(k, 0) + 1"],
  quiz: [["What does range(3) produce?", ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3"], 1, "range starts at 0 and stops before 3."],
         ["An empty list inside an if behaves as…", ["True", "False", "An error", "None"], 1, "Empty containers are falsy."]],
  cards: [["Truthy / falsy", "0, '', [], {}, None are False in conditions; everything else is True."], ["break vs continue", "break leaves the loop; continue skips to the next round."]]
},

{ id: "py-func", lv: 1, t: "Functions", min: 20,
  big: "A function packages steps under a name so you can reuse them with different inputs and get a result back.",
  why: "Clean GenAI code is made of small functions: load_docs(), chunk(), embed(), retrieve(), answer(). Agents call functions as “tools”. Interviews ask you to write functions.",
  body: [
    "Define with `def name(parameters):` and send a result back with `return`.",
    "**Default values**: `def add_gst(amount, rate=0.18)`. **Keyword arguments**: `add_gst(100, rate=0.05)` — clearer to read.",
    "A **docstring** (first line in triple quotes) explains what the function does — agents and tools read these too.",
    "`return` hands a value back to the caller; `print` only shows it on screen. Apps should return.",
    "Variables created inside a function are **local** — they don’t exist outside.",
    "Functions are values: you can pass one into another (`apply_all(add_gst, prices)`), or write tiny ones with `lambda`.",
    "`*args` collects extra positional arguments; `**kwargs` collects extra named arguments.",
    "**Trap**: never use a mutable default like `def f(items=[])` — the same list is shared between calls. Use `None` and create the list inside."
  ],
  ex: "A GST calculator reused across an invoice app; a get_weather(city) function an AI agent can call as a tool.",
  lang: "py", run: true,
  code: `def add_gst(amount, rate=0.18):
    """Return amount including GST, rounded to 2 decimals."""
    return round(amount * (1 + rate), 2)

print(add_gst(100))
print(add_gst(100, rate=0.05))

def build_prompt(question, context, style="short"):
    return f"Answer in a {style} way using: {context}\\nQ: {question}"

print(build_prompt("What is RAG?", "RAG retrieves documents first."))

def apply_all(fn, values):
    return [fn(v) for v in values]

print(apply_all(add_gst, [10, 20]))

def add_item(item, items=None):     # safe default
    items = [] if items is None else items
    items.append(item)
    return items

print(add_item("a"), add_item("b"))`,
  mist: ["Printing instead of returning, so callers get None.", "Mutable default arguments shared across calls.", "Huge functions doing many jobs — split them."],
  faq: [
    ["print or return?", "print shows something to a human. return gives a value back to the code that called the function so it can use it."],
    ["How long should a function be?", "Short enough to do one job you can name in a few words. If you need “and” to describe it, split it."],
    ["What are *args and **kwargs for?", "They let a function accept any number of extra arguments. SDKs use **kwargs to pass options through to the API."]
  ],
  iq: [["What is wrong with def add(item, items=[])?", "The default list is created once, when the function is defined, and shared by every call, so items pile up across calls. Use items=None and create a new list inside the function."]],
  cheat: ["def f(a, b=2): \"\"\"doc\"\"\" return …", "f(1, b=3) keyword args are clearer", "return ≠ print", "Use None, not [], as a default"],
  quiz: [["A function with no return statement returns…", ["0", "None", "An empty string", "An error"], 1, "Python returns None automatically."],
         ["Why is def f(x, items=[]) risky?", ["Lists can't be defaults", "The same list is shared across calls", "It is slow", "Syntax error"], 1, "Defaults are created once and reused."]],
  cards: [["Docstring", "Triple-quoted text at the top of a function explaining what it does."], ["Keyword argument", "Passing by name: add_gst(100, rate=0.05)."]]
},

{ id: "py-errors", lv: 1, t: "Errors and debugging", min: 20,
  big: "Errors are messages, not failures: read them, handle the ones you expect, and let the unexpected ones be loud.",
  why: "LLM APIs time out, return bad JSON and hit rate limits. Production code must handle these calmly instead of crashing.",
  body: [
    "A **traceback** shows where the error happened. Read the **last line first**: it names the error and the reason.",
    "Common errors:",
    "- `SyntaxError` / `IndentationError` — the code isn’t valid Python.",
    "- `NameError` — a variable name that doesn’t exist (often a typo).",
    "- `TypeError` — wrong type, e.g. \"5\" + 5.",
    "- `KeyError` / `IndexError` — missing dict key / list position.",
    "- `ValueError` — right type, bad value, e.g. int(\"abc\").",
    "- `ModuleNotFoundError` — package not installed (pip install it).",
    "`try` / `except` handles errors you expect. Catch **specific** errors, not everything.",
    "`raise ValueError(\"reason\")` signals a problem yourself. `finally` runs no matter what (cleanup).",
    "Debugging tools: `print()` values, the VS Code debugger (breakpoints), and shrinking the input until you find the smallest failing case."
  ],
  ex: "An LLM is asked for JSON but sometimes returns text around it. The app catches the JSON error, logs it, and retries with a firmer instruction instead of crashing in front of the user.",
  lang: "py", run: true,
  code: `import json

def safe_parse(text):
    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        print("Bad JSON:", e.msg)
        return None

print(safe_parse('{"ok": true}'))
print(safe_parse("{ok: true}"))

def withdraw(balance, amount):
    if amount > balance:
        raise ValueError("Insufficient balance")
    return balance - amount

try:
    withdraw(100, 500)
except ValueError as e:
    print("Error:", e)
finally:
    print("Done checking")`,
  mist: ["Catching every error with a bare except: — it hides real bugs.", "Reading the top of the traceback instead of the last line.", "Swallowing errors silently without logging them."],
  faq: [
    ["Should I wrap everything in try/except?", "No. Only wrap code where you expect a specific failure and know what to do about it. Unexpected errors should be visible so you can fix them."],
    ["What is the difference between an error and a bug?", "An error is Python telling you something failed. A bug is any wrong behaviour, including code that runs without errors but gives the wrong answer."],
    ["How do I ask for help with an error?", "Share the full traceback, the smallest code that reproduces it, what you expected and what happened."]
  ],
  iq: [["How do you handle failures when calling an LLM API?", "I set a timeout and catch specific errors. Rate limits (429) and server errors (5xx) get retries with exponential backoff and jitter; auth errors (401) and bad requests (400) fail fast because retrying won’t help. Invalid output, like broken JSON, gets a validation retry with the error fed back. Everything is logged, and after a few failures I fall back gracefully, for example to a backup model or a friendly message."]],
  cheat: ["Read the LAST line of a traceback first", "try: … except SpecificError as e: … finally: …", "raise ValueError(\"why\")", "Retry 429/5xx; fail fast on 400/401"],
  quiz: [["int(\"abc\") raises…", ["TypeError", "ValueError", "KeyError", "NameError"], 1, "Right type (str), but a value that can't become an int."],
         ["Why avoid a bare except:?", ["It is slower", "It hides unexpected bugs", "It is not valid Python", "It only catches syntax errors"], 1, "Catch specific errors so real bugs stay visible."]],
  cards: [["Traceback", "Python's error report; the last line names the error and reason."], ["finally", "A block that runs whether or not an error happened — for cleanup."]]
},

{ id: "py-files", lv: 1, t: "Files, JSON, modules and packages", min: 20,
  big: "Programs read and write files, share data as JSON, and reuse code through modules and packages.",
  why: "You will load documents for RAG, save results, store fine-tuning data as JSONL and install libraries like openai, pandas and fastapi.",
  body: [
    "Open files with `with open(\"file.txt\") as f:` — `with` closes the file automatically, even after an error.",
    "Modes: `\"r\"` read (default), `\"w\"` write (overwrites), `\"a\"` append. Add `encoding=\"utf-8\"` for non-English text.",
    "**JSON**: `json.dumps(obj)` → text, `json.loads(text)` → Python; `json.dump`/`json.load` work with files.",
    "**JSONL** (JSON Lines) is one JSON object per line — the standard format for fine-tuning datasets and logs.",
    "**CSV** is tables as text; the `csv` module or Pandas read it.",
    "A **module** is a `.py` file you can `import`. A **package** is a folder of modules. Python ships many (`math`, `random`, `datetime`, `pathlib`); others come from `pip`.",
    "`from pathlib import Path` makes paths work on every operating system.",
    "`if __name__ == \"__main__\":` runs code only when the file is run directly, not when imported."
  ],
  ex: "Fine-tuning data for a support model is a JSONL file: each line holds one example conversation. Your script writes it, and another script reads it line by line.",
  lang: "py", run: true,
  code: `import json, math

docs = [{"id": 1, "text": "Leave policy"}, {"id": 2, "text": "Travel policy"}]

with open("docs.jsonl", "w", encoding="utf-8") as f:     # write one JSON per line
    for d in docs:
        f.write(json.dumps(d) + "\\n")

with open("docs.jsonl", encoding="utf-8") as f:          # read it back
    loaded = [json.loads(line) for line in f]

print(len(loaded), loaded[1]["text"])
print(math.sqrt(16), math.ceil(4.2))`,
  mist: ["Forgetting encoding=\"utf-8\" and breaking Tamil or Hindi text.", "Opening with \"w\" and accidentally erasing a file.", "Naming your own file json.py or random.py, which hides the real module."],
  faq: [
    ["What is the difference between a module, a package and a library?", "A module is one .py file; a package is a folder of modules; “library” is the everyday word for a package you install, like pandas."],
    ["Why JSONL instead of one big JSON file?", "You can read and write it one line at a time, append easily, and process huge files without loading everything into memory."],
    ["Where do installed packages go?", "Into your active virtual environment, which is why activating it matters."]
  ],
  iq: [["How would you load 10,000 PDFs for a RAG system efficiently?", "Stream them rather than loading everything at once: iterate over files with pathlib, extract text with a PDF parser, clean and chunk each file, and write chunks with metadata as JSONL in batches. Then embed in batches, ideally concurrently, with retries and logging so a failed file doesn’t stop the job."]],
  cheat: ["with open(p, \"r\"/\"w\"/\"a\", encoding=\"utf-8\") as f:", "json.dumps / json.loads · json.dump / json.load", "JSONL = one JSON object per line (fine-tuning data)", "import module · from pkg import name · pip install pkg"],
  quiz: [["Why use with open(...)?", ["It is faster", "It closes the file automatically", "It reads only JSON", "It creates folders"], 1, "with handles cleanup even if an error happens."],
         ["Fine-tuning datasets are usually stored as…", ["CSV of images", "JSONL", "PDF", "Excel"], 1, "One JSON example per line."]],
  cards: [["JSONL", "JSON Lines: one JSON object per line."], ["Module vs package", "Module = one .py file; package = folder of modules."]]
},

{ id: "py-oop", lv: 1, t: "Classes and objects (OOP)", min: 25,
  big: "A class is a blueprint that bundles data with the functions that use it; an object is one thing built from that blueprint.",
  why: "SDK clients (client = OpenAI()), Pydantic models, LangChain components and your own chatbot are all classes. You need to read and write them.",
  body: [
    "A **class** defines what an object holds (**attributes**) and can do (**methods**).",
    "`__init__` runs when an object is created; `self` means “this particular object”.",
    "Create objects: `bot = Chatbot(\"Tutor\")`. Call methods: `bot.ask(\"hi\")`.",
    "**Inheritance**: `class SupportBot(Chatbot)` reuses everything from Chatbot and changes only what differs. `super()` calls the parent version.",
    "**Encapsulation**: keep related data and behaviour together so the rest of the code doesn’t need the details.",
    "`@dataclass` writes `__init__` for simple data-holding classes automatically.",
    "When to use a class: when data and the actions on it belong together and there are many of them (many users, many conversations). Otherwise, plain functions are fine."
  ],
  ex: "Each user’s chat session is an object holding its own message history; a Chatbot class defines how every session behaves.",
  lang: "py", run: true,
  code: `from dataclasses import dataclass

class Chatbot:
    def __init__(self, name, system_prompt):
        self.name = name
        self.history = [{"role": "system", "content": system_prompt}]

    def ask(self, text):
        self.history.append({"role": "user", "content": text})
        reply = f"(fake reply to: {text})"     # a real bot would call an LLM here
        self.history.append({"role": "assistant", "content": reply})
        return reply

bot = Chatbot("Tutor", "Explain simply.")
print(bot.ask("What is a vector?"))
print(len(bot.history))

class SupportBot(Chatbot):
    def ask(self, text):
        return "Support: " + super().ask(text)

print(SupportBot("Help", "Be kind.").ask("Refund?"))

@dataclass
class Chunk:
    text: str
    source: str
    page: int = 1

print(Chunk("Leave is 12 days", "hr.pdf"))`,
  mist: ["Forgetting self as the first method parameter.", "Using class attributes for per-object data, so all objects share it.", "Building deep inheritance trees when a simple function would do."],
  faq: [
    ["What exactly is self?", "The object the method was called on. In bot.ask(\"hi\"), self is bot, so self.history is that bot’s own history."],
    ["Do I need OOP for GenAI work?", "You need to read it fluently because SDKs and frameworks are classes. For your own code, use classes when they make things simpler."],
    ["What is a dataclass?", "A shortcut for classes that mainly hold data: you list the fields and Python writes __init__ and a readable print for you."]
  ],
  iq: [["Explain the four pillars of OOP briefly.", "Encapsulation keeps data and behaviour together behind a clear interface. Abstraction hides details the caller doesn’t need. Inheritance lets a class reuse and extend another. Polymorphism lets different classes be used the same way — for example, several LLM provider classes all exposing a generate() method so the app can switch providers."]],
  cheat: ["class X: def __init__(self, …): self.a = …", "obj = X(…) · obj.method()", "class Child(Parent): super().method()", "@dataclass for simple data holders"],
  quiz: [["In bot.ask(\"hi\"), what is self inside ask?", ["The class Chatbot", "The object bot", "The string \"hi\"", "Nothing"], 1, "self is the object the method was called on."],
         ["Different provider classes each having a generate() method so the app can swap them is…", ["Inheritance only", "Polymorphism", "Recursion", "Encapsulation only"], 1, "Same interface, different implementations."]],
  cards: [["Class vs object", "Class = blueprint; object = one instance built from it."], ["Inheritance", "A child class reuses a parent class and changes only what differs."]]
},

{ id: "py-inter", lv: 1, t: "Comprehensions, lambdas, generators and decorators", min: 25,
  big: "These are shortcuts professionals use to write shorter, faster, cleaner Python.",
  why: "You will see them in every SDK and framework, and interviewers use them to check that you are past the beginner stage.",
  body: [
    "**List comprehension**: `[x * 2 for x in nums if x > 0]` — build a list in one line. Dict version: `{k: v for k, v in pairs}`.",
    "**lambda**: a tiny unnamed function, usually for sorting: `sorted(docs, key=lambda d: d[\"score\"], reverse=True)`.",
    "**Generators** use `yield` to produce items one at a time instead of building a whole list — saving memory. Streaming LLM responses and batching documents work like this.",
    "**Decorators** wrap a function to add behaviour (timing, logging, retries) without changing its code: `@timed` above `def`.",
    "`any()` / `all()` check conditions across a list; `zip()` pairs lists; `collections.Counter` counts; `itertools` has more building blocks.",
    "Readability first: if a comprehension needs two lines of thought, write a normal loop."
  ],
  ex: "Embedding 50,000 chunks: a generator yields batches of 100 so you never hold every vector in memory at once. A @retry decorator adds retry logic to any API-calling function.",
  lang: "py", run: true,
  code: `nums = [3, -1, 4, -5, 9]
print([n * 2 for n in nums if n > 0])
print({w: len(w) for w in ["rag", "agent"]})

docs = [{"id": 1, "score": 0.4}, {"id": 2, "score": 0.9}]
print(sorted(docs, key=lambda d: d["score"], reverse=True)[0])

def batches(items, size):
    for i in range(0, len(items), size):
        yield items[i:i + size]          # hand back one batch, then pause

for b in batches(list(range(7)), 3):
    print(b)

def shout(fn):                           # a decorator
    def wrapper(*args, **kwargs):
        return fn(*args, **kwargs).upper()
    return wrapper

@shout
def greet(name):
    return f"hello {name}"

print(greet("harsha"))`,
  mist: ["Unreadable one-line comprehensions with nested conditions.", "Expecting a generator to be reusable — once used up, it is empty.", "Forgetting to return the result inside a decorator’s wrapper."],
  faq: [
    ["Generator or list?", "Use a list when you need all items at once or more than once. Use a generator for big or endless data, or when you process items one by one."],
    ["Where will I see decorators in GenAI?", "@app.post in FastAPI, @tool in agent frameworks, @mcp.tool for MCP servers, @retry from the tenacity library."]
  ],
  iq: [["What is a generator and why use one?", "A function that uses yield to produce values lazily, one at a time, keeping its state between them. It saves memory for large data — for example, batching thousands of chunks for embedding, or streaming tokens from an LLM response — because nothing is built all at once."]],
  cheat: ["[f(x) for x in xs if cond] · {k: v for …}", "sorted(xs, key=lambda x: x[\"score\"], reverse=True)", "yield = produce lazily (batches, streaming)", "@decorator wraps a function (retry, timing, routes)"],
  quiz: [["[x for x in range(5) if x % 2 == 0] gives…", ["[1, 3]", "[0, 2, 4]", "[0, 1, 2, 3, 4]", "[2, 4]"], 1, "Even numbers from 0 to 4."],
         ["Main benefit of a generator?", ["Faster typing", "Uses little memory by producing items one at a time", "Runs on GPU", "Sorts data"], 1, "Lazy evaluation keeps memory low."]],
  cards: [["Comprehension", "[expr for item in items if condition]"], ["Decorator", "A function that wraps another to add behaviour, applied with @name."]]
},

{ id: "py-api", lv: 1, t: "Calling APIs, HTTP and async", min: 25,
  big: "Your code talks to AI models and other services by sending HTTP requests; async lets it wait on many at once.",
  why: "Every LLM, embedding model and vector database you use in the cloud is reached through an API. Doing calls concurrently can turn a 10-minute job into 30 seconds.",
  body: [
    "A **REST API** call has: a **URL** (endpoint), a **method** (`GET` to read, `POST` to send), **headers** (like `Authorization: Bearer <key>`), and a **JSON body**.",
    "The `requests` library is the simplest way: `requests.post(url, headers=…, json=…, timeout=30)`. Always set a **timeout**.",
    "`resp.raise_for_status()` turns 4xx/5xx into an error; `resp.json()` reads the body.",
    "**SDKs** (like `openai` or `anthropic`) wrap these calls in friendly functions and add retries.",
    "**Rate limits**: providers cap requests or tokens per minute. Handle `429` with **exponential backoff** (wait 1s, 2s, 4s…) plus random **jitter**.",
    "**Streaming**: the server sends the answer piece by piece (server-sent events) so the user sees text immediately.",
    "**Async** (`async def`, `await`, `asyncio.gather`) lets one program wait on many network calls at the same time. API calls spend most of their time waiting, so this is a big win.",
    "Many providers offer **OpenAI-compatible** endpoints, so the same code works by changing the base URL and model name."
  ],
  ex: "Summarising 500 support tickets: one by one at 2 seconds each takes 17 minutes. With async and a limit of 20 calls at a time, it takes under a minute — while respecting the rate limit.",
  lang: "py", run: false,
  code: `import os, requests

resp = requests.post(
    "https://api.example.com/v1/chat/completions",          # an OpenAI-compatible endpoint
    headers={"Authorization": f"Bearer {os.environ['API_KEY']}"},
    json={"model": MODEL, "messages": [{"role": "user", "content": "Hi"}]},
    timeout=30,
)
resp.raise_for_status()
print(resp.json()["choices"][0]["message"]["content"])

# ---- async: many calls at once ----
import asyncio

async def fake_call(i):
    await asyncio.sleep(1)          # stands in for a network call
    return f"answer {i}"

async def main():
    results = await asyncio.gather(*(fake_call(i) for i in range(5)))
    print(results)                  # about 1 second total, not 5

asyncio.run(main())`,
  mist: ["No timeout, so one stuck request freezes the app.", "Retrying instantly and forever on 429, making the rate limit worse.", "Using threads or async for CPU-heavy work — async helps waiting, not computing."],
  faq: [
    ["Async or threads?", "For many network calls, async is usually simplest and lightest. Threads also work for I/O. For heavy computation, use multiple processes."],
    ["What is a webhook?", "The reverse of an API call: another service calls your URL when something happens (a payment completes, a job finishes)."],
    ["What does OpenAI-compatible mean?", "The provider accepts the same request format as OpenAI’s chat completions API, so you switch providers by changing the base URL, key and model name."]
  ],
  iq: [["How would you process 10,000 LLM requests quickly without hitting rate limits?", "Use async with a semaphore to cap concurrency at what the rate limit allows, add exponential backoff with jitter for 429s, and batch where the API supports it. For non-urgent jobs I’d use the provider’s batch API, which is cheaper. I’d log progress and failures so the job can resume instead of restarting."]],
  cheat: ["requests.post(url, headers={\"Authorization\": f\"Bearer {key}\"}, json=body, timeout=30)", "resp.raise_for_status(); resp.json()", "429 → exponential backoff + jitter", "asyncio.gather for many concurrent calls; semaphore to cap"],
  quiz: [["Why use async for LLM API calls?", ["It makes the model smarter", "Calls mostly wait on the network, so many can wait together", "It reduces tokens", "It's required"], 1, "Async overlaps waiting time."],
         ["Best response to repeated 429 errors?", ["Retry instantly in a loop", "Exponential backoff with jitter", "Change API key", "Ignore"], 1, "Spread retries out so the limit can recover."]],
  cards: [["Exponential backoff", "Retry after growing waits: 1s, 2s, 4s, 8s… plus random jitter."], ["Streaming", "Server sends the answer piece by piece so users see text immediately."]]
},

{ id: "py-pydantic", lv: 1, t: "Type hints and Pydantic", min: 20,
  big: "Type hints label what kind of data a function expects; Pydantic uses them to check data at runtime and reject anything wrong.",
  why: "LLMs sometimes return the wrong shape of data. Pydantic catches it before it breaks your app, and it is used by FastAPI, the OpenAI and Anthropic SDKs, LangChain and most agent frameworks.",
  body: [
    "**Type hints**: `def price(qty: int, rate: float) -> float:` — they don’t change how Python runs, but editors and tools use them to catch mistakes.",
    "Common hints: `list[str]`, `dict[str, int]`, `str | None` (optional), `Literal[\"low\", \"high\"]`.",
    "**Pydantic** turns a class with type hints into a validator: `class Invoice(BaseModel): vendor: str; total: float`.",
    "`Invoice.model_validate(data)` checks a dict; `Invoice.model_validate_json(text)` checks JSON text. Bad data raises `ValidationError` with a clear message.",
    "`Field(ge=0)` adds rules such as “greater than or equal to 0”; `max_length` limits text.",
    "`model.model_dump()` converts back to a dict; `Model.model_json_schema()` gives a JSON schema — which you can hand to an LLM for **structured output**."
  ],
  ex: "An invoice extractor asks an LLM for vendor, total and currency. If the model returns a negative total or a missing field, Pydantic rejects it and the app retries with the error message.",
  lang: "py", run: true,
  code: `from pydantic import BaseModel, Field, ValidationError

class Invoice(BaseModel):
    vendor: str
    total: float = Field(ge=0)
    currency: str = "INR"

good = Invoice.model_validate_json('{"vendor": "Acme", "total": 1250.5}')
print(good)
print(good.model_dump())

try:
    Invoice.model_validate({"vendor": "Acme", "total": -5})
except ValidationError as e:
    print("Rejected:", e.errors()[0]["msg"])

print(list(Invoice.model_json_schema()["properties"]))`,
  mist: ["Thinking type hints are enforced by Python itself — only tools like Pydantic enforce them.", "Parsing LLM output with string tricks instead of a schema.", "Catching ValidationError and continuing with bad data."],
  faq: [
    ["Do type hints slow Python down?", "No. Python ignores them when running; they exist for tools and readers."],
    ["Why not just check fields with if statements?", "For one field, fine. For real data with nesting, types and rules, Pydantic is shorter, clearer and gives precise error messages."]
  ],
  iq: [["How do you get reliable structured data out of an LLM?", "Define the schema as a Pydantic model, pass its JSON schema to the model using the provider’s structured-output or tool-calling feature, use low temperature, and validate the response. On a ValidationError, retry with the error message included, up to a limit, then flag the item for review."]],
  cheat: ["def f(x: int) -> str", "class M(BaseModel): name: str; total: float = Field(ge=0)", "M.model_validate(dict) / M.model_validate_json(text)", "M.model_json_schema() → give to the LLM"],
  quiz: [["Which raises an error for {\"total\": -5} with total: float = Field(ge=0)?", ["Python itself", "Pydantic validation", "Nothing", "json.loads"], 1, "Pydantic enforces the rule at runtime."],
         ["model_json_schema() is useful because…", ["It speeds up Python", "You can give the schema to an LLM for structured output", "It encrypts data", "It trains models"], 1, "Schemas guide and validate model output."]],
  cards: [["Pydantic BaseModel", "A class whose type hints become runtime validation rules."], ["ValidationError", "Raised by Pydantic when data doesn't match the model."]]
},

{ id: "py-dsa", lv: 1, t: "Data structures and algorithms for interviews", min: 35,
  big: "Interviewers check whether you can pick the right structure and reason about how fast your code is.",
  why: "Most AI-engineer loops still include one coding round. A handful of patterns covers most questions you will see.",
  body: [
    "**Big-O** describes how work grows with input size `n`: `O(1)` constant, `O(log n)` halving (binary search), `O(n)` one pass, `O(n log n)` good sorting, `O(n²)` nested loops.",
    "**Hash map (dict/set)** — the most useful interview tool. Turns “search again” into “look up instantly”: two-sum, duplicates, anagrams, counting.",
    "**Two pointers** — walk from both ends of a sorted list or string: palindromes, pair sums.",
    "**Sliding window** — keep a moving range over a sequence: longest substring, moving averages.",
    "**Stack** (last in, first out) — matching brackets, undo. **Queue** (first in, first out) — tasks in order, BFS.",
    "**Binary search** — on sorted data, halve the search space each step: O(log n).",
    "**Sorting** — `sorted()` is O(n log n). Know that merge sort and quicksort exist and roughly how they work.",
    "**Recursion** — a function calling itself on a smaller problem, with a base case to stop.",
    "**Trees and graphs** — trees for hierarchies (folders), graphs for networks (knowledge graphs in GraphRAG). BFS explores level by level; DFS goes deep first.",
    "Interview method: clarify → brute force → optimise → code → test edge cases → state complexity."
  ],
  ex: "Two-sum: find two transaction amounts that add up to a refund. Checking every pair is O(n²); remembering what you’ve seen in a dict makes it O(n).",
  lang: "py", run: true,
  code: `def two_sum(nums, target):
    seen = {}                          # value -> index
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []

print(two_sum([2, 7, 11, 15], 9))

def binary_search(arr, x):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == x:
            return mid
        if arr[mid] < x:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

print(binary_search([1, 3, 5, 7, 9, 11], 7))

def is_valid(brackets):
    pairs, stack = {")": "(", "]": "["}, []
    for ch in brackets:
        if ch in "([":
            stack.append(ch)
        elif not stack or stack.pop() != pairs[ch]:
            return False
    return not stack

print(is_valid("([])"), is_valid("(]"))`,
  mist: ["Jumping to code before stating a brute-force idea.", "Forgetting edge cases: empty input, one element, duplicates.", "Not stating time and space complexity at the end."],
  faq: [
    ["How much DSA do GenAI roles need?", "Less than pure software roles. Be solid on arrays, strings, hash maps, two pointers, sliding window, stacks, binary search and basic recursion — usually LeetCode easy to medium."],
    ["What is space complexity?", "How much extra memory your solution uses as input grows. The two-sum dict uses O(n) extra space to save time."],
    ["How do I practise efficiently?", "One pattern at a time: solve 3–5 problems per pattern, explain each solution out loud, and redo the ones you got wrong after a few days."]
  ],
  iq: [["What is the time complexity of your two-sum solution and why?", "O(n) time: one pass, and each dict lookup and insert is O(1) on average. O(n) extra space for the dict. The brute force checks every pair, which is O(n²) time but O(1) space — a classic time-versus-space trade-off."]],
  cheat: ["O(1) < O(log n) < O(n) < O(n log n) < O(n²)", "Hash map: counting, seen-before, two-sum", "Two pointers / sliding window for arrays & strings", "Stack for brackets; binary search on sorted data"],
  quiz: [["Binary search runs in…", ["O(n)", "O(log n)", "O(n²)", "O(1)"], 1, "It halves the search space each step."],
         ["Best structure to check “have I seen this before?” quickly?", ["List", "Set or dict", "Tuple", "String"], 1, "Hash-based lookups are O(1) on average."]],
  cards: [["Big-O", "How work grows with input size n."], ["Two pointers", "Walk inward from both ends (or at two speeds) to avoid nested loops."], ["Stack", "Last in, first out — brackets, undo."]]
},

/* ================= LEVEL 2 — DATA & SQL ================= */
{ id: "sql-basics", lv: 2, t: "SQL basics: asking a database questions", min: 25,
  big: "SQL is the language for asking questions of tables: which rows, which columns, in what order.",
  why: "Company data lives in databases. AI engineers query it for analytics, build text-to-SQL assistants, store vectors in Postgres (pgvector) and log model calls. SQL comes up in most data and AI interviews.",
  body: [
    "A **database** stores **tables**. A table has **columns** (fields like name, salary) and **rows** (one record each).",
    "Our practice database has `employees`, `departments`, `customers` and `orders`. Every SQL example on this page runs on it.",
    "`SELECT columns FROM table` — choose columns. `SELECT *` means all columns.",
    "`WHERE` filters rows: `=`, `!=`, `>`, `<`, `BETWEEN a AND b`, `IN ('a','b')`, `LIKE 'A%'` (starts with A).",
    "Combine conditions with `AND` / `OR`; use brackets when mixing them.",
    "`ORDER BY col DESC` sorts (ASC is default). `LIMIT 5` keeps the first 5 rows.",
    "`DISTINCT` removes duplicate rows. `AS` renames a column in the output.",
    "**NULL** means “unknown/missing”. You can’t compare it with `=`; use `IS NULL` / `IS NOT NULL`.",
    "SQL keywords aren’t case-sensitive, but writing them in capitals makes queries easier to read."
  ],
  ex: "HR asks: “Who are our three highest-paid people in Engineering?” That is a filter (department), a sort (salary) and a limit (3) — one SQL query.",
  lang: "sql", run: true,
  code: `-- Three highest-paid people in department 1 (Engineering)
SELECT name, role, salary
FROM employees
WHERE dept_id = 1
ORDER BY salary DESC
LIMIT 3;

-- People with no department yet (NULL)
SELECT name, role FROM employees WHERE dept_id IS NULL;`,
  mist: ["Writing WHERE dept_id = NULL — it returns nothing; use IS NULL.", "Mixing AND and OR without brackets.", "Using SELECT * in production queries, fetching more data than needed."],
  faq: [
    ["Is SQL a programming language?", "It is a query language: you describe *what* you want, and the database works out *how* to get it."],
    ["MySQL, PostgreSQL, SQLite — which should I learn?", "The core SQL is the same in all of them. Learn standard SQL here (SQLite), then note small differences. PostgreSQL is the most common in AI stacks because of pgvector."],
    ["Why do strings use single quotes?", "In standard SQL, 'text' is a string and \"name\" is a column or table name."]
  ],
  iq: [["What is the logical order in which SQL runs a query?", "FROM and JOIN first, then WHERE, GROUP BY, HAVING, SELECT, DISTINCT, ORDER BY and finally LIMIT. That’s why you can’t use a SELECT alias inside WHERE, but you can in ORDER BY."]],
  cheat: ["SELECT cols FROM t WHERE cond ORDER BY c DESC LIMIT n", "IN (…) · BETWEEN a AND b · LIKE 'A%'", "IS NULL / IS NOT NULL (never = NULL)", "Run order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT"],
  quiz: [["Which clause filters rows?", ["ORDER BY", "WHERE", "LIMIT", "SELECT"], 1, "WHERE keeps only rows that match the condition."],
         ["WHERE city = NULL returns…", ["Rows with a missing city", "No rows", "All rows", "An error always"], 1, "Comparisons with NULL are unknown; use IS NULL."]],
  cards: [["NULL", "Unknown/missing value; test with IS NULL, never = NULL."], ["LIMIT", "Keep only the first n rows of the result."]]
},

{ id: "sql-agg", lv: 2, t: "SQL aggregation: GROUP BY and HAVING", min: 20,
  big: "Aggregation turns many rows into summary numbers — counts, totals, averages — per group.",
  why: "Dashboards, reports and AI analytics (cost per model, requests per day, accuracy per prompt version) are all aggregations.",
  body: [
    "Aggregate functions: `COUNT(*)`, `SUM(x)`, `AVG(x)`, `MIN(x)`, `MAX(x)`.",
    "`GROUP BY col` makes one result row per distinct value of `col`.",
    "Every column in `SELECT` must either be in `GROUP BY` or wrapped in an aggregate.",
    "`WHERE` filters rows **before** grouping; `HAVING` filters groups **after** aggregation.",
    "`COUNT(*)` counts rows; `COUNT(col)` counts non-NULL values; `COUNT(DISTINCT col)` counts unique values.",
    "`ROUND(AVG(salary), 0)` tidies numbers."
  ],
  ex: "Finance asks for total paid revenue per customer, but only customers above ₹40,000. Filter paid orders (WHERE), group by customer, keep big groups (HAVING).",
  lang: "sql", run: true,
  code: `-- Headcount and average salary per department
SELECT dept_id, COUNT(*) AS people, ROUND(AVG(salary)) AS avg_salary
FROM employees
WHERE dept_id IS NOT NULL
GROUP BY dept_id
ORDER BY people DESC;

-- Customers whose paid orders total more than 40,000
SELECT customer_id, SUM(amount) AS paid_total
FROM orders
WHERE status = 'paid'
GROUP BY customer_id
HAVING SUM(amount) > 40000;`,
  mist: ["Using WHERE to filter on an aggregate — use HAVING.", "Selecting a non-grouped column without an aggregate.", "Expecting COUNT(col) to count NULLs."],
  faq: [
    ["WHERE or HAVING?", "WHERE works on individual rows before grouping; HAVING works on groups after aggregation. Filter as early as you can with WHERE — it’s faster."],
    ["Why does AVG ignore some rows?", "Aggregates skip NULL values. If NULL should count as 0, use COALESCE(col, 0)."]
  ],
  iq: [["What is the difference between WHERE and HAVING?", "WHERE filters individual rows before grouping and cannot use aggregate functions. HAVING filters the grouped results after aggregation, so it can use SUM, COUNT and so on. For example, WHERE status = 'paid' then HAVING SUM(amount) > 40000."]],
  cheat: ["COUNT(*) · SUM · AVG · MIN · MAX · COUNT(DISTINCT c)", "GROUP BY c → one row per value", "WHERE before grouping · HAVING after", "COALESCE(c, 0) replaces NULL"],
  quiz: [["Keep only departments with more than 2 people. Which clause?", ["WHERE COUNT(*) > 2", "HAVING COUNT(*) > 2", "LIMIT 2", "ORDER BY 2"], 1, "Conditions on aggregates go in HAVING."],
         ["COUNT(manager_id) counts…", ["All rows", "Rows where manager_id is not NULL", "Distinct managers", "NULL rows"], 1, "COUNT(col) skips NULLs."]],
  cards: [["GROUP BY", "Collapse rows into one row per distinct value, then aggregate."], ["HAVING", "Filter groups after aggregation."]]
},

{ id: "sql-joins", lv: 2, t: "SQL joins: combining tables", min: 25,
  big: "A join matches rows from two tables using a shared key, so you can answer questions that span both.",
  why: "Real data is split across tables to avoid duplication. Almost every useful business question needs a join — and joins are the most-asked SQL interview topic.",
  body: [
    "A **primary key** uniquely identifies each row (`employees.id`). A **foreign key** points to a primary key in another table (`employees.dept_id → departments.id`).",
    "**INNER JOIN** — only rows that match in both tables.",
    "**LEFT JOIN** — every row from the left table, with matches from the right or NULL if none. Great for “who has no …?” questions.",
    "**RIGHT JOIN** — the mirror of LEFT. **FULL OUTER JOIN** — everything from both sides.",
    "**Self join** — a table joined to itself, e.g. employees to their managers.",
    "Use **table aliases** (`e`, `d`) to keep queries short and clear.",
    "**Anti-join** pattern: `LEFT JOIN … WHERE right.id IS NULL` finds rows with no match."
  ],
  ex: "“Which customers have never placed an order?” — LEFT JOIN customers to orders and keep rows where the order is NULL. These are the people sales should call.",
  lang: "sql", run: true,
  code: `-- Employee with their department name
SELECT e.name, d.name AS department
FROM employees e
JOIN departments d ON e.dept_id = d.id
ORDER BY d.name, e.name;

-- Customers who have never ordered (anti-join)
SELECT c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;

-- Each employee with their manager (self join)
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
WHERE e.dept_id = 1;`,
  mist: ["Using INNER JOIN when you need to keep unmatched rows.", "Forgetting the ON condition, which creates every combination of rows.", "Filtering the right table in WHERE after a LEFT JOIN, which silently turns it into an INNER JOIN."],
  faq: [
    ["How do I remember LEFT vs INNER?", "INNER keeps only matches (the overlap). LEFT keeps everything on the left and adds matches where they exist."],
    ["Why did my row count explode after a join?", "One row matched many rows on the other side (one customer, many orders). That is expected — aggregate or join on the right key."],
    ["What is a CROSS JOIN?", "Every row combined with every row. Useful rarely; usually it’s an accident from a missing ON."]
  ],
  iq: [["How do you find customers who never placed an order?", "LEFT JOIN customers to orders on customer_id and keep rows where the order id IS NULL. Alternatives are NOT EXISTS with a correlated subquery, or NOT IN — but NOT IN behaves unexpectedly if the subquery returns NULLs, so I prefer LEFT JOIN or NOT EXISTS."]],
  cheat: ["JOIN t2 ON t1.key = t2.key (INNER = matches only)", "LEFT JOIN keeps all left rows; NULL if no match", "Anti-join: LEFT JOIN … WHERE right.id IS NULL", "Self join: employees e JOIN employees m ON e.manager_id = m.id"],
  quiz: [["Which join keeps every customer even without orders?", ["INNER JOIN", "LEFT JOIN from customers", "CROSS JOIN", "None"], 1, "LEFT keeps all rows from the left table."],
         ["A foreign key…", ["Makes values unique", "Points to a primary key in another table", "Is always NULL", "Speeds up every query"], 1, "It links tables and protects consistency."]],
  cards: [["Primary key", "Column that uniquely identifies each row."], ["Anti-join", "LEFT JOIN … WHERE right.id IS NULL — rows with no match."]]
},

{ id: "sql-adv", lv: 2, t: "Advanced SQL: subqueries, CTEs, window functions", min: 30,
  big: "Subqueries and CTEs break hard questions into steps; window functions compute rankings and running totals without collapsing rows.",
  why: "“Top earner per department”, “month-over-month growth”, “running total” — the questions that separate strong candidates — all need these tools.",
  body: [
    "A **subquery** is a query inside another: `WHERE salary > (SELECT AVG(salary) FROM employees)`.",
    "A **CTE** (`WITH name AS (…)`) names a step so the main query reads like a story.",
    "**Window functions** add a calculation to each row while keeping all rows: `RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC)`.",
    "- `ROW_NUMBER()` 1,2,3,4 — always unique.",
    "- `RANK()` 1,1,3 — ties share, then a gap.",
    "- `DENSE_RANK()` 1,1,2 — ties share, no gap.",
    "- `SUM(x) OVER (ORDER BY date)` — running total. `LAG(x)` — previous row’s value.",
    "`CASE WHEN … THEN … ELSE … END` creates categories inside a query.",
    "**Indexes** make lookups fast (like a book index) but slow down writes. Index columns you filter and join on.",
    "**Transactions** and **ACID**: a group of changes either all succeed or none do (transfer money: debit and credit together).",
    "**Normalisation**: split data into tables so each fact is stored once.",
    "Beyond SQL: **NoSQL** (MongoDB documents, Redis key-value), **data warehouses** (BigQuery, Snowflake) and **vector databases** (Level 8)."
  ],
  ex: "A leaderboard of top performers per region, or a finance report showing each month’s revenue next to the running total for the year — both are one window-function query.",
  lang: "sql", run: true,
  code: `-- Highest earner in each department (CTE + window function)
WITH ranked AS (
  SELECT name, dept_id, salary,
         RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk
  FROM employees
  WHERE dept_id IS NOT NULL
)
SELECT name, dept_id, salary FROM ranked WHERE rnk = 1;

-- Running total of paid revenue by date
SELECT order_date, amount,
       SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders WHERE status = 'paid';

-- Salary bands with CASE
SELECT name,
       CASE WHEN salary >= 150000 THEN 'senior'
            WHEN salary >= 80000 THEN 'mid'
            ELSE 'junior' END AS band
FROM employees ORDER BY salary DESC LIMIT 5;`,
  mist: ["Using GROUP BY when you need every row plus a rank — use a window function.", "Picking ROW_NUMBER when ties should share a rank.", "Adding indexes on every column, which slows writes."],
  faq: [
    ["Subquery or CTE?", "They often do the same thing. CTEs are easier to read and reuse within a query; use them when a query has more than one step."],
    ["Why can’t I filter on a window function in WHERE?", "Window functions are computed after WHERE. Wrap the query in a CTE or subquery and filter outside."],
    ["What is an execution plan?", "The database’s step-by-step plan for running your query. EXPLAIN shows it, which helps find slow parts like missing indexes."]
  ],
  iq: [["Find the second-highest salary in each department.", "Use a CTE with DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) and keep rows where the rank is 2. DENSE_RANK handles ties so that two people with the top salary don’t push the true second salary to rank 3."]],
  cheat: ["WITH step AS (…) SELECT … FROM step", "ROW_NUMBER 1,2,3 · RANK 1,1,3 · DENSE_RANK 1,1,2", "fn() OVER (PARTITION BY g ORDER BY c)", "SUM(x) OVER (ORDER BY d) running total · LAG(x) previous row"],
  quiz: [["Salaries 100, 100, 90 with DENSE_RANK give…", ["1, 2, 3", "1, 1, 3", "1, 1, 2", "2, 2, 1"], 2, "Ties share a rank with no gap."],
         ["Top 2 earners per department needs…", ["GROUP BY dept LIMIT 2", "ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) then keep ≤ 2", "HAVING COUNT(*) = 2", "DISTINCT salary"], 1, "Number rows within each group, then filter."]],
  cards: [["Window function", "A calculation across related rows that keeps every row (OVER …)."], ["CTE", "WITH name AS (query) — a named step you can select from."], ["ACID", "Atomic, Consistent, Isolated, Durable — reliable transactions."]]
},

{ id: "numpy", lv: 2, t: "NumPy: fast maths on arrays", min: 20,
  big: "NumPy stores numbers in arrays and does maths on whole arrays at once — the foundation of almost all AI code in Python.",
  why: "Embeddings are NumPy arrays. Cosine similarity, attention and neural networks are array maths. PyTorch tensors behave almost exactly like NumPy arrays.",
  body: [
    "`np.array([1, 2, 3])` creates an array. `.shape` gives its dimensions, e.g. `(3,)` or `(4, 768)` for 4 embeddings of size 768.",
    "**Vectorised** operations act on every element at once: `a * 2`, `a + b`, `np.sqrt(a)` — no loops, and much faster.",
    "`a @ b` is the **dot product** / matrix multiplication. `np.linalg.norm(a)` is a vector’s length.",
    "Indexing: `m[0]` first row, `m[:, 0]` first column, `a[a > 0]` keeps positives (boolean masking).",
    "Useful functions: `sum`, `mean`, `max`, `argmax` (position of the biggest — used to pick the best match), `argsort`.",
    "**Broadcasting**: NumPy stretches smaller arrays to match bigger ones, e.g. dividing every row by its own length.",
    "`axis=0` works down columns; `axis=1` works across rows."
  ],
  ex: "You have 1,000 document embeddings (a 1000×384 array) and one query embedding. One line — scores = docs @ query — gives the similarity to every document at once.",
  lang: "py", run: true,
  code: `import numpy as np

docs = np.array([[1.0, 0.0, 1.0],
                 [0.0, 1.0, 0.0],
                 [1.0, 1.0, 1.0]])         # 3 documents, 3 dimensions
query = np.array([1.0, 0.0, 1.0])
print(docs.shape)

docs_n = docs / np.linalg.norm(docs, axis=1, keepdims=True)   # broadcasting
q_n = query / np.linalg.norm(query)
scores = docs_n @ q_n                       # cosine similarity to every doc
print(scores.round(3))
print("Best match:", int(scores.argmax()))
print("Ranking:", np.argsort(-scores))`,
  mist: ["Writing Python loops over arrays instead of vectorised operations.", "Shape mismatches in @ — inner dimensions must agree.", "Confusing axis=0 and axis=1."],
  faq: [
    ["Why is NumPy faster than Python lists?", "Arrays store numbers of one type next to each other in memory, and operations run in optimised C code instead of a Python loop."],
    ["NumPy or PyTorch?", "NumPy for general maths and data; PyTorch when you need GPUs and automatic gradients for training. They feel very similar."]
  ],
  iq: [["How would you find the top 5 most similar documents to a query among 100,000 embeddings?", "Normalise all vectors, compute scores = doc_matrix @ query in one vectorised step, then take the top 5 with np.argpartition (faster than a full sort). At larger scale, or with frequent updates, I’d use a vector index like FAISS or HNSW instead of brute force."]],
  cheat: ["np.array · .shape · a @ b (dot) · np.linalg.norm", "Vectorised: a * 2, a + b — no loops", "argmax · argsort · boolean mask a[a > 0]", "axis=0 columns · axis=1 rows · keepdims for broadcasting"],
  quiz: [["Shape of 4 embeddings with 768 numbers each?", ["(768, 4)", "(4, 768)", "(4,)", "(3072,)"], 1, "Rows = items, columns = dimensions."],
         ["np.argmax(scores) returns…", ["The largest value", "The position of the largest value", "The sorted array", "The mean"], 1, "argmax gives the index — the best match."]],
  cards: [["Vectorisation", "Doing maths on whole arrays at once instead of looping."], ["Broadcasting", "NumPy stretching a smaller array to fit a bigger one in an operation."]]
},

{ id: "pandas", lv: 2, t: "Pandas: tables in Python, cleaning and EDA", min: 30,
  big: "Pandas gives you spreadsheet-like tables (DataFrames) in Python for loading, cleaning, filtering, grouping and joining data.",
  why: "Before any model, you must understand and clean the data. Evaluation results, logs, survey answers and fine-tuning datasets are all handled in Pandas.",
  body: [
    "A **DataFrame** is a table; a **Series** is one column. Load with `pd.read_csv(\"file.csv\")`.",
    "First look: `df.head()`, `df.info()` (types and missing values), `df.describe()` (statistics), `df.shape`.",
    "Select: `df[\"col\"]`, `df[[\"a\", \"b\"]]`. Filter: `df[df[\"salary\"] > 80000]`. Combine conditions with `&` and `|` and brackets.",
    "Group: `df.groupby(\"dept\")[\"salary\"].mean()` — the Pandas version of SQL GROUP BY.",
    "Join: `pd.merge(a, b, on=\"id\", how=\"left\")` — the Pandas version of SQL JOIN.",
    "Clean: `df.isna().sum()` counts missing values; `fillna`, `dropna`, `drop_duplicates`, `astype` to fix types, `str.strip()` / `str.lower()` for text.",
    "New columns: `df[\"bonus\"] = df[\"salary\"] * 0.1`.",
    "**EDA** (exploratory data analysis): look at shapes, missing values, distributions, outliers and relationships *before* modelling. Plot with `df.plot()` or Matplotlib.",
    "Save: `df.to_csv(\"out.csv\", index=False)`."
  ],
  ex: "You export 2,000 chatbot conversations with user ratings. Pandas tells you the average rating per intent, which intents have the most thumbs-down, and which rows are duplicates.",
  lang: "py", run: true,
  code: `import pandas as pd

df = pd.DataFrame({
    "name":   ["Anitha", "Ravi", "Priya", "Meena", "Arjun", "Ravi"],
    "dept":   ["Eng", "Eng", "Eng", "Sales", "Ops", "Eng"],
    "salary": [180000, 120000, None, 70000, 65000, 120000],
})
print(df.shape)
print(df.isna().sum()["salary"], "missing salary")

df = df.drop_duplicates()
df["salary"] = df["salary"].fillna(df["salary"].median())
print(df.groupby("dept")["salary"].mean())
print(df[(df["dept"] == "Eng") & (df["salary"] > 100000)]["name"].tolist())`,
  mist: ["Using and/or instead of &/| (with brackets) in filters.", "Filling missing values with the mean when outliers make the median better.", "Ignoring the SettingWithCopyWarning — use .loc for assignments."],
  faq: [
    ["Pandas or SQL?", "SQL when data lives in a database and is large — let the database do the work. Pandas for analysis, cleaning and anything that needs Python afterwards."],
    ["How big can a DataFrame be?", "It must fit in memory. For bigger data use databases, chunked reading, or faster libraries like Polars or DuckDB."],
    ["What are the most important EDA questions?", "How many rows and columns? What types? What’s missing? What do distributions look like? Any outliers or duplicates? How do features relate to the target?"]
  ],
  iq: [["How do you handle missing values?", "First understand why they’re missing. Then choose: drop rows if few and random; fill with median for skewed numbers or mode for categories; add an “is_missing” flag if missingness itself is informative; or use a model-based imputer. I fit any filling on the training data only, to avoid leaking test information."]],
  cheat: ["pd.read_csv · head() · info() · describe() · shape", "df[df.c > x] · (cond1) & (cond2)", "groupby(\"g\")[\"c\"].mean() · pd.merge(a, b, on=, how=)", "isna().sum() · fillna · dropna · drop_duplicates"],
  quiz: [["Which shows column types and missing values?", ["df.head()", "df.info()", "df.sum()", "df.plot()"], 1, "info() lists types and non-null counts."],
         ["Pandas equivalent of SQL GROUP BY?", ["merge", "groupby", "pivot", "sort_values"], 1, "groupby then aggregate."]],
  cards: [["DataFrame", "A table in Pandas; each column is a Series."], ["EDA", "Exploratory data analysis: understand data before modelling."]]
},

/* ================= LEVEL 3 — MATHS FOR AI ================= */
{ id: "math-vectors", lv: 3, t: "Vectors and matrices (linear algebra)", min: 25,
  big: "A vector is a list of numbers that points somewhere in space; a matrix is a grid of numbers that transforms vectors.",
  why: "Embeddings are vectors, similarity is a dot product, every neural-network layer is a matrix multiplication, and attention is matrix maths. This is the language of AI.",
  body: [
    "A **vector** is a list of numbers, like `[2, 3]` — an arrow from the origin to the point (2, 3). Embeddings are vectors with hundreds or thousands of numbers (**dimensions**).",
    "**Length (magnitude)**: √(2² + 3²). In NumPy: `np.linalg.norm(v)`.",
    "**Dot product**: multiply matching numbers and add: [1,2]·[3,4] = 1×3 + 2×4 = 11. Big when vectors point the same way, zero when at right angles, negative when opposite.",
    "**Cosine similarity** = dot product ÷ (length × length). It measures direction only, from −1 to 1 — exactly what we want to compare meanings.",
    "A **matrix** is a grid of numbers with shape (rows × columns). Multiplying a vector by a matrix **transforms** it: rotates, stretches, or maps it into a new space.",
    "**Shape rule**: (m × n) @ (n × p) → (m × p). The inner numbers must match.",
    "A neural-network layer is `output = activation(W @ x + b)` — a matrix multiplication plus a bias.",
    "The **transpose** (Mᵀ) flips rows and columns — you’ll see it in the attention formula Q·Kᵀ."
  ],
  ex: "Two films described by [action, romance, comedy] scores: Vikram = [9, 2, 3], Jailer = [8, 1, 4]. Their cosine similarity is high — a recommender would suggest one to fans of the other.",
  lang: "py", run: true,
  code: `import numpy as np

vikram = np.array([9, 2, 3])     # [action, romance, comedy]
jailer = np.array([8, 1, 4])
romcom = np.array([1, 9, 7])

def cosine(a, b):
    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))

print(round(cosine(vikram, jailer), 3))   # similar
print(round(cosine(vikram, romcom), 3))   # different

W = np.array([[0.5, 0.0, 0.1],             # a "layer": 3 inputs -> 2 outputs
              [0.0, 1.0, 0.2]])
print(W.shape, "@", vikram.shape, "->", (W @ vikram).shape)
print(W @ vikram)`,
  mist: ["Comparing embeddings with plain distance when lengths differ — use cosine.", "Multiplying matrices whose inner dimensions don’t match.", "Thinking you need to do this maths by hand — you need the intuition; libraries do the arithmetic."],
  faq: [
    ["What do 768 dimensions mean?", "The model describes each text with 768 numbers. Each number captures some learned aspect of meaning; we can’t picture it, but distances and angles still work the same way."],
    ["Why cosine instead of Euclidean distance?", "Cosine ignores length and compares direction, so a long and a short text about the same topic still match. With normalised vectors the two rank results the same way."],
    ["How much linear algebra do I need?", "Vectors, dot product, cosine, matrix multiplication and shapes. That covers embeddings, layers and attention."]
  ],
  iq: [["Explain the dot product and why it matters in AI.", "Multiply corresponding elements and sum them. Geometrically it’s the product of the lengths times the cosine of the angle, so it measures how aligned two vectors are. It’s how we score similarity between embeddings, how attention scores queries against keys, and what every neural-network layer computes."]],
  cheat: ["Vector = list of numbers (embedding)", "Dot product: Σ aᵢbᵢ; cosine = a·b / (‖a‖‖b‖)", "(m×n) @ (n×p) → (m×p)", "Layer: y = activation(W·x + b)"],
  quiz: [["[1, 2] · [3, 4] = ?", ["10", "11", "7", "24"], 1, "1×3 + 2×4 = 11."],
         ["(2×3) matrix @ (3,) vector gives shape…", ["(3,)", "(2,)", "(2, 3)", "Error"], 1, "Inner 3s match; result has 2 numbers."]],
  cards: [["Dot product", "Multiply matching numbers and add; measures alignment."], ["Matrix shape rule", "(m×n)@(n×p) → (m×p); inner dimensions must match."]]
},

{ id: "math-prob", lv: 3, t: "Probability and statistics", min: 30,
  big: "Statistics summarises data; probability measures uncertainty. LLMs literally output probabilities for the next word.",
  why: "You’ll read evaluation results, latency percentiles and A/B tests, and you need to understand that a model picks words by probability — that’s what temperature changes.",
  body: [
    "**Mean** (average), **median** (middle value — not fooled by outliers), **mode** (most common).",
    "**Variance** and **standard deviation** measure spread: how far values usually are from the mean.",
    "**Percentiles**: p95 latency = 95% of requests were faster than this. Production teams watch p50, p95 and p99, not the average.",
    "**Probability** is a number from 0 to 1. All outcomes together add up to 1.",
    "**Distributions** describe how values spread: the **normal** (bell curve), **uniform** (all equal), and the **categorical** distribution over words that an LLM produces.",
    "**Conditional probability** P(A | B): the chance of A given B happened. An LLM computes P(next word | all previous words).",
    "**Bayes’ rule** updates beliefs with evidence: P(A|B) = P(B|A)·P(A) / P(B). It’s the logic behind spam filters and diagnostic tests.",
    "**Softmax** turns any list of scores into probabilities that add to 1 — the last step of every LLM.",
    "**Correlation is not causation**: two things rising together doesn’t mean one causes the other.",
    "**Sampling** and **significance**: a small A/B test can show a difference by luck; you need enough data to trust it."
  ],
  ex: "Your chatbot’s average response time is 1.2 s, but the p95 is 6 s — 1 in 20 users waits six seconds. The average hid the problem; the percentile shows it.",
  lang: "py", run: true,
  code: `import statistics as st
import math

latency = [0.8, 0.9, 1.0, 1.1, 0.9, 1.0, 6.5, 0.95, 1.05, 0.85]
print("mean  ", round(st.mean(latency), 2))
print("median", st.median(latency))
print("stdev ", round(st.stdev(latency), 2))
print("p90   ", st.quantiles(latency, n=10)[-1])

def softmax(scores):
    exps = [math.exp(s) for s in scores]
    total = sum(exps)
    return [round(e / total, 3) for e in exps]

# model scores for next word: "tea", "coffee", "juice"
print(softmax([2.0, 1.0, 0.1]))`,
  mist: ["Reporting only the mean when there are outliers.", "Concluding causation from correlation.", "Trusting an A/B result from 20 users."],
  faq: [
    ["Why does the median resist outliers?", "It only cares about the middle position, so one huge value doesn’t move it. The mean adds every value, so one huge value drags it up."],
    ["What does softmax actually do?", "It exponentiates every score (making them positive and exaggerating differences) and divides by the total so they add up to 1 — turning scores into probabilities."],
    ["Do I need advanced statistics for GenAI roles?", "No. Know summaries, percentiles, probability, conditional probability, softmax and the basics of A/B testing."]
  ],
  iq: [["Why do teams monitor p95 or p99 latency instead of the average?", "Averages hide the tail: a few very slow requests barely move the mean but ruin the experience for those users. p95 and p99 show the experience of the slowest 5% or 1%, which is what users complain about and what SLAs are written against."]],
  cheat: ["Mean (sensitive) · median (robust) · mode", "Std dev = typical distance from the mean", "p95 = 95% of values are below this", "Softmax: exp(s) / Σ exp — scores → probabilities", "Correlation ≠ causation"],
  quiz: [["Softmax outputs always sum to…", ["0", "1", "100", "The number of classes"], 1, "They form a probability distribution."],
         ["Ice-cream sales and sunburns rise together. This shows…", ["Causation", "Correlation, not necessarily causation", "Overfitting", "A normal distribution"], 1, "Summer drives both."]],
  cards: [["p95 latency", "95% of requests are faster than this value."], ["Conditional probability", "P(A | B): chance of A given B. LLMs compute P(next token | previous tokens)."], ["Softmax", "Turns scores into probabilities that sum to 1."]]
},

{ id: "math-calc", lv: 3, t: "Calculus intuition: slopes and gradient descent", min: 25,
  big: "A derivative is a slope; training a model means repeatedly stepping downhill on the error until it stops falling.",
  why: "Every model — from linear regression to GPT — is trained by gradient descent. Understanding it explains learning rates, divergence and why training takes time.",
  body: [
    "A **derivative** tells you how fast something changes: the slope of a curve at a point. Positive slope → going up; negative → going down; zero → flat (a bottom or top).",
    "A **loss function** measures how wrong the model is. Training wants the lowest loss.",
    "The **gradient** is the slope in many directions at once — one number per model weight — pointing uphill.",
    "**Gradient descent**: step the opposite way of the gradient (downhill): `w = w − learning_rate × gradient`.",
    "The **learning rate** is the step size. Too big → you overshoot and may diverge. Too small → painfully slow.",
    "The **chain rule** lets you compute slopes through many layers, one after another. **Backpropagation** is the chain rule applied efficiently from the loss back to every weight.",
    "**Exponentials and logs** appear everywhere: softmax uses exp, and **cross-entropy loss** uses −log(probability of the right answer) — small when the model is confident and right, huge when confident and wrong.",
    "You don’t compute these by hand — PyTorch’s **autograd** does it. You need the picture: a ball rolling downhill in fog, feeling the slope under its feet."
  ],
  ex: "Hiking down a hill in thick fog: you can’t see the valley, but you feel which way the ground slopes and take a step down. Repeat until the ground is flat. That is gradient descent.",
  lang: "py", run: true,
  code: `# Find the w that minimises loss(w) = (w - 3)^2. The answer is 3.
def loss(w):
    return (w - 3) ** 2

def gradient(w):
    return 2 * (w - 3)          # derivative of the loss

w = 0.0
lr = 0.1                         # learning rate
for step in range(25):
    w = w - lr * gradient(w)     # step downhill
    if step % 6 == 0:
        print(f"step {step:2d}  w={w:.3f}  loss={loss(w):.4f}")
print("final w:", round(w, 3))

w = 0.0
for step in range(5):
    w = w - 1.1 * gradient(w)    # learning rate too big
print("with lr=1.1, w after 5 steps:", round(w, 1), "(diverging!)")`,
  mist: ["Thinking a bigger learning rate always trains faster.", "Assuming gradient descent always finds the global best — it can settle in a local valley.", "Believing you must do calculus by hand to work in AI."],
  faq: [
    ["What is a local minimum?", "A valley that isn’t the lowest one. In huge neural networks this matters less than expected; there are many good-enough valleys."],
    ["Why does cross-entropy use a log?", "−log(p) is near 0 when p is near 1 (confident and right) and grows very large as p approaches 0 (confident and wrong), punishing confident mistakes hard."],
    ["What is a learning-rate schedule?", "Changing the learning rate during training: often a short warm-up, then a gradual decrease so the model settles precisely."]
  ],
  iq: [["Explain gradient descent and the role of the learning rate.", "We measure error with a loss function, compute its gradient with respect to every weight — the direction of steepest increase — and move each weight a small step in the opposite direction. The learning rate is the step size: too high and the loss oscillates or diverges, too low and training is slow or stalls. In practice we use optimisers like Adam with warm-up and decay schedules."]],
  cheat: ["Derivative = slope; gradient = slopes for all weights", "w ← w − lr × gradient", "lr too big → diverge; too small → slow", "Backprop = chain rule from loss to every weight", "Cross-entropy = −log(p of the right answer)"],
  quiz: [["If the learning rate is too large, training…", ["Converges perfectly", "Overshoots and may diverge", "Stops immediately", "Uses less memory"], 1, "Steps jump past the minimum."],
         ["Backpropagation computes…", ["The learning rate", "Gradients of the loss for every weight", "Token IDs", "Batch size"], 1, "It applies the chain rule backwards."]],
  cards: [["Gradient descent", "Repeatedly step each weight opposite to the gradient to reduce loss."], ["Learning rate", "Step size in gradient descent."], ["Cross-entropy loss", "−log(probability given to the correct answer)."]]
}
);
