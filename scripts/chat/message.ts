import { getUser, getUserInt } from "../user";
import { encryptChat } from "./crypt";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createNotiChat } from "../notification/create";
import { fetchRoomMembersNMe } from "./roominfo";
const supabase = createBrowserSupabaseClient();

export async function sendMessage(text: string, roomid: string) {
  try {
    const userid = await getUserInt();
    const inserttext = encryptChat(text, userid);
    const { data, error } = await supabase
      .from("ch_chats")
      .insert({
        userid: userid,
        roomid: roomid,
        text: inserttext,
        type: 1,
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
