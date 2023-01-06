import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Twemoji from "react-twemoji";
import remarkBreaks from "remark-breaks";
import { decryptChat } from "../../scripts/chat/crypt";
import { CgTrash } from "react-icons/cg";

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
  userid,
}: {
  roomid: string;
  props: ccprop;
  userid: string | undefined;
}) {
  const chattext = decryptChat(props.text, props.userid);
  return (
    <div className="chatbox">
      {props.userid === userid ? (
        <MyChatCompo text={chattext} />
      ) : (
        <OtherChatCompo text={chattext} />
      )}
    </div>
  );
}

function MyChatCompo({ text }: { text: string }) {
  return (
    <>
      <style jsx global>{`
        .chat_mycompo {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-top: 4px;
        }
        .chat_mycompo_wrap {
          display: inline-flex;
          align-items: center;
          max-width: 80%;
        }
        .chat_mycompo p {
          font-size: 17px;
          /* 上 | 右 | 下 | 左 */
          margin: 3px 3px 3px 4px;
          line-height: 1.3;
        }
        .chat_mycompo_textwrap * {
          margin-block-start: 6px;
          margin-block-end: 6px;
        }
        .chat_mycompo_textwrap {
          background-color: #b2dfdb;
          margin-right: 10px;
          border-radius: 12px 0px 12px 12px;
          padding-right: 8px;
          padding-left: 8px;
          margin-block-end: 0;
        }
        .chat_mycompo_wrap button {
          outline: none;
          background-color: rgb(0, 0, 0, 0);
        }
      `}</style>
      <div className="chat_mycompo">
        <div className="chat_mycompo_wrap">
          <div className="chat_mycompo_textwrap">
            <Twemoji options={{ className: "twemoji" }}>
              <ReactMarkdown
                remarkPlugins={[gfm, remarkBreaks]}
                unwrapDisallowed={false}
                linkTarget="_blank"
              >
                {text}
              </ReactMarkdown>
            </Twemoji>
          </div>
          <button>
            <CgTrash />
          </button>
        </div>
      </div>
    </>
  );
}

function OtherChatCompo({ text }: { text: string }) {
  return (
    <>
      <style jsx global={true}>{`
        .chat_othercompo {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          margin-top: 4px;
          margin-left: 6px;
        }
        .chat_othercompo_wrap {
          display: inline-flex;
          align-items: center;
          max-width: 80%;
        }
        .chat_othercompo p {
          margin: 0;
          /* 上 | 右 | 下 | 左 */
          margin: 3px 4px 3px 3px;
          line-height: 1.3;
        }
        .chat_othercompo_textwrap * {
          margin-block-start: 6px;
          margin-block-end: 6px;
        }
        .chat_othercompo_textwrap {
          background-color: #eeeeee;
          margin-right: 10px;
          border-radius: 0px 12px 12px 12px;
          padding-right: 8px;
          padding-left: 8px;
          margin-block-end: 0;
        }
      `}</style>
      <div className="chat_othercompo">
        <div className="chat_othercompo_wrap">
          <div className="chat_othercompo_textwrap">
            <Twemoji options={{ className: "twemoji" }}>
              <ReactMarkdown
                remarkPlugins={[gfm, remarkBreaks]}
                unwrapDisallowed={false}
                linkTarget="_blank"
              >
                {text}
              </ReactMarkdown>
            </Twemoji>
          </div>
        </div>
      </div>
    </>
  );
}
