# TradeMate chatbot — Vercel

This is the backend half of the agreed setup: website on Netlify, chatbot on Vercel. The existing demo-booking service stays unchanged.

## Deploy

1. Unzip and put this folder's contents at the root of your Vercel chatbot project/repository. Import with the Other framework preset, no build command and no output-directory override. The function is `api/chat.js`.
2. Keep or add ANTHROPIC_API_KEY in the Vercel project's environment variables for Production. Never put the key in the website, repository or download.
3. Set ALLOWED_ORIGINS to a comma-separated list of the exact website origins, including the Netlify test domain, https://firespoon.ie and https://www.firespoon.ie. No trailing slash. Optional ANTHROPIC_MODEL can override the existing model if your account needs a different one.
4. Deploy, then use a PUBLIC production URL. The previously supplied deployment redirected to Vercel login. Website visitors must be able to reach both POST and OPTIONS /api/chat without signing in.
5. Put that public URL followed by /api/chat in the website's public/chatbot/config.js and deploy the website.

## Verify

- Opening /api/chat without signing in should return JSON `Method not allowed` (HTTP 405), not a login page. This alone does not test the AI key.
- From the Netlify website, ask a question, send a follow-up and request products. Confirm successful replies and images.
- Check provider billing/model access and host usage limits before launch. Origin restrictions are not a substitute for rate or spend limits.

The assistant identifies itself as a Firespoon/TradeMate demo. It must not claim to submit orders or capture enquiries. Demo requests go through the website's separate existing booking form.

Tests: Node 22+, `npm test`. Tests mock the AI service; they do not validate live credentials, deployment protection or billing. The product catalogue and images are bundled; no secret is included.
