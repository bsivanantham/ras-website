import Image from "next/image";
import { Users, Target, Heart, TrendingUp, Globe, UserCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SeychellesFlag from "@/components/SeychellesFlag";

const committee = [
  { role: "Chairman", name: "Muthukumaran", highlight: true },
  { role: "Vice Chairman", name: "Raj Pradeep", highlight: true },
  { role: "Secretary", name: "Bala Kumaran", highlight: false },
  { role: "Asst. Secretary", name: "Harish", highlight: false },
  { role: "Treasurer", name: "Sekaar Kumar", highlight: false },
  { role: "Asst. Treasurer", name: "Manikandan", highlight: false },
  { role: "Committee Member", name: "Divya", highlight: false },
  { role: "Committee Member", name: "Subramanian Vijay", highlight: false },
  { role: "Committee Member", name: "Vengadanarayanan", highlight: false },
  { role: "Committee Member", name: "Ganeshkumar", highlight: false },
  { role: "Committee Member", name: "Karthikeyan", highlight: false },
];

const values = [
  {
    icon: Heart,
    title: "Fair Service",
    description:
      "We advocate for fairness in trade, pricing, and regulatory treatment for all retail businesses across Seychelles, regardless of size.",
  },
  {
    icon: Target,
    title: "Compliance",
    description:
      "We uphold and champion adherence to Seychelles laws, food safety standards, and public health guidelines that protect consumers and businesses alike.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description:
      "We invest in the professional development and business growth of our members through training, resources, and access to support networks.",
  },
  {
    icon: Globe,
    title: "Community",
    description:
      "We foster a strong, connected retail community across Mahé and the islands, where members support one another and share knowledge.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#0D3572] text-white py-16 md:py-24 relative overflow-hidden">
        {/* Flag accent top-right */}
        <div className="absolute top-0 right-0 opacity-20">
          <SeychellesFlag width={280} height={187} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <SeychellesFlag width={40} height={27} className="rounded-sm shadow" />
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider">
              About Us
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl">
            Championing Retail Excellence in Seychelles
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
            The Retailers Association of Seychelles (RAS) is the authoritative voice for
            retail businesses across the islands — connecting members with government,
            service providers, and each other.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">
                Our Mission
              </p>
              <h2 className="text-3xl font-bold text-[#0D3572] mb-6">
                Fair Service to Our Nation
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                RAS exists to represent, support, and empower retail businesses across Seychelles.
                We work to ensure that every retailer — from the corner shop in Mahé to the
                multi-branch operator — has access to the guidance, resources, and advocacy they
                need to operate legally, ethically, and profitably.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is underpinned by a simple belief: when retailers thrive, communities
                thrive. We act as a bridge between business owners and the government departments,
                service providers, and regulatory bodies that shape the operating environment.
              </p>
            </div>
            <div className="bg-[#EFF4FF] rounded-2xl p-8">
              <Users className="h-10 w-10 text-[#0D3572] mb-4" />
              <h3 className="text-xl font-bold text-[#0D3572] mb-4">What We Do</h3>
              <ul className="space-y-3">
                {[
                  "Represent members in dialogue with government ministries and regulators",
                  "Provide compliance guidance on health, safety, and trade laws",
                  "Curate a trusted directory of vetted service providers",
                  "Publish monthly newsletters and retail industry updates",
                  "Support members with permits, licences, and applications",
                  "Organise training sessions and community events",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-[#C9A227] font-bold mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-[#EFF4FF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">
              Our Story
            </p>
            <h2 className="text-3xl font-bold text-[#0D3572] mb-6">
              Built by Retailers, for Retailers
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The Retailers Association of Seychelles was founded by a group of passionate retail
                business owners who recognised a critical gap: Seychelles retailers lacked a unified
                platform to navigate the increasingly complex regulatory environment, access
                affordable services, and speak with one voice to government.
              </p>
              <p>
                Since our establishment, RAS has grown into one of the most active business
                associations in Seychelles, with a membership spanning grocery stores, pharmacies,
                hardware outlets, clothing retailers, importers, and wholesalers across Mahé and
                the outer islands.
              </p>
              <p>
                Over the years, we have successfully advocated for fairer licensing processes,
                clearer public health guidelines, and better access to waste management and pest
                control services for our members. We have also built a comprehensive resources
                library that helps retailers stay compliant without the need for expensive
                professional advice.
              </p>
              <p>
                Today, RAS serves as the definitive support network for Seychelles retailers —
                connecting businesses with the people, information, and services they need to
                grow responsibly and sustainably.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Committee 2026 */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <SeychellesFlag width={32} height={21} className="rounded-sm shadow-sm" />
              <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider">
                Leadership
              </p>
              <SeychellesFlag width={32} height={21} className="rounded-sm shadow-sm" />
            </div>
            <h2 className="text-3xl font-bold text-[#0D3572] mb-4">RAS Committee 2026</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our elected committee brings together experienced retail professionals committed to
              serving the membership and advancing the interests of Seychelles retailers.
            </p>
          </div>

          {/* Committee group photo */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg relative">
            <Image
              src="/images/committee-2026.jpg"
              alt="RAS Committee 2026 — group photo"
              width={1200}
              height={600}
              className="w-full object-cover max-h-[480px]"
              priority
            />
          </div>

          {/* Committee cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {committee.map((member) => (
              <Card
                key={`${member.role}-${member.name}`}
                className={`border text-center transition-shadow hover:shadow-md ${
                  member.highlight
                    ? "border-[#C9A227] bg-[#0D3572] text-white"
                    : "border-[#0D3572]/10 bg-white"
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-3">
                    <div
                      className={`h-16 w-16 rounded-full flex items-center justify-center ${
                        member.highlight ? "bg-[#C9A227]/20" : "bg-[#0D3572]/10"
                      }`}
                    >
                      <UserCircle2
                        className={`h-10 w-10 ${
                          member.highlight ? "text-[#C9A227]" : "text-[#0D3572]/60"
                        }`}
                      />
                    </div>
                  </div>
                  <CardTitle
                    className={`text-sm font-bold leading-tight ${
                      member.highlight ? "text-white" : "text-[#0D3572]"
                    }`}
                  >
                    {member.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-xs font-semibold uppercase tracking-wide ${
                      member.highlight ? "text-[#C9A227]" : "text-[#C9A227]"
                    }`}
                  >
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#0D3572] text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 opacity-10">
          <SeychellesFlag width={300} height={200} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">
              Our Values
            </p>
            <h2 className="text-3xl font-bold mb-4">What We Stand For</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              These four values guide every decision we make and every service we provide to
              the retail community of Seychelles.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A227]/20 mb-4">
                  <value.icon className="h-6 w-6 text-[#C9A227]" />
                </div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
