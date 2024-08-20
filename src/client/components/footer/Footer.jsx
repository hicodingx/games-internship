import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-nav">
        <div className="container">
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Follow Us</h2>
            </li>

            <li className="footer-nav-item">
              <ul className="social-link">
                <li className="footer-nav-item">
                  <Link to="/" className="footer-nav-link">
                    <FaFacebook size={25} className="react-icon" />
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link to="/" className="footer-nav-link">
                    <FaTwitter size={25} className="react-icon" />
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link to="/" className="footer-nav-link">
                    <FaLinkedin size={25} className="react-icon" />
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link to="/" className="footer-nav-link">
                    <FaInstagram size={25} className="react-icon" />
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link to="/" className="footer-nav-link">
                    <FaWhatsapp size={25} className="react-icon" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <img
            src="/payment.png"
            alt="payment method"
            className="payment-img"
          />

          <p className="copyright">
            Copyright &copy; 2024 <Link to="/">Anon</Link> all rights reserved.
          </p>

          <div className="copyright owner">Nadège ATINDEHOU</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
