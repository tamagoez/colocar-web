async function execHMD(url: string) {
  const token = process.env.NEXT_PUBLIC_HACKMD_TOKEN;
  const response = await fetch(`https://api.hackmd.io/v1/${url}`, {
    mode: "cors", // no-cors, *cors, same-origin
    credentials: "same-origin", // include, *same-origin, omit
    referrerPolicy: "strict-origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
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
