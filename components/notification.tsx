import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();
import { useState } from "react";
import { playSound } from "../scripts/notification/sound";

export default function NotificationComponent({
  userintid,
  type,
  value,
}: {
  userintid: string;
  type: string;
  value: string;
}) {
  return (
    <>
      <style jsx>{`
        .noticomp {
          position: fixed;
          z-index: 10001;
          height: 100px;
          width: 80%;
          max-width: 800px;
          background-color: white;
          filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.1));
          text-align: center;
          border-radius: 0 0 10px 10px;
          transition: all 400ms 0s ease;
          top: -90px;
          opacity: 0.6;
        }
        .noticomp p {
          padding-top: 15px;
        }
        .noticomp:hover {
          opacity: 1;
          top: 0;
        }
        #bottomnoti {
          transform: translateY(-26px);
          color: gray;
          font-size: 12px;
        }
      `}</style>
      <div className="noticomp">
        <p>
          {type == 1
            ? "新規メッセージがあるっぽいです"
            : "通知が来ると何か表示されるはず"}
        </p>
        <p></p>
        <p id="bottomnoti">新規通知があります: ID{value}</p>
      </div>
    </>
  );
}
