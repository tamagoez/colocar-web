import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { compareHash, decryptText, generatePassword, makeHash } from "../crypt";
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

export async function getAllNotes(bookid: string, pass?: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("wn_notes")
      .select()
      .eq("bookid", bookid);
    if (error) throw error;
    if (data) return data;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function getBookName(bookid: string, pass?: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("wn_books")
      .select("name")
      .eq("id", bookid)
      .single();
    if (error) throw error;

    if (data) return data.name;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function getBookEncrypt(bookid: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("wn_books")
      .select("encrypt")
      .eq("id", bookid)
      .single();
    if (error) throw error;
    if (data) return data.encrypt;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function getBookLock(bookid: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("wn_books")
      .select("hashedpass")
      .eq("id", bookid)
      .single();
    if (error) throw error;
    return data.hashedpass;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function authBookLock(inputpass: string, hashedpass: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const hashresult = compareHash(inputpass, hashedpass);
    return hashresult;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function saveBookName(bookid: string, notename: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("wn_books")
      .upsert({ id: bookid, name: notename, userid: user.id })
      .select();
    if (error) throw error;
    console.dir(data);
    return data;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}
