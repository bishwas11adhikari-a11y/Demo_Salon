# Graph Report - .  (2026-07-14)

## Corpus Check
- Corpus is ~5,465 words - fits in a single context window. You may not need a graph.

## Summary
- 150 nodes · 198 edges · 14 communities (9 shown, 5 thin omitted)
- Extraction: 95% EXTRACTED · 4% INFERRED · 1% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.8)
- Token cost: 60,412 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_App Architecture & Data Model|App Architecture & Data Model]]
- [[_COMMUNITY_NPM Dev Dependencies|NPM Dev Dependencies]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Call Log API & Prisma Client|Call Log API & Prisma Client]]
- [[_COMMUNITY_Admin Dashboard Components|Admin Dashboard Components]]
- [[_COMMUNITY_Landing Page Components|Landing Page Components]]
- [[_COMMUNITY_Business Settings & System Prompt|Business Settings & System Prompt]]
- [[_COMMUNITY_Root Layout & Fonts|Root Layout & Fonts]]
- [[_COMMUNITY_Database Seed Script|Database Seed Script]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_Next.js Type Declarations|Next.js Type Declarations]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Tailwind Config|Tailwind Config]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `POST()` - 11 edges
3. `DEMO Beauty Salon (Portfolio Demo)` - 9 edges
4. `parseBusinessHours()` - 7 edges
5. `AdminPage()` - 6 edges
6. `scripts` - 6 edges
7. `Business model (Prisma schema)` - 6 edges
8. `buildSystemPrompt()` - 5 edges
9. `TranscriptTurn` - 5 edges
10. `Faq model (Prisma schema)` - 5 edges

## Surprising Connections (you probably didn't know these)
- `components/ (Landing page and admin UI components)` --references--> `AdminPage()`  [INFERRED]
  README.md → app/admin/page.tsx
- `POST()` --references--> `system-prompt.ts (builds system prompt from business + FAQs)`  [INFERRED]
  app/api/call/route.ts → README.md
- `AdminPage()` --references--> `CallLog model (Prisma schema)`  [EXTRACTED]
  app/admin/page.tsx → README.md
- `POST()` --references--> `prisma.ts (Prisma client singleton)`  [INFERRED]
  app/api/call-log/route.ts → README.md
- `POST()` --references--> `prisma.ts (Prisma client singleton)`  [INFERRED]
  app/api/call/route.ts → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Web Call Creation Flow** — app_api_call_route_post, prisma_schema_business, prisma_schema_faq, lib_system_prompt_system_prompt, readme_retell_sdk [INFERRED 0.85]
- **Call Logging Flow** — readme_retell_client_js_sdk, app_api_call_log_route_post, prisma_schema_calllog, app_admin_page_adminpage [EXTRACTED 1.00]
- **Prisma Relational Data Model** — prisma_schema_business, prisma_schema_faq, prisma_schema_calllog [EXTRACTED 1.00]

## Communities (14 total, 5 thin omitted)

### Community 0 - "App Architecture & Data Model"
Cohesion: 0.13
Nodes (25): AdminPage(), POST(), POST(), Proposed POST /api/retell/inbound-webhook handler, Landing page (app/page.tsx), components/ (Landing page and admin UI components), business-hours.ts (business hours JSON helpers), prisma.ts (Prisma client singleton) (+17 more)

### Community 1 - "NPM Dev Dependencies"
Cohesion: 0.09
Nodes (21): devDependencies, eslint, eslint-config-next, postcss, tailwindcss, tsx, @types/node, @types/react (+13 more)

### Community 2 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 3 - "Call Log API & Prisma Client"
Cohesion: 0.12
Nodes (11): globalForPrisma, dependencies, clsx, next, @phosphor-icons/react, prisma, @prisma/client, react (+3 more)

### Community 4 - "Admin Dashboard Components"
Cohesion: 0.19
Nodes (9): CallLog, CallLogList(), Faq, FaqEditor(), CallState, CallWidget(), RetellTranscriptUpdate, Hero() (+1 more)

### Community 5 - "Landing Page Components"
Cohesion: 0.19
Nodes (9): Home(), About(), BrandMark(), Faq, FaqAccordion(), Footer(), links, Nav() (+1 more)

### Community 6 - "Business Settings & System Prompt"
Cohesion: 0.23
Nodes (8): Business, BusinessForm(), Hours(), BusinessHours, DAY_LABELS, formatBusinessHoursForPrompt(), parseBusinessHours(), buildSystemPrompt()

### Community 7 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): manrope, metadata, playfair

### Community 8 - "Database Seed Script"
Cohesion: 0.40
Nodes (3): businessHours, faqs, prisma

## Ambiguous Edges - Review These
- `Scaling to Real Inbound Phone Calls` → `Proposed POST /api/retell/inbound-webhook handler`  [AMBIGUOUS]
  README.md · relation: references

## Knowledge Gaps
- **65 isolated node(s):** `extends`, `playfair`, `manrope`, `metadata`, `CallState` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Scaling to Real Inbound Phone Calls` and `Proposed POST /api/retell/inbound-webhook handler`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `dependencies` connect `Call Log API & Prisma Client` to `NPM Dev Dependencies`?**
  _High betweenness centrality (0.236) - this node is a cross-community bridge._
- **Why does `POST()` connect `App Architecture & Data Model` to `Business Settings & System Prompt`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `POST()` (e.g. with `prisma.ts (Prisma client singleton)` and `system-prompt.ts (builds system prompt from business + FAQs)`) actually correct?**
  _`POST()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `extends`, `playfair`, `manrope` to the rest of the system?**
  _66 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Architecture & Data Model` be split into smaller, more focused modules?**
  _Cohesion score 0.12666666666666668 - nodes in this community are weakly interconnected._
- **Should `NPM Dev Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._