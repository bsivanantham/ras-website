"use client";

import { useState, useMemo } from "react";
import { Search, Phone, MapPin, Store, User, ChevronLeft, ChevronRight } from "lucide-react";
import { members, type Member } from "@/data/members";

// ── Region keyword arrays (avoids complex single-regex) ──────────────────────
const VICTORIA_KW = [
  "MARKET ST", "HANGARD", "QUINCY ST", "REVOLUTION AVE", "FRANCIS RACHEL",
  "LODGE ST", "BENEZET", "UNITY HOUSE", "ORION MALL", "ENGLISH RIVER",
  "5TH AVENUE", "NEW PORT", "ILE PERSE", "PERSEVERANCE", "HONEY PORT",
  "ROYAL ST", "CASTOR", "NAGEON", "MS COMPLEX",
];
const NORTH_KW = [
  "BEAU VALLON", "BEL OMBRE", "GLACIS", "NORTH EAST", "ANSE ETOILE",
  "MONT PLAISIR", "LA GOGUE", "SWEET ESCOT", "LA BATIE",
];
const CENTRAL_KW = [
  "MONT FLEURI", "PLAISANCE", "BELVEDERE", "ST LOUIS", "MONT BUXTON",
  "LA LOUISE", "BELONIE", "PROVIDENCE", "LE NIOLE", "LA RETRAITE",
  "FORET NOIRE", "MAJOIE", "MA CONSTANCE", "QUINCY VILLAGE", "SANS SOUCI",
  "MONTAGNE", "PETITE PARIS", "PASCAL", "UNION VALE", "ROCHON", "BEL AIR",
  "HERMITAGE", "LAMISER", "LE ROCHER", "MALDIVE", "MACHABEE", "POINTE CONAN",
  "BALEINE", "CAP BON DIEU", "BOUGAINVILLE", "LES MAMELLES", "CORGATE",
  "MARIE ANGLAISE", "SORENTO", "BELLE VUE", "BRILLIANT",
];
const SOUTH_KW = [
  "ANSE AUX PINS", "POINT LARUE", "AU CAP", "ANSE BOILEAU", "BAIE LAZARE",
  "ANSE ROYALE", "TAKAMAKA", "ANSE LA MOUCHE", "ANSE SOLEIL", "ANSE POULE",
  "ANSE CONSOLATION", "CASCADE", "BEOLIRE", "POINTE AUX SEL",
];
const WEST_KW = ["PORT GLAUD", "PORT LAUNAY", "BARBARONS", "ANSE LOUIS", "GRAND ANSE"];

function hasKw(addr: string, kws: string[]): boolean {
  const u = addr.toUpperCase();
  return kws.some((k) => u.includes(k));
}

type RegionDef = { label: string; match: (m: Member) => boolean };

const REGIONS: RegionDef[] = [
  { label: "All",        match: () => true },
  { label: "Victoria",   match: (m) => !!m.address && hasKw(m.address, VICTORIA_KW) },
  { label: "North Mahé", match: (m) => !!m.address && hasKw(m.address, NORTH_KW) },
  { label: "Central Mahé", match: (m) => !!m.address && hasKw(m.address, CENTRAL_KW) },
  { label: "South Mahé", match: (m) => !!m.address && hasKw(m.address, SOUTH_KW) },
  {
    label: "West Mahé",
    match: (m) =>
      !!m.address &&
      hasKw(m.address, WEST_KW) &&
      !m.address.toUpperCase().includes("PRASLIN"),
  },
  { label: "Praslin",  match: (m) => !!m.address && m.address.toUpperCase().includes("PRASLIN") },
  { label: "La Digue", match: (m) => !!m.address && m.address.toUpperCase().includes("LA DIGUE") },
];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PAGE_SIZES = [10, 25, 50, 100];

// Pre-sort once — A to Z by shop name
const SORTED = [...members].sort((a, b) => a.shop.localeCompare(b.shop));

