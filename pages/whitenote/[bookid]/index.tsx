import Link from "next/link";
import { useEffect, useState } from "react";
import { BarSpinner, ScaleSpinner } from "../../../components/spinner";
import { getAllNotes, getBookName } from "../../../scripts/whitenote/book";
import { addNote } from "../../../scripts/whitenote/note";

interface NoteInterface {
  id: string;
  name: string;
}

export default function BookTop() {
  let bookid = "/whitenote/1";
  if (typeof window !== "undefined")
    bookid = window.location.pathname.slice("/whitenote/".length) as string;
  console.log(`[BookTop.tsx(Main)] bookid: ${bookid}`);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookname, setBookname] = useState("読み込み中");
  const [noteslist, setNoteslist] = useState<NoteInterface[]>([]);
  useEffect(() => {
    fetchdata(bookid);
  }, [bookid]);
  async function fetchdata(bookid: string) {
    setLoading(true);
    setBookname(await getBookName(bookid));
    const fetchnotes = await getAllNotes(bookid);
    if (typeof fetchnotes === "object") setNoteslist(fetchnotes);
    setLoading(false);
  }
  function funcaddnote(name?: string) {
    let notename;
    if (name) notename = name;
    if (!notename)
      do {
        notename = prompt("ノート名を入力してください");
      } while (notename === "");
    if (notename === null) return;
    let bookpass;
    bookpass = prompt(
      "パスワード保護をしたい場合、パスワードを入力してください。パスワードを忘れた場合閲覧不可能になります。"
    );
    let bookpasscheck;
    if (bookpass) bookpasscheck = prompt("パスワードを再度入力してください。");
    if (bookpass !== bookpasscheck && bookpass) {
      alert("パスワードが一致しませんでした。もう一度再設定してください。");
      funcaddnote(notename);
      return;
    }
    addNote(notename, bookpass, bookid).then((data) => console.log(data?.id));

  }
  return (
    <>
      {loading ? <BarSpinner /> : undefined}
      <h3>{bookname}</h3>
      <button onClick={() => funcaddnote()}>＋ ノートを追加する</button>
      {noteslist.map((x) => (
        <Link href={`/whitenote/${bookid}/${x.id}/edit2`} key={x.id}>
          <p key={x.id}>{x.name}</p>
        </Link>
      ))}
      {noteslist.length == 0 && loading === true ? <ScaleSpinner /> : undefined}
      {noteslist.length == 0 && loading === false ? <p>最初のノートを追加しましょう！</p> : undefined}
    </>
  );
}
