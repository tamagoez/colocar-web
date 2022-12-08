import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signIn } from "../scripts/auth";

export default function Auth() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) redirecturl();
  }, [session]);

  async function redirecturl() {
    router.replace(accessurl);
  }

  let accessurl = "/auth";
  if (typeof window !== "undefined") {
    if (window.location.pathname.length === "/auth".length)
      accessurl = "/dashboard";
    else accessurl = window.location.pathname.slice("/auth".length) as string;
  }
  console.log(accessurl);

  async function runSignIn() {
    await signIn(
      (document.getElementById("emailinput") as HTMLInputElement).value,
      (document.getElementById("passwordinput") as HTMLInputElement).value
    );
  }
  return (
    <>
      {!session ? (
        <>
          <label htmlFor="emailinput">メールアドレス</label>
          <input type="email" id="emailinput" autoComplete="email" />
          <label htmlFor="passwordinput">パスワード</label>
          <input
            type="password"
            id="passwordinput"
            autoComplete="current-password"
          />
          <button onClick={() => runSignIn()}>ログイン</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
