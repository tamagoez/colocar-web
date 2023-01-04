import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export function decryptChat(text: string, userid: string) {
  let passjson;
  if (typeof window !== "undefined")
    passjson = JSON.parse(window.sessionStorage.getItem("roompass")!);
  const pass = passjson.find((e: any) => e.userid === userid).password;
  return decryptText(text, pass);
}

function decryptText(text: string, password: string) {
  const crypto = require("crypto");
  const decipher = crypto.createDecipher("aes-256-cbc", password);
  const decrypted = decipher.update(text, "hex", "utf-8");
  const decrypted_text = decrypted + decipher.final("utf-8");
  return decrypted_text;
}

export async function fetchMemberPass(roomid: string) {
  try {
    const { data, error } = await supabase
      .from("ch_members")
      .select("userid, password")
      .eq("roomid", roomid);
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
}
