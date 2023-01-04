import { fetchRoomLists } from "../../scripts/chat/roominfo";
import { useEffect, useState } from "react";
import Link from "next/link";

interface listtype {
  id: string;
  name: string;
  type: string;
  permit: boolean;
}

export function WideMenu({ userlist: listdata }: { userlist?: object[] }) {
  const [userlist, setUserlist] = useState<object[] | undefined>(listdata);
  const [searchv, setSearchv] = useState<string>("");
  async function fetchLists() {
    if (!userlist) setUserlist(await fetchRoomLists());
  }
  useEffect(() => {
    fetchLists();
    console.log(userlist);
  }, []);
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
      {userlist?.map((x: any) => (
        <ListComponent prop={x} key={x.id} searchv={searchv} />
      ))}
    </>
  );
}

function ListComponent({ prop, searchv }: { prop: listtype; searchv: string }) {
  if (searchv === "" || ~prop.name.indexOf(searchv)) {
    return (
      <>
        <style jsx>{`
          div {
            background-color: gray;
            border-radius: 10px 10px 10px 10px;
            height: 70px;
            transition: all 300ms 0s ease;
          }
          div:hover {
            background-color: gray;
            cursor: pointer;
            border-radius: 20px 20px 20px 20px;
          }
        `}</style>
        <Link href={`/chat/${prop.id}`}>
          <div>{prop.name}</div>
        </Link>
      </>
    );
  } else {
    return <></>;
  }
}
