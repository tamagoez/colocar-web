import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { getUserInt } from "../user";
const supabase = createBrowserSupabaseClient();

export async function createNotiChat(userid: string, chatid: string) {
  // NULL -> type[1]
  // userid(uuid) -変換-> userid(int8)
  // chatid -> value
  // // roomid -> option
  try {
    const intuserid = await getUserInt(userid);
    const { error } = await supabase.from("notifications").insert({
      type: "1",
      userid: intuserid,
      value: chatid,
    });
    if (error) throw error;
    console.log("Notification sent:", userid);
  } catch (error: any) {
    console.error(error);
  }
}
