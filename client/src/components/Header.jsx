import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="topPage">
      <Link to="/">
        <img
          className="logo"
          src="src/assets/images/Melody-Find-removebg-preview 3.png"
          alt="back to the homepage"
        />
      </Link>
      <h1>Hypermusic</h1>
      <Link to="/research" className="linkToOtherPages">
        Research
      </Link>
      <Link to="/discovery" className="linkToOtherPages">
        Discovery
      </Link>
    </header>
  );
}
export default Header;
