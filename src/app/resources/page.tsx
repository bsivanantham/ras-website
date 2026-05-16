import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import {
  Scale,
  FileText,
  BookOpen,
  GraduationCap,
  Building2,
  Download,
  ExternalLink,
  Lock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ContentGate from "@/components/ContentGate";

const categories = [
  {
    id: "laws",
    icon: Scale,
    title: "Laws & Regulations",
    description: "Core legislation and regulatory frameworks that govern retail operations in Seychelles.",
    resources: [
      { title: "Consumer Protection Act", description: "The primary legislation protecting consumer rights and outlining retailer obligations in Seychelles.", type: "PDF", access: "public" },
      { title: "Public Health Act — Food Safety Provisions", description: "Regulations covering food storage, handling, labelling, and expiry date management for retail food businesses.", type: "PDF", access: "public" },
      { title: "Trade Licensing Regulations 2023", description: "Requirements for obtaining and renewing trade licences for retail, wholesale, and import/export businesses.", type: "PDF", access: "member" },
      { title: "Employment Act — Retail Sector Summary", description: "A plain-language summary of employer obligations under the Seychelles Employment Act, prepared for retailers.", type: "PDF", access: "member" },
    ],
  },
  {
    id: "forms",
    icon: FileText,
    title: "Forms & Templates",
    description: "Ready-to-use forms, templates, and checklists for common retail business needs.",
    resources: [
      { title: "Trade Licence Application Form", description: "Official form for applying for a new trade licence or renewing an existing one with the relevant authority.", type: "DOCX", access: "public" },
      { title: "Employee Contract Template — Retail", description: "A compliant employment contract template tailored for retail staff in Seychelles, reviewed by a legal advisor.", type: "DOCX", access: "member" },
      { title: "Daily Hygiene Inspection Checklist", description: "A printable daily checklist for store managers to verify hygiene, temperature logs, and cleanliness standards.", type: "PDF", access: "member" },
      { title: "Pest Control Service Record Template", description: "Log template for recording pest control visits, treatment types, and inspector notes for compliance purposes.", type: "DOCX", access: "member" },
    ],
  },
  {
    id: "guides",
    icon: BookOpen,
    title: "Guides & Best Practices",
    description: "Practical guides written for Seychelles retailers on running a compliant and profitable business.",
    resources: [
      { title: "Getting Started: Opening a Retail Store in Seychelles", description: "A step-by-step guide covering permits, fit-out requirements, staffing, and the first 90 days of trading.", type: "PDF", access: "public" },
      { title: "Food Retail Best Practice Guide", description: "Guidance on stock rotation, expiry monitoring, cold-chain compliance, and shelf labelling standards.", type: "PDF", access: "member" },
      { title: "Waste Management for Retailers", description: "How to set up a compliant waste management schedule, work with licensed providers, and pass inspections.", type: "PDF", access: "member" },
      { title: "Handling Damaged & Recalled Goods", description: "Procedures for removing damaged products from sale, documenting losses, and notifying the relevant authorities.", type: "PDF", access: "member" },
    ],
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Training Materials",
    description: "Slide decks, videos, and workshop materials from past RAS training sessions.",
    resources: [
      { title: "Food Safety Awareness Training — Slides", description: "Presentation slides from the RAS Food Safety workshop covering basic hygiene, storage, and expiry management.", type: "PDF", access: "member" },
      { title: "Customer Service Excellence Workshop", description: "Materials and exercises from the RAS customer service training designed for frontline retail staff.", type: "PDF", access: "member" },
      { title: "Compliance Basics for New Retailers", description: "Introductory training package covering the key laws, inspections, and documentation every retailer must know.", type: "PDF", access: "public" },
      { title: "POS & Inventory Management Tips", description: "Best practices for managing stock, running end-of-day reconciliations, and avoiding common inventory errors.", type: "PDF", access: "member" },
    ],
  },
  {
    id: "links",
    icon: Building2,
    title: "Government Links",
    description: "Direct links to the government departments and agencies relevant to Seychelles retailers.",
    resources: [
      { title: "Seychelles Revenue Commission", description: "The authority for tax registration, business licences, and fiscal compliance for all Seychelles businesses.", type: "Link", access: "public" },
      { title: "Public Health Authority", description: "The body responsible for food safety inspections, health certificates, and public health compliance.", type: "Link", access: "public" },
      { title: "Seychelles Bureau of Standards", description: "Standards authority for product quality, labelling requirements, and certification processes.", type: "Link", access: "public" },
      { title: "Labour Commissioner's Office", description: "Official resource for employment disputes, worker rights, and employer obligations under Seychelles law.", type: "Link", access: "public" },
    ],
  },
];

function ResourceCategory({ category, showAll }: Readonly<{ category: typeof categories[0]; showAll: boolean }>) {
  const visibleResources = showAll ? category.resources : category.resources.filter(r => r.access === "public").slice(0, 2);

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
        {visibleResources.map((resource) => (
          <Card key={resource.title} className="bg-white border border-[#0D3572]/10 shadow-sm hover:shadow-md transition-shadow">
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
              {resource.access === "public" || showAll ? (
                <Button size="sm" variant="outline" className="self-start border-[#0D3572]/30 text-[#0D3572] hover:bg-[#0D3572] hover:text-white gap-1.5">
                  {resource.type === "Link" ? (
                    <><ExternalLink className="h-3.5 w-3.5" />Visit</>
                  ) : (
                    <><Download className="h-3.5 w-3.5" />Download</>
                  )}
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    Members only —{" "}
                    <Link href="/join" className="text-[#C9A227] hover:underline">Join today</Link>
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
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
      <section className="bg-[#0D3572] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">Resources</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Retail Resource Library</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Laws, forms, guides, training materials, and government links — everything a
              Seychelles retailer needs in one place.{" "}
              {isLoggedIn ? "Full access unlocked." : "Join RAS for complete access."}
            </p>
          </div>
        </div>
      </section>

      {/* Member banner for guests */}
      {!isLoggedIn && (
        <div className="bg-[#C9A227]/15 border-b border-[#C9A227]/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-[#0D3572]">
              <Lock className="h-4 w-4 text-[#C9A227]" />
              <span>Previewing <strong>1 of 5 categories</strong> — join RAS to unlock all laws, forms, guides & training materials.</span>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href="/sign-in">
                <Button size="sm" variant="outline" className="border-[#0D3572]/40 text-[#0D3572]">Sign In</Button>
              </Link>
              <Link href="/join">
                <Button size="sm" className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0">Join Today</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Resource Categories */}
      <section className="py-12 bg-[#EFF4FF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {isLoggedIn ? (
            categories.map((category) => (
              <ResourceCategory key={category.id} category={category} showAll={true} />
            ))
          ) : (
            <>
              {/* Teaser: first category only */}
              <ResourceCategory category={categories[0]} showAll={false} />

              {/* Gate */}
              <ContentGate page="resources" />
            </>
          )}
        </div>
      </section>

    </div>
  );
}
