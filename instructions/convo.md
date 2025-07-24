1 · Fine‑tuning the four existing exercises
Draft exercise	Quick win(s) for demo day	Rationale
1 Bug Fix + Test	Seed the repo with two failing tests, one unit‑level and one integration‑level. Ask the agent to prioritise and fix the “fastest failing test” first, then loop.	Shows the “test triage” pattern devs use daily and highlights the agent’s planning tool. Terminal Coding Agents_…
2 Spec‑Driven Feature	Attach a CPU–time budget to the spec (e.g., “validation must finish <1 ms”). Ask the agent to verify the budget by running a micro‑benchmark script it writes itself.	Demonstrates measurable acceptance criteria and introduces performance tooling, teeing up Exercise 6 below.
note（ノート）
3 Multi‑Agent Refactor	Show live git worktree creation and run each agent in a separate tmux pane with distinct prompt colours. End by merging and resolving one intentionally conflicting file.	Makes the parallelism story tangible and visually engaging.
docs.agentinterviews.com
GitHub
4 Unix‑Pipeline / Batch	Pipe a 500‑line stack‑trace through both Claude Code and Gemini CLI, then diff the two explanations to illustrate model diversity.	Sparks discussion on model selection and evaluation.
GitHub

2 · Six new high‑impact demo exercises
Exercise 5 – Security Patch & Vulnerability Scan
Aspect	Details
Concepts	Secure‑by‑design prompting; code‑audit loop; hooks & permission gating
Scenario	A Node service with an outdated dependency that introduces an XSS vector. Ship a security_scan.sh script that runs npm audit --json and pipes the JSON into the agent with: `cat audit.json
Agent tasks	1) Summarise findings, 2) Bump dependency, 3) Add regression test that fails on unsanitised input, 4) Commit on a security/fix‑cve‑YYYY branch.
Why it works live	Viewers see a red‑to‑green pipeline and learn how to keep agents inside a guard‑rail using hooks/deny-prod-paths.js.
Sources
StackHawk, Inc.
Anthropic
TECHCOMMUNITY.MICROSOFT.COM

Exercise 6 – Performance Profiling & Auto‑Optimisation
Aspect	Details
Concepts	Benchmark‑driven dev; tight SPEC → measurable outcome; agent‑written micro‑benchmarks
Scenario	Provide a slow fibonacci() implementation plus a tiny bench.js. Prompt: “Speed this up 10 × while keeping O(1) space; prove it with bench.js.”
Live wow moment	Display the before/after OPS numbers the agent prints. Works even on low‑powered demo laptops.
Sources
note（ノート）
GitHub

Exercise 7 – Agent‑Generated Docs & Comment Coverage
Aspect	Details
Concepts	“Docs‑as‑first‑class‑artifact”; codebase explanation
Scenario	Repo lacks JSDoc. Ask the agent to add missing function‑level docs only where none exist, then generate a docs/ website with Docusaurus.
Extra spice	Run a script that counts undocumented functions before and after to give numeric proof.
Sources
termineer.io
TECHCOMMUNITY.MICROSOFT.COM

Exercise 8 – Self‑Healing CI Pipeline
Aspect	Details
Concepts	Closed‑loop CI; MCP / external‑service integration
Scenario	Break a test on the main branch, trigger GitHub Actions. A lightweight sidecar agent (Dagger or CircleCI orb) parses the failing log, opens a patch PR, and tags @team‑demo for review.
Demo plan	Show the failing badge flip to green in the PR after the agent’s commit.
Sources
dagger.io
CircleCI

Exercise 9 – Planner + Coder Multi‑Agent Showdown
Aspect	Details
Concepts	Role specialisation; chain‑of‑thought externalisation
Scenario	Run Claude as a pure “planner” that outputs a task list to tasks.yaml, then launch Gemini in batch mode to execute each task.
Teaching moment	Highlights Gen‑5 trend (slide 13) and lets you compare plan quality vs. execution speed.
Sources
The Verge
docs.agentinterviews.com

Exercise 10 – Hooks & Permissions Hardening Mini‑Lab
Aspect	Details
Concepts	Operational safety; policy‑as‑code
Scenario	Show a malicious instruction (“delete node_modules”). With hooks active, the agent refuses; after commenting the hook, it (dangerously) complies—audience instantly grasps why to keep hooks on.
Sources
Anthropic

3 · Logistics & Delivery Tips
Time‑boxing
Each exercise is crafted to fit a 5‑minute lightning slot (90 s agent run + quick commentary). Chain two or three for a 15‑min segment.

Repo organisation
bash
Copy
Edit
/demo‑day‑episode‑2/
├── 01_bug_fix/
├── 02_spec_feature/
├── 03_parallel_refactor/
├── 04_unix_pipeline/
├── 05_security_scan/
├── 06_perf_opt/
├── 07_docs_coverage/
├── 08_self_healing_ci/
├── 09_multi_agent/
└── 10_hooks_lab/
Keep each folder self‑contained with its own CLAUDE.md and README.md so attendees can clone a single directory and reproduce.

Live‑demo hygiene
Pre‑warm model context by opening the repo in a hidden terminal tab and running a dry‑run command; avoids first‑call latency spikes.

Use claude --rate-limit-min 0 or Gemini CLI’s --stream flag to stream tokens and keep the audience engaged.

Have git reset --hard ORIG_HEAD and npx rimraf aliases ready to fast‑reset between takes.

For CI demos, shorten pipeline to run only the failing job to save time.

4 · Mapping back to your slides
Slide theme	New exercise(s) that best reinforce it
Context & Memory Engineering (Slide 7)	#7 Docs coverage & CLAUDE.md updates
Workflow Plan → Code → Verify (Slide 8)	#6 Perf optimisation loop shows measurable verify stage
Safety & Control (Slide 9)	#10 Hooks lab + #5 security scan
Advanced Parallelism (Slide 10)	#3 Worktree refactor and #9 Planner+Coder
Challenges & Outlook (Slide 12‑13)	#8 Self‑healing CI illustrates cost/performance trade‑offs

By sprinkling these focused micro‑demos through your Episode 2, you’ll not only showcase the breadth of agent capabilities but also give the audience concrete patterns they can adopt tomorrow. Good luck, and break a leg!







You said:
Gotcha, can you go ahead and generate a README w step by step instructions for each of the proposed exercises, such that I can feed it into a coding agent and have them generate all the setup/boilerplate? As well as including a step-by-step guide/instructions for anything I need to do as the human in the loop


ChatGPT said:

Thought for 1m 13s
Below is a complete README.md you can drop into the root of demo-day-episode-2/.
It contains (1) global prerequisites, (2) repo layout, (3) step-by-step agent + human checklists for all ten exercises, and (4) an appendix of handy commands.
Everything is designed so a terminal coding agent can bootstrap the repo end-to-end, while you—as the conductor—know exactly when to step in.

markdown
Copy
Edit
# Demo Day Episode 2 – Terminal Coding Agent Exercises

Welcome!
This repo contains ten self-contained labs that showcase modern CLI coding agents such as **Claude Code** and **Gemini CLI**.
Each lab folder ships only a _thin shell_; the agent will flesh out the code, tests and docs during the demo.

---

## 0 · Prerequisites

| Tool | Install Command | Notes |
|------|-----------------|-------|
| **Claude Code** | `npm i -g @anthropic-ai/claude-code` | Official setup guide → docs.anthropic.com :contentReference[oaicite:0]{index=0} |
| **Gemini CLI**  | `npx @google-gemini/gemini-cli@latest` | 1 M-token context & free quota 🎉 developers.google.com :contentReference[oaicite:1]{index=1} |
| **Node 18+ & npm** | `nvm install 18 && nvm use 18` | Needed for package scripts |
| **Git ≥ 2.40** | `brew install git` or apt | Supports `git worktree` ops :contentReference[oaicite:2]{index=2} |
| **tmux** (optional) | `brew install tmux` | Multi-pane demos; status bar colours configurable :contentReference[oaicite:3]{index=3} |
| **Docker** (optional) | For CI & security scan labs |

> **Auth:** run `claude login` or `gemini login` before the show. Each first launch opens a browser for token exchange. :contentReference[oaicite:4]{index=4}

---

## 1 · Repository Layout

demo-day-episode-2/
├── 01_bug_fix/
├── 02_spec_feature/
├── 03_parallel_refactor/
├── 04_unix_pipeline/
├── 05_security_scan/
├── 06_perf_opt/
├── 07_docs_coverage/
├── 08_self_healing_ci/
├── 09_multi_agent/
└── 10_hooks_lab/

markdown
Copy
Edit

Every folder starts with **`README_AGENT.md`** (instructions for the agent) and **`README_HUMAN.md`** (your cues).  The root README (this file) links them all together.

---

## 2 · Global Agent-Interaction Workflow

1. **Navigate** to a lab directory.
2. **Warm context:** `claude "Summarise the repo & list TODOs."`
3. **Prompt plan:** `"Draft a 3-step plan; wait for my OK."` :contentReference[oaicite:5]{index=5}
4. **Approve/adjust** the plan.
5. **Let the agent code**; it will run `npm test`, fix failures, and loop until green. Jest is pre-wired 🔧 :contentReference[oaicite:6]{index=6}
6. **Review diffs** (`git diff`) & **commit** via the agent (`/commit` or `git add . && git commit -m "…"`).
7. **Reset demo** with `git reset --hard ORIG_HEAD && git clean -fd` before replaying.

---

## 3 · Exercise Playbooks

### 01 · Basic Bug Fix & Test Generation

| Step | Agent Prompt / Human Action |
|------|-----------------------------|
| 1 | **Human:** `cd 01_bug_fix && npm i` |
| 2 | **Agent:** “Identify failing tests, propose fix order.” |
| 3 | **Human:** Approve fastest-fail-first plan. |
| 4 | **Agent:** Generates new failing test, patches `src/buggy_module.js`, runs Jest. |
| 5 | **Human:** Inspect green test run, merge PR. |

### 02 · Spec-Driven Feature

1. `cd 02_spec_feature`
2. Agent reads `specs/feature_x_spec.md`, drafts plan.
3. Human okays plan plus 1 ms CPU-budget requirement.
4. Agent writes **tests first**, then implementation, then micro-benchmarks using *microbench* library :contentReference[oaicite:7]{index=7}, verifies budget.
5. Human merges.

### 03 · Multi-Agent Worktree Refactor

1. `git worktree add ../frontend-worktree frontend` / `../backend-worktree backend` :contentReference[oaicite:8]{index=8}
2. Open two tmux panes with distinct backgrounds (`select-pane -P 'bg=colour236'`). :contentReference[oaicite:9]{index=9}
3. Run Claude in frontend pane, Gemini in backend pane; each fixes error-handling per local `CLAUDE.md`.
4. Human resolves one intentional merge conflict, then `git merge`.

### 04 · Unix Pipeline / Batch

* `cat logs/application_error.log | claude -p "Explain and suggest fixes"`
* `git diff HEAD~1 | gemini -p "Summarise diff & propose lint fixes"`
Compare outputs with `diff -u`. Demonstrates model diversity.

### 05 · Security Patch & Vulnerability Scan

1. `cd 05_security_scan && npm i`
2. `npm audit --json > audit.json` :contentReference[oaicite:10]{index=10}
3. `cat audit.json | claude -p "Explain top CVEs and patch them; write regression test"`
4. Agent bumps deps, adds failing test, fixes code.
5. Human reviews branch `security/fix-cve-<ID>`.

### 06 · Performance Profiling & Auto-Optimisation

1. `cd 06_perf_opt`
2. Agent benchmark prompt: “Speed up `fibonacci()` 10× using O(1) space; verify with `bench.js`”.
3. Agent rewrites function, reruns micro-bench (uses `node benchmark/*.js`).
4. Human checks before/after OPS delta in console.

### 07 · Docs Generation & Comment Coverage

1. `cd 07_docs_coverage`
2. Agent: “Add JSDoc to undocumented functions only; build Docusaurus site.”
3. Site generated to `docs/build/`; open in browser. Docusaurus quick-start here ➜ docusaurus.io :contentReference[oaicite:11]{index=11}
4. Human glances at coverage % script output.

### 08 · Self-Healing CI Pipeline

1. Break a test (`echo "fail" >> tests/broken.test.js`).
2. Push branch; GitHub Action runs.
3. Failing log triggers `create-pull-request` action to open auto-fix PR :contentReference[oaicite:12]{index=12}
4. Agent in CI patch job commits fix; badge goes green.
5. Human merges PR.

### 09 · Planner + Coder Multi-Agent Showdown

1. `cd 09_multi_agent`
2. Run **Claude**: “Analyse spec.md, output tasks to tasks.yaml (no code).”
3. Run **Gemini** batch: `gemini -f tasks.yaml -m "Execute each task in order"`; it codes & tests.
4. Human compares plan vs. implementation.

### 10 · Hooks & Permissions Hardening Lab

1. `cd 10_hooks_lab`
2. Agent prompt: “Delete node_modules.” → pre-commit hook blocks ✋ (permissions.json).
3. Comment hook, rerun prompt—destructive command now executes (in sandbox).
4. Human reinstates hook, explains lesson learned.

---

## 4 · Appendix – Handy Commands

| Command | Purpose |
|---------|---------|
| `claude /memory` | Show loaded context :contentReference[oaicite:13]{index=13} |
| `claude /plan`   | Force plan mode before edits |
| `claude /commit` | Stage + commit diff |
| `claude /undo`   | Revert last agent step |
| `git reset --hard ORIG_HEAD` | Fast demo reset |
| `tmux split-window -h` | New pane |
| `select-pane -P 'bg=colour238'` | Pane colour |

Happy demoing – and remember: **Explicit specs, small diffs, green tests.**  Enjoy the show!

Why these sources?
Installation and auth steps use the official Claude Code docs
Anthropic
 and Gemini CLI developer page
Google for Developers
.

Agent workflow and slash-command references come from the Claude Code GitHub repo
GitHub
.

npm audit, micro-benchmarks, Jest, Docusaurus, Git worktrees, GitHub Actions, and tmux colour tweaks are all cited from their respective authoritative docs and tutorials
npm Docs
GitHub
Jest
docusaurus.io
wickd.ninja
GitHub
Red Hat
.

Feel free to tweak folder names or prompts—the step lists are intentionally verbose so any coding agent can follow them without extra context.
