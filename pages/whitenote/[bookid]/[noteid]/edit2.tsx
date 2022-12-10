// import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function editeasymde() {
  const [value, setValue] = useState("Initial value");

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return <SimpleMdeReact value={value} onChange={onChange} />;
}
