import Image from "next/image";
import { Users, Target, Heart, TrendingUp, Globe, UserCircle2, Phone, Lock, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SeychellesFlag from "@/components/SeychellesFlag";
import { auth } from "@clerk/nextjs/server";

const committee = [
  { role: "Chairman", name: "MuthuKumaran", phone: "2521500", email: "chairman@ras.sc", highlight: true },
  { role: "Vice Chairman", name: "Raj Pradeep", phone: "2737273", email: "admin@ras.sc", highlight: true },
  { role: "Secretary", name: "Bala Kumaran", phone: "2819678", email: "secretary@ras.sc", highlight: false },
  { role: "Asst. Secretary", name: "Harish", phone: "2817817", email: null, highlight: false },
  { role: "Treasurer", name: "Sekaar Kumar", phone: "2727374", email: null, highlight: false },
  { role: "Asst. Treasurer", name: "Manikandan", phone: "2723873", email: null, highlight: false },
  { role: "Committee Member", name: "Divya", phone: "2808999", email: null, highlight: false },
  { role: "Committee Member", name: "Subramanian Vijay", phone: "2722292", email: null, highlight: false },
  { role: "Committee Member", name: "Vengadanarayanan", phone: "2763838", email: null, highlight: false },
  { role: "Committee Member", name: "Ganeshkumar", phone: "2833366", email: null, highlight: false },
  { role: "Committee Member", name: "Karthikeyan", phone: "2500707", email: null, highlight: false },
  { role: "Ex Officio", name: "Shanmugam", phone: "2725077", email: null, highlight: false },
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

export default async function AboutPage() {
  const { userId } = await auth();
  const isLoggedIn = !!userId;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-[#0D3572] text-white overflow-hidden min-h-[320px] sm:min-h-[380px] flex items-center">
        <Image src="/images/hero-about.jpg" alt="Retailers Association of Seychelles team meeting" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-[#0D3572]/85" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="absolute top-0 right-0 opacity-15 pointer-events-none">
          <SeychellesFlag width={420} height={280} />
        </div>
        <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex items-center gap-3 mb-4">
            <SeychellesFlag width={40} height={27} className="rounded-sm shadow" />
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider">About Us</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl">
            Championing Retail Excellence in Seychelles
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
            The Retailers Association of Seychelles is the authoritative voice for
            retail businesses across the islands — connecting members with government,
            service providers, and each other.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B8A4B] via-[#C9A227] to-[#1B8A4B]" />
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
                Retailers Association of Seychelles exists to represent, support, and empower retail businesses across Seychelles.
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

      {/* History of RAS */}
      <section className="py-16 bg-[#EFF4FF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">
              Our History
            </p>
            <h2 className="text-3xl font-bold text-[#0D3572] mb-8">
              History of Retailers Association of Seychelles
            </h2>

            {/* Timeline */}
            <div className="space-y-8">
              {/* 2010 — Founded */}
              <div className="flex gap-4 sm:gap-6">
                <div className="flex flex-col items-center shrink-0">
                  <div className="h-10 w-10 rounded-full bg-[#0D3572] flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-extrabold">2010</span>
                  </div>
                  <div className="w-0.5 bg-[#0D3572]/20 flex-1 mt-2" />
                </div>
                <div className="pb-8">
                  <h3 className="text-[#0D3572] font-bold text-base mb-2">Association Founded</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    In the year 2010, a small group of dedicated retailers found it necessary to form
                    an association. Its main objectives were:
                  </p>
                  <ol className="space-y-1.5 list-none">
                    {[
                      { n: 1, text: "To maintain high standard of service to consumers." },
                      { n: 2, text: "To protect, safeguard and represent the interests of retailers." },
                      { n: 3, text: "To foster good will and understanding amongst its members." },
                      { n: 4, text: "To ensure good relationship with consumers, suppliers and government agencies." },
                    ].map(({ n, text }) => (
                      <li key={n} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="h-5 w-5 rounded-full bg-[#C9A227] text-white text-xs flex items-center justify-center shrink-0 font-bold mt-0.5">
                          {n}
                        </span>
                        {text}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* 2011 — Registered */}
              <div className="flex gap-4 sm:gap-6">
                <div className="flex flex-col items-center shrink-0">
                  <div className="h-10 w-10 rounded-full bg-[#0D3572] flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-extrabold">2011</span>
                  </div>
                  <div className="w-0.5 bg-[#0D3572]/20 flex-1 mt-2" />
                </div>
                <div className="pb-8">
                  <h3 className="text-[#0D3572] font-bold text-base mb-2">Officially Registered</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our constitution was drafted and the Retailers Association was registered in the
                    year 2011. Its first chairman was{" "}
                    <strong className="text-[#0D3572]">Mr. Karumbairam Cholarajan</strong>.
                  </p>
                </div>
              </div>

              {/* Growth */}
              <div className="flex gap-4 sm:gap-6">
                <div className="flex flex-col items-center shrink-0">
                  <div className="h-10 w-10 rounded-full bg-[#C9A227] flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-extrabold">370+</span>
                  </div>
                  <div className="w-0.5 bg-[#0D3572]/20 flex-1 mt-2" />
                </div>
                <div className="pb-8">
                  <h3 className="text-[#0D3572] font-bold text-base mb-2">Growing Membership</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    The association enrolled 100 members in its first year. To date our membership
                    has grown to over <strong className="text-[#0D3572]">370 members</strong>. Most
                    members are retailers from the grocery sector from Mahé, Praslin, and La Digue.
                  </p>
                </div>
              </div>

              {/* Today */}
              <div className="flex gap-4 sm:gap-6">
                <div className="flex flex-col items-center shrink-0">
                  <div className="h-10 w-10 rounded-full bg-[#0D3572] flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-extrabold">Now</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#0D3572] font-bold text-base mb-2">Strong &amp; United</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Over the years, the association has had its ups and downs. However, the unity of
                    our members and the support of our esteem customers and suppliers and the
                    cooperation of government agencies have enabled the association to overcome the
                    difficulties which affected the smooth functioning of our trade.
                  </p>
                </div>
              </div>
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
            <h2 className="text-3xl font-bold text-[#0D3572] mb-4">Retailers Association of Seychelles — Committee 2026</h2>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
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
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#C9A227]">
                    {member.role}
                  </p>
                  {isLoggedIn ? (
                    <div className="flex flex-col items-center gap-1 mt-2">
                      <a
                        href={`tel:+248${member.phone}`}
                        className="flex items-center justify-center gap-1 text-xs text-[#C9A227] hover:underline"
                      >
                        <Phone className="h-3 w-3" /> {member.phone}
                      </a>
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center justify-center gap-1 text-xs text-[#C9A227] hover:underline break-all"
                        >
                          <Mail className="h-3 w-3 shrink-0" /> {member.email}
                        </a>
                      )}
                    </div>
                  ) : (
                    <p className="flex items-center justify-center gap-1 text-xs mt-2 text-gray-400 italic">
                      <Lock className="h-3 w-3" /> Members only
                    </p>
                  )}
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
