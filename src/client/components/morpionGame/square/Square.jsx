import React from "react";
import "./square.css"; // Assurez-vous d'importer les styles CSS

const Square = ({ value, onClick, className }) => {
  return (
    <button className={`square ${className}`} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
