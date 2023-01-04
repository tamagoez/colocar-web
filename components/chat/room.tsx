import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchMemberPass } from "../../scripts/chat/crypt";
import { fetchRoomChats } from "../../scripts/chat/roominfo";
import { ChatComponent } from "./chat";

export function DefaultRoom({ roomid }: { roomid: string }) {
  const router = useRouter();
  const [messages, setMessages] = useState<object[] | undefined>([]);
  useEffect(() => {
    chatinit(roomid);
  }, [roomid]);
  async function fetchMessages(roomid: string) {
    setMessages(await fetchRoomChats(roomid));
  }
  async function chatinit(roomid: string) {
    const mempass = await fetchMemberPass(roomid);
    if (typeof window !== "undefined")
      window.sessionStorage.setItem("roompass", JSON.stringify(mempass));
    fetchMessages(roomid);
  }
  return (
    <>
      <style jsx>{`
        .chat_header {
          position: sticky;
          top: 0;
          z-index: 9000;
          background-color: rgb(255, 255, 255, 0.6);
          backdrop-filter: blur(5px);
          display: flex;
          gap: 10px;
        }
        .chat_header h1 {
          margin: 0;
        }
      `}</style>
      <div id="roomroot">
        <header className="chat_header">
          <button onClick={() => router.back()}>{"<"}</button>
          <h1>{roomid}</h1>
        </header>
        <div id="chat_chat">
          {messages?.map((x: any) => (
            <ChatComponent roomid={roomid} props={x} key={x.id} />
          ))}
        </div>
      </div>
    </>
  );
}
