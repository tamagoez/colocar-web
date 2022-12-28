async function execHMD(url: string) {
  const token = process.env.NEXT_PUBLIC_HACKMD_TOKEN;
  const response = await fetch(`https://api.hackmd.io/v1/${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function hmdMe() {
  const data = await execHMD("me");
  return data;
}
