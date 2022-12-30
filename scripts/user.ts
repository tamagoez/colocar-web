import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
