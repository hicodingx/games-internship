import React from "react";
import MemoCard from "../memoCard/MemoCard";
import "./memoBoard.css";
function MemoBoard({
  cards,
  flippedIndices,
  matchedIndices,
  onCardClick,
  isStarted,
}) {
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
          isDisabled={!isStarted || matchedIndices.includes(index)} // Désactive la carte si le jeu n'est pas démarré ou si elle est appariée
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
}

export default MemoBoard;
