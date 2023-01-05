import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { resolve } from "path";
import { getUserId } from "../user";
const supabase = createBrowserSupabaseClient();

export async function fetchRoomListsold() {
  try {
    const userid = await getUserId();
    if (!userid) return;
    const { data, error } = await supabase
      .from("ch_members")
      .select("roomid, roomname")
      .eq("userid", userid);
    if (error) throw error;
    function fetchpromise(data: any) {
      return new Promise((resolve: any) => {
        let uniteddata = <object[]>[];
        data.forEach(async (e: any) => {
          const roomdata = await fetchRoomData(e.roomid);
          uniteddata.push({
            id: e.roomid,
            name: e.roomname,
            type: roomdata!.type,
            permit: roomdata!.permit,
          });
        });
        resolve(uniteddata);
      });
    }
    const findata = await fetchpromise(data);
    console.dir(findata);
    return findata;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function fetchRoomLists() {
  try {
    const userid = await getUserId();
    if (!userid) return;
    const { data, error } = await supabase
      .from("ch_members")
      .select("roomid, roomname")
      .eq("userid", userid);
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function fetchRoomName(roomid: string) {
  try {
    const userid = await getUserId();
    if (!userid) return;
    const { data, error } = await supabase
      .from("ch_members")
      .select("roomname")
      .eq("userid", userid)
      .eq("roomid", roomid)
      .single();
    if (error) throw error;
    return data.roomname;
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

export async function fetchRoomData(roomid: string) {
  try {
    const { data, error } = await supabase
      .from("ch_rooms")
      .select("type, permit")
      .eq("id", roomid)
      .single();
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
}
