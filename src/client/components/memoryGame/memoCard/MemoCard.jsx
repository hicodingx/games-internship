import React from "react";
import "./memoCard.css";

function MemoCard({ index, symbol, isFlipped, onClick }) {
  return (
    <div className={`mcard ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
      <div className="inner">
        <div className="front">{symbol}</div>
        <div className="back">?</div>
      </div>
    </div>
  );
}

export default MemoCard;
