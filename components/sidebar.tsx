import { MdOutlineChat } from "react-icons/md";
import { CgProfile, CgTimelapse } from "react-icons/cg";
import { RxIdCard } from "react-icons/rx";
import Link from "next/link";

export default function SidebarParent() {
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
      `}</style>
      <div className="Sidebar-Box">
        <AppTop />
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
      <div className="sidebar-button">
        <span className="sidebar-buttonicon">
          <RxIdCard />
        </span>
        <p>名前未定</p>
      </div>
      <div className="sidebar-button">
        <span className="sidebar-buttonicon">
          <CgTimelapse />
        </span>
        <p>Concent</p>
      </div>
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
