import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
export async function getUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id;
}

export async function getUsernameFromUuid(userid: string) {
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

export async function getUuidFromHandleId(handleid: string) {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("userid")
      .eq("handleid", handleid.toLowerCase())
      .single();
    return data!.userid;
  } catch (error: any) {
    console.error(error.message);
  }
}
