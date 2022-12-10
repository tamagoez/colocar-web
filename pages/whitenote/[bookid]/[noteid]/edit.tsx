import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import gfm from "remark-gfm";
import emoji from 'remark-emoji';

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function HomePage() {
  const [value, setValue] = useState<any>("**Hello world!!!**");
  return (
    <>
      <style jsx>{`
        .editor {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <div className="editor">
        <MDEditor value={value} onChange={setValue} previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [[gfm, remarkBreaks, emoji]],
          unwrapDisallowed: false,
          linkTarget: "_blank"
        }} />
      </div>
    </>
  );
}

export default HomePage;
