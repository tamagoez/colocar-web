// import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { getNoteName, getNoteNote } from "../../../../scripts/whitenote/note";
import { BarSpinner } from "../../../../components/spinner";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function EditEasymde() {
  let noteid = "1";
  if (typeof window !== "undefined")
    noteid = window.location.pathname.slice("/whitenote/1/".length).substring(0, 0 - "/edit2".length) as string;
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState("読み込み中");
  const [notename, setNotename] = useState("読み込み中")
  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);
  useEffect(() => { fetchdata(noteid) }, [noteid])
  async function fetchdata(noteid: string) {
    setLoading(true);
    setNotename(await getNoteName(noteid))
    setValue(await getNoteNote(noteid))
    setLoading(false);
    return;
  }
   const delay = 1000;
  const autosavedValue = localStorage.getItem(`smde_${noteid}`) || "";
  const anOptions = useMemo(() => {
    return {
      autosave: {
        enabled: true,
        uniqueId: noteid,
        delay,
      },
    };
  }, [delay]);

  return <>{loading ? <BarSpinner /> : undefined}<h3>{notename}</h3><SimpleMdeReact value={value} onChange={onChange} options={anOptions} /></>;
}
