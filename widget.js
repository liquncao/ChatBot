// ─────────────────────────────────────────────────────────────────────────────
// EMBEDDABLE WIDGET — plain JS, no framework, no build step.
// Drops onto ANY site (Framer, WordPress, plain HTML) with one script tag.
//
// On the merchant's own site, load it like this:
//   <script>
//     window.IBSBOT_CONFIG = { endpoint: "https://YOUR-APP.vercel.app/api/chat" };
//   </script>
//   <script src="https://YOUR-APP.vercel.app/widget.js"></script>
//
// On this app's own domain, endpoint defaults to "/api/chat" and needs no config.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  var CONFIG = window.IBSBOT_CONFIG || {};
  var ENDPOINT = CONFIG.endpoint || "/api/chat";
  var NAME = CONFIG.name || "Irish Building Supply";
  var SLATE = "#1F2933", YELLOW = "#F5C518";

  var STARTERS = [
    "I'm building a garden wall — what blocks?",
    "Studwork for an internal partition",
    "Flooring for an attic conversion",
    "Treated timber for a deck frame?",
  ];

  var messages = [{
    role: "assistant",
    content: "Hi — I'm the " + NAME + " assistant. Tell me what you're working on and I'll point you to the right materials. What's the job?",
  }];
  var busy = false;

  // ── styles ──
  var css = document.createElement("style");
  css.textContent = [
    "#ibsbot-btn{position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;background:" + YELLOW + ";border:none;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25);z-index:2147483000;display:flex;align-items:center;justify-content:center;font-size:26px;transition:transform .15s}",
    "#ibsbot-btn:hover{transform:scale(1.06)}",
    "#ibsbot-panel{position:fixed;bottom:92px;right:20px;width:380px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 120px);background:#fff;border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.3);z-index:2147483000;display:none;flex-direction:column;overflow:hidden;font-family:Inter,system-ui,-apple-system,sans-serif}",
    "#ibsbot-panel.open{display:flex}",
    "#ibsbot-head{background:" + SLATE + ";padding:14px 16px;display:flex;align-items:center;gap:10px}",
    "#ibsbot-mark{background:" + YELLOW + ";color:" + SLATE + ";width:38px;height:34px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px}",
    "#ibsbot-head .t{color:#fff;font-weight:600;font-size:13px;line-height:1.2}",
    "#ibsbot-head .s{color:" + YELLOW + ";font-size:10px;text-transform:uppercase;letter-spacing:.06em}",
    "#ibsbot-x{margin-left:auto;background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;line-height:1}",
    "#ibsbot-msgs{flex:1;overflow-y:auto;padding:16px;background:#f8fafc;display:flex;flex-direction:column;gap:10px}",
    ".ibsbot-row{display:flex}",
    ".ibsbot-row.u{justify-content:flex-end}",
    ".ibsbot-b{max-width:82%;padding:10px 13px;border-radius:16px;font-size:13.5px;line-height:1.5;white-space:pre-wrap}",
    ".ibsbot-b.a{background:#fff;border:1px solid #e2e8f0;color:#1e293b;border-bottom-left-radius:4px}",
    ".ibsbot-b.u{background:" + SLATE + ";color:#fff;border-bottom-right-radius:4px}",
    "#ibsbot-starters{padding:0 16px 8px;background:#f8fafc;display:flex;flex-wrap:wrap;gap:6px}",
    ".ibsbot-chip{font-size:12px;padding:6px 11px;border-radius:20px;border:1px solid #cbd5e1;background:#fff;color:#475569;cursor:pointer}",
    ".ibsbot-chip:hover{border-color:#64748b;color:#0f172a}",
    "#ibsbot-foot{padding:10px;border-top:1px solid #e2e8f0;background:#fff;display:flex;gap:8px}",
    "#ibsbot-in{flex:1;padding:10px 13px;border:1px solid #cbd5e1;border-radius:20px;font-size:13.5px;outline:none}",
    "#ibsbot-in:focus{border-color:#64748b}",
    "#ibsbot-send{padding:10px 16px;border:none;border-radius:20px;background:" + YELLOW + ";color:" + SLATE + ";font-weight:600;font-size:13.5px;cursor:pointer}",
    "#ibsbot-send:disabled{background:#e2e8f0;cursor:not-allowed}",
    ".ibsbot-dots span{display:inline-block;width:6px;height:6px;border-radius:50%;background:#94a3b8;margin:0 1px;animation:ibsbot-b 1s infinite}",
    ".ibsbot-dots span:nth-child(2){animation-delay:.15s}.ibsbot-dots span:nth-child(3){animation-delay:.3s}",
    "@keyframes ibsbot-b{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}",
  ].join("");
  document.head.appendChild(css);

  // ── DOM ──
  var btn = document.createElement("button");
  btn.id = "ibsbot-btn"; btn.setAttribute("aria-label", "Open chat"); btn.textContent = "💬";

  var panel = document.createElement("div");
  panel.id = "ibsbot-panel";
  panel.innerHTML =
    '<div id="ibsbot-head"><div id="ibsbot-mark">IBS</div>' +
    '<div><div class="t">' + NAME + '</div><div class="s">Product Assistant</div></div>' +
    '<button id="ibsbot-x" aria-label="Close">×</button></div>' +
    '<div id="ibsbot-msgs"></div>' +
    '<div id="ibsbot-starters"></div>' +
    '<div id="ibsbot-foot"><input id="ibsbot-in" placeholder="Describe your job…" autocomplete="off"/>' +
    '<button id="ibsbot-send">Send</button></div>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var msgsEl = panel.querySelector("#ibsbot-msgs");
  var startersEl = panel.querySelector("#ibsbot-starters");
  var inputEl = panel.querySelector("#ibsbot-in");
  var sendEl = panel.querySelector("#ibsbot-send");

  function render() {
    msgsEl.innerHTML = "";
    messages.forEach(function (m) {
      var row = document.createElement("div");
      row.className = "ibsbot-row " + (m.role === "user" ? "u" : "a");
      var b = document.createElement("div");
      b.className = "ibsbot-b " + (m.role === "user" ? "u" : "a");
      b.textContent = m.content;
      row.appendChild(b); msgsEl.appendChild(row);
    });
    if (busy) {
      var row = document.createElement("div"); row.className = "ibsbot-row a";
      row.innerHTML = '<div class="ibsbot-b a"><span class="ibsbot-dots"><span></span><span></span><span></span></span></div>';
      msgsEl.appendChild(row);
    }
    msgsEl.scrollTop = msgsEl.scrollHeight;
    startersEl.style.display = messages.length <= 1 ? "flex" : "none";
  }

  STARTERS.forEach(function (s) {
    var c = document.createElement("button"); c.className = "ibsbot-chip"; c.textContent = s;
    c.onclick = function () { send(s); };
    startersEl.appendChild(c);
  });

  async function send(text) {
    var content = (text != null ? text : inputEl.value).trim();
    if (!content || busy) return;
    messages.push({ role: "user", content });
    inputEl.value = ""; busy = true; sendEl.disabled = true; render();
    try {
      var r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: messages }),
      });
      var data = await r.json();
      if (data.reply) {
        messages.push({ role: "assistant", content: data.reply });
      } else {
        // Show the real reason during setup (e.g. bad API key, model not enabled).
        messages.push({ role: "assistant", content: "⚠️ " + (data.detail || data.error || "Something went wrong.") });
      }
    } catch (e) {
      messages.push({ role: "assistant", content: "Connection hiccup — try again in a second." });
    } finally {
      busy = false; sendEl.disabled = false; render(); inputEl.focus();
    }
  }

  btn.onclick = function () { panel.classList.toggle("open"); if (panel.classList.contains("open")) inputEl.focus(); };
  panel.querySelector("#ibsbot-x").onclick = function () { panel.classList.remove("open"); };
  sendEl.onclick = function () { send(); };
  inputEl.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });

  render();
})();
