import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


async function getToken() {
  const options = {
    method: "POST",
    url: "https://api.immersivelabs.online/v1/immersive_auth/sessions",
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.0.0",
    },
    data: {
      account: { email: process.env.EMAIL, password: process.env.PASSWORD },
    },
  };

  const res = await axios.request(options);
  return parseCookies(res.headers['set-cookie'][2])['_session_id'];
}

function parseCookies(cookies: string): { [key: string]: string } {
  return cookies
    .split(/; /g)
    .reduce((cookieDict: { [key: string]: string }, cookie) => {
      const [key, value] = cookie.split("=");
      cookieDict[key] = value;
      return cookieDict;
    }, {});
}

// export getToken
export { getToken };
