import "../App.css";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import MusicCard from "../components/MusicCard";

const types = [
  "acoustic",
  "afrobeat",
  "alt-rock",
  "alternative",
  "ambient",
  "anime",
  "black-metal",
  "bluegrass",
  "blues",
  "bossanova",
  "brazil",
  "breakbeat",
  "british",
  "cantopop",
  "chicago-house",
  "children",
  "chill",
  "classical",
  "club",
  "comedy",
  "country",
  "dance",
  "dancehall",
  "death-metal",
  "deep-house",
  "detroit-techno",
  "disco",
  "disney",
  "drum-and-bass",
  "dub",
  "dubstep",
  "edm",
  "electro",
  "electronic",
  "emo",
  "folk",
  "forro",
  "french",
  "funk",
  "garage",
  "german",
  "gospel",
  "goth",
  "grindcore",
  "groove",
  "grunge",
  "guitar",
  "happy",
  "hard-rock",
  "hardcore",
  "hardstyle",
  "heavy-metal",
  "hip-hop",
  "holidays",
  "honky-tonk",
  "house",
  "idm",
  "indian",
  "indie",
  "indie-pop",
  "industrial",
  "iranian",
  "j-dance",
  "j-idol",
  "j-pop",
  "j-rock",
  "jazz",
  "k-pop",
  "kids",
  "latin",
  "latino",
  "malay",
  "mandopop",
  "metal",
  "metal-misc",
  "metalcore",
  "minimal-techno",
  "movies",
  "mpb",
  "new-age",
  "new-release",
  "opera",
  "pagode",
  "party",
  "philippines-opm",
  "piano",
  "pop",
  "pop-film",
  "post-dubstep",
  "power-pop",
  "progressive-house",
  "psych-rock",
  "punk",
  "punk-rock",
  "r-n-b",
  "rainy-day",
  "reggae",
  "reggaeton",
  "road-trip",
  "rock",
  "rock-n-roll",
  "rockabilly",
  "romance",
  "sad",
  "salsa",
  "samba",
  "sertanejo",
  "show-tunes",
  "singer-songwriter",
  "ska",
  "sleep",
  "songwriter",
  "soul",
  "soundtracks",
  "spanish",
  "study",
  "summer",
  "swedish",
  "synth-pop",
  "tango",
  "techno",
  "trance",
  "trip-hop",
  "turkish",
  "work-out",
  "world-music",
];

const moods = ["calm", "middle", "energetic"];

function Discovery() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [discoveryData, setDiscoveryData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const authAccess = useLoaderData();
  let danceability = 0;

  if (selectedMood === "calm") {
    danceability = 0.3;
  } else if (selectedMood === "middle") {
    danceability = 0.6;
  } else if (selectedMood === "energetic") {
    danceability = 1;
  }

  function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    fetch(
      `https://api.spotify.com/v1/recommendations?limit=1&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=${selectedType}&seed_tracks=0c6xIDDpzE81m2q797ordA&target_danceability=${danceability}`,
      authAccess
    )
      .then((result) => result.json())
      .then((data) => {
        setDiscoveryData(data.tracks[0]);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetch(
      `https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl`,
      authAccess
    )
      .then((result) => result.json())
      .then((data) => {
        setDiscoveryData(data);
        setLoading(false);
      });
  }, []);

  if (Loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <h2>Définissez une musique et appuyez sur play </h2>
      <form onSubmit={handleSubmit}>
        <section>
          <label>
            What type of music?
            <select
              onChange={(element) => setSelectedType(element.target.value)}
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </section>
        <section>
          <label>
            which mood are you in?
            <select
              onChange={(element) => setSelectedMood(element.target.value)}
            >
              {moods.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </label>
        </section>
        <input type="submit" value="Play" />
      </form>
      <MusicCard
        key={discoveryData.id}
        artistNameMusic={discoveryData.artists[0].name}
        musicName={discoveryData.name}
        imageMusic={discoveryData.album.images[1].url}
      />
    </>
  );
}

export default Discovery;
