import axios from "axios";

async function ping(cookie: string) {
  const options = {
    method: "POST",
    url: "https://api.immersivelabs.online/v1/user/fruit_bowl",
    headers: {
      cookie:
        `_session_id=${cookie}`,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0",
      "Content-Type": "application/json",
    },
    data: {
      fruitBowl: {
        hitType: "pageview",
        documentLocationURL:
          "https://immersivelabs.online/progress/leaderboard",
        documentHostName: "immersivelabs.online",
        documentPath: "/progress/leaderboard",
        screenResolution: "1x1",
        viewportSize: "1x1",
      },
    },
  };

  try {
    const res = await axios.request(options);
    if (res.status.toString().startsWith("2")) {
        return true
    }
  } catch (error) {
    if (error.response.status.toString().startsWith("4")) {
        return false
    }
    console.log(error);
  }
}
// export ping
export { ping };
