import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { generatePassword } from "../crypt";
import { getUserId, getUsernameFromUuid, getUuidFromHandleId } from "../user";
const supabase = createBrowserSupabaseClient();

export async function changeRoomname(roomid: string, name: string) {
  try {
    const userid = await getUserId();
    if (!userid) return;
    const { error } = await supabase
      .from("ch_members")
      .update({
        roomname: name,
      })
      .eq("userid", userid)
      .eq("roomid", roomid);
    if (error) throw error;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function createRoom(otherids: string) {
  try {
    const userid = await getUserId();
    // 一人のみの仮対応アップデートなので
    // 後日、複数人が対応するようにする
    const otherid = await getUuidFromHandleId(otherids);
    if (!userid) return;
    const userarray = [userid, otherid];
    const { data, error } = await supabase
      .from("ch_rooms")
      .insert({
        type: "personal",
        usersid: userarray,
        permit: false,
        name: userid,
      })
      .select("id")
      .single();
    if (error) throw error;
    userarray.forEach((e) => {
      console.log(
        userarray.filter((item) => item.match(new RegExp(e)) == null)[0]
      );
      initMember(
        e,
        data.id,
        userarray.filter((item) => item.match(new RegExp(e)) == null)[0]
      );
    });
    return data.id;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function initMember(
  userid: string,
  roomid: string,
  oppoid: string
) {
  try {
    const { data, error } = await supabase
      .from("ch_members")
      .insert({
        userid: userid,
        roomid: roomid,
        roomname: await getUsernameFromUuid(oppoid),
        password: generatePassword(7),
      })
      .select("id")
      .single();
    if (error) throw error;
  } catch (error: any) {
    console.error(error);
  }
}
