/* GenAI Mastery — course content, part 2 (Levels 4–7). Same fields as part 1. */
globalThis.COURSE = globalThis.COURSE || [];
COURSE.push(

/* ================= LEVEL 4 — MACHINE LEARNING ================= */
{ id: "ml-intro", lv: 4, t: "What machine learning is (and isn’t)", min: 20,
  big: "Machine learning finds patterns in examples so a program can make predictions without hand-written rules.",
  why: "Generative AI is one branch of machine learning. Interviewers expect you to place GenAI in the bigger picture and know when a simpler method is the better choice.",
  body: [
    "**AI** ⊃ **machine learning** ⊃ **deep learning** ⊃ **generative AI**. AI is the goal (smart behaviour); ML is learning from data; deep learning uses neural networks; GenAI creates new content.",
    "**Rules vs learning**: a spam filter with rules (“if it contains FREE”) breaks easily. An ML filter learns from thousands of labelled emails.",
    "Types of learning:",
    "- **Supervised** — examples with answers (labels). Predict a number (**regression**: house price) or a category (**classification**: spam or not).",
    "- **Unsupervised** — no labels; find structure (**clustering** customers, **dimensionality reduction**).",
    "- **Self-supervised** — the data provides its own labels: hide the next word and predict it. ==This is how LLMs are pre-trained.==",
    "- **Reinforcement learning** — learn by trial and reward (games, robotics, RLHF for chatbots).",
    "**Discriminative vs generative**: discriminative models decide (is this a cat?); generative models create (draw a cat).",
    "**When not to use ML**: when simple rules work, when you have no data, when every decision must be fully explainable, or when mistakes are unacceptable without human review."
  ],
  ex: "UPI fraud detection is supervised classification (fraud or not). Grouping app users by behaviour is clustering. ChatGPT pre-training is self-supervised. YouTube recommendations combine several.",
  lang: "text", run: false,
  code: `Problem                         Type                    Output
House price in Chennai          Supervised regression   a number (₹)
Is this transaction fraud?      Supervised classification  yes / no
Group customers by behaviour    Unsupervised clustering  group IDs
Predict the next word           Self-supervised          a probability for each word
Teach a robot to walk           Reinforcement learning   actions that earn reward`,
  mist: ["Saying “AI” and “ML” mean the same thing.", "Reaching for an LLM when a simple rule or a small classifier would be cheaper and more reliable.", "Forgetting that a model is only as good as its data."],
  faq: [
    ["Is ChatGPT machine learning?", "Yes — it is a deep-learning model (a transformer) trained with self-supervised learning, then fine-tuned with supervised learning and reinforcement learning from human feedback."],
    ["Do GenAI engineers need classic ML?", "You need the concepts — data splits, overfitting, metrics, evaluation — because they apply directly to LLM apps. You rarely need to implement algorithms from scratch."],
    ["What is AGI?", "Artificial general intelligence: a system as broadly capable as a human. It remains a research goal; today’s systems are powerful but specialised."]
  ],
  iq: [["When would you not use an LLM to solve a problem?", "When a deterministic rule or a small classical model does the job: strict formats, simple classification with plenty of labelled data, very high volume where cost and latency matter, or decisions that must be fully explainable or auditable. I’d also avoid it where errors are unacceptable without human review."]],
  cheat: ["AI ⊃ ML ⊃ deep learning ⊃ GenAI", "Supervised (labels) · unsupervised (structure) · self-supervised (LLM pre-training) · RL (rewards)", "Regression = number; classification = category", "Discriminative decides; generative creates"],
  quiz: [["Predicting a house price is…", ["Classification", "Regression", "Clustering", "Reinforcement learning"], 1, "The output is a number."],
         ["LLM pre-training is mostly…", ["Supervised with human labels", "Self-supervised next-token prediction", "Clustering", "Pure reinforcement learning"], 1, "Labels come from the text itself."]],
  cards: [["Supervised learning", "Learning from examples that include the correct answer."], ["Self-supervised learning", "Labels come from the data itself, e.g. predict the hidden next word."]]
},

{ id: "ml-workflow", lv: 4, t: "The ML workflow and data splits", min: 25,
  big: "Good ML follows a fixed loop: frame the problem, get data, split it, train, evaluate on unseen data, deploy, monitor.",
  why: "The same workflow applies to LLM apps: define success, build a test set, measure, improve, monitor. Mistakes here (like data leakage) make results look great and then fail in production.",
  body: [
    "1. **Frame the problem**: what decision does it support, and what metric means success?",
    "2. **Collect and understand data** (EDA): quality, labels, bias, missing values.",
    "3. **Features**: the inputs the model uses. Good features matter more than fancy algorithms.",
    "4. **Split the data**:",
    "- **Training set** (~70–80%) — the model learns from it.",
    "- **Validation set** (~10–15%) — you tune settings and choose models with it.",
    "- **Test set** (~10–15%) — touched once at the end for an honest score.",
    "5. **Train** a simple **baseline** first, then improve.",
    "6. **Evaluate** on data the model has never seen.",
    "7. **Deploy, monitor and retrain** — the world changes (**data drift**), so performance decays.",
    "**Data leakage**: information from the test set (or the future) sneaks into training — e.g. scaling with statistics of the whole dataset, or using a column that’s only known after the outcome. It gives fake-good results.",
    "Split **by time** for time-based problems (train on the past, test on the future) and **by group** when the same customer appears many times."
  ],
  ex: "A hospital builds a no-show predictor. If the training data includes a “cancelled_reason” column (filled in only after a no-show), accuracy looks 99% — but it’s leakage, and the model fails on new bookings.",
  lang: "py", run: true,
  code: `import random

data = list(range(100))            # stand-in for 100 labelled examples
random.seed(42)
random.shuffle(data)

train = data[:70]
val   = data[70:85]
test  = data[85:]
print(len(train), len(val), len(test))

# Leakage check: no example may appear in two splits
print("overlap:", set(train) & set(test))`,
  mist: ["Tuning on the test set until it looks good — it is no longer an honest test.", "Fitting scalers or encoders on all data before splitting.", "Skipping a baseline, so you don’t know whether the fancy model helps."],
  faq: [
    ["Why do I need both validation and test sets?", "You make many decisions using the validation set, so it gradually becomes optimistic. The test set stays untouched for one honest final check."],
    ["What is a baseline?", "The simplest reasonable approach (predict the most common class, a keyword rule, or a plain prompt). Every improvement is measured against it."],
    ["How does this apply to LLM apps?", "Your “test set” is a golden dataset of real questions with expected answers. You never tune prompts on it blindly, and you re-run it whenever you change the prompt, model or data."]
  ],
  iq: [["What is data leakage, and how do you prevent it?", "Leakage is when information unavailable at prediction time — test data or future data — influences training, which inflates offline scores. I prevent it by splitting first and fitting all preprocessing on the training set only, splitting by time or by entity where relevant, removing features that are only known after the outcome, and being suspicious of results that look too good."]],
  cheat: ["Frame → data → features → split → baseline → train → evaluate → deploy → monitor", "Train ~70–80% · validation ~10–15% · test ~10–15% (touch once)", "Leakage = test/future info in training → fake-good scores", "Split by time or by entity when needed"],
  quiz: [["Fitting a scaler on the whole dataset before splitting causes…", ["Faster training", "Data leakage", "Better generalisation", "Nothing"], 1, "Test statistics leak into training."],
         ["Which set should you use to choose between models?", ["Training", "Validation", "Test", "Any"], 1, "Keep the test set for the final, honest score."]],
  cards: [["Data leakage", "Information not available at prediction time leaking into training."], ["Baseline", "The simplest reasonable approach every model must beat."], ["Data drift", "Real-world data changing over time so a model gets worse."]]
},

{ id: "ml-models", lv: 4, t: "Regression, classification and the classic algorithms", min: 30,
  big: "A small set of classic algorithms solves most tabular problems; knowing what each one is good at is enough for interviews.",
  why: "Interviewers ask “which model would you use and why?”. GenAI systems also use classic models for routing, classification and ranking around the LLM.",
  body: [
    "**Linear regression** — fits a straight line (or plane): `price = w₁·size + w₂·rooms + b`. Simple, explainable, a strong baseline for numbers.",
    "**Logistic regression** — a classifier: a linear score squeezed into a 0–1 probability by the **sigmoid** function. The go-to baseline for yes/no.",
    "**k-Nearest Neighbours (kNN)** — predict from the k most similar examples. Same idea as vector search in RAG.",
    "**Decision tree** — a flowchart of yes/no questions. Easy to explain, but overfits alone.",
    "**Random forest** — many trees on random samples, voting together. Robust, reduces variance (**bagging**).",
    "**Gradient boosting** (XGBoost, LightGBM, CatBoost) — trees built one after another, each fixing the last one’s errors. ==Usually the best for tabular data.==",
    "**Support vector machine (SVM)** — finds the widest margin between classes.",
    "**Naive Bayes** — probability-based, fast, classic for text and spam.",
    "**k-Means** — unsupervised: groups points into k clusters around centres.",
    "**PCA** — compresses many features into a few that keep most of the variation (also used to visualise embeddings)."
  ],
  ex: "A bank’s loan-default model on tabular data (income, history, age of account) is usually gradient boosting. A support-ticket router might be logistic regression on embeddings — cheaper than asking an LLM for every ticket.",
  lang: "py", run: true,
  code: `# Linear regression from scratch: price (lakh) vs size (100 sq ft)
sizes  = [6, 8, 10, 12, 15]
prices = [42, 55, 68, 80, 101]

n = len(sizes)
mean_x, mean_y = sum(sizes) / n, sum(prices) / n
w = sum((x - mean_x) * (y - mean_y) for x, y in zip(sizes, prices)) / \\
    sum((x - mean_x) ** 2 for x in sizes)
b = mean_y - w * mean_x
print(f"price = {w:.2f} * size + {b:.2f}")
print("Predicted price for 1100 sq ft:", round(w * 11 + b, 1), "lakh")

import math
def sigmoid(z):                     # logistic regression squeezes scores to 0..1
    return 1 / (1 + math.exp(-z))
print([round(sigmoid(z), 2) for z in (-3, 0, 3)])`,
  mist: ["Using deep learning on small tabular datasets where gradient boosting wins.", "Using linear regression for a yes/no problem.", "Forgetting to scale features for kNN, SVM and k-means, which rely on distances."],
  faq: [
    ["Bagging vs boosting?", "Bagging trains many models in parallel on random samples and averages them (random forest) — it reduces variance. Boosting trains models in sequence, each correcting the previous errors (XGBoost) — it reduces bias."],
    ["Why is logistic regression called regression if it classifies?", "It regresses a score (the log-odds) and then turns it into a probability; the name is historical."],
    ["Which algorithm should I try first?", "A simple baseline (logistic or linear regression), then gradient boosting for tabular data. Pick by measured results, not by fashion."]
  ],
  iq: [["Random forest vs gradient boosting — when would you choose each?", "Random forest is robust, needs little tuning, trains in parallel and resists overfitting — a good quick strong model. Gradient boosting usually gives the best accuracy on tabular data but needs more careful tuning (learning rate, depth, number of trees) and can overfit noisy data. I’d start with a random forest or a lightly tuned boosting model and pick based on validation results."]],
  cheat: ["Linear regression → numbers; logistic regression → probabilities (sigmoid)", "Trees → explainable; random forest = bagging; XGBoost = boosting (best tabular)", "kNN, SVM, k-means need scaled features", "k-means = clustering; PCA = compress features"],
  quiz: [["Best default for a tabular classification problem with plenty of data?", ["k-means", "Gradient boosting", "PCA", "Linear regression"], 1, "Boosted trees usually win on tabular data."],
         ["A random forest mainly reduces…", ["Bias", "Variance", "Latency", "Data size"], 1, "Averaging many trees smooths out variance."]],
  cards: [["Sigmoid", "Squeezes any number into 0–1; turns a score into a probability."], ["Bagging vs boosting", "Bagging: parallel models averaged. Boosting: sequential models fixing errors."], ["k-means", "Unsupervised clustering into k groups around centres."]]
},

{ id: "ml-metrics", lv: 4, t: "Evaluation metrics", min: 30,
  big: "A metric turns “is the model good?” into a number — and choosing the right metric is a business decision.",
  why: "Every ML and GenAI interview asks about precision, recall and F1, and the same thinking drives RAG metrics like recall@k and faithfulness.",
  body: [
    "The **confusion matrix** for a yes/no model has four cells:",
    "- **TP** (true positive): said yes, was yes. **TN**: said no, was no.",
    "- **FP** (false positive): said yes, was no — a false alarm.",
    "- **FN** (false negative): said no, was yes — a miss.",
    "**Accuracy** = (TP + TN) / all. Misleading with imbalance: if 1% of transactions are fraud, “never fraud” is 99% accurate and useless.",
    "**Precision** = TP / (TP + FP): of what I flagged, how much was right? Matters when false alarms are costly.",
    "**Recall** = TP / (TP + FN): of all real positives, how many did I catch? Matters when misses are costly (disease, fraud).",
    "**F1** = 2·P·R / (P + R): one number balancing both.",
    "**Threshold**: moving the probability cut-off trades precision against recall. **ROC-AUC** summarises performance across all thresholds (1.0 perfect, 0.5 random).",
    "Regression metrics: **MAE** (average absolute error, easy to explain), **RMSE** (punishes big errors), **R²** (share of variation explained).",
    "Ranking/retrieval metrics: **precision@k**, **recall@k**, **MRR**, **nDCG** — used in search and RAG."
  ],
  ex: "A cancer-screening model should favour recall (missing a case is terrible; a false alarm leads to another test). A spam filter should favour precision (hiding a real email from your boss is worse than letting one spam through).",
  lang: "py", run: true,
  code: `y_true = [1, 0, 1, 1, 0, 0, 1, 0, 0, 1]   # 1 = fraud
y_pred = [1, 0, 0, 1, 0, 1, 1, 0, 0, 0]

tp = sum(t == 1 and p == 1 for t, p in zip(y_true, y_pred))
tn = sum(t == 0 and p == 0 for t, p in zip(y_true, y_pred))
fp = sum(t == 0 and p == 1 for t, p in zip(y_true, y_pred))
fn = sum(t == 1 and p == 0 for t, p in zip(y_true, y_pred))
print("TP TN FP FN:", tp, tn, fp, fn)

accuracy  = (tp + tn) / len(y_true)
precision = tp / (tp + fp)
recall    = tp / (tp + fn)
f1 = 2 * precision * recall / (precision + recall)
print(f"accuracy={accuracy:.2f} precision={precision:.2f} recall={recall:.2f} f1={f1:.2f}")`,
  mist: ["Reporting accuracy on imbalanced data.", "Choosing a metric without asking what each error costs the business.", "Comparing models evaluated on different test sets."],
  faq: [
    ["How do I remember precision vs recall?", "Precision: “when I say yes, am I right?” Recall: “did I find them all?”"],
    ["Why F1 and not the average of precision and recall?", "The harmonic mean is low if either is low, so a model can’t hide terrible recall behind great precision."],
    ["What is a good AUC?", "0.5 is random guessing, 0.7–0.8 is useful, above 0.9 is strong — but always compare against a baseline on the same data."]
  ],
  iq: [["Precision vs recall — which would you optimise for fraud detection, and why?", "Usually recall, because a missed fraud is expensive, while a false alarm costs a quick check. But precision can’t collapse, or analysts drown in alerts. I’d pick a threshold that meets a minimum recall target and then maximise precision, and track the cost of each error type with the business."]],
  cheat: ["Precision = TP/(TP+FP) — false alarms costly", "Recall = TP/(TP+FN) — misses costly", "F1 = 2PR/(P+R) · accuracy fails on imbalance", "ROC-AUC across thresholds · MAE/RMSE/R² for numbers", "recall@k · MRR · nDCG for ranking/RAG"],
  quiz: [["Precision is…", ["TP / (TP + FN)", "TP / (TP + FP)", "(TP + TN) / all", "FP / all"], 1, "Of predicted positives, how many were right."],
         ["1% of data is fraud; a model always says “not fraud”. Its accuracy is…", ["1%", "50%", "99%", "0%"], 2, "Accuracy looks great but the model is useless — use recall/precision."]],
  cards: [["Precision", "Of everything flagged positive, the share that really was."], ["Recall", "Of all real positives, the share that was caught."], ["Confusion matrix", "TP, TN, FP, FN counts for a classifier."]]
},

{ id: "ml-fit", lv: 4, t: "Overfitting, bias–variance and cross-validation", min: 25,
  big: "A model must learn the real pattern, not memorise the examples — and you check that by testing on data it hasn’t seen.",
  why: "Overfitting is the most common reason models fail in production, including fine-tuned LLMs. Interviewers almost always ask about it.",
  body: [
    "**Overfitting**: great on training data, poor on new data — memorising instead of learning (a student who memorised last year’s paper).",
    "**Underfitting**: poor even on training data — the model is too simple.",
    "**Bias** = error from wrong, oversimplified assumptions (underfitting). **Variance** = error from being too sensitive to the particular training data (overfitting). Making a model more complex lowers bias but raises variance — the **bias–variance trade-off**.",
    "Spot it: training score keeps improving while validation score gets worse.",
    "Fixes for overfitting: more (or more varied) data, **regularisation** (L1 shrinks some weights to zero, L2 shrinks all), **dropout** in neural nets, **early stopping**, simpler models, data augmentation.",
    "**Cross-validation** (k-fold): split data into k parts, train on k−1 and test on the remaining one, rotate, and average. A more reliable estimate than a single split.",
    "**Hyperparameters** are settings you choose (tree depth, learning rate, LoRA rank); **parameters** are what the model learns. Tune hyperparameters with grid search, random search or Bayesian optimisation on validation data."
  ],
  ex: "Fine-tuning a model on 200 support replies for 10 epochs makes it parrot those exact replies and fail on new questions — overfitting. Two epochs plus a held-out set catches it.",
  lang: "py", run: true,
  code: `# k-fold cross-validation indices, written by hand
data = list(range(10))
k = 5
fold_size = len(data) // k

for i in range(k):
    test_idx = data[i * fold_size:(i + 1) * fold_size]
    train_idx = [d for d in data if d not in test_idx]
    print(f"fold {i}: test={test_idx} train size={len(train_idx)}")

# Typical overfitting signal (made-up scores per epoch)
train_acc = [0.70, 0.80, 0.88, 0.95, 0.99]
val_acc   = [0.68, 0.76, 0.80, 0.78, 0.74]
best = max(range(len(val_acc)), key=lambda e: val_acc[e])
print("stop early at epoch", best + 1)`,
  mist: ["Judging a model by its training score.", "Adding complexity when the problem is bad data.", "Running cross-validation on time-series data with random splits."],
  faq: [
    ["Is more data always better?", "More *good, relevant* data usually helps, especially against overfitting. More noisy or biased data can hurt."],
    ["What is regularisation in plain words?", "A penalty that discourages the model from relying on very large weights, nudging it towards simpler explanations."],
    ["How does this apply to LLMs?", "Fine-tuning on a small dataset overfits easily; prompts can also “overfit” to the few examples you tested. Held-out evaluation sets are the cure in both cases."]
  ],
  iq: [["Explain the bias–variance trade-off.", "Bias is error from overly simple assumptions, so the model underfits; variance is error from sensitivity to the particular training data, so it overfits. As complexity grows, bias falls and variance rises, and total error is lowest somewhere in between. We find that point with validation data, and use regularisation, more data or ensembles to reduce variance without adding much bias."]],
  cheat: ["Overfit: train ↑ validation ↓ · underfit: both poor", "Bias = too simple · variance = too sensitive", "Fixes: more data, regularisation (L1/L2), dropout, early stopping, simpler model", "k-fold CV = rotate test folds, average scores", "Parameters learned; hyperparameters chosen"],
  quiz: [["Training accuracy 98%, test accuracy 70%. This is…", ["Underfitting", "Overfitting", "Data drift", "A perfect model"], 1, "A big gap signals memorisation."],
         ["Cross-validation gives…", ["Faster training", "A more reliable performance estimate", "More data", "Fewer features"], 1, "Averaging over folds reduces luck."]],
  cards: [["Overfitting", "Memorising training data; poor on new data."], ["Early stopping", "Stop training when validation performance stops improving."], ["Hyperparameter", "A setting chosen before training (depth, learning rate, LoRA rank)."]]
},

{ id: "ml-sklearn", lv: 4, t: "Hands-on: scikit-learn", min: 25,
  big: "scikit-learn gives every classic algorithm the same simple recipe: fit on training data, predict on new data, score the result.",
  why: "It’s the standard library for classic ML, used for baselines, classifiers around LLMs and quick experiments — and it runs right here in your browser.",
  body: [
    "The recipe is always the same:",
    "- `model = SomeModel(settings)`",
    "- `model.fit(X_train, y_train)` — learn",
    "- `model.predict(X_test)` — use",
    "- a metric from `sklearn.metrics` — measure",
    "`X` is a table of features (rows = examples); `y` is the answers.",
    "`train_test_split` splits data; `stratify=y` keeps class balance in both parts.",
    "**Pipelines** chain preprocessing (scaling, encoding) and the model so preprocessing is fitted on training data only — preventing leakage.",
    "`cross_val_score` runs k-fold cross-validation in one line.",
    "Switching algorithms is one line, because they all share the same interface."
  ],
  ex: "The Iris dataset (flower measurements → species) is the “hello world” of ML. The same five lines classify support tickets once you turn text into features.",
  lang: "py", run: true,
  code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=0, stratify=y)

for model in [make_pipeline(StandardScaler(), LogisticRegression(max_iter=500)),
              RandomForestClassifier(n_estimators=100, random_state=0)]:
    model.fit(X_train, y_train)
    acc = accuracy_score(y_test, model.predict(X_test))
    cv = cross_val_score(model, X, y, cv=5).mean()
    print(type(model).__name__, "test:", round(acc, 3), "cv:", round(cv, 3))`,
  mist: ["Scaling before splitting instead of inside a pipeline.", "Forgetting random_state, so results change each run.", "Evaluating on the training data."],
  faq: [
    ["Is scikit-learn used for deep learning?", "No — it’s for classic ML. Deep learning uses PyTorch (or TensorFlow/JAX)."],
    ["Why does this run slowly the first time here?", "Your browser downloads Python and scikit-learn once (tens of MB); after that it’s cached."]
  ],
  iq: [["Why use a pipeline in scikit-learn?", "A pipeline bundles preprocessing and the model so that during cross-validation and training, transformers like scalers are fitted only on the training fold. That prevents data leakage, keeps the code tidy and makes deployment safer because one object does the whole transformation."]],
  cheat: ["model.fit(X_train, y_train) → model.predict(X_test) → metric", "train_test_split(X, y, test_size=0.2, stratify=y, random_state=0)", "make_pipeline(StandardScaler(), Model()) prevents leakage", "cross_val_score(model, X, y, cv=5)"],
  quiz: [["Which method learns from data?", ["predict", "fit", "score", "transform only"], 1, "fit trains the model."],
         ["stratify=y in train_test_split…", ["Shuffles columns", "Keeps class proportions the same in both splits", "Removes duplicates", "Scales data"], 1, "Important for imbalanced classes."]],
  cards: [["fit / predict", "fit learns from training data; predict applies the model to new data."], ["Pipeline", "Chains preprocessing + model so preprocessing fits on training data only."]]
},

/* ================= LEVEL 5 — DEEP LEARNING ================= */
{ id: "dl-nn", lv: 5, t: "Neural networks", min: 25,
  big: "A neural network is layers of simple units, each taking a weighted sum of its inputs and passing it through a non-linear function.",
  why: "Every LLM, image model and speech model is a neural network. Knowing what a neuron, layer and activation are makes everything later understandable.",
  body: [
    "A **neuron**: multiply each input by a **weight**, add them up, add a **bias**, then apply an **activation function**.",
    "A **layer** is many neurons side by side — mathematically one matrix multiplication: `y = activation(W·x + b)`.",
    "**Deep** learning = many layers stacked. Early layers learn simple patterns; later layers combine them into complex ones (edges → shapes → faces).",
    "**Activation functions** add non-linearity — without them, a stack of layers is just one big linear model:",
    "- **ReLU**: max(0, x) — simple and common.",
    "- **GELU / SwiGLU**: smooth variants used in transformers.",
    "- **Sigmoid**: squeezes to 0–1 (yes/no outputs). **Tanh**: −1 to 1.",
    "- **Softmax**: turns the final scores into probabilities over classes (or words).",
    "**Parameters** = all weights and biases. “7B” means 7 billion of them.",
    "A **forward pass** turns input into output. Training (next lesson) adjusts the parameters."
  ],
  ex: "A loan-approval network takes income, credit score and debt as inputs; hidden layers learn combinations like “high debt relative to income”; the output neuron gives a probability of default.",
  lang: "py", run: true,
  code: `import numpy as np

def relu(x):
    return np.maximum(0, x)

def softmax(z):
    e = np.exp(z - z.max())
    return e / e.sum()

x = np.array([0.5, -1.2, 3.0])                  # 3 input features
W1 = np.array([[0.2, -0.5, 0.1],
               [0.7,  0.3, -0.2],
               [-0.4, 0.8, 0.5],
               [0.1,  0.1, 0.9]])               # layer 1: 3 -> 4
b1 = np.zeros(4)
W2 = np.array([[0.3, -0.2, 0.5, 0.1],
               [-0.6, 0.4, 0.2, 0.7]])          # layer 2: 4 -> 2 classes

h = relu(W1 @ x + b1)                           # hidden layer
probs = softmax(W2 @ h)                         # output probabilities
print("hidden:", h.round(2))
print("class probabilities:", probs.round(3), "sum =", probs.sum().round(3))
print("parameters:", W1.size + b1.size + W2.size)`,
  mist: ["Thinking neurons are like brain cells in any detailed way — it’s a loose analogy.", "Forgetting activations, which collapses the network into a linear model.", "Using sigmoid in deep hidden layers, which causes vanishing gradients."],
  faq: [
    ["Why are non-linear activations necessary?", "Stacking linear layers gives another linear function, which can only draw straight boundaries. Non-linearity lets networks model curves and complex patterns."],
    ["What does a 7B model mean?", "It has about 7 billion learned numbers (weights and biases). At 2 bytes each that’s ~14 GB just to store them."],
    ["Is a bigger network always better?", "Bigger networks can learn more but need more data and compute, and cost more to run. Size must match the problem and budget."]
  ],
  iq: [["What is the role of an activation function?", "It introduces non-linearity so that stacked layers can represent complex functions; without it, any depth collapses into a single linear transformation. ReLU and its smooth cousins (GELU, SwiGLU) are standard in hidden layers; sigmoid or softmax are used at the output to produce probabilities."]],
  cheat: ["Neuron: activation(Σ wᵢxᵢ + b)", "Layer = matrix multiply + activation", "ReLU = max(0, x); GELU/SwiGLU in transformers; softmax at output", "Parameters = all weights + biases (7B ≈ 14 GB at FP16)"],
  quiz: [["Without activation functions, a deep network behaves like…", ["A random model", "A single linear model", "A decision tree", "A transformer"], 1, "Linear layers compose to one linear map."],
         ["Which activation turns output scores into probabilities over classes?", ["ReLU", "Softmax", "Tanh", "Linear"], 1, "Softmax outputs sum to 1."]],
  cards: [["Neuron", "Weighted sum of inputs + bias, passed through an activation."], ["ReLU", "max(0, x) — the most common hidden-layer activation."]]
},

{ id: "dl-train", lv: 5, t: "How neural networks train", min: 30,
  big: "Training repeats four steps millions of times: predict, measure the error, compute gradients with backprop, nudge the weights.",
  why: "Understanding training explains fine-tuning settings (learning rate, epochs, batch size), training curves and why models overfit or fail to learn.",
  body: [
    "The **training loop**:",
    "- **Forward pass** — compute predictions.",
    "- **Loss** — measure error (cross-entropy for classification and LLMs, MSE for numbers).",
    "- **Backward pass (backpropagation)** — compute the gradient for every weight using the chain rule.",
    "- **Optimiser step** — update the weights.",
    "**Batch**: examples processed together per update. **Epoch**: one full pass over the training data. **Iteration/step**: one update.",
    "**Optimisers**: SGD (plain gradient descent on a batch), **Adam/AdamW** (adapts the step for each weight — the default for transformers).",
    "**Learning-rate schedules**: warm up, then decay.",
    "Problems and fixes:",
    "- **Vanishing/exploding gradients** — fixed by good activations, **residual connections**, **normalisation** (LayerNorm in transformers), gradient clipping.",
    "- **Overfitting** — **dropout** (randomly switch off neurons during training), weight decay, early stopping.",
    "Watch **training and validation loss curves**: both falling = learning; validation rising = overfitting; nothing falling = learning rate or data problem.",
    "**Mixed precision** (FP16/BF16) trains faster with less memory; **GPUs/TPUs** do the heavy lifting."
  ],
  ex: "Training a model to read handwritten PIN codes: show a batch of 64 images, check how wrong the guesses are, adjust weights slightly, repeat for 10 epochs until validation accuracy stops improving.",
  lang: "py", run: true,
  code: `import numpy as np

# Logistic regression trained with the full loop: forward, loss, gradient, update
rng = np.random.default_rng(0)
X = rng.normal(size=(200, 2))
y = (X[:, 0] + X[:, 1] > 0).astype(float)          # true rule to discover

w, b, lr = np.zeros(2), 0.0, 0.5
for epoch in range(1, 201):
    z = X @ w + b
    p = 1 / (1 + np.exp(-z))                        # forward (sigmoid)
    loss = -np.mean(y * np.log(p + 1e-9) + (1 - y) * np.log(1 - p + 1e-9))
    grad_w = X.T @ (p - y) / len(y)                 # backward (gradients)
    grad_b = np.mean(p - y)
    w -= lr * grad_w                                # update
    b -= lr * grad_b
    if epoch in (1, 50, 200):
        acc = np.mean((p > 0.5) == y)
        print(f"epoch {epoch:3d}  loss {loss:.3f}  accuracy {acc:.2f}")`,
  mist: ["Too many epochs on small data.", "A learning rate so high the loss jumps around or becomes NaN.", "Only watching training loss, never validation loss."],
  faq: [
    ["Why train in batches instead of all data at once?", "All data rarely fits in GPU memory, and smaller batches give frequent, slightly noisy updates that often generalise better."],
    ["What does the loss becoming NaN mean?", "Numbers exploded — usually the learning rate is too high, or there’s a divide-by-zero/log-of-zero. Lower the learning rate, clip gradients, check the data."],
    ["Why is AdamW the default?", "It adapts step sizes per weight, converges reliably on transformers, and handles weight decay correctly."]
  ],
  iq: [["Explain backpropagation in simple terms.", "After the forward pass we know the loss. Backpropagation walks backwards through the network, using the chain rule to compute how much each weight contributed to the loss — its gradient. The optimiser then moves each weight a little in the direction that reduces the loss. Frameworks like PyTorch do this automatically with autograd."]],
  cheat: ["Loop: forward → loss → backward → optimiser step", "Batch → step; epoch = one pass over data", "AdamW + warm-up/decay is standard for transformers", "Fixes: residuals, LayerNorm, dropout, weight decay, gradient clipping, early stopping"],
  quiz: [["One full pass through the training data is an…", ["Iteration", "Epoch", "Batch", "Layer"], 1, "An epoch covers the whole dataset."],
         ["Dropout helps reduce…", ["Underfitting", "Overfitting", "Latency", "Token cost"], 1, "It stops the network relying on a few neurons."]],
  cards: [["Backpropagation", "Chain rule applied backwards to get every weight's gradient."], ["Epoch", "One full pass through the training data."], ["AdamW", "Adaptive optimiser with decoupled weight decay; transformer default."]]
},

{ id: "dl-arch", lv: 5, t: "CNNs, RNNs and transfer learning", min: 25,
  big: "Before transformers, CNNs ruled images and RNNs ruled sequences; transfer learning lets you reuse a pre-trained model for a new task.",
  why: "Interviewers ask why transformers replaced RNNs. Transfer learning is the idea behind every foundation model and fine-tuning.",
  body: [
    "**CNN (convolutional neural network)**: slides small filters across an image to detect local patterns — edges, then textures, then objects. Shares weights across positions, so it’s efficient. Used for image classification, detection, medical scans.",
    "**RNN (recurrent neural network)**: reads a sequence one step at a time, carrying a hidden “memory” forward.",
    "**LSTM/GRU**: RNNs with gates that decide what to remember or forget — better at longer sequences.",
    "RNN problems: they must process words **one after another** (slow to train, can’t use GPUs fully) and **forget** distant words.",
    "**Transformers** (Level 7) fixed both: they read all tokens **in parallel** and connect any two words directly with **attention**.",
    "**Autoencoders** compress input into a small code and reconstruct it — used for compression, anomaly detection and inside image generators (VAEs).",
    "**Transfer learning**: start from a model pre-trained on huge data, then adapt it to your task with a little data. ==This is exactly what “foundation model + fine-tuning” means.=="
  ],
  ex: "A hospital with only 2,000 labelled X-rays can’t train a model from scratch, but it can fine-tune a model pre-trained on millions of general images and get strong accuracy.",
  lang: "text", run: false,
  code: `Architecture   Reads data as         Good at                     Weakness
CNN            local image patches   images, video frames        not built for long text
RNN / LSTM     one token at a time   short sequences, speech     slow, forgets far context
Transformer    all tokens at once    text, code, images, audio   cost grows with length²
Autoencoder    compress → rebuild    compression, anomalies      not a direct generator alone`,
  mist: ["Saying RNNs are obsolete everywhere — small sequence models still have uses.", "Thinking transfer learning means copying answers; it reuses learned features.", "Training from scratch when a pre-trained model exists."],
  faq: [
    ["Are CNNs still used?", "Yes — in phones, cameras and medical imaging where efficiency matters, though vision transformers now compete or win on large data."],
    ["What is a foundation model?", "A large model pre-trained on broad data that can be adapted to many tasks — GPT, Claude, Llama, CLIP, Whisper."]
  ],
  iq: [["Why did transformers replace RNNs for language?", "RNNs process tokens sequentially, so training can’t be parallelised across the sequence, and information from distant tokens fades even with LSTMs. Transformers use self-attention to connect every token to every other directly and process the whole sequence in parallel on GPUs, which made training on internet-scale data feasible and captured long-range context far better."]],
  cheat: ["CNN = filters over images (local patterns)", "RNN/LSTM = sequential memory; slow, forgets", "Transformer = parallel + attention", "Transfer learning = pre-trained model + small task data"],
  quiz: [["Why did transformers replace RNNs for language?", ["They use less data", "Parallel training and better long-range context", "They need no GPUs", "They have no parameters"], 1, "Attention links distant tokens and runs in parallel."],
         ["Reusing an ImageNet-trained model for X-rays is…", ["Data leakage", "Transfer learning", "Bagging", "Quantisation"], 1, "Learned features transfer to the new task."]],
  cards: [["CNN", "Network that slides learned filters over images to find patterns."], ["LSTM", "RNN with gates to keep information over longer sequences."], ["Transfer learning", "Adapting a pre-trained model to a new task."]]
},

{ id: "dl-pytorch", lv: 5, t: "PyTorch basics", min: 25,
  big: "PyTorch is the main deep-learning library: tensors like NumPy arrays that can run on GPUs and compute their own gradients.",
  why: "Fine-tuning, Hugging Face Transformers and most research code use PyTorch. You should be able to read a training loop and explain each line.",
  body: [
    "A **tensor** is PyTorch’s array: `torch.tensor([1., 2.])`. Move it to a GPU with `.to(\"cuda\")`.",
    "**Autograd**: set `requires_grad=True` and PyTorch records operations; `loss.backward()` computes all gradients automatically.",
    "`nn.Module` defines a model: layers in `__init__`, the computation in `forward`.",
    "Building blocks: `nn.Linear`, `nn.ReLU`, `nn.Embedding`, `nn.LayerNorm`, `nn.Dropout`, `nn.CrossEntropyLoss`.",
    "The standard training loop: `optimizer.zero_grad()` → `loss = loss_fn(model(x), y)` → `loss.backward()` → `optimizer.step()`.",
    "`model.train()` vs `model.eval()` switches behaviour of dropout and normalisation; use `torch.no_grad()` for inference.",
    "`DataLoader` serves shuffled batches.",
    "In practice you rarely write models from scratch: **Hugging Face Transformers** loads pre-trained models in a few lines, and libraries like **PEFT** and **TRL** handle fine-tuning."
  ],
  ex: "Fine-tuning a sentiment classifier for Tamil movie reviews: load a pre-trained multilingual model with Hugging Face, wrap your reviews in a DataLoader, and run the same 4-line loop for two epochs on a Colab GPU.",
  lang: "py", run: false,
  code: `import torch
from torch import nn

model = nn.Sequential(nn.Linear(2, 16), nn.ReLU(), nn.Linear(16, 2))
loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3)

X = torch.randn(256, 2)
y = (X[:, 0] + X[:, 1] > 0).long()

model.train()
for epoch in range(100):
    optimizer.zero_grad()          # clear old gradients
    loss = loss_fn(model(X), y)    # forward + loss
    loss.backward()                # backprop (autograd)
    optimizer.step()               # update weights

model.eval()
with torch.no_grad():
    acc = (model(X).argmax(dim=1) == y).float().mean()
print(f"loss {loss.item():.3f}  accuracy {acc:.2f}")

# Hugging Face: a pre-trained model in three lines
# from transformers import pipeline
# clf = pipeline("sentiment-analysis")
# print(clf("This course is excellent"))`,
  mist: ["Forgetting optimizer.zero_grad(), so gradients pile up across steps.", "Evaluating in train() mode, leaving dropout on.", "Tensors on different devices (CPU vs GPU) in one operation."],
  faq: [
    ["PyTorch or TensorFlow?", "PyTorch dominates research and most GenAI tooling, including Hugging Face. Learn PyTorch."],
    ["Can PyTorch run in this browser app?", "No — it needs a native install or Colab. The concepts are practised here with NumPy, which behaves the same way."],
    ["What is Hugging Face?", "The main hub for open models and datasets, plus libraries (transformers, datasets, peft, trl) to load, run and fine-tune them."]
  ],
  iq: [["Walk me through a PyTorch training step.", "Zero the gradients from the previous step, run the forward pass to get predictions, compute the loss against the labels, call loss.backward() so autograd fills in gradients for every parameter, then optimizer.step() updates the parameters. Around it: model.train() for training, model.eval() and torch.no_grad() for evaluation, and a DataLoader for batches."]],
  cheat: ["tensor.to(\"cuda\") · requires_grad · loss.backward()", "zero_grad → forward → loss → backward → step", "model.train() / model.eval() + torch.no_grad()", "Hugging Face: transformers, datasets, peft, trl"],
  quiz: [["Which call computes gradients in PyTorch?", ["optimizer.step()", "loss.backward()", "model.eval()", "torch.no_grad()"], 1, "backward runs autograd."],
         ["Forgetting optimizer.zero_grad() causes…", ["Faster training", "Gradients accumulating across steps", "A syntax error", "No effect"], 1, "PyTorch adds new gradients to old ones by default."]],
  cards: [["Tensor", "PyTorch's multi-dimensional array; can live on GPU and track gradients."], ["Autograd", "Automatic gradient computation via loss.backward()."]]
},

