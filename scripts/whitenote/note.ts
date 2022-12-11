import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { generatePassword, makeHash, decryptText, encryptText } from "../crypt";
import { getBookEncrypt } from "./book";
const supabase = createBrowserSupabaseClient();

export async function addNote(
  name: string,
  password: string | null,
  bookid: string,
  bookpass?: string
) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    let hashedpass;
    if (password !== null && password !== "") hashedpass = makeHash(password);
    const encrypt_name = encryptText(name, bookpass);
    const { data, error } = await supabase
      .from("wn_notes")
      .insert({
        userid: user.id,
        name: encrypt_name,
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

export async function getNoteName(noteid: string, password?: string) {
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
    const decrypted_name = decryptText(data.name, password);
    if (data) return decrypted_name;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function getNoteNote(bookid: string, noteid: string) {
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
    const fetchdata = decryptText(data.note, await getBookEncrypt(bookid));
    if (data) return fetchdata;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function saveNote(
  bookid: string,
  noteid: string,
  notename: string,
  notedata: string
) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const savedata = encryptText(notedata, await getBookEncrypt(bookid));
    const { data, error } = await supabase
      .from("wn_notes")
      .upsert({ id: noteid, name: notename, note: savedata, userid: user.id })
      .select();
    if (error) throw error;
    console.dir(data);
    return data;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function saveNoteName(noteid: string, notename: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("wn_notes")
      .upsert({ id: noteid, name: notename, userid: user.id })
      .select();
    if (error) throw error;
    console.dir(data);
    return data;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}
