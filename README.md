# DEMO Beauty Salon

A portfolio demo showing an AI voice receptionist for a fictional beauty
salon. Visitors can click "Call Now for Inquiry" and talk, in the browser,
to Mia, an AI receptionist powered by [Retell AI](https://www.retellai.com).
Mia's entire personality, hours, and FAQ knowledge come from a local SQLite
database, not from anything hardcoded in the Retell agent itself.

## Tech stack

- Next.js 14 (App Router) + Tailwind CSS
- SQLite via Prisma
- [`retell-client-js-sdk`](https://www.npmjs.com/package/retell-client-js-sdk) for the in-browser voice call
- [`retell-sdk`](https://www.npmjs.com/package/retell-sdk) (server SDK) to create web calls

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

```
DATABASE_URL="file:./dev.db"
RETELL_API_KEY="your_retell_api_key_here"
RETELL_AGENT_ID="your_retell_agent_id_here"
```

Create the database and seed the demo salon:

```bash
npx prisma db push
npm run db:seed
```

Run the app:

```bash
npm run dev
```

Visit `http://localhost:3000` for the salon site, `http://localhost:3000/admin`
for the admin panel (call history, business info, FAQs).

## Setting up the Retell agent

The whole point of this architecture is that **your database is the source
of truth**, not the Retell dashboard. So the Retell agent itself should be
almost empty:

1. Create a free account at [retellai.com](https://www.retellai.com).
2. Create a new Agent using a Retell LLM (or Conversation Flow) as the
   response engine, and pick a voice.
3. Set the agent's entire system prompt to a single dynamic variable:
   ```
   {{system_prompt}}
   ```
   That's it. Nothing else needs to be written in the Retell dashboard.
4. Copy the Agent ID into `RETELL_AGENT_ID` and your API key into
   `RETELL_API_KEY`.

When a visitor clicks "Call Now for Inquiry", `POST /api/call`
([app/api/call/route.ts](app/api/call/route.ts)) reads the business and its
FAQs from Prisma, assembles a system prompt (business description, hours,
instructions, and FAQ answers), and calls Retell's `createWebCall` with that
prompt passed in as the `system_prompt` dynamic variable. Retell returns a
short-lived access token, which the browser uses to open a WebRTC call
straight to the agent. Change the business info or FAQs in `/admin` (or the
database) and the very next call uses the new prompt, no redeploy and no
Retell dashboard edits required.

## Seeding

`prisma/seed.ts` creates one business, "DEMO Beauty Salon", with a
description, greeting, hours, AI instructions, and 8 FAQs (services and
prices, walk-ins, parking, cancellation policy, products, bridal packages,
gift cards, and a first-visit discount). Re-run it any time to reset the
demo data:

```bash
npm run db:seed
```

## How a call is logged

While a call is active, the browser listens to `update` events from the
Retell Web SDK and renders the transcript live. When the call ends, the
transcript is posted to `POST /api/call-log`
([app/api/call-log/route.ts](app/api/call-log/route.ts)) and saved to the
`CallLog` table. The `/admin` page lists every past call with an expandable
transcript, alongside a form to edit the business's description, greeting,
AI instructions, hours, and FAQs.

## Scaling to real phone numbers, and to many businesses

This same architecture scales past a single web-call demo:

- **Real inbound calls**: buy or import a phone number in Retell, point it
  at this agent, and configure
  [Retell's inbound webhook](https://docs.retellai.com/build/inbound-call)
  to hit an endpoint in this app (e.g. `POST /api/retell/inbound-webhook`)
  right before the call connects. That webhook looks up the business the
  same way `/api/call` does, and returns `retell_llm_dynamic_variables`
  with the assembled system prompt, so phone calls get the exact same
  database-driven behavior as the web demo.
- **Many businesses**: the schema already supports it. `Business` and `Faq`
  are relational, so a multi-tenant version of this app would map each
  phone number (or subdomain) to a `Business` row, and the webhook or
  `/api/call` route would look up the right business instead of always
  taking the first one. No changes to the Retell agent are needed since
  the agent's prompt is always just `{{system_prompt}}`.

## Project structure

```
app/
  page.tsx                 Landing page (hero, services, about, hours, FAQ)
  admin/page.tsx            Admin panel
  api/call/route.ts         Creates a Retell web call with the assembled prompt
  api/call-log/route.ts     Persists a finished call's transcript
  api/admin/...              Business and FAQ CRUD for the admin panel
components/                 Landing page and admin UI components
lib/
  prisma.ts                 Prisma client singleton
  system-prompt.ts          Builds the system prompt from business + FAQs
  business-hours.ts         Business hours JSON helpers
prisma/
  schema.prisma
  seed.ts
```
