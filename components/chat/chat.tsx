import { decryptChat } from "../../scripts/chat/crypt";

interface ccprop {
  id: string;
  type: string;
  text: string;
  userid: string;
  url?: string;
  created_at: string;
}

export function ChatComponent({
  roomid,
  props,
}: {
  roomid: string;
  props: ccprop;
}) {
  const chattext = decryptChat(props.text, props.userid);
  return (
    <>
      <p>{chattext}</p>
    </>
  );
}
