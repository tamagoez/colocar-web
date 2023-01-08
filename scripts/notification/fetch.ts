import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function getAdminNote() {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("bio")
      .eq("userint", "3")
      .single();
    if (error) throw error;
    if (data) return data.bio;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}