/* ================= LEVEL 6 — LANGUAGE & NLP ================= */
{ id: "nlp-classic", lv: 6, t: "Classic NLP: from words to numbers", min: 25,
  big: "Before LLMs, NLP turned text into counts of words; those ideas still power keyword search and hybrid RAG today.",
  why: "BM25 keyword search — half of hybrid RAG — is classic NLP. Interviewers also ask about TF-IDF, stemming and named entities.",
  body: [
    "**NLP (natural language processing)** = getting computers to work with human language.",
    "Preprocessing steps:",
    "- **Tokenisation** — split text into words or pieces.",
    "- **Lowercasing**, removing punctuation.",
    "- **Stop words** — very common words (the, is, and) often removed for keyword methods.",
    "- **Stemming** chops endings (studies → studi); **lemmatisation** finds the dictionary form (studies → study).",
    "**Bag of words**: represent a document by word counts, ignoring order.",
    "**TF-IDF**: weight a word higher if it’s frequent in *this* document but rare across *all* documents — so “refund” matters more than “the”.",
    "**BM25**: an improved TF-IDF used by search engines and in hybrid RAG; great for exact terms, IDs and names.",
    "**N-grams**: groups of n words (“credit card”) to keep some order.",
    "Classic tasks: **sentiment analysis**, **named entity recognition** (people, places, organisations, dates), **text classification**, **topic modelling**, **machine translation**.",
    "Limitation: counts don’t understand meaning — “car” and “automobile” look unrelated. Embeddings (next lessons) fix that."
  ],
  ex: "Searching a policy library for “Form 16”: keyword search (BM25) finds the exact term instantly, while pure meaning-based search might return general tax pages. That’s why production RAG uses both.",
  lang: "py", run: true,
  code: `import math, re
from collections import Counter

docs = {
    "refund.txt": "refund requests take seven days. refund to original payment",
    "leave.txt":  "casual leave is twelve days per year",
    "travel.txt": "travel claims need receipts within thirty days",
}
tokenised = {name: re.findall(r"[a-z]+", text.lower()) for name, text in docs.items()}
N = len(docs)

def idf(word):
    df = sum(word in words for words in tokenised.values())
    return math.log((N + 1) / (df + 1)) + 1

def tfidf_score(query, words):
    counts = Counter(words)
    return sum(counts[w] / len(words) * idf(w) for w in query.lower().split())

for name, words in tokenised.items():
    print(name, round(tfidf_score("refund days", words), 3))
print("idf('days') =", round(idf("days"), 2), " idf('refund') =", round(idf("refund"), 2))`,
  mist: ["Removing stop words before an LLM — modern models need full sentences.", "Thinking keyword search is obsolete; it beats embeddings on exact terms.", "Using stemming when you need real words (lemmatisation)."],
  faq: [
    ["Is classic NLP still worth learning?", "Yes, briefly: BM25 is used in hybrid search, and TF-IDF and NER are common interview topics and cheap baselines."],
    ["What is NER used for in GenAI apps?", "Finding and masking personal data (names, phone numbers) before sending text to an LLM, and extracting entities for knowledge graphs."]
  ],
  iq: [["What is TF-IDF and where is it still useful?", "TF-IDF scores a word by how often it appears in a document multiplied by how rare it is across the collection, so distinctive words dominate. It and its successor BM25 are still used for keyword search, as the sparse half of hybrid retrieval in RAG, as cheap baselines for classification, and for finding exact terms like product codes that embeddings can miss."]],
  cheat: ["Tokenise → lowercase → (stop words) → stem/lemmatise", "Bag of words = counts; TF-IDF = frequent here × rare elsewhere", "BM25 = search-engine keyword ranking (hybrid RAG)", "NER = find people, places, orgs, dates (and PII)"],
  quiz: [["TF-IDF gives high weight to words that are…", ["Common in every document", "Frequent here but rare elsewhere", "Short", "Stop words"], 1, "Distinctive words score highest."],
         ["Lemmatisation turns \"studies\" into…", ["studi", "study", "studies", "stud"], 1, "Lemmas are dictionary forms."]],
  cards: [["TF-IDF", "Term frequency × inverse document frequency."], ["BM25", "Keyword ranking function used by search engines and hybrid RAG."], ["NER", "Named entity recognition: people, places, organisations, dates."]]
},

