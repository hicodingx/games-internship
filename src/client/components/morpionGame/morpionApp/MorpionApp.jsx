// Game.js
import React, { useEffect } from "react";
import Board from "../board/Board";
import "./morpionApp.css";
import { useNavigate } from "react-router-dom";

const MorpionApp = () => {
  // Deactivation
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/");
  // }, []);
  // end deactivation
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
