// Game.js
import React from "react";
import Board from "../board/Board";
import "./morpionApp.css";

const MorpionApp = () => {
  return (
    <div className="game-container">
      <header className="game-header">
        <h1>Bienvenue au Jeu de Morpion!</h1>
        <p>Choisissez votre niveau de difficulté et commencez à jouer!</p>
      </header>
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
};

export default MorpionApp;
