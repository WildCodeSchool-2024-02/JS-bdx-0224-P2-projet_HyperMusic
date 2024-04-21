import PropTypes from "prop-types";

export default function MusicCard({ artistNameMusic, musicName, imageMusic }) {
  return (
    <figure className="music-card">
      <img
        src={imageMusic}
        alt="music illustration"
        className="music-picture"
      />
      <figcaption className="music-desc">
        <strong className="artist-name-music">{artistNameMusic}</strong>
        Musique : {musicName}
      </figcaption>
    </figure>
  );
}

MusicCard.propTypes = {
  artistNameMusic: PropTypes.string.isRequired,
  musicName: PropTypes.string.isRequired,
  imageMusic: PropTypes.string.isRequired,
};
