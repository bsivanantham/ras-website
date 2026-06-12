import { kv } from "@vercel/kv";
export type StoredAnnouncement = {
  id: string;
  access: "public" | "member";
  badge: string;
  badgeColorKey: string;
  iconKey: string;
  title: string;
  description: string;
  date: string;
  href: string | null;
  actionLabel: string | null;
  done?: boolean;
  preview:
    | { type: "image"; src: string }
    | { type: "pdf"; src: string }
    | { type: "event"; month: string; day: string; location: string };
  order: number;
  createdAt: string;
};

export type StoredEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  status: "upcoming" | "done";
};

export type StoredProvider = {
  id: string;
  name: string;
  category: string;
  description: string;
  website: string | null;
  websiteHref: string | null;
  email: string | null;
  phone: string | null;
  phone2?: string | null;
  email2?: string | null;
};

export type StoredPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  order: number;
  uploadedAt: string;
};

export type AuditEntry = {
  action: "create" | "update" | "delete";
  resource: "announcements" | "events" | "directory" | "gallery";
  userId: string;
  detail: string;
  timestamp: string;
};

async function kvGet<T>(key: string): Promise<T | null> {
  try {
    return await kv.get<T>(key);
  } catch {
    return null;
  }
}

async function kvSet<T>(key: string, value: T): Promise<void> {
  await kv.set(key, value);
}

export async function getAnnouncements(): Promise<StoredAnnouncement[] | null> {
  return kvGet<StoredAnnouncement[]>("announcements");
}
export async function setAnnouncements(data: StoredAnnouncement[]): Promise<void> {
  await kvSet("announcements", data);
}

export async function getEvents(): Promise<StoredEvent[] | null> {
  return kvGet<StoredEvent[]>("events");
}
export async function setEvents(data: StoredEvent[]): Promise<void> {
  await kvSet("events", data);
}

export async function getProviders(): Promise<StoredProvider[] | null> {
  return kvGet<StoredProvider[]>("providers");
}
export async function setProviders(data: StoredProvider[]): Promise<void> {
  await kvSet("providers", data);
}

export async function getGallery(): Promise<StoredPhoto[] | null> {
  return kvGet<StoredPhoto[]>("gallery");
}
export async function setGallery(data: StoredPhoto[]): Promise<void> {
  await kvSet("gallery", data);
}

export async function appendAuditLog(entry: AuditEntry): Promise<void> {
  try {
    const existing = (await kvGet<AuditEntry[]>("audit_log")) ?? [];
    await kvSet("audit_log", [entry, ...existing].slice(0, 20));
  } catch {
    // Non-critical — don't fail the main operation
  }
}
export async function getAuditLog(): Promise<AuditEntry[]> {
  return (await kvGet<AuditEntry[]>("audit_log")) ?? [];
}
