import { Link } from "react-router-dom";

const homeSrc = "src/assets/images/Home.svg";
const researchSrc = "src/assets/images/Search.svg";
const discoverySrc = "src/assets/images/Shuffle.svg";

function Footer() {
  return (
    <>
      <nav className="navBarBottom">
        <Link to="/">
          <img className="homeIcone" src={homeSrc} alt="back to the homepage" />
        </Link>
        <Link to="/pages/Research">
          <img
            className="searchIcone"
            src={researchSrc}
            alt="go to research page"
          />
        </Link>
        <Link to="/pages/Discovery">
          <img
            className="shuffleIcone"
            src={discoverySrc}
            alt="go to discovery page"
          />
        </Link>
        <p>Home</p>
        <p>Research</p>
        <p>Discovery</p>
      </nav>
      <footer>
        <p>Terms of use</p>
        <p>Contact</p>
        <p>About us</p>
      </footer>
    </>
  );
}
export default Footer;
