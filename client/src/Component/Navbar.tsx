import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`header ${
        isHomePage ? "home-header" : "page-header"
      }`}
    >
      <div className="logo">
        <span>RADIANCE</span>
        <small>BEAUTY BAR</small>
      </div>

      <nav className="nav">
        <Link to="/">HOME</Link>

        <Link to="/services">SERVICES</Link>

        <Link to="/products">PRODUCTS</Link>

        <Link to="/gallery">GALLERY</Link>

        <Link to="/about">ABOUT US</Link>

        <Link to="/contact">CONTACT</Link>

        <Link to="/booking" className="book-button">
          BOOK NOW
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;