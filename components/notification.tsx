import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();
import { useState } from "react";
import { playSound } from "../scripts/notification/sound";

export default function NotificationComponent({
  userintid,
  type,
  value,
}: {
  userintid: string;
  type: string;
  value: string;
}) {
  return <></>;
}
