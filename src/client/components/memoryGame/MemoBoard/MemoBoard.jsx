import React from "react";
import MemoCard from "../memoCard/MemoCard";
import "./memoBoard.css";
function MemoBoard({ cards, flippedIndices, matchedIndices, onCardClick }) {
  return (
    <div className="mboard">
      {cards.map((card, index) => (
        <MemoCard
          key={index}
          index={index}
          symbol={card}
          isFlipped={
            flippedIndices.includes(index) || matchedIndices.includes(index)
          }
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
}

export default MemoBoard;
