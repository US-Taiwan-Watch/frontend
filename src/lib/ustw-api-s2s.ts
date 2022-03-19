interface IdToken {
  access_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}

let cachedToken: IdToken | undefined;

export const getS2SToken = async () => {
  if (!cachedToken || cachedToken.expires_in <= new Date().getTime()) {
    const res = await fetch(
      `https://us-taiwan-watch.us.auth0.com/oauth/token`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.AUTH0_S2S_CLIENT_ID,
          client_secret: process.env.AUTH0_S2S_CLIENT_SECRET,
          audience: "https://api.ustw.watch",
          grant_type: "client_credentials",
        }),
      }
    );

    if (res.ok) {
      const token = await res.json();
      if (token) {
        cachedToken = {
          ...token,
          expires_in: new Date().getTime() + token.expires_in * 1000,
        };

        console.log(
          `Refreshed USTW API token expires_in = ${new Date(
            cachedToken!.expires_in
          )}`
        );
      }
    }
  }

  return cachedToken?.access_token;
};
