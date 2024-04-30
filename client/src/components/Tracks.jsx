import PropTypes from "prop-types";

export default function Tracks({ trackName, musicLength, trackNumber }) {
  return (
    <figure className="infoTrack">
      <p className="trackPosition">{trackNumber}.</p>{" "}
      <p className="trackTitle">
        <strong>{trackName}</strong>{" "}
      </p>
      <p className="trackLength">{musicLength}</p>{" "}
    </figure>
  );
}

Tracks.propTypes = {
  trackName: PropTypes.string.isRequired,
  musicLength: PropTypes.string.isRequired,
  trackNumber: PropTypes.number.isRequired,
};
