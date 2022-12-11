// import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  getNoteName,
  getNoteNote,
  saveNote,
} from "../../../../scripts/whitenote/note";
import { BarSpinner } from "../../../../components/spinner";
import Link from "next/link";
import { useRouter } from "next/router";
const { DateTime } = require("luxon");

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function EditEasymde() {
  const router = useRouter();
  let noteid = "1";
  let bookid = "1";
  let pathname: any[] = [];
  if (typeof window !== "undefined") {
    pathname = window.location.pathname.split("/");
    bookid = pathname[2] as string;
    noteid = pathname[3] as string;
    console.log("noteid: ", noteid);
  }

  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState("");
  const [notename, setNotename] = useState("");
  const [firstdiff, setFirstdiff] = useState("");
  const [lastsavetime, setLastsavetime] = useState("");
  const [lasttext, setLasttext] = useState("");
  const onChange = useCallback(
    (value: string) => {
      setValue(value);
      checkdiff();
    },
    [firstdiff]
  );
  let savetimer: any;

  function checkdiff() {
    const now = DateTime.now();
    const nowstring = now.toString();
    if (firstdiff === "") setFirstdiff(nowstring);
    const oldtime = DateTime.fromISO(firstdiff);
    const difftime = now.diff(oldtime);
    console.log(firstdiff);
    console.log(difftime.as("seconds"));
    if (difftime.as("seconds") > 10) {
      saveall();
      setFirstdiff("");
    }
  }

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
  const delay = 1000;
  // const autosavedValue = localStorage.getItem(`smde_${noteid}`) || "";
  const anOptions = useMemo(() => {
    return {
      spellChecker: false,
      autosave: {
        enabled: typeof window !== "undefined",
        uniqueId: noteid,
        delay,
      },
    };
  }, [delay]);
  function saveall(redirecturl?: string) {
    setLoading(true);
    function endsave() {
      if (redirecturl) router.push(redirecturl);
      setLoading(false);
      return;
    }
    if (loading === true || notename === "") endsave();
    if (value === lasttext) endsave();
    saveNote(bookid, noteid, notename, value).then(() => {
      setLasttext(value);
      const now = DateTime.now();
      const nowstring = now.toString();
      setLastsavetime(nowstring);
      endsave();
    });
  }

  if (typeof document !== "undefined")
    document.body.addEventListener(
      "click",
      () => {
        // saveall();
      },
      { once: true }
    );

  return (
    <>
      {loading ? <BarSpinner /> : undefined}
      <div>
        <a onClick={() => saveall(`/whitenote/${bookid}/${noteid}/view`)}>
          ＜ 戻る
        </a>
      </div>
      <input value={notename} onChange={(e) => setNotename(e.target.value)} />
      <button onClick={() => saveall()}>保存</button>
      <SimpleMdeReact
        value={value}
        onChange={onChange}
        options={anOptions}
        defaultValue={value}
      />
      <p>最終保存: {lastsavetime}</p>
    </>
  );
}
