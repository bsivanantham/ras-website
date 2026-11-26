"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotifyButton() {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("New Announcement from RAS");
  const [message, setMessage] = useState("A new announcement has been posted on the RAS website. Please log in to view the latest updates at ras.sc.");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSend() {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Unknown error");
      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
      setTimeout(() => { setStatus("idle"); setErrorMsg(""); }, 6000);
    }
  }

  return (
    <Card className="bg-white border border-[#0D3572]/10 shadow-sm">
      <CardHeader
        className="border-b border-gray-100 cursor-pointer select-none"
        onClick={() => setOpen((o) => !o)}
      >
        <CardTitle className="text-[#0D3572] font-bold flex items-center justify-between gap-2 text-sm">
          <span className="flex items-center gap-2">
            <Send className="h-4 w-4 text-[#C9A227]" />
            Notify Admins
          </span>
          {open ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
        </CardTitle>
      </CardHeader>

      {open && (
        <CardContent className="pt-4 space-y-3">
          <div>
            <label htmlFor="notify-subject" className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
              Subject
            </label>
            <input
              id="notify-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D3572]/30"
            />
          </div>
          <div>
            <label htmlFor="notify-message" className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
              Message
            </label>
            <textarea
              id="notify-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D3572]/30 resize-none"
            />
          </div>

          {status === "success" && (
            <div className="flex items-center gap-2 text-[#1B8A4B] text-sm font-semibold">
              <CheckCircle className="h-4 w-4" /> Email sent to admins
            </div>
          )}
          {status === "error" && (
            <div className="flex items-start gap-2 text-red-600 text-sm font-semibold">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMsg || "Failed to send — check config"}</span>
            </div>
          )}

          <Button
            onClick={handleSend}
            disabled={status === "loading" || !subject.trim() || !message.trim()}
            className="w-full bg-[#0D3572] text-white hover:bg-[#0a2a5a] border-0 gap-2 text-sm"
          >
            <Send className="h-4 w-4" />
            {status === "loading" ? "Sending…" : "Send Email"}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
