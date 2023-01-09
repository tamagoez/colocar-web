import "../styles/globals.css";
import "../styles/twemoji.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import SidebarParent, { SmartphoneBar } from "../components/sidebar";
import { useRouter } from "next/router";
import { getUserInt } from "../scripts/user";
import NotificationComponent from "../components/notification";
import { LockFull } from "../components/lock";
import { playSound, prepareSound } from "../scripts/notification/sound";
import getUA from "../lib/getUA";
import { nobarpc, nobarsp } from "../files/ignorebar";
import { Zen_Kaku_Gothic_New } from "@next/font/google";
const ZenKakuGothicNew_normal = Zen_Kaku_Gothic_New({
  weight: "400",
  subsets: ["japanese"],
});

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const router = useRouter();
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const allowurls = [
    "/",
    "/login",
    "/signup",
    "/auth",
    "/features",
    "/getprivillage",
  ];

  const [useruuid, setUseruuid] = useState();
  const [userintid, setUserintid] = useState();
  const [spsize, setSpsize] = useState(false);
  async function checkpermission() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!allowurls.includes(location.pathname) && !user)
      router.replace(`/auth?next=${location.pathname}`);
    if (user) userinit(user);
  }
  async function userinit(data: any) {
    setUseruuid(data.id);
    setUserintid(await getUserInt());
  }
  useEffect(() => {
    checkpermission();
  }, [router]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 800) {
          setSpsize(true);
        } else {
          setSpsize(false);
        }
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  if (typeof document !== "undefined") {
    document.body.addEventListener(
      "click",
      () => {
        prepareSound();
      },
      { once: true }
    );
  }
  if (
    false &&
    typeof window !== "undefined" &&
    window.localStorage.getItem("adminunlock") !== "true" &&
    router.pathname !== "/getprivillage"
  ) {
    return (
      <>
        <LockFull />
      </>
    );
  }
  if (
    (spsize && nobarsp.includes(router.pathname)) ||
    (!spsize && nobarpc.includes(router.pathname))
  ) {
    return (
      <main className={ZenKakuGothicNew_normal.className}>
        <style jsx>{`
          .main-content {
            width: 100vw;
          }
        `}</style>

        <div className="main-content">
          <NotificationWrapper userintid={userintid} supabase={supabase} />
          <Component {...pageProps} />
        </div>
      </main>
    );
  }
  const smartphone = getUA();

  if (spsize)
    return (
      <main className={ZenKakuGothicNew_normal.className}>
        <style jsx>{`
          .content-wrapper {
          }
          .parent-frame {
            width: 100vw;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          .content-padding {
            width: 100%;
            height: 56px;
          }
          .main-content {
            height: 100%;
            width: 100%;
          }
        `}</style>
        <SessionContextProvider
          supabaseClient={supabase}
          initialSession={pageProps.initialSession}
        >
          <NotificationWrapper userintid={userintid} supabase={supabase} />
          <div className="content-wrapper">
            <audio id="notifysound" preload="auto">
              <source src="/chat/xylophone.mp3" type="audio/mp3" />
            </audio>
            <SmartphoneBar />
            <div className="parent-frame">
              <div className="content-padding" />
              <div className="main-content">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </SessionContextProvider>
      </main>
    );
  else
    return (
      <main className={ZenKakuGothicNew_normal.className}>
        <style jsx>{`
          .content-wrapper {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
          }
          .parent-frame {
            width: 100%;
            display: flex;
            height: 100%;
          }
          .content-padding {
            width: 6%;
            min-width: 31px;
            max-width: 85px;
          }
          .main-content {
            width: 100%;
          }
        `}</style>
        <SessionContextProvider
          supabaseClient={supabase}
          initialSession={pageProps.initialSession}
        >
          <NotificationWrapper userintid={userintid} supabase={supabase} />
          <div className="content-wrapper">
            <audio id="notifysound" preload="auto">
              <source src="/chat/xylophone.mp3" type="audio/mp3" />
            </audio>
            <SidebarParent />
            <div className="parent-frame">
              <div className="content-padding" />
              <div className="main-content">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </SessionContextProvider>
      </main>
    );
}
export default MyApp;

function NotificationWrapper({
  userintid,
  supabase,
}: {
  userintid: string | undefined;
  supabase: any;
}) {
  const [notify, setNotify] = useState({ value: "", type: "" });

  if (userintid) {
    supabase
      .channel(`public:notification:userid=eq.${userintid}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "*", table: "notification" },
        (payload: any) => {
          let data = payload.new;
          if (data.userid === userintid) {
            console.log("Notification received!", payload.new);
            setNotify(payload.new);
            playSound();
          }
        }
      )
      .subscribe();
    console.info("subscribe noti:", userintid);
    return (
      <>
        <style jsx>{`
          #notifybox {
            display: flex;
            justify-content: center;
            width: 100vw;
            z-index: 10001;
          }
        `}</style>
        <div id="notifybox">
          <NotificationComponent
            userintid={userintid}
            type={notify.type}
            value={notify.value}
          />
        </div>
      </>
    );
  }
  return null;
}
