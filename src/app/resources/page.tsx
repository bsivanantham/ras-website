import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Scale, Download, ExternalLink, Lock, Building2, ShieldCheck } from "lucide-react";
import SeychellesFlag from "@/components/SeychellesFlag";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    id: "stc",
    icon: Building2,
    title: "STC Notices & Price Lists",
    description: "Official notices, press releases, and Maximum Retail Price lists from the Seychelles Trading Corporation.",
    resources: [
      { title: "STC Press Release — Category 1 Product Expansion", description: "STC expands Category 1 essential product list to include pasta, juice, tea, corn flakes, liquid milk, chicken franks, long life yogurt, biscuits, and household essentials. Dated 20 February 2026.", type: "Image", access: "public", href: "/images/stcpressrelease.jpeg" },
      { title: "STC Revised Category 1 MRP — Food Essentials", description: "Revised MRP for lentils, margarine, milk powder, salt (SCR 3.00), white sugar (SCR 17.50), sunflower oil (SCR 25.60), rice, flour, pasta, juice, tea, corn flakes, and perishables.", type: "Image", access: "member", href: "/images/stccataegoryrevised1.jpeg" },
      { title: "STC Revised Category 1 MRP — Household Essentials", description: "Revised MRP for liquid milk (SCR 20.00), chicken franks, long life yogurt, biscuits, toilet paper, baby diapers (Confy range), adult diapers, baby wipes, and dishwashing paste.", type: "Image", access: "member", href: "/images/stcproduct1.jpeg" },
      { title: "STC Delivery Schedule — Tuesday & Thursday (North Mahé)", description: "New STC delivery routes: Bel Ombre, Beau Vallon, St Louis, Glasic, Anse Etoile, Perseverance, English River, Central Victoria, Bel Air, Mont Fleuri, Plaisance, Les Mamelles, Cascade, Pointe Laure.", type: "Image", access: "member", href: "/images/stc1.jpeg" },
      { title: "STC Delivery Schedule — Wednesday & Friday (South & Central Mahé)", description: "New STC delivery routes: La Louise, Fair View, La Misere, Grand Anse, Anse Boileau, Anse Aux Pins, Au Cap, Anse Royale, Anse Forbans, Takamaka. Orders via WhatsApp before 1:00 PM two days prior.", type: "Image", access: "member", href: "/images/stc2.jpeg" },
    ],
  },
  {
    id: "ftc",
    icon: ShieldCheck,
    title: "FTC Notices & Regulatory Updates",
    description: "Press releases and enforcement notices from the Fair Trading Commission of Seychelles.",
    resources: [
      { title: "FTC Press Release — Enforcement of Recommended Resale Price (RRP) Provisions", description: "The Fair Trading Commission clarifies Section 127(5) of the Fair Trading Act 2022: RRPs must appear on the product only — not on posters, shelf displays, or stickers affixed to chillers. Retailers retain the right to independently set their own resale prices. Date of commencement: 23 February 2026. Deadline for full compliance: 24 August 2026.", type: "Image", access: "public", href: "/images/FTCpressrelease.jpg" },
    ],
  },
  {
    id: "laws",
    icon: Scale,
    title: "Laws & Regulations",
    description: "Key legislation and regulatory orders that directly affect retail operations in Seychelles.",
    resources: [
      { title: "Control of Supplies and Services Order 2026", description: "Maximum wholesale and retail mark-up now in effect. Category 1: 15% maximum margin. Category 2: 18% maximum margin (temporary — valid until 6 March 2027).", type: "PDF", access: "member", href: "/docs/SI%208%202026%20-%20Control%20of%20Supplies%20and%20Services%20(Maximum%20Wholesale%20and%20Retail%20Mark-up)%20Order%202026%20(1).pdf" },
      { title: "Competition Law in Seychelles", description: "Essential guide to competition law applicable to Seychelles retailers — anti-competitive practices, fair pricing obligations, and regulatory requirements.", type: "PDF", access: "member", href: "/docs/Competition-Law-in-Seychelles-148-x-210-mm-1.pdf" },
    ],
  },
];

type Resource = typeof categories[0]["resources"][0];