export default function MembersClient() {
  const [query,    setQuery]    = useState("");
  const [region,   setRegion]   = useState("All");
  const [letter,   setLetter]   = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [page,     setPage]     = useState(1);

  function reset() { setPage(1); }

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const regionDef = REGIONS.find((r) => r.label === region) ?? REGIONS[0];
    return SORTED.filter((m) => {
      if (!regionDef.match(m)) return false;
      if (letter && !m.shop.startsWith(letter)) return false;
      if (!q) return true;
      return (
        m.shop.toLowerCase().includes(q) ||
        m.owner?.toLowerCase().includes(q) ||
        m.address?.toLowerCase().includes(q)
      );
    });
  }, [query, region, letter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage   = Math.min(page, totalPages);
  const paginated  = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const hasFilters = !!letter || region !== "All" || !!query;

  return (
    <div>
      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          type="search"
          placeholder="Search shop, owner, or location…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); reset(); }}
          className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-[#0D3572]/20 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D3572]/30"
        />
      </div>

      {/* Region chips — horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
        {REGIONS.map((r) => (
          <button
            key={r.label}
            onClick={() => { setRegion(r.label); reset(); }}
            className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
              region === r.label
                ? "bg-[#0D3572] text-white"
                : "bg-white border border-[#0D3572]/20 text-[#0D3572]"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* A–Z letter picker */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        <button
          onClick={() => { setLetter(null); reset(); }}
          className={`shrink-0 h-8 min-w-[2rem] px-2 rounded-lg text-[11px] font-bold transition-colors ${
            letter ? "bg-white border border-[#0D3572]/20 text-[#0D3572]" : "bg-[#C9A227] text-white"
          }`}
        >
          All
        </button>
        {LETTERS.map((l) => (
          <button
            key={l}
            onClick={() => { setLetter(l === letter ? null : l); reset(); }}
            className={`shrink-0 h-8 w-8 rounded-lg text-[11px] font-bold transition-colors ${
              letter === l
                ? "bg-[#C9A227] text-white"
                : "bg-white border border-[#0D3572]/20 text-[#0D3572]"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-gray-400 mb-4">
        {filtered.length} member{filtered.length === 1 ? "" : "s"}
        {hasFilters && (
          <button
            onClick={() => { setQuery(""); setRegion("All"); setLetter(null); reset(); }}
            className="ml-2 text-[#0D3572] font-semibold hover:underline"
          >
            Clear
          </button>
        )}
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {paginated.map((m) => (
          <div
            key={m.no}
            className="relative bg-white rounded-xl border border-[#0D3572]/10 p-4 flex flex-col gap-1.5"
          >
            {/* Certified badge */}
            {m.rcpt && (
              <div className="absolute top-0 right-0 bg-[#C9A227] text-white text-[9px] font-bold leading-tight px-2 py-1 rounded-bl-lg rounded-tr-xl flex flex-col items-center">
                <span>✓ CERTIFIED</span>
                <span>2026 MEMBER</span>
              </div>
            )}
            {/* Shop */}
            <div className="flex items-start gap-2">
              <Store className="h-4 w-4 text-[#0D3572] shrink-0 mt-0.5" />
              <p className={`text-sm font-bold text-[#0D3572] leading-tight ${m.rcpt ? "pr-16" : ""}`}>{m.shop}</p>
            </div>
            {/* Owner */}
            {m.owner && (
              <div className="flex items-center gap-2 pl-6">
                <User className="h-3.5 w-3.5 text-gray-300 shrink-0" />
                <p className="text-xs text-gray-500 truncate">{m.owner}</p>
              </div>
            )}
            {/* Address */}
            {m.address && (
              <div className="flex items-center gap-2 pl-6">
                <MapPin className="h-3.5 w-3.5 text-gray-300 shrink-0" />
                <p className="text-xs text-gray-400 truncate">{m.address}</p>
              </div>
            )}
            {/* Phone — full-width tap target */}
            {m.phone ? (
              <a
                href={`tel:+248${m.phone}`}
                className="mt-2 flex items-center justify-center gap-2 w-full bg-[#C9A227]/10 hover:bg-[#C9A227]/20 active:bg-[#C9A227]/30 rounded-lg py-2.5 transition-colors"
              >
                <Phone className="h-4 w-4 text-[#C9A227]" />
                <span className="text-sm font-bold text-[#C9A227]">{m.phone}</span>
              </a>
            ) : (
              <div className="mt-2 flex items-center justify-center gap-2 w-full bg-gray-50 rounded-lg py-2.5">
                <Phone className="h-4 w-4 text-gray-200" />
                <span className="text-xs text-gray-300 italic">No phone on file</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Store className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No members found</p>
          {hasFilters && (
            <button
              onClick={() => { setQuery(""); setRegion("All"); setLetter(null); reset(); }}
              className="mt-3 text-xs font-semibold text-[#0D3572] hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Pagination + per-page */}
      <div className="mt-8 pt-4 border-t border-[#0D3572]/10 space-y-3">
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold border border-[#0D3572]/20 text-[#0D3572] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0D3572]/5 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <span className="text-sm text-gray-500">
              Page {safePage} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold border border-[#0D3572]/20 text-[#0D3572] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0D3572]/5 transition-colors"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="flex items-center justify-end gap-2">
          <span className="text-xs text-gray-400">Per page:</span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); reset(); }}
            className="rounded-lg border border-[#0D3572]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#0D3572] focus:outline-none focus:ring-2 focus:ring-[#0D3572]/20"
          >
            {PAGE_SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