{ id: "tokens", lv: 6, t: "Tokens and tokenisation for LLMs", min: 20,
  big: "LLMs don’t read words or letters; they read tokens — common chunks of text, each mapped to an ID.",
  why: "Pricing, speed and context limits are all counted in tokens. Tokenisation explains odd behaviour, like models miscounting letters or Tamil text costing more.",
  body: [
    "A **token** is a piece of text: a whole common word (“the”), part of a word (“token”, “isation”), punctuation or a space.",
    "Rule of thumb for English: ==1 token ≈ 4 characters ≈ ¾ of a word==, so 1,000 tokens ≈ 750 words.",
    "Each token has an **ID** in the model’s **vocabulary** (often 32k–200k tokens). The model sees only IDs.",
    "**BPE (byte-pair encoding)** builds the vocabulary: start from characters (or bytes), repeatedly merge the most frequent neighbouring pair, stop at the target size. Rare words split into known pieces, so nothing is ever “unknown”.",
    "Other tokenisers: WordPiece (BERT), SentencePiece (Llama, T5).",
    "**Special tokens** mark structure: start/end of text, the boundaries between system, user and assistant turns.",
    "Why it matters:",
    "- **Cost** = input tokens × price + output tokens × price.",
    "- **Context window** = max tokens per request (input + output).",
    "- **Languages**: Tamil, Hindi and many others need more tokens per word, so they cost more and fit less.",
    "- Models struggle to count letters (“how many r’s in strawberry?”) because they see tokens, not characters."
  ],
  ex: "A 10-page policy (~5,000 words) is about 6,700 tokens. At ₹250 per million input tokens, sending it once costs under ₹2 — but sending it with every chat message to 10,000 users adds up fast. Token awareness drives design.",
  lang: "py", run: true,
  code: `from collections import Counter

# One step of BPE: find the most frequent neighbouring pair and merge it
corpus = ["l o w", "l o w e r", "n e w e s t", "w i d e s t"]
words = [w.split() for w in corpus]

pairs = Counter()
for w in words:
    for a, b in zip(w, w[1:]):
        pairs[(a, b)] += 1
best = pairs.most_common(1)[0]
print("most frequent pair:", best)

merged = [" ".join(w).replace(" ".join(best[0]), "".join(best[0])) for w in words]
print("after merge:", merged)

def estimate_tokens(text):
    return max(1, round(len(text) / 4))
print(estimate_tokens("Retrieval-augmented generation grounds answers in documents."))`,
  mist: ["Budgeting by words or characters instead of tokens.", "Assuming every language costs the same per sentence.", "Forgetting output tokens also count towards the context window and cost (and usually cost more)."],
  faq: [
    ["How do I count tokens exactly?", "Use the provider’s tokenizer or token-counting endpoint (for example tiktoken for OpenAI models); the API response also reports usage."],
    ["Why can’t LLMs spell or count letters reliably?", "They see tokens like “straw” + “berry”, not individual letters, so character-level questions are hard without tools."],
    ["Is a bigger vocabulary better?", "It makes text shorter in tokens (cheaper, more fits in context) but increases model size. Modern models use larger, more multilingual vocabularies."]
  ],
  iq: [["What is a token and why does it matter for an application?", "A token is a sub-word unit from the model’s tokenizer, roughly 4 English characters. Billing, latency and the context window are all in tokens, so I estimate token counts to control cost, trim history and chunk documents to fit. Non-English text often uses more tokens, which affects both cost and how much context fits."]],
  cheat: ["1 token ≈ 4 chars ≈ ¾ word (English)", "BPE: merge most frequent pairs repeatedly", "Cost = in_tokens × price_in + out_tokens × price_out", "Non-English text → more tokens; models see tokens, not letters"],
  quiz: [["100 English tokens is roughly…", ["25 words", "75 words", "300 words", "1,000 words"], 1, "About ¾ of a word per token."],
         ["BPE builds its vocabulary by…", ["Splitting on spaces only", "Repeatedly merging the most frequent adjacent pair", "Using a dictionary", "Random splits"], 1, "Frequent pairs become new tokens."]],
  cards: [["Token", "A sub-word unit an LLM reads and writes; ~4 English characters."], ["BPE", "Byte-pair encoding: merge the most frequent neighbouring pairs to build a vocabulary."]]
},

