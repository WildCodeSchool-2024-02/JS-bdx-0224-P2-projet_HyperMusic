import PropTypes from "prop-types";

export default function ArtistCard({ artistName, imageArtist }) {
  return (
    <figure className="artist-card">
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
};
