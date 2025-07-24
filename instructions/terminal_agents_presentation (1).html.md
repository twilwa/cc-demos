<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Terminal Coding Agents Presentation</title>
<style>
  body,html{margin:0;padding:0;height:100%;font-family:Arial,Helvetica,sans-serif;background:#111;color:#f4f4f4;}
  .slide{display:none;padding:60px;box-sizing:border-box;height:100%;width:100%;}
  .slide.active{display:block;}
  h1,h2{margin-top:0;}
  ul{margin-top:0;line-height:1.5;}
  nav{position:fixed;bottom:20px;left:0;width:100%;text-align:center;font-size:14px;user-select:none;}
  button{background:#444;border:none;color:#fff;padding:10px 16px;margin:0 8px;border-radius:4px;cursor:pointer;}
  button:hover{background:#666;}
  .progress{position:fixed;top:0;left:0;height:4px;background:#09f;width:0%;transition:width .3s;}
</style>
</head>
<body>
<div class="progress" id="progress"></div>
<!-- Slide 1 -->
<div class="slide active">
  <h1>Terminal Coding Agents</h1>
  <h2>Claude Code, Gemini CLI &amp; Beyond</h2>
  <p><em>AI Researcher Edition</em></p>
  <p style="margin-top:40px;font-size:0.9em;">Use &larr; / &rarr; keys or the buttons below to navigate</p>
</div>
<!-- Slide 2 -->
<div class="slide">
  <h2>What Are Terminal Coding Agents?</h2>
  <ul>
    <li>CLI tools powered by large language models</li>
    <li>Generate, modify, and debug code via natural‑language</li>
    <li>Direct access to shell tools for autonomous workflows</li>
    <li>Key examples: Claude Code, Gemini CLI, OpenCode, Amp</li>
  </ul>
</div>
<!-- Slide 3 -->
<div class="slide">
  <h2>Why They Matter – Impact &amp; Current State</h2>
  <ul>
    <li>Shift bottleneck from typing code to spec clarity</li>
    <li>Faster PR merges, bug fixes, and MVP shipping</li>
    <li>Experience can be uneven → prompt churn &amp; trust gaps</li>
    <li>Context windows up to 1M tokens enable repo‑scale reasoning</li>
  </ul>
</div>
<!-- Slide 4 -->
<div class="slide">
  <h2>Evolution of AI Coding Agents</h2>
  <ul>
    <li><strong>Gen 1:</strong> Autocomplete (Codex, Copilot)</li>
    <li><strong>Gen 2:</strong> IDE chat assistants (Copilot Chat, Cody)</li>
    <li><strong>Gen 3:</strong> Agentic IDE tools (Cursor Agent, Cascade)</li>
    <li><strong>Gen 4:</strong> <em>Terminal agents (today)</em> – Claude Code, Gemini CLI</li>
    <li><strong>Gen 5:</strong> Multi‑agent orchestration &amp; spec‑driven dev (coming)</li>
  </ul>
</div>
<!-- Slide 5 -->
<div class="slide">
  <h2>Interactive vs. Unix Pipeline Modes</h2>
  <ul>
    <li><strong>Interactive&nbsp;REPL:</strong> Conversational coding in a live shell</li>
    <li><strong>Batch commands:</strong> <code>cat error.log | claude -p "explain"</code></li>
    <li>Composable in CI / scripts for automated analysis &amp; fixes</li>
  </ul>
</div>
<!-- Slide 6 -->
<div class="slide">
  <h2>Installation &amp; First Run</h2>
  <ul>
    <li>Claude Code → <code>npm i -g @anthropic-ai/claude-code</code></li>
    <li>Gemini CLI → <code>npx @google/gemini-cli</code></li>
    <li>Login &amp; link model account; start in project root</li>
    <li>Ask broad Q&amp;A to warm up context</li>
  </ul>
</div>
<!-- Slide 7 -->
<div class="slide">
  <h2>Context &amp; Memory Engineering</h2>
  <ul>
    <li><code>CLAUDE.md</code> files define project instructions</li>
    <li>Global vs. project vs. nested memories</li>
    <li>Curate context to avoid poisoning; use <code>@file</code> refs</li>
    <li>Update memory after each misstep for compounding gains</li>
  </ul>
</div>
<!-- Slide 8 -->
<div class="slide">
  <h2>Workflow Basics – Plan → Code → Verify</h2>
  <ul>
    <li>Ask for a plan first, approve, then let agent code</li>
    <li>Agent chains tools: search → edit → test → fix</li>
    <li>Loopback workflows until tests pass</li>
    <li>Keep diffs small; review as you would a junior dev</li>
  </ul>
</div>
<!-- Slide 9 -->
<div class="slide">
  <h2>Safety, Control &amp; Versioning</h2>
  <ul>
    <li>Confirm risky commands or whitelist via <code>permissions.json</code></li>
    <li>Interrupt with <kbd>Esc</kbd>; always work on branches</li>
    <li>Git history ensures easy rollback</li>
    <li>Sandbox credentials; secure secrets</li>
  </ul>
</div>
<!-- Slide 10 -->
<div class="slide">
  <h2>Advanced Features &amp; Parallelism</h2>
  <ul>
    <li>Custom slash commands &amp; macros (<code>.claude/commands/</code>)</li>
    <li>MCP integrations to connect external tools</li>
    <li>Run multiple agent sessions with <code>git worktree</code></li>
    <li>Session persistence &amp; resume for long tasks</li>
  </ul>
</div>
<!-- Slide 11 -->
<div class="slide">
  <h2>Case Study: Bug Fix + Feature</h2>
  <ul>
    <li>Q&amp;A to identify failing module</li>
    <li>Agent edits code &amp; writes regression test</li>
    <li>Plans and adds email verification flow</li>
    <li>Creates branch, commits, opens PR – you review &amp; merge</li>
  </ul>
</div>
<!-- Slide 12 -->
<div class="slide">
  <h2>Challenges in the Agent Era</h2>
  <ul>
    <li>Spec ambiguity → misaligned code</li>
    <li>Review drag &amp; trust gaps</li>
    <li>Multi‑agent merge conflicts</li>
    <li>Cost &amp; speed monitoring</li>
  </ul>
</div>
<!-- Slide 13 -->
<div class="slide">
  <h2>Outlook – The Future</h2>
  <ul>
    <li>Developers evolve into "software conductors"</li>
    <li>Spec‑driven stacks: intent, code, tests</li>
    <li>Agent swarms &amp; longer autonomous sessions</li>
    <li>Human judgment remains critical – ethics &amp; trade‑offs</li>
  </ul>
</div>
<!-- Slide 14 -->
<div class="slide">
  <h2>Resources &amp; Next Steps</h2>
  <ul>
    <li>Claude Code docs: <a href="https://docs.anthropic.com/claude">anthropic.com/claude</a></li>
    <li>Gemini CLI GitHub: <a href="https://github.com/google-gemini/gemini-cli">github.com/google-gemini/gemini-cli</a></li>
    <li>OpenCode agent: <a href="https://github.com/opencode-ai/opencode">github.com/opencode-ai/opencode</a></li>
    <li>Sourcegraph Amp: <a href="https://github.com/sourcegraph/amp">github.com/sourcegraph/amp</a></li>
  </ul>
  <p style="margin-top:40px;">Thank you! Questions?</p>
</div>
<nav>
  <button onclick="show(idx-1)">&larr; Prev</button>
  <span id="counter">1 / 14</span>
  <button onclick="show(idx+1)">Next &rarr;</button>
</nav>
<script>
const slides=[...document.querySelectorAll('.slide')];
let idx=0;
function updateUI(){document.getElementById('counter').textContent=`${idx+1} / ${slides.length}`;document.getElementById('progress').style.width=`${((idx+1)/slides.length)*100}%`;}
function show(i){slides[idx].classList.remove('active');idx=(i+slides.length)%slides.length;slides[idx].classList.add('active');updateUI();}
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(idx+1);if(e.key==='ArrowLeft')show(idx-1);});
updateUI();
</script>
</body>
</html>
