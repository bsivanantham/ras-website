"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const subjects = [
  "General Enquiry",
  "Membership Application",
  "Compliance Question",
  "Service Provider Listing",
  "Resource Request",
  "Complaint or Concern",
  "Media & Press",
  "Other",
];

const WEB3FORMS_KEY = "a26361ba-bd5f-418b-a4dd-990c9accfe92";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessName: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const data = new FormData();
      data.append("access_key", WEB3FORMS_KEY);
      data.append("subject", `RAS Contact: ${form.subject} — ${form.name}`);
      data.append("from_name", "RAS Website");
      data.append("Name", form.name);
      data.append("Email", form.email);
      data.append("Business Name", form.businessName || "Not provided");
      data.append("Subject", form.subject);
      data.append("Message", form.message);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please email us directly at admin@ras.sc");
      }
    } catch {
      setError("Something went wrong. Please email us directly at admin@ras.sc");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#0D3572] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider mb-3">
              Contact
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Have a question, need support, or want to learn more about Retailers Association of Seychelles membership? Our team
              is ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[#EFF4FF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <Card className="bg-white border border-[#0D3572]/10 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#0D3572] text-xl font-bold">
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="flex flex-col items-center text-center py-8 gap-4">
                      <CheckCircle className="h-14 w-14 text-[#1B8A4B]" />
                      <h3 className="text-xl font-bold text-[#0D3572]">Message Received!</h3>
                      <p className="text-gray-600 leading-relaxed max-w-xs">
                        Thank you for reaching out. Our team will respond to your message within
                        2 business days.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm({
                            name: "",
                            email: "",
                            businessName: "",
                            subject: "",
                            message: "",
                          });
                        }}
                        className="text-sm text-[#C9A227] hover:underline mt-2"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
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
                        <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                          Business Name
                        </Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          value={form.businessName}
                          onChange={handleChange}
                          placeholder="Your store or company name"
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                          Subject <span className="text-red-500">*</span>
                        </Label>
                        <select
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227]"
                        >
                          <option value="">Select a subject...</option>
                          {subjects.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                          Message <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help..."
                          rows={5}
                          required
                          className="border-gray-300 resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 font-semibold h-10 disabled:opacity-60"
                      >
                        {submitting ? "Sending…" : "Send Message"}
                      </Button>
                      {error && (
                        <p className="text-xs text-red-500 text-center mt-2">{error}</p>
                      )}
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right side: info */}
            <div className="space-y-5">
              {/* Contact details */}
              <Card className="bg-white border border-[#0D3572]/10 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#0D3572] text-lg font-bold">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#0D3572]/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-[#0D3572]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0D3572]">Address</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Docklands, Victoria,<br />Mahé, Seychelles
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#0D3572]/10 flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4 text-[#0D3572]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0D3572]">Phone</p>
                      <a href="tel:+2482521500" className="text-sm text-gray-600 hover:text-[#C9A227] transition-colors block">
                        +248 2 521 500
                      </a>
                      <a href="tel:+2482737273" className="text-sm text-gray-600 hover:text-[#C9A227] transition-colors block">
                        +248 2 737 273
                      </a>
                      <a href="tel:+2482819678" className="text-sm text-gray-600 hover:text-[#C9A227] transition-colors block">
                        +248 281 96 78
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#0D3572]/10 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-[#0D3572]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0D3572]">Email</p>
                      <a
                        href="mailto:admin@ras.sc"
                        className="text-sm text-gray-600 hover:text-[#C9A227] transition-colors"
                      >
                        admin@ras.sc
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#0D3572]/10 flex items-center justify-center shrink-0">
                      <Clock className="h-4 w-4 text-[#0D3572]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0D3572]">Office Hours</p>
                      <p className="text-sm text-gray-600">Monday – Friday</p>
                      <p className="text-sm text-gray-600">8:30 AM – 4:30 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map placeholder */}
              <div className="rounded-xl border border-[#0D3572]/10 bg-[#0D3572]/5 h-36 sm:h-52 flex flex-col items-center justify-center text-center px-6 gap-3">
                <MapPin className="h-8 w-8 text-[#0D3572]/40" />
                <div>
                  <p className="font-semibold text-[#0D3572] text-sm">
                    Find us on Bois De Rose Avenue
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Victoria, Mahé, Seychelles</p>
                </div>
                <a
                  href="https://www.google.com/maps/search/Bois+De+Rose+Avenue+Victoria+Mahe+Seychelles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#C9A227] hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>

              <div className="bg-[#0D3572] rounded-xl p-5 text-white">
                <p className="font-semibold mb-1">Response Time</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  We aim to respond to all enquiries within <strong className="text-white">2 business days</strong>. For
                  urgent matters, please call our office directly during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
