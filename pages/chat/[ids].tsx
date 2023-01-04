import { DefaultRoom } from "../../components/chat/room";

export default function TempOneroom() {
  let viewurl = "/chat/";
  if (typeof window !== "undefined")
    viewurl = window.location.pathname.slice(viewurl.length) as string;
  const roomid = viewurl;
  console.log("roomid:", roomid);
  return (
    <>
      <DefaultRoom roomid={roomid} />
    </>
  );
}
