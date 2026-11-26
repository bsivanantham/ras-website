import Image from "next/image";
import { Mail, Clock, Phone, MapPin } from "lucide-react";
import SeychellesFlag from "@/components/SeychellesFlag";

export default function Footer() {
  return (
    <footer className="bg-[#0D3572] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About RAS */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-20 w-20 rounded-full bg-white p-0.5 shrink-0">
                <Image
                  src="/images/logo.jpg"
                  alt="RAS Logo"
                  width={80}
                  height={80}
                  className="rounded-full object-contain"
                />
              </div>
              <h3 className="text-[#C9A227] font-bold text-sm uppercase tracking-wider">
                About Retailers Association of Seychelles
              </h3>
            </div>
            <p className="text-white/75 text-sm leading-relaxed mb-4">
              The Retailers Association of Seychelles is the representative body for retail
              businesses across Mahé, Praslin, La Digue, and the outer islands, advocating
              for fair trade and supporting members with compliance, resources, and community.
            </p>
            <p className="text-[#C9A227] text-xs font-medium italic">
              &ldquo;Fair Service to Our Nation&rdquo;
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#C9A227] font-bold text-sm uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#C9A227] shrink-0" />
                <span className="text-white/75 text-sm">Mahé, Seychelles</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#C9A227] shrink-0" />
                <div className="text-white/75 text-sm">
                  <a href="tel:+2482521500" className="hover:text-[#C9A227] transition-colors block">
                    +248 2 521 500
                  </a>
                  <a href="tel:+2482737273" className="hover:text-[#C9A227] transition-colors block">
                    +248 2 737 273
                  </a>
                  <a href="tel:+2482819678" className="hover:text-[#C9A227] transition-colors block">
                    +248 281 96 78
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  {["admin@ras.sc", "chairman@ras.sc", "secretary@ras.sc"].map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="text-white/75 text-sm hover:text-[#C9A227] transition-colors"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/75 text-sm">Monday – Friday</p>
                  <p className="text-white/75 text-sm">8:30 AM – 4:30 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#C9A227] shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
                <a
                  href="https://www.facebook.com/share/1CWzHos1CE/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/75 text-sm hover:text-[#C9A227] transition-colors"
                >
                  Follow us on Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#0a2a5a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <SeychellesFlag width={20} height={13} className="rounded-sm opacity-80" />
            <p className="text-white/50 text-xs">
              &copy; {new Date().getFullYear()} Retailers Association of Seychelles. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
