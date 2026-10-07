# TradeMate — complete Vercel replacement

This package now includes BOTH the branded demo page and chatbot backend. It replaces the earlier backend-only download. The main Firespoon website stays on Netlify.

## Update the existing Vercel project

1. Unzip this archive. Replace the contents of the existing Vercel project's connected repository with these files at the repository root. This index.html replaces the old Irish Building Supply homepage. Remove the obsolete widget.js from that repository; the new page uses demo.js instead. Keep your repository's .git directory.
2. Use the Other framework preset with no build command and no output directory override. Keep the existing irishhardware.vercel.app project/domain; there is no need to create a new project.
3. Keep ANTHROPIC_API_KEY in Vercel's Production environment variables. Do not put the key in any file. If ALLOWED_ORIGINS is set, use:
   https://firespoon.netlify.app,https://firespoon.ie,https://www.firespoon.ie,https://irishhardware.vercel.app
4. Deploy/redeploy. Open https://irishhardware.vercel.app/ in a private window. It should show TradeMate by Firespoon, with an inline conversation panel, rather than the old merchant page and yellow chat bubble.
5. Test a message, a follow-up and a product request. No Vercel login should be required. Confirm the chatbot also works from the Netlify website.

## What connects where

- This Vercel demo calls its own /api/chat endpoint.
- The Netlify website calls https://irishhardware.vercel.app/api/chat (already set in the latest website download).
- The demo's Firespoon links go to https://firespoon.netlify.app/.
- Booking stays on the main website and uses the existing booking service.

## Files

index.html, styles.css, demo.js: new branded demo.
api/chat.js, catalogue.js: server-side AI integration and sample catalogue.
chatbot/: browser-safe sample data, configuration and product photos.
img/: product photos retained for compatibility with other API clients.

This is an AI demo using sample prices, not live merchant stock. It does not submit orders or capture leads in chat. The API key remains server-side. Browser inputs and model text are rendered as text, not executable HTML.

Run local tests with npm test on Node 22+. Tests mock the AI provider; live model access, billing and deployment settings need testing after upload. No deployment or paid AI call was performed while preparing this archive.
