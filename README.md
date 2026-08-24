# Kristin Chen — AI Portfolio

Personal portfolio for Kristin Chen, focused on practical AI workflows, AI enablement, and data-informed decision-making.

**Live site:** [kristinzhiyingchen.com](https://kristinzhiyingchen.com)

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives

Production is deployed on Vercel and connected to this repository for automatic deployments from `main`. DNS is managed through Cloudflare.

## WorkflowLens

WorkflowLens is the portfolio's live AI workflow opportunity assessment. The Next.js interface extracts text from PDF, DOCX, and TXT files in the browser, sends only the extracted text to a Cloudflare Worker, and uses Workers AI to map the current workflow and prepare a human-reviewed recommendation report. D1 stores expiring, unlisted reports; original files are never uploaded or stored.

Production infrastructure:

- Vercel: portfolio UI and server-rendered PDF/JSON exports
- Cloudflare Workers AI: structured workflow extraction and report generation
- Cloudflare D1: temporary run state and 30-day report links
- Cloudflare Turnstile: abuse protection for live inference

The Cloudflare Worker lives in [`worker/`](worker/). Its non-secret production configuration is in [`worker/wrangler.jsonc`](worker/wrangler.jsonc); local secrets belong in the ignored `worker/.dev.vars` file.

## Local development

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm test
npm run build
```

## Worker commands

```bash
npm run worker:types
npm run worker:dev
npm run worker:migrate
npm run worker:deploy
```
