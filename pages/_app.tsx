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
  return (
    <>
      <style jsx>{`
        .content-wrapper {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
        }
        .main-content {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <div className="content-wrapper">
          <SidebarParent />
          <div className="main-content">
            <Component {...pageProps} />
          </div>
        </div>
      </SessionContextProvider>
    </>
  );
}
export default MyApp;
