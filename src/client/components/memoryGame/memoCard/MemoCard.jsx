import React from "react";
import "./memoCard.css";

function MemoCard({ index, symbol, isFlipped, isDisabled, onClick }) {
  return (
    <div
      className={`mcard ${isFlipped ? "flipped" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
      onClick={() => !isDisabled && onClick()} // Empêche le clic si la carte est désactivée
    >
      <div className="inner">
        <div className="front">{symbol}</div>
        <div className="back">
          <div className="back-content">?</div>
        </div>
      </div>
    </div>
  );
}

export default MemoCard;
