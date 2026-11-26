"use client";

import { useState } from "react";
import { Search, Globe, Mail, Phone, Pencil } from "lucide-react";
import AdminBottomSheet from "@/components/admin/AdminBottomSheet";
import DirectoryEditor from "@/components/admin/DirectoryEditor";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Provider = {
  id: string;
  name: string;
  category: string;
  description: string;
  website: string | null;
  websiteHref: string | null;
  email: string | null;
  phone: string | null;
  phone2?: string | null;
  email2?: string | null;
  region?: string | null; // Mahé | Praslin | La Digue — undefined defaults to Mahé
};

const regionOf = (p: Provider) => p.region ?? "Mahé";

const filterCategories = [
  "All",
  "STC Sales",
  "Employment & Labour",
  "Health & Safety",
  "Finance & Tax",
  "Legal & Licensing",
  "Traffic",
  "Police & Emergency",
];

export const providers: Provider[] = [
  // STC Sales Agents
  {
    id: "stc-south",
    name: "Annabelle — STC Sales Agent (South)",
    category: "STC Sales",
    description: "STC sales agent covering the South Mahé region.",
    website: null,
    websiteHref: null,
    email: null,
    phone: "+248 2 715 069",
  },
  {
    id: "stc-north",
    name: "Carol — STC Sales Agent (North)",
    category: "STC Sales",
    description: "STC sales agent covering the North Mahé region.",
    website: null,
    websiteHref: null,
    email: null,
    phone: "+248 2 814 911",
  },
  {
    id: "stc-central",
    name: "Harold — STC Sales Agent (Central)",
    category: "STC Sales",
    description: "STC sales agent covering the Central Mahé region.",
    website: null,
    websiteHref: null,
    email: null,
    phone: "+248 2 782 872",
  },
  // Government contacts
  {
    id: "1",
    name: "Immigration & Civil Status",
    category: "Legal & Licensing",
    description: "Handles civil documentation, immigration permits, and residency matters relevant to businesses employing foreign nationals in Seychelles. Principal Secretary: Mr. Alain Volcere. Chief Immigration Officer: Mrs. Erica Dufresne.",
    website: "www.ics.gov.sc",
    websiteHref: "https://www.ics.gov.sc",
    email: "avolcere@immigration.gov.sc",
    email2: "erica@immigration.gov.sc",
    phone: null as string | null,
  },
  {
    id: "2",
    name: "Ministry of Employment & Human Resource Planning",
    category: "Employment & Labour",
    description: "The primary government body for employment law, labour regulations, work permits, and workforce development in Seychelles. Principal Secretary: Mr. Steve Monnaie. No permanent Praslin office.",
    website: "www.employment.gov.sc",
    websiteHref: "https://www.employment.gov.sc",
    email: "smonnaie@employment.gov.sc",
    email2: "employment@employment.gov.sc",
    phone: "+248 429 7200",
  },
  {
    id: "3",
    name: "Seychelles Qualifications Authority (SQA)",
    category: "Employment & Labour",
    description: "Accreditation and recognition of qualifications, training standards, and professional certifications for Seychelles workers. No dedicated Praslin office — services coordinated from Mahé.",
    website: "www.sqa.sc",
    websiteHref: "https://www.sqa.sc",
    email: "info@sqa.sc",
    phone: "+248 432 4055",
  },
  {
    id: "4",
    name: "Ministry of Health",
    category: "Health & Safety",
    description: "Responsible for public health regulations, food safety inspections, health certificates, and sanitation standards for retail businesses.",
    website: "www.health.gov.sc",
    websiteHref: "https://www.health.gov.sc",
    email: "enquiries@health.gov.sc",
    email2: "info@health.gov.sc",
    phone: "+248 438 8000",
  },
  {
    id: "pha",
    name: "Public Health Authority of Seychelles",
    category: "Health & Safety",
    description: "Responsible for food safety inspections, health certificates, pest control oversight, and enforcement of public health regulations for retail premises. On Praslin, services run through Praslin Hospital and Health Centre.",
    website: null,
    websiteHref: null,
    email: "pha@health.gov.sc",
    phone: "+248 438 8000",
  },
  {
    id: "sbs",
    name: "Seychelles Bureau of Standards",
    category: "Health & Safety",
    description: "Sets and enforces product standards, labelling requirements, weights & measures, and quality certifications for goods sold in Seychelles. No permanent Praslin office.",
    website: "www.sbs.sc",
    websiteHref: "https://www.sbs.sc",
    email: "info@sbs.sc",
    phone: "+248 438 0400",
  },
  {
    id: "epa",
    name: "Environmental Protection Agency",
    category: "Health & Safety",
    description: "Oversees environmental compliance, hazardous waste disposal, chemical handling, and environmental impact for retail and commercial operations.",
    website: null,
    websiteHref: null,
    email: null,
    phone: null,
  },
  {
    id: "5",
    name: "Seychelles Revenue Commission (SRC)",
    category: "Finance & Tax",
    description: "The authority for tax registration, VAT, business revenue declarations, and fiscal compliance for all Seychelles businesses.",
    website: "www.src.gov.sc",
    websiteHref: "https://www.src.gov.sc",
    email: "callcentre@src.gov.sc",
    phone: null,
  },
  {
    id: "6",
    name: "Seychelles Pension Fund",
    category: "Finance & Tax",
    description: "Manages employer and employee pension contributions. All retail businesses must register and comply with pension fund obligations.",
    website: "www.pensionfund.sc",
    websiteHref: "https://www.pensionfund.sc",
    email: "info@pensionfund.sc",
    phone: null,
  },
  {
    id: "7",
    name: "Fair Trading Commission (FTC)",
    category: "Legal & Licensing",
    description: "Oversees fair competition and trade practices in Seychelles. Contact for price-fixing complaints, anti-competitive behaviour, and consumer protection. No Praslin branch — FTC officers visit Praslin when required.",
    website: "www.ftc.sc",
    websiteHref: "https://www.ftc.sc",
    email: "info@ftc.sc",
    email2: "jean-philip.esparon@ftc.gov.sc",
    phone: "+248 432 5250",
  },
  {
    id: "8",
    name: "Seychelles Licensing Authority (SLA) — Traffic Section",
    category: "Traffic",
    description: "Traffic section of the Seychelles Licensing Authority. Handles vehicle licensing, road permits, and traffic-related regulatory matters.",
    website: "www.sla.gov.sc",
    websiteHref: "https://www.sla.gov.sc",
    email: "marquise@sla.sc",
    email2: "prisca@sla.sc",
    phone: "+248 4283437",
  },
  // Police & Emergency
  {
    id: "27",
    name: "Seychelles Police Headquarters",
    category: "Police & Emergency",
    description: "Main police headquarters. Emergency: 999 | Crime Stopper: 133.",
    website: null,
    websiteHref: null,
    email: "info@police.gov.sc",
    email2: "police@police.gov.sc",
    phone: "+248 428 8000",
  },
  {
    id: "28",
    name: "Glacis Police Station",
    category: "Police & Emergency",
    description: "District police station — Glacis, Mahé.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8091",
  },
  {
    id: "29",
    name: "Anse Boileau Police Station",
    category: "Police & Emergency",
    description: "District police station — Anse Boileau, Mahé.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8110",
  },
  {
    id: "30",
    name: "Anse Royale Police Station",
    category: "Police & Emergency",
    description: "District police station — Anse Royale, Mahé.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8113",
  },
  {
    id: "31",
    name: "Anse Aux Pins Police Station",
    category: "Police & Emergency",
    description: "District police station — Anse Aux Pins, Mahé.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8107",
  },
  {
    id: "32",
    name: "Anse Etoile Police Station",
    category: "Police & Emergency",
    description: "District police station — Anse Etoile, Mahé.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8093",
  },
  {
    id: "33",
    name: "Beau Vallon Police Station",
    category: "Police & Emergency",
    description: "District police station — Beau Vallon, Mahé.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8095",
  },
  {
    id: "34",
    name: "Bel Ombre Police Station",
    category: "Police & Emergency",
    description: "District police station — Bel Ombre, Mahé.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8096",
  },
  {
    id: "35",
    name: "Mont Fleuri Police Station",
    category: "Police & Emergency",
    description: "District police station — Mont Fleuri, Mahé.",
    website: null, websiteHref: null, email: null,
    phone: "+248 252 3984",
  },
  {
    id: "36",
    name: "Baie Lazare Police Station",
    category: "Police & Emergency",
    description: "District police station — Baie Lazare, Mahé.",
    website: null, websiteHref: null, email: null,
    phone: "+248 252 3957",
  },
  {
    id: "37",
    name: "Takamaka Police Station",
    category: "Police & Emergency",
    description: "District police station — Takamaka, Mahé.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8115",
  },
  {
    id: "38",
    name: "Grand Anse Police Station (Mahé)",
    category: "Police & Emergency",
    description: "District police station — Grand Anse, Mahé.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8101",
  },
  {
    id: "39",
    name: "Baie Sainte Anne Police Station (Praslin)",
    category: "Police & Emergency",
    description: "District police station — Baie Sainte Anne, Praslin.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8120",
    region: "Praslin",
  },
  {
    id: "40",
    name: "Grand Anse Praslin Police Station",
    category: "Police & Emergency",
    description: "District police station — Grand Anse, Praslin.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8121",
    region: "Praslin",
  },
  // Security & Alarms
  {
    id: "53",
    name: "La Digue Police Station",
    category: "Police & Emergency",
    description: "District police station — La Digue.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8125",
    region: "La Digue",
  },
  // Praslin government & regulatory contacts
  {
    id: "moh-praslin",
    name: "Praslin Hospital & Health Centre",
    category: "Health & Safety",
    description: "Ministry of Health — general health and public health services for Praslin. Cap Samy, Grand Anse, Praslin.",
    website: "www.health.gov.sc",
    websiteHref: "https://www.health.gov.sc",
    email: "enquiries@health.gov.sc",
    phone: "+248 438 8000",
    region: "Praslin",
  },
  {
    id: "immigration-praslin",
    name: "Immigration & Civil Status — Praslin Office",
    category: "Legal & Licensing",
    description: "Ground Floor, Pension Fund Complex, Grand Anse, Praslin. Immigration permits, civil documentation, and residency services.",
    website: "www.ics.gov.sc",
    websiteHref: "https://www.ics.gov.sc",
    email: "info@immigration.gov.sc",
    phone: "+248 429 3683",
    phone2: "+248 429 3684",
    region: "Praslin",
  },
  {
    id: "fire-praslin",
    name: "Praslin Fire Station",
    category: "Fire & Rescue",
    description: "Seychelles Fire & Rescue Services Agency station for Praslin — Baie Ste Anne.",
    website: null,
    websiteHref: null,
    email: "fire@gov.sc",
    phone: "+248 423 2149",
    region: "Praslin",
  },
  {
    id: "src-praslin",
    name: "SRC Customs & Revenue — Praslin",
    category: "Finance & Tax",
    description: "Seychelles Revenue Commission customs and revenue services, available at Praslin Airport and Jetty.",
    website: "www.src.gov.sc",
    websiteHref: "https://www.src.gov.sc",
    email: "enquiries@src.gov.sc",
    email2: "customs@src.gov.sc",
    phone: "+248 429 3737",
    region: "Praslin",
  },
  {
    id: "stc-praslin",
    name: "STC Regional Office — Praslin",
    category: "STC Sales",
    description: "Seychelles Trading Company regional office serving Praslin retailers.",
    website: "www.stc.sc",
    websiteHref: "https://www.stc.sc",
    email: "info@stc.sc",
    phone: "+248 260 9571",
    region: "Praslin",
  },
  // Additional Mahé HQ contacts
  {
    id: "sla-main",
    name: "Seychelles Licensing Authority (SLA)",
    category: "Legal & Licensing",
    description: "Business and trade licensing for Seychelles. No permanent Praslin office — main office on Mahé.",
    website: "www.sla.gov.sc",
    websiteHref: "https://www.sla.gov.sc",
    email: "info@sla.gov.sc",
    phone: "+248 428 3400",
  },
  {
    id: "cbs",
    name: "Central Bank of Seychelles (CBS)",
    category: "Finance & Tax",
    description: "Central bank of Seychelles — banking regulation and financial services oversight. No Praslin office.",
    website: "www.cbs.sc",
    websiteHref: "https://www.cbs.sc",
    email: "info@cbs.sc",
    phone: "+248 428 2000",
  },
];

