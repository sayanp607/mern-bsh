import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = ({ isAuth, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <div className="logo">Bong Study Hub</div>
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
      <nav className={`link ${isMenuOpen ? "open" : ""}`}>
        <Link to={"/"} onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to={"/courses"} onClick={() => setIsMenuOpen(false)}>
          Courses
        </Link>
        <Link to={"/about"} onClick={() => setIsMenuOpen(false)}>
          About
        </Link>
        <Link to={"/contactus"} onClick={() => setIsMenuOpen(false)}>
          Contact Us
        </Link>
        <Link to={"/contact"} onClick={() => setIsMenuOpen(false)}>
          Councelling
        </Link>
        <Link to={"/mycourse"} onClick={() => setIsMenuOpen(false)}>
          My Courses
        </Link>
        <Link to={"/testseries"} onClick={() => setIsMenuOpen(false)}>
          Test Series
        </Link>
        {user && user.role == "admin" && (
          <Link to={"/sendmail"} onClick={() => setIsMenuOpen(false)}>
            Send Notifications
          </Link>
        )}
        <Link to={"/privacy"} onClick={() => setIsMenuOpen(false)}>
          Privacy Policy
        </Link>
        {isAuth ? (
          <Link to={"/account"} onClick={() => setIsMenuOpen(false)}>
            Account
          </Link>
        ) : (
          <Link to={"/login"} onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