{ id: "embeddings", lv: 6, t: "Embeddings: meaning as numbers", min: 25,
  big: "An embedding turns text (or an image) into a vector so that things with similar meaning end up close together.",
  why: "Embeddings power semantic search, RAG retrieval, recommendations, clustering and deduplication. They are the bridge between language and maths.",
  body: [
    "An embedding model maps text to a fixed-length vector, e.g. 384, 768, 1024 or 3072 numbers.",
    "**Similar meaning → nearby vectors.** “How many leaves do I get?” lands near “annual leave entitlement” even with no shared words.",
    "History: **word2vec** and **GloVe** gave one vector per word (static) — famous for king − man + woman ≈ queen. **Contextual** embeddings (BERT and later) give “bank” different vectors in “river bank” and “bank loan”.",
    "**Sentence/document embeddings** (sentence-transformers, OpenAI, Cohere, Voyage, BGE, E5, GTE) embed whole passages — what RAG uses.",
    "Compare with **cosine similarity** (or dot product on normalised vectors).",
    "Choosing a model: quality on your data (check the **MTEB** leaderboard, then test), dimensions (storage and speed), languages, cost, and whether it can run locally.",
    "==Always embed documents and queries with the same model.== Changing the model means re-embedding everything.",
    "Embeddings also exist for images (CLIP), audio and code — and shared spaces allow searching images with text."
  ],
  ex: "A health insurer’s FAQ bot: the member asks “Is my knee surgery covered?” The FAQ says “Orthopaedic procedures under the surgical benefit…”. No shared keywords, but the embeddings are close, so retrieval finds it.",
  lang: "py", run: true,
  code: `import numpy as np

# Toy 4-dimensional "embeddings" (real ones have hundreds of dimensions)
# dimensions roughly mean: [leave/holiday, money, travel, health]
vectors = {
    "annual leave policy":       np.array([0.9, 0.1, 0.1, 0.0]),
    "reimbursement for flights": np.array([0.1, 0.6, 0.8, 0.0]),
    "hospital cashless claims":  np.array([0.0, 0.5, 0.0, 0.9]),
}
query = np.array([0.8, 0.0, 0.2, 0.1])   # "how many holidays do I get?"

def cosine(a, b):
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))

ranked = sorted(vectors, key=lambda k: cosine(query, vectors[k]), reverse=True)
for name in ranked:
    print(f"{cosine(query, vectors[name]):.3f}  {name}")`,
  mist: ["Mixing embeddings from different models in one index.", "Embedding huge documents as one vector — meaning gets blurred; chunk first.", "Assuming the top leaderboard model is best for your language and domain without testing."],
  faq: [
    ["Is an embedding model the same as an LLM?", "No. Embedding models output vectors, not text. They’re smaller, cheaper and faster, and often encoder-based."],
    ["How many dimensions should I use?", "More dimensions can capture more nuance but cost more storage and search time. Many models let you shorten vectors with little quality loss — test on your data."],
    ["Can embeddings be reversed into the original text?", "Partly — research shows text can sometimes be reconstructed, so treat embeddings of sensitive data as sensitive."]
  ],
  iq: [["How do embeddings work in a semantic search system?", "An embedding model maps text to vectors where semantic similarity becomes geometric closeness. I embed each document chunk once and store the vectors with metadata in a vector index; at query time I embed the question with the same model and retrieve the nearest chunks by cosine similarity. I usually combine this with keyword search and a reranker, and choose the embedding model by testing recall on my own data."]],
  cheat: ["Embedding = vector where similar meaning = close", "Static (word2vec) vs contextual (BERT+)", "Cosine similarity to compare; same model for docs and queries", "Pick by testing on your data (MTEB as a shortlist)"],
  quiz: [["king − man + woman ≈ queen illustrates…", ["Tokenisation", "Embeddings capturing meaning", "Overfitting", "Stemming"], 1, "Vector arithmetic on meaning."],
         ["You switch embedding models. You must…", ["Do nothing", "Re-embed all documents", "Retrain the LLM", "Change the database"], 1, "Vectors from different models aren't comparable."]],
  cards: [["Embedding", "A vector representing meaning; similar meanings are close."], ["Contextual embedding", "Vector depends on surrounding words ('river bank' vs 'bank loan')."], ["MTEB", "Leaderboard benchmarking embedding models across tasks."]]
},

