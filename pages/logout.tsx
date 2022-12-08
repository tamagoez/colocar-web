import { useRouter } from "next/router";
import { useEffect } from "react";
import { signOut } from "../scripts/auth";

export default function SignOut() {
  const router = useRouter();
  useEffect(() => {
    signOut().then(() => window.location.replace("/"));
  }, []);
  return <p>Signouting...</p>;
}
