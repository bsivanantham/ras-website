import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default async function SignUpPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ __clerk_ticket?: string }>;
}>) {
  const params = await searchParams;
  const hasTicket = !!params.__clerk_ticket;

  return (
    <div className="min-h-screen bg-[#EFF4FF] flex flex-col items-center justify-center py-16 px-4">
      {/* Branded header */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex flex-col items-center gap-3">
          <div className="h-20 w-20 rounded-full bg-white p-1 shadow-md">
            <Image
              src="/images/logo.jpg"
              alt="RAS Logo"
              width={80}
              height={80}
              className="rounded-full object-contain"
              priority
            />
          </div>
          <div>
            <p className="text-xl font-bold text-[#0D3572] leading-tight">
              Retailers Association of Seychelles
            </p>
            <p className="text-xs font-medium tracking-widest text-[#C9A227] uppercase mt-0.5">
              Fair Service to Our Nation
            </p>
          </div>
        </Link>
      </div>

      {hasTicket ? (
        /* Invitation link detected — show the real sign-up form */
        <SignUp forceRedirectUrl="/member" />
      ) : (
        /* No invite — show the invitation-only card */
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#0D3572]/10 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 rounded-full bg-[#0D3572]/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-[#0D3572]" />
            </div>
          </div>

          <h1 className="text-xl font-bold text-[#0D3572] mb-3">
            Membership is by Invitation Only
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Retailers Association of Seychelles membership is open to licensed general merchants in Seychelles.
            Once your application is reviewed and membership fee of{" "}
            <strong>SCR 500</strong> is collected, we will send you a personal
            invitation link to create your account.
          </p>

          <a
            href="mailto:retailersassociationseychelles@gmail.com?subject=RAS Membership Enquiry"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#0D3572] text-white font-semibold rounded-lg px-5 py-3 hover:bg-[#0a2a5a] transition-colors"
          >
            <Mail className="h-4 w-4" />
            Contact the Association to Apply
          </a>

          <p className="text-xs text-gray-400 mt-3">
            retailersassociationseychelles@gmail.com
          </p>

          <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
            <p className="text-xs text-gray-500">
              Already have an invitation? Check your email for the link sent by Retailers Association of Seychelles.
            </p>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9A227] hover:underline"
            >
              Already a member? Sign in <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
