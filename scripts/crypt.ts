import generator from "generate-password";
const crypto = require("crypto");

export function makeHash(value: string) {
  // https://www.wakuwakubank.com/posts/739-node-crypto/
  const sha512 = crypto.createHash("sha512");
  sha512.update(value);
  const encoding = "hex"; // hexadecimal(16進数)
  const sha512Hash = sha512.digest(encoding);
  return sha512Hash;
}

export function compareHash(value: string, hash: string) {
  const valuehash = makeHash(value);
  return valuehash === hash;
}

export function generatePassword(length: number) {
  // https://dev.classmethod.jp/articles/generate-a-password-string-with-nodejs-that-satisfies-the-auth0-password-policy/
  const params = {
    length: length, //文字長指定
    numbers: true, //数字含む
    symbols: true, //記号含む
    lowercase: true, //英小文字含む
    uppercase: true, //英大文字含む
    exclude: '()+_-=}{[]|:;"/?.><,`~', //記号は !@#$%^&* のみ使用
    strict: true, //各文字種類から最低1文字ずつ使用
  };
  const genpass = generator.generate(params);
  console.log(`[createroom] generated password: ${genpass}`);
  return genpass;
}

export function encryptText(text: string, password?: string) {
  if (!password) return text;
  const cipher = crypto.createCipher("aes-256-cbc", password);
  const crypted = cipher.update(text, "utf-8", "hex");
  const crypted_text = crypted + cipher.final("hex");
  return crypted_text;
}

export function decryptText(text: string, password?: string) {
  if (!password) return text;
  const decipher = crypto.createDecipher("aes-256-cbc", password);
  const decrypted = decipher.update(text, "hex", "utf-8");
  const decrypted_text = decrypted + decipher.final("utf-8");
  return decrypted_text;
}
