import { Link } from "react-router-dom";
import homeSrc from "../assets/images/Home.svg";
import researchSrc from "../assets/images/Search.svg";
import discoverySrc from "../assets/images/Shuffle.svg";

function Footer() {
  return (
    <>
      <nav className="navBarBottom">
        <Link to="/">
          <img className="iconeNavBar" src={homeSrc} alt="back to the homepage" />
          Home
        </Link>
        <Link to="/research">
          <img
            className="iconeNavBar"
            src={researchSrc}
            alt="go to research page"
          />
          Research
        </Link>
        <Link to="/discovery">
          <img
            className="iconeNavBar"
            src={discoverySrc}
            alt="go to discovery page"
          />
          Discovery
        </Link>
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
