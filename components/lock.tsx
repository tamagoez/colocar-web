import { useEffect, useState } from "react";
import { getAdminNote } from "../scripts/notification/fetch";
import { IoIosWarning } from "react-icons/io";

export function LockFull() {
  const [admintext, setAdmintext] = useState("");
  async function fetchadmin() {
    setAdmintext(await getAdminNote());
  }
  useEffect(() => {
    fetchadmin();
  }, []);
  if (
    typeof window !== "undefined" &&
    window.localStorage.getItem("adminunlock") !== "true"
  )
    return (
      <main>
        <style jsx>{`
          .lock {
            width: 100vw;
            height: 100vh;
            background-color: white;
            position: fixed;
            top: 0;
            z-index: 9998;
          }
          .lock p {
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
          }
          .lock span {
            font-weight: 600;
            padding-bottom: 10px;
          }
        `}</style>
        <div className="lock">
          <p>
            <span style={{ fontSize: "40px" }}>
              <IoIosWarning />
            </span>
            <br />
            <span style={{ fontWeight: "600" }}>
              動作が不安定なため、管理者以外のアクセスを制限しています。
              <br />
              誠に申し訳ございません。
            </span>
            <br />
            <span style={{ fontWeight: 400, fontSize: "14px" }}>
              管理者からのコメント: {admintext}
            </span>
          </p>
        </div>
      </main>
    );
  return <></>;
}
