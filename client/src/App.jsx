import "./App.css";
import { useEffect, useState } from "react";
import ArtistCard from "./components/ArtistCard";

function App() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const [artistData, setArtistData] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token))
      .catch((error) => {
        console.error("Error getting token:", error);
      });

    const artistParameters = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(
      "https://api.spotify.com/v1/artists?ids=06HL4z0CvFAxyc27GXpf02,6eUKZXaKkcviH0Ku9w2n3V,1Xyo4u8uXC1ZmMpatF05PJ,3QVolfxko2UyCOtexhVTli,5YGY8feqx7naU7z4HrwZM6,5pKCCKE2ajJHZ9KAiaK11H,6M2wZ9GZgrQXHCFfjv46we,66CXWjxzNUsdJxJ2JdwvnR,3TVXtAsR1Inumwj472S9r4,0C8ZW7ezQVs4URX5aX7Kqx,6jJ0s89eD6GaHleKKya26X,1Cs0zKBU1kc0i8ypK3B9ai,4tZwfgrHOc3mvqYlEYSvVi,3AA28KZvwAUcZuOKwyblJQ,6KImCVD70vtIoJWnq6nGn3,6vWDO969PvNqNYHIOW5v0m,0lAWpj5szCSwM4rUMHYmrr,1KCSPY1glIKqW2TotWuXOR,6XyY86QOPPrYVGvF9ch6wz,0VJIBKdqJygrupAxpSTk7q",
      artistParameters
    )
      .then((result) => result.json())
      .then((data) => setArtistData(data.artists.slice(0, 20)))
      .catch((error) => {
        console.error("Error fetching artist data:", error);
      });
  }, []);

  return (
    <section className="popular-artist">
      <h2>Artistes à succès :</h2>
      {artistData.map((artist) => (
        <ArtistCard
          key={artist.name}
          artistName={artist.name}
          imageUrl={artist.images[1].url}
        />
      ))}
    </section>
  );
}

export default App;
