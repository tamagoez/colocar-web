import "../styles/globals.css";
import "../styles/twemoji.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import SidebarParent from "../components/sidebar";
import { useRouter } from "next/router";
import { getUserIntId } from "../scripts/user";
import NotificationComponent from "../components/notification";
import { playSound, prepareSound } from "../scripts/notification/sound";

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const allowurls = ["/", "/login", "/signup", "/auth", "/features"];
  const router = useRouter();
  const [useruuid, setUseruuid] = useState();
  const [userintid, setUserintid] = useState();
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
    setUserintid(await getUserIntId(data.id));
  }
  useEffect(() => {
    checkpermission();
  }, [router]);
  if (typeof document !== "undefined")
    document.body.addEventListener(
      "click",
      () => {
        prepareSound();
      },
      { once: true }
    );
  if (typeof location !== "undefined")
    if (location.pathname === "/dashboard") {
      return (
        <>
          <style jsx>{`
            .main-content {
              width: 100%;
            }
          `}</style>
          <div className="main-content">
            <Component {...pageProps} />
          </div>
        </>
      );
    }
  return (
    <>
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
    </>
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
  supabase
    .channel(`public:notification:userid=eq.${userintid}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "*", table: "notification" },
      (payload: any) => {
        console.log("Notification received!", payload.new);
        setNotify(payload.new);
        playSound();
      }
    )
    .subscribe();
  if (userintid)
    return (
      <>
        <style jsx>{`
          #notifybox {
            position: fixed;
            top: 0;
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
  return null;
}