function ProviderCard({ provider }: Readonly<{ provider: Provider }>) {
  return (
    <Card className="bg-white border border-[#0D3572]/10 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#0D3572] text-base font-semibold leading-tight">
          {provider.name}
        </CardTitle>
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant="outline"
            className="border-[#C9A227]/40 text-[#C9A227] bg-[#C9A227]/10 text-xs"
          >
            {provider.category}
          </Badge>
          <Badge
            variant="outline"
            className="border-[#1B8A4B]/40 text-[#1B8A4B] bg-[#1B8A4B]/10 text-xs"
          >
            {regionOf(provider)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 flex-1">
        <CardDescription className="text-gray-600 text-sm leading-relaxed">
          {provider.description}
        </CardDescription>
        <div className="space-y-1.5 mt-auto pt-3 border-t border-gray-100">
          {provider.phone && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Phone className="h-3.5 w-3.5 text-[#0D3572] shrink-0" />
              <div className="flex flex-col gap-0.5">
                <a href={`tel:${provider.phone.replaceAll(" ", "")}`} className="hover:text-[#0D3572] transition-colors">
                  {provider.phone}
                </a>
                {provider.phone2 && (
                  <a href={`tel:${provider.phone2.replaceAll(" ", "")}`} className="hover:text-[#0D3572] transition-colors">
                    {provider.phone2}
                  </a>
                )}
              </div>
            </div>
          )}
          {provider.email && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Mail className="h-3.5 w-3.5 text-[#0D3572] shrink-0" />
              <div className="flex flex-col gap-0.5">
                <a href={`mailto:${provider.email}`} className="hover:text-[#0D3572] transition-colors break-words">
                  {provider.email}
                </a>
                {provider.email2 && (
                  <a href={`mailto:${provider.email2}`} className="hover:text-[#0D3572] transition-colors break-words">
                    {provider.email2}
                  </a>
                )}
              </div>
            </div>
          )}
          {provider.websiteHref && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Globe className="h-3.5 w-3.5 text-[#0D3572] shrink-0" />
              <a href={provider.websiteHref} target="_blank" rel="noopener noreferrer" className="hover:text-[#0D3572] transition-colors">
                {provider.website}
              </a>
            </div>
          )}
        </div>
        {provider.websiteHref && (
          <a href={provider.websiteHref} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="w-full bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 mt-1">
              Visit Website
            </Button>
          </a>
        )}
      </CardContent>
    </Card>
  );
}

