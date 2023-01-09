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
    if (alinit) router.replace("/dashboard");
    else router.replace("/profile");
  }

  useEffect(() => {
    tempInit(session);
  }, [session]);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: { input: { fontSize: "16px" } },
          }}
          theme="dark"
          providers={["google", "twitter", "discord"]}
          localization={{
            variables: {
              sign_up: {
                email_label: "メールアドレス",
                password_label: "パスワード作成",
                email_input_placeholder: "Your email address",
                password_input_placeholder: "Your password",
                button_label: "新規登録",
                social_provider_text: "Login with",
                link_text: "ログインの代わりに新規登録する",
              },
              sign_in: {
                email_label: "メールアドレス",
                password_label: "パスワード",
                email_input_placeholder: "Your email address",
                password_input_placeholder: "Your password",
                button_label: "ログイン",
                social_provider_text: "Login with",
                link_text: "新規登録の代わりにログインする",
              },
              magic_link: {
                email_input_label: "Email address",
                email_input_placeholder: "Your email address",
                button_label: "Send Magic Link",
                link_text: "Send a magic link email",
              },
              forgotten_password: {
                email_label: "Email address",
                password_label: "Your Password",
                email_input_placeholder: "Your email address",
                button_label: "Send reset password instructions",
                link_text: "Forgot your password?",
              },
              update_password: {
                password_label: "New password",
                password_input_placeholder: "Your new password",
                button_label: "Update password",
              },
            },
          }}
        />
      ) : (
        <p>Please wait...</p>
      )}
    </div>
  );
};

export default Home;
