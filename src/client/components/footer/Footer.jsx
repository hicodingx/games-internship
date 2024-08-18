import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="title">
        Projet réalisé par <span>Hippolyte Belsius Avoce</span>
      </div>

      <p className="copyright">
        Copyright &copy; <Link to="/">Stage</Link> all rights reserved.
      </p>
    </div>
  );
}

export default Footer;
