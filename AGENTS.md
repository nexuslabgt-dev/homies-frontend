# AGENTS.md

## Dev Commands
- `npm run dev` - Start dev server
- `npm run build` - Build to `dist/`
- `npm run preview` - Preview production build

## Key Files
- `src/data/site.ts` - Site content (services, team, testimonials, nav, SEO)
- `tailwind.config.js` - Color scheme (primary/accent), fonts
- `src/layouts/Base.astro` - Google Fonts link and base HTML

## Tech Stack
- Astro 6 + Tailwind CSS 4 (v4 syntax, no `tailwind.config.js` directives)
- TypeScript

## Backend
- **Supabase** - PostgreSQL + Auth + Edge Functions
- Schema: `SUPABASE_PLAN.md`
- Env vars: `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`

## Deployment
- Build: `npm run build` → `dist/`
- Netlify/Vercel: set build command to `npm run build`, publish to `dist/`
