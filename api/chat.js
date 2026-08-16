// ─────────────────────────────────────────────────────────────────────────────
// BACKEND — runs on Vercel as a serverless function at /api/chat
// Holds the API key (never sent to the browser), injects the system prompt,
// and forwards the conversation to Anthropic. This is what makes it safe to
// embed on a public site.
// ─────────────────────────────────────────────────────────────────────────────

import { SYSTEM_PROMPT, SPECIAL_OFFERS } from "../catalogue.js";

// Cheap + fast, fine for a product-selection bot. Swap to "claude-sonnet-5"
// for richer conversation at higher cost.
const MODEL = "claude-haiku-4-5-20251001";

export default async function handler(req, res) {
  // CORS — allows the widget to be embedded on the merchant's own domain.
  // In production, replace "*" with the merchant's site, e.g. "https://www.irishbuildingsupply.ie"
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array required" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "Server missing ANTHROPIC_API_KEY" });
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 700,
        system: SYSTEM_PROMPT,
        // Only pass role + content through; ignore any client-side extras.
        messages: messages.map((m) => ({ role: m.role, content: String(m.content || "") })),
      }),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      console.error("Anthropic error:", JSON.stringify(data));
      return res.status(502).json({
        error: "Assistant unavailable right now.",
        // Setup aid — surfaces the real cause (bad key, model not enabled, no billing).
        // Remove this `detail` line once it's working, so errors aren't public.
        detail: (data && data.error && data.error.message) || JSON.stringify(data),
      });
    }

    let reply = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    // Pull any [[OFFER:code]] tags the model appended, map them to product cards,
    // and strip the tags out of the visible text.
    const products = [];
    const seen = new Set();
    const re = /\[\[OFFER:\s*([A-Za-z0-9]+)\s*\]\]/g;
    let m;
    while ((m = re.exec(reply)) !== null) {
      const code = m[1].toUpperCase();
      const o = SPECIAL_OFFERS.find((x) => x.code.toUpperCase() === code);
      if (o && !seen.has(o.code)) {
        seen.add(o.code);
        products.push({ code: o.code, name: o.name, price: o.price, rrp: o.rrp, img: "/img/" + o.img });
      }
    }
    reply = reply.replace(re, "").replace(/[ \t]+\n/g, "\n").trim();

    return res.status(200).json({ reply: reply || "Sorry — didn't catch that. Say it another way?", products });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}
