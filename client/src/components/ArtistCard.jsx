import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ArtistCard({ artistName, imageArtist, artistId }) {
  return (
    <figure className="artist-card">
      <Link to={`/artist/${artistId}`} className="link-card" />
      <img
        src={imageArtist}
        alt="artist illustration"
        className="artist-picture"
      />
      <figcaption className="artist-desc">
        Artiste : <strong className="artist-name">{artistName}</strong>
      </figcaption>
    </figure>
  );
}

ArtistCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  imageArtist: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
};
