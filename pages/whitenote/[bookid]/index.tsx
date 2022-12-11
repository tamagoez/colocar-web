import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarSpinner, ScaleSpinner } from "../../../components/spinner";
import {
  authBookLock,
  getAllNotes,
  getBookLock,
  getBookName,
  saveBookName,
} from "../../../scripts/whitenote/book";
import { addNote } from "../../../scripts/whitenote/note";

interface NoteInterface {
  id: string;
  name: string;
}

export default function BookTop() {
  const router = useRouter();
  let bookid = "/whitenote/1";
  if (typeof window !== "undefined")
    bookid = window.location.pathname.slice("/whitenote/".length) as string;
  console.log(`[BookTop.tsx(Main)] bookid: ${bookid}`);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookname, setBookname] = useState("読み込み中");
  const [noteslist, setNoteslist] = useState<NoteInterface[]>([]);
  const [authstart, setAuthstart] = useState<boolean>(false);
  const [booklock, setBooklock] = useState<boolean>(false);
  useEffect(() => {
    if (authstart === false) fuckchecklock();
  }, [authstart]);
  async function fetchdata(bookid: string, pass?: string) {
    setLoading(true);
    setBookname(await getBookName(bookid));
    const fetchnotes = await getAllNotes(bookid, pass);
    if (typeof fetchnotes === "object") setNoteslist(fetchnotes);
    setLoading(false);
  }
  function funcaddnote(name?: string) {
    let bookpath;
    if (typeof window !== "undefined" && booklock) {
      bookpath = JSON.parse(sessionStorage.getItem("bookauth")!).pass;
    }
    let notename;
    if (name) notename = name;
    if (!notename)
      do {
        notename = prompt("ノート名を入力してください");
      } while (notename === "");
    if (notename === null) return;
    let notepass;
    notepass = prompt(
      "パスワード保護をしたい場合、パスワードを入力してください。パスワードを忘れた場合閲覧不可能になります。"
    );
    let notepasscheck;
    if (notepass) notepasscheck = prompt("パスワードを再度入力してください。");
    if (notepass !== notepasscheck && notepass) {
      alert("パスワードが一致しませんでした。もう一度再設定してください。");
      funcaddnote(notename);
      return;
    }
    addNote(notename, notepass, bookid, bookpath).then((data) => {
      console.log(data?.id);
      router.push(`/whitenote/${bookid}/${data?.id}/edit`);
    });
  }
  async function fuckchecklock() {
    if (authstart === true) return;
    setAuthstart(true);
    const lockhash = await getBookLock(bookid);
    setBooklock(lockhash);
    console.log(lockhash);
    let password;
    if (!lockhash) {
      await fetchdata(bookid);
    } else {
      let sessionauth = { bookid: "0", pass: "0" };
      if (typeof window !== "undefined") {
        if (sessionStorage.getItem("bookauth")) {
          sessionauth = JSON.parse(sessionStorage.getItem("bookauth")!);
        }
      }
      console.log(sessionauth.bookid);
      if (sessionauth.bookid === bookid) {
        password = sessionauth.pass;
      } else {
        password = prompt(
          "このブックはパスワード保護されています。\nパスワードを入力してください。"
        );
      }
      if (!password) {
        router.replace("/whitenote/dashboard");
        return;
      }
      const authresult = await authBookLock(password, lockhash);
      console.log("authresult: ", authresult);
      if (authresult === true) {
        const storageset = { bookid: bookid, pass: password };
        if (typeof window !== "undefined")
          sessionStorage.setItem("bookauth", JSON.stringify(storageset));
        fetchdata(bookid, password);
      }
    }
  }
  async function savename() {
    await saveBookName(bookid, bookname);
  }

  return (
    <>
      {loading ? <BarSpinner /> : undefined}
      <Link href={`/whitenote/dashboard`}>＜ 戻る</Link>
      <input
        value={bookname}
        onChange={(e) => {
          setBookname(e.target.value);
        }}
      />
      <button onClick={() => savename()}>保存</button>
      <h2>注意!!!! 絶対にパスワード保護しないで!!!!!</h2>
      <button onClick={() => funcaddnote()}>＋ ノートを追加する</button>
      {noteslist.map((x) => (
        <Link href={`/whitenote/${bookid}/${x.id}/view`} key={x.id}>
          <p key={x.id}>{x.name}</p>
        </Link>
      ))}
      {noteslist.length == 0 && loading === true ? <ScaleSpinner /> : undefined}
      {noteslist.length == 0 && loading === false ? (
        <p>最初のノートを追加しましょう！</p>
      ) : undefined}
    </>
  );
}
