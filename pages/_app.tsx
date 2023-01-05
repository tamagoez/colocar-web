import "../styles/globals.css";
import "../styles/twemoji.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import SidebarParent from "../components/sidebar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const allowurls = ["/", "/login", "/signup", "/auth", "/features"];
  const router = useRouter();
  async function checkpermission() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!allowurls.includes(location.pathname) && !user)
      router.replace(`/auth?next=${location.pathname}`);
  }
  useEffect(() => {
    checkpermission();
  }, [router]);
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
