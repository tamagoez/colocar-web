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
  return (
    <main>
      <style jsx>{`
        .lock {
          width: 100vw;
          height: 100vh;
          background-color: white;
          position: fixed;
          top: 0;
          z-index: 100000;
        }
        .lock p {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 18px;
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
          <span style={{ fontWight: "600" }}>
            動作が不安定なため、管理者以外のアクセスを制限しています。
            <br />
            誠に申し訳ございません。
          </span>
          <br />
          管理者からのコメント: {admintext}
        </p>
      </div>
    </main>
  );
}
