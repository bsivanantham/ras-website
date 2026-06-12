import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { getEvents } from "@/lib/kv";
import EventsEditor from "@/components/admin/EventsEditor";

export default async function AdminEventsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  if (!isAdmin(user)) redirect("/member");

  const data = (await getEvents()) ?? [];

  return <EventsEditor initial={data} />;
}
