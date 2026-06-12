import type { User } from "@clerk/nextjs/server";

export function isAdmin(user: User | null): boolean {
  return (user?.publicMetadata as { role?: string } | undefined)?.role === "super_admin";
}
