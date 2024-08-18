import React from "react";
import { FaSearch } from "react-icons/fa";
import { SiNintendogamecube } from "react-icons/si";
import "./header.css";

function Header() {
  return (
    <div className="site-header">
      <div className="header-main">
        <div className="container">
          <a href="#" className="header-logo">
            <div className="logo">
              <SiNintendogamecube className="header-logo-img icon" size={100} />
            </div>
          </a>

          <div className="header-search-container">
            <input
              type="search"
              name="search"
              id=""
              className="search-field"
              placeholder="Rechercher un jeu... "
            />
            <button className="search-btn">
              <FaSearch className="react-icon" size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
