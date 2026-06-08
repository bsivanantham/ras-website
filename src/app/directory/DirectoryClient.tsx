"use client";

import { useState } from "react";
import { Search, Globe, Mail, Phone } from "lucide-react";
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
};

const filterCategories = [
  "All",
  "STC Sales",
  "Employment & Labour",
  "Health & Safety",
  "Finance & Tax",
  "Legal & Licensing",
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
    description: "Handles civil documentation, immigration permits, and residency matters relevant to businesses employing foreign nationals in Seychelles. Principal Secretary: Mr. Alain Volcere.",
    website: "www.ics.gov.sc",
    websiteHref: "https://www.ics.gov.sc",
    email: "avolcere@immigration.gov.sc",
    email2: "info@immigration.gov.sc",
    phone: null as string | null,
  },
  {
    id: "2",
    name: "Ministry of Employment & Human Resource Planning",
    category: "Employment & Labour",
    description: "The primary government body for employment law, labour regulations, work permits, and workforce development in Seychelles. Principal Secretary: Mr. Steve Monnaie.",
    website: "www.employment.gov.sc",
    websiteHref: "https://www.employment.gov.sc",
    email: "smonnaie@employment.gov.sc",
    email2: "employment@gov.sc",
    phone: null,
  },
  {
    id: "3",
    name: "Seychelles Qualifications Authority (SQA)",
    category: "Employment & Labour",
    description: "Accreditation and recognition of qualifications, training standards, and professional certifications for Seychelles workers.",
    website: "www.sqa.sc",
    websiteHref: "https://www.sqa.sc",
    email: "info@sqa.sc",
    phone: null,
  },
  {
    id: "4",
    name: "Ministry of Health",
    category: "Health & Safety",
    description: "Responsible for public health regulations, food safety inspections, health certificates, and sanitation standards for retail businesses.",
    website: "www.health.gov.sc",
    websiteHref: "https://www.health.gov.sc",
    email: "info@health.gov.sc",
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
    description: "Oversees fair competition and trade practices in Seychelles. Contact for price-fixing complaints, anti-competitive behaviour, and consumer protection.",
    website: "www.ftc.sc",
    websiteHref: "https://www.ftc.sc",
    email: "jean-philip.esparon@ftc.gov.sc",
    email2: "jean-Philippe.tambara@ftc.gov.sc",
    phone: null,
  },
  {
    id: "8",
    name: "Seychelles Licensing Authority (SLA)",
    category: "Legal & Licensing",
    description: "Issues and manages business licences, trade licences, and other regulatory permits required for operating a retail business in Seychelles.",
    website: "www.sla.gov.sc",
    websiteHref: "https://www.sla.gov.sc",
    email: null,
    phone: null,
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
  },
  {
    id: "40",
    name: "Grand Anse Praslin Police Station",
    category: "Police & Emergency",
    description: "District police station — Grand Anse, Praslin.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8121",
  },
  // Security & Alarms
  {
    id: "53",
    name: "La Digue Police Station",
    category: "Police & Emergency",
    description: "District police station — La Digue.",
    website: null, websiteHref: null, email: null,
    phone: "+248 428 8125",
  },
];

function ProviderCard({ provider }: Readonly<{ provider: Provider }>) {
  return (
    <Card className="bg-white border border-[#0D3572]/10 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#0D3572] text-base font-semibold leading-tight">
          {provider.name}
        </CardTitle>
        <Badge
          variant="outline"
          className="self-start border-[#C9A227]/40 text-[#C9A227] bg-[#C9A227]/10 text-xs"
        >
          {provider.category}
        </Badge>
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

const policeProviders = providers.filter((p) => p.category === "Police & Emergency");

export default function DirectoryClient({ isLoggedIn }: Readonly<{ isLoggedIn: boolean }>) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Guests see police block only. Members use the unified filtered grid.
  const gridProviders = (() => {
    if (!isLoggedIn) return [];
    const base = activeCategory === "All" ? providers : providers.filter((p) => p.category === activeCategory);
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
                {filterCategories.map((cat) => (
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
    </>
  );
}
