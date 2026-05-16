"use client";

import { useState } from "react";
import { CheckCircle, Users, Star, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const benefits = [
  "Access to the full RAS Resource Library — laws, forms, guides, and training materials",
  "Monthly newsletters with retail industry news, regulatory updates, and member spotlights",
  "Direct representation in government meetings and policy consultations",
  "Priority listing in the RAS Service Provider Directory",
  "Compliance guidance and self-audit checklists for all four pillars of retail compliance",
  "Legal and employment contract templates prepared by qualified advisors",
  "Pest control, waste management, and cleaning service referrals at preferential rates",
  "Access to the Member Dashboard with personalised resources and renewal tracking",
  "Invitations to RAS events, workshops, and training sessions",
  "A recognised RAS Membership Certificate to display in your store",
];

const businessTypes = [
  "Retail (General Merchandise)",
  "Grocery / Supermarket",
  "Pharmacy / Health",
  "Hardware / Building Materials",
  "Clothing & Textiles",
  "Electronics",
  "Import / Export",
  "Wholesale",
  "Food & Beverage",
  "Other",
];

const hearAbout = [
  "Existing RAS Member",
  "Government Department",
  "Social Media (Facebook)",
  "Word of Mouth",
  "Internet Search",
  "RAS Newsletter",
  "Newspaper / Radio",
  "Other",
];

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    businessType: "",
    phone: "",
    email: "",
    address: "",
    hearAbout: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#0D3572] text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#C9A227]/20 px-4 py-1.5 text-[#C9A227] text-sm font-medium mb-6">
              <Star className="h-3.5 w-3.5" />
              Fair Service to Our Nation
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Become a RAS Member
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Join over 200 retail businesses across Seychelles and gain access to compliance
              tools, expert resources, and a community that advocates for your success.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits + Tier */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Benefits list */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#0D3572] mb-6">
                Membership Benefits
              </h2>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#1B8A4B] mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Membership Tier card */}
            <div>
              <Card className="bg-[#0D3572] text-white border-0 shadow-xl sticky top-24">
                <CardHeader className="border-b border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-5 w-5 text-[#C9A227]" />
                    <span className="text-[#C9A227] text-sm font-semibold uppercase tracking-wide">
                      Annual Membership
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">
                    Single Tier
                  </CardTitle>
                  <p className="text-white/70 text-sm mt-1">
                    One membership, full access to all RAS services and resources.
                  </p>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <p className="text-[#C9A227] text-3xl font-bold">SCR</p>
                    <p className="text-white/70 text-sm mt-1">
                      Contact RAS for annual pricing
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Full Resource Library access",
                      "Monthly newsletter",
                      "Compliance checklists",
                      "Member Dashboard",
                      "Event invitations",
                      "RAS Membership Certificate",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                        <CheckCircle className="h-3.5 w-3.5 text-[#C9A227] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 border-t border-white/20 pt-4">
                    <Clock className="h-4 w-4 text-[#C9A227] shrink-0" />
                    <p className="text-xs text-white/60">
                      Our team will contact you within 2 business days of your application.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-[#EFF4FF]" id="apply">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0D3572] mb-3">
                Membership Application
              </h2>
              <p className="text-gray-600">
                Complete the form below and our team will be in touch within 2 business days.
              </p>
            </div>

            <Card className="bg-white border border-[#0D3572]/10 shadow-sm">
              <CardContent className="pt-6">
                {submitted ? (
                  <div className="flex flex-col items-center text-center py-10 gap-4">
                    <CheckCircle className="h-16 w-16 text-[#1B8A4B]" />
                    <h3 className="text-2xl font-bold text-[#0D3572]">
                      Application Submitted!
                    </h3>
                    <p className="text-gray-600 leading-relaxed max-w-sm">
                      Thank you for applying to join the Retailers Association of Seychelles.
                      Our team will review your application and contact you within{" "}
                      <strong>2 business days</strong>.
                    </p>
                    <p className="text-sm text-gray-500">
                      Questions? Call us on{" "}
                      <a href="tel:+2484323343" className="text-[#C9A227] hover:underline">
                        +248 4 323 343
                      </a>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                        Business Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={form.businessName}
                        onChange={handleChange}
                        placeholder="Your store or company name"
                        required
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="ownerName" className="text-sm font-medium text-gray-700">
                        Owner / Proprietor Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="ownerName"
                        name="ownerName"
                        value={form.ownerName}
                        onChange={handleChange}
                        placeholder="Full name of the business owner"
                        required
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="businessType" className="text-sm font-medium text-gray-700">
                        Business Type <span className="text-red-500">*</span>
                      </Label>
                      <select
                        id="businessType"
                        name="businessType"
                        value={form.businessType}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227]"
                      >
                        <option value="">Select business type...</option>
                        {businessTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+248 4 XXX XXX"
                          required
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className="border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                        Business Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Street address, district, island"
                        required
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="hearAbout" className="text-sm font-medium text-gray-700">
                        How did you hear about us?
                      </Label>
                      <select
                        id="hearAbout"
                        name="hearAbout"
                        value={form.hearAbout}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227]"
                      >
                        <option value="">Select an option...</option>
                        {hearAbout.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 font-bold h-11 text-base"
                      >
                        Submit Application
                      </Button>
                      <p className="text-xs text-center text-gray-500 mt-3">
                        Our team will contact you within 2 business days to confirm your
                        membership and provide payment details.
                      </p>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
