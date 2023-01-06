import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarSpinner } from "../components/spinner";
import { fetchProfile, upsertProfile } from "../scripts/profile";

export default function Profile() {
  const router = useRouter()
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string>("");
  const [displayhandleid, setDisplayHandleId] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    getProfile();
  }, [user]);

  async function getProfile() {
    if (!user) return;
    const fetchdata = await fetchProfile(user!.id);
    setUsername(fetchdata.username);
    setDisplayHandleId(fetchdata.displayhandleid);
    setBirthday(fetchdata.birthday);
    setBio(fetchdata.bio);
    setLoading(false);
  }

  async function updateProfile() {
    if (!user) return;
    setLoading(true);
    const styledhandleid = displayhandleid.toString().toLowerCase();
    const returndata = await upsertProfile({
      userid: user!.id,
      username: username,
      displayhandleid: displayhandleid,
      handleid: styledhandleid,
      birthday: birthday,
      bio: bio,
    });
    if (returndata) setLoading(false);
  }

  return (
    <>
      {loading ? <BarSpinner /> : undefined}
      <h1>Profile</h1>
      <div>
        <label htmlFor="username">ユーザー名</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="displayhandleid">ハンドルID</label>
        <input
          value={displayhandleid}
          onChange={(e) => setDisplayHandleId(e.target.value)}
          id="displayhandleid"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="birthday">誕生日</label>
        <input
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          id="birthday"
          disabled={loading}
          type="date"
        />
      </div>
      <div>
        <label htmlFor="bio">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          id="bio"
          disabled={loading}
        />
      </div>
      <button onClick={() => updateProfile()}>保存する</button>
      <button onClick={() => router.push("/logout")}>ログアウト</button>
    </>
  );
}
