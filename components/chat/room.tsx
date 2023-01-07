import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { fetchMemberPass } from "../../scripts/chat/crypt";
import { fetchRoomChats, fetchRoomName } from "../../scripts/chat/roominfo";
import { ChatComponent } from "./chat";
import { sendMessage } from "../../scripts/chat/message";
import { decryptChat } from "../../scripts/chat/crypt";
import { getUserId } from "../../scripts/user";
import { changeRoomname } from "../../scripts/chat/room";
import { playSound } from "../../scripts/notification/sound";

export function DefaultRoom({ roomid }: { roomid: string }) {
  const router = useRouter();
  const [userid, setUserid] = useState<string>();
  const [messages, setMessages] = useState<object[] | undefined>([]);
  const [newMessage, setNewMessage] = useState(null);
  const [newMessageId, setNewMessageId] = useState(null);
  const [roomname, setRoomname] = useState("Chat");
  const [newmes, setNewmes] = useState<string>("");
  useEffect(() => {
    chatinit(roomid);
  }, [roomid]);
  // メッセージ取得
  async function fetchMessages(roomid: string) {
    setMessages(await fetchRoomChats(roomid));
  }
  async function chatinit(roomid: string) {
    setUserid(await getUserId());
    setRoomname(await fetchRoomName(roomid));
    const mempass = await fetchMemberPass(roomid);
    if (typeof window !== "undefined")
      window.sessionStorage.setItem("roompass", JSON.stringify(mempass));
    await fetchMessages(roomid);
    supabase
      .channel(`public:ch_chats:roomid=eq.${roomid}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "*", table: "ch_chats" },
        (payload: any) => {
          console.log("Change received!", payload.new);
          setNewMessage(payload.new);
        }
      )
      .subscribe();
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        block: "start",
      });
    }, 20);
  }
  function addnewmessage(data: any) {
    if (!data) return;
    if (data.id === newMessageId) return;
    if (data.type === "text") {
      if (!data.text || !data.userid) return;
      // const chattext = decryptChat(data.text, data.userid);
      setNewMessageId(data.id);
      setMessages(
        messages!.concat({
          id: data.id,
          userid: data.userid,
          type: data.type,
          text: data.text,
          url: data.url,
          created_at: data.created_at,
        })
      );
    }
    if (data.userid !== userid) {
      playSound();
    }
    let innerHeight = window.innerHeight;
    let elementslists = document.getElementsByClassName("chatbox");
    let scrollpos =
      elementslists[elementslists.length - 2]?.getBoundingClientRect().bottom;
    console.log(`innerHeight: ${innerHeight} / scrollpos: ${scrollpos}`);
    if (scrollpos <= innerHeight - 50) {
      console.log("scroll");
      setTimeout(() => {
        scroll();
      }, 20);
    } else {
      setNewmes("新規メッセージがあります");
    }
  }
  useEffect(() => {
    addnewmessage(newMessage);
  }, [newMessage]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  function scroll() {
    messagesEndRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
  if (typeof window !== "undefined") {
    let timer: any = null;
    window.addEventListener(
      "scroll",
      () => {
        clearTimeout(timer);
        timer = setTimeout(function () {
          newchatbarcheck();
        }, 500);
      },
      { once: false }
    );
  }
  function newchatbarcheck() {
    let innerHeight = window.innerHeight;
    let elementslists = document.getElementsByClassName("chatbox");
    let scrollpos =
      elementslists[elementslists.length - 1]?.getBoundingClientRect().bottom;
    console.log(scrollpos);
    if (scrollpos <= innerHeight - 50) {
      setNewmes("");
    }
  }
  async function takeydown(event: any) {
    if (!event.shiftKey && event.key === "Enter") {
      const textval = (
        document.getElementById("chatinput")! as HTMLTextAreaElement
      ).value;
      (document.getElementById("chatinput") as HTMLInputElement).value = "";
      document.getElementById("chatinput")!.focus;
      await sendMessage(textval, roomid);
      setTimeout(() => {
        (document.getElementById("chatinput") as HTMLInputElement).value = "";
        document.getElementById("chatinput")!.focus;
      }, 20);
    }
  }
  function changeroomname() {
    const roomnamevalue = prompt(
      "ルーム名を入力してください(相手には反映されません)",
      roomname
    );
    if (!roomnamevalue) return;
    changeRoomname(roomid, roomnamevalue);
    setRoomname(roomnamevalue);
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
          height: 40px;
          width: 100%;
        }
        .chat_header h1 {
          margin: 0;
          font-size: 24px;
        }
        .bottom-newchat {
          position: fixed;
          bottom: 48px;
          width: 100%;
          background-color: rgb(0, 0, 0, 0.6);
          color: white;
          height: 30px;
        }
        .bottom-newchat p {
          margin: 0;
          margin-top: 4px;
        }
        .bottom-bar {
          position: fixed;
          bottom: 0;
          width: 100%;
          display: flex;
          height: 48px;
          background-color: white;
          background-color: rgb(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
        }
        .bottom-bar textarea {
          width: 90%;
          font-size: 16px;
        }
        .chat_chat {
          width: 100%;
        }
      `}</style>
      <div id="roomroot">
        <header className="chat_header">
          <button onClick={() => router.back()}>{"<"}</button>
          <h1>{roomname}</h1>
          <p onClick={() => scroll()}>↓</p>
          <button
            onClick={() => {
              changeroomname();
            }}
          >
            変更
          </button>
        </header>
        <div id="chat_chat">
          {messages?.map((x: any) => (
            <ChatComponent
              roomid={roomid}
              props={x}
              key={x.id}
              userid={userid}
            />
          ))}
        </div>
        <div ref={messagesEndRef} style={{ height: "50px" }} id="scrollpos" />
        <div
          className="bottom-newchat"
          style={{
            display: newmes !== "" ? "block" : "none",
            cursor: "pointer",
          }}
          onClick={() => scroll()}
        >
          <p>{newmes}</p>
        </div>
        <div className="bottom-bar">
          <textarea id="chatinput" onKeyDown={(e) => takeydown(e)}></textarea>
        </div>
      </div>
    </>
  );
}