/* ================= LEVEL 7 — TRANSFORMERS & LLMS ================= */
{ id: "attention", lv: 7, t: "Attention and the transformer", min: 35,
  big: "Self-attention lets every token look at every other token and decide which ones matter for its meaning; the transformer stacks this with simple layers.",
  why: "The transformer (2017, “Attention Is All You Need”) is the architecture behind every modern LLM. Explaining attention clearly is a standard interview question.",
  body: [
    "In “The animal didn’t cross the street because **it** was tired”, the word “it” needs to look back at “animal”. Attention is how.",
    "Each token makes three vectors from its embedding:",
    "- **Query (Q)** — what am I looking for?",
    "- **Key (K)** — what do I contain?",
    "- **Value (V)** — what information do I pass on if chosen?",
    "**Attention(Q, K, V) = softmax(Q·Kᵀ / √dₖ) · V**: score every query against every key (dot product), scale by √dₖ so scores don’t get huge, softmax into weights, and take the weighted mix of values.",
    "**Multi-head attention** runs several attentions in parallel — one head may track grammar, another who-refers-to-whom.",
    "**Positional encoding** adds word-order information, because attention alone is order-blind. Modern LLMs use **RoPE** (rotary embeddings).",
    "A **transformer block**: attention → add & LayerNorm → feed-forward network → add & LayerNorm. The “add” is a **residual connection** that keeps deep stacks trainable. LLMs stack dozens of blocks.",
    "**Causal mask**: when generating, a token may only look at earlier tokens, never future ones.",
    "Cost: attention compares every token pair, so it grows with **n²** in sequence length — why long context is expensive (eased by FlashAttention, sliding windows and KV caching).",
    "**Mixture of Experts (MoE)**: a router sends each token to a few expert feed-forward networks, so a huge model uses only a fraction of its parameters per token."
  ],
  ex: "A classroom: each student (token) asks a question (query); every student holds up a sign of what they know (key); the asker listens most to students whose signs match, and takes notes from what they say (values).",
  lang: "py", run: true,
  code: `import numpy as np

def softmax(x, axis=-1):
    x = x - x.max(axis=axis, keepdims=True)
    e = np.exp(x)
    return e / e.sum(axis=axis, keepdims=True)

def attention(Q, K, V, causal=False):
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)                 # how well each query matches each key
    if causal:
        mask = np.triu(np.ones(scores.shape), k=1).astype(bool)
        scores = np.where(mask, -1e9, scores)       # hide the future
    weights = softmax(scores)                       # each row sums to 1
    return weights @ V, weights

rng = np.random.default_rng(0)
X = rng.normal(size=(4, 8))                         # 4 tokens, 8-dim embeddings
Wq, Wk, Wv = (rng.normal(size=(8, 8)) for _ in range(3))
out, w = attention(X @ Wq, X @ Wk, X @ Wv, causal=True)
print("output shape:", out.shape)
print(w.round(2))                                   # upper triangle is 0`,
  mist: ["Saying attention “understands” — it computes weighted averages learned from data.", "Forgetting the √dₖ scaling or what it is for.", "Saying GPT is an encoder model."],
  faq: [
    ["Where do Q, K and V come from?", "Each is the token’s embedding multiplied by a learned weight matrix (Wq, Wk, Wv). Training learns those matrices."],
    ["Why divide by √dₖ?", "Dot products grow with vector size. Big scores push softmax towards all-or-nothing weights with tiny gradients. Scaling keeps training stable."],
    ["What does the feed-forward part do?", "After attention mixes information between tokens, the feed-forward network processes each token on its own — much of the model’s stored knowledge lives in these layers."],
    ["What is the context window in terms of attention?", "The maximum number of tokens attention can look across in one pass."]
  ],
  iq: [["Explain self-attention.", "For each token we compute a query, key and value by multiplying its embedding with learned matrices. Attention scores are the dot products of a token’s query with every key, scaled by the square root of the key dimension and softmaxed into weights; the output is the weighted sum of values. Multi-head attention does this in several subspaces in parallel, positional encodings add order, and a causal mask makes decoder-only models generate left to right. It lets every token draw context from every other token in parallel."]],
  cheat: ["Attention = softmax(QKᵀ/√dₖ)·V", "Q = what I seek · K = what I offer · V = what I pass on", "Multi-head = parallel attention views; RoPE = position", "Block: attention → add&norm → FFN → add&norm", "Causal mask = no peeking at the future; cost ∝ n²"],
  quiz: [["Why scale by √dₖ?", ["Save memory", "Keep scores from saturating softmax", "Add position info", "Remove padding"], 1, "Large dot products make softmax too peaky."],
         ["Self-attention cost grows with sequence length n as…", ["O(n)", "O(log n)", "O(n²)", "O(1)"], 2, "Every token compares with every token."]],
  cards: [["Self-attention", "Each token builds a weighted mix of all tokens' values using query–key similarity."], ["Causal mask", "Stops a token attending to future tokens."], ["MoE", "Router activates a few expert networks per token."]]
},

