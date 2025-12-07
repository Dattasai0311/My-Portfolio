# My Portfolio

Modern React + Vite portfolio with animated hero, AI-powered chat/inline Q&A, themed experience picker, and a project carousel with lightbox and modal details.

## Requirements
- Node 18+
- Env: set `VITE_GEMINI_KEY` in a `.env` file. Without it, AI calls will show an offline message.

## Install
```bash
npm install
```

## Develop
```bash
npm run dev
```

## Build
```bash
npm run build
```
Output goes to `dist/`.

## Deploy
- Vercel CLI: `vercel` (preview) or `vercel --prod` (production). Ensure env vars are set in the Vercel project.
- Netlify/Pages: serve `dist/` as a static site.

## Notes
- Images live in `public/` (profile, project galleries, theme previews).
- AI chat/analysis uses Gemini; keep your key in env, not in source.
- Theme select and project lightbox are mobile-friendly; keyboard navigation exists in the lightbox.
