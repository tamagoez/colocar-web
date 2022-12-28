import { useEffect, useState } from "react";
import { hmdMe } from "../../scripts/whitenote/hackmd";
export default function AuthHackMD() {
  const [medata, setMedata] = useState("");
  async function getMedata() {
    setMedata(await hmdMe());
  }
  useEffect(() => {
    getMedata();
  }, []);
  return (
    <>
      <h1>HackMD</h1>
      <textarea value={medata}></textarea>
    </>
  );
}
