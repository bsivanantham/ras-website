import { auth } from "@clerk/nextjs/server";
import {
  Shield,
  Thermometer,
  AlertTriangle,
  Trash2,
  CheckCircle,
  ExternalLink,
  Phone,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContentGate from "@/components/ContentGate";

const pillars = [
  {
    icon: Shield,
    title: "Health & Safety Guidelines",
    description:
      "Every retail store in Seychelles is required to maintain minimum health and safety standards under the Public Health Act. Regular self-audits are essential.",
    checklist: [
      "Maintain clean and unobstructed entrance and exit pathways at all times",
      "Ensure adequate ventilation, lighting, and temperature control in the store",
      "Display valid trade licence and health certificate in a visible location",
      "Keep a documented first-aid kit stocked and accessible to all staff",
      "Conduct and record monthly fire safety checks (extinguishers, exit signs)",
      "Train all staff on basic food hygiene within the first month of employment",
      "Maintain pest control records with at least quarterly treatment certificates",
    ],
  },
  {
    icon: Thermometer,
    title: "Food Handling Standards",
    description:
      "Retailers selling perishable goods must comply with the Public Health Authority's food handling regulations to prevent contamination and protect public health.",
    checklist: [
      "Store raw and cooked foods separately and at appropriate temperatures",
      "Refrigeration units must maintain 0–4°C; freezers must maintain -18°C or below",
      "Log fridge and freezer temperatures at least twice daily (morning and close)",
      "Never sell products beyond their best-before or use-by date",
      "Label all deli and bulk food items with preparation date and use-by date",
      "Ensure all food handlers possess a valid food handler's certificate",
      "Clean and sanitise all food-contact surfaces at least every four hours",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Expiry Date Monitoring",
    description:
      "Selling expired products is a serious violation that can result in fines, licence suspension, or criminal prosecution. Robust monitoring systems are mandatory.",
    checklist: [
      "Implement a First-In First-Out (FIFO) stock rotation policy across all shelves",
      "Conduct daily spot-checks on high-turnover perishable items",
      "Perform a full shelf expiry audit at minimum once per week",
      "Remove products within 3 days of expiry date and quarantine for return or disposal",
      "Keep a disposal log recording product name, batch, quantity, and date removed",
      "Train staff to check expiry dates when receiving new stock deliveries",
      "Use shelf-edge date stickers for slow-moving items to flag upcoming expirations",
    ],
  },
  {
    icon: Trash2,
    title: "Damaged Goods Procedures",
    description:
      "Damaged, contaminated, or recalled goods must be handled according to a documented procedure to prevent accidental sale and to maintain regulatory compliance.",
    checklist: [
      "Designate a clearly labelled 'Quarantine Zone' for damaged or suspect goods",
      "Remove damaged items from shelves immediately upon discovery",
      "Record all damaged goods in the Damage & Returns Log with photos where possible",
      "Contact the supplier within 24 hours to initiate a return or disposal claim",
      "Follow Public Health Authority guidance for disposal of food-grade waste",
      "For recalled products, notify the Public Health Authority within 24 hours of notification",
      "Brief all staff on the current recall list at weekly team meetings",
    ],
  },
];

const govLinks = [
  { name: "Public Health Authority of Seychelles", description: "Responsible for food safety inspections, health certificates, and enforcement.", url: "#" },
  { name: "Seychelles Bureau of Standards", description: "Sets and enforces product standards, labelling requirements, and certifications.", url: "#" },
  { name: "Environmental Protection Agency", description: "Oversees environmental compliance, waste disposal, and chemical handling.", url: "#" },
  { name: "Labour Commissioner's Office", description: "Handles employment disputes, worker rights, and employer obligations.", url: "#" },
];

function PillarCard({ pillar }: Readonly<{ pillar: typeof pillars[0] }>) {
  return (
    <Card className="bg-white border border-[#0D3572]/10 shadow-sm overflow-hidden">
      <CardHeader className="border-b border-gray-100 bg-[#0D3572]/5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D3572] shrink-0">
            <pillar.icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-[#0D3572] text-lg font-bold">{pillar.title}</CardTitle>
            <CardDescription className="text-gray-600 text-sm mt-1 leading-relaxed">{pillar.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <h4 className="text-sm font-semibold text-[#0D3572] mb-4 uppercase tracking-wide">Compliance Checklist</h4>
        <ul className="space-y-3">
          {pillar.checklist.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-[#1B8A4B] mt-0.5 shrink-0" />
              <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default async function CompliancePage() {
  const { userId } = await auth();
  const isLoggedIn = !!userId;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#0D3572] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">Compliance Hub</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Stay Compliant, Stay Protected</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Navigating Seychelles retail regulations doesn&apos;t have to be complicated. This hub
              covers the four pillars of retail compliance — with practical checklists you can action today.{" "}
              {!isLoggedIn && <span className="text-[#C9A227] font-semibold">Join Retailers Association of Seychelles to unlock all four pillars.</span>}
            </p>
          </div>
        </div>
      </section>


      {/* Intro */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 max-w-3xl">
          <p className="text-gray-700 leading-relaxed">
            The Retailers Association of Seychelles works closely with the Public Health Authority,
            Seychelles Bureau of Standards, and other regulatory bodies to ensure our members always
            have the most current compliance guidance. Use the checklists below to conduct regular
            self-audits and identify any gaps before an official inspection.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 bg-[#EFF4FF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {isLoggedIn ? (
            pillars.map((pillar) => <PillarCard key={pillar.title} pillar={pillar} />)
          ) : (
            <>
              {/* Teaser — first pillar only */}
              <PillarCard pillar={pillars[0]} />
              {/* Gate */}
              <ContentGate page="compliance" />
            </>
          )}
        </div>
      </section>

      {/* Help callout + gov links — members only sections */}
      {isLoggedIn && (
        <>
          <section className="py-10 bg-[#C9A227]/15 border-y border-[#C9A227]/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0D3572] mb-1">Need help with compliance? Contact Retailers Association of Seychelles.</h3>
                  <p className="text-gray-700 text-sm leading-relaxed max-w-xl">
                    Our team can assist with compliance queries, connect you with the right government department, or arrange a compliance review for your store.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Button className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 w-full sm:w-auto pointer-events-none">
                    <Phone className="h-4 w-4" />
                    <a href="tel:+2482521500" className="hover:underline pointer-events-auto">+248 2 521 500</a>
                    <span>/</span>
                    <a href="tel:+2482737273" className="hover:underline pointer-events-auto">+248 2 737 273</a>
                    <span>/</span>
                    <a href="tel:+2482819678" className="hover:underline pointer-events-auto">+248 281 96 78</a>
                  </Button>
                  <a href="mailto:retailersassociationseychelles@gmail.com">
                    <Button variant="outline" className="border-[#0D3572] text-[#0D3572] hover:bg-[#0D3572] hover:text-white gap-2 w-full sm:w-auto">
                      <Mail className="h-4 w-4" /> Email Us
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0D3572] mb-2">Useful Government Links</h2>
                <p className="text-gray-600 text-sm">Direct access to the regulatory bodies that Seychelles retailers interact with most.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {govLinks.map((link) => (
                  <a key={link.name} href={link.url} className="flex items-start gap-4 p-5 rounded-xl border border-[#0D3572]/10 bg-[#EFF4FF] hover:bg-[#e3ecff] hover:border-[#0D3572]/30 transition-colors group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0D3572] shrink-0">
                      <ExternalLink className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#0D3572] text-sm group-hover:text-[#C9A227] transition-colors">{link.name}</p>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{link.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

    </div>
  );
}
