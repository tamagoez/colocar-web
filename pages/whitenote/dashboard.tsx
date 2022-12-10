import { addBook, getAllBooks } from "../../scripts/whitenote/book";
import { useEffect, useState } from "react";
import { BarSpinner } from "../../components/spinner";
import Link from "next/link";

interface RoomInterface {
  id: string;
  name: string;
  last_edit: string;
}

export default function Dashboard() {
  const [bookslist, setBooksList] = useState<RoomInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  function funcaddbook(name?: string) {
    let bookname;
    if (name) bookname = name;
    if (!bookname)
      do {
        bookname = prompt("ブック名を入力してください");
      } while (bookname === "");
    if (bookname === null) return;
    let bookpass;
    bookpass = prompt(
      "パスワード保護をしたい場合、パスワードを入力してください。パスワードを忘れた場合閲覧不可能になります。"
    );
    let bookpasscheck;
    if (bookpass) bookpasscheck = prompt("パスワードを再度入力してください。");
    if (bookpass !== bookpasscheck && bookpass) {
      alert("パスワードが一致しませんでした。もう一度再設定してください。");
      funcaddbook(bookname);
      return;
    }
    addBook(bookname, bookpass).then((data) => console.log(data?.id));
  }
  async function fetchBooks() {
    setLoading(true);
    const fetchdata = await getAllBooks();
    if (typeof fetchdata === "object") setBooksList(fetchdata);
    setLoading(false);
  }
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <>
      {loading ? <BarSpinner /> : undefined}
      <h1>Dashboard</h1>
      <button onClick={() => funcaddbook()}>＋ ブックを追加する</button>
      {bookslist.map((x) => (
        <p key={x.id}>
          {x.name} - {x.last_edit}
        </p>
      ))}
    </>
  );
}
