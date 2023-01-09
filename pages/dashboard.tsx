import { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@supabase/auth-helpers-react";
import { getUsername } from "../scripts/profile";
import { VscNotebook } from "react-icons/vsc";
import Link from "next/link";
import { CgTimelapse } from "react-icons/cg";
import { MdOutlineChat } from "react-icons/md";

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const time = [date.getHours(), date.getMinutes(), date.getSeconds()];
  const [h, m, s] = time;
  const [username, setUsername] = useState("");
  const user = useUser();
  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    setUsername(await getUsername());
  }
  setInterval(() => {
    setDate(new Date());
  }, 500);
  return (
    <>
      <style jsx>{`
        .clock {
          position: fixed;
          top: 0;
          display: flex;
          width: 100%;
        }
        .clock-wrap {
          margin: 0 auto;
          display: flex;
        }
        .big-clock {
          font-size: 70px;
          color: white;
          z-index: 1000;
          text-shadow: 0px 0px 4px white;
        }
        .small-clock {
          font-size: 40px;
          color: white;
          z-index: 1000;
          text-shadow: 0px 0px 4px white;
          align-self: center;
          padding-top: 30px;
          padding-left: 10px;
        }
        .background-img {
          position: fixed;
          height: 100vh;
          width: 100vw;
          z-index: -1;
          filter: brightness(80%) blur(1.5px);
        }
        .button {
          width: 100px;
          height: 100px;
          border-radius: 15px;
          border: 2px white solid;
        }
        .button:hover {
          filter: brightness(1.1);
          backdrop-filter: blur(1px);
          filter: blur(0.5px);
          background-color: rgba(255, 255, 255, 0.3);
        }
        .button-icon {
          font-size: 35px;
          color: white;
          text-shadow: 0px 0px 3px white;
          margin: 0;
          text-align: center;
          padding-top: 15px;
        }
        .button-text {
          color: white;
          font-size: 14px;
          margin: 0;
          text-align: center;
          text-shadow: 0px 0px 3px white;
        }
        .welcome {
          color: white;
          font-size: 18px;
          margin: 0;
          text-align: center;
          text-shadow: 0px 0px 2px white;
        }
        .buttons {
          display: flex;
          gap: 5px;
          margin: 0 auto;
        }
      `}</style>
      <div style={{ zIndex: -100 }}>
        <img
          src="/background_00033.jpg"
          alt="background"
          className="background-img"
        />
      </div>
      <div className="clock">
        <div className="clock-wrap">
          <h1 className="big-clock">
            {("00" + h).slice(-2)}:{("00" + m).slice(-2)}
          </h1>
          <h2 className="small-clock">{("00" + s).slice(-2)}</h2>
        </div>
      </div>
      <div style={{ paddingBottom: "170px" }} />
      <p className="welcome">Welcome {username}!</p>
      <div className="buttons">
        <ListButton
          url="/concent/dashboard"
          title="Concent"
          icon={<CgTimelapse />}
        />
        <ListButton
          url="/whitenote/dashboard"
          title="Whitenote"
          icon={<VscNotebook />}
        />
        <ListButton url="/chat" title="Chat" icon={<MdOutlineChat />} />
      </div>
    </>
  );
}

function ListButton({
  url,
  title,
  icon,
}: {
  url: string;
  title: string;
  icon: any;
}) {
  return (
    <Link href={url}>
      <style jsx>{`
        .button {
          width: 100px;
          height: 100px;
          border-radius: 15px;
          border: 2px white solid;
        }
        .button:hover {
          backdrop-filter: blur(3px);
          filter: blur(0.5px) drop-shadow(0px 0px 20px rgba(122, 122, 122, 1));
          background-color: rgba(255, 255, 255, 0.2);
        }
        .button-icon {
          font-size: 35px;
          color: white;
          text-shadow: 0px 0px 3px white;
          margin: 0;
          text-align: center;
          padding-top: 15px;
        }
        .button-text {
          color: white;
          font-size: 14px;
          margin: 0;
          text-align: center;
          text-shadow: 0px 0px 3px white;
        }
      `}</style>
      <div className="button">
        <p className="button-icon">{icon}</p>
        <p className="button-text">{title}</p>
      </div>
    </Link>
  );
}
