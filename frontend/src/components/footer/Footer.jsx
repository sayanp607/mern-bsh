import React from "react";
import "./footer.css";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutubeSquare, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
// import logo from "./assets/images/logo.png"; // Adjust path based on image location

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Left Side Content */}
        <div className="footer-left">
          <img
            src="/logo.jpg"
            alt="Bong Study Hub Logo"
            className="footer-logo"
          />
          <p className="contact-info">
            <strong>Phone:</strong> +91 98832 84104 <br />
            <strong>Email:</strong> setharnab636@gmail.com
          </p>
        </div>

        {/* Center Content */}
        <div className="footer-center">
          <p>
            &copy; Bong Study Hub. All rights reserved. <br />
            Made with ❤️ by <a href="https://example.com">Sayan</a>
          </p>
          <div className="social-links">
            <a
              href="https://www.instagram.com/bong_study_hub_636?igsh=NmhrZ2NvZXhnZ2No"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillInstagram />
            </a>
            <a
              href="https://chat.whatsapp.com/I7ryCLqHoUNJ5xiX6WdJJ5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.youtube.com/@bongstudyhub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutubeSquare />
            </a>
          </div>
          <div className="links-container">
            <Link to="/terms" className="vertical-link">
              Terms & Conditions
            </Link>
            <a href="/privacy-policy.html" className="vertical-link">
              Privacy Policy
            </a>
            <Link to="/refund" className="vertical-link">
              Refunds & Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
