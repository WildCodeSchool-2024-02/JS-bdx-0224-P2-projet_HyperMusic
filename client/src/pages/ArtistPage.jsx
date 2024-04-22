import "../App.css";
import { useParams } from "react-router-dom";

function ArtistPage() {
  const params = useParams();
  return <h2>Artist : {params}</h2>;
}

export default ArtistPage;
