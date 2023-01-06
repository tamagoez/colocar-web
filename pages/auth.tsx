import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { Router, useRouter } from "next/router";
import { initProfile } from "../scripts/profile";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  async function tempInit(session: any) {
    if (!session) return;
    const alinit = await initProfile();
    if (alinit) router.replace("/dashboard")
    else router.replace("/profile")
  }
  
  useEffect(() => {
    tempInit(session)
  }, [session]);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      ) : (
        <p>Please wait...</p>
      )}
    </div>
  );
};

export default Home;
