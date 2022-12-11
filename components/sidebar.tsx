import { MdOutlineChat } from "react-icons/md";
import { CgProfile, CgTimelapse } from "react-icons/cg";
import { VscNotebook } from "react-icons/vsc";
import { RxIdCard } from "react-icons/rx";
import Link from "next/link";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function SidebarParent() {
  const session = useSession();
  const signinstatus = session ? true : false;
  const router = useRouter();
  if (router.pathname === "/dashboard") return <></>;
  return (
    <>
      <style jsx>{`
        .Sidebar-Box {
          height: 100%;
          width: 5%;
          min-width: 50px;
          background-color: #f5f3f2;
          padding-top: 0px;
          text-align: center;
        }
        @media (prefers-color-scheme: dark) {
          .Sidebar-Box {
            background-color: #202124;
          }
        }
      `}</style>
      <div className="Sidebar-Box">
        {signinstatus ? <AppTop /> : <GuestTop />}
      </div>
    </>
  );
}

function AppTop() {
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
      <div className="sidebar-button">
        <span className="sidebar-buttonicon">
          <MdOutlineChat />
        </span>
        <p>Message</p>
      </div>
      <Link href="/profile">
        <div className="sidebar-button">
          <span className="sidebar-buttonicon">
            <CgProfile />
          </span>
          <p>Profile</p>
        </div>
      </Link>
    </>
  );
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
    </>
  );
}
