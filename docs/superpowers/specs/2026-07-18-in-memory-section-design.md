# In Memory — Design Spec

**Date:** 2026-07-18
**Project:** ras-website (ras.sc)
**Status:** Awaiting user review

## Purpose

A permanent, respectful, members-only page honouring RAS members who have
passed away. Replaces the current approach of a transient "In Memoriam"
carousel announcement (which scrolls off and gets buried as new posts are
added). Tributes are added by admins over time, primarily as generated
poster/flyer images.

## Decisions (confirmed with user)

| Decision | Choice |
|---|---|
| Placement | Dedicated page `/memory`, linked in nav |
| Visibility | Members-only (sign-in required) |
| Curation | Admin editor on the page (KV-backed, no code per addition) |
| Image type | Generated posters (not headshots) — image is the centrepiece |
| Text fields | Optional metadata; the poster carries the words |

### Known tradeoff (accepted)

Members-only means a deceased member's family — who likely have no RAS
account — cannot view the tribute, and the existing S.A. Pillay tribute is
currently public. User accepted members-only. Flipping to public (or
public-view / members-add) later is a small change: swap the page's
`redirect` guard.

## Reuse map

This feature is "the Gallery, framed as a memorial." Almost everything already
exists:

| New thing | Cloned from |
|---|---|
| `src/app/memory/page.tsx` | `src/app/gallery/page.tsx` (auth redirect + hero + client) |
| `src/app/memory/MemoryClient.tsx` | `src/app/gallery/GalleryClient.tsx` (grid + lightbox) |
| `src/components/admin/MemorialEditor.tsx` | `src/components/admin/GalleryManager.tsx` (poster upload) + text fields from `DirectoryEditor.tsx` |
| `src/app/api/admin/memory/route.ts` | `src/app/api/admin/gallery/route.ts` (admin check, blob upload, sanitise, audit) |
| `StoredMemorial` + `getMemorials`/`setMemorials` in `src/lib/kv.ts` | `StoredPhoto` + `getGallery`/`setGallery` |
| Nav link | `src/components/Navbar.tsx` signed-in-only group (line ~26) |

Existing infra reused as-is: `AdminBottomSheet`, `/api/admin/upload` blob
handling, Clerk `isAdmin`, `appendAuditLog`, the gallery lightbox.

## Data shape

```ts
type StoredMemorial = {
  id: string;          // "mem-<timestamp>"
  name: string;        // required — for structure/ordering, even if poster shows it
  shop: string | null; // optional
  district: string | null;   // optional
  yearFrom: number | null;   // optional (e.g. 1958)
  yearTo: number | null;     // optional (e.g. 2026)
  photoSrc: string | null;   // poster image (blob URL); optional
  tribute: string | null;    // optional short paragraph
  order: number;
  createdAt: string;   // ISO
};
```

Only `name` is required. A card with just `name` + `photoSrc` (the poster) is
a valid, complete tribute.

## Page & card behaviour

- **Route:** `/memory`. Server component: `auth()` → if no `userId`,
  `redirect("/sign-in")`. Loads `getMemorials()`, passes to client.
- **Hero:** navy (`#0D3572`), "Members Only" gold eyebrow, title *In Memory*,
  subtitle *"Honouring the members we have lost."* Restrained — no confetti,
  no gold flourishes.
- **Grid:** responsive 1 / 2 / 3 columns, same as gallery.
- **Card:** poster image shown poster-shaped (`object-contain`, not a forced
  circular crop) so generated flyers display in full; muted border. Below the
  image, an optional caption line: `Name · Shop · yearFrom–yearTo`. Optional
  tribute paragraph. Tapping the image opens the existing lightbox at full size.
- **No image fallback:** if `photoSrc` is null, show a dignified monogram tile
  (initials on a muted background) instead of the poster.
- **Empty state:** if there are no tributes, the page shows a quiet placeholder
  ("No tributes yet.") rather than an empty grid — admin-only in practice.

## Admin editing

- Gold ✎ FAB (bottom-right, `super_admin` only) → `AdminBottomSheet` titled
  "Manage In Memory" → `MemorialEditor`.
- Form fields: photo upload (poster), name (required), shop, district,
  year from, year to, tribute. Save / delete / reorder — same mechanics as
  `DirectoryEditor` / `GalleryManager`.
- `POST /api/admin/memory`: Clerk admin check, validate + sanitise (strip HTML
  from text fields), upload poster to Vercel Blob (reuse the gallery route's
  type/size limits: JPEG/PNG/WebP, ≤5 MB), append to KV, write audit log.
- `GET` returns current list for the editor; `DELETE`/`PUT` mirror gallery.

## Seed content

Seed S.A. Pillay as the first tribute (poster = `/images/annouc3.jpeg`, name,
shop "Santhi Avamthram", district "Baie Ste Anne, Praslin"). The carousel
"In Memoriam" announcement can then either age out naturally or be removed
once the page is live — user's call at deploy time.

## Out of scope (YAGNI)

- No public visibility, no sharing links, no candle/flower animations.
- No per-tribute comment/condolence submissions.
- No search/filter (the list will be short for a long time).
- No dedicated SEO/schema (members-only page, not indexed).

## Validation / success criteria

1. Signed-out visitor hitting `/memory` is redirected to `/sign-in`; no nav
   link is visible to them.
2. Signed-in member sees the tribute grid; posters render full and open in the
   lightbox.
3. Super-admin can add a tribute (poster + name only) via the FAB and it
   appears immediately after save; delete removes it.
4. `npx tsc --noEmit` passes.
