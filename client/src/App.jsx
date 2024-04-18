import "./App.css";
import { useEffect, useState } from "react";
import ArtistCard from "./components/ArtistCard";
import artistIds from "./artistIds";

function App() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const [artistData, setArtistData] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const artistIdsString = artistIds.join(",");

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

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

    const authAccess = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(
      `https://api.spotify.com/v1/artists?ids=${artistIdsString}`,
      authAccess
    )
      .then((result) => result.json())
      .then((data) => {
        const shuffledArtists = shuffleArray(data.artists).slice(0, 10);
        setArtistData(shuffledArtists);
      })
      .catch((error) => {
        console.error("Error fetching artist data:", error);
      });
  }, []);

  return (
    <>
      <h2>Artistes à succès :</h2>
      <section className="popular-artist">
        {artistData.map((artist) => (
          <ArtistCard
            key={artist.name}
            artistName={artist.name}
            imageUrl={artist.images[1].url}
          />
        ))}
      </section>
    </>
  );
}

export default App;
