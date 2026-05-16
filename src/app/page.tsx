import Link from "next/link";
import {
  BookOpen,
  Shield,
  Users,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  FileText,
  Bug,
  Scale,
  ClipboardList,
  Star,
  Building2,
  HeartHandshake,
  Truck,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BookOpen,
    title: "Monthly Newsletters",
    description:
      "Stay informed with curated retail news, regulatory updates, and market insights delivered each month to all members.",
  },
  {
    icon: Shield,
    title: "Retail Compliance Hub",
    description:
      "Access a centralised library of Seychelles laws, public health guidelines, and food safety standards relevant to your business.",
  },
  {
    icon: ClipboardList,
    title: "Store Standards & Cleanliness",
    description:
      "Practical checklists and guidance for maintaining a hygienic, well-presented retail environment that passes inspections.",
  },
  {
    icon: Bug,
    title: "Pest Control Services",
    description:
      "Vetted pest management providers and guidance on scheduling treatments, maintaining records, and compliance documentation.",
  },
  {
    icon: Scale,
    title: "Employee & Legal Support",
    description:
      "Templates, guidance notes, and referrals to help you navigate employment contracts, disputes, and labour regulations.",
  },
  {
    icon: FileText,
    title: "Permits & Applications Support",
    description:
      "Step-by-step help with trade licences, health certificates, import permits, and other regulatory applications.",
  },
];

const benefits = [
  "Direct access to government departments on your behalf, saving you time and reducing bureaucracy.",
  "Regular compliance updates so your business always meets Seychelles public health and trade standards.",
  "A trusted network of vetted service providers — from cleaning and pest control to IT and refrigeration.",
  "Legal and employment guidance to protect your business and your staff relationships.",
  "A unified voice in policy discussions with government ministries and regulatory bodies.",
];

const contactStrips = [
  {
    icon: Building2,
    title: "Government Departments",
    items: [
      "Ministry of Habitat, Infrastructure & Land Transport",
      "Seychelles Revenue Commission",
      "Public Health Authority",
      "Seychelles Bureau of Standards",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Business Support Services",
    items: [
      "Seychelles Chamber of Commerce & Industry",
      "Small Enterprise Promotion Agency (SENPA)",
      "Development Bank of Seychelles",
      "Enterprise Seychelles Agency",
    ],
  },
  {
    icon: Truck,
    title: "Essential Service Providers",
    items: [
      "Waste Management Company",
      "Seychelles Utilities Corporation",
      "Air Seychelles Cargo",
      "Seychelles Ports Authority",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Report & Get Support",
    items: [
      "Consumer Protection Unit",
      "Environmental Protection Agency",
      "Labour Commissioner's Office",
      "RAS Member Helpline: +248 4 323 343",
    ],
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-[#0D3572] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#C9A227]/20 px-4 py-1.5 text-[#C9A227] text-sm font-medium mb-6">
              <Star className="h-3.5 w-3.5" />
              Fair Service to Our Nation
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Your All-In-One Platform for{" "}
              <span className="text-[#C9A227]">Retail Success</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              The Retailers Association of Seychelles empowers retail business owners across Mahé
              and the islands with compliance tools, expert resources, and a strong community voice.
              Grow your business with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/join">
                <Button
                  size="lg"
                  className="bg-[#C9A227] text-[#0D3572] hover:bg-[#b8911f] font-bold border-0 px-8 h-12 text-base"
                >
                  Join Now
                </Button>
              </Link>
              <Link href="/resources">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 hover:text-white px-8 h-12 text-base"
                >
                  Explore Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B8A4B] via-[#C9A227] to-[#1B8A4B]" />
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "200+", label: "Members" },
              { value: "15+", label: "Years of Service" },
              { value: "100+", label: "Resources" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-[#0D3572]">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 md:py-24 bg-[#EFF4FF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D3572] mb-4">
              Everything Your Retail Business Needs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From compliance to community, RAS provides the tools and support that Seychelles
              retailers rely on every day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D3572]/10 mb-2">
                    <feature.icon className="h-6 w-6 text-[#0D3572]" />
                  </div>
                  <CardTitle className="text-[#0D3572] text-base font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join RAS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0D3572] mb-6">
                Why Join RAS?
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Membership in the Retailers Association of Seychelles puts you at the heart of the
                country's retail community — with the support, knowledge, and connections to grow
                a compliant and thriving business.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#1B8A4B] mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/join">
                  <Button className="bg-[#0D3572] hover:bg-[#0a2a5a] text-white font-semibold border-0 px-6">
                    Become a Member
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl bg-[#0D3572] p-8 text-white">
                <div className="mb-6">
                  <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">
                    Member Testimonial
                  </p>
                  <p className="text-lg leading-relaxed text-white/90">
                    "RAS has been indispensable for our store. The compliance resources alone saved
                    us countless hours navigating public health requirements. And the network of
                    service providers is top-notch."
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-white/20 pt-4">
                  <div className="h-10 w-10 rounded-full bg-[#C9A227]/30 flex items-center justify-center">
                    <Users className="h-5 w-5 text-[#C9A227]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">RAS Member</p>
                    <p className="text-xs text-white/60">Retail Store Owner, Victoria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts strip */}
      <section className="py-16 bg-[#EFF4FF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0D3572] mb-3">
              Key Contacts for Seychelles Retailers
            </h2>
            <p className="text-gray-600 text-sm">
              We help you connect with the right departments and service providers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactStrips.map((strip) => (
              <div
                key={strip.title}
                className="bg-white rounded-xl p-5 border border-[#0D3572]/10 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <strip.icon className="h-5 w-5 text-[#C9A227]" />
                  <h3 className="font-semibold text-[#0D3572] text-sm">{strip.title}</h3>
                </div>
                <ul className="space-y-2">
                  {strip.items.map((item) => (
                    <li key={item} className="text-xs text-gray-600 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick contact bar */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 text-sm">
            <a
              href="tel:+2484323343"
              className="flex items-center gap-2 text-[#0D3572] hover:text-[#C9A227] transition-colors font-medium"
            >
              <Phone className="h-4 w-4" />
              +248 4 323 343
            </a>
            <a
              href="mailto:info@retailers.sc"
              className="flex items-center gap-2 text-[#0D3572] hover:text-[#C9A227] transition-colors font-medium"
            >
              <Mail className="h-4 w-4" />
              info@retailers.sc
            </a>
            <span className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4 text-[#0D3572]" />
              Bois De Rose Avenue, Victoria, Mahé
            </span>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#C9A227] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0D3572] mb-4">
            Ready to grow your business?
          </h2>
          <p className="text-[#0D3572]/80 mb-8 max-w-xl mx-auto">
            Join over 200 retail businesses across Seychelles who rely on RAS for guidance,
            compliance, and community.
          </p>
          <Link href="/join">
            <Button className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 px-10 h-12 text-base font-bold gap-2">
              Join RAS Today
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
