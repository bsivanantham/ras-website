import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0D3572] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About RAS */}
          <div>
            <h3 className="text-[#C9A227] font-bold text-sm uppercase tracking-wider mb-4">
              About RAS
            </h3>
            <p className="text-white/75 text-sm leading-relaxed mb-4">
              The Retailers Association of Seychelles is the representative body for retail
              businesses across Mahé and the islands, advocating for fair trade and
              supporting members with compliance, resources, and community.
            </p>
            <p className="text-[#C9A227] text-xs font-medium italic">
              "Fair Service to Our Nation"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#C9A227] font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/resources", label: "Resources" },
                { href: "/compliance", label: "Compliance Hub" },
                { href: "/directory", label: "Service Directory" },
                { href: "/contact", label: "Contact Us" },
                { href: "/join", label: "Join RAS" },
                { href: "/member", label: "Member Dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 text-sm hover:text-[#C9A227] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#C9A227] font-bold text-sm uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#C9A227] mt-0.5 shrink-0" />
                <span className="text-white/75 text-sm leading-relaxed">
                  Bois De Rose Avenue,
                  <br />
                  Victoria, Mahé,
                  <br />
                  Seychelles
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#C9A227] shrink-0" />
                <a
                  href="tel:+2484323343"
                  className="text-white/75 text-sm hover:text-[#C9A227] transition-colors"
                >
                  +248 4 323 343
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#C9A227] shrink-0" />
                <a
                  href="mailto:info@retailers.sc"
                  className="text-white/75 text-sm hover:text-[#C9A227] transition-colors"
                >
                  info@retailers.sc
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#C9A227] shrink-0" />
                <a
                  href="mailto:retailersassociationsey@yahoo.com"
                  className="text-white/75 text-sm hover:text-[#C9A227] transition-colors"
                >
                  retailersassociationsey
                  <br />
                  @yahoo.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-[#C9A227] font-bold text-sm uppercase tracking-wider mb-4">
              Connect With Us
            </h3>
            <p className="text-white/75 text-sm mb-4">
              Stay updated with the latest news, events, and compliance updates from RAS.
            </p>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/75 text-sm hover:text-[#C9A227] transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Facebook Page
            </a>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white/60 text-xs leading-relaxed">
                Office Hours:
                <br />
                Monday – Friday
                <br />
                8:30 AM – 4:30 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#0a2a5a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} Retailers Association of Seychelles. All rights reserved.
          </p>
          <p className="text-white/50 text-xs">
            <a
              href="mailto:retailersassociationsey@yahoo.com"
              className="hover:text-[#C9A227] transition-colors"
            >
              retailersassociationsey@yahoo.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
