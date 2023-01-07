import { getUser } from "../user";
import { encryptChat } from "./crypt";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createNotiChat } from "../notification/create";
import { fetchRoomMembersNMe } from "./roominfo";
const supabase = createBrowserSupabaseClient();

export async function sendMessage(text: string, roomid: string) {
  try {
    const user = await getUser();
    if (!user) return;
    const inserttext = encryptChat(text, user.id);
    const { data, error } = await supabase
      .from("ch_chats")
      .insert({
        userid: user.id,
        roomid: roomid,
        text: inserttext,
        type: "text",
      })
      .select("id")
      .single();
    if (error) throw error;
    const roommember = await fetchRoomMembersNMe(roomid);
    console.log("roommember:", roommember);
    roommember?.forEach((e) => {
      createNotiChat(e.userid, data.id);
    });
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}
