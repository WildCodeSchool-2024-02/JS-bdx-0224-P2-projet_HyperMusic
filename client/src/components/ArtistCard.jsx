import PropTypes from "prop-types";

export default function ArtistCard({ artistName, imageUrl }) {
  return (
    <figure className="artist-card">
      <img
        src={imageUrl}
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
  imageUrl: PropTypes.string.isRequired,
};
