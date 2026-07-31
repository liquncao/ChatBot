# Irish Building Supply — AI Trade-Counter Assistant

A product-selection chatbot for a builders merchant. It interviews site visitors,
recommends from the real product range, and captures enquiries for the sales team.

- **`api/chat.js`** — serverless backend. Holds the API key, injects the bot's
  instructions, forwards the conversation to Claude. The key never reaches the browser.
- **`widget.js`** — the chat bubble. One script tag, drops onto any site.
- **`index.html`** — a demo page, so the deployed URL is itself a live demo.
- **`catalogue.js`** — the product data and the bot's personality. **The only file
  you edit to change what the bot knows.**

---

## Deploy in ~5 minutes (Vercel)

1. **Get an API key** at console.anthropic.com → API Keys.
2. **Put this folder on GitHub** (new repo → upload files), or use the Vercel CLI.
3. Go to **vercel.com → Add New → Project**, import the repo. Vercel auto-detects
   the `api/` function and `public/` files — no build settings needed.
4. Under **Settings → Environment Variables**, add:
   `ANTHROPIC_API_KEY` = your key.
5. **Deploy.** You'll get a URL like `https://ibs-trade-assistant.vercel.app`.
   Open it — the demo page loads with the working bot. **That's your demo link.**

---

## Put it on the merchant's real site

Once deployed, embed on any site (Framer, WordPress, Squarespace, plain HTML) by
pasting two script tags — replacing `YOUR-APP` with your Vercel subdomain:

```html
<script>
  window.IBSBOT_CONFIG = { endpoint: "https://YOUR-APP.vercel.app/api/chat" };
</script>
<script src="https://YOUR-APP.vercel.app/widget.js"></script>
```

The bubble appears bottom-right. Nothing else to install.

---

## Customising

- **Products:** edit `CATALOGUE` in `catalogue.js`. For the full range, paste in the
  merchant's product export (name, category, price, one-line spec). Redeploy.
- **Behaviour / tone:** edit `SYSTEM_PROMPT` in `catalogue.js`.
- **Model:** `MODEL` in `api/chat.js`. Default is Haiku (cheap/fast). Switch to
  `"claude-sonnet-5"` for richer conversation at higher cost.
- **Lock down CORS:** in `api/chat.js`, replace `"*"` with the merchant's domain.

## Lead capture (next step)

Right now the bot collects name + contact + summary in the conversation. To route
those to the team, add a step in `api/chat.js` that detects a completed enquiry and
emails it (e.g. Resend) or writes a row to a sheet/CRM. Ask and this can be wired in.

## Troubleshooting

- **Root URL shows "404 / Not Found":** the static files must be at the project
  **root**, not in a `public/` folder (Vercel only serves `public/` when there's a
  build step). In this version `index.html` and `widget.js` are already at root — if
  you still 404, check that Vercel's **Output Directory** setting is left blank/default
  and no framework preset is forcing a build.
- **Check the backend is live:** open `https://your-app.vercel.app/api/chat` in a
  browser. You should see `{"error":"Method not allowed"}` — that's correct (it only
  accepts POST) and confirms the function deployed.
- **Bot replies "Assistant unavailable":** the `ANTHROPIC_API_KEY` env var is missing
  or wrong in Vercel. Set it under Settings → Environment Variables, then redeploy.

## Notes

- Prices are **guide, ex-VAT**; the bot always defers live price/stock to the team.
- Keep the deployment built **with** the merchant (their data, their blessing),
  not scraped around them.
