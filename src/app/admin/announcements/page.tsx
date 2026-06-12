import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { getAnnouncements } from "@/lib/kv";
import AnnouncementsEditor from "@/components/admin/AnnouncementsEditor";

export default async function AdminAnnouncementsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  if (!isAdmin(user)) redirect("/member");

  const data = (await getAnnouncements()) ?? [];

  return <AnnouncementsEditor initial={data} />;
}
