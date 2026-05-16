"use client";

import { useState } from "react";
import { Search, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ContentGate from "@/components/ContentGate";

const filterCategories = [
  "All", "Cleaning Services", "Pest Control", "Waste Management",
  "Refrigeration", "Equipment Suppliers", "IT & POS", "Security", "Packaging", "Legal",
];

export const providers = [
  { id: "1", name: "CleanPro Seychelles", category: "Cleaning Services", description: "Professional commercial cleaning services for retail stores, including daily sanitisation, floor care, and pre-inspection deep cleans.", phone: "+248 4 XXX XXX", location: "Victoria, Mahé", verified: true },
  { id: "2", name: "Island Pest Solutions", category: "Pest Control", description: "Licensed pest management provider specialising in retail environments. Offers scheduled treatments, compliance certificates, and emergency call-out.", phone: "+248 4 XXX XXX", location: "Beau Vallon, Mahé", verified: true },
  { id: "3", name: "Waste Management Company (WMC)", category: "Waste Management", description: "Seychelles' official waste collection operator. RAS members can access priority scheduling and dedicated account management.", phone: "+248 4 610 000", location: "Roche Caiman, Mahé", verified: true },
  { id: "4", name: "CoolTech Refrigeration", category: "Refrigeration", description: "Sales, installation, and servicing of commercial refrigeration units. Specialises in retail cold-room and display cabinet maintenance.", phone: "+248 4 XXX XXX", location: "Anse Aux Pins, Mahé", verified: true },
  { id: "5", name: "RetailEquip Seychelles", category: "Equipment Suppliers", description: "Supplier of shelving, display units, trolleys, storage systems, and point-of-sale counter fixtures for retail stores of all sizes.", phone: "+248 4 XXX XXX", location: "Victoria, Mahé", verified: false },
  { id: "6", name: "IslandPOS Solutions", category: "IT & POS", description: "Point-of-sale system setup, barcode scanning, inventory management software, and IT support tailored for Seychelles retailers.", phone: "+248 4 XXX XXX", location: "Providence, Mahé", verified: true },
  { id: "7", name: "SecureGuard Seychelles", category: "Security", description: "CCTV installation, alarm systems, and manned guarding services for retail premises. Accredited by the Seychelles Police.", phone: "+248 4 XXX XXX", location: "Victoria, Mahé", verified: true },
  { id: "8", name: "PackRight Packaging Co.", category: "Packaging", description: "Wholesale supplier of retail packaging: bags, labels, boxes, and eco-friendly wrapping options. Minimum orders from SCR 500.", phone: "+248 4 XXX XXX", location: "Anse Royale, Mahé", verified: false },
  { id: "9", name: "Rousseau & Partners Law", category: "Legal", description: "Commercial law firm offering RAS members preferential rates on employment contracts, lease reviews, and regulatory compliance advice.", phone: "+248 4 XXX XXX", location: "Victoria, Mahé", verified: true },
  { id: "10", name: "MähéClean Commercial", category: "Cleaning Services", description: "End-of-lease cleans, post-renovation cleaning, and scheduled maintenance cleaning for supermarkets and retail outlets.", phone: "+248 4 XXX XXX", location: "Mont Fleuri, Mahé", verified: false },
];

function ProviderCard({ provider }: Readonly<{ provider: typeof providers[0] }>) {
  return (
    <Card className="bg-white border border-[#0D3572]/10 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2 mb-1">
          <CardTitle className="text-[#0D3572] text-base font-semibold leading-tight">{provider.name}</CardTitle>
          {provider.verified && (
            <Badge className="bg-[#1B8A4B] text-white text-xs shrink-0">RAS Verified</Badge>
          )}
        </div>
        <Badge variant="outline" className="self-start border-[#C9A227]/40 text-[#C9A227] bg-[#C9A227]/10 text-xs">
          {provider.category}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 flex-1">
        <CardDescription className="text-gray-600 text-sm leading-relaxed">{provider.description}</CardDescription>
        <div className="space-y-1.5 mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Phone className="h-3.5 w-3.5 text-[#0D3572]" />
            <a href={`tel:${provider.phone.replace(/\s/g, "")}`} className="hover:text-[#0D3572] transition-colors">{provider.phone}</a>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5 text-[#0D3572]" />
            {provider.location}
          </div>
        </div>
        <Button size="sm" className="w-full bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 mt-1">Contact</Button>
      </CardContent>
    </Card>
  );
}

export default function DirectoryClient({ isLoggedIn }: Readonly<{ isLoggedIn: boolean }>) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = providers.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const term = search.toLowerCase();
    const matchesSearch = !term || p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term) || p.category.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  const teaserProviders = providers.slice(0, 3);

  return (
    <>
      {/* Search & Filter — only for logged-in users */}
      {isLoggedIn && (
        <section className="bg-white border-b border-gray-100 py-6 sticky top-16 z-40 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search providers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 border-gray-300" />
              </div>
              <div className="flex flex-wrap gap-2">
                {filterCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === cat ? "bg-[#0D3572] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="py-12 bg-[#EFF4FF] flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoggedIn ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-600">
                  Showing <strong className="text-[#0D3572]">{filtered.length}</strong> providers
                  {activeCategory !== "All" && <span> in <strong className="text-[#0D3572]">{activeCategory}</strong></span>}
                </p>
              </div>
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <Search className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">No providers found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((provider) => <ProviderCard key={provider.id} provider={provider} />)}
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Showing <strong className="text-[#0D3572]">3</strong> of <strong className="text-[#0D3572]">{providers.length}</strong> providers — join to see all
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {teaserProviders.map((provider) => <ProviderCard key={provider.id} provider={provider} />)}
              </div>
              <ContentGate page="directory" />
            </>
          )}
        </div>
      </section>

      {/* Get listed CTA */}
      <section className="bg-white border-t border-gray-100 py-10 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-[#0D3572] mb-2">Are you a service provider?</h3>
          <p className="text-gray-600 text-sm mb-4">Contact RAS to get listed in our directory and reach Seychelles retailers directly.</p>
          <a href="mailto:info@retailers.sc">
            <Button variant="outline" className="border-[#0D3572] text-[#0D3572] hover:bg-[#0D3572] hover:text-white">Get Listed</Button>
          </a>
        </div>
      </section>
    </>
  );
}
