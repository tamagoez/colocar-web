import { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@supabase/auth-helpers-react";
import { getUsername } from "../scripts/profile";
import { VscNotebook } from "react-icons/vsc";
import Link from "next/link";
import { CgTimelapse } from "react-icons/cg";

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const time = [date.getHours(), date.getMinutes(), date.getSeconds()];
  const [h, m, s] = time;
  const [username, setUsername] = useState<string>("Colocar");
  const user = useUser();
  useEffect(() => {
    getProfile();
  }, [user]);

  async function getProfile() {
    if (!user) return;
    setUsername(await getUsername(user!.id));
  }
  setInterval(() => {
    setDate(new Date());
  }, 500);
  return (
    <>
      <style jsx>{`
        .clock {
          display: flex;
          width: 100%;
          padding: 0;
          margin: 0;
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
          filter: brightness(90%);
        }
        .button {
          width: 100px;
          height: 100px;
          border-radius: 15px;
          border: 2px white solid;
        }
        .button:hover {
          opacity: 70%;
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
            {h}:{m}
          </h1>
          <h2 className="small-clock">{("00" + s).slice(-2)}</h2>
        </div>
      </div>
      <p className="welcome">Welcome {username}!</p>
      <div className="buttons">
        <Link href="/concent/dashboard">
          <div className="button">
            <p className="button-icon">
              <CgTimelapse />
            </p>
            <p className="button-text">Concent</p>
          </div>
        </Link>
        <Link href="/whitenote/dashboard">
          <div className="button">
            <p className="button-icon">
              <VscNotebook />
            </p>
            <p className="button-text">WhiteNote</p>
          </div>
        </Link>
      </div>
    </>
  );
}
