import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getNoteName,
  getNoteNote,
  saveNoteName,
} from "../../../../scripts/whitenote/note";
import { BarSpinner, ScaleSpinner } from "../../../../components/spinner";
import Twemoji from "react-twemoji";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function ViewMarkdown() {
  let noteid = "1";
  let bookid = "1";
  let pathname: any[] = [];
  if (typeof window !== "undefined") {
    pathname = window.location.pathname.split("/");
    bookid = pathname[2] as string;
    noteid = pathname[3] as string;
  }
  console.log("noteid: ", noteid);
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState("");
  const [notename, setNotename] = useState("");
  useEffect(() => {
    fetchdata(noteid);
  }, [noteid]);

  async function fetchdata(noteid: string) {
    setLoading(true);
    setNotename(await getNoteName(noteid));
    setValue(await getNoteNote(bookid, noteid));
    setLoading(false);
    return;
  }

  async function savename() {
    setLoading(true);
    await saveNoteName(noteid, notename);
    setLoading(false);
  }

  return (
    <>
      {loading ? <BarSpinner /> : undefined}
      <Link href={`/whitenote/${bookid}`}>＜ 戻る</Link>
      <Link href={`/whitenote/${bookid}/${noteid}/edit`}>編集する</Link>
      <input value={notename} onChange={(e) => setNotename(e.target.value)} />
      <button onClick={() => savename()}>保存</button>
      <div>
        {!value && loading === true ? <ScaleSpinner /> : undefined}
        {!value && loading === false ? (
          <p>
            ピカピカのノートです！
            <br />
            なにか書いてみましょう
          </p>
        ) : undefined}
        <Twemoji options={{ className: "twemoji" }}>
          <ReactMarkdown
            remarkPlugins={[gfm, remarkBreaks]}
            unwrapDisallowed={false}
            linkTarget="_blank"
          >
            {value}
          </ReactMarkdown>
        </Twemoji>
      </div>
    </>
  );
}
