# AGENTS.md

## Dev Commands
- `npm run dev` - Start dev server
- `npm run build` - Build to `dist/`
- `npm run preview` - Preview production build

## Key Files
- `src/data/site.ts` - Site content (services, team, testimonials, nav, SEO)
- `src/lib/supabase.ts` - Supabase client
- `src/lib/types.ts` - Database types
- `src/i18n/es.ts` / `src/i18n/en.ts` - Translation dictionaries
- `src/i18n/index.ts` - Translation helper
- `tailwind.config.js` - Color scheme (primary/accent), fonts
- `src/layouts/Base.astro` - Google Fonts link and base HTML

## Tech Stack
- Astro 6 + Tailwind CSS 4 (v4 syntax, no `tailwind.config.js` directives)
- TypeScript
- i18n: Astro built-in i18n routing (`/es/` and `/en/`)

## Backend
- **Supabase** - PostgreSQL + Auth + Edge Functions
- Schema: `SUPABASE_PLAN.md`
- Env vars: `SUPABASE_URL`, `SUPABASE_KEY`

## i18n
- Default locale: `es`
- Secondary locale: `en`
- URL structure: `/es/` and `/en/` (prefix default locale)
- Use `Astro.currentLocale || 'es'` in components (NOT `getLocale` from `astro:i18n`)
- All components use `getTranslations(locale)` from `src/i18n/index.ts`

## Deployment
- Build: `npm run build` → `dist/`
- Netlify/Vercel: set build command to `npm run build`, publish to `dist/`
