export default function fetchAccessToken() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
  };

  return fetch("https://accounts.spotify.com/api/token", authParameters)
    .then((result) => result.json())
    .then((data) => {
      const accessToken = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${data.access_token}`,
        },
      };
      return accessToken;
    })
    .catch((error) => {
      console.error("Error getting token:", error);
    });
}