{ id: "llm-families", lv: 7, t: "Model families and choosing a model", min: 25,
  big: "Transformers come in three shapes; today’s chat LLMs are decoder-only, and choosing between them is a trade-off of quality, cost, speed, privacy and licence.",
  why: "“Which model would you use and why?” is asked in every GenAI interview and every real project.",
  body: [
    "**Encoder-only** (BERT, RoBERTa) — sees text in both directions; best for understanding: classification, entity extraction, embeddings, rerankers.",
    "**Decoder-only** (GPT, Claude, Gemini, Llama, Mistral, Qwen, DeepSeek) — generates left to right with a causal mask. ==Almost all chat LLMs are decoder-only.==",
    "**Encoder–decoder** (T5, BART) — encode input, decode output; translation and summarisation.",
    "**Closed / API models** (GPT, Claude, Gemini): highest quality, no hosting, pay per token; data goes to the provider (check retention and enterprise terms).",
    "**Open-weight models** (Llama, Mistral, Qwen, Gemma, DeepSeek): download and run yourself; full control, privacy, fine-tuning; you pay for GPUs and operations. Check the **licence** for commercial use.",
    "**Small vs large**: small models are cheap and fast for simple tasks (classification, extraction, routing); large ones for complex reasoning.",
    "**Reasoning models** spend extra tokens “thinking” before answering — better on maths, code and planning, but slower and costlier.",
    "**Hugging Face** hosts open models with **model cards** (training data, intended use, limits, licence).",
    "How to choose: define the task and quality bar → shortlist by benchmarks and price → test on your own golden set → weigh latency, cost per request, context length, privacy and licence → start small, upgrade only if needed."
  ],
  ex: "A hospital chatbot with patient data might use an open model hosted in its own cloud for privacy; a marketing copy tool might use a top API model for quality; a ticket router might use a tiny model costing 1/50th as much.",
  lang: "text", run: false,
  code: `Need                                   Sensible first choice
Simple classification / extraction     small, fast model (API or open)
Complex reasoning, coding, agents      large frontier or reasoning model
Strict data privacy / on-premise       open-weight model you host
Very high volume, narrow task          fine-tuned small model
Embeddings for search                  dedicated embedding model, not a chat LLM`,
  mist: ["Picking the biggest model by default.", "Choosing by public benchmarks without testing on your own data.", "Ignoring the licence of an open model for commercial use."],
  faq: [
    ["Is an open-weight model the same as open source?", "Not always. Open-weight means you can download the weights; the licence may still restrict use, and training data or code may not be released."],
    ["Should I worry about which model is ‘best’ this month?", "Models change quickly. Build your app so the model is a setting you can swap, and keep an evaluation set to compare new models fast."],
    ["What is a model card?", "Documentation for a model: what it was trained on, intended uses, known limits, biases, evaluation results and licence."]
  ],
  iq: [["How would you choose an LLM for a new product feature?", "I start from requirements: task difficulty, quality bar, latency target, volume and budget, data sensitivity, context length and languages. I shortlist two or three models across sizes and providers, including an open-weight option if privacy matters, run them against a golden set of real examples, and compare quality, cost per request and p95 latency. I keep the model behind an abstraction so I can switch, and route easy requests to a smaller model."]],
  cheat: ["Encoder (BERT) = understand · decoder (GPT/Claude/Llama) = generate · enc-dec (T5) = translate/summarise", "API = quality, no ops, data leaves · open-weight = control, privacy, you run it", "Choose: requirements → shortlist → test on your golden set → cost/latency/licence", "Keep the model swappable"],
  quiz: [["Which family are GPT, Claude and Llama?", ["Encoder-only", "Decoder-only", "Encoder-decoder", "RNN"], 1, "They generate left to right."],
         ["Strict on-premise data requirement suggests…", ["Any public API", "An open-weight model you host", "No model", "A diffusion model"], 1, "Hosting yourself keeps data in your environment."]],
  cards: [["Decoder-only", "Generates text left to right; the design of chat LLMs."], ["Open-weight", "Model weights are downloadable; check the licence."], ["Model card", "Documentation of a model's data, uses, limits and licence."]]
},

