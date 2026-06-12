import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { getProviders } from "@/lib/kv";
import DirectoryEditor from "@/components/admin/DirectoryEditor";

export default async function AdminDirectoryPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  if (!isAdmin(user)) redirect("/member");

  const data = (await getProviders()) ?? [];

  return <DirectoryEditor initial={data} />;
}
