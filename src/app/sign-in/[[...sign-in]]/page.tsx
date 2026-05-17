import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
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
        <p className="mt-4 text-gray-600 text-sm">
          Sign in to access your member dashboard and resources.
        </p>
      </div>

      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#0D3572",
            colorTextOnPrimaryBackground: "#ffffff",
          },
        }}
      />

      <p className="mt-6 text-center text-sm text-gray-600">
        Not a member yet?{" "}
        <Link href="/join" className="text-[#C9A227] font-semibold hover:underline">
          Join RAS today
        </Link>
      </p>
    </div>
  );
}
