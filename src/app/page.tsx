"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Shield,
  CheckCircle,
  FileText,
  Bug,
  Scale,
  ClipboardList,
  ArrowRight,
  Pencil,
} from "lucide-react";
import AdminBottomSheet from "@/components/admin/AdminBottomSheet";
import AnnouncementsEditor from "@/components/admin/AnnouncementsEditor";
import HeroCTA from "@/components/HeroCTA";
import AnnouncementsCarousel, { publicAnnouncements } from "@/components/AnnouncementsCarousel";
import type { StoredAnnouncement } from "@/lib/kv";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SeychellesFlag from "@/components/SeychellesFlag";
import { useLanguage } from "@/components/LanguageProvider";
import { useAuth, useUser } from "@clerk/nextjs";

const featureIcons = [BookOpen, Shield, ClipboardList, Bug, Scale, FileText];


export default function HomePage() {
  const { t } = useLanguage();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const firstName = user?.firstName ?? "Member";
  const userIsAdmin = (user?.publicMetadata as { role?: string })?.role === "super_admin";
  const [kvItems, setKvItems] = useState<StoredAnnouncement[] | undefined>(undefined);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    fetch("/api/announcements")
      .then((r) => r.json())
      .then((d: { data: StoredAnnouncement[] | null }) => {
        if (d.data?.length) setKvItems(d.data);
      })
      .catch(() => {});
  }, [isSignedIn]);

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
            <HeroCTA />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B8A4B] via-[#C9A227] to-[#1B8A4B]" />
      </section>

      {/* Personalised welcome bar — members only */}
      {isSignedIn && (
        <div className="bg-[#1B8A4B] text-white py-3">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-center sm:text-left">
              Welcome back, <span className="font-bold">{firstName}</span>! Your latest announcements and resources are below.
            </p>
          </div>
        </div>
      )}

      {/* Announcements — KV data when available, falls back to hardcoded */}
      {isSignedIn
        ? <AnnouncementsCarousel kvItems={kvItems} />
        : <AnnouncementsCarousel kvItems={kvItems?.filter((a) => a.access === "public")} items={publicAnnouncements} label="From RAS" />
      }

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            {[
              { value: "370+", label: t.stats.members },
              { value: "15+", label: t.stats.years },
              { value: "100+", label: t.stats.resources },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D3572]">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brochure + Features — guests only */}
      {!isSignedIn && (
        <>
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
        </>
      )}

      {/* Why Join RAS — guests only */}
      {!isSignedIn && (
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
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
          </div>
        </section>
      )}

      {userIsAdmin && (
        <>
          <button
            onClick={() => setAdminOpen(true)}
            className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#0D3572] text-white shadow-lg hover:bg-[#0a2a5e] transition-colors flex items-center justify-center"
            aria-label="Manage announcements"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <AdminBottomSheet open={adminOpen} onClose={() => setAdminOpen(false)} title="Manage Announcements">
            <AnnouncementsEditor initial={kvItems ?? []} />
          </AdminBottomSheet>
        </>
      )}
    </div>
  );
}
