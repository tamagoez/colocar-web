import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();
import { getUserId } from "./user"

export async function initProfile() {
  try {
    const userid = await getUserId()
    const { error } = await supabase
      .from("profile")
      .insert({userid: userid, username: "guest", handleid: Math.random().toString(32).substring(2)});
    if (error) throw error;
    return false;
  } catch (error: any) {
    console.error(error)
    return true
  }
}

export async function fetchProfile(userid: string) {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select()
      .eq("userid", userid)
      .single();
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function getUsername(userid: string) {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("username")
      .eq("userid", userid)
      .single();
    if (error) throw error;
    return data.username;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function getDisplayHandleId(userid: string) {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("displayhandleid")
      .eq("userid", userid)
      .single();
    if (error) throw error;
    return data.displayhandleid;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function getBirthday(userid: string) {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("birthday")
      .eq("userid", userid)
      .single();
    if (error) throw error;
    return data.birthday;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function getBio(userid: string) {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("bio")
      .eq("userid", userid)
      .single();
    if (error) throw error;
    return data.bio;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function upsertProfile(profiledata: object) {
  try {
    const { data, error } = await supabase
      .from("profile")
      .upsert(profiledata)
      .select();
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}
