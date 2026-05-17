"use client";

import Link from "next/link";
import Image from "next/image";
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
  Building2,
  HeartHandshake,
  Truck,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SeychellesFlag from "@/components/SeychellesFlag";
import { useLanguage } from "@/components/LanguageProvider";

const featureIcons = [BookOpen, Shield, ClipboardList, Bug, Scale, FileText];

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
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-[#0D3572] text-white overflow-hidden min-h-[600px] flex items-center">
        <Image
          src="/images/hero-bg.jpg"
          alt="Seychelles retail store"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#0D3572]/80" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute top-0 right-0 opacity-15 pointer-events-none">
          <SeychellesFlag width={420} height={280} />
        </div>
        <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#C9A227]/20 px-4 py-1.5 text-[#C9A227] text-sm font-medium mb-6">
              <SeychellesFlag width={18} height={12} className="rounded-sm" />
              {t.hero.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              {t.hero.headingPre}{" "}
              <span className="text-[#C9A227]">{t.hero.headingHighlight}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              {t.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/join">
                <Button
                  size="lg"
                  className="bg-[#C9A227] text-[#0D3572] hover:bg-[#b8911f] font-bold border-0 px-8 h-12 text-base"
                >
                  {t.hero.joinNow}
                </Button>
              </Link>
              <Link href="/resources">
                <Button
                  size="lg"
                  className="bg-transparent border border-white/60 text-white hover:bg-white/15 hover:border-white font-semibold px-8 h-12 text-base"
                >
                  {t.hero.exploreResources}
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
              { value: "355", label: t.stats.members },
              { value: "15+", label: t.stats.years },
              { value: "100+", label: t.stats.resources },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-[#0D3572]">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brochure / Platform preview */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <SeychellesFlag width={28} height={19} className="rounded-sm shadow-sm" />
                <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider">
                  {t.partner.badge}
                </p>
              </div>
              <h2 className="text-3xl font-bold text-[#0D3572] mb-4 whitespace-pre-line">
                {t.partner.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{t.partner.desc}</p>
              <div className="space-y-3">
                {t.partner.benefits.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-[#1B8A4B] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/join">
                  <button className="inline-flex items-center gap-2 bg-[#0D3572] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0a2a5e] transition-colors text-sm">
                    {t.partner.button} <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/brochure.jpg"
                alt="RAS Platform — Retail Support Brochure"
                width={800}
                height={560}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 md:py-24 bg-[#EFF4FF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D3572] mb-4">
              {t.features.sectionTitle}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.features.sectionDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((feature, i) => {
              const Icon = featureIcons[i];
              return (
                <Card key={feature.title} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D3572]/10 mb-2">
                      <Icon className="h-6 w-6 text-[#0D3572]" />
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Join RAS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0D3572] mb-6">
                {t.whyJoin.title}
              </h2>
              <ul className="space-y-4">
                {t.whyJoin.items.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#1B8A4B] mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/join">
                  <Button className="bg-[#0D3572] hover:bg-[#0a2a5a] text-white font-semibold border-0 px-6">
                    {t.cta.button}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-[#0D3572] p-8 text-white">
              <div className="mb-6">
                <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">
                  Member Testimonial
                </p>
                <p className="text-lg leading-relaxed text-white/90">
                  &ldquo;RAS has been indispensable for our store. The compliance resources alone saved
                  us countless hours navigating public health requirements. And the network of
                  service providers is top-notch.&rdquo;
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
              <div key={strip.title} className="bg-white rounded-xl p-5 border border-[#0D3572]/10 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <strip.icon className="h-5 w-5 text-[#C9A227]" />
                  <h3 className="font-semibold text-[#0D3572] text-sm">{strip.title}</h3>
                </div>
                <ul className="space-y-2">
                  {strip.items.map((item) => (
                    <li key={item} className="text-xs text-gray-600 leading-relaxed">{item}</li>
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
            <a href="tel:+2484323343" className="flex items-center gap-2 text-[#0D3572] hover:text-[#C9A227] transition-colors font-medium">
              <Phone className="h-4 w-4" />
              +248 4 323 343
            </a>
            <a href="mailto:info@retailers.sc" className="flex items-center gap-2 text-[#0D3572] hover:text-[#C9A227] transition-colors font-medium">
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
          <h2 className="text-2xl md:text-3xl font-bold text-[#0D3572] mb-4">{t.cta.title}</h2>
          <p className="text-[#0D3572]/80 mb-8 max-w-xl mx-auto">{t.cta.desc}</p>
          <Link href="/join">
            <Button className="bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 px-10 h-12 text-base font-bold gap-2">
              {t.cta.button}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
