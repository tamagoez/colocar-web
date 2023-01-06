import { fetchRoomLists, fetchLastChatView } from "../../scripts/chat/roominfo";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { createRoom } from "../../scripts/chat/room";

interface listtype {
  roomid: string;
  roomname: string;
  type: string;
  permit: boolean;
}

export function WideMenu({ userlist: listdata }: { userlist?: object[] }) {
  const router = useRouter();
  const [userlist, setUserlist] = useState<any>(listdata);
  const [searchv, setSearchv] = useState<string>("");
  async function fetchLists() {
    if (!userlist) setUserlist(await fetchRoomLists());
  }
  useEffect(() => {
    fetchLists();
    console.log(userlist);
  }, []);
  async function createRoomPrompt() {
    const oppoid = prompt(
      "追加したい相手のハンドルIDを入力してください。(現時点では一人のみ対応しています)"
    );
    if (!oppoid) return;
    const roomid = await createRoom(oppoid);
    router.push(`/chat/${roomid}`);
  }
  return (
    <>
      <style jsx>{`
        h1 {
          margin: 0;
        }
        input {
          margin-left: 5%;
          width: 90%;
          margin-top: 10px;
          margin-bottom: 10px;
          border-radius: 10px 10px 10px 10px;
          border: 1px solid gray;
          font-size: 16px;
          transition: all 200ms 0s ease;
          height: 25px;
        }
        input[type="text"]:focus {
          border: 1px solid #ff9900;
          outline: 0;
          font-size: 18px;
          height: 40px;
        }
      `}</style>
      <h1>Chat</h1>
      <input
        type="text"
        onChange={(e) => setSearchv(e.target.value)}
        placeholder="ルーム名を検索"
      />
      <div style={{ cursor: "pointer" }} onClick={() => createRoomPrompt()}>
        <p>+ 新しいルームを作成する</p>
      </div>
      {userlist?.map((x: any) => (
        <ListComponent prop={x} key={x.id} searchv={searchv} />
      ))}
    </>
  );
}

function ListComponent({ prop, searchv }: { prop: listtype; searchv: string }) {
  const [lastchat, setLastchat] = useState("");
  const fetchd = async () => {
    setLastchat((await fetchLastChatView(prop.roomid))?.substring(0, 19));
  };
  useEffect(() => {
    fetchd();
  }, [prop]);
  if (searchv === "" || ~prop.roomname.indexOf(searchv)) {
    return (
      <>
        <style jsx>{`
          div {
            background-color: #f5f3f2;
            border-radius: 10px 10px 10px 10px;
            border: gray 1px solid;
            margin-bottom: 2px;
            height: 70px;
            transition: all 300ms 0s ease;
          }
          div:hover {
            background-color: gray;
            cursor: pointer;
            border-radius: 20px 20px 20px 20px;
          }
          #roomname {
            font-weight: 600;
            margin: 0;
            margin-top: 10px;
            margin-left: 10px;
            font-size: 17px;
          }
          #lastchat {
            margin: 0;
            margin-left: 11px;
            font-size: 15px;
          }
        `}</style>
        <Link href={`/chat/${prop.roomid}`}>
          <div>
            <p id="roomname">{prop.roomname}</p>
            <p id="lastchat">{lastchat}</p>
          </div>
        </Link>
      </>
    );
  } else {
    return <></>;
  }
}
