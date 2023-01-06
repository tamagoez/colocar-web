import { MdOutlineChat } from "react-icons/md";
import { CgDarkMode, CgProfile, CgTimelapse } from "react-icons/cg";
import { VscNotebook } from "react-icons/vsc";
import { RxIdCard } from "react-icons/rx";
import Link from "next/link";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { playSound } from "../scripts/notification/sound";
import { nobarpc, nobarsp } from "../files/ignorebar";

export default function SidebarParent() {
  const session = useSession();
  const signinstatus = session ? true : false;
  const router = useRouter();
  if (nobarpc.includes(router.pathname)) return <></>;
  return (
    <>
      <style jsx>{`
        .Sidebar-Box {
          height: 100%;
          width: 5%;
          min-width: 30px;
          max-width: 80px;
          background-color: #f5f3f2;
          padding-top: 0px;
          text-align: center;
          z-index: 10000;
          filter: drop-shadow(-30px 0 20px rgba(0, 0, 0, 0.9));
          transition: all 300ms 0s ease;
          position: fixed;
          top: 0;
        }
        .Sidebar-Box:hover {
          width: 80px;
          filter: drop-shadow(-18px 0 20px rgba(0, 0, 0, 0.9));
        }
        .Sidebar-Box:hover > .Sidebar-Box:hover .sidebar-button p {
          display: block;
        }
        @media (prefers-color-scheme: dark) {
          .Sidebar-Box {
            background-color: #202124;
          }
        }
      `}</style>
      <div className="Sidebar-Box">
        {signinstatus ? <AppTop smartphone={false} /> : <GuestTop />}
      </div>
    </>
  );
}

function AppTop({ smartphone }: { smartphone: boolean }) {
  return (
    <>
      <style jsx global>{`
        .bar-wrapper {
          display: flex;
          flex-direction: ${smartphone ? "row" : "column"};
          gap: 30px;
          justify-content: center;
          margin-top: ${smartphone ? "8px" : "15px"};
        }
        .sidebar-button {
          border-radius: 15px;
        }
        .sidebar-button:hover {
          background-color: #d1ae15;
          color: white;
        }
        .sidebar-buttonicon {
          font-size: ${smartphone ? "30px" : "26px"};
        }
        .sidebar-button p {
          font-size: 10px;
          margin: 0;
          display: ${smartphone ? "none" : "block"};
        }
      `}</style>
      <div className="bar-wrapper">
        <Link href="/dashboard">
          <div className="sidebar-button">
            <span className="sidebar-buttonicon">
              <RxIdCard />
            </span>
            <p>Dashboard</p>
          </div>
        </Link>
        <Link href="/concent/dashboard">
          <div className="sidebar-button">
            <span className="sidebar-buttonicon">
              <CgTimelapse />
            </span>
            <p>Concent</p>
          </div>
        </Link>
        <Link href="/whitenote/dashboard">
          <div className="sidebar-button">
            <span className="sidebar-buttonicon">
              <VscNotebook />
            </span>
            <p>Whitenote</p>
          </div>
        </Link>
        <Link href="/chat">
          <div className="sidebar-button">
            <span className="sidebar-buttonicon">
              <MdOutlineChat />
            </span>
            <p>Chat</p>
          </div>
        </Link>
        <Link href="/profile">
          <div className="sidebar-button">
            <span className="sidebar-buttonicon">
              <CgProfile />
            </span>
            <p>Profile</p>
          </div>
        </Link>
        <div className="sidebar-button" onClick={() => changemode()}>
          <span className="sidebar-buttonicon">
            <CgDarkMode />
          </span>
        </div>
      </div>
    </>
  );
}
function changemode() {
  playSound();
}

function GuestTop() {
  return (
    <>
      <style jsx>{`
        .sidebar-button {
          border-radius: 15px;
          margin-top: 25px;
        }
        .sidebar-button:hover {
          background-color: #d1ae15;
          color: white;
        }
        .sidebar-buttonicon {
          font-size: 26px;
        }
        .sidebar-button p {
          font-size: 11px;
          margin: 0;
        }
      `}</style>
      <Link href="/auth">
        <div className="sidebar-button">
          <span className="sidebar-buttonicon">
            <CgProfile />
          </span>
          <p>Login</p>
        </div>
      </Link>
      <div className="sidebar-button" onClick={() => changemode()}>
        <span className="sidebar-buttonicon">
          <CgDarkMode />
        </span>
      </div>
    </>
  );
}

export function SmartphoneBar() {
  const session = useSession();
  const signinstatus = session ? true : false;
  const router = useRouter();
  if (nobarsp.includes(router.pathname)) return <></>;
  return (
    <>
      <style jsx>{`
        .Sidebar-Box {
          height: 50px;
          width: 100vw;
          background-color: #f5f3f2;
          padding-top: 0px;
          text-align: center;
          z-index: 10000;
          filter: drop-shadow(0 -10px 20px rgba(0, 0, 0, 0.2));
          transition: all 300ms 0s ease;
          position: fixed;
          top: 0;
        }
        .Sidebar-Box:hover {
          filter: drop-shadow(0 -10px 20px rgba(0, 0, 0, 0.4));
        }
        @media (prefers-color-scheme: dark) {
          .Sidebar-Box {
            background-color: #202124;
          }
        }
      `}</style>
      <div className="Sidebar-Box">
        {signinstatus ? <AppTop smartphone={true} /> : <GuestTop />}
      </div>
    </>
  );
}