{ id: "llm-training", lv: 7, t: "How LLMs are trained", min: 30,
  big: "Chat models are built in stages: pre-train on huge text to learn language, then teach instruction-following, then align with human preferences.",
  why: "Knowing the stages explains hallucinations, knowledge cutoffs, why fine-tuning works, and the RLHF/DPO questions interviewers love.",
  body: [
    "**1. Pre-training**: predict the next token over trillions of tokens of web text, books and code (self-supervised). Result: a **base model** — a brilliant autocomplete that doesn’t reliably follow instructions.",
    "**2. Supervised fine-tuning (SFT)**, also called instruction tuning: train on curated (prompt → ideal answer) pairs. The model learns to act as an assistant.",
    "**3. Preference alignment**:",
    "- **RLHF**: people rank several answers; a **reward model** learns their preferences; reinforcement learning (often PPO) pushes the model toward higher-reward answers.",
    "- **DPO**: learns directly from “chosen vs rejected” answer pairs without a separate reward model — simpler and popular.",
    "- **RLAIF / Constitutional AI**: AI feedback guided by written principles, reducing the need for human labels.",
    "**4. Reasoning training**: reinforcement learning on tasks with checkable answers (maths, code) teaches models to think step by step. More “thinking” at answer time = **test-time compute**.",
    "**Scaling laws**: performance improves predictably with more parameters, data and compute. The **Chinchilla** finding: roughly 20 training tokens per parameter is compute-optimal.",
    "**Knowledge cutoff**: the model knows nothing after its training data ends.",
    "**Context window**: max tokens per request; models are trained (and extended) to handle long inputs.",
    "**Data quality** — filtering, deduplication and mixing — matters as much as size."
  ],
  ex: "Like training a doctor: pre-training is reading every medical book (knowledge), SFT is supervised residency (how to respond to patients), and preference tuning is feedback from senior doctors on which answers are better and safer.",
  lang: "text", run: false,
  code: `Stage                Data                                  Result
Pre-training         trillions of tokens of text & code     base model (autocomplete)
SFT                  ~10k–1M prompt → ideal answer pairs    instruction-following assistant
RLHF / DPO           human (or AI) preference comparisons   helpful, harmless, honest style
Reasoning RL         tasks with checkable answers           step-by-step "thinking" models`,
  mist: ["Saying ChatGPT “searches the internet” by default — base knowledge comes from training data (search is an added tool).", "Confusing RLHF with fine-tuning on facts.", "Thinking alignment removes all errors or bias."],
  faq: [
    ["Why does the model not know recent events?", "Its knowledge stops at the training cutoff. Apps add fresh information with RAG or web search tools."],
    ["Does the model learn from my chats?", "Not during a conversation — weights don’t change. Some providers may use data for future training depending on settings and plan; enterprise APIs usually don’t."],
    ["What is a reward model?", "A model trained on human preference comparisons to predict which answer people would prefer; RL uses its score as the reward."]
  ],
  iq: [["Explain RLHF and how DPO differs.", "In RLHF, annotators compare model responses, a reward model is trained to predict those preferences, and the language model is optimised with reinforcement learning (typically PPO) to maximise reward while staying close to the original model. DPO skips the separate reward model and the RL loop: it directly adjusts the model to raise the likelihood of preferred responses over rejected ones using a simple classification-style loss, which is cheaper and more stable."]],
  cheat: ["Pre-train (next token, self-supervised) → base model", "SFT on prompt→answer pairs → assistant", "RLHF (reward model + PPO) or DPO (preference pairs) → aligned", "Reasoning RL → thinking models; scaling laws; knowledge cutoff"],
  quiz: [["A base model straight after pre-training is best described as…", ["An instruction-following assistant", "A powerful autocomplete", "A retrieval system", "A classifier"], 1, "SFT and preference tuning make it follow instructions."],
         ["DPO differs from RLHF because it…", ["Needs no preference data", "Learns from preference pairs without a separate reward model and RL loop", "Is pre-training", "Only works on images"], 1, "Simpler, single-stage preference optimisation."]],
  cards: [["SFT", "Supervised fine-tuning on prompt → ideal answer pairs."], ["RLHF", "Reward model from human rankings + RL to align outputs."], ["DPO", "Direct preference optimisation from chosen vs rejected pairs."]]
},

