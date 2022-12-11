import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { generatePassword, makeHash } from "../crypt";
const supabase = createBrowserSupabaseClient();

export async function addNote(
  name: string,
  password: string | null,
  bookid: string
) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    let hashedpass;
    if (password !== null && password !== "") hashedpass = makeHash(password);
    const { data, error } = await supabase
      .from("wn_notes")
      .insert({
        userid: user.id,
        name: name,
        hashedpass: hashedpass,
        bookid: bookid,
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

export async function getNoteName(noteid: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("wn_notes")
      .select("name")
      .eq("id", noteid)
      .single();
    if (error) throw error;
    if (data) return data.name;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function getNoteNote(noteid: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("wn_notes")
      .select("note")
      .eq("id", noteid)
      .single();
    if (error) throw error;
    if (data) return data.note;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}