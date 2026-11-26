import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { getGallery } from "@/lib/kv";
import GalleryManager from "@/components/admin/GalleryManager";

export default async function AdminGalleryPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  if (!isAdmin(user)) redirect("/member");

  const data = (await getGallery()) ?? [];

  return <GalleryManager initial={data} />;
}