export default function DirectoryClient({ isLoggedIn, kvProviders, isAdmin }: Readonly<{ isLoggedIn: boolean; kvProviders?: Provider[]; isAdmin?: boolean }>) {
  // Hardcoded providers always shown; KV entries are admin-added extras merged on top
  const allProviders = kvProviders?.length ? [...providers, ...kvProviders] : providers;
  const policeProviders = allProviders.filter((p) => p.category === "Police & Emergency");

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeRegion, setActiveRegion] = useState("All");
  const [adminOpen, setAdminOpen] = useState(false);

  // Derive filter categories from live data so admin-added categories appear automatically
  const liveCategories = ["All", ...Array.from(new Set(allProviders.map((p) => p.category))).sort((a, b) => a.localeCompare(b))];
  const liveRegions = ["All", ...Array.from(new Set(allProviders.map(regionOf)))];

  // Guests see police block only. Members use the unified filtered grid.
  const gridProviders = (() => {
    if (!isLoggedIn) return [];
    let base = activeCategory === "All" ? allProviders : allProviders.filter((p) => p.category === activeCategory);
    if (activeRegion !== "All") base = base.filter((p) => regionOf(p) === activeRegion);
    const term = search.toLowerCase();
    if (!term) return base;
    return base.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  })();

  return (
    <>
      {/* Sticky search + filter bar — signed-in only */}
      {isLoggedIn && (
        <section className="bg-white border-b border-gray-100 py-4 sm:py-6 sticky top-16 z-40 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search contacts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 border-gray-300 h-11"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                {liveCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-3 rounded-full text-xs font-medium transition-colors shrink-0 ${
                      activeCategory === cat
                        ? "bg-[#0D3572] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                {liveRegions.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setActiveRegion(region)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-colors shrink-0 ${
                      activeRegion === region
                        ? "bg-[#1B8A4B] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {region === "All" ? "All Islands" : `📍 ${region}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Guests: Police & Emergency only */}
      {!isLoggedIn && (
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 font-bold text-sm shrink-0">🚨</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-0.5">Public</p>
                <h2 className="text-lg font-bold text-[#0D3572]">Police &amp; Emergency Contacts</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {policeProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Signed-in: unified filterable grid */}
      {isLoggedIn && (
        <section className="py-12 bg-[#EFF4FF] flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Showing <strong className="text-[#0D3572]">{gridProviders.length}</strong> contacts
                {activeCategory !== "All" && (
                  <span> in <strong className="text-[#0D3572]">{activeCategory}</strong></span>
                )}
              </p>
            </div>
            {gridProviders.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Search className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                <p className="font-medium">No contacts found</p>
                <p className="text-sm mt-1">Try adjusting your search or filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {gridProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Help footer — shown to all */}
      <section className="bg-white border-t border-gray-100 py-10 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-[#0D3572] mb-2">Need help reaching a contact?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Retailers Association of Seychelles can assist members in navigating government contacts and service providers. Get in touch with our team.
          </p>
          <a href="mailto:admin@ras.sc">
            <Button variant="outline" className="border-[#0D3572] text-[#0D3572] hover:bg-[#0D3572] hover:text-white">
              Contact Us
            </Button>
          </a>
        </div>
      </section>

      {isAdmin && (
        <>
          <button
            onClick={() => setAdminOpen(true)}
            className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#0D3572] text-white shadow-lg hover:bg-[#0a2a5e] transition-colors flex items-center justify-center"
            aria-label="Manage directory"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <AdminBottomSheet open={adminOpen} onClose={() => setAdminOpen(false)} title="Manage Directory">
            <DirectoryEditor initial={kvProviders ?? []} />
          </AdminBottomSheet>
        </>
      )}
    </>
  );
}
