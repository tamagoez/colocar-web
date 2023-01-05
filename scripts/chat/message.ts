import { getUser } from "../user";
import { encryptChat } from "./crypt";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function sendMessage(text: string, roomid: string) {
  try {
    const user = await getUser();
    if (!user) return;
    const inserttext = encryptChat(text, user.id);
    const { error } = await supabase.from("ch_chats").insert({
      userid: user.id,
      roomid: roomid,
      text: inserttext,
      type: "text",
    });
    if (error) throw error;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}
