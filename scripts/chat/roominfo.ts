import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function fetchRoomLists() {
  try {
    const { data, error } = await supabase
      .from("ch_rooms")
      .select("id, type, permit, name");
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function fetchRoomChats(roomid: string) {
  try {
    const { data, error } = await supabase
      .from("ch_chats")
      .select("id, userid, type, text, url, created_at")
      .eq("roomid", roomid);
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
}