{ id: "inference", lv: 7, t: "Inference: decoding, speed, memory and cost", min: 30,
  big: "At each step the model outputs probabilities for every possible next token; decoding settings decide how we pick, and serving tricks make it fast and cheap.",
  why: "Temperature, top-p, latency, quantisation and cost come up in every GenAI interview and every production decision.",
  body: [
    "**Autoregressive generation**: pick a token, append it, run the model again, repeat until a stop token or the limit.",
    "**Greedy**: always pick the most likely token — deterministic, can be repetitive.",
    "**Temperature**: divides scores before softmax. Low (0–0.3) → focused and repeatable (extraction, code, facts). High (0.7–1.0) → varied (brainstorming).",
    "**Top-k**: sample only from the k most likely tokens. **Top-p (nucleus)**: sample from the smallest set whose probabilities add up to p (e.g. 0.9).",
    "**Max tokens** limits length (and cost); **stop sequences** end output cleanly.",
    "**KV cache**: store each past token’s keys and values so each new token doesn’t recompute everything.",
    "**Latency** = **TTFT** (time to first token) + output tokens ÷ tokens per second. **Streaming** shows text as it’s generated.",
    "**Memory rule**: parameters × bytes. 7B × 2 bytes (FP16) ≈ 14 GB, plus the KV cache, which grows with context length and users.",
    "**Quantisation**: store weights in fewer bits (8-bit, 4-bit) — less memory, faster, small quality loss. Formats: GGUF (llama.cpp/Ollama), GPTQ, AWQ.",
    "**Serving engines**: vLLM (PagedAttention, continuous batching), TGI, TensorRT-LLM; locally **Ollama** or llama.cpp.",
    "**Speculative decoding**: a small model drafts tokens, the big model verifies several at once.",
    "**Cost** ≈ input tokens × input price + output tokens × output price; output usually costs several times more. **Prompt caching** discounts repeated prefixes; **batch APIs** are cheaper for offline jobs."
  ],
  ex: "A support bot answers with temperature 0.2 so replies are consistent and factual; a slogan generator for Diwali campaigns uses 0.9 to get fresh ideas. Both stream tokens so customers see text within half a second.",
  lang: "py", run: true,
  code: `import numpy as np

words = ["tea", "coffee", "juice", "water"]
logits = np.array([2.0, 1.5, 0.3, -1.0])          # model scores for the next word

def probs(logits, temperature):
    z = logits / temperature
    e = np.exp(z - z.max())
    return e / e.sum()

for t in (0.2, 1.0, 2.0):
    print(f"T={t}:", dict(zip(words, probs(logits, t).round(3))))

p = probs(logits, 1.0)
order = np.argsort(-p)
cum = np.cumsum(p[order])
nucleus = [words[i] for i in order[: np.searchsorted(cum, 0.9) + 1]]
print("top-p 0.9 keeps:", nucleus)

print("7B model at FP16 ≈", 7e9 * 2 / 1e9, "GB;  at 4-bit ≈", 7e9 * 0.5 / 1e9, "GB")`,
  mist: ["Using high temperature for extraction or JSON.", "Ignoring output tokens when estimating cost.", "Forgetting the KV cache when sizing GPU memory for long contexts."],
  faq: [
    ["Should I change temperature and top-p together?", "Usually tune one. Common practice: set temperature and leave top-p at its default."],
    ["Why is temperature 0 not always identical every time?", "Parallel GPU arithmetic and batching can introduce tiny numeric differences, so even greedy decoding can vary slightly."],
    ["Can I run an LLM on my laptop?", "Yes, small quantised open models (a few billion parameters) run with Ollama or llama.cpp on a decent laptop."]
  ],
  iq: [["How would you reduce the latency of an LLM feature?", "Measure first: TTFT versus generation time. Then stream the response, cut prompt and output length, use prompt caching for long shared prefixes, route simple requests to a smaller model, run independent calls in parallel, and cut agent steps. If self-hosting, use an engine like vLLM with continuous batching, quantisation and speculative decoding."]],
  cheat: ["Temperature low = focused; high = varied · top-k · top-p (nucleus)", "KV cache · TTFT · streaming", "Memory ≈ params × bytes (7B FP16 ≈ 14 GB; 4-bit ≈ 3.5 GB) + KV cache", "Quantisation: GGUF/GPTQ/AWQ · serving: vLLM, Ollama", "Cost = in × price_in + out × price_out (output pricier)"],
  quiz: [["Temperature near 0 makes output…", ["More random", "Focused and repeatable", "Longer", "Cheaper"], 1, "It sharpens the distribution."],
         ["Approximate memory for a 7B model's weights at FP16?", ["~3.5 GB", "~7 GB", "~14 GB", "~28 GB"], 2, "7 billion × 2 bytes."]],
  cards: [["Top-p", "Sample from the smallest set of tokens whose probabilities sum to p."], ["KV cache", "Stored keys/values of past tokens to speed generation."], ["Quantisation", "Fewer bits per weight → less memory, faster, small quality loss."]]
},

{ id: "llm-limits", lv: 7, t: "Where LLMs fail (and what to do about it)", min: 20,
  big: "LLMs are fluent, not infallible: they hallucinate, forget beyond their context, follow injected instructions and reflect biases.",
  why: "Interviewers want engineers who design around weaknesses. Every mitigation in later levels — RAG, evaluation, guardrails — exists because of these.",
  body: [
    "**Hallucination**: confident, fluent, wrong. The model generates plausible text; it doesn’t check facts. → Ground with RAG, cite sources, allow “I don’t know”, verify.",
    "**Knowledge cutoff**: nothing after training. → RAG, search tools.",
    "**Context limits** and **lost in the middle**: models use information at the start and end of long inputs better than the middle. → Retrieve less but better; put key facts first.",
    "**Reasoning slips**: arithmetic and multi-step logic errors. → Reasoning models, step-by-step prompting, calculators and code tools.",
    "**Non-determinism**: same prompt, different answers. → Low temperature, structured outputs, evaluation over many runs.",
    "**Prompt sensitivity**: small wording changes shift results. → Test prompts against an eval set, version them.",
    "**Sycophancy**: agreeing with the user even when wrong. → Instructions to disagree when warranted; evaluation for it.",
    "**Bias and toxicity** learned from data. → Testing across groups, guardrails, human review for high-stakes use.",
    "**Prompt injection**: untrusted text (a web page, an email) carries instructions the model follows. → Separate data from instructions, least-privilege tools, human approval.",
    "**Cost and latency** at scale. → Routing, caching, smaller models."
  ],
  ex: "A lawyer’s brief cited court cases that never existed because an LLM invented them. A RAG system restricted to a verified case database, with mandatory citations and human review, prevents that failure.",
  lang: "text", run: false,
  code: `Failure            Why it happens                         First mitigation
Hallucination      predicts plausible text, not facts     RAG + citations + "I don't know"
Stale knowledge    training cutoff                        retrieval / search tools
Lost in middle     attention favours ends of long input   fewer, better chunks; key facts first
Maths/logic slips  next-token prediction                  reasoning model or code tool
Prompt injection   can't separate data from instructions  isolate data, least privilege, approval
Inconsistency      sampling randomness                    low temperature + evaluation`,
  mist: ["Assuming a bigger model removes hallucinations.", "Trusting a single impressive demo.", "Treating retrieved web content as safe instructions."],
  faq: [
    ["Can hallucinations be eliminated?", "Not entirely. They can be reduced a lot with grounding, constrained outputs and verification, and measured with faithfulness evaluations."],
    ["Why do models agree with me when I’m wrong?", "Preference training rewards answers people like, which can teach agreeableness. Clear instructions and evaluation help."]
  ],
  iq: [["Why do LLMs hallucinate, and how do you reduce it in a product?", "Because they are trained to produce the most plausible continuation, not to verify facts, and they have gaps such as a knowledge cutoff. In a product I ground answers in retrieved sources, instruct the model to answer only from that context and cite it, allow it to say it doesn’t know, use low temperature for factual tasks, add a verification step for high-stakes outputs, and measure faithfulness on a golden set so I can see the rate fall."]],
  cheat: ["Hallucination → RAG, citations, “I don’t know”, verify", "Cutoff → retrieval/search · lost in the middle → fewer, better chunks", "Maths slips → tools/reasoning models · injection → isolate data, least privilege", "Inconsistency → low temperature + evaluation"],
  quiz: [["Best single fix for hallucinations about company policy?", ["Higher temperature", "Grounding answers in retrieved documents with citations", "A bigger model", "Longer outputs"], 1, "Ground answers in real sources."],
         ["“Lost in the middle” means…", ["Models use info at the start and end of long context better than the middle", "Chunks lost during upload", "Middle layers dropped", "Missing tokens"], 0, "Keep context lean and put key facts first."]],
  cards: [["Hallucination", "Confident output not supported by facts or sources."], ["Sycophancy", "A model agreeing with the user even when the user is wrong."]]
}
);
