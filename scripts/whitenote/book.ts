import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { generatePassword, makeHash } from "../crypt";
const supabase = createBrowserSupabaseClient();

export async function addBook(name: string, password: string | null) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    let hashedpass;
    if (password !== null && password !== "") hashedpass = makeHash(password);
    const { data, error } = await supabase
      .from("wn_books")
      .insert({
        userid: user.id,
        name: name,
        hashedpass: hashedpass,
        encrypt: generatePassword(10),
      })
      .select("id")
      .single();
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function getAllBooks() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("wn_books")
      .select()
      .eq("userid", user.id);
    if (error) throw error;
    if (data) return data;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}
