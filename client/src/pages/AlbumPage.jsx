import { useParams, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import Tracks from "../components/Tracks";
import Card from "../components/Card";

export default function AlbumPage() {
  const { albumId } = useParams();
  const authAccess = useLoaderData();
  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getOnlyYear = (dateString) => `(${dateString.split("-")[0]})`;

  useEffect(() => {
      fetch(`https://api.spotify.com/v1/albums/${albumId}`, authAccess)
      .then((result) => result.json())  
      .then((data) => {
     setAlbumData (data)
    setLoading(false);
  });
  }, [])
  if (loading) {
    return <h2>Loading...</h2>;
}
return (
    <>
    <section className="father">
  
      <Card
          imageMusic={albumData.images[1].url}
        key={albumData.id}  
        artistNameAlbum={
        albumData.artists[0].name.slice(0, 24) +
        (albumData.artists[0].name.length > 24 ? "..." : "")
        }
        albumName={
        albumData.name.slice(0, 26) +  
        (albumData.name.length > 26 ? "..." : "") 
       }
        albumYear={
          getOnlyYear(albumData.release_date)
        }
       />
      </section>
     <section className="tracksCard">
          {albumData.tracks.items.map((music, index) => (
        <Tracks 
          key={music.id}  
          artistNameAlbum={
            music.artists[0].name.slice(0, 24) + 
          (music.artists[0].name.length > 24 ? "..." : "")
         }
         trackNumber={index + 1} 
         trackName={
          music.name.slice(0, 26)+  
          (music.name.length > 26 ? "..." : "")
         }
         albumName={
          music.artists.slice(0, 26)+  
          (music.name.length > 26 ? "..." : "")
         }
          musicLength={
            (music.duration_ms/ 60000).toFixed(2)
          }
        />
      ) )}
      </section>
  </> 
  );};
  