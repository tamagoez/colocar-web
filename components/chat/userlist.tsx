import { fetchRoomLists } from "../../scripts/chat/roominfo";
import { useEffect, useState } from "react";

export function WideMenu({ userlist: listdata }: { userlist?: object[] }) {
  const [userlist, setUserlist] = useState<object[] | undefined>(listdata);
  async function fetchLists() {
    if (!userlist) setUserlist(await fetchRoomLists());
  }
  useEffect(() => {
    fetchLists();
    console.log(userlist);
  }, []);
  return (
    <>
      <textarea value={userlist} />
    </>
  );
}