function ResourceAction({ resource, showAll }: Readonly<{ resource: Resource; showAll: boolean }>) {
  const canAccess = resource.access === "public" || showAll;
  if (!canAccess) {
    return (
      <div className="flex items-center gap-2">
        <Lock className="h-3.5 w-3.5 text-[#0D3572]/40" />
        <Link href="/sign-in" className="text-xs text-[#0D3572] font-medium hover:text-[#C9A227] transition-colors">
          Sign in to download
        </Link>
      </div>
    );
  }
  if (!resource.href) {
    return (
      <Button size="sm" variant="outline" className="self-start border-gray-200 text-gray-400 gap-1.5 cursor-default" disabled>
        <Download className="h-3.5 w-3.5" />Coming soon
      </Button>
    );
  }
  return (
    <a href={resource.href} target="_blank" rel="noopener noreferrer" download={resource.type === "PDF" || resource.type === "DOCX"}>
      <Button size="sm" variant="outline" className="self-start border-[#0D3572]/30 text-[#0D3572] hover:bg-[#0D3572] hover:text-white gap-1.5">
        {resource.type === "Link" || resource.type === "Image" ? (
          <><ExternalLink className="h-3.5 w-3.5" />{resource.type === "Image" ? "View" : "Visit"}</>
        ) : (
          <><Download className="h-3.5 w-3.5" />Download</>
        )}
      </Button>
    </a>
  );
}

function ResourceCard({ resource, showAll }: Readonly<{ resource: Resource; showAll: boolean }>) {
  const canAccess = resource.access === "public" || showAll;
  return (
    <Card className="bg-white border border-[#0D3572]/10 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-[#0D3572] text-sm font-semibold leading-snug">
            {resource.title}
          </CardTitle>
          <div className="flex items-center gap-1.5 shrink-0">
            <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
              {resource.type}
            </Badge>
            {resource.access === "member" && (
              <Badge className="text-xs bg-[#0D3572] text-white">Members</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <CardDescription className="text-gray-600 text-sm leading-relaxed">
          {resource.description}
        </CardDescription>
        {canAccess && resource.href && resource.type === "Image" && (
          <div className="rounded-md overflow-hidden border border-[#0D3572]/10 bg-gray-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resource.href} alt={resource.title} className="w-full h-44 object-contain" />
          </div>
        )}
        {canAccess && resource.href && resource.type === "PDF" && (
          <div className="hidden md:block rounded-md overflow-hidden border border-[#0D3572]/10 h-44">
            <iframe
              src={`${resource.href}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              className="w-full h-full"
              title={resource.title}
            />
          </div>
        )}
        <ResourceAction resource={resource} showAll={showAll} />
      </CardContent>
    </Card>
  );
}

function ResourceCategory({ category, showAll }: Readonly<{ category: typeof categories[0]; showAll: boolean }>) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D3572]">
          <category.icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#0D3572]">{category.title}</h2>
          <p className="text-sm text-gray-600">{category.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.resources.map((resource) => (
          <ResourceCard key={resource.title} resource={resource} showAll={showAll} />
        ))}
      </div>
    </div>
  );
}

export default async function ResourcesPage() {
  const { userId } = await auth();
  const isLoggedIn = !!userId;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-[#0D3572] text-white overflow-hidden min-h-[320px] sm:min-h-[380px] flex items-center">
        <Image src="/images/hero-resources.jpg" alt="Library resource shelves" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-[#0D3572]/85" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="absolute top-0 right-0 opacity-15 pointer-events-none">
          <SeychellesFlag width={420} height={280} />
        </div>
        <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">Resources</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Retail Resource Library</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Laws, forms, guides, training materials, and government links — everything a
              Seychelles retailer needs in one place.{" "}
              {isLoggedIn ? "Full access unlocked." : "Join Retailers Association of Seychelles for complete access."}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B8A4B] via-[#C9A227] to-[#1B8A4B]" />
      </section>


      {/* Resource Categories */}
      <section className="py-12 bg-[#EFF4FF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {categories.map((category) => (
            <ResourceCategory key={category.id} category={category} showAll={isLoggedIn} />
          ))}
        </div>
      </section>

    </div>
  );
}
