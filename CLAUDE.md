@AGENTS.md

# RAS Website — Project Context

## What this is
Official website for the **Retailers Association of Seychelles (RAS)**.
Domain: **ras.sc** (production). Deployed on Vercel, repo: `bsivanantham/ras-website`.

## Stack
- Next.js 16 App Router, React 19, TypeScript, TailwindCSS v4
- Clerk (auth) — production instance keyed to ras.sc
- Vercel Analytics, Web3Forms (contact form)

## Brand colours
- Navy `#0D3572` · Gold `#C9A227` · Green `#1B8A4B` · Background `#EFF4FF`

## Key files
| File | Purpose |
|---|---|
| `src/data/members.ts` | Full member list (~350 entries) |
| `src/components/AnnouncementsCarousel.tsx` | Homepage carousel — newest entry first |
| `src/app/layout.tsx` | Global metadata + Organization JSON-LD |
| `public/images/` | All images |
| `public/docs/` | PDFs (price lists, press releases) |
| `src/app/sitemap.ts` | Auto-generated sitemap.xml |
| `src/app/robots.ts` | Auto-generated robots.txt |

## Member data shape
```ts
{ no: number, shop: string, owner: string | null, address: string | null,
  phone: string | null, email: string | null, rcpt: number | null }
```
- `rcpt: number` = certified 2026 member (receipt number shown on their card as gold seal)
- `rcpt: null` = not certified, no badge shown
- Certified filter in MembersClient uses `m.rcpt` as a truthy check

## Auth pattern
```ts
// Server component
const { userId } = await auth()   // from @clerk/nextjs/server
// Client component
const { isSignedIn } = useAuth()  // from @clerk/nextjs
```
Members-only pages (`/members`, `/gallery`) redirect to `/sign-in` if not logged in.

## SEO — already implemented
- `sitemap.xml` and `robots.txt` auto-generated
- Organization JSON-LD (name, address, phone, logo) in layout.tsx
- Title template: `"%s | Retailers Association of Seychelles"`
- FAQ schema on `/compliance`, NewsArticle schema on `/media`
- BreadcrumbList on all server-component pages
- Bing webmaster verification in layout.tsx metadata
- Google Search Console sitemap submitted

## Pages: server vs client
| Page | Type | Has metadata export |
|---|---|---|
| `/` (home) | CLIENT | ❌ inherits global |
| `/about` | SERVER | ✅ |
| `/resources` | SERVER | ✅ |
| `/media` | SERVER | ✅ |
| `/members` | SERVER | ✅ |
| `/compliance` | SERVER | ✅ |
| `/directory` | SERVER | ✅ |
| `/contact` | CLIENT | ❌ inherits global |
| `/join` | CLIENT | ❌ inherits global |

## Security rules — NEVER break these
- NEVER commit Clerk secret keys (`sk_live_*`, `sk_test_*`) to the repo
- NEVER commit personal email addresses without explicit user approval
- `WEB3FORMS_KEY` in `contact/page.tsx` is a public access key — safe to commit
- `public/images/logo.jpg` and other assets MUST be `git add`ed before deploying

## Known pending items (see TODOs in code)
- `compliance/page.tsx` — 4 government link URLs are `"#"` placeholder; need real URLs from RAS
- `translations.ts` — Seychellois Creole (`sc`) locale exists but toggle is disabled in UI
- `/contact` and `/join` pages are CLIENT components — cannot export `metadata` without refactor
